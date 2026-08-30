# Hand-off prompt — August 30 · feat/sales-partner-wave-closeout

Paste this as the first message to resume Serviceform work in a fresh session.

---

## Context

Repository: `/Users/gustavtoll/Dev/serviceform`.

**Last-session focus:** Delivered Wave 3’s Opportunity Calculator as a limited production planning tool; audited the remaining Sales Partner wave stack and prepared session closeout.

**Outcome:** Production calculator released; the approved Wave 1–3 PR stack is consolidated into clean, mergeable PR #6 against `main`; the separate server-owned GHL pilot remains deliberately unconfigured and inactive.

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

1. **Final PR review/merge:** PR #6 is now the single consolidated Wave 1–3 PR against `main`, with `CLEAN` / `MERGEABLE` status and no reported checks. PRs #3 and #4 were closed as superseded. Merge #6 only with the next explicit main-merge approval.
2. **Wave 4-A live pilot:** PR #5 was retargeted to `main` and remains a separate server-owned, allowlisted email-first GoHighLevel pilot. It is not deployed/configured/activated. It needs approved location/token/pipeline/stage IDs, a controlled test email, Preview-only Vercel variables, and controlled CRM verification.
3. **W3-B / W3-C:** proof/asset approval factory and e-commerce product presentation are implemented but undeployed. The prior first-deployment Preview command was assigned Production by Vercel; obtain a separately approved, verified release approach before launching them.
4. **Calculator source alignment:** calculator is live from the hardened feature commit and is now included in PR #6; PR #6 has not been merged into `main`.

## Do not do

- Do not merge PR #6 into `main`, or merge/activate PR #5, without a fresh explicit approval.
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
