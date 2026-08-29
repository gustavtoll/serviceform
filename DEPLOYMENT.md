# Deployment

## Sales Partner signup W4-A automated GHL pilot — August 29, 2026

- Implementation and local contract tests complete; **not deployed, configured, or activated**.
- Existing `serviceform-sales-partner-signup` Vercel project has no configured environment variables; no GoHighLevel request was made.
- Before any Preview deployment: add approved variable names/values to Preview only, use a controlled allowlisted email, inspect `target: preview`, then verify exactly one contact and one opportunity. See `docs/sales-partner-machine/w4-a-ghl-automated-pilot.md`.
- Production alias, public activation, partner approval, referral issuance, financial entitlements, and all payout logic remain out of scope.


## Sales Partner signup W1-A.3 internal review release — August 29, 2026

- Stable internal review alias: https://serviceform-sales-partner-review.vercel.app
- Alias target: https://serviceform-sales-partner-signup-200kxlru5-gustavtolls-projects.vercel.app
- Target environment: Vercel `preview` (`READY`); the alias does not point to a production deployment or production alias.
- DNS/GoHighLevel: not used or modified.
- Internal release guide and feedback template: `docs/sales-partner-machine/w1-a3-internal-review-release.md`.

The alias was assigned only after Vercel inspection confirmed the target is a ready preview deployment. A direct HTTPS request to the alias must return `200` with the expected W1-A.2 title and `X-Robots-Tag: noindex, nofollow` before internal distribution. This is an unlisted review link, not access-controlled security; no Serviceform DNS is needed.

## Sales Partner signup W1-A.2 preview — August 29, 2026

- Branch: `design/sales-partner-signup-cro`
- Commit: `refactor(signup): align CRO preview with Serviceform homepage`
- Preview: https://serviceform-sales-partner-signup-200kxlru5-gustavtolls-projects.vercel.app
- Deployment target: Vercel preview only; no `--prod` flag, production deployment, or alias change was used.

`npm --prefix apps/sales-partner-signup test`, the signup build, root `npm run check`, and `git diff --check` passed before deployment. A direct HTTPS check returned HTTP 200, the title `Start as a Serviceform Sales Partner`, expected hero and CTA content, HTML `noindex,nofollow`, and `X-Robots-Tag: noindex, nofollow`. The preview was visually inspected in the browser at desktop size: near-white canvas, slim espresso header with light action, readable form-first hero, non-interactive original product UI, restrained warm accent, coherent type rhythm, and no observed overlap or clipping. Device-emulated mobile screenshot automation was unavailable in this environment; responsive CSS/static contracts and desktop geometry were verified, but a device-emulated mobile visual pass is not claimed.

W1-A.2 changes presentation only. The form remains a design-only browser-local experience and creates no email, account, CRM/API request, analytics event, workflow, or other external side effect.

Deployment evidence for **The Mira E-commerce Prospecting Playbook**, published 2026-08-27.

## Commands

```bash
npm install
npm run check
gh repo create gustavtoll/serviceform --public --source=. --remote=origin --description "The Mira E-commerce Prospecting Playbook" --push
npx --yes vercel --yes
npx --yes vercel --prod --yes
npx --yes vercel project protection disable serviceform --sso
```

The first `npm run deploy:preview -- --yes` attempt returned `vercel: command not found`; the approved `npx` fallback above succeeded. Because Vercel assigns a new project's first deployment to production, a second `npx --yes vercel --yes` created the true preview before the explicit production deployment.

## Release

- GitHub: https://github.com/gustavtoll/serviceform (public)
- Release commit: `a1239ecad6603847d953b361abec47651903919c`
- Branch: `chore/serviceform-bootstrap`
- Preview: https://serviceform-660m44jkd-gustavtolls-projects.vercel.app
- Production deployment: https://serviceform-i79neqo3f-gustavtolls-projects.vercel.app
- Production alias: https://serviceform-tau.vercel.app

## Verification

Verified independently with `curl --fail --silent --show-error` on 2026-08-27:

| Target | Result | Content check |
| --- | --- | --- |
| GitHub repository | HTTP 200 | GitHub reports `PUBLIC` |
| Preview URL | HTTP 200 | Expected title and hero copy present |
| Production deployment URL | HTTP 200 | Expected title and hero copy present |
| Production alias | HTTP 200 | Expected title and hero copy present |
| Production CSS asset | HTTP 200 | `text/css` |
| Production JavaScript asset | HTTP 200 | `application/javascript` |

Vercel SSO deployment protection was disabled for this public artifact after an initial verification correctly detected login redirects on immutable deployment URLs. Final checks above were performed without authentication or bypass credentials.

---

# Sales Partner Machine — Wave 1

Deployment evidence for W1-A and W1-B, published 2026-08-28 as separate Vercel projects.

## Commands

```bash
npm run check
cd apps/sales-partner-signup
npx --yes vercel --yes
npx --yes vercel --prod --yes
cd ../sales-partner-internal-plan
npx --yes vercel --yes
npx --yes vercel --prod --yes
```

## W1-A — Sales Partner signup

- Preview: https://serviceform-sales-partner-signup-phv1j9f8b-gustavtolls-projects.vercel.app
- Production deployment: https://serviceform-sales-partner-signup-gtl7ilpkp-gustavtolls-projects.vercel.app
- Production alias: https://serviceform-sales-partner-signup.vercel.app

## W1-B — Internal leadership plan

- Preview: https://serviceform-sales-partner-internal-plan-7i53x7663.vercel.app
- Production deployment: https://serviceform-sales-partner-internal-plan-g07d56r77.vercel.app
- Production alias: https://serviceform-sales-partner-internal.vercel.app

## Verification

On 2026-08-28, `curl --fail --silent --show-error` returned HTTP 200 and the expected application title for all six URLs above. The internal plan also returns `X-Robots-Tag: noindex, nofollow`. Vercel SSO deployment protection was disabled for both standalone project artifacts after initial content checks detected Vercel login pages on immutable URLs.

## Brand-kit refresh — August 28, 2026

The production aliases were refreshed after a Serviceform-main-website brand-kit alignment. Reference: `https://www.serviceform.com/?ab_h1=a`; implementation guide: `docs/brand/serviceform-brand-kit.md`.

| Artifact | Preview | Production deployment | Alias |
|---|---|---|---|
| Sales Partner signup | https://serviceform-sales-partner-signup-5fk0mduac-gustavtolls-projects.vercel.app | https://serviceform-sales-partner-signup-lnn26kj2c-gustavtolls-projects.vercel.app | https://serviceform-sales-partner-signup.vercel.app |
| Internal leadership plan | https://serviceform-sales-partner-internal-plan-gz1lg8kce.vercel.app | https://serviceform-sales-partner-internal-plan-p3auzlw2q.vercel.app | https://serviceform-sales-partner-internal.vercel.app |

`npm run check` passed before release. All six updated endpoints returned HTTP 200. The signup production alias was visually inspected in-browser: light product canvas, near-black typography, blue/violet accents, compact rounded navigation and CTA controls, with no visible first-viewport overlap or clipping.

---

# Sales Partner Machine — Wave 2

Deployment evidence for W2-A and W2-B, released on 2026-08-28 as distinct Vercel projects under `gustavtolls-projects`.

## W2-A — Sales Partner resource hub

- Preview: https://serviceform-sales-partner-resource-5kx8wjpnf.vercel.app
- Production deployment: https://serviceform-sales-partner-resource-j8sthq6aw.vercel.app
- Production alias: https://serviceform-sales-partner-resource.vercel.app

## W2-B — E-commerce Sales Partner deck

- Preview: https://serviceform-ecommerce-sales-partner-deck-n9oobcy05.vercel.app
- Production deployment: https://serviceform-ecommerce-sales-partner-deck-g12ela5bs.vercel.app
- Production alias: https://serviceform-ecommerce-sales-partner.vercel.app

## Verification

`npm run check` and `git diff --check` passed before release. On 2026-08-28, all six URLs returned HTTP 200, the expected app title, and `X-Robots-Tag: noindex, nofollow`. Project-level Vercel SSO was disabled after the initial immutable URLs correctly revealed login interception; noindex remains enforced in HTML and hosting headers.

The deck production alias was visually inspected at 1440×900 and 390×844. Its first view showed a light elevated pill header, near-black presentation canvas, blue/violet focal accent, Instrument Sans hierarchy, intact slide controls, and no visible overlap or clipping.

## Mira brand correction — August 28, 2026

The authoritative correction was released from `fix/sales-partner-mira-brand-alignment`, whose parent is the unmerged Wave 2 branch. All four surfaces now use the Mira-referenced warm cream, espresso, orange, and pastel system.

| Artifact | Preview | Production deployment | Alias |
|---|---|---|---|
| Sales Partner signup | https://serviceform-sales-partner-signup-idpzh0rnc-gustavtolls-projects.vercel.app | https://serviceform-sales-partner-signup-ip6adew5a-gustavtolls-projects.vercel.app | https://serviceform-sales-partner-signup.vercel.app |
| Internal leadership plan | https://serviceform-sales-partner-internal-plan-iyxypntq3.vercel.app | https://serviceform-sales-partner-internal-plan-4xq4hnyi5.vercel.app | https://serviceform-sales-partner-internal.vercel.app |
| Sales Partner resource hub | https://serviceform-sales-partner-resource-imm4me5pb.vercel.app | https://serviceform-sales-partner-resource-jyickbjln.vercel.app | https://serviceform-sales-partner-resource.vercel.app |
| E-commerce Sales Partner deck | https://serviceform-ecommerce-sales-partner-deck-nlifq7vlx.vercel.app | https://serviceform-ecommerce-sales-partner-deck-jwvwwsv3e.vercel.app | https://serviceform-ecommerce-sales-partner.vercel.app |

`npm run check`, every app static validation, and `git diff --check` passed. All 12 URLs returned HTTP 200 with the expected titles. Internal plan, resource hub, and deck preview/release/alias endpoints returned `X-Robots-Tag: noindex, nofollow`; the public signup alias intentionally remains indexable. The in-app browser exposed no browser instance, so a production-alias visual viewport inspection could not be completed in this release session.

## Corrected production verification — August 28, 2026

A final header-contrast correction was covered by new static tests: white brand and navigation text must not be overridden by espresso on an espresso header. All four artifacts were redeployed from commit `97ea3dd` and production aliases were reassigned.

| Artifact | Preview | Production deployment | Alias |
|---|---|---|---|
| Sales Partner signup | https://serviceform-sales-partner-signup-148rn5xe9-gustavtolls-projects.vercel.app | https://serviceform-sales-partner-signup-13mkwplsc-gustavtolls-projects.vercel.app | https://serviceform-sales-partner-signup.vercel.app |
| Internal leadership plan | https://serviceform-sales-partner-internal-plan-mo0u5do3w.vercel.app | https://serviceform-sales-partner-internal-plan-frii8ev19.vercel.app | https://serviceform-sales-partner-internal.vercel.app |
| Sales Partner resource hub | https://serviceform-sales-partner-resource-1jf7vgrss.vercel.app | https://serviceform-sales-partner-resource-8fga00mpc.vercel.app | https://serviceform-sales-partner-resource.vercel.app |
| E-commerce Sales Partner deck | https://serviceform-ecommerce-sales-partner-deck-ngjx98tvj.vercel.app | https://serviceform-ecommerce-sales-partner-deck-okd5hzqqy.vercel.app | https://serviceform-ecommerce-sales-partner.vercel.app |

All 12 endpoints above returned HTTP 200 after deployment. The Resource Hub production alias was visually rechecked: its white `serviceform.` brand and navigation are now legible on the espresso header; cream, orange, blush, blue-gray, and sage surfaces are coherent; and no visible clipping, overlap, or touching glyphs appeared in the desktop review.
