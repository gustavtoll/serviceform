// Browser-only preview envelope. A separately authorized server adapter will own delivery later.
export function createLocalSignupEnvelope(email, attribution) {
  const normalizedEmail = email.trim().toLowerCase();
  return {
    schema_version: 'sales-partner.signup-preview.v1',
    idempotency_key: `${normalizedEmail}:${attribution.referral_code || 'direct'}`,
    saved_at: new Date().toISOString(),
    email: normalizedEmail,
    attribution,
    delivery: { mode: 'local-preview', external_system_called: false },
  };
}
