## Doctrine Audit

**Files audited:** VECTOR.md, CLAUDE.md, ARCHITECTURE.md
**Project stage:** development
**Audit date:** 2026-03-14

### Findings

#### INCOMPLETE -- high

- `ARCHITECTURE.md:Project Structure` -- The structure tree does not declare `core/content/lastfm.ts`, `services/lastfm.ts`, `src/lib/useNowPlaying.ts`, `src/components/interactive/NowPlaying.tsx`, or any of the Markdown case study files in `core/content/` (e.g., `ai-leadership.md`, `instant-doc-review.md`, `instant-sow.md`, `building-this-portfolio.md`). The tree has fallen significantly behind the codebase.
- `ARCHITECTURE.md:Stack` -- Does not mention `motion` (Framer Motion), `ogl`, `clsx`, or `tailwind-merge`, all of which are production dependencies. The stack table is incomplete for a project in development stage.
- `ARCHITECTURE.md:Project Structure` -- Does not declare `src/components/ScrollToTop.tsx` (a file sitting at the components root, outside any subdirectory).

#### CONTRADICTION -- high

- `VECTOR.md:What This Is Not` says "Not server-rendered. No backend, no API routes, no database. Pure client-side SPA deployed as static files." `VECTOR.md:Ship Criteria` says "All pages have proper SEO metadata via react-helmet-async." Client-side `react-helmet-async` cannot provide SEO metadata to crawlers that do not execute JavaScript. These two claims are in tension -- the SPA constraint limits the SEO promise.
- `VECTOR.md:Constraints` says "Didact Gothic weight 400 only." The codebase uses `font-bold`, `font-semibold`, `font-medium` extensively (30+ instances across components). These Tailwind classes apply font-weight 500/600/700 and will have no visible effect on Didact Gothic (which only ships weight 400), but they apply to other fonts in the stack (`Space Grotesk Variable`, `Podkova`) which the doctrine does not acknowledge. The constraint is either too narrow (should say "Didact Gothic weight 400 only; other fonts may use their available weights") or the codebase is violating it.
- `CLAUDE.md:Technical Patterns` says "Vite 6." `package.json` has `"vite": "^6.0.0"` which resolves to Vite 6.x. This is currently consistent, but the caret range means it could drift to Vite 7 without the doctrine updating. Minor, noted for precision.

#### STRUCTURE -- high/medium

- **Declared but missing (high):** `ARCHITECTURE.md` declares `core/utils/format.ts` and `core/utils/index.ts`. Both exist. `ARCHITECTURE.md` declares `services/analytics.ts` and `services/api.ts`. Both exist. No declared-but-missing directories found.
- **Exists but undeclared (medium):** `core/content/parse-case-study.ts` -- parser module not in structure tree. `core/content/lastfm.ts` -- Last.fm data types not in structure tree. `core/content/ai-leadership.md`, `core/content/instant-doc-review.md`, `core/content/instant-sow.md`, `core/content/building-this-portfolio.md` -- four Markdown case study files in core/content not declared anywhere. `core/content/case-studies.test.ts` and `core/tokens/tokens.test.ts` and `core/utils/utils.test.ts` -- test files not shown in structure tree. `services/lastfm.ts` -- Last.fm service not in structure tree. `src/lib/useNowPlaying.ts` -- custom hook not in structure tree. `src/components/effects/CountUp.tsx`, `DecryptedText.tsx`, `ProfileCard.tsx`, `Particles.tsx`, `ParticlesTuner.tsx`, `SpotlightCard.tsx`, `Threads.tsx`, `Waves.tsx` -- eight effects components not listed (tree only names `GlowEffect`, `GrainOverlay`, `RevealOnScroll` as comments). `src/components/interactive/NowPlaying.tsx`, `ThemeToggle.tsx` -- two interactive components not listed (tree only names `Button`, `Tag`, `ThemeToggle`; NowPlaying missing). `src/components/content/AboutSnippet.tsx` -- not listed. `public/og/` -- empty directory.
- **Empty declared directories (info):** `public/og/` exists but is empty. All `vector/research/` subdirectories (`assumptions/`, `competitive/`, `interviews/`, `jtbd/`, `personas/`) contain only `.gitkeep` files.

#### DRIFT -- medium

- **Stack drift:** `package.json` includes `motion` (^12.35.1) and `ogl` (^1.0.11) as production dependencies. `ARCHITECTURE.md:Stack` does not list either. These are significant libraries powering the animation/effects layer. The doctrine does not account for them.
- **Stack drift:** `package.json` includes three font packages (`@fontsource-variable/space-grotesk`, `@fontsource/didact-gothic`, `@fontsource/podkova`). The doctrine only mentions Didact Gothic. Space Grotesk and Podkova are used but undocumented.
- **Convention drift:** `VECTOR.md:Constraints` says "No em-dashes in copy." One em-dash found in `src/components/effects/ProfileCard.tsx` line 503 (in a comment, not user-facing copy). Borderline -- the constraint likely means user-facing text, but the comment contains one.
- **Token drift:** `ProfileCard.tsx` uses hardcoded hex values (`#0e152e`) in three places (lines 406, 410, 411) instead of token-based CSS variables. This violates the "token colors only" constraint.
- **File size drift:** `ProfileCard.tsx` is 555 lines, `Waves.tsx` is 300 lines, `Particles.tsx` is 246 lines, `Threads.tsx` is 209 lines. The soft constraint is "files under 200 lines." Four files exceed this, one by nearly 3x.
- **Layer drift:** `src/lib/useNowPlaying.ts` is a custom hook that wraps a service call. ARCHITECTURE.md's structure tree shows `src/lib/` containing only `site-metadata.ts`. The `lib/` subdirectory has grown without being documented, and its architectural role (hooks that bridge services to UI) is not defined.

#### GAP -- low

- `VECTOR.md:Research Status` references file paths (`./core/content/case-studies.ts`, `./core/content/resume.ts`, `./design-system/tokens.css`) that are correct but uses a different notation than ARCHITECTURE.md's structure tree. Minor, but could confuse readers.
- `ARCHITECTURE.md:Naming` covers components (PascalCase.tsx), utilities (camelCase.ts), and CSS (kebab-case.css) but does not address Markdown files in `core/content/` (kebab-case.md), test files (`*.test.ts`), or hook files (`use*.ts`).
- `ARCHITECTURE.md:Decisions` table lists ADRs 000 and 001 but `vector/decisions/` contains ADR-003 and ADR-004 as well. The table has not been updated.
- `CLAUDE.md` does not reference ARCHITECTURE.md paths or override any conventions, so no path-existence issues, but its Stack section (`React 19 + Vite 6 + TypeScript strict + Tailwind v4 + Vitest + react-router v7`) omits `motion`, `ogl`, and `react-helmet-async` -- same gap as ARCHITECTURE.md.

#### PLACEHOLDER -- info

- `VECTOR.md:Research Status` -- Competitive Analysis and Accessibility Audit are "Not started." Expected at this stage but worth noting as the project approaches ship criteria (Lighthouse accessibility 95+).

### Summary

- Critical: 0 | High: 4 | Medium: 6 | Low: 4 | Info: 2
- Doctrine health: **GAPS FOUND**

### Recommended Actions

1. **Update `ARCHITECTURE.md:Project Structure` tree and `Stack` table.** The structure tree is missing 15+ files and the stack table omits `motion`, `ogl`, and the full font stack. This is the single largest gap -- `invest-architecture` cannot audit against an outdated structure tree. Add the Last.fm integration files, all effects components, Markdown case study files, test file conventions, and the `motion`/`ogl` dependencies.

2. **Clarify the Didact Gothic weight constraint in `VECTOR.md:Constraints`.** The codebase uses three fonts, not one. The constraint "Didact Gothic weight 400 only" is true for that font but misleading -- `font-semibold` and `font-bold` classes are used throughout for Space Grotesk and Podkova. Rewrite to: "Didact Gothic at weight 400 only. Space Grotesk and Podkova may use their available weight range."

3. **Fix hardcoded hex values in `ProfileCard.tsx`.** Three instances of `#0e152e` violate the "token colors only" constraint. Extract to a CSS variable in `design-system/tokens.css` and reference it via token class or `var()`. This is the only concrete token violation found on disk.
