# Mission: Perihelion B.1 DIRD frontmatter pass

**Branch:** `chore/perihelion-b1-dird-frontmatter`
**Date:** 2026-05-17
**Owner:** Tyrell (one-shot mechanical pass per the locked sequence in `plans/perihelion-next-steps.md`)

A targeted B.1 small piece. Four DIRD-derived guides carried wrong `source.year` (all `2026`) and inconsistent `source.venue` values. Spec at `plans/perihelion-format-rules.md` names the canonical venue string for AAWSAP-era papers as `DIA / AAWSAP Program`. The DIRDs themselves were published under the DIA's AAWSA Program in FY 2009, dated 2010 on the cover sheets. This pass corrects both fields against the source PDFs.

## Scope

Two frontmatter fields per guide: `source.year` and `source.venue`. Nothing else. Body content, glossary, accent, territory, status, title, kicker, slug, order, description, figures — all untouched.

Four files touched, one layer (content).

## Changes per guide

| Guide | Field | Before | After |
|-------|-------|--------|-------|
| `dird-13-warp-drive.md` | `source.year` | `2026` | `2010` |
| `dird-13-warp-drive.md` | `source.venue` | `EarthTech International` | `DIA / AAWSAP Program` |
| `dird-14-superconductors-gravity.md` | `source.year` | `2026` | `2010` |
| `dird-14-superconductors-gravity.md` | `source.venue` | `Unknown` | `DIA / AAWSAP Program` |
| `dird-15-vacuum-spacetime-engineering.md` | `source.year` | `2026` | `2010` |
| `dird-15-vacuum-spacetime-engineering.md` | `source.venue` | `Institute for Advanced Studies at Austin` | `DIA / AAWSAP Program` |
| `dird-28-breakthrough-cockpits.md` | `source.year` | `2026` | `2010` |
| `dird-28-breakthrough-cockpits.md` | `source.venue` | `Unknown` | `DIA / AAWSAP Program` |

`source.authors` was out of scope and left as-is on every guide, even where the value (e.g. `Puthoff et al.`, `Hal Puthoff`) reflects body-attribution rather than the redacted cover-page author. That choice belongs to a future content pass, not this mechanical sweep.

## Sources consulted

Each year was verified against the title page of the original DIRD PDF in `~/projects/design-futures/sources/defence-intelligence-reference-documents_DIRDs/`:

- **DIRD 13** — `DIRD_13-DIRD_Warp_Drive_Dark_energy_and_the_Manipulation_of_Extra_Dimensions.pdf`. Cover: 2 April 2010, ICOD 1 December 2009, DIA-08-1004-001. Inside cover: "produced in FY 2009 under the Defense Intelligence Agency, ... Advanced Aerospace Weapon System Applications (AAWSA) Program."
- **DIRD 14** — `DIRD_14-DIRD_The_Role_of_Superconductors_in_Gravity_Research.pdf`. Cover: 23 March 2010, ICOD 1 December 2010, DIA-08-1003-013. Same FY 2009 AAWSA Program imprint.
- **DIRD 15** — `DIRD_15-DIRD_Advanced_Space_Propulsion_Based_on_Vacuum_Spacetime_Metric_Engineer.pdf`. Cover: 29 March 2010, ICOD 1 December 2009, DIA-08-1003-015. Same FY 2009 AAWSA Program imprint.
- **DIRD 28** — `DIRD_28-DIRD_Cockpits_in_the_Era_of_Breakthrough_Flight.pdf`. Cover: 01 November 2010, ICOD 8 July 2010, DIA-08-1011-002. Same FY 2009 AAWSA Program imprint.

Cross-referenced against `~/projects/design-futures/sources/defence-intelligence-reference-documents_DIRDs/dird-technology-briefs.md`, which carries the AAWSA Program attribution on every DIRD entry, and which independently dates two other DIRDs (23 and 37) to March 2010.

Schema reference: `plans/perihelion-format-rules.md`, where the example venue string for AAWSAP-era papers is explicitly `DIA / AAWSAP Program`.

## Open flags

- **AAWSA vs. AAWSAP.** The PDFs themselves carry the program acronym as `AAWSA` (Advanced Aerospace Weapon System Applications). The portfolio format spec and the upstream `guide-format-rules.md` use `AAWSAP` (Advanced Aerospace Weapon System Applications Program). Both refer to the same program. This pass follows the format spec verbatim and uses `AAWSAP`. Flagging for Justin in case the upstream Claude has a preference.
- **`source.authors` drift.** DIRD 13 and DIRD 15 carry body-attributed author strings (`Puthoff et al.`, `Hal Puthoff`) where the PDF cover sheets have author fields redacted under (b)(6). DIRD 14 and 28 carry `DIA / AAWSA Program` in the `authors` slot, which is structurally a venue value, not an author value. This is an authoring inconsistency worth resolving in a future B.1 pass or in the Writer voice sweep — out of scope for this mechanical fix.
- **DIRD 14 ICOD anomaly.** DIRD 14's cover sheet lists ICOD as `1 December 2010` (later than its own publication date of `23 March 2010`). Likely a typo in the source document; flagged here in case it surfaces during a citation audit, but does not affect the year correction.

## What this unblocks

- The four DIRD guides now carry accurate citation metadata, which means the B.2 Writer voice sweep can operate on them without inheriting wrong years into colophons, source links, or any future cite-audit output.
- Aligns with the slug migration that landed adjacent on `chore/perihelion-slug-migration` — same four guides, different frontmatter lines, no collision.

## Gates

- `npm run lint` — 0 errors, 1 warning (pre-existing `react-refresh/only-export-components` on `renderSection.tsx`, unrelated to this pass).
- `npm run build` — succeeds. Pre-existing chunk-size warning on `labs-*.js` unchanged.
