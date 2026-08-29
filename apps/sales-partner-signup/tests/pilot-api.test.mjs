import assert from 'node:assert/strict';
import { createPilotService } from '../api/pilot-core.mjs';

const config = {
  GHL_PRIVATE_INTEGRATION_TOKEN: 'test-token',
  GHL_LOCATION_ID: 'location-1',
  GHL_APPLICATION_PIPELINE_ID: 'pipeline-1',
  GHL_APPLICATION_PIPELINE_STAGE_ID: 'stage-1',
  GHL_PILOT_TEST_EMAILS: 'pilot@example.com',
  GHL_PILOT_TAG: 'sales-partner-pilot',
};

const calls = [];
const fakeFetch = async (url, options) => {
  calls.push({ url, options });
  if (url.endsWith('/contacts/upsert')) {
    return { ok: true, json: async () => ({ new: true, contact: { id: 'contact-1' } }) };
  }
  return { ok: true, json: async () => ({ opportunity: { id: 'opportunity-1' } }) };
};

const service = createPilotService({ config, fetchImpl: fakeFetch, now: () => 1_000 });
const request = {
  email: 'PILOT@example.com',
  termsConsent: true,
  website: '',
  attribution: { utm_source: 'internal-review', referral_code: 'pilot-ref' },
};
const context = { origin: 'https://preview.example.test', host: 'preview.example.test', ip: '127.0.0.1' };

const first = await service.submit(request, context);
assert.equal(first.status, 202);
assert.equal(first.body.status, 'accepted');
assert.equal(first.body.nextStep, 'Check your inbox for the approved pilot follow-up.');
assert.equal(calls.length, 2);
assert.equal(calls[0].url, 'https://services.leadconnectorhq.com/contacts/upsert');
assert.equal(calls[1].url, 'https://services.leadconnectorhq.com/opportunities/');
const contact = JSON.parse(calls[0].options.body);
assert.equal(contact.email, 'pilot@example.com');
assert.equal(contact.locationId, 'location-1');
assert.deepEqual(contact.tags, ['sales-partner', 'application-pending', 'sales-partner-pilot']);
assert.equal(contact.createNewIfDuplicateAllowed, false);
assert.equal(contact.source, 'serviceform-sales-partner-pilot');
const opportunity = JSON.parse(calls[1].options.body);
assert.equal(opportunity.contactId, 'contact-1');
assert.equal(opportunity.pipelineId, 'pipeline-1');
assert.equal(opportunity.pipelineStageId, 'stage-1');
assert.equal(opportunity.status, 'open');
assert.match(opportunity.name, /pilot@example\.com/);
assert.equal(calls[0].options.headers.Authorization, 'Bearer test-token');
assert.equal(calls[0].options.headers.Version, 'v3');

const replay = await service.submit(request, context);
assert.equal(replay.status, 202);
assert.equal(replay.body.requestId, first.body.requestId);
assert.equal(calls.length, 2, 'replay must not call GHL again');

for (const invalid of [
  [{ ...request, termsConsent: false }, 400],
  [{ ...request, website: 'bot' }, 400],
  [{ ...request, email: 'not-an-email' }, 400],
]) {
  const result = await service.submit(invalid[0], context);
  assert.equal(result.status, invalid[1]);
}
assert.equal((await service.submit(request, { ...context, origin: 'https://evil.example' })).status, 403);
assert.equal((await service.submit({ ...request, email: 'real@example.com' }, context)).status, 403);
assert.equal((await createPilotService({ config: {}, fetchImpl: fakeFetch }).submit(request, context)).status, 503);

const failing = createPilotService({ ...{ config, now: () => 2_000 }, fetchImpl: async () => ({ ok: false, json: async () => ({}) }) });
assert.equal((await failing.submit(request, context)).status, 502);
console.log('GHL pilot API tests passed');
