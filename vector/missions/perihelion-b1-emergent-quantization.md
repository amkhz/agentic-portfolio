# Mission: B.1 content sweep — emergent-quantization

**Date:** 2026-06-09
**Branch:** `feat/perihelion-b1-emergent-quantization` (off main, after PRs #72 and #75)
**Lane:** Workstream B.1 per-guide pipeline, third guide. Spec: `plans/perihelion-format-alignment-brief.md` + `plans/perihelion-b1-renderer-scope.md`. Templates: `vector/missions/perihelion-b1-quantum-gravity.md`, `vector/missions/perihelion-b1-dird-13-warp-drive.md`.

## Scope

`emergent-quantization.md` is the deep dive on the White et al. dynamic-vacuum paper and arrived in the dird-13 profile: a rich 38-entry glossary and full `|term|` marker coverage already in place, but zero callouts, zero inline glosses, an empty `source.url`, and `figures: []` present against format rules. This sweep is the full B.1 retrofit on that base.

## What changed

- **`source.url` filled.** The White paper's canonical link (`https://journals.aps.org/prresearch/abstract/10.1103/l8y7-r3rm`, Phys. Rev. Research 8, 013264) was lifted from quantum-gravity's `source.notes`, where PR #73 parked it. No `arxiv:` sub-field added: the `arxiv: "2502.12392"` recorded in quantum-gravity belongs to the lead ANU paper, and no arXiv id is recorded anywhere for the White paper. quantum-gravity itself is untouched.
- **Glossary: 38 entries in, 38 out.** Audit found no duplicate keys, no unused entries (all 38 are referenced by markers), and no missing entries for terms the body leans on. The only borderline gap is `dynamic vacuum` (title and section header only; the `#vacuum` prose never uses the literal lowercase phrase, so adding an entry would require prose rewriting, which is B.2's lane). Shared-term alignment check against quantum-gravity (quadratic dispersion, dispersion relation, Madelung hydrodynamics/transformation, quantum potential, stochastic electrodynamics, Casimir effect): substantively aligned with per-guide framing, no contradictions; nothing rewritten. Expected, since the quantum-gravity sweep authored its entries against this guide.
- **0 new `|term|` markers.** First-mention coverage was already complete: every one of the 38 glossary terms is marked at its true first body mention, and no capitalized sentence-start occurrences precede a marked mention. 38 resolved term nodes total.
- **3 inline definition glosses** (colon separator per renderer scope), only for terms the prose does not define in place: Casimir effect (`#vacuum`), Coulomb problem (`#ingredient-2`), stochastic electrodynamics (`#so-what`). Sourced verbatim from the frontmatter entries. To keep the Casimir gloss em-dash-free, one punctuation-only restructure was made in that frontmatter entry (em-dash to semicolon, zero wording changes), per the dird-13 precedent. The Coulomb and SED entries were already em-dash-free.
- **1 callout:**
  - Read Next — quantum-gravity (closing `#so-what`, after the caveat paragraph about future tests). Mirrors quantum-gravity's `#white` Read Next back to this guide: that one is the synthesis view, this one is the engine room.
  - No Design Hook: the guide has no bold-led design-implication paragraphs to convert (the only bold-led paragraphs are the `#emergence` structure labels and the `#so-what` caveat). Surfacing a design implication from the `#so-what` engineering-applications prose would be new content, not a conversion; left for B.2/Justin.
  - No Territory Bridge: the prose is pure T1 physics walkthrough and draws no explicit cross-territory connection; not manufactured per the brief.
  - No Subguide queued: zero DIRDs referenced in the body (verified by grep), so nothing to queue against the library or `core/lab/upcoming.ts`.
- **`figures: []` removed** (format rules: omit the field when empty).

## Verification

- Parser sweep (throwaway tsx over `core/lab/parse-guide.ts`, not committed): all 4 blockquote additions detect on the right variant (3 `definition` with correct terms, 1 `read-next`), zero `plain` fall-throughs, zero parse warnings, 7 sections with anchors unchanged, 38/38 glossary entries referenced.
- `npm run audit:orphans`: 0 orphans.
- Gates: 102/102 tests, lint 0 errors (1 pre-existing fast-refresh warning in `renderSection.tsx`), build green.

## Exit flags

- **Em-dash density in inherited copy.** The body prose and most glossary definitions carry heavy em-dash usage from the original conversion (36 lines in the file). Only the glossed Casimir entry was touched (punctuation-only). The rest is B.2's lane.
- **Glossary entry length and register.** Several inherited definitions run 3 to 5 long sentences against the 1 to 3 sentence rule (e.g. `speed of sound`, `Madelung hydrodynamics`, `quantum potential`, `evanescent`, `Rydberg formula`, `pilot-wave`). The `quadratic dispersion` entry also shouts "SQUARE" in all caps. Trimming and register are content work; flagged for B.2.
- **No Design Hook in the guide.** The only library guide so far to exit B.1 without one. If Justin wants a hook anchored on the vacuum-engineering implication in `#so-what`, that is a B.2 content add.
- **`dynamic vacuum` glossary gap.** dird-13 carries an entry for it; this guide (whose title leads with it) does not, because the body prose never uses the literal phrase. A B.2 prose touch in `#vacuum` would create the marker opportunity.
- **B.2 next:** the guide now has a clean canonical structure for the voice sweep.
