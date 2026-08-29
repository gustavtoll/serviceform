import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const vercel = readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');

assert.ok(html.includes('name="robots" content="noindex,nofollow"'));
for (const term of ['Monthly site traffic', 'Interaction rate', 'Lead rate', 'Average revenue per sale', 'Closing rate', 'Illustrative opportunity model', 'not customer proof', 'not a forecast', 'not partner earnings', 'not a commission calculation', 'not a guaranteed result']) assert.ok(html.includes(term), `Missing ${term}`);
for (const value of ['400000', '7', '5', '300']) assert.ok(html.includes(`value="${value}"`), `Missing default ${value}`);
for (const output of ['28,000', '1,400', '420,000', '21,000', '40,000', '6,000', '1,800,000', '180,000']) assert.ok(html.includes(output), `Missing source scenario output ${output}`);
for (const token of ['traffic', 'interaction', 'leadRate', 'revenue', 'closeRate', 'input', 'aria-live']) assert.ok(js.includes(token) || html.includes(token), `Missing behavior ${token}`);
for (const claim of ['4.24%', '14.36%', '3×', '4.6%', '70%']) assert.ok(!html.includes(claim), `Forbidden claim ${claim}`);
assert.ok(css.includes('--sf-espresso:#2d201b'));
assert.ok(css.includes('prefers-reduced-motion:reduce'));
assert.match(vercel, /X-Robots-Tag/);
assert.match(vercel, /noindex, nofollow/);
console.log('opportunity calculator static validation passed');
