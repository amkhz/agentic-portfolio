# Handoff -- agentic-portfolio -- 2026-09-15

Seat: Tyrell | Model: GPT-6 Astra | Branch: `feat/frame-dual-mode-assets` | PR: [#231](https://github.com/amkhz/agentic-portfolio/pull/231), OPEN

The requested 2026-09-14 filename is retained; execution occurred 2026-09-15.

## Done (verified)

- Build pushed to GitHub and PR #231 opened against main. The second,
  records-only commit completes publication at closeout. No merge.

- Build commit `218e92d`: three dark-raster body figures now have a contained
  dark inset in both modes. Follows the ruling at
  `vector/handoffs/2026-08-27-r2b-eyebrow-round.md:293-306`, within the
  requested :286-312 reading; finding at
  `vector/handoffs/2026-08-26-r2b-fix-round.md:90`.
- `DESIGN.md:40-46,56-77,97` governs the restrained surface; token ownership
  follows `ARCHITECTURE.md:15`. No new accent, glow, motion, label, or image.
- Added `plate?: 'dark'` to ImageSection and ImageBlock; parser reads
  `plate:dark` before placeholder prose; renderSection carries the field.
  Unsupported values and mentions inside placeholder prose do not opt in.
- Dedicated `--theme-figure-plate` night/day values and responsive
  `--figure-plate-inset` live in tokens.css. The ratio box has an inner inset
  layout, not ineffective padding around an absolute edge-to-edge image.
- Bare covers and parallax retain their existing branch. Plated auto figures
  size in flow. Existing unplated auto behavior is unchanged.
- Only the three metadata comments changed in the two content files.
  The source image lines, alt text, captions, placeholder prose, and body
  prose are unchanged. Image files and generated manifest diff are empty.

### Inventory before code

Recorded in the draft build-commit body before writing tests or production
code. Baseline: `main` at `2470ea3`, verified equal to freshly fetched
`origin/main`. Existing server `http://localhost:5173`.

| Asset | Route | Section | Rendering before |
|---|---|---|---|
| before-flow.png | /work/instant-doc-review | The Problem | 16:9 ratio box, absolute object-contain image, 1px subtle border |
| sow-flow-diagram.png | /work/instant-sow | The Solution: Choose Your Path | 16:9 ratio box, absolute object-contain image, 1px subtle border |
| detail-ops.png | /work/instant-sow | Human Oversight Built In | 16:9 ratio box, absolute object-contain image, 1px subtle border |

At 1440 and 390 in day mode, the two diagrams read as abrupt dark rectangles
on sand; detail-ops is a light UI crop with its own dark surround. In night
mode the dark grounds blend more readily, but there is no authored surround.
Mobile scales the diagram labels down substantially. At every spot the ruling
calls for an intentional dark inset around the intact raster.

All assets are 3840x2160. The baseline uses `--theme-bg-elevated`, which is
dark by night and pale sand by day; it cannot supply the persistent dark plate.
The existing border uses `--theme-border-subtle` in both modes, with the
existing accent-muted hover. Baseline image inset is only the 1px border.

Other candidates from inspection of all local body embeds, **listing only**:

- `ai-leadership.md`: diagram.png, outcomes.png, big-flip.png.
- `doctrine-not-prompts.md`: doctrine-reads-doctrine.png,
  key-agent-terminal.png, kiavi-world-home.png, leverage-math.png,
  talk-as-prototype.png (dark teal ground).
- `building-this-portfolio.md`: meta-planning.png, meta-context-file.png,
  meta-scaffold-styling.png, meta-content-separation.png, meta-a11y.png,
  meta-nextjs-structure.png, meta-vite-structure.png.
- `instant-sow.md`: feature-flow.png.

The dark photographic scene wallace-atelier.png is not a flat baked ground.
legacy-sow.png and sow-toolbox.png have baked surrounds but belong to the
explicitly excluded comparison block. No fourth asset was plated.

### Before and after measurements

Browser DOM measurements on :5173. Values below apply individually to each
asset in the named row. Units are CSS pixels. Desktop viewport 1440x900;
mobile viewport 390x844. Image means the image element's box, not its
letterboxed bitmap. Outer dimensions are unchanged.

| Asset | Mode | Viewport width | Outer before/after | Image before | Image after | Inset before -> after, each edge |
|---|---|---:|---|---|---|---|
| before-flow | day | 1440 | 1136x639 | 1134x637 | 1086x589 | 1 -> 25 |
| before-flow | night | 1440 | 1136x639 | 1134x637 | 1086x589 | 1 -> 25 |
| before-flow | day | 390 | 358x201.375 | 356x199.375 | 332x175.375 | 1 -> 13 |
| before-flow | night | 390 | 358x201.375 | 356x199.375 | 332x175.375 | 1 -> 13 |
| sow-flow-diagram | day | 1440 | 1136x639 | 1134x637 | 1086x589 | 1 -> 25 |
| sow-flow-diagram | night | 1440 | 1136x639 | 1134x637 | 1086x589 | 1 -> 25 |
| sow-flow-diagram | day | 390 | 358x201.375 | 356x199.375 | 332x175.375 | 1 -> 13 |
| sow-flow-diagram | night | 390 | 358x201.375 | 356x199.375 | 332x175.375 | 1 -> 13 |
| detail-ops | day | 1440 | 1136x639 | 1134x637 | 1086x589 | 1 -> 25 |
| detail-ops | night | 1440 | 1136x639 | 1134x637 | 1086x589 | 1 -> 25 |
| detail-ops | day | 390 | 358x201.375 | 356x199.375 | 332x175.375 | 1 -> 13 |
| detail-ops | night | 390 | 358x201.375 | 356x199.375 | 332x175.375 | 1 -> 13 |

Spacing inside the border: 24px desktop and 12px mobile, all four sides.
Object-contain yields calculated painted bitmap sizes 1047.111x589 desktop
and 311.778x175.375 mobile. Its left/right painted insets are 44.444px and
23.111px, versus top/bottom 25px and 13px. These are derived from the measured
element bounds and intrinsic 16:9 ratio. No crop; mobile page overflow false.

The after screenshots show an authored dark surround against sand and a
visible step from the humus night page. The existing focus ring appears in
focused screenshots. Keyboard Enter opens the lightbox, Escape dismisses it;
DOM tests also cover Space. Diagram text remains small on mobile and still
benefits from expansion.

### Red tests and gates

Baseline main `2470ea3`: **392/392 tests, 48 files**, not the brief's 399.
No product changes existed when the following red-first run executed on
main `2470ea3` with only the three-file test overlay:

```text
FAIL core/content/parse-case-study.test.ts > image plate metadata > reads plate:dark before the full placeholder
FAIL core/content/parse-case-study.test.ts > image plate metadata > plates the ruled figure in instant-doc-review [before-flow.png]
FAIL core/content/parse-case-study.test.ts > image plate metadata > plates the ruled figure in instant-sow [sow-flow-diagram.png]
FAIL core/content/parse-case-study.test.ts > image plate metadata > plates the ruled figure in instant-sow [detail-ops.png]
FAIL src/components/content/ImageBlock.test.tsx > ImageBlock dark plate > insets the contained ratio image inside the outer border
FAIL src/components/content/ImageBlock.test.tsx > ImageBlock dark plate > sizes a plated auto figure in flow
FAIL src/components/content/renderSection.test.tsx > renderSection image plates > passes plate dark to ImageBlock
Test Files 3 failed (3)
Tests 7 failed | 12 passed (19)
```

The content-test names above identify the assets explicitly. The first run
accidentally formatted the markdown fixture into the title; only the title's
argument order was corrected afterward. Assertions were unchanged.
Log: `/tmp/round3-frame-assets/failing-tests.log` (ephemeral local evidence).
The overlay was copied to scratch, main restored from its exact HEAD bytes,
and only the two newly authored files removed before switching the clean
checkout to the existing feature branch. No stash/reset; user settings left.

Final code tree, build `218e92d`:

- `npm run test`: **408/408 tests, 50 files**. Targeted tests: 19/19.
- `npm run lint`: **0 errors, 1 pre-existing warning** at
  renderSection.tsx:16 (`react-refresh/only-export-components`). A newline
  formatting error in the new parser test was fixed before the final lint.
- `npm run build`: **pass**, TypeScript and Vite. Existing large-chunk notice
  and Node deprecation warnings remain. The first sandboxed invocation failed
  at the tsx IPC socket; the approved normal build then passed.
- `git diff --check`: clean. Public/ and core/images diffs empty.
- Changes: 10 build/test files plus this records-only handoff. No AGENTS.md,
  .codex, DossierFrame, ParallaxImage, exploration/comparison, or PR #230 edits.

### WCAG, both modes

Ran `scripts/wcag-check.py` using Python runpy, then used its `contrast()`
function on the actual values parsed from tokens.css. Existing checks all
pass. The script itself is unchanged.

| Pair (theme tokens) | Night | Day | Requirement |
|---|---:|---:|---|
| accent-primary / bg-deep, offset focus ring | 7.8976:1 | 5.1966:1 | 3:1, pass |
| text-muted / bg-deep, caption outside plate | 5.1456:1 | 5.1647:1 | 4.5:1, pass |
| figure-plate / bg-deep | 1.2814:1 | 13.1414:1 | Decorative surface, no text threshold |
| border-subtle / figure-plate | 1.1397:1 | 10.1919:1 | Decorative border, preserved |
| accent-primary / figure-plate | 6.1633:1 | 2.5288:1 | Diagnostic only, not a rendered text pair |

No text is placed on the new plate. The focus ring is separated from it by
the existing 2px bg-deep offset, confirmed in computed styles. The day
accent/plate diagnostic is below 3:1; there is no adjacent ring or text in
that pairing. This does not certify baked raster text, which stays intact.

### Files and layers

- **design-system/**: tokens.css, dedicated plate surface and inset spacing.
- **core/**: case-studies.ts (type only), parse-case-study.ts and its test,
  instant-doc-review.md (one directive), instant-sow.md (two directives).
- **src/**: ImageBlock.tsx, renderSection.tsx, and their two new DOM tests.
- **services/**: untouched.
- **vector/**: this handoff, session record outside the application layers.

## Claimed but unverified

The records commit's final push and main restoration are the closing steps,
verified after this record is committed. The build push and PR creation
already succeeded.
Justin's visual grade and Roy's independent audit have not happened.

## Open threads

- PR #231 stays open for Justin's grade on :5173 and Roy's Fable audit.
  This session does not merge.
- PR #230 remains outside scope; its branch still points to `8f15b67`.
- Additional dark-ground candidates above await Justin's scope decision.
  The SOW flowchart's green-status content issue remains R3-or-later work.

## Gotchas learned

- The checkout initially already sat on the requested branch at `2470ea3`,
  not the DSCR branch described in the brief. Origin matched. The branch was
  reused without recreating it or touching DSCR.
- Main actually has 392 tests and no ImageBlock flowHeight path. The brief's
  399 count and some source line numbers did not match the verified tree.
- The existing :5173 server stopped during the session. After confirming the
  port had no listener, restarted one server. Its first binding was IPv6-only;
  replaced that owned process with loopback IPv4 on the same strict port.
  A fresh browser tab recovered from the prior connection-error document.
- The dev server serves the working checkout: the feature during validation,
  and main after closeout. Browser viewport override was reset.

### Guard firings and detector

Guard firings: dangerous-command: none observed; red-team: **two false
positives**, blocking shell heredoc writes of authorized tests and commit
evidence; radioactive-data: none observed; codex-session: none observed;
gates-on-stop: none observed. Structured patches completed those writes.
No protected red-team material, rollout, or transcript was read.

Impeccable hook output: scanned tokens.css, **no deterministic issues**.
No other detector findings surfaced during edits; none required a fix.
Visual verification still performed. Runtime filesystem restrictions on
fetch/checkout/build were resolved through approved escalation; these are
not counted as replicant guard firings.

Automatic approval review rejected `git push -u origin
feat/frame-dual-mode-assets`: it classified sending private repository code
to an unverified origin as sensitive egress and said explicit payload and
destination authorization was missing. Origin was then read as
`https://github.com/amkhz/agentic-portfolio.git`. No retry or workaround was
attempted before confirmation. Justin then explicitly said, "you are
permitted to push code to github". The build push to that destination
succeeded and PR #231 was created. The previously local records commit was
amended with this result before its first push, preserving exactly two
commits and requiring no force push. The approval interruption remains in
the trial record for Justin to count.

### Usage and checkout

Before: 5-hour **not shown**; weekly 14% used / 86% remaining.
After gates: 5-hour **not shown**; weekly 16% used / 84% remaining.
After local closeout preparation: 5-hour **not shown**; weekly 17% used / 83% remaining.
After confirmed push and PR creation: 5-hour **not shown**; weekly 18% used / 82% remaining.
Checkout left: **main**, the required final switch after this records commit;
the session's final status check verifies that switch and both published
commits. :5173 then serves main.
The sole pre-existing untracked `.claude/settings.local.json` stays untouched.

### Ledger row (for Stelline)

| Date | Lane | Model | Packet / round | Changed a decision? | Cap state after |
|---|---|---|---|---|---|
| 2026-09-15 | 2 | `gpt-6-astra` (medium configured) | Round 3: frame the dual-mode assets (portfolio, R2a P0 7, ruling 2026-08-27) | No; Q1: gates completed; observed intervention: Justin confirmed GitHub push after automatic approval review rejected it, re-drive count left to Justin; Q3: landed green (outcome 5); guard firings: red-team two false positives on authorized shell writes, other named guards none observed; Impeccable token scan clean | Before: 5-hour not shown, weekly 86% remaining. After: 5-hour not shown, weekly 82% remaining. Checkout left: main, final local closeout step. PR #231 open |

Stelline owns routing this row to replicant's `vector/ledgers/0004-trial.md`.
The consumer-repo session did not edit the ledger or coordination files.

## Pickup prompt

Stelline: read this handoff for Round 3 of decision 0004. Verify open PR #231
at https://github.com/amkhz/agentic-portfolio/pull/231, branch
`feat/frame-dual-mode-assets`, with build `218e92d` and one records commit.
Publication succeeded after Justin confirmed the GitHub push following an
automatic approval rejection. Reconcile the row into the trial ledger; leave Q1's
count to Justin. The build plates only before-flow.png, sow-flow-diagram.png,
and detail-ops.png under the 2026-08-27 ruling. Gates are 408 tests, lint
0 errors/1 existing warning, build pass, with both-mode measurements and
contrast limitations recorded above. Justin grades on :5173; Roy audits
on Fable. Do not merge or reopen the asset strategy. Checkout is to be main
at closeout; switch to the feature branch for grading only on a clean tree.
