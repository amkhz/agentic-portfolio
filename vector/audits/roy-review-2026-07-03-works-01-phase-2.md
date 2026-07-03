# Roy's Review: Works 01 Phase 2 — Field Integrity + Boot Ritual
Date: 2026-07-03
Scope: PR #175 (`feat/works-01-phase-2-field-integrity`, commits 5cc1aee + 74e4f26) against ADR-017 D1-D6, the shape brief, and the mission doc's locked decisions.

## Verdict: HOLD

One hard-constraint violation: `--deck-ink-faint` (documented in tokens.css as "large/decorative only", ~4.2:1 on the deck floor) is set on four small-text surfaces in this diff, below WCAG 2.2 AA's 4.5:1 for body-size text. ADR-017 D2 makes AA within the deck's own surfaces non-negotiable. The fix is minutes of work; everything else in this phase is clean and several things are genuinely well made.

## Files Reviewed
- `core/works/oklch.ts`, `core/works/flight-deck/{field,boot}.ts` + tests (layer: core)
- `core/works/flight-deck/copy.ts` (layer: core, content-adjacent)
- `src/works/flight-deck/FlightDeck.tsx`, `components/{DeckSession,DeckBench,FieldIntegrity,FieldLegend,FieldPlate}.tsx`, `DeckSession.test.tsx` (layer: src)
- `src/works/flight-deck/{tokens,flight-deck}.css` (layer: design-system, per-work scope per ADR-017 D2)
- `vite.config.ts`, `.claude/launch.json`, `package.json` (config)
- `vector/missions/works-01-flight-deck.md` (doctrine, updated in-PR per the definition-of-done rule)

## Architecture — PASS
- Layer placement is correct throughout: shader-feeding math, telemetry model, and the boot score are pure core modules with tests; all DOM, GSAP, and WebGL live in src. Import direction clean (src -> core only; core imports nothing).
- The deterministic field model driving shader uniforms, HTML readings, and the sr mirror from one source is the right shape and makes the instrument testable.
- File lengths: `FieldIntegrity.tsx` (366) and `DeckSession.tsx` (350) exceed the 200-line soft cap. Both sit squarely in the stated exception (self-contained visual/animation components: a shader + its lifecycle, a timeline + its gesture). Accepted; split the timeline into a hook if phase 5 grows it.
- D5 dependency discipline held, and the build even tightened it: the `react-vendor` manualChunks rule was matching `@gsap/react` and would have leaked gsap into the shared vendor bundle loaded by portfolio and Archive. Caught and fixed in this PR. gsap now verifiably deck-chunk-only.

## Design System — FLAG
- Ramp architecture is exemplary: five OKLCH token stops, parsed from computed style, interpolated in OKLab in-shader so the violet-to-amber passage cannot detour through red. The CSS plate ring interpolates `in oklab` from the same tokens. Token file remains the single source of color.
- **FLAG (fix with the HOLD item or accept knowingly):** `flight-deck.css:129-130` uses literal `oklch(1 0 0)` inside the plate ring's `mask` gradient. Masks only consume the alpha channel, so no color renders, but doctrine is "no literal values outside the token file," no exceptions listed. Cleanest cure: a `--deck-mask-opaque` token in tokens.css.

## Accessibility — FAIL (the HOLD item)
- **`--deck-ink-faint` on small text, four in-diff sites, ~4.2:1 vs the 4.5:1 AA floor:**
  - `DeckBench.tsx:91` — the alert region's "No active alerts" (`role="status"`, meaningful state text at text-xs)
  - `DeckBench.tsx:132` — the horizon placeholder note (text-xs)
  - `DeckSession.tsx:339` — the "Hold to wake the deck." hint (text-xs, the operator's only instruction)
  - `flight-deck.css:104` — the ramp legend labels (0.625rem; aria-hidden but visible and informative)
  - Cure: move these to `--deck-ink-dim` (~8.4:1) or add a dedicated small-label ink token at L >= 0.62; keep ink-faint for genuinely decorative marks only. Note the same pattern exists in phase 1's `Colophon.tsx:24` and `DeclineCard.tsx:15` (outside this diff); sweep them in the same fix.
- Everything else passes, and much of it is strong: hold control is a real 44px target with full keyboard parity (hold semantics on Space/Enter, repeat-guarded, blur-safe); boot captions announce through a single polite live region without spamming; readings pair an aria-hidden tabular line with an sr sentence mirror and correctly avoid aria-live for continuous data; severity lamps are aria-hidden redundancy with semantics carried elsewhere; one h1 per surface holds; reduced-motion and no-WebGL collapse to the static plate before any of this code runs.

## Content — PASS (scaffold grade, as declared)
- New strings (`wakeHold`, `readyLabel`) are plain-language, no em-dashes, no permission framing ("The deck is yours." is ownership, not gatekeeping). All copy remains flagged for the Writer + Gaff pass per the mission checklist; unchanged obligation.
- Visible phase-forward placeholders ("dock here in phase 4", "arrive in phase 3") continue phase 1's accepted pattern; fine while the route is unlinked, must not survive to the Shelf PR.

## Doctrine — PASS
- Locked boot ritual implemented faithfully, including both live-review amendments recorded same-day in the mission doc (settle bounce cut in favor of the brightness exhale + traveling emission; hold feedback added). The mission doc, the code comments, and the built behavior agree, which is exactly what the definition-of-done rule exists to produce.
- Emission glows are sanctioned by the locked decision and the softened glow ban (meaningful in the piece's world: an awake deck gives off its own light). Ready light emits in the operator channel, gauges in bone; the two stay unconfusable as specified.
- D4 lanes respected: everything authored is one GSAP timeline; the hold scrubbing the playhead is the locked design, not a lane violation. `motion` correctly absent (nothing reactive-feel shipped yet).
- Register check: the deck reads as certified equipment, not film FUI; the amber-top ramp keeps red as the warning's monopoly.

## Quality Gates — PASS (with one deferred item)
- Lint clean (one pre-existing warning outside the diff), 221 tests green, build green.
- D6: deck chunk 49.25 KB gz of 350; render loop IntersectionObserver-gated, pauses on visibilitychange, DPR capped at 2.
- One honesty note: the readings interval and the shader run on separate `performance.now()` epochs, so the HTML line and the visible render sample the field at slightly different times. The "cannot disagree" invariant is about the model, not the instant; unify the clock when convenient (low severity, cosmetic disagreement in STRESS count is possible).
- Lighthouse a11y >= 95 on `/w/flight-deck` not yet measured; mission assigns it to phase 7. Fine, but the ink-faint fix above is prerequisite to passing it.

## Impeccable Delegation
- None run this pass. `/audit` + `/polish` are mission-scheduled for phase 7; nothing here needs them early once the contrast fix lands. The ramp's exact stops were validated live by Justin 2026-07-03.

---

**To lift the HOLD:** replace the four in-diff `--deck-ink-faint` small-text usages (plus the two phase 1 sites while in there) with an AA-passing ink, and optionally tokenize the mask literal. Re-verify with lint/build/tests; no re-review needed, this is a mechanical cure.
