# Recalibration Sprint 0 — Working Notes

> Live scratchpad for the 2026-06-20 fresh-exploration session. Feeds ADR-013 (visual direction) and the Plan B content map. Not doctrine yet.

## The program (Justin-approved structure)
- **Sprint 0** (now): direction lock via Wallace north-star renders → ADR-013.
- **Plan A**: visual overhaul build (craft → critique → polish), Wallace imagery centerpiece.
- **Plan B**: case study content (IDR, Doctrine/Pioneering pair, SOW refresh, Wallace piece).
- Deadline: ~6 days from 2026-06-20. Both plans must ship.
- Audience: design hiring leaders + recruiters; targeting lead/principal/staff + director/VP.

## Four candidate directions (renders in `mocks/recalibration-sprint0/`)
1. **Monograph** — serif-led editorial. Justin: least favorite. Texture nice, brass-on-linen plate detail is a keeper, but the direction overall doesn't win.
2. **Atelier** — cinematic, image-forward. Justin: "dope… love the color, vibe, and level of realism." Frontrunner for hero vibe + execution quality. Watch-out: magenta rendered as a flat lit panel, not ambient glow (fix in code).
3. **Field Notebook** — technical-archival. Justin: "cool… could work well for a case study layout" — reads as hero image + table-of-contents / list of links. Likes the **draft/blueprint imagery → "drafting up fantastical future-forward objects."**
4. **Conservatory** — tech+nature symbiosis thesis, dark/golden-hour dual mode. v1 heroes REJECTED (read as "post-apocalyptic, discarded, forgotten things" in wilderness; green too neon). v1 cover (06) is a KEEPER (specimen-on-dark is the right frame for a cover). **v2 re-cut LANDED** (2026-06-20): dark hero now reads as an inhabited, tended greenhouse-workshop — warm amber dominant, green demoted to soft sage accent, instrument upright and in active use, cultivated plants in designed vessels. Thesis fix confirmed on dark; light v2 finishing. Realism preserved.

## Emerging synthesis (hold until Conservatory lands)
Not a single-winner pick. Shaping toward a **hybrid**:
- **Conservatory** = the soul / color-worldview / day-night story (pending visual confirmation).
- **Atelier** = the atmosphere + realism bar for hero imagery.
- **Field Notebook** = the structural grammar for **case-study layouts** (hero + TOC/link list) and the per-project mark system.
- **"Drafted fantastical future-forward objects"** = recurring imagery device (blueprint/schematic renders of imagined instruments). Ties Conservatory (instruments-in-nature) and Field Notebook (schematics) together. Strong, ownable seam — Justin called this out unprompted.

## Register additions (load-bearing, 2026-06-20 — Justin)
Two elements to thread through the whole visual register, not just one direction. Both go into ADR-013 and PRODUCT.md doctrine, not just the Conservatory captions.
1. **Danish furniture, present in-scene.** Finn Juhl / Hans Wegner mid-century pieces should actually appear *within* the nature/Conservatory example — teak, cane, leather, sculptural forms — as lived-with objects, not just a mood reference. People + tech + nature + craft furniture sharing the space. (Atelier already proved a Finn Juhl chair renders well; bring that into Conservatory.)
2. **Wabi-sabi as the core resonant philosophy.** Everything must resonate with wabi-sabi — imperfection, patina, honest wear, asymmetry, natural materials, transience, the beauty of the incomplete. Already a PRODUCT.md reference; Justin is elevating it to a load-bearing principle the entire system expresses, across every surface and direction. This is the unifying soul under the hybrid.
3. **Subtle luxury + personalization + agency (optimistic posture).** The world can be shaped and presented exactly as its inhabitants wish, in harmony with nature. Refined, bespoke, quiet opulence — never flashy. Adaptive/personalized surfaces. This is the tonal guard against dystopia: not survival-in-ruins but empowered, curated, harmonious living. Keep it understated; luxury is in material quality and considered detail, not ornament.

**Conservatory v4 — scale up from greenhouse to inhabited biophilic ARCHITECTURE** (2026-06-20, Justin). v2/v3 leaned too "greenhouse." New vision: greenhouse × architecture museum. Soaring atria and indoor courtyards/plazas; long corridors; light beaming from top / sides / bottom (natural + artificial); gathering and seating areas; terraces at eye-level with treetops or looking down over nature; in places the nature/habitat boundary dissolves. Throughout, the subtle, tangible presence of extremely advanced tech: OLED / organic displays embedded into natural materials, transparent interactive glass surfaces and panels that blend seamlessly. Still warm, wabi-sabi, Danish craft, people-present and lived-in. Refs: Jewel Changi / Gardens by the Bay / Eden Project / Apple Park / Kengo Kuma / Foster; BR2049 + Expanse + Her for seamless tech. v3 (greenhouse-room scale) stopped mid-render as superseded; furniture + wabi-sabi register elements carry forward into v4.

## Content decisions (Justin's calls, 2026-06-20)
- **IDR**: green-lit. New `port-sources/instant-doc-review.md` is the basis. Lead hard on **metrics AND way-of-working** (AI-assisted process). Replaces the thin existing `instant-doc-review.md`. Hard metrics: PSA review −50%, 82% ship AI output w/ zero analyst edits, 27% auto-complete in Processing, Prelim Title −33%, underwriter kickback 40–45%→~30%, 7% borrower self-resolve. Prototype graduated into production (versioned package, ownership map presented to arch guild).
- **Doctrine, Not Prompts + Pioneering AI Adoption**: KEEP BOTH. Frame as a **two-part case study showing evolution; reader chooses entry — origin or evolution.**
  - *Origin* = "Pioneering AI Adoption" (existing `ai-leadership.md`): workshops, 6-step playbook, the Big Flip, 100% tool adoption.
  - *Evolution* = "Doctrine, Not Prompts" (`port-sources/doctrine-not-prompts-case-study.md`): operating model, doctrine files, Kiavi World, four proof points, Tech Summit talk.
  - Needs an IA/interaction design call (two-door chooser vs. linked slugs vs. constellation-style). Dreamer/shape candidate.
  - `ai-assisted-design-at-kiavi.md` = deep background quarry for the Evolution piece; not its own case study (too internal/long).
- **SOW / Feasibility**: light project, returning to it "one day." **Just refresh the existing `instant-sow.md`.** New asset: the Draws/SOW screenshot (`port-sources/Screenshot 2026-06-20 at 5.26.17 PM.png`). Don't over-invest.
- **Wallace piece**: new standalone case study (origin + use), Perihelion Works earmarked as eventual fuller home. Proof = the Sprint 0 renders themselves.

## Positioning watch-out
IDR and the Doctrine/Pioneering pair both feature Snapshot + four-layer + prototype-to-production. Keep distinct: **IDR = product depth + hard metrics; Doctrine = operating model + org leadership.** Snapshot is product-hero in one, proof-point in the other.

## Render facts
- Runtime: `mflux-generate-ideogram4`, V4_DEFAULT_20 drafts, ~7.5 min/hero (20 steps × ~21s), peak ~42 GB RAM. Seeds 7001–7008. Sidecar captions saved per image.
- Winner direction gets V4_QUALITY_48 finals later.

## Finals imagery notes — APPLY AT PRODUCTION RENDER PASS (not now)
Direction locked; these are cosmetic/refinement notes to fold in when regenerating production imagery at V4_QUALITY_48 against the real layout slots (Plan A Phase 3). Captions are saved as sidecars; re-render with fixed seeds + these tweaks.
- **Atrium embedded screens** read too "cafe" (green/cream menu-board feel). Make them **informational / data / art / interactive tech surfaces** — purposeful displays, not signage.
- **Seamless tech detail**: extend the glow-from-within-material idea **beyond wood — into glass, metal, stone, etc.** A device family across substrates, tech indistinguishable from each material.
- **Drafted-object schematic**: push **more tech/computer feeling** (digital/CAD/modern-computer schematic), less archival-paper warmth. Keep it modern, not steampunk.
