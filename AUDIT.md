# Code Quality Audit

**Date:** 2026-04-14
**Target:** agentic-portfolio (justinh.design)
**Overall Classification:** ~~SIGNIFICANT DEBT~~ CLEAN (all actionable findings resolved)

## Summary Metrics
- Files audited: 95
- Critical findings: 3 (3 resolved)
- Significant findings: 8 (6 resolved, 1 moot, 1 deferred)
- Minor findings: 6 (5 resolved, 1 deferred)
- Dead code files: ~~2~~ 0
- Dead exports: ~~4~~ 0
- Monolith flags (>500 lines): ~~1~~ 0 (ProfileCard.tsx reduced to 431 lines)

---

## Critical Findings

**1. Resume page has no error handling — RESOLVED**
- `src/pages/ResumePage.tsx:14-16` — `getResumeModel().then(setResume)` with no `.catch()`. If `/1pageresume.md` fails to load, user sees an infinite loading skeleton. No error state, no feedback.
- `core/content/resume.ts:223-225` �� `getResumeModel()` does not check `response.ok` before calling `.text()`. A 404 throws but nothing catches it upstream.

**Resolution:** Added `response.ok` check in `getResumeModel()` and `.catch()` with error state UI + PDF download fallback in ResumePage. Commit: de5e6b6.

**2. Dependency vulnerabilities (npm audit) — RESOLVED**
- `vite <=6.4.1` — HIGH: path traversal in `.map` handling, arbitrary file read via WebSocket (dev server only, not production-facing)
- `picomatch 4.0.0-4.0.3` — HIGH: ReDoS via extglob quantifiers, method injection in POSIX character classes
- `flatted <=3.4.1` — HIGH: unbounded recursion DoS in parse(), prototype pollution
- `brace-expansion` — MODERATE: zero-step sequence causes hang
- All fixable via `npm audit fix`

**Resolution:** `npm audit fix` applied, 0 vulnerabilities remaining. Commit: de5e6b6.

**3. ProfileCard.tsx is a 556-line god component — RESOLVED**
- `src/components/effects/ProfileCard.tsx` — Embeds a TiltEngine class (150+ lines of pointer math), device orientation handling, CSS variable management, holographic shader effects, grain overlays, glow effects, and responsive behavior. 16 props, 11 hooks. Should be decomposed but works correctly as-is.

**Resolution:** Extracted TiltEngine to `src/components/effects/tiltEngine.ts` (133 lines). ProfileCard reduced from 556 to 431 lines, under the 500-line monolith threshold. Commit: de5e6b6.

---

## Significant Findings

**4. Waves.tsx is entirely dead code (301 lines) — RESOLVED**
- `src/components/effects/Waves.tsx` — Fully implemented canvas wave animation with embedded Perlin noise class. Imported nowhere. 301 lines providing zero value.

**Resolution:** File deleted. No dangling imports found. Commit: de5e6b6.

**5. services/api.ts is dead infrastructure — RESOLVED**
- `services/api.ts` — Generic HTTP client exporting `get`, `post`, `put`, `del`. None are imported anywhere. 44 lines of unused code.

**Resolution:** File deleted. No dangling imports found. Commit: de5e6b6.

**6. Waves.tsx has a memory leak in resize listener — MOOT**
- `src/components/effects/Waves.tsx:281,286` — `addEventListener` and `removeEventListener` use different anonymous function references. Cleanup never actually removes the listener.

**Status:** Moot. Waves.tsx was deleted (see Finding 4).

**7. Last.fm API response shape is not validated — RESOLVED**
- `services/lastfm.ts:37-45` — No validation that `data?.recenttracks?.track` exists or is an array before accessing. Could crash on unexpected API response shapes.

**Resolution:** Already addressed prior to remediation. `response.ok` check at line 41, `Array.isArray(tracks)` validation at line 48, graceful fallback returning `{ isPlaying: false, track: null, recentTracks: [] }`.

**8. useNowPlaying fires initial poll regardless of tab visibility — RESOLVED**
- `src/lib/useNowPlaying.ts:31` — `poll()` fires on mount even if tab is hidden. Subsequent polls correctly check `document.hidden`, but first fetch is unconditional.

**Resolution:** Wrapped initial `poll()` in `if (!document.hidden)` guard. The existing `handleVisibility` listener handles deferred loading when tab becomes visible. Commit: 21732fe.

**9. .env.example is incomplete — DEFERRED**
- `.env.example` — Missing `VITE_LASTFM_API_KEY` and `VITE_LASTFM_USER` (both required by `services/lastfm.ts`). Only documents `VITE_SITE_URL` and `VITE_API_URL`.

**Status:** Deferred. Explicitly excluded from remediation scope by project owner.

**10. core/tokens/index.ts mixes design tokens with case study metadata — RESOLVED**
- `core/tokens/index.ts` — 306 lines conflating design tokens (colors, typography, spacing) with domain data (caseStudies array, metaCaseStudy). Case study metadata belongs in `core/content/`.

**Resolution:** Moved `CaseStudy` interface, `caseStudies`, and `metaCaseStudy` to `core/content/case-studies.ts`. Updated 9 import sites. `core/tokens/index.ts` now contains only design tokens (207 lines). Commit: de5e6b6.

**11. ARCHITECTURE.md references outdated directory structure — RESOLVED**
- `ARCHITECTURE.md:82-89` — References `/.agents/` directory and retired builder skill. Actual skills live in `.claude/skills/` per Investiture v1.5. Documentation drift, not functional.

**Resolution:** Updated to reference `.claude/skills/` with current skill listing (director, dreamer, writer, roy, joi, builder, invest-*). Notes `.agents/skills` as legacy mirror. Commit: 21732fe.

---

## Minor Findings

**12. Duplicate filename: CaseStudyPage.tsx — RESOLVED**
- `src/pages/CaseStudyPage.tsx` and `src/components/content/CaseStudyPage.tsx` share the same filename. Different exports (`CaseStudyPage` vs `CaseStudyPageTemplate`) but confusing. The component version should be renamed to match the `Template` export.

**Resolution:** Renamed `src/components/content/CaseStudyPage.tsx` to `CaseStudyPageTemplate.tsx`. Import in `src/pages/CaseStudyPage.tsx` updated. No dangling references. Commit: 21732fe.

**13. Four unused utility exports — RESOLVED**
- `core/content/constellation.ts` — `getConnections()` exported but never called
- `core/utils/format.ts` — `formatDate()`, `truncate()`, `debounce()` exported but never imported outside tests

**Resolution:** All four exports removed along with their tests. `slugify()` and `getNode()` retained (still used). Commit: de5e6b6.

**14. SpotlightCard inline style object recreated every render — RESOLVED**
- `src/components/effects/SpotlightCard.tsx:57-60` — Style object with radial gradient is rebuilt on every mouse move. Could use CSS variables for smoother updates.

**Resolution:** Mouse move now sets `--spot-x` / `--spot-y` CSS variables via ref (no React re-render). Gradient reads `var(--spot-x)` / `var(--spot-y)`. `isFocused` converted from state to ref since only read in handler. Commit: 21732fe.

**15. Missing security headers in vercel.json — RESOLVED**
- `vercel.json` — Only has rewrites. Missing `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` headers.

**Resolution:** Added `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`. Used Referrer-Policy over deprecated X-XSS-Protection. Commit: de5e6b6.

**16. No CI/CD pipeline — DEFERRED**
- No `.github/workflows/` directory. Build and lint gates exist locally but are not enforced on push or PR.

**Status:** Deferred. Feature addition, not a code quality remediation. Belongs in project roadmap.

**17. generate-favicons.ts and generate-sitemap.ts unreferenced — RESOLVED**
- `scripts/generate-favicons.ts` and `scripts/generate-sitemap.ts` are not wired into any npm script. May be run manually but not documented.

**Resolution:** Wired as `generate:favicons` and `generate:sitemap` npm scripts in package.json, matching existing `generate:og` pattern. Commit: 21732fe.

---

## Dead Code — ALL RESOLVED

| Item | Location | Lines | Status |
|------|----------|-------|--------|
| Waves component | `src/components/effects/Waves.tsx` | 301 | Deleted |
| API service | `services/api.ts` | 44 | Deleted |
| getConnections() | `core/content/constellation.ts` | 10 | Removed |
| formatDate() | `core/utils/format.ts` | 5 | Removed |
| truncate() | `core/utils/format.ts` | 4 | Removed |
| debounce() | `core/utils/format.ts` | 12 | Removed |

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

## Remediation Status

| Priority | Action | Status |
|----------|--------|--------|
| P1 | Run `npm audit fix` | **DONE** |
| P2 | Add error handling to ResumePage | **DONE** |
| P3 | Delete dead code | **DONE** |
| P4 | Update .env.example | Deferred (owner decision) |
| P5 | Add Last.fm response validation | **DONE** (already present) |
| P6 | Add security headers to vercel.json | **DONE** |
| P7 | Decompose ProfileCard.tsx | **DONE** |
| P8 | Move case study metadata out of tokens | **DONE** |
| Phase 1 | Rename template, update ARCHITECTURE.md, wire scripts | **DONE** |
| Phase 2 | SpotlightCard CSS variable optimization | **DONE** |
| Phase 3 | useNowPlaying initial poll guard | **DONE** |

---

## Per-File Classification

| File | Lines | Classification | Notes |
|------|-------|----------------|-------|
| design-system/tokens.css | 299 | CLEAN | Well-structured, all tokens referenced |
| core/content/case-studies.ts | 109 | CLEAN | |
| core/content/codex.ts | 133 | CLEAN | |
| core/content/constellation.ts | 252 | CLEAN | getConnections removed |
| core/content/lastfm.ts | 16 | CLEAN | |
| core/content/parse-case-study.ts | 298 | MINOR DEBT | Deep nesting in parser, but justified by format diversity |
| core/content/resume.ts | 244 | CLEAN | response.ok check added |
| core/tokens/index.ts | 207 | CLEAN | Domain data moved to core/content/ |
| core/utils/format.ts | 9 | CLEAN | Unused exports removed |
| core/utils/index.ts | 7 | CLEAN | |
| services/analytics.ts | 3 | CLEAN | |
| services/api.ts | — | DELETED | — |
| services/lastfm.ts | 64 | CLEAN | Response validation already present |
| src/App.tsx | 23 | CLEAN | |
| src/main.tsx | 27 | CLEAN | |
| src/layouts/Layout.tsx | 22 | CLEAN | |
| src/pages/HomePage.tsx | 161 | CLEAN | |
| src/pages/AboutPage.tsx | 184 | CLEAN | |
| src/pages/WorkPage.tsx | 182 | CLEAN | |
| src/pages/CaseStudyPage.tsx | 29 | CLEAN | |
| src/pages/ResumePage.tsx | 178 | CLEAN | Error handling + fallback added |
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
| src/components/content/CaseStudyPageTemplate.tsx | 101 | CLEAN | Renamed from CaseStudyPage.tsx |
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
| src/components/effects/ProfileCard.tsx | 431 | MINOR DEBT | TiltEngine extracted, still complex but under 500 lines |
| src/components/effects/tiltEngine.ts | 133 | CLEAN | Extracted from ProfileCard |
| src/components/effects/Waves.tsx | — | DELETED | — |
| src/components/effects/CountUp.tsx | 130 | CLEAN | |
| src/components/effects/DecryptedText.tsx | 127 | CLEAN | |
| src/components/effects/GlowEffect.tsx | 49 | CLEAN | |
| src/components/effects/GrainOverlay.tsx | 56 | CLEAN | |
| src/components/effects/RevealOnScroll.tsx | 65 | CLEAN | |
| src/components/effects/SpotlightCard.tsx | 67 | CLEAN | CSS variable optimization applied |
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
| src/lib/useNowPlaying.ts | 56 | CLEAN | Visibility guard added |
| src/lib/useTheme.ts | 18 | CLEAN | |
| src/providers/ThemeProvider.tsx | 71 | CLEAN | |
| src/styles/globals.css | 197 | CLEAN | |
