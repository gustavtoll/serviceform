import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RELEASE_TIMEOUT_MS = 15_000;

function normalize(value) {
  return String(value ?? '').trim().toLowerCase();
}

function isPrivateHostname(hostname) {
  const host = normalize(hostname).replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host === '::1' || host === '0.0.0.0') return true;
  const octets = host.split('.').map(Number);
  if (octets.length !== 4 || octets.some((value) => !Number.isInteger(value) || value < 0 || value > 255)) return false;
  return octets[0] === 10
    || octets[0] === 127
    || (octets[0] === 192 && octets[1] === 168)
    || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    || (octets[0] === 169 && octets[1] === 254);
}

function findTarget(inspect) {
  return inspect?.target ?? inspect?.deployment?.target ?? inspect?.meta?.target ?? '';
}

function findReadyState(inspect) {
  return inspect?.readyState ?? inspect?.state ?? inspect?.deployment?.readyState ?? '';
}

function findProjectName(inspect) {
  return inspect?.name ?? inspect?.project?.name ?? inspect?.deployment?.name ?? '';
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
  const valueFlags = new Set(['--url', '--target', '--project', '--title', '--scope']);

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
    if (parsedUrl.protocol !== 'https:' || parsedUrl.username || parsedUrl.password || isPrivateHostname(parsedUrl.hostname)) {
      throw new Error('unsupported URL');
    }
  } catch {
    throw new Error('--url must be a public HTTPS URL without embedded credentials');
  }
  if (!options.target) throw new Error('--target is required');
  if (!['preview', 'production'].includes(normalize(options.target))) {
    throw new Error('--target must be preview or production');
  }
  if (!options.project) throw new Error('--project is required');

  return options;
}

export function evaluateReleaseEvidence({ inspect, http, expected }) {
  const readyState = normalize(findReadyState(inspect));
  const actualTarget = normalize(findTarget(inspect));
  const actualProject = normalize(findProjectName(inspect));
  const requiredTarget = normalize(expected?.target);
  const requiredProject = normalize(expected?.project);
  const status = Number(http?.status);
  const expectedTitle = String(expected?.title ?? '');
  const actualTitle = String(http?.title ?? '');
  const robotsTag = readHeader(http?.headers, 'x-robots-tag');

  const checks = [
    check('ready', readyState === 'ready', 'READY', findReadyState(inspect)),
    check('target', actualTarget === requiredTarget, expected?.target, findTarget(inspect)),
    check('project', actualProject === requiredProject, expected?.project, findProjectName(inspect)),
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
  const output = execFileSync('npx', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: RELEASE_TIMEOUT_MS,
  });
  return JSON.parse(output);
}

export async function inspectHttp(url, fetchImplementation = fetch) {
  const response = await fetchImplementation(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(RELEASE_TIMEOUT_MS),
  });
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

export async function runCli(argumentsList, dependencies = {}) {
  const options = parseCliArguments(argumentsList);
  const inspect = dependencies.inspect ?? inspectDeployment;
  const http = dependencies.http ?? inspectHttp;
  const inspection = await inspect(options.url, options.scope);
  const response = await http(options.url);
  const result = evaluateReleaseEvidence({ inspect: inspection, http: response, expected: options });
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
