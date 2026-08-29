import { createHash, randomUUID } from 'node:crypto';

const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const CONTACT_URL = `${GHL_BASE_URL}/contacts/upsert`;
const OPPORTUNITY_URL = `${GHL_BASE_URL}/opportunities/`;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;
const IDEMPOTENCY_MS = 60 * 60 * 1000;

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function text(value, max = 120) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function normalizeEmail(value) {
  const email = text(value, 254).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function configured(config) {
  return ['GHL_PRIVATE_INTEGRATION_TOKEN', 'GHL_LOCATION_ID', 'GHL_APPLICATION_PIPELINE_ID', 'GHL_APPLICATION_PIPELINE_STAGE_ID', 'GHL_PILOT_TEST_EMAILS']
    .every((key) => text(config[key]));
}

function allowedEmails(config) {
  return new Set(text(config.GHL_PILOT_TEST_EMAILS, 2000).split(',').map(normalizeEmail).filter(Boolean));
}

function sameOrigin(origin, host) {
  if (!origin || !host) return false;
  try {
    const parsed = new URL(origin);
    return parsed.host === host && (parsed.protocol === 'https:' || (parsed.protocol === 'http:' && parsed.hostname === 'localhost'));
  } catch {
    return false;
  }
}

function safeResponse(status, body) {
  return { status, body: { ...body } };
}

export function createPilotService({ config = process.env, fetchImpl = fetch, now = Date.now, requestId = randomUUID }) {
  const requestCounts = new Map();
  const accepted = new Map();

  function cleanExpired() {
    const current = now();
    for (const [key, entry] of requestCounts) if (entry.startedAt + WINDOW_MS <= current) requestCounts.delete(key);
    for (const [key, entry] of accepted) if (entry.expiresAt <= current) accepted.delete(key);
  }

  function rateLimited(email, ip) {
    const key = hash(`${email}|${text(ip, 100) || 'unknown'}`);
    const current = now();
    const entry = requestCounts.get(key);
    if (!entry || entry.startedAt + WINDOW_MS <= current) {
      requestCounts.set(key, { startedAt: current, count: 1 });
      return false;
    }
    entry.count += 1;
    return entry.count > MAX_REQUESTS;
  }

  async function submit(payload = {}, context = {}) {
    cleanExpired();
    if (!sameOrigin(context.origin, context.host)) return safeResponse(403, { error: 'This request is not allowed.' });
    if (!configured(config)) return safeResponse(503, { error: 'The pilot is not configured yet. Please try again later.' });

    const email = normalizeEmail(payload.email);
    if (!email || payload.termsConsent !== true || text(payload.website, 200)) {
      return safeResponse(400, { error: 'Enter a valid email and confirm consent to continue.' });
    }
    if (!allowedEmails(config).has(email)) return safeResponse(403, { error: 'This pilot is limited to approved test email addresses.' });
    if (rateLimited(email, context.ip)) return safeResponse(429, { error: 'Too many attempts. Please wait before trying again.' });

    const existing = accepted.get(email);
    if (existing) return safeResponse(202, existing.result);

    const attribution = Object.fromEntries(
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'referral_code', 'parent_sales_partner_id']
        .map((key) => [key, text(payload.attribution?.[key], 160)])
        .filter(([, value]) => value),
    );
    const headers = {
      Authorization: `Bearer ${config.GHL_PRIVATE_INTEGRATION_TOKEN}`,
      Version: 'v3',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const tag = text(config.GHL_PILOT_TAG, 80) || 'sales-partner-pilot';

    let contactResponse;
    try {
      contactResponse = await fetchImpl(CONTACT_URL, {
        method: 'POST', headers,
        body: JSON.stringify({
          email, locationId: config.GHL_LOCATION_ID,
          tags: ['sales-partner', 'application-pending', tag],
          source: 'serviceform-sales-partner-pilot',
          createNewIfDuplicateAllowed: false,
          ...(Object.keys(attribution).length ? { customFields: Object.entries(attribution).map(([key, fieldValue]) => ({ key, fieldValue })) } : {}),
        }),
      });
      if (!contactResponse.ok) throw new Error('contact upsert failed');
      const contactData = await contactResponse.json();
      const contactId = text(contactData?.contact?.id, 100);
      if (!contactId) throw new Error('contact id missing');
      const opportunityResponse = await fetchImpl(OPPORTUNITY_URL, {
        method: 'POST', headers,
        body: JSON.stringify({
          pipelineId: config.GHL_APPLICATION_PIPELINE_ID,
          locationId: config.GHL_LOCATION_ID,
          pipelineStageId: config.GHL_APPLICATION_PIPELINE_STAGE_ID,
          status: 'open', contactId,
          name: `Sales Partner application — ${email}`,
        }),
      });
      if (!opportunityResponse.ok) throw new Error('opportunity creation failed');
    } catch {
      return safeResponse(502, { error: 'We could not submit the pilot application. Please try again later.' });
    }

    const result = { status: 'accepted', requestId: requestId(), nextStep: 'Check your inbox for the approved pilot follow-up.' };
    accepted.set(email, { result, expiresAt: now() + IDEMPOTENCY_MS });
    return safeResponse(202, result);
  }

  return { submit };
}
