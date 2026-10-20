# Handoff -- agentic-portfolio -- 2026-09-04

**Round:** Instant DSCR import, first browser grade. Continues
`2026-09-03-instant-dscr-import.md`, same branch, same PR.
**Seat/model:** Tyrell on Opus, pinned at launch.
**Branch:** `feat/instant-dscr-case-study` -> **PR #230 OPEN**, now 5 commits,
head `98e8b1b`, branched from `2470ea3`. **Nothing merged.**

---

## Done (verified)

**Justin graded the study in his own browser and gave three grades. All three
are acted on; three commits.**

**`6b4ff6d` -- auto-aspect figures lay out in flow.** His grade: the screenshots
"look weird, like their borders are stretched." Real bug, and it was mine from
the import. Every body figure was authored `aspect:auto`, which mapped to
`aspect-auto min-h-[200px]`; because `ImageBlock` positions its image
`absolute inset-0`, the image contributes no height, so the box collapsed to
200px at full column width. Measured in the live DOM: the finding board was
being contained inside a **1136x200** slot -- a 5.7:1 frame holding a 1.62:1
image, painting ~325px wide with ~400px of dead bordered space either side.
A non-`bare` figure at `auto` now lays out in normal flow (`block h-auto
w-full`, no ratio class). Re-measured after the fix: **1136x701** for the
1.62:1 board, **1136x790** for both 1.44:1 app shots, native ratios, zero
letterboxing. `bare` cover plates still fill their fixed slot and are untouched.

**`23aab8b` -- retitle, and undouble the contents numbering.** Two grades in one
commit:

- *"The contents are long and have double the numbers."* This was the **Contents
  index, not the prose.** The TOC numbers its own entries, and the import had
  promoted the source's `### 1.` / `### 2.` steps to `##` chapters (the parser
  has no `h3`), so every row rendered `04` + `1. I captured the real
  response...`. Prefixes stripped from the six step headings.
- *The title reads incongruent on the work index.* It ran roughly twice the
  length of every sibling. Title is now **`Instant Rate Buy-Up`**, matching
  `Instant Scope of Work` / `Instant Document Review`; the old title
  ("Designing the rate a borrower can actually reach.") drops into the subtitle,
  where a long descriptive line is the house norm. Verified on `/work`: the
  three Instant titles now read as one family.

**`98e8b1b` -- the study leads the selected work.** Justin's call: "nicest story
and screens." Moved to the front of `caseStudies`. Both `/work` and the home
selected list derive order **and** `Fig.NN` numbering from that array, so one
move does both surfaces. Verified in the DOM on both routes.

**Cover PASSED.** Justin graded the ragged-ladders board in its plate as-is. No
change; it stays `fit: 'contain'` for the reason recorded on the entry.

**Gates at `98e8b1b`:** `npm run build` clean (2.42s), **399/399** tests,
lint **0 errors** / 1 warning (the pre-existing `renderSection.tsx:16`
react-refresh one, unchanged baseline).

---

## Claimed but unverified

**None of the three fixes has been re-graded by Justin.** They are measured in
the DOM and gated, not eyeballed by him. His server was up on 5173 throughout;
a reload is all that is needed.

---

## Open threads

**Owed by Justin (grading, on #230):**
- The three fixes above, re-checked by eye.
- **The mark, the thumb, and the exploration row -- still never graded.** These
  were in the 2026-09-03 handoff's owed list and remain there.
- **The mark SEED was never put to him.** Standing correction, see the Wallace
  selection doctrine: Wallace defaults to Coworker mode and the seed sheet is
  Justin's pick, not the session's.

**Owed by Stelline -- the ask this handoff carries:**

> **Rethink the case-study titles site-wide.** Justin raised the incongruence
> and took the cheap half himself ("do the Instant Rate Buy-Up title swap **for
> now**"), then asked explicitly that the whole set be reconsidered. The set as
> it stands:
>
> | Slug | Title |
> |---|---|
> | `instant-dscr` | Instant Rate Buy-Up |
> | `design-infrastructure` | Design Infrastructure |
> | `ai-leadership` | Pioneering AI Adoption |
> | `doctrine-not-prompts` | Doctrine, Not Prompts |
> | `instant-sow` | Instant Scope of Work |
> | `instant-doc-review` | Instant Document Review |
> | `wallace` | Wallace |
> | `building-this-portfolio` | Building This Portfolio |
>
> The tension he named: three product titles are flat feature names, two are
> argument-shaped, one is a codename, one is literal. A descriptive title is
> more legible to a recruiter skimming; a family name is more congruent on the
> index. **Both directions were live and he picked neither permanently** -- the
> swap is explicitly "for now," and the entry's code comment says both fields
> stay open. This is naming across a public portfolio and it interacts with R3
> (the copy pass) and with `/impeccable init`, so it wants a decision round, not
> a drive-by. Titles and subtitles both live in `core/content/case-studies.ts`.

**Deferred to R3 by measurement, not by taste:** the Contents index is still
long -- **11 entries, avg 35 chars, longest 60**, against instant-sow's
**6 / 18 / 30**. Halving that means rewriting headings into noun phrases, which
is copy, and copy is Justin's hands with gaff marking up. Recorded so R3 does
not have to rediscover the numbers.

**Unchanged from the import handoff:** the two decided-not-built items (frame
the dual-mode assets; About `h1`) still sit ahead of R3.

---

## Gotchas learned

**`aspect:auto` was a trap, and the trap is a class.** An absolutely positioned
image contributes no height, so any "auto" sizing that depends on the image
sizing its own box silently collapses. The failure presents as a *border*
problem, not a *sizing* problem, which is why it survived my own pass and
needed Justin's eye. The general rule stands and now has a third instance
behind it: **a figure's aspect is a measurement, not a judgment.**

**The 2-up `comparison` fence hardcodes `4:3`**, so an outlier letterboxes
inside its cell. Computed for the exploration row: the 1.93:1 board loses
**31%** of its cell, while the ~1.3:1 boards lose 1-3%. Left alone this round --
it is one cell in a small row and Justin has not graded it yet -- but if he
flags it, the fix is an optional aspect on the fence, not a per-asset re-crop.

**Editing `case-studies.ts` by slug is unsafe.** `slug: 'instant-dscr'` appears
twice: once as the top-level entry and once inside the hub's `bodyOfWork`
cross-link. A first reorder attempt matched the hub's copy, extracted the wrong
entry, and silently reinserted it in place -- the script reported success and
the file was byte-identical. Match the top-level indentation
(`    slug: '...'`, four spaces) and assert the file actually changed.

**The round was paid for twice.** This session re-derived the entire import from
scratch -- images, drafts, parser fix, registry -- before noticing the branch
already carried it as PR #230. The memory note in context said "#230 open" and
that was not reconciled against the branch first. No damage (the rebuild came
out identical, so the working tree held only the new fixes), but the rule is
worth writing down: **a memory line naming an open PR means the work exists on
the branch; read it before building it.**

---

## Pickup prompt

```
Portfolio -- finish grading PR #230 (Instant Rate Buy-Up) and merge it.

Fresh session, Tyrell. The branch is feat/instant-dscr-case-study, 5 commits,
head 98e8b1b, branched from 2470ea3. Nothing merged. Justin's dev server is
usually already up on 5173 -- do not boot a second one.

READ FIRST:
1. vector/handoffs/2026-09-04-instant-dscr-grade-round.md -- this file. The
   three grades already taken and what each fix actually did.
2. vector/handoffs/2026-09-03-instant-dscr-import.md -- the import round it
   continues (allowlist, the eight interview rulings, what entered the repo).
3. ~/projects/plans/2026-07-30-portfolio-craft-arc.md -- decisions 4-15 bind.

STATE: cover PASSED. Screenshots, contents numbering and title are FIXED and
gated (build clean, 399/399, lint 0 errors) but NOT re-graded by Justin.

DO:
1. Stand the branch up and get Justin's eye on, in this order: the three fixed
   screenshots at their new flow heights, the Contents index, the work index
   and home order with the study leading.
2. Then the three things never graded at all: the drafted-object MARK beside
   the contents, the square THUMB on the work index, and the four-board
   exploration row. On the mark, the seed sheet is Justin's pick -- show it
   before rendering anything, and do not re-render on your own judgment.
3. Take his rulings, build them, re-gate, merge #230, prune the remote branch.
4. Do NOT touch prose. The voice pass is R3, Justin's hands, gaff marks up.
   The Contents index is still long (11 entries, avg 35 chars, vs instant-sow's
   6 / 18 / 30) -- that is R3 material, recorded, not this round's work.
5. Do NOT re-open the title question. Justin handed it to Stelline as a
   site-wide decision round; "Instant Rate Buy-Up" is explicitly "for now."

AFTER #230 merges: the two decided-not-built items (frame the dual-mode assets
per the 2026-08-27 ruling; About h1 to text-4xl), then R3-prep -- the honesty
interview on the EXISTING case studies, Stelline in chat, per study.
```
