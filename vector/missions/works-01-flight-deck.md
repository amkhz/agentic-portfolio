# Mission: The Flight Deck (Works 01)

> The single source of "where are we" for this build. Every work session reads this first; every PR that advances the build updates the **Now** line and checklist in the same PR (that is the definition-of-done rule that keeps nothing from slipping). Keep it lean: current state, locked decisions, open threads. History lives in git and the PRs.

**Now:** Phase 1 skeleton landed 2026-07-03 (route, scoped tokens, manifest, state machine, colophon, decline card, static plate; boot cadence is placeholder). Boot-ritual riffs delivered, direction pending Justin. Next up: **Wallace direction probes**, then **Phase 2 — Field Integrity.**

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

## Build checklist

Each phase is a shippable PR. Tick items here in the same PR that lands them.

- [ ] **Wallace direction probes** (before phase 2): instrument-bench material study; field-render spectral-ramp study; consciousness-chamber end state. Baked-text call per render with Justin.
- [x] **Phase 1 — Skeleton:** route + lazy chunk, scoped tokens, `core/works/` manifest, state machine, colophon chrome, mobile decline card, reduced-motion/no-WebGL static plate scaffold.
- [ ] **Phase 2 — Field Integrity** (hero instrument, ogl shaders). → **Roy review.**
- [ ] **Phase 3 — Synthetic Orientation + Vacuum Energy.**
- [ ] **Phase 4 — Control panel:** intent fields, proposal cards, utilization meter (A2 band), commit-moment choreography.
- [ ] **Phase 5 — The drill:** six beats incl. the verifiable false alarm, alert grammar (visual + aural), residual status. → **Roy review.**
- [ ] **Phase 6 — Paradigm slider:** operator-state strip promotion, regime transitions, the dissolve. → **Roy review.**
- [ ] **Phase 7 — Polish:** `/audit`, `/polish`, reduced-motion plate finish, D6 budget verification, Archive Lighthouse ≥ 90 re-check.
- [ ] **Shelf shape + PR** (near ship): Works section on the lab home; needs the sigil + thesis line.
- [ ] **Colophon copy:** Writer + Gaff pass, Joi-gated; sources incl. dird-34 guide direct link; Works arm line (D7 candidate).

## Open build questions (resolve during build, record here)

- Display face (font procedure; voice words: calibrated, patient, luminous).
- Boot-ritual choreography (movement 1): Justin leaning **D+A blend** (hold-to-start gesture, certification self-test grammar per instrument) after the 2026-07-03 riff session; operable prototype on the riff-sheet artifact. Lock before the boot timeline is authored. Implementation note: one GSAP timeline, hold scrubs the playhead, release runs it backward; skeleton machine already supports it (`WAKE` / `ABORT_WAKE` / `BOOT_COMPLETE`).
- Field-render spectral ramp (live WebGL calibration against AA; informed by Wallace probe).
- Drill re-arm for repeat visitors, or once per session.
- Decline-card capture format (static frame vs short clip, weight budget).

## Fast-follow parking lot

Spatial soundscape (Panner3D channel); tablet-landscape reduced deck (only if cheap); foyer question at Works 02; "tokenize lockup metrics when Works renders it a second time" (Director item, triggers when the colophon reuses the masthead lockup).

## Rules of engagement (every session)

Feature branch, never main. `npm run lint` + `npm run build` before done. OKLCH tokens by name only. No em-dashes in copy. Update this doc in the same PR as the work. State files touched and their layers.
