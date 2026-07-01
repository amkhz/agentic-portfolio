# Roy's Review: T6 motion — fixed bezier → spring/wave (feat/lab-t6-motion, PR #154)
Date: 2026-07-01

## Verdict: SHIP WITH NOTES

A tight, faithful conversion — 23 insertions / 24 deletions, no new system, reduced-motion intact everywhere. One timing regression worth a live check (the definition popover got ~2.5× slower), and one doctrine judgment call (the mark's pop keeps a small overshoot) that I read as defensible.

## Files Reviewed
- src/lab/components/PerihelionMark.tsx (layer: src UI)
- src/lab/components/library/LibraryWelcome.tsx (layer: src UI)
- src/lab/components/library/TerritoryGrid.tsx (layer: src UI)
- src/lab/components/library/LibraryHeader.tsx (layer: src UI)
- src/lab/components/guide/GuideDefinitionCard.tsx (layer: src UI)
- src/lab/components/guide/ReaderRail.tsx, GuideSectionNav.tsx (layer: src UI)
- src/lab/styles/lab.css (layer: design-system)

## Architecture    PASS
- All changes sit in src/lab UI + the lab's design-system stylesheet. No logic, no fetching, no layer violations.
- Reuse-not-reinvent honored: the Framer components import the portfolio's existing `springSoft`/`springHover` from `src/components/effects/motionConfig`; the CSS `--ease-spring` is the same `linear()` step-response the portfolio already ships in `globals.css` (3 existing uses). No lab-local motion system invented.

## Design System   PASS
- `--ease-spring` added to the lab `@theme` as a motion token (not a color/space value); generates the `ease-spring` utility, applied to transforms only. No hardcoded colors or values introduced.

## Accessibility   PASS
- `prefers-reduced-motion` covered end to end: all five Framer components branch on `useReducedMotion()` (springs live only in the non-reduced branch; reduced renders static or `{duration:0}`). Both new CSS transitions carry `motion-reduce:transition-none`.
- No contrast, heading, or tap-target surface touched.

## Content         N/A

## Doctrine        PASS (one judgment note)
- Arrivals are critically damped: `springSoft` is `bounce: 0`. Correct per DESIGN.md P4.
- JUDGMENT NOTE — the house-mark's **perihelion pop** now uses `springHover` (`bounce: 0.3`), a small overshoot, where P4 says *arrivals* are bounce 0 and only *micro-interactions* may overshoot. I read this as compliant: the pop was always a deliberate emphasis beat (the prior code hand-keyed `scale: [0, 1.25, 1]`), it's a single 3px dot rather than a page/section arrival, and springHover is the sanctioned micro-overshoot token. It preserves designed intent rather than inventing bounce. If you'd rather be literal, `springSoft` on the pop removes the overshoot — but I'd keep it.
- Deferred items correctly scoped: the `peri-mark-transit` CSS orbit keeps its bezier (it's a continuous traversal, not a settle — a spring is the wrong tool), and the sigil pulse enhancement is a separate follow-on.

## Quality Gates   PASS
- lint clean (1 pre-existing unrelated warning), build succeeds, 178 tests pass.

## The one FLAG worth acting on
- **GuideDefinitionCard timing regression.** The term-definition popover went from a `{duration: 0.2}` crossfade to `springSoft` (~0.55s visual duration) — roughly 2.5× slower for a small, frequently-triggered reveal. It will still read fine, but a term popover wants to feel instant, and a cushioned 0.55s spring may drag. Recommend a live check; if it feels slow, use a snappier spring for this one surface (a short custom spring, or `springHover` without the bounce) rather than the arrival preset. Not a blocker — a feel call best made in-browser.

## Impeccable Delegation
- None needed for a motion-token conversion. If you want a rendered-motion opinion, `/design-motion-principles` or `/animate` on the guide + library entrances would be the right call after the live pass.
