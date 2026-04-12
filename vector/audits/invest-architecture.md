## Architecture Audit

**Scope:** Full project (core/, services/, src/, design-system/)
**Doctrine source:** ARCHITECTURE.md (last updated 2026-03-14)
**Files scanned:** 64

### Violations

#### LAYER — high
- `core/utils/parseInline.tsx:1` — Imports `React` and renders JSX with Tailwind classes. Core layer must be pure functions with no DOM and no side effects. This file belongs in `src/` (UI layer), not `core/`.

#### NAMING — low
- `core/utils/parseInline.tsx` — Uses `.tsx` extension in core layer. Core files should be `.ts` (pure logic). The `.tsx` extension confirms this file contains JSX and is misplaced.

#### SIZE — info
- `src/components/effects/ProfileCard.tsx` — 555 lines. Doctrine limit is 200. Exempted: self-contained visual/animation component (holographic effect).
- `src/components/effects/Waves.tsx` — 300 lines. Doctrine limit is 200. Exempted: self-contained WebGL shader component.
- `src/components/effects/Particles.tsx` — 246 lines. Doctrine limit is 200. Exempted: self-contained WebGL component.
- `src/components/content/CaseStudyPage.tsx` — 222 lines. Doctrine limit is 200. Not a visual/animation component — contains `renderSection` + `CaseStudyPageTemplate`. Consider splitting `renderSection` into its own file.
- `src/components/effects/Threads.tsx` — 209 lines. Doctrine limit is 200. Exempted: self-contained GLSL shader component.

#### DOCTRINE — info
- `ARCHITECTURE.md` project structure tree is out of date. Missing files: `core/utils/parseInline.tsx`, `src/lib/useTheme.ts`. These were added during the 2026-04-11 audit session but the structure tree was not updated.

### Summary
- High: 1 | Medium: 0 | Low: 1 | Info: 3
- Architecture health: **NEEDS ATTENTION** (1 layer violation)
