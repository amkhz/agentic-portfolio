# Agentic Portfolio

A design portfolio built with intention. Every architectural decision, every color token, every accessibility detail is deliberate -- this site demonstrates design thinking through its own construction, not just through the case studies it displays.

**Live site:** [justinh.design](https://justinh.design/)

## About

This is [Justin Hernandez's](https://justinh.design/) portfolio and playground -- a showcase of product design craft, case studies, and agentic development practice. The visual direction draws from "Blade Runner + William Gibson meets Finn Juhl": dark, atmospheric, warm blacks with brass and dusty magenta accents.

## The Migration

This project started as a Next.js (App Router) site, but none of the server-side features were being used -- no server components, no API routes, no SSR/SSG, no middleware. Every page was fully client-rendered and the content lives in TypeScript data models, not a CMS or database.

Next.js was adding complexity without providing value, and its file-based routing conventions conflicted with the architectural goals. So we migrated to **Vite 6** with **react-router v7** for client-side routing and **react-helmet-async** for SEO metadata.

The result: faster builds, a simpler dev server, and clean separation of concerns across four architectural layers.

See [ADR-001](vector/decisions/ADR-001-nextjs-to-vite.md) for the full decision record.

## Architecture

The project follows a strict four-layer architecture where every file belongs to exactly one layer:

```
design-system/    CSS variables and design tokens. Single source of visual truth.
core/             Pure functions, data models, content. No DOM, no side effects.
services/         External communication. API calls, analytics, storage.
src/              UI only. Components import from the other three layers.
```

Features are built in that order: tokens first, core logic second, services third, UI last.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind v4 + CSS variable tokens |
| Routing | react-router v7 + react-helmet-async |
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
- **Accessibility is non-negotiable** -- WCAG 2.2 AA throughout. Proper heading hierarchy, sufficient contrast ratios.
- **Architecture protects craft** -- the four-layer separation ensures design decisions, business logic, external integrations, and UI never bleed into each other.
- **No library sprawl** -- prefer 20 lines of code over a new npm package.

## Upstream

This project's architecture is based on the [Investiture](https://github.com/erikaflowers/investiture) framework. To pull updates:

```bash
git fetch upstream
git merge upstream/main
```

## License

All case study content and images are proprietary. The architectural patterns and tooling configuration are derived from [Investiture](https://github.com/erikaflowers/investiture) -- see that repo for its license terms.
