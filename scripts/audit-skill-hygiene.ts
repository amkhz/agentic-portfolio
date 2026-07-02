/**
 * Skill + memory hygiene audit. Run via `npm run audit:skills`.
 *
 * Checks (from the 2026-07-02 skill-system optimization):
 *  1. Frontmatter descriptions in .claude/skills stay under the 512-char
 *     listing truncation (`skillListingMaxDescChars`). Hand-authored skills
 *     FAIL over the limit; installer-managed ones (Impeccable suite) only warn.
 *  2. Hand-authored crew skills are single-sourced: each must appear in
 *     .agents/skills as a SYMLINK to the .claude copy. A real directory there
 *     is drift; a missing entry breaks the Codex harness.
 *  3. Memory store (if present): every [[wikilink]] resolves to a memory file,
 *     and every file's `name:` matches its filename base.
 */
import { readdirSync, readFileSync, lstatSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { homedir } from 'node:os';

const ROOT = join(import.meta.dirname, '..');
const CLAUDE_SKILLS = join(ROOT, '.claude/skills');
const AGENTS_SKILLS = join(ROOT, '.agents/skills');
const MEMORY_DIR = join(
  homedir(),
  '.claude/projects/-Users-300mhz-projects-agentic-portfolio/memory',
);

const DESC_LIMIT = 512;
// Single-sourced, hand-authored crew skills: .claude is real, .agents is a symlink.
const CREW = ['director', 'writer', 'dreamer', 'gaff', 'roy', 'joi', 'glossarian', 'wallace'];
// Hand-authored but intentionally NOT mirrored into .agents (Codex doesn't run the chain,
// and mirroring would double their session-listing cost).
const HAND_AUTHORED = (name: string) => CREW.includes(name) || name.startsWith('invest-');

const failures: string[] = [];
const warnings: string[] = [];

// --- 1. Description length ---------------------------------------------------
for (const entry of readdirSync(CLAUDE_SKILLS)) {
  const skillMd = join(CLAUDE_SKILLS, entry, 'SKILL.md');
  if (!existsSync(skillMd)) continue;
  const match = readFileSync(skillMd, 'utf8').match(/^description:\s*(.*)$/m);
  if (!match) continue;
  const len = match[1].trim().length;
  if (len > DESC_LIMIT) {
    const msg = `${entry}: description is ${len} chars (limit ${DESC_LIMIT} — truncated in session listings)`;
    (HAND_AUTHORED(entry) ? failures : warnings).push(msg);
  }
}

// --- 2. Crew symlink convention ----------------------------------------------
for (const name of CREW) {
  const agentPath = join(AGENTS_SKILLS, name);
  if (!existsSync(agentPath)) {
    failures.push(`${name}: missing from .agents/skills (crew skills must be symlinked for Codex)`);
    continue;
  }
  if (!lstatSync(agentPath).isSymbolicLink()) {
    failures.push(`${name}: real directory in .agents/skills — drift hazard, replace with a symlink to ../../.claude/skills/${name}`);
  }
}

// --- 3. Memory store lint ------------------------------------------------------
if (existsSync(MEMORY_DIR)) {
  const files = readdirSync(MEMORY_DIR).filter((f) => f.endsWith('.md') && f !== 'MEMORY.md');
  const names = new Set(files.map((f) => basename(f, '.md')));

  for (const file of [...files, 'MEMORY.md']) {
    const body = readFileSync(join(MEMORY_DIR, file), 'utf8');
    for (const [, link] of body.matchAll(/\[\[([^\]]+)\]\]/g)) {
      if (!names.has(link)) failures.push(`memory ${file}: broken wikilink [[${link}]]`);
    }
    if (file === 'MEMORY.md') continue;
    const name = body.match(/^name:\s*(.*)$/m)?.[1].trim();
    if (name && name !== basename(file, '.md')) {
      failures.push(`memory ${file}: name "${name}" does not match filename base`);
    }
  }
} else {
  warnings.push('memory dir not found — skipping memory lint (fine on machines other than Justin\'s)');
}

// --- Report -------------------------------------------------------------------
for (const w of warnings) console.log(`WARN  ${w}`);
for (const f of failures) console.log(`FAIL  ${f}`);
if (failures.length === 0) {
  console.log(`Skill hygiene clean (${warnings.length} warning${warnings.length === 1 ? '' : 's'}).`);
} else {
  console.log(`\n${failures.length} hygiene failure(s).`);
  process.exit(1);
}
