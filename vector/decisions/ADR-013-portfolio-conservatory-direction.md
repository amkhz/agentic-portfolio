# ADR-013: Portfolio Visual Direction — "The Conservatory" (Inhabited Biophilic-Future Register)

**Date:** 2026-06-20
**Status:** accepted
**Deciders:** Justin Hernandez (operator), Tyrell

## Context

ADR-011 recalibrated the portfolio toward an "editorial craftsperson" register (Fraunces + Geist + JetBrains Mono, monograph composition). It was accepted and activated on `main` (PR #68, 2026-06-09) but **never implemented** — `design-system/tokens.css` still ships the original "Danish mid-century x sci-fi" system with no font-family tokens, and the live site reads as a competent dark-mode template.

In the interim the tooling changed materially: Impeccable upgraded to v3.7.1, **Wallace** (local Ideogram 4 on the M5 Max) landed as a free image-generation pipeline, and the Paper MCP came online. With a portfolio share ~6 days out and the explicit goal of impressing lead/principal/staff and director/VP audiences with "design alongside AI while retaining a personal quality," Justin elected a **fresh visual exploration** rather than executing the year-old ADR-011 plan.

Sprint 0 (2026-06-20) explored four directions via Wallace north-star renders (`mocks/recalibration-sprint0/`, working notes in `plans/recalibration-sprint0-notes.md`): **Monograph** (editorial), **Atelier** (cinematic), **Field Notebook** (technical-archival), and **Conservatory** (a tech+nature symbiosis thesis that originated from Justin's own stream-of-consciousness). The exploration converged — not on a single direction, but on a hybrid with the Conservatory as its soul. This ADR records that lock. It supersedes the visual/color/aesthetic specifics of ADR-011 while preserving its underlying intent (refuse blandness; the design IS the credential).

## Decision Drivers

- **The 5-second test for senior eyes.** Must read "this person has a worldview and the craft to execute it," not "another thoughtful template." Same VECTOR.md value proposition as ADR-011, higher ambition.
- **"Design alongside AI, keep the human soul."** The meta-pitch. A deeply personal, authored worldview executed through AI tooling (Wallace) — the medium proves the message.
- **~6-day deadline.** Both the visual overhaul and case-study content must ship. Scope discipline required; token/color shift is the spine, full type swap is the risk.
- **Hard constraints unchanged:** OKLCH-only color via named tokens (no hex/rgb/named colors in committed CSS), WCAG 2.2 AA, four-layer architecture, no em-dashes in copy.
- **Imagery restraint** (`feedback_imagery_restraint`): generated imagery is a deliberate material accent, never wallpaper — the guard against AI-slop / concept-art mood board.
- **Perihelion** now follows its **own absorption path** (Justin has a separate written vision). No longer merely "sibling, unaffected" — but the lab is explicitly out of scope for this ADR and this 6-day push.

## Options Considered

### Option A: Implement ADR-011 as written (editorial craftsperson)
Execute the locked Fraunces/Geist/JetBrains monograph plan.
**Pros:** decided, documented, lower exploration cost. **Cons:** a year old, tilts "thoughtful editorial template," doesn't exploit Wallace, and Justin's explicit call was fresh exploration for a stronger overhaul.

### Option B: Adopt one explored direction wholesale (Monograph / Atelier / Field Notebook)
**Pros:** simplest to spec. **Cons:** each is a partial answer — Monograph reads quiet, Atelier risks "agency showreel," Field Notebook alone is structure without soul. None carries a worldview on its own.

### Option C: "The Conservatory" hybrid (chosen)
A single coherent system with the Conservatory worldview as soul, Atelier's realism absorbed as the imagery bar, and Field Notebook as the layout/mark grammar.
**Pros:** distinctive and unmistakably authored; serves the senior-audience and AI-soul drivers directly; gives every other piece something to orbit. **Cons:** largest change (color inversion + new imagery system + eventual type swap); production-heavy imagery that must stay disciplined.

## Decision

**We adopt Option C: "The Conservatory."** An inhabited biophilic-future register — technology, nature, and people in long-settled, optimistic commune.

1. **World / soul.** Inhabited biophilic *architecture* (greenhouse × architecture museum): atria, corridors, courtyards, treetop terraces, the nature/habitat boundary dissolving. Wabi-sabi as the load-bearing philosophy (honest patina, imperfection, transience, asymmetry). Danish mid-century craft present in-scene (Finn Juhl / Wegner, teak/cane/worn leather). Extremely advanced but seamless technology — organic/OLED displays that glow from *within* natural materials (bezel-less), transparent interactive glass blended into the world. **Subtle luxury + personalization**: the optimistic sense that the world can be shaped and presented exactly as its inhabitants wish, in harmony with nature — refined, bespoke, never flashy. **Dual mode is literal:** humus-dark night / golden-hour day, the same world twelve hours apart.

2. **Color inversion (supersedes ADR-011 / PRODUCT.md brass+magenta).** Warm humus-black base (never cold). **Brass / amber = technology-and-light. Soft sage / moss green = the living primary** (muted, never neon). Warm sand and clay in light mode. **Dusty magenta is demoted** from co-lead to a rare signal-flare. All values remain OKLCH tokens by name; the Sprint 0 caption hexes are render specs only, not committed CSS.

3. **Imagery (Wallace, centerpiece — two registers).** (a) Biophilic-architecture scenes for heroes/atmosphere at Atelier-grade realism, moody chiaroscuro. (b) Modern technical-schematic "drafted fantastical object" plates on warm natural paper for per-project case-study covers and marks (contemporary, not steampunk/patent). Imagery stays a deliberate accent at anchors (hero, covers, footer), never blanket.

4. **Layout grammar = Field Notebook.** Case studies compose as hero + table-of-contents/links with instrument/dossier framing and registration marks; rhymes with the existing constellation navigation. This also resolves the per-project "mark system" open question from ADR-011: the drafted-object schematic plate is the mark.

5. **Type — validated live in Plan A.** The world wants warmth and craft: humanist body sans + a refined display + a structural mono. ADR-011's Fraunces/Geist/JetBrains roster is a candidate to test, not a binding constraint under fresh exploration. The three-face *spirit* holds; specific faces lock after in-browser validation on home + one case study.

## Consequences

**Positive:**
- A distinctive, ownable worldview that no competitor portfolio shares; hard to mistake for AI-default anything.
- The AI-soul meta-pitch is structural, not claimed — Wallace-authored imagery is the proof.
- Resolves ADR-011's open per-project mark question (drafted-object plate) and unifies imagery, color, and layout under one thesis.

**Negative / required follow-ups:**
- **`design-system/tokens.css` color overhaul** is the backbone and gates every surface: new humus-black neutrals, brass/amber, sage-green primary, warm light-mode palette; magenta demoted. WCAG AA re-verified across all pairs.
- **PRODUCT.md and VECTOR.md require amendment.** PRODUCT.md's "warm blacks, brass + dusty magenta dual accent" aesthetic direction and ADR-011's color/aesthetic specifics are superseded by this ADR. Cannot be done silently.
- **Wallace becomes the production imagery source.** Ideogram 4 weights are non-commercial — fine for this portfolio (personal work); flag before any client/production reuse.
- **Scope risk: full type swap across every component.** Plan A sequences highest-impact surfaces first (tokens → home → work index → case-study shell), with a fallback to ship the color/imagery/layout shift even if the full type rollout slips.
- **Light mode is now in scope** (the day/night story is load-bearing), not deferred as in ADR-011.

**Neutral:**
- Four-layer architecture, OKLCH-only discipline, WCAG 2.2 AA, no-em-dashes all unchanged.
- Case-study *content* is unaffected by this ADR (Plan B handles content separately); only the containers change.
- Perihelion absorbs this register on its own separate path (Justin-owned); out of scope here.

## Related Decisions

- **ADR-011:** Superseded in part. The "refuse blandness / design is the credential" intent and three-face *spirit* are preserved; the editorial-craftsperson aesthetic, the brass+magenta color direction, and the specific Fraunces/Geist/JetBrains roster are replaced by this ADR.
- **ADR-005:** CSS texture system — the material/texture vocabulary extends to the biophilic register.
- **ADR-009 / ADR-010 / ADR-012:** Perihelion architecture, rename, and house identity — context for the lab's separate absorption path.
- **PRODUCT.md, VECTOR.md:** Require amendment to reflect this direction (follow-up task in Plan A).
- **Memory:** `feedback_imagery_restraint`, `feedback_no_flat_color_covers`, `feedback_oklch_only`, `feedback_respect_slop_bans`.

---

## Amendment — Type Stack v2 (2026-06-24)

**Deciders:** Justin Hernandez (operator), Tyrell

Decision point 5 above locked faces *after live validation*; the first lock (2026-06-21) was **Fraunces / Source Sans 3 / JetBrains Mono**. On 2026-06-24 Justin reopened that lock: **Fraunces had begun to read as an AI tell**, and he wanted an Albert-Sans-adjacent body without copying another shop's exact stack.

A two-round live specimen on real Conservatory copy (both modes) settled it. **New lock — "Stack E":**

- **Display:** **Hedvig Letters Serif** (single-weight, low-ubiquity, characterful) — replaces Fraunces.
- **Body / UI / nav:** **Figtree** (variable wght, geometric-humanist, Albert-Sans-adjacent) — replaces Source Sans 3.
- **Mono kicker:** **JetBrains Mono** — unchanged.

**Consequences:**
- The Fraunces variable-axis tuning (opsz / SOFT / WONK) is retired — Hedvig is single-weight. Pull-quotes now carry on the display serif at scale plus a hanging brass quotation mark.
- Dark-mode body weight is trimmed (`--body-weight: 350`) to counter light-on-dark bloom on Figtree; day keeps regular.
- **Drop caps struck** (was an open collision from ADR-011; Justin's call): Field Notebook grammar + slop bans, and Perihelion already owns a sigil drop cap.
- The struck brass/green `border-l-[6px]` side-stripes on `QuoteBlock` / `CalloutBlock` were finally removed here, honoring the 2026-06-10 side-stripe-ban resolution with no exemption.
- Three-face *spirit* and the "refuse blandness" intent are unchanged; only the specific faces moved.
- **Doctrine still to sync** (follow-up): ARCHITECTURE.md Stack + Styling and VECTOR.md P3 still name the old faces.
