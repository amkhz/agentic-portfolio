# Roy's Review: T3 Shelf Redesign v3 (feat/perihelion-p3-shelf-v3)
Date: 2026-06-30

## Verdict: SHIP WITH NOTES

Three glow-free candidate shelves (Accession Register, The Ledger, The Lit Bay)
rebuilt from DESIGN.md after the v2 glow direction was set aside. The banned
tell — neon accent halos — is gone: interaction is now brass weight-shift + ink,
material/atmosphere is authored not decorative. Architecture, tokens, and
accessibility hold. Notes are about the prototype scaffolding and one honest risk
carried on the Lit Bay, not blockers.

## Files Reviewed
- `src/lab/components/library/RegisterShelf.tsx` (layer: src — UI)
- `src/lab/components/library/LedgerShelf.tsx` (layer: src — UI)
- `src/lab/components/library/BayShelf.tsx` (layer: src — UI)
- `src/lab/components/library/ShelfLayoutToggle.tsx` (layer: src — UI, temporary)
- `src/lab/components/library/guideShelfCommon.ts` (layer: src — UI accent logic)
- `src/lab/components/library/TerritoryGrid.tsx` (layer: src — UI)
- `src/lab/components/library/UpcomingCard.tsx` (layer: src — comment only)
- `src/lab/pages/LibraryIndex.tsx` (layer: src — UI)
- `src/lab/styles/lab.css` (layer: lab style seam)
- `src/lab/components/library/guideShelf.test.tsx` (test)
- removed: `GuideCard.tsx`, `GuideCard.test.tsx`

## Architecture    PASS
- All changed files in src/ (UI) except the lab.css rule (lab style layer).
- `guideShelfCommon.ts` holds the accent hook + type + label map only (UI CSS-var
  publishing) — no core logic, no I/O. Correct.
- ADR-009 accent contract intact and single-sourced: each entry publishes the
  `--guide-accent-dark/-light` pair inline; the `.lab-guide-spine` CSS re-resolves
  `--guide-accent` per item. No new inline-style exception introduced.
- No API calls / business logic in components; layout state is component-local
  (deliberately stateless across reload for throwaway prototype scaffolding).
- All files under 200 lines.

## Design System   PASS
- No raw hex / rgb() / hsl() in any shipped file (test fixtures excepted). The
  black/white in lab.css are pre-existing SVG-mask luminance + scrollbar-mask
  values, not in this diff.
- All color is tokens or `color-mix(in oklab, var(--token) …)`. The Lit Bay's
  lamp wash is a neutral surface→deep radial (no accent in atmosphere — doctrine
  reserves accent for interaction, green/material for atmosphere) over the token
  `--lab-texture` grain, so it never reads as a flat panel.
- Three-face system: titles `font-lab-heading` (Podkova), metadata/status
  `font-lab-mono`, dek `font-lab-body` (Newsreader). No fourth face.

## Accessibility   PASS
- Heading order: page h1 (LibraryHeader) → territory h2 → guide h3 (one per
  entry, all three shelves).
- Entries are links with descriptive `aria-label` (title + status); accent seams,
  spines, status dots are decorative text/`aria-hidden`.
- Focus-visible covered by the global lab `a / button` outline rule.
- `prefers-reduced-motion`: Lit Bay lift is `motion-safe:`-gated; section reveal
  respects useReducedMotion. (Full spring pass is T6.)
- Tap targets: entries are tall (py-5/6); toggle buttons `min-h-[40px]`.
- Contrast: title/dek/authorship on surface use primary/secondary/muted ink (AA);
  per-guide accent pigment (call-number, seam, spine, status) reuses the tuned
  accent/accentLight that holds AA in both modes.

## Content         N/A
- No content files changed. Register call-number/folio derived from real data
  (territory + position); provenance annotation is the real `source.venue`. No
  fabricated fields, no invented read-times.

## Doctrine        PASS
- The rejected neon-glow language is gone. Interaction = brass weight-shift + ink
  deepen (+ per-shelf move: gutter pencil-tick / seam brighten / volume lift).
  Accent held to small pigment marks (≤10%). No box-shadow accent halo anywhere.
- Titles read horizontally, never truncate; full authorship shown; generous
  spacing — matches the operator's stated loves.
- Distinctiveness: Register leans on the lab's epistemic/provenance voice; Ledger
  on masthead + folio rhythm; Lit Bay on lit-space composition. All three avoid
  the card-grid/template read.

## Quality Gates   PASS
- lint: clean (0 errors; only pre-existing renderSection warning).
- test: 176/176 (12 new — accent-contract across all three shelves).
- build: succeeds. (labs chunk >500KB is the known pre-existing follow-up.)

## Impeccable Delegation
- None invoked — structural/contract review on placeholder material. Defer
  `/critique` + `/audit` to the chosen-layout polish pass after Justin's live pick.

## Notes / risks carried to live validation
- **Lit Bay (honest risk):** volumes render as a responsive grid resting on the
  ledge — the closest of the three to a card-grid read, and the highest
  kitsch/heavy-panel risk. It clears the glow ban, but whether the ledge + lamp
  read as "inhabited space" vs. "tinted cards" is exactly the live-eye call.
- **Weight-shift is discrete:** Podkova is non-variable, so the hover weight step
  snaps (semibold→bold) rather than tweening. T6's spring pass can refine to a
  variable axis if a variable display face is in play.
- **Cleanup:** once a layout is chosen, remove ShelfLayoutToggle + the two losing
  shelves + the `layout` prop threading.
