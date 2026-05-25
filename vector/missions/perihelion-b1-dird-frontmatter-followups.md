# Perihelion B.1 — DIRD frontmatter follow-ups

**Workstream:** B.1 — Format alignment pass
**Owner:** Tyrell
**Branch:** `feat/perihelion-b1-dird-frontmatter-followups`
**Started:** 2026-05-25
**Status:** Complete; PR pending

---

## What

Cleanup pass behind PR #51 (the original DIRD frontmatter pass). PR #51 surfaced three secondary findings that didn't fit its mechanical scope — this pass triages them and lands the safe pieces.

## The three findings, re-grounded

PR #51's exit log flagged: (a) AAWSA-vs-AAWSAP spelling drift between source PDFs and the canonical spec, (b) `source.authors` drift on DIRDs 14 and 28 (carry the venue value in the authors slot), (c) ICOD-vs-publication-date typo on the DIRD 14 cover.

Investigating each:

**(a) AAWSA vs. AAWSAP.** Confirmed both forms are real and refer to the same DIA program. The PDFs themselves use **AAWSA** on the inside cover ("Advanced Aerospace Weapon System Applications (AAWSA) Program"). The canonical spec at `plans/perihelion-format-rules.md` uses **AAWSAP** ("Program" inside the acronym). PR #51 landed AAWSAP across all four DIRD `source.venue:` fields. Direction: stay with AAWSAP for internal consistency; sweep any remaining AAWSA occurrences into AAWSAP.

**(b) `source.authors` slot misuse on DIRDs 14 and 28.** Originally framed as "drift" — actually a real schema question. The PDF cover pages have personal-author lines FOIA-redacted under (b)(6), so we genuinely don't know the personal authors. The canonical spec says `source.authors` is "short form" (Knuth et al., Puthoff) — implying personal. Two options: institutional fallback (`DIA / AAWSAP Program`) or research-grounded personal credit. Justin flagged that Puthoff was likely an author of many DIRDs but that requires research before committing. **Deferred this pass** — the slot question stays open, framed now as a research question on Puthoff's involvement across the DIRD corpus rather than a mechanical fix.

**(c) DIRD 14 ICOD typo.** Confirmed via the previous mission log: DIRD 14's cover lists ICOD as 1 December 2010, dated *after* its 23 March 2010 publication. DIRDs 13 and 15 both have ICOD 1 December 2009; DIRD 14 is the outlier and appears to be a typo for 1 December 2009. This is a source-document fact — our `source.year: 2010` already captures publication correctly. Captured in-data via a `source.notes:` field that the parser silently ignores (it accepts but doesn't propagate unknown source keys). Preserved for future colophon work.

## What actually shipped

Three small edits:

- **`core/lab/upcoming.ts`** — Three `DIA / AAWSA Program` strings updated to `DIA / AAWSAP Program` (DIRD 36, DIRD 22, DIRD 31+20 placeholders). Pure spelling alignment with the canonical spec. No personal-author claim involved.
- **`core/lab/guides/dird-14-superconductors-gravity.md`** — Added `source.notes:` field capturing the ICOD typo. Parser ignores the field; lives in YAML as a future hook.
- **Memory** — Saved `reference_dird_pdf_authors_redacted.md` so future DIRD work doesn't chase phantom personal authors on the redacted covers.

## What did NOT ship

- **DIRDs 14 and 28 `source.authors:` field stays at `DIA / AAWSA Program`.** Spelling is wrong (should be AAWSAP for internal consistency) AND the slot itself may be wrong (institutional in a personal-author field). Both fixes deferred until the Puthoff authorship research lands. Touching it for spelling-only would commit the slot-misuse a second time; leaving the AAWSA spelling intact here makes the deferred question more visible at the next pass.
- **Plan update.** Plan file is on PR #59 (the plan-resync branch) with a newer version than what's on `main`. Updating here would conflict. The next plan resync after this PR + PR #59 both land will absorb the outcome.

## Verification

- `npm run lint` — clean (1 pre-existing `react-refresh/only-export-components` warning on `renderSection.tsx`, unchanged)
- `npm run test` — 102/102 pass across 7 test files
- `npm run build` — clean (TypeScript + Vite, 899ms)

## Follow-up flags

- **Puthoff authorship research.** Hal Puthoff was likely an author or co-author of many DIRDs beyond 13 and 15 — needs grounding from secondary literature, public records, or known disclosures before any `source.authors` slot is updated to claim personal authorship. Once grounded, DIRDs 14 and 28 (and possibly others) get accurate personal credit; if research dead-ends, the slot stays institutional with corrected AAWSAP spelling.
- **`source.notes` field schema.** Currently silent on the parser side. Future B.1 sub-pass or C.2 design work could promote it to a renderable field for source-document quirks (ICOD discrepancies, FOIA redaction notes, version histories). Low priority.
- **AAWSAP convention in upstream `~/projects/design-futures/sources/dird-technology-briefs.md`.** Uses AAWSA throughout. Upstream is owned by another Claude; flagged here so the next upstream sync agent can carry the decision back.
