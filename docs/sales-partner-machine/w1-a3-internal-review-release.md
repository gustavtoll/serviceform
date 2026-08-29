# W1-A.3 — Sales Partner Signup Internal Review Release

**Status:** Ready for internal Serviceform review  
**Release type:** Preview only / noindex / unlisted Vercel alias  
**Release date:** August 29, 2026  
**Owner:** Gustav Toll  
**Implementation branch:** `fix/sales-partner-mira-brand-alignment`  
**Pull request:** [PR #3](https://github.com/gustavtoll/serviceform/pull/3)

## 1. Review link and distribution guidance

| Item | Value |
|---|---|
| **Stable internal review URL** | https://serviceform-sales-partner-review.vercel.app |
| Immutable preview deployment | https://serviceform-sales-partner-signup-200kxlru5-gustavtolls-projects.vercel.app |
| Source review | https://github.com/gustavtoll/serviceform/pull/3 |
| Indexing posture | HTML and hosting response: `noindex, nofollow` |
| Audience | Internal Serviceform stakeholders and explicitly invited reviewers only |

### Ready-to-forward internal message

> **Sales Partner Signup — W1-A.3 internal design review**  
> Please review the preview at https://serviceform-sales-partner-review.vercel.app and provide approval or section-specific feedback using the checklist below.  
> 
> This is a **design-only preview**. Submitting the email field does not send email, create an account, call GoHighLevel, create a CRM record, activate a workflow, or change any production page. Please do not treat commission/payout language as active terms until approved and signed.

### Access and confidentiality note

The review URL is a Vercel `vercel.app` alias. It requires **no Serviceform DNS, domain, or GoHighLevel access**. It is unlisted and marked `noindex,nofollow`, but it is **not access-controlled**: anyone who receives the link can open it. Share only through internal channels unless Vercel deployment protection is separately enabled and reviewer access is confirmed.

---

## 2. What reviewers are approving in this wave

This release asks for design and content-direction decisions only.

### Included for review

- A warm, product-led Serviceform visual direction: near-white canvas, espresso header/structure, restrained warm accent, and quiet contained surfaces.
- A conversion-safe email-first signup experience with exactly one required field.
- A non-claiming illustrative conversation/workspace UI that communicates product tangibility without presenting itself as a literal Serviceform screenshot.
- Sales Partner terminology and the current qualified program-input presentation.
- Information hierarchy, headline/CTA wording, page rhythm, accessibility treatment, and visual consistency with the Serviceform homepage reference.

### Explicitly not included

- GoHighLevel configuration, API calls, CRM/contact creation, email delivery, account creation, automation, analytics, cookies, or pixels.
- Final legal terms, payout/commission mechanics, attribution/refund/tax handling, or launch approval.
- Customer logos, ratings, testimonials, named customer outcomes, performance claims, or partner proof.
- Any Serviceform production domain, GoHighLevel funnel/domain, production alias, or DNS change.
- PR merge or Wave 3 approval.

---

## 3. Reviewer checklist by page section

Mark each item **Approve**, **Revise**, **Hold**, or **Not applicable**. Add a comment that identifies the section and the desired change.

### A. Global Serviceform alignment

- [ ] **Approve / Revise / Hold:** Near-white canvas, contained warm-cream surfaces, espresso structure, and muted warm accent feel materially closer to the live Serviceform homepage.
- [ ] **Approve / Revise / Hold:** Typography has comfortable hierarchy, readable tracking, and no visually touching or cramped lettering.
- [ ] **Approve / Revise / Hold:** The signup feels product-led and premium rather than like an unrelated campaign template.

### B. Header and navigation discipline

- [ ] **Approve / Revise / Hold:** The espresso header, white wordmark, and light “Start with email” action feel consistent with Serviceform.
- [ ] **Approve / Revise / Hold:** Keeping navigation intentionally minimal is correct for this conversion page.
- [ ] **Decision required:** Should an **“Already a partner? Log in”** link be added later? If yes, provide the approved destination URL and owner.

### C. Hero, product visual, and signup action

- [ ] **Approve / Revise / Hold:** “One email. Your next chapter.” is the correct headline direction.
- [ ] **Approve / Revise / Hold:** “Create my Sales Partner account” is the correct primary CTA direction.
- [ ] **Approve / Revise / Hold:** The single email field is the correct initial-friction level.
- [ ] **Approve / Revise / Hold:** The illustrated conversation/workspace UI helps communicate the Serviceform product story.
- [ ] **Decision required:** Is there an approved Serviceform-owned screenshot, animation, or design-system asset that should replace/augment the illustrative UI in a later approved wave? If yes, attach or link the source and usage approval.
- [ ] **Approve / Revise / Hold:** The design-only disclosure is clear enough without overwhelming the conversion action.

### D. Program inputs and terms status

- [ ] **Approve / Revise / Hold:** The presentation of 40% lifetime commission, 90-day first-click crediting, 10% Sub-Sales Partner kickback, and Dream Car continuity is accurate and appropriately qualified.
- [ ] **Decision required:** Confirm the current program-input wording may remain in the preview. Any final commercial/legal wording must be supplied before activation.
- [ ] **Approve / Revise / Hold:** The “subject to approved and signed terms” qualification is visible and sufficient for this preview.

### E. Journey, closing action, and footer

- [ ] **Approve / Revise / Hold:** The three-step progression—email → approved next step → introductions—is understandable and does not over-promise automation.
- [ ] **Approve / Revise / Hold:** The quieter closing CTA properly repeats the same email-first action without adding competing paths.
- [ ] **Approve / Revise / Hold:** The footer and preview labeling correctly signal non-production status.

### F. Accessibility and device review

- [ ] **Approve / Revise / Hold:** Visible focus states, labels, contrast, and button sizing are adequate for internal approval.
- [ ] **Manual reviewer request:** Test the preview at a phone width (roughly 390px) and report any clipping, overlap, unreadable type, or difficult CTA/form interaction.

> Desktop browser QA, static validation, and responsive CSS contracts have been checked. Device-emulated mobile screenshot automation was not available in the delivery environment, so an internal phone pass is requested before any later production decision.

---

## 4. Feedback template

Use this in the PR, Slack, Teams, Telegram, or email.

```markdown
## W1-A.3 Sales Partner Signup Review

**Reviewer:**
**Date:**
**Decision:** Approve / Approve with notes / Revise / Hold

### Section feedback
| Section | Decision | Required change / approval note | Priority | Owner |
|---|---|---|---|---|
| Global visual system |  |  | High / Medium / Low |  |
| Header |  |  | High / Medium / Low |  |
| Hero + product visual |  |  | High / Medium / Low |  |
| Email CTA/form |  |  | High / Medium / Low |  |
| Program inputs |  |  | High / Medium / Low |  |
| Journey + closing CTA |  |  | High / Medium / Low |  |
| Terms / legal qualification |  |  | High / Medium / Low |  |
| Mobile / accessibility |  |  | High / Medium / Low |  |

### Required decision answers
- Approved existing-partner login destination (or “do not add”):
- Approved source-owned product visual asset available? (link + permission):
- Program-input wording approved for preview?:
- Proof/logos/testimonials approved for any later release? (source + permission):
- Authorize the next wave? (choose one):
  - [ ] Visual revisions only
  - [ ] GoHighLevel technical handoff/specification only
  - [ ] Email-only GoHighLevel integration implementation
  - [ ] Production release preparation
  - [ ] Merge PR #3
  - [ ] Keep preview-only / no further action
```

---

## 5. Approval gate and next-wave routing

### Approval gate for closing W1-A.3

W1-A.3 is complete when the internal team has either:

1. Approved the preview’s visual/content direction with no blocking feedback, **or**
2. Supplied specific revision requests using the feedback template.

Approval of this internal review release **does not** approve production, GHL activation, commercial terms, proof publication, PR merge, or Wave 3.

### Next-wave choices after review

| Decision | Safe next wave | Additional requirements |
|---|---|---|
| Visual feedback only | W1-A.4 — visual revision preview | Approved feedback and a new preview verification |
| Approved product/UI asset available | W1-A.4 — source-owned product visual integration | Provenance, permission, performance review |
| GHL work requested | W1-A.5 — email-only GHL technical implementation | Explicit API contract, consent language, error/retry behavior, secrets in server environment, test-record policy |
| Production requested | W1-A.6 — production readiness/release | Separate approval, approved terms/proof, domain/GHL delivery decision, restore point, production verification |
| PR approved | Merge gate | Explicit merge approval; merging remains separate from any production alias change |

---

## 6. Release verification record

| Check | Result |
|---|---|
| Preview deployment | Vercel `READY` preview deployment |
| Stable review alias | `serviceform-sales-partner-review.vercel.app` points to the W1-A.2 preview deployment |
| HTTP response | `200` |
| Indexing | HTML and `X-Robots-Tag` both specify `noindex, nofollow` |
| Static validation | Sales Partner signup validation passed |
| Build | Signup Vite build passed |
| Repository check | Root `npm run check` passed across all included apps |
| Diff hygiene | `git diff --check` passed |
| Desktop browser QA | Verified readable form-first hero, header contrast, non-interactive product visual, and no observed overlap/clipping |
| Form side effect | Valid preview submission displays only local confirmation; no external integration is present |
| Production/DNS/GHL | Not touched |

---

## 7. Internal release record

- **Internal review release:** W1-A.3
- **Preview-only status:** retained
- **Production status:** unchanged; no release
- **PR status:** open for review; not merged
- **Wave 3 status:** paused pending separate authorization
- **GHL status:** not implemented; no action taken
