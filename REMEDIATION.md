# Remediation Plan

**Source:** AUDIT.md
**Generated:** 2026-04-14
**Overall classification from audit:** MINOR DEBT (post prior remediation)
**Total phases:** 3
**Estimated total scope:** 7 files across 3 phases

> This plan covers the 7 remaining open/deferred findings from AUDIT.md.
> The 9 previously resolved findings (C1-C3, S4-S5, S7, S10, M13, M15) are not included.

---

## Phase 1: Naming, Docs, and Script Wiring

Risk: Near-zero
Estimated scope: 4 files, renames and doc edits only
Prerequisite: None

Three small findings that share a theme: things are named wrong or not documented. Grouping them into one phase keeps each from being too small to justify a session.

### Tasks

1. **Rename** `src/components/content/CaseStudyPage.tsx` to `src/components/content/CaseStudyPageTemplate.tsx`
   - This file exports `CaseStudyPageTemplate`, not `CaseStudyPage`. The page-level component at `src/pages/CaseStudyPage.tsx` owns that name.
   - Update all imports that reference the old path. There are exactly 2:
     - `src/pages/CaseStudyPage.tsx:4` — `import { CaseStudyPageTemplate } from "@/components/content/CaseStudyPage"`
     - Any other file importing from `@/components/content/CaseStudyPage` (grep to confirm)
   - Change import paths to `@/components/content/CaseStudyPageTemplate`
   - **Do NOT** rename the export itself. It is already `CaseStudyPageTemplate`.
   - Addresses: Finding 12

2. **Update** `ARCHITECTURE.md` lines 82-89 — replace the `/.agents/` directory tree with the actual `.claude/skills/` structure
   - The current text references `/.agents/skills/builder`, `/.agents/skills/director`, etc.
   - Replace with the actual skill locations under `.claude/skills/`. List only skills that exist: `director`, `dreamer`, `writer`, `invest-*` skills, etc. Run `ls .claude/skills/` to get the current list.
   - **Do NOT** change any other section of ARCHITECTURE.md.
   - Addresses: Finding 11

3. **Wire scripts into package.json**
   - Add two npm scripts:
     - `"generate:favicons": "tsx scripts/generate-favicons.ts"`
     - `"generate:sitemap": "tsx scripts/generate-sitemap.ts"`
   - The `generate:og` script already follows this pattern (line 13 of package.json), so match its style.
   - **Do NOT** modify the scripts themselves or add them to the build pipeline. They are manual-run utilities.
   - Addresses: Finding 17

### Verification
- [ ] `npm run build` passes
- [ ] `npm run lint` passes (0 errors)
- [ ] Grep for `from.*content/CaseStudyPage[^T]` returns 0 matches (old import path gone)
- [ ] `npm run generate:sitemap -- --help` or similar does not crash (script is loadable)
- [ ] ARCHITECTURE.md references `.claude/skills/`, not `/.agents/`

### Preserved (do NOT modify)
- All commendation items from the audit remain untouched
- The four-layer architecture import direction
- All effect components and their reduced-motion handling

---

## Phase 2: Performance Fix — SpotlightCard

Risk: Low
Estimated scope: 1 file, inline style optimization
Prerequisite: None (can run in parallel with Phase 1)

SpotlightCard rebuilds an inline style object on every mouse move. Switching to CSS custom properties lets the browser handle the gradient update without React re-rendering the style attribute.

### Tasks

1. **Refactor** `src/components/effects/SpotlightCard.tsx` — replace inline style with CSS variables
   - Current (lines 55-61): The spotlight overlay `<div>` uses an inline `style` prop with `opacity` and a `background` containing `radial-gradient(circle at ${position.x}px ${position.y}px, ...)`. This object is recreated on every `handleMouseMove`.
   - Target: Set `--spot-x` and `--spot-y` CSS variables on the container `<div>` via `style` prop (these are simple numbers, not a full gradient string). Move the `radial-gradient` into a Tailwind arbitrary value or a static inline style that references `var(--spot-x)` and `var(--spot-y)`.
   - The `opacity` can remain as a CSS variable (`--spot-opacity`) or stay as-is since it only changes on enter/leave/focus/blur (not every mouse move).
   - Keep the existing `prefersReduced` check. Do not change the visual behavior.
   - **Do NOT** extract to a separate file. This is a 66-line component; extraction would be over-engineering.
   - Addresses: Finding 14

### Verification
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Visual behavior unchanged: spotlight follows cursor on hover, fades on leave, respects reduced motion
- [ ] No new React state updates on mouse move (only CSS variable updates via ref)

---

## Phase 3: useNowPlaying Initial Poll Guard

Risk: Low
Estimated scope: 1 file, 3-line change
Prerequisite: None (can run in parallel with Phases 1-2)

The `useNowPlaying` hook fires an unconditional fetch on mount even if the tab is hidden. The fix is a one-line guard.

### Tasks

1. **Modify** `src/lib/useNowPlaying.ts` line 31
   - Current: `poll();` fires unconditionally on mount
   - Target: Wrap in a visibility check:
     ```ts
     if (!document.hidden) {
       poll();
     }
     ```
   - The `handleVisibility` listener (lines 39-43) already handles the case where the tab becomes visible, so the initial data will load when the user actually sees the page.
   - **Do NOT** change the poll interval, the error handling, or the `lastGoodData` ref pattern.
   - Addresses: Finding 8

### Verification
- [ ] `npm run build` passes
- [ ] `npm run test` passes (all 74 tests)
- [ ] Manual check: open the site in a background tab, confirm no network request to Last.fm API until tab is focused

---

## Cross-Phase Notes

### Execution Order

All three phases are independent and can be executed in parallel. None modifies files touched by another.

| Phase | Files touched | Can parallel with |
|-------|--------------|-------------------|
| 1 | CaseStudyPage rename, ARCHITECTURE.md, package.json | 2, 3 |
| 2 | SpotlightCard.tsx | 1, 3 |
| 3 | useNowPlaying.ts | 1, 2 |

### Risk Checkpoints

None required. All phases are low or near-zero risk. A build + lint check after each phase is sufficient.

### Bail Points

Every phase is independently shippable. You can stop after any phase and the codebase is in a better state than before. The audit classification is already MINOR DEBT; completing all three phases would reduce it to CLEAN with noted complexity (ProfileCard, ConstellationPage, ConstellationField remain complex-but-justified).

### What This Plan Does NOT Cover

- **Finding 9 (.env.example):** Explicitly excluded by project owner. Not a code quality issue.
- **Finding 16 (No CI/CD pipeline):** This is a feature addition, not a remediation. It belongs in the project roadmap, not a code quality fix.
- **ProfileCard further decomposition:** At 431 lines it is under the monolith threshold. Further splitting (extracting shader styles, separating the JSX render tree) is an option but not warranted by the audit.
- **ConstellationPage / ConstellationField complexity:** The audit classified these as MINOR DEBT with "complex but justified." No remediation recommended.
