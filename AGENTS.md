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

## Vault drop
At session end, write a note to `/Users/gustavtoll/memory-vault/_inbox/`, append the vault ledger, and update `.vault-queue/pending.md`.
