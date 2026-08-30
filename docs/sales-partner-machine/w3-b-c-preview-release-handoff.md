# W3-B and W3-C Preview Release — Operator Handoff

## Status and scope

This packet prepares a separately authorized internal Preview release for:

- **W3-B — Sales Partner Proof Factory**
- **W3-C — E-commerce Product Presentation**

It does not authorize a deployment, Vercel project creation, alias change, public release, Production release, content activation, or modification of the applications. No Preview URL is asserted by this document.

## Core release rule

A requested Vercel target is intent, not evidence. In particular, a new project’s first deployment may be treated as Production even when an operator intends Preview. Do not run a CLI deployment command against a project without verified existing Preview routing and explicit release authorization.

Use an approved Git-backed Preview process or a separately verified provisioning route. If the actual target, project identity, source identity, or rollback posture cannot be proven, stop.

## Authorization and source gates

Before any deployment action, an authorized operator must confirm all of the following outside this repository.

- [ ] Explicit authorization identifies the application, intended Git commit, Vercel project, and Preview-only scope.
- [ ] The application source exists in the intended reviewed branch and contains no unapproved assets, testimonials, logos, outcomes, earnings claims, or public assertions.
- [ ] The intended commit passes the repository and application checks.
- [ ] A restore point for the prior state is recorded and available to the operator.
- [ ] The project’s current deployment history and Preview routing have been independently inspected.
- [ ] The operator has a documented response if Vercel reports Production, an unexpected project, a missing noindex header, or an unexpected source.

If the application is absent from the intended reviewed source, do not substitute code from another branch or local workspace. Reconcile source selection in a separate review change first.

## Preflight: Vercel deployment safety

Before generating any deployment:

1. Inspect the project’s deployment history and identify whether a previously verified Preview deployment exists.
2. Confirm the proposed route cannot create or promote a Production deployment.
3. Confirm the intended Git commit and the deployment source are identical.
4. Confirm no Production alias, custom domain, or public campaign route will be changed.
5. Confirm the app-specific expected project name, title, and noindex posture.
6. If any condition is unknown, do not deploy. Escalate for a dedicated provisioning/release decision.

Do not treat a Vercel CLI argument, a terminal success message, or a generated URL as evidence of actual Preview status.

## Required release evidence

After a separately authorized Preview deployment, collect all evidence below before sharing the URL internally:

| Evidence | Required result |
|---|---|
| Deployment readiness | Vercel reports `READY` |
| Actual target | Vercel reports Preview, not Production |
| Project identity | Vercel reports the expected app-specific project |
| Source identity | Deployment source corresponds to the authorized Git commit |
| HTTP response | HTTP 200 from the exact inspected URL; redirects are rejected or independently verified |
| Page identity | Expected title and correct W3-B or W3-C surface |
| Discoverability | noindex posture is present and verified |
| Functional checks | Application-specific check/build passes; keyboard and focus behavior is exercised for W3-C |
| Rollback | Prior restore point and operator are recorded |

Where available, run the approved read-only Vercel release guardrail against the same URL with the expected target, project, title, and noindex requirement. A passing result is evidence, not authorization.

## Internal evidence record

Record this summary in the approved internal system, never in public source or chat:

| Category | Record only |
|---|---|
| Authorization | approver role, timestamp, Preview-only scope |
| Git | authorized commit reference and source-verification result |
| Vercel | deployment reference, actual target, expected project confirmation |
| Browser | HTTP result, title confirmation, noindex confirmation, app-specific smoke result |
| Rollback | restore-point reference and responsible operator |
| Exceptions | issue category, containment action, next approval required |

Do not record credentials, environment-variable values, personal data, raw headers with sensitive material, or an unapproved URL in this repository.

## Stop conditions and rollback

Stop immediately if Vercel reports Production, an unexpected project, mismatched source, any public alias/domain mutation, missing noindex, a title mismatch, unavailable rollback, or ambiguous deployment history.

Fail closed:

1. Do not share, alias, promote, or reuse the URL.
2. Do not alter Production configuration or aliases to compensate.
3. Remove an unauthorized deployment only through the separately authorized incident process.
4. Restore the approved prior Preview state when applicable.
5. Record the incident category without sensitive values and obtain a new authorization before retrying.

## Handover completion criteria

The next operator can make a go/no-go decision using source identity, actual Vercel metadata, HTTP/title/noindex evidence, and a verified rollback posture. This document deliberately leaves all deployment execution and public release decisions gated.
