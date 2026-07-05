# Feature: Field Integrity Slice Plane + Locator Ghost (Works 01.1)

> Dreamer plan, 2026-07-05. From Justin's riff during the phase 6 PR (#186): "what if our field integrity display was 3D/4D? Isn't that more accurate?" The answer that survives the deck's doctrine is the ultrasound move: keep the computed slice, let the operator sweep it. Also records the Synthetic Orientation 3D/4D decision (question 3, resolved: stays flat, see §Decision notes).

## Summary

Give the Field Integrity render a third spatial dimension the honest way: the display stays a computed 2D cross-section (medical-imaging register, shape brief §3), and the operator gains a **slice-plane scrubber** that sweeps the cut fore-to-aft through the bubble. A small **locator ghost** (the ultrasound body-marker move) shows the whole bubble in silhouette and where the current cut sits. 3D is revealed by operating, not by rendering — which is the piece's entire thesis applied to its own hero instrument.

## Context

- The shape brief rejects hologram logic by name; DIRD 28's own analogy is medical imaging. Radiologists read slices; the sweep is how they read volume. This extends the register instead of breaking it.
- The drill's warning beat gains a payoff retroactively: a thinning wall has a *location* now. Sweeping the plane to find where the wall runs thinnest is a genuinely new operable moment.
- 4D is already on the deck (trend words, disturbance envelopes, traces are rendered time); this plan adds the third spatial dimension only. A field-history time scrub is a separate riff, not in scope.

## Layer Impact

- design-system/: none (deck tokens are per-work; no new tokens expected — bone ink + existing line tokens cover the ghost and scrubber).
- core/: `field.ts` gains the axial dimension (details below); copy.ts gains scrubber/plane strings.
- services/: none.
- src/: hero region gains the scrubber + ghost; `FieldIntegrity.tsx` shader gains 1-2 uniforms; `fieldAnnotation.ts` consumes the shared ring function.

## Approach

**Model (core/works/flight-deck/field.ts).** Introduce slice position `s ∈ [-1, 1]` (aft to fore, 0 = the reference plane, which is exactly today's display — full backward compatibility, `sampleFieldTelemetry(t, disturb, s = 0)`).

1. **Shell profile.** One pure function `ringScale(s)` — a softened superellipse (e.g. `(1 - |s|^2.4)^0.55`, floored ~0.35) so the cut ring shrinks toward the bubble's poles without collapsing. Lives in core and is consumed by BOTH the shader (uniform) and `fieldAnnotation.ts`, so the caliper projection stays glued by construction (the annotation file is the shader's inverse; the geometry must have one home).
2. **Stress concentrations become ridges.** Each slot gains a drifting axial center and half-extent; in-slice intensity = midship intensity × axial profile with `profile(0) ≡ 1`, so every existing number, test, and drill guarantee at the reference plane is untouched. The sweep reveals where each ridge dies out. Option (recommended): one **flank concentration** visible only off-plane — the thing the midship view cannot see is the argument for the feature.
3. **Wall/even off-plane.** Mild, smooth s-dependence (flanks run slightly thinner). Readings stay honest to the *displayed* plane: the bench line gains `PLANE +0.30`-style signed position, the sr mirror speaks it.
4. **Alert discipline.** The drill's script, cross-check panel, and band-floor guarantees reference the s=0 plane, labeled as such (`SENSOR LANE B · WALL · REF PLANE`). Recommended: the scrubber snaps home when an alert posts (ECAM procedures read against the reference plane); one line of code, honest to real practice. Justin call.

**Shader (FieldIntegrity.tsx).** Uniforms `uSlice` (readout only, if needed) + `uRingScale`; centerline `R` multiplies by the scale. Stress values already arrive per-frame from the CPU sample, now slice-sampled — the deficit/neck grammar (phase 5) works unchanged and gets more interesting under sweep. Est. ~10 shader lines.

**Scrubber (src, new small component).** Horizontal, directly under the canvas in the hero region, full canvas width: mono `PLANE` kicker, `AFT`/`FORE` end labels, tabular signed value, native range input + spring thumb — the exact interaction pattern ParadigmSlider established (reactive lane, keyboard free, `aria-valuetext` speaks the plane). Boots with `js-boot-data`; dims with the hero in the paradigm dissolve; disabled/homed during drill alerts if the snap-home call is taken.

**Locator ghost (src, SVG — not a shader).** Reasons: it is a locator glyph, not a render (ultrasound scanners draw the body marker as a schematic, never an image); no continuous animation demands (re-samples on the readings cadence; the slice line tracks the scrubber input directly); crisp 1px hairlines in token ink; zero third WebGL context; the t=0 still serves the static plate for free (the vacuum-gauge precedent exactly).

- **Placement: the legend column**, above the spectral ramp bar (right edge of the canvas). This survives every width regime by construction: the legend column exists at all aspects, unlike the annotation layer (gated 2.0→2.4 aspect). At square heroes the ghost persists while the caliper lanes are dark — correct, since it carries no lane data. ~3.5rem tall.
- **Content:** bubble silhouette (two arcs, `--deck-line`), the one firm line = current slice position (`--deck-ink`, the vacuum gauge's "demand is the one firm line" grammar), faint axial ticks where the stress ridges run (`--deck-ink-faint`). `aria-hidden`; the readings line + mirror carry the plane for a11y.

## Implementation Steps

1. core: `ringScale(s)`, axial ridge model, `PLANE` readings + mirror wording, copy strings; property tests (s=0 identity vs today's model; ridge visibility off-plane; scale floor). (core/)
2. core: drill/cross-check reference-plane labeling; decide snap-home. (core/ + copy)
3. src: shader uniform + centerline scale; thread `slice` through FieldIntegrity props/handle. (src/)
4. src: shared ring function into `fieldAnnotation.ts` (delete the duplicated centerline math). (src/)
5. src: SliceScrubber component (ParadigmSlider pattern); wire spring value → sample slice + uniform. (src/)
6. src: LocatorGhost SVG in the legend column. (src/)
7. Gates + mission doc checklist/Now line; Roy review (annotation-projection identity is the thing to verify hard).

## Files Affected

- core/works/flight-deck/field.ts (+ field.test.ts): axial dimension (core)
- core/works/flight-deck/copy.ts: scrubber/plane/ghost strings (core)
- src/works/flight-deck/components/FieldIntegrity.tsx: uniforms, props (src)
- src/works/flight-deck/components/fieldAnnotation.ts (+ test): shared ring scale (src)
- src/works/flight-deck/components/SliceScrubber.tsx, LocatorGhost.tsx: new (src)
- src/works/flight-deck/flight-deck.css: scrubber + ghost styles (src)
- vector/missions/works-01-flight-deck.md: checklist + Now line, same PR

## Dependencies

None. No ADR needed: no new package, no layer or lane change (scrubber = reactive/motion, nothing authored beyond what exists).

## Accessibility Requirements

- Scrubber is a real range input; `aria-valuetext` speaks signed plane position in plain words ("0.3 toward the bow").
- Readings line + sr mirror always carry the displayed plane; the ghost is decorative (`aria-hidden`).
- Reference-plane labeling on all alert/cross-check copy so the drill never reads against an unstated plane.
- Static plate renders the s=0 slice (unchanged) + the ghost still.

## Phase Fit

**Not PR #186** (the dissolve is under review). One PR, sized like the annotation layer (~1 session), slotted **after phase 7 ships** as Works 01.1 — first item in the fast-follow lot, ahead of the spatial soundscape (it deepens the hero; the soundscape adds a channel). Roy reviews (projection identity, band-floor guarantees at s=0, a11y contract).

## Open Questions

- Snap-home on alert posting: yes (recommended) or leave the plane where the operator had it?
- The off-plane flank concentration: ship in 01.1 or hold for a drill-2 idea (a future alert that *requires* sweeping to verify — the false-alarm principle in 3D)?
- Ghost orientation: bubble drawn nose-right (matches AFT left / FORE right on the scrubber) — confirm against how the commit bearing reads on the ring.

## Decision notes (question 3, resolved)

**Synthetic Orientation stays a flat felt strip.** The TSAS argument is about *channel*, not geometry: orientation belongs in peripheral vision, continuous and subconscious, felt before looked at. A 3D attitude sphere (the mechanical "eight ball" ADI, or G1000-style synthetic terrain) is a foveal instrument — it would demand exactly the look the strip is designed to never need, and the void it flies in has no terrain to draw. The strip already encodes the 3D state that matters (bank, pitch, flow) as the disagreement between horizon and bench frame. **The in-register 3D upgrade for orientation already exists in the parking lot: the Panner3D spatial-audio channel** — direction and velocity rendered in real 3D space around the operator's head, the second underused channel. Any richer visual 3D navigation (nav display, traffic, route-in-space) is a *new instrument* in a different register, Works 02 territory, not a mutation of this one. No doctrine change; recorded here so the question stays answered.
