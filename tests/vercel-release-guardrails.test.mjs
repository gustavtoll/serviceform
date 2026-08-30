import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateReleaseEvidence, inspectHttp, parseCliArguments, runCli } from '../scripts/vercel-release-guardrails.mjs';

const requiredOptions = [
  '--url', 'https://example.vercel.app',
  '--target', 'preview',
  '--project', 'sales-partner-signup',
];

test('requires a URL, target, and project for CLI use', () => {
  assert.throws(() => parseCliArguments([]), /--url is required/);
  assert.throws(() => parseCliArguments(['--url', 'https://example.vercel.app']), /--target is required/);
  assert.throws(() => parseCliArguments(['--url', 'https://example.vercel.app', '--target', 'preview']), /--project is required/);
  assert.throws(() => parseCliArguments(['--url', 'http://example.vercel.app', '--target', 'preview', '--project', 'x']), /--url must be a public HTTPS URL/);
  assert.throws(() => parseCliArguments(['--url', 'not-a-url', '--target', 'preview', '--project', 'x']), /--url must be a public HTTPS URL/);
});

test('parses read-only release verification options', () => {
  assert.deepEqual(
    parseCliArguments([
      ...requiredOptions,
      '--title', 'Serviceform Sales Partner',
      '--noindex',
      '--scope', 'gustavtolls-projects',
    ]),
    {
      url: 'https://example.vercel.app',
      target: 'preview',
      project: 'sales-partner-signup',
      title: 'Serviceform Sales Partner',
      requireNoindex: true,
      scope: 'gustavtolls-projects',
    },
  );
});

const expectedPreview = {
  target: 'preview',
  project: 'sales-partner-signup',
  title: 'Serviceform Sales Partner',
  requireNoindex: true,
};

function readyPreview(overrides = {}) {
  return {
    inspect: { name: 'sales-partner-signup', target: 'preview', readyState: 'READY' },
    http: {
      status: 200,
      title: 'Serviceform Sales Partner — internal review',
      headers: { 'x-robots-tag': 'noindex, nofollow' },
    },
    expected: expectedPreview,
    ...overrides,
  };
}

test('accepts a ready preview deployment with required project and HTTP evidence', () => {
  const result = evaluateReleaseEvidence(readyPreview());

  assert.equal(result.ok, true);
  assert.deepEqual(result.checks.map(({ name, ok }) => ({ name, ok })), [
    { name: 'ready', ok: true },
    { name: 'target', ok: true },
    { name: 'project', ok: true },
    { name: 'http-status', ok: true },
    { name: 'title', ok: true },
    { name: 'noindex', ok: true },
  ]);
});

test('rejects a deployment from another Vercel project', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    inspect: { name: 'different-project', target: 'preview', readyState: 'READY' },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'project').ok, false);
});

test('rejects a production deployment when preview is required', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    inspect: { name: 'sales-partner-signup', target: 'production', readyState: 'READY' },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'target').ok, false);
});

test('rejects an unexpected document title', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    http: { status: 200, title: 'Vercel — sign in', headers: { 'x-robots-tag': 'noindex, nofollow' } },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'title').ok, false);
});

test('rejects an indexable response when noindex is required', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    http: { status: 200, title: 'Serviceform Sales Partner — internal review', headers: {} },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'noindex').ok, false);
});

test('does not fetch when deployment inspection fails', async () => {
  let fetchCalls = 0;
  await assert.rejects(
    runCli(requiredOptions, {
      inspect: () => { throw new Error('Vercel inspect failed'); },
      http: async () => { fetchCalls += 1; return readyPreview().http; },
    }),
    /Vercel inspect failed/,
  );
  assert.equal(fetchCalls, 0);
});

test('uses redirect-error for HTTP release evidence', async () => {
  let options;
  await inspectHttp('https://example.vercel.app', async (_url, suppliedOptions) => {
    options = suppliedOptions;
    return new Response('<title>Example</title>', { status: 200 });
  });
  assert.equal(options.redirect, 'error');
  assert.ok(options.signal);
});
