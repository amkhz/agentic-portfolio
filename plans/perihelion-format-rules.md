> **Mirror — canonical source:** `~/projects/design-futures/guide-format-rules.md`
> **Snapshot synced:** 2026-06-10 (third sync today: accent census row added for wendt-duvall-sovereignty, guide #10)
> Re-sync on demand when the design-futures upstream evolves the format. Schema ground truth is the parser (`core/lab/parse-guide.ts`, `core/lab/guide-types.ts`); the canonical doc now states this itself.

---

# Guide Format Rules

Canonical reference for authoring Speculative Design Lab learning guides as markdown-with-frontmatter. Use this when starting a new guide, reviewing an existing one, or onboarding a future agent into the format.

---

## Core principle

**Content here, presentation in the renderer.**

You author clean markdown with structured metadata. The renderer on the portfolio site handles all the interactivity — clickable term definitions, glossary tab, section navigation, figure rendering, callout styling, section icons. Nothing about the click-to-reveal experience is implemented in the markdown itself; the renderer reads the conventions below and produces the UI.

This is why the format is renderer-agnostic markdown rather than JSX: the content stays portable, the presentation stays consistent across guides, and authoring stays in plain text.

A direct consequence, and the rule most worth internalizing: **no emojis in guide markdown.** Visual icons come from the renderer at the design-system level — Lucide for standard affordances, Phosphor for the library's few opinionated pictorial moments. The renderer keys off structural patterns (callout label text, section anchors, the `sectionIcons` frontmatter map), never glyphs embedded in content. Emojis in headers or callout lines are format errors that the portfolio parser warns on.

---

## File layout

```
learning-guides/
  <slug>.md          # in-progress drafts only
  ...
```

Flat `<slug>.md` files in `learning-guides/` is the standard layout — **for drafts in progress only**. Once a guide is delivered, the portfolio copy (`~/projects/agentic-portfolio/core/lab/guides/<slug>.md`) is canonical and the local draft is removed or moved to `archive/`. Don't edit a delivered guide here; edit it on the portfolio where the parser gates run. One-folder-per-guide (with the markdown plus cropped figure files inside) is reserved for the first figure-bearing guide — figures aren't wired into the renderer yet, and text-only guides document figure candidates in a separate watchlist file instead (see `uap-field-map-figure-watchlist.md`).

On the portfolio side, a delivered guide lands at `core/lab/guides/<slug>.md` and is auto-registered by a build-time glob — no registry edits, no routing steps. The guide is immediately available at `/g/<slug>`.

---

## Frontmatter schema

YAML frontmatter at the top of the file, fenced by `---`. Every field below is required unless marked optional.

```yaml
---
slug: uap-field-map
title: "The New Science of UAP"
kicker: "Research Guide Series"
order: 8
accent: "#e4e4e7"
accentLight: "#686774"          # optional, curated light-mode counterpart
territory: T4                   # T1 | T2 | T3 | T4
status: complete                # draft | in-progress | complete
description: A field orientation to UAP science — what's observed, what's been found, who's studying it, and how.
source:
  authors: Knuth et al.
  year: 2025
  venue: Progress in Aerospace Sciences
  url: https://arxiv.org/abs/2502.06794
  arxiv: "2502.06794v2"        # optional
sectionIcons:                   # optional, anchor -> icon name
  framing: compass
  observables: "phosphor:flying-saucer"
figures:                        # omit entirely if no figures
  - slug: nuclear-histograms
    file: fig-4-nuclear-histograms.jpg
    alt: Four-panel histogram of UAP sightings near nuclear weapons sites vs. control sites
    caption: SCU nuclear-site sighting histograms vs. control sites, 1943–1960
glossary:
  vacuum coherence: The hypothesized property of the quantum vacuum in which zero-point fluctuations exhibit organized, large-scale structure rather than random noise.
  Casimir effect: The measurable force between two uncharged conductive plates in vacuum, arising from boundary-condition restrictions on zero-point fluctuations.
---
```

### Field notes

**`slug`** — kebab-case identifier. Matches the filename (minus `.md`) and the figure-slug namespace. Stable forever; renamed = broken links.

**`title`** — full guide title. Quote when it contains a colon.

**`kicker`** — the small caps label above the title. Three values in active use:
- `DIRD Guide Series` — for guides built from DIRD source documents
- `Research Guide Series` — for single-source guides and subguides
- `Synthesis Guide` — for guides that synthesize multiple primary papers into one argument (first use: `quantum-gravity`)

**`order`** — optional integer position in the library sequence. Guides sort by order, then alphabetically by title. Reserve numbers for queued guides if you want a specific slot.

**`accent`** — hex color, quoted. Drives the guide's visual identity in dark mode (header, callout borders, glossary term color). Must hold at least 4.5:1 contrast against the dark lab background `#0e0f13`. See the accent reference below.

**`accentLight`** — optional hex color, quoted. Curated light-mode counterpart to `accent`. Recipe: hold the dark accent's hue, pull lightness into the OKLCH 0.45 to 0.52 band, lift chroma until the value holds at least 4.5:1 against the light lab background `#f8f3e9`. When absent, light mode falls back to the theme's primary accent and the parser warns once per guide so coverage gaps stay visible.

**`territory`** — `T1` | `T2` | `T3` | `T4`. Drives library filtering and accent pairing.

**`status`** — `draft` | `in-progress` | `complete`. The library renderer can hide drafts or label them visibly. Flips to `complete` happen at Justin's call after the voice pass, not at format delivery.

**`description`** — one to two sentences. Used in the library index card; should stand alone without context.

**`source`** — structured object, not a flat string:
- `authors` — short form ("Knuth et al.", "Puthoff", "White, Vera, Sylvester & Dudzinski")
- `year` — integer
- `venue` — journal, conference, program ("Progress in Aerospace Sciences", "DIA / AAWSAP Program", "Physical Review Research")
- `url` — canonical link (arXiv, journal DOI, official PDF host). Optional but strongly preferred; omitted for DIRD-source guides unless a stable URL exists.
- `arxiv` — optional arXiv identifier (e.g. `"2502.06794v2"`). Coexists with `url:` for explicit arXiv linkage.

**`sectionIcons`** — optional map of section anchor to icon name. Bare name = Lucide (`compass`, `eye-off`, `scan-search`); `phosphor:` prefix = Phosphor (`phosphor:flying-saucer`). Picks come from the locked vocabulary in the portfolio's C.2 spec (`plans/perihelion-c2-section-icons-spec.md`) — icons are unique within a guide, reused across guides only as a deliberate register link, and never borrow the callout-chip glyphs (Target, Link2, ArrowRight, Bookmark). Partial coverage is legal; a section without an entry renders without an icon. Icons are decorative by contract: the renderer marks them `aria-hidden`, so they carry no semantic weight.

**`figures`** — array. Omit the field entirely if the guide has no figures. Each entry:
- `slug` — kebab-case, used in `{figure:slug}` body references
- `file` — filename of the cropped image in the guide folder
- `alt` — accessibility text, full sentence
- `caption` — caption shown beneath the figure in the rendered guide
- `background` — optional: `paper` | `transparent` | `invert`, for figures whose source crop needs a treatment to sit on the lab surfaces

**`glossary`** — flat key-value map of every term that appears as `|term|` in the body. Definitions are 1–3 sentences, concise enough for a click-reveal card. The renderer uses these as the canonical source.

---

## Body conventions

### Section headers

Each top-level section uses `## ` with a required `{#anchor}` ID — no emoji, no decoration:

```markdown
## The Forensic Problem {#forensic-problem}
```

The anchor is what the renderer uses for deep links, the section navigation pills, and `sectionIcons` resolution. Anchors are kebab-case, derived from the section title, and stable — renaming one breaks nav and any cross-guide deep links.

Keep section count to roughly **6–9** per guide. Below 6, you're probably writing an explainer (consider a different format); above 9, you're writing a reference doc (split into two guides or push material into a subguide).

### Inline term markers

Wrap any term with a frontmatter glossary entry in pipes:

```markdown
The |vacuum coherence| framework predicts that |Casimir effect| measurements...
```

The renderer finds these markers, looks up the term in `glossary:`, and renders an underlined click target that reveals an inline definition card.

Term names in `|...|` must match the frontmatter glossary key **exactly** — same capitalization, same punctuation, same spaces. "Casimir effect" ≠ "Casimir Effect" ≠ "casimir effect".

One field-learned rule: cross-guide territory markers (`|T1|` through `|T4|`) used in callout bodies need their own glossary entries in each guide that uses them. They read as shared vocabulary but the glossary is per-guide — they were the only orphans in an otherwise clean recent delivery.

### Inline blockquoted definitions

In addition to the frontmatter glossary, definitions appear inline as styled blockquotes the first time a term is introduced in a section:

```markdown
> **vacuum coherence** — The hypothesized property of the quantum vacuum in which zero-point fluctuations exhibit organized, large-scale structure rather than random noise.
```

These exist for two reasons: the raw markdown stays readable as a standalone document, and authoring/review happens in the project chat where there's no renderer. The portfolio renderer detects the `> **term** — ...` pattern and styles it as a tinted first-mention gloss, distinct from callouts.

### Callouts

Callouts are styled blockquotes that mark cross-cutting content. They use the **two-block pattern** so the renderer can style the type label as a chip distinct from the body:

```markdown
> **Design Hook**
>
> A push-broom satellite UAP detection tool that scans known cluster regions on a fixed cadence, treating UAP as a measurable atmospheric phenomenon rather than an event-driven anomaly.
```

The blank `>` line between label and body is required. Without it the renderer can't reliably split label from content.

The renderer keys off the bold label text alone — no emoji prefix. Each callout type gets its icon at render time (a locked per-variant pick in the renderer), which is exactly why glyphs don't belong in the markdown: the one time they lived here, the spec and the guides drifted onto different emojis for the same callout type within two weeks.

**Callout types in active use:**

| Label | When to use |
|-------|-------------|
| `**Design Hook**` | A concrete product, service, tool, or experience implication that falls out of the source material |
| `**Territory Bridge**` | A cross-territory connection (T1↔T4, T2↔T3, etc.). The conceptual through-line that ties a guide to the rest of the lab |
| `**Subguide queued**` | Material flagged for its own future guide. Captures the scope hint inline so it doesn't get lost when the parent guide is finished |
| `**Read Next**` | Pointer to a related guide **already in the library**. Use sparingly — only when the link is genuinely load-bearing |

Read Next and Subguide queued divide cleanly: if the related guide exists, it's a Read Next; if it's queued, planned, or merely deserved, it's a Subguide queued. Don't mix the two in one callout — the renderer treats the variants differently, and the natural authoring mistake is letting a queued companion ride along in the closing Read Next.

Add new callout types only when an existing one doesn't fit. Keep the family small.

### Figure references

Reference a figure inline with `{figure:slug}`. No space after the colon:

```markdown
The histograms in {figure:nuclear-histograms} show a clear clustering pattern at all four sites...
```

The renderer replaces the marker with the figure (image + caption) at that location in the body. The slug must match a `figures[].slug` entry in frontmatter.

If a guide is text-only, omit the `figures:` field entirely and don't write `{figure:...}` markers. The Knuth guide (`uap-field-map`) is text-only with a separate figure watchlist file documenting candidates for future cropping.

---

## Glossary handling

### The two surfaces

Every term lives in two places:

1. **Frontmatter `glossary:`** — canonical, machine-readable, what the renderer uses
2. **Inline blockquoted definition** — first-mention introduction in the body, for human readability

These are intentionally redundant. Trim the inline blockquote when the body would feel cluttered (later sections, repeated terms). Never trim the frontmatter entry — every `|term|` marker requires a frontmatter entry.

### Orphan terms

An "orphan" is a `|term|` marker in the body with no matching frontmatter glossary entry. The portfolio parser degrades orphans to plain bold rather than breaking, but they're still format errors — the click-reveal silently disappears.

Orphan resolution is a real maintenance task we batch by guide. When resolving:

- **Match capitalization and punctuation exactly.** "C-TAP" not "C-tap" or "Ctap". "Anti-de Sitter space" not "Anti–de Sitter space" (note the hyphen vs en-dash difference).
- **Preserve en-dashes** where they appear in the source term. YAML treats these as plain string content; no special handling needed.
- **Quote YAML strings** when the value contains a colon, quotation mark, or starts with a special character. When in doubt, quote.
- **Definitions are 1–3 sentences.** Concise enough to fit in a click-reveal card; complete enough to stand alone without re-reading the surrounding paragraph.

### Glossary scope

Different guides warrant different scopes. The UAPx field methods guide carries 36 terms; the Knuth review carries 64 after its consolidation pass; the government-efforts institutional history carries 43. Scope to the source — don't pad.

Cuts to make a glossary tighter: minor org names, peripheral catalog/reference entries, terms used only once that the surrounding prose already defines clearly enough, and duplicate-concept pairs that can consolidate into one marked key.

---

## Naming conventions

### Slugs

Kebab-case, descriptive, stable. Examples that work:
- `uapx-field-methods` — paper-specific
- `uap-field-map` — orientation guide
- `dird-15-vacuum-spacetime-engineering` — DIRD-numbered
- `government-efforts-uap` — subguide, topic-anchored
- `wendt-duvall-sovereignty` — author-anchored companion

Slugs do not change after publication. Pick one you can live with.

### Accent colors

Each guide gets a dark-mode accent and (once delivered) a curated light-mode counterpart. Contrast floors are hard rules: `accent` holds ≥4.5:1 against `#0e0f13`, `accentLight` holds ≥4.5:1 against `#f8f3e9`. The portfolio parser warns on violations.

Current library census:

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
| wendt-duvall-sovereignty | `#96c7ae` | `#2e7050` | T4 |

Pair accents thematically with their territory or paper family. New T4 guides should pair visually with signal green (sage, muted greens, warm whites). New T1 guides should pair with purple (violets, warm grays).

### Territory accents

For reference, the four territories map to:

| Territory | Accent | Domain |
|-----------|--------|--------|
| T1 — Consciousness & Spacetime | `#b48efa` purple | Vacuum engineering, RV, holographic universe |
| T2 — Space Manufacturing | `#7b8aff` blue | Orbital operations |
| T3 — Materials & Sensing | `#d4708a` rose | Metamaterials, sensor fusion |
| T4 — UAP Detection | `#4ade80` signal green | Citizen science, field instruments |

---

## Workflow

The standard build path for a new guide:

1. **Bring source.** Paper, DIRD, transcript, or topic. Add to project knowledge if reusable.
2. **Frame the guide.** Decide title, slug, order, accent (and accentLight), kicker, territory. Pick `sectionIcons` from the locked C.2 vocabulary and record the picks — with their reuse rationale — in the portfolio's C.2 spec. Decide between encyclopedic coverage and narrative selection (we lean narrative).
3. **Section-by-section deep read.** Produce a digest per section, with glossary candidates, figure-watchlist entries, and callout types applied inline. This is where the real thinking happens.
4. **Assemble the markdown.** Convert digests to the format above. Frontmatter → sections → callouts → glossary cleanup.
5. **Orphan check.** Confirm every `|term|` in the body has a frontmatter entry — including territory markers. Resolve any gaps.
6. **Figure handling.** Crop figures (if any), name them per the `figures[].file` schema, drop them in the guide folder.
7. **Deliver.** Markdown + figures handed off to the portfolio site. Delivery means passing the portfolio gates clean: `npm run build` (the parser validates the full schema and warns on emoji, contrast, and accentLight coverage), `npm run test`, and `npm run audit:orphans` (zero orphans). A guide authored against this document should arrive at those gates needing no refresh pass.

For major structural changes, deliver complete files rather than incremental edits — easier to review, easier to roll back. Flag the most significant decisions at delivery for explicit confirmation.

---

## Minimal skeleton (copy-paste)

```markdown
---
slug: your-slug-here
title: "Your Title Here"
kicker: "Research Guide Series"
order: 10
accent: "#e4e4e7"
accentLight: "#686774"
territory: T4
status: draft
description: One- or two-sentence summary for the library index.
source:
  authors: Author et al.
  year: 2026
  venue: Venue Name
  url: https://example.com/paper
sectionIcons:
  first-section: compass
  second-section: telescope
glossary:
  example term: A 1–3 sentence definition that fits in a click-reveal card.
---

## First Section Title {#first-section}

Opening paragraph that introduces the section. Use |example term| to mark a glossary term inline.

> **example term** — A 1–3 sentence definition that fits in a click-reveal card.

Continue the section body in normal prose.

> **Design Hook**
>
> A concrete product, service, tool, or experience implication that falls out of this section.

> **Territory Bridge**
>
> How this connects to another territory in the lab.

## Second Section Title {#second-section}

Next section opens here.

> **Subguide queued**
>
> Material flagged for its own future guide — capture the scope hint so it isn't lost.
```

---

## What this document is not

Not a style guide for prose voice (that's `voice-profile.md`). Not a position statement (that's `the-labs-position.md`). Not a roadmap (that's the territory roadmap). Just the schema and conventions for the guide format itself.

When the format evolves — new callout type, new frontmatter field, renamed convention — update this file first, then propagate to the portfolio parser and the mirror.

---

## Format provenance

- **Canonical home:** this file. The portfolio carries a snapshot mirror at `~/projects/agentic-portfolio/plans/perihelion-format-rules.md` with a synced-date header; re-sync the mirror whenever this file changes.
- **Ground truth for the schema** is the portfolio parser: `~/projects/agentic-portfolio/core/lab/parse-guide.ts` and `core/lab/guide-types.ts`. If this document and the parser disagree, the parser wins and this document has a bug — fix it here.
- **Last aligned:** 2026-06-10, against parser state as of the government-efforts-uap delivery (9 guides, full accentLight and sectionIcons coverage). Same-day follow-up: draft-lifecycle note added to File layout (delivered guides live on the portfolio only).
- **Why this footer exists:** the no-emoji rule was first synced into this file on 2026-05-17 and was later lost to an upstream rewrite that worked from an older copy. As of 2026-06-10 this directory is under git, so history is recoverable — but the footer remains the quick continuity check. Before rewriting this file wholesale, check the last-aligned date against the portfolio mirror.
