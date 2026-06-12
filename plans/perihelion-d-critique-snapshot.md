# Critique Snapshot: Perihelion Identity Candidates (Workstream D)

**Date:** 2026-06-12
**Method:** /impeccable critique, two isolated assessments (LLM design review + deterministic detection), synthesized.
**Targets:** Candidates A "Instrument" (built, live), C "Fragment", D "Kepler plate" from the Paper exploration (`Perihelion Identity — Workstream D`), judged against `plans/perihelion-d-identity-brief.md`.
**This snapshot is the /polish backlog for the identity surface.**

---

## Verdict

**Candidate A "Instrument" wins, 19/24 vs C 15/24 vs D 11/24.** A is the only candidate that delivers the brief's central thesis: one geometry, two materializations that each read as decisions. Emission earns graphite through the luminance falloff and halo; ink earns cream through press weight and the periapsis stroke-break. C's ink register is "emission minus glow" (the degradation the brief warns against) and its silhouette drifts toward crescent/moon-icon ambiguity at small sizes. D holds the most beautiful idea in the set (true-focus Kepler construction) but lands on the generic dot-in-ellipse mark at every use size and breaks the locked color rule by putting accent on the attractor instead of the periapsis point.

## Candidate scorecard (0-4 per criterion)

| Criterion | A Instrument | C Fragment | D Kepler plate |
|---|---|---|---|
| Quiet-wonder first read | 3 | 2 | 2 |
| Dual-register integrity | 4 | 2 | 2 |
| Anti-goal avoidance | 3 | 3 | 1 |
| Favicon at 16px | 3 | 3 | 2 |
| Masthead lockup | 3 | 2 | 2 |
| Distinctiveness | 3 | 3 | 2 |
| **Total /24** | **19** | **15** | **11** |

## AI slop verdicts

- **A: No.** Stated physical rationale, register-specific print-craft moves, asymmetric geometry. Residual genre tell (glow-on-dark) mitigated by restraint and by the light theme proving the identity is not the glow.
- **C: Mostly no.** Real negative-space idea, but the light register is what lazy generation does (remove the glow).
- **D: Yes, at use sizes.** The plate is researched; the favicon is clip art.

## Built masthead (A as implemented): Nielsen 37/40

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 | Draw-in, transit acknowledgment, flash-free theme flip |
| 2 | Match with real world | 3 | Tagline (the "Perihelion" translation) hidden below md |
| 3 | User control and freedom | 4 | Whole lockup is the home link; reduced motion honored end-to-end |
| 4 | Consistency and standards | 4 | Minor: back-arrow on outbound justinh.design link implies in-app nav |
| 5 | Error prevention | 4 | aria-label disambiguates |
| 6 | Recognition rather than recall | 3 | Mobile loses the explanatory line |
| 7 | Flexibility and efficiency | 4 | Skip link, touch targets |
| 8 | Aesthetic and minimalist design | 4 | Colophon rule earns its place |
| 9 | Error recovery | 4 | n/a-leaning, nothing misleading |
| 10 | Help and documentation | 3 | Tagline is the only documentation of an obscure name; gone below md |

## Deterministic scan

CLI detector: **clean, zero findings** (exit 0) across LabLayout, PerihelionMark, LabThemeToggle, PerihelionSigil, LibraryHeader. Independent checks all PASS: color discipline (all paint var()-driven; OKLCH only in token files), no banned patterns, a11y statics (decorative SVGs hidden, one h1 per surface, no heading skips), reduced-motion coverage verified per keyframe (transit snaps to invisible end state; flare paints nothing; drift falls back to static scatter; pulse rests at opacity 0), no layout-property animation. Out-of-scope adjacencies noted for a future pass: `border-l-2 border-guide-accent` in GuideBlockquote.tsx:98,116,126 and GuideGlossaryView.tsx:86; functional backdrop-blur on sticky navs.

## Priority issues (the /polish backlog)

- **[P1] Clearspace, min-size floor, and contrast matrix unrecorded.** Brief sections 4 and 6 require them recorded, not improvised. The 0.25-opacity aphelion tail is unmeasured. Fix: measure the lockup as built, record in the brief, fold into ADR-012.
- **[P1] 45deg rotation is an inline transform; the layout box lies about visual bounds.** Makes clearspace unenforceable, risks clipping in overflow-hidden containers. Fix: bake the cant into path geometry so the viewBox bounds the mark.
- **[P1] Mobile loses the only translation of "Perihelion."** Tagline is hidden below md; the mission test fails where most first visits happen. Fix: give the tagline a mobile home without hard-binding it to the lockup (Q6 stays open).
- **[P2] Ink-register mask needs cross-browser QA.** `mask: var(--peri-mark-punch)` via custom property on SVG geometry; silent failure = dot colliding with unbroken orbit, only on cream. Fix: verify Safari/Firefox; if flaky, cut the gap into path geometry and delete the mask.
- **[P2] Transit has rough exits and no keyboard path.** Hover-gated: pointer-exit kills it mid-orbit, short hovers never reach the flare, focus never triggers it. Fix: class toggled on pointerenter/focus-visible, removed on animationend.

## Provocative questions

1. Who ever sees the transit? Touch users and non-mousing first visitors never meet the identity's best moment. One transit on first load as the draw-in's final beat?
2. Is the geometry eccentric enough to stay "specifically perihelial" in flat monochrome (print, forced-colors, embeds) where gradient and glow are gone?
3. Is D dead, or mis-cast? Its true-focus plate is exactly the "Kepler-plate diagram precision" the brief names as the ink anchor. Candidate for the manifesto ornament's large register as one of A's derived renderings.
