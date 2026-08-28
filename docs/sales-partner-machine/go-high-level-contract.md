# GoHighLevel Integration Contract — Wave 0

## Boundary
This document specifies a future integration. It does **not** inspect, create, duplicate, or activate GoHighLevel workflows. GoHighLevel location access is a later gate.

## Intake contract
The Sales Partner application page will submit server-side to a protected endpoint. Browser code must never expose a GoHighLevel credential.

### Required fields
`first_name`, `last_name`, `email`, `company`, `website_or_social_url`, `partner_type`, `market`, `audience_or_client_count`, `primary_promotion_method`, `terms_consent`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referral_code`, `parent_sales_partner_id`.

### Contact and opportunity lifecycle

1. Upsert the contact by email.
2. Tag `sales-partner` and `application-pending`.
3. Store source/UTM, Partner Type, referral and parent identifiers.
4. Create an Applications pipeline opportunity with owner and review SLA.
5. On approval, apply `approved` and track-specific tags, issue the onboarding sequence, and create a unique referral identifier.
6. On rejection or duplicate, retain an auditable outcome without restarting onboarding.

## Required entities and fields

| Entity | Minimum fields |
|---|---|
| Sales Partner | ID, type, status, referral code, parent ID, payout plan, territory, approval date |
| Referred opportunity | referral code, first click time, 90-day expiry, existing-account check, meeting and owner |
| Customer contract | signed date, billed MRR, active/churned status, responsible Sales Partner |
| Network relationship | parent Sales Partner, Sub-Sales Partner, 10% base, start/end date |

## Attribution rules
- First valid tracked click creates a 90-day credit window.
- Referral code is stored independently of UTMs.
- Existing account, duplicate contact, territory dispute, and manual-assist exceptions require an auditable review state.
- Customer churn changes active MRR and the Dream Car eligibility count; the exact commission clawback/grace policy remains gated.

## Approval gates
Before implementation: location ID, API/auth method, pipeline IDs, custom-field IDs, permitted webhooks, sender identity, privacy/unsubscribe policy, calendar handoff URL, and a non-production test contact.

## Acceptance tests for the later implementation
- A test application creates exactly one tagged contact and one Application opportunity.
- Re-submission does not duplicate contacts/opportunities.
- UTM, referral, parent, and Partner Type fields persist.
- A 90-day expiry is computed consistently.
- PII, API tokens, and internal pipeline IDs do not reach the client bundle.