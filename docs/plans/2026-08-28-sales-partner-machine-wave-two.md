# Sales Partner Machine Wave 2 plan

Date: 28 August 2026
Branch: `feature/sales-partner-wave-two`

## Outcome

Wave 2 delivers two independent, static enablement applications grounded in the permanent source PDFs and governed by the Wave 0 charter and claims register.

| Stream | Status | Deliverable |
|---|---|---|
| W2-A Enablement | **Implemented** | Private Sales Partner resource hub with activation, track, ICP, script, qualification, source, network, pilot, FAQ, and terms-safety guidance |
| W2-B Selling deck | **Implemented** | Interactive e-commerce Sales Partner presentation with general vertical scenarios, first-call discovery, keyboard navigation, and explicit claims safety |
| W3-A Calculator | Gated | Formula and assumptions require a separately authorized Wave 3; all outputs must be illustrative |
| W3-B Proof | Gated | Customer rights, approved wording, and publication evidence required |
| W3-C Product deck | Gated | Product/source rights and a separately approved implementation wave required |
| GoHighLevel activation | Gated | Location/auth, data contract, terms, privacy, workflow, calendar, and sender approvals required |

## Build decisions

- Both apps follow `docs/brand/serviceform-brand-kit.md`: light product canvas, near-black ink, restrained blue/violet accents, pill controls, rounded product cards, Instrument Sans and DM Mono.
- Both are static demonstrations with no login, form submission, CRM, calendar, tracking engine, or external data collection.
- Both carry HTML `noindex,nofollow` and hosting-level `X-Robots-Tag` headers.
- W2-B uses semantic sections, headings, landmarks, live slide count, buttons, and keyboard navigation (`Arrow`, `Page`, `Home`, `End`, and Space).
- Responsive layouts collapse below 900px/560px, preserve 44px controls, expose visible focus, and respect reduced motion.

## Program-input handling

The following are retained as inputs rather than complete or signed terms:

- 40% lifetime commission.
- 90-day first-click cookie/crediting.
- Dream Car lease continuity at 100 active deals.
- 10% Sub-Sales Partner kickback.

The apps explicitly gate definitions, eligibility, commission and kickback bases, payout cadence, refunds, taxes, active-deal rules, competition mechanics, and termination.

## Claims and sources

Factual grounding is limited to the permanent PDFs under `Assets/`, the Wave 0 program documents, and the Serviceform brand kit. The implementation uses the source-backed capability story—guided product discovery, specialized category guidance, common support flows, smart prompts, and journey learning—plus general ICP situations. It excludes numerical results, customer names, customer proof, quotes, logos, and testimonials. Supplement scenarios prohibit medical, diagnostic, and treatment language.

No extracted source text is committed and `Assets/` remains unstaged.

## Release sequence

1. Run independent static validation and builds for W2-A and W2-B.
2. Run root `npm run check` and `git diff --check`.
3. Link each app to a distinct Vercel project under `gustavtolls-projects`.
4. Deploy a preview and an explicit production release for each.
5. Verify HTTP 200, expected content, and `X-Robots-Tag` on every URL.
6. Visually inspect the public presentation first view at desktop and mobile widths.
7. Record immutable and alias URLs in `DEPLOYMENT.md`, commit with conventional metadata, and push the feature branch for merge review. Do not merge.
