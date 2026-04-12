# Mission: Codex v1 Spine Layout

**Feature:** Meta case study renders with a vertical spine and expandable chapter nodes instead of a linear section scroll, making 7 chapters navigable with multi-open expand/collapse.
**Date:** 2026-04-05
**Doctrine source:** ARCHITECTURE.md (2026-03-14), CLAUDE.md, VECTOR.md
**Build plan:** `plans/codex-v1-build-plan.md`

## Constraint Check

**VECTOR.md constraints applied:**
- Token colors only: All codex tokens reference existing CSS variables. No new raw color values.
- WCAG 2.2 AA: Spine nodes are `<button>` elements with `aria-expanded`, `aria-controls`. Chapters have `role="region"` with `aria-labelledby`. `prefers-reduced-motion` snaps transitions.
- Four-layer architecture: Each task touches exactly one layer. No cross-layer violations.
- No heavy dependencies: Zero new npm packages. CSS-only animations via `grid-template-rows`.
- No em-dashes in copy: No content changes in this feature.

**No violations found.**

## Tasks

### T1: Codex design tokens
**Layer:** Design System (`design-system/tokens.css`)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `feat(tokens):`
**Inputs:** None -- can start immediately
**Outputs:** CSS custom properties (`--codex-spine-*`, `--codex-node-*`) available to UI components
**Scope boundary:** This task does NOT touch core/, services/, or src/. Only adds new variables to tokens.css. Does not modify existing token values.

Files:
- `design-system/tokens.css`: Add codex spine section with 8 new CSS variables

---

### T2: Codex core types and parser
**Layer:** Core Logic (`core/content/`)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `feat(core):`
**Inputs:** None -- can start immediately (parallel with T1)
**Outputs:** `CodexChapter` interface, `codexOverrides` map, `groupIntoChapters()` function exported from `core/content/codex.ts`
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Does not modify `parse-case-study.ts` or `case-studies.ts`. Pure functions only, no DOM.

Files:
- `core/content/codex.ts` (new): `CodexChapter` type, `codexOverrides` map, `groupIntoChapters()` function
- `core/content/codex.test.ts` (new): Tests for `groupIntoChapters()` -- verify preamble extraction, chapter splitting, id generation, default inscription derivation, override application

---

### T3: Case study metadata flag
**Layer:** Core Logic (`core/tokens/`)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `feat(core):`
**Inputs:** None -- can start immediately (parallel with T1, T2)
**Outputs:** `template` field on `CaseStudy` interface, `metaCaseStudy` set to `'codex'`
**Scope boundary:** This task does NOT touch design-system/, services/, or src/. Only modifies the `CaseStudy` interface and `metaCaseStudy` object in `core/tokens/index.ts`. Does not change any other case study data.

Files:
- `core/tokens/index.ts`: Add `template?: 'standard' | 'codex'` to `CaseStudy` interface, set `template: 'codex'` on `metaCaseStudy`

---

### T4: Extract renderSection to shared module
**Layer:** UI (`src/components/content/`)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `refactor(ui):`
**Inputs:** None -- can start immediately (parallel with T1, T2, T3)
**Outputs:** `renderSection` function exported from `src/components/content/renderSection.tsx`, `CaseStudyPage.tsx` imports from it instead of defining inline
**Scope boundary:** This task does NOT touch design-system/, core/, or services/. Zero behavior change. The extracted function is identical to the current inline version. Existing case study rendering must remain pixel-identical.

Files:
- `src/components/content/renderSection.tsx` (new): Extracted `renderSection` function with all imports
- `src/components/content/CaseStudyPage.tsx`: Remove inline `renderSection`, import from `renderSection.tsx`

---

### T5: Codex UI components
**Layer:** UI (`src/components/content/`)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `feat(ui):`
**Inputs:** T1 (tokens), T2 (core types + parser), T4 (shared renderSection)
**Outputs:** Four new components: `CodexChapter`, `CodexNode`, `CodexSpine`, `CodexPageTemplate`
**Scope boundary:** This task does NOT touch design-system/, core/, or services/. Components import from core/ and use token CSS variables but do not modify them. Does not modify existing components. Does not wire into the page router (that is T6).

Files (build order: bottom-up):
- `src/components/content/CodexChapter.tsx` (new): Expandable panel with `grid-template-rows` collapse, maps sections through `renderSection`, accepts `connections` prop (not rendered in v1)
- `src/components/content/CodexNode.tsx` (new): Clickable `<button>` with chapter number/glyph slot, title, inscription, `aria-expanded`/`aria-controls`, active state styling
- `src/components/content/CodexSpine.tsx` (new): Vertical line + maps chapters to node/chapter pairs, manages `openChapters: Set<string>` state, responsive layout (spine left on desktop, thin border on mobile)
- `src/components/content/CodexPage.tsx` (new): Hero (reused markup) + preamble + `CodexSpine`. Consumes `groupIntoChapters()` output.

---

### T6: Template switch wiring
**Layer:** UI (`src/pages/`)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `feat(ui):`
**Inputs:** T3 (metadata flag), T5 (codex components)
**Outputs:** Meta case study renders with codex template, all other case studies render unchanged
**Scope boundary:** This task does NOT touch design-system/, core/, or services/. Only modifies the page-level routing component. Does not change URL structure or SEO metadata.

Files:
- `src/pages/CaseStudyPage.tsx`: Import `CodexPageTemplate`, conditional render based on `study.template`

---

### T7: Quality gate
**Layer:** All (read-only verification)
**Owner:** Builder (Tyrell)
**Branch:** `feature/codex-v1`
**Commit prefix:** `fix:` (if fixes needed)
**Inputs:** T6 (all implementation complete)
**Outputs:** Clean lint, clean build, a11y verified
**Scope boundary:** May touch any layer to fix issues found during verification. No new features.

Checks:
- `npm run lint` passes with no warnings
- `npm run build` succeeds
- `npm run test` passes (including new codex.test.ts)
- Token colors only -- no raw hex values in new files
- Heading hierarchy correct (one h1, heading levels in order)
- `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` all present
- `prefers-reduced-motion` disables grid-template-rows transition
- Responsive: spine left on sm+, thin border on mobile
- All existing case studies render unchanged (regression check)

## Execution Order

```
Parallel (start immediately): T1, T2, T3, T4
After T1 + T2 + T4:          T5
After T3 + T5:                T6
After T6:                     T7
```

**Critical path:** T2 -> T5 -> T6 -> T7 (4 sequential tasks)

Since all tasks are owned by a single agent (Builder), the parallel tasks (T1-T4) execute sequentially in practice but have no dependency ordering between them. Recommended sequence: T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7 (follows architecture order: tokens > core > UI refactor > UI new > wiring > verify).

## Done State

This feature is complete when:
- [ ] Meta case study at `/work/building-this-portfolio` renders with vertical spine and 7 expandable chapters
- [ ] All other case studies render unchanged (standard linear template)
- [ ] Spine nodes show chapter number + title + auto-derived inscription
- [ ] Multi-open expand/collapse works with `grid-template-rows` animation
- [ ] Preamble (intro paragraph) renders above the spine
- [ ] Mobile layout collapses spine to thin left border
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] WCAG 2.2 AA: buttons with aria-expanded, regions with aria-labelledby, prefers-reduced-motion respected
- [ ] Token colors only in all new files
- [ ] All changes merged to main via PR from `feature/codex-v1`
