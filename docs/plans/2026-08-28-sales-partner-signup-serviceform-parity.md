# Sales Partner Signup — Serviceform Homepage Parity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring the email-first Sales Partner signup preview into visual and compositional alignment with the live Serviceform homepage while preserving its single-email CRO path and keeping GoHighLevel/account creation inactive.

**Architecture:** Keep `apps/sales-partner-signup` as a static Vite landing page. Recompose the page around a quieter off-white canvas, an intentionally low-distraction Serviceform-style header, a product-tangible hero visual, one email-only conversion module, and restrained proof/product slots. All interaction remains client-only local preview behavior; this wave changes presentation, information hierarchy, and static tests only.

**Tech Stack:** Vite, semantic HTML, vanilla JavaScript, CSS custom properties, Node static validation, Vercel preview deployment.

**Reference authority:**

- Live Serviceform reference: `https://www.serviceform.com/?ab_h1=b` (HTTP 200 on August 28, 2026; browser exposed its active client-side experiment as `ab_h1=c`).
- CRO preview being corrected: `https://serviceform-sales-partner-signup-lb2lci4ez-gustavtolls-projects.vercel.app`
- Existing CRO brief: `docs/sales-partner-machine/sales-partner-signup-cro-design.md`
- Existing Serviceform/Mira visual rules: `docs/brand/serviceform-brand-kit.md`

---

## 1. Observed design translation

This plan transfers **visual principles**, not Serviceform homepage copy, logo files, customer logos, performance claims, screenshots, or code.

| Visual element | Live Serviceform observation | Required signup translation |
|---|---|---|
| Canvas | Quiet near-white/off-white base with large clean breathing areas | Replace the dominant yellow-cream atmosphere with a mostly near-white canvas; reserve cream for contained surfaces and soft transitions. |
| Dark structure | Charcoal/espresso header and selected media panels | Use espresso only for the persistent header and one intentional product/visual panel. Do not make a large dark section a substitute for product imagery. |
| Orange | Warm, muted emphasis inside type and selected actions | Replace red-orange dominance with a restrained warm orange token. Use it for one primary conversion button and selective headline emphasis. |
| Header | Slim inset dark pill, white logo, quiet utility navigation, white action pill | Preserve conversion focus: wordmark + optional existing-partner login + white header action. Do not copy the full Products/Industries/Resources navigation into the signup funnel. |
| Hero | Large direct headline plus product imagery/interface visual; high content-to-space ratio | Place a Serviceform-owned or purpose-built non-claiming interface visual alongside the email module. Remove decorative-only atmospheric blobs if they do not support the product story. |
| Typography | Large but open black display type; selective warm highlight; comfortable line-height | Reduce display scale and tighten neither the headline nor paragraph excessively. Use a readable, editorial line rhythm; reduce all-caps labels to orientation only. |
| Cards | Low-contrast surfaces, soft borders, contained UI compositions | Reduce tint saturation and heavy campaign-card feeling. Build one coherent product/partner UI panel rather than four equally loud benefit cards. |
| Proof | Homepage has approved customer and partner proof close to the hero | Leave a deliberately styled proof rail/slot only. Do not add customer logos, counts, reviews, case studies, or outcome claims until approved source material and permission are supplied. |

---

## 2. Section-by-section site task specification

### A. Global shell and page canvas

**Current issue:** The page’s all-over cream background and decorative radial glows make it feel more editorial-campaign than the quieter, product-led Serviceform homepage.

**Target:** A near-white `--sf-canvas` base, restrained cream section bands, thin warm-gray dividers, and an espresso text system. Orange remains an emphasis token rather than a page-wide personality.

**Implementation details:**

- Add distinct tokens such as `--sf-canvas`, `--sf-surface`, `--sf-surface-muted`, `--sf-accent`, `--sf-accent-hover`, `--sf-charcoal`, and `--sf-border`.
- Avoid old blue/violet tokens and avoid a high-saturation red-orange CTA.
- Set comfortable global text `line-height` and maintain `prefers-reduced-motion` safeguards.
- Keep the existing skip link, visible focus indicator, semantic landmarks, and 44px minimum interactive targets.

**Acceptance criteria:**

- Initial viewport is primarily near-white rather than yellow cream.
- No broad decorative shape is the principal hero visual.
- Contrast remains AA for body text and controls.

### B. Conversion-safe header

**Current issue:** The header’s orange CTA is louder than the live Serviceform header and the bar feels visually heavier.

**Target:** A slim, inset espresso pill that feels drawn from the homepage but does not recreate full website navigation or introduce funnel exits.

**Implementation details:**

- Keep Serviceform wordmark left-aligned, white on espresso.
- Add only an optional “Already a partner? Log in” utility link if it has an approved destination; otherwise leave it out rather than inventing a route.
- Change the header action to a white/light pill that anchors to the email form, with dark text and visible focus state.
- Preserve a single primary conversion destination; no product/industry/resources navigation.

**Acceptance criteria:**

- Header CTA is visually secondary to, not equal to, the main form CTA.
- Header remains readable at desktop and 320px mobile width with no overlap.

### C. Hero: proposition, form, and product tangibility

**Current issue:** The email form performs its CRO job, but the hero lacks the product/interface evidence that makes the live homepage feel like a software company rather than a standalone promotional campaign.

**Target:** A two-column desktop hero with the email-first message and a compact visual “Serviceform in action” representation. The form stays above the fold and always wins over the visual.

**Implementation details:**

- Keep one required email input only: `type="email"`, `autocomplete="email"`, `inputmode="email"`, visible associated label, and inline accessible errors.
- Keep outcome CTA copy: “Create my Sales Partner account,” unless a future approved test changes it.
- Reduce hero label clutter: retain `Sales Partner Program` and at most one support label; remove competing meter/count labels that do not aid conversion.
- Build a generic, purpose-made interface composition from HTML/CSS rather than claiming it is a literal Serviceform product screenshot. It can show anonymized conversational questions, qualification states, or a simple partner-introduction flow, but must not invent product performance, customer names, chat outcomes, integrations, or live metrics.
- Use a restrained dark media shell, warm orange micro-accent, and light UI cards that echo the homepage’s product compositions.
- Keep the design-only disclosure directly under the form but visually quiet: it must remain truthful and accessible without becoming the visual headline.

**Acceptance criteria:**

- The email input and CTA are visible without scrolling on typical desktop and mobile viewports.
- Hero includes a clearly decorative/non-claiming product-style visual.
- The visual cannot intercept form pointer or keyboard interaction.
- No extra mandatory profile fields or consent checkbox reappear.

### D. Reassurance and expected-next-step strip

**Current issue:** The current three reassurance chips are useful but look more like campaign badges than the product site’s calm information rhythm.

**Target:** A low-contrast horizontal reassurance row attached to the form or immediately below it.

**Implementation details:**

- Retain only factual, self-evident statements: “Email only,” “No payment details,” and “Takes less than a minute.”
- Add a concise expected-next-step sentence without naming an email sender, SLA, automation, or account status until the GoHighLevel workflow is authorized and proven.
- Use fine dividers/icons only if their meaning is clear in text; no third-party security badges.

**Acceptance criteria:**

- Reassurance is scannable in under one line on desktop and wraps cleanly on mobile.
- No privacy, delivery, or account-creation guarantee is invented.

### E. Value / program-input section

**Current issue:** Four equally weighted pastel cards feel like a campaign grid, while the homepage uses more varied product-led rhythm.

**Target:** A quieter editorial section that explains the relationship opportunity beside a single structured product/partner panel.

**Implementation details:**

- Keep only approved program inputs and their terms qualification: 40% lifetime commission, 90-day first-click crediting, 10% Sub-Sales Partner kickback, and Dream Car continuity at 100 active deals.
- Present them as compact numbered facts or a timeline, not oversized equal-height feature cards.
- Retain explicit “subject to signed terms” status once within the section and retain the detailed legal/status section lower on the page.
- Do not add performance outcomes, commissions beyond approved language, active offers, or qualification promises.

**Acceptance criteria:**

- Program input language remains source-consistent and qualified.
- The section visually supports the hero rather than competing with it.

### F. How-it-works / progressive commitment section

**Current issue:** The current “Your path” content is useful but isolated from the product story.

**Target:** A compact three-step process with a product-style visual rhythm.

**Implementation details:**

- Retain sequence: enter email → receive approved next step → make introductions.
- Step two must say “receive your next step” rather than promise a real account, an email timing, or activation.
- Use one dark or muted product-surface backdrop and low-contrast internal cards; do not repeat high-saturation orange buttons.

**Acceptance criteria:**

- Visitors can understand the action sequence in one scan.
- No external side-effect is implied by the current preview.

### G. Proof rail — deliberately empty until approved

**Current issue:** The live homepage gets considerable trust from approved customer/partner evidence; the signup has no equivalent trust architecture.

**Target:** Add an optional component location after the hero or above the final CTA, but leave it absent or in non-public development-only state until content is approved.

**Missing inputs required before publication:**

- Approved list of Serviceform customer/partner logos and permitted variants.
- A confirmed source and permission for ratings, review count, customer count, and all performance numbers.
- Approved testimonials/case studies with attribution and a review date.
- Legal confirmation that partner-program promotion may use the selected proof.

**Acceptance criteria:**

- No blank “trusted by” placeholder is visible to end users.
- Static tests reject unapproved named logos/testimonials/metrics if they are accidentally added without source registration.

### H. Final CTA and footer

**Current issue:** The existing closing CTA repeats the conversion action but uses the same high-saturation pattern as the hero.

**Target:** A concise, calmer closing invitation on an off-white/soft-surface section that anchors to the same email form.

**Implementation details:**

- Reuse the exact primary CTA copy to avoid decision friction.
- Maintain the real Serviceform/Sales Partner footer styling; do not add navigation destinations that do not exist.
- Keep noindex/nofollow on the design preview and retained current restrictions.

---

## 3. What is missing, and how to pull the main page’s most important aspects into this version

### Missing from the signup today

1. **Product tangibility:** the homepage proves it is a real software platform through UI/product visual modules; the signup relies largely on copy.
2. **Calmer palette hierarchy:** the signup overuses cream and bright orange; the homepage makes off-white, black, and whitespace do most of the work.
3. **Refined navigation treatment:** the signup has the right rounded espresso concept but needs the homepage’s quieter sizing and white utility/action treatment.
4. **Content rhythm:** the homepage alternates editorial white space, product interfaces, and contained surfaces. The signup is still a sequence of marketing sections/cards.
5. **Approved proof architecture:** the homepage has customer/partner evidence. The signup should eventually use approved proof but must not manufacture it.
6. **Real UI assets:** no approved export/screenshot/component spec has been provided for Sales Partner use.

### Safe ways to pull the most important homepage aspects

| Homepage strength | Safe signup adaptation | Required input / gate |
|---|---|---|
| Slim dark navigation | Build a conversion-safe header with wordmark, optional approved login, and light anchor CTA | Login destination, if included |
| Product interface storytelling | Build an original illustrative conversation/qualification UI in HTML/CSS; label it decorative, not a literal product screenshot | Product/design review before production |
| White-space-led composition | Use near-white canvas, fewer but stronger modules, generous gaps, and contained tinted surfaces | No external asset needed |
| Warm accent use | Recalibrate CTA/highlight token to a muted Serviceform warm orange | Visual review of preview |
| Customer/partner proof | Add only after approved logo and claims pack is delivered | Content/legal approval |
| Homepage imagery or animated product scenes | Use source-owned, deployment-ready Serviceform visual files only; never hotlink, scrape, or screen-capture the public homepage | Asset provenance, license/permission, performance review |

### Explicit non-goals for this wave

- No GoHighLevel integration, API endpoint, webhook, CRM record, email send, credential, or account creation.
- No analytics instrumentation, cookies, pixels, experimentation platform, or raw-email tracking.
- No new customer proof, reviews, logos, named outcomes, conversion figures, or public promises.
- No full marketing-site navigation added to the conversion funnel.
- No production deployment or production-alias change without later approval.

---

## 4. Implementation wave

### Wave name

**W1-A.2 — Serviceform Homepage Parity and Product-Led Signup Composition**

### Wave objective

Implement the approved visual and compositional corrections in the existing email-first signup preview, retaining the design-only constraint and validating desktop/mobile behavior before a new preview is requested for review.

### Dependencies / decisions required before implementation

| Decision | Owner | Why it matters |
|---|---|---|
| Whether to include an “Already a partner? Log in” link and its destination | Serviceform | Avoids a false or dead navigation element |
| Whether there is an approved Serviceform product screenshot, animation, or design asset for the hero | Serviceform | Determines whether the hero uses only an original illustrative UI or source-owned product media |
| Approved proof pack | Serviceform/legal | Required before logos, customer count, ratings, testimonials, or outcomes can appear |
| Final warm-orange token sign-off from preview | Gustav / Serviceform | Keeps the sales asset aligned to the live homepage rather than a guessed palette |

### Delivery scope

- **In:** Static HTML/CSS/JS composition, no-side-effect local form behavior, visual static tests, design documentation, preview deployment and review.
- **Out:** GoHighLevel implementation, production activation, CRM/email behavior, analytics, legal terms completion, proof publication.

### Definition of done

- One email remains the only primary input.
- Desktop and mobile first viewport retain form visibility and no overflow.
- The page clearly reads as a Serviceform product/marketing surface, not a separate campaign brand.
- All claims and program language remain qualified and source-grounded.
- Preview passes static tests, build, `npm run check`, `git diff --check`, HTTP/content verification, browser visual review, and a responsive computed-style/geometry audit.
- `Assets/` remains untracked.

---

## 5. Task-by-task execution plan

### Task 1: Establish the visual-contract test

**Files:**

- Modify: `apps/sales-partner-signup/tests/static-validation.mjs`
- Modify: `apps/sales-partner-signup/index.html`
- Modify: `apps/sales-partner-signup/src/style.css`

**Step 1: Write the failing test**

Add assertions for:

- `--sf-canvas` / muted Serviceform accent tokens and absence of obsolete bright-red token.
- A conversion-safe header action using a light-pilled class rather than the hero primary-CTA class.
- An accessible `product-visual` decorative container with `aria-hidden="true"` and no customer/metric claim text.
- A single email input remains present and no long-form input returns.
- No GHL/network request strings.
- Required responsive CSS selectors and reduced-motion guard remain.

**Step 2: Run the test to verify it fails**

Run:

```bash
npm --prefix apps/sales-partner-signup test
```

Expected: fail because the product visual and updated surface/header contract do not exist yet.

**Step 3: Commit test-only state only if needed for review**

Do not commit a deliberately failing default branch state. Keep this as the red step inside the local implementation cycle.

### Task 2: Rebuild global tokens, canvas, and header hierarchy

**Files:**

- Modify: `apps/sales-partner-signup/src/style.css`
- Modify: `apps/sales-partner-signup/index.html`

**Step 1: Implement minimal shell changes**

- Add near-white canvas/surface tokens and reduce global cream saturation.
- Refine the espresso header’s height, padding, shadow, and inset width.
- Replace bright orange header CTA with a light header pill; retain visible focus/hover state.
- Keep wordmark text white on espresso and test no later CSS declaration overrides it.

**Step 2: Run the static test**

```bash
npm --prefix apps/sales-partner-signup test
```

Expected: header/token assertions pass; product visual assertion may still fail.

### Task 3: Recompose the hero around the email action and illustrative product UI

**Files:**

- Modify: `apps/sales-partner-signup/index.html`
- Modify: `apps/sales-partner-signup/src/style.css`

**Step 1: Implement an original illustrative UI**

- Add `aside.product-visual[aria-hidden="true"]` adjacent to the email form.
- Compose generic, non-claiming UI primitives with neutral text such as “New introduction,” “Product question,” “Qualified conversation,” and safe visual statuses.
- Remove decorative-only hero blobs that do not support product tangibility.
- Maintain form as the visual priority, keyboard target, and reading-order priority.

**Step 2: Test desktop/mobile geometry locally**

Run:

```bash
npm --prefix apps/sales-partner-signup run build
npm --prefix apps/sales-partner-signup test
```

Expected: pass.

Use a local preview and browser inspection to verify hero media cannot overlap or intercept the form.

### Task 4: Reduce card noise and establish product-led lower-page rhythm

**Files:**

- Modify: `apps/sales-partner-signup/index.html`
- Modify: `apps/sales-partner-signup/src/style.css`

**Step 1: Implement minimal lower-page changes**

- Change four equal high-tint benefit cards into compact numbered program-input facts beside/within a contained surface.
- Retain exactly one qualified terms-status treatment in the value section and the existing detailed lower section.
- Restyle the three-step path as a contained product-surface sequence.
- Rebuild the final CTA with an off-white/quiet-surface context and identical anchor destination.

**Step 2: Verify source-governance contract**

Run:

```bash
npm --prefix apps/sales-partner-signup test
```

Expected: pass, with original program input wording and terms qualification preserved.

### Task 5: Verify the no-side-effect conversion flow

**Files:**

- Inspect: `apps/sales-partner-signup/src/main.js`
- Inspect: `apps/sales-partner-signup/src/integration.js`
- Modify only if markup IDs or accessible message regions change.

**Step 1: Test form behavior locally**

- Submit invalid email and verify accessible inline error/focus behavior.
- Submit valid email and verify only the local design-preview confirmation appears.
- Inspect browser network panel/console programmatically: no `fetch`, XHR, beacon, webhook, or CRM request.
- Confirm local attribution does not render raw query values into the UI.

**Step 2: Run canonical checks**

```bash
npm run check
git diff --check
```

Expected: both pass.

### Task 6: Document and publish the review artifact

**Files:**

- Modify: `docs/sales-partner-machine/sales-partner-signup-cro-design.md`
- Modify: `CHANGELOG.md`
- Modify: `DEPLOYMENT.md` only after preview deployment succeeds

**Step 1: Record the final translation**

- Link this plan.
- Record the approved homepage reference, exact visual translation, excluded assets/claims, branch/commit, and preview URL.
- State prominently that GHL/account creation remains deferred.

**Step 2: Commit and push**

```bash
git add apps/sales-partner-signup docs/sales-partner-machine/sales-partner-signup-cro-design.md CHANGELOG.md DEPLOYMENT.md
git commit -m "refactor(signup): align CRO page with Serviceform homepage"
git push origin <implementation-branch>
```

### Task 7: Preview-only deployment and independent verification

**Files:** no source change required.

**Step 1: Deploy preview only**

```bash
cd apps/sales-partner-signup
npx --yes vercel --yes --scope gustavtolls-projects
```

**Step 2: Verify**

- Confirm preview is HTTP 200 and page title/hero/email CTA match expected content.
- Confirm `X-Robots-Tag: noindex, nofollow` remains present.
- Browser-review desktop initial viewport plus responsive/mobile viewport.
- Check computed style for wordmark/header contrast, `z-index` and pointer behavior for product visual, form 44px target, and no horizontal overflow.

**Step 3: Update PR, do not merge**

- Update the existing PR summary with the new visual-parity scope and preview URL.
- Attach this plan and verification results.
- Do not merge and do not deploy production unless Gustav explicitly approves that release.

---

## 6. Review checklist for Gustav

- [ ] Does the initial viewport now feel like the live Serviceform homepage rather than a separate campaign site?
- [ ] Is the form still clearly the first and easiest action?
- [ ] Is the orange now a restrained warm accent, not the visual identity?
- [ ] Is the header recognizably Serviceform while remaining conversion-safe?
- [ ] Does the illustrative product visual create confidence without pretending to be a literal screenshot or inventing proof?
- [ ] Are typography, letter spacing, and vertical rhythm calm and readable?
- [ ] Are any proof elements absent until their sources are explicitly approved?
- [ ] Is the page still design-only, with no GHL or account-creation side effect?
