# Perihelion "Reading Room" — T3 Shelf Redesign Concepts

Status: **for Justin's review.** Four directions generated 2026-06-30 after the
vertical-spine build (`feat/perihelion-p3-shelf`, #147) was rejected live
("vertical text sucks to read"). All four read titles **horizontally**, keep the
editorial-shelf/catalog metaphor, preserve territory grouping + per-guide accent
contract (`--guide-accent-dark` / `--guide-accent-light`), and build on
placeholder materials (`--spine-material` seam) with Wallace surfaces held to T5.

Reusable from the rejected branch regardless of direction: GuideCard→GuideSpine
removal, the ADR-009 accent passthrough (useMemo, never sets `--guide-accent`
directly), the StatusPill, the `--spine-material` background seam, and the
accent-contract test.

---

## A · Accession Ledger — catalog index rows

Full-width ruled rows, scannable like a printed catalog of holdings. Accent = a
thin lit edge-rule (5–6px, the spine seen edge-on) flush left; title + meta read
flat beside it. No card chrome; baseline rules separate. Mobile: accent moves to
a top-edge bar, rows lie flat.

```
INSTRUMENTATION / FIELD METHODS                    04 ENTRIES
─────────────────────────────────────────────────────────────
▌  Reading the Sensor Floor             DIA · 2024   [ LIVE ]
▌  ░ how raw signal becomes evidence · 18 min
─────────────────────────────────────────────────────────────
▌  Calibration Without Ground Truth     AAWSAP · 23  [ DRAFT ]
▌  ░ trusting instruments that can't be checked · 12 min
─────────────────────────────────────────────────────────────
```

- **Pros:** maximally scannable; strongest catalog identity; thin-but-lit accent.
- **Risks:** can drift austere/list-y if the material seam isn't load-bearing.

## B · The Ledger Stack — edge-on stacked spines  *(recommended lead)*

Books lying flat in a pile on a ledge. Each spine a full-width bar: accent
left-cap + horizontal title + mono meta + pill. Bar thickness varies by guide
weight, heaviest settling to the bottom of each territory ledge. Hover slides the
bar left, out of the stack (spring, critically damped). Mobile-native: the
vertical stack *is* the pile.

```
FIELD STUDIES ───────────────────────────────────────────
  ┌──┬──────────────────────────────────────────────────┐
  │▓▓│ Signals in the Noise      FIELD · 2024   ( Live ) │ ← thin
  ├──┼──────────────────────────────────────────────────┤
  │▓▓│ The Long Observation      FIELD · 2023  (Reading) │
  ├──┼──────────────────────────────────────────────────┤
  │▓▓│ Groundwork: A Field Primer FIELD · 2022  ( Draft )│ ← thick
  └──┴──────────────────────────────────────────────────┘
   ▲accent cap   hover: bar slides ←12px out of stack
```

- **Pros:** truest to the "books on a desk" note; most distinct from a card grid;
  degrades well on placeholder gradients (accent cap + thickness carry it).
- **Risks:** skeuomorphism tipping kitsch — held to 1px seam-shadow + translate,
  no bevels/perspective; cap stacks at ~6 then "+N more".

## C · The Manifest — editorial masthead  *(typographic hedge)*

Least skeuomorphic. The shelf as a journal's numbered contents page: big
Newsreader entries, per-guide accent carried by a margin rule + tinted
drop-initial, material reduced to a thumb-width specimen seam. Folios + Part
numbers frame it as a bound manifest.

```
PART 02 · FIELD ANOMALIES
──────────────────────────────────────────────────────────
│ 012 ▎ ┌─┐ Reading the Instrument                ● LIVE
│     ▎ │R│ where the needle disagrees with the eye  AAWSAP · 2026
│
│ 013 ▎ ┌─┐ The Quiet Between Pulses               ○ DRAFT
│     ▎ │T│ counting silence as data               DIA · 2026
└── margin rule = accent ▎ = specimen seam (placeholder→Wallace)
```

- **Pros:** lets Newsreader carry the register; slop-safest material surface.
- **Risks:** closest to "every thoughtful-portfolio template"; leans on per-guide
  drop-initial + folio + seam to break that; needs flawless type discipline.

## D · Field Plates — specimen plates  *(post-Wallace payoff)*

Wide ~3:1 landscape plates, each with a framed, contained material swatch in the
left third (corner tick + hairline frame — a mounted specimen, not full-bleed)
and an editorial caption block right. Mobile: band moves to a top edge-band.

```
TERRITORY 02 — SIGNAL
──────────────────────────────────────────────────────────
┌────────────────────────────────────────────────────────┐
│ ┌───────┐  GUIDE · 18 MIN                  ◖ LIVE ◗     │
│ │▓▒░╱214│  Reading the Unexplained                     │
│ │▒░▓╱   │  Field methods for anomalous signal sets     │
│ └───────┘  D. REDACTED · 2026                           │
└────────────────────────────────────────────────────────┘
```

- **Pros:** highest material presence while staying horizontal; specimen register
  is distinctly not-SaaS.
- **Risks:** biggest imagery commitment — frame + corner tick guard against the
  concept-art-wallpaper read (imagery-restraint rule); riskiest on placeholder
  gradients; long-scroll for big territories.

---

## Comparison

| | Material presence | Slop/skeuo risk | Mobile fit | Distinctiveness |
|---|---|---|---|---|
| **A · Accession Ledger** | Low (thin seam) | Low (could read austere) | Strong (top-edge bar) | Catalog identity, but quiet |
| **B · Ledger Stack** | Medium | Medium (kitsch if loose) | Native (stack = pile) | High — owns the metaphor |
| **C · Manifest** | Lowest (chip) | Lowest, template-adjacent | Near-native | Type-led, needs discipline |
| **D · Field Plates** | Highest | Imagery-restraint risk | Good (top band) | High — specimen register |

## Recommendation

Lead with **B (Ledger Stack)**; keep **A (Accession Ledger)** as the fast,
low-risk fallback. Both validate well on placeholder materials, which is what T3
ships on (Wallace is held to T5). Park **D** as the post-Wallace option (best
payoff with real materials, riskiest on placeholders). **C** is the hedge if the
lab should stay purely typographic.

Proposed next step: build **B + A** as a local branch off main so they can be
compared live at `labs.localhost:5173/`, then take the winner to a draft PR.
