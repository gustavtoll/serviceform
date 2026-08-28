import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const integration = readFileSync(new URL('../src/integration.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const vercel = readFileSync(new URL('../vercel.json', import.meta.url), 'utf8');
const client = `${html}\n${js}\n${integration}`;

const form = html.match(/<form\b[^>]*id="partner-form"[\s\S]*?<\/form>/)?.[0] || '';
assert.ok(form, 'Primary signup form missing');
assert.equal((form.match(/<input\b/g) || []).length, 1, 'Primary form must contain email only');
assert.match(form, /<label\b[^>]*for="email"/i, 'Email needs a persistent associated label');
assert.match(form, /<input\b(?=[^>]*\bid="email")(?=[^>]*\bname="email")(?=[^>]*\btype="email")(?=[^>]*\brequired\b)(?=[^>]*\bautocomplete="email")(?=[^>]*\binputmode="email")(?=[^>]*\bplaceholder="[^"@]+@[^"@]+")/i, 'Email input attributes incomplete');
assert.match(form, /Create my Sales Partner account/i, 'Outcome-led CTA missing');
assert.doesNotMatch(form, /name="(?:first_name|last_name|company|website_or_social_url|partner_type|market|audience_or_client_count|primary_promotion_method|terms_consent)"/i, 'Legacy application field remains');

for (const claim of ['40% lifetime commission', '90-day first-click', '100 active deals', '10% Sub-Sales Partner kickback']) {
  assert.ok(html.includes(claim), `Missing approved input: ${claim}`);
}
assert.match(html, /No payment details/i, 'Payment reassurance missing');
assert.match(html, /no (?:email (?:is|was) sent|data leaves (?:this|your) browser)/i, 'Local-only disclosure missing');
assert.match(html, /no account (?:is|was) (?:actually )?created/i, 'No-account disclosure missing');
assert.match(html, /design-only/i, 'Design-only status missing');
assert.ok(!/affiliate/i.test(html), 'Legacy terminology found');
assert.doesNotMatch(client, /gohighlevel|leadconnector|hooks\.zapier|fetch\s*\(|xmlhttprequest|navigator\.sendbeacon/i, 'External CRM or network API string found in client');

assert.equal((html.match(/<input\b[^>]*\btype="email"/gi) || []).length, 1, 'Page must contain exactly one email input');

for (const token of ['--sf-canvas:', '--sf-surface:', '--sf-surface-muted:', '--sf-accent:', '--sf-espresso:#2d201b', '--sf-radius:24px']) {
  assert.ok(css.includes(token), `Missing brand token: ${token}`);
}
assert.ok(!css.includes('#f26a2e'), 'Obsolete saturated red-orange token found');
assert.ok(!css.includes('#6557ff'), 'Legacy violet token found');
const header = html.match(/<header\b[\s\S]*?<\/header>/i)?.[0] || '';
assert.match(header, /<a\b(?=[^>]*class="header-cta")(?=[^>]*href="#signup")/i, 'Header CTA must use its own signup anchor treatment');
assert.doesNotMatch(header, /class="[^"]*\bbutton\b[^"]*"/i, 'Header CTA must not share the primary button class');
assert.match(css, /\.header-cta\s*\{[^}]*background:var\(--sf-(?:surface|white)\)[^}]*color:var\(--sf-(?:espresso|ink)\)/i, 'Header CTA needs an explicit light treatment');

assert.match(html, /<aside\b(?=[^>]*class="product-visual")(?=[^>]*aria-hidden="true")[^>]*>/i, 'Decorative product visual missing');
assert.match(css, /\.product-visual\s*\{[^}]*pointer-events:none/i, 'Product visual must not intercept clicks');
assert.doesNotMatch(html, /trusted by|testimonial|customers? (?:grew|increased|saved)|shopify|klarna|nike|adidas|\b\d+[,.]?\d*% (?:conversion|growth|increase)|\b\d+[,.]?\d*[kKmM]\+? customers/i, 'Unapproved social proof or named outcome found');
assert.ok(html.includes('Instrument+Sans'), 'Serviceform display family missing');
assert.ok(html.includes('class="skip"'), 'Skip link missing');
assert.match(html, /<meta\b[^>]*name="robots"[^>]*content="noindex,nofollow"/i, 'HTML noindex missing');
assert.match(vercel, /X-Robots-Tag[\s\S]*noindex, nofollow/i, 'Hosting noindex header missing');
assert.match(html, /role="alert"[^>]*aria-live="polite"|aria-live="polite"[^>]*role="alert"/, 'Live error region missing');
assert.ok(css.includes('prefers-reduced-motion:reduce'), 'Reduced-motion support missing');
assert.match(css, /@media\s*\(max-width:\s*(?:8[0-9]{2}|[1-7][0-9]{2})px\)/, 'Mobile responsive rule missing');
console.log('signup CRO static validation passed');
