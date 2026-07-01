# Roy's Review: Reading Room recalibration — WRAP batch
Date: 2026-07-01

## Verdict: SHIP WITH NOTES

The closing batch is clean, well-scoped, and doctrine-aligned. No code-level blockers. Every "note" is a live-both-modes eyeball that is already routed to Justin via the draft PRs (#155, #157) — nothing that holds the merge from the code side. Motion reuses curated tokens rather than gut-picked values; the parser fix is minimal and tested.

## Files Reviewed
- `src/components/effects/motionConfig.ts` (design-system / motion tokens) — `springSnappy` added; header comment reconciled
- `src/lab/components/guide/GuideDefinitionCard.tsx` (src/UI) — springSoft → springSnappy
- `src/lab/components/guide/GuideTabBar.tsx` (src/UI) — layoutId underline
- `src/pages/NotFoundPage.tsx` (src/UI) — arc() drift
- `src/components/content/{ConstellationNode,ConstellationPage,ConstellationField,ImageLightbox}.tsx`, `src/pages/ResumePage.tsx` (src/UI) — ease-out → var(--ease-settle)
- `core/lab/parse-guide.ts` + `core/lab/parse-guide.test.ts` (core) — thematic-break consume

## Architecture   PASS
- Motion values live as tokens in `motionConfig.ts` (the established JS-mirror location); components import them — no motion literals leaking into UI. Choreography params (arc strength, initial x/y offsets in NotFoundPage) are inlined per-surface, matching the existing `PerihelionSigil` precedent (SPARK_START / ARC_STRENGTH) — acceptable, they are composition, not reusable tokens.
- Parser fix sits in `core/` (pure logic), no DOM/side effects. Correct layer.
- Import direction clean throughout.

## Design System   PASS
- Colors are tokens: the sliding underline is `bg-guide-accent`, easing is `var(--ease-settle)`. No hex, no default Tailwind palette.
- **No accent-glow violation:** the tab underline is a solid 2px indicator bar, not a halo/glow; it moves, it doesn't bloom. Clears the slop ban.
- The ease-out → `--ease-settle` swap moves entrances *toward* the spring-first token system — a doctrine improvement, not a new hardcode.

## Accessibility   PASS
- Tab semantics intact: `role="tab"`, `aria-selected`, roving `tabIndex`, arrow-key handler all unchanged. The `motion.span` underline is `aria-hidden="true"` + `pointer-events-none` (decorative). Correct.
- `prefers-reduced-motion` honored on **every** new animation: GuideDefinitionCard, GuideTabBar (transition duration 0 → snaps), NotFoundPage (renders static), and the cleanup targets keep their `motion-safe:` prefix. Confirmed.
- 404: motion is a pure entrance; no focus trap, still one `<h1>`.
- Tap targets: tab buttons keep `min-h-11` (44px). Good.

## Content   N/A
- No prose/content files in the diff. The parser change alters *rendering* of existing guide markdown (drops literal `---`), not the source.

## Doctrine   PASS
- Motion is spring/wave-driven: `springSnappy` and `springSettle` are bounce 0 (critically damped arrival — correct for informational/arrival registers); no overshoot introduced. `springHover` (the only overshoot token) is untouched.
- The `motionConfig.ts` header comment previously called `--ease-out-expo` "the entrance/focus curve," contradicting the spring-first mandate; now reconciled. Good catch to fold in.

## Quality Gates   PASS
- `npm run lint` — clean (one pre-existing, unrelated `renderSection.tsx` react-refresh warning; not from this batch)
- `npm run build` — succeeds (integration tree)
- `npm run test` — 179 pass (+1 regression test for the parser)
- Token colors only; heading hierarchy intact; layers stated.

## Parser fix — correctness review   PASS
- `THEMATIC_BREAK_RE = /^ {0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/`, checked after all block matchers, before the empty-line/else. 
- Table separators (`|---|---|`) carry pipes → don't match, and are matched earlier anyway. Frontmatter fences are stripped before `parseBody`. Bullets need `[*-]\s+` (a space) → `---` can't be a bullet. `--` (2 markers) stays a paragraph (requires 3+). All correct.
- Minor, non-blocking: a `---` indented ≥4 spaces wouldn't match; no guide does this, so it's academic.

## Notes for Justin's live eye (not blockers — already in the draft PRs)
1. **Tab underline** (`-bottom-px h-0.5`): confirm the 2px bar tracks the baseline cleanly as it slides between tabs — that it sits on the container rule without dipping/overshooting.
2. **404 arc**: direction/curve feel (chose ccw from upper-right; trivial to flip).
3. **Both modes**: a quick Day/Night pass on the lab guide reading view + tab bar, since the full both-modes visual scoring wants real pixels.

## Impeccable Delegation
- The per-edit Impeccable design hook scanned every changed file inline during the build and reported **no anti-patterns**. The motion-apply work was routed through `/impeccable animate`'s methodology with the curated spring tokens. Full live both-modes `/audit` + `/critique` scoring is deferred to Justin's draft-PR eye (no rendered surface available to Roy).
