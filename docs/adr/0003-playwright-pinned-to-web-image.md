# ADR-0003: Pin Playwright to the Chromium build in the web image

- **Status**: Accepted
- **Date**: 2026-08-29

## Context

Claude Code on the web ships a prebuilt Chromium at `/opt/pw-browsers`
(revision 1194) and the image documents that `playwright install` should not be
run. Playwright refuses any browser revision other than the exact one its
version expects, so `@playwright/test@1.62` looked for revision 1234 and failed
with "Executable doesn't exist" despite a working Chromium being present.

Revision 1194 corresponds to Playwright 1.56.x.

## Decision

Pin `@playwright/test` to `~1.56.1`.

Rejected alternative: setting `executablePath: '/opt/pw-browsers/chromium'` in
`playwright.config.ts`. That hard-codes a path that exists only in the web
image and breaks local runs and CI.

## Consequences

- `pnpm test:e2e` runs in a web session with no browser download.
- Local checkouts and CI still need `pnpm exec playwright install chromium`
  once; the pin does not interfere.
- Playwright upgrades are now coupled to the web image's Chromium. When the
  image updates, re-check the revision before bumping — the failure is loud and
  names the expected revision, so it is self-diagnosing.
