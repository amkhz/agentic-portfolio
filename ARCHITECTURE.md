# Architecture

**Last Updated:** 2026-03-14

This file is the technical specification. Layers, stack, conventions, structure, and import rules are defined here.

For the philosophy behind these decisions -- the Core Relationship, the Seven Principles, and design constraints -- see VECTOR.md.

---

## Four Layers

| Layer | Location | Rule |
|-------|----------|------|
| **Design System** | `design-system/tokens.css` | All visual decisions live here. CSS variables consumed by Tailwind v4 and components. No hardcoded colors, spacing, or font sizes anywhere else. |
| **Core Logic** | `core/` | Pure functions, data models, and content. No API calls, no DOM, no side effects. Testable without mocking. |
| **Services** | `services/` | All communication with the outside world. API calls, analytics, storage. |
| **UI** | `src/` | Renders data. Imports from the other three layers. Does not own business logic. |

Every file belongs to exactly one layer. If you are unsure, it goes in `core/`.

### How to Add a Feature

Follow this order every time:

1. **Design tokens** -- New colors, spacing, or visual properties go in `design-system/tokens.css`.
2. **Core logic** -- Business logic (validation, transformation, content models) goes in `core/`. Write tests.
3. **Service** -- External communication goes in `services/`.
4. **UI last** -- Build the component in `src/`, importing from the other three layers.

### What Not to Do

- **API calls in components** -- Use `services/`. Components render, they do not fetch.
- **Hardcoded colors or spacing** -- Use token-based Tailwind classes or `var(--token-name)` from `design-system/tokens.css`.
- **Business logic in components** -- Move it to `core/`. If it does not touch the DOM, it does not belong in `src/`.
- **Heavy dependencies** -- Do not install a library when 20 lines of code will do.
- **Files over 200 lines** -- Split them, with exceptions for self-contained visual/animation components (canvas, WebGL, shaders) where splitting would harm maintainability.
- **Raw color values** -- No `#000`, `#FFF`, or default Tailwind color palette. Token colors only. Exception: copy-paste effect components (canvas, WebGL, holographic gradients) may contain internal color constants for shader/gradient effects that are not semantic tokens.

### Import Direction

Layers import in one direction only:

```
UI (src/)        -> imports from -> core/, services/, design-system/
Services         -> imports from -> core/
Core (core/)     -> imports from -> nothing (pure)
Design System    -> imported by all via CSS variables (no JS imports)
```

Violations: `core/` importing from `src/`, `services/`, or `design-system/`. `services/` importing from `src/` or `design-system/`.

---

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 19 + Vite 6 | Fast builds, hot reload, ES modules native |
| **Language** | TypeScript (strict mode) | Catch errors at compile time, self-documenting code |
| **Styling** | Tailwind v4 + CSS variable tokens | Utility-first with design system enforcement via `design-system/tokens.css` |
| **Typography** | Space Grotesk (display), Didact Gothic (body), Podkova (heading) | Three-font stack with distinct roles |
| **Animation** | motion/react | Spring physics animations, gesture support |
| **Routing** | react-router v7 | Client-side routing with SPA support via `vercel.json` rewrites |
| **SEO** | react-helmet-async | Per-page `<title>` and meta tags |
| **Testing** | Vitest | Vite-native. Same config, same transforms. Zero friction |
| **Deployment** | Vercel | Static hosting with analytics and speed insights |

---

## Project Structure

```
agentic-portfolio/
├── VECTOR.md              # Project doctrine (read first)
├── CLAUDE.md              # Agent persona (read second)
├── ARCHITECTURE.md        # This file (read third)
├── index.html             # Vite entry point
├── vite.config.ts         # Vite + Tailwind + path aliases
├── tsconfig.json          # TypeScript strict config
├── package.json           # Scripts: dev, build, test, lint
├── /.agents               # Agent skill definitions
│   └── /skills
│       ├── /builder       # Retired 2026-04-12 (RETIRED.md archive)
│       ├── /director      # Director skill (tracks project status)
│       ├── /dreamer       # Dreamer skill (refines ideas into plans)
│       ├── /roy           # Roy skill (post-build reviewer, quality checks)
│       ├── /joi           # Joi skill (voice calibration for Writer)
│       └── /writer        # Writer skill (case study content)
├── /design-system         # Visual foundation layer
│   └── tokens.css         # CSS variables (colors, spacing, typography)
├── /core                  # Pure logic layer
│   ├── /content           # Case study and resume data models
│   │   ├── case-studies.ts
│   │   ├── case-studies.test.ts
│   │   ├── parse-case-study.ts
│   │   ├── resume.ts
│   │   ├── lastfm.ts
│   │   ├── ai-leadership.md
│   │   ├── building-this-portfolio.md
│   │   ├── instant-doc-review.md
│   │   └── instant-sow.md
│   ├── /tokens            # TypeScript token exports
│   │   ├── index.ts
│   │   └── tokens.test.ts
│   └── /utils             # Utility functions (no side effects)
│       ├── index.ts
│       ├── format.ts
│       └── utils.test.ts
├── /services              # External integration layer
│   ├── analytics.ts       # Vercel analytics wrapper
│   ├── api.ts             # Fetch wrapper
│   └── lastfm.ts          # Last.fm API client
├── /src                   # UI layer
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Root component + router
│   ├── /styles
│   │   └── globals.css    # Global styles (imports tokens, Tailwind)
│   ├── /layouts
│   │   └── Layout.tsx     # Page layout shell
│   ├── /pages             # Route-level components
│   │   ├── HomePage.tsx
│   │   ├── WorkPage.tsx
│   │   ├── CaseStudyPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ResumePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── /components
│   │   ├── ScrollToTop.tsx
│   │   ├── /content       # Content display components
│   │   │   ├── AboutSnippet.tsx
│   │   │   ├── CalloutBlock.tsx
│   │   │   ├── CaseStudyPage.tsx
│   │   │   ├── ComparisonBlock.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ImageBlock.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── MetricGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── QuoteBlock.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── TextBlock.tsx
│   │   │   └── /resume
│   │   │       ├── ResumeExperienceItem.tsx
│   │   │       ├── ResumeHeader.tsx
│   │   │       ├── ResumeSection.tsx
│   │   │       └── ResumeSkillGroup.tsx
│   │   ├── /effects       # Visual effects and animation components
│   │   │   ├── CountUp.tsx
│   │   │   ├── DecryptedText.tsx
│   │   │   ├── GlowEffect.tsx
│   │   │   ├── GrainOverlay.tsx
│   │   │   ├── Particles.tsx
│   │   │   ├── ParticlesTuner.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── RevealOnScroll.tsx
│   │   │   ├── SpotlightCard.tsx
│   │   │   ├── Threads.tsx
│   │   │   └── Waves.tsx
│   │   ├── /interactive   # Interactive UI components
│   │   │   ├── Button.tsx
│   │   │   ├── NowPlaying.tsx
│   │   │   ├── Tag.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── /layout        # Page structure components
│   │       ├── Container.tsx
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── /providers
│   │   └── ThemeProvider.tsx
│   └── /lib
│       ├── site-metadata.ts
│       └── useNowPlaying.ts
├── /public                # Static assets (images, resume PDF, robots.txt)
├── /vector                # Zero Vector knowledge artifacts
│   ├── /schemas
│   ├── /research
│   ├── /audits
│   └── /decisions         # Architecture Decision Records
├── /plans                 # Project planning documents
│   └── /archive           # Superseded plans
└── /scripts               # Build and generation scripts
```

---

## Conventions

### File Organization
- **core/** -- Pure functions, data models, content. Testable without mocking. No API calls, no DOM.
- **services/** -- Anything that talks to the outside world.
- **src/components/** -- React components. UI only. Business logic lives in core/.
- **src/pages/** -- Route-level page components.
- **design-system/** -- CSS variables. Change tokens.css to change the entire theme.

### Naming
- Components: `PascalCase.tsx`
- Utilities and pure logic: `camelCase.ts`
- CSS: `kebab-case.css`

### State Management
- Context + hooks for shared state
- `useState` for UI-only state
- No Redux, no Zustand unless the project outgrows Context

### Styling
- Tailwind v4 with CSS variable tokens from `design-system/tokens.css`
- Token colors only -- no default Tailwind palette, no `#000` or `#FFF`
- Dark mode is the default and primary experience
- Didact Gothic at weight 400 only

### Routing
- react-router v7 for client-side navigation
- react-helmet-async for per-page `<title>` and meta tags
- `vercel.json` rewrites all routes to `index.html` for SPA support

### Testing
- Tests live next to the code: `core/utils/format.test.ts`
- `npm test` to run all, `npm run test:watch` for watch mode
- Pure functions are easy to test -- no mocking needed. Prefer pure functions.

---

## Flexible Preferences

These defaults can be overridden by the operator in CLAUDE.md or this file:

- **Commit granularity** -- Default: one commit per logical change.
- **Testing expectations** -- Default: test critical logic in core/.
- **Comment density** -- Default: comments on non-obvious logic only.
- **Voice and personality** -- Default: warm, professional, brief. Operator defines persona in CLAUDE.md.
- **Stack choices** -- Default: React, Vite, Tailwind v4 + CSS variable tokens, Context. Operator can swap components here.
- **Files over 200 lines** -- Split them, with exceptions for self-contained visual/animation components (canvas, WebGL, shaders) where splitting would harm maintainability.

---

## Decisions

Architecture Decision Records live in `/vector/decisions/`.

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| 000 | [Template] | -- | Template |
| 001 | Migrate from Next.js to Vite | 2026-03-04 | Accepted |
| 003 | React Bits adoption | 2026-03-07 | Accepted |
| 004 | Last.fm integration | 2026-03-07 | Accepted |
| 005 | CSS-only texture system for themed backgrounds | 2026-04-11 | Accepted |
| 006 | Systematic audit/polish pass using Impeccable pipeline | 2026-04-11 | Accepted |

When you make a significant technical choice, document it as an ADR.
