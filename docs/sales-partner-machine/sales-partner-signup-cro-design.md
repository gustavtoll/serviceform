# Sales Partner signup CRO design

Status: design-only preview. No live account creation, email delivery, CRM write, workflow activation, or production deployment is authorized by this work.

Visual-parity implementation plan: [`docs/plans/2026-08-28-sales-partner-signup-serviceform-parity.md`](../plans/2026-08-28-sales-partner-signup-serviceform-parity.md).

## Friction audit

### Before

- The first meaningful action asked visitors to choose a track before beginning.
- Account interest required 9+ profile, qualification, URL, radio, textarea, and consent inputs.
- The primary CTA described an application submission rather than the visitor's intended outcome.
- Program governance and qualification detail competed with the initial conversion decision.
- The local-only behavior was accurate but the interaction still resembled a completed CRM application.

### After

- One required email field is the sole primary form control and appears above the fold.
- The CTA communicates the intended outcome: “Create my Sales Partner account.”
- “Less than a minute,” “No payment details,” the next step, and a concise privacy reassurance sit next to the action.
- The confirmation previews a ready account-setup experience while stating that no email was sent and no account was created.
- Program inputs remain available below the form, with their pending-terms status stated once in a compact terms section.

## Applied CRO decisions

- Email-first entry removes premature qualification and profile work.
- A singular orange primary action dominates the hero; the header and closing CTA repeat the same path through anchors.
- A persistent label, realistic placeholder, inline live error, valid state, visible focus treatment, and 44px-plus controls reduce interaction uncertainty.
- Immediate expectation setting explains both the eventual next step and the current preview limitation.
- Mobile collapses to one column, keeps the form early, and preserves comfortable touch targets.
- The page keeps semantic landmarks, a skip link, keyboard focus, reduced-motion handling, and noindex controls.
- UTM and referral parameters may be retained only inside the local preview envelope; they are not visible fields and are not transmitted.

## Copy boundaries

Approved program inputs retained with terms qualification:

- 40% lifetime commission.
- 90-day first-click crediting.
- 10% Sub-Sales Partner kickback.
- Dream Car lease continuity at 100 active deals.

Assumptions used for this preview:

- Completing one email field takes less than a minute.
- No payment details are collected because the form contains only an email field.
- The future workflow is described as account setup, not as an already active account or approved program membership.

No conversion metrics, named proof, customers, logos, testimonials, pricing, payout mechanics, contest mechanics, privacy-policy promises, or guaranteed outcomes were added.

## Current no-GHL behavior

Submission performs only client-side email validation, normalizes the email, captures supported attribution query values, and saves an email-only preview envelope to browser local storage. The success panel explicitly says no email was sent and no account was created. The client contains no endpoint, credential, request, webhook, or external CRM mutation.

## Future GHL API handoff contract

This is an implementation contract for a separately authorized wave, not active behavior.

### Action and payload

- A server-owned action accepts one required `email` value; the browser must never receive CRM credentials.
- The server validates and normalizes email, applies rate limiting and abuse controls, and uses an idempotency key derived without exposing sensitive data.
- Approved attribution values may be attached only after their field mapping, retention, consent, and privacy treatment are confirmed.
- The action creates or reconciles the intended Sales Partner record and returns a minimal outcome; it must not expose internal CRM data.

### Events to instrument later

- `sales_partner_signup_viewed`
- `sales_partner_signup_started`
- `sales_partner_signup_validation_failed`
- `sales_partner_signup_requested`
- `sales_partner_signup_succeeded`
- `sales_partner_signup_failed`
- `sales_partner_next_step_email_requested`

Analytics must not be added until the provider, consent basis, payload, and retention rules are approved. Event properties should avoid raw email addresses.

### Required success behavior

- Show a clear, accessible confirmation only after the server confirms the intended record outcome.
- State what email will arrive, its sender identity, and the expected timing only after those details are operationally approved.
- Handle idempotent repeat submissions as a safe success or a clear “check your inbox” state without disclosing whether an unrelated email exists.
- Keep keyboard focus on the confirmation and offer a recovery path if the next-step email does not arrive.

### Required failure behavior

- Keep the entered email available for correction without persisting it unnecessarily.
- Announce an actionable inline error and preserve keyboard focus context.
- Distinguish validation errors from temporary service failures without exposing vendor or infrastructure details.
- Never show the success state on a timeout or unknown result; provide a safe retry with duplicate protection.

## A/B hypotheses

- Outcome CTA (“Create my Sales Partner account”) versus lower-commitment CTA (“Start my Sales Partner setup”) may change qualified completion intent.
- A concise commission cue in the hero versus keeping all program inputs below the fold may change form starts without compromising terms clarity.
- “Work email address” versus “Best email address” may affect completion among independent operators without business domains.
- Reassurance chips above versus below the form may change confidence and time to first interaction.
- A short three-step preview beside the form versus below it may improve expectation clarity on wider screens.

Any experiment requires an approved analytics plan and must report observed results rather than projected conversion claims.
