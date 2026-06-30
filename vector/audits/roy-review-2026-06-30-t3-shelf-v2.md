# Roy's Review: T3 Shelf Redesign v2 (feat/perihelion-p3-shelf-v2)
Date: 2026-06-30

## Verdict: SHIP WITH NOTES

Two clean horizontal-title shelf layouts replace the GuideCard grid behind a
temporary prototype toggle, with the per-guide accent contract correctly
extended to the shelf via CSS. Architecture, tokens, and accessibility hold. The
only finding (toggle tap target) was fixed during review; remaining notes are
about the throwaway prototype scaffolding, not the candidate layouts.

## Files Reviewed
- `src/lab/components/library/GuideSpine.tsx` (layer: src — UI)
- `src/lab/components/library/GuideLedgerRow.tsx` (layer: src — UI)
- `src/lab/components/library/ShelfLayoutToggle.tsx` (layer: src — UI, temporary)
- `src/lab/components/library/StatusPill.tsx` (layer: src — UI)
- `src/lab/components/library/guideShelfCommon.ts` (layer: src — UI accent logic)
- `src/lab/components/library/TerritoryGrid.tsx` (layer: src — UI)
- `src/lab/components/library/UpcomingCard.tsx` (layer: src — UI, comment only)
- `src/lab/pages/LibraryIndex.tsx` (layer: src — UI)
- `src/lab/styles/lab.css` (layer: design-system seam — lab CSS)
- `src/lab/components/library/guideShelf.test.tsx` (test)
- removed: `GuideCard.tsx`, `GuideCard.test.tsx`

## Architecture    PASS
- All changed files sit in src/ (UI) except the lab.css rule, which belongs in
  the lab style layer. Correct.
- `guideShelfCommon.ts` holds a hook + type + label map (CSS-var publishing) —
  UI concern, no core logic, no I/O. Correct placement.
- No API calls, no business logic in components. No localStorage/storage detour
  (layout state is component-local, deliberately stateless across reload for a
  throwaway prototype).
- ADR-009 accent contract preserved and well-factored: items publish the
  `--guide-accent-dark/-light` pair inline; the new `.lab-guide-spine` CSS
  re-resolves `--guide-accent` per item so the shelf shows true per-guide
  accents instead of the masked territory color. No new inline-style exception
  introduced — the budget stays at GuideRenderer + shelf items.
- All files under 200 lines.

## Design System   PASS
- No raw hex / rgb() / hsl() in any shipped file (test fixtures excepted, as in
  the prior contract test).
- Colors are tokens or `color-mix(in oklab, var(--guide-accent) …)` over token
  vars. Placeholder material gradient is token-derived; `--spine-material` seam
  reserved for Wallace (T5).
- Three-face system respected: title `font-lab-heading`, kicker/meta
  `font-lab-mono`, dek `font-lab-body`. No fourth face.

## Accessibility   PASS (one fixed)
- Heading order correct: page h1 (LibraryHeader) → territory h2 → guide h3.
- Shelf items are links with descriptive `aria-label` (title + status); accent
  caps/rules are `aria-hidden`.
- Focus-visible covered by the global lab `a / button` outline rule.
- `prefers-reduced-motion`: GuideSpine's translate is `motion-safe:`-gated;
  section reveal already respects useReducedMotion.
- Tap targets: shelf rows are tall (py-3.5–6); **FIXED during review** — toggle
  buttons were ~24px, now `min-h-[40px]`.
- Contrast: title on surface is primary ink (AA); per-guide accent pills reuse
  the existing card tuning (dark accent / curated accentLight) that already
  holds AA in both modes.

## Content         N/A
- No content files in the diff. Status labels truthful (Complete / In progress /
  Draft) — no fabricated read-times.

## Doctrine        PASS
- Editorial-shelf metaphor preserved; titles read horizontally in both layouts.
  The rejected vertical/rotated standing-spine form is gone.
- Distinctiveness: per-guide accent spectrum + material seam + thickness rhythm
  (Stack) / lit edge-rule + ruled ledger (Accession) keep both from reading as a
  generic card grid or template list. Final call is Justin's live eye.
- Lab dark floor (graphite) and OKLCH-token discipline honored.

## Quality Gates   PASS
- lint: clean (0 errors; only the pre-existing unrelated renderSection warning).
- test: 172/172 pass (8 new shelf accent-contract cases, both layouts).
- build: succeeds. (labs chunk >500KB is the known pre-existing follow-up.)

## Impeccable Delegation
- None invoked in this pass — this is a structural/contract review on
  placeholder materials. Defer `/critique` + `/audit` to Justin's live
  validation, once a layout is chosen and before the loser + toggle are removed.

## Notes for the chosen-layout cleanup pass
- Remove `ShelfLayoutToggle.tsx`, the losing layout component, and the `layout`
  prop threading once Justin picks.
- T6 motion: hover transitions are CSS today; spring/wave-driven motion lands in
  the T6 pass per the motion mandate.
