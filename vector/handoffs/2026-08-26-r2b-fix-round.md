# Handoff -- agentic-portfolio -- 2026-08-26

**Round:** craft arc R2b, the fix round (steps 1 and 2 of 4).
**Seat/model:** Tyrell on Opus, pinned at launch.
**Prompt:** `~/projects/plans/prompts/2026-07-31-portfolio-r2b-fix-round-tyrell.md`
**Branched from:** origin/main `7f18e5d`. **Ends at:** main `cd79327`.

---

## Done (verified)

**PR #221 -- Flight Deck fault boundary.** Merged (`85ea3be`).
The repo's first error boundary, wrapping the lazy work in `WorkView`, with a
designed fault card (`WorkFault`) built on lab tokens rather than deck tokens so
it still renders when the failure is the work's chunk never loading. Recovery is
a key-bumped remount, not a state reset. 4 regression tests.

**PR #222 -- the seven mechanical clusters.** Merged (`cd79327`). Five commits,
one per cluster:
- `a49bf6e` motion timing -- `@utility` registration for the six duration
  tokens, the theme-switch transition moved into `@layer base`, and
  `ThemeProvider`'s background-tab-safe teardown. 4 guards.
- `fd60df4` day-mode hero scrim -- per-mode `--hero-scrim-*` reach.
- `e6a2e8b` inert now-playing panel, footer link accessible name and external
  cue, MetricCard prints its figure (CountUp deleted).
- `d8871e2` image pipeline -- every `sizes` re-derived from measurement,
  `ParallaxImage` takes `sizes` as a prop, `DraftedObjectMark` routed through
  `ResponsiveImage`, Wallace hero alt corrected.
- `34039c3` + `24062c8` + `8bfa7a2` resume print-to-PDF, three passes (built,
  then fixed on Justin's grade, then set to two pages at 10pt on his call).

**Gates on merged main:** lint 0 errors (2 pre-existing warnings), build clean,
**397/397 tests** -- 381 at the arc's start, +16 across the two PRs.

**Production is serving it.** `https://justinh.design/assets/main-BCZEcsro.css`
contains the `data-print` sheet, the `duration-normal` utility, and both
`--hero-scrim-bottom-fade` values (64% dark / 95% light). Both entries answer
200, including `labs.justinh.design`.

**Justin's browser grades, given 2026-08-26:** heroes pass ("text is readable on
light mode"), motion "looks great", count-up stays dead, images pass, Perihelion
link passes. Print was rejected on the first pass and accepted after the
two-page rework.

### Three R2a findings corrected

Verified against the tree; do not act on the originals.

1. **The deck exits do not crash.** Production build and dev-under-StrictMode
   both complete cleanly. Both teardowns were already guarded, and the real
   defect was latent rather than live: `host.contains()` paired with
   `host.removeChild()` (contains is true for any descendant, removeChild
   demands a direct child). Now `ChildNode.remove()`.
2. **The srcset width descriptors do not lie.** All 494 generated variants
   checked against their declared widths with sharp: zero mismatches. The
   "760-768px" figures are rendered slot widths.
3. **"90% of the home kicker below AA" is a measurement artifact.** R2a sampled
   whole `<p>` block boxes, mostly empty space beside a short line. Over
   text-range rects the kicker passes; the real failures were the h1 (33% of
   glyph area) and the standfirst (55%), both now 0%.

---

## Claimed but unverified

**"Every completed session ends in a dead white screen"** (R2a P0 1). Neither
confirmed nor refuted. The happy-path exits are clean in both environments, but
a *completed* session -- drill worked, paradigm crossed to the consciousness end
-- could not be driven from the automation harness: the Browser pane runs
backgrounded, so `requestAnimationFrame` is suspended and GSAP never ticks. A
MessageChannel shim got the deck to boot and both exits to fire, but the drill
scheduler never armed under it.

*What would verify it:* one manual pass in a real browser -- boot the deck,
commit a proposal, work the drill, drag the paradigm slider to the consciousness
end, then take both exits. If it crashes now, the boundary catches it and the
fault card appears instead of a blank page, which is itself the answer.

---

## Open threads

**Decisions owed by Justin.** None blocks the eyebrow round; two are arguably
its own subject.

| Thread | The call |
|---|---|
| `/notes` hero `opacity-40` | With the stronger day scrim it reads as an image that failed to load. The component comment says the faintness is deliberate and the surface's shaping is R5. Keep the ghost, or let the image back? |
| Case-study cover crop | 16:9 assets mounted in a 4:3 slot with `object-cover`. Change the slot or the assets? |
| Dual-mode assets (P0 7) | `before-flow.png`, `sow-flow-diagram.png`, `detail-ops.png` have dark backgrounds baked into the raster and read as black rectangles on the day-mode sand page. Wallace re-renders, or a dual-mode image strategy? |
| `MetricCard.isStatement` threshold | Fires at label length > 72 while the captions that trip `all-caps-body` run 31-55 chars. Drop to ~45 in the eyebrow round? |
| Flight Deck at 1280x800 | The field's large `WALL / EVEN / STRESS` readout overlaps the PROPOSALS row. Pre-existing, sits beside ruling 15 (height-gate to the static plate). |

**Kit / upstream feedback**, owed to the detector thread. Impeccable 4.1.1 ran
throughout and never printed degraded. Two false-positive classes confirmed by
measurement, both worth reporting:
- `text-overflow` fires on inline elements, which report `scrollWidth` and
  `clientWidth` of 0. The footer Perihelion link's "overflows 38px" is this:
  measured live the anchor is 111px inside a parent ending at 1192px, and
  `documentElement.scrollWidth === clientWidth`.
- Block-box contrast sampling (R2a's own method, not the detector's) reads a
  mostly-empty `<p>` as failing text. Sample text-range rects.

**Stale drafts, untouched:** PRs #205 and #152 were open before this round and
are not R2b's.

**Housekeeping, noticed not acted on:** a stale git worktree at
`.claude/worktrees/priceless-aryabhata-0495e3` (detached at `f329592`) is
carrying a full second copy of `src/`. ESLint scans it, which is where one of
the two pre-existing lint warnings comes from. Twenty-eight local branches, most
long merged.

---

## Gotchas learned

**The Browser pane runs backgrounded, and `requestAnimationFrame` is fully
suspended in it.** Zero frames in 2000ms, `document.hidden` stays true even
after `tabs_select`. GSAP timelines never advance, `motion/react` reveals stay at
`opacity: 0`, and screenshots capture the pre-animation state -- it will look
like a bug in the page every time. Screenshots and `setTimeout` still work; only
rAF is dead. Workaround and its caveats: `[[reference-browser-pane-raf-suspended]]`
in memory. **The shim must be restored out of the entry HTML before every
commit.**

**Tailwind v4 has no `--duration-*` theme namespace,** and **unlayered CSS
outranks the utilities layer.** Both silently disable authored transition
timing while leaving the markup looking correct. Full note:
`[[reference-tailwind-v4-motion-token-traps]]`. Guarded by
`src/lib/motionTokens.test.ts`.

**Measure slots, do not reason about them.** Every `sizes` attribute in the repo
described a slot its element does not occupy, including one hardcoded to a
layout it has never been mounted in. Eleven viewport widths per element, read
off `getBoundingClientRect`, settled all of them -- and answered the standing
"are the renders soft?" question as a side effect.

**`break-inside: avoid` is density-dependent.** On `article` it was the wrong
rule at one-page density (a half-page hole) and the right rule at two-page
density (a short band of white). Same declaration, opposite outcome.

**`min-h-screen` on `<main>` survives into print** and can hold a page open past
its content.

**Vitest cannot read CSS through `?raw`** -- it returns empty. Guards that need
to read a stylesheet must use `node:fs`, which is why `@types/node` is now an
explicit devDependency rather than a transitive one.

**Justin's own instinct on the resume was right and mine was wrong.** One page
was reachable at 8.75pt with under a line of slack; he called two pages at 10pt.
A resume is read by a person. When a fit is that tight, surface the tradeoff
instead of shipping the squeeze.

---

## Pickup prompt

> Craft arc R2b step 3 -- agentic-portfolio: the eyebrow round.
>
> Fresh session, Tyrell, pinned to **Opus** (`claude --model claude-opus-5`),
> run from `~/projects/agentic-portfolio`. Justin grades in the browser, one
> surface at a time.
>
> **READ FIRST:**
> 1. `vector/handoffs/2026-08-26-r2b-fix-round.md` -- this file. The three
>    corrected R2a findings matter: do not re-fix what was never broken.
> 2. `.impeccable/r2a-sweep-report.md` -- the AI-tell verdict section and the
>    per-surface kicker counts.
> 3. `~/projects/plans/2026-07-30-portfolio-craft-arc.md` -- decisions 4 and 5
>    bind, and decisions 6-15 are Justin's ten rulings.
> 4. Per-surface detail: `.impeccable/critique/*.md` (18 v4 snapshots;
>    `/impeccable polish` reads them as its backlog).
>
> **STATE:** main @ `cd79327` -- R1 (#219), R2b step 1 (#221), R2b step 2 (#222)
> all merged and live in production. Gates on merged main: lint 0 errors, build
> clean, 397/397 tests. Verify against ORIGIN before branching, not the local
> checkout. No portfolio dev server will be running; start your own and confirm
> page identity by `<title>`, never by status code.
>
> **THE WORK.** 31 hits of the identical mono-kicker recipe across 17 components
> in the main app; 41 occurrences across 22 files including notes. Per surface:
> constellation 29, doctrine-not-prompts 27, instant-doc-review 24, instant-sow
> 17, wallace 15, home 14, ai-leadership 13, /work 11, about 10, resume 10, lab
> index 11-of-12 rows, hub 8. The Flight Deck's ~14 avionics labels are
> legitimate instrument labels, not kickers; only ~6 are true eyebrows.
>
> This is **not** a find-and-delete. v4's craft floor bans the eyebrow flat, and
> removing one is a small design change per section header: the heading has to
> carry the weight the label was doing. The in-house counter-example already
> exists -- the design-infrastructure note renders exactly one true eyebrow and
> is better for it.
>
> **Reconcile DESIGN.md by hand in the same PR.** Its locked type stack still
> legitimizes the mono kicker that the craft floor bans; for this arc
> `kicker-above-heading` is a true positive by ruling, and the DESIGN.md
> conflict is itself the finding. Never run `/impeccable document`, never rename
> the `## Color` heading (arc decision 5 -- the parser trap is tested and
> recorded).
>
> **Two carried threads that belong to this round:** `MetricCard.isStatement`
> fires at label length > 72 while the captions that trip `all-caps-body` run
> 31-55 chars (~45 catches them all), and the sentence-length uppercase mono
> label is the same family as the eyebrow. Ask Justin before changing the
> threshold; it is visible on several surfaces.
>
> **DO NOT:** touch `core/content/*.md` (prose is R3, Justin's hands only); run
> `/impeccable document` or rename DESIGN.md headings; re-fix the three
> corrected R2a findings; write into `~/projects` coordination files.
>
> **GATES:** feature branch, PR, Justin merges. lint + build + test green. When
> the surfaces are done, re-run `/impeccable critique` on the changed ones and
> check the FIRST output line every run -- a run that prints degraded is not a
> run.
>
> **OPEN (Justin):** browser grades per surface; the five decisions listed in
> the handoff; PR merge. Also still owed: one manual pass through a *completed*
> Flight Deck session to close the last unverified R2a claim.
