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
