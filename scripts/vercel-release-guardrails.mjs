import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

function normalize(value) {
  return String(value ?? '').trim().toLowerCase();
}

function findTarget(inspect) {
  return inspect?.target ?? inspect?.deployment?.target ?? inspect?.meta?.target ?? '';
}

function findReadyState(inspect) {
  return inspect?.readyState ?? inspect?.state ?? inspect?.deployment?.readyState ?? '';
}

function readHeader(headers, name) {
  const target = normalize(name);
  for (const [key, value] of Object.entries(headers ?? {})) {
    if (normalize(key) === target) return String(value ?? '');
  }
  return '';
}

function check(name, ok, expected, actual) {
  return { name, ok, expected, actual };
}

export function parseCliArguments(argumentsList) {
  const options = { requireNoindex: false };
  const valueFlags = new Set(['--url', '--target', '--title', '--scope']);

  for (let index = 0; index < argumentsList.length; index += 1) {
    const token = argumentsList[index];
    if (token === '--noindex') {
      options.requireNoindex = true;
      continue;
    }
    if (!valueFlags.has(token)) throw new Error(`Unknown option: ${token}`);

    const value = argumentsList[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`${token} requires a value`);
    options[token.slice(2)] = value;
    index += 1;
  }

  if (!options.url) throw new Error('--url is required');
  try {
    const parsedUrl = new URL(options.url);
    if (parsedUrl.protocol !== 'https:' || parsedUrl.username || parsedUrl.password) {
      throw new Error('unsupported URL');
    }
  } catch {
    throw new Error('--url must be an HTTPS URL without embedded credentials');
  }
  if (!options.target) throw new Error('--target is required');
  if (!['preview', 'production'].includes(normalize(options.target))) {
    throw new Error('--target must be preview or production');
  }

  return options;
}

export function evaluateReleaseEvidence({ inspect, http, expected }) {
  const readyState = normalize(findReadyState(inspect));
  const actualTarget = normalize(findTarget(inspect));
  const requiredTarget = normalize(expected?.target);
  const status = Number(http?.status);
  const expectedTitle = String(expected?.title ?? '');
  const actualTitle = String(http?.title ?? '');
  const robotsTag = readHeader(http?.headers, 'x-robots-tag');

  const checks = [
    check('ready', readyState === 'ready', 'READY', findReadyState(inspect)),
    check('target', actualTarget === requiredTarget, expected?.target, findTarget(inspect)),
    check('http-status', status === 200, 200, http?.status),
    check('title', !expectedTitle || actualTitle.includes(expectedTitle), expectedTitle || '(not required)', actualTitle),
  ];

  if (expected?.requireNoindex) {
    checks.push(check('noindex', /(?:^|[,\s])noindex(?:$|[,\s])/i.test(robotsTag), 'X-Robots-Tag includes noindex', robotsTag || '(missing)'));
  }

  return { ok: checks.every(({ ok }) => ok), checks };
}

export function inspectDeployment(url, scope) {
  const args = ['--yes', 'vercel', 'inspect', url, '--json'];
  if (scope) args.push('--scope', scope);
  const output = execFileSync('npx', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return JSON.parse(output);
}

export async function inspectHttp(url) {
  const response = await fetch(url, { redirect: 'follow' });
  const html = await response.text();
  const match = html.match(/<title[^>]*>\s*([^<]+?)\s*<\/title>/i);
  return {
    status: response.status,
    title: match?.[1] ?? '',
    headers: Object.fromEntries(response.headers.entries()),
  };
}

function printReport(result) {
  for (const entry of result.checks) {
    const marker = entry.ok ? 'PASS' : 'FAIL';
    console.log(`${marker} ${entry.name}: expected ${entry.expected}; observed ${entry.actual || '(missing)'}`);
  }
  console.log(result.ok ? 'Release evidence verified.' : 'Release evidence rejected. Do not share, alias, or promote this deployment.');
}

export async function runCli(argumentsList) {
  const options = parseCliArguments(argumentsList);
  const [inspect, http] = await Promise.all([
    Promise.resolve().then(() => inspectDeployment(options.url, options.scope)),
    inspectHttp(options.url),
  ]);
  const result = evaluateReleaseEvidence({ inspect, http, expected: options });
  printReport(result);
  return result.ok ? 0 : 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli(process.argv.slice(2))
    .then((code) => { process.exitCode = code; })
    .catch((error) => {
      console.error(`Release evidence rejected: ${error.message}`);
      process.exitCode = 2;
    });
}
