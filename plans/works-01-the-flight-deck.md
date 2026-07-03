# Works 01: The Flight Deck

> Dreamer plan, drafted 2026-07-02 (Claude app session, repo cloned at HEAD). The debut prototype for Perihelion's **Works** arm. Flagship scope, full-bleed standalone, desktop-first — all three locked by Justin this session. Working title "The Flight Deck" follows the house naming register (The Shelf, The Reader, The Reading Room): plain, definite-article, passes the anti-obscurity test. Rename freely.

---

## Summary

An operable cockpit for breakthrough flight, built directly from DIRD 28's four Design Hooks. Not a mood piece, not film FUI — an interface you can actually fly, demonstrating what "design for the frontier" means when the data has no metaphors and the operator's body has gone silent. This is the piece that makes Works real and triggers Q6.

## Context

- **Archive + Works are peers, not pipeline** (locked). This is the first Works entry, so it also defines the Works presentation template: full-bleed standalone experience with a colophon, no case-study chrome.
- **The register inversion (write this into the ADR):** the Archive's "subliminal craft" principle — design is the plate, content is the meal — inverts in Works. Here the design *is* the meal. Motion, spectacle, and interface-as-subject are not violations of Perihelion principles in this arm; they are the arm. The mission test still holds: every moment must open the door for a designer without a physics background, never gatekeep.
- **The thesis, stated for the colophon:** film FUI (Territory Studio et al.) is designed to communicate a story beat in ~3 seconds of screen time. It is read, never operated. The Flight Deck flips that: every instrument is live, every control does something, every alert has a procedure. Speculative design you can fly.
- Source guides: **DIRD 28** (primary — the four Design Hooks are the spec), **DIRD 13** (warp bubble mechanics the instruments render), **DIRD 15** (vacuum framework + coherence feedback hooks for the consciousness end of the paradigm slider).

---

## The experience arc (five movements)

Full-bleed, single route, desktop-first. The piece is a session, not a page. Scroll is not the primary axis — operation is.

### 1. Pre-flight (arrival)
Dark deck. Systems asleep. A wake/calibration ritual brings instruments online one at a time — each introduces itself with a one-line plain-language caption (the door-opening device: no physics credentials required to board). Calibration-as-ritual echoes DIRD 36's instrument posture and gives us a natural progressive-disclosure onramp.

### 2. The instruments
Three live instruments, each answering a Design Hook:

- **Field Integrity** — the hero. "The field health display is the new engine gauge." A WebGL render of the warp bubble: wall thickness (safety + efficiency parameter), energy distribution evenness, topology stress points. This occupies the visual prominence engine gauges hold in current cockpits. Reference posture: medical imaging, not instrument flying — making invisible internal structure visible through computed visualization (DIRD 28's own analogy).
- **Synthetic Orientation** — the sensory void answer. Continuous, automatic, multi-modal: a synthetic horizon, peripheral flow fields encoding motion, and opt-in spatial audio encoding direction/velocity. Grounded in real sensory-substitution research: the Navy/NASA Tactile Situation Awareness System mapped attitude onto the torso via vibrotactors and let pilots hover helicopters non-visually. We can't do haptic on the web; we translate the TSAS principle — feed true orientation through an underused channel, continuously, subconsciously — into peripheral vision + audio.
- **Vacuum Energy** — fuel gauge and engine health combined, a quantity with no vehicle analog. Smaller instrument, but it carries the "new information, no metaphors" argument: the display invents a visual language for a field quantity humans have zero intuition for.

### 3. Intent-and-destination control
The pilot-as-mission-director model. The operator sets destination, timeline, risk tolerance — and then *watches the translation layer work*: intent → field geometry modification → trajectory change, rendered as a visible negotiation. This makes the intent-to-action gap (DIRD 28's core control-design problem) the interaction itself. Crucially, per the supervisory-control counter-argument (DIRD 34 thread): the interface gives the operator meaningful work between departure and arrival — monitoring field health, approving the translation layer's proposals — not just a button and a wait.

### 4. The failure drill
One scripted event: field asymmetry developing into threatened bubble collapse. This is where the alert-semantics research lands. Adapt the real crew-alerting grammar — the warning/caution/advisory severity hierarchy, master caution, and the ECAM "monitor–manage–review" posture where the system surfaces the relevant procedure alongside the alert and shows residual status after resolution. Then map it to alien failure modes:
- *Advisory:* coherence drift, wall-thickness efficiency margin
- *Caution:* field asymmetry (differential time dilation across the vehicle)
- *Warning:* bubble collapse imminent — field integrity replaces airframe stress as the primary safety indicator, and the procedure is new in kind
The drill is operable: the visitor works the procedure and the deck recovers. This movement is the strongest proof that the piece is designed, not decorated.

### 5. The paradigm slider (the closer)
DIRD 28's control-paradigm spectrum as a literal control: **instrumented → hybrid → consciousness**. As the slider moves, the interface progressively dissolves — instruments thin out, the deck darkens, displays hand off to biometric coherence feedback (EEG coherence, HRV traces per DIRD 15's Ep 86 hooks) — until the consciousness end is a meditation chamber, the operator's state modulating the field directly. One gesture demonstrating the entire design space, ending on the lab's most provocative thread. This dissolve is the money shot and the LinkedIn clip.

---

## Layer impact

- **design-system/:** none to shared tokens. The piece gets its **own scoped token file** (`src/works/flight-deck/tokens.css` or equivalent) — "no holds barred" means its palette, type, and motion are sanctioned to diverge from both Conservatory and Reading Room tokens. The ADR should formalize per-work token scope so divergence never leaks into lab tokens. Keep OKLCH authoring for consistency of method, not of palette.
- **core/:** a lightweight `core/works/` manifest (mirroring `core/lab/guides.ts`) — one entry now, built for more. Works metadata: slug, title, source guides, year, status.
- **src/:** new `src/works/` arm in the lab app. Routing: add `/w/:slug` (or `/works/:slug`) to `src/lab/App.tsx`, lazy-loaded like GuideView — the deck is by far the heaviest chunk and must not touch Archive reading performance. The piece renders **outside `LabLayout`** (full-bleed means no lab header/rail), with its own minimal colophon chrome: title, source-guide links back to the Archive, the thesis paragraph, exit.
- **services/:** none.

## Technical approach

- **WebGL via `ogl`** — already installed (Threads.tsx precedent). Field Integrity's bubble render and Synthetic Orientation's flow fields are custom fragment/vertex shader work. Budget the flagship effort here.
- **Motion, two lanes (sanctioned 2026-07-02):** `motion` (installed) keeps the *reactive* lane — spring physics on controls, hover states, the paradigm slider's input feel. **GSAP** (add: `gsap` + `@gsap/react`) takes the *authored* lane — the deck is timeline-driven, and GSAP timelines with labels/scrub are the right tool for the pre-flight boot sequence, the drill's staged escalation, and the movement-5 dissolve that recomposes every element on the deck. `useGSAP()` handles React cleanup. MotionPathPlugin is a candidate for the translation-layer visualization (intent tracing into field geometry); DrawSVG for instrument reticle draws. GSAP is now 100% free including all formerly-Club plugins, commercial use covered, maintained by the original team under Webflow. The two-library smell is avoided by the lane rule: input-responsive = motion, sequenced = GSAP. Write the rule into the ADR.
- **Audio: Tone.js** (add: `tone`, sanctioned) for Synthetic Orientation's spatial channel and the alert system's aural grammar. Synthesis-first — instrument tones and alert chimes are generated, not sampled, so zero audio asset weight. `Panner3D` gives spatial positioning; `Transport` syncs aural events to the drill timeline. Real crew alerting pairs severity with distinct aural signatures, so the audio isn't garnish — it's part of the alert semantics argument. **Lazy-load on the sound toggle** (dynamic import): Tone stays out of the initial chunk entirely, muted by default, explicit opt-in, never autoplay. Verify current major version at install.
- **Paper Shaders** (`@paper-design/shaders-react`, evaluated in `plans/paper-shaders-reference.md`, not installed): optional. If `ogl` covers the field renders, skip it; if we want atmosphere layers cheaply, the T4d spike piggybacks here. Resolve its OKLCH question before install per the reference doc.
- **State:** the deck is a small state machine (preflight → nominal → drill → recovery, plus paradigm position). Worth a tiny reducer, not a library.
- **Performance:** lazy chunk, `IntersectionObserver`-gated render loops, cap device pixel ratio on the canvases, pause everything on `visibilitychange`. Lighthouse ≥ 90 still applies to the *Archive*; the deck route gets its own realistic budget recorded in the ADR (a full-bleed WebGL piece will not score like a reading page, and pretending otherwise will distort the design).

## Desktop-first / mobile posture

Desktop-first, locked. Mobile gets a **considered decline**: a designed card — the deck's sigil, the thesis paragraph, a short capture of the paradigm dissolve, and "this instrument wants a wider bench" copy — never a broken squeeze. Tablet landscape can run a reduced deck if it comes cheap; do not spend flagship budget there.

## Accessibility

- `prefers-reduced-motion`: the deck renders as a **static instrument plate** — all instruments legible at a fixed nominal state, drill presented as annotated stills. The piece must argue its case without motion.
- Full keyboard operability for the control panel, drill procedure, and paradigm slider. Focus order follows the movement sequence.
- All instrument readings mirrored in text (visually subtle, screen-reader complete). Alert severities never color-only: shape + label + position redundancy (this is also just correct crew-alerting design).
- Audio opt-in, captioned equivalents for anything audio communicates.

## Implementation phases (post-brief, post-shape)

1. **Skeleton** — route, scoped tokens, works manifest, state machine, colophon chrome, mobile decline card.
2. **Field Integrity** — the hero instrument, shader-first. If only one thing ships in the first PR, it's this.
3. **Synthetic Orientation + Vacuum Energy** — second and third instruments.
4. **Control panel** — intent-and-destination, translation-layer visualization.
5. **The drill** — alert system, procedure flow, recovery.
6. **Paradigm slider** — the dissolve. Last because it recomposes everything before it.
7. **Polish pass** — `/audit`, `/polish`, reduced-motion plate, performance budget verification.

Each phase is a shippable PR. Roy reviews at 2, 5, and 6 minimum.

## Dependencies

- **`gsap` + `@gsap/react`** — authored-sequence choreography (boot, drill, dissolve). Free including all plugins, commercial use covered.
- **`tone`** — spatial audio + synthesized alert grammar. Lazy-loaded behind the sound toggle; zero impact on the initial chunk.
- Paper Shaders remains optional per above. No other additions.

## Pipeline from here

1. This plan lands in `plans/`.
2. **`/invest brief "The Flight Deck — operable breakthrough-flight cockpit, Works 01"`** — pulls personas, JTBD, VECTOR principles, quality gates into the design brief. The two Perihelion audiences both matter here; the brief should say what "success" means for the designer-without-physics visitor specifically.
3. **`invest-adr`** — drafted *before* shape (decided 2026-07-02): ADR-017 covering the Works arm architecture (`/w/:slug`, works manifest, outside-LabLayout rendering), per-work token scope, the register inversion, the motion lane rule (reactive = motion, authored = GSAP), and the deck's own performance budget. Q6 (tagline evolution) gets decided in or alongside it. Since the ADR sanctions architectural divergence, it lands before any code exists to divert — Roy reviews against a ratified document, not a moving one. Status `proposed` at draft; shape may amend two clauses only (performance budget numbers, commit-moment choreography detail); ratify before Tyrell phase 1.
4. **`/shape`** — interaction model and key states. Priority questions: the drill's procedure UI (ECAM-style guided checklist vs. discoverable), the commit-moment choreography at the SVG→shader seam, and how much of movement 5's dissolve is scrubbed vs. staged. Takes the three DIRD 34 inputs (utilization meter, verifiable false alarm, operator-state strip).
5. **Tyrell builds** phase by phase; Roy reviews; Impeccable closes.
6. Director follow-on: the locked "tokenize lockup metrics when Works renders it a second time" item triggers when the colophon reuses the masthead lockup.

## Open questions

- **Name.** "The Flight Deck" is the working title; alternatives in-register: "The Deck," "The Bridge." Decide before the ADR.
- **DIRD 34 debt — prework done, see `plans/dird-34-prework.md`.** Source PDF located (Genik/Wayne State, FOIA-released, Black Vault + archive.org), `upcoming.ts` entry drafted, upstream handoff written, and movement 3's interim citations defined so the build doesn't block. Remaining: paste the handoff into the design-futures triage and land the upcoming-card PR.
- **Sound design scope.** Spatial audio is thesis-relevant (a sensory channel replacing a lost one) but is real effort. Confirm it survives shaping, or park it as a fast-follow.
- **Translation-layer visualization — decided (2026-07-02): split along the commit.** The *proposal* layer (delegation cards, route trace, utilization meter — everything the operator reads and verifies) is SVG + GSAP MotionPath/DrawSVG: crisp, annotatable, accessible. The *consequence* — the committed trajectory taking hold in the field — is shader-native in ogl, driven by uniforms on the same GSAP timeline. The handoff between the two renders the intent-to-action gap literally: the moment of commit is where the drawing becomes substance. Shape refines the commit moment's choreography; the architecture is settled.
- **Drill authorship tone.** How scary is the drill allowed to be? The mission test says the piece must inspire, not haze. Shape should find the line.
