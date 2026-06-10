# Mission: B.2 voice sweep, dird-13-warp-drive

**Date:** 2026-06-09
**Branch:** `feat/perihelion-b2-dird-13-warp-drive` (off main, after PR #76)
**Lane:** Workstream B.2 per-guide pipeline, second guide. Calibration target: `core/content/voice-profile.md` (Phase 3.1). Template: `vector/missions/perihelion-b2-quantum-gravity.md`. Scope set by the exit flags of `vector/missions/perihelion-b1-dird-13-warp-drive.md` (PR #75).

## Scope

Voice sweep of `core/lab/guides/dird-13-warp-drive.md` against the voice profile. Register: a reader's notebook that opens the door for designers who have never considered frontier science. Invitational, no gatekeeping, no permission framing. Everything B.1 settled stayed settled: all 47 `|term|` markers preserved verbatim, all 8 callouts on their variants and all 3 definition glosses intact, 9 sections with identical anchors and levels, all frontmatter untouched except `description` and glossary definition text (the one frontmatter area in B.2's lane per the B.1 exit flags).

## What changed

- **Em-dashes: 78 to 0** (across 58 lines). Sentences were restructured (appositive commas, parentheticals, sentence splits, colons, semicolons) rather than swapped to other dash characters. Zero en-dashes introduced. This covered body prose, the `description` field, glossary definitions, and four Design Hook callouts that carried inherited dashes.
- **`#observables` heading de-dashed.** "Observable Consequences — What You'd See" became "Observable Consequences: What You'd See". The `{#observables}` anchor and all other anchors are byte-identical.
- **Glossary length pass: 33 entries trimmed** from 4 to 6 sentences down to the 1 to 3 sentence rule, keeping the substance (including the flagged `one-to-one correspondence`, `Harold White`, and `DIRD 28`; the DIRD 28 trim also dropped a stale "next guide in the build sequence" line that the Read Next callout supersedes). 6 more entries got punctuation-only de-dashing. 6 entries untouched (`Hal Puthoff`, `Miguel Alcubierre`, `Van Den Broeck`, `dynamic vacuum`, `Travis Taylor`, `UAP detection instrument`).
- **Gloss sync maintained.** The trimmed `Casimir effect` entry (5 sentences to 3) propagated to its body gloss, which now carries the full 3-sentence entry verbatim. `nitrogen lines` was trimmed by merging its last two sentences, leaving the glossed first two sentences byte-identical; `dynamic vacuum` was untouched. All 3 glosses still detect as `definition` with correct terms.
- **Contractions normalized** where prose drifted formal: "energy that is literally less than zero" to "energy that's", "This is not an illusion" to "This isn't an illusion", "This is not an altimeter" to "This isn't an altimeter", "cannot resolve" to "can't resolve", "It is the leading candidate" to "It's" (String theory entry).
- **Rhythm work.** Short declarative landings after long thoughts ("Technically, it never exceeds |c| locally. Space is doing the moving." / "This isn't an illusion. It's a genuine geometric property of the spacetime."). The dark-energy mechanism paragraph now lands on a sentence-starting-And close ("And that's exactly what Puthoff's framework and White's dynamic vacuum model propose."). The paper-fold analogy in `#extra-dimensions` became an imperative ("Fold the paper through the third dimension and they can be brought together.").
- **Stakes-landing moments kept declarative and humor-free** per the profile: "The question isn't whether the physics allows it. The question is whether the engineering is achievable.", the milligrams-never-produced honest assessment, and the physically-absurd-to-physically-constrained close.
- **No audience-naming line added.** The opener's "can we engineer the fabric of spacetime itself" already carries the piece's inclusive-we moment; the Design Hooks speak through the operator. Adding another would exceed the Phase 3.1 frequency cap.
- **No permission framing introduced or found.**

## Verification

- Em-dash count: 0 in the full file (was 78 characters across 58 lines); en-dash count also 0.
- Marker integrity: `|term|` marker list before and after is byte-identical (47 markers, diff clean).
- Parser sweep (throwaway tsx, not committed): 9 sections with identical anchors, 8 callouts on the right variants (design-hook x4, read-next x2, territory-bridge, subguide-queued), 3 definition glosses detecting as `definition` with correct terms (Casimir effect, dynamic vacuum, nitrogen lines), 47 resolved term nodes, 45 glossary entries, zero plain fall-throughs, zero parse warnings, zero emojis.
- `npm run audit:orphans`: 0 orphans.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **`source.authors: Puthoff et al.`** still carries the known open question from PRs #51/#60/#61. Untouched, as settled.
- **`source.url` still missing.** Allowed for DIRD-source guides per locked decision; unchanged here.
- **Guide `status: draft`** is unchanged. With B.1 and B.2 both complete, whether this guide flips to `complete` is Justin's call at plan resync.
- **Next guide in the B.1/B.2 pipeline** can follow the same template: B.1 structure sweep first, voice sweep second, parser baseline carried between them.
