# Sales Partner Machine — Wave 3 implementation plan

## Authorized scope

Wave 3 adds three independent static Vite preview applications: W3-A opportunity calculator, W3-B proof/asset approval readiness factory, and W3-C interactive e-commerce product presentation. Each app owns its package, semantic HTML, CSS, vanilla JavaScript, static validation, and noindex Vercel configuration.

## Source handling

The program charter, claims/source register, Wave 0 handoff, brand kit, and Sales Partner Machine README govern copy and behavior. `Assets/Opportunity Calculator.png` informed W3-A assumptions only; it remains untracked and is neither copied nor committed. The existing e-commerce Sales Partner deck informed implementation conventions, not protected copy or imagery.

## Calculator formula

`monthly opportunity = monthly site traffic × interaction rate × lead rate × average revenue per sale × closing rate`

Derived values are chats = traffic × interaction rate; leads = chats × lead rate; potential created = leads × average revenue per sale; monthly opportunity = potential created × closing rate. The low source scenario is 400,000 / 7% / 5% / $300 / 5%; the high source scenario is 400,000 / 10% / 15% / $300 / 10%. Outputs are illustrative assumptions, not evidence, forecasts, Sales Partner earnings, commission calculations, or guarantees.

## Safety boundaries

- Preview/internal only with `noindex,nofollow` in HTML and `X-Robots-Tag` at hosting.
- No secrets, analytics, cookies, remote calls, CRM/GoHighLevel, email, accounts, payments, workflows, or stored customer data.
- No real customer proof, identities, logos, quotes, screenshots, unapproved metrics, medical claims, or unsupported performance language.
- No payout, contest, legal, calendar, public-claim, alias, or production activation.
- W3-B begins and remains at zero approved assets; local UI state does not authorize publication.

## Strict TDD and verification

Each app follows its own tracer cycle: add static test, capture the expected missing-production-file failure, implement the minimum production surface, then pass `npm run check`. After root integration, run every app check through root `npm run check`, plus `git diff --check`. Preview deployments must independently prove Vercel preview target, HTTP 200, expected title, and noindex response header before a URL enters the register.

## No-production constraint

Wave 3 permits separate Vercel Preview deployments only. Never use `--prod`, assign production aliases, merge PR #3, or substitute a production release when preview proof fails. Publication remains gated by separate authorization.
