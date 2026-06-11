# Guide Format Rules — Upstream Refresh Brief

> **Edit target:** `~/projects/design-futures/guide-format-rules.md` (the canonical source).
> **Then:** re-sync the portfolio mirror at `plans/perihelion-format-rules.md`.
> **Drafted:** 2026-06-10, alongside the government-efforts-uap guide mission.

---

## Why

The upstream rules doc predates every locked portfolio-side decision since 2026-05-03. It still instructs authors to use emojis, documents a two-value kicker vocabulary, omits five adopted frontmatter fields, and carries a stale accent table and library census. Every new guide authored upstream against this doc arrives needing the same refresh pass the government-efforts guide just got. Fixing the doc at the source ends that cycle — this is the "carry it back upstream" task the mirror header and the C.2 emoji rule have both been flagging since May.

Evidence the drift has real cost: the upstream doc specifies 📖 for Read Next, but the government-efforts guide arrived using 📎 — the emoji layer was already diverging from its own spec. The no-emoji rule eliminates the whole class of problem.

## Scope

**In:** `guide-format-rules.md` only, plus the portfolio mirror re-sync after.
**Out:** `guide-format-alignment-brief.md` (B.1 execution spec, historical), `voice-profile.md`, `the-labs-position.md`, the tracker, and any retroactive edits to upstream guide files themselves.

Ground truth for every schema claim is the portfolio parser (`core/lab/parse-guide.ts`, `core/lab/guide-types.ts`) — where this brief and the parser disagree, the parser wins and the brief has a bug.

---

## The changes, by section of the upstream doc

### 1. File layout

Current doc prescribes one-folder-per-guide with a `guide.md` inside. Actual practice in `learning-guides/` is flat `<slug>.md` files (plus legacy .jsx/.html awaiting archive). Update to match reality:

- Flat `learning-guides/<slug>.md` is the standard layout.
- Folder-per-guide is reserved for the first figure-bearing guide (figures still aren't wired into the renderer; keep the figure-watchlist-file pattern as the interim, citing `uap-field-map-figure-watchlist.md`).
- Portfolio destination is `core/lab/guides/<slug>.md`, auto-registered by build-time glob — no registry edits.

### 2. Frontmatter schema — adopt the five portfolio fields

All formally adopted portfolio-side and now in use across all 9 guides; the upstream doc lists none of them:

| Field | Spec to write |
|-------|---------------|
| `territory` | required; `T1 \| T2 \| T3 \| T4`; drives library filtering and accent pairing |
| `status` | required; `draft \| in-progress \| complete` (the parser's enum — the mirror's older `draft\|complete` note is wrong) |
| `accentLight` | optional; quoted hex; recipe: hold the dark accent's hue, OKLCH lightness 0.45–0.52, lift chroma until ≥4.5:1 against the light lab background `#f8f3e9`; parser warns once per guide when absent |
| `sectionIcons` | optional; map of section anchor → icon name; bare name = Lucide, `phosphor:` prefix = Phosphor; picks come from the locked C.2 vocabulary (`plans/perihelion-c2-section-icons-spec.md`) — unique within a guide, reuse across guides only as a deliberate register link, never the callout-chip glyphs (Target, Link2, ArrowRight, Bookmark) |
| `source.arxiv` | optional; arXiv identifier string, coexists with `url` |

Also in this section:
- **Kicker:** add the third blessed value, `Synthesis Guide` (blessed 2026-06-09, first use `quantum-gravity`), with its rule: guides synthesizing multiple primary papers into one argument.
- **Glossary definition length:** the doc currently says "1–2 sentences" in the schema notes and "1–3" under orphan resolution. Unify on **1–3 sentences** everywhere (matches actual practice and the click-reveal card constraint).

### 3. Body conventions — the emoji removal

This is the headline change. Three spots:

- **Section headers:** delete "with an optional emoji"; the example becomes `## The Forensic Problem {#forensic-problem}`. State the rule and its rationale verbatim from the portfolio side: no emojis anywhere in guide markdown; visual icons come from the renderer at the design-system level via `sectionIcons`; the renderer keys off structural patterns (callout label text, section anchor), not glyphs in the content.
- **Callout example and table:** strip emoji from the `> 🎯 **Design Hook**` example; delete the Emoji column from the callout-types table entirely. The two-block pattern (label, blank `>` line, body) is unchanged and stays required.
- **Minimal skeleton:** regenerate emoji-free and with the full modern frontmatter (territory, status, accentLight commented as optional, sectionIcons commented as optional, source.arxiv commented as optional).

### 4. Callout guidance — one quality rule from the field

Add the distinction the government-efforts refresh enforced: **Read Next points only at guides already in the library; a queued guide gets a `Subguide queued` callout instead.** Mixing them in one Read Next was the natural authoring mistake and the renderer treats the two variants differently.

### 5. Naming conventions — refresh the accent table to the current library

Replace the stale six-row table with the current nine-guide census (and add the accentLight column, since upstream authors now pick both):

| Guide | accent | accentLight | Territory |
|-------|--------|-------------|-----------|
| dird-13-warp-drive | `#f0a050` | `#975705` | T1 |
| dird-14-superconductors-gravity | `#e8a849` | `#8e5e02` | T3 |
| dird-15-vacuum-spacetime-engineering | `#b48efa` | `#7a46c3` | T1 |
| dird-28-breakthrough-cockpits | `#4ecdc4` | `#067973` | T1 |
| emergent-quantization | `#f0a050` | `#975705` | T1 |
| quantum-gravity | `#4ecdc4` | `#067973` | T1 |
| uap-field-map | `#e4e4e7` | `#686774` | T4 |
| uapx-field-methods | `#4ade80` | `#0d7e3f` | T4 |
| government-efforts-uap | `#7ca982` | `#44734c` | T4 |

Keep the territory-accent reference table (unchanged) and the pairing guidance; add the contrast floor as a stated rule: dark accents hold ≥4.5:1 against `#0e0f13`, light accents ≥4.5:1 against `#f8f3e9`.

### 6. Glossary scope — refresh the numbers

"The Knuth review carries ~60" → it carries 73; add government-efforts (40 terms) as the second large-scope example. Add one rule learned in the field: cross-guide territory markers (`|T1|`…`|T4|`) used in callouts need their own glossary entries per guide — they were the only orphans in an otherwise clean guide.

### 7. Workflow — add the validation reality

The 7-step build path gains two items:

- Step 2 (Frame the guide) now includes picking `sectionIcons` from the locked C.2 vocabulary and recording the picks (with reuse rationale) in the C.2 spec.
- New final step: portfolio-side gates before a guide is considered delivered — `npm run build` (parser validates schema, warns on emoji/contrast/coverage), `npm run test`, `npm run audit:orphans` (zero orphans). Authoring upstream against this doc means arriving at those gates clean.

### 8. Provenance footer

Add a short "Format version" block at the bottom of the upstream doc: last-aligned date, pointer to the portfolio mirror, and the standing instruction that schema changes land here first, then propagate to the parser and the mirror (the doc's closing line already says this — make it actionable with the file paths).

---

## Then: re-sync the mirror

After the upstream edit, regenerate `plans/perihelion-format-rules.md` as a fresh snapshot. Most of its "portfolio-side deviation/note" annotations exist only because upstream lagged — they dissolve once upstream absorbs the decisions. The mirror header keeps its canonical-source pointer and gets a new synced date. The standing Track-B "carry upstream" items in `perihelion-next-steps.md` get checked off.

## Crew lanes

- **Tyrell (build):** both edits — upstream doc, then mirror re-sync. Doc work only; no parser, renderer, or guide-file changes.
- **Roy (review):** diff the refreshed upstream doc against `core/lab/parse-guide.ts` + `guide-types.ts` field by field — the parser is ground truth. Verify the accent census against the live guide frontmatter, not this brief.
- **Justin:** one judgment call flagged below; otherwise review at delivery.

## Flagged for Justin

The **file layout** section (change 1) is the only place this brief prescribes design-futures' own working practice rather than recording a locked decision. Flat-file-with-figure-folders-later matches what `learning-guides/` actually looks like, but it's your workspace — veto or amend at review.

## Acceptance

1. `grep -c` for emoji characters in the upstream doc returns zero.
2. Every frontmatter field in the upstream schema block exists in `guide-types.ts` with matching required/optional status and enums.
3. The accent table matches a fresh `grep "^accent" core/lab/guides/*.md` census.
4. The mirror is a byte-faithful snapshot of the new canonical plus its mirror header, with zero remaining "portfolio-side deviation" annotations.
5. A future guide authored upstream against the refreshed doc would pass all four portfolio gates without a refresh pass.
