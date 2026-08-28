# Project Memory

## Current presentation system

The Mira E-commerce Prospecting Playbook uses a Serviceform-inspired brand layer without copying Serviceform content or assets. Its visual primitives are a warm cream canvas, near-black espresso type and navigation, warm orange emphasis, subdued sage and muted sky accents, pastel rounded cards, compact pill controls, 20–24px radii, thin warm-gray borders, soft shadows, and generous whitespace.

The authoritative implementation is in `index.html` and `src/style.css`. Preserve the page's complete prospecting content, semantic landmarks, skip link, keyboard focus treatments, responsive behavior, and reduced-motion support in future changes.

## Release workflow

- Work on typed branches, never `main`.
- Run `npm run check` before deployment.
- Retain source URLs for substantiated prospect claims.
- Record preview and production URLs plus HTTP/content verification in `DEPLOYMENT.md`.
- At session end, write the vault inbox note, append the vault ledger, and update `.vault-queue/pending.md`.
