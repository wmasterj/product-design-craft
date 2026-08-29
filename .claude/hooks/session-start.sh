#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web — local checkouts manage their own deps.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

corepack enable pnpm 2>/dev/null || true
pnpm install --prefer-offline

# Playwright is pinned to the Chromium build baked into the web image, so the
# browsers are already present. Point Playwright at them and never download.
if [ -d /opt/pw-browsers ]; then
  {
    echo 'export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers'
    echo 'export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1'
  } >> "${CLAUDE_ENV_FILE:-/dev/null}"
fi
