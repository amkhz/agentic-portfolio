# Roy's Review: Works 01 phase 5 — the drill (feat/works-01-phase-5-drill, 96a760b)
Date: 2026-07-05

## Verdict: SHIP WITH NOTES

The drill is built the way the doctrine says it should be: pure script and
envelopes in core with the machine's own idiom, timers and choreography in
src on the right motion lanes, adversarial inputs riding the models'
documented contract instead of a second model, and the false alarm landing
the 20-25% argument in one beat. Nothing blocks the merge. The notes below
are defensive nits and two accretion flags for phase 6, plus items already
scheduled to ride phase 7's formal audit.

## Files Reviewed
- core/works/flight-deck/drill.ts + drill.test.ts (layer: core; NEW)
- core/works/flight-deck/alertGrammar.ts + alertGrammar.test.ts (layer: core; NEW)
- core/works/flight-deck/field.ts / orientation.ts / vacuum.ts / copy.ts + tests (layer: core)
- src/works/flight-deck/components/useDrill.ts + test, AlertRegion.tsx, DrillProcedure.tsx + test, DrillResidual.tsx (layer: src; NEW)
- src/works/flight-deck/audio/deckAudio.ts (layer: src; NEW)
- src/works/flight-deck/components/DeckSession.tsx, DeckBench.tsx, FieldIntegrity.tsx, SyntheticOrientation.tsx, VacuumEnergy.tsx, FlightDeck.tsx, flight-deck.css (layer: src)
- vite.config.ts (build), package.json/lock (deps), vector/missions/works-01-flight-deck.md (doctrine)

## Architecture    PASS (two accretion flags)
- Layer placement is correct throughout. drill.ts is genuinely pure: no DOM,
  no timers, illegal actions return the same reference (machine.ts idiom
  held). Timers, focus, GSAP, and audio all live in src. Import direction
  clean: core imports only core; the drill's delta types come from the
  instrument models (field.ts) and commit.ts, no cycles.
- deckAudio.ts in src (not services/) is correct by precedent: audio output
  is device presentation like the WebGL canvases (ogl in components), not
  external communication. ADR-017 D5 sanctions tone inside the deck's scope.
- FLAG (soft, for phase 6): DeckSession.tsx is 645 lines and now owns three
  authored timelines (boot, commit, recovery settle). Phase 6's dissolve
  will add a fourth. Extract the timeline builders before the file becomes
  the thing the lane rule exists to prevent finding.
- FLAG (soft): drill.ts is 523 lines. Cohesive today (script + reducer +
  envelopes + residual), but if phase 6 touches it, split the alert script
  (data) from the envelopes (math) along the existing section dividers.

## Design System   PASS
- Every new color is a var(--deck-*) token by name; no hex, no rgb(), no
  Tailwind palette, no #000/#FFF anywhere in the diff.
- Severity is never color-only: lamp + severity word + label + plain line
  travel together (AlertRegion), and the caution/warning word color changes
  are redundant with the word itself. The warning red appears exactly once
  on the bench (its monopoly holds; the field ramp still never enters red).
- Estimated contrast on the new inks: --deck-caution on --deck-bg ~9:1,
  --deck-warning ~5.8:1 at 0.75rem uppercase — both clear AA for their
  sizes. NOTE: these are estimates; the formal contrast re-check is already
  scheduled to ride phase 7's /audit (mission doc, open questions). Hold it
  to that.

## Accessibility   PASS (notes)
- The double-speak trap was caught in-build: the alert container's
  role="status" was removed and every drill event routes through the
  session's single polite announcer. Good.
- Keyboard flow follows the movement sequence: judgment buttons take focus
  when they open, the residual's acknowledge takes focus on mount, the
  sound toggle carries aria-pressed. All interactive elements are real
  buttons under the deck's global :focus-visible outline.
- NOTE (for Justin's live pass): the judgment step steals focus ~3.2s after
  a beat posts. Intentional ECAM posture, but if he is mid-interaction in
  the intent radios it will yank him. If it feels rude live, gate the steal
  on document.activeElement being outside the dock.
- NOTE: alert postings announce politely; real master-caution semantics
  might argue assertive for the warning. Defer to the phase 7 audit rather
  than churn now.
- NOTE (existing pattern, not new debt): the chrome text buttons (sound,
  colophon) and .deck-commit sit under 44px targets. The deck declines
  mobile by design; acceptable on a desktop-only pointer+keyboard surface,
  but it belongs on phase 7's checklist.
- Reduced-motion/static plate never runs the drill; the plate's annotated
  drill stills are already a phase 7 line item. sr mirrors now speak honest
  status words ("off nominal", "margin pinched", "demand over extraction")
  — the mirror can no longer call a thinning wall nominal. Correct and
  overdue the moment adversarial inputs existed.

## Content         PASS (scaffold-grade, as declared)
- No em-dashes anywhere in the new copy (the only matches are comment
  dividers). No permission framing. Severity register is calm and
  procedural: "The deck cannot make this call for you" is exactly the
  crew-alerting voice the shape brief asked for.
- The 20-25% dismissal caption is one plain line and lands the finding
  without citing anything. The warm line earns its warmth.
- All of it is declared scaffold-grade pending Writer + Gaff (rides the
  colophon item). Held to that, not to ship quality, per the mission doc.

## Doctrine        PASS
- Shape brief §7 drill-tone line, checked clause by clause: no screen
  shake, no klaxon (signatures are pure data, ≤6 events, <1.5s, play once,
  tested), no red-flooded viewport (one word, one lamp, one hot lane in the
  render), no countdown timers (the only timers pace the system's own
  steps). Unfailable: the false alarm's holding choice re-checks and stays;
  no dead ends; recovery is guaranteed and lands warm.
- Exactly one judgment step per alert, never first, never auto-advanced —
  enforced by the reducer and asserted in tests, not just by copy.
- Motion lanes (D4): recovery settle is an authored GSAP timeline; alert
  and step arrivals are one-shot spring entrances (deckSpringSoft, bounce
  0), the same reading phase 4 ratified for ProposalRow entrances. The
  commit exit still belongs to the GSAP commit timeline. Lanes clean.
- D5: tone reached only by dynamic import inside the toggle's gesture;
  chunk named `tone` (81.08 KB gz ≤ 160), zero static references, portfolio
  and labs entry hashes unchanged. Muted by default, never autoplay, and
  the confirmation tone on enable doubles as honest feedback.
- D6: deck chunk 64.85 KB gz of 350. No new render loops; the drill reads
  existing cadences.
- The lane-vocabulary resolution (plain BEARING + real-derivative trend
  words) matches the parked riff and was recorded in the mission doc's open
  questions in the same PR. Drill re-arm recorded as built (once per
  session, in-memory). Definition-of-done rule honored: checklist + Now
  line updated in the same commit.

## Quality Gates   PASS (one pre-existing note)
- npm run build passes; npm run test 314/314; the drill added 41 tests
  including the envelope guarantees (strip pegs at every drift phase,
  plateau always pinches, recovery decays vacuum → orientation → field).
- npm run lint: 0 errors, 1 warning — pre-existing in
  src/components/content/renderSection.tsx, untouched by this diff. Not
  this PR's debt.
- Verified live at 1600×900: full drill worked end to end, bench held one
  viewport through every beat, no re-arm on a second commit, no console
  errors, no failed requests.
- Defensive nit (not a hold; unreachable from the UI today): useDrill's
  judge() checks the step kind via progressRef, so a call arriving after
  resolution but while stage is still "alerts" would re-announce, re-play
  the confirmation, and overwrite resolvedAt (restarting the decay). The
  buttons unmount on resolution so no path exists, but a one-line guard
  (skip if resolvedAt is already set for the beat) would make the hook
  safe against future callers.
- Nit: DrillResidual samples the vacuum model without the commit trim. By
  residual time the trim envelope is spent (≥ ~28s after the commit vs a
  26s envelope), so the divergence from the gauge is ~0; worth a comment
  or the trim param if anything ever shortens the drill.

## Impeccable Delegation
- None run this gate. The formal /audit (contrast, Lighthouse, reduced-
  motion plate finish) is scheduled as phase 7 by the mission doc, and
  nothing found here needed a deep design pass to adjudicate. /critique on
  the drill's feel belongs to Justin's live session first.
