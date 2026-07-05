# Roy's Review: Works 01 Phase 6 — Paradigm slider + dissolve (PR #186)
Date: 2026-07-05

## Verdict: SHIP WITH NOTES

The dissolve is pure-first, the lanes are clean, both of my phase-5 pre-reads landed properly, and the coupling echo is the most honest piece of choreography on the deck (one lagged function feeding both the shader and the trace — nothing to drift). One real defect to cure in-PR: a race in the chamber's mount lifecycle that can strand the consciousness end with no chamber. Everything else is notes.

## Files Reviewed
35 files, 2786(+)/657(-). Core: machine-adjacent pure models (paradigm.ts, operator.ts, drillEnvelopes.ts split, commit.ts, copy.ts + tests). Src: DeckSession, DeckBench, OperatorStrip, ParadigmSlider, ConsciousnessChamber, FieldIntegrity, TranslationPanel, timelines/* (new), tokens.css, flight-deck.css. Vector: mission doc (Now + checklist, same PR — rule honored).

## Architecture   FLAG (one defect, one accretion note)

- **DEFECT — chamber lifecycle race** (DeckSession.tsx, chamber state block): departure plays a 0.35s timeline whose `onComplete` sets `chamber = "down"`. Crossing back INTO consciousness while it plays sets `"up"` and re-runs the arrival, but (a) the stale departure timeline still completes and forces `"down"` — unmounting the chamber while the regime is consciousness — and (b) the half-played departure leaves inline `opacity < 1` on `.deck-chamber`, which the arrival timeline (it only targets `.js-chamber-part`) never restores. Repro: wiggle the thumb across the 2/3 boundary within ~0.35s. Fix: hold the departure timeline in a ref, kill it on arrival, and have the arrival reset the chamber root before blooming the parts. Cure in-PR.
- Import direction clean throughout: core→core only (commit.ts takes `OperatorDelta` as a type-only import, no cycle); src→core one-way; the shared-clock/pure-model discipline extended, not bent.
- The pre-reads landed as asked: DeckSession is orchestration-only at 585 lines (721 before, with a whole movement added); drill.ts split into script (379) + envelopes (251). 585 still exceeds the 200-line soft rule — acceptable as the session hub, but the paradigm/chamber block is the next extraction candidate (a `useParadigmDissolve` hook) if phase 7 grows it.
- FieldIntegrity at 728: standing self-contained shader-component exception (since phase 2).
- `operatorLoadAt` as the single door to the watcher's load is the right shape; strip, chamber, and shader cannot disagree by construction.

## Design System   PASS

- No literal color outside tokens.css (swept); new `--deck-bg-deep` is OKLCH in the token file with the never-pure-black comment honored (L 0.085, warm hue held).
- Dissolve darkening via `color-mix(in oklab, ...)` — method-correct, no detour through sRGB.
- Amber (`--deck-caution`) owns the slider thumb: interaction color doctrine holds. Operator hue stays the watcher channel's monopoly; the FIELD echo deliberately takes bone ink and no emission ("the light stays with the operator") — that is the right call, on the record.

## Accessibility   FLAG (notes ride phase 7)

- Slider is a real range input: arrows/Home/End free, regime + line in `aria-valuetext`, focus ring on the thumb via `:has(:focus-visible)`. Good.
- Crossings announce through the session's single announcer; no double-speak; strip and chamber mirrors are static text, not live regions. Correct.
- Panel goes `inert` when dissolved — invisible controls cannot take focus. Correct.
- NOTE (phase 7 audit, joins the phase-5 chrome-target item): the range input's hit area is ~24px tall; the 44px target rule applies. The whole track-box is wide but short.
- NOTE (phase 7): `overflow: clip` on the panel region is the right never-overlap guarantee, but on very short viewports clipped radios could take invisible focus while the panel is NOT dissolved. Add the short-viewport case to the audit script.
- NOTE: rapid boundary wiggling re-announces the regime each crossing (polite, so it queues rather than interrupts). Tolerable; if the live pass finds it chatty, debounce announcements only, never the pulse.
- Utilization explainer: hover title + always in the sr mirror matches the shape brief's "hover explainer"; sighted touch users lose it, which is in-scope for a desktop-first deck. Recorded, not flagged.

## Content   PASS (scaffold-grade, as declared)

- No em-dashes, no permission framing; regime lines and the promotion caption are honest and plain ("Promoted, not introduced" is the arc said out loud — keep it through the Writer + Gaff pass).
- `chamberEchoLabel: "FIELD · 0.6S BEHIND"` hardcodes the lag the constant derives; if `commitScore.lagMs` ever changes, the label lies. Either derive the string or leave a guard comment on the constant. Minor.

## Doctrine   PASS (one standing call for Justin)

- D4 lanes clean: dissolve rides the slider's spring (reactive — it answers the hand); crossings, chamber arrival/departure, and the reveal are GSAP (authored); the regime caption swap on a spring is defensible as answering the drag. The rAF trace loops are data rendering, same class as the canvases, not motion-lane traffic.
- D5: zero new dependencies. D6: deck chunk 70.1/350 KB gz; tone untouched (81.1/160); portfolio/labs entries unaffected; both new rAF loops are IO + visibilitychange gated.
- Shape brief movement-5 spec met point for point: staged regimes with scrubbed feel, transitions playing mid-drag, promotion-not-introduction (the strip is on the deck from boot and takes drill AND commit load before it is ever promoted), consciousness end nearly dark and never black.
- The coupling reusing `commitScore.lagMs` as `COUPLING_LAG_S` makes the intent-to-action gap one number across the whole piece. That is doctrine made load-bearing. Ship it.
- STANDING CALL (Justin's, already flagged in the mission doc): the crossing pulse leaves the strip traces holding `--emit: 1` — a quiet steady glow thereafter. In-world (awake-deck emission grammar) but glow-adjacent under the slop bans. His call at the live pass stands as the resolution path.

## Quality Gates   PASS

- 344 tests green (+30 over merged phase 5); lint clean but for the pre-existing portfolio warning (renderSection.tsx, not this PR's to fix); build clean.
- Pure-model guarantees property-tested: dissolve continuity/monotonicity, s=0-style identity discipline (envelope zero-reference reuse), operator nominal ranges, commit cost spent by COMMIT_DONE_S.
- Mission doc updated in the same PR; files-and-layers stated in the PR body.

## Impeccable Delegation

None this pass — the full `/audit` + `/polish` sweep is phase 7's charter and the notes above are queued for it. The live feel calls (dissolve envelope edges, thumb spring, echo amplitude 0.62) belong to Justin's pass, not to a heuristic run.
