# Phase 7 Audit: The Flight Deck (Works 01)

Date: 2026-07-05 · Lane: `/audit` (Impeccable), phase 7 charter · Scope: `src/works/flight-deck/` + `core/works/flight-deck/`, route `/w/flight-deck`, per ADR-017 D2/D4/D6 and the shape brief's a11y contract.

## Anti-patterns verdict: PASS

The deck does not read as AI-generated. The zone-aware checks: mono typography is the sanctioned instrument voice (captions deliberately in the body face); the dark palette is the shape brief's scene sentence, not default-dark-with-glow; emission is an authored grammar (boot bloom, alert lamps, wake charge), hover-gated or meaningful in-world per the softened slop bans; no card grids, no glassmorphism, no side-stripe severity bars, no bounce easing on arrivals. Bezel-less regions separated by space and alignment, as the composition discipline demands. The one open cosmetic debt is the interim display face (Bricolage Grotesque), already tracked as an open build question.

## Executive summary

- Issues found: 2 fixed in this pass (1 contrast, 1 double-speak), 2 smaller fixes (judgment focus handoff, en-route announcement), plus the four queued Roy notes fixed before the audit ran (44px targets, clip focus, announce debounce, movement-5 still).
- False positives rejected during verification: reduced-motion CSS transition claims (reduced-motion users receive the static plate, so live-deck transitions cannot reach them), chamber focus-steal (focus must stay on the slider mid-drag; the announcer covers arrival), continuous-telemetry live regions (mirrors are static text by contract; announcing 400ms ticks would be hostile).
- Lighthouse (desktop, local dist behind a gzip static server): deck performance 97 / accessibility 100 (D6 bars: ≥ 70 / ≥ 95); Archive home performance 97 / accessibility 100 (bar: ≥ 90). First-pass Archive 87 was an uncompressed-test-server artifact, not the site.

## Fixed in this pass

1. **Dormant instrument names below AA (axe color-contrast, the only Lighthouse a11y failure).** The four `.js-boot-name` headings held GSAP opacity 0.3 on the sleeping deck (effective 1.17:1). The shape brief's dormant state is "near-dark, one breathing indicator, a single invitation line", so the names now hold 0 until their certification beat and bloom with it (`timelines/bootTimeline.ts`). Visual delta flagged for Justin's live pass: the sleeping bench no longer ghosts the instrument names.
2. **Second live region double-speaking commits.** The panel status line carried `aria-live="polite"` beside the session's single announcer; a commit spoke twice. The status line is now visible-only and the announcer speaks the standing order at commit completion ("En route: …"), so screen-reader users still get the state they previously only got from the removed region (`TranslationPanel.tsx`, `DeckSession.tsx`).
3. **Judgment-step focus drop.** Working a judgment unmounted the focused choice button, dropping keyboard focus to the body. Focus now rides to the response read-back (`tabIndex={-1}`, keyboard-only ring) when the choices unmount (`DrillProcedure.tsx`, `flight-deck.css`).

## Formal contrast re-check (closes the mission doc's open ramp question)

OKLCH → linear sRGB → WCAG ratio, computed on the token values:

| Pair | Ratio | Bar | Verdict |
|---|---|---|---|
| ink / bg · surface · bg-deep | 16.96 · 16.29 · 17.40 | 4.5 | pass |
| ink-dim / bg · bg-deep | 8.45 · 8.67 | 4.5 | pass |
| ink-label / bg · surface | 6.00 · 5.77 | 4.5 | pass |
| advisory · caution · warning words / bg | 12.78 · 9.90 · 6.03 | 4.5 | pass |
| operator hue / bg (even as text) | 9.31 | 4.5 | pass |
| focus ring / bg · surface | 9.90 · 9.51 | 3.0 | pass |
| ramp stops 2–4 / bg | 4.22 · 7.51 · 13.17 | 3.0 | pass |
| ramp stops 0–1 / bg | 1.86 · 2.77 | 3.0 | exempt, recorded |
| ramp ends 0 vs 4 | 7.08 | 3.0 | pass |

The two low ramp stops encode "thin wall" fading toward the room; the state they encode is always redundant in text (WALL readings, annotation lanes, sr mirrors), so 1.4.11 does not bind them, and the low end sitting near the bg is the render's own danger grammar. The tokens.css note "draft values pending live AA gut-check" can now read as resolved: text never rides the ramp.

## D6 budget verification

- Deck chunk 70.51 / 350 KB gz; deck CSS 3.87 KB gz. `tone` 81.08 / 160 KB gz, dynamically imported only inside the sound toggle's gesture.
- Portfolio and labs entries byte-identical to the phase 6 baseline (labs 193.46 KB gz; its hash shift is only the renamed deck chunk reference).
- DPR capped at 2 in both WebGL components; every rAF loop (FieldIntegrity, SyntheticOrientation, OperatorStrip, ConsciousnessChamber) double-gated on IntersectionObserver + visibilitychange with full cleanup; readings state on the 400ms cadence, hot paths imperative. `will-change` count: zero, correctly.
- TTI on the deck route 1.9s (bar ≤ 3s); TBT 0ms.
- Accepted caveat, on the record: the boot sweep animates `left` for one ~200ms pass per instrument, once per session. Not worth reworking a locked ritual; revisit only if boot choreography grows.

## Also verified

- Theming: zero literal color outside `tokens.css` (swept; shader hits are function names, uniforms are token-fed).
- Short-viewport clip focus (Roy's phase 6 note): `.deck-region--panel` opens its y-axis to scroll under 45rem viewport height, so a clipped radio can never hold invisible focus; x stays clipped (never-overlap holds).
- Announcement cadence (Roy's phase 6 note): crossings debounce speech to the settled regime (650ms trailing, `paradigmScore.announceDebounceMs`); the pulse answers every crossing.
- Target sizes (Roy's phase 5/6 note): slider input grows to 44px past its 24px track; sound toggle, colophon exit, and the `.deck-commit` family get invisible 44px overlays; intent pills sized for the 2.5.8 spacing exception.
- Static plate: movement 5 now present (`ParadigmPlate`, slider at instrumented rest with sr sentence). The plate's declared contract is instruments at legible nominal state; the alert region's nominal state is the quiet line, so drill-still spreads stay out of contract.
- Semantics: one h1 per surface, `main` landmarks on colophon/decline card, fieldset+legend radio groups, hold-to-start has full keyboard parity, single announcer contract now actually single.

## Positives worth keeping

The pure-model/one-clock discipline means mirrors, readings, and renders cannot disagree by construction; the single-announcer architecture was sound (one stray region aside); memory hygiene is complete (every observer, timer, timeline, and GL context cleaned); the plate path imports no WebGL or Tone.

## Remaining for later phases

- Display face selection (open build question, near-ship).
- Boot-feel tuning (Justin, live).
- Copy: Writer + Gaff pass rides the colophon item (scaffold-grade throughout, as declared).
