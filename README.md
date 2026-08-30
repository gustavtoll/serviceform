# Serviceform

A prospecting and outbound-sales project for **Mira AI Agent**, focused on US e-commerce merchants where guided product discovery and support automation can improve conversion.

## First deliverable

A live presentation: **The Mira E-commerce Prospecting Playbook**. It defines target verticals, prospect signals, qualification criteria, and outreach angles for car parts, supplements, florists, fishing/specialty leisure, and furniture.

## Run locally

```bash
npm install
npm run dev
```

Validate a production build with `npm run check`.

## Release safety

There are intentionally **no root deployment shortcuts**. A requested Vercel target is not evidence of its actual target, particularly on a project’s first deployment. Release authorization, app-specific deployment, and post-deployment evidence are separate controls.

Before sharing, aliasing, or recording any Vercel URL, run the [release guardrail](./docs/sales-partner-machine/vercel-release-guardrails.md):

```bash
npm run verify:vercel-release -- \
  --url https://your-deployment-or-alias.vercel.app \
  --target preview \
  --title "Expected page title" \
  --noindex \
  --scope gustavtolls-projects
```

A passing technical check does not itself authorize release, CRM activity, public claims, or production publication. Deployment URLs and verified evidence are recorded in [`DEPLOYMENT.md`](./DEPLOYMENT.md).
