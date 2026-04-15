# Code Quality Audit

**Date:** 2026-04-14
**Target:** agentic-portfolio (justinh.design)
**Overall Classification:** SIGNIFICANT DEBT

## Summary Metrics
- Files audited: 95
- Critical findings: 3
- Significant findings: 8
- Minor findings: 6
- Dead code files: 2 (Waves.tsx, api.ts)
- Dead exports: 4 (getConnections, formatDate, truncate, debounce)
- Monolith flags (>500 lines): 1 (ProfileCard.tsx at 556 lines)

---

## Critical Findings

**1. Resume page has no error handling**
- `src/pages/ResumePage.tsx:14-16` — `getResumeModel().then(setResume)` with no `.catch()`. If `/1pageresume.md` fails to load, user sees an infinite loading skeleton. No error state, no feedback.
- `core/content/resume.ts:223-225` — `getResumeModel()` does not check `response.ok` before calling `.text()`. A 404 throws but nothing catches it upstream.

**2. Dependency vulnerabilities (npm audit)**
- `vite <=6.4.1` — HIGH: path traversal in `.map` handling, arbitrary file read via WebSocket (dev server only, not production-facing)
- `picomatch 4.0.0-4.0.3` — HIGH: ReDoS via extglob quantifiers, method injection in POSIX character classes
- `flatted <=3.4.1` — HIGH: unbounded recursion DoS in parse(), prototype pollution
- `brace-expansion` — MODERATE: zero-step sequence causes hang
- All fixable via `npm audit fix`

**3. ProfileCard.tsx is a 556-line god component**
- `src/components/effects/ProfileCard.tsx` — Embeds a TiltEngine class (150+ lines of pointer math), device orientation handling, CSS variable management, holographic shader effects, grain overlays, glow effects, and responsive behavior. 16 props, 11 hooks. Should be decomposed but works correctly as-is.

---

## Significant Findings

**4. Waves.tsx is entirely dead code (301 lines)**
- `src/components/effects/Waves.tsx` — Fully implemented canvas wave animation with embedded Perlin noise class. Imported nowhere. 301 lines providing zero value.

**5. services/api.ts is dead infrastructure**
- `services/api.ts` — Generic HTTP client exporting `get`, `post`, `put`, `del`. None are imported anywhere. 44 lines of unused code.

**6. Waves.tsx has a memory leak in resize listener (moot since dead, but noting)**
- `src/components/effects/Waves.tsx:281,286` — `addEventListener` and `removeEventListener` use different anonymous function references. Cleanup never actually removes the listener.

**7. Last.fm API response shape is not validated**
- `services/lastfm.ts:37-45` — No validation that `data?.recenttracks?.track` exists or is an array before accessing. Could crash on unexpected API response shapes.

**8. useNowPlaying fires initial poll regardless of tab visibility**
- `src/lib/useNowPlaying.ts:31` — `poll()` fires on mount even if tab is hidden. Subsequent polls correctly check `document.hidden`, but first fetch is unconditional.

**9. .env.example is incomplete**
- `.env.example` — Missing `VITE_LASTFM_API_KEY` and `VITE_LASTFM_USER` (both required by `services/lastfm.ts`). Only documents `VITE_SITE_URL` and `VITE_API_URL`.

**10. core/tokens/index.ts mixes design tokens with case study metadata**
- `core/tokens/index.ts` — 306 lines conflating design tokens (colors, typography, spacing) with domain data (caseStudies array, metaCaseStudy). Case study metadata belongs in `core/content/`.

**11. ARCHITECTURE.md references outdated directory structure**
- `ARCHITECTURE.md:82-89` — References `/.agents/` directory and retired builder skill. Actual skills live in `.claude/skills/` per Investiture v1.5. Documentation drift, not functional.

---

## Minor Findings

**12. Duplicate filename: CaseStudyPage.tsx**
- `src/pages/CaseStudyPage.tsx` and `src/components/content/CaseStudyPage.tsx` share the same filename. Different exports (`CaseStudyPage` vs `CaseStudyPageTemplate`) but confusing. The component version should be renamed to match the `Template` export.

**13. Four unused utility exports**
- `core/content/constellation.ts` — `getConnections()` exported but never called
- `core/utils/format.ts` — `formatDate()`, `truncate()`, `debounce()` exported but never imported outside tests

**14. SpotlightCard inline style object recreated every render**
- `src/components/effects/SpotlightCard.tsx:57-60` — Style object with radial gradient is rebuilt on every mouse move. Could use CSS variables for smoother updates.

**15. Missing security headers in vercel.json**
- `vercel.json` — Only has rewrites. Missing `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` headers.

**16. No CI/CD pipeline**
- No `.github/workflows/` directory. Build and lint gates exist locally but are not enforced on push or PR.

**17. generate-favicons.ts and generate-sitemap.ts unreferenced**
- `scripts/generate-favicons.ts` and `scripts/generate-sitemap.ts` are not wired into any npm script. May be run manually but not documented.

---

## Dead Code

| Item | Location | Lines | Type |
|------|----------|-------|------|
| Waves component | `src/components/effects/Waves.tsx` | 301 | Entire file unused |
| API service | `services/api.ts` | 44 | All exports unused |
| getConnections() | `core/content/constellation.ts:246-255` | 10 | Unused export |
| formatDate() | `core/utils/format.ts:1-5` | 5 | Unused export |
| truncate() | `core/utils/format.ts:13-16` | 4 | Unused export |
| debounce() | `core/utils/format.ts:18-29` | 12 | Unused export |

---

## Commendations

1. **Excellent reduced-motion compliance.** Every effect component (Particles, Threads, ProfileCard, RevealOnScroll, CountUp, DecryptedText, SpotlightCard) properly checks and respects `prefers-reduced-motion`. This is rare and shows genuine accessibility commitment.

2. **Clean four-layer architecture.** No circular imports detected. Import direction is strictly enforced: services -> core, src -> core/services/design-system. No component fetches data directly. The layer separation is real, not aspirational.

3. **Strong test coverage on core logic.** Five test suites covering content parsing, token validation, utility functions, constellation layout, and codex grouping. Tests verify contracts and edge cases, not just happy paths.

4. **Thoughtful WebGL cleanup.** Particles.tsx, Threads.tsx, and ProfileCard.tsx all properly clean up canvas contexts, animation frames, and event listeners on unmount. This is easy to get wrong and they got it right.

5. **Zero TODO/FIXME/HACK comments.** The codebase is clean of deferred work markers. Features are either complete or explicitly tracked as drafts in the content directory.

6. **Dev-only features properly gated.** ParticlesTuner and constellation tune mode both use `import.meta.env.DEV` correctly. No dev tools leak to production.

7. **Consistent file naming and import conventions.** 100% PascalCase components, camelCase logic files, path alias usage throughout. No exceptions found.

---

## Recommended Remediation Priority

**Priority 1: Run `npm audit fix`** — Patches 4 dependency CVEs including Vite path traversal. Zero risk, immediate security improvement.

**Priority 2: Add error handling to ResumePage** — Catch fetch failure, show error state. Currently broken UX on network failure. Low risk fix.

**Priority 3: Delete dead code** — Remove Waves.tsx (301 lines), api.ts (44 lines), and unused function exports. Zero risk, reduces maintenance surface.

**Priority 4: Update .env.example** — Add `VITE_LASTFM_API_KEY` and `VITE_LASTFM_USER`. Prevents onboarding friction.

**Priority 5: Add Last.fm response validation** — Check response shape before accessing nested properties. Prevents potential runtime crash on API changes.

**Priority 6: Add security headers to vercel.json** — `X-Content-Type-Options`, `X-Frame-Options`. Low effort, good hygiene.

**Priority 7: Decompose ProfileCard.tsx** — Extract TiltEngine to separate module, split effects into composed sub-components. Medium risk but improves maintainability.

**Priority 8: Move case study metadata out of tokens** — `caseStudies` and `metaCaseStudy` belong in `core/content/`, not `core/tokens/index.ts`. Medium effort refactor.

---

## Per-File Classification

| File | Lines | Classification | Notes |
|------|-------|----------------|-------|
| design-system/tokens.css | 299 | CLEAN | Well-structured, all tokens referenced |
| core/content/case-studies.ts | 109 | CLEAN | |
| core/content/codex.ts | 133 | CLEAN | |
| core/content/constellation.ts | 262 | MINOR DEBT | Unused getConnections export, mixed data/algorithm |
| core/content/lastfm.ts | 16 | CLEAN | |
| core/content/parse-case-study.ts | 298 | MINOR DEBT | Deep nesting in parser, but justified by format diversity |
| core/content/resume.ts | 241 | SIGNIFICANT DEBT | No response.ok check |
| core/tokens/index.ts | 306 | SIGNIFICANT DEBT | Mixes tokens with domain data |
| core/utils/format.ts | 30 | MINOR DEBT | 3 of 4 exports unused |
| core/utils/index.ts | 7 | CLEAN | |
| services/analytics.ts | 3 | CLEAN | |
| services/api.ts | 44 | SIGNIFICANT DEBT | Entirely unused |
| services/lastfm.ts | 64 | SIGNIFICANT DEBT | No response shape validation |
| src/App.tsx | 23 | CLEAN | |
| src/main.tsx | 27 | CLEAN | |
| src/layouts/Layout.tsx | 22 | CLEAN | |
| src/pages/HomePage.tsx | 161 | CLEAN | |
| src/pages/AboutPage.tsx | 184 | CLEAN | |
| src/pages/WorkPage.tsx | 182 | CLEAN | |
| src/pages/CaseStudyPage.tsx | 29 | CLEAN | |
| src/pages/ResumePage.tsx | 148 | CRITICAL | No error handling on async fetch |
| src/pages/NotFoundPage.tsx | 35 | CLEAN | |
| src/components/content/Hero.tsx | 44 | CLEAN | |
| src/components/content/ConstellationPage.tsx | 252 | MINOR DEBT | Complex but justified |
| src/components/content/ConstellationField.tsx | 277 | MINOR DEBT | Multiple responsibilities |
| src/components/content/ConstellationContent.tsx | 214 | CLEAN | |
| src/components/content/ConstellationNode.tsx | 135 | CLEAN | |
| src/components/content/ConstellationStrip.tsx | 91 | CLEAN | |
| src/components/content/CodexPage.tsx | 134 | CLEAN | |
| src/components/content/CodexSpine.tsx | 165 | CLEAN | |
| src/components/content/CodexChapter.tsx | 91 | CLEAN | |
| src/components/content/CodexNode.tsx | 130 | CLEAN | |
| src/components/content/ConnectionPeek.tsx | 68 | CLEAN | |
| src/components/content/CaseStudyPage.tsx | 101 | CLEAN | |
| src/components/content/renderSection.tsx | 129 | CLEAN | |
| src/components/content/ImageBlock.tsx | 118 | CLEAN | |
| src/components/content/ImageLightbox.tsx | 66 | CLEAN | |
| src/components/content/TextBlock.tsx | 22 | CLEAN | |
| src/components/content/SectionHeading.tsx | 12 | CLEAN | |
| src/components/content/MetricCard.tsx | 56 | CLEAN | |
| src/components/content/MetricGrid.tsx | 11 | CLEAN | |
| src/components/content/CalloutBlock.tsx | 29 | CLEAN | |
| src/components/content/ComparisonBlock.tsx | 56 | CLEAN | |
| src/components/content/QuoteBlock.tsx | 26 | CLEAN | |
| src/components/content/AboutSnippet.tsx | 44 | CLEAN | |
| src/components/content/ProjectCard.tsx | 98 | CLEAN | |
| src/components/effects/Particles.tsx | 247 | CLEAN | Proper cleanup, reduced motion |
| src/components/effects/ParticlesTuner.tsx | 204 | CLEAN | Dev-only gated |
| src/components/effects/ProfileCard.tsx | 556 | CRITICAL | God component, works but unmaintainable |
| src/components/effects/Waves.tsx | 301 | SIGNIFICANT DEBT | Entirely dead code + memory leak |
| src/components/effects/CountUp.tsx | 130 | CLEAN | |
| src/components/effects/DecryptedText.tsx | 127 | CLEAN | |
| src/components/effects/GlowEffect.tsx | 49 | CLEAN | |
| src/components/effects/GrainOverlay.tsx | 56 | CLEAN | |
| src/components/effects/RevealOnScroll.tsx | 65 | CLEAN | |
| src/components/effects/SpotlightCard.tsx | 66 | MINOR DEBT | Inline style recreation |
| src/components/effects/Threads.tsx | 210 | CLEAN | Proper cleanup |
| src/components/interactive/Button.tsx | 70 | CLEAN | |
| src/components/interactive/NowPlaying.tsx | 187 | CLEAN | |
| src/components/interactive/Tag.tsx | 29 | CLEAN | |
| src/components/interactive/ThemeToggle.tsx | 71 | CLEAN | |
| src/components/layout/Container.tsx | 25 | CLEAN | |
| src/components/layout/Header.tsx | 58 | CLEAN | |
| src/components/layout/Footer.tsx | 57 | CLEAN | |
| src/components/ScrollToTop.tsx | 13 | CLEAN | |
| src/lib/parseInline.tsx | 31 | CLEAN | |
| src/lib/site-metadata.ts | 11 | CLEAN | |
| src/lib/useNowPlaying.ts | 54 | SIGNIFICANT DEBT | Initial poll ignores visibility |
| src/lib/useTheme.ts | 18 | CLEAN | |
| src/providers/ThemeProvider.tsx | 71 | CLEAN | |
| src/styles/globals.css | 197 | CLEAN | |
