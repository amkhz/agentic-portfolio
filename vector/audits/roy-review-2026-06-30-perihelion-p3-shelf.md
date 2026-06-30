# Roy's Review: Perihelion P3 — The Shelf (editorial spine index)
Date: 2026-06-30

## Verdict: SHIP WITH NOTES

A clean, contained, token-pure conversion of the card grid to a standing-spine shelf. Architecture and design-system integrity are intact and all four gates pass. The notes are live-validation items — vertical-title overflow on the longest guide titles and a few small-type readability calls — none of which block the handoff to Justin's in-browser pass. Not being merged; lands for live validation.

## Files Reviewed
- `src/lab/components/library/GuideSpine.tsx` (layer: src/ UI) — new
- `src/lab/components/library/GuideSpine.test.tsx` (layer: src/ UI) — renamed from GuideCard.test
- `src/lab/components/library/TerritoryGrid.tsx` (layer: src/ UI)
- `src/lab/components/library/GuideCard.tsx` + `.test` (layer: src/ UI) — deleted
- `src/lab/components/library/UpcomingCard.tsx` (comment only)
- `src/lab/styles/lab.css` (comment only)

## Architecture    PASS
- GuideSpine is pure src/ UI: imports only `@core/lab/guide-types` and react-router. No business logic, no data fetching, no DOM side effects. Correct layer.
- Grouping/lifecycle logic stays in TerritoryGrid (unchanged); the spine is presentational.
- GuideSpine is 127 lines — under the 200 limit.
- ADR-009 inline-accent contract correctly carried over verbatim from GuideCard: publishes `--guide-accent-dark` always, `--guide-accent-light` only when curated, never sets `--guide-accent` directly. Tests assert all three behaviors and pass.

## Design System   PASS
- No raw hex/rgb/named colors in the components (grep clean). All chrome via tokens: `bg-guide-accent`, `text-lab-text-*`, `border-lab-border-*`.
- Material placeholder uses `color-mix(in oklab, var(--guide-accent) …, var(--lab-bg-surface))` — token-driven, OKLCH-space mix, accent-tinted with depth (not a flat fill), honoring the no-flat-cover principle as a stand-in. The hex that flows into `--guide-accent` originates in guide frontmatter (the ADR-009 data passthrough), not UI code.
- Three-face system respected: Podkova display on the title (h3), JetBrains mono on kicker/status/year. No fourth face.
- `--spine-material` hook documented for the T5 Wallace drop-in. Good forward-seam.

## Accessibility   FLAG (notes, non-blocking)
- Vertical title uses `writing-mode: vertical-rl` + `rotate-180`. Text remains real DOM and the Link carries an `aria-label="{title} — {status}"`, so screen-reader and keyboard order are unaffected. Good.
- Decorative spine edge / material spans are `aria-hidden`. Focus-visible handled by the global lab.css outline. Reduced motion honored (`motion-safe:` guards the only transform).
- Heading order preserved: section `h2` → spine `h3`, no skipped levels; one page `h1` stays in LibraryHeader.
- NOTE: desktop spine `md:min-w-[3.25rem]` = 52px wide × 21rem tall — clears the 44px tap-target floor, but the narrowest single-column spines are slim. Confirm comfortable click/tap in the live pass.
- NOTE: status pill and year dropped to `text-[0.6rem]` (from 0.65rem). Mono metadata, contrast tokens unchanged, but verify legibility on the standing spine at real viewport.

## Content         N/A
- No content files in the diff; titles/authors/years are passthrough from existing frontmatter.

## Doctrine        PASS
- Matches ADR-016 "The Reading Room" T3 intent: editorial spine/catalog bones, no literal 3D skeuomorph, mobile spines lying in a pile, territory grouping preserved (Justin's locked call). Imagery restraint honored — placeholder material only, Wallace surfaces deferred to T5 per his "build on placeholders first" decision.

## Quality Gates   PASS
- `npm run lint`: 0 errors (1 pre-existing warning in renderSection.tsx, untouched).
- `npm run build`: succeeds (the >500KB labs chunk warning is the known pre-existing follow-up).
- `npm run test`: 167 passed; GuideSpine.test replaces GuideCard.test at the same count.

## Live-validation notes for Justin (the real review surface)
1. **Longest-title overflow.** "UAPx Field Methods: Instrumented UAP Science from First Principles" and the long DIRD titles wrap into multiple vertical columns. The spine is `overflow-hidden` with `md:max-w-[10rem]`, so an extreme title could clip. Confirm the longest titles read fully or clip gracefully; tune height/max-width/column count by eye.
2. **Shelf rhythm.** Varied spine thickness (title-length-driven) should read as a real shelf, not a barcode. Check the mix per territory.
3. **Material placeholder.** Confirm the accent-tinted gradient reads as a believable stand-in for the T5 binder-cloth/foil surfaces — it sets the expectation for that pass.
4. Small-type legibility (note above), both modes.

## Impeccable Delegation
- None invoked here — this is a structural/token review. Recommend `/critique` or `/impeccable live` during Justin's in-browser pass for the visual/UX assessment of the standing-spine rhythm and material feel.
