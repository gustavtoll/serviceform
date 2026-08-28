# Sales Partner Machine Wave 0 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish the approved program rules, source control, CRM data contract, and implementation handoff required to build Serviceform’s Sales Partner Machine safely.

**Architecture:** Planning-only documentation is added under `docs/` and `_bmad-output/`. No runtime code, production pages, GoHighLevel workflow, customer data, payout, or contest automation is changed in this wave. Future public artifacts are separate Vercel projects inside the existing repository.

**Tech Stack:** Markdown, GitHub, Vercel static sites (future), GoHighLevel API/workflows (future and gated).

---

### Task 1: Establish controlled terminology and program economics

**Files:**
- Create: `docs/sales-partner-machine/program-charter.md`
- Create: `docs/sales-partner-machine/README.md`
- Modify: `AGENTS.md`

**Step 1:** Write the charter using Sales Partner terminology only.

**Step 2:** Record 40% lifetime commission, 90-day first-click attribution, 100-active-deal Dream Car lease requirement, and 10% Sub-Sales Partner kickback.

**Step 3:** Mark unresolved legal/operational definitions as gates rather than inventing terms.

**Step 4:** Verify permanent source citations name original PDF paths and pages.

**Step 5:** Commit with the Wave 0 artifact set.

### Task 2: Define the GoHighLevel integration contract

**Files:**
- Create: `docs/sales-partner-machine/go-high-level-contract.md`

**Step 1:** Specify intake fields, tags, pipelines, contact lifecycle, referral and parent identifiers.

**Step 2:** Specify test cases before any endpoint implementation.

**Step 3:** Explicitly defer access, location configuration, calendar wiring, sender configuration, and workflow activation until separately authorized.

**Step 4:** Check that no credential, location ID, or private URL appears in the document.

### Task 3: Control claims and prepare implementation streams

**Files:**
- Create: `docs/sales-partner-machine/claims-and-source-register.md`
- Create: `_bmad-output/strategy/pam-handoff-v1-sales-partner-machine.md`
- Create: `_bmad-output/strategy/wave-1-launch-prompts-2026-08-27.md`

**Step 1:** Classify every numerical or customer proof point as approval-required.

**Step 2:** Define separate implementation streams for signup, leadership deck, resource hub, e-commerce deck, calculator, testimonials, and Canva-derived interactive deck.

**Step 3:** Add acceptance criteria, no-deploy/no-CRM-activation boundaries, and required approval gates.

### Task 4: Document and validate

**Files:**
- Create: `CHANGELOG.md`
- Create: `memory/session_2026-08-27.md`
- Create: `memory/MEMORY.md`
- Modify: `AGENTS.md`

**Step 1:** Record Wave 0 architecture and terminology rules.

**Step 2:** Run `git diff --check`.

**Step 3:** Run `npm run check` to confirm planning changes did not break the existing build.

**Step 4:** Search committed artifacts for temporary extraction references and secrets.

**Step 5:** Commit only named planning/documentation files. Push requires a separate user approval.