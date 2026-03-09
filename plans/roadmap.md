# Roadmap

> Living roadmap for agentic-portfolio. Updated as priorities shift.
> Read VECTOR.md and ARCHITECTURE.md first. Work pitch notes live in `plans/work-pitch-notes.md`.

**Last updated:** 2026-03-08

---

## What's shipped

- 5 pages live: Home, About, Resume, Work (index), Work (4 case studies including meta)
- 31 components across layout (3), content (13 + 4 resume), effects (11), interactive (4)
- OKLCH color system with L-channel light/dark theming, zero dependencies
- Vite + React Router architecture with four-layer separation (design-system, core, services, src)
- Agent skills infrastructure across Claude Code, Cursor, and Codex
- SEO metadata, dynamic OG images, custom 404, favicon system
- Animation layer: Particles hero background, SpotlightCard on ProjectCards, ParticlesTuner (dev-only)
- Last.fm NowPlaying: inverted tab widget with expand/collapse, frosted glass, randomized EqBars, album art reveal
- Motion effects: DecryptedText (track name scramble), CountUp (spring-animated metrics), ProfileCard (holographic tilt with ouroboros overlay)
- Mobile header polish: NowPlaying 280px min-width, centered nav between monogram and ThemeToggle
- `feature-reactbits`, `feature-lastfm`, `feature-motion-effects`, and `fix-widget` merged to main, live in production
- Animation refinement spike: RevealOnScroll blur+translateY materializing, Button press feedback, ThemeToggle ray transitions, NowPlaying spring easing + negative delays, --ease-spring token, @property pointer vars
- Meta case study: three new chapters (Color Migration, Framework Migration, Agentic Workflow), before/after comparison images, all meta images resized to 1400px

---

## Active explorations

### 1. Music integration (Last.fm + MCP)

**Status:** COMPLETE (core widget). NowPlaying merged to main and live in production (2026-03-07). Inverted tab design with expand/collapse, frosted glass matching header, randomized EqBars, album art reveal. Polling hook (30s, visibility-aware), service layer, env vars on Vercel. `prefers-reduced-motion` verified.

**Next steps:**
- Move API key server-side via Vercel serverless function (low-risk read-only key for now)
- Fix expanded panel backdrop-blur (overflow-hidden kills backdrop-filter, needs alternative collapse strategy)
- Last.fm MCP server (Tier 2)

**Bigger vision (phased):**
- Listening history visualizations -- genre maps, time-of-day patterns, generative art based from album art (but not the kind that steals from others, more like machines bending pixels and making stuff), mood boards generated from album art palettes
- DJ playlist mining -- surface patterns in listening data, explore moods, themes, tempos, export to Serato/Rekordbox-compatible formats
- Music recall (what was that one song i was listening to the other day?)
- more ideas to be generated via divergence and convergence
- Apple Music tie-ins -- cross-reference scrobbles with Apple Music, local folders and Audirvana library, surface gaps and overlaps, investigate themes or flows
- Some of this lives on the portfolio. Some lives in /experiments. Some is pure tooling.

**Why MCP matters here:** Building a Last.fm MCP server means any agent can query "what has Justin been listening to this week" or "find tracks that match this energy." It turns listening data into a first-class context source for creative workflows. And "I built an MCP server" is a pitch-worthy line item.

### 2. Animation layer (React Bits)

**Status:** COMPLETE (Phase 1 + 2). All shipped and merged to main (2026-03-07).
- Phase 1: Particles hero, SpotlightCard, ParticlesTuner (dev-only)
- Phase 2: DecryptedText (NowPlaying track scramble), CountUp (MetricCard spring animation), ProfileCard (holographic tilt with ouroboros SVG overlay, grain noise, mobile device orientation tilt)
- GSAP scroll animations tried and reverted -- felt sluggish
- `motion/react` added as sole new dependency for CountUp spring physics

**Next steps:**
- Revisit scroll animations later if there's a lighter approach
- Threads and Waves kept for future music visualization work

**Constraints for the portfolio proper:**
- `prefers-reduced-motion` respected
- Lighthouse performance above 90
- WCAG 2.2 AA maintained

**Constraints for /experiments:**
- Accessibility can flex for the sake of creative expression
- Performance budget is looser
- This is the lab, not the showroom

**Installation approach:** Copy-paste TS + Tailwind variants, no monolithic package. Each component we adopt lives in `src/components/effects/` and uses our token system.

### 3. Meta case study evolution

**Status:** IN PROGRESS. Three new chapters shipped (2026-03-08): Color Migration, Framework Migration, Agentic Workflow. Before/after comparison images for framework migration added. Content is live in linear format.

**What shipped:**
- Color Migration chapter: OKLCH conversion, L-channel principle callout, metrics
- Framework Migration chapter: Next.js to Vite reasoning, before/after comparison block with structure screenshots, Investiture Doctrine context
- Agentic Workflow chapter: four skills, layer permissions, MCP servers, meta-insight

**Design challenge (still open):** The case study keeps growing. The linear format works but won't scale. The Codex v1 build plan proposes a vertical spine with expandable chapter nodes as the next evolution.

**Next steps:**
- Codex v1 implementation (see `plans/codex-v1-build-plan.md`)
- Swap meta images with better cropped versions (TODO from commit)
- Add images for Color Migration and Agentic Workflow chapters (see `plans/meta-case-study-images.md`)

### 4. Figma token sync

**Status:** Advisory written (OKLCH Phase 3). No code yet.

**Path:** Export `core/tokens/index.ts` -> W3C DTCG JSON -> Token Studio -> Figma Variables. Code is the source of truth.

OKLCH makes this more compelling: the token system is now perceptually uniform, which means Figma designers and code are speaking the same color language even if Figma Variables don't support OKLCH natively yet (Token Studio converts transparently).

### 5. Design system documentation page

**Goal:** Auto-generated `/system` or `/tokens` page that renders all token values, component variants, and a11y specs. Imports directly from `core/tokens/index.ts`.

Color swatches, type specimens, spacing scale, component playground. Both a reference for Justin and a portfolio artifact that demonstrates systematic thinking.

---

## The playground (/experiments)

A route (or set of routes) for creative exploration that doesn't need to meet portfolio-grade rigor.

**What lives here:**
- React Bits experiments and combinations
- Music visualizations and data explorations
- Photography + generative art mashups
- Novel interaction patterns being prototyped
- Anything where accessibility or performance constraints would kill the idea before it's born

**What doesn't live here:**
- Case studies or professional work
- Anything that needs SEO or sharing metadata

**Architecture:** Same four-layer rules apply to code organization. The relaxed constraints are about the output, not the code quality.

---

## Infrastructure

- **Testing:** Vitest is in the stack but coverage is minimal. Add tests for core/ utilities and content model validation as we build.
- **Code splitting:** React Router v7 supports lazy loading. Worth setting up per-route splitting as the bundle grows with React Bits components.
- **View transitions:** Vite + React Router makes route transitions more natural than Next.js did. Explore the View Transitions API for page-level animations.
- **MCP development:** Last.fm MCP server is the first project. Pattern can extend to other data sources (photography EXIF data, Figma, reading lists).
- **Upstream sync automation:** GitHub Action to notify when the Investiture upstream repo has new commits. Lightweight cron check, opens an issue or sends a notification. Low priority but track it here.

---

## Decisions

Significant choices get documented as ADRs in `vector/decisions/`.

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| 001 | Migrate from Next.js to Vite | 2026-03-04 | Accepted |
| 002 | (pending) /experiments playground route | -- | Proposed |
| 003 | React Bits adoption strategy | 2026-03-07 | Accepted |
| 004 | Last.fm integration architecture | 2026-03-07 | Accepted |
