> **Mirror — canonical source:** `~/projects/design-futures/guide-format-rules.md`
> **Snapshot synced:** 2026-05-03
> Re-sync on demand when the design-futures upstream evolves the format. Portfolio-side changes to the schema (e.g. adopting `slug:`, `territory:`, `status:`, `arxiv:`) are noted in `plans/perihelion-next-steps.md` under Locked decisions; carry them upstream when convenient.

---

# Guide Format Rules

Canonical reference for authoring Speculative Design Lab learning guides as markdown-with-frontmatter. Use this when starting a new guide, reviewing an existing one, or onboarding a future agent into the format.

---

## Core principle

**Content here, presentation in the renderer.**

You author clean markdown with structured metadata. The renderer on the portfolio site handles all the interactivity — clickable term definitions, glossary tab, section navigation, figure rendering, callout styling. Nothing about the click-to-reveal experience is implemented in the markdown itself; the renderer reads the conventions below and produces the UI.

This is why the format is renderer-agnostic markdown rather than JSX: the content stays portable, the presentation stays consistent across guides, and authoring stays in plain text.

---

## File layout

```
/uapx-field-methods/
  guide.md
  fig-1-ufodap-deployment.jpg
  fig-2-c-tap-pipeline.jpg
  fig-3-dark-spot.jpg
  ...
```

One folder per guide, named with the guide slug. The markdown file is always `guide.md`. Cropped figures sit alongside it and are referenced by filename in the frontmatter.

> **Portfolio-side deviation:** the lab currently uses flat files (`core/lab/guides/<slug>.md`) without per-guide folders. Figures aren't yet wired in; revisit when the first figure-bearing guide arrives.

---

## Frontmatter schema

YAML frontmatter at the top of the file, fenced by `---`. Every field below is required unless marked optional.

```yaml
---
slug: uap-field-map
title: The New Science of UAP
kicker: Research Guide Series
order: 8
accent: "#e4e4e7"
description: A field orientation to UAP science — what's observed, what's been found, who's studying it, and how.
source:
  authors: Knuth et al.
  year: 2025
  venue: Progress in Aerospace Sciences
  url: https://arxiv.org/abs/2502.06794
  arxiv: "2502.06794v2"        # optional, portfolio-side addition
territory: T4                   # portfolio-side, formally adopted
status: complete                # portfolio-side, formally adopted (draft|complete)
figures:
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

**`slug`** — kebab-case identifier. Matches the folder name and the figure-slug namespace. Stable forever; renamed = broken links.

> **Portfolio-side note:** the existing 8 guides currently use `id:` instead of `slug:`. Migration to `slug:` is the first task of Workstream B.1 (see `perihelion-next-steps.md`).

**`kicker`** — the small caps label above the title. Two values in active use:
- `DIRD Guide Series` — for guides built from DIRD source documents
- `Research Guide Series` — for everything else (papers, syntheses, subguides)

**`order`** — integer position in the library sequence. Reserve numbers for queued guides if you want a specific slot.

**`accent`** — hex color, quoted. Drives the guide's visual identity (header, callout borders, glossary term color). See the territory accent reference below.

**`description`** — one to two sentences. Used in the library index card; should stand alone without context.

**`source`** — structured object, not a flat string:
- `authors` — short form ("Knuth et al.", "Puthoff", "White, Vera, Sylvester & Dudzinski")
- `year` — integer
- `venue` — journal, conference, program ("Progress in Aerospace Sciences", "DIA / AAWSAP Program", "Physical Review Research")
- `url` — canonical link (arXiv, journal DOI, official PDF host). Optional but strongly preferred.
- `arxiv` — optional arXiv identifier (e.g. `"2502.06794v2"`). Portfolio-side addition; coexists with `url:` for explicit arXiv linkage.

**`territory`** — `T1` | `T2` | `T3` | `T4`. Portfolio-side, formally adopted. Drives library filtering and accent pairing.

**`status`** — `draft` | `complete`. Portfolio-side, formally adopted. Library renderer can hide drafts or label them visibly.

**`figures`** — array. Omit the field entirely if the guide has no figures. Each entry:
- `slug` — kebab-case, used in `{figure:slug}` body references
- `file` — filename of the cropped image in the guide folder
- `alt` — accessibility text, full sentence
- `caption` — caption shown beneath the figure in the rendered guide

**`glossary`** — flat key-value map of every term that appears as `|term|` in the body. Definitions are 1–2 sentences, concise. The renderer uses these as the canonical source for click-to-reveal cards.

---

## Body conventions

> **Portfolio-side rule (2026-05-03):** **No emojis in guide markdown.** Visual icons come from the renderer at the design-system level (Lucide for standard UI affordances, Phosphor for opinionated pictorial moments — locked icon libraries per the next-steps plan). New guides should omit emojis entirely from section headers and callout lines; the renderer uses the structural pattern (callout label text, section anchor) to know what to draw. Existing guides get swept to icons during Workstream C.2. **This rule needs to be carried back to the upstream `guide-format-rules.md` so the upstream author doesn't keep producing emoji-laden guides.**

### Section headers

Each top-level section uses `## ` with a required `{#anchor}` ID:

```markdown
## The Forensic Problem {#forensic-problem}
```

The anchor is what the renderer uses for deep links and the section navigation pills. Anchors are kebab-case, derived from the section title.

Keep section count to roughly **6–9** per guide. Below 6, you're probably writing an explainer (consider a different format); above 9, you're writing a reference doc (split into two guides or push material into a subguide).

### Inline term markers

Wrap any term with a frontmatter glossary entry in pipes:

```markdown
The |vacuum coherence| framework predicts that |Casimir effect| measurements...
```

The renderer finds these markers, looks up the term in `glossary:`, and renders an underlined click target that reveals an inline definition card.

Term names in `|...|` must match the frontmatter glossary key **exactly** — same capitalization, same punctuation, same spaces. "Casimir effect" ≠ "Casimir Effect" ≠ "casimir effect".

### Inline blockquoted definitions

In addition to the frontmatter glossary, definitions appear inline as styled blockquotes the first time a term is introduced in a section:

```markdown
> **vacuum coherence** — The hypothesized property of the quantum vacuum in which zero-point fluctuations exhibit organized, large-scale structure rather than random noise.
```

These exist for two reasons: the raw markdown stays readable as a standalone document, and authoring/review happens in the project chat where there's no renderer. The renderer can either ignore these (treating frontmatter as the single source) or render them as styled glosses. Either behavior is acceptable.

> **Portfolio-side status:** `GuideBlockquote.tsx` currently renders all `>` blocks generically (left border, secondary text). Workstream B.1 will enhance the parser to distinguish definition glosses from callouts and apply distinct visual treatment.

### Callouts

Callouts are styled blockquotes that mark cross-cutting content. They use the **two-block pattern** so the renderer can style the type label as a chip distinct from the body:

```markdown
> **Design Hook**
>
> A push-broom satellite UAP detection tool that scans known cluster regions on a fixed cadence, treating UAP as a measurable atmospheric phenomenon rather than an event-driven anomaly.
```

The blank `>` line between label and body is required. Without it the renderer can't reliably split label from content.

**Callout types in active use:**

| Label | When to use |
|-------|-------------|
| `**Design Hook**` | A concrete product, service, tool, or experience implication that falls out of the source material |
| `**Territory Bridge**` | A cross-territory connection (T1↔T4, T2↔T3, etc.). The conceptual through-line that ties a guide to the rest of the lab |
| `**Subguide queued**` | Material flagged for its own future guide. Captures the scope hint inline so it doesn't get lost when the parent guide is finished |
| `**Read Next**` | Pointer to a related guide already in the library. Use sparingly — only when the link is genuinely load-bearing |

The renderer keys off the bold label text alone — no emoji prefix needed or wanted (per the portfolio-side rule above). Each callout type gets a Lucide or Phosphor icon at render time, picked once in `GuideBlockquote.tsx` per variant. Add new callout types only when an existing one doesn't fit. Keep the family small.

> **Portfolio-side coverage:** as of 2026-05-03, only `uap-field-map.md` carries callouts (42 of them). The other 7 guides have zero. Retrofit is a Workstream B.1 deliverable.

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

An "orphan" is a `|term|` marker in the body with no matching frontmatter glossary entry. Orphans break the renderer.

Orphan resolution is a real maintenance task we batch by guide. When resolving:

- **Match capitalization and punctuation exactly.** "C-TAP" not "C-tap" or "Ctap". "Anti-de Sitter space" not "Anti–de Sitter space" (note the hyphen vs en-dash difference).
- **Preserve en-dashes** where they appear in the source term. YAML treats these as plain string content; no special handling needed.
- **Quote YAML strings** when the value contains a colon, quotation mark, or starts with a special character. When in doubt, quote.
- **Definitions are 1–3 sentences.** Concise enough to fit in a click-reveal card; complete enough to stand alone without re-reading the surrounding paragraph.

> **Portfolio-side tooling:** orphan scanning is automated via `scripts/report-orphan-terms.ts`. The Glossarian project-level skill (`.claude/skills/glossarian/`) wraps the scanner and grounds resolutions against `core/lab/guides/` plus `~/projects/design-futures/sources/`.

### Glossary scope

Different guides warrant different scopes. The UAPx field methods guide carries 36 terms; the Knuth review carries ~60 because it covers more institutional ground. Scope to the source — don't pad.

Cuts to make a glossary tighter: minor org names, peripheral catalog/reference entries, terms used only once that the surrounding prose already defines clearly enough.

---

## Naming conventions

### Slugs

Kebab-case, descriptive, stable. Examples that work:
- `uapx-field-methods` — paper-specific
- `uap-field-map` — orientation guide
- `dird-15-vacuum-spacetime-engineering` — DIRD-numbered
- `wendt-duvall-sovereignty` — author-anchored companion

Slugs do not change after publication. Pick one you can live with.

### Accent colors

Each guide gets an accent color that drives its visual identity. Current usage:

| Color | Hex | Used for |
|-------|-----|----------|
| Amber | `#f0a050` | DIRD 13, emergent quantization explainer |
| Warm amber | `#e8a849` | DIRD 14 |
| Purple | `#b48efa` | DIRD 15 (T1 territory accent) |
| Teal | `#4ecdc4` | DIRD 28 |
| Signal green | `#4ade80` | UAPx Field Methods (T4 territory accent) |
| Silver | `#e4e4e7` | Knuth UAP Field Map |

A full color overhaul is planned. Until then, pair accents thematically with their territory or paper family. New T4 guides should pair visually with signal green (sage, muted greens, warm whites). New T1 guides should pair with purple (violets, warm grays).

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
2. **Frame the guide.** Decide title, slug, order, accent, kicker, territory. Decide between encyclopedic coverage and narrative selection (we lean narrative).
3. **Section-by-section deep read.** Produce a digest per section, with glossary candidates, figure-watchlist entries, and callout types applied inline. This is where the real thinking happens.
4. **Assemble the markdown.** Convert digests to the format above. Frontmatter → sections → callouts → glossary cleanup.
5. **Orphan check.** Confirm every `|term|` in the body has a frontmatter entry. Resolve any gaps.
6. **Figure handling.** Crop figures (if any), name them per the `figures[].file` schema, drop them in the guide folder.
7. **Deliver.** Markdown + figures handed off to the portfolio site / renderer.

For major structural changes, deliver complete files rather than incremental edits — easier to review, easier to roll back. Flag the most significant decisions at delivery for explicit confirmation.

---

## Minimal skeleton (copy-paste)

```markdown
---
slug: your-slug-here
title: Your Title Here
kicker: Research Guide Series
order: 9
accent: "#e4e4e7"
description: One- or two-sentence summary for the library index.
source:
  authors: Author et al.
  year: 2025
  venue: Venue Name
  url: https://example.com/paper
territory: T4
status: draft
glossary:
  example term: A 1–2 sentence definition that fits in a click-reveal card.
---

## 🎯 First Section Title {#first-section}

Opening paragraph that introduces the section. Use |example term| to mark a glossary term inline.

> **example term** — A 1–2 sentence definition that fits in a click-reveal card.

Continue the section body in normal prose.

> 🎯 **Design Hook**
>
> A concrete product, service, tool, or experience implication that falls out of this section.

> 🔗 **Territory Bridge**
>
> How this connects to another territory in the lab.

## 📡 Second Section Title {#second-section}

Next section opens here.

> 📎 **Subguide queued**
>
> Material flagged for its own future guide — capture the scope hint so it isn't lost.
```

---

## What this document is not

Not a style guide for prose voice (that's `voice-profile.md`). Not a position statement (that's `the-labs-position.md`). Not a roadmap (that's the territory roadmap). Just the schema and conventions for the guide format itself.

When the format evolves — new callout type, new frontmatter field, renamed convention — update this file first, then propagate to the renderer schema and any guides that need migration.
