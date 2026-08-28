# Serviceform brand kit for Sales Partner assets

Reference inspected on 28 August 2026: [Serviceform main website](https://www.serviceform.com/?ab_h1=a).

This is an implementation guide derived from the website's visual system. It does not license copying website copy, logo files, customer logos, product images, or other protected assets. Use the text-rendered `serviceform.` wordmark only where an approved logo asset is unavailable.

## Design character

Sales Partner pages and presentations should feel like product surfaces from the main Serviceform family: clean and light, direct, technically confident, spacious, and vivid. Prefer an off-white canvas, near-black type, a restrained blue-to-violet accent, rounded product cards, and compact pill controls. Do not return to the green/cream-only Wave 1 campaign styling.

## Core tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Ink | `--sf-ink` | `#15131f` | Primary text, dark feature surfaces |
| Secondary ink | `--sf-ink-soft` | `#545166` | Body copy on light surfaces |
| Paper | `--sf-paper` | `#faf9ff` | Page canvas |
| White | `--sf-white` | `#ffffff` | Cards and elevated navigation |
| Panel | `--sf-panel` | `#f0effa` | Quiet alternate surface |
| Violet | `--sf-violet` | `#6557ff` | Primary brand accent and focus context |
| Violet dark | `--sf-violet-dark` | `#4939df` | Hover/pressed accent |
| Blue | `--sf-blue` | `#1784ff` | Gradient partner and focus ring |
| Cyan tint | `--sf-cyan` | `#dff2ff` | Feature panel background |
| Lilac tint | `--sf-lilac` | `#e8e3ff` | Feature panel and selected state |
| Divider | `--sf-line` | `rgba(21,19,31,.12)` | Borders and separators |
| Card radius | `--sf-radius` | `28px` | Major cards and panels |
| Pill radius | `--sf-pill` | `999px` | CTAs, chips, navigation |
| Elevation | `--sf-shadow` | `0 24px 70px rgba(42,32,110,.12)` | Sparse product-card elevation |

Blue and violet may form a `115deg` gradient for primary CTAs or a single focal panel. Never use the gradient behind long body copy. Status colors must convey meaning independently of the brand accent.

## Typography

- Primary family: `Instrument Sans`, then system UI fallbacks. Use the variable width/weight face when available.
- Utility family: `DM Mono` for short labels, counters, metadata, and presentation controls only.
- Display headings: weight `650`, tight tracking (`-0.06em` to `-0.075em`), line-height `0.82–0.95`, and responsive `clamp()` sizing.
- Body copy: normal width, line-height at least `1.45`, and a readable maximum line length near 65 characters.
- Use color, weight, and spacing for emphasis. Avoid decorative serif italics as the primary campaign signature.

## Surfaces and product UI

- Keep the default canvas light. Use near-black sections sparingly for tracks, decisions, or closing moments.
- Cards use white or a subtle translucent white, 1px low-contrast borders, 20–28px radii, and restrained shadow.
- Feature panels may use cyan/lilac gradients. Keep text near-black for contrast.
- UI-like metrics, lifecycle steps, and decision rows should look structured and functional rather than ornamental.
- Whitespace is part of the system: desktop sections generally use 6–8rem vertical padding and a content width around 1320px.

## Navigation and CTAs

- Navigation is compact, rounded, elevated, and may use a lightly translucent white backdrop.
- Primary CTAs are high-contrast pills: near-black or violet/blue gradient with white text. Minimum target size is 44×44px.
- Secondary actions may use a white fill and subtle border or a simple underlined text treatment.
- Hover must not be the only state. Provide visible keyboard focus and pressed/selected styling.

## Accessibility and responsive rules

- Preserve semantic `header`, `main`, `section`, `nav`, `footer`, form, heading, and list structures.
- Provide a first-focus skip link and a clearly visible `:focus-visible` ring with at least 3px thickness.
- Maintain WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text and essential UI boundaries.
- Do not place normal text directly on the blue/violet gradient unless the contrast has been checked.
- Keep labels visible; placeholders are examples, not replacements for labels. Validation messages remain announced with `role="alert"`/live regions.
- At 850px and below, collapse multi-column layouts. At 560px and below, use single-column form choices and content cards with at least 5vw side padding.
- Respect `prefers-reduced-motion: reduce`: remove smooth scrolling and reduce animation/transition duration to effectively instant.
- Internal assets retain `noindex,nofollow` both in HTML and at the hosting header layer.

## Governance

This guide is authoritative for every present and future Serviceform Sales Partner landing page and presentation. New artifacts must use these tokens and patterns or document an approved exception. Program facts, policy gates, claims controls, and deployment authorization remain governed by `docs/sales-partner-machine/` and are not changed by visual alignment.
