# Perihelion: next steps

> Living punch list for the lab at `labs.justinh.design`. First written 2026-04-21 during the rename session; resynced 2026-04-30; resynced again 2026-05-03 with the format-alignment workstream split, design-futures schema reconciliation, and Workstream A landing; resynced once more 2026-05-03 (later that day) with T6 polish landing, the C/B.1 collision call, and the C-parallel-with-B-rest sequence; refined again 2026-05-03 (end-of-day) with the C.1-immediate sequencing, multi-agent posture, and the no-emoji authoring rule; resynced 2026-05-17 with the step-2 burndown closed, the B.1 renderer enhancement scope locked, the upstream no-emoji rule sync completed, and the B.1 DIRD frontmatter pass opened as PR #51; resynced 2026-05-25 with PRs #51 and #52 merged, completed mission files archived, and the B.1 renderer enhancement build surfaced as the next open mission; resynced again 2026-05-25 (later that day) with the B.1 renderer build landed as PR #56, the C.1.5 graphite dark-mode recalibration landed as PR #58, and the `migrate-jsx-guide.ts` script archived; resynced once more 2026-05-25 (end-of-day) with the B.1 DIRD frontmatter follow-up pass landed as PR #60, the DIRD authorship research note landed as PR #61, the DIRD 15 attribution confirmed as Hal Puthoff, and C.2 promoted into the active concurrent queue.

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
- **PRs #42–#50 — step-2 burndown and infrastructure refresh.** T6 polish (PR #42), plan refinement (#44), worktrees gitignore (#45), B.1 schema rename `id:` → `slug:` (#46), C.1 light-mode tokens added to `lab-tokens.css` (#47), Glossarian project skill installed (#48), T6.3 colophon copy refined (#49), Impeccable v3.0.7 upgrade with `PRODUCT.md` rename and VOID.md added (#50). All merged.
- **Track B — no-emoji upstream sync.** One-shot edit applied 2026-05-17 in a `~/projects/design-futures/` Claude Code session. Removed emoji prefixes from header / callout examples in `guide-format-rules.md` and added the no-emoji rule canonically. Design-futures dir is not a git repo, so no PR or commit record; record lives in the agent's session summary plus this entry.
- **PR #51 — B.1 DIRD frontmatter pass.** Mechanical fix to `source.year` (all four were `2026`, corrected to `2010` per the published DIRD cover pages) and `source.venue` (consolidated to `DIA / AAWSAP Program`) on DIRDs 13, 14, 15, 28. Mission log archived to `vector/missions/archive/perihelion-b1-dird-frontmatter.md`. Three follow-up flags surfaced for a future B.1 sub-pass: AAWSA-vs-AAWSAP spelling drift between source PDFs and the spec, `source.authors` drift on DIRDs 14 and 28 (carry the venue value in the authors slot), and an ICOD-vs-publication-date typo on the DIRD 14 cover.
- **PR #52 — B.1 renderer enhancement scope lock.** Codified the variant-discriminator decision for `BlockquoteBlock` and added `plans/perihelion-b1-renderer-scope.md` as the full spec. Unblocks step 4 of the suggested sequence (the renderer build itself).
- **PR #56 — B.1 renderer enhancement build.** Three commits per the locked spec: types + parser detection (`BlockquoteVariant` discriminator + `term?` on `BlockquoteBlock`, callout / definition / emoji-tolerance detection in `parseBlockquote`); renderer variant switch in `GuideBlockquote.tsx` (text-only chips per scope, definition tint, plain unchanged); jsdom + RTL test env wired in, 7 renderer tests + 8 new parser tests. Parser sweep across all 8 guides confirmed `uap-field-map.md` picks up 41 of 42 callouts (the one miss is an empty `> 📎 **Read Next**` placeholder at line 145 with no body paragraph — flagged for B.2). Merged.
- **PR #58 — C.1.5 graphite dark-mode tokens.** Lifted `--lab-bg-deep` from L 0.08 (near-pitch, OLED halation) to L 0.17 (graphite, GitHub-dark neighborhood) for extended-reading comfort. Surface and raised lifted in lockstep; text-secondary / muted lifted slightly to preserve hierarchy and AA; texture ruling rebalanced; `LAB_BG_HEX` constant in the parser updated to match. All 8 guide accents reverified between 7.5:1 and 15.1:1 against the new bg. Locked posture saved to memory ([[feedback_lab_no_pure_black]]): the lab dark register is graphite, not pure black, and shouldn't roll back. Merged.
- **PR #60 — B.1 DIRD frontmatter follow-ups.** Closed two of the three PR #51 exit-log flags: AAWSA → AAWSAP spelling in `core/lab/upcoming.ts` × 3 (`source:` strings on the upcoming-guide placeholders for DIRDs 36, 22, and 31+20) and a `source.notes:` field on DIRD 14 capturing the ICOD-vs-publication-date typo on the source cover (1 Dec 2010 vs. expected 1 Dec 2009). Parser silently ignores unknown `source.*` keys, so the field is preserved in-data without schema changes. The third flag — `source.authors` slot on DIRDs 14 and 28 — was reframed as a deferred research question (see PR #61) rather than a mechanical fix, after surfacing that the PDF covers are FOIA-redacted ([[reference_dird_pdf_authors_redacted]]). Mission log at `vector/missions/perihelion-b1-dird-frontmatter-followups.md`. Merged.
- **PR #61 — DIRD authorship research note.** Created `vector/research/dird-authorship.md` capturing Justin's working-table research on DIRD authorship as groundwork for the deferred `source.authors` slot fix. Confirmed DIRD 15 attribution as Hal Puthoff via two independent sources (guide body, upstream `dird-technology-briefs.md`); resolved the title-cluster confusion between DIRD 15 ("Vacuum Spacetime Metric Engineering") and the working-table's "Vacuum Fluctuation Energy" entry (likely DIRD 24). DIRDs 14 and 28 stay institutional pending further research. Memory entry [[reference_dird_pdf_authors_redacted]] saved so future agents don't chase phantom personal authors. Merged.

### Open / in flight

- **Next mission — first per-guide B.1 sweep.** With the renderer landed, the per-guide pipeline can begin: callout retrofit (Design Hook / Territory Bridge / Read Next / Subguide queued where the prose supports), inline definition gloss injection for heavy first-mentions, then B.2 voice sweep behind it. Pick a starter guide (likely `dird-13-warp-drive` or `quantum-gravity`).
- **C.2 — icon sweep + lab-component restyling + GuideCard hover debug.** Promoted into the active concurrent queue 2026-05-25. Now sits on the C.1.5 graphite bg, so chip + accent treatments may want a small re-tuning pass. Picks up the parked T6.4 GuideCard hover refinement (staggered durations + accent glow earlier attempt did not work live). Touches `src/lab/components/guide/*` and `src/lab/components/library/*`. No collision with the per-guide pipeline, which only touches `core/lab/guides/*.md`.
- **DIRDs 14 and 28 `source.authors` slot — deferred.** PR #60 landed the safe spelling + ICOD pieces and intentionally left the authors slot untouched. PR #61's research note (`vector/research/dird-authorship.md`) is the home for grounding research. Decision tree: if research surfaces personal authors → use them; if it dead-ends → institutional `DIA / AAWSAP Program` ships as the canonical fallback. No urgency.

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
| B.1 renderer enhancement scope: `BlockquoteBlock` gets a `variant` discriminator field; detection runs in the parser; six variants (`design-hook`, `territory-bridge`, `read-next`, `subguide-queued`, `definition`, `plain`); definition glosses are first-class with a colon separator; parser carries an emoji-tolerance pass during the C.2 transition. Full spec at `plans/perihelion-b1-renderer-scope.md` | Locked 2026-05-17                           |
| C.1.5 dark-mode register: graphite (`--lab-bg-deep` at L 0.17, ~#0e0f13), not pure black. Lifted for extended-reading comfort across the long-form guides; OLED halation around body type was the trigger. Future design-system work stays in the graphite L 0.15–0.25 range. See PR #58 and [[feedback_lab_no_pure_black]] | Locked 2026-05-25                           |
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
2. ~~**Step-2 parallel burndown.**~~ ✅ shipped 2026-05-17. B.1 small pieces (slug migration #46, Glossarian install #48, DIRD frontmatter #51); C.1 light-mode tokens (#47); Writer micro-task — T6.3 colophon copy (#49). Mission files archived under `vector/missions/archive/` on 2026-05-25.
3. ~~**Renderer scope confirmation.**~~ ✅ locked 2026-05-17 via PR #52. Full spec at `plans/perihelion-b1-renderer-scope.md`. Six variants on `BlockquoteBlock` via a discriminator field, parser-side detection, definition glosses use a colon separator, parser carries an emoji-tolerance pass for `uap-field-map.md` during the C.2 transition.
4. ~~**B.1 renderer enhancement.**~~ ✅ shipped 2026-05-25 via PR #56. Types + parser + renderer + jsdom test env + 15 new tests. Parser sweep across 8 guides confirmed 41 of 42 callouts in `uap-field-map.md` pick up the right variant (one empty-body Read Next at line 145 falls through to plain, flagged for B.2).
5. ~~**C.1.5 dark-mode reading-comfort recalibration.**~~ ✅ shipped 2026-05-25 via PR #58. Inserted between #56 and the per-guide pipeline because Justin called the pure-black bg out as a reading-comfort problem during this session. Lifted to graphite (L 0.17) with hierarchy preserved and all 8 guide accents reverified ≥ AA. Single file in scope (`lab-tokens.css`) plus a one-line constant update in the parser. Locked posture saved to memory as [[feedback_lab_no_pure_black]].
6. ~~**DIRD secondary frontmatter follow-ups.**~~ ✅ shipped 2026-05-25 via PR #60 + PR #61. Two of three flags closed mechanically (spelling sweep + ICOD note); the third (`source.authors` slot on DIRDs 14/28) reframed as a deferred research question with a dedicated note file. DIRD 15 attribution re-confirmed in passing.
7. **Now in parallel — per-guide pipeline + C.2:**
  - **Per-guide pipeline (B.1 alignment → B.2 voice)** — for each guide: callout retrofit, inline definition glosses, voice sweep. Pipeline two agents — Tyrell aligning guide N+1 while Writer sweeps guide N. Streams don't block. Pick a starter guide before kicking off.
  - **C.2 icon sweep + lab-component restyling + GuideCard hover debug** — Tyrell + Impeccable. Picks up the parked T6.4 hover refinement as a debugging task. Now visually rests on top of the C.1.5 graphite bg, so chip + accent treatment may want a small re-tuning pass.
8. **Workstream D (logotype).** Anytime. Different hands, different surfaces.
9. **Workstream E (nested definitions).** Dreamer session whenever Justin wants to explore. Output is a plan, not code.

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

- **DIRDs 14 and 28 `source.authors` slot — research pending.** PR #60 landed the safe pieces and deferred the authors slot. Research note at `vector/research/dird-authorship.md` is the home for grounding. Resume when bandwidth + curiosity align.
- **DIRD 13 `Puthoff et al.` vs. `Hal Puthoff` — small open.** Current frontmatter uses the `et al.` hedge; DIRD 15 uses the bare name. Tighten if `et al.` is unsourced, otherwise keep. Listed in `vector/research/dird-authorship.md` under open questions.
- **DIRD 24 pre-attribution flagged.** Working-table research suggests DIRD 24 ("Concepts for Extracting Energy from the Quantum Vacuum") most likely traces to Eric Davis / AAWSAP technical contributors. Not a portfolio guide yet; useful when it gets built out.
- **Empty Read Next placeholder at `core/lab/guides/uap-field-map.md:145`** — surfaced by the PR #56 parser sweep. The `> 📎 **Read Next**` has no body paragraph and currently falls through to `plain` per the defensive rule. B.2 voice sweep on `uap-field-map` should fill the body or remove the placeholder.
- **Upstream sync of the colon-separator convention** — the portfolio-side renderer uses a colon as the inline-definition gloss separator (per `plans/perihelion-b1-renderer-scope.md`), diverging from the upstream spec's em-dash. Carry the change back to `~/projects/design-futures/guide-format-rules.md` on the next sync opportunity. The design-futures dir is not under version control, so the next sync agent will need to make the edit and report back in-session.

---

## Open question

**Q6 — Tagline evolution when Works ships.** Keep "closest approach to the frontier" at the umbrella, or evolve it to explicitly name both arms? Still thinking. Decide closer to the Works launch.