# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues.

## Which interface to use

Two environments, two toolsets. Check which one you are in before running anything.

- **Local checkouts / terminal sessions** — use the `gh` CLI, as below. It infers
  the repo from `git remote -v`.
- **Claude Code on the web** — `gh` is **not installed** and there is no direct
  GitHub API access. Use the GitHub MCP tools (`mcp__github__*`) instead; they
  take explicit `owner` and `repo` arguments (`wmasterj` / `product-design-craft`).

Every operation below lists both. Where an MCP equivalent is missing, that is
called out explicitly rather than left to fail at runtime.

## Conventions

| Operation | `gh` CLI | MCP tool |
| --- | --- | --- |
| Create an issue | `gh issue create --title "..." --body "..."` (heredoc for multi-line bodies) | `issue_write` with `method: "create"` |
| Read an issue | `gh issue view <n> --comments` | `issue_read` with `method: "get"`, then `"get_comments"` and `"get_labels"` |
| List issues | `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] \| {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` | `list_issues` with `state` and `labels`; narrow with `fields` |
| Comment on an issue | `gh issue comment <n> --body "..."` | `add_issue_comment` |
| Apply / remove labels | `gh issue edit <n> --add-label "..."` / `--remove-label "..."` | `issue_write` with `method: "update"` and the full `labels` array |
| Close | `gh issue close <n> --comment "..."` | `add_issue_comment`, then `issue_write` with `method: "update"`, `state: "closed"` and a `state_reason` |

Always set `state_reason` when closing.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues:

| Operation | `gh` CLI | MCP tool |
| --- | --- | --- |
| Read a PR | `gh pr view <n> --comments`, `gh pr diff <n>` | `pull_request_read` with `method: "get"`, then `"get_comments"` / `"get_diff"` |
| List external PRs | `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` | `list_pull_requests` |
| Comment / label / close | `gh pr comment`, `gh pr edit --add-label`, `gh pr close` | `add_issue_comment`, `update_pull_request` |

For triage, keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`
or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`). `list_pull_requests` does not
return `authorAssociation`, so in a web session fetch each candidate with
`pull_request_read` and filter on the author field there.

GitHub shares one number space across issues and PRs, so a bare `#42` may be
either — resolve with the PR read first and fall back to the issue read.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read the issue with its comments.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes /
  Decisions-so-far / Fog body.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue —
  `gh api` on the sub-issues endpoint, or `sub_issue_write` with
  `method: "add"`. Where sub-issues aren't enabled, add the child to a task list
  in the map body and put `Part of #<map>` at the top of the child body.
  Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once
  claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies** are the canonical,
  UI-visible representation. Add an edge with
  `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`,
  where `<blocker-db-id>` is the blocker's numeric **database id**
  (`gh api repos/<owner>/<repo>/issues/<n> --jq .id` — _not_ the `#number` or
  `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open
  blockers only — the live gate).

  **There is no MCP equivalent.** In a web session, use the documented fallback:
  a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is
  unblocked when every blocker is closed.
- **Frontier query**: list the map's open children, scoped to its sub-issues or
  task list; drop any with an open blocker
  (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the
  `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: assign the issue to yourself — the session's first write.
- **Resolve**: comment the answer, close the issue, then append a context
  pointer (gist + link) to the map's Decisions-so-far.
