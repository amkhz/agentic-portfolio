# ADR-001: Migrate from Next.js to Vite

**Date:** 2026-03-04
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (agent)

## Context

The portfolio was originally built on Next.js (App Router) with React 19, TypeScript, and Tailwind v4. In practice, the project uses none of Next.js's server-side features: no server components, no API routes, no SSR/SSG, no middleware, no server actions. Every page is fully client-rendered. The case study content lives in TypeScript data models, not a CMS or database. The site deploys as static files to Vercel.

Next.js introduced significant complexity that provided no value to this project:
- The App Router's file-based routing and server/client component boundary added cognitive overhead without benefit
- Build times included server compilation passes that were never used
- The React Compiler and Turbopack configuration added moving parts to an otherwise simple static site
- The four-layer architecture (design-system/, core/, services/, src/) conflicted with Next.js's expectation that everything lives under src/app/

## Decision

Migrate from Next.js to Vite 6 with react-router v7 for client-side routing and react-helmet-async for SEO metadata. Adopt the Investiture four-layer architecture pattern, where design-system/, core/, and services/ are top-level directories outside src/.

## Consequences

**Positive:**
- Architecture purity -- the four-layer separation is enforced by directory structure, not by convention alone
- Simpler build chain -- Vite compiles only what exists (client-side React), no server compilation passes
- Faster dev server -- Vite's native ES module dev server with HMR
- Path aliases (@core/*, @services/*, @design-system/*) map cleanly to top-level directories
- Tailwind v4 integrates via @tailwindcss/vite plugin with zero additional config
- Vitest runs natively in the same Vite pipeline

**Negative:**
- No built-in SSR/SSG -- if the project later needs server rendering, this decision would need revisiting
- No automatic code splitting by route -- react-router v7 supports lazy loading but it requires manual setup
- SEO relies on client-side react-helmet-async rather than server-rendered meta tags -- adequate for a portfolio but not ideal for content-heavy sites
- Lost Next.js Image component's automatic optimization -- images are served as static assets

## Alternatives Considered

**Stay on Next.js** -- Rejected because the server-side features were unused overhead and the App Router's directory conventions conflicted with the four-layer architecture.

**Astro** -- Considered for its static-first approach and partial hydration. Rejected because the portfolio's interactive effects (GlowEffect, RevealOnScroll, ThemeToggle) benefit from a full React SPA, and Astro's island architecture would fragment the component model.

**Remix / React Router framework mode** -- Considered as a middle ground with server capabilities available but not required. Rejected because it still assumes a server runtime and adds complexity that a static portfolio does not need.
