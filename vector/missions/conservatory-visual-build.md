# Mission — Plan A: "The Conservatory" Visual Build

> Implements ADR-013 across the portfolio surface. Pairs with Plan B (content). Deadline ~6 days from 2026-06-20; both must ship. Direction lock + imagery north-stars: `plans/recalibration-sprint0-notes.md`, `mocks/recalibration-sprint0/`.

## Goal
Rebuild the portfolio's visual system to the inhabited biophilic-future register ("The Conservatory"): humus-black + brass/amber + sage-green color inversion, biophilic-architecture imagery, wabi-sabi/Danish-craft material language, Field Notebook layout grammar, day/night dual mode. Kill the centered-template feel.

## Spine & sequence (highest-impact first; color gates everything)

**Phase 0 — Doctrine sync (required, do not skip).**
Amend `PRODUCT.md` (Aesthetic Direction: replace "warm blacks, brass + dusty magenta dual accent" with the Conservatory register) and `VECTOR.md` (Principle 3 / constraints) to ADR-013. Cannot be silent (VECTOR principle). Small, fast.

**Phase 1 — Color tokens (the spine).**
`design-system/tokens.css` overhaul: humus warm-black neutrals; brass/amber = tech-and-light; sage/moss green = living primary (muted, never neon); warm sand/clay light mode; magenta demoted to a rare signal token. OKLCH by name only. **Re-verify WCAG 2.2 AA across every pair, both modes.** Everything downstream depends on this.

**Phase 2 — Type validation (risk item).**
Validate live (`/impeccable live` / browser) a warm humanist body + refined display + structural mono on Home + one case study. Lock faces, add `--font-*` tokens + variable-axis exposure. Fraunces/Geist/JetBrains is a candidate, not binding. *Fallback: if this slips, ship color/imagery/layout on the current faces and swap type in a fast-follow.*

**Phase 3 — Imagery system (Wallace finals).**
Once real layout slots exist (Phase 4), regenerate production imagery at `V4_QUALITY_48`, exact aspect/crop per slot, fixed seeds from the locked sidecar captions. Two registers: biophilic-architecture heroes; modern-schematic "drafted object" per-project cover/mark plates. In-code atmosphere (grain, radial light) over the renders. Imagery stays an accent at anchors, never wallpaper.

**Phase 4 — Surfaces (interleaves with Phase 3).**
- **Home** — biophilic hero (replace centered `Hero.tsx` + particle template), one atmospheric moment, asymmetric composition.
- **Work index** — Field Notebook grammar: hero + table-of-contents/links with instrument/dossier framing + registration marks (replace the 3-col `ProjectCard` grid reflex).
- **Case-study shell** — `CaseStudyPageTemplate`: hero + TOC/links, per-project drafted-object mark, day/night.
- **About / Resume** — register pass (lower priority; first to defer if tight).

**Phase 5 — Gates.** Roy review against ADR-013 + doctrine; `npm run lint` + `npm run build` + `npm run test`; a11y audit both modes.

## Dependencies
Phase 1 gates all visual work. Phase 3 imagery finals depend on Phase 4 slot dimensions, so they interleave (build the slot, then render its final asset). Plan B content is independent except cover art (supplied by Phase 3).

## Fallback (protect the deadline)
Must-ship core: color tokens + imagery + Home + Work index + case-study shell, both modes. Deferrable: full type swap (keep current faces), About/Resume polish.

## Crew & mechanics
Tyrell builds; run `invest-crew` to decompose Phase 4 into scoped per-surface tasks; Impeccable `craft → critique → polish` per surface; Roy post-build review. Feature branches per surface (`feat/conservatory-*`), PR when each surface passes gates. Never commit to main directly.

## Open items
- Exact token values (derive from Sprint 0 caption hexes → OKLCH; the captions are render specs, tokens are the source of truth).
- Type face picks (Phase 2 validation).
- Per-project accent mapping under the new palette (was magenta/brass/forest/oxblood; re-map to the biophilic palette).
