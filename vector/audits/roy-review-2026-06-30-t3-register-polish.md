# Roy's Review: T3 Accession Register — settle + polish (feat/perihelion-p3-shelf-v3)
Date: 2026-06-30

## Verdict: SHIP WITH NOTES

Justin chose the Accession Register. This pass strips the prototype scaffolding
(toggle + the two losing shelves), refines the Register per his live notes
(surface domain color at rest; more affordant hover with a sanctioned subtle
glow), and brings pipeline guides into the ledger grammar. Clean and coherent.

## Files Reviewed
- `src/lab/components/library/RegisterShelf.tsx` (layer: src — UI; now also
  exports RegisterUpcomingShelf)
- `src/lab/components/library/guideShelfCommon.ts` (removed the ShelfLayout type)
- `src/lab/components/library/TerritoryGrid.tsx` (Register-only; renders pipeline
  rows via RegisterUpcomingShelf)
- `src/lab/pages/LibraryIndex.tsx` (dropped toggle + state)
- `src/lab/components/library/guideShelf.test.tsx` (Register-only)
- removed: `LedgerShelf.tsx`, `BayShelf.tsx`, `ShelfLayoutToggle.tsx`,
  `UpcomingCard.tsx`

## Architecture    PASS
- All UI in src/. ADR-009 accent contract intact (entries publish the pair +
  carry `.lab-guide-spine`; CSS resolves). No new inline-style exception.
- Pipeline rows now share the ledger component file — one visual grammar, one
  place. UpcomingCard (the old card) removed. Files under 200 lines.

## Design System   PASS
- No raw hex/rgb/hsl in shipped files — tokens or `color-mix(in oklab, …)` only.
- Domain color at rest: a per-guide accent margin rule (opacity 0.6) + the accent
  call-number now carry the guide's color without hover.
- Three-face system intact (Podkova title / mono meta / Newsreader dek).

## Accessibility   PASS
- Heading order: page h1 → territory h2 → guide h3 (built + pipeline entries).
- Built entries are links with `aria-label`; pipeline rows are non-interactive
  (`aria-disabled`, `tabIndex={-1}`) — correct, they aren't navigable yet.
- Accent rule / status glyphs are decorative (`aria-hidden`).
- Contrast: pipeline rows sit at opacity 0.75 on secondary/muted ink — still AA
  for their advisory role; built rows unchanged (AA both modes).

## Doctrine        PASS (with a sanctioned exception, noted)
- **Subtle affordance glow:** the accent margin rule gains a soft 10px glow
  (55%-mixed accent) ON HOVER ONLY. This is the glow Justin explicitly
  re-permitted ("subtle glow that adds atmosphere or affordance is okay"). It is
  distinct from the banned v2 tell — a large, always-on decorative neon halo. It
  stays small, hover-gated, and reads as affordance, not decoration. Recorded so
  the exception is intentional, not drift. See feedback-no-accent-glow (updated).
- Titles horizontal, full, never truncated; full authorship; generous spacing.

## Quality Gates   PASS
- lint clean (only pre-existing renderSection warning); 168 tests; build ok.

## Notes
- **Backgrounds / vertical line (deferred, Justin's call):** the faint vertical
  line in both modes is the `--lab-texture` 90deg vertical ruling every 128px
  (design-system/lab-tokens.css:137 dark, :261 light). Logged for the
  archival-paper background phase; not touched here.
- **Weight-shift is discrete** (Podkova non-variable); T6 spring pass can refine.
- **Motion:** hover is CSS transitions; spring pass is T6.
