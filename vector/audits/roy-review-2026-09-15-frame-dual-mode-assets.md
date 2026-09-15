# Roy's Review: feat/frame-dual-mode-assets (PR #231) -- SHIP WITH NOTES. Justin merges #231.

Date: 2026-09-15
Auditor: Roy on `claude-fable-5-1`, pinned at launch (decisions 0001 + 0003). No fallback tripped.
Range reviewed: `main` 2470ea3 .. 21f945b (build 218e92d, records 21f945b), plus an in-memory merge against PR #230 (`origin/feat/instant-dscr-case-study` 8f15b67).
Round: 0004 trial, Round 3, lane 2, `gpt-6-astra` (medium) in a consumer repo for the first time.

## Verdict: SHIP WITH NOTES

**Justin merges #231.** Merge #231 first, then #230: #231 is eleven files and
touches nothing #230 grades on; #230 is twenty-two files and carries the
flowHeight change that #231's plate must compose with. Merging the small one
first means #230's final grade happens on a tree that already has the plate.
No conflict either way (git merge-tree clean, verified by hand).

The ruling is kept exactly: three rasters intact, no re-render, no second
asset, no SVG, a deliberate humus plate in both modes with the image
contained and room on all four sides. The single concern is a naming-layer
convention: the new `--theme-figure-plate` is the only `--theme-*` token in
the repo not registered through `@theme inline`. That is a follow-up, not a
hold.

## Files reviewed
- `design-system/tokens.css` (layer: design system) -- plate pair + inset clamp
- `core/content/case-studies.ts` (layer: core) -- `plate?: 'dark'` on ImageSection
- `core/content/parse-case-study.ts` (layer: core) -- parseMeta reads `plate:` before `placeholder:`
- `core/content/instant-doc-review.md`, `core/content/instant-sow.md` (layer: core, content) -- three meta comments
- `core/content/parse-case-study.test.ts` (layer: core)
- `src/components/content/ImageBlock.tsx` (layer: UI) -- the darkPlate branch
- `src/components/content/renderSection.tsx` (layer: UI) -- passes the field
- `src/components/content/ImageBlock.test.tsx`, `renderSection.test.tsx` (layer: UI, new)
- `vector/handoffs/2026-09-14-round-3-frame-assets.md` (records)

## What I verified myself

**The ruling (audit 1).** Three routes on :5173 (the checkout was already on
the branch at launch; see Packet corrections). Night and day, 1440 and 390,
reproduced from the DOM:

| Figure | Mode | Width | Outer | Image | Inset each edge | Plate |
|---|---|---:|---|---|---:|---|
| sow-flow-diagram, detail-ops | night | 1440 | 1136x639 | 1086x589 | 25 | oklch(0.26 0.013 88) |
| sow-flow-diagram, detail-ops | day | 1440 | 1136x639 | 1086x589 | 25 | oklch(0.235 0.012 88) |
| sow-flow-diagram, detail-ops | night + day | 390 | 358x201.375 | 332x175.375 | 13 | same pair |
| before-flow | day + night | 1440 | 1136x639 | 1086x589 | 25 | same pair |

All twelve handoff rows hold (three assets reproduced at both widths, both
modes; the two SOW figures measured together). No horizontal overflow at
390. The clamp resolves to 24px at 1440 and 12px at 390 as designed.

**The night step.** Plate 0.26 over page 0.14 is 1.28:1 by the WCAG formula,
and it does not vanish. What the eye gets is three tones, not two: the page,
a visibly warmer and lighter plate, and the raster's own near-black ground
inside it at a 24px margin. It reads as a mat around the diagram. By day the
same plate sits at 13.1:1 against the sand with the day border (0.84) drawn
around it; the diagram no longer reads as a broken black rectangle. Justin's
eye rules; mine agrees with the handoff.

**Focus ring (audit 2).** Measured on a focused plated figure in both modes.
The ring is a box-shadow: a 2px band of `--theme-bg-deep` then a 2px band of
`--theme-accent-primary`, drawn outside the 1px border. The brass never
touches the plate edge; the page-colored band separates them. Night:
`oklch(0.14 0.007 85) 2px, oklch(0.72 0.09 68) 4px`. Day: `oklch(0.92 0.03 80)
2px, oklch(0.485 0.115 65) 4px`. So the pair that renders adjacent to the ring
is accent/bg-deep (7.90 night, 5.20 day), and the flagged accent/plate 2.53
by day is correctly diagnostic-only. Hover border is `accent-muted` at 15 to
20 percent alpha over the plate edge: a weight shift, no glow, within the
brass budget.

**WCAG.** `scripts/wcag-check.py` runs clean (ALL PASS). Its `contrast()`
reproduces every figure in the handoff table to four decimals.

**Parser (audit 3).** `plate:` is read only from the text before
`placeholder:`, only the value `dark`; a mention inside placeholder prose does
not opt in; `plate:light` is ignored. The type is optional; nothing else in
`src/` or `core/` consumes `plate` (every other hit is the word in comments or
the flight-deck "static plate" variant). Content diff is exactly six lines,
three removed and three added, the three meta comments.

**Component (audit 4).** `darkPlate = plate === "dark" && !bare && !parallax`.
The instant-sow cover (bare, parallax, contain) renders with `bg-bg-elevated`
and no plate class. Lightbox and keyboard unchanged; the two new DOM tests
cover Enter, Space, Escape.

**The #230 composition.** I merged 21f945b with `origin/feat/instant-dscr-case-study`
in memory (`git merge-tree`, no conflicts) and read the merged ImageBlock.
A plated auto figure post-merge gets no ratio class from #230's `flowHeight`
and the plate's own `relative p-[...]` in-flow branch with `h-auto`. It
composes. **No fix needed for the second merge.** One naming note below (N3).

**Tests (audit 5).** Scratch worktree of main at 2470ea3, node_modules
symlinked: baseline 392 of 392 in 48 files. The three test files from
21f945b copied over main: 7 failed, 12 passed, the same seven names as the
handoff. The IntersectionObserver stub is local to `renderSection.test.tsx`;
`src/test-setup.ts` carries only matchMedia. On the branch: 408 of 408 in 50
files.

## Findings

### Blocking (fix before merge)
None.

### Warnings (fix soon)
- **`--theme-figure-plate` is the one `--theme-*` token not registered in `@theme inline`** -- `design-system/tokens.css:20`, `:144`; `src/styles/globals.css:17-47`; `src/components/content/ImageBlock.tsx:91`
  - What: every other `--theme-*` token resolves through a `--color-*` entry in globals.css and is consumed as a semantic utility (`bg-bg-elevated`). This one is consumed as `bg-[var(--theme-figure-plate)]`. Arbitrary-var classes do have precedent in `src/` (the packet undercounts it, see corrections), but every precedent is a non-`theme` prefix: `--constellation-node-bg`, `--deck-ink`, `--duration-*`. The `--theme-` prefix is the palette layer's contract, and this token breaks it by name.
  - Why it matters: ARCHITECTURE.md:15 is satisfied (the value lives in tokens.css, nothing is hardcoded), so this is convention drift, not a doctrine break. It matters because the next reader greps `--color-*` to find what a surface uses and misses the plate.
  - Fix (closes the class): either register it, one line in globals.css `--color-figure-plate: var(--theme-figure-plate);` and `bg-figure-plate` at ImageBlock.tsx:91, updating the three class-string assertions in `ImageBlock.test.tsx:11,18` and `renderSection.test.tsx:18`; or rename it `--figure-plate` beside `--figure-plate-inset` so the prefix says what it is. The first is cleaner. Tyrell, after merge or in the next ImageBlock touch.
  - Ruled: the spacing side is fine as built. `p-[var(--figure-plate-inset)]` / `inset-[var(--figure-plate-inset)]` has the exact precedent `h-[var(--constellation-node-size-sm)]`, and the `--spacing-*` scale in `@theme` is fixed steps; a fluid clamp does not belong in it.

### Notes (improve when convenient)
- **N1: `aspect:` is not guarded the way `plate:` now is** -- `core/content/parse-case-study.ts:33`
  - What: `aspect:(\S+)` still matches anywhere in the meta string, including inside placeholder prose. The PR made `plate:` stricter than its sibling. Pre-existing, not this PR's defect.
  - Fix: read `aspect` from the same `directives` slice.
- **N2: no test for the parallax exclusion** -- `src/components/content/ImageBlock.test.tsx:21`
  - What: `bare` + `plate` is covered; `parallax` + `plate` is not. Verified live on the cover route.
  - Fix: one `it` mirroring the bare test.
- **N3: after #230 lands, `aspect === "auto"` inside the plate branch duplicates `flowHeight`** -- `ImageBlock.tsx:100,108`
  - What: two spellings of one predicate (both require `!bare`, and `darkPlate` already does).
  - Fix: read `flowHeight` in the plate branch when #230 is in. Cosmetic.
- **N4: the DOM tests assert Tailwind class strings, not computed layout** -- both new test files
  - What: jsdom cannot lay out; the contract under test is the class name. Acceptable. The Warning's fix touches three of these assertions, so do them together.

## Dimension summary
- Architecture    PASS (four layers respected; type in core, surface in tokens, UI renders)
- Design system   FLAG (W1 registration convention; values and modes correct)
- Accessibility   PASS (ring offset measured both modes; no text on the plate; lightbox + keyboard intact)
- Content         PASS (three meta lines; prose, alt, captions untouched)
- Doctrine        PASS (ruling kept; restrained surface, no accent, no motion, no new imagery)
- Quality gates   PASS (408/408 in 50 files; lint 0 errors / 1 known warning at renderSection.tsx:16; build clean; diff --check clean; no image, manifest, AGENTS.md, or .codex change; wcag-check clean)

## Scope list for Justin: the sixteen other dark-ground figures
Spot-checked all sixteen at 420px, two as the packet asked (`talk-as-prototype`
from doctrine-not-prompts, `meta-planning` from building-this-portfolio) and
the rest to sort them. Justin rules; Roy sorts.

- **Same class as the ruling (flat baked near-black ground, presentation graphic): 2.**
  `ai-leadership/diagram.png` (flowchart, same generator family as sow-flow-diagram);
  `instant-sow/feature-flow.png` (four light UI crops on black, same family as detail-ops).
  If the ruling extends anywhere, it extends here.
- **Flat baked ground, different hue (dark teal slides): 2.**
  `doctrine-not-prompts/talk-as-prototype.png`, `doctrine-reads-doctrine.png`.
  The plate mechanism works unchanged; the question is humus around teal.
- **Dark UI crops, the dark is the product's own theme, not a surround: 10.**
  `doctrine-not-prompts/key-agent-terminal.png`, `kiavi-world-home.png`, `leverage-math.png`;
  `building-this-portfolio/meta-planning.png`, `meta-context-file.png`, `meta-scaffold-styling.png`,
  `meta-content-separation.png`, `meta-a11y.png`, `meta-nextjs-structure.png`, `meta-vite-structure.png`.
  Not the ruling's class as written. They read as dark rectangles on sand too,
  but a plate around a screenshot is a different decision (it says "specimen",
  not "diagram"). Several carry window chrome and desktop bleed at the edges.
- **Not in the class: 2.**
  `ai-leadership/outcomes.png` (light grid-paper ground);
  `ai-leadership/big-flip.png` (photographic scene, half dark).

## Lane-2 grading (Round 3)
- **Q1: one intervention observed, the push confirmation.** The approval
  review rejected `git push` as sensitive egress; Justin confirmed in chat;
  no retry or workaround before that. Policy-caused, same shape as Round 2h
  (one re-drive, ruled pass there). Roy's grade: **1 re-drive, policy class,
  pass** (bar is more than 2 or a restated task). Justin counts.
- **Q3: landed green (outcome 5).** Gates finished, tree and suite numbers
  reproduced by an independent reader.
- **Guard firings by name:** dangerous-command-guard: none.
  redteam-session-guard: **two false positives**, both heredoc writes of
  authorized test files (the parked ancestor-through-data class; occurrences
  4 and 5 in this trial). radioactive-data-guard: none. codex-session-guard:
  none. gates-on-stop: none. Impeccable token detector: clean on tokens.css.
- **Packet corrections, counted:** two from the build (main has 392 tests,
  not 399; no flowHeight on main; Stelline's error, lines cited from the DSCR
  checkout). Two more from this audit, below.
- **Sol vs Opus, one entry, consumer-repo specific.** The lane's standing
  trait is packet-complete, doctrine-blind. Here the packet went through the
  outsider read first (lane-1 call 1, eight findings, two blocking, changed a
  decision) and the doctrine-blind residue did shrink: the build cited the
  DESIGN and ARCHITECTURE lines it was pointed at, ran the WCAG script, and
  hardcoded nothing. What survived is exactly the convention no doctrine line
  states: the `--theme-` to `--color-` registration lives only in globals.css
  and is learned by reading it, not from a rule. That is the residue's new
  floor: packet-complete, doctrine-read, convention-blind. The packet did not
  name that convention either, so it is a shared miss.

## Packet corrections (this audit)
1. The plate L values are inverted in the audit packet: **night is 0.260, day is 0.235** (tokens.css:20 in the `:root` night block, :144 in `[data-theme="light"]`). The handoff has them right.
2. Arbitrary-var precedent is wider than "five durations in src/lab/": `ConstellationNode.tsx:22-30,93`, `ConnectionPeek.tsx:24-38`, `ConstellationField.tsx:288` use `bg-[var()]` / `border-[var()]` / `h-[var()]`, and the flight-deck components use `text-[var(--deck-*)]` throughout. The drift ruling above is made against that fuller precedent.
3. The working tree was on `feat/frame-dual-mode-assets` at launch, not `main`; :5173 was already serving the branch. The handoff's closeout switch to main did not persist. Restored to main at the end of this audit.

## Delegated
None needed. Rendered-output checks were done directly (DOM measurement, computed styles, screenshots both modes) because the question was measurement, not critique.

## What this review did NOT cover
- Justin's own visual grade on :5173 (his rulings come in chat; not waited on).
- Safari and Firefox rendering of the plate (Chromium only).
- The baked raster text inside the three figures (the handoff says the same; WCAG does not certify it and mobile diagram text stays small).
- The SOW flowchart's green-status content question (R3-or-later, out of scope by the ruling).
- The 1440 day screenshot of before-flow: the page transition does not tick in the audit browser pane (rAF suspended), so that one shot was measured, not seen; the other five views were seen.
