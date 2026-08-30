import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateReleaseEvidence, parseCliArguments } from '../scripts/vercel-release-guardrails.mjs';

test('requires a URL and target for CLI use', () => {
  assert.throws(() => parseCliArguments([]), /--url is required/);
  assert.throws(() => parseCliArguments(['--url', 'https://example.vercel.app']), /--target is required/);
  assert.throws(() => parseCliArguments(['--url', 'http://example.vercel.app', '--target', 'preview']), /--url must be an HTTPS URL/);
  assert.throws(() => parseCliArguments(['--url', 'not-a-url', '--target', 'preview']), /--url must be an HTTPS URL/);
});

test('parses read-only release verification options', () => {
  assert.deepEqual(
    parseCliArguments([
      '--url', 'https://example.vercel.app',
      '--target', 'preview',
      '--title', 'Serviceform Sales Partner',
      '--noindex',
      '--scope', 'gustavtolls-projects',
    ]),
    {
      url: 'https://example.vercel.app',
      target: 'preview',
      title: 'Serviceform Sales Partner',
      requireNoindex: true,
      scope: 'gustavtolls-projects',
    },
  );
});

const expectedPreview = {
  target: 'preview',
  title: 'Serviceform Sales Partner',
  requireNoindex: true,
};

function readyPreview(overrides = {}) {
  return {
    inspect: { target: 'preview', readyState: 'READY' },
    http: {
      status: 200,
      title: 'Serviceform Sales Partner — internal review',
      headers: { 'x-robots-tag': 'noindex, nofollow' },
    },
    expected: expectedPreview,
    ...overrides,
  };
}

test('accepts a ready preview deployment with the required HTTP evidence', () => {
  const result = evaluateReleaseEvidence(readyPreview());

  assert.equal(result.ok, true);
  assert.deepEqual(result.checks.map(({ name, ok }) => ({ name, ok })), [
    { name: 'ready', ok: true },
    { name: 'target', ok: true },
    { name: 'http-status', ok: true },
    { name: 'title', ok: true },
    { name: 'noindex', ok: true },
  ]);
});

test('rejects a production deployment when preview is required', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    inspect: { target: 'production', readyState: 'READY' },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'target').ok, false);
});

test('rejects an unexpected document title', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    http: {
      status: 200,
      title: 'Vercel — sign in',
      headers: { 'x-robots-tag': 'noindex, nofollow' },
    },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'title').ok, false);
});

test('rejects an indexable response when noindex is required', () => {
  const result = evaluateReleaseEvidence(readyPreview({
    http: {
      status: 200,
      title: 'Serviceform Sales Partner — internal review',
      headers: {},
    },
  }));

  assert.equal(result.ok, false);
  assert.equal(result.checks.find((check) => check.name === 'noindex').ok, false);
});
