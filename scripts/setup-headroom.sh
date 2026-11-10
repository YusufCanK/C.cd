#!/usr/bin/env bash
# SessionStart hook: installs Headroom (MCP) and the claude-mem plugin once per container.
set -uo pipefail

VENV=/root/.headroom-venv
if ! "$VENV/bin/python" -c "import mcp" >/dev/null 2>&1; then
  [ -d "$VENV" ] || python3 -m venv "$VENV";  "$VENV/bin/pip" install -q "headroom-ai[mcp,code]" || echo "headroom install failed" >&2
fi

if command -v claude >/dev/null 2>&1 && ! claude plugin list 2>/dev/null | grep -q "claude-mem@thedotmack"; then
  claude plugin marketplace add thedotmack/claude-mem >/dev/null 2>&1 || true
  claude plugin install claude-mem@thedotmack >/dev/null 2>&1 || echo "claude-mem install failed" >&2
fi
exit 0
