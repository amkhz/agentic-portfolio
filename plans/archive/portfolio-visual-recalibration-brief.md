> **Status:** Approved 2026-05-17 (Justin) after /shape session on branch `polish/portfolio-visual-2026-05-17`.
> **Scope:** Whole-portfolio visual recalibration (justinh.design). Perihelion is sibling-but-separate; out of scope here.
> **Distillation:** The doctrine changes that fall out of this brief are baked into `PRODUCT.md` (Design Context), `CLAUDE.md` (Design System Non-Negotiables), `VECTOR.md` (Principle 3 + Constraints), and `vector/decisions/ADR-011`. This document preserves the rationale and the discovery that produced them; the doctrine files are the operational source of truth.

---

## Locked decisions (after Rounds 1–4 in Paper, 2026-05-17)

These have moved from open questions to locked specs:

- **Type spine:** Fraunces (display) + Geist (body) + JetBrains Mono (kicker). Validated in Paper Rounds 1–4. Inter was tested in Round 1 and rejected (reads as SaaS default). Bodoni Moda and Crimson Pro were tested in Round 1 and not chosen.
- **Fraunces axis baseline:** opsz 144, SOFT 30, **WONK 0.5**, wght 500 for display headlines. Italic with SOFT 80, WONK 0.5 for pull quotes.
- **Per-project accent system:** Four-color set established — dusty magenta (`oklch(0.42 0.14 346)`), aged brass (`oklch(0.55 0.10 70)`), moss forest (`oklch(0.36 0.08 155)`), deep oxblood (`oklch(0.34 0.13 25)`). Each project gets one as its Committed accent.
- **Cover atmosphere:** Not flat color panels (reads as Rosenfeld Media book series, rejected). Radial-light gradient as the primary atmospheric move (Round 4 Treatment A). Grain overlay and shader-feel treatments to be revisited in code (Paper can't render them).
- **Case study opener composition:** Full-bleed cover panel left (50%, atmospheric Committed accent) + editorial type spread right (50%, kicker / chapter indicator / headline / body / pull quote with brass border-left / metadata footer). The pattern PRODUCT.md names — confirmed in Paper Round 4 Section 2.
- **Project title separator:** Colon. "Vesper: the long road home." Not em-dash.
- **Work index:** Monograph table of contents with varying Fraunces scale by recency (most recent biggest), brass numerals on left, year + accent swatch on right. Hairline-divided rows. Confirmed in Paper Round 3 Section 4.
- **Color rule:** All color is OKLCH via tokens referenced by name. No hex anywhere, including doctrine files. (See `feedback_oklch_only.md`.)

Still open (deferred to implementation):

- Specific tokens.css migration plan (next ADR)
- Per-project mark / illustration system (per-project; not yet designed)
- Light mode treatment (deferred)
- Wordmark / header treatment (display serif moment, not hand-lettered)
- About page and case study inner-body treatments (not yet designed)

---

# Portfolio Visual Recalibration Brief

For Tyrell and any Impeccable skill working on the portfolio surface.

## What this is

A directional recalibration of the portfolio's visual system, pushing it from "atmospheric/cinematic interpretation of Blade Runner + Finn Juhl" toward **"designer-as-craftsperson executed with editorial discipline."** Same materials, more rigor. The portfolio must read as a *monograph by a working designer*, not as a templated portfolio in dark mode.

This is a doctrine change, not a one-off polish pass. Every Impeccable skill should carry the recalibrated bias going forward.

## Discovery summary

Five questions resolved in the shape session:

1. **Reference lane** — Designer-as-craftsperson (Boulton, Coyle, Chimero, van Schneider). Visible authorship through composition and material, not through literal artisan tropes.
2. **Scope** — Whole-portfolio. Home, work index, case studies, about, all components. Coherent system end-to-end.
3. **Type system** — Full three-face stack, hand-set / variable / custom expression. Maximum range. Supersedes the prior "Didact Gothic 400 only" constraint for the portfolio.
4. **Material posture** — Moderate. Tactile accents at specific moments. Hand at the seams, not painted on walls.
5. **Composition** — Editorial spreads, bookish. Asymmetric, mixed column widths, generous margins, varied vertical rhythm per section.
6. **Hand moments** — Material textures + bespoke per-project marks. Explicitly *not* custom wordmark, *not* hand-drawn dividers, *not* drop caps/marginalia. Avoids the twee/Tumblr trap.
7. **Anti-goal** — Quiet to the point of bland. Restraint is never an alibi for blandness; every surface must distinguish itself or it has failed.

## The recalibration vector

The current `PRODUCT.md` direction is sound but under-expressed. Specifically:

- The Blade Runner / Gibson / Finn Juhl framing tilts atmospheric/cinematic. This recalibration pulls it toward editorial/monograph. Same vocabulary, more directorial judgment.
- "Intentional restraint" (Principle 4) was a true principle but became permission for blandness. It now reads "intentional restraint, refused blandness" — restraint applies to *flourish*, not to *expression*.
- Wabi-sabi stays, but expressed through *composition and material* rather than literal artisan tropes. No hand-drawn underlines, no hand-lettered wordmark, no precious illustrated icons.

## Type system (the biggest change)

**Three-face stack, full expressive range.**

| Role | Function | Direction |
|---|---|---|
| **Display serif** | h1, h2, section openers, hero moments | Editorial gravity. Variable axes. Candidates: GT Sectra, PP Editorial New, Söhne Schmal, Tiempos Headline, F37 Ginger Serif. Should feel *set*, not typed. |
| **Body sans** | Long-form prose, UI, navigation | Personality across weights. Candidates: Söhne, GT America, ABC Diatype, PP Neue Montreal. Replaces Didact Gothic for body. Didact may survive as a specific kicker/label voice if it earns it. |
| **Mono kicker** | Metadata, labels, captions, project numbering | JetBrains Mono (already in Perihelion), Berkeley Mono, ABC Diatype Mono. Carries the epistemic-honesty voice. |

**Typographic discipline:**

- Variable axes used intentionally (weight, optical size, grade) for *fit*, not animation. A heading at 72px optical size is not a heading at 18px optical size.
- Drop caps allowed on long-form case studies and essays; not on home cards.
- Pull quotes allowed sparingly in case studies, with intentional kerning.
- Tabular numerals for tables and metadata. Proportional for prose. OpenType fractions on.
- Body line length capped at 65–75ch.

## Composition strategy

**Editorial spreads, bookish.** Each surface is composed individually, not poured into a template grid.

- Variable column structures. Some pages: 12-col with strategic spans. Some pages: asymmetric two-column with deep margin. Case study openers: full-bleed image left, type-set spread right. Refuse the "every section is a 1200px max-width container" reflex.
- Margins do work. Generous outside margins on long-form. Kickers and metadata can live in those margins.
- Vertical rhythm varies per section. Hero spacing is not index spacing is not footer spacing.
- The grid is visible enough that breaks read composed, not accidental. A heading that bleeds past the column or an image that crosses the gutter is intentional and rare.

## Material and atmospheric vocabulary

**Moderate: hand at the seams, not painted on walls.**

- **Per-project marks.** Each case study earns a bespoke mark, ornament, or chapter-opener treatment that signals identity within the monograph. The system allows for it; specifics emerge per project.
- **Textural moments at specific surfaces.** Subtle paper, linen, or warm-glass treatments behind anchors: hero, case-study covers, footer. Never blanket. Never glassmorphism-default.
- **Light behaves physically.** Existing principle holds. Warm light, subsurface scattering on accents, brass refraction on hover for select moments. Atmospheric, not decorative.
- **Color stays restrained, with one allowed exception.** Brass + dusty magenta accents stay at ≤10% surface coverage on most pages (Restrained strategy). Case study covers may go *Committed* with a single project-tied accent owning 30–60% of the cover surface. That's the per-project identity move.

## Motion vocabulary

**Restrained but expressive — explicitly not bland.**

- Ease-out exponential curves (shared design law). No bounce, no elastic.
- Motion serves *arrival* and *focus*: how a surface composes itself, how attention lands on a piece, how the eye moves between sections.
- Permitted: slow warm fades on section reveal, weight-shift on hover (variable axis play), subtle parallax on case study covers, deliberate page-transition choreography on case study entry.
- Banned: bounce, elastic, beat-synced flourishes, scroll-jacking, look-at-me micro-interactions, performative cursor effects.
- One ambitious motion moment per major surface. No more.

## Surface treatment

| Surface | Direction |
|---|---|
| **Home** | Bookish opener. Display serif h1 with optical-size attention. Asymmetric composition. One atmospheric moment. Refuse the hero-metric template. |
| **Work index** | Curated monograph table of contents, not a card grid. Each project is a *piece*, not a *card*. Mixed scale, mixed treatment. |
| **Case study shell** | Editorial spread system. Per-project accent. Bespoke opener mark. Drop caps allowed. Long-form discipline. |
| **About** | Long-form essay treatment. Body sans, generous margin, kicker/metadata in margin gutter. |
| **Perihelion** | Out of scope. Has its own confirmed direction (ADR-009/010). Portfolio must visibly *share a hand* with Perihelion without copying its stack. |

## Banned / what this must not become

- **Quiet-to-the-point-of-bland** (primary anti-goal). If a surface looks like every other thoughtful-portfolio template, it has failed.
- **Twee / Tumblr-zine craftsperson.** No hand-drawn underlines, no hand-lettered wordmark, no precious illustrated icons, no marginalia-as-personality.
- **Designer-as-influencer / performative motion.** No flex-y micro-interactions, no beat-perfect transitions, no scroll-jacking.
- **Showroom polish.** Process and judgment must be visible. Glossy-without-substance is failure.
- **Category-reflex.** A "dark designer portfolio" must not be guessable as "neon on black + monospace." We're most of the way there (warm blacks, brass + magenta, no terminal fonts), but vigilance required.

## Open questions for implementation

1. **Specific typeface picks.** The brief proposes candidate stacks. Final picks should be validated live (`/impeccable live` or browser iteration) on home + one case study before committing.
2. **Per-project mark system.** Does each case study mark live in `core/content/` per project, or in `design-system/` as a token-like registry? Worth an ADR.
3. **Wordmark / header treatment.** Current "Justin Hernandez" header needs re-evaluation. NOT a hand-lettered mark (banned). Probably a moment for the display serif with optical-size attention.
4. **Light mode.** Does this recalibration extend to light mode now, or stay deferred? Light mode is "Wallace's office before the blackout" per current PRODUCT.md.
5. **`design-system/tokens.css` impact.** New type families, expanded weight axes, possibly new texture utilities, possibly new motion tokens. Migration plan needed before any surface starts consuming the new system.

## Recommended Impeccable references during implementation

> **Addendum 2026-06-10 (Impeccable v3.5.0 revisit).** The v3.5.0 reshape (PR #70) deleted four of the five reference files this section pointed at; their material was folded into SKILL.md's general rules and the per-command references. Current pointers:
>
> - `reference/brand.md` — still the register file; portfolio is a brand register (design IS the product)
> - `reference/layout.md` — the bookish composition work (was `spatial-design.md`)
> - `reference/typeset.md` — three-face system + variable axis discipline (was `typography.md`)
> - `reference/animate.md` — "restrained but not bland" motion calibration (was `motion-design.md`)
> - `reference/colorize.md` — Restrained vs. Committed strategy per surface (was `color.md` / `color-and-contrast.md`)
>
> **Two collisions surfaced in the revisit, recorded here so the discovery record stays honest:**
>
> 1. The locked opener spec's "pull quote with brass border-left" collides with v3.5.0's absolute side-stripe ban (`border-left` > 1px as colored accent, match-and-refuse). **Resolved 2026-06-10: Justin respects the ban.** The brass border-left is struck; the pull-quote treatment gets re-proposed in the case-study-shell PR (Fraunces SOFT 80 italic the leading candidate). No PRODUCT.md exemption spent. The locked-decisions line above stands as the historical record of what Round 4 confirmed; this entry amends it.
> 2. This brief contradicts itself on drop caps: discovery item 6 bans them ("explicitly *not* drop caps/marginalia"), the typographic-discipline section allows them on long-form. Justin's call pending; recorded in the plan's collision list.
>
> The brass work-index numerals and the mono kicker system both survive v3.5.0's new bans on those bans' own exemptions (real ordered sequence; one named kicker as deliberate brand system). Sequencing and locked specs otherwise hold; the verification flow moved to the `craft` → `critique` → `polish` snapshot pipeline per the implementation plan v2.
