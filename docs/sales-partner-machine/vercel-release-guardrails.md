# Vercel release guardrails

## Purpose

This is a **read-only release-evidence gate** for Serviceform artifacts. It checks the deployment target Vercel actually created—not the target that was requested on the command line—before a URL is shared, added as an alias, recorded as released, or promoted in an internal review.

It runs only:

- `npx --yes vercel inspect <url> --json`
- an HTTPS `GET` to the supplied URL

It does **not** deploy, alias, promote, configure a project, change environment variables, or call CRM services.

## Why this is required

A Wave 3 Preview request was previously returned by Vercel as a Production deployment. The requested command is not evidence of its actual target. This verifier fails closed on a target mismatch so containment happens before the URL is shared or an alias is assigned.

## Command

```bash
npm run verify:vercel-release -- \
  --url https://your-deployment-or-alias.vercel.app \
  --target preview \
  --project sales-partner-signup \
  --title "Expected page title" \
  --noindex \
  --scope gustavtolls-projects
```

### Options

| Option | Required | Meaning |
|---|---:|---|
| `--url` | Yes | Public HTTPS deployment or alias URL to inspect and fetch; embedded credentials and private IP literals are rejected. |
| `--target` | Yes | Exact expected Vercel target: `preview` or `production`. |
| `--project` | Yes | Exact Vercel project name reported by `vercel inspect --json`. |
| `--title` | No | Required substring in the returned HTML `<title>`. |
| `--noindex` | No | Requires `X-Robots-Tag` to include `noindex`. |
| `--scope` | No | Vercel team scope, normally `gustavtolls-projects`. |

## Passing evidence

A pass requires every requested check to succeed:

1. Vercel inspection reports `READY`.
2. Vercel’s **actual** target exactly matches `--target`.
3. Vercel’s reported project name exactly matches `--project`.
4. The same URL returns HTTP `200` with redirects rejected.
5. The document title contains `--title`, when provided.
6. `X-Robots-Tag` includes `noindex`, when `--noindex` is required.

## Failure containment

If any check fails:

1. **Do not share the URL.**
2. **Do not add or change an alias.**
3. **Do not write a deployment-success record.**
4. Inspect the returned target and Vercel project linkage.
5. If Production was created without production authorization, remove/contain it only under the applicable incident and release authorization.
6. Record the observed deployment ID, target, and remediation in `DEPLOYMENT.md` before retrying.

A passing technical check does not grant release authorization. Claims approval, asset rights, privacy/CRM gates, production authorization, and rollback planning remain separate controls.

## Examples

### Internal Preview-only artifact

```bash
npm run verify:vercel-release -- \
  --url https://internal-review.vercel.app \
  --target preview \
  --project sales-partner-signup \
  --title "Serviceform Sales Partner" \
  --noindex \
  --scope gustavtolls-projects
```

### Authorized production artifact

```bash
npm run verify:vercel-release -- \
  --url https://opportunity-calculator-three.vercel.app \
  --target production \
  --project opportunity-calculator \
  --title "Illustrative Opportunity Calculator" \
  --noindex \
  --scope gustavtolls-projects
```
