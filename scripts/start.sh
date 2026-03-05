#!/bin/bash
# start.sh — Launch your app and open Claude Code
# Starts the Vite dev server in the background, then opens Claude Code.
# When you exit Claude, the dev server stops automatically.

LOGFILE="/tmp/agentic-portfolio-vite-$$.log"

# Clean up on exit
cleanup() {
  if [ -n "$DEV_PID" ]; then
    kill "$DEV_PID" 2>/dev/null
    wait "$DEV_PID" 2>/dev/null
  fi
  rm -f "$LOGFILE"
}
trap cleanup EXIT

# Check for node_modules
if [ ! -d node_modules ]; then
  echo "  Dependencies not installed. Run: bash scripts/install.sh"
  exit 1
fi

# Start dev server in the background
echo ""
echo "  Starting dev server..."
npm run dev > "$LOGFILE" 2>&1 &
DEV_PID=$!

# Wait for Vite to be ready
sleep 3

# Verify it started
if ! kill -0 "$DEV_PID" 2>/dev/null; then
  echo "  Dev server failed to start:"
  cat "$LOGFILE"
  exit 1
fi

echo "  Dev server running (check terminal output for URL)"
echo ""

# Launch Claude Code
if command -v claude &> /dev/null; then
  echo "  Launching Claude Code..."
  echo "  (When you exit Claude, the dev server will stop automatically.)"
  echo ""
  claude
else
  echo "  Claude Code is not installed."
  echo "  Run: npm install -g @anthropic-ai/claude-code"
  echo ""
  echo "  Your dev server is running — press Ctrl+C to stop it."
  wait "$DEV_PID"
fi
