# ADR-016: Perihelion Visual Recalibration ("The Reading Room")

**Date:** 2026-06-30 (accepted) · 2026-07-01 (completed, reconciled to shipped state)
**Status:** accepted — shipped in full (P1–P4, P6); P5 / Wallace materials deferred
**Deciders:** Justin (operator) + Tyrell

## Context

The Perihelion lab (`labs.justinh.design`) carried the cool, Gibson-blue reading palette and a system-serif body face from before the portfolio's "Conservatory" recalibration (ADR-013). With the Conservatory shipped, the lab read as a different visual world rather than part of the same house. This ADR records the recalibration that brings the lab into convergent grammar with the portfolio while keeping its distinct purpose intact. The recalibration was sequenced as a mission (P1–P6, see `vector/missions/perihelion-reading-room-recalibration.md`) and shipped to main in full through 2026-07-01 — warm-humus palette, reading type, the editorial shelf, the reader rail, and motion convergence. The P5 Wallace material pass was deferred (see Decision 4). This is a record ADR, now reconciled to the shipped result: the decisions below are made and live, not under debate. Where the built reality diverged from an original locked call, that is recorded inline (display face, shelf form, Wallace scope).

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

**We will recalibrate Perihelion under "The Reading Room" — convergent grammar and material with the Conservatory, distinct metaphor and reading-first purpose.** Six calls are recorded — four locked at acceptance (1–4), two amended to shipped reality (5–6):

1. **Warm-humus palette.** Re-hue the lab's dark neutrals from hue 270 (cool blue-violet) toward warm humus (~hue 70), **holding the L 0.17 graphite floor** — the warming re-hues, it does not darken; no pure black. Light mode is warm cream paper, already live, minor tune only. All color stays OKLCH-by-token. P1 shipped this (270 → 70).

2. **Reading type — Newsreader Variable (locked 2026-06-30).** `@fontsource-variable/newsreader`, opsz + wght axes, `font-optical-sizing: auto`. An uncommon, readable modern serif — explicitly **not** Fraunces (reads AI here) and **not** system Georgia. It beat Literata in a live two-horse round-one; GT Sectra was disqualified (Grilli Type commercial, no licensed woff2). **Display face: Bricolage Grotesque Variable** (amended from Podkova — see Decision 5); **JetBrains Mono kicker unchanged.** Reading size is **18px mobile / 20px desktop**, driven by a single `--lab-reading-size` token consumed by both the `body` rule and the guide prose components (`GuideParagraph` / `GuideList` / `GuideBlockquote`). P4 shipped this consolidation, resolving the historical `body`-vs-prose divergence, so the reader's type-size control has one lever.

3. **Per-mode body weight — dark 330 / light 400 (strong 560 / 620), confirmed by eye.** Set via `--lab-body-weight`. This is a **bloom-trim** call: **dark mode runs lighter.** Light-on-dark Newsreader serifs bloom on the humus floor and go inky at 400, so 330 keeps them crisp at night; dark-on-cream strokes read thinner than they measure, so light runs 400 for presence. This **matches the portfolio's direction (dark lighter), not an inversion.** Recorded deliberately: a first build ran this **reversed** (dark heavier) on a halation theory and was **overruled live by eye.** (The brief §4 implication cell stale-reads "light 330 / dark 400"; §7 is authoritative — dark 330 / light 400.)

4. **Wallace scope — spine and cover materials only; DEFERRED (2026-07-01).** The original call scoped generated material surfaces (binder cloth, pressed board, foil-stamp feel) for the shelf and covers. In build, the shelf shipped **type-led** (the Accession Register — see Decision 6), so material spines were never needed, and the guide-detail page is a clean typographic masthead with no cover slot. Generating covers now would add imagery where the type-led design deliberately has none — the exact wallpaper/AI-slop risk imagery restraint guards against. **T5 is formally deferred and documented as a future enhancement** (per-territory covers or per-guide OG cards), to be built only if a concrete anchor need appears. No generation was done.

5. **Display face — Bricolage Grotesque Variable (amended 2026-07-01).** The recalibration originally kept **Podkova** as the identity-locked display face (ADR-012). During the T3 shelf build and library refresh, Podkova clashed against Newsreader in running text and against the squared register-mark vocabulary; **Bricolage Grotesque Variable** was adopted live as the shipped lab display face (`--lab-heading-font`, `@fontsource-variable/bricolage-grotesque`). This **supersedes the Podkova _display-face_ lock in ADR-012**; the rest of the house identity — the Instrument sigil, the colophon masthead — stands untouched. JetBrains Mono kicker and Newsreader body are unchanged.

6. **The shelf — type-led Accession Register (not material spines).** T3 shipped as a typographic ledger (`RegisterShelf`): call-number gutter, full horizontal display title, Newsreader dek, per-guide accent margin rule, no images. This replaces the original "Wallace material spine" direction (Decision 4) — the type-led register won live over three shelf candidates as the non-slop, distinctive answer, and made T5 materials unnecessary. Glowing/lush-border shelf variants were rejected as AI-slop.

## Consequences

**Positive:**
- Crossing from portfolio to lab now reads as moving between rooms of one building, not between sites.
- Type and palette are tuned for sustained reading, with both modes validated live rather than assumed.
- Podkova and the reading-room identity are preserved; the lab keeps its own character.
- A single `--lab-reading-size` token gives the reading-accommodation controls one clean lever (P4, shipped).

**Negative:**
- The lab maintains its own warm-humus token set and reading type axis, parallel to (not shared with) the portfolio — two surfaces to keep in sync.
- The historical reading-size divergence (prose components vs. a stale `body` fallback) is **resolved**: P4 consolidated both onto the single `--lab-reading-size` token.
- Per-mode weight is a by-eye lock; if the reading face or floor ever changes, the 330/400 split must be re-validated, not carried forward blindly.

**Neutral:**
- GT Sectra remains an open, optional "more distinctive" round-two reading face if a licensed file is ever acquired; Newsreader is the shipped lock until then.
- The recalibration is complete; this ADR records the thesis, the locked calls, and (below) the shipped result of every pass.

## Shipped Passes

All passes shipped to main through 2026-07-01 (see the mission manifest for the pass-by-pass record):

- **P1 — Warm-humus palette:** dark neutrals re-hued 270 → 70, L 0.17 floor held; cream light tuned. OKLCH-by-token throughout.
- **T2 / P2 — Reading type:** Newsreader Variable body; per-mode weight (dark 330 / light 400, strong 560 / 620); single `--lab-reading-size` lever.
- **T3 / P3 — The Shelf:** shipped **type-led** as the Accession Register (`src/lab/components/library/RegisterShelf.tsx`), not material spines (Decision 6). Library refresh adopted the squared register-mark vocabulary and the Bricolage display face (Decision 5).
- **T4 / P4 — The Reader:** left-margin scroll-following reader rail — section index, reading-accommodation controls (type size, weight, measure, generous a11y bounds), Day/Night segmented theme, three reveal states, right-side mobile drawer; folds in the `--lab-reading-size` consolidation.
- **T5 / P5 — Wallace materials:** **deferred** (Decision 4) — the type-led shelf made material spines unnecessary; documented as a future enhancement, no generation done.
- **T6 / P6 — Motion convergence:** the local `EASE_OUT` beziers were replaced with the shared portfolio spring tokens (`@/components/effects/motionConfig` — `springSettle` / `springSoft` / `springHover`, plus `springSnappy` for micro-reveals); critically damped arrival (bounce 0), small overshoot on hover/tap only; the sigil (`PerihelionSigil`) gained an `arc()` orbital arrival; `prefers-reduced-motion` honored end to end; `motion` on 12.42.2 app-wide. Background textures (`--lab-texture`) are parked flat (`none`); archival-paper fibre is a deferred future phase.

## Related Decisions

- `ADR-013: Portfolio Conservatory Direction` — the parallel portfolio recalibration; this ADR converges Perihelion's grammar toward it and refines its "separate path" line into "convergent grammar, distinct metaphor."
- `ADR-012: Perihelion House Identity` — locked Podkova as the lab display face; **Decision 5 above supersedes that display-face lock** (now Bricolage Grotesque Variable). The Instrument sigil and colophon masthead from ADR-012 stand untouched.
- `ADR-010: Perihelion Rename` — establishes the lab's two-arm house (Archive + Works) this recalibration dresses.
