# Mission: B.2 voice sweep, uap-field-map

**Date:** 2026-06-10
**Branch:** `feat/perihelion-b2-uap-field-map` (off main, after PR #103)
**Lane:** Workstream B.2 per-guide pipeline, seventh guide and the first non-DIRD voice sweep since the emergent-quantization/quantum-gravity pair. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Templates: `vector/missions/archive/perihelion-b2-dird-28-breakthrough-cockpits.md` (primary) plus the archived dird-15 and earlier B.2 logs. Scope set by the exit flags of `vector/missions/archive/perihelion-b1-uap-field-map.md` (PR #100), the heaviest exit-flag list of the series.

## Scope

Voice sweep of `core/lab/guides/uap-field-map.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: all 75 pre-existing `|term|` markers byte-identical, all 3 inline definition glosses intact and synced, 9 section anchors unchanged, callout census changed only by the one Read Next add below. Scope per the PR #100 exit flags: 136 inherited em-dash lines; glossary compression to the 1-to-3 sentence rule; 15 unused glossary entries including 5 case/format near-duplicate pairs; 10 entries with no markable literal body string; two dangling-colon content gaps; the missing Hal Puthoff entry; the open second Read Next slot. `status: complete` left exactly as found; frontmatter untouched outside `description` and the glossary.

## What changed

- **Em-dashes: 166 to 0** (across 136 lines, frontmatter glossary and body both, including headings, table cells, callout bodies, and the `description`). Sentences restructured (splits, appositive commas, parentheticals, colons, semicolons) rather than swapped to other dash characters. Two em-dashes inside direct source quotes (the SCU "passive physical phenomena" line and the Knuth "transition away from classical ufology" passage) were resolved as transcription-punctuation comma swaps, wording untouched, per the dird-15 Puthoff-quote precedent. Subsection headings carrying em-dashes moved to colons; the one h2 affected ("Framing: UAP as a scientific problem") keeps its `{#framing-scientific-problem}` anchor byte-identical.
- **En-dashes: 36 to 0.** Date and numeric ranges became "X to Y" (Mach 40 to 60, 4 to 40%, 100 MHz to 3.3 GHz, 1952 to 1969, 10pm to 1am, 0 to 18°, 12 to 30U). Open-ended program spans like "(1984–)" became "since 1984" / "(since 2021)" / "to present". The en-dash inside the proper name "Automatic Dependent Surveillance–Broadcast" took a plain hyphen. Arrows (→, ↔) are not dashes and stand as B.1 left them.
- **Glossary: 73 entries to 64; 0 unused (was 15).** Every surviving entry now sits at 1 to 3 sentences (rough sentence-boundary scan shows zero entries over 3). Full accounting below.
- **Six new `|term|` markers** (75 to 81 resolved nodes, 58 to 64 distinct keys): `|Hal Puthoff|`, `|Galileo Project|`, `|IFEX|`, `|SETI Kingsland|`, `|VASCO|`, `|Wendt-Duvall sovereignty argument|`. Sorted marker-census diff against HEAD shows exactly these six additions; every pre-existing marker count is identical.
- **`Hal Puthoff` glossary entry added** (B.1 exit flag), aligned with the dird-15 entry (SRI remote viewing, vacuum-engineering framework) and grounded in this guide's BAASS/AATIP/DIRD content. The marker rides the possessive at "written by BAASS scientists under |Hal Puthoff|'s direction" in the Pattern 3 subsection, using the established `|term|'s` pattern. The author-bolded "**Hal Puthoff** as Chief Scientist" first mention stays bold and unmarked, honoring B.1's decline of the bold-for-marker swap.
- **Both dangling-colon content gaps restored** from the upstream original at `~/projects/design-futures/learning-guides/uap-field-map.md` (read-only source, nothing modified there):
  - **IFEX "most significant single fact"** (upstream line 472): the VaMEx3-MarsSymphony bold pull-quote restored after the dangling lead in `#field-studies`. The upstream em-dash construction was reworked to "VaMEx3-MarsSymphony is the first time in Germany that..."; the second sentence (designed for Mars, demonstrated on Earth in 2025) restored as written. No content invented beyond the source.
  - **`#methodology` "most striking specific datum"** (upstream line 700): the bold datum "Many UAP are extremely cold (sometimes at temperatures down to -50°C or -60°F)." restored verbatim (it carries no dashes). The follow-on IR-signature prose was already present in the guide; the datum it pointed at now exists again.
- **Second Read Next slot filled with DIRD 15** (pre-authorized discretion). Placed in `#history-compressed`, Pattern 3 (the AATIP → DIRD lineage), directly after "The DIRDs survive as the public technical legacy of that program." The prose genuinely supports it there: the reader has just learned what the DIRDs are and that they live in the lab's library, and the Read Next is navigation ("start here") rather than the territory-line work the adjacent bridge already does. B.1's over-callouting concern applied to the two Territory Bridge sites that already name DIRD 15 (`#field-studies` Hessdalen, `#methodology` Faraday); this placement is neither. Body grounded in dird-15's own frontmatter (spacetime as an engineerable medium, the spine the collection builds on). Callout census: 21 Design Hook, 17 Territory Bridge, 2 Read Next, 3 Subguide queued (was 1 Read Next; everything else unchanged).
- **Voice work stayed inside the restructures**: declarative landings where the dashes used to be ("These are not eyewitness estimates. They are values from instrumented observations..." / "The data does not read as 'atmospheric phenomenon.' It reads as a target with goals." / "Pasulka and Kripal are not fringe. They are tenured scholars..."), colon setups for enumerations, parentheticals for asides. No second-person permission framing found or introduced; no audience-naming close added (the closing section already carries the guide's stakes-handoff and the Phase 3.1 frequency cap applies).

## Glossary accounting (every call recorded)

**Five case/format duplicate pairs consolidated** (the unused variant deleted, better material merged into the marked key):

1. `Residuum` deleted; `residuum` (marked) survives. The capital variant's "only portion that is scientifically interesting" claim is already the surviving entry's second sentence.
2. `Angel hair` deleted; `angel hair` (marked) survives, now carrying the capital variant's analytical-conditions caveat ("could not rule out a silk-based misidentification"), which matches the body's own Florence paragraph better than the old "resists biological explanation" phrasing.
3. `Phase Change Material (PCM)` deleted; `Phase Change Material` (marked) survives. The PCM variant had nothing the survivor lacked.
4. `Science Traceability Matrix (STM)` deleted; `Science Traceability Matrix` (marked) survives. The STM variant's arrow chain is covered by the survivor's plainer "observables to parameters to instrument requirements" sentence.
5. `Project SIGN / Grudge / Blue Book` deleted; `Project SIGN` (marked) survives and now carries the merged lineage the B.1 flag wanted kept: Grudge's "explicit instructions to dismiss" and Blue Book running until the Condon Report closed it in 1969.

**Five unused entries deleted** (one line of reasoning each):

1. `AARO predecessors`: the UAPTF-to-AARO timeline is fully narrated in `#framing-scientific-problem` with both endpoint terms already marked; the entry was a redundant index card with an unmatchable key.
2. `Florence 1954`: the body's own Florence paragraph in `#evidence` is the full treatment and the surviving `angel hair` entry covers the material question; the key never appears as a literal and the case-study bold lead is author formatting, not a marker slot.
3. `Forensic vs. observational paradigm`: the closing `#methodology` subsection covers the argument at length in Knuth's own quoted words; the key string never appears in prose and a forced insertion would duplicate the section.
4. `JANAP 146 / AFR 200-2`: both regulations are defined inline in the Pattern 1 bullet list with dates and effects; the combined slash key has no literal match and splitting it into two entries would gloss terms the body already defines in place.
5. `Local Positioning System (LPS)`: the term appears nowhere in the guide body at all (an upstream conversion remnant), so there is no mention to mark and nothing for the entry to support.

**Five of the no-literal-string entries resolved by marker instead of deletion** (the 10th flag item, `Hal Puthoff`, covered above):

1. `Galileo Project`: marked at the first body-prose literal, the possessive "The |Galileo Project|'s |Push-broom satellite imagery| innovation" in `#methodology` (established `|term|'s` pattern; mid-bold markers are parser-supported per the B.1 log).
2. `IFEX`: marked at "By casting the project as a Mars anomaly detection system..., |IFEX| secured government funding" in `#field-studies`, the first body-prose literal outside headings; the restored VaMEx3 pull-quote makes this entry's payoff visible again.
3. `SETI Kingsland`: marked at "|SETI Kingsland|'s two-platform triangulation" in the convergence subsection, the first body-prose literal outside its heading.
4. `VASCO`: marked at "|VASCO|'s hypothesis:" in `#field-studies`, the first body-prose literal outside its heading.
5. `Wendt-Duvall sovereignty argument`: light prose touch in the `#orgs-and-stigma` Territory Bridge, which now opens "The |Wendt-Duvall sovereignty argument| is the academic intellectual backbone..." (was "Wendt-Duvall is the..."), a genuine first mention of the full key string.

Net: 73 - 5 (duplicates) - 5 (deletions) + 1 (Hal Puthoff) = 64 entries, 64 distinct marked keys, 0 unused.

## Decisions

- **`INTERMAGNET` inline gloss stays declined** per instruction; the term remains marked in the Galileo instrumentation table with its glossary entry untouched.
- **Read Next slot filled, not left open** (rationale above). If the rendered density in Pattern 3 reads heavy with the Read Next and Territory Bridge adjacent, dropping the Read Next is a one-block revert.
- **`status: complete` left exactly as found.** No frontmatter touched outside `description` (de-dashed to a colon, wording intact) and the glossary.
- **Arrows (→, ↔) retained.** They are not in the dash scope, they carry the org-evolution and bidirectional-territory semantics, and no prior B.2 sweep removed them.
- **BAASS, HR-ICPMS, and FTIR microspectroscopy glossary entries untouched** so their synced body glosses stay byte-identical (verified: each gloss string occurs exactly twice in the file). All three were already em-dash-free and within the sentence rule.

## Verification

- Em-dash count: 0 in the full file (was 166 characters across 136 lines); en-dash count 0 (was 36).
- Marker integrity: sorted marker-census diff against HEAD shows exactly six additions; 81 resolved term nodes across 64 distinct keys, 64 glossary entries, 0 unused.
- Structure: 21 Design Hook, 17 Territory Bridge, 2 Read Next, 3 Subguide queued labels; 9 section anchors unchanged; inline gloss count 3 before and after, each verified synced.
- Glossary sentence scan: zero entries with four or more sentence boundaries.
- No throwaway parser scripts; verification ran exclusively through bounded greps and the npm scripts per the locked workflow.
- `npm run audit:orphans`: 0 orphans across 0 guides (report regenerated with identical content).
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **uap-field-map leaves the pipeline clean.** Both passes complete, glossary fully resolved, both content gaps closed. No deferred items remain for this guide.
- **`uapx-field-methods` is the last guide in the library without either pass.** The B.1/B.2 pair can follow the same template.
- **Watch item only:** the Pattern 3 subsection now stacks a Read Next and a Territory Bridge. Precedented elsewhere in this guide (the transmedium and Faraday sections stack two callouts), but Justin may want a look at the rendered rhythm.
