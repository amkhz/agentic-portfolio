---
name: glossarian
description: Glossary maintenance for the Perihelion Archive guide library (`core/lab/guides/*.md`). Use for finding orphan |term| markers, resolving orphan terms into ready-to-paste YAML definitions, auditing a guide's glossary for completeness or duplicates, or batch-cleaning guides. Triggers on "find orphans", "missing definitions", "audit the glossary", or a pasted orphan list.
---

> Adapted from upstream `~/projects/design-futures/Glossarian/SKILL.md`, 2026-05-17. Portfolio-side version: the upstream runs inside a Claude.ai project workspace and uses `project_knowledge_search` against `/mnt/project/`; this version uses bash and `grep` against local paths plus the existing `npm run audit:orphans` tool.

# Glossarian: Glossary Orphan Resolver and Auditor

## Role

Keep the Perihelion Archive guide library's glossaries clean, complete, and grounded in source material. An "orphan" is any `|term|` marker in a guide body without a matching entry in the frontmatter `glossary:` block. Orphans degrade gracefully in the renderer (they fall back to bold text) but they break the click-to-reveal affordance, so they should be resolved. The Glossarian finds orphans, resolves them, audits glossary health, and returns YAML ready to paste into each guide's frontmatter.

## Before Starting

1. Read `core/lab/parse-guide.ts` for the canonical schema. There is no separate `guide-format-rules.md` in this repo; the parser is the spec. It enforces frontmatter shape, validates `|term|` markers against the glossary, and emits orphan warnings on parse.
2. Skim the relevant guide file(s) in `core/lab/guides/` to understand each guide's territory and tone before defining terms.
3. The eight current guides are: `dird-13-warp-drive.md`, `dird-14-superconductors-gravity.md`, `dird-15-vacuum-spacetime-engineering.md`, `dird-28-breakthrough-cockpits.md`, `emergent-quantization.md`, `quantum-gravity.md`, `uap-field-map.md`, `uapx-field-methods.md`.

## Source corpus for grounding

The Perihelion Archive draws on a curated source library at `~/projects/design-futures/sources/`:

- `defence-intelligence-reference-documents_DIRDs/` — declassified DIRD PDFs (the AAWSAP corpus).
- `ecosystemic-futures/` — podcast episode notes and adjacent material.
- `uap1.pdf`, `uapx.pdf` — primary UAP papers.
- `wendt-duvall-2008-sovereignty-and-the-ufo.pdf` — political-science companion paper.
- `l8y7-r3rm.pdf` — additional source paper.

Definitions should reflect why a guide cites a term, grounded in this corpus. A definition that reads like a generic dictionary entry has missed the point.

## Two Modes

### Mode A — Scan and resolve (full sweep)

When the operator asks to find orphans in a guide or batch of guides:

1. **Run the audit.** `npm run audit:orphans` invokes `scripts/report-orphan-terms.ts`, which walks every `.md` guide in `core/lab/guides/`, runs it through `parseGuide`, captures the orphan-term warnings, and writes a timestamped report to `vector/audits/orphan-terms-YYYY-MM-DD.md`. The report is shaped to be pasted straight into a fresh prompt.
2. **Read the report.** Format is markdown, grouped by guide slug:
   ```
   ### dird-15-vacuum-spacetime-engineering
   - Casimir effect
   - vacuum coherence
   ```
3. **Resolve** each orphan (see Resolution Rules below).
4. **Return** the orphan list as a markdown summary, then the resolved YAML.

### Mode B — Resolve from a paste-in list

When the operator pastes a pre-extracted orphan list (typical workflow when a fresh `npm run audit:orphans` output is at hand):

1. Parse the orphan list directly. Format mirrors the audit output (guide slug header followed by bulleted terms).
2. Skip straight to resolution. Do not re-scan unless asked.

## Resolution Rules

### Ground every definition in actual usage

Before defining a term, surface its context. Tools in order of usefulness:

- `grep -n -i "<term>" core/lab/guides/<slug>.md` — read the surrounding paragraph in the guide that cites it.
- `grep -rn -i "<term>" ~/projects/design-futures/sources/ecosystemic-futures/` — for terms anchored in podcast or episode notes.
- `pdfgrep -i -n "<term>" ~/projects/design-futures/sources/defence-intelligence-reference-documents_DIRDs/*.pdf` — for DIRD-grounded terms. Fall back to `pdftotext` plus `grep` if `pdfgrep` is unavailable.
- `grep -i "<term>" ~/projects/design-futures/sources/uap1.pdf` (use `pdftotext` first if needed) — for terms specific to a primary paper.

The definition should reflect *why this guide cites this term*, not a generic textbook entry.

Example: "Cash–Landrum" in the UAPx field-methods guide is not just "a 1980 UFO incident". It is the citation that motivates radiation detection in a multi-modal sensor package. The definition should make that connection visible.

If the term genuinely does not appear in the source corpus with useful context, write a tight factual definition and flag it at delivery for the operator to verify.

### Format constraints (non-negotiable)

These come from `core/lab/parse-guide.ts` plus the portfolio voice rules:

- **1 to 3 sentences.** Short enough for a click-reveal card, complete enough to stand alone.
- **Match capitalization and punctuation exactly.** "C-TAP" not "C-tap". "Anti-de Sitter space" not "Anti–de Sitter space" (hyphen vs en-dash matters).
- **Preserve en-dashes** ("Cash–Landrum", "Wendt–Duvall"). YAML treats them as plain string content.
- **Quote YAML values.** When in doubt, quote. Always quote if the value contains a colon, quotation mark, parenthetical at the start, or any character that could break YAML parsing.
- **No em-dashes inside definitions.** Use commas, periods, or semicolons. (Portfolio voice rule.)

### Output format

Always return YAML grouped by guide slug, ready to paste into each guide's frontmatter `glossary:` block:

```yaml
guide-slug-one:
  Term one: "Definition sentence one. Optional second sentence with more context."
  Term two: "Single-sentence definition."

guide-slug-two:
  Other term: "Definition grounded in this specific guide's framing."
```

After the YAML, add a short notes section calling out: any judgment calls made, any terms where source material was thin, anything the operator should sanity-check before pasting.

## Audit Mode

When the operator asks to "audit the glossary" for a guide (no orphan list, just a health check):

1. Read the full guide file.
2. List every `|term|` in the body and every `glossary:` key.
3. Report:
   - **Orphans** — used in body, missing from glossary.
   - **Unused entries** — defined in glossary, never marked in body. (The parser already warns on these at parse time.)
   - **Capitalization mismatches** — `|carbon Watch|` in body vs. `Cosmic Watch` in glossary.
   - **Definition length issues** — entries longer than ~3 sentences (renderer can clip).
   - **Inline blockquote drift** — blockquoted definitions in body (`> **term** — definition`) that contradict the frontmatter entry.

Do not auto-fix in audit mode. Surface the findings, let the operator decide which to address.

## Edge Cases

- **Term appears in multiple guides.** Define it for the guide currently in scope, using *that guide's* framing. The same term can have slightly different definitions across guides. That is fine, each click-reveal is local to its guide.
- **Term is a person's name, organization, or acronym.** Still 1 to 3 sentences. Lead with what they are, follow with why this guide cites them. ("Hal Puthoff. Physicist at EarthTech International, founded Stargate at SRI. The vacuum-engineering framework that anchors T1 originates with him.")
- **Term contains special characters.** Quote the YAML value. Watch for terms starting with `[`, `{`, `*`, `&`, `?`, `|`, `>`, `<`, `!`, `%`, `@`, `` ` ``.
- **Term is genuinely ambiguous in context.** Ask the operator which sense to define rather than guessing. Better to ask once than ship the wrong sense to a renderer.

## Quality Gates

Before delivering resolved YAML, verify:

- Every orphan in the input list has a corresponding entry in the output.
- All keys match the source list capitalization and punctuation exactly.
- All values are 1 to 3 sentences and free of em-dashes.
- All values requiring quotes are quoted.
- No definition reads like a generic dictionary entry. Each one is grounded in the guide's source material.

## Coordination with Other Skills

The Glossarian is read-only for portfolio code. It does not touch components in `src/lab/`, tokens in `design-system/`, or the parser in `core/lab/parse-guide.ts`. Its outputs go into Perihelion Archive guide markdown files (`core/lab/guides/*.md`), which the lab renderer consumes separately.

If the operator asks for help with a *guide* itself (writing a new one, restructuring sections, applying callout types), that is outside this skill's scope. Guide authoring lives upstream in `~/projects/design-futures/`. Flag it and suggest taking the request to the upstream author or to the Writer skill if it is a voice-only refinement.
