# Mission: Speculative Design Lab — Research Guide Library

**Feature:** Visitors can browse a library of deep-dive research guides on frontier physics at `labs.justinh.design`, reading each guide with inline glossary terms, section navigation, embedded figures, and a full alphabetical glossary view.
**Date:** 2026-04-20
**Doctrine source:** ARCHITECTURE.md, CLAUDE.md, VECTOR.md
**Plan:** `plans/feature-speculative-lab-library.md`
**ADR:** `vector/decisions/ADR-009-lab-subdomain-architecture.md`
**Parent branch:** `feat/speculative-lab-library`

## Constraint Check

- **Four-layer architecture:** Preserved. `src/lab/` is a second UI *application* within the existing UI layer, not a new layer. `core/lab/` extends the core layer with lab-specific data. `design-system/lab-tokens.css` extends the design-system layer. No layer boundary changes.
- **Token colors only:** Per-guide accent from frontmatter is set as a CSS custom property (`--guide-accent`) via one inline-style exception on `GuideRenderer` root — setting a CSS variable, not a style value. All downstream styling references `var(--guide-accent)` through standard CSS. Documented in the renderer file header and ADR-009.
- **WCAG 2.2 AA:** Lab palette validated at build time via contrast check. Parser warns when a guide's accent color falls below AA on the dark background. Keyboard navigation, ARIA semantics, screen reader support required on all interactive components.
- **Three-font system for portfolio untouched:** Lab introduces its own type stack (Podkova title, Georgia body, JetBrains Mono labels) scoped to `src/lab/` and `design-system/lab-tokens.css`. Portfolio fonts (Space Grotesk, Didact Gothic, Podkova) untouched.
- **No em-dashes in copy:** Lab manifesto and UI copy follow the VECTOR.md hard constraint.
- **No heavy dependencies:** Adds `gray-matter`, `js-yaml`, `@types/js-yaml`, `@babel/parser` (dev-only). Markdown parsing and JSX migration script are deliberate exceptions to the "prefer 20 lines" ethos, same reasoning accepted in ADR-004.
- **Files under 200 lines:** Renderer components decomposed to keep each component under the limit.

**No violations found.**

## Tasks

### T1: Lab design tokens
**Layer:** design-system (`design-system/lab-tokens.css`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `tokens:`
**Inputs:** None — can start immediately
**Outputs:** `design-system/lab-tokens.css` with the lab's dark-academic palette as CSS variables: `--lab-bg-deep`, `--lab-bg-surface`, `--lab-bg-raised`, `--lab-border-subtle`, `--lab-border-strong`, `--lab-text-primary`, `--lab-text-secondary`, `--lab-text-muted`, `--lab-figure-bg` (off-white paper container), `--lab-figure-border`. Font family variables: `--lab-heading-font: 'Podkova', serif`, `--lab-body-font: Georgia, serif`, `--lab-mono-font: 'JetBrains Mono', monospace`. Per-guide accent scaffold: `--guide-accent: var(--theme-accent-primary)` (default fallback, overridden at render time by `GuideRenderer`).
**Scope boundary:** This task does NOT touch `core/`, `services/`, `src/`, or the existing `design-system/tokens.css`. Adds one new file only.

**Details:**
- Use OKLCH color values where possible (matches portfolio convention)
- WCAG AA contrast ratios between bg-deep + text-primary, bg-deep + text-secondary
- File header documents: lab palette distinct from portfolio palette, migration path described in ADR-009
- No fonts loaded here — font imports happen in `src/lab/main.tsx`

---

### T2: Guide types and territory metadata
**Layer:** core (`core/lab/guide-types.ts`, `core/lab/territories.ts`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `core:`
**Inputs:** None — can start immediately (parallel with T1)
**Outputs:**
- `core/lab/guide-types.ts`: `Guide`, `GuideFrontmatter`, `GuideSection`, `Paragraph`, `Figure`, `GlossaryEntry`, `SourceMeta`, `Territory`, `GuideStatus` types
- `core/lab/territories.ts`: exported `territories` array with T1 purple, T2 blue, T3 rose, T4 signal-green accents and premise one-liners drawn from roadmap v5.1

**Scope boundary:** This task does NOT touch `design-system/`, `services/`, `src/`, or create the parser (T3 handles that). Pure types and constant data only. No side effects, no I/O.

**Details:**
- `Guide` type holds parsed + validated guide: frontmatter fields, `sections: GuideSection[]`, `glossary: Record<string, string>`, `figures: Record<string, Figure>`
- `GuideSection` holds: `id`, `heading`, `icon` (optional emoji), `paragraphs: (Paragraph | Figure)[]`
- `Paragraph` holds: `nodes: (TextNode | TermNode | BoldNode)[]` — tagged union for rich paragraph content
- `Territory` = `'T1' | 'T2' | 'T3' | 'T4'`
- Export a `territoryMeta` map keyed by Territory with name, premise, accent color (token reference, not raw hex)

---

### T3: Guide markdown parser
**Layer:** core (`core/lab/parse-guide.ts`, `core/lab/guides.ts`, `package.json`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `core:`
**Inputs:** T2 (needs Guide types)
**Outputs:**
- Install deps: `gray-matter`, `js-yaml`, `@types/js-yaml` (runtime); `@babel/parser`, `@babel/traverse`, `@types/babel__traverse` (dev-only, for T10 migration script)
- `core/lab/parse-guide.ts`: `parseGuide(source: string, slug: string): Guide` — extracts frontmatter via gray-matter, validates schema, parses body (H2 sections with optional `{#id}` anchors, paragraphs with `|term|` and `**bold**` inline markers, `{figure:slug}` block nodes), resolves glossary references, returns typed Guide or throws with field-level error
- `core/lab/guides.ts`: build-time manifest via `import.meta.glob('./guides/*.md', { eager: true, as: 'raw' })`, parses each file, exports sorted `guides: Guide[]` array and `guidesBySlug: Record<string, Guide>` map
- `core/lab/parse-guide.test.ts`: tests for frontmatter validation, body parsing, inline markers, figure resolution, glossary term validation, accent contrast warning, missing/extra glossary entries

**Scope boundary:** This task does NOT touch `design-system/`, `services/`, or `src/`. Parser + loader only. Does not include migration logic (T10 handles JSX extraction).

**Details:**
- Accent contrast warning: parse guide's `accent` hex, compute luminance contrast against `#0a0a0c` base, emit `console.warn` at parse time if below 4.5:1 for 14px body text; do NOT fail the build
- Missing glossary entry referenced by `|term|` → hard error (parse throws)
- Glossary entry with zero references → soft warning (console.warn)
- Duplicate figure slugs within one guide → hard error
- Empty `core/lab/guides/` directory at first run is fine — `guides` array is `[]`

---

### T4: Vite multi-entry config + Vercel host-based rewrites
**Layer:** root config (`vite.config.ts`, `vercel.json`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `chore:`
**Inputs:** None — can start immediately (parallel with T1, T2)
**Outputs:**
- Updated `vite.config.ts`: `build.rollupOptions.input = { main: 'index.html', labs: 'labs.html' }`; add `'@lab': path.resolve(__dirname, './src/lab')` alias; extend `test.include` to cover `src/lab/**/*.test.{ts,tsx}` and `core/lab/**/*.test.ts`
- Updated `vercel.json`: add host-based rewrite for `labs.justinh.design` → `/labs.html`, keep catch-all rewrite to `/index.html` as fallback, preserve existing `headers` block verbatim

**Scope boundary:** This task does NOT touch `src/`, `core/`, `design-system/`, or create entry files (T5 handles `labs.html` and `src/lab/main.tsx`). Config changes only.

**Details:**
- Verify portfolio still builds and serves correctly after config change: run `npm run dev`, visit `/`, run `npm run build`, run `npm run preview`
- `labs.html` referenced in Vite input doesn't exist yet — this is fine, Vite will emit a build warning until T5 lands, and dev server doesn't require it to exist
- Skip Vercel Analytics wiring here — T13 handles that at the app level

---

### T5: Lab entry scaffolding + shell chrome
**Layer:** src (`labs.html`, `src/lab/main.tsx`, `src/lab/App.tsx`, `src/lab/styles/lab.css`, `src/lab/layouts/LabLayout.tsx`, `src/lab/pages/NotFoundPage.tsx`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `feat:`
**Inputs:** T1 (tokens), T4 (Vite config)
**Outputs:**
- `labs.html` at repo root — mirrors `index.html` structure, points to `/src/lab/main.tsx`, sets `<title>labs.justinh.design</title>`
- `src/lab/main.tsx` — bootstraps React 19 app with `BrowserRouter`, `HelmetProvider`, loads Podkova + JetBrains Mono via `@fontsource`, loads Georgia via system fallback only (no webfont)
- `src/lab/App.tsx` — router with routes `/`, `/g/:slug`, `*`; TerritoryPage (`/t/:territory`) deferred to post-MVP (see plan Future Work)
- `src/lab/styles/lab.css` — imports Tailwind, `../../design-system/tokens.css`, `../../design-system/lab-tokens.css`, applies lab body font + bg as defaults
- `src/lab/layouts/LabLayout.tsx` — shell chrome: skip-link, minimal header (lab brand wordmark, link back to portfolio), outlet, minimal footer (built-here note, link to GitHub)
- `src/lab/pages/NotFoundPage.tsx` — lab-themed 404 with link back to library index
- Stub `src/lab/pages/LibraryIndex.tsx` returning placeholder text so routing resolves (T6 builds the real page)
- Stub `src/lab/pages/GuideView.tsx` returning placeholder so routing resolves (T9 builds the real page)

**Scope boundary:** This task does NOT build the LibraryIndex UI (T6), guide renderer (T7/T8), guide viewer (T9), or territory page. Shell chrome and routing scaffolding only. Does not enable analytics (T13 handles that).

**Details:**
- LabLayout must satisfy WCAG 2.2 AA: skip-link, semantic header/main/footer landmarks
- Verify both apps work: `http://localhost:5173/` serves portfolio, `http://localhost:5173/labs.html` serves lab
- Lab brand wordmark: "Speculative Design Lab" in Podkova 500, small kicker "labs.justinh.design" in JetBrains Mono below — no logo graphics at MVP

---

### T6: Library index page + territory grid + guide cards
**Layer:** src (`src/lab/pages/LibraryIndex.tsx`, `src/lab/components/library/*.tsx`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `feat:`
**Inputs:** T2 (types), T3 (manifest — can render with empty guides array initially), T5 (shell chrome)
**Outputs:**
- `src/lab/pages/LibraryIndex.tsx` — composes LibraryHeader, TerritoryGrid; sets page `<title>` and meta via Helmet
- `src/lab/components/library/LibraryHeader.tsx` — lab wordmark, manifesto copy (exact text from plan), status meta (guide count)
- `src/lab/components/library/TerritoryGrid.tsx` — four territory sections in order T4 (active), T1 (extending), T3 (queued), T2 (queued); per-territory header with accent color + premise one-liner; grid of GuideCards for that territory's guides; empty-state copy for territories with zero guides
- `src/lab/components/library/GuideCard.tsx` — accent dot, title, kicker, source authors/year, status pill (complete / draft / in-progress); clickable link to `/g/:slug`

**Scope boundary:** This task does NOT touch `design-system/`, `core/`, or `services/`. Imports guide data from `core/lab/guides`. Does not render guide bodies (that's T9).

**Details:**
- Manifesto copy (final, per Justin): "The future isn't coming, it's already here, being built now in peer-reviewed papers and NSF-funded labs. This library is how I learn it. Deep-dive research guides on the science behind vacuum engineering, UAP detection, and consciousness as technology. Prep for how we design for this world."
- Territory order: active first (T4), extending next (T1), then queued (T3, T2) — active territory visually emphasized
- Guide card hover/focus state uses accent color glow (via `--guide-accent` set on the card)
- All accent colors applied via CSS custom properties set from data — no inline style objects beyond setting the variable

---

### T7: Guide renderer chrome — orchestrator, header, tab bar, section nav
**Layer:** src (`src/lab/components/guide/GuideRenderer.tsx`, `GuideHeader.tsx`, `GuideTabBar.tsx`, `GuideSectionNav.tsx`, `GuidePrevNext.tsx`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `feat:`
**Inputs:** T1 (tokens), T2 (types), T3 (manifest loader)
**Outputs:**
- `GuideRenderer.tsx` — orchestrator; receives `guide: Guide` prop; sets `--guide-accent` via React inline style on root element (documented exception); holds local state for `activeSection`, `activeTerm`, `mode: 'guide' | 'glossary'`; composes header + tab bar + section nav + section content + prev/next
- `GuideHeader.tsx` — kicker line, h1 title, source metadata (authors / year / venue with optional link), description paragraph
- `GuideTabBar.tsx` — "Guide" / "Glossary" tabs with ARIA `tablist` semantics; active tab underlined in `var(--guide-accent)`
- `GuideSectionNav.tsx` — pill buttons for each section (icon + title); sticky on scroll; keyboard navigable; active pill styled with `var(--guide-accent)`; scroll-spy updates active section as user scrolls
- `GuidePrevNext.tsx` — bottom-of-section prev/next buttons; disabled at ends

**Scope boundary:** This task does NOT build paragraph-level rendering (T8 handles `GuideSection`, `GuideParagraph`, `GuideTerm`, `GuideDefinitionCard`, `GuideFigure`), glossary view (T9), or guide viewer page (T9). Chrome and navigation only.

**Details:**
- `GuideRenderer` is the ONE file in `src/lab/` allowed an inline style — it sets `{ ['--guide-accent' as string]: guide.accent }`. Document in file header. No other inline styles permitted in lab UI code.
- Respects `prefers-reduced-motion`: scroll-spy still updates indicator, but scroll-into-view on pill click uses instant scroll instead of smooth
- Each component ≤200 lines

---

### T8: Guide content components — section, paragraph, term, definition, figure
**Layer:** src (`src/lab/components/guide/GuideSection.tsx`, `GuideParagraph.tsx`, `GuideTerm.tsx`, `GuideDefinitionCard.tsx`, `GuideFigure.tsx`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `feat:`
**Inputs:** T1 (tokens), T2 (types), T3 (parser output shape)
**Outputs:**
- `GuideSection.tsx` — renders one section: h2 with section icon + title + anchor id; maps over paragraphs/figures emitting `GuideParagraph` or `GuideFigure`
- `GuideParagraph.tsx` — renders a paragraph: walks the parsed node array, emits plain text, `<strong>` for bold nodes, `<GuideTerm>` for term nodes; when a term is active, renders `<GuideDefinitionCard>` inline directly below the paragraph
- `GuideTerm.tsx` — clickable span styled with `var(--guide-accent)` (subtle background tint on hover, stronger when active); `aria-expanded`; keyboard-operable
- `GuideDefinitionCard.tsx` — expandable card showing term + definition; subtle border, soft motion in/out respecting reduced-motion; close button
- `GuideFigure.tsx` — off-white paper container (`--lab-figure-bg`, `--lab-figure-border`, modest padding); `<img>` with `alt` from frontmatter; caption below in muted text; lazy loading; handles the scanned-paper figure convention

**Scope boundary:** This task does NOT build the renderer orchestrator (T7), the glossary view (T9), or the guide page (T9). Content-level primitives only.

**Details:**
- `GuideFigure` source path: `/labs/figures/${guideSlug}/${figure.file}` — resolves to `public/labs/figures/...` at build time (Vite serves `public/` at root)
- `GuideDefinitionCard` motion: height/opacity transition via `motion/react` (already a project dep); reduced-motion falls back to instant expand
- `GuideTerm` with same term appearing multiple times in a paragraph: each instance is independently clickable, but only one definition card shows at a time per paragraph (state lifted to paragraph level)

---

### T9: Glossary view + guide viewer page
**Layer:** src (`src/lab/components/guide/GuideGlossaryView.tsx`, `src/lab/pages/GuideView.tsx`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `feat:`
**Inputs:** T7 (chrome components), T8 (content components)
**Outputs:**
- `GuideGlossaryView.tsx` — alphabetical glossary: letter anchors (A, B, C...) as sticky sub-nav; per-term entry with term name (accent colored), definition, back-to-top affordance; keyboard navigable
- `src/lab/pages/GuideView.tsx` — reads `slug` from URL params, looks up guide in `guidesBySlug` manifest, renders `GuideRenderer` with guide data; 404s to `NotFoundPage` if slug not found; sets page `<title>` and meta via Helmet (includes source citation in meta description)

**Scope boundary:** This task does NOT build the migration script (T10), ingest content (T11), or run polish/audit (T12). Renderer composition and glossary view only.

**Details:**
- GuideGlossaryView toggled on by `GuideRenderer` when tab bar is in "Glossary" mode
- Deep links: `labs.justinh.design/g/uapx-field-methods#hardware` scrolls to section with id="hardware"
- Helmet meta: OG image reuses a territory-color card at build time (defer OG generation to T13 polish pass — ship without at MVP is fine)

---

### T10: JSX migration script + pilot run
**Layer:** scripts (`scripts/migrate-jsx-guide.ts`)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `scripts:`
**Inputs:** T3 (knows target schema)
**Outputs:**
- `scripts/migrate-jsx-guide.ts` — CLI that takes a JSX guide file path, parses it with `@babel/parser`, extracts the `SECTIONS` array and header metadata, emits a single `.md` file in the new schema to stdout or a target path
- Pilot run: migrate `/Users/300mhz/projects/design-futures/learning-guides/emergent-quantization-explainer.jsx`, write output to `core/lab/guides/emergent-quantization.md`, verify it parses cleanly via T3's parser and renders in the browser

**Scope boundary:** This task does NOT migrate other JSX guides or HTML/markdown guides (T11 handles those). Script + pilot only.

**Details:**
- Script invocation: `npx tsx scripts/migrate-jsx-guide.ts <input.jsx> <output.md>`
- Script extracts: `SECTIONS` array (AST walk), header title/source/accent/kicker from JSX component body (look for the top-level render returning `<div>` with nested header — matches the convention in all 5 JSX guides)
- Paragraph text fields with `|term|` and `**bold**` markers copy verbatim (already matches target format)
- Terms deduplicate into frontmatter `glossary` map; warn if same term has different definitions in different paragraphs (should not happen but worth catching)
- Emoji icons from section headers carry through to the output as part of the `## 🎯 Title {#id}` heading
- Validation: run T3's parser on the emitted file; should parse without error
- Manual visual diff: Justin or Tyrell opens the original JSX guide (standalone render) and the new guide in lab preview side-by-side, confirms parity

---

### T11: Guide content ingestion — batch JSX, HTML hand-conversion, UAPx draft conversion
**Layer:** core (`core/lab/guides/*.md`, `public/labs/figures/*`)
**Owner:** Tyrell (with Writer for any prose smoothing post-conversion)
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `content:`
**Inputs:** T9 (working renderer to validate output), T10 (script proven on pilot)
**Outputs:**
- Run migration script on 5 remaining JSX guides: `dird-13-warp-drive-guide.jsx`, `dird-14-superconductors-gravity-guide.jsx`, `dird-15-vacuum-spacetime-engineering-guide.jsx`, `dird-28-breakthrough-cockpits-guide.jsx`, and re-validate `emergent-quantization-explainer.jsx` pilot. Place outputs in `core/lab/guides/`.
- Hand-convert `quantum-gravity-guide.html` to markdown+frontmatter. Pick ANU teal `#4ecdc4` as dominant accent. Use the JSX migration outputs as structural reference. Place in `core/lab/guides/quantum-gravity.md`.
- Convert `uapx1/uapx.md` draft to final schema (frontmatter with UAPx's full source metadata, `accent: "#4ade80"`, `territory: T4`, `status: draft`, figures block for all 5 images). Place in `core/lab/guides/uapx-field-methods.md`.
- Copy figure files: `uapx1/fig-*.jpg` → `public/labs/figures/uapx-field-methods/`. Any figures from other guides (if migration surfaces them) placed in corresponding directories.
- Validate each guide renders correctly in lab preview. Visual diff against originals for JSX guides; for HTML guide compare against browser-rendered original; for UAPx draft compare against the draft's intent.

**Scope boundary:** This task does NOT run a11y audit or polish (T12 handles those). Does not update roadmap (T13). Does not wire analytics (T13). Content ingestion and placement only.

**Details:**
- If migration script produces an output that fails parser validation, fix the script (amend T10 commit) and re-run
- If a guide has borderline-contrast accent color, note it for T12's contrast audit — do not silently change the author's chosen accent
- UAPx figures have white paper backgrounds per the external Claude project note — covered by the default figure container (T8)
- Expected final count in `core/lab/guides/`: 7 files (emergent-quantization, dird-13, dird-14, dird-15, dird-28, quantum-gravity, uapx-field-methods)

---

### T12: Accessibility audit + visual polish pass
**Layer:** multi (design-system adjustments + src fixes)
**Owner:** Tyrell (run `/audit`, then `/polish` via Impeccable pipeline)
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `fix:` for a11y fixes, `polish:` for visual fixes
**Inputs:** T11 (all content ingested)
**Outputs:**
- `/audit` run on lab with full content: WCAG 2.2 AA contrast verification across lab palette AND each guide's accent color on its backgrounds, keyboard navigation for tab bar / section nav / terms / prev-next / glossary / figure zoom (if added), screen reader pass on guide structure, reduced-motion compliance, heading hierarchy (one h1 per guide page, h2 sections, h3 subsections, no skips), focus visible on all interactive elements
- `/polish` run: typography rhythm (Podkova/Georgia pairing, line-height, measure), figure container padding/border tuning, motion tuning on term definition card expand and tab bar transition, focus state refinement, hover state consistency
- Fixes committed incrementally as findings arise

**Scope boundary:** This task does NOT add new features, ingest new content, or change the content schema. Quality remediation only.

**Details:**
- Any per-guide accent colors failing contrast get a documented override strategy: either bump accent brightness in frontmatter (requires author approval — Justin) OR introduce an `--guide-accent-on-dark` variant in tokens that the renderer derives from the base accent when the base fails contrast
- Polish pass should catch any layout asymmetries between guides with vs. without figures, short vs. long glossaries, few vs. many sections

---

### T13: Analytics + roadmap update + ship
**Layer:** multi (src for analytics, plans/ for roadmap, root for archive)
**Owner:** Tyrell
**Branch:** `feat/speculative-lab-library`
**Commit prefix:** `chore:` for analytics/roadmap, `docs:` for archive
**Inputs:** T12 (audit + polish complete)
**Outputs:**
- Wire Vercel Analytics + Speed Insights into `src/lab/main.tsx`: import `@vercel/analytics/react` and `@vercel/speed-insights/react`, mount `<Analytics />` and `<SpeedInsights />` alongside the app root (both already project deps)
- Update `plans/roadmap.md`: move lab entry from "Active explorations" status PLANNED to status SHIPPED with link to this mission and the merged PR; update last-updated date
- Archive `plans/HANDOFF-speculative-lab.md` → `plans/archive/HANDOFF-speculative-lab.md` (git mv) — superseded by the mission + ADR-009
- Final quality gate: `npm run lint` clean, `npm run build` clean (both entry outputs generated: `dist/index.html` and `dist/labs.html`), `npm run test` all green, `npm run preview` manual smoke test both at `http://localhost:4173/` and `http://localhost:4173/labs.html`
- Open PR against main; Justin merges; Vercel deploys; verify `labs.justinh.design` resolves and renders library index

**Scope boundary:** This task does NOT add new content, new components, or new features. Wiring + verification + ship only.

**Details:**
- After merge, run `invest-architecture` to verify layer compliance stayed clean through the sprint
- Consider follow-up: OG image generation for guide pages (use existing `generate-og-images.ts` pattern, extend for lab slugs) — explicitly post-MVP, call out in plan's "Future Work" if you want to file a follow-up task

---

## Execution Order

```
Parallel (start immediately):
  T1   (lab tokens)
  T2   (guide types + territories)
  T4   (Vite + Vercel config)

After T1 + T4:
  T5   (lab entry scaffolding)

After T2:
  T3   (parser + manifest)

After T3:
  T10  (migration script + pilot)    — parallel with T6/T7/T8

After T1, T2, T3, T5:
  T6   (library index + grid + cards)   — parallel with T7/T8
  T7   (guide chrome: renderer, header, tab bar, section nav, prev/next)
  T8   (guide content: section, paragraph, term, definition, figure)

After T7 + T8:
  T9   (glossary view + guide viewer page)

After T9 + T10:
  T11  (content ingestion — batch migrate, HTML convert, UAPx convert)

After T11:
  T12  (a11y audit + polish pass)

After T12:
  T13  (analytics + roadmap update + ship)
```

**Critical path:** T2 → T3 → T7 → T9 → T11 → T12 → T13 (7 sequential tasks)

**Maximum parallelism:** After T3 lands, up to four streams can run simultaneously — T6 (library), T7 (guide chrome), T8 (guide content), T10 (migration). All share the feature branch, layer-prefixed commit messages reduce collision risk.

**Collision watch:** T6, T7, T8, T9 all live under `src/lab/`. Each task's scope boundary is file-level — no two tasks edit the same file. Lint runs per-commit.

## Done State

This feature is complete when:
- [ ] `labs.justinh.design` resolves to the library index showing all 7 ingested guides grouped by territory
- [ ] All 7 guides render correctly: emergent-quantization, dird-13, dird-14, dird-15, dird-28, quantum-gravity, uapx-field-methods
- [ ] Each guide has working inline glossary (`|term|` → definition card), section navigation with scroll-spy, tab switching between Guide and Glossary views, prev/next section buttons, figures in off-white paper containers
- [ ] Per-guide accent colors applied via `--guide-accent` CSS variable throughout each guide
- [ ] Deep links work: `/g/uapx-field-methods#hardware` scrolls to the hardware section
- [ ] Back-to-library navigation works from any guide
- [ ] Four-layer architecture intact: no hardcoded colors in `src/lab/`, no data fetching in components, no DOM access in `core/lab/`
- [ ] WCAG 2.2 AA: contrast verified on palette + each guide's accent, keyboard navigable, screen reader friendly, reduced-motion respected, heading hierarchy correct
- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` produces both `dist/index.html` and `dist/labs.html`
- [ ] `npm run test` passes (including new `core/lab/parse-guide.test.ts`)
- [ ] `npm run preview` serves both entries
- [ ] Vercel Analytics + Speed Insights active on lab subdomain
- [ ] Portfolio (`justinh.design`) still renders and behaves identically to pre-sprint
- [ ] `plans/roadmap.md` updated with SHIPPED status
- [ ] `plans/HANDOFF-speculative-lab.md` archived
- [ ] All tasks merged to `feat/speculative-lab-library`, branch merged to `main` via PR

## Flat Task List

```
T1   feat/speculative-lab-library  "Lab design tokens"
T2   feat/speculative-lab-library  "Guide types and territory metadata"
T3   feat/speculative-lab-library  "Guide markdown parser"
T4   feat/speculative-lab-library  "Vite multi-entry config + Vercel host-based rewrites"
T5   feat/speculative-lab-library  "Lab entry scaffolding + shell chrome"
T6   feat/speculative-lab-library  "Library index page + territory grid + guide cards"
T7   feat/speculative-lab-library  "Guide renderer chrome — orchestrator, header, tab bar, section nav"
T8   feat/speculative-lab-library  "Guide content components — section, paragraph, term, definition, figure"
T9   feat/speculative-lab-library  "Glossary view + guide viewer page"
T10  feat/speculative-lab-library  "JSX migration script + pilot run"
T11  feat/speculative-lab-library  "Guide content ingestion — batch JSX, HTML hand-conversion, UAPx draft conversion"
T12  feat/speculative-lab-library  "Accessibility audit + visual polish pass"
T13  feat/speculative-lab-library  "Analytics + roadmap update + ship"
```

## Handoff Notes for Tyrell

**Where to start:** T1, T2, T4 can all run in parallel immediately. If running solo, do T2 first (types are the keystone — T3, T6, T7, T8, T10 all depend on them). If running multi-agent via cmux / parallel sessions, claim T1 + T2 + T4 across three sessions and let T3 + T5 unblock downstream.

**Claiming tasks:** Each task has a unique layer + file scope. Tyrell in each session commits with the declared prefix (`tokens:`, `core:`, `feat:`, `chore:`, etc.). All commits land on `feat/speculative-lab-library` — no sub-branches needed at this scope. If cmux parallelism surfaces merge conflicts, the decomposition was wrong — flag it immediately.

**Gating per task:**
- After T1: lint + build pass, portfolio still renders
- After T2: `tsc --noEmit` pass
- After T3: `npm run test -- parse-guide` green, `npm run build` produces expected output with empty guide array
- After T4: portfolio still runs on `/`; `/labs.html` returns 404 in dev (fine, nothing there yet); production build emits warning about missing `labs.html` input (also fine, T5 adds it)
- After T5: `/labs.html` renders shell chrome; LibraryIndex stub shows placeholder
- After T6: library index renders territory sections; empty territories show empty-state copy
- After T7, T8: renderer renders a test guide stubbed in a story/fixture if helpful, OR wait for T9 + stub data
- After T9: navigating to `/g/<any-slug>` shows 404 (no guides yet) OR renders stub if a test guide exists
- After T10: pilot guide renders; visual parity with original JSX confirmed
- After T11: all 7 guides render; library index shows all cards; no parser warnings in console
- After T12: `/audit` report attached to commit message or PR description showing findings resolved
- After T13: production preview of `labs.justinh.design` passes smoke test; PR opens

**When to escalate to Justin:**
- Per-guide accent fails contrast after T12 — needs author decision on accent change or override strategy
- Migration script surfaces a structural pattern not in the plan's schema — may require schema extension
- Vercel Analytics shows unexpected behavior across subdomains — may need dashboard config
- Any ARCHITECTURE.md ambiguity surfaces — log in VECTOR.md open questions for Dreamer or invest-doctrine follow-up

**After merge:**
- Run `invest-architecture` to verify layer compliance
- Consider kicking off the next territory roadmap item based on `plans/roadmap.md`
- Pitch-worthy item for Director: first-of-kind content-as-data pipeline for academic-style long-form, shipped with zero architecture violations — good material for the meta case study when Justin is ready to write it
