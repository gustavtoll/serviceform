# W3-B/W3-C Preview Release Handoff Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Provide a fail-closed, reviewable release packet for the W3-B Proof Factory and W3-C Product Presentation without deploying either application.

**Architecture:** Add a documentation-only handoff that binds intended source, authorization, Vercel target verification, HTTP evidence, noindex posture, and rollback evidence. The packet treats requested deployment flags as untrusted intent and rejects any uncertain first-deployment route.

**Tech Stack:** Markdown, Git commit identity, Vercel deployment metadata, approved read-only release verification tooling.

---

### Task 1: Define source and authorization gates

**Files:**
- Read: `docs/sales-partner-machine/wave-three-delivery-register.md`
- Read: `docs/sales-partner-machine/vercel-release-guardrails.md`
- Create: `docs/sales-partner-machine/w3-b-c-preview-release-handoff.md`

**Step 1:** Distinguish source readiness from deployment authorization.

**Step 2:** Require the intended Git source, application identity, and successful build/check evidence.

**Step 3:** Block any undocumented new-project or ambiguous-target deployment route.

### Task 2: Define Preview evidence and failure containment

**Files:**
- Modify: `docs/sales-partner-machine/w3-b-c-preview-release-handoff.md`

**Step 1:** Specify actual target, project identity, HTTP, title, noindex, source, and rollback evidence.

**Step 2:** Create a safe out-of-band evidence record template with no secrets or personal data.

**Step 3:** Define stop/rollback conditions that forbid production aliases and public promotion.

### Task 3: Validate and package review PR

**Files:**
- Verify: `docs/plans/2026-08-30-w3-b-c-preview-release-handoff.md`
- Verify: `docs/sales-partner-machine/w3-b-c-preview-release-handoff.md`

**Step 1:** Scan added content for credentials, live endpoints, email addresses, long token-shaped strings, and redaction placeholders.

**Step 2:** Run `npm run check` and `git diff --check`.

**Step 3:** Commit only the two handoff artifacts and open a PR against the consolidated Wave 1–3 review branch. Do not deploy, alias, merge, or alter Vercel configuration.
