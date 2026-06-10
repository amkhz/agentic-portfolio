# Mission: B.1 content sweep — dird-13-warp-drive

**Date:** 2026-06-09
**Branch:** `feat/perihelion-b1-dird-13-warp-drive` (off main, after PR #72)
**Lane:** Workstream B.1 per-guide pipeline, second guide. Spec: `plans/perihelion-format-alignment-brief.md` + `plans/perihelion-b1-renderer-scope.md`. Template: `vector/missions/perihelion-b1-quantum-gravity.md`.

## Scope

`dird-13-warp-drive.md` arrived in the opposite condition from quantum-gravity: a rich 44-entry glossary and 43 `|term|` markers already in place, but zero callouts, zero inline glosses, a duplicate glossary key, and `figures: []` present against format rules. This sweep is the full B.1 retrofit on that base.

## What changed

- **Glossary: 44 entries in, 45 out.** Added `Hal Puthoff` (lead author, absent despite being the guide's spine; grounded in the guide's own prose and the Ecosystemic Futures corpus) and `Travis Taylor` (cited twice in body with no entry; "chief scientist, UAP Task Force" verified against `ecosystemic-futures/processed/ecosystemic-futures-podcast-summary.md`). Removed the unused lowercase `string theory` duplicate; the capitalized `String theory` key matches the body's sentence-start marker and stays. Shared-term check against quantum-gravity, dird-15, dird-14, and emergent-quantization: `Casimir effect` and `general relativity` definitions are substantively aligned with siblings already (per-guide framing, no contradictions), so nothing was rewritten fresh. `zero-point fluctuations` does not appear in this guide's body; no entry needed.
- **4 new `|term|` markers** on true first mentions: `|Hal Puthoff|` and `|dark energy|` in `#big-picture`, `|Harold White|` in `#negative-energy` (the prior sole marker sat at second mention in `#energy-reduction`; both now resolve), `|Travis Taylor|` in `#observables`. No prose rewritten to create marker opportunities. 47 resolved term nodes total.
- **3 inline definition glosses** (colon separator per renderer scope), only for terms the prose does not define in place: Casimir effect (`#negative-energy`), dynamic vacuum (`#negative-energy`), nitrogen lines (`#observables`). Sourced verbatim from the frontmatter entries; the Casimir gloss uses the first three sentences of its five-sentence entry. To keep glosses em-dash-free, one punctuation-only restructure was made in each of those three frontmatter entries (em-dash to semicolon, colon, or comma; zero wording changes).
- **8 callouts:**
  - Design Hook ×4 — the four bold-led paragraphs of the closing `#design-implications` section converted to proper callouts, prose verbatim, per the brief's conversion guidance
  - Read Next ×2 — DIRD 28 cockpits guide (in `#connections`, after its paragraph), emergent-quantization + quantum-gravity (in `#connections`, after the White dynamic-vacuum paragraph)
  - Territory Bridge — T1 to T3 via the blue-shift detection instrument (in `#connections`; the prose explicitly names it Territory 3's most shippable concept)
  - Subguide queued — DIRD 18 (Traversable Wormholes, Stargates, and Negative Energy), referenced twice in the guide, not in library or upcoming queue. DIRD 36 and DIRD 24 are also referenced but DIRD 36 already sits in `core/lab/upcoming.ts`; not duplicated.
- **`figures: []` removed** (format rules: omit the field when empty).

## Verification

- Parser sweep (throwaway tsx over `core/lab/parse-guide.ts`, not committed): all 8 callouts detect on the right variant, all 3 glosses detect as `definition` with correct terms, zero `plain` fall-throughs, zero parse warnings, 9 sections.
- `npm run audit:orphans`: 0 orphans.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing warning in `renderSection.tsx`), build green.

## Exit flags

- **`source.authors: Puthoff et al.`** carries the known open question from PRs #51/#60/#61. Left untouched, as settled.
- **`source.url` missing.** Allowed for DIRD-source guides per locked decision; no stable public URL for DIRD 13.
- **Em-dash density in inherited copy.** The body prose, most glossary definitions, the `description` field, and the `#observables` section title all carry em-dashes from the original conversion. Only the three glossed entries were touched (punctuation-only). The rest is B.2's lane.
- **Glossary entry length.** Several inherited definitions run 4 to 6 sentences against the 1 to 3 sentence rule (e.g. `one-to-one correspondence`, `Harold White`, `DIRD 28`). Trimming is content work; flagged for the B.2 pass.
- **B.2 next:** the guide now has a clean canonical structure for the voice sweep.
