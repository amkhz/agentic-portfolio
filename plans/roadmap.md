# Roadmap

> Living roadmap for agentic-portfolio. Updated as priorities shift.
> Read VECTOR.md and ARCHITECTURE.md first. Work pitch notes live in `plans/work-pitch-notes.md`.
>
> **How plans graduate:** Ideas and Dreamer output live in `plans/`. When scoped for building via invest-crew, they produce a mission in `vector/missions/`. Completed work moves to `plans/archive/` and `vector/missions/archive/`.

**Last updated:** 2026-06-30

---

## What's shipped

### Portfolio surface
- 5 pages live: Home, About, Resume, Work (index), Work (4 case studies including meta)
- 31+ components across layout (3), content (13 + 4 resume + 7 constellation), effects (11), interactive (4)
- OKLCH color system with L-channel light/dark theming, zero dependencies
- Vite + React Router architecture with four-layer separation (design-system, core, services, src)
- SEO metadata, dynamic OG images, custom 404, favicon system
- CSS-only texture system: linen and circuit-mesh patterns for themed backgrounds (ADR-005)

### Interaction and motion
- Constellation spatial navigation for meta case study (ADR-007): 2D field of topic nodes with SVG connections, three-state responsive layout (hero/desktop-reading/mobile-reading), 1200ms spring-eased grid transition, hand-tuned node positions
- Constellation entrance sequence: staggered node fadeIn ("stars appearing"), connection line draw-on animation (stroke-dashoffset), spring-eased content materialization
- Motion design system: 5 semantic durations, 5 easing functions including `linear()` spring, comprehensive `prefers-reduced-motion` support, scoped transition properties across all components
- Animation layer: Particles hero background, SpotlightCard, ProfileCard holographic tilt, DecryptedText, CountUp spring metrics, RevealOnScroll blur+translateY materializing
- Last.fm NowPlaying: inverted tab widget with expand/collapse, frosted glass, randomized EqBars, album art reveal, synchronized spring easing
- Systematic audit and polish pass using Impeccable skill pipeline (ADR-006)
- Motion design audit (three-perspective: Jakub Krehel, Jhey Tompkins, Emil Kowalski)
- Hero and footer void sections (no texture behind particles)

### Crew and skills
- Agent skills infrastructure across Claude Code, Cursor, and Codex
- Builder skill retired and absorbed into doctrine and review ecosystem
- Roy shipped — post-build reviewer against architecture, doctrine, and quality gates. Wired into the pipeline (invest-crew → Tyrell → Roy → Impeccable).
- Joi voice profile through Phase 3.1: 16 interview samples + About-page edited-prose corpus + cold-read calibration on a lab-guide rewrite. Production-ready for Writer-driven content.
- About-page voice and proofread pass — first content surface refined against the locked profile
- **Glossarian skill installed** (PR #48): portfolio-side adaptation of the upstream design-futures skill, wired to `npm run audit:orphans` and grounded against `core/lab/guides/` + `~/projects/design-futures/sources/`
- **Impeccable v3.0.7 upgrade** (PR #50): bumped from v2.1.1; `DESIGN.md` renamed to `PRODUCT.md` as the single source of truth for design context; `VOID.md` added

### Perihelion (lab at labs.justinh.design)
- Two Vite entries, one repo. Host-based Vercel rewrite (ADR-009)
- Two-arm house: **Perihelion Archive** (research, shipped) + **Perihelion Works** (applied design, reserved). Renamed from "Frontier Lab" 2026-04-21 (ADR-010)
- Eight launch guides across territories (T1 Consciousness & Spacetime × 5, T3 Materials & Sensing × 1, T4 UAP Detection × 2)
- Welcome triptych + manifesto + T5 sub-passes (PR #40), refined via T6 critique/polish wave (PR #42): viewport-gated TerritoryBadge pulse, perihelion-sigil drop cap, DIRD colophon source-corpus affordance, entrance fades for welcome triptych and territory sections
- Guide renderer: tab bar (Guide / Glossary), sticky section nav with masked-edge scroll, inline term definitions, figure paper-container, prev/next navigation, top and bottom back-to-library affordances
- Authoring pipeline: markdown + YAML frontmatter, hand-rolled parser, one-shot JSX migration script for legacy content, orphan-term audit (`npm run audit:orphans`)
- Markdown coverage: bold, italic, glossary terms, figures, pipe tables, h3 subsections, ordered/bullet lists, blockquotes
- Lab subdomain rewrite hardening (PR #28-#31): consolidated host routing, root client-redirect, explicit root-path match, `:path(.*)` matcher
- Constellation node id migrated from `the-lab` to `perihelion`
- **B.1 schema migration** (PR #46): `id:` → `slug:` across all 8 Archive guides, parser, types, tests
- **B.1 DIRD frontmatter corrections** (PR #51): `source.year` and `source.venue` aligned to source PDFs on DIRDs 13/14/15/28
- **B.1 renderer enhancement scope locked** (PR #52): `BlockquoteBlock` variant discriminator with six values, parser-side detection, definition glosses as first-class with colon separator. Full spec at `plans/archive/perihelion-b1-renderer-scope.md`. Build is the next open mission.
- **C.1 light-mode tokens** (PR #47): full `[data-theme="light"]` set added to `design-system/lab-tokens.css`. Cream paper + warm ink palette, WCAG 2.2 AA across every pairing, dark stays the default until C.2 wires the attribute.
- **T6.3 colophon copy refinement** (PR #49): voice-tuned against the Phase 3.1 voice profile

### Merged feature branches
- `feature-reactbits`, `feature-lastfm`, `feature-motion-effects`, `fix-widget`, `feature-constellation`
- `feature-evolution-node` (constellation node alignment + tune mode)
- `feat/speculative-lab-library` (Perihelion launch)
- `feat/perihelion-rename` (PR #34/#35)
- `chore/post-merge-cleanup` (PR #36)
- `feat/joi-phase-2-voice-profile` (PR #37/#38, includes Phase 3 and 3.1)
- `feat/perihelion-library-t6-polish` (PR #42, T6.1–T6.5 critique + polish wave)
- `chore/archive-perihelion-welcome-mission` (PR #43)
- `chore/perihelion-plan-refine-2026-05-03` (PR #44)
- `chore/ignore-agent-worktrees` (PR #45)
- `chore/perihelion-slug-migration` (PR #46, B.1 schema)
- `feat/perihelion-light-mode-tokens` (PR #47, C.1)
- `chore/perihelion-glossarian-install` (PR #48)
- `chore/perihelion-colophon-copy` (PR #49, T6.3 carry-over)
- `chore/stash-impeccable-v3-and-void-2026-05-17` (PR #50, Impeccable v3.0.7 + VOID.md)
- `chore/perihelion-b1-dird-frontmatter` (PR #51, B.1 DIRD frontmatter)
- `chore/perihelion-renderer-scope-lock` (PR #52, B.1 renderer scope)
- `feat/conservatory-tokens` (PR #130, "The Conservatory" post-recalibration batch — type, imagery, notes, motion, Roy review, Impeccable polish)
- Post-launch polish on main: responsive AVIF/WebP + code-split (#132), mobile UX fixes (#133–#138), Wallace skill craft (#137/#138)

---

## Active explorations

### 1. Perihelion content sweep and growth — ⭐ NEXT FOCUS

> **Current focus (2026-06-30):** with the Conservatory portfolio recalibration shipped, the next batch is bringing **Perihelion up to a new visual standard.** Scope to be planned (likely a Dreamer pass over the C.2 restyling + D logotype/sigil workstreams below, measured against the Conservatory bar the portfolio now sets).

**Status:** Archive shipped + welcome wave landed. Voice locked at Phase 3.1. B.1 small pieces and C.1 done. B.1 renderer enhancement build is the next open mission.
**Plan:** `plans/perihelion-next-steps.md` | **Renderer scope:** `plans/archive/perihelion-b1-renderer-scope.md` | **Launch mission (archived):** `vector/missions/archive/speculative-lab-library.md` | **ADRs:** ADR-009, ADR-010

**Workstreams (see plan for detail):**
- A — Origins intro ✅ shipped (PR #40 + T6 polish PR #42)
- B.1 — Format alignment: slug migration ✅ (#46), DIRD frontmatter ✅ (#51), renderer scope locked ✅ (#52). Pending: renderer enhancement build (next mission, `feat/perihelion-b1-renderer-variants`), per-guide callout retrofit + definition glosses.
- B.2 — Voice sweep across the eight guides (Writer-led, paced over time). Awaits B.1 per-guide alignment.
- C.1 — Light-mode tokens ✅ shipped (#47).
- C.2 — Icon sweep + lab-component restyling + GuideCard hover refinement. Unfreezes after B.1 renderer enhancement lands.
- D — Logotype and sigil pass (can run parallel to B).
- E — Nested-definitions drill-down (Dreamer session pending).

**Engineering follow-ups (not in the workstream punch list):**
- Per-guide dynamic import / code-split (bundle crossed Vite's 500 KB threshold with 8 guides)
- Territory landing pages (`/t/:territory`) once the library has ~15+ guides
- Figure intrinsic dimensions on `<img>` to eliminate layout shift
- Build-time figure optimization via `vite-imagetools`
- Full-text search once content volume demands it

### 2. Portfolio visual overhaul — "The Conservatory" (ADR-013) ✅ SHIPPED

**Status:** ✅ Shipped to main via PR #130 ("The Conservatory — post-recalibration batch: type, imagery, notes, motion"), merged 2026-06-27. The whole batch landed: M1 surfaces, M2 imagery, M3 notes + prose + case-study verification, M4 motion (tokens, surface choreography, wave-driven mandate), Roy final review, and the Impeccable critique/polish fixes. Build + tests green at merge.
**Direction:** ADR-013 | **Mission manifest (archived):** `vector/missions/archive/post-recalibration-batch.md` | **Sub-missions (archived):** `conservatory-visual-build.md` (A), `case-study-content-refresh.md` (B), `conservatory-surfaces.md` | **Sprint-0 notes (archived):** `plans/archive/recalibration-sprint0-notes.md` | **North-stars:** `mocks/recalibration-sprint0/`

"The Conservatory" is an inhabited biophilic-future register: humus-black + brass/amber + sage-green color inversion (magenta demoted to rare signal), wabi-sabi + Danish craft, seamless advanced tech, subtle luxury, day/night dual mode. Wallace-generated imagery is the centerpiece; Field Notebook layout grammar; the two-door origin→evolution piece ships as "The Fork" (split-screen entry).

**One open thread (parked):** T4d Paper Shaders spike — parked on `spike/paper-shaders`, NO-GO on cover-backgrounds (faint over the low-contrast dark palette; the `colors` prop also rejects `oklch()`). Retry as image-filter-over-renders post-launch. Reference: `plans/paper-shaders-reference.md`.
**Post-launch follow-up (separate initiative):** mobile RES / Lighthouse perf — see exploration #9 below.

### 3. Constellation enhancements

**Status:** V1 shipped and polished. Spatial navigation live on meta case study.
**Plan:** `plans/archive/meta-case-study-field.md` | **Mission:** `vector/missions/archive/constellation-field.md`

**Next steps:**
- View Transitions API for node-to-node crossfade (eliminates exit animation gap)
- `@property --glow-intensity` for smooth node glow interpolation
- Scroll-driven constellation reveal on page entry
- Add images for Color Migration and Agentic Workflow chapters

### 4. Music integration (Last.fm + MCP)

**Status:** Tier 1 shipped (NowPlaying widget live in production). API key moved server-side (2026-07-06, `api/lastfm.ts` proxy). Phase 2 planned.
**Plan:** `plans/music-phase-2.md` (supersedes the archived plan's Tier 1.5/2/3 sections) | **Original vision:** `plans/archive/lastfm-music-integration.md`

**Next steps:**
- Last.fm MCP server + full-history archive (Mission 1, separate repo)
- "Twenty Years of Listening" flagship experience (Mission 2)
- The Selector DJ set-builder; The Lounge concept (Works 02 candidate)

### 5. Crew and skills evolution

**Status:** Builder retired. Roy shipped (post-build reviewer, referenced in CLAUDE.md and ARCHITECTURE.md). Voice calibration shipped through Phase 3.1.
**Plan:** `plans/archive/skill-refresh-initiative.md`

**Workstreams:**
- Add Investiture health check to Director
- Joi calibration is production-ready; future passes will run on cadence as the corpus grows

### 6. Parked component work

**Plans:**
- `plans/blade-runner-crew-rename.md` — Crew rename to Case/Wintermute/Neuromancer/Stelline. ~206 occurrences across ~35 files. Parked.
- `plans/button-destructive-variant.md` — Destructive Button variant ready to apply when a real destructive action lands in the UI.

### 7. Figma token sync

**Status:** Advisory written (OKLCH Phase 3). No code yet.

**Path:** Export `core/tokens/index.ts` -> W3C DTCG JSON -> Token Studio -> Figma Variables.

### 8. Design system documentation page

**Goal:** Auto-generated `/system` or `/tokens` page rendering all token values, component variants, and a11y specs.

### 9. Mobile performance — Lighthouse RES follow-up

**Status:** Active investigation. Vercel mobile RES at 58; INP ~928ms is the killer (main-thread JS / motion work), while CLS and FID are already strong. Justin wants this run as its own focused thread.
**Plan:** `plans/lighthouse-perf-followup.md` (open on PR #139, branch `docs/mobile-res-investigation`).

---

## Infrastructure

- **Testing:** Vitest in the stack, coverage minimal. Add tests for core/ utilities and content model validation.
- **Code splitting:** React Router v7 supports lazy loading. Set up per-route splitting as the lab bundle grows.
- **View transitions:** Explore View Transitions API for page-level and constellation node navigation.
- **MCP development:** Last.fm MCP server first. Pattern extends to other data sources.
- **Theme-switch optimization:** Global transition selector narrowed to containers + interactive elements. Monitor for edge cases.

---

## Decisions

Significant choices get documented as ADRs in `vector/decisions/`.

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| 001 | Migrate from Next.js to Vite | 2026-03-04 | Accepted |
| 003 | React Bits adoption strategy | 2026-03-07 | Accepted |
| 004 | Last.fm integration architecture | 2026-03-07 | Accepted |
| 005 | CSS-only texture system | 2026-04-11 | Accepted |
| 006 | Systematic audit and polish pass | 2026-04-11 | Accepted |
| 007 | Constellation spatial navigation | 2026-04-12 | Accepted |
| 008 | Defer DESIGN.md adoption | 2026-04-14 | Accepted |
| 009 | Lab subdomain architecture (two Vite builds, one repo) | 2026-04-20 | Accepted |
| 010 | Rename lab to Perihelion (two-arm house: Archive and Works) | 2026-04-21 | Accepted |
| 011 | Portfolio visual recalibration to editorial-craftsperson register | 2026-05-17 | Superseded by ADR-013 |
| 012 | Perihelion house identity | 2026-06 | Accepted |
| 013 | Portfolio visual direction: "The Conservatory" (biophilic-future register) | 2026-06-20 | Accepted, shipped to main via PR #130 |
| 018 | Archive-first Last.fm data architecture in a standalone MCP repo | 2026-07-06 | Accepted |
