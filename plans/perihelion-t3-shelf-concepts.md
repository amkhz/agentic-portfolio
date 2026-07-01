# Perihelion "Reading Room" — T3 Shelf Concepts

Status: **CHOSEN — the Accession Register** (Justin, 2026-06-30, live). The
toggle + the two losing layouts (Ledger, Lit Bay) are removed; the Register is
refined and shipping on PR #150. Prior slate (three behind a live toggle) kept
below for the record.
Fresh, doctrine-native slate generated 2026-06-30 after the second attempt
(PR #149, "Ledger Stack" + "Accession Ledger") was set aside as **AI-slop** —
both leaned on a neon accent GLOW ("that lush border thing"), which DESIGN.md
bans outright ("dev-bro neon gradients," "neon green failure mode," "materials
over decoration — no purely decorative flourishes").

## The rebuild principle (from DESIGN.md / PRODUCT.md)

- **No glow.** No box-shadow accent halos, no glowing colored borders, no flat
  color panels (reads as book-series template — rejected).
- **Interaction = brass, only brass**, ≤10% coverage, expressed as a
  **weight-shift on hover** (variable-font-axis play on the title) + subsurface
  light — never a decorative border-glow. In the lab, `--guide-accent` is the
  per-guide interaction color.
- **Life = authored material + light-through-surface**, or typesetting — never a
  decorative effect. Green/sage is atmosphere and material only.
- **Motion** spring/wave-driven; arrivals critically damped (bounce 0);
  micro-interactions a small damped overshoot; one ambitious moment per surface.
  (Full spring pass is T6; these prototypes use CSS transitions.)
- **Type:** Newsreader (body/dek), Podkova (titles), JetBrains Mono
  (metadata/status). Full titles (no truncation), full authorship, generous
  spacing — Justin's stated loves.
- **Wallace (T5) is HELD** — a concept must sing on authored-CSS placeholder
  surfaces and upgrade to real material without layout change.

---

## 1 · The Ledger — type-led journal masthead

Front-matter of a bound research annual: folio-numbered catalog rows, running
hairline rules, Podkova titles at display scale. Accent is a 2px margin **seam**
(drawn ink, not glow). Hover = title weight + ink deepen + seam draws
top-to-bottom.

## 2 · The Specimen Case — material archive *(parked)*

Bound board per guide; upper block is authored material with subsurface light.
Parked for now: portrait boards edge back toward a card grid, and it pays off
most once Wallace lands.

## 3 · The Accession Register — field-notebook ledger *(recommended)*

A researcher's logged holdings: a left **mono provenance gutter** (accession ID ·
year · status) against a hairline, wide entry field with full Podkova title +
Newsreader dek + full mono authorship, and a **hanging margin annotation**.
Accent = the pigment of the ID ink; hover thickens the gutter hairline to brass
+ weight-shift. Authorship/provenance is the subject; matches the lab's
epistemic voice; zero material dependency.

## 4 · The Lit Bay — inhabited architecture

Each territory is a warm reading-lamp gradient washing edge-to-edge (no border);
volumes rest on a single 1px **ledge hairline** + contact-shadow. Accent = flat
spine pigment. Hover = volume eases off the ledge with subsurface warmth. Most
spatial; watch the kitsch/heavy-panel risk.

---

## Prototype (branch feat/perihelion-p3-shelf-v3)

Three layouts live behind the **Prototype · shelf layout** toggle for live
comparison: **Register** (default), **Ledger**, **Lit Bay**. Placeholder
materials, no glow. Once Justin picks, the losers + toggle come out. The Specimen
Case stays parked for the Wallace (T5) pass. Superseded first slate: Ledger Stack
/ Accession Ledger / Manifest / Field Plates (glow-dependent).
