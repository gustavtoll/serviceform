# Serviceform brand kit for Sales Partner assets

Approved visual reference inspected on 28 August 2026: [Mira prospecting playbook](https://serviceform-tau.vercel.app).

Translate its visual DNA; do not copy Mira copy, protected assets, customer logos, or product imagery. Use the text-rendered `serviceform.` wordmark only where an approved logo asset is unavailable.

## Design character

Sales Partner pages and presentations belong to the warm, useful Serviceform/Mira product family: cream canvas, espresso structure, restrained orange emphasis, quiet pastel product cards, generous whitespace, and compact UI-like controls. Blue/violet is not the approved Sales Partner system.

## Core tokens

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Espresso | `--sf-espresso` | `#2d201b` | Primary text, compact headers, limited contrast sections |
| Soft ink | `--sf-ink-soft` | `#665851` | Body copy and secondary information |
| Cream | `--sf-cream` | `#f6f0e5` | Default page canvas |
| Warm white | `--sf-white` | `#fffdf8` | Elevated cards and fields |
| Orange | `--sf-orange` | `#f26a2e` | Reserved emphasis, primary CTAs, focus context |
| Orange dark | `--sf-orange-dark` | `#c94b1c` | Hover and pressed states |
| Sage | `--sf-sage` | `#dce5d5` | Restrained product cards |
| Muted sky | `--sf-sky` | `#d8e5ea` | Restrained product cards |
| Blush | `--sf-blush` | `#efd8d0` | Restrained product cards |
| Divider | `--sf-line` | `rgba(45,32,27,.14)` | Borders and separators |
| Card radius | `--sf-radius` | `24px` | Major cards and panels; 20–24px is preferred |
| Pill radius | `--sf-pill` | `999px` | Labels, buttons, navigation, mini controls |
| Elevation | `--sf-shadow` | `0 24px 70px rgba(67,45,35,.10)` | Sparse, low-opacity elevation |

Orange is a focal signal, not a background treatment for long copy. Pastels should be alternated deliberately and remain quiet enough for dark text.

## Typography

- Primary family: `Instrument Sans`, then system UI fallbacks; `DM Mono` only for short labels, counters, and controls.
- Display headings are large, heavy, clean, and left aligned, with line-height around `0.94–1.05` and moderate negative tracking no tighter than `-0.045em`.
- Body copy uses line-height of at least `1.5`, comfortable spacing, and a readable maximum line length near 65 characters.
- Audit every desktop and mobile breakpoint for touching glyphs, clipping, and crowded wraps.

## Composition and controls

- Use a warm cream canvas with generous whitespace and light warm-gray dividers.
- Headers are compact, dark espresso, rounded, and visually distinct from the page.
- Cards use warm white, sage, muted sky, or blush; use 20–24px soft radii and restrained shadows.
- Keep dark sections limited to high-contrast decisions, tracks, or closing moments.
- Primary CTAs are solid espresso or orange pills; secondary actions use warm white or transparent fills and subtle borders.
- Labels and mini controls are compact pills with coherent letter spacing and minimum 44px interactive targets.

## Accessibility, responsive behavior, and governance

- Preserve semantic landmarks, first-focus skip links, and a visible orange `:focus-visible` ring at least 3px thick.
- Maintain WCAG AA contrast, persistent labels, announced validation messages, and meaningful non-color state cues.
- Collapse multi-column layouts at 850–900px and use single-column cards/forms by 560px with at least 5vw side padding.
- Respect `prefers-reduced-motion: reduce` by removing smooth scrolling and reducing transitions.
- Internal/demo assets retain `noindex,nofollow` in HTML and at the hosting header layer.
- Program facts, policy gates, claims controls, and deployment authorization remain governed by `docs/sales-partner-machine/`; visual alignment changes none of them.
