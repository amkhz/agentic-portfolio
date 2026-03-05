# Portfolio Post-Launch Plan — Agent Brief

> **Context:** Justin Hernandez's portfolio site was built in a 48-hour sprint using an AI-powered design system workflow. This document covers remaining polish tasks and the next iteration of work, migrated to the agentic-portfolio project (Vite + React Router, migrated from Next.js App Router). Any agent working on this project should read the project CLAUDE.md and `core/tokens/index.ts` first.

> **Project:** agentic-portfolio (migrated from Next.js → Vite + React Router)
> **Original repo:** https://github.com/amkhz/portfolio
> **Live site:** https://justinh.design/
> **Design direction:** "Blade Runner + William Gibson meets Finn Juhl" — Danish mid-century warmth + sci-fi atmosphere. Dark mode, warm blacks, dual accent (brass `oklch(0.7087 0.0845 60.96)` / #C8956A + dusty magenta `oklch(0.6634 0.1052 346.74)` / #C278A0), WCAG 2.2 AA compliant throughout.

---

## Current Status (Updated 2026-02-27)

### What's shipped
- **5 pages live:** Home, About, Resume, Work (index), Work (4 case studies including meta)
- **25 components** across layout (3), content (16), effects (3), interactive (3)
- **Design system:** Tailwind v4 with design tokens sourced from `core/tokens/index.ts`, applied via `design-system/tokens.css`
- **OKLCH Phase 1 migration complete** (2026-02-26) — All 21 color tokens migrated hex→oklch, 6 shadow values rgba→oklch, 4 GlowEffect gradient values rgba→oklch. 3 files changed (`core/tokens/index.ts`, `design-system/tokens.css`, `GlowEffect.tsx`). OG image files kept hex (Satori limitation). Zero new dependencies. Values computed programmatically via sRGB→OKLAB→OKLCH pipeline.
- **OKLCH Phase 2 light mode complete** (2026-02-27) — Full light/dark theme toggle. 3 new files (`ThemeProvider.tsx`, `theme-script.ts`, `ThemeToggle.tsx`), 6 modified (`design-system/tokens.css`, `core/tokens/index.ts`, root layout, `Header.tsx`, `GlowEffect.tsx`, `GrainOverlay.tsx`). OKLCH L-channel theming: same hue and chroma, adjusted lightness. Zero new dependencies. Cookie-persisted preference with anti-FOWT inline script. Both themes WCAG 2.2 AA compliant.
- **Case study content:** 4 complete case studies (AI Leadership, Instant SOW, Instant Doc Review, Building This Portfolio)
- **SEO:** robots, sitemap, per-page metadata with canonical URLs
- **Custom 404 page** — Podkova heading, warm copy, brass GlowEffect, Button back to home
- **Dynamic favicon system** — JH monogram icons
- **Dynamic OG/social images** — 1200x630, brass glow, name + tagline + gradient accent
- **Vercel Analytics & Speed Insights** — integrated in root layout (added 2026-02-11)
- **CalloutBlock component** — new content section type for styled aside blocks (label + body). Used in meta case study for example prompts. Added to `core/content/case-studies.ts` as `CalloutSection` type and rendered via the case study page component.
- **Skills reorganization** — Custom project skills moved to `.agents/skills/` for cross-agent interoperability (Claude Code, Cursor, Codex).
- **Content and metadata refinements** — OG/Twitter metadata improved for branding, case study copy tightened, typos corrected

### What's next
1. **Phase 3 — Figma sync implications (Part 3.1c)** — Advisory document, no code. How OKLCH positions the codebase for Token Studio / W3C DTCG JSON export.
2. **Next iteration features (Part 3)** — React Bits, Figma sync, data model cleanup, etc.

### Current project architecture (agentic-portfolio)
```
core/
├── tokens/index.ts           # Design tokens (source of truth)
├── content/case-studies.ts   # Case study section content
├── content/resume.ts         # Resume data model
├── utils/index.ts            # cn() utility
└── utils/format.ts           # formatDate, slugify, truncate, debounce

design-system/
└── tokens.css                # Tailwind v4 theme (CSS custom properties)

src/
├── pages/                    # Route pages (Vite + React Router)
├── components/
│   ├── layout/               # Container, Header, Footer
│   ├── content/              # Hero, ProjectCard, CaseStudyPage, etc.
│   ├── effects/              # GlowEffect, GrainOverlay, RevealOnScroll
│   └── interactive/          # Button, Tag, ThemeToggle
├── providers/                # ThemeProvider
└── lib/                      # Utilities, site metadata
```

---

## Part 1: Remaining Polish (Current Iteration) — COMPLETE

All V1 polish tasks complete. Deployed to production 2025-02-09.

### 1.1 Custom 404 Page — DONE
Implemented with Podkova display heading, Didact Gothic body text, primary brass Button, ambient brass GlowEffect.

### 1.2 Favicon & App Icons — DONE
Programmatic generation of JH monogram icons.

### 1.3 OG Image Refinement — DONE
1200x630 dark background with subtle brass radial glow, name, tagline, brass-to-magenta gradient accent.

### 1.4 Quick Fixes — DONE
### 1.5 Content Pass — DONE

General rules applied during content edits:
- Maintained Justin's voice — professional but personable, never corporate, try to avoid em-dashes
- All text uses token colors (no Tailwind defaults)
- Heading hierarchy preserved (one h1 per page, h2 -> h3 in order)
- `npm run lint` and `npm run build` verified passing after changes

---

## Part 2: Meta Case Study (Priority) — COMPLETE (Updated 2026-02-22)

### 2.1 Context
The portfolio itself is a case study: "Building This Portfolio — Design system to deployed site in 48 hours using AI-powered workflows."

### 2.2 What shipped
Full content written in `core/content/case-studies.ts` under the `'building-this-portfolio'` slug. Metadata in `core/tokens/index.ts` as `metaCaseStudy`. Page live at `/work/building-this-portfolio`.

### 2.3 Content model updates for this case study
- **New `CalloutSection` type** added to `core/content/case-studies.ts`
- **New `CalloutBlock` component** for styled aside blocks
- Case study page component updated to render `callout` case in the section switch.

### 2.4 Remaining considerations
- Review image assets to confirm all `meta-*.png` files are final
- Case study could be refined further if Justin wants to tighten specific sections

---

## Part 3: Next Iteration Features

### 3.1 OKLCH Migration + Light/Dark Theme Toggle — PHASE 1 & 2 DONE

**Status:** Phase 1 DONE (2026-02-26). Phase 2 DONE (2026-02-27). Phase 3 advisory pending. See `plans/oklch-migration-plan.md` for full specification.

**Phase 1 — OKLCH Migration — DONE (2026-02-26)**
- Converted all 21 hex color tokens to `oklch()` in `core/tokens/index.ts` and `design-system/tokens.css`
- Converted 6 shadow `rgba()` values to `oklch()` with alpha in both files
- Converted 4 `GlowEffect.tsx` hardcoded `rgba()` gradient values to `oklch()` with alpha
- Kept hex in OG image files (Satori limitation)
- Zero new dependencies. 3 files changed.

**Phase 2 — Light Mode — DONE (2026-02-27)**
- OKLCH L-channel adjustment for systematic dark->light palette derivation
- `design-system/tokens.css` refactored with `@layer theme`: `:root` (dark) and `[data-theme="light"]` (light).
- `ThemeProvider` built: React context + cookie + system preference listener.
- `ThemeToggle` added to Header: filament/lightbulb icon, 44px tap target, accessible aria-label, focus ring.
- Anti-FOWT inline script injected in `<head>`.
- `core/tokens/index.ts` expanded: `lightColors` and `lightShadows` parallel exports (zero breaking changes).
- Both themes independently pass WCAG 2.2 AA.
- 3 new files, 6 modified. Zero new dependencies.

**Phase 3 — Figma Sync Implications (Advisory, no code)**
- Documents how OKLCH positions the codebase for Token Studio / W3C DTCG JSON export
- Figma Variables don't support OKLCH natively yet; Token Studio converts to hex transparently
- Export script concept: `core/tokens/index.ts` -> DTCG JSON -> Token Studio -> Figma Variables

### 3.2 React Bits Integration
**Reference:** https://reactbits.dev/

Evaluate React Bits for adding micro-interactions and animated components that enhance the "sci-fi warmth" aesthetic. Potential areas:
- Text reveal animations for hero headings
- Animated cursor or magnetic hover effects on ProjectCards
- Smooth page transitions between routes (Vite + React Router)
- Interactive background effects

**Constraints:**
- Maintain WCAG 2.2 AA compliance
- Respect `prefers-reduced-motion`
- Performance budget: keep Lighthouse performance above 90
- Must work within the Vite + React Router architecture
- Atmospheric warmth, not flashy or decorative

### 3.3 Token Sync to Figma
**Goal:** Establish the bidirectional (preferably code -> Figma) token sync.

**Path 1 — Token Studio & Variable Visualizer:**
- Export `core/tokens/index.ts` values to W3C Design Token Community Group JSON format
- Install Token Studio and Variable Visualizer plugin in Figma
- Generate Figma variables from the token JSON
- Establish code as the source of truth

**Path 2 — Figma Console MCP:**
- Reference: https://github.com/southleft/figma-console-mcp
- More experimental approach

**Path 3 — Figma Variables REST API:**
- Direct programmatic sync via Figma's API

### 3.4 Data Model Cleanup
Currently there's some overlap between `core/tokens/index.ts` (project metadata) and `core/content/case-studies.ts` (section content). If maintenance becomes friction:
- Consider unifying into a single `projects.ts` that exports both metadata and content per slug
- Or move to MDX files per case study
- The component layer shouldn't need to change either way

### 3.5 Automated Design System Documentation
Once the token system and component library stabilize:
- Consider auto-generating a `/system` or `/tokens` page that renders all token values, component variants, and a11y specs
- Could import `core/tokens/index.ts` and render color swatches, type specimens, spacing scale

### 3.6 Home Server Migration (Low Priority)
**Target hardware:** Synology NAS or Raspberry Pi

**Approach:**
- Containerize the Vite app with Docker
- Use Caddy as reverse proxy (auto-HTTPS via Let's Encrypt)
- Use Cloudflare Tunnel to avoid exposing home IP

---

## Pitch-Worthy Items (Updated 2026-02-27)

- **OKLCH L-channel theming shipped** — Light and dark palettes are mathematically related via perceptually uniform color space.
- **Zero-dependency theme system** — React context + cookie + inline script. ~150 lines of purpose-built code.
- **Filament toggle icon** — Custom sci-fi-inspired incandescent filament icon.
- **Anti-FOWT pattern** — Inline script prevents flash of wrong theme on page load.
- **OKLCH color space migration shipped** — Entire color system migrated from hex/rgba to OKLCH.
- **Meta case study shipped** — Full "Building This Portfolio" case study live.
- **CalloutSection pattern** — New content block type shows the component model is extensible.
- **Agent skills as cross-tool infrastructure** — Skills usable across Claude Code, Cursor, and Codex.
- **Token-driven a11y by default** — Contrast ratios, heading hierarchy, focus rings.
- **Vite migration** — Moved from Next.js App Router to Vite + React Router for faster builds and simpler deployment.

---

## Part 4: Team Pitch Preparation

### What Justin walks in with:
- A live portfolio site built on a real token-driven component system
- 100 mobile accessibility Lighthouse score with AI-generated components
- A documented workflow: token definition -> AI code generation -> component library -> deploy
- A friction log showing exactly where AI helps and where human judgment is essential
- The meta case study as a shareable, referenceable artifact
- A completed OKLCH migration and light/dark theme toggle

### Key points for the pitch:
- **Christopher's constraint model validated:** The token system IS the constraint.
- **Clinton's concern addressed:** Works even without a fully mature existing design system.
- **A11y as a standard, not an afterthought:** Token system enforces contrast ratios by design.
- **The pipeline works end-to-end:** Figma (design) -> tokens (source of truth) -> AI generation (Cursor) -> code (Vite) -> deploy.

---

## Agent Instructions

When working on any task in this document:
1. **Always read project CLAUDE.md first** — it contains the full visual direction, token values, a11y requirements, code style rules
2. **Use token colors exclusively** — no default Tailwind colors, no pure black (#000) or white (#FFF)
3. **Maintain WCAG 2.2 AA compliance** — check contrast ratios, focus rings, heading hierarchy, keyboard accessibility, tap targets
4. **One h1 per page** — h2 for sections, h3 for subsections, never skip levels
5. **Didact Gothic only has weight 400** — don't try to use other weights
6. **Keep the aesthetic restrained** — atmospheric warmth, not flashy or decorative
7. **Run `npm run lint` and `npm run build`** before considering any task complete
