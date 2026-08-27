# Wave 1 — Serviceform presentation launch

## Objective
Build and deploy the initial public Serviceform presentation: **The Mira E-commerce Prospecting Playbook**.

### Stream W1-P1 — Build, verify, publish the presentation
**Status:** UNGATED — implementation and deployment
**Owner:** Codex
**Effort:** M

```text
You own the complete first public artifact for the Serviceform repository at /Users/gustavtoll/dev/serviceform.

Read AGENTS.md and PRESENTATION_BRIEF.md. On the existing chore/serviceform-bootstrap branch:
1. Create a polished, responsive Vite-powered single-page presentation in index.html, using the brief as the source of truth.
2. Install dependencies with npm; run npm run check and resolve all build failures.
3. Update README.md if needed and write DEPLOYMENT.md with exact commands and final GitHub/Vercel URLs once known.
4. Commit all deliberate files using a conventional commit and push the branch to GitHub. Create a GitHub repository under the authenticated user if no origin exists; prefer a public repo named serviceform.
5. Deploy a preview/test environment with Vercel, then deploy production with Vercel. If Vercel CLI is missing, install/use it via npx. Do not expose credentials. Record both returned deployment URLs in DEPLOYMENT.md.
6. Verify both URLs return HTTP 200 using curl. Report the commit SHA, GitHub repo URL, preview URL, production URL, tests/build result, and any blockers.

Do not ask for more design direction. Make reasonable high-quality defaults. Do not claim a deployment succeeded without live URL verification.
```
