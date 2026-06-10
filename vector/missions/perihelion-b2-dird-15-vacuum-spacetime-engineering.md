# Mission: B.2 voice sweep, dird-15-vacuum-spacetime-engineering

**Date:** 2026-06-10
**Branch:** `feat/perihelion-b2-dird-15-vacuum-spacetime-engineering` (off main, after PR #93)
**Lane:** Workstream B.2 per-guide pipeline, fifth guide. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Templates: `vector/missions/archive/perihelion-b2-dird-14-superconductors-gravity.md` (primary), plus the archived dird-13, quantum-gravity, and emergent-quantization B.2 logs. Scope set by the exit flags of `vector/missions/archive/perihelion-b1-dird-15-vacuum-spacetime-engineering.md` (PR #89).

## Scope

Voice sweep of `core/lab/guides/dird-15-vacuum-spacetime-engineering.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: all 68 pre-existing `|term|` markers preserved byte-identical, all 8 callouts on their variants and all 3 definition glosses intact, 9 sections with identical anchors and levels, frontmatter untouched except `description` and glossary text (the frontmatter areas in B.2's lane per the dird-13 precedent). Four content adds were explicitly in scope per the B.1 exit flags: the three marker-gap prose touches (Chance Glenn, Martin Tajmar, Ankur Bhatt) and the Sonny White naming alignment in `#white-paper`. This is also the first B.2 sweep to touch callout copy: the five Design Hook bodies arrived from B.1 as verbatim conversions and were reworked in voice here.

## What changed

- **Em-dashes: 112 to 0** (across 78 lines; 46 frontmatter lines including the `description`, 32 body and callout lines). Sentences were restructured (sentence splits, appositive commas, parentheticals, colons, semicolons) rather than swapped to other dash characters. Zero dashes introduced anywhere. The one em-dash inside a direct Puthoff quote in `#speed-of-light` was resolved as a transcription-punctuation split ("You're actually not beyond the speed of light. It's just you |re-engineered| the speed of light."), wording untouched.
- **En-dashes: 3 to 0.** Sakharov's lifespan became "(1921 to 1989)", "Nobel Peace Prize–winning" took a plain hyphen, and the AAWSAP "2007–2012" span became "2007 to 2012", matching the zero-en-dash baseline of the prior four B.2 sweeps.
- **Glossary length pass: the heaviest in the library, brought to spec.** 64 of the 65 inherited entries were trimmed and/or de-dashed from the inherited 4-to-8-sentence register down to the 1-to-3 sentence rule, keeping each definition grounded in the guide's own content (all ten entries B.1 flagged by name: `knobs you can turn`, `derived quantity`, `vacuum fluctuation coherence`, `re-engineered`, `Andrei Sakharov`, `engineering the vacuum`, `blue-shift experiment`, `Sonny White`, `coherence feedback system`, `AAWSAP/AATIP`, plus the rest). The only untouched entry is `Hal Puthoff`, which B.1 authored at 3 clean sentences.
- **Five Design Hook callout bodies reworked in voice** (first sweep to touch callout copy): vacuum state display, coherence feedback system, citizen-science detection kit, training continuum, suppression-to-access narrative. Bold-led term labels, `|term|` markers, and callout structure unchanged; prose tightened, de-dashed, and put on the profile's rhythm (question cascades kept, declarative landings, contractions).
- **Gloss sync maintained.** The `Extended Electrodynamics` entry was trimmed to exactly its 3-sentence body gloss; `UAP observable` and `PEAR lab` kept their glossed leading sentences byte-identical while their tails were de-dashed or merged. All 3 glosses still resolve as definitions with correct terms (verified: each gloss string occurs exactly twice in the file).
- **Marker-gap flags closed with three new entries and four new markers** (B.1 exit flag 3, all three items):
  - `Chance Glenn` entry added; `#lab-experiments` parenthetical "(Chance Glenn's work at |Morningbird Space|...)" became "(|Chance Glenn|'s work...)" via the established `|term|'s` possessive pattern. Entry grounded in this guide plus dird-14's `Morningbird Space` framing (Episode 2, EED Working Group), no contradictions.
  - `Martin Tajmar` entry added, aligned with dird-14's entry; the em-dash appositive "— the Tajmar experiments —" became "|superconductor-gravity experiments|: |Martin Tajmar|'s precise measurements...", killing the dash and creating the marker in one move.
  - `Ankur Bhatt` entry added; "(Ankur Bhatt's propellantless device...)" became "(|Ankur Bhatt|'s propellantless device...)". Entry grounded in the guide's own `Hoverr` and `Hoverr thruster` entries.
  - `#white-paper` naming aligned: the section now opens "|Sonny White|'s 2026 paper..." instead of unmarked "Harold White's", resolving the key/prose mismatch B.1 flagged. The `Sonny White` entry leads with "Harold 'Sonny' White" so the full name is still on the page. Marker count goes 68 to 72; glossary 65 to 68; 0 unused entries.
- **`description` de-dashed** (em-dash to colon), wording otherwise intact.
- **Rhythm work stayed inside the em-dash restructures.** Short declarative landings after long thoughts ("That's inertia." / "That's gravity." / "This isn't an illusion. It's a real geometric property of the engineered spacetime." / "The other DIRDs describe specific applications. This one describes the substrate they all operate on."), a sentence-starting-But close in `#lab-experiments` ("But they're all active research programs with real funding."), and the suppression section's pivotal claims kept declarative and humor-free per the profile.
- **No audience-naming line added.** The guide already carries its audience moves in the section title "What's Been Kept From You" and the inclusive design-question closes; adding a named close would exceed the Phase 3.1 frequency cap.
- **No permission framing introduced or found.**

## Decisions

- **`Stochastic Electrodynamics` key casing left as-is** (B.1 exit flag, "handle per format spec / prior B.2 precedent"). The format spec requires exact marker-key match per guide, which this guide satisfies; the body uses the capitalized proper-noun form; and no prior B.2 sweep has renamed a glossary key (quantum-gravity and emergent-quantization kept their lowercase keys untouched). Cross-guide casing normalization stays a future-pass item, carried below.

## Verification

- Em-dash count: 0 in the full file (was 112 characters across 78 lines); en-dash count 0 (was 3).
- Marker integrity: sorted marker-list diff against HEAD shows exactly four additions (`|Ankur Bhatt|`, `|Chance Glenn|`, `|Martin Tajmar|`, `|Sonny White|`); all 68 pre-existing markers byte-identical. 72 resolved term nodes across 68 distinct terms (gravity, Morningbird Space, Casimir Inc., and now Sonny White each carry two markers), 68 glossary entries, 0 unused.
- No throwaway parser script (ad-hoc verification scripts are out of lane); structural checks ran through the npm scripts plus bounded grep: 5 Design Hook, 2 Read Next, 1 Territory Bridge labels; 9 section anchors unchanged; glossary sentence-boundary scan shows zero entries over 3 sentences (the one extra boundary hit is the "Dr." abbreviation in `Chance Glenn`, same false-positive class dird-14's log recorded).
- `npm run audit:orphans`: 0 orphans across 0 guides (report file regenerated with identical content).
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **`source.url` still missing.** Allowed for DIRD-source guides per locked decision; the body cites JBIS Vol. 63 (2010) if a citation-grade reference is ever wanted. Unchanged.
- **`status: draft` stands.** With B.1 and B.2 both complete, the flip to `complete` is Justin's call at merge, matching the dird-13/dird-14 sequence. Deliberately not flipped here (the guide's history already contains one premature flip-and-revert pair).
- **DIRD 13 Read Next still surfaced for Justin.** B.1's two-per-guide cap went to the White-paper pair and DIRD 14; DIRD 13 is referenced in three sections but carries no Read Next here. quantum-gravity's Read Next already points at DIRD 15 and DIRD 13 together. Left as-is per orchestrator scope; Justin can make the pairing explicit if he wants it.
- **`Stochastic Electrodynamics` casing stays per-guide** (capitalized here, lowercase in quantum-gravity and emergent-quantization). No renderer impact; carried in case a future normalization pass wants one casing across the library.
- **Four terms now carry double markers** (gravity, Morningbird Space, Casimir Inc., Sonny White). All resolve; per the dird-14 double-Josephson precedent, un-marking a second occurrence is a one-line tweak left for Justin if the rendered density reads heavy.
- **All three B.1 marker-gap flags and both copy flags are resolved** (Chance Glenn, Martin Tajmar, Ankur Bhatt, Sonny White alignment, em-dash density, glossary length). No other new flags raised.
- **Next guide in the B.1/B.2 pipeline** can follow the same template: B.1 structure sweep first, voice sweep second, npm-script verification carried between them.
