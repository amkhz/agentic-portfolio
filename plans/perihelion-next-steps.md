# Perihelion: next steps

> Living punch list for the lab at `labs.justinh.design`. First written 2026-04-21 during the rename session; resynced 2026-04-30; resynced again 2026-05-03 with the format-alignment workstream split, design-futures schema reconciliation, and Workstream A landing; resynced once more 2026-05-03 (later that day) with T6 polish landing, the C/B.1 collision call, and the C-parallel-with-B-rest sequence; refined again 2026-05-03 (end-of-day) with the C.1-immediate sequencing, multi-agent posture, and the no-emoji authoring rule.

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
- **PR #41 — plan resync + format spec mirror + B.1/B.2 split.** Merged.

### Open / in flight

- **T6 polish PR** — branch `feat/perihelion-library-t6-polish`. Closes Workstream A's Impeccable critique + polish follow-on. Five sub-passes: T6.1 viewport-gated TerritoryBadge pulse with settle, T6.2 perihelion-sigil drop cap + manifesto fade, T6.3 DIRD metric drop + colophon source-corpus affordance (copy placeholder, TODO Writer), T6.4 GuideCard hover refinement (PARKED, deferred to Workstream C), T6.5 entrance fades for welcome triptych + territory sections. Mission log: `vector/missions/perihelion-library-welcome-pass.md`.

---

## Locked decisions (cumulative)


| Decision                                                                                                                                                                                            | Status                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Brand: **Perihelion**                                                                                                                                                                               | Locked                                      |
| Arms: **Archive** (research) + **Works** (applied design), peers not pipeline                                                                                                                       | Locked                                      |
| Umbrella tagline: "closest approach to the frontier"                                                                                                                                                | Locked                                      |
| Archive tagline (preserved): "A reader's notebook. Designed to be prep, not product."                                                                                                               | Locked                                      |
| Voice reference: `core/content/voice-profile.md` (Phase 3.1)                                                                                                                                        | Locked, production-ready                    |
| Icon libraries: Lucide + Phosphor as defaults                                                                                                                                                       | Locked                                      |
| Light mode direction: start from portfolio light-mode tokens with justified modifications                                                                                                           | Locked (implementation deferred)            |
| Cross-link and paper-reference scans: hybrid (script surfaces, Justin curates)                                                                                                                      | Locked (implementation pending)             |
| Subdomain: stays at `labs.justinh.design`                                                                                                                                                           | Locked                                      |
| Design system overhaul (Workstream C): runs in parallel with B once B.1's renderer enhancement lands as a discrete sub-pass (clears the only collision on `GuideBlockquote.tsx`)                    | Locked 2026-05-03 (revised from "deferred") |
| Sequence: A done → small B.1 pieces (DIRD frontmatter / Glossarian / slug migration) + C.1 (light-mode tokens) + Writer micro-task (T6.3 colophon copy) start immediately in parallel → renderer scope confirmation when Justin has bandwidth → B.1 renderer enhancement → per-guide pipeline (B.1 alignment → B.2 voice) + C.2 (icon sweep + restyling + GuideCard hover debug) in parallel | Locked 2026-05-03 (refined end-of-day)      |
| No emojis in guide markdown; visual icons come from the renderer at the design-system level (Lucide + Phosphor). New guides omit emojis from section headers and callout lines. C.2 sweeps existing guides into compliance. Local mirror `plans/perihelion-format-rules.md` updated; **upstream `~/projects/design-futures/guide-format-rules.md` sync pending** | Locked 2026-05-03                           |
| Multi-agent parallel execution preferred where the file-collision matrix allows. Each independent track in the sequence above can run as its own agent on its own branch; the per-guide pipeline can pipeline two agents (Tyrell aligning guide N+1 while Writer sweeps guide N) | Posture, attempt where applicable           |
| Workstream C may split into C.1 (light-mode tokens, contained to `lab-tokens.css`) and C.2 (icon sweep + lab-component restyling) for incremental landing                                           | Locked 2026-05-03                           |
| Works placeholder: no, ship the surface only when the first piece is ready                                                                                                                          | Locked (Q1 resolved)                        |
| Constellation node id: migrated `the-lab` → `perihelion`                                                                                                                                            | Locked (Q2 resolved)                        |
| Voice work cadence: voice profile is a long-term tool for both portfolio content and personal sense-making on hard topics                                                                           | Locked (Q3 resolved)                        |
| Podcast-numbers source: hand-resolved from Ecosystemic Futures site, only single-digit episodes are wrong                                                                                           | Locked (Q4 resolved)                        |
| Writer posture for Workstream B: high-quality wholesale per guide, paced over time alongside other work                                                                                             | Locked (Q5 resolved)                        |
| Schema: standardize on `slug:` (migrate existing `id:` usage in 8 guides + parser/types)                                                                                                            | Locked 2026-05-03                           |
| Schema: `territory:` and `status:` formally adopted into the canonical frontmatter                                                                                                                  | Locked 2026-05-03                           |
| Schema: `arxiv:` valid as an optional `source.*` sub-field; coexists with `url:`                                                                                                                    | Locked 2026-05-03                           |
| Format spec mirrored into the repo at `plans/perihelion-format-rules.md` and `plans/perihelion-format-alignment-brief.md`; canonical lives upstream in `~/projects/design-futures/`                 | Locked 2026-05-03                           |
| Glossarian installed as a project-level skill at `.claude/skills/glossarian/`; wraps `scripts/report-orphan-terms.ts` and grounds against `core/lab/guides/` + `~/projects/design-futures/sources/` | Locked 2026-05-03                           |
| Workstream B split into two parallel tracks: B.1 format alignment (Tyrell) + B.2 voice sweep (Writer)                                                                                               | Locked 2026-05-03                           |
| Tagline evolution when Works ships                                                                                                                                                                  | Open (Q6)                                   |


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

**Polish landed in flight:** T6 critique + polish on `feat/perihelion-library-t6-polish`. Closes the Impeccable follow-on the welcome pass left open. Sub-passes T6.1–T6.5 as logged in the mission file. T6.4 (GuideCard hover refinement) parked into Workstream C.

**Carry-overs to other workstreams:**

- T6.3's DIRD colophon copy is a `TODO Writer` placeholder — refine in a Writer session.
- T6.4 GuideCard hover refinement folds into Workstream C alongside light-mode tokens and the icon sweep.

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
**Status:** Ready to begin. The welcome-pass critique landed as T6 polish; B.1 is next on the critical path.

**Sequencing note (2026-05-03):** B.1's renderer enhancement (variants on `BlockquoteBlock` + per-variant treatment in `GuideBlockquote.tsx` + parser changes) is the only file collision with Workstream C. Land it as a discrete first sub-pass within B.1 — once it ships, C unfreezes and runs in parallel with the rest of B (schema migration, DIRD frontmatter, callout retrofit, definition glosses, B.2 voice sweep). The other B.1 sub-passes touch `core/lab/guides/*.md` exclusively and don't collide with C.

#### Workstream B.2 — Voice sweep

Per-guide prose pass against `core/content/voice-profile.md` (Phase 3.1). High-quality wholesale per guide, paced over time alongside other work (per Q5).

**Owner:** Writer.
**Touches:** `core/lab/guides/*.md` (prose only — schema and structural fields are B.1's lane).
**Effort:** L.
**Status:** Voice profile is locked. Operates per guide on a B.1-cleaned canonical structure.

**Sequencing within B:** B.1 lands per guide → B.2 voice sweep operates on the cleaned canonical structure. No reason to voice-tune a guide that still has the wrong year, missing callouts, or `id:` instead of `slug:`. The two streams can pipeline: while Writer sweeps guide N, Tyrell aligns guide N+1.

---

### Workstream C — Design system overhaul for the lab

Two visual items together — light mode and the icon sweep share touchpoints. Picks up the GuideCard hover refinement parked from T6.4.

**Covers:** full UI overhaul (tokens, light mode, subtle personal branding), emoji-to-icon replacement, GuideCard hover refinement (carried over from T6.4).

**Approach:**

- Light mode palette sourced from portfolio light-mode tokens, with justified modifications where the academic-preprint register demands something the portfolio does not offer (warm cream paper backgrounds, warm ink text).
- Emoji-to-icon pass using Lucide for standard UI affordances and Phosphor where a more opinionated pictorial register is wanted.
- Subtle personal branding ties to Workstream D.
- GuideCard hover refinement: keep the three-shift cascade (border + bg + title color) but find a treatment that reads as polished rather than over-keyed. Earlier attempt at staggered durations + accent glow did not work live; needs debugging and potential new ideas alongside the broader token / icon work where the change has more company.

**Possible sub-split (per locked decision 2026-05-03):**

- **C.1 — Light-mode tokens.** Add a light-mode variable set to `design-system/lab-tokens.css`. Contained scope, no component file collisions, can land immediately once B.1's renderer enhancement is in. Existing components inherit through CSS custom properties.
- **C.2 — Icon sweep + lab-component restyling + GuideCard hover.** Touches `src/lab/components/guide/*` and `src/lab/components/library/*`. Larger scope; follows C.1.

**Owner:** Tyrell, with Impeccable design skills (`/audit`, `/polish`, `/colorize`, `/typeset`).
**Touches:** `design-system/lab-tokens.css` (new light-mode variable set), `src/lab/` components broadly, possibly a new SVG mark component, `src/lab/components/library/GuideCard.tsx` (hover refinement carry-over).
**Effort:** L.
**Status:** Unfreezes once B.1's renderer enhancement lands. Then runs in parallel with the rest of B.

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

Refined 2026-05-03 (end-of-day). Earlier draft put renderer enhancement first as the unblocker for C; revised after realizing C.1 (light-mode tokens, contained to `lab-tokens.css`) has zero collision with anything in B.1, and the small B.1 pieces don't touch `GuideBlockquote.tsx` either. Real gating is between B.1 renderer ↔ C.2; everything else runs concurrent from day one.

1. ~~**Workstream A (origins intro).**~~ ✅ shipped via PR #40 + PR #42 (T6 polish).
2. **Start immediately, in parallel** — each can be its own agent, its own branch, its own small mission file in `vector/missions/`:
  - **B.1 small pieces** — DIRD frontmatter mechanical pass (years/venues on guides 13/14/15/28); Glossarian skill installation at `.claude/skills/glossarian/`; slug migration (`id:` → `slug:` across 8 guides + parser + types). Touches `core/lab/guides/*.md`, `core/lab/parse-guide.ts`, `core/lab/guide-types.ts`. No collision with C.
  - **C.1 light-mode tokens** — add a light-mode variable set to `design-system/lab-tokens.css`. Contained, no component file collisions, components inherit through CSS custom properties. Tyrell + `/colorize`.
  - **Writer micro-task** — refine T6.3 colophon copy in `LibraryHeader.tsx`'s `ColophonNote` (currently `TODO Writer` placeholder). Voice-tune against Phase 3.1.
3. **Renderer scope confirmation** — when Justin has bandwidth. Open reminder in this plan: variants as tagged union vs. first-line keying vs. another splitting convention. Does not block step 2.
4. **B.1 renderer enhancement** — discrete mission once scope is locked. Variants on `BlockquoteBlock`, `parseBlockquote` callout/definition detection, per-variant chip + accent treatment in `GuideBlockquote.tsx`. 1–2 sessions, contained scope.
5. **After renderer lands, in parallel:**
  - **Per-guide pipeline (B.1 alignment → B.2 voice)** — for each guide: callout retrofit, inline definition glosses, voice sweep. Pipeline two agents — Tyrell aligning guide N+1 while Writer sweeps guide N. Streams don't block.
  - **C.2 icon sweep + lab-component restyling + GuideCard hover debug** — Tyrell + Impeccable. Picks up the parked T6.4 hover refinement as a debugging task.
6. **Workstream D (logotype).** Anytime. Different hands, different surfaces.
7. **Workstream E (nested definitions).** Dreamer session whenever Justin wants to explore. Output is a plan, not code.

**Operating posture:** lean on multi-agent parallel execution wherever the collision matrix allows. The point of the sub-mission scoping is so each track is small, scoped, and hand-offable to its own agent on its own branch. Per-guide pipelining (Tyrell + Writer alternating across adjacent guides) is the highest-leverage form of this.

Workstream B is still the main thing. C runs alongside it from day one (C.1) and unblocks fully once the renderer collision is cleared (C.2).

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
- **T6.3 colophon copy** — the new "+ On the source corpus" `<details>` affordance in `LibraryHeader.tsx` (`ColophonNote`) ships with `TODO Writer` placeholder copy that names DIRD once and broadens the corpus picture. Refine summary label and gloss in a Writer session against the Phase 3.1 voice profile.
- **No-emoji rule sync upstream** — local mirror `plans/perihelion-format-rules.md` updated 2026-05-03 to forbid emojis in guide markdown (visual icons live at the renderer/design-system level). The canonical upstream `~/projects/design-futures/guide-format-rules.md` still recommends emojis on section headers + callout lines. Carry the update upstream so the upstream Claude doesn't keep authoring emoji-laden guides that C.2 has to sweep again. One-shot edit, no architectural change.

---

## Open question

**Q6 — Tagline evolution when Works ships.** Keep "closest approach to the frontier" at the umbrella, or evolve it to explicitly name both arms? Still thinking. Decide closer to the Works launch.