# Deployment

Deployment evidence for **The Mira E-commerce Prospecting Playbook** brand refresh, published 2026-08-28.

## Commands

```bash
npm install
npm run check
npx --yes vercel --yes --scope gustavtolls-projects
npx --yes vercel --prod --yes --scope gustavtolls-projects
```

The first unscoped preview attempt returned `Error: Not authorized`. `npx --yes vercel whoami` and `vercel project inspect serviceform` confirmed the existing account and linked project. Repeating the deployment with the project's existing `gustavtolls-projects` scope succeeded; no credentials, project routing, or protection settings were changed.

## Release

- GitHub: https://github.com/gustavtoll/serviceform (public)
- Deployed source commit: `a54259e5ce7d68f44e658879a0af400ab2e74f53`
- Branch: `refactor/serviceform-brand-refresh`
- Preview: https://serviceform-p3mwafiqw-gustavtolls-projects.vercel.app
- Preview inspection: https://vercel.com/gustavtolls-projects/serviceform/5BgkcAJ43xvkVGuWtWhwBX91Rq2D
- Production deployment: https://serviceform-1r9mbxucd-gustavtolls-projects.vercel.app
- Production inspection: https://vercel.com/gustavtolls-projects/serviceform/D4YRoqJDNXhRvuyK9WJr3bvndGwj
- Production alias: https://serviceform-tau.vercel.app

## Verification

Verified independently with `curl --location --fail --silent --show-error` on 2026-08-28:

| Target | Result | Content check |
| --- | --- | --- |
| Preview URL | HTTP 200 | Expected title and hero copy present |
| Production deployment URL | HTTP 200 | Expected title and hero copy present |
| Production alias | HTTP 200 | Expected title and hero copy present |
| CSS assets on all three targets | HTTP 200 | `text/css; charset=utf-8` |

`npm run check` completed successfully with Vite 8.2.2: 5 modules transformed and production assets emitted. Local HTTP verification also returned 200 and confirmed the expected hero content, one H1, one skip link, six sections, ARIA labels, and two responsive breakpoints.
