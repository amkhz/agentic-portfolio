# Mission: B.2 voice sweep, uapx-field-methods

**Date:** 2026-06-10
**Branch:** `feat/perihelion-b2-uapx-field-methods` (off main, after PR #103)
**Lane:** Workstream B.2 per-guide pipeline, eighth and FINAL guide. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Templates: `vector/missions/perihelion-b2-uap-field-map.md` (primary, the other non-DIRD B.2) plus the archived dird-series B.2 logs. Scope set by the exit flags of `vector/missions/archive/perihelion-b1-uapx-field-methods.md` (PR #104). **This pass closes Workstream B pending merge: with it, all eight guides carry both their B.1 format pass and B.2 voice sweep.**

## Scope

Voice sweep of `core/lab/guides/uapx-field-methods.md` against the voice profile. Everything B.1 settled stayed settled: all 8 section anchors unchanged (the retitled `#dark-spot` heading keeps its anchor byte-identical), all 5 inline definition glosses intact and re-synced with their reworked glossary entries, the populated `figures:` array untouched, `status: complete` left exactly as found. Frontmatter touched only at `description` (de-dashed) and the glossary. Scope per the PR #104 exit flags: 45 inherited em-dash lines including the `#dark-spot` heading; glossary register rework to the 1-to-3 sentence rule; the Cash-Landrum near-duplicate; Design Hook, Territory Bridge, Read Next, and subguide candidates; the `ambiguity` marker gap; the `source.venue` and `fig-N-` carry-forward flags.

## What changed

- **Em-dashes: 69 to 0** (across 45 lines: frontmatter `description`, three figure captions, the `#dark-spot` h2, glossary entries, and body prose in all eight sections). Sentences restructured in voice (splits, appositive commas, colons, parentheticals) rather than swapped to other dash characters. The heading became "The Dark Spot: A Forensic Worked Example" with `{#dark-spot}` byte-identical, verified by grep.
- **En-dashes: 11 to 0.** Ranges became "X to Y" (7.5 to 13 µm, 27 to 29 dBZ, 2 to 3σ, 3:57 to 3:59am, 3σ to 5σ in the description, the 1950s through the 80s, frames 12 and 13). "(1984–present)" became "running since 1984". Proper-name en-dashes took plain hyphens per the uap-field-map ADS-B precedent: UAlbany-UAPx and the Cash-Landrum key/marker.
- **Glossary: 37 entries to 36; all entries now at 1 to 3 full sentences in the established register.** Every telegraphic fragment ("UAPx term: ...", "'Naive' = assumes feature independence", "MIP. The regime where...", "SiPM. Solid-state photon detector...") expanded into prose sentences matching the uap-field-map post-B.2 register. Two entries (`instrumented sensor suites`, `particle physicists`) were already in register and stand unchanged. A bounded sentence-boundary grep shows zero entries over three sentences (its single hit is a figure caption, not a glossary entry).
- **Cash-Landrum consolidated** (full call below). 37 - 1 duplicate = 36 entries, 36 distinct marked keys, 0 unused.
- **Five synced inline glosses updated in lockstep** with their glossary entries (`microbolometer arrays`, `skew-Gaussian function`, `fall-streak hole`, `clutter reflectivity`, `accidental coincidence rate`); each gloss string verified to occur exactly twice in the file (glossary + body), byte-identical.
- **2 Design Hook callouts added** (was 0): see discretion calls. Callout census: 2 Design Hook, 1 Read Next, 0 Territory Bridge, 0 Subguide queued (was 0/1/0/0).
- **`ambiguity` marker gap closed by prose touch.** "a camera ambiguity" in `#radiation` became "an ambiguous camera event": the casual single-sensor usage no longer collides with the formal multi-sensor term, so the existing `|ambiguity|` marker at the definitional mention in `#statistical-framework` is now the first clean mention and keeps the marker, per convention. No new marker added; this resolves B.1's declined-marker flag without papering over the semantic mismatch B.1 identified.
- **Marker integrity:** sorted marker-census diff against HEAD shows exactly one change, the intentional `|Cash–Landrum|` to `|Cash-Landrum|` key swap. 38 resolved term nodes across 36 distinct keys before and after.

## The Cash-Landrum call

B.1 found an unused hyphenated `Cash-Landrum` entry near-duplicating the used en-dash `Cash–Landrum` key with diverging definitions. Consolidated as follows: the longer en-dash entry's material wins (named witnesses, Huffman location, the helicopter escort, the radiation/UV injury detail, the UAPx motivation framing), merged with the hyphen entry's one distinct asset, the physician-documented detail, which now rides the injuries sentence as "physician-documented injuries". The old ~70-word single sentence was rebuilt as three sentences within the rule. The surviving key takes the plain hyphen (en-dash sweep, proper-name precedent), the old short hyphen entry was deleted, and the body marker updated to match. Net: one entry, one marker, zero en-dashes, no material lost.

## Discretion calls

- **Design Hook ×2 accepted:**
  1. **`#c-tap`, after the design-relevance paragraph** ("The review queue is the product."). The prose explicitly names C-TAP as design-relevant and the tripled-detections result is the receipt; the hook draws the line to the review-queue interface any citizen-science platform needs. This was B.1's strongest candidate.
  2. **`#lessons-learned`, after the clock-sync lesson** ("Synchronization is invisible until it decides everything."). Clock sync is the failure that decided the guide's central case (the dark spot stalled at ambiguity because of the 60-second window), and the implication generalizes to any multi-sensor product. The hook surfaces the operator-facing design problem (sync preconditions, drift visibility) that the lesson's bold lead only implies.
- **Design Hook declined (one line each):**
  - **`#future` opener**: the paragraph already *is* the design statement ("design infrastructure waiting to be built... a blueprint with gaps"); a hook beside it would restate the prose it cites.
  - **Data pipeline lesson (MSDAU)**: the bold lead "your instrument is only as good as the data pipeline" lands the design line in place.
  - **Satellite-overlay lesson (ISS)**: the fix is named in prose as a solvable software problem; a hook adds no new design line.
  - **Analyzability lesson (eight FLIRs)**: "the optimization is for analyzability, not raw collection volume" is already the hook sentence, inside the prose.
  - **LPS lesson**: the design implication is one sentence and the glossary entry carries the infrastructure detail.
  - **Funding-model lesson**: organizational rather than interface/system design; the weakest design-against line of the six.
- **Territory Bridge ×0 (declined).** The T4-T3 sensor-fusion candidate is real at the taxonomy level (T3's premise literally names sensor arrays), but the prose never draws the line: no other territory is named, and the library's only T3 guide (dird-14, superconductors and gravity) shares no material with this guide. The brief forbids manufacturing implicit bridges; B.1 reached the same conclusion. Justin can overrule with a content decision later.
- **No dird-28 bridge surfaced.** The clock-sync Design Hook's operator-facing display idea is thematically adjacent to dird-28's cockpit-instrumentation territory, but the connection is thin (field-deployment checklists vs. pilot interfaces) and nothing in this guide's prose touches dird-28 material. Noted for the orchestrator as a non-actionable observation; dird-28 was not edited.
- **Second Read Next slot left open.** No other library guide appears in this guide's prose; the strongest thematic pair (uap-field-map) already holds slot one, reciprocally. A cross-territory pick would be navigation without a prose anchor.
- **Subguide queued ×0; recommendation for Justin's roadmap call:** if any of the three earns a queue slot, it's the **Galileo Project** (largest active program, richest methodology surface, already carrying full glossary treatments in both T4 guides). IFEX and VASCO read as glossary-level: each is a single-note program in this guide's prose. Default was not to add, and none were added.
- **`status: complete` left exactly as found.** No frontmatter changes beyond `description` and the glossary.

## Carry-forward flags (orchestrator lane)

- **`source.venue` redundancy: RESOLVED post-completion (orchestrator commit).** Justin confirmed on 2026-06-10 that arXiv is the paper's journal home; no published venue exists to research. `venue` trimmed from the full listing string (`arXiv:2312.00558v4 [astro-ph.IM]`) to `arXiv [astro-ph.IM]`, dropping the identifier already carried by `url` + `arxiv`. Closes the flag from B.1. The Writer-lane sweep itself did no venue work, per instruction.
- **`fig-N-` figure slug prefixes** remain (cosmetic only; renaming assets is out of lane). Flag carried forward.

## Verification

- Em-dash count 0 (was 69 characters across 45 lines); en-dash count 0 (was 11). `{#dark-spot}` anchor byte-identical, verified by grep.
- Sorted marker-census diff against HEAD: exactly the Cash-Landrum key swap; 38 resolved term nodes across 36 distinct keys, 36 glossary entries, 0 unused.
- Structure: 2 Design Hook, 1 Read Next, 0 Territory Bridge, 0 Subguide queued labels; 8 section anchors unchanged; inline gloss count 5 before and after, each verified synced (string occurs exactly twice).
- No ad-hoc scripts; verification ran exclusively through bounded greps and the npm gates per the locked workflow.
- `npm run audit:orphans`: 0 orphans across 0 guides (report regenerated with identical content).
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **uapx-field-methods leaves the pipeline clean.** Both passes complete; only the two carry-forward flags above remain, both orchestrator-lane.
- **Workstream B closes when this PR merges.** All eight guides have received both the B.1 format pass and the B.2 voice sweep.
