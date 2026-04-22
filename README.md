# Agentic Portfolio

A design portfolio built with intention. Every architectural decision, every color token, every accessibility detail is deliberate -- this site demonstrates design thinking through its own construction, not just through the case studies it displays.

**Live sites:** [justinh.design](https://justinh.design/) (portfolio) · [labs.justinh.design](https://labs.justinh.design/) (Perihelion)

## About

This is [Justin Hernandez's](https://justinh.design/) portfolio and playground -- a showcase of product design craft, case studies, and agentic development practice. The visual direction draws from "Blade Runner + William Gibson meets Finn Juhl": dark, atmospheric, warm blacks with brass and dusty magenta accents.

The repo also hosts **Perihelion** at `labs.justinh.design`, a two-arm house with its own dark-academic visual language. **Perihelion Archive** is the research arm (shipped): long-form research guides on frontier science. **Perihelion Works** is the applied-design arm (reserved): systems, interface, human factors, and product design for the same frontier territories. See ADR-010 for the rename rationale.

Built and maintained by Justin and a crew of AI collaborators using Claude Code, with specialized agent skills for building, directing, writing, and design review.

## What's Here

### Portfolio (`justinh.design`)

- **Pages:** Home, About, Resume, Work index, and case studies
- **Constellation navigation:** The meta case study ("Building This Portfolio") uses a spatial 2D node field with SVG connections, three responsive states, and a spring-eased layout transition. Nodes represent topics; connections reveal relationships. The navigation pattern itself is a portfolio artifact.
- **Motion design system:** 5 semantic durations, 5 easing functions (including a `linear()` spring approximation), comprehensive `prefers-reduced-motion` support, and scoped transition properties. Constellation nodes fade in as "stars appearing" with staggered draw-on line animations.
- **OKLCH color system:** Perceptually uniform color tokens with L-channel light/dark theming, dual accent palette (brass + dusty magenta), WCAG 2.2 AA throughout.
- **Effect components:** Particle field hero (WebGL), holographic profile card with pointer tracking, spotlight cards, scroll-reveal materializing, decrypted text scramble, spring-animated metrics.
- **Last.fm NowPlaying:** Live listening widget in the header with EQ bar animations, expand/collapse panel, album art, and spring-eased transitions.
- **CSS texture system:** Linen and circuit-mesh background patterns that adapt to light/dark themes.

### Perihelion (`labs.justinh.design`)

- **Perihelion Archive:** Deep-dive research guides on frontier physics, UAP detection methodology, vacuum engineering, and consciousness as technology. Markdown-driven content in `core/lab/guides/`, build-time indexed, rendered as a scholarly preprint viewer.
- **Four territories:** UAP Detection (T4), Consciousness & Spacetime (T1), Materials & Sensing (T3), Space Manufacturing (T2). Each has its own accent color and thematic premise.
- **Distinct visual identity:** Cool near-black background, Podkova serif for body, JetBrains Mono for labels, per-guide accent colors declared in frontmatter and scoped via CSS custom properties.
- **Shared infrastructure:** Same repo, same four-layer architecture, same agent crew. See ADR-009 for the rationale.

## Architecture

The project follows a strict four-layer architecture where every file belongs to exactly one layer:

```
design-system/    CSS variables and design tokens. Single source of visual truth.
core/             Pure functions, data models, content. No DOM, no side effects.
services/         External communication. API calls, analytics, storage.
src/              UI only. Components import from the other three layers.
```

Features are built in that order: tokens first, core logic second, services third, UI last.

Two applications are served from one repository via Vite multi-entry: `index.html` boots the portfolio from `src/main.tsx`, and `labs.html` boots the lab from `src/lab/main.tsx`. Vercel routes by host header. Both apps share `design-system/`, `core/`, and `services/`. Lab-specific content and logic live in `core/lab/`; lab UI lives in `src/lab/`. See [ADR-009](vector/decisions/ADR-009-lab-subdomain-architecture.md) for the rationale.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full specification and [VECTOR.md](VECTOR.md) for design principles and constraints.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind v4 + CSS variable tokens (OKLCH) |
| Routing | react-router v7 + react-helmet-async |
| Animation | CSS transitions/keyframes + motion/react (CountUp only) |
| Testing | Vitest |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev       # Start dev server
npm run build     # TypeScript check + production build
npm run test      # Run tests
npm run lint      # ESLint check
```

## Design Principles

- **Token colors only** -- every color traces back to `design-system/tokens.css`. No raw hex values in components.
- **Accessibility is non-negotiable** -- WCAG 2.2 AA throughout. Proper heading hierarchy, sufficient contrast ratios, `prefers-reduced-motion` respected across all animation.
- **Architecture protects craft** -- the four-layer separation ensures design decisions, business logic, external integrations, and UI never bleed into each other.
- **No library sprawl** -- prefer 20 lines of code over a new npm package. Framer Motion is limited to a single component.
- **Motion serves purpose** -- animations communicate spatial relationships, state changes, and material metaphors. Nothing decorative.

## Agent Crew

This project is built with a crew of specialized AI agents, each with a defined lane:

| Agent | Role |
|-------|------|
| **Tyrell** | Base persona. Expert product designer and full-stack developer. |
| **Director** | Status tracking, coordination, prioritization, Investiture health checks. |
| **Dreamer** | Idea refinement, planning, ADRs. |
| **Writer** | Case study content and portfolio copy. |
| **Roy** | Post-build review against architecture, doctrine, and quality gates. |
| **Joi** | Voice calibration; extracts writing patterns for Writer reference. |

The crew also uses the **Impeccable design skill suite** for systematic design quality work: `/audit`, `/polish`, `/critique`, `/shape`, `/animate`, and more.

## Decisions

Significant choices are documented as Architecture Decision Records in `vector/decisions/`.

| ADR | Decision | Status |
|-----|----------|--------|
| 001 | [Migrate from Next.js to Vite](vector/decisions/ADR-001-nextjs-to-vite.md) | Accepted |
| 003 | [React Bits adoption strategy](vector/decisions/ADR-003-reactbits-adoption.md) | Accepted |
| 004 | [Last.fm integration architecture](vector/decisions/ADR-004-lastfm-integration.md) | Accepted |
| 005 | [CSS-only texture system](vector/decisions/ADR-005-css-texture-system.md) | Accepted |
| 006 | [Systematic audit and polish pass](vector/decisions/ADR-006-audit-polish-pass.md) | Accepted |
| 007 | [Constellation spatial navigation](vector/decisions/ADR-007-constellation-navigation.md) | Accepted |

## Project Structure

```
plans/              Living roadmap and active plans
vector/             Investiture framework: decisions, audits, missions, research
design-system/      CSS tokens (colors, typography, spacing, textures)
core/               Pure logic, data models, content definitions
services/           External API integrations (Last.fm)
src/                UI components, pages, styles, effects
```

## Upstream

This project's architecture is based on the [Investiture](https://github.com/erikaflowers/investiture) framework. The doctrine files (VECTOR.md, CLAUDE.md, ARCHITECTURE.md) have been heavily customized -- **do not merge upstream directly**.

To pull updates safely:

```bash
git fetch upstream
git checkout -b update-framework
git checkout upstream/main -- .claude/skills/invest-*   # grab new/updated skills
git diff upstream/main -- VECTOR.md CLAUDE.md ARCHITECTURE.md  # review doctrine changes
```

### Investiture Skills

Skills pulled from upstream live in `.claude/skills/invest-*/`:

| Skill | Purpose |
|-------|---------|
| `invest-adr` | Generate Architecture Decision Records |
| `invest-architecture` | Audit project structure against ARCHITECTURE.md |
| `invest-backfill` | Generate doctrine files for a new project |
| `invest-brief` | Create design briefs grounded in project research |
| `invest-changelog` | Write plain-language changelogs from git history |
| `invest-crew` | Decompose features into scoped agent tasks |
| `invest-doctrine` | Audit doctrine files for completeness and consistency |
| `invest-handoff` | Generate onboarding docs by role |
| `invest-interview` | Build user research discussion guides |
| `invest-synthesize` | Extract insights from research, propose VECTOR.md patches |
| `invest-validate` | Prioritize assumptions and generate validation plans |

## License

All case study content and images are proprietary. The architectural patterns and tooling configuration are derived from [Investiture](https://github.com/erikaflowers/investiture) -- see that repo for its license terms.
