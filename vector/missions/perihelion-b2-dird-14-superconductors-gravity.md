# Mission: B.2 voice sweep, dird-14-superconductors-gravity

**Date:** 2026-06-09
**Branch:** `worktree-agent-a51a8b3c614d7f8fb` (off main, after PR #85)
**Lane:** Workstream B.2 per-guide pipeline, fourth guide. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Templates: `vector/missions/perihelion-b2-emergent-quantization.md`, `vector/missions/archive/perihelion-b2-dird-13-warp-drive.md`, `vector/missions/archive/perihelion-b2-quantum-gravity.md`. Scope set by the exit flags of `vector/missions/perihelion-b1-dird-14-superconductors-gravity.md` (PR #85).

## Scope

Voice sweep of `core/lab/guides/dird-14-superconductors-gravity.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: all 46 pre-existing `|term|` markers preserved byte-identical, all 7 callouts on their variants and all 3 definition glosses intact, 7 sections with identical anchors and levels, frontmatter untouched except glossary text (the one frontmatter area in B.2's lane per the pipeline precedent). Three content adds were explicitly in scope per the B.1 exit flags: the Chance Glenn introduction, the singular Josephson junction rewording, and the `Hal Puthoff` glossary entry.

## What changed

- **Em-dashes: 95 to 0** (across 62 lines; 28 body and hook lines, 34 glossary lines). Sentences were restructured (sentence splits, appositive commas, parentheticals, colons, semicolons) rather than swapped to other dash characters. Zero dashes introduced anywhere, including the two inherited dashes inside Design Hook callouts (`laboratory instrument interface`, `gravity engineering dashboard`), which were restructured in place with the rest of the callout prose verbatim.
- **En-dashes: 4 to 0.** The inherited date and value ranges (the Kelvin span in `critical temperature`, the 2006/2007 spans in `Martin Tajmar` and `#tajmar`, DeWitt's lifespan) became "to" constructions or were dropped with their trims, matching the zero-en-dash baseline the prior three B.2 sweeps report.
- **Glossary length pass: 37 entries trimmed** from 4 to 7 sentences down to the 1 to 3 sentence rule, keeping the substance. All six flagged at B.1 exit (`gravity engineering`, `critical temperature`, `Meissner effect`, `experimental artifacts`, `64 times the speed of light`, `coherence-as-mechanism thread`) plus 31 more. 6 entries got de-dash restructures without trimming (`Tajmar's frame dragging`, `Li Ning`, `improved shielding`, `superconducting quantum gravity detectors`, `gravity engineering dashboard`, `replication crisis as design problem`). 2 entries untouched (`Marx generator`, `systematic artifacts`).
- **Gloss sync maintained.** The `gravity engineering` and `Rindler horizon` trims kept their first two sentences byte-identical, so both body glosses still carry their entry text verbatim; `Marx generator` was untouched. All 3 glosses still resolve as definitions with correct terms.
- **Chance Glenn introduced in body prose** (B.1 exit flag 1). `#morningbird` now reads "The most important for the lab is |Morningbird Space|, the company Dr. Chance Glenn founded to pursue gravitational wave generation at laboratory scale", so the following "Glenn's approach" paragraph no longer leans on the glossary to identify him. The `|Morningbird Space|` marker is untouched; the introduction rides after it.
- **Josephson junction plural gap closed** (B.1 exit flag 2). The `#morningbird` parenthetical "(SQUIDs, Josephson junctions)" became "(SQUIDs and |Josephson junction| devices)", putting the exact-match singular inside a marker on first mention. The pre-existing `|Josephson junction|` marker later in the paragraph is byte-identical; same-term double marking follows the `|quantum coherence|` precedent from B.1.
- **`Hal Puthoff` glossary entry added** (B.1 exit flag 3), with a first-mention marker created by a prose touch in `#big-picture`: "DIRD 15 (Puthoff's vacuum spacetime engineering framework)" became "DIRD 15 (|Hal Puthoff|'s vacuum spacetime engineering framework)", using the established `|term|'s` possessive pattern from dird-13/14/15. The 3-sentence entry is framed per-guide (author of DIRD 15, SRI remote-viewing program, the Josephson junction detector program from `#morningbird`) and aligned with dird-13's entry, no contradictions. Entry placed in body-mention order. Marker count goes 46 to 48; glossary 45 to 46.
- **Contractions normalized** where prose drifted formal: "a material that is quantum at macroscopic scales" became "that's quantum" in `#superconductivity-basics`; the `Ron Koczor and Don Noever` entry's "were unable to achieve... did not observe" became "couldn't achieve... didn't observe".
- **Rhythm work stayed inside the em-dash restructures.** Short declarative landings after long thoughts ("In conventional physics, the answer is no." / "Not 'very low,' literally zero." / "didn't kill the field. They redirected it."), a sentence-starting-And close in `#big-picture` ("And it documents the specific experiments that tried."), and the `macroscopic quantum state` trim now lands on "You can hold a piece of quantum mechanics in your hand."
- **Stakes-landing moments kept declarative and humor-free** per the profile: "it would be the most consequential physics result of the century", the "There's no middle ground" number in `10¹⁸ times larger`, and the open-question close of `#tajmar`.
- **No audience-naming line added.** The opener's "we need rockets" / "we just haven't confirmed yet" already carries the inclusive-we register; adding a named close would exceed the Phase 3.1 frequency cap.
- **No permission framing introduced or found.**

## Verification

- Em-dash count: 0 in the full file (was 95 characters across 62 lines); en-dash count 0 (was 4).
- Marker integrity: `git diff --word-diff=porcelain` shows exactly two marker tokens among changed tokens, the added `|Hal Puthoff|` and `|Josephson junction|`; all 46 pre-existing markers byte-identical. 48 resolved term nodes, 46 glossary entries, 0 unused entries.
- No throwaway parser script this round (ad-hoc verification scripts are out of lane for this mission); structural checks ran through the npm scripts plus bounded grep: glossary sentence-boundary scan shows zero entries over 3 sentences (the one extra boundary hit is the "Dr." abbreviation in `Morningbird Space`), all 7 section anchors unchanged, all 7 callout headers and 3 gloss lines unchanged.
- `npm run audit:orphans`: 0 orphans (the dated report file from B.1 is unchanged).
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **`source.authors` still deferred** per B.1 and the FOIA-redaction research decision; the `AAWSA`/`AAWSAP` venue mismatch rides with that same decision. Untouched here.
- **`source.url` still missing.** Allowed for DIRD-source guides per locked decision; unchanged.
- **`source.notes` non-schema field** left in place, as B.1 flagged.
- **`status: draft` stands.** With B.1 and B.2 both complete, the flip to `complete` is Justin's call at merge, matching the dird-13 sequence.
- **Double `|Josephson junction|` marker in one `#morningbird` paragraph.** Both resolve, but if the rendered density reads heavy, un-marking the second occurrence is a one-line tweak; it touches a pre-existing marker, so it was left for Justin's call.
- **All three B.1 marker-gap flags and both copy flags are resolved** (Glenn introduction, Josephson plural, Hal Puthoff entry, em-dash density, glossary length). No other new flags raised.
- **Next guide in the B.1/B.2 pipeline** can follow the same template: B.1 structure sweep first, voice sweep second, npm-script verification carried between them.
