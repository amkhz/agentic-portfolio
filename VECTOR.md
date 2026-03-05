---
# VECTOR.md -- Project Doctrine
# This file is the single source of truth for project intent, audience, and knowledge.
# Read this before CLAUDE.md. Read CLAUDE.md before writing code.

vector_version: "0.1"

project:
  name: "agentic-portfolio"
  description: "Justin Hernandez's design portfolio and playground -- a showcase of product design craft, case studies, and agentic development practice."
  stage: "development"
  started: "2026-03-04"
  repo: "https://github.com/amkhz/agentic-portfolio"

owner:
  name: "Justin Hernandez"
  role: "Product Designer"

knowledge:
  research: "./vector/research/"
  schemas: "./vector/schemas/"
  decisions: "./vector/decisions/"
---

# Identity

## Problem Statement

Design portfolios built with templates look generic and fail to communicate the judgment, craft, and technical depth that distinguish senior product designers. Justin needs a portfolio that demonstrates design thinking through its own construction -- not just through the case studies it displays. Existing portfolio builders and themes do not support the level of visual control, accessibility rigor, or architectural intentionality that the work itself demands.

## Target Audience

Hiring managers, design leads, and potential collaborators evaluating Justin's design and technical capabilities. They scan portfolios quickly, judge craft quality within seconds, and look for evidence of systematic thinking alongside visual polish.

## Core Value Proposition

A portfolio that earns trust through its own quality -- every interaction, every transition, every accessibility detail signals the same rigor described in the case studies.

## What This Is Not

- Not a CMS or blog platform. Content lives in TypeScript data models, not a database.
- Not a design system library for external consumption. The tokens and components serve this project only.
- Not a template or starter kit. The architecture is opinionated for this specific use case.
- Not server-rendered. No backend, no API routes, no database. Pure client-side SPA deployed as static files.

---

# Knowledge Map

## Research Status

| Artifact | Status | Location |
|----------|--------|----------|
| Case Study Content | In progress | `./core/content/case-studies.ts` |
| Resume Data | In progress | `./core/content/resume.ts` |
| Design Tokens | In progress | `./design-system/tokens.css` |
| Competitive Analysis | Not started | `./vector/research/competitive/` |
| Accessibility Audit | Not started | `./vector/research/` |

## Key Assumptions

1. **Hiring managers spend under 30 seconds on initial portfolio scan** -- validated (industry research)
2. **Dark-mode-first aesthetic differentiates in a sea of light minimalist portfolios** -- hypothesis
3. **Case studies structured as typed data models scale better than Markdown/CMS** -- hypothesis
4. **Client-side SPA with static hosting meets all performance needs** -- hypothesis

## Open Questions

- What is the right balance between visual atmosphere and readability for case study content?
- Should the portfolio include interactive prototypes or keep them as external links?

---

# Architecture Doctrine

See ARCHITECTURE.md for technical implementation details.

This section captures the *why* behind technical decisions.

## Design Principles

1. **"Blade Runner + William Gibson meets Finn Juhl"** -- Dark, atmospheric, warm. The aesthetic evokes speculative fiction's tension between technology and humanity, grounded by mid-century craft and material honesty. Warm blacks, not cold ones. Brass and dusty magenta as accents, not neon.
2. **Token colors only** -- Every color in the UI traces back to `design-system/tokens.css`. No default Tailwind colors, no `#000` or `#FFF`. This enforces visual coherence and makes theme changes trivial.
3. **Accessibility is non-negotiable** -- WCAG 2.2 AA throughout. One `h1` per page, heading hierarchy `h2 -> h3` in order, never skip levels. Didact Gothic at weight 400 only.
4. **Architecture protects craft** -- The four-layer separation (design-system, core, services, src) exists so that design decisions, business logic, external integrations, and UI never bleed into each other.

## Constraints

- **Hard:** WCAG 2.2 AA compliance. Token colors only. No em-dashes in copy. Didact Gothic weight 400 only.
- **Hard:** Four-layer architecture -- every file belongs to exactly one layer.
- **Hard:** `npm run lint` and `npm run build` must pass before any task is complete.
- **Soft:** No heavy dependencies -- prefer 20 lines of code over a new npm package.
- **Soft:** Files under 200 lines. Split when they grow.

---

# Quality Gates

## Definition of Done

- [ ] Works without errors under normal use
- [ ] `npm run lint` passes with no warnings
- [ ] `npm run build` succeeds
- [ ] Token colors only -- no raw hex values outside `design-system/tokens.css`
- [ ] WCAG 2.2 AA contrast ratios maintained
- [ ] Heading hierarchy correct (one h1, h2 -> h3, no skipped levels)
- [ ] Files touched and their architectural layers stated in the commit or summary

## Ship Criteria

- [ ] All case studies render correctly with typed content
- [ ] All pages have proper SEO metadata via react-helmet-async
- [ ] Responsive across mobile, tablet, and desktop
- [ ] Lighthouse accessibility score 95+
- [ ] No console errors or warnings in production build
- [ ] Vercel deployment succeeds with clean build
