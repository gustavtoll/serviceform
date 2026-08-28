# PAM Handoff — Sales Partner Machine

## Status
Wave 0 foundation is documented. This handoff authorizes **planning and implementation preparation only**; it does not authorize GoHighLevel mutation, email sends, payout processing, contest activation, public claim publication, or Vercel deployment.

## Shared constraints
- Use **Sales Partner** throughout all new artifacts.
- 40% lifetime commission, 90-day first-click attribution, 100 active deals for Dream Car lease continuity, and 10% Sub-Sales Partner kickback are program inputs.
- Any exact definition of active deal, commission base, tax, or contest rule is a leadership/legal gate.
- Numerical proof and customer testimonials require publication approval.
- Existing calendar is deferred; GoHighLevel location details arrive later by text.

## Wave 1 streams

| Stream | Scope | Dependency | Completion standard |
|---|---|---|---|
| W1-A Signup | Sales Partner acquisition page + server-side GHL intake adapter | GHL location/API contract | staged submission, UTM/referral persistence, no browser secret |
| W1-B Leadership | internal online program presentation | approved charter | decision gates visible; leadership-ready narrative |
| W2-A Enablement | resource hub, scripts, ICP guides, campaign assets | claims register | independent/creator/agency paths and approved copy |
| W2-B Selling deck | interactive e-commerce Sales Partner deck | approved proof and demo review | native content with live-demo fallback |
| W3-A Calculator | transparent estimate tool | screenshot-confirmed formula spec | low/medium/high scenarios and calculation tests |
| W3-B Proof | testimonials and English asset toolkit | approved source rights | attribution/approval record per asset |
| W3-C Product deck | interactive Canva-derived e-commerce presentation | source/asset rights | usable to present and learn selling points |

## Repository map
Future artifacts should be isolated under `apps/` with independent Vercel projects: `sales-partner-signup`, `sales-partner-internal-plan`, `sales-partner-resource-hub`, `ecommerce-sales-partner-deck`, `opportunity-calculator`, `sales-partner-testimonials`, and `ecommerce-product-presentation`.

## Required final verification per public app
`npm run check`; Git commit on typed branch; Vercel preview and production aliases return HTTP 200 at `/`; rendered browser check; source/claims review; no client secret exposure.