#!/usr/bin/env bash
# Installs Headroom (context compression MCP server) once per container.
set -euo pipefail
VENV=/root/.headroom-venv
[ -x "$VENV/bin/headroom" ] && exit 0
python3 -m venv "$VENV"
"$VENV/bin/pip" install -q "headroom-ai[code]"
