# Feature: Speculative Design Lab — Research Guide Library

> Dreamer output from 2026-04-20 session. Supersedes `plans/HANDOFF-speculative-lab.md` (that doc was a pre-library handoff; the lab has since evolved into a publication-grade guide library backed by a scholarly community). Move HANDOFF to `archive/` once this plan is accepted.

**Last updated:** 2026-04-20

---

## Summary

Host Justin's Speculative Design Lab — a growing library of deep-dive interactive research guides on frontier physics papers — at `labs.justinh.design`, built from the same repo as the portfolio via a second Vite entry point. Guides are authored as markdown with frontmatter in an external Claude project, ingested through a validated schema, and rendered by a single React component that owns all library chrome.

## Context

The lab is not a side project. It sits adjacent to a credentialed scholarly community (Sol Foundation, Visible College, Hyperstition) and produces publication-grade content: seven guides built or drafted across four territories, six more expected this month, an open-ended future cadence. The guide library is the prerequisite knowledge layer for downstream design work — speculative products, training tools, citizen-science instruments, adaptation services.

Source documents:
- `/Users/300mhz/projects/design-futures/speculative_design_lab_roadmap_v5_1.md` (territory roadmap, build sequence, landscape)
- `/Users/300mhz/projects/design-futures/the-labs-position.md` (epistemic stance, scholarly community, design openings)
- `/Users/300mhz/projects/design-futures/speculative-design-lab-guide-library-handoff.md` (current library state, design conventions)

### Decisions locked before this plan

1. **Subdomain:** `labs.justinh.design` (portfolio at `justinh.design`)
2. **Repo:** Two Vite builds, one repo (`amkhz/portfolio`)
3. **Content model:** Data-driven. Guides are markdown + frontmatter, not JSX. One `<GuideRenderer>` owns all chrome.
4. **Migration posture:** Isolated dark-academic visual now, staged token integration later.
5. **Authoring:** External Claude project outputs markdown + frontmatter going forward. Tyrell migrates the seven existing JSX guides mechanically.
6. **Cadence:** ~6 guides this month, ongoing after. Build real infrastructure.

---

## Layer Impact

- **design-system/** — Add `lab-tokens.css` with the lab's academic-dark palette (background `#0a0a0c`-family, Georgia/JetBrains Mono font variables, per-guide accent scaffold). No changes to existing `tokens.css`.
- **core/** — New `core/lab/` subtree: guide content (`.md`), `parse-guide.ts`, `guides.ts` manifest, `territories.ts`, TypeScript types. Mirrors the pattern in `core/content/`.
- **services/** — No changes at launch. Reserved for future: search indexing service, citation export, feedback/analytics.
- **src/** — New `src/lab/` subtree for the lab UI (entry, router, pages, components). Mirrors `src/` structure, isolated from portfolio UI.

---

## Approach

### 1. Vite two-builds-one-repo architecture

**Pattern:** Vite multi-page build via `rollupOptions.input`. Two HTML entries (`index.html` for portfolio, `labs.html` for lab), each bootstrapping its own React Router instance. Both built by a single `vite build` command into one `dist/`. Vercel routes by host header.

**`vite.config.ts` changes:**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './core'),
      '@services': path.resolve(__dirname, './services'),
      '@design-system': path.resolve(__dirname, './design-system'),
      '@lab': path.resolve(__dirname, './src/lab'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        labs: path.resolve(__dirname, 'labs.html'),
      },
    },
  },
  server: { port: 5173, open: true },
  test: {
    include: ['core/**/*.test.ts', 'src/**/*.test.{ts,tsx}'],
  },
});
```

**Entry files:**

- `/index.html` — unchanged, points to `src/main.tsx`
- `/labs.html` — new, points to `src/lab/main.tsx`
- `/src/lab/main.tsx` — bootstraps lab app with `<BrowserRouter>`, `<HelmetProvider>`, own `<App />`
- `/src/lab/App.tsx` — lab routes

**Commands:**

```json
{
  "dev": "vite",                    // portfolio + lab served together at /index.html and /labs.html
  "build": "tsc && vite build",     // builds both entries
  "preview": "vite preview",
  "test": "vitest run"
}
```

No separate `dev:lab` needed — Vite's dev server serves both HTMLs from one process. Navigate to `http://localhost:5173/labs.html` to work on the lab. For host-based subdomain testing, document `127.0.0.1 labs.localhost` in `/etc/hosts` if Justin wants it (optional, probably overkill for MVP).

**Vercel routing (`vercel.json`):**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "labs.justinh.design" }],
      "destination": "/labs.html"
    },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Both domains attached to the same Vercel project. DNS: CNAME `labs.justinh.design` → `cname.vercel-dns.com`. Asset paths bypass rewrites automatically (Vercel serves static files before applying rewrites).

**Does React Router v7 support this cleanly?** Yes — each entry bootstraps its own independent `<BrowserRouter>`. Nothing cross-contaminates. Two apps, two route trees, shared module graph for imports.

**Layer boundaries preserved:** The four-layer architecture holds. `src/lab/` is a second UI tree that imports from the same `core/`, `services/`, `design-system/` as the portfolio. The rule "every file belongs to exactly one layer" still holds — `src/lab/` is the UI layer, same as `src/`. This is a second *application* within one UI layer, not a new layer. ADR required (see `vector/decisions/ADR-009-lab-subdomain-architecture.md`).

### 2. Content schema

One guide = one markdown file with YAML frontmatter. Files live in `core/lab/guides/[slug].md`.

**Finalized schema:**

```markdown
---
id: uapx-field-methods
title: "UAPx Field Methods: Instrumented UAP Science from First Principles"
kicker: "Research Guide Series"
source:
  authors: "Szydagis, Knuth et al."
  year: 2025
  venue: "arXiv:2312.00558v4"
  url: "https://arxiv.org/abs/2312.00558"
accent: "#4ade80"
territory: T4
status: draft
order: 7
description: "Section-by-section walkthrough of UAPx's first field expedition methodology — hardware inventory, pixel-subtraction analysis, the Catalina dark-spot ambiguity, the 3–5σ classification rules."
figures:
  - slug: fig-1-ufodap-deployment
    file: fig-1-ufodap-deployment.jpg
    caption: "UFODAP deployment at Catalina Island"
    alt: "Four-camera UFODAP deployment rack on coastal overlook"
  - slug: fig-5-dark-spot-frames
    file: fig-5-dark-spot-frames.jpg
    caption: "Dark-spot frames extracted from IR video"
    alt: "Four IR video frames showing a dark spot traversing the frame"
glossary:
  ambiguity: "A data point that resists immediate explanation but isn't necessarily anomalous."
  3σ: "Three-sigma statistical significance. UAPx's threshold for calling a data point 'ambiguous.'"
  anomaly: "A statistically significant departure from baseline. UAPx requires 5σ for 'anomaly' claims."
---

## 🎯 Overview {#overview}

This paper is the first peer-reviewed field expedition report for UAPx, an open-science |ambiguity|-hunting program run out of UAlbany Physics. The authors deployed at Catalina Island for two weeks in July 2021 and came back with one primary remaining |ambiguity| across 600+ hours of IR video.

What follows is a section-by-section walkthrough of the methodology — what they built, how they analyzed it, and what survived scrutiny.

{figure:fig-1-ufodap-deployment}

## 🛰 Hardware inventory {#hardware}

The expedition ran four sensor modalities in parallel...
```

**Resolutions to open questions:**

| Question | Resolution |
|----------|-----------|
| Figures inline vs. block | Block-only at MVP. `{figure:slug}` on its own line. Parser turns it into a `FigureNode` between paragraphs. |
| Glossary declaration | Frontmatter only, flat map. Inline `\|term\|` markers reference keys. Parser validates: every `\|term\|` must resolve, unused glossary entries emit a warning (not an error). |
| Section structure | H2 headings define sections. Optional `{#id}` for stable anchors (enables deep links). Icon emojis live in the heading text — they're Unicode, render everywhere. |
| Kicker | Free-form string in frontmatter. Authors choose: "DIRD Guide Series", "Research Guide Series", "Synthesis Guide", anything else. |
| Source metadata | Structured object (authors, year, venue, url). Rendered in a consistent format by the header component. |
| Validation | Hand-rolled TypeScript schema (project pattern). Parser returns typed `Guide` or throws with a field-level error. Zod considered but not warranted for this size — add if schemas grow. |
| Frontmatter parser | Use `gray-matter` + `js-yaml`. Deliberate exception to the "prefer 20 lines" preference — YAML parsing is complex enough that hand-rolling is false economy. Same reasoning accepted under ADR-004 for API client. |

**Body conventions (same as existing JSX guides, formalized):**

- `**bold**` → `<strong>` with `text-primary` color
- `|term|` → clickable span in `var(--guide-accent)`; click toggles inline definition card
- `{figure:slug}` on its own line → `<GuideFigure>` block
- `## Heading {#id}` → new section
- Paragraphs are regular markdown paragraphs (blank-line separated)

No other extensions at MVP. If a guide needs tables, callouts, or equations later, extend intentionally.

### 3. Figure asset pipeline

**Decision: `public/labs/figures/[slug]/*.jpg`** — static assets, no bundling, long cache headers from Vercel automatically.

**Reasoning:** These are external image files, not imports. They change infrequently. `public/` is Vite's idiomatic location for pass-through static assets. No build-time optimization at MVP — add `vite-imagetools` later if load times become a concern.

**Handoff:** When a guide ships, Justin (or the Claude project output bundle) provides `guide.md` + a `figures/` directory. Tyrell places the markdown in `core/lab/guides/` and copies figures to `public/labs/figures/[slug]/`. Frontmatter `figures[].file` references filenames in that directory.

**Source image storage:** Originals stay in `/Users/300mhz/projects/design-futures/learning-guides/[guide]/` (outside the portfolio repo; the UAPx bundle lives at `learning-guides/uapx1/`, for example). Only the working copies go into `public/labs/figures/`.

**Figure rendering container:** All figures render inside a subtle off-white paper container (soft border, modest padding) to handle figures cropped from scanned papers with white backgrounds. Photographic figures (like UAPx fig-1, fig-5, fig-10) look natural on the paper container. Line-art diagrams (like UAPx fig-7, fig-8) stay legible without needing `filter: invert()`. This is a one-size-fits-all default — no per-figure frontmatter flag needed at MVP. If a future guide has a figure that really should sit directly on the dark guide background (transparent PNG, pure black diagram, etc.), extend `figures[]` with an optional `background: "paper" | "transparent" | "invert"` field.

### 4. Renderer architecture

**Component tree (under `src/lab/`):**

```
src/lab/
  main.tsx                      # Bootstraps lab app
  App.tsx                       # Routes: /, /t/:territory, /g/:slug, *
  layouts/
    LabLayout.tsx               # Shell chrome: back-to-library, breadcrumbs
  pages/
    LibraryIndex.tsx            # Route: / — all guides, grouped by territory
    TerritoryPage.tsx           # Route: /t/:territory — single territory view
    GuideView.tsx               # Route: /g/:slug — full guide with chrome
  components/
    library/
      LibraryHeader.tsx         # Lab brand, manifesto snippet, territory filter
      TerritoryGrid.tsx         # Section per territory with guide cards
      GuideCard.tsx             # Card: accent dot, title, source, status pill
    guide/
      GuideRenderer.tsx         # Orchestrator: header, tab bar, section nav, content
      GuideHeader.tsx           # Kicker, title, source, description
      GuideTabBar.tsx           # Guide | Glossary tabs
      GuideSectionNav.tsx       # Pill buttons for sections (sticky on scroll)
      GuideSection.tsx          # Renders one section (heading + paragraphs + figures)
      GuideParagraph.tsx        # Splits on |term|, **bold**, {figure:}
      GuideTerm.tsx             # Clickable glossary term
      GuideDefinitionCard.tsx   # Inline card shown under paragraph when term clicked
      GuideFigure.tsx           # Figure + caption block
      GuideGlossaryView.tsx     # Full alphabetical glossary (Glossary tab)
      GuidePrevNext.tsx         # Prev/Next section buttons at section bottom
  styles/
    lab.css                     # Lab-scoped CSS: imports tokens + lab-tokens, Tailwind layer
```

**Data flow:**

```
/core/lab/guides/uapx-field-methods.md
        ↓ parseGuide() at build time
/core/lab/guides.ts (manifest)
        ↓ import
GuideView (src/lab/pages)
        ↓ render
GuideRenderer (src/lab/components/guide)
```

**Guide loading strategy:** Parse all guides at build time into a manifest, lazy-load guide bodies via `import.meta.glob` with dynamic import to code-split per guide. Library index imports metadata only; full guide bodies load on-demand when navigating to `/g/:slug`.

**Per-guide accent handling:** `GuideRenderer` sets `--guide-accent: <accent>` as a React inline style on its root element. This is the ONE permitted inline style — it sets a CSS variable, not a style value. CSS rules throughout the guide tree reference `var(--guide-accent)`. Compliant with the four-layer "no raw colors" rule because the raw value originates in frontmatter (data, not UI code), flows through as a variable, and styling is declarative CSS.

### 5. Migration plan for the 7 existing JSX guides

**Strategy:** One-time extraction script. The SECTIONS arrays in the existing JSX files are already structured data — conversion is mechanical.

**Script:** `scripts/migrate-jsx-guide.ts`

Approach:
1. Parse the source JSX file with `@babel/parser` to get an AST
2. Locate the `const SECTIONS = [...]` declaration
3. Walk sections → paragraphs → terms, emitting markdown + accumulating glossary
4. Extract header metadata (title, kicker, accent, source) from the component's JSX body
5. Write `core/lab/guides/[slug].md`

The body conventions (`|term|`, `**bold**`) are identical — text fields copy verbatim. Terms get deduplicated into the frontmatter `glossary` block.

**Pilot guide:** `emergent-quantization-explainer.jsx`. Cleanest structure, smallest (34KB), simplest header. Migrate first, tune the script, then batch the other six.

**Validation:**
1. Render migrated guide in lab preview
2. Side-by-side visual comparison against original JSX rendered in isolation (Justin eyeballs)
3. Optional: Playwright screenshot diff for regression coverage — defer unless manual review surfaces issues

**Quantum gravity guide** (`quantum-gravity-guide.html`) is semantic HTML with inline styles, not a JSX component — no `SECTIONS` array to extract. Hand-convert: read the HTML, identify H2 boundaries as sections, convert inline term spans to `|term|` markers, lift term definitions into frontmatter glossary, pull header metadata (title, kicker, subtitle, meta line) into frontmatter. Faster than writing a second parser for one file. Use the JSX migration script output as a structural reference so the result matches the canonical schema exactly. Note: this is a *synthesis* guide with four distinct accent colors (ANU teal, White orange, bridge lavender, design pink) — decide whether to pick one dominant accent for the frontmatter `accent` field or extend the schema with a `multi-accent` variant. Recommendation: pick the dominant accent (ANU teal) at launch, extend schema only if more synthesis guides follow.

**UAPx guide** is currently an `.md` draft. Convert its frontmatter/body to the new schema directly — no JSX migration needed.

### 6. Authoring handoff contract

Paste the following into the Claude project prompt so future guides come out in the correct format:

````markdown
# Guide Output Format

I'm building research guides for my Speculative Design Lab library at labs.justinh.design. My portfolio ingests guides in a specific markdown + frontmatter format. Every guide you produce should be a single `.md` file matching this schema.

## File structure

Return a single markdown file with YAML frontmatter, followed by the guide body.

```markdown
---
id: [kebab-case-slug]
title: "[Full guide title]"
kicker: "[Research Guide Series | DIRD Guide Series | Synthesis Guide | custom]"
source:
  authors: "[Author, Author et al.]"
  year: [YYYY]
  venue: "[Journal / arXiv / institution]"
  url: "[link to paper if public]"
accent: "[#hex color for this guide]"
territory: [T1 | T2 | T3 | T4]
status: [draft | complete]
order: [integer, optional, for manual sort]
description: "[1–2 sentence guide description]"
figures:
  - slug: [kebab-case-slug]
    file: [filename.jpg]
    caption: "[figure caption]"
    alt: "[accessibility description]"
glossary:
  [term]: "[definition — keep to 1–3 sentences]"
---

## [Emoji] [Section title] {#section-id}

Body paragraph. Inline glossary references use |term| where 'term' is a key in the frontmatter glossary block. Bold uses **double asterisks**. Figures are placed on their own line as {figure:slug}.

Multiple paragraphs are separated by blank lines.

## [Emoji] [Next section] {#next-section-id}

...
```

## Rules

- One glossary entry per term. Every |term| in the body must have a corresponding entry in `glossary:`. Don't define the same term in multiple places.
- Figures are block-level only, on their own line: `{figure:slug}`. Not inline.
- Sections are H2 (`##`). Don't use H1 (the title comes from frontmatter).
- Section IDs (`{#id}`) are optional but recommended for deep-linkable anchors.
- Accent color is a single hex value. Per-guide. Consistent with the territory accents if possible.
- Do not output JSX. Do not output HTML. Do not include React imports or components.

## Figures

Figures live in a sibling `figures/` directory. When you reference a figure, assume the file is placed at `/public/labs/figures/[guide-id]/[filename]`. You only specify the filename in `figures[].file`.

## Example (abbreviated)

[paste the UAPx example from the plan]
````

### 7. Staged visual migration path

The lab launches with its own isolated dark-academic visual system. Migration to portfolio tokens happens in stages, each reversible via token-level revert.

**Stage 0 — Launch (isolated):**
- `design-system/lab-tokens.css` defines `--lab-bg`, `--lab-surface`, `--lab-text-*`, `--lab-font-body: Georgia, serif`, `--lab-font-mono: 'JetBrains Mono'`
- Per-guide accent from frontmatter → `--guide-accent`
- Portfolio tokens untouched
- Outcome: lab looks like an academic preprint viewer; portfolio looks like Blade Runner

**Stage 1 — Shared base tokens (cosmetic parity):**
- Lab tokens rewritten to reference portfolio base tokens where the values actually match (borders, subtle backgrounds)
- Still visually identical, but `--lab-border-subtle` now equals `var(--theme-border-subtle)`
- Enables Stage 2 without per-file changes

**Stage 2 — Typography experiment:**
- Promote Podkova to guide titles (Podkova is designed for headings, looks great at scale)
- Keep Georgia for body (serif genuinely better for long-form academic reading)
- JetBrains Mono stays for labels/captions
- A/B via `--lab-heading-font` token. Reversible in one line.

**Stage 3 — Full integration (optional, evaluate after ~20 guides):**
- Replace `--lab-bg` with portfolio warm-black
- Merge grain overlay in lab chrome
- Unified feel; lab still has distinct layout affordances (wide left rail, no hero images)
- Only if it makes the lab *better*. Isolation has real value — don't destroy it for consistency's sake.

**Rollback:** Each stage is a PR that modifies CSS variables only. Revert the PR to revert the stage. The data-driven renderer means no guide content changes across stages.

### 8. Library index (opening screen)

The `/` route at `labs.justinh.design` renders:

- **Hero strip:** Lab name, territory roadmap manifesto snippet (1–2 sentences from the position doc), link to the territory roadmap
- **Territory sections:** Four sections (T1 Consciousness & Spacetime, T2 Space Manufacturing, T3 Materials & Sensing, T4 UAP Detection), each with:
  - Territory header (accent color, premise one-liner)
  - Guide cards in order, showing title, source, accent dot, status pill (complete / draft / in progress)
- **Status meta:** Small footer strip — "N guides across 4 territories" counter, last-updated timestamp, link to portfolio

Navigation: click a guide card → full-screen guide viewer. Click territory header → filtered view of that territory's guides (future).

---

## Implementation Steps

### Phase 1 — Foundation (Tyrell, one session)

1. **Tokens** (design-system/)
   - Create `design-system/lab-tokens.css` with lab palette + per-guide accent scaffold
   - Document token naming convention in the file header

2. **Types + parser** (core/lab/)
   - Create `core/lab/guide-types.ts` (`Guide`, `GuideSection`, `GlossaryEntry`, `Figure`, `SourceMeta`, `Territory`)
   - Create `core/lab/parse-guide.ts` using `gray-matter` + `js-yaml`
   - Create `core/lab/guides.ts` manifest (glob `.md` files, parse at build time, export array)
   - Create `core/lab/territories.ts` (territory metadata: id, name, accent, premise, order)
   - Add tests: `parse-guide.test.ts` covers frontmatter validation, body parsing, figure resolution, glossary warnings

3. **Install dependencies**
   - `npm install gray-matter js-yaml`
   - `npm install -D @types/js-yaml`
   - Update package.json

### Phase 2 — Vite multi-entry (Tyrell, one session)

4. **Vite config**
   - Add `rollupOptions.input` with main + labs entries
   - Add `@lab` alias
   - Verify dev + build + preview still work for portfolio

5. **Lab entry scaffolding** (src/lab/)
   - Create `labs.html` at repo root
   - Create `src/lab/main.tsx`, `src/lab/App.tsx`, `src/lab/styles/lab.css`
   - Create stub `src/lab/pages/LibraryIndex.tsx` returning "Hello lab"
   - Route `/` to LibraryIndex in lab App
   - Verify lab renders at `http://localhost:5173/labs.html`

6. **Vercel config**
   - Update `vercel.json` with host-based rewrites
   - Verify local build produces `dist/index.html` + `dist/labs.html`
   - Add `labs.justinh.design` as a domain in the Vercel project (manual step, Justin via Vercel dashboard)
   - Add DNS CNAME record for the subdomain

### Phase 3 — Renderer (Tyrell, one to two sessions)

7. **Guide chrome components** (src/lab/components/guide/)
   - Build `GuideRenderer` orchestrator first (composed of stubs)
   - `GuideHeader`, `GuideTabBar`, `GuideSectionNav`
   - `GuideSection`, `GuideParagraph`, `GuideTerm`, `GuideDefinitionCard`
   - `GuideFigure`, `GuidePrevNext`, `GuideGlossaryView`
   - Each component ≤200 lines
   - Per-guide accent set via `--guide-accent` on `GuideRenderer` root

8. **Library components** (src/lab/components/library/)
   - `LibraryHeader`, `TerritoryGrid`, `GuideCard`

9. **Pages** (src/lab/pages/)
   - `LibraryIndex`, `GuideView`, `TerritoryPage` (optional MVP), `NotFoundPage`

10. **Wire routes** in `src/lab/App.tsx`:
    - `/` → LibraryIndex
    - `/t/:territory` → TerritoryPage
    - `/g/:slug` → GuideView
    - `*` → NotFoundPage

### Phase 4 — Migration (Tyrell, one session)

11. **Migration script** `scripts/migrate-jsx-guide.ts`
    - Parse JSX with `@babel/parser`
    - Extract SECTIONS + header metadata
    - Emit `.md` with frontmatter
    - Pilot on `emergent-quantization-explainer.jsx`

12. **Migrate remaining six guides**
    - Batch convert: DIRD 13, 14, 15, 28, quantum-gravity, UAPx (if drafted)
    - Place figures in `public/labs/figures/`
    - Manual visual diff against originals
    - Fix any conversion bugs, re-run

### Phase 5 — Polish and ship (Tyrell, one session)

13. **Accessibility pass** via `/audit`
    - WCAG 2.2 AA contrast for lab palette
    - Keyboard navigation for tab bar, section nav, term clicks
    - Screen reader labels for figures, term definitions
    - Heading hierarchy (h1 title, h2 sections, h3 subsections, no skips)

14. **Polish pass** via `/polish`
    - Typography rhythm, spacing consistency
    - Focus states, hover states
    - Motion: term click definition card animation, section nav scroll-spy

15. **Ship**
    - Merge to main
    - Deploy to Vercel
    - Smoke test `labs.justinh.design`

---

## Files Affected

### New files

- `design-system/lab-tokens.css` — Lab palette + per-guide accent scaffold (layer: design-system)
- `core/lab/guide-types.ts` — TypeScript types (layer: core)
- `core/lab/parse-guide.ts` — Markdown + frontmatter parser (layer: core)
- `core/lab/parse-guide.test.ts` — Parser tests (layer: core)
- `core/lab/guides.ts` — Build-time manifest (layer: core)
- `core/lab/territories.ts` — Territory metadata (layer: core)
- `core/lab/guides/*.md` — Guide source files (layer: core, content)
- `labs.html` — Second Vite entry (layer: root)
- `src/lab/main.tsx` — Lab app bootstrap (layer: src)
- `src/lab/App.tsx` — Lab router (layer: src)
- `src/lab/styles/lab.css` — Lab global styles (layer: src)
- `src/lab/layouts/LabLayout.tsx` — Lab shell chrome (layer: src)
- `src/lab/pages/LibraryIndex.tsx` — Library index page (layer: src)
- `src/lab/pages/GuideView.tsx` — Guide viewer page (layer: src)
- `src/lab/pages/TerritoryPage.tsx` — Territory filter page (layer: src)
- `src/lab/pages/NotFoundPage.tsx` — Lab 404 (layer: src)
- `src/lab/components/library/*.tsx` — Library UI (layer: src)
- `src/lab/components/guide/*.tsx` — Guide chrome (layer: src)
- `public/labs/figures/[slug]/*.jpg` — Guide figure assets (layer: public)
- `scripts/migrate-jsx-guide.ts` — One-time JSX → MD migration (layer: scripts)
- `vector/decisions/ADR-009-lab-subdomain-architecture.md` — Architecture decision (layer: vector)

### Modified files

- `vite.config.ts` — Add multi-entry input + `@lab` alias (layer: root)
- `vercel.json` — Add host-based rewrites for subdomain (layer: root)
- `package.json` — Add `gray-matter`, `js-yaml`, `@babel/parser`, `@types/js-yaml` (layer: root)
- `plans/roadmap.md` — Update lab entry, link this plan (layer: plans)

### Archived files

- `plans/HANDOFF-speculative-lab.md` → `plans/archive/` (superseded by this plan)

---

## Dependencies

| Package | Purpose | Weight | Justified? |
|---------|---------|--------|-----------|
| `gray-matter` | Frontmatter extraction | small | Yes — YAML parsing is non-trivial, and we'll parse ~20+ guides. Deliberate exception to "prefer 20 lines" ethos, same as API client deps. |
| `js-yaml` | YAML body parser (gray-matter dep, but explicit import for glossary nested parsing) | small | Yes — same reasoning |
| `@babel/parser` (dev only) | Parse JSX ASTs during one-time migration | small, dev-only | Yes — migration script only, not shipped |
| `@types/js-yaml` | Types | small, dev-only | Yes |

No UI library additions. No new runtime dependencies beyond the two markdown parsers.

---

## Accessibility Requirements

- **Contrast:** Lab palette must meet WCAG 2.2 AA. The current handoff spec (`#0a1018` bg, `#a0b0c0` body text, `#e8edf2` headings) has borderline contrast at small sizes — validate and adjust in `/audit` pass.
- **Per-guide accent colors:** Some accents in the current inventory are low-contrast on the dark background at small sizes (e.g., amber `#e8a849` underlined text may need weight adjustment). Parser warns if accent contrast falls below AA for its typical uses (14px body + underline). Author-overridable but flagged.
- **Keyboard navigation:** Tab bar, section nav pills, glossary term buttons, prev/next — all reachable and operable by keyboard. Visible focus states.
- **Screen readers:** Figures have `alt` text from frontmatter. Definition cards use `aria-expanded`. Tab bar uses ARIA `tablist`. Section nav uses ARIA `tabpanel` semantics or plain anchor links with skip-to-content.
- **Heading hierarchy:** h1 per page (guide title), h2 for sections, h3 for subsections. No skipped levels.
- **Motion:** Definition card expand/collapse respects `prefers-reduced-motion`. Smooth scroll on section nav respects the same.
- **Deep linkable anchors:** Every section has a stable ID. Copy-link affordance on hover.

---

## Resolutions (from Justin, 2026-04-20)

The following were open questions; Justin has decided:

- **Typography at launch:** Podkova for guide titles, Georgia for body, JetBrains Mono for labels and metadata. Applied via `--lab-heading-font`, `--lab-body-font`, `--lab-mono-font` in `design-system/lab-tokens.css`.
- **Quantum-gravity accent:** ANU teal `#4ecdc4` (dominant accent in the source HTML). Schema stays single-accent at MVP. Extend only if more synthesis guides follow.
- **Pilot migration guide:** `emergent-quantization-explainer.jsx` first (cleanest, 34KB). After migration script is proven, stress-test on `dird-15-vacuum-spacetime-engineering-guide.jsx` (largest, 68KB).
- **Analytics:** Enable Vercel Analytics + Speed Insights on `labs.justinh.design`. Both have free tiers that cover this use case.
- **Manifesto:** Write new, tight (~40–60 words). Drafts pending Justin's pick (see three options below, before the open questions).
- **Figure cropping automation:** The external Claude project produces cropped figure JPGs alongside the guide markdown. Manual intervention possible when cropping goes wrong. No change to the ingestion pipeline needed.
- **Figure background handling:** Cropped figures from scanned papers have white academic-paper backgrounds. Photographic figures work on dark bg; line-art diagrams need either a light container or `filter: invert()`. **Decision:** default every figure to a subtle off-white paper container with a soft border (roughly matches an academic preprint page reproduction). This works universally — photographic figures look natural on paper, line-art figures stay legible. No per-figure flag needed. If a future edge case demands it, add an optional `figures[].background: "transparent" | "invert"` field.

### Manifesto (final, per Justin's riff on Option A)

> The future isn't coming, it's already here, being built now in peer-reviewed papers and NSF-funded labs. This library is how I learn it. Deep-dive research guides on the science behind vacuum engineering, UAP detection, and consciousness as technology. Prep for how we design for this world.

Ships on the library index hero.

## Open Questions for Justin

**Infrastructure / domain**
1. **Vercel domain setup** — Confirm you'll add `labs.justinh.design` in the Vercel dashboard and create the DNS CNAME. Tyrell can't do either. Ready to do this before Phase 2 ships?
2. **Analytics on lab** — Extend Vercel Analytics + Speed Insights to the lab subdomain (recommended, essentially free), or keep the lab tracking-free?

**Content model edge cases**
3. **Equations and math** — Are any upcoming guides math-heavy (inline LaTeX, block equations)? The current guides use unicode + prose. If a future guide needs rendered math, we'd add KaTeX or similar. MVP: prose-only. Defer unless you need it now.
4. **Tables** — Any guides need tables? MVP: no table support. Add if needed.
5. **Footnotes and citations** — Add structured footnote support (common in academic writing), or rely on inline links? MVP: inline links. Full citations feels like a v2.

**Library UX**
6. **Territory navigation depth** — Is `/t/:territory` worth building at MVP, or is the library index's per-territory grouping enough? I'd defer the per-territory page until the library has 15+ guides.
7. **Search / filter UI** — Add at launch, or wait until content volume demands it? I'd wait — 7 guides fit on one screen, search is noise.
8. **"New guide" visual indicator** — Flag guides published in the last 14 days with a "new" pip? Small feature, nice for readers returning regularly.
9. **Cross-guide glossary** — Shared terms across guides (e.g., "vacuum" defined in multiple guides) — keep per-guide (current), or promote to lab-wide with per-guide overrides? MVP: per-guide. Lab-wide is a v2 nice-to-have.

**Visual direction**
10. **Typography posture for launch** — Stick with Georgia body + JetBrains Mono labels exactly as the existing guides (pure academic), or promote Podkova for guide titles at launch (lightweight bridge toward portfolio tokens)? I lean Podkova for titles, Georgia for body at launch. Your call.
11. **Lab header design** — Does the lab get its own identity/logo treatment, or does it borrow the portfolio header? I lean distinct — the lab is a publication surface with its own personality.

**Migration**
12. **Pilot guide for JSX → MD migration** — I propose `emergent-quantization-explainer.jsx` (cleanest structure). Agree, or prefer to pilot with a more complex one (e.g., DIRD 15, the biggest at 68KB) to stress-test the script?
13. **Quantum Gravity guide multi-accent** — The guide uses four accents (ANU teal, White orange, bridge lavender, design pink) because it's a synthesis piece. MVP schema has a single `accent` field. Recommendation: pick ANU teal as the dominant accent at launch. If more synthesis guides emerge, extend the schema with an optional `accents` array. Agree with pick-one, or want the extended schema upfront?

**Position document and manifesto**
14. **Lab manifesto on library index** — Use the position doc's opening paragraph, the v5.1 roadmap manifesto, or write a tighter new one? Both existing versions feel ~20% longer than ideal for a library index hero.
15. **Does the position doc get a page?** — `labs.justinh.design/about` or `/position` that publishes the (eventually external) version? Defer until the doc is ready for external, per its own cadence (~12 guides).

**Authoring pipeline**
16. **Claude project prompt update** — The handoff contract section (§6) is a prompt block ready to paste. Want me to refine it further, or is that the shape? Also: should the Claude project produce figure image files too (extracting crops from source PDFs), or is that your manual step?

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Vite multi-entry breaks something subtle in the portfolio build | Phase 2 verifies portfolio dev/build/preview before lab work; rollback is reverting `vite.config.ts` alone |
| `gray-matter`/`js-yaml` adds transitive weight | Both are small, tree-shaking keeps them out of non-parser bundles. Measured in phase 1. |
| Migration script mis-extracts a complex guide | Pilot with one, validate manually, iterate before batching. Keep source JSX files intact; re-run is cheap. |
| Per-guide accent contrast falls below AA | Parser warns on author, `/audit` verifies at build. Override escape hatch via explicit `accentText` in frontmatter if strict ratio forces an ugly color. |
| Subdomain + SPA rewrites misbehave on Vercel | Test with Vercel preview deploys before production cutover. Rollback: remove the host-based rewrite line. |
| Guide ingestion pipeline breaks on novel markdown patterns from the Claude project | Schema validator fails loudly at parse time. Author fixes file. If structural change needed, extend schema with test coverage. |

---

## Future Work (post-MVP)

These are explicitly out of scope for this plan but worth naming:

- **Build-time figure optimization** via `vite-imagetools` (WebP conversion, responsive srcset)
- **Full-text search** across the library (client-side index via FlexSearch or similar)
- **Per-territory landing pages** with territory premise, source list, design questions
- **Cross-guide term linking** — when a term is defined in multiple guides, link the definitions
- **Citation export** — BibTeX / RIS export per guide for researchers
- **Print mode** — clean print stylesheet for offline reading
- **External position document page** — published when the doc reaches external-ready
- **Guide authoring in-repo** — eventually, if/when Writer skill wants to author guides directly rather than ingesting from Claude project
- **MDX support** — only if a guide genuinely needs React components inline (not anticipated)

---

## Next Steps After This Plan Is Accepted

1. Justin reviews and answers open questions
2. Create `vector/decisions/ADR-009-lab-subdomain-architecture.md`
3. Update `plans/roadmap.md` to reference this plan and archive `HANDOFF-speculative-lab.md`
4. Consider `invest-crew` to decompose Phase 1–5 into scoped tasks if Justin wants to run multi-agent. Otherwise, Tyrell can take it straight through linearly.
5. Tyrell begins Phase 1 (foundation: tokens, types, parser)

### Handoff Notes for Tyrell

- Start with tokens → types → parser → Vite config → entry scaffolding → renderer. Every step is layer-ordered.
- Run `/audit` mid-build (after renderer, before migration) and again before ship.
- Run `/polish` after migration to fix typography rhythm and motion details.
- Keep each component under 200 lines. Split if growing.
- Do not silently compromise the four-layer rule. Per-guide accent via CSS variable is the ONE inline style exception — document it in the `GuideRenderer` file header.
- After Phase 5 ships, run `invest-architecture` to verify layer compliance.
- After ~3 more guides ship through the new pipeline, run `invest-doctrine` to check if any ARCHITECTURE.md amendments are warranted.
