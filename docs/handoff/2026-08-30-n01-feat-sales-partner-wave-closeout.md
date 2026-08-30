# Hand-off prompt — August 30 · feat/sales-partner-wave-closeout

Paste this as the first message to resume Serviceform work in a fresh session.

---

## Context

Repository: `/Users/gustavtoll/Dev/serviceform`.

**Last-session focus:** Delivered Wave 3’s Opportunity Calculator as a limited production planning tool; audited the remaining Sales Partner wave stack and prepared session closeout.

**Outcome:** Production calculator released; review PRs remain open; server-owned GHL pilot implementation exists but is deliberately unconfigured and inactive.

## Shipped

- Calculator production URL: https://opportunity-calculator-three.vercel.app
- Immutable deployment: `dpl_4KC9vLmhEz36uJJr1suGv3kaCWRt` — Vercel `target: production`, `READY`.
- Release source commit: `e6325d2` on `feature/sales-partner-opportunity-calculator-hardening`.
- Restore tag: `restore/opportunity-calculator-production-2026-08-30-e6325d2`.
- Production release record: `DEPLOYMENT.md` and `docs/sales-partner-machine/wave-three-delivery-register.md`.
- Release-record/hardening PR: https://github.com/gustavtoll/serviceform/pull/6

## Verified

- `npm --prefix apps/opportunity-calculator run check` passed.
- Vercel inspected the production deployment as `READY`; HTTPS returned 200 and `X-Robots-Tag: noindex, nofollow`.
- Browser interaction verified the higher-input calculator scenario yields `$180,000` monthly opportunity.
- There are no active background processes.

## Open loops

1. **Merge review stack:** PR #3 is the base Serviceform alignment PR; PR #4 (Wave 3) is stacked on #3; PR #6 (calculator hardening/release record) is stacked on #4. Review/merge only with explicit authorization, in dependency order.
2. **Wave 4-A live pilot:** PR #5 implements a server-owned, allowlisted email-first GoHighLevel pilot. It is not deployed/configured/activated. It needs approved location/token/pipeline/stage IDs, a controlled test email, Preview-only Vercel variables, and controlled CRM verification.
3. **W3-B / W3-C:** proof/asset approval factory and e-commerce product presentation are implemented but undeployed. The prior first-deployment Preview command was assigned Production by Vercel; obtain a separately approved, verified release approach before launching them.
4. **Calculator source alignment:** calculator is live from the hardened feature commit, but the source changes are still represented by the open stacked PRs; no merge occurred in this closeout.

## Do not do

- Do not merge PRs #3, #4, #5, or #6 without a fresh explicit approval.
- Do not add GoHighLevel credentials to Git, browser code, chat, or production/Preview until the controlled pilot configuration gate is approved.
- Do not activate commissions, payouts, partner approval, referrals, Dream Car rules, or Sub-Sales Partner financial entitlements.
- Do not alter the user’s untracked `Assets/` directory.
- Do not treat the calculator as customer proof, an earnings forecast, or an active program offer.

## Fast re-orient

```bash
cd /Users/gustavtoll/Dev/serviceform
gh pr list --state open
git worktree list --porcelain
npx --yes vercel inspect opportunity-calculator-three.vercel.app --json --scope gustavtolls-projects
```

Then read:

```text
DEPLOYMENT.md
docs/sales-partner-machine/wave-three-delivery-register.md
docs/sales-partner-machine/w4-a-ghl-automated-pilot.md
```

## Suggested next actions

1. Obtain internal review/merge approval for the stacked PRs, or leave them open while starting an unrelated new wave.
2. If GoHighLevel automation is next, obtain the approved pilot configuration inputs and run the closed Preview-only test plan in `w4-a-ghl-automated-pilot.md`.
3. If W3-B/W3-C are next, first decide whether their release should be internal Preview-only or production, then validate the Vercel target before sharing any URL.
