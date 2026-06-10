# Mission: B.2 voice sweep, dird-28-breakthrough-cockpits

**Date:** 2026-06-10
**Branch:** `feat/perihelion-b2-dird-28-breakthrough-cockpits` (off main, after PR #99)
**Lane:** Workstream B.2 per-guide pipeline, sixth guide (last DIRD). Calibration target: `core/content/voice-profile.md` (Phase 3.1). Templates: `vector/missions/archive/perihelion-b2-dird-15-vacuum-spacetime-engineering.md` (primary) plus the earlier archived B.2 logs. Scope set by the exit flags of `vector/missions/archive/perihelion-b1-dird-28-breakthrough-cockpits.md` (PR #94).

**Provenance note:** the Writer-lane agent completed the full edit pass on the guide and confirmed the diff against scope, then stalled before the gate run (stream watchdog, no progress for 600s). The orchestrator verified the diff against every scope item with bounded greps, ran the four gates, authored this log from the diff, and committed. The guide edits are the agent's; the verification and this document are the orchestrator's.

## Scope

Voice sweep of `core/lab/guides/dird-28-breakthrough-cockpits.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: callout census unchanged (5 Design Hook, 2 Read Next, 1 Subguide queued, Territory Bridge deliberately at zero), all 3 inline glosses intact, 7 sections with identical anchors, frontmatter untouched except glossary text and the entry add below. Scope per the PR #94 exit flags: the 51 em-dash lines including the five verbatim Design Hook bodies; glossary compression to the 1-to-3 sentence rule; second-person rework in two entries; three marker-gap prose touches; discretion on two declined gloss candidates.

## What changed

- **Em-dashes: 68 to 0** (across 51 lines, frontmatter glossary and body both, including the five Design Hook callout bodies that arrived from B.1 as verbatim conversions of the closing design-implications section). Sentences restructured (splits, appositive commas, parentheticals, colons) rather than swapped to other dash characters. En-dashes were already at zero and stayed there.
- **Glossary length pass: all 48 inherited entries rewritten or trimmed** from the inherited 3-to-6 sentence register to the 1-to-3 sentence rule, each kept grounded in the guide's own content. A rough sentence-boundary scan now shows zero entries over 3 sentences.
- **Second-person address removed from `meditation chamber` and `TransDimensional Mapping`** (the invitational-posture flag). Both entries now carry the house register with zero second-person pronouns; no permission framing introduced or found anywhere in the sweep.
- **Marker-gap flags closed (all three):**
  - `Hal Puthoff` glossary entry added (glossary 48 to 49) with a new `|Hal Puthoff|` marker at the Ep 86 craft-without-technology speculation in `#consciousness-interfaces`, resolving the possessive-mention gap. Marker census 48 to 49; the other 48 markers are byte-identical to B.1's output.
  - The `|Category A spatial disorientation|` marker now leads: its first body occurrence (in `#flight-without-g-forces`) precedes the plain "Category A spatial disorientation" mention in `#sensory-deprivation`. Remaining earlier hits are frontmatter glossary text only, which carries no markers by design.
  - Birdie Jaworski is now identified at the top of the `TransDimensional Mapping` entry ("Birdie Jaworski's remote viewing methodology"), and the synced body gloss for TDM carries that identification into the rendered body, closing the glossary-only identification gap.
- **Five Design Hook bodies reworked in voice** as part of the em-dash pass: prose tightened, de-dashed, put on the profile's rhythm; bold-led labels, markers, and callout structure unchanged.
- **Gloss sync maintained:** all 3 inline glosses still resolve as definitions (count 3 before and after); the TDM body gloss was re-synced to its rewritten glossary entry.

## Decisions

- **Declined gloss candidates `sensor fusion` and `progressive disclosure`: left as marked terms only** (B.2 discretion per the B.1 exit flag). Both already carry `|term|` markers and glossary entries; adding inline glosses would put three glossed terms within two adjacent paragraphs of `#information-display`. Drill-down on the markers covers the curious reader.
- **Territory Bridge stays at zero, untouched.** Justin blessed the ×0 on 2026-06-10: no body prose draws a genuine cross-territory line, and fabricating one is worse than none. Standing posture is opportunistic; if a future pass (or the uapx-field-methods work) surfaces a real bridge, it rides as a small content commit then.
- **`status: draft` left in place by the sweep.** The flip to `complete` follows as a separate orchestrator commit on this branch with gates re-run, per the dird-15 precedent (PR #96, 920518c), pre-authorized this session.

## Verification

- Em-dash count: 0 in the full file (was 68 characters across 51 lines); en-dash count 0 (was 0). No `--` doubles anywhere.
- Marker integrity: sorted marker-census diff against HEAD shows exactly one addition (`|Hal Puthoff|`); 49 resolved term nodes across 49 distinct terms, 49 glossary entries, 0 unused.
- Structure: callout label census identical to HEAD (5 Design Hook, 2 Read Next, 1 Subguide queued); 7 section anchors unchanged; inline gloss count 3 before and after.
- No throwaway parser scripts; structural checks ran through the npm scripts plus bounded grep.
- `npm run audit:orphans`: 0 orphans across 0 guides.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green. Re-run after the status flip commit.

## Exit flags

- **Territory Bridge ×0 is now a blessed state, not an open question.** Carried forward only as an opportunistic watch item; nothing pending.
- **B.2 is now DIRD-complete.** All six DIRD guides have had both passes. Remaining in the pipeline: `uap-field-map` (B.1 shipped as PR #100 in this same pair; B.2 pending with a heavy exit-flag list) and `uapx-field-methods` (untouched, last guide to enter).
- No other new flags raised; this guide leaves the pipeline clean.
