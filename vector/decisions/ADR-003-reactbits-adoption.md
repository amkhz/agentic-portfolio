# ADR-003: React Bits Adoption Strategy

**Date:** 2026-03-07
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (agent)

## Context

The portfolio needed an animation and effects layer to bring visual life to the site -- particle backgrounds, card tilt effects, text reveal animations, metric counters. React Bits (reactbits.dev) offers a library of exactly these kinds of components, built with TypeScript and Tailwind. The question was how to bring them into a project with strict architectural opinions about token compliance, accessibility, and dependency weight.

The four-layer architecture (ARCHITECTURE.md) requires that all visual decisions flow from `design-system/tokens.css`, that components live in `src/`, and that heavy dependencies are avoided when a focused solution exists. Any adoption strategy needed to satisfy these constraints without creating coupling to an external release cycle.

Separately, GSAP was evaluated for scroll-driven animations during Phase 1.2. It was installed, integrated, and reverted within one session. The library felt sluggish for the portfolio's lightweight needs, and the scroll-triggered card animations broke layout flow. The experience reinforced the project's bias toward small, focused tools over monolithic animation libraries.

## Decision

Adopt React Bits components using a **copy-paste-adapt** pattern. Each component is copied as local TypeScript + Tailwind into `src/components/effects/`, then adapted to use our design token system (CSS variables from `design-system/tokens.css`). React Bits is never installed as an npm dependency.

**Components adopted (7 total, plus 1 dev tool):**

| Component | Purpose | Location |
|-----------|---------|----------|
| Particles | Hero background animation | `src/components/effects/Particles.tsx` |
| SpotlightCard | Tilt/glow effect on ProjectCards | `src/components/effects/SpotlightCard.tsx` |
| DecryptedText | Character-scramble text reveal | `src/components/effects/DecryptedText.tsx` |
| CountUp | Spring-physics number animation | `src/components/effects/CountUp.tsx` |
| ProfileCard | 3D tilt card with spotlight | `src/components/effects/ProfileCard.tsx` |
| Threads | Generative thread lines | `src/components/effects/Threads.tsx` |
| Waves | Audio-reactive wave animation | `src/components/effects/Waves.tsx` |
| ParticlesTuner | Dev-only tuning panel for Particles | `src/components/effects/ParticlesTuner.tsx` |

**One new dependency added:** `motion/react` (the tree-shakeable subset of Framer Motion) for CountUp's spring physics. No other dependencies were introduced.

**All adopted components respect `prefers-reduced-motion`** -- animations are disabled or reduced when the user's OS-level preference requests it.

## Consequences

**Positive:**
- Zero coupling to React Bits' release cycle, versioning, or breaking changes
- Every component uses our token colors and spacing -- no rogue `#000` or hardcoded values leaking into the design system
- Selective adoption -- we take only what we need, skip what we don't
- `prefers-reduced-motion` is enforced at the component level, maintaining WCAG 2.2 AA compliance
- Bundle stays lean -- no unused components shipped to the client
- Components can be freely modified to fit the portfolio's specific needs (e.g., removing `moveParticlesOnHover` from Particles)

**Negative:**
- Manual maintenance burden -- if React Bits fixes a bug upstream, we need to notice and port the fix ourselves
- No automatic updates when React Bits ships improvements or new features
- Initial adaptation effort per component (token mapping, reduced-motion support, TypeScript adjustments)

## Alternatives Considered

**Install React Bits as an npm package** -- Rejected because it couples the project to their release cycle and prevents adaptation to our token system. The library's default styles would conflict with the design system's CSS variable approach, requiring overrides that are harder to maintain than owning the source directly.

**Framer Motion (full package)** -- Rejected in favor of `motion/react`, which is the lighter tree-shakeable subset. The full Framer Motion package includes layout animations, shared layout transitions, and other features this project does not need. `motion/react` provides the spring physics for CountUp without the overhead.

**GSAP** -- Tried during Phase 1.2 for scroll-driven animations. Reverted within one session. The library added weight (~45KB minified) and the scroll-triggered card animations felt sluggish and broke layout flow. The experience confirmed the project's preference for lighter, focused tools.

**Build all effects from scratch** -- Rejected for components where React Bits already solved non-trivial math: particle system collision and distribution, perspective tilt with spotlight tracking, spring-based easing curves. Writing these from scratch would be engineering vanity, not good judgment. Copy-adapt is the pragmatic middle ground.
