# Roadmap

> Living roadmap for agentic-portfolio. Updated as priorities shift.
> Read VECTOR.md and ARCHITECTURE.md first. Work pitch notes live in `plans/work-pitch-notes.md`.
>
> **How plans graduate:** Ideas and Dreamer output live in `plans/`. When scoped for building via invest-crew, they produce a mission in `vector/missions/`. Completed work moves to `plans/archive/` and `vector/missions/archive/`.

**Last updated:** 2026-04-30

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

### Perihelion (lab at labs.justinh.design)
- Two Vite entries, one repo. Host-based Vercel rewrite (ADR-009)
- Two-arm house: **Perihelion Archive** (research, shipped) + **Perihelion Works** (applied design, reserved). Renamed from "Frontier Lab" 2026-04-21 (ADR-010)
- Eight launch guides across territories (T1 Consciousness & Spacetime × 5, T3 Materials & Sensing × 1, T4 UAP Detection × 2)
- Guide renderer: tab bar (Guide / Glossary), sticky section nav with masked-edge scroll, inline term definitions, figure paper-container, prev/next navigation, top and bottom back-to-library affordances
- Authoring pipeline: markdown + YAML frontmatter, hand-rolled parser, one-shot JSX migration script for legacy content, orphan-term audit (`npm run audit:orphans`)
- Markdown coverage: bold, italic, glossary terms, figures, pipe tables, h3 subsections, ordered/bullet lists, blockquotes
- Lab subdomain rewrite hardening (PR #28-#31): consolidated host routing, root client-redirect, explicit root-path match, `:path(.*)` matcher
- Constellation node id migrated from `the-lab` to `perihelion`

### Merged feature branches
- `feature-reactbits`, `feature-lastfm`, `feature-motion-effects`, `fix-widget`, `feature-constellation`
- `feature-evolution-node` (constellation node alignment + tune mode)
- `feat/speculative-lab-library` (Perihelion launch)
- `feat/perihelion-rename` (PR #34/#35)
- `chore/post-merge-cleanup` (PR #36)
- `feat/joi-phase-2-voice-profile` (PR #37/#38, includes Phase 3 and 3.1)

---

## Active explorations

### 1. Perihelion content sweep and growth

**Status:** Archive shipped. Voice locked at Phase 3.1. Next steps captured in detail.
**Plan:** `plans/perihelion-next-steps.md` | **Launch mission (archived):** `vector/missions/archive/speculative-lab-library.md` | **ADRs:** ADR-009, ADR-010

**Workstreams (see plan for detail):**
- A — Origins intro (ready to ship)
- B — Content sweep across the eight guides (the main thing; build audit scripts first)
- C — Design system overhaul (deferred behind B)
- D — Logotype and sigil pass (can run parallel to B)
- E — Nested-definitions drill-down (Dreamer session pending)

**Engineering follow-ups (not in the workstream punch list):**
- Per-guide dynamic import / code-split (bundle crossed Vite's 500 KB threshold with 8 guides)
- Territory landing pages (`/t/:territory`) once the library has ~15+ guides
- Figure intrinsic dimensions on `<img>` to eliminate layout shift
- Build-time figure optimization via `vite-imagetools`
- Full-text search once content volume demands it

### 2. Constellation enhancements

**Status:** V1 shipped and polished. Spatial navigation live on meta case study.
**Plan:** `plans/archive/meta-case-study-field.md` | **Mission:** `vector/missions/archive/constellation-field.md`

**Next steps:**
- View Transitions API for node-to-node crossfade (eliminates exit animation gap)
- `@property --glow-intensity` for smooth node glow interpolation
- Scroll-driven constellation reveal on page entry
- Add images for Color Migration and Agentic Workflow chapters

### 3. Music integration (Last.fm + MCP)

**Status:** Tier 1 shipped (NowPlaying widget live in production).
**Plan:** `plans/archive/lastfm-music-integration.md`

**Next steps:**
- Move API key server-side via Vercel serverless function
- Last.fm MCP server (Tier 2)
- Listening history visualizations, genre maps, DJ playlist mining

### 4. Crew and skills evolution

**Status:** Builder retired. Roy shipped (post-build reviewer, referenced in CLAUDE.md and ARCHITECTURE.md). Voice calibration shipped through Phase 3.1.
**Plan:** `plans/archive/skill-refresh-initiative.md`

**Workstreams:**
- Add Investiture health check to Director
- Joi calibration is production-ready; future passes will run on cadence as the corpus grows

### 5. Parked component work

**Plans:**
- `plans/blade-runner-crew-rename.md` — Crew rename to Case/Wintermute/Neuromancer/Stelline. ~206 occurrences across ~35 files. Parked.
- `plans/button-destructive-variant.md` — Destructive Button variant ready to apply when a real destructive action lands in the UI.

### 6. Figma token sync

**Status:** Advisory written (OKLCH Phase 3). No code yet.

**Path:** Export `core/tokens/index.ts` -> W3C DTCG JSON -> Token Studio -> Figma Variables.

### 7. Design system documentation page

**Goal:** Auto-generated `/system` or `/tokens` page rendering all token values, component variants, and a11y specs.

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
