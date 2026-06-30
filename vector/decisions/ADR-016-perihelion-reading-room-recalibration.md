# ADR-016: Perihelion Visual Recalibration ("The Reading Room")

**Date:** 2026-06-30
**Status:** accepted
**Deciders:** [OPERATOR: Justin + Tyrell; confirm any others involved]

## Context

The Perihelion lab (`labs.justinh.design`) carried the cool, Gibson-blue reading palette and a system-serif body face from before the portfolio's "Conservatory" recalibration (ADR-013). With the Conservatory shipped, the lab read as a different visual world rather than part of the same house. This ADR records the recalibration that brings the lab into convergent grammar with the portfolio while keeping its distinct purpose intact. The recalibration is sequenced as a mission (P1–P6, see `vector/missions/perihelion-reading-room-recalibration.md`); P1 (palette) and P2 (reading type) are shipped to main. This is a record ADR: the decisions below are made and partly live, not under debate.

## Decision Drivers

- **Convergent-but-distinct thesis (VECTOR / brief §1, §11).** Perihelion is "a quieter wing of the same building" as the Conservatory: unify the grammar and the material, keep the metaphor and purpose distinct. This refines ADR-013's earlier "Perihelion follows its own separate path" into "convergent grammar, distinct metaphor."
- **Reading comfort is the lab's job.** Perihelion is a deep-dive reading library; long-form legibility in both modes outranks visual novelty.
- **OKLCH-tokens-first, no pure black (CLAUDE.md / ADR-013).** All color via OKLCH tokens by name; the locked L 0.17 graphite dark floor holds — "no pure black" is a reading-comfort lock.
- **Imagery restraint (DESIGN.md / feedback).** Generated imagery is a deliberate material accent, never wallpaper.
- **Distinctiveness over template-clean.** Faces must not read as generic AI/portfolio default (no Fraunces in the lab — it reads AI here; no system Georgia).

## Options Considered

### Option A: Leave Perihelion on its pre-Conservatory direction

Keep the cool palette and system serif; let the lab remain its own visual world.

**Pros:**
- Zero work; no regression risk to a shipped, public surface.
- Preserves a hard separation between portfolio and lab.

**Cons:**
- The lab reads as a different house — breaks the "same building" thesis the moment a visitor crosses from `justinh.design` to `labs.justinh.design`.
- Cool blue-violet neutrals fight the warm, inhabited register the portfolio now owns.
- System serif is undistinguished and inconsistent across platforms.

### Option B: Mirror the Conservatory exactly (Fraunces/Hedvig, identical palette)

Apply the portfolio's faces and tokens wholesale to the lab.

**Pros:**
- Maximum visual unity; one token set to maintain.

**Cons:**
- Collapses the distinct metaphor — the lab should feel like a quieter wing, not a clone.
- Fraunces reads as AI default in a dense reading context; wrong tool for long-form body.
- Podkova is already the lab's identity-locked display face (ADR-012); overwriting it discards earned identity.

### Option C: Convergent grammar, distinct metaphor (chosen)

Warm the lab's neutrals toward the Conservatory's humus register and adopt an uncommon reading serif, while keeping Perihelion's own display face and reading-first purpose.

**Pros:**
- Satisfies the thesis: shared material and grammar, distinct metaphor.
- Tunes type and palette specifically for long-form reading rather than portfolio display.
- Keeps Podkova (ADR-012) and the lab's reading-room identity intact.

**Cons:**
- A separate (if related) token and type axis to maintain alongside the portfolio.
- Per-mode tuning (weight, size) requires live by-eye validation, not just spec.

## Decision

**We will recalibrate Perihelion under "The Reading Room" — convergent grammar and material with the Conservatory, distinct metaphor and reading-first purpose.** Four calls are locked:

1. **Warm-humus palette.** Re-hue the lab's dark neutrals from hue 270 (cool blue-violet) toward warm humus (~hue 70), **holding the L 0.17 graphite floor** — the warming re-hues, it does not darken; no pure black. Light mode is warm cream paper, already live, minor tune only. All color stays OKLCH-by-token. P1 shipped this (270 → 70).

2. **Reading type — Newsreader Variable (locked 2026-06-30).** `@fontsource-variable/newsreader`, opsz + wght axes, `font-optical-sizing: auto`. An uncommon, readable modern serif — explicitly **not** Fraunces (reads AI here) and **not** system Georgia. It beat Literata in a live two-horse round-one; GT Sectra was disqualified (Grilli Type commercial, no licensed woff2). **Podkova stays the identity-locked display face (ADR-012); JetBrains Mono kicker unchanged.** Reading size is **18px mobile / 20px desktop**, set on the guide prose components (`GuideParagraph` / `GuideList` / `GuideBlockquote` via `text-lg → md:text-xl`), **not** the `body` rule — the two diverged historically and the `body` rule holds a stale `1.1875rem` fallback. P4 consolidates both to a single `--lab-reading-size` token so the reader's type-size control has one lever.

3. **Per-mode body weight — dark 330 / light 400 (strong 560 / 620), confirmed by eye.** Set via `--lab-body-weight`. This is a **bloom-trim** call: **dark mode runs lighter.** Light-on-dark Newsreader serifs bloom on the humus floor and go inky at 400, so 330 keeps them crisp at night; dark-on-cream strokes read thinner than they measure, so light runs 400 for presence. This **matches the portfolio's direction (dark lighter), not an inversion.** Recorded deliberately: a first build ran this **reversed** (dark heavier) on a halation theory and was **overruled live by eye.** (The brief §4 implication cell stale-reads "light 330 / dark 400"; §7 is authoritative — dark 330 / light 400.)

4. **Wallace scope — spine and cover materials only.** Generated surfaces (binder cloth, pressed board, foil-stamp feel) for the shelf and covers; no full scenes, no per-section art, no wallpaper. Honors imagery restraint.

## Consequences

**Positive:**
- Crossing from portfolio to lab now reads as moving between rooms of one building, not between sites.
- Type and palette are tuned for sustained reading, with both modes validated live rather than assumed.
- Podkova and the reading-room identity are preserved; the lab keeps its own character.
- A single future `--lab-reading-size` token (P4) gives the reading-accommodation controls one clean lever.

**Negative:**
- The lab maintains its own warm-humus token set and reading type axis, parallel to (not shared with) the portfolio — two surfaces to keep in sync.
- Reading size currently lives on prose components while the `body` rule holds a stale fallback; until P4 consolidates them, a `body { font-size }` change reads as inert. This is a known, flagged divergence, not a bug to chase.
- Per-mode weight is a by-eye lock; if the reading face or floor ever changes, the 330/400 split must be re-validated, not carried forward blindly.

**Neutral:**
- GT Sectra remains an open, optional "more distinctive" round-two reading face if a licensed file is ever acquired; Newsreader is the shipped lock until then.
- The recalibration is mission-sequenced; this ADR records the thesis and the P1/P2 locks and forward-references the remaining passes (below).

## Forward References (remaining mission passes)

Per `vector/missions/perihelion-reading-room-recalibration.md`:

- **T3 — The Shelf:** convert the library from a card grid to an editorial spine/catalog index; consumes T5 materials.
- **T4 — The Reader:** move section nav from the top strip into a left-margin scroll-following rail housing the theme toggle and reading-accommodation controls (type size, weight, measure) + TOC; **folds in the `--lab-reading-size` consolidation.**
- **T5 — Wallace materials:** generate spine and cover surfaces against the warmed-humus dark and cream light, no baked text; assets feed T3.
- **T6 — Motion convergence:** replace the local `EASE_OUT` beziers with spring/wave motion (critically damped arrival, bounce 0; small overshoot on hover/tap only), reusing the portfolio spring tokens and honoring `prefers-reduced-motion`.

## Related Decisions

- `ADR-013: Portfolio Conservatory Direction` — the parallel portfolio recalibration; this ADR converges Perihelion's grammar toward it and refines its "separate path" line into "convergent grammar, distinct metaphor."
- `ADR-012: Perihelion House Identity` — locks Podkova as the lab display face, preserved here.
- `ADR-010: Perihelion Rename` — establishes the lab's two-arm house (Archive + Works) this recalibration dresses.
