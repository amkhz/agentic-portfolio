# Handoff -- agentic-portfolio -- 2026-09-14

**Round:** Instant DSCR, the final visual grade. Continues
`2026-09-04-instant-dscr-grade-round.md`, same branch, same PR.
**Seat/model:** Tyrell on Opus, pinned at launch.
**Branch:** `feat/instant-dscr-case-study` -> **PR #230 OPEN, left open by ruling.**
Nothing merged: nothing goes live before the voice pass, and merging main
deploys the site.

---

## Done (verified)

**The visual grade of #230 is complete. Every item passed; no code changed.**
Justin graded in his own browser on :5173 and answered in chat on 2026-09-14:

| Item | Ruling |
|---|---|
| Finding board and both app shots at flow height | **Pass** ("yes, all good") |
| Contents index, single-numbered | **Pass** |
| `/work` and home with the study leading | **Pass** |
| Drafted-object mark | **8303 kept.** No longer provisional; it is the pick. |
| Square thumb beside its four siblings | **Pass as-is**, shown the signature corner and the extra margin first |
| Four-board exploration row | **Leave it.** Four equal 4:3 cells, A sits smaller. |

The mark went to him Coworker-mode: the caption summarized first, then the
8301/8302/8303 sheet, then the thumb row beside SOW, Doc Review, Design
Infrastructure and Wallace. The pick was his.

**Measured on his server at 1440 before asking** (head `7f07444`): board image
1134x699, app shots 1134x788 each, 11 Contents entries numbered `01`-`11` once,
exploration cells 552x414.

**Gates re-run at `7f07444`:** lint **0 errors / 1 warning** (the pre-existing
`renderSection.tsx:16` react-refresh one), build clean (2.61s), **399/399**
tests across 48 files.

**Main has not moved.** `origin/main` is still `2470ea3`, so the branch needs
no rebase to stay mergeable. No image changed, so the allowlist grep was not
re-run; Stelline's 2026-09-04 result stands.

**This handoff is the round's only commit.**

---

## Claimed but unverified

None. The rulings are Justin's own eyes; the measurements and gates are above.

---

## Open threads

**#230 stays open through, in order:**
1. **The site-wide title round.** Stelline + Justin, in chat. "Instant Rate
   Buy-Up" is "for now"; the full title table is in the 2026-09-04 handoff.
2. **The voice pass on `core/content/instant-dscr.md`.** Gaff marks up, Justin
   rewrites: the em-dashes, and the Contents headings into noun phrases
   (still 11 entries, avg 35 chars, longest 60, vs instant-sow's 6 / 18 / 30).
3. **Roy audit** on the branch.
4. **Justin merges.**

**Beside that, not inside it:** the two decided-not-built items (frame the
dual-mode assets per the 2026-08-27 ruling; About `h1`), and the R3-prep
honesty interview on the EXISTING studies.

**Not raised, still unanswered:** whether `instant-sow` should also point its
singular `relatedStudy` at this study. A one-line registry change if Justin asks.

---

## Gotchas learned

**Grading questions must be plain language with a picture of the exact spot.**
The first question batch named figures by pixel size and mechanism ("1136x701
flow heights", "1.93:1 in a 4:3 cell", "optional aspect on the comparison
fence"). Justin answered two of the four with "what exactly am I grading?" and
"I don't understand what you are asking here." The re-ask that worked: name the
thing by what it shows ("the board headed Every product's ladder stops in a
different place"), recall his own words from the last grade, send an image of
the spot, and offer outcomes instead of implementations.

**The prior handoff's exploration-row fix was wrong.** The comparison fences
pair A with B and C with D. A is 1.93:1 and B is 1.30:1, so any single aspect on
that fence moves the letterboxing from A onto B. The only real alternative to
equal cells is letting each cell size to its own board, which leaves the row at
uneven heights. Moot now (he ruled "leave it"), but do not re-propose the
fence-aspect fix.

**The square thumb does NOT clear Ideogram's baked signature.** The 2026-09-03
handoff said it did. It is faint but visible at lower right. Justin saw it and
passed the thumb anyway, so this is a record correction, not an open item.

**The committed mark and thumb are not a pure downscale/crop of the raw 8303
PNG.** A Lanczos downscale of the 832x1040 source to 604x755 scores a mean
absolute pixel error of about 8 against the committed mark, and the best square
window about 6.7 (at y=60), well above an exact match. Some tone or framing step
happened in the import. Moot while 8303 stands, but any future regeneration
must re-derive the recipe rather than assume one.

**The Browser pane tab can navigate itself mid-script.** A `location.reload()`
inside a measurement script landed the tab on `/` and the pane reported the
viewport as set by "another Claude session." Navigate explicitly, then measure
in a separate step, and confirm `location.pathname` in the result.

---

## Pickup prompt

```
Portfolio -- voice pass on the Instant Rate Buy-Up study (PR #230). Runs
AFTER Stelline's site-wide title round with Justin; do not start before
that round has ruled.

Fresh session, Tyrell on Opus, pinned at launch, running gaff's lane. Justin's
dev server is usually already up on 5173 -- do not boot a second one.
THIS SESSION DOES NOT MERGE. Merging main deploys the site.

READ FIRST:
1. vector/handoffs/2026-09-14-instant-dscr-final-grade.md -- visual grade
   complete, every item passed, mark 8303 final.
2. vector/handoffs/2026-09-04-instant-dscr-grade-round.md -- the title
   table and the Contents measurements.
3. The title round's ruling (from Stelline). Apply its title/subtitle to
   core/content/case-studies.ts ONLY as ruled.
4. ~/projects/plans/2026-07-30-portfolio-craft-arc.md -- decision 1
   (IDE-direct: gaff marks up, Justin rewrites) and decisions 4-15 bind.

STATE: feat/instant-dscr-case-study, head = this handoff's commit on top of
7f07444, off main 2470ea3. PR #230 OPEN. Gates at 7f07444: lint 0 errors /
1 pre-existing warning, build clean, 399/399.

DO:
1. Run gaff on core/content/instant-dscr.md: a marked-up critique, not a
   rewrite. Targets: every em-dash, the Contents headings as noun phrases
   (11 entries, avg 35 chars, longest 60; instant-sow is 6 / 18 / 30), AI
   tells. Protect the four load-bearing voice elements.
2. Hand Justin the markup. He rewrites in the IDE with the dev server
   hot-reloading. You do not rewrite prose.
3. After his pass: the mechanical sweep only (typos, broken markdown, list
   items that wrap across lines and silently end the list, a `##` above a
   list). Re-gate: lint, build, test.
4. Commit AND push, records included. Leave #230 OPEN. If main moved, bring
   main into the branch so it stays mergeable.
5. /handoff to Stelline. Next on the branch: Roy audit, then Justin merges.

DO NOT:
- Rewrite prose, or re-open anything the visual grade passed (mark 8303,
  thumb, exploration row, figures, index order).
- Merge, or ask Justin to merge.
- Answer the instant-sow relatedStudy question unless Justin raises it.
```
