# Roy's Review: Works 01 Phase 7 — Polish + live-pass rounds (PR #187)
Date: 2026-07-05

## Verdict: SHIP WITH NOTES — both cures landed in-PR, verified live

The polish charter did what a polish phase should: the audits ran, their findings were verified before they were fixed (several a11y-agent claims were correctly rejected against the plate-swap architecture), the motion doctrine holds, and the three live-pass rounds landed with the same pure-first discipline as the phases before them. Two accessibility notes were cured in-PR the same day, both consequences of the dormant state becoming a place the operator now returns to: the operator-row chrome goes `inert` until boot (zero focusables under the wake overlay, verified), a shutdown remount hands focus to the wake control (verified), and the defensive nit landed too (the bench goes inert for the power-down). What remains of the verdict is the accretion flag: the DeckSession extraction is due, not deferred.

## Files Reviewed
23 files, 1787(+)/77(-). Core: machine.ts (+SHUT_DOWN), copy.ts (shutdown, orders), paradigm.ts (announce debounce score, regime geometry) + tests. Src: DeckSession, DeckBench, FlightDeck, ParadigmSlider, ParadigmPlate (new), StandingOrders (new), VacuumEnergy, UtilizationMeter, TranslationPanel, DrillProcedure, bootTimeline (+shutdown mirror), flight-deck.css, tokens.css. Vector: mission doc (Now + checklist, same PR — rule honored), two audit reports.

## Architecture   FLAG (accretion now due; everything else clean)

- Import direction clean throughout: new core additions are pure (SHUT_DOWN returns `initialDeckState`, same-reference no-op from dormant, machine idiom preserved and tested); StandingOrders and ParadigmPlate read core one-way; regime geometry moving INTO core (paradigm.ts) rather than being exported from a component file was the right call twice over (layer purity + the react-refresh lint rule).
- The session-epoch remount as the shutdown reset mechanism is honest architecture: unmount reverts every GSAP inline style by construction, so nothing needs manual restoration. The power-down timeline living in bootTimeline.ts beside its mirror is the right home.
- **FLAG — DeckSession is 678 lines** (597 at phase-6 review, 585 at merge). Phase 7 grew it ~14% (shutdown handler, announce debounce, dissolve cache). My phase-6 condition — "extraction candidate if phase 7 grows it" — has now triggered. The `useParadigmDissolve` extraction (plus the shutdown block) is due the NEXT session that touches this file, not the one after. The verified-live-at-ship-edge deferral was reasonable once; it does not compound.
- VacuumEnergy at 333: joins FieldIntegrity under the self-contained visual-component exception; the pooled-lines + stable-element pattern is documented in-file and worth reusing.

## Design System   PASS

- `--deck-control` / `--deck-control-line` are OKLCH in tokens.css with contrast recorded in the token comment (8.66:1 rest ink; checked border 2.69:1 always paired with full-amber text, so state is never color-alone or border-alone — the native radio carries it for AT).
- Treatment B is doctrine-straight, not doctrine-adjacent: brass/amber owns interaction (ADR-013 lineage, the deck's own wake lamp and thumb), and the shift is hue-at-label-weight, so nothing competes with the severity row or the render. The amber/caution adjacency is acceptable for the reason the build notes give: severity always arrives as lamp + word + position, never as a bordered key.
- Zero literal color outside tokens.css (swept the diff); the lamp emission rides `--emit` × severity `--lamp-emit` vars, boot grammar extended rather than forked.

## Accessibility   FLAG (two cures in-PR, one nit)

- **CURE IN-PR — invisible focusable chrome under the wake overlay.** The dormant/pre-boot deck renders the sound toggle (DeckSession, unconditional) and the colophon exit (DeckBench operator row) at `.js-deck-chrome` opacity 0. Opacity 0 keeps them in the tab order and the accessibility tree while the fixed wake overlay covers them visually. The panel and review row are correctly `inert={!live}`; the operator-row chrome is not. Pre-existing for the colophon since phase 1, but this PR makes dormant a recurring destination (shutdown returns here), so it graduates from wart to defect. Fix: gate `soundControl` on `booted` like `shutdownControl`, and make the operator-row chrome (or the bench) inert until boot.
- **CURE IN-PR — focus drops to body after shutdown.** The focused "Shut down" button unmounts with the session; nothing receives focus on the fresh mount. This PR itself established the standard (judgment choices hand focus to the response read-back). Fix: on a remount that follows a shutdown (session epoch > 0), move focus to the wake control.
- NOTE (defensive) — during the ~0.75s power-down the bench stays interactive; a commit clicked mid-fade starts choreography that the remount hard-kills. Harmless today (transient visual only, the machine guard holds), but `inert` on the session root once `shuttingDownRef` sets would close it for one line.
- NOTE — "Deck shutting down." lands in the polite live region ~0.75s before the region unmounts; some screen readers will drop it. Acceptable (the dormant scene that follows is self-describing and the wake control is labeled); if it matters later, announce from the surviving parent.
- Verified good: 44px targets hold on the new brass chrome (deck-hit overlays untouched); StandingOrders is plain text inside the overlay that `autoAlpha` correctly removes from the tree at certify; the utilization needle loop is aria-hidden SVG with the sr mirror untouched; ParadigmPlate carries its sr sentence; SHUT_DOWN resets sound to off (audio dies with the deck — correct).

## Content   PASS (scaffold-grade, as declared)

- Orders copy: no em-dashes, no permission framing, plain register, mission test per line. Line 3 names the control paradigm and its consciousness end without spoiling the drill's arrival — vocabulary matches the reveal announcement ("final instrument"), so the placard and the deck speak one language.
- Shutdown copy ("Power the deck down and start the session over.") is honest and small. All of it correctly queued for the Writer + Gaff pass.

## Doctrine   PASS

- D4 lanes hold: the power-down is authored (GSAP, the boot's mirror); the needle and gauge loops are data rendering, not motion-lane traffic; the caption exit now honors `paradigmScore.caption.outMs` (the enter still approximates `inMs` with the soft spring — tolerable, note only).
- The lamp-flash fix resolves Justin's standing boot-feel item the right way round: the authored score now renders as authored, and the transition-silence/clearProps handoff is a clean idiom for any future CSS-transition-vs-GSAP conflict.
- Wave-driven doctrine intact per the motion-lane report (all arrivals critically damped or overdamped); the brass hover shift is a 150ms decel read, not a bounce.
- D5: zero new dependencies. D6: deck chunk 71.8/350 KB gz; tone untouched; labs entry byte-identical; every new rAF loop (vacuum, needle) double-gated with full cleanup and jsdom guards.

## Quality Gates   PASS

- 348 tests green (+6 over merged phase 6: SHUT_DOWN coverage, regime geometry, debounce score, plate still); build clean; lint clean but for the standing portfolio warning (renderSection.tsx, not this PR's).
- Lighthouse re-checked behind honest gzip: deck 97/100 against D6's 70/95 bars; Archive 97/100 against its 90.
- Verified live this time, not just gated: boot, commit, full drill, slider, chamber wiggle, shutdown → re-boot cycle, flash trace at 16ms sampling. The hidden-tab GSAP stall was correctly diagnosed as harness artifact, not product.
- Mission doc updated in the same PR at every round; files-and-layers stated throughout.

## Impeccable Delegation

None this pass — phase 7 IS the delegation pass: `/audit` and `/polish` ran as the charter, both motion lanes ran through the craft skills, and their reports live beside this one in vector/audits/. This review checked what they don't: the machine, the layers, and the seams the builder crossed most recently.
