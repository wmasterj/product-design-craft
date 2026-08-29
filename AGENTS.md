# AGENTS.md

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Vitest +
Testing Library · Playwright · pnpm · deployed on Vercel. No database — see
`docs/adr/0002-no-database.md`.

Design tokens live in `@theme` in `src/app/globals.css`. There is no
`tailwind.config.js`; Tailwind v4 is CSS-first.

Commands:

| Task | Command |
| --- | --- |
| Dev server | `pnpm dev` |
| Everything CI checks | `pnpm check` (typecheck + lint + unit tests) |
| Unit tests | `pnpm test` |
| End-to-end tests | `pnpm test:e2e` |
| Production build | `pnpm build` |

## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues in `wmasterj/product-design-craft`. Use
the `gh` CLI locally, or the GitHub MCP tools in Claude Code on the web, where
`gh` is not installed. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
