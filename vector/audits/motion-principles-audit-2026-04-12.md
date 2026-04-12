# Motion Principles Audit (Three-Perspective)

**Date:** 2026-04-12
**Skill:** design-motion-principles v1.1
**Perspectives:** Jakub Krehel (primary), Jhey Tompkins (secondary), Emil Kowalski (selective)

---

## Summary

🔴 5 Critical | 🟡 8 Important | 🟢 7 Opportunities

---

## Critical (Must Fix)

1. `transition-all` on 20 elements across 13 files -- replace with scoped transition properties
2. No exit animation on constellation content (`ConstellationPage.tsx:200`)
3. Mobile strip snaps in without transition (`ConstellationPage.tsx:133`)
4. Preamble content has zero animation (`ConstellationPage.tsx:214`)
5. Missing component-level `motion-safe:` guards (Button, ConnectionPeek, WorkPage, ImageBlock)

## Important (Should Fix)

1. Constellation node hover 400ms too slow for rapid exploration (`ConstellationNode.tsx:69`)
2. SVG connection line transition 400ms lags on rapid hover (`ConstellationField.tsx:39`)
3. ConnectionPeek marker/card timing mismatch 400ms vs 200ms (`ConnectionPeek.tsx:31`)
4. NowPlaying grid/opacity easing mismatch (`NowPlaying.tsx:110-120`)
5. Raw `duration-200`/`duration-500` bypass token system (Header, Footer, WorkPage, SpotlightCard)
6. `--ease-spring` missing from JS token export (`core/tokens/index.ts:128`)
7. `--ease-bounce` defined but unused and anti-pattern (`globals.css:103`)
8. ResumePage skeleton-to-content snaps (`ResumePage.tsx`)

## Opportunities (Could Enhance)

1. Connection line draw-on animation (stroke-dashoffset) -- portfolio-worthy entry moment
2. Staggered node entrance on page load -- "stars appearing"
3. View Transitions API for node-to-node crossfade
4. `@property --glow-intensity` for smooth node glow
5. Scroll-driven constellation reveal
6. `linear()` spring on content fadeIn
7. Replace `setTimeout(50)` with double-rAF

---

## Companion Report

Full motion inventory and architectural analysis: `motion-design-audit-2026-04-12.md`
