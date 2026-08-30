# Serviceform — Agent Guidance

## Project
- **Purpose:** Build high-quality US e-commerce prospect lists and sales assets for Mira AI Agent.
- **Primary Telegram route:** Phone Agents IO → **Serviceform** (thread `200`).
- **Vault record:** `/Users/gustavtoll/memory-vault/projects/serviceform/README.md`
- **Repository:** `/Users/gustavtoll/dev/serviceform`

## Initial ICPs
1. Auto parts / aftermarket retailers — fitment, VIN/YMM, catalog complexity.
2. Supplements / nutrition — goal-based guidance, comparisons, subscriptions.
3. Online florists — occasion and delivery guidance, seasonal support volume.
4. Fishing / specialty leisure — expert selection, technical setup and accessories.
5. Furniture — pending fuller ICP definition.

## Working rules
- Work on typed branches; never implement on `main`.
- Make substantiated prospect claims and retain source URLs.
- Do not treat medical/wellness product claims as diagnoses or treatment claims.
- Run `npm run check` before a deployment.

## Sales Partner Machine
- All present and future Sales Partner landing pages and presentations must follow `docs/brand/serviceform-brand-kit.md`. The live Mira prospecting playbook at `https://serviceform-tau.vercel.app` is the approved visual reference for the warm cream, espresso, orange, and pastel Serviceform family. Translate its visual DNA; do not copy protected copy, logo files, customer logos, or product imagery.
- Use **Sales Partner** and **Sub-Sales Partner** in all new user-facing and internal material; legacy source titles are source references only.
- Program inputs: 40% lifetime commission; 90-day first-click cookie/crediting; a 10% Sub-Sales Partner kickback; Dream Car lease continuity at 100 active deals.
- Do not activate GoHighLevel workflows, calendars, payouts, contest mechanics, public claims, or production deployments without a separate authorized wave and the required access/terms.
- Wave 0 authority: `docs/sales-partner-machine/` and `_bmad-output/strategy/pam-handoff-v1-sales-partner-machine.md`.
- Wave 2 architecture adds independent static Vercel apps at `apps/sales-partner-resource-hub` and `apps/ecommerce-sales-partner-deck`; both must remain noindex enablement assets until separately authorized.

## Vault drop
At session end, write a note to `/Users/gustavtoll/memory-vault/_inbox/`, append the vault ledger, and update `.vault-queue/pending.md`.
