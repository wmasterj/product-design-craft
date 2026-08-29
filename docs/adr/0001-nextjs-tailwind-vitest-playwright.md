# ADR-0001: Next.js, Tailwind v4, Vitest and Playwright as the default stack

- **Status**: Accepted
- **Date**: 2026-08-29

## Context

The repo was greenfield apart from agent configuration. A default stack had to
be chosen before any product code landed.

The strongest available signal was the owner's existing work: `priora-matrix`
runs Next.js 16, React 19, Tailwind, Vitest and Testing Library, deployed on
Vercel. Familiarity and already-wired deployment credentials count for more
than a marginally better framework.

## Decision

Adopt the `priora-matrix` stack, with three deliberate divergences.

- **Next.js 16 + React 19 + TypeScript strict** — as in `priora-matrix`.
  `noUncheckedIndexedAccess` and `noImplicitOverride` are additionally on;
  cheap to keep from day one, expensive to retrofit.
- **Tailwind v4 rather than v3.4.** For a repo about design craft, tokens
  belong in CSS. v4's `@theme` block in `src/app/globals.css` is the single
  source of truth for colour and type; there is no `tailwind.config.js`.
- **Playwright added.** `priora-matrix` has no end-to-end layer. Design work is
  where interaction and rendering regressions actually bite, and Vitest with
  happy-dom cannot catch them.
- **Vitest + Testing Library + happy-dom** — as in `priora-matrix`.
- **`eslint-config-next` flat config.** v16 ships native flat configs, so no
  `FlatCompat` shim.
- **pnpm** as the package manager.

## Consequences

- Tailwind v4 diverges from `priora-matrix`, so styling knowledge does not
  transfer one-to-one between the two repos.
- Playwright is pinned to `~1.56.1` rather than latest. See ADR-0003.
- Stripe, Resend and `@anthropic-ai/sdk` are deliberately absent. Add them when
  a feature needs them, not in anticipation.
