# Wave 4-A — Automated GoHighLevel application pilot

## Status
Implemented and unit/contract tested locally. **Not deployed, not configured, and not activated.** The existing Vercel signup project currently has no environment variables, so no GoHighLevel request has been made.

## Scope
The email-first page sends a same-origin `POST /api/sales-partner-application` request only after required processing consent. The server validates the request, applies a closed test-email allowlist, upserts one GHL contact, then creates one open Application opportunity. It returns only a safe accepted reference; it never claims approval or account creation.

## Required Preview-only Vercel variables
- `GHL_PRIVATE_INTEGRATION_TOKEN`
- `GHL_LOCATION_ID`
- `GHL_APPLICATION_PIPELINE_ID`
- `GHL_APPLICATION_PIPELINE_STAGE_ID`
- `GHL_PILOT_TEST_EMAILS` — comma-separated controlled internal test emails
- `GHL_PILOT_TAG` — optional; default `sales-partner-pilot`

Values must be added in Vercel **Preview** only and never committed or shown in chat.

## Safeguards
- server-side credentials only; no client GHL URL, IDs, or tokens
- POST-only, same-origin validation, consent validation, honeypot, bounded attribution
- allowlisted emails only; unconfigured pilot returns `503`; other emails return `403` before any CRM write
- per-process hashed-email/IP rate limit and one-hour process-local idempotency cache
- contact tags: `sales-partner`, `application-pending`, and configured pilot tag
- no payout, approval, referral issuance, commission, Dream Car, or Sub-Sales Partner logic

## Controlled test procedure
1. Confirm location, private-integration authorization, pipeline/stage IDs, sender/workflow, and one test email.
2. Add the variable names above to the existing Vercel project’s **Preview** target only.
3. Deploy only to the established preview target; inspect it reports `target: preview` and `READY`.
4. Submit the allowlisted test email once, with consent, from the preview origin.
5. Verify exactly one GHL contact and one open Application opportunity with the expected tags; submit again and verify no duplicate remote write in the same pilot process.
6. Verify the approved GHL follow-up exactly once and remove/retain the test record under the agreed policy.
7. Record results without credentials or PII.

## Limits and release gates
The idempotency/rate-limit store is process-local: it is sufficient only for a closed pilot and must become durable before public activation. Public activation requires privacy/sender approval, error/retention policy, durable idempotency, confirmed GHL workflow, manual review routing, production-host decision, explicit production authorization, and a Git/Vercel restore point. Financial entitlements remain separate and inactive.

## Rollback / incident
Keep Preview variables unset to disable all writes. If a fault is found, remove Preview variables or redeploy the prior preview commit; do not repoint production aliases. Review GHL records manually, then document deletion/retention according to the approved policy.
