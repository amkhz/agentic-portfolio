# Mission: Constellation Field

**Feature:** The meta case study ("Building This Portfolio") renders as a spatial constellation of thematic nodes that users navigate by clicking stars in a 2D field, with full-page content views and inline connection peeks between related topics.
**Date:** 2026-04-12
**Doctrine source:** ARCHITECTURE.md, CLAUDE.md, VECTOR.md
**Plan:** plans/meta-case-study-field.md

## Constraint Check

- **Token colors only**: All constellation visuals use CSS variables referencing theme tokens. No raw hex values.
- **WCAG 2.2 AA**: DOM-based nodes (not canvas), keyboard navigation, ARIA labels, focus management, prefers-reduced-motion fallbacks.
- **Four-layer architecture**: Tokens in design-system/, data model + content in core/, no services needed, UI in src/.
- **No heavy deps**: Layout algorithm is hand-written (~50 lines), no force-directed library. Transitions use existing motion/react dependency.
- **Three-font system**: No new fonts. Constellation labels use Space Grotesk (heading), inscriptions use Didact Gothic (body).
- **Didact Gothic 400 only**: Verified -- no bold body text in constellation UI.

**No violations found.**

## Tasks

### T1: Constellation design tokens
**Layer:** design-system (`design-system/tokens.css`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `tokens:`
**Inputs:** None -- can start immediately
**Outputs:** CSS custom properties for node sizes, line colors, glow states, borders. Light mode overrides.
**Scope boundary:** This task does NOT touch core/, services/, or src/. Only adds new variables to tokens.css within the existing `@layer theme` block.

**Details:**
- Add `--constellation-*` variables to `:root` (dark mode)
- Add matching overrides to `[data-theme="light"]`
- All values reference existing `--theme-*` tokens

---

### T2: Core data model and layout algorithm
**Layer:** core (`core/content/constellation.ts`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `core:`
**Inputs:** None -- can start immediately (parallel with T1)
**Outputs:** `ConstellationNode`, `ConnectionPeek`, `ConstellationData` types. `buildConstellationLayout()` function that computes node positions with algorithmic base + randomness + per-node offset overrides. Node definitions for all 5 v1 nodes with connections.
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Pure types and functions. No DOM.

**Details:**
- Interfaces as specified in the plan
- Layout function: normalized 0-1 positions, radial distribution from center node (The Sprint), with configurable jitter and per-node offset overrides
- Node definitions: the-sprint (lg, shipped), the-material (md, shipped), the-structure (md, shipped), the-process (md, shipped), the-craft (md, active)
- Planned nodes as data: the-lab (sm, planned), the-sound (sm, planned), the-system (sm, planned)
- Unit tests for layout function and node validation

---

### T3: Content restructure -- Sprint, Material, Structure, Process
**Layer:** core (`core/content/`)
**Owner:** Writer
**Branch:** `feature-newcodex`
**Commit prefix:** `content:`
**Inputs:** None -- can start immediately (parallel with T1, T2)
**Outputs:** Restructured markdown content split into thematic nodes. One file: `building-this-portfolio.md` rewritten with node delimiters. Connection peek directives (`:::peek`) embedded at natural breakpoints (1-2 per node, 3 max).
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Content only. Does not modify the parser (T4 handles that). Does not create The Craft node (T3b handles that).

**Details:**
- The Sprint (~1000 words): Combines Setup + Build + Friction + "What Came Next". Tightened.
- The Material (~600 words): Color Migration + Texture System + Design Context
- The Structure (~600 words): Framework Migration + Investiture adoption
- The Process (~700 words): Agentic Workflow expanded with skills ecosystem
- Node delimiter syntax: `<!-- node:the-sprint -->` before each node's content
- 1-2 peek directives per node, e.g., `:::peek the-material\nThis decision made the color migration possible.\n:::`

---

### T3b: Content -- The Craft (separate file)
**Layer:** core (`core/content/the-craft.md`)
**Owner:** Writer
**Branch:** `feature-newcodex`
**Commit prefix:** `content:`
**Inputs:** None -- can start immediately (parallel with T3)
**Outputs:** New markdown file `the-craft.md` (~500 words). The quality story: audit/polish pass, accessibility rigor, wabi-sabi philosophy. 1-2 peek directives.
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Does not modify building-this-portfolio.md (T3 handles that).

---

### T4: Parser extension for peek directives and node delimiters
**Layer:** core (`core/content/parse-case-study.ts`, `core/content/constellation.ts`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `core:`
**Inputs:** T2 (needs `ConnectionPeek` type), T3 (needs content with peek syntax to test against)
**Outputs:** Extended `parseCaseStudyMarkdown` that handles `:::peek` blocks. New `PeekSection` type added to `CaseStudySection` union. New `parseConstellationContent()` that splits a markdown file on node delimiters and returns per-node section arrays. Unit tests.
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Parser logic only.

**Details:**
- New section type: `PeekSection = { type: 'peek'; targetId: string; tease: string; }`
- Add `PeekSection` to `CaseStudySection` union
- Add `peek` case to the fence block switch in `parseCaseStudyMarkdown`
- New function `parseConstellationContent(markdown: string): Record<string, CaseStudySection[]>` that splits on `<!-- node:id -->` delimiters
- Tests: peek parsing, node splitting, edge cases (no delimiters, empty nodes)

---

### T5: Case study metadata update
**Layer:** core (`core/tokens/index.ts`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `core:`
**Inputs:** None -- can start immediately
**Outputs:** `template` field value `'constellation'` on `metaCaseStudy`. Updated subtitle and hero metric to reflect the living system framing (no longer "48 hours").
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Only modifies the metaCaseStudy object.

**Details:**
- Change `template` from `'codex'` to `'constellation'`
- Update subtitle to reflect living system concept
- Move "48 hours" metric to Sprint node inscription (data lives in T2's node definitions)
- New hero metric TBD -- could be node count, evolution timespan, or removed entirely

---

### T6: UI -- ConnectionPeek component
**Layer:** src (`src/components/content/ConnectionPeek.tsx`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `feat:`
**Inputs:** T1 (tokens), T2 (node data for peek targets)
**Outputs:** `ConnectionPeek` component that renders an inline peek element: node marker, title, inscription, tease text. Clickable. Accessible.
**Scope boundary:** This task does NOT touch core/, design-system/, or services/. Imports from core/ only.

---

### T7: UI -- ConstellationNode component
**Layer:** src (`src/components/content/ConstellationNode.tsx`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `feat:`
**Inputs:** T1 (tokens), T2 (node types)
**Outputs:** `ConstellationNode` component: positioned marker with title, inscription on hover/focus. Visual states for shipped/active/planned. Button with aria-expanded.
**Scope boundary:** This task does NOT touch core/, design-system/, or services/.

---

### T8: UI -- ConstellationContent (full-page node view)
**Layer:** src (`src/components/content/ConstellationContent.tsx`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `feat:`
**Inputs:** T4 (parsed content with peeks), T6 (ConnectionPeek component)
**Outputs:** Full-page content view for a selected node. Back-to-field navigation. Renders sections via existing renderSection + ConnectionPeek for peek sections. Related nodes footer as secondary navigation.
**Scope boundary:** This task does NOT touch core/, design-system/, or services/.

**Details:**
- Extends or wraps existing `renderSection` to handle the new `peek` section type
- Back button is first focusable element
- Focus management: focus moves to content area on open

---

### T9: UI -- ConstellationField (the starfield)
**Layer:** src (`src/components/content/ConstellationField.tsx`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `feat:`
**Inputs:** T1 (tokens), T2 (layout data), T7 (ConstellationNode)
**Outputs:** The 2D field container. Renders nodes at computed positions. SVG connection lines between related nodes. Hover highlighting. Responsive: compressed cluster on mobile.
**Scope boundary:** This task does NOT touch core/, design-system/, or services/.

**Details:**
- Relatively positioned container, nodes absolutely positioned via transform
- SVG layer for connection lines (aria-hidden)
- Hover state: highlight connections for hovered node
- Mobile: tighter positions, simplified connections
- 44px minimum touch targets

---

### T10: UI -- ConstellationPage (template + wiring)
**Layer:** src (`src/components/content/ConstellationPage.tsx`, `src/pages/CaseStudyPage.tsx`)
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `feat:`
**Inputs:** T5 (metadata), T8 (ConstellationContent), T9 (ConstellationField)
**Outputs:** Page template that manages state: field view vs. content view. Hash-based routing. Auto-opens The Sprint for first-time visitors. Transitions between states (motion/react). Template switch wiring in CaseStudyPage.
**Scope boundary:** This task does NOT touch core/, design-system/, or services/.

**Details:**
- Selected node state: `useState<string | null>`, initialized from URL hash
- Hash sync: update hash on node select, read hash on mount
- Auto-open The Sprint when no hash present
- Transition: field fades/scales, content fades in (~500ms spring)
- prefers-reduced-motion: instant opacity swap
- Template switch: `study.template === 'constellation'` in CaseStudyPage.tsx

---

### T11: Quality gate
**Layer:** All
**Owner:** Builder
**Branch:** `feature-newcodex`
**Commit prefix:** `chore:`
**Inputs:** All previous tasks complete
**Outputs:** Clean lint, clean build, visual verification in both themes, responsive check, a11y check.
**Scope boundary:** This task only runs verification. No new features.

**Details:**
- `npm run lint` -- zero errors
- `npm run build` -- clean production build
- `npm run test` -- all tests pass including new constellation tests
- Visual review: dark mode, light mode, mobile, desktop
- Keyboard navigation: tab through field nodes, enter to select, escape/back to return
- Screen reader: verify constellation reads as navigation menu
- Heading hierarchy: one h1 (page title), h2 for node titles in content view

---

## Execution Order

```
Parallel (start immediately):
  T1  (tokens)
  T2  (data model + layout)
  T3  (content restructure -- Sprint, Material, Structure, Process)
  T3b (content -- The Craft, separate file)
  T5  (metadata update)

After T2 + T3:
  T4  (parser extension)

After T1 + T2:
  T6  (ConnectionPeek component)
  T7  (ConstellationNode component)

After T4 + T6:
  T8  (ConstellationContent)

After T1 + T2 + T7:
  T9  (ConstellationField)

After T5 + T8 + T9:
  T10 (ConstellationPage + wiring)

After T10:
  T11 (quality gate)
```

**Critical path:** T2 → T4 → T8 → T10 → T11 (5 sequential tasks)

## Done State

This feature is complete when:
- [ ] Visiting `/work/building-this-portfolio` shows the constellation field with 5 nodes
- [ ] First-time visitors (no hash) auto-open The Sprint content
- [ ] Clicking any node transitions to its full-page content view
- [ ] Connection peeks appear inline within content and navigate to related nodes
- [ ] Returning to the field from content view works (back button / explicit link)
- [ ] Hash-based URLs work: `#the-material` opens that node directly
- [ ] Node visual states render correctly: shipped (solid), active (pulse), planned (dim)
- [ ] Mobile renders a compressed constellation with 44px touch targets
- [ ] Both dark and light themes render correctly
- [ ] `npm run lint` passes with zero errors
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes (including new constellation tests)
- [ ] WCAG 2.2 AA: keyboard navigation, ARIA labels, focus management, reduced motion
- [ ] Heading hierarchy: one h1, h2s for node content titles
- [ ] Token colors only throughout
- [ ] All tasks on `feature-newcodex` branch

## Flat Task List

T1   feature-newcodex "Constellation design tokens"
T2   feature-newcodex "Core data model and layout algorithm"
T3   feature-newcodex "Content restructure -- Sprint, Material, Structure, Process"
T3b  feature-newcodex "Content -- The Craft (separate file)"
T4   feature-newcodex "Parser extension for peek directives and node delimiters"
T5   feature-newcodex "Case study metadata update"
T6   feature-newcodex "ConnectionPeek component"
T7   feature-newcodex "ConstellationNode component"
T8   feature-newcodex "ConstellationContent (full-page node view)"
T9   feature-newcodex "ConstellationField (the starfield)"
T10  feature-newcodex "ConstellationPage (template + wiring)"
T11  feature-newcodex "Quality gate"
