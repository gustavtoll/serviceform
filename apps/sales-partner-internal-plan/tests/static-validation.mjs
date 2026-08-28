import { readFileSync } from 'node:fs'; import assert from 'node:assert/strict';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
for (const topic of ['Lifecycle','Economics','Partner tracks','Tiering model','Sub-Sales Partners','Dream Car governance','GoHighLevel roadmap','Reporting','90-day pilot','Risks','Decision required']) assert.ok(html.toLowerCase().includes(topic.toLowerCase()), `Missing topic: ${topic}`);
for (const input of ['40%','90','100','10%']) assert.ok(html.includes(input));
assert.ok(!/affiliate/i.test(html), 'Legacy terminology found');
for (const unapproved of ['4.24%','14.36%','3×','4.6%','70%']) assert.ok(!html.includes(unapproved), `Unapproved claim present: ${unapproved}`);
assert.ok(html.match(/Decision Required/gi).length >= 2, 'Decision gates are not sufficiently explicit');
console.log('internal plan static validation passed');
