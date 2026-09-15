# Roy's Review: PR #233, plate round 4 (feat/plate-round-4)
Date: 2026-09-15
Range reviewed: origin/main (2340ef7) ... origin/feat/plate-round-4 (70e6aae); commits f636120 scope, e8252b9 W1 + N2, 70e6aae records. Light audit, Round 4 of the 0004 trial, lane 2 (GPT-6 Astra, medium). Model at audit: claude-fable-5-1.

## Verdict: SHIP. Justin merges #233, before #230; no conflict either way.

Scope is exactly the two ruled figures, W1 closes with nothing rendered changed, N2 is a real regression test. Nothing holds it. Justin's own grade on :5173 is the only thing still owed, and this audit does not wait on it.

## Files reviewed
- `core/content/ai-leadership.md:11` (layer: core, content)
- `core/content/instant-sow.md:39` (layer: core, content)
- `core/content/parse-case-study.test.ts` (layer: core, test)
- `src/styles/globals.css:21` (layer: src, the `@theme inline` registration block; tokens.css untouched)
- `src/components/content/ImageBlock.tsx:91` (layer: src)
- `src/components/content/ImageBlock.test.tsx` (layer: src, test)
- `src/components/content/renderSection.test.tsx:18` (layer: src, test)
- `vector/handoffs/2026-09-15-round-4-plate-scope.md` (records, outside the layers)

Eight files, 123 insertions, 6 deletions. `git diff --check` clean. No image, manifest, token value, AGENTS.md, or `.codex` change. Base is main 2340ef7, the tip Stelline stated.

## What was verified, by the packet's numbers

**1. Scope.** `git grep plate:` on the branch's `core/content/*.md` returns five directives: the three from Round 3 (before-flow, sow-flow-diagram, detail-ops) plus `ai-leadership.md:11` (diagram.png) and `instant-sow.md:39` (feature-flow.png). Main has three. None of the other fourteen figures in the Round 3 scope list gained a directive. The diff on `core/content/*.md` is two lines, each inserting `plate:dark` between `aspect:16:9` and `placeholder:`, matching the parser's directive slice.

Reproduced six of the handoff's eight DOM rows on a scratch checkout of 70e6aae (port 5199, Chromium, the Round 3 method: outer plate element and the contained image element, CSS pixels, insets include the 1px border):

| Route / asset | Mode | Width | Outer | Image | Insets | Computed background |
|---|---|---:|---|---|---|---|
| /work/ai-leadership / diagram.png | night | 1440 | 1136x639 | 1086x589 | 25/25/25/25 | `oklch(0.26 0.013 88)` |
| /work/ai-leadership / diagram.png | day | 1440 | 1136x639 | 1086x589 | 25/25/25/25 | `oklch(0.235 0.012 88)` |
| /work/instant-sow / feature-flow.png | night | 1440 | 1136x639 | 1086x589 | 25/25/25/25 | `oklch(0.26 0.013 88)` |
| /work/instant-sow / feature-flow.png | day | 1440 | 1136x639 | 1086x589 | 25/25/25/25 | `oklch(0.235 0.012 88)` |
| /work/instant-sow / feature-flow.png | night | 390 | 358x201.375 | 332x175.375 | 13/13/13/13 | `oklch(0.26 0.013 88)` |
| /work/instant-sow / feature-flow.png | day | 390 | 358x201.375 | 332x175.375 | 13/13/13/13 | `oklch(0.235 0.012 88)` |

Every number matches the handoff's table. No horizontal overflow in any row. The outer element carries `bg-figure-plate` in all six. Not reproduced: diagram.png at 390 (two rows); same component, same token, no reason to expect a different result.

**2. W1 closes.** The registration is one line at `globals.css:21`, `--color-figure-plate: var(--theme-figure-plate);`, placed in the `bg-*` group next to `--color-bg-subtle`, which is where a reader looks. The consumer is `bg-figure-plate` at `ImageBlock.tsx:91`. `git grep 'var(--theme-figure-plate)'` on the branch across `src/`, `core/`, and `design-system/` returns only the registration line; no `bg-[var(--theme-figure-plate)]` remains. Token values: `tokens.css:20` (night, `oklch(0.2600 0.0130 88)`) and `:144` (day, `oklch(0.2350 0.0120 88)`) are untouched by the diff, and the computed strings measured after W1 above are those values serialized. On main the arbitrary class resolved the same variable, so before equals after by construction; the handoff's before column is taken on that basis and its after column is reproduced here. Convention: every `--theme-*` token in `tokens.css` (33 of them) now resolves through a registration in `globals.css` (`--color-*` at :17-47 for the 26 colors, `--shadow-*` at :105-111 for the 7 shadows). Set difference is empty. `--theme-figure-plate` was the one exception at Round 3; it is not an exception now.

**3. N2 is a live test.** `ImageBlock.test.tsx:27-31` renders `parallax plate="dark"` and asserts `bg-bg-elevated` plus `object-contain` absent, mirroring the bare test at :21-25. Mutation: with `&& !parallax` removed from `darkPlate` at `ImageBlock.tsx:67`, that one test fails ("Expected the element to have class bg-bg-elevated") and the other six in the file pass. Restored; tree clean.

**4. Tests.** Red lines reproduced: main's two content files restored under the branch's `parse-case-study.test.ts` gives `2 failed | 11 passed (13)`, the two `it.each` rows for diagram.png and feature-flow.png, exactly the handoff's listing. On the branch head: 411 passed in 50 files. The three added rows use the real content files as fixtures (`ai-leadership.md?raw`), the pattern the Round 3 rows set. N1 deferral: agreed. Reading `aspect` from the directives slice moves a declaration in `parse-case-study.ts`, and #230 changes that file (+24 lines). Landing N1 here would have put the two open PRs in conflict over a note-grade fix.

## Findings

### Blocking (fix before merge)
None.

### Warnings (fix soon)
None. W1 closed by this PR.

### Notes (improve when convenient)
- **N1 (Round 3) stays open** -- `core/content/parse-case-study.ts:33`. Correctly deferred; take it in #230's lane or the next parser touch, not before #230 lands.
- **N3 (Round 3) stays open** -- `ImageBlock.tsx:100`. `aspect === "auto"` inside the plate branch will duplicate `flowHeight` once #230 lands. Belongs to #230, which owns that file's next change.
- **"Outer button" in the handoff is a div with `role="button"`** -- `ImageBlock.tsx:74-75`. Naming only, and Round 3's handoff used the same words. The measurements are of the right element.

## Dimension summary
- Architecture    PASS (content directive in core; registration in the one file that owns the `--theme-` to utility mapping; UI renders)
- Design system   PASS (W1 closed; every `--theme-*` token registered; no value changed; both modes measured)
- Accessibility   PASS (nothing on this surface changed: role, tabIndex, aria-label, lightbox intact; WCAG script ALL PASS; baked raster text not certified, same caveat as Round 3)
- Content         PASS (two meta lines; prose, alt, captions untouched)
- Doctrine        PASS (Justin's scope ruling kept exactly; no new surface, motion, or imagery)
- Quality gates   PASS (411/411 in 50 files; lint 0 errors / 1 known warning at renderSection.tsx:16; build clean, tree clean after build; wcag-check ALL PASS; diff --check clean)

## Order vs #230
`git merge-tree` of `feat/instant-dscr-case-study` x `feat/plate-round-4`: no conflicts. Both touch `ImageBlock.tsx` and `parse-case-study.test.ts` on different lines. Merge #233 first: it is small, graded, and closes a Round 3 warning, and #230 is still in its voice pass. Either order lands clean.

## Lane-2 grading (Round 4)
- **Q1: 0 re-drives observed, and no push-refusal event.** The approval review blocked `git push` in Round 2h and Round 3 and did not block it here; the handoff states this plainly and the three commits are on origin under the GPT-6 Astra trailer with no confirmation step recorded. Roy cannot observe the session; graded from the handoff. **Pass.**
- **Q3: landed green (outcome 5).** Every tree and suite number in the handoff reproduced by an independent reader: 2 red / 11 green on the overlay, 411/411 in 50 files, six of eight DOM rows, both computed colors.
- **Guard firings by name (handoff, unverifiable from here):** dangerous-command-guard: none. redteam-session-guard: none (Round 3's two heredoc false positives did not recur; this round wrote no new test file, only edited two). radioactive-data-guard: none. codex-session-guard: none. gates-on-stop: none observed pre-commit. Impeccable detector: two clean scans (globals.css, ImageBlock.test.tsx).
- **Sol vs Opus, one entry, because the smallest round answers Round 3's question.** Round 3's residue was "packet-complete, doctrine-read, convention-blind": the unregistered token survived because no doctrine line states the `--theme-` to `--color-` convention and the packet did not name it. This round the packet named it (W1 :104-108, fix spelled out), and nothing survived: the line landed in the right group, the three assertions were updated together as N4 asked, and no second exception was introduced. The datum is that the convention-blind residue is packet-addressable at zero cost when the reviewer names the convention. What that does not test is whether the lane would find an unnamed convention on its own; Round 3 says no, and Round 4 adds no evidence either way.

## Packet corrections (this audit)
1. STATE held: primary checkout on main, clean, at launch and at close (Round 3's correction did not recur).
2. The handoff's "outer button" is a `div[role=button]`; see Notes.
3. Stelline's "ImageBlock.test.tsx (+9/-?)" is +7/-2.

## Delegated
None needed. Measurement, not critique; done directly on a scratch checkout so :5173 stayed Justin's.

## What this review did NOT cover
- Justin's visual grade of the two figures on :5173 (his rulings come in chat; not waited on).
- diagram.png at 390 (two of the eight rows), Safari and Firefox rendering, and the baked text inside both rasters.
- The session-side claims (guard firings, usage 82 -> 81, Q1's zero) beyond what the commits and origin show.
- The entrance animation over the figures: rAF is suspended in the audit pane, so both figures were measured at `opacity-0` before their reveal, not seen.
