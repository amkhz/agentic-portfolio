# Roy's Review: PR #154 T6 motion — pre-merge (feat/lab-t6-motion)
Date: 2026-07-01

## Verdict: SHIP WITH NOTES

The branch grew from "convert beziers to springs" into the lab's full motion pass plus an app-wide `motion` bump, and it holds up: reduced-motion is guarded on every new animation, the bump is a clean semver-minor with all gates green portfolio-wide, and nothing reinvents the spring system. The notes are live-feel checks, not defects. Clear to merge.

## Files Reviewed
- src/lab/components/PerihelionMark.tsx, library/{LibraryWelcome,TerritoryGrid,LibraryHeader,PerihelionSigil}.tsx, guide/{GuideDefinitionCard,GuideSectionNav,ReaderRail}.tsx (layer: src UI)
- src/lab/styles/lab.css (layer: design-system)
- package.json / package-lock.json (dependency bump)
- vector/audits/roy-review-2026-07-01-t6-motion.md (the earlier T6 review, carried on the branch)

## Architecture    PASS
- All code changes are src/lab UI + the lab stylesheet + a dependency bump. No logic in components, no fetching, no layer violations.
- Reuse-not-reinvent honored throughout: springs come from `src/components/effects/motionConfig` (springSoft/springHover), `--ease-spring` mirrors the portfolio's globals, `arc()` is the vendored Motion API. No lab-local motion system.
- PerihelionSigil (+79) and ReaderRail (+126) grew but remain self-contained UI/animation components; ReaderRail was already the rail's single home.
- The masthead grid-align nets to zero — LabLayout.tsx isn't in the diff (added then reverted), so no dead code ships.

## Design System   PASS
- No hardcoded colors. The sigil's arc gesture uses `--guide-accent` only, no glow. `--ease-spring` is a motion token.
- Minor: the rail-body reveal animates `marginTop: "1.75rem"` as an inline literal (it mirrors the `space-y-7` gap it replaces). This is a motion keyframe value, consistent with motion configs living as literals (durations, bounces), not a static presentational style — acceptable, noted for awareness.

## Accessibility   PASS
- `prefers-reduced-motion` covered end to end: verified a guard (useReducedMotion / motion-reduce) in all seven animated files. Every new spring collapses to instant when reduced.
- The disclosure keeps `aria-expanded` / `aria-controls`; the AnimatePresence reveals don't alter the semantics, tap targets (min-h-9), or the persisted collapse/controls state.
- Sigil arc spark is `aria-hidden` decorative and hidden entirely under reduced motion.

## Content         N/A

## Doctrine        PASS
- Wave-driven mandate (DESIGN.md P4) satisfied: arrivals are `springSoft` (bounce 0); the only overshoots are the sanctioned micro-interactions (chevron + mark pop, `springHover`). The panel/body reveals are bounce 0.
- The sigil arc() is one restrained "closest approach" gesture — within P4's "one ambitious moment per surface," token color, no slop.
- Soft-constraint check on the dep bump: it's a version bump of an existing dependency (not a new heavy dep), semver-minor within 12.x, adopted deliberately to unlock arc() app-wide. Consistent with the "use the new lib everywhere" call.

## Quality Gates   PASS
- lint clean (1 pre-existing, unrelated react-refresh warning in renderSection.tsx), build succeeds under TS strict, 178/178 tests pass — all re-run after the bump.

## Notes (live-feel checks, non-blocking)
1. **Nested reveal, verify once live.** The rail body and the controls disclosure both animate `height: auto` with `overflow-hidden`, nested. The reasoning holds — Motion settles `height:auto` to CSS `auto`, so a settled body fits its content and the inner controls reflow it without clipping. Worth one glance: expand the rail, then open "Reading controls," confirm nothing is clipped. High confidence.
2. **GuideDefinitionCard timing.** Still the standing flag: 0.2s → springSoft (~0.55s) for the term popover. A feel call — verify it doesn't drag; if it does, a snappier spring on that one surface.
3. **Bump blast radius.** TS strict + 178 tests passing is strong evidence of no API breakage across the portfolio's motion usage (springs, hooks, AnimatePresence, PageTransition, ParallaxImage). A quick smoke of a *portfolio* page (not just lab) post-merge is a cheap belt-and-suspenders.

## Impeccable Delegation
- The motion work was already routed through /interface-craft (audit) and /impeccable animate (the reveal), per the project's motion-skill convention. No further delegation needed for merge; `/design-motion-principles` on the rendered reveals is optional post-merge polish.
