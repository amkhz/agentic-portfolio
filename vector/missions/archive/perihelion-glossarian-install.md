# Mission: Install portfolio-side Glossarian skill

**Date:** 2026-05-17
**Branch:** `chore/perihelion-glossarian-install`
**Worktree:** `/Users/300mhz/projects/agentic-portfolio/.claude/worktrees/agent-a02631bebe10e7b3c`

## Scope

Install a portfolio-side adaptation of the upstream **Glossarian** skill so it can run locally against the Perihelion Archive guide library. The upstream lives at `~/projects/design-futures/Glossarian/SKILL.md` and was authored to run inside a Claude.ai project workspace. This adaptation moves it into `.claude/skills/glossarian/SKILL.md` and rewires it for the portfolio repo's filesystem and tooling.

This mission installs the skill only. Actually resolving orphan terms is a follow-on, not part of this work.

## What we adapted from upstream

The upstream's core shape carries over verbatim:

- The Role section, framing the Glossarian as a glossary maintainer for a guide library.
- The two-mode structure (full sweep vs. paste-in resolution).
- The Resolution Rules (1 to 3 sentences, exact capitalization, quoted YAML values, ground every definition in source material).
- The Audit Mode procedure for surfacing orphans, unused entries, capitalization mismatches, length issues, and blockquote drift.
- The Edge Cases section.
- The Quality Gates checklist.
- The Coordination note about staying out of portfolio code and routing guide authoring elsewhere.

## Key differences from the upstream version

| Upstream | Portfolio-side |
|---|---|
| `project_knowledge_search` against `/mnt/project/` | `grep` against `core/lab/guides/*.md` and `pdfgrep` / `pdftotext` against `~/projects/design-futures/sources/` |
| References `/mnt/project/guide-format-rules.md` as the schema source | References `core/lab/parse-guide.ts` directly (no separate format-rules doc lives in the portfolio; the parser is the spec) |
| Generic "locate the guide files" with bash grep | Concrete invocation: `npm run audit:orphans` wrapping `scripts/report-orphan-terms.ts`, which writes `vector/audits/orphan-terms-YYYY-MM-DD.md` |
| Mentions JSX legacy guides with embedded `terms:` objects | Dropped, the portfolio's lab is markdown-only |
| Generic "newer guides are markdown" hint | Names the eight current guides explicitly |
| No source corpus call-out | Enumerates the upstream source corpus: DIRDs, ecosystemic-futures notes, `uap1.pdf`, `uapx.pdf`, `wendt-duvall-2008-sovereignty-and-the-ufo.pdf`, `l8y7-r3rm.pdf` |
| Em-dashes used in body copy | Em-dashes removed throughout (portfolio rule) |

The description in the frontmatter was rewritten to mention `core/lab/guides` and `~/projects/design-futures/sources/` directly so the skill surfaces on the right triggers in this workspace.

## How to invoke the skill

The skill is project-scoped under `.claude/skills/glossarian/SKILL.md` and is loaded automatically by Claude Code when its description matches the user's request. Triggers include:

- "Find orphan terms in the lab guides."
- "Resolve the orphans in `vector/audits/orphan-terms-2026-05-17.md`."
- "Audit the glossary for `dird-15-vacuum-spacetime-engineering`."
- Pasting in a markdown orphan list grouped by guide slug.

The skill itself wraps the existing `npm run audit:orphans` (which calls `scripts/report-orphan-terms.ts`) for detection. Resolution is grounded by:

- `grep -n -i "<term>" core/lab/guides/<slug>.md`
- `grep -rn -i "<term>" ~/projects/design-futures/sources/ecosystemic-futures/`
- `pdfgrep -i -n "<term>" ~/projects/design-futures/sources/defence-intelligence-reference-documents_DIRDs/*.pdf` (or `pdftotext` fallback).

## Not in scope

- **No orphan resolution.** The most recent report (`vector/audits/orphan-terms-2026-04-21.md`) is empty ("No orphan terms in any guide. Nothing to do."), so there is nothing pending. A fresh run of `npm run audit:orphans` after future guide edits will produce work for the Glossarian to act on.
- **No touch on `core/lab/guides/*.md`.** The guides are the consumer, not the install target.
- **No touch on `scripts/report-orphan-terms.ts`.** The script works; the skill wraps it.
- **No `.agents/skills/` or `.cursor/skills/` install.** Portfolio-side install is `.claude/`-only for now. If Justin wants the skill available to other agent harnesses, that's a separate follow-on.
- **No lint/build/test run.** This is a skill file addition, no code changes, no test surface.
- **No push or PR.** Branch stays local until Justin decides.

## Verification

- Confirmed `scripts/report-orphan-terms.ts` exists and is wired to `npm run audit:orphans` via `package.json`.
- Confirmed `~/projects/design-futures/sources/` exists and contains the expected DIRD PDFs, ecosystemic-futures notes, and source papers named in the skill body.
- Confirmed the most recent audit report (`vector/audits/orphan-terms-2026-04-21.md`) is "no orphans" — clean baseline.
- Branch renamed from the auto-created worktree name to `chore/perihelion-glossarian-install`.
