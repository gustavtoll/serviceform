// Future server-side adapter boundary. This Wave 1 client never calls GoHighLevel.
export function createApplicationEnvelope(values, attribution) {
  return {
    schema_version: 'w1.application.v1',
    idempotency_key: `${values.email.trim().toLowerCase()}:${attribution.referral_code || 'direct'}`,
    submitted_at: new Date().toISOString(),
    applicant: values,
    attribution,
    delivery: { mode: 'local-demo', external_crm_called: false },
  };
}
