# Mission: The Flight Deck (Works 01)

> The single source of "where are we" for this build. Every work session reads this first; every PR that advances the build updates the **Now** line and checklist in the same PR (that is the definition-of-done rule that keeps nothing from slipping). Keep it lean: current state, locked decisions, open threads. History lives in git and the PRs.

**Now:** Phase 3 BUILT 2026-07-04 (this PR): all three instruments are live. Synthetic Orientation is a slim WebGL horizon strip (banking hairline, faint flow streaks, ladder fixed in the bench frame; bone ink only, felt before looked at) and Vacuum Energy is the invented lattice gauge (SVG on the readings cadence; extraction lattice, demand line, margin gap); both from pure deterministic models beside `field.ts`, both booting through the generic sweep, both with static plates and sr mirrors; see checklist. Deck chunk 54.6 of 350 KB gz; 246 tests. Recent context: annotation layer MERGED 2026-07-04 (PR #180 + #179 stack repair, gut-check passed; lane legibility parked in open questions); Phase 2 MERGED 2026-07-03 (PR #175). Next up: **Justin's live gut-check on the phase 3 instruments** (strip weight, flow feel, gauge form), then **Phase 4 — Control panel** (Roy reviews at phase 5). Boot-feel tuning still open (Justin sleeping on it). Dev tuning: `dialkit@1.3.0` drives the field shader's 15 params as live dials (`src/works/flight-deck/dev/FieldTuner.tsx`); dev-only, absent from production; "log values" copies JSON to bake back into `FIELD_MOTION_DEFAULTS`.

## Reading order for a fresh session

1. This file.
2. `vector/decisions/ADR-017-perihelion-works-arm.md` — ratified architecture (route, tokens, motion lanes, deps, budget).
3. `vector/briefs/works-01-flight-deck-shape-2026-07-03.md` — confirmed interaction model and key states.
4. `plans/works-01-the-flight-deck.md` — the original plan (reference; superseded where the ADR or shape brief says otherwise).
5. `plans/dird-34-source-extraction.md` — evidence base for the three DIRD 34 instruments (findings ledger + final section).

## Locked decisions (do not relitigate)

- Name: **The Flight Deck**. Route `/w/flight-deck`, outside LabLayout, per-work tokens at `src/works/flight-deck/tokens.css` (ADR-017 D1/D2).
- Motion lanes: reactive = `motion` springs, authored = GSAP timelines (D4). Commit moment: tighten, substance-transfer handoff (never a crossfade), lagged consequence; one timeline owns both layers.
- Audio: alert grammar ships (3 severity signatures + confirmation tone, Tone.js behind the opt-in toggle); spatial soundscape is a fast-follow.
- Drill: guided ECAM checklist, one judgment step per alert; unfailable, no timers; false alarm is beat 2.
- Dissolve: staged regimes, scrubbed feel.
- Wallace is sanctioned for Works (concept art, mood frames, probes); imagery restraint is portfolio/Archive doctrine only.
- Colophon cites the dird-34 guide directly (`core/lab/guides/dird-34-cognitive-limits.md`, complete as of PR #169).
- Home linking: evolve the Shelf (Works section, instrument-on-the-shelf register); foyer deferred to Works 02.
- Boot ritual: **D+A blend, locked 2026-07-03.** Hold-to-start gesture, certification self-test grammar per instrument (sweep, lamp flash in severity order, caption, then data), completion lands as a one-breath deck settle (synchronized gauge overshoot, bench edge to operator channel) plus a subtle emission on ready light and gauges (bloom once, hold a quiet glow: an awake deck gives off its own light; ready light emits in the operator channel, gauges in their own bone light so telemetry and watcher stay unconfusable). One GSAP timeline; the hold scrubs the playhead, release runs it backward. Machine events `WAKE`/`ABORT_WAKE`/`BOOT_COMPLETE` already fit. Choreography reference: the riff-sheet artifact (2026-07-03 session). Doctrine note, per Justin same day: slop bans are overridable anywhere when the move has meaningful use, not just for show. Execution amendments from live review of the built ritual (2026-07-03, PR #175): the settle's positional overshoot read as a bounce and was cut; the one-breath settle is carried by a single brightness exhale plus the emission bloom traveling bench edge to operator channel. Hold-to-start gained visible charge feedback: progress ring strokes in with the playhead, lamp glow swells under the finger, both drain on early release.

## Build checklist

Each phase is a shippable PR. Tick items here in the same PR that lands them.

- [x] **Wallace direction probes** (before phase 2): instrument-bench material study; field-render spectral-ramp study; consciousness-chamber end state. Baked-text call per render with Justin. Record in `mocks/flight-deck-probes/` (6 renders + caption sidecars, 2026-07-03; bench + ramp re-rendered same day under strict typography-craft captions, strict validation on). Outcomes: bench register validated (bench s11 is the direction reference; s47's physical needles noted as retro drift, not the lane); readings-are-HTML confirmed (incidental baked micro-text garbles, deliberate mono strings render perfectly, 12/12 across both passes); chamber s47 is the movement-5 end-state reference. Ramp finding: Ideogram's perfusion prior resists a fully red-free ramp (two palette passes, red still bleeds in below the amber top), so the probes stand as register references, not color specs; the amber-top ramp is enforced exactly by the WebGL shader in phase 2.
- [x] **Phase 1 — Skeleton:** route + lazy chunk, scoped tokens, `core/works/` manifest, state machine, colophon chrome, mobile decline card, reduced-motion/no-WebGL static plate scaffold.
- [x] **Phase 2 — Field Integrity** (hero instrument, ogl shaders; built 2026-07-03). Shader reads the five ramp stops from tokens.css and interpolates in OKLab (violet-to-amber desaturates through warm neutral, never red); boot ritual is one GSAP timeline per the locked score; static plate got a no-WebGL CSS ring from the same tokens. → **Roy reviewed 2026-07-03**: HOLD (ink-faint on small text vs AA) cured in-PR via `--deck-ink-label`; mask literal tokenized; shader/readings clock unified. Report: `vector/audits/roy-review-2026-07-03-works-01-phase-2.md`.
- [x] **Annotation layer ("earn the width")** (merged 2026-07-04, PR #180 + #179 stack repair): caliper arcs + leader lines from the three tracked stress concentrations to per-lane readouts (`ST n` / bearing / intensity / watch state), projected in `fieldAnnotation.ts` by inverting the shader transform (frame dials, aspect guard, ring centerline) so annotation and render share one geometry; lane text ticks on the readings cadence from the same sample; per-lane sr mirror sentences; aspect-driven presence, no timed entrance. Justin's live gut-check passed same day.
- [x] **Phase 3 — Synthetic Orientation + Vacuum Energy** (built 2026-07-04): two pure models join the field's pattern (`core/works/flight-deck/orientation.ts`, `vacuum.ts`: deterministic, nominal drift only, the drill will feed the same shapes adversarial inputs). Synthetic Orientation = slim WebGL horizon strip in the horizon region (banking hairline + faint flow streaks hugging it, ladder lines fixed in the bench frame as the still reference; bone ink only, felt before looked at; spatial audio stays parked per the shape brief). Vacuum Energy = the invented lattice gauge (SVG, no render loop, re-samples on the readings cadence: extraction accumulates hairlines, demand is the one firm line, margin is the gap). Gauge form reworked same day after Justin's first look (four-variation board): the wide lattice bed spanning the region width, plus the expanded margin strip (demand-centered ±0.06 window, ×8; real-instrument precedent: expanded ILS/radar-altimeter scales) — the strip is one commit to revert if the live read says bed-only. Both instruments ride the generic boot sweep; static plates at t=0 + sr sentence mirrors per the a11y contract. Orientation strip approved live ("strip weight is good, animation looks good"); gauge combo (bed + expanded margin strip) approved live 2026-07-04 ("the combo works").
- [ ] **Phase 4 — Control panel:** intent fields, proposal cards, utilization meter (A2 band), commit-moment choreography. Justin's note 2026-07-04 (from the phase 3 live read): the point is to "control" the ship and watch the horizon and bubble move — treat the lagged-consequence wiring (commit ripples visibly through Synthetic Orientation and Field Integrity) as a first-class requirement of this phase, not garnish.
- [ ] **Phase 5 — The drill:** six beats incl. the verifiable false alarm, alert grammar (visual + aural), residual status. → **Roy review.**
- [ ] **Phase 6 — Paradigm slider:** operator-state strip promotion, regime transitions, the dissolve. → **Roy review.**
- [ ] **Phase 7 — Polish:** `/audit`, `/polish`, reduced-motion plate finish, D6 budget verification, Archive Lighthouse ≥ 90 re-check.
- [ ] **Shelf shape + PR** (near ship): Works section on the lab home; needs the sigil + thesis line.
- [ ] **Colophon copy:** Writer + Gaff pass, Joi-gated; sources incl. dird-34 guide direct link; Works arm line (D7 candidate).

## Open build questions (resolve during build, record here)

- Display face (font procedure; voice words: calibrated, patient, luminous).
- Field-render spectral ramp: **resolved 2026-07-03.** Amber top locked from the Wallace probe; phase 2 landed five stops as tokens (`--deck-field-stop-0..4`), OKLab-interpolated in-shader, and Justin validated the color live on the WebGL render ("the color tokens look right"). Formal contrast re-check rides the phase 7 `/audit`.
- Hero composition at wide widths: **resolved 2026-07-04, Justin locked "earn the width"** (option B of the 2026-07-03 comparison artifact); **built same day** (see checklist). The anchor is the baked frame dials; the tuner still drives it live for the gut-check.
- Annotation lane legibility (parked 2026-07-04, from Justin's sketchpad riff): the lane columns currently speak avionics shorthand (`BRG`, `INT`) where a visitor needs plain words. When the drill makes people read these lanes under pressure (phases 4-5), consider (a) spelling the columns out (`BEARING 034`; the width is already earned wherever the layer shows) and (b) a per-lane trend word (`0.62 · rising`); the field model is pure in time, so a true derivative is cheap and honest, no fake state. Decide together with the drill's alert grammar so lane vocabulary and alert vocabulary land as one language.
- Drill re-arm for repeat visitors, or once per session.
- Decline-card capture format (static frame vs short clip, weight budget).

## Fast-follow parking lot

Spatial soundscape (Panner3D channel); tablet-landscape reduced deck (only if cheap); foyer question at Works 02; "tokenize lockup metrics when Works renders it a second time" (Director item, triggers when the colophon reuses the masthead lockup).

## Rules of engagement (every session)

Feature branch, never main. `npm run lint` + `npm run build` before done. OKLCH tokens by name only. No em-dashes in copy. Update this doc in the same PR as the work. State files touched and their layers.
