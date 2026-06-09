# Mission: B.2 voice sweep, quantum-gravity

**Date:** 2026-06-09
**Branch:** `feat/perihelion-b2-quantum-gravity` (on main, after PR #72)
**Lane:** Workstream B.2 per-guide pipeline, first guide. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Posture: high-quality wholesale per guide (locked decision Q5).

## Scope

Prose-only voice sweep of `core/lab/guides/quantum-gravity.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: frontmatter untouched, all 20 `|term|` markers preserved verbatim, all 3 definition glosses and all 5 callouts untouched, 7 sections with identical anchors and levels.

## What changed

- **Em-dashes: 41 to 0.** The inherited prose was em-dash-heavy. Sentences were restructured (appositive commas, parentheticals, sentence splits, colons, two semicolon pairs for the Puthoff contrast lines) rather than swapped to other dash characters. Frontmatter, glosses, and callouts already carried zero.
- **Two heading texts de-dashed.** The paper headings dropped their em-dash separators for parentheticals: "Paper 1 (ANU):" and "Paper 2 (White et al.):". Anchors `{#anu}` and `{#white}` unchanged.
- **Contractions normalized** where the prose had drifted formal: "It does not claim" became the "It doesn't claim" triple in `#scope`, "That is what" became "That's what" in `#connections`.
- **Rhythm work.** Short declarative landings after long thoughts ("And they're fundamentally incompatible." / "Angular momentum quantization isn't postulated. It emerges..."). The oversized implications-chain paragraph in `#connections` split in two at the validation pivot. A rhetorical-question transition added in `#scope` ("So where would this framework give different answers than standard QM?").
- **Stakes-landing moments kept declarative and humor-free** per the profile: "Not approximately. **Exactly.**", the key-move paragraph, and the plausibility-landscape close. The two-countries telescope metaphor in `#gap` kept as-is; it already carries the synthesis.
- **No permission framing introduced or found.** "In plain terms" framing retained as translation, not gatekeeping.

## Verification

- Em-dash count: 0 in the full file (was 41, all in body prose).
- Marker integrity: `|term|` marker list before and after is byte-identical (20 markers, diff clean).
- Parser sweep (throwaway tsx, not committed): 7 sections, 5 callouts on the right variants (design-hook, territory-bridge, subguide-queued, read-next x2), 3 definition glosses detecting as `definition` with correct terms (Rarity-Tapster interferometer, weak equivalence principle, stochastic electrodynamics), zero plain fall-throughs, zero emojis.
- `npm run audit:orphans`: 0 orphans.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning), build green.

## Exit flags

- **Kicker deviation still open** from B.1: `kicker: "Synthesis Guide"` remains outside the two active values. Frontmatter is out of B.2 scope; still awaiting Justin's call.
- **`source.url` still missing** (one slot, two papers). Deferred at B.1; unchanged here.
- **Audience-naming close not added.** The guide ends on the Design Hook callout (untouched, already carries "we"). Adding a second audience-naming line in body prose would exceed the Phase 3.1 frequency cap of one per piece.
- **Next guide in the B.1/B.2 pipeline** can follow this template: B.1 structure sweep first, voice sweep second, parser baseline carried between them.
