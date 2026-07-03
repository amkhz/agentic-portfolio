# Mission: The Flight Deck (Works 01)

> The single source of "where are we" for this build. Every work session reads this first; every PR that advances the build updates the **Now** line and checklist in the same PR (that is the definition-of-done rule that keeps nothing from slipping). Keep it lean: current state, locked decisions, open threads. History lives in git and the PRs.

**Now:** Phase 2 MERGED 2026-07-03 (PR #175, merge 672db18): Field Integrity hero live (ogl shader, amber-top ramp in OKLab from five token stops, readings HTML with sr mirror), boot ritual as one GSAP timeline per the locked score, gsap scoped to the deck chunk (49 of 350 KB gz). All phase gates closed same day: Justin's live review (ramp validated; hold feedback added; settle bounce cut for brightness exhale + traveling emission) and Roy's review (AA HOLD cured in-PR with `--deck-ink-label`; see checklist). Same-day motion pass after Justin's live note (a static-reading bubble undercuts the live thesis): field render gained living speckle, a circulation crest (~12s lap), watchable drift rates (10-30s cycles), and a faint ring breath; telemetry model untouched. Justin-approved live. Next up: **Phase 3 — Synthetic Orientation + Vacuum Energy** (Roy reviews again at phase 5). Wanted for future tuning sessions: DialKit-style dev controls on the shader params (see parking lot).

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
- [ ] **Phase 3 — Synthetic Orientation + Vacuum Energy.**
- [ ] **Phase 4 — Control panel:** intent fields, proposal cards, utilization meter (A2 band), commit-moment choreography.
- [ ] **Phase 5 — The drill:** six beats incl. the verifiable false alarm, alert grammar (visual + aural), residual status. → **Roy review.**
- [ ] **Phase 6 — Paradigm slider:** operator-state strip promotion, regime transitions, the dissolve. → **Roy review.**
- [ ] **Phase 7 — Polish:** `/audit`, `/polish`, reduced-motion plate finish, D6 budget verification, Archive Lighthouse ≥ 90 re-check.
- [ ] **Shelf shape + PR** (near ship): Works section on the lab home; needs the sigil + thesis line.
- [ ] **Colophon copy:** Writer + Gaff pass, Joi-gated; sources incl. dird-34 guide direct link; Works arm line (D7 candidate).

## Open build questions (resolve during build, record here)

- Display face (font procedure; voice words: calibrated, patient, luminous).
- Field-render spectral ramp: **resolved 2026-07-03.** Amber top locked from the Wallace probe; phase 2 landed five stops as tokens (`--deck-field-stop-0..4`), OKLab-interpolated in-shader, and Justin validated the color live on the WebGL render ("the color tokens look right"). Formal contrast re-check rides the phase 7 `/audit`.
- Drill re-arm for repeat visitors, or once per session.
- Decline-card capture format (static frame vs short clip, weight budget).

## Fast-follow parking lot

Spatial soundscape (Panner3D channel); tablet-landscape reduced deck (only if cheap); foyer question at Works 02; "tokenize lockup metrics when Works renders it a second time" (Director item, triggers when the colophon reuses the masthead lockup); dev-only DialKit panel (`/interface-craft`) exposing the field shader's motion params as live controls, stripped from production (Justin, 2026-07-03).

## Rules of engagement (every session)

Feature branch, never main. `npm run lint` + `npm run build` before done. OKLCH tokens by name only. No em-dashes in copy. Update this doc in the same PR as the work. State files touched and their layers.
