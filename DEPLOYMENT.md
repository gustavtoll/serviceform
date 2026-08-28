# Deployment

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
