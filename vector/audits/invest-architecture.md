# Architecture Audit

**Scope:** Full project — `core/`, `services/`, `src/`, `design-system/`
**Doctrine source:** ARCHITECTURE.md (last updated 2026-03-14, 72 days stale)
**Files scanned:** 115 source files (`*.ts`, `*.tsx`, `*.css`) excluding `node_modules`, `.claude/worktrees/`, and test files
**Run date:** 2026-05-25

---

> **Doctrine staleness warning.** ARCHITECTURE.md was last updated 2026-03-14. The project has shipped significant new structure since (Perihelion lab arm: `core/lab/`, `src/lab/`, `design-system/lab-tokens.css`; constellation system in `src/components/content/`; codex content type; multiple ADRs). The doctrine declares structure that no longer matches reality. Run `/invest-doctrine` to surface and resolve the drift before relying on this audit as a complete picture. Findings below are graded against what ARCHITECTURE.md currently declares — they will shift once the doctrine is brought current.

---

### Violations

#### DOCTRINE — high

- `ARCHITECTURE.md` — Project Structure tree omits `core/lab/` (8 source files: parser, types, guides data, territories, upcoming) and `src/lab/` (29 files: layouts, pages, guide + library components). These directories ship the second Vite entry per ADR-009 and are actively maintained.
- `ARCHITECTURE.md` — Project Structure tree omits `design-system/lab-tokens.css` (222 lines). Doctrine's layer rule names only `tokens.css` as the design-system file; lab-tokens.css coexists undocumented.
- `ARCHITECTURE.md` — Project Structure tree omits the constellation components (`src/components/content/Constellation*.tsx`) and several other src/ additions (`renderSection.tsx`, the constellation subfolder).
- `ARCHITECTURE.md` — Path aliases not documented anywhere in the doctrine; CLAUDE.md lists four (`@`, `@core`, `@services`, `@design-system`) and `vite.config.ts` actually configures a fifth (`@lab` → `./src/lab`) used in 29 files.
- `ARCHITECTURE.md` — Project Structure declares `services/api.ts`. File does not exist; only `analytics.ts` and `lastfm.ts` are present.
- `ARCHITECTURE.md` — Stack table declares "motion/react"; `package.json` ships the unified `motion` package. Wording is stale (functionally equivalent, but the doctrine reads as if a separate `motion/react` package is installed).
- `ARCHITECTURE.md` — ADR table stops at ADR-006. Reality is through ADR-010 (lab subdomain architecture, Perihelion rename).
- `VECTOR.md` — Hard constraint declares a "three-font system" (Space Grotesk, Didact Gothic, Podkova). `package.json` ships a fourth, `@fontsource/jetbrains-mono`, used as `--lab-mono-font` in `design-system/lab-tokens.css` and consumed by `src/lab/styles/lab.css`. Constraint and reality diverge.
- `VECTOR.md` — Hard constraint declares "Didact Gothic at weight 400 only". An active in-flight initiative (`polish/portfolio-visual-2026-05-17` branch + `plans/portfolio-visual-recalibration-brief.md`) supersedes this with a three-face stack. Doctrine has not been updated to reflect the recalibration direction.

#### LAYER — high

- `core/content/resume.ts:224` — `fetch('/1pageresume.md')` inside `getResumeModel()`. `core/` is declared as "No API calls, no DOM, no side effects." Move the fetch to a services/ helper (e.g. `services/resume.ts` returning the raw markdown text) and keep parsing pure in core/.

#### TOKENS — medium

- `core/lab/parse-guide.ts:34` — Hardcoded `const LAB_BG_HEX = '#0a0a0c'`. Used for WCAG contrast validation on guide accent colors. Source the value from a token surface (parallel to `core/tokens/index.ts` for the lab) rather than carrying a literal hex constant in core logic.

#### TOKENS — info (em-dash, VECTOR hard constraint)

- `core/content/ai-leadership.md:21` — em-dash in image alt text (`"Building with AI Tools — Anyone Can Do It"`). Hard constraint: "No em-dashes in copy." Alt text is user-visible / screen-reader-visible. Restructure or hyphenate.
- `core/content/ai-leadership.md:23` — em-dash in HTML comment alt-text placeholder. Same as above.

#### NAMING — low

- `src/components/content/renderSection.tsx` — camelCase `.tsx`. Doctrine: "Components: `PascalCase.tsx`." File exports a `renderSection` function and contains an internal `ChapterBreak` component, which also produces the pre-existing `react-refresh/only-export-components` lint warning. Either split into a `.ts` utility + a component file or rename and adjust exports.
- `src/lib/parseInline.tsx` — camelCase `.tsx`. Same convention question as renderSection. Utility that returns JSX; doctrine has no explicit rule for JSX-returning utilities.
- `src/lib/site-metadata.ts` — kebab-case `.ts`. Doctrine: "Utilities and pure logic: `camelCase.ts`." Rename to `siteMetadata.ts`.

#### SIZE — info (200-line soft constraint, animation/canvas/shader exempt per doctrine)

- `core/lab/parse-guide.ts` — 550 lines. Pure markdown parser; no canvas/WebGL exception applies.
- `core/content/parse-case-study.ts` — 297 lines.
- `src/components/content/ConstellationField.tsx` — 277 lines. SVG + spring-eased animation; plausibly exempt under the visual/animation exception.
- `src/components/content/ConstellationPage.tsx` — 252 lines.
- `core/content/constellation.ts` — 249 lines.
- `core/content/resume.ts` — 243 lines.
- `src/components/content/ConstellationContent.tsx` — 214 lines.
- `core/tokens/index.ts` — 208 lines. Token data export.
- `src/pages/AboutPage.tsx` — 207 lines.

**Exempt under the canvas/WebGL/shader exception:**

- `src/components/effects/ProfileCard.tsx` (431 lines, holographic gradient effect)
- `src/components/effects/Particles.tsx` (246, WebGL via `ogl`)
- `src/components/effects/Threads.tsx` (209, WebGL shader)
- `src/components/effects/ParticlesTuner.tsx` (203, particle-tuning dev surface)

### Clean categories

- **IMPORT direction:** No violations found. `core/` does not import from `src/`, `services/`, or `design-system/`. `services/` does not import from `src/` or `design-system/`. All `src/lab/` imports traverse valid aliases (`@core/lab/`, `@lab/`, relative).
- **STATE management:** No violations. Project uses Context + hooks for shared state and `useState` for UI-only state. No `redux`, `zustand`, `jotai`, `recoil`, or `valtio` imports.
- **TOKENS in components (default Tailwind palette):** No violations. No `red-500`-style default-palette classes in `src/`.
- **TOKENS in effects (hardcoded color literals):** Only `ProfileCard.tsx` carries internal `hsl()` / hex constants for its holographic gradient — covered by the doctrine's explicit exception for "copy-paste effect components (canvas, WebGL, holographic gradients)."
- **Font families outside tokens:** No `font-family` declarations outside `design-system/` and the lab style entry — all references resolve through CSS variables.

### Summary

- **High:** 10 (9 doctrine drift, 1 layer)
- **Medium:** 1 (tokens)
- **Low:** 3 (naming)
- **Info:** 11 (2 em-dash, 9 file size)

**Architecture health:** NEEDS ATTENTION

The single concrete layer violation (`fetch` in `core/content/resume.ts`) is the clearest correctness gap. Most of the weight in this report is doctrine drift — ARCHITECTURE.md and VECTOR.md no longer describe the project that exists. Recommend `/invest-doctrine` next to bring the doctrine current, then re-run this audit against the updated rules. The naming and size findings are convenience-grade and can ride along with the next refactor in the affected area.
