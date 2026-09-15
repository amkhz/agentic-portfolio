# Handoff -- agentic-portfolio -- 2026-09-15

Seat: Roy | Model: claude-fable-5-1 (pinned at launch, no fallback tripped) | Round 3 of the 0004 trial, the audit half. Addressed to Stelline.

## Done (verified)

- **Roy audit of PR #231 written, committed, pushed, and now on main.**
  `vector/audits/roy-review-2026-09-15-frame-dual-mode-assets.md`, commit
  dfe6d9a on the feature branch, carried into main by the merge a925baa
  (`git ls-tree origin/main vector/audits/` shows it). Verdict SHIP WITH
  NOTES: no blocking finding, one warning, four notes.
- **PR #231 MERGED by Justin** (`gh pr view 231`: MERGED, merge commit
  a925baa). Merged before #230, the order the audit asked for. Remote branch
  pruned by Justin; local branch deleted after confirming it was merged.
- **Justin graded all three plated figures on :5173, both modes, on the
  branch checkout: pass.** His one remark, verbatim: "they look a little
  light in dark mode but its fine." Ruled fine; not a fix request.
- **Every number in the Round 3 handoff reproduced independently.** Branch:
  408 of 408 in 50 files, lint 0 errors / 1 known warning
  (renderSection.tsx:16), build clean, diff --check clean, no image or
  manifest or AGENTS.md or .codex change, wcag-check.py ALL PASS with the
  handoff's contrast table matching to four decimals. Main at 2470ea3 in a
  scratch worktree: 392 of 392 in 48 files; the three-file test overlay on
  main: 7 failed, 12 passed, the same seven names.
- **All twelve DOM measurement rows reproduced** at 1440 and 390, night and
  day, three assets (outer 1136x639, image 1086x589, 25px inset desktop;
  358x201.375, 332x175.375, 13px mobile). Focus ring measured both modes: a
  2px page-colored offset band sits between the plate edge and the brass, so
  the day accent/plate 2.53:1 is correctly diagnostic-only.
- **The #230 composition checked by machine, not reasoning:** `git
  merge-tree` of 21f945b against `origin/feat/instant-dscr-case-study` is
  conflict-free and the merged ImageBlock composes (a plated auto figure
  gets no ratio class from flowHeight and the plate's own in-flow padding
  branch). No fix needed on the second merge.
- **Sixteen other dark-ground figures sorted** in the audit: 2 in the
  ruling's exact class (`ai-leadership/diagram.png`,
  `instant-sow/feature-flow.png`), 2 flat teal slides, 10 dark UI crops, 2
  out (a light grid, a photographic scene).
- **Working tree restored to main** at a925baa, clean; :5173 serves main.
  Scratch worktree removed. The stray `.claude/worktrees/priceless-aryabhata`
  worktree and the untracked `.claude/settings.local.json` left alone per
  the packet.
- **Memory banked:** the craft-arc project memory now records ruling 8 as
  built and merged with the mechanism, Justin's grade, and the two open
  follow-ups; its index line updated.

## Claimed but unverified

- **Lane-2 grade is Roy's, not yet Justin's.** Q1: one re-drive, policy
  class (the push confirmation, the Round 2h shape), pass. Q3: landed green,
  outcome 5. Justin did not rule on the count in chat; his grade covered the
  figures only. What verifies it: his Q1 ruling in the ledger row.
- The 1440 day view of `before-flow` was measured but not seen: the page
  transition does not tick in the audit browser pane (rAF suspended, see the
  browser-pane memory). The other five views were seen. Justin's own grade
  covers it.

## Open threads

- **Stelline:** the Round 3 ledger row for `replicant/vector/ledgers/0004-trial.md`
  (from the build handoff's row plus the audit's grade), the lane-1 row (call
  1 on the packet, changed a decision: yes), Roy's outcome, and Justin's Q1
  ruling once he gives it. This session did not touch the ledger or any
  `~/projects` coordination file.
- **Justin:** the scope ruling on the sixteen figures. Roy's sort is in the
  audit; the two same-class ones are the only ones the ruling extends to
  without a new decision.
- **Tyrell, after or with the next ImageBlock touch (audit W1):** register
  the plate token. `--theme-figure-plate` is the only `--theme-*` token not
  mapped through `@theme inline` in `src/styles/globals.css`. One line
  (`--color-figure-plate: var(--theme-figure-plate);`), `bg-figure-plate` at
  ImageBlock.tsx:91, and three class-string assertions in the two new DOM
  tests. Not urgent.
- **Optional, only if the night plate ever wants tightening:** lower night
  `--theme-figure-plate` L from 0.26 toward 0.23 and re-run
  `scripts/wcag-check.py`. Justin ruled the current value fine.
- **Notes N1-N4 in the audit,** none urgent: `aspect:` unguarded the way
  `plate:` now is (pre-existing); no parallax-exclusion test; `aspect ===
  "auto"` inside the plate branch duplicates flowHeight once #230 lands;
  DOM tests assert class strings.
- **PR #230 (Instant Rate Buy-Up) stays OPEN** on the arc's sequence: voice
  pass (gaff marks up, Justin rewrites), Roy audit, Justin merges. It rebases
  cleanly on the #231 merge.
- **The SOW flowchart's green-status content question** stays R3-or-later.

## Gotchas learned

- **The packet had the plate L values inverted** (it said night 0.235 / day
  0.260; tokens.css has night 0.260 in `:root`, day 0.235 in
  `[data-theme="light"]`). The build handoff had them right. Check the
  block, not the prose.
- **Arbitrary-var Tailwind classes are wider precedent than "five durations
  in src/lab/".** `ConstellationNode`, `ConnectionPeek`, `ConstellationField`
  use `bg-[var()]`, `border-[var()]`, `h-[var()]`; the flight-deck components
  use `text-[var(--deck-*)]` throughout. What is unprecedented is a
  `--theme-`-prefixed token consumed that way; every other `--theme-*` goes
  through `@theme inline`. The convention lives only in globals.css; no
  doctrine line states it.
- **The checkout was on the feature branch at launch,** not main as the
  packet said; the build session's closeout switch did not persist. Always
  read `git status` before trusting a packet's STATE line about :5173.
- **Grading in the Browser pane:** the reveal and page-transition animations
  never tick (rAF suspended), so figures screenshot dim or blank. Forcing
  inline opacity on the plate's ancestors is enough for the section reveal;
  the route transition on `/work/instant-doc-review` still blanked. Measure
  from the DOM; treat pane screenshots as a second reader only.
- **Reproducing the red lines cheaply:** `git worktree add --detach <scratch>
  <main-sha>`, symlink `node_modules` into it, copy the test files from the
  branch with `git show <sha>:<path>`, run vitest on the three files. Two
  minutes, no stash, :5173 untouched.
- **`grep --include='*.tsx'` must be quoted in zsh** or the glob expands in
  the cwd and grep sees garbage.

## Pickup prompt

```
Stelline -- consume vector/handoffs/2026-09-15-round-3-roy-audit.md
(agentic-portfolio, on main after PR #231 merged at a925baa; this handoff
arrives on PR #232, docs/round-3-roy-handoff). Round 3 of the 0004 trial is
closed on the repo side: build by GPT-6 Astra (medium) merged, Roy audit
(Fable) on main, Justin graded the three plates pass in both modes.

Records to write, in replicant:
  1. The Round 3 lane-2 row in vector/ledgers/0004-trial.md, from the build
     handoff's row (vector/handoffs/2026-09-14-round-3-frame-assets.md) plus
     the audit's grade: Q1 one re-drive, policy class (push confirmation,
     the 2h shape), pass -- Justin has NOT ruled the count; leave it to him;
     Q3 landed green (outcome 5); guards by name: dangerous-command none,
     redteam-session two false positives (heredoc test writes, occurrences
     4 and 5), radioactive-data none, codex-session none, gates-on-stop
     none; Impeccable token scan clean; Roy outcome SHIP WITH NOTES, merged.
  2. The lane-1 row: call 1 on the Round 3 packet, gpt-5.6-sol, eight
     findings, two blocking, changed a decision: yes.
  3. The "Sol vs Opus" note from the audit: the doctrine-blind residue shrank
     to convention-blind (the @theme registration convention that no
     doctrine line states; the packet missed it too).

Rulings to collect from Justin, in chat: the Q1 count for Round 3; the
scope ruling on the sixteen other dark-ground figures (Roy's sort is in
vector/audits/roy-review-2026-09-15-frame-dual-mode-assets.md; the two
same-class ones are diagram.png and feature-flow.png).

Then the #230 sequence continues unchanged: voice pass (gaff marks up,
Justin rewrites), Roy audit, Justin merges. #230 rebases cleanly on the
#231 merge (verified by merge-tree). Re-tier 2026-10-09.

Do not edit the portfolio's components, tokens, or content from the
coordination layer; the W1 token registration is Tyrell's, on the next
ImageBlock touch. Working tree is main; :5173 serves main.
```
