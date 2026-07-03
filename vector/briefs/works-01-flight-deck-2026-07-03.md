# Design Brief: The Flight Deck (Works 01)

**Date:** 2026-07-03
**Designing for:** The designer who has never considered frontier science (Perihelion audience 1)
**Feature / Flow:** A full-bleed, operable cockpit for breakthrough flight at `/w/:slug` on labs.justinh.design. The visitor boards, brings instruments online, sets an intent, works a failure drill, and dissolves the interface along the control-paradigm spectrum. A session, not a page.

> Sources read: VECTOR.md, PRODUCT.md (both design contexts), ADR-009/010/012/016, plans/works-01-the-flight-deck.md, plans/dird-34-prework.md, plans/dird-34-source-extraction.md. Research directories (`vector/research/personas|jtbd|assumptions`) are empty; persona and JTBD sections below are assembled from doctrine, marked where inferred.

---

## Who You're Designing For

**Primary: the designer without a physics background.** Strong design instincts, zero physics credentials, and (per ADR-010) no permission yet to think seriously about warp fields or consciousness-coupled control. They arrive curious and slightly intimidated. Perihelion exists to hand them that permission; the Flight Deck is the first time the house does it through an artifact they can *operate* rather than read. Success for this person, specifically: they fly the deck end to end without ever feeling quizzed. Every instrument introduces itself in plain language, the drill teaches its own procedure, and they leave thinking "I could design for this frontier" rather than "I'd need a degree first."

**Secondary: Justin himself.** The lab is how he learns the territory (PRODUCT.md). The deck must hold up as a genuine design study of DIRD 28's four hooks, not a toy that flatters the material.

**Tertiary, held at the door:** the scholarly-adjacent community (Sol Foundation et al.) and the portfolio's hiring-manager audience. Neither is addressed directly, but the piece must not embarrass itself in front of the first and is the strongest work sample the second will see (the movement-5 dissolve is the LinkedIn clip). They judge craft in seconds; the pre-flight movement is the deck's 5-second trust window.

---

## The Job

> "When I land on a strange instrument panel for a spacecraft that doesn't exist, I want to be taught to fly it by the interface itself, so I can feel what design for the frontier means without needing the physics first." *(inferred — no JTBD documented; grounded in ADR-010's invitational mandate)*

**Before this flow:** Arriving from the Archive (a reading surface — contemplative, text-first), from the portfolio, or cold from a shared link. Exploratory mood, probably desktop, zero context beyond a title. Some arrive mid-scroll from a clip and want the moment they saw.

**After this flow:** They worked a procedure, dismissed a false alarm, watched their intent become field geometry, and dissolved the deck into a meditation chamber. The colophon gives them the thesis (operable, not filmic), the sources (DIRD 28 guide; DIRD 34 guide forthcoming), and the way back into the Archive to read the evidence. The door out is a door deeper in.

---

## Design Principles That Apply Here

- **The register inversion (new, to be ratified in ADR-017):** the Archive's "subliminal craft" plate-and-meal rule inverts in Works. Here the design *is* the meal. Motion, spectacle, and interface-as-subject are the arm's purpose, not violations of it.
- **Open the door, never gatekeep (mission test — survives the inversion intact):** every moment is checked against "does this invite a designer without physics in, or push them out?" One-line plain-language captions on every instrument, procedures that teach themselves, no credential-demanding copy. The drill may raise the pulse; it must never haze.
- **Earned confidence / materials over decoration (portfolio DNA):** every instrument is live, every control does something, every alert has a procedure. Nothing decorative that pretends to be functional — that's the anti-film-FUI thesis itself.
- **Wonder, in moments — promoted to wonder as structure:** the Archive spends wonder sparingly; the deck is built of it. The discipline shifts from "rarely" to "purposefully": each spectacle beat argues a Design Hook.

---

## Constraints

Hard limits, from doctrine:

- **WCAG 2.2 AA.** Full keyboard operability (controls, drill, slider; focus order follows the movements). All instrument readings mirrored in text. Alert severities never color-only (shape + label + position). `prefers-reduced-motion` renders a static instrument plate that still argues the thesis. Audio strictly opt-in, lazy-loaded, captioned equivalents, never autoplay.
- **OKLCH-by-token authoring, no literal colors** — the deck's palette may diverge (per-work token scope, sanctioned by ADR-017), but the *method* (named OKLCH tokens) does not.
- **Four-layer architecture:** works manifest in `core/works/`, UI in `src/works/`, scoped tokens per ADR-017; no services needed.
- **Archive performance is untouchable:** the deck is a lazy chunk on its own route; Lighthouse ≥ 90 continues to apply to the Archive. The deck gets its own realistic budget, recorded in ADR-017.
- **`npm run lint` + `npm run build` pass; no em-dashes in shipped copy.**

Prior-ADR constraints ADR-017 must explicitly amend (do not code around them silently):

- **ADR-009** locks lab routes inside `LabLayout` and lab color to `design-system/lab-tokens.css`. The deck renders outside `LabLayout` with a per-work token file — both need sanctioned exceptions.
- **ADR-016** locks the lab to motion convergence (shared spring tokens). The deck's GSAP authored lane needs the two-lane rule ratified (reactive = `motion` springs, sequenced = GSAP).
- **ADR-009 revisit criterion:** lab bundle growth must never regress portfolio initial load — GSAP and Tone.js stay inside the deck's lazy chunk (Tone behind the sound toggle specifically).

Locked decisions (do not reopen):

- Archive and Works are peers, not a pipeline (ADR-010).
- Translation-layer architecture is split along the commit: proposal layer is SVG + GSAP (MotionPath/DrawSVG), consequence is shader-native in ogl on shared timeline uniforms. Shape refines the commit moment's choreography only.
- Desktop-first with a designed mobile decline card, never a broken squeeze.

---

## Success Criteria

- The primary visitor completes all five movements unaided: boots the deck, reads all three instruments, commits an intent, resolves the drill (including verifying and dismissing the false alarm), and operates the paradigm slider — with no physics vocabulary required at any step.
- The meaningful-work argument is legible *in the interface*: the utilization meter visibly holds the operator near the A2 band; the operator-state strip exists from instrumented mode onward and is promoted, not introduced, by the slider.
- Every alert in the drill pairs severity with procedure (warning/caution/advisory grammar), and the deck shows residual status after recovery.
- Reduced-motion plate stands alone as an argument; keyboard-only run-through completes the full session; Archive Lighthouse ≥ 90 unaffected; deck meets its own ADR-017 budget.
- The colophon states the thesis, credits DIRD 28 (in library) and DIRD 13/15, and carries the interim DIRD 34 citation (via DIRD 28 §Control Paradigms, "DIRD 34 guide forthcoming") — no dird-34 guide exists in `core/lab/guides/` at brief time.
- Quality gates from VECTOR.md: lint, build, token-only color, heading hierarchy, layers stated.

---

## What We Know (Evidence)

- Visitors judge craft within seconds — validated (VECTOR.md assumption 1, industry research). The pre-flight boot is the first impression and must carry it.
- Operators supervising near ~70% utilization max out big-picture retention; beyond it performance degrades — DIRD 34, Cummings queuing work (`plans/dird-34-source-extraction.md`, findings 2, 9). Basis of the utilization meter.
- A 20–25% false-alarm rate is *optimal*: above ~80% alert accuracy, operators stop verifying (automation bias) — DIRD 34 / Wickens (extraction, finding 3). Basis of the drill's verifiable false alarm.
- Operator overload is physiologically classifiable at >98% accuracy (EEG spectra, blink rate, respiration) — DIRD 34 / Wilson-Brookings (extraction, finding 5). Makes the operator-state strip evidence-based, not speculative.
- Adaptive automation keeps operators in-band, *adding* work at low demand to prevent disengagement — DIRD 34 (finding 8); this is the mechanism behind DIRD 28's meaningful-work claim and movement 3's whole interaction model.
- Cognitive ceilings run 16 / 7 / 4 by task complexity; interface complexity inflates interaction time and drops the ceiling — DIRD 34 (findings 1, 9). A brake on how much the translation layer may ask of the operator at once.
- Sensory substitution works when a true signal feeds an underused channel continuously — TSAS research per the plan; grounds Synthetic Orientation.

---

## What We Don't Know Yet (Risks)

- **Sound design scope.** Spatial audio is thesis-relevant but real effort. If shaping parks it, Synthetic Orientation loses a channel and the alert grammar loses its aural pairing — the visual/text redundancy must carry alone.
- **Drill authorship tone.** How scary is the drill allowed to be? Unvalidated; the mission test says inspire, never haze. Shape finds the line.
- **The name.** "The Flight Deck" is a working title; decide before ADR-017 ratifies.
- **Q6 (tagline evolution).** Open per ADR-012; decided in or alongside ADR-017. Nothing hard-binds the tagline to the lockup.
- **Whether one desktop session sustains five movements.** No user evidence that visitors complete multi-movement interactive pieces; the movements must each pay off standalone in case visitors bail mid-session.
- **Paper Shaders.** Optional; only if `ogl` leaves atmosphere wanting, and its OKLCH question resolves first (`plans/paper-shaders-reference.md`).

---

## Where to Look

- Doctrine: VECTOR.md, PRODUCT.md (Perihelion Design Context), DESIGN.md (portfolio; deck diverges by ADR-017)
- Plan of record: plans/works-01-the-flight-deck.md
- Evidence base: plans/dird-34-source-extraction.md (findings ledger + final section), plans/dird-34-prework.md
- Prior decisions: vector/decisions/ADR-009, -010, -012, -016 (and ADR-017 once drafted)
- Technical constraints: ARCHITECTURE.md
