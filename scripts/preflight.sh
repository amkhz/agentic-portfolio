#!/bin/bash
# preflight.sh — Verify your environment is ready to build
# Run this before starting work or if something isn't working.

PASS="ok"
FAIL="FAIL"
WARN="WARN"
ALL_GOOD=true

echo ""
echo "  Preflight Check"
echo "  Verifying your development environment..."
echo ""

# 1. Node.js >= 20
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  NODE_MAJOR=$(echo "$NODE_VERSION" | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 20 ]; then
    echo "  $PASS  Node.js installed ($NODE_VERSION)"
  else
    echo "  $FAIL  Node.js $NODE_VERSION found but >= 20 required"
    ALL_GOOD=false
  fi
else
  echo "  $FAIL  Node.js not found — run: bash scripts/install.sh"
  ALL_GOOD=false
fi

# 2. npm
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm --version)
  echo "  $PASS  npm installed ($NPM_VERSION)"
else
  echo "  $FAIL  npm not found — install Node.js first"
  ALL_GOOD=false
fi

# 3. Git
if command -v git &> /dev/null; then
  GIT_VERSION=$(git --version | awk '{print $3}')
  echo "  $PASS  Git installed ($GIT_VERSION)"
else
  echo "  $FAIL  Git not found — run: bash scripts/install.sh"
  ALL_GOOD=false
fi

# 4. Dependencies installed
if [ -d node_modules ]; then
  echo "  $PASS  Dependencies installed (node_modules/ exists)"
else
  echo "  $FAIL  Dependencies not installed — run: npm install"
  ALL_GOOD=false
fi

# 5. CLAUDE.md exists
if [ -f CLAUDE.md ]; then
  echo "  $PASS  CLAUDE.md exists"
else
  echo "  $FAIL  CLAUDE.md not found"
  ALL_GOOD=false
fi

# 6. ARCHITECTURE.md exists
if [ -f ARCHITECTURE.md ]; then
  echo "  $PASS  ARCHITECTURE.md exists"
else
  echo "  $FAIL  ARCHITECTURE.md not found"
  ALL_GOOD=false
fi

# 7. VECTOR.md exists
if [ -f VECTOR.md ]; then
  echo "  $PASS  VECTOR.md exists"
else
  echo "  $FAIL  VECTOR.md not found"
  ALL_GOOD=false
fi

# 8. Claude Code installed
if command -v claude &> /dev/null; then
  echo "  $PASS  Claude Code installed"
else
  echo "  $WARN  Claude Code not found — run: npm install -g @anthropic-ai/claude-code"
fi

# 9. Git configured
if git config user.name &> /dev/null && git config user.email &> /dev/null; then
  GIT_NAME=$(git config user.name)
  GIT_EMAIL=$(git config user.email)
  echo "  $PASS  Git configured ($GIT_NAME <$GIT_EMAIL>)"
else
  echo "  $WARN  Git not configured with name/email"
  echo "         Run: git config --global user.name \"Your Name\""
  echo "         Run: git config --global user.email \"you@example.com\""
fi

# Summary
echo ""
if [ "$ALL_GOOD" = true ]; then
  echo "  All checks passed. You're ready to build."
else
  echo "  Some checks failed. Fix the issues above and run preflight.sh again."
fi
echo ""
