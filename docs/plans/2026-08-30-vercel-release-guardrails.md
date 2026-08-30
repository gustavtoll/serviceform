# Vercel Release Guardrails Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a read-only, test-backed verifier that fails closed when a Vercel deployment’s observed target, readiness, HTTP status, page title, or indexing posture does not match the intended release.

**Architecture:** A dependency-free ESM module will normalize Vercel inspect payloads and HTTP observations into deterministic pass/fail evidence. A small CLI will execute only read operations (`vercel inspect` and HTTP GET), print a human-readable report, and exit non-zero on any mismatch. A short operator runbook will make “inspect before sharing or aliasing” the required workflow.

**Tech Stack:** Node.js ESM, `node:test` / `node:assert`, `child_process.execFile`, native `fetch`, Vercel CLI (read-only inspect only).

---

### Task 1: Define verifier behavior with failing tests

**Files:**

- Create: `tests/vercel-release-guardrails.test.mjs`
- Create later: `scripts/vercel-release-guardrails.mjs`

**Step 1: Write the failing test**

Cover four externally observable outcomes:

1. A ready Preview deployment with HTTP 200, expected title, and `X-Robots-Tag: noindex` passes.
2. A Production target fails when Preview is required.
3. A title mismatch fails rather than merely warning.
4. An indexable response fails when noindex is required.

**Step 2: Run test to verify it fails**

Run: `node --test tests/vercel-release-guardrails.test.mjs`

Expected: failure caused by the missing verifier module.

### Task 2: Implement the pure evidence evaluator

**Files:**

- Create: `scripts/vercel-release-guardrails.mjs`
- Test: `tests/vercel-release-guardrails.test.mjs`

**Step 1: Implement only the evaluator needed by Task 1**

Export `evaluateReleaseEvidence({ inspect, http, expected })`.

- Normalize target values from likely Vercel inspect payload fields.
- Require `READY` status, exact requested target, HTTP `200`, expected title substring, and noindex header only when requested.
- Return `{ ok, checks }` rather than throw for policy mismatches, so CLI reporting remains complete.

**Step 2: Run focused tests**

Run: `node --test tests/vercel-release-guardrails.test.mjs`

Expected: all tests pass.

### Task 3: Add a safe CLI wrapper

**Files:**

- Modify: `scripts/vercel-release-guardrails.mjs`
- Modify: `package.json`
- Test: `tests/vercel-release-guardrails.test.mjs`

**Step 1: Write failing CLI-parsing tests**

Add tests that reject missing `--url` / `--target` and accept `--noindex` plus `--title`.

**Step 2: Run test to verify failure**

Run: `node --test tests/vercel-release-guardrails.test.mjs`

Expected: failure because CLI parsing is not implemented.

**Step 3: Implement a read-only command**

Expose `npm run verify:vercel-release -- --url <deployment-or-alias-url> --target preview|production --title <expected-title> [--noindex] [--scope <scope>]`.

The CLI must use only `npx --yes vercel inspect <url> --json` and `fetch(url)`; it must not call `vercel deploy`, `vercel alias`, or any command that changes project state.

**Step 4: Run tests**

Run: `node --test tests/vercel-release-guardrails.test.mjs`

Expected: all tests pass.

### Task 4: Publish an operator runbook

**Files:**

- Create: `docs/sales-partner-machine/vercel-release-guardrails.md`
- Modify: `docs/sales-partner-machine/README.md`

Document exact preflight/release commands, expected evidence, mismatch containment, and the fact that a correct URL does not itself authorize a release. Include the W3-A incident lesson: a requested Preview target must never be assumed from the CLI command; the returned target must be inspected before sharing or adding aliases.

### Task 5: Verify and review

**Files:**

- Verify: `package.json`, `scripts/vercel-release-guardrails.mjs`, `tests/vercel-release-guardrails.test.mjs`, runbook and index.

**Step 1: Run focused verifier tests**

Run: `node --test tests/vercel-release-guardrails.test.mjs`

**Step 2: Run full repository check**

Run: `npm run check`

**Step 3: Check patch hygiene**

Run: `git diff --check`

**Step 4: Create a reviewable commit and PR**

Do not merge or deploy. Record the branch, test evidence, and the explicit non-deployment boundary in the PR body.
