const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'referral_code', 'parent_sales_partner_id'];

export function createPilotPayload({ email, termsConsent, website, search = location.search }) {
  const params = new URLSearchParams(search);
  const attribution = Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, params.get(key) || '']));
  return { email: email.trim(), termsConsent: Boolean(termsConsent), website: website || '', attribution };
}

export async function submitPilotApplication(payload) {
  const response = await fetch('/api/sales-partner-application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.status !== 'accepted') throw new Error(body.error || 'We could not submit the pilot application. Please try again later.');
  return body;
}
