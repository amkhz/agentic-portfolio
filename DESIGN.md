# DESIGN.md — Portfolio Visual Direction

> Source of truth for the portfolio's visual system: color, typography, motion, imagery, composition. Binds to **ADR-013 ("The Conservatory")**. Supersedes the brass+magenta "editorial craftsperson" direction (ADR-011) for all visual specifics. PRODUCT.md holds users, brand, tone, and principles; this file holds the design. The CSS implementation lives in `design-system/tokens.css` (the literal source for all color values). Perihelion (`labs.justinh.design`) follows its own register; see PRODUCT.md.

register: brand

---

## The Worldview — "The Conservatory"

An **inhabited biophilic-future** register: technology, nature, and people in long-settled, optimistic commune. Greenhouse crossed with architecture museum. Soaring atria and indoor courtyards, long corridors, treetop terraces, the boundary between nature and habitat dissolving. Extremely advanced but seamless technology, organic and OLED displays glowing from within natural materials, transparent interactive glass blended into the world. Subtle luxury and personalization: the world can be shaped exactly as its inhabitants wish, in harmony with nature, refined and bespoke, never flashy.

**Dual mode is literal:** humus-dark night and golden-hour day, the same world twelve hours apart.

The 5-second test for senior eyes: this must read "this person has a worldview and the craft to execute it," not "another thoughtful template." The design IS the credential. The meta-pitch is structural: a deeply personal, authored worldview executed through AI tooling (Wallace imagery), the medium proving the message.

### Load-bearing pillars

1. **Wabi-sabi as core philosophy.** Imperfection, patina, honest wear, asymmetry, natural materials, transience, the beauty of the incomplete. Expressed through composition and material, never through literal artisan tropes (no hand-lettering, no twee illustration).
2. **Danish mid-century craft, present in-scene.** Finn Juhl, Hans Wegner. Teak, cane, worn leather, sculptural forms, as lived-with objects within the world, not as a mood reference.
3. **Subtle luxury, personalization, agency.** Optimistic posture, the tonal guard against dystopia: empowered, curated, harmonious living, not survival-in-ruins. Luxury is in material quality and considered detail, not ornament. Keep it understated.

---

## Color

All color is **OKLCH, referenced by token name** from `design-system/tokens.css`. No hex, no `rgb()`, no named colors anywhere in committed code, not even in doctrine. Reference token names, not values. Reduce chroma as lightness approaches 0 or 100.

### The inversion (supersedes ADR-011 / brass+magenta)

| Role | Token family | Meaning | Where it lives |
|---|---|---|---|
| **Base** | `--theme-bg-*` | Humus warm-black (night) / sun-bleached sand + amber (day). Never cold, never pure black/white. | Everywhere |
| **Brass / amber** | `--theme-accent-*` | Technology-and-light. **Owns all interaction.** | Hover, active, focus, links, all interactive affordances |
| **Sage / moss green** | `--theme-secondary-*` | The living primary. **Atmosphere and material only.** | Imagery (foliage), per-project covers, rare glow-from-within accent, texture drift, ambient glow |
| **Dusty magenta** | `--theme-signal-*` | Rare signal-flare, demoted from co-lead. | Sparing emphasis only, never structural |

**Green's role is settled doctrine (do not relitigate):** green is the living primary expressed as *atmosphere and material*, not an interaction color. It must never own hover/active/focus or any interaction state. The brass/green duotone was tried and reverted because green-active fought brass-hover; the north-stars (`mocks/recalibration-sprint0/`) show why, the foliage and the glow-from-within carry green as living material while the chrome stays brass. Brass and green never fire as dueling interaction states on the same element.

### Color strategy by surface

- **Most surfaces: Restrained.** Tinted humus neutrals + brass accent at ≤10% coverage.
- **Case-study covers: Committed.** A single project-tied accent owning 30-60% of the cover. **Atmospheric, never flat:** radial light, vertical gradient, grain overlay, or layered shader-feel. Never a solid color panel (reads as a book-series template, rejected; see `feedback_no_flat_color_covers`).
- **Dual mode:** every pair re-verified WCAG 2.2 AA via `scripts/wcag-check.py`, both night and golden-hour.

Per-project accent mapping under the biophilic palette is an open item resolved in the surfaces phase (was magenta/brass/forest/oxblood).

---

## Typography

Three-face *spirit* holds: **warm humanist body sans + refined display + structural mono.** Variable axes used intentionally for *fit* (weight, optical size, grade), never for animation.

- **Display** — h1, h2, section openers, hero. Editorial gravity, should feel *set*, not typed. **Hedvig Letters Serif** (single-weight, characterful low-baggage serif; carries the moment through scale + the hanging-mark pull-quote, not variable axes).
- **Body sans** — long-form prose, UI, navigation. Geometric-humanist warmth across weights. **Figtree** (variable wght; Albert-Sans-adjacent, clean and warm without reading SaaS-default).
- **Mono kicker** — metadata, labels, captions, project numbering. Carries the epistemic-honesty voice. **JetBrains Mono**.

**Faces are LOCKED v2 (2026-06-24).** Hedvig Letters Serif / Figtree / JetBrains Mono — "Stack E", validated live on Home + a case study, both modes, Justin-approved. This deliberately **reopened the 2026-06-21 Fraunces/Source Sans lock**: Fraunces had begun to read as an AI tell. Figtree won the body on Albert-Sans-adjacent warmth; Hedvig won the display for low ubiquity and character. The three-face spirit collapses UI/nav into the body sans: `--font-heading` is retained as an alias of `--font-body` (both Figtree) for existing call sites. Tokens live in `src/styles/globals.css` `@theme`. **Dark-mode body weight is trimmed** (`--body-weight: 350` at night) to counter light-on-dark bloom; day keeps regular. Hedvig is single-weight, so the prior Fraunces SOFT/WONK/opsz axis tuning is retired. See the ADR-013 type-v2 amendment.

Details: body line length capped 65-75ch; hierarchy through scale + weight contrast (≥1.25 ratio between steps); tabular numerals for metadata, proportional for prose; **drop caps struck** (2026-06-24, Justin's call — Field Notebook + slop bans; Perihelion already owns a sigil drop cap, sibling-not-copy); pull quotes sparingly, set as the display serif with a hanging brass quotation mark (no colored side-stripe). **No Inter as the portfolio body** (`feedback_no_inter_for_portfolio`): reads SaaS-default; propose editorial-grade sans (Geist validated; GT America, ABC Diatype) before any workhorse.

---

## Motion — a doctrine pillar

Motion is **elevated to a named pillar** of the visual system (ADR-013 follow-through; Justin-approved). Tasteful, restrained-but-expressive motion that serves *arrival* and *focus*, never spectacle.

- **All motion is wave-driven (site-wide mandate).** Spring physics (Motion springs) and spring-sampled easing curves (`--ease-settle`, `--ease-organic` in `globals.css`, sampled from spring step-responses) are the default driver for every animation — they read like physics, not a mechanical ramp. A damped spring is a decaying sine wave; that is the organic feel we want. Arbitrary fixed cubic-beziers are the exception, not the reflex (reserve for trivial color/opacity crossfades).
- **Damping rule.** The arrival/focus register is **critically damped — no overshoot** (the "no bounce, no elastic" rule holds for section reveals, page transitions, parallax — `bounce: 0`). **Micro-interactions** (hover/focus/tap) MAY carry a small damped overshoot — a wave with a little life — as a deliberate, scoped exception. Never animate CSS layout properties.
- Most things are still; motion works because it is rare. One ambitious motion moment per major surface, no more.
- Permitted vocabulary: slow warm fades on section reveal, weight-shift on hover (variable-axis play), subtle parallax on case-study covers, deliberate page-transition choreography on case-study entry, glow-from-within breathing on tech-in-material accents.
- Respect `prefers-reduced-motion`: the ambitious moments degrade to instant or to a still state.
- **Anti-pattern (hard no):** beat-synced micro-interactions, look-at-me transitions, scroll-jacking, performative motion. Motion that announces itself as design has failed.

---

## Imagery — Wallace centerpiece

Generated imagery is a **deliberate material accent at anchors** (hero, covers, footer), never wallpaper (`feedback_imagery_restraint`). Over-imaging reads as AI slop / concept-art mood board. Two registers:

1. **Biophilic-architecture scenes** for heroes and atmosphere, at Atelier-grade realism, moody chiaroscuro. North-stars in `mocks/recalibration-sprint0/` (atrium-dark, corridor-golden are the landed references).
2. **Modern technical-schematic "drafted fantastical object" plates** for per-project case-study covers and marks. Contemporary CAD/computer-schematic feeling, not steampunk or patent-archival. This *is* the per-project mark system (resolves ADR-011's open mark question).

Source is **Wallace** (local Ideogram 4). Finals render at `V4_QUALITY_48`, exact aspect/crop per layout slot, fixed seeds from the locked sidecar captions, with in-code atmosphere (grain, radial light) layered over the renders. Ideogram weights are non-commercial, fine for this personal portfolio; flag before any client reuse. Production-render refinement notes are banked in `plans/recalibration-sprint0-notes.md` ("Finals imagery notes").

---

## Composition — Field Notebook grammar

Editorial spreads, composed individually, never poured into a template grid. Refuse the "every section is a 1200px max-width container" reflex and the 3-column card-grid reflex.

- **Work index:** Field Notebook table-of-contents grammar, hero + table-of-contents/links with instrument/dossier framing and registration marks. Not a card grid. Rhymes with the existing constellation navigation.
- **Case-study shell:** hero + TOC/links, per-project drafted-object mark, day/night. Canonical opener, full-bleed cover panel (Committed accent, atmospheric) + editorial type spread (kicker / chapter indicator / headline / body / pull quote / metadata footer).
- Variable column structures per page; generous outside margins on long-form, with kickers and metadata living in those margins; vertical rhythm varies per section. The grid is visible enough that breaks read composed, not accidental.

---

## Material posture

Moderate. Hand at the seams, not painted on walls. Textural moments at specific anchors only (hero, covers, footer), never blanket, never glassmorphism-default. Light behaves physically, warm light, subsurface scattering on accents, the glow-from-within of tech embedded in natural material. Per-project bespoke marks (the drafted-object plate) signal identity within the monograph.

---

## Anti-references (hard no)

- Minimal template portfolios: white-space-heavy, Squarespace energy, no personality.
- Dev-bro dark mode: neon gradients, terminal fonts, GitHub-profile-as-portfolio.
- Agency showcase sites: parallax scroll-jacking, cinematic transitions, no substance.
- Twee / Tumblr-zine craftsperson: hand-drawn underlines, hand-lettered wordmark, precious illustrated icons, marginalia-as-personality.
- Designer-as-influencer / performative motion: beat-synced micro-interactions, look-at-me transitions, scroll-jacking.
- Quiet to the point of bland: restraint as an alibi for indistinction; reads as "every other thoughtful-portfolio template."
- Post-apocalyptic / discarded-things-in-wilderness, or neon green: the Conservatory v1 failure mode. The world is *inhabited and tended*, optimistic, not abandoned.
- Any design that could be mistaken for AI-generated default output.

---

## Design principles (portfolio)

1. **Materials over decoration.** Every visual element should feel like a real material, brass, living green, warm glass, teak, aged paper. No purely decorative flourishes.
2. **Earned confidence.** The portfolio earns trust by doing, not claiming. Quality signals are in the craft details, not in hero statements.
3. **Atmospheric depth.** Surfaces have texture, light behaves physically, space has temperature. A place you are in, not a page you are reading.
4. **Intentional restraint, refused blandness.** Accents work because they are rare, motion works because most things are still. But restraint is never an alibi for blandness; every surface must distinguish itself or it has failed.
5. **Wabi-sabi craft.** Honest, considered work over perfection. The human hand behind the technology, expressed through composition and material.
6. **Editorial composition.** Composed like a monograph, not poured into a template. Each piece earns its own moves within a coherent meta-system.
7. **Tasteful motion.** Motion serves arrival and focus, never spectacle. Most things still; the rare moment earns its weight.

---

## Hard constraints

- OKLCH-only color via named tokens; no hex/rgb/named colors in committed code.
- WCAG 2.2 AA across every color pair, both modes (`scripts/wcag-check.py`).
- One `h1` per page; heading hierarchy `h2 -> h3` in order, never skip levels.
- No em-dashes in copy (`feedback_no_em_dashes`); also not `--`.
- No permission/gatekeeper framing in copy (`feedback_no_permission_framing`).
- Four-layer architecture (see ARCHITECTURE.md): design tokens live only in `design-system/`.

## Related

- **ADR-013** — the binding direction lock.
- **ADR-011** — superseded for visual specifics; the "refuse blandness / design is the credential" intent and three-face spirit are preserved.
- **ADR-005** — CSS texture system, extends to the biophilic register.
- `plans/recalibration-sprint0-notes.md` — exploration record + banked finals notes.
- `design-system/tokens.css` — the literal CSS implementation of all values here.
- Memory: `feedback_imagery_restraint`, `feedback_no_flat_color_covers`, `feedback_oklch_only`, `feedback_no_inter_for_portfolio`, `feedback_respect_slop_bans`.
</content>
</invoke>
