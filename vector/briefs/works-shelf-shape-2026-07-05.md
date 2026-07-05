# Shape Brief: The Works Section on the Shelf (Perihelion home)

**Date:** 2026-07-05
**Status:** built in the same PR (per the mission's "Shelf shape + PR" item); Justin's review point is the PR itself.
**Register:** brand, Reading Room side. This is an Archive-side surface (LabLayout home), so ADR-016's visual system and the imagery-restraint doctrine apply, not the deck's per-work license.
**Upstream:** `vector/decisions/ADR-017-perihelion-works-arm.md` (D1, D3, D7), `vector/briefs/works-01-flight-deck-shape-2026-07-03.md` §10 (Justin's resolved direction), `vector/missions/works-01-flight-deck.md`, ADR-016 (Reading Room), ADR-010 (two-arm house).

> Discovery note: the interview inputs are answered directly by the documents above (same precedent as the deck's own shape brief); no interview rounds were run. Wallace probes skipped: small Archive-side surface under imagery restraint, direction already resolved by Justin ("evolve the Shelf, not a foyer; instrument on the shelf, not another book spine").

---

## 1. Feature Summary

The Perihelion home gains a Works section: the Flight Deck's entry point on the shelf, so the piece is not orphaned. It is one instrument resting on the library's shelf of books, in a register visibly distinct from the Accession Register ledger, carrying the work's sigil and thesis line. The true two-arm foyer stays deferred to Works 02.

## 2. Primary User Action

Notice that Perihelion has a second arm, and board the deck. One click from the reading room to `/w/flight-deck`.

## 3. Design Direction

- **Color strategy: Restrained** (Reading Room default). Lab tokens only; the entry's accent resolves through the existing `--guide-accent` cascade, whose fallback is already the house brass. Brass is right: amber-means-touchable is the deck's own grammar, and it is distinct from all four territory accents. No deck tokens on this surface (ADR-017 D2 scoping).
- **Scene sentence:** the reader who has been browsing the library after dark reaches the end of the shelves and finds, resting on the last shelf board, a small calibrated instrument that is clearly not a book. Dark academic base per ADR-016; both lab modes supported.
- **Anchor references:** the Accession Register itself (kinship: rules, mono provenance, horizontal titles); a scientific instrument on a library shelf (a brass sextant in a reading room, present but not performing); the house sigil's drafting hand (thin ellipses, one brass point).
- **The register distinction** (the whole point): the guide ledger is rows of text between rules. The Works entry is a composed object: a drawn mark plus a title block, more air, larger display scale, no provenance gutter or hung venue column. Same materials (lab ink, hairlines, mono metadata), different grammar, so it reads as an instrument among books rather than a fifth territory.

## 4. Scope

Production-ready, one section on one page, shipped-quality link plus the sigil mark (also landed on the deck's decline card, closing that component's standing note). Polish until it ships; small surface.

## 5. Layout Strategy

- **Placement: after the territory shelves, before the footer.** The reading room narrates the library first; the bench at the end is the closing beat ("and here is where the reading becomes something with controls"), directly above the footer that carries the Archive's own arm line. Putting Works above the territories would push the Archive's content down on its own home; wrong posture for an arm with one piece.
- **Section header** rhymes with territory headers (kicker row, h2, italic premise) but swaps the TerritoryBadge for a plain mono kicker, so it is kin without impersonating a territory: kicker "The applied arm", h2 "Perihelion Works", one italic premise line.
- **The entry** is a single full-width link composition on a top-and-bottom hairline (the shelf board it rests on): sigil column left (~7rem, mirroring the ledger's gutter width so the page's vertical rhythm holds), title block right (mono registration line "W · 01 · 2026", display title, italic thesis line, mono status line). Titles horizontal, never truncated, per the standing shelf rule.
- **Heading order:** page h1 (Perihelion Archive) untouched; Works h2; entry title h3. Matches the territory grammar.

## 6. Key States

- **Rest:** sigil in bone ink with its one brass point quietly emitting (the same held-glow grammar as the house mark's periapsis dot); title in primary ink; thesis in secondary italic.
- **Hover/focus:** the existing shelf affordance grammar: faint accent wash on the row, title inks toward brass, and the sigil's brass point brightens its emission (hover-gated glow, sanctioned). Focus-visible ring per lab defaults.
- **Status:** driven by the manifest (`in-progress` reads "In progress", `live` reads "Live"); status is text plus the ledger's dot mark, never color alone.
- **Reduced motion:** the section's whileInView fade (shared territory spring) drops to static per the existing hook; the sigil is a still drawing, nothing to disable.
- **Empty state:** none; the section renders from the manifest and the manifest has an entry. Works 02+ appends rows to the same list.

## 7. Interaction Model

The whole entry is one `Link` to `/w/{slug}` with an aria-label carrying title and status. No nested links (source-guide citations belong to the deck's colophon, not the shelf). Section reveal uses the same `springSoft` whileInView as territory sections: one grammar, no bespoke entrance. No new motion moments; the shelf's one ambitious gesture stays the masthead sigil's arrival spark.

## 8. Content Requirements

- Kicker: "The applied arm". Heading: "Perihelion Works".
- Premise (italic, one line): "Pieces built from the Archive's research, made to be operated." Scaffold-honest; the colophon copy PR (Writer + Gaff, Joi-gated) may retune it alongside the D7 arm line, and it lives in one place.
- Entry: title and thesis line straight from `core/works/works.ts` (single source; decline card and colophon already draw on it). Registration line "W · 01 · 2026"; meta line "Built from 4 Archive guides · In progress" (count derived from the manifest).
- No em-dashes, no permission framing, mission test per line.

## 9. The sigil (the mark this brief commissions)

The Flight Deck's mark, drawn in the house sigil's hand (thin strokes, one brass point, drafting-instrument feel) but instrument-faced: the field ring seen as a gauge. A bone-ink circle (the bubble wall) with a short dense arc at the top of its ramp, three small radial ticks at the tracked stress bearings, a single committed-bearing stroke from center to wall, and a small brass point with halo where the stroke meets the wall (the arrival glow; the periapsis dot's cousin, so house and work rhyme). Static drawing; emission is CSS (rest glow quiet, hover brighter).

Implementation contract: a standalone leaf module under `src/works/sigils/` with zero deck imports, so the shelf can import it statically without pulling deck code into the labs bundle (ADR-017 D5 stays honest). Color via `currentColor` and a `--sigil-accent` custom property set by the consumer (shelf: `var(--guide-accent)`; decline card: `var(--deck-caution)`), so the mark carries no literal color and no cross-surface token leakage. A `workSigils` registry keyed by slug makes it the Works 02+ template. The decline card gains the mark in this PR, closing its "sigil lands with the Shelf work" note.

## 10. Open Questions

- D7 masthead arm lines: the footer already carries the Archive's line; the Works arm line is drafted with the colophon copy (next item). Whether it also surfaces in the masthead lands there, not here.
- Section premise copy is scaffold-grade until the Writer + Gaff colophon pass; single constant, one-line swap.
- When Works 02 exists, revisit whether the section's single-entry composition becomes a list of instrument rows (the layout already maps over the manifest).
