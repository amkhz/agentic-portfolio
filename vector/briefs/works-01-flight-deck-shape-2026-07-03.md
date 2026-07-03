# Shape Brief: The Flight Deck (Works 01)

**Date:** 2026-07-03
**Status:** DRAFT, awaiting Justin's confirmation. Per ADR-017's ratification protocol this brief proposes amendments to exactly two ADR clauses (D4 commit-moment detail; D6 unchanged). No code until this brief is confirmed and ADR-017 is ratified.
**Register:** brand (design IS the product; per ADR-017 D3 the register inversion makes this doubly true).
**Upstream:** `vector/briefs/works-01-flight-deck-2026-07-03.md` (invest brief), `vector/decisions/ADR-017-perihelion-works-arm.md`, `plans/works-01-the-flight-deck.md`, `plans/dird-34-source-extraction.md` (final section).

> Discovery note: the interview inputs (purpose, audience, success, content, constraints, anti-goals) are answered directly by the documents above; no interview rounds were run.
>
> **Wallace is sanctioned for Works exploration (Justin, 2026-07-03).** The imagery-restraint doctrine is portfolio/Archive doctrine and does not apply to Works projects. Concept art, cockpit mood frames, and visual direction probes run through Wallace freely before and during build. Probe plan: 2-4 direction tests before phase 2 (instrument-bench material/composition study; field-render spectral-ramp study on the medical-imaging lane; consciousness-chamber end state). Probes are direction tests, not final designs; baked-text vs HTML labels decided with Justin per render, per the Wallace intake convention.

---

## 1. Feature Summary

An operable cockpit for breakthrough flight: the visitor wakes a dormant deck, reads three live instruments, commits an intent and watches it become field geometry, works a failure drill (including catching a false alarm), and then dissolves the whole interface along the control-paradigm spectrum. Built for the designer with no physics background; every movement is a door, not a test. It is the Works arm's debut and its template.

## 2. Primary User Action

**Work the deck.** Not read it, not watch it. The one thing the visitor must understand: every instrument is live, every control does something, every alert has a procedure. If they leave having *operated* something a film would only have shown them, the piece has made its argument.

## 3. Design Direction

**Scene sentence:** a designer alone at a desktop after dark, the room dim, boards a dormant spacecraft deck that wakes under their hands and becomes the only light source in the room. The sentence forces dark; not house night mode, but a darker, instrument-lit dark that per-work tokens sanction. Keep the house hand: warm-dark, never blue-black, never pure black.

**Color strategy: Full palette** (a cockpit's severity grammar is a named-role system, not an accent):

- **Deck base:** deep warm dark (humus-family depth; deeper than the Archive's graphite reading floor is allowed here because nothing long-form is read on it).
- **Nominal instrument ink:** pale warm bone-white, the color real avionics use for "everything is fine." Readings, reticles, scales.
- **Field render ramp:** a medical-imaging-derived spectral ramp for the bubble render (DIRD 28's own analogy: making invisible internal structure visible). Perfusion-map logic, not hologram logic.
- **Severity triad:** advisory (restrained, near-ink), caution (warm amber, the house's technology-and-light lineage earning a literal instrument role), warning (a dusty signal red, the house signal family's cousin). Shape + position + label always redundant with color.
- **Operator-state channel:** one quiet distinct hue for the physiological traces, so the watcher-channel never confuses with vehicle telemetry.

All OKLCH by token name in `src/works/flight-deck/tokens.css` (ADR-017 D2). WCAG 2.2 AA within the deck's own surfaces.

**Category-reflex check, both orders.** First-order reflex: "spaceship cockpit → cyan/teal holograms on black" (Territory Studio film FUI). Rejected; it is literally the thesis's antagonist. Second-order reflex: "cockpit that's not cyan-hologram → green-phosphor / amber retro terminal" (Nostromo nostalgia, dev-bro terminal). Also rejected. The lane that remains is the honest one: **contemporary real instrumentation** — the deck reads like equipment certified by someone, not art-directed for a lens.

**Anchor references (real objects, not films):**
- **Airbus ECAM** — the alert grammar, the monitor-manage-review posture, procedures surfaced beside alerts, residual status after resolution, and the calm of real severity copy.
- **Medical imaging viewers** (ultrasound / fMRI activation maps) — the Field Integrity render's visual language: computed visualization of invisible internal structure, spectral ramps with meaning, annotation without decoration.
- **Glass-cockpit synthetic vision** (Garmin G1000-class synthetic horizon) — Synthetic Orientation's baseline: the horizon that exists because the window can't be trusted.

**Typography (per-work scope, ADR-017 D2):** instrument chrome, readings, labels, procedures set in **JetBrains Mono** (the house's instrument-honest voice; continuity of hand across all three surfaces). The plain-language captions, the door-opening device, are deliberately NOT mono: they are the human voice on the deck and use the Archive's body face, so the reader's-notebook voice is what welcomes you aboard. A display face for the title card and colophon is chosen at build via the brand font procedure (three voice words: *calibrated, patient, luminous*; reflex-reject list applies). Readings tabular-numeral throughout.

## 4. Scope

- **Fidelity:** production-ready; this is flagship work and the Works template.
- **Breadth:** one route (`/w/flight-deck`), the full five-movement session, plus colophon chrome, decline card, and reduced-motion plate. **Out of scope but open (Justin, 2026-07-03): how Works links from the Perihelion home.** The deck needs at least one entry point on the lab home so the piece is not orphaned; whether the home evolves into a two-arm foyer is deferred (see §10).
- **Interactivity:** shipped-quality operable piece; state machine per plan (preflight → nominal → drill → recovery, plus paradigm position).
- **Time intent:** polish until it ships, phased per the plan's seven PRs; Roy at phases 2, 5, 6.

## 5. Layout Strategy

The deck borrows the scan logic of real cockpits: importance = visual prominence = scan position.

- **Field Integrity is the hero**, center-left dominance, the largest continuous surface, exactly where engine gauges live in current cockpits (Design Hook 1 rendered as layout).
- **Synthetic Orientation is literally peripheral:** flow fields live at the viewport edges (peripheral vision is the underused channel it feeds), with a slim synthetic-horizon strip; it should be felt before it is looked at.
- **Vacuum Energy is small and dense**, lower-left; a quantity with no metaphor gets a compact invented gauge, not more area.
- **Translation layer panel right side:** intent fields (destination, timeline, risk tolerance), proposal cards, the route trace, and the **utilization meter** docked at the panel's base where the operator's eye rests between decisions.
- **Operator-state strip: slim, full-width, docked bottom edge.** Present from boot in instrumented mode. Peripheral by design; it is the system watching the watcher.
- **Alert region top center** (master-caution position; aviation puts it at the top of the scan), with procedures unfolding beside the affected instrument, not in a modal.
- **Colophon** is a separate quiet surface reached by deliberate exit, not a footer under the deck.

Composition discipline: this is an instrument bench, not a dashboard of cards. Instruments are bezel-less regions separated by space and alignment, not boxed tiles. No card grid, no side-stripe severity bars (ban), no glassmorphism.

## 6. Key States

**Movement 1 — Pre-flight:** dormant (near-dark, one breathing indicator, a single invitation line); waking (instruments come online one at a time, each with its one-line plain-language caption; GSAP boot timeline); ready.

**Movement 2/3 — Nominal operation:** instruments live with gentle telemetry drift; intent panel open; *proposal pending* (translation layer offers delegation cards; utilization meter ticks up); *reviewing* (operator inspects a proposal against the field render); *committed* (the commit-moment choreography, §7); *translating* (deliberate lag, field deforms, route becomes substance).

**Utilization meter states:** in-band (needle in the annotated A2 region, ~50-70%); under-loaded (needle sagging toward region D; the translation layer visibly hands the operator a routine task — adaptive automation made diegetic); near-ceiling (past 70%, meter warms, proposal cadence visibly slows: the system protecting the operator's picture). The meter is the meaningful-work argument rendered.

**Movement 4 — The drill**, six beats:
1. *Advisory (true):* coherence drift; procedure appears beside the instrument; operator works it.
2. *Advisory (the calibrated false alarm):* wall-thickness efficiency margin flags on sensor lane B. The procedure's first step is **verify**: the operator cross-checks the flagged lane against the field render, the two disagree, and the operator dismisses the alert. Caption after dismissal: the 20-25% principle in one plain line (an alert system that is never wrong teaches its operator to stop checking). This beat lands *before* escalation so the verification habit is warm when it matters.
3. *Caution:* field asymmetry, differential time dilation; amber, aural signature (if sound on), guided procedure.
4. *Warning:* bubble collapse threatened; the deck's one red moment; procedure is new-in-kind (field integrity replaces airframe stress).
5. *Recovery:* the operator's procedure completes; systems settle in sequence (reverse boot echo).
6. *Residual status:* ECAM-style after-state, what tripped, what was done, what margin remains, plus one warm line. The operator-state strip visibly settles too.

**Movement 5 — Paradigm slider:** three regimes (instrumented / hybrid / consciousness) with authored transitions between them; within a regime the slider position continuously modulates light level and instrument presence. Consciousness end: the deck is nearly dark, the operator-state strip has migrated center and become the control surface, coherence traces breathing as input. The promotion, not introduction, of biometrics is the arc's proof.

**Cross-cutting:** reduced-motion / no-WebGL static instrument plate (all instruments at a legible nominal state, drill as annotated stills; one fallback serves both); mobile decline card (sigil, thesis, short capture, "this instrument wants a wider bench"); sound off (default) / on (Tone lazy-loads, alert signatures + confirmation tones); keyboard focus states following the movement sequence; text mirrors for every reading.

## 7. Interaction Model

**Input vocabulary:** pointer + full keyboard parity. Reactive feel is `motion` springs; sequenced choreography is GSAP timelines (ADR-017 D4 lanes). Micro-interactions may carry small damped overshoot; arrivals are critically damped.

**The commit moment (refining ADR-017 D4; architecture untouched).** The seam where the SVG proposal layer becomes shader consequence is choreographed as a *transfer of substance*, never a crossfade:
1. **Tighten (~0.4s, critically damped):** on approval, the delegation card condenses; annotations retract; the route trace's line weight draws down to a single certain stroke. The proposal stops being a discussion.
2. **Handoff (one continuous gesture):** the SVG route strokes itself out from the tail (DrawSVG retract) while the identical parametric path lights up inside the field render (shader uniform fed by the same GSAP timeline). One object crosses a boundary; the drawing is consumed and the field inherits it. The two layers are never both fully visible; substance is conserved.
3. **Consequence (deliberate ~0.6s lag):** the field deforms *late*. The gap between intent and action is the piece's subject, so the choreography holds it open just long enough to feel. During the lag the utilization meter blips: the operator holding the picture while the system works.
Reduced motion: a hard cut with a state caption; the lag beat is preserved as a labeled pending state.
*Proposed one-line amendment to ADR-017 D4 at ratification:* "Commit choreography: tighten, handoff (substance transfer, no crossfade), lagged consequence; timeline owns both layers."

**The drill procedure UI: guided checklist (ECAM posture), with one genuine decision per alert.** Between guided and discoverable, guided wins on doctrine: the mission test forbids expecting a designer-without-physics to invent procedures, the research being demonstrated *is* the surfaced-procedure posture, and DIRD 34 finding 9 says interface complexity inflates interaction time and drops the supervision ceiling. Discovery is preserved where it teaches: each procedure contains one step the system will not do for the operator (the false alarm's verify-and-judge; the warning's choice of redistribution pattern). The checklist advances itself on completed steps; it never advances the judgment step.

**The paradigm slider: staged regimes, scrubbed feel.** The thumb is spring-driven and continuous; crossing a regime boundary triggers an authored GSAP transition that plays while the drag continues; within regimes the position drives a few uniforms directly (light, instrument thinning). A slow full drag reads as one continuous dissolve (the money shot survives); a fully scrubbed dissolve (every element interpolated everywhere) is rejected as unauthorable mush, and a fully staged one (three buttons in costume) is rejected as losing the single-gesture argument.

**Drill tone: serious procedure, safe outcome.** The line, made operational: severity is carried by light, sound, and grammar, never by horror devices (no screen shake, no klaxon spam, no red-flooded viewport, no countdown timers). Copy stays procedural and calm, real crew-alerting register. The drill cannot be failed, only worked at the visitor's own pace; time pressure is implied by escalation choreography, never enforced. Recovery is guaranteed and lands warm. The false alarm is the drill's wit: the system telling the visitor "I am designed to be wrong sometimes; that is why you matter."

**Sound: the alert grammar ships; the spatial soundscape parks.** Keep: three severity aural signatures plus a confirmation tone, synthesized in Tone.js behind the opt-in toggle; small surface, and movement 4's argument is dishonest without it (real alerting pairs severity with sound). Park as fast-follow: Synthetic Orientation's continuous Panner3D spatial channel; the peripheral flow fields carry that instrument's argument visually meanwhile. Captions mirror everything audible either way.

**Entry to exit flow:** arrive → dormant deck invites one action → boot ritual (captions introduce each instrument) → free nominal play with intent commits → drill triggers after the first successful commit (scripted, once) → recovery → the slider is revealed as the final instrument → dissolve → consciousness chamber rests → exit to colophon (thesis, sources, back to the Archive).

## 8. Content Requirements

All copy: plain language, no physics credentials assumed, no permission framing (the door is opened by being comprehensible, never by saying "you're allowed"), no em-dashes, mission test per line. Needs:

- Invitation line (dormant state), one boot caption per instrument (3), deck-ready line.
- Intent panel labels (destination, timeline, risk tolerance) + 2-3 canned destination options with honest names.
- Proposal card copy (what the translation layer proposes, in one sentence each; 3-4 variants).
- Utilization meter label + hover explainer (one sentence on the 70% ceiling).
- Alert set: 2 advisories, 1 caution, 1 warning; each with label, 3-5 procedure steps, residual line. False-alarm dismissal caption (the 20-25% line).
- Operator-state strip labels (blink, respiration, coherence) + promotion caption at the consciousness end.
- Paradigm regime names (instrumented / hybrid / consciousness) + one line each.
- Decline card copy ("this instrument wants a wider bench" + thesis).
- Colophon: title, thesis paragraph (film FUI is read in 3 seconds, this is operated), source lines: DIRD 28 guide, **DIRD 34 guide (direct link — `core/lab/guides/dird-34-cognitive-limits.md` landed via PR #166, superseding the interim DIRD 28 posture)**, DIRD 13, DIRD 15. A grammar and glossary pass on the dird-34 guide merges soon; write colophon copy after it lands. Works arm line candidate (Q6/ADR-017 D7) drafted here.
- Full text-mirror strings for every instrument reading and every audio event.

Writer + Gaff pass on all of it before ship; Joi profile gates the colophon voice.

## 9. Recommended References

- `motion-design.md` — the boot, drill, and dissolve timelines; the two-lane rule in practice.
- `interaction-design.md` — the procedure checklist, intent panel, slider mechanics.
- `spatial-design.md` — the instrument-bench composition; prominence-by-scan-position.
- `/design-motion-principles` (repo skill) — greenfield motion judgment on Works surfaces per the motion-lane memory.

## 10. Open Questions

- **Resolved at confirmation (2026-07-03):** name = The Flight Deck; audio = alert grammar ships, spatial soundscape parks; Wallace probes sanctioned for Works.
- **Open, needs Justin: how Works links from the Perihelion home.** Do the arms coexist on the current home (the Shelf gains a Works section) or does the home become a two-arm foyer routing to Archive and Works? Recommendation: evolve, don't rebuild. With one Works piece, a foyer over-weights an arm with a single entry; peers-not-pipeline argues Works gets a real section on the existing home (distinct register from the guide shelf: the Flight Deck's sigil + thesis line, an instrument on the shelf of books, not another book spine), with the masthead already carrying the house identity and each arm's line per D7. Revisit a true foyer when Works 02 exists. This touches Archive-side surfaces (LabLayout home), so it ships as its own small shape + PR, not inside the deck's phases.
- **For Justin, still open:** the drill-tone line if he wants it braver; Works arm tagline candidate direction (D7).
- **For build:** display face selection via the font procedure; the exact spectral ramp for the field render (needs live WebGL calibration against AA, informed by the Wallace ramp probe); whether the drill re-arms for repeat visitors or stays once-per-session; decline-card capture format (static frame vs short clip, weight budget).

---

*On confirmation: flip ADR-017 to `accepted` with the D4 one-line choreography amendment (D6 numbers stand as drafted), then Tyrell phase 1 (skeleton) begins.*
