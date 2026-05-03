# Perihelion: next steps

> Living punch list for the lab at `labs.justinh.design`. First written 2026-04-21 during the rename session; resynced 2026-04-30; resynced again 2026-05-03 with the format-alignment workstream split, design-futures schema reconciliation, and Workstream A landing.

---

## Current state

### Shipped since the last sync

- **PR #34 / #35** — Perihelion rename, two-arm structure (Archive + Works), ADR-010, naming plan. Merged.
- **Constellation node migration** — `id: 'the-lab'` → `id: 'perihelion'` (open question #2 resolved).
- **Lab subdomain rewrite hardening** — host-based routing locked across PR #28-#31 (consolidated, root client-redirect, root path explicit, `:path(.*)` matcher).
- **Lab footer source link fix** — PR #33.
- **Joi voice profile through Phase 3.1** — calibrated from 16 interview samples + About-page edited-prose corpus + cold-read calibration on a lab-guide rewrite. Voice is now production-ready for the Workstream B sweep.
- **About-page voice and proofread pass** — first content surface refined against the locked profile.
- **PR #40 — Workstream A: origins intro / library welcome pass.** Welcome triptych, MANIFESTO refinement, T5a–T5f sub-passes; mission log at `vector/missions/perihelion-library-welcome-pass.md`. Merged.

### Open / in flight

- **Visual critique pass on the library homepage** — active follow-on to the welcome pass, applying Impeccable design skills (`/critique`, `/polish`) to the now-shipped surface. Not yet on a feature branch as of this resync; results will inform the next library iteration.
- **This docs sync** — branch `chore/perihelion-plan-sync-2026-05-03`. Edits the plan, mirrors the design-futures format spec into `plans/perihelion-format-rules.md` and `plans/perihelion-format-alignment-brief.md`. Merges cleanly with any in-flight UI work — touches `plans/` only.

---

## Locked decisions (cumulative)

| Decision | Status |
|---|---|
| Brand: **Perihelion** | Locked |
| Arms: **Archive** (research) + **Works** (applied design), peers not pipeline | Locked |
| Umbrella tagline: "closest approach to the frontier" | Locked |
| Archive tagline (preserved): "A reader's notebook. Designed to be prep, not product." | Locked |
| Voice reference: `core/content/voice-profile.md` (Phase 3.1) | Locked, production-ready |
| Icon libraries: Lucide + Phosphor as defaults | Locked |
| Light mode direction: start from portfolio light-mode tokens with justified modifications | Locked (implementation deferred) |
| Cross-link and paper-reference scans: hybrid (script surfaces, Justin curates) | Locked (implementation pending) |
| Subdomain: stays at `labs.justinh.design` | Locked |
| Design system overhaul: deferred until content sweep is well underway | Locked posture |
| Sequence: naming (done) → content sweep → design system | Locked |
| Works placeholder: no, ship the surface only when the first piece is ready | Locked (Q1 resolved) |
| Constellation node id: migrated `the-lab` → `perihelion` | Locked (Q2 resolved) |
| Voice work cadence: voice profile is a long-term tool for both portfolio content and personal sense-making on hard topics | Locked (Q3 resolved) |
| Podcast-numbers source: hand-resolved from Ecosystemic Futures site, only single-digit episodes are wrong | Locked (Q4 resolved) |
| Writer posture for Workstream B: high-quality wholesale per guide, paced over time alongside other work | Locked (Q5 resolved) |
| Schema: standardize on `slug:` (migrate existing `id:` usage in 8 guides + parser/types) | Locked 2026-05-03 |
| Schema: `territory:` and `status:` formally adopted into the canonical frontmatter | Locked 2026-05-03 |
| Schema: `arxiv:` valid as an optional `source.*` sub-field; coexists with `url:` | Locked 2026-05-03 |
| Format spec mirrored into the repo at `plans/perihelion-format-rules.md` and `plans/perihelion-format-alignment-brief.md`; canonical lives upstream in `~/projects/design-futures/` | Locked 2026-05-03 |
| Glossarian installed as a project-level skill at `.claude/skills/glossarian/`; wraps `scripts/report-orphan-terms.ts` and grounds against `core/lab/guides/` + `~/projects/design-futures/sources/` | Locked 2026-05-03 |
| Workstream B split into two parallel tracks: B.1 format alignment (Tyrell) + B.2 voice sweep (Writer) | Locked 2026-05-03 |
| Tagline evolution when Works ships | Open (Q6) |

---

## The mission

Justin is building Perihelion for himself AND to invite other designers who have not yet considered frontier science. The invitational posture is load-bearing. Every design and content decision on the lab is tested against:

> *Does this open the door for a designer who has never considered frontier science, or does this gatekeep?*

This principle is why the naming session rejected obscure-as-flex candidates (Wunderkammer, Syzygy, Orrery, Alembic) in favor of a word that rewards curiosity without demanding credentials.

---

## Workstreams

### Workstream A — Origins intro ✅ shipped

**What:** A proper introduction to how Perihelion came to be, what it is for, the learning-first-then-applied-design positioning. Lived as expanded copy on the Archive landing.

**Shipped:** PR #40 (`feat/perihelion-library-welcome-pass`). Mission log at `vector/missions/perihelion-library-welcome-pass.md`. Welcome triptych + MANIFESTO refinement + T5a–T5f sub-passes.

**Active follow-on:** visual critique pass on the now-shipped library homepage, applying Impeccable design skills. Findings will inform the next library iteration; not yet on a dedicated branch.

---

### Workstream B — Content sweep across the eight Archive guides

The main thing. Now structured as **two parallel tracks** that operate per guide: B.1 closes the mechanical format gap, B.2 does the prose voice sweep. Same eight guides, two passes, different hands.

#### Workstream B.1 — Format alignment pass

Mechanical work to bring all eight guides up to the canonical spec. The execution spec is `plans/perihelion-format-alignment-brief.md` (mirrored from design-futures); the schema reference is `plans/perihelion-format-rules.md`.

**Covers:**
- **Schema migration** — rename `id:` → `slug:` across all 8 guides; update `core/lab/parse-guide.ts`, `core/lab/guide-types.ts`, and any references in `src/lab/`.
- **DIRD frontmatter corrections** — DIRD 13/14/15/28 currently show wrong `source.year` (DIRD 15 shows 2026; should be ~2009 AAWSAP era) and inconsistent venues. Tyrell takes a one-shot mechanical pass; Justin spot-checks after.
- **Callout retrofit** — 7 of 8 guides have zero styled callouts (Design Hook / Territory Bridge / Read Next / Subguide queued). `uap-field-map.md` already has 42 — proves the pattern works at the generic blockquote level. Convert "Design Implications" sections into Design Hook callouts; add Territory Bridge / Read Next where the prose supports them.
- **Inline blockquoted definitions** — first-mention `> **term** — definition` pattern per the canonical spec, sourced verbatim from each guide's frontmatter glossary.
- **Renderer enhancement** — extend `BlockquoteBlock` to carry a `variant` field; teach `parseBlockquote` to detect callout-type and definition-gloss patterns; render per-variant chip + accent treatment in `GuideBlockquote.tsx`. (Confirm scope with Justin before touching parser — see reminders.)

**Tooling:**
- `scripts/report-orphan-terms.ts` — already built; the orphan scanner B.1 needs.
- `vector/audits/orphan-terms-2026-04-21.md` — last orphan audit output, useful as a baseline.
- New: **Glossarian** project-level skill at `.claude/skills/glossarian/`. Adapted from `~/projects/design-futures/Glossarian/SKILL.md`. Wraps `report-orphan-terms.ts`; grounds resolutions against `core/lab/guides/` + `~/projects/design-futures/sources/` (DIRD PDFs, ecosystemic-futures notes, source papers like uap1.pdf, uapx.pdf, wendt-duvall-2008-sovereignty-and-the-ufo.pdf, l8y7-r3rm.pdf).
- New scripts (originally planned in old Workstream B): cite audit, cross-link audit, content health report.

**Owner:** Tyrell (mechanical work, parser/renderer), Glossarian skill (orphan resolution).
**Touches:** `core/lab/guides/*.md`, `core/lab/parse-guide.ts`, `core/lab/guide-types.ts`, `src/lab/components/guide/GuideBlockquote.tsx`, new `.claude/skills/glossarian/`, new entries in `scripts/`.
**Effort:** L.
**Status:** Ready to begin once the welcome-pass visual critique concludes.

#### Workstream B.2 — Voice sweep

Per-guide prose pass against `core/content/voice-profile.md` (Phase 3.1). High-quality wholesale per guide, paced over time alongside other work (per Q5).

**Owner:** Writer.
**Touches:** `core/lab/guides/*.md` (prose only — schema and structural fields are B.1's lane).
**Effort:** L.
**Status:** Voice profile is locked. Operates per guide on a B.1-cleaned canonical structure.

**Sequencing within B:** B.1 lands per guide → B.2 voice sweep operates on the cleaned canonical structure. No reason to voice-tune a guide that still has the wrong year, missing callouts, or `id:` instead of `slug:`. The two streams can pipeline: while Writer sweeps guide N, Tyrell aligns guide N+1.

---

### Workstream C — Design system overhaul for the lab

Two visual items together — light mode and the icon sweep share touchpoints.

**Covers:** full UI overhaul (tokens, light mode, subtle personal branding), emoji-to-icon replacement.

**Approach:**

- Light mode palette sourced from portfolio light-mode tokens, with justified modifications where the academic-preprint register demands something the portfolio does not offer (warm cream paper backgrounds, warm ink text).
- Emoji-to-icon pass using Lucide for standard UI affordances and Phosphor where a more opinionated pictorial register is wanted.
- Subtle personal branding ties to Workstream D.

**Owner:** Tyrell, with Impeccable design skills (`/audit`, `/polish`, `/colorize`, `/typeset`).
**Touches:** `design-system/lab-tokens.css` (new light-mode variable set), `src/lab/` components that use emoji, possibly a new SVG mark component.
**Effort:** L.
**Status:** Deferred until Workstream B is well underway.

---

### Workstream D — Logotype and sigil pass

A brand mark for Perihelion. Delayed until the brand has had time to settle.

**Candidates to explore:**

- Abstract mark based on an orbital diagram (elliptical orbit + highlighted point of closest approach).
- A small sigil (colophon mark) that appears at the end of guides.
- Typographic wordmark only.
- Dual-mark system: umbrella sigil + arm-specific glyphs.

**Owner:** Tyrell + Impeccable typography and design skills.
**Touches:** `design-system/` for tokens, possibly a new SVG component in `src/lab/components/`, favicon update if the mark becomes the favicon too.
**Effort:** M.
**Can run in parallel with:** Workstream B.

---

### Workstream E — Nested definitions / drill-down term interaction

**What:** Reading the guides, Justin noticed that the inline definition card sometimes contains *its own* unfamiliar terms — and the natural urge is to click them and drill deeper. The current widget (`src/lab/components/guide/GuideTerm.tsx` + `GuideDefinitionCard.tsx`) only supports one level: term in body → card with plain-text definition. The definition text is not itself interactive.

**Posture:** Dreamer session, not a build plan. The interaction model is open. Some prompts for the session:

- Should "nested" mean a stack (cards appearing inside cards), a breadcrumb (replace-in-place with back-traversal), a side-rail (current card stays, deeper definitions stack alongside), or something less skeuomorphic?
- Does drilling deeper feel like a research move or like a distraction from the guide's main argument? When does it open the door, and when does it gatekeep?
- How deep can a chain go before the reader is lost? Hard cap, soft cap, or self-limiting via available glossary depth?
- Mobile constraints — nested overlays on a 375px viewport are a known UX cliff.
- Does this interact with Workstream B's cross-link audit? A click chain across guides is a more ambitious version of the same affordance.

**Owner:** Dreamer (exploration), Tyrell + Impeccable (`/critique`, `/shape`) once a direction is picked.
**Touches:** `src/lab/components/guide/GuideTerm.tsx`, `GuideDefinitionCard.tsx`, possibly a new container component, glossary data model in `core/lab/`.
**Effort:** Unknown — sized after the Dreamer pass.
**Status:** Parked thought, ready for a Dreamer session when Justin wants to explore.

---

## Suggested sequence

1. ~~**Workstream A (origins intro).**~~ ✅ shipped via PR #40. Visual critique is the active follow-on.
2. **Workstream B (content sweep).** The bulk of remaining lab work. Two parallel tracks (B.1 format alignment, B.2 voice sweep) operating per guide. Build Glossarian + the three audit scripts first, then pipeline guide-by-guide. Expect this to span several sessions.
3. **Workstream D (logotype).** Can start in parallel with B. Different hands, different surfaces.
4. **Workstream E (nested definitions).** Run a Dreamer session whenever Justin wants to explore. Output is a plan, not code yet.
5. **Workstream C (design system).** Deferred until B is well underway and the brand has had time to settle.

Workstream B is the main thing.

---

## External coordination

Guide authoring lives upstream in `~/projects/design-futures/`, where another Claude instance is the active author and source-library curator. The portfolio is the publishing surface and the home of the renderer + reading experience.

**Mirrored into this repo:**

- `plans/perihelion-format-rules.md` — canonical schema and conventions. Synced 2026-05-03 from `~/projects/design-futures/guide-format-rules.md`.
- `plans/perihelion-format-alignment-brief.md` — execution spec for B.1 (originally written for the JSX→MD conversion). Synced 2026-05-03 from `~/projects/design-futures/guide-format-alignment-brief.md`.

**Adapted, not mirrored:**

- `.claude/skills/glossarian/` — project-level skill adapted from `~/projects/design-futures/Glossarian/SKILL.md`. The upstream is Claude.ai-native (uses `/mnt/project/` and `project_knowledge_search`); the portfolio version uses `scripts/report-orphan-terms.ts` and bash/grep against local paths.

**Consulted upstream, not mirrored:**

- `~/projects/design-futures/guide-library-tracker.md` — current build queue + source library status. Tracker is owned upstream; consult on demand.
- `~/projects/design-futures/sources/` — source PDFs and notes (DIRDs, ecosystemic-futures podcast notes, uap1.pdf, uapx.pdf, wendt-duvall-2008-sovereignty-and-the-ufo.pdf, l8y7-r3rm.pdf). Glossarian and any future audit scripts read from here for grounding.

**Intake convention.** When the upstream Claude finishes a new guide, Justin drops the file in `core/lab/guides/`. Tyrell runs B.1 alignment + ingest. A future `scripts/import-guide.ts` could automate the schema translation; for now it's ad-hoc per delivery. Long-term, ingestion + guide creation may move into this repo entirely.

**Sync convention.** Mirrored docs carry a "Snapshot synced YYYY-MM-DD" header. Re-sync on demand when the upstream evolves the format. Portfolio-side schema deviations (slug/territory/status/arxiv) are noted inline in the mirrors so a re-sync doesn't accidentally regress them.

---

## Reminders / pending confirmations

Surfaced for Justin's review at the appropriate moment in B.1 execution:

- **DIRD year/venue corrections** — Tyrell to take a one-shot mechanical pass on DIRD 13/14/15/28 frontmatter (`source.year`, `source.venue`). Justin to spot-check after, per guide. (Resolves Q3/Q4 from the alignment brief.)
- **Renderer chip-per-callout scope** — Confirm before parser/`GuideBlockquote.tsx` are touched: introduce new variants (`design-hook`, `territory-bridge`, `read-next`, `subguide-queued`, `definition`) to `BlockquoteBlock` and key off the first line, OR split into a tagged union, OR a different splitting convention?
- **`scripts/migrate-jsx-guide.ts`** — JSX→MD conversion is done and dusted. Archive (`scripts/archive/`), delete, or keep as reference for the next migration?
- **Renderer support for inline-definition variant** — confirmed today the renderer treats all `>` blocks generically. The B.1 renderer enhancement covers both callouts AND first-mention definition glosses; confirm both should get distinct visual treatment, or whether definition glosses should remain plain blockquote.

---

## Open question

**Q6 — Tagline evolution when Works ships.** Keep "closest approach to the frontier" at the umbrella, or evolve it to explicitly name both arms? Still thinking. Decide closer to the Works launch.
