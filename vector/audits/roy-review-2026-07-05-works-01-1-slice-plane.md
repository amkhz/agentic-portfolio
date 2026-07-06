# Roy's Review: Works 01.1 — Field Slice Plane + Locator Ghost (PR #191)
Date: 2026-07-05

## Verdict: SHIP WITH NOTES

The ultrasound move lands the way the plan drew it: the geometry has one home, the reference plane is bit-identical by construction, the flank ridge is honest in the mirror, and the due DeckSession extraction came out clean. Three notes, none blocking; two of them are live-pass confirmations rather than defects.

## Files Reviewed
- core/works/flight-deck/field.ts, field.test.ts (core)
- core/works/flight-deck/copy.ts (core)
- src/works/flight-deck/components/FieldIntegrity.tsx, fieldAnnotation.ts (+test), SliceScrubber.tsx (+test), LocatorGhost.tsx, FieldLegend.tsx, FieldPlate.tsx, DeckSession.tsx, useParadigmDissolve.ts, useShutdown.ts (src)
- src/works/flight-deck/flight-deck.css (src)
- vector/missions/works-01-flight-deck.md (doctrine)

## The plan's hard checks

**Projection identity at s ≠ 0: PASS.** `ringScale` lives once in core (field.ts:~70); the shader consumes it as `uRingScale` multiplying the whole centerline expression (FieldIntegrity fragment, R block), and `ringRadius` takes the same value as a parameter multiplying the identical expression (fieldAnnotation.ts:41). Both per-frame consumers derive it from the same `sliceRef.current`, so they cannot disagree within a frame. The contraction identity is property-tested (fieldAnnotation.test.ts, "stays glued to the sliced ring") against the same sample at scale 1, which isolates the scale term exactly. The commit bump and coupling breath are inside the scaled parenthesis in the shader; ringRadius omits them exactly as it did before this PR (they were never part of the annotation inverse), so no new drift term was introduced.

**s = 0 band-floor guarantees: PASS.** Every axial factor is exactly 1 at the reference plane (gaussian ratio g(0)/g(0); `1 - 0.012·0`), and multiplication by 1.0 is exact in IEEE, so the drill's WALL_BAND_FLOOR crossings, strip pegging, and margin-pinch proofs are untouched at s = 0 — verified by the identity property test across t with a live delta. DrillProcedure's cross-check samples `sampleFieldTelemetry(t, delta)` with the default slice (DrillProcedure.tsx:49), so the panel's numbers read the REF PLANE by construction, and the labels now say so (`SENSOR LANE B · WALL · REF PLANE`). The off-plane thinning is mild enough that a nominal session never crosses the off-nominal bands at any plane (property-tested, worst case ~0.9455 against the 0.94 floor).

**A11y contract: PASS.** The scrubber is a real range input (keyboard free), 44px hit target per the paradigm precedent, `aria-label` + plain-words `aria-valuetext` ("0.55 toward the stern"), disabled while dormant (not focusable under the wake overlay — the phase-7 inert rule holds by the disabled attribute) and while an alert is posted. The plane is always in the readings line (`PLANE REF/±x.xx`) and spoken in the mirror; the flank speaks as "an untracked concentration" only when the cut shows it. The ghost is `aria-hidden` inside an `aria-hidden` legend, carrying no data the text doesn't. No new live regions; the single-announcer contract stands.

## Architecture — PASS
- field.ts stays pure (no DOM, deterministic in (t, timeline, s)); copy in core; components in src; hooks in src. Import directions correct.
- The extraction: useParadigmDissolve (186 lines) and useShutdown (50) are verbatim moves; both chamber race cures (departure killed on re-arrival, arrival held, kill-never-fires-onComplete) are intact line for line, and the announce-debounce cleanup moved with its effect. DeckSession is 556 lines of orchestration again. The standing flag is cleared.
- FieldIntegrity is now ~800 lines under the self-contained-visual exception. It keeps absorbing per-frame subsystems (annotation writes, now slice). **Flag for the next touch:** the annotation DOM-write block is the natural extraction.

## Design System — PASS
- All new color by token name (`--deck-line`, `--deck-ink`, `--deck-ink-faint`, `--deck-control`, `--deck-caution`, `--deck-focus`). No literals outside durations. Treatment B honored: the thumb rests in control brass and lifts to full amber under the hand; state never color-alone (disabled = cursor + dim + non-interactive).
- The disabled row dims its children (not the root) because the boot owns the root's inline opacity — correct reading of the boot contract; disabled controls are contrast-exempt as inactive UI.

## Accessibility — PASS (see hard check)
- Focus ring on the thumb via `:has(:focus-visible)`, the paradigm pattern. Reduced-motion users receive the static plate, which now carries the ghost still at REF; nothing new animates for them.

## Content — PASS
- New strings are plain language, no em-dashes, no permission framing; "Sweep the cut fore and aft through the bubble" passes the mission test. Severity/plane words honest to the model.

## Doctrine — PASS
- Reactive lane only (spring thumb; the model rides the spring; no authored timeline added), D4 respected. Arrival critically damped. The ghost is an instrument glyph, not decoration-for-show: it carries the cut's location, the ultrasound register's own move.

## Quality Gates — PASS
- 373 tests green (+18), lint clean (one pre-existing portfolio warning), build clean. Deck chunk 73.9 of 350 KB gz; tone chunk hash unchanged; nothing lab-side imports field.ts, so the labs entry is unaffected by the model change (the shelf work merged separately in #189/#190).

## Notes (non-blocking)

1. **The value readout and `aria-valuetext` speak the input state while the cut is still traveling.** The spring eases the model home over ~1s; during that travel the value column already reads `REF` while the bench line honestly reads `PLANE -0.31`. The honest displayed plane always lives in the readings line, so nothing lies — but if Justin's live pass notices the column leading the cut, derive the readout from the spring value instead. One-line change in SliceScrubber.
2. **Between drill beats the scrubber re-enables.** `alertActive` drops during the resolved dwell, so an operator can sweep mid-drill between postings; the next posting snaps home again. Defensible as built (the dwell is reading time, not a procedure), but it is a behavior Justin should feel live before it's called intended.
3. **FieldIntegrity growth** (above): extract the annotation write block on the next touch.

## Impeccable Delegation
- None needed: no layout/heading changes on reading surfaces; contrast covered by token reuse already validated in the phase-7 audit; performance covered by the loop-gating checks above (no new render loop — the ghost is loop-free SVG, the scrubber writes ride existing frames).
