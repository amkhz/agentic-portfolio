# Roy's Review: Perihelion P2 — Reading type (Newsreader Variable body)
Date: 2026-06-30

## Verdict: SHIP WITH NOTES

Clean, well-scoped type-token swap. Architecture is correct, all four mechanical gates pass, the per-mode weight system is documented inline and the variable-axis override is fully covered for every text role. One forward-looking note for P3/P4 builders, and a sizing observation Justin already flagged live. Nothing blocks merge.

## Files Reviewed
- `design-system/lab-tokens.css` (layer: design-system) — body font retarget + `--lab-body-weight` / `--lab-body-weight-strong` per mode
- `src/lab/styles/lab.css` (layer: design-system / lab global stylesheet) — body type scale, `font-optical-sizing`, `font-variation-settings` wiring
- `src/lab/main.tsx` (layer: src, thin font-load wiring) — Newsreader standard + standard-italic imports
- `package.json` / `package-lock.json` — `@fontsource-variable/newsreader`
- `plans/perihelion-visual-recalibration-brief.md` — §4/§7 lock record
- `CLAUDE.md` — unrelated one-line doc edit carried on the branch

## Architecture    PASS
- Token decisions (families, weights) live in `lab-tokens.css`; consumption in `lab.css`; font load isolated to `main.tsx`. Correct layer order (tokens → wiring → UI), no component restyling, exactly matching the T2 scope boundary ("type token swap + font load only").
- No business logic, no DOM access, no API calls introduced.

## Design System   PASS
- OKLCH-only color discipline untouched — no color changed in this diff.
- Weights correctly tokenized as `--lab-body-weight` (400 dark / 330 light) and `--lab-body-weight-strong` (620 / 580 emphasis), referenced by name. This is the right home for them.
- `font-size: 1.1875rem` / `line-height: 1.65` sit raw in the `body` base selector. This is the established pattern (the prior values 1.0625rem / 1.7 were raw in the same place) and matches the brief §7 locked type system. Acceptable as a base declaration; not a new violation.
- Three-face system intact: Podkova display, Newsreader body, JetBrains Mono kicker. `--lab-heading-font` and `--lab-mono-font` untouched per scope. No fourth face.

## Accessibility   PASS
- No interactive elements, no animations, no contrast pairs changed (colors are out of scope this pass; WCAG was re-verified in P1).
- Light-mode body weight 330 is light but lands on Newsreader at 19px on cream paper — legible, and intentionally chosen against bloom. Worth a glance in Justin's live check but not a flag.

## Content        N/A
- No content files in the diff.

## Doctrine        PASS
- Matches the brief §4/§7 locked calls exactly: Newsreader Variable body, Podkova display retained, JetBrains Mono retained, per-mode inverted weight (dark heavier). The inverted-weight rationale is captured in the brief and the inline comments and is queued for ADR-016.
- Convergent-but-distinct thesis honored: the lab keeps its reading serif as the one principled deviation from the portfolio body sans.

## Quality Gates   PASS
- `npm run lint` — 0 errors. The single warning is in `src/components/content/renderSection.tsx`, pre-existing and outside this diff.
- `npm run build` — succeeds. The 526KB labs chunk is the pre-existing >500KB follow-up; P2 adds font CSS + woff2 assets, not JS, so the chunk is essentially unchanged.
- `npm run test` — 167/167 pass.

## Notes (non-blocking)

1. **Forward note for P3/P4 — Tailwind weight utilities no longer drive Newsreader weight.** Setting `font-variation-settings: "wght"` on `body` makes the low-level axis win over the `font-weight` property for the variable body face. The diff covers every current role (headings + code reset to `normal`; `strong/b` get the strong token; everything else inherits the body weight), so nothing is broken today. But any NEW serif (`font-lab-body`) element in the Shelf or Reader that needs a non-default weight must drive it via `--lab-body-weight-strong` or an explicit `font-variation-settings`, not a `font-medium`/`font-semibold` class — those will silently no-op on Newsreader. (They remain valid on Podkova headings, which are non-variable.) Recommend a one-line comment near the body rule in `lab.css` capturing this so P3/P4 builders don't trip on it.

2. **Dead-but-harmless classes.** The `font-semibold` on existing `<strong>` elements (GuideList, GuideTable, GuideBlockquote, GuideParagraph) is now overridden by the `strong, b` variation rule. Visually correct (the token weight wins); the class is just inert. Out of P2 scope to remove — leave it.

3. **Sizing — already flagged live.** Justin noted the body reads a little small. Newsreader has a smaller x-height than the outgoing Georgia, so 19px Newsreader can read smaller than 17px Georgia despite the nominal increase. This is a face characteristic, not a defect. Resolve via his live second look (a bump toward ~20px / `1.25rem`, or an x-height-aware tune). Hold until he confirms.

## Impeccable Delegation
- None needed. Pure type-token swap with no rendered layout/UX surface to assess; the live visual judgment is Justin's lock call per the brief.

## Post-review live tuning (2026-06-30, resolves Notes 1 & 3)
The live both-modes session settled the two open items and grew the pass slightly beyond the original token-only scope (now also touches three guide prose components — low-risk className edits):
- **Reading size locked at 18px mobile / 20px desktop** (`text-lg` → `md:text-xl` on `GuideParagraph`, `GuideList`, `GuideBlockquote`). Root cause of "reads small": the prose size lives on these component classes, not the `body` rule, so earlier `body { font-size }` edits were inert. Brief §7 updated; consolidation into a single `--lab-reading-size` token deferred to P4.
- **Per-mode weight reversed by eye to dark 330 / light 400** (strong 560 / 620). The first build's "dark heavier" halation theory lost to the standard bloom-trim direction live — dark-mode light-on-dark serifs bloom and go inky, so they run lighter. This now matches the portfolio direction; it is not an inversion. Comments + brief reconciled.
- **Antialiasing pair completed** — added `-moz-osx-font-smoothing: grayscale` alongside the existing `-webkit-font-smoothing: antialiased`.
- **Forward-note comment added** in `lab.css` (Note 1) so P3/P4 builders know Tailwind weight utilities no-op on the variable Newsreader face.

Verdict unchanged: **SHIP WITH NOTES**. Note 2 (dead `font-semibold` on `<strong>`) still deferred as out-of-scope cleanup.
