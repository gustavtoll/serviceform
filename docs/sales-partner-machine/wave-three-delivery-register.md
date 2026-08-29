# Sales Partner Machine — Wave 0–3 delivery register

Status checked 29 August 2026. A URL appears only where repository deployment evidence verifies it. `Not deployed` means this wave has no verified review deployment yet. “Published” describes an existing delivery endpoint, not approval of claims or a Wave 3 production authorization.

## Implemented preview-only or internal-ready

| ID | Wave | Asset / delivery | Purpose | State | Review URL / source path | Remaining task / gate | Publication status |
|---|---|---|---|---|---|---|---|
| W0-A | 0 | Program charter | Govern vocabulary, economics, tracks, and unresolved terms | Internal-ready | `docs/sales-partner-machine/program-charter.md` | Leadership/legal must resolve defined terms before public launch | Internal document only |
| W0-B | 0 | Claims and source register | Separate source material from publishable claims | Internal-ready | `docs/sales-partner-machine/claims-and-source-register.md` | Rights and leadership/legal approval per claim | Internal document only |
| W0-C | 0 | GoHighLevel contract | Specify later CRM integration boundary | Internal-ready; inactive | `docs/sales-partner-machine/go-high-level-contract.md` | Location/access, authorization, implementation, and acceptance | Not activated |
| W0-D | 0 | Wave 0 implementation plan and PAM handoff | Establish program architecture and handoff | Internal-ready | `docs/plans/2026-08-27-sales-partner-machine-wave-zero.md`; `_bmad-output/strategy/pam-handoff-v1-sales-partner-machine.md` | Future-wave decisions remain gated | Internal document only |
| W1-A | 1 | Sales Partner signup | Application experience | Implemented; current internal review release is noindex and local-only | https://serviceform-sales-partner-review.vercel.app | Approve content/integration; separately authorize CRM and production | Preview-only review alias; no production activation by W1-A.3 |
| W1-B | 1 | Internal leadership plan | Leadership alignment presentation | Implemented | https://serviceform-sales-partner-internal.vercel.app | Leadership decisions and any later refresh | Existing published internal artifact; not Wave 3 deployment |
| W1-A.2 | 1 | Signup CRO design and parity artifacts | Define and implement product-led signup preview | Internal-ready / implemented | `docs/sales-partner-machine/sales-partner-signup-cro-design.md`; `docs/plans/2026-08-28-sales-partner-signup-serviceform-parity.md`; `apps/sales-partner-signup` | Content approval and integration authority | Preview-only implementation |
| W1-A.3 | 1 | Internal review release package | Structured internal review and feedback handoff | Internal-ready | `docs/sales-partner-machine/w1-a3-internal-review-release.md` | Internal review, approval, then separately authorized next wave | Noindex internal review only |
| W2-A | 2 | Sales Partner resource hub | Enablement guidance and scripts | Implemented | https://serviceform-sales-partner-resource.vercel.app | Publication/content governance continues | Existing published enablement artifact; no new Wave 3 action |
| W2-B | 2 | E-commerce Sales Partner deck | Source-safe first-call story | Implemented | https://serviceform-ecommerce-sales-partner.vercel.app | Publication/content governance continues | Existing published enablement artifact; no new Wave 3 action |
| W3-A | 3 | Opportunity calculator | Transparent editable illustrative opportunity model | Implemented; preview deployment blocked and contained | Not deployed | Vercel returned `target: production` despite explicit preview target; automatic aliases and deployment were removed; separately authorize remediation before retry | Not accepted as published; no Wave 3 production endpoint remains |
| W3-B | 3 | Proof/asset approval factory | Prepare asset intake, evidence, rights, and approval records | Internal-ready; zero approved assets; deployment not attempted | Not deployed | Resolve new-project preview-only deployment method; then verify preview and obtain approvals before any asset publication | Not published; internal preview only |
| W3-C | 3 | E-commerce product presentation | Explain a general source-safe shopper journey | Implemented; deployment not attempted | Not deployed | Resolve new-project preview-only deployment method; then verify preview and complete internal content review | Not published; preview-only authorized |

## Planned or gated deliveries

| ID | Wave | Asset / delivery | Purpose | State | Review URL / source path | Remaining task / gate | Publication status |
|---|---|---|---|---|---|---|---|
| W1-C | 1 | CRM-connected application processing | Persist and route applications | Planned / gated | `docs/sales-partner-machine/go-high-level-contract.md` | Explicit CRM wave, supplied location/access, consent and failure acceptance | Not activated |
| W2-C | 2 | Outbound campaign execution | Put enablement into controlled use | Planned / gated | `docs/plans/2026-08-28-sales-partner-machine-wave-two.md` | Audience, owners, approved claims, systems, and launch authority | Not published |
| W3-D | 3 | Approved customer proof library | Supply publishable proof to Sales Partners | Blocked dependency | `docs/sales-partner-machine/claims-and-source-register.md` | Source files, rights owners, exact wording, channels, dates, and legal/leadership approval | No approved assets; not published |
| W3-E | 3 | Public release or production aliases for Wave 3 | Make tools publicly discoverable | Out of scope / gated | Not deployed | Separate authorization, review, terms, and production wave | Not published |

## Blocked program dependencies

| ID | Wave | Asset / delivery | Purpose | State | Review URL / source path | Remaining task / gate | Publication status |
|---|---|---|---|---|---|---|---|
| DEP-1 | 0–4 | Approved program terms | Govern lifetime commission, attribution, kickback, and active-deal treatment | Blocked pending executed terms | `docs/sales-partner-machine/program-charter.md` | Leadership/legal definitions and executed agreement | Not published by this wave |
| DEP-2 | 0–4 | Dream Car rules | Govern lease continuity and eligibility | Blocked pending rules and authorization | `docs/sales-partner-machine/program-charter.md` | Markets, verification, tax/benefit, churn/pause, and competition authority | Not activated |
| DEP-3 | 0–4 | Customer rights and proof approvals | Permit named proof | Blocked; none verified | `docs/sales-partner-machine/claims-and-source-register.md` | Evidence, rights, wording, approver, channel, market, date, and expiry | Nothing publishable |
| DEP-4 | 0–4 | GoHighLevel access and workflow authorization | Enable application, attribution, and lifecycle operations | Blocked / deferred | `docs/sales-partner-machine/go-high-level-contract.md` | Location supplied by Gustav plus separate implementation authority | Not activated |
