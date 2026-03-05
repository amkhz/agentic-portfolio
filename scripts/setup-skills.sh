#!/usr/bin/env bash
# Creates skill links from .claude/skills/ and .cursor/skills/ to .agents/skills/ (source of truth).
# Run once after cloning the repo on a new machine.
#
# Usage: bash scripts/setup-skills.sh
#
# macOS/Linux: creates symlinks
# Windows (Git Bash / WSL): creates junctions (mklink /J) or symlinks (mklink /D if admin)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_DIR="$REPO_ROOT/.agents/skills"

SKILLS=(writer builder director dreamer)

# Target directories for each IDE (relative depth from target to .agents/skills/)
TARGETS=(
  "$REPO_ROOT/.claude/skills|../../.agents/skills"
  "$REPO_ROOT/.cursor/skills|../../.agents/skills"
)

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: $SOURCE_DIR not found. Are you in the right repo?"
  exit 1
fi

# link_skill <skill_name> <target_dir> <relative_prefix>
link_skill() {
  local skill="$1"
  local target_dir="$2"
  local rel_prefix="$3"
  local target="$target_dir/$skill"
  local source="$SOURCE_DIR/$skill"

  if [ ! -d "$source" ]; then
    echo "  Warning: $source not found, skipping"
    return
  fi

  # Remove existing link/directory if present
  if [ -L "$target" ] || [ -d "$target" ]; then
    rm -rf "$target"
  fi

  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    win_target=$(cygpath -w "$target")
    win_source=$(cygpath -w "$source")
    cmd //c mklink //J "$win_target" "$win_source" > /dev/null
    echo "  Junction: $skill -> .agents/skills/$skill"
  else
    ln -s "$rel_prefix/$skill" "$target"
    echo "  Symlink: $skill -> .agents/skills/$skill"
  fi
}

for entry in "${TARGETS[@]}"; do
  target_dir="${entry%%|*}"
  rel_prefix="${entry##*|}"
  label="${target_dir#$REPO_ROOT/}"

  mkdir -p "$target_dir"
  echo "Linking skills in $label/"

  for skill in "${SKILLS[@]}"; do
    link_skill "$skill" "$target_dir" "$rel_prefix"
  done
  echo ""
done

echo "Done. Skills linked for Claude Code and Cursor."
