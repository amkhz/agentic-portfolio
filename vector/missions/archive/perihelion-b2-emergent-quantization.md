# Mission: B.2 voice sweep, emergent-quantization

**Date:** 2026-06-09
**Branch:** `feat/perihelion-b2-emergent-quantization` (off main, after PR #79)
**Lane:** Workstream B.2 per-guide pipeline, third guide. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Templates: `vector/missions/perihelion-b2-quantum-gravity.md`, `vector/missions/perihelion-b2-dird-13-warp-drive.md`. Scope set by the exit flags of `vector/missions/perihelion-b1-emergent-quantization.md` (PR #79).

## Scope

Voice sweep of `core/lab/guides/emergent-quantization.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: all 38 pre-existing `|term|` markers preserved byte-identical, all 3 definition glosses and the Read Next callout untouched, 7 sections with identical anchors and levels, frontmatter untouched except glossary definition text (the one frontmatter area in B.2's lane per the pipeline precedent). Two content adds were explicitly in scope per the B.1 exit flags: the Design Hook and the `dynamic vacuum` marker.

## What changed

- **Em-dashes: 40 to 0** (across 35 lines; B.1's flag said 36 lines, but the Casimir entry was de-dashed during B.1 itself). Sentences were restructured (colons, appositive commas, sentence splits, semicolons, parentheticals) rather than swapped to other dash characters. Zero en-dashes before, zero introduced. This covered 17 em-dashes across 15 body lines and 23 across 20 glossary lines. The U+2212 minus signs in the Rydberg and quantum-potential formulas are math, not punctuation, and were left alone.
- **Glossary length pass: 9 entries trimmed to the 1 to 3 sentence rule.** The six flagged at B.1 exit (`speed of sound`, `Madelung hydrodynamics`, `quantum potential`, `evanescent`, `Rydberg formula`, `pilot-wave`) plus three more 4-sentence entries caught during the de-dash pass (`wavenumber`, `spherical harmonics`, `Bogoliubov dispersion`). Substance kept; trims dropped restated parentheticals and merged trailing clauses.
- **Register fixes in glossary.** The shouting-caps "SQUARE" in `quadratic dispersion` is now lowercase "square" (the profile's all-caps emphatic is reserved for exclusions like "NOT Skynet", not mid-definition emphasis). The forbidden "leverages" in `Bogoliubov dispersion` became "works in".
- **12 more entries got punctuation-only de-dashing** (`density`, `elasticity`, `reduced Planck constant`, `reduced mass`, `1/r term`, `Helmholtz equation`, `single-valued`, `Laguerre polynomials`, `spin-orbit coupling`, `continuity equation`, `Bose-Einstein condensates`, `gradient-elastic`). 16 of the original 38 entries are untouched, including all three glossed entries (`Casimir effect`, `Coulomb problem`, `stochastic electrodynamics`), so the body glosses remain in verbatim sync byte-identical.
- **Design Hook added in `#so-what`** (the B.1-identified candidate: the vacuum-engineering implication), placed after the SED gloss and before the caveat paragraph. "The vacuum as a workable material": if vacuum properties are tunable, vacuum engineering needs what every materials practice has (spec sheets, profile catalogs, instruments), landing on the design challenge of making an invisible medium feel as workable as wood or steel. Bold mini-title and concrete-tool register match the dird-13 hooks; no new `|term|` markers inside the callout.
- **`dynamic vacuum` marker gap closed.** The `#vacuum` paragraph now reads "The word \"dynamic\" is key: a |dynamic vacuum| responds to what's in it", putting the title phrase in body prose for the first time. New 2-sentence glossary entry added in body-mention order, framed per-guide ("the paper's central concept") and aligned with dird-13's entry (literal physical medium, measurable properties: density, elasticity, sound speed) with no contradictions. Marker count goes 38 to 39.
- **Contraction normalized** where prose drifted formal: "This specific relationship is not arbitrary" became "isn't arbitrary" in `#ingredient-1`, split into a short declarative landing ("It's the same mathematical form as the kinetic energy term...").
- **Rhythm work stayed inside the em-dash restructures.** The guitar-string paragraph in `#big-picture` and the anything-but-empty line in `#vacuum` now land as short declaratives; the orbital-shapes and axiom lines take colons. The "What if quantization isn't a fundamental law" opener and the "energy comes in discrete chunks, period." landing kept declarative and humor-free per the profile.
- **No audience-naming line added.** The opener's "we just accept this as a rule" already carries the inclusive-we register; adding a named close would exceed the Phase 3.1 frequency cap.
- **No permission framing introduced or found.**

## Verification

- Em-dash count: 0 in the full file (was 40 characters across 35 lines); en-dash count 0 before and after.
- Marker integrity: `|term|` marker list before and after differs only by the added `|dynamic vacuum|`; all 38 pre-existing markers byte-identical (diff verified).
- Parser sweep (throwaway tsx, not committed): 7 sections with identical anchors (`big-picture`, `vacuum`, `ingredient-1`, `ingredient-2`, `emergence`, `so-what`, `appendix`), 5 blockquotes on the right variants (definition x3 with correct terms: Casimir effect, Coulomb problem, stochastic electrodynamics; design-hook; read-next), 39 resolved term nodes, 39 glossary entries, 0 unused entries, zero plain fall-throughs, zero parse warnings, zero emojis, zero glossary entries over 3 sentences.
- `npm run audit:orphans`: 0 orphans.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **`status` is already `complete`.** The frontmatter carried `status: complete` into B.1 and through this sweep; there was no `draft` to flip. If the pipeline convention is draft-until-Justin-flips-at-merge, this field predates the convention. Whether it stands or gets reset is Justin's call at merge; nothing was changed here.
- **All four B.1 exit flags are resolved** (em-dash density, glossary length and register, missing Design Hook, `dynamic vacuum` gap). No new flags raised by this sweep.
- **Next guide in the B.1/B.2 pipeline** can follow the same template: B.1 structure sweep first, voice sweep second, parser baseline carried between them.
