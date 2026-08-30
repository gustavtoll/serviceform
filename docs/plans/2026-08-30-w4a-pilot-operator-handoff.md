# Wave 4-A Pilot Operator Handoff Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Package the inactive server-owned GoHighLevel pilot for a secure, controlled Preview-only verification without storing, activating, or exposing CRM configuration.

**Architecture:** Add a documentation-only operator packet alongside the existing pilot contract and runbook. It references configuration categories—not values—and creates a reproducible evidence and rollback record for a separately authorized operator.

**Tech Stack:** Markdown, existing Vercel Preview deployment process, GoHighLevel private integration, repository static checks.

---

### Task 1: Map the existing contract to operator gates

**Files:**
- Read: `docs/sales-partner-machine/w4-a-ghl-automated-pilot.md`
- Read: `docs/sales-partner-machine/go-high-level-contract.md`
- Create: `docs/sales-partner-machine/w4-a-ghl-pilot-operator-handoff.md`

**Step 1:** State the non-activation boundary and list the external approvals that must exist before configuration.

**Step 2:** Separate Preview-only setup from Production and public-launch decisions.

**Step 3:** Specify evidence categories without including credentials, personal data, endpoint values, or CRM identifiers.

### Task 2: Add controlled verification and rollback records

**Files:**
- Modify: `docs/sales-partner-machine/w4-a-ghl-pilot-operator-handoff.md`

**Step 1:** Define a one-contact, one-opportunity controlled test and duplicate-submission check.

**Step 2:** Define the allowed evidence record and prohibited data.

**Step 3:** Define fail-closed/rollback actions that keep Production untouched.

### Task 3: Validate and package a review PR

**Files:**
- Verify: `docs/plans/2026-08-30-w4a-pilot-operator-handoff.md`
- Verify: `docs/sales-partner-machine/w4-a-ghl-pilot-operator-handoff.md`

**Step 1:** Scan added text for secrets, tokens, endpoints, IDs, email addresses, and placeholder values.

**Step 2:** Run `npm run check` and `git diff --check`.

**Step 3:** Commit only the handoff artifacts and open a PR against `feature/sales-partner-ghl-pilot`; do not merge, deploy, configure Vercel, or call GoHighLevel.
