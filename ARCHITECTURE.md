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
- **Files over 200 lines** -- Split them.
- **Raw color values** -- No `#000`, `#FFF`, or default Tailwind color palette. Token colors only.

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
| **Routing** | react-router v7 + react-helmet-async | Client-side routing with per-page SEO metadata |
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
├── /design-system         # Visual foundation layer
│   └── tokens.css         # CSS variables (colors, spacing, typography)
├── /core                  # Pure logic layer
│   ├── /content           # Case study and resume data models
│   │   ├── case-studies.ts
│   │   └── resume.ts
│   ├── /tokens            # TypeScript token exports
│   │   └── index.ts
│   └── /utils             # Utility functions (no side effects)
│       ├── format.ts
│       └── index.ts
├── /services              # External integration layer
│   ├── analytics.ts       # Vercel analytics wrapper
│   └── api.ts             # Fetch wrapper
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
│   │   ├── /content       # Content display components
│   │   ├── /effects       # GlowEffect, GrainOverlay, RevealOnScroll
│   │   ├── /interactive   # Button, Tag, ThemeToggle
│   │   └── /layout        # Container, Header, Footer
│   ├── /providers
│   │   └── ThemeProvider.tsx
│   └── /lib
│       └── site-metadata.ts
├── /public                # Static assets (images, resume PDF, robots.txt)
├── /vector                # Zero Vector knowledge artifacts
│   ├── /schemas
│   ├── /research
│   └── /decisions         # Architecture Decision Records
├── /plans                 # Project planning documents
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

---

## Decisions

Architecture Decision Records live in `/vector/decisions/`.

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| 000 | [Template] | -- | Template |
| 001 | Migrate from Next.js to Vite | 2026-03-04 | Accepted |

When you make a significant technical choice, document it as an ADR.
