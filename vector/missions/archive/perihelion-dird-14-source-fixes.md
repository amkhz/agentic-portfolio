# Perihelion — dird-14 source fixes (touch-up)

**Workstream:** B.1 follow-up (deferred items)
**Owner:** Tyrell
**Branch:** `feat/perihelion-dird-14-source-fixes`
**Started:** 2026-06-09
**Status:** Complete; PR pending

---

## What

Surgical three-fix pass on `core/lab/guides/dird-14-superconductors-gravity.md`, closing the deferred items logged in `plans/perihelion-next-steps.md` (Open / in flight). Authorized by Justin. No voice edits, no glossary edits, no other frontmatter changes; `status: complete` untouched.

## The three fixes

1. **`source.authors` slot resolved — institutional fallback branch.** Applied the decision tree from `vector/research/dird-authorship.md`: DIRD 14 is absent from Justin's working table, and the note's open-questions section records it as a dead end ("Institutional fallback may be the right answer if no personal author surfaces"). No personal author has surfaced since; the cover's personal-author line is FOIA-redacted ([[reference_dird_pdf_authors_redacted]]). So the slot ships as the canonical institutional fallback: `DIA / AAWSAP Program`. (Archive note: this log originally called DIRD 28 the only remaining deferred slot; the sibling PR #94 agent resolved dird-28 the same way in parallel, so the deferral closed entirely with this pair.)
2. **AAWSA → AAWSAP in the source block.** The PR #85 flag. Same line as fix 1: the old `authors: DIA / AAWSA Program` carried the no-P spelling; the corrected value uses AAWSAP, matching `source.venue` and the canonical-spec convention locked in PR #51/#60.
3. **Duplicate `|Josephson junction|` marker in `#morningbird`.** The PR #90 leftover: one paragraph carried two resolving markers for the same term (the second came from the singularized SQUIDs parenthetical edit). Un-marked the second occurrence only ("The Josephson junction quantum detectors..."), leaving plain prose. First marker and glossary entry untouched.

## Verification

- `npm run lint` — clean
- `npm run build` — clean
- `npm run test` — pass
- `npm run audit:orphans` — clean (glossary entry still resolved by the first marker)

## Follow-up flags

- DIRD 28's `source.authors` slot was resolved in parallel by PR #94 (same institutional-fallback branch); no authors slot remains deferred anywhere in the library.
