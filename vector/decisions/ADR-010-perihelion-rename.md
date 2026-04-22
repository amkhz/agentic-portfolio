# ADR-010: Rename the lab to Perihelion (two-arm house: Archive and Works)

**Date:** 2026-04-21
**Status:** accepted
**Deciders:** Justin Hernandez, Dreamer (Tyrell implementing)

## Context

The lab shipped at `labs.justinh.design` under the name **Frontier Lab**. ADR-009 governs the architecture (two Vite builds, one repo, host-based rewrite). The name itself was a placeholder. "Frontier" is a tropey word in the speculative-design and VC-adjacent ecosystem, and "Lab" is generic. The surface has outgrown both.

Two additional realities surfaced during the naming session that shaped this decision:

1. **The lab is two-armed, not one.** The research library shipped to date (eight deep-dive guides across UAP detection, consciousness and spacetime, materials and sensing) is one arm. A second arm is planned: an applied design practice (systems design, interface design, human factors, product design) for the same frontier territories. The two arms are peers, not a pipeline with research upstream of practice.

2. **The lab exists to inspire, not only to catalogue.** Justin is building this for himself AND to invite other designers who have not yet considered frontier science. The name must feel like a door held open, not a credential. That principle ruled out names that felt obscure-as-flex (Wunderkammer, Syzygy, Orrery, Alembic) and pushed toward words that reward a reader without gatekeeping them.

Naming brief, candidate exploration, shortlist, and decision criteria are captured in `plans/lab-naming-pivot.md`.

## Decision Drivers

- **Primary word must carry brand standalone.** Shape A was chosen: umbrella brand at top level, arm anchors below.
- **Invitational register.** Accessible, inspiring, designy without being scholarly or corporate.
- **Register alignment.** Astronomical, alchemical, poetic and spatial, tongue-in-cheek sci-fi.
- **Memorability.** Pronounceable, recallable, works aloud.
- **Dual-arm umbrella fit.** Name must not pin to either research or design practice.
- **Availability.** Clear enough of existing brands to avoid muddied attribution.
- **Anchor-peer energy.** Both arm anchors must sit as peers, both craft-coded.

## Options Considered

A shortlist of eight candidates was developed. Details in `plans/lab-naming-pivot.md`. Headline comparison:

| Candidate | Dual-arm fit | Invitational | Memorability | Availability |
|---|---|---|---|---|
| **Perihelion** | Neutral umbrella | High (attention is universal) | Medium (5 syllables, rhythmic) | Clear |
| The Penumbra | Good | Medium | Medium | Medium (video game collision) |
| Parallax | Strong | High | High | Medium (Parallax Press exists) |
| Slow Light | Medium | High | High | Clear |
| Syzygy Almanac | Strong | Low | Medium | Low (obscure-as-flex) |
| The Alembic | Strong | Medium | Medium | Medium |
| The Cairn | Medium | High | High | Medium (outdoor brands) |
| Aphelion Press | Neutral | Medium | Medium | Clear (but "Press" rejected) |

For the research arm anchor, scholarly and pedagogy-coded options (Reader, Primer, Journal, Review) were rejected as positioning the audience as students rather than peers. "Works" (motorsport factory-team energy) emerged for the design arm. "Archive" edged "Library" for the research arm because it matches the curated nature of the content and avoids circularity with the pre-rename "research library" framing.

## Decision

**Rename to Perihelion. Organize as a two-arm house.**

| Role | Name |
|---|---|
| Brand (umbrella) | **Perihelion** |
| Research arm | **Perihelion Archive** |
| Design-practice arm | **Perihelion Works** |

**Perihelion** (the point in an orbit closest to the sun, the moment of maximum attention) is astronomical, precise, invitational, and rewards the reader who learns its meaning. It reads as a brand standalone and ages across many volumes.

**Perihelion Archive** replaces "Frontier Lab" as the visible heading on the currently-shipped research library. The word "archive" signals curated, preserved, worth keeping, which matches the actual shape of the deep-dive content better than "library" would.

**Perihelion Works** is reserved for the forthcoming applied-design arm. The motorsport Works-team association (factory-backed craft, the makers racing their own product) carries earned prestige without pretension, and reads equally well as "selected works" for designers and "public works" for systems thinkers.

### Information architecture

- **Umbrella (header):** "Perihelion" (wordmark) with a secondary line reading "closest approach to the frontier."
- **Landing page** (currently `labs.justinh.design/`): the Perihelion Archive. H1 "Perihelion Archive."
- **Future surface** (`labs.justinh.design/works`, not yet built): the Perihelion Works. This rename prepares the house; Works lights up when the first applied-design piece ships.
- **Subdomain:** stays at `labs.justinh.design`. Brand-match domains can be added later as aliases.

### Tagline

The pre-rename closer "A reader's notebook. Designed to be prep, not product." is preserved on the Archive-side (footer and Archive-specific contexts). The umbrella tagline becomes "closest approach to the frontier." When Perihelion Works ships, each arm will own its own line; the umbrella will either retire the tagline or carry a dual-arm successor.

### Scope of this rename

Chrome copy only. Architecture, tokens, data models, routes, services, tests, and deploy topology are untouched. ADR-009 remains the governing architecture decision.

## Consequences

**Positive:**
- Umbrella brand with room for two peer arms, ready for the applied-design practice when it ships
- Name signals the invitational posture the lab is built around, rather than a tropey one
- Visual hierarchy on the Archive landing improves (umbrella wordmark + specific page H1) instead of the current redundant "Frontier Lab" stacking
- Positioning for the meta case study: a documented naming pivot with visible decision criteria is portfolio-worthy material
- Dual-arm structure makes the future Works arm an additive scaffolding exercise, not a rebrand

**Negative:**
- First-encounter cognitive cost: "Perihelion" is less transparent than "Frontier Lab" for a new visitor. Mitigated by the secondary tagline ("closest approach to the frontier") and by the brand paying off when the visitor engages
- Third-party SEO and backlinks pointing to "Frontier Lab" will need gradual attribution reset
- Clearance search for "Perihelion" and "Perihelion Archive" is recommended pre-merge; some niche products exist but no dominant brand on either

**Neutral:**
- Subdomain (`labs.justinh.design`) unchanged. The subdomain describes the surface type, not the brand
- Historical prose and quoted material (guide bodies citing "the frontiers of present knowledge," company names like "Frontier Analysis, Ltd.") stays as written. The rename is strictly brand chrome
- Archived plans, missions, and ADR-009 are not edited; they record history

## Implementation

See `plans/lab-naming-pivot.md` Implementation Steps for file-by-file string replacements and sequencing. Footprint: approximately ten files across `src/lab/`, `src/pages/`, `src/components/layout/`, `labs.html`, `core/content/`, README, roadmap. No new dependencies, no design-system changes, no core or services logic changes. Standard gates: `npm run lint` and `npm run build`.

## Related Decisions

- `ADR-009: Lab subdomain architecture (two Vite builds, one repo)` — governs architecture; unchanged by this rename
- `ADR-005: CSS-only texture system` — visual identity tokens; unchanged

## Revisit Criteria

Revisit this decision if any of the following become true:

- A dominant brand on "Perihelion" or "Perihelion Archive" emerges that creates attribution confusion
- The two-arm structure collapses (e.g., research and practice fuse into one stream) and a different anchor structure fits better
- A brand-match domain becomes strategically important and the subdomain needs to change
- Justin decides the tagline "closest approach to the frontier" does not carry the umbrella posture and needs a rewrite
