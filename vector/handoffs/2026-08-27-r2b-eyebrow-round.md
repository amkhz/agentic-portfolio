# Handoff -- agentic-portfolio -- 2026-08-27

**Round:** craft arc R2b step 3, the eyebrow round. Closes R2b.
**Seat/model:** Tyrell on Opus, pinned at launch.
**Prompt:** `~/projects/plans/prompts/2026-08-26-portfolio-r2b-eyebrow-tyrell.md`
**Branched from:** origin/main `fc74b3d`. **Ends with four PRs open, nothing
merged.** Justin ruled on five carried decisions in session; two of them are
decided and not yet built, and are the next session's first work.

---

## Done (verified)

**PR #225 -- the eyebrow round.** `fix/r2b-eyebrow-round`, three commits
(`0d92ca5`, `a840ea5`, `07b150d`), pushed, MERGEABLE, awaiting Justin.

All 31 hits of the mono-kicker-above-heading recipe are retired. Verified by
querying the live DOM on every main route plus the lab index and a guide page:
**zero label-above-heading sites remain.** Uppercase survivors are tags,
catalog marks, instrument labels and link affordances. Home's uppercase set
went 14 to 10; `/notes` to 2; the hub to 5 (all arrows).

Removal was never the whole job. Where a kicker carried information, the
information moved:

| Surface | Was | Now |
|---|---|---|
| Home hero | `00 / PRODUCT DESIGN LEADERSHIP` | `00` alone; phrase opens the lede |
| Home featured / index | `FEATURED CASE FILE`, `INDEX` | nothing |
| `/work`, `/notes` | mono above one-word h1s | `Field notebook`, `Marginalia` **are** the h1s |
| `/work` list | frame header `SELECTED CASE FILES` | a real `h2` |
| Case study + constellation heroes | `study.tags[0]`, reprinted in the tag row below | nothing |
| Hub hero | the study's own title | nothing |
| Hub door cards | target title, door label whispered above | the door label **is** the h2 |
| Lab register + guide headers | `RESEARCH GUIDE SERIES` x23 | nothing |
| Works registration, deck colophon | accession marks in the eyebrow slot | kept, reseated to gutter / provenance |
| About running head | `01 / LIFE` stacked on mobile | margin only, dropped below lg |

**DESIGN.md reconciled by hand, same PR.** The third face is now a **label**
face; the case-study grammar no longer opens its spread with a kicker. A dated
2026-08-27 amendment records that those two lines together had licensed the
recipe. `document` never run, `## Color` never renamed (arc decision 5). This
closes R1's deferred `design-md-coverage` finding.

**Justin graded every surface in his own browser and passed the round.**

**Gates on #225:** lint 0 errors / 1 warning, build clean, **401/401** (was 397).

**PR #226 -- the unreachable Codex subtree.** `chore/remove-codex-dead-code`,
one commit (`94d5812`), branched from main, independent of #225. 1,034 lines.

`CodexPage` renders a whole third case-study template and nothing routes to it:
`CaseStudyPage` dispatches on `study.template`, only ever undefined, `hub`, or
`constellation`. Deleted: `CodexPage`, `CodexSpine`, `CodexNode`,
`CodexChapter`, `Tag` (CodexPage was its only consumer), `core/content/codex.ts`
+ its test, `ParticlesTuner`. ARCHITECTURE.md and MANIFEST.md updated in the
same commit. `tabOrder` guard floor 75 to 70 -- it is a sanity check on the
scan, not a coverage target, and the controls it lost were in files no route
rendered. **Gates:** lint clean, build clean, **388/388** (401 minus the nine
`codex.ts` unit tests).

**PR #228 -- the cover slot at 16:9.** `fix/cover-slot-16x9`, one commit
(`d5d2d27`), branched from main. Justin's ruling on the crop thread, taken in
session against measured evidence.

Six of seven covers are 16:9 renders; the plate was 4:3 with `object-cover`, and
`ParallaxImage` lays the image out at `h-[114%]` on top of that, so at rest the
plate showed **58%** of the image. Slot moved to 16:9 in two places -- the
case-study cover plate and `/work`'s featured entry, which mounts the same asset
family through the same crop. Per-cover share never reaching the page:
42-43% to 22-24% on the six 16:9 sources; `sow-toolbox-hero` (the one 4:3
source, 1420x1065) goes 23% to 25%, which is the honest cost of matching the
ratio the other six were rendered at. **Gates:** lint clean, build clean,
**397/397**.

**The two PRs compose.** Merged locally in combination: **392/392 tests**, build
clean, no conflicts. Merge order does not matter.

### The R2a `~45 catches them all` claim is wrong, twice over

Measured every metric caption in `core/content`. Two compounding errors:

1. `isStatement` is gated on `!parsed`, and **every** shouted caption sits under
   a value that parses as a figure (`4 directions`, `50%`, `1 spec`). Lowering
   the threshold alone was a **no-op**. The caption's *register* was wrong, not
   the branch it took, so both branches now drop mono caps past the threshold.
2. Raw length does not find the line either. 45 leaves `Rendered as finished
   heroes, not mood boards` (44) shouting; 30 demotes `Eligible loans used SOW
   Recycle` (31), which never was. **The clause is the discriminator and the
   comma is where it shows.** Shipped: over 45 chars, or over 30 with a comma.
   Justin's call, taken on the measured table.

Four new guard tests pin the register both ways.

---

## Claimed but unverified

**None from this session's own work** -- every claim above is checked against
the tree, a command's output, or the live DOM.

**Still owed to the arc, unchanged:** "every completed session ends in a dead
white screen" (R2a P0 1). Needs one manual pass through a *completed* Flight
Deck session in a real browser -- drill worked, paradigm dragged to the
consciousness end, then both exits. The automation harness cannot drive it (see
Gotchas). This is the last open R2a claim.

---

## Open threads

**Four PRs await Justin's merge.** #225 (the round), #226 (dead Codex subtree),
#227 (this handoff), #228 (cover slot). All branched so as not to depend on each
other; #225 and #226 verified to compose at 392/392.

### Decisions taken 2026-08-27 (Justin, in session)

Five of the six carried threads are now ruled. **Two are decided but NOT yet
built** -- they are the next session's first work, and the decision is made, so
do not re-open them.

| Thread | Ruling | State |
|---|---|---|
| Case-study cover crop | **Change the slot to 16:9.** | **BUILT** -- PR #228 |
| Dual-mode assets (P0 7) | **Frame them.** Keep the rasters and give them a deliberate dark plate on the light page, so the dark ground reads as an intentional inset rather than a broken image. Not re-rendered, not dual-sourced, not redrawn. | **NOT BUILT** |
| About `h1` | **Bump to `text-4xl`,** matching `/work` and `/notes`. It opens the page alone now that the eyebrow is off. | **NOT BUILT** -- one class |
| `/notes` hero `opacity-40` | **Keep the ghost, defer to R5.** The faintness is the intended register for the reflective surface; R5 shapes `/notes` properly, including whether it keeps a hero image at all. | Closed, no work |
| Effects family | **Leave them.** `Particles`, `Threads`, `SpotlightCard`, `DecryptedText`, `GlowEffect` are unreached and stay, as do `core/tokens/index.ts` and `src/lib/site-metadata.ts`. | Closed, no work |
| `ParticlesTuner` / `Particles` asymmetry | **Record it, leave both alone.** #226 deletes the tuner while `Particles` stays, so that component now has neither tuner nor consumer. This is a known state, not an oversight. | Closed, recorded |

### Still genuinely open

| Thread | Why it is still open |
|---|---|
| Flight Deck at 1280x800 | `WALL / EVEN / STRESS` overlaps the PROPOSALS row. Never put to Justin this session. Pre-existing, and sits beside arc ruling 15 (height-gate to the static plate). |
| Parallax overscan on covers | Surfaced by #228 and deliberately not decided there. `ParallaxImage` lays the cover out at `h-[114%]`, which is now the *entire* remaining crop: a 16:9 cover in the 16:9 slot still loses 22% at `1.14`, 10% at `1.06`, nothing at `1.00`. How much travel the parallax needs is a design call. |
| `sow-toolbox-hero` re-render | The one 4:3 cover (1420x1065). #228 costs it 2 points (23% to 25%) to match the ratio the other six were rendered at. Worth a 16:9 re-render whenever that cover is next touched. |
| Cover spread composition | #228 takes the plate from 432x337 to 432x265 at 1440, so it sits 90px shorter than the type column where it used to be near flush. Wants Justin's eyes before #228 merges. |

**Stale drafts, untouched:** PRs #205 and #152, open before this round.

**Branches:** `docs/r2b-handoff` and `claude/laughing-mahavira-978815` are now
fully merged into main via #224 and can be deleted. `spike/paper-shaders`,
`feat/lab-archival-paper`, `feat/selecta-case-study-draft` are deliberately kept.

---

## Gotchas learned

**Check the alias map before believing a reachability crawl.** The first pass
reported the entire live Perihelion tree as unreachable -- 60 files -- because
the crawler did not know about the `@lab` alias in `vite.config.ts`. A dead-code
sweep that trusts an incomplete resolver will happily propose deleting the site.
Resolve every alias the bundler resolves, follow dynamic `import()` and barrel
re-exports, and sanity-check the result against something you know ships.

**A count-based test guard fails when you delete dead code.** `tabOrder.test.ts`
asserts the scan found at least N interactive elements site-wide. Deleting
unrendered files dropped it below the floor even though the shipped site was
unchanged. The floor was a sanity check on the scan, so it moves; a floor that
tracks source-file volume rather than shipped behaviour will keep doing this.

**Deleting code without touching the docs that list it is drift.**
ARCHITECTURE.md's tree, MANIFEST.md's component tables, and MANIFEST's "three
presentation formats" prose all named the Codex. Same commit, or Roy finds it.

**Grep-level dead-code confidence is not confidence.** `CodexPage` looked dead
from a zero-reference grep, which is where the suspicion started -- but the
subtree's real extent (eight files, including a core module with its own test
suite) only came out of the import crawl.

**A washed-out screenshot is a finding until proven otherwise.** This session
had the rAF gotcha banked, took a brown-screen screenshot of its own artifact,
checked the DOM, found correct computed styles and correct geometry, and
concluded the harness was lying. It was not. The page really was a brown screen
and Justin saw exactly what the capture showed. Three real bugs were hiding
behind that dismissal: a `9999px` spread shadow on an element whose parent had
`overflow: visible`, painting over the whole 9304px document seven times; a 62%
scrim over chiaroscuro night renders on a dark ground, which would have read as
black even correctly clipped; and fourteen base64 images with no `width`/
`height`, reflowing the page continuously as they decoded. **Geometry and
computed style cannot see paint.** Reach for the harness explanation only after
the page itself is cleared.

**The Browser pane runs backgrounded and `requestAnimationFrame` is fully
suspended.** Reconfirmed. `motion/react` reveals sit at `opacity: 0`, and both
`getBoundingClientRect().width` and `get_page_text` then report the page as
empty -- it looks like a bug in the site every time. What still works:
`querySelectorAll`, `getComputedStyle`, and `document.title`. Grade **structure
and computed style** from the pane; grade **anything visual** with Justin's eyes
in his real browser. Full note: `[[reference-browser-pane-raf-suspended]]`.
Never leave a rAF shim in entry HTML at commit time.

**Collapsing an element can silently demote its token.** Reducing the hero's
`00 / PRODUCT DESIGN LEADERSHIP` to a lone `00`, the numeral came out
`text-text-muted` -- a step quieter than it had ever been, on the one surface
R2a already flagged for text over photography. Caught by reading computed style,
not by looking. When you merge two elements into one, carry the surviving
element's own token, not the weaker of the pair.

**`study.tags[0]` was the case-study kicker.** The hero eyebrow was literally
the first tag, reprinted by `DossierTags` three elements below it. Worth
knowing that some of the 31 were not design decisions at all, just duplication
nobody had looked at.

---

## Pickup prompt

> Craft arc: R2b is built and graded. Two decided-but-unbuilt items first, then
> R3. agentic-portfolio.
>
> **First, check what landed.** Four PRs were open and MERGEABLE at handoff with
> nothing merged:
> [#225](https://github.com/amkhz/agentic-portfolio/pull/225) the eyebrow round
> (graded and passed by Justin),
> [#226](https://github.com/amkhz/agentic-portfolio/pull/226) the unreachable
> Codex subtree (1,034 lines),
> [#227](https://github.com/amkhz/agentic-portfolio/pull/227) this handoff, and
> [#228](https://github.com/amkhz/agentic-portfolio/pull/228) the cover slot at
> 16:9. All four branch off main independently; #225 and #226 were verified to
> compose at 392/392. `gh pr list` first, then `git pull`, and take main's real
> gate numbers from a run, not from this file.
>
> **READ FIRST:**
> 1. `vector/handoffs/2026-08-27-r2b-eyebrow-round.md` -- this file. Two
>    corrections in it are load-bearing: the R2a "`~45` catches them all" claim
>    is wrong twice over, and a reachability crawl that skips the `@lab` alias
>    reports the entire live Perihelion tree as dead. Neither wants re-deriving.
> 2. `vector/handoffs/2026-08-26-r2b-fix-round.md` -- the three corrected R2a
>    findings. Do not re-fix what was never broken.
> 3. `~/projects/plans/2026-07-30-portfolio-craft-arc.md` -- decisions 4-15.
>    Decision 4 governs what runs after R3-prep.
>
> **BUILD THESE TWO FIRST. Both are decided; neither is built. Do not re-open
> the decision, and do not put the choice back to Justin.**
>
> 1. **Dual-mode assets, P0 7 -- frame them.** `before-flow.png`,
>    `sow-flow-diagram.png` and `detail-ops.png` carry dark backgrounds baked
>    into the raster and read as black rectangles on the golden-hour page.
>    Justin's ruling 2026-08-27: **keep the rasters and give them a deliberate
>    dark plate on the light page**, so the dark ground reads as an intentional
>    inset rather than a broken image. Explicitly rejected: Wallace re-renders,
>    a dual-mode two-asset strategy, and redrawing them as themed SVG. Note for
>    context, not for scope creep: R2a separately called `sow-flow-diagram` an
>    archetypal generic AI flowchart using green as a status color against
>    doctrine. That is an R3-or-later content question, not part of framing them.
> 2. **About's `h1` to `text-4xl`.** One class in `src/pages/AboutPage.tsx`. It
>    is `text-3xl` where `/work` and `/notes` are `text-4xl`, and since the
>    eyebrow came off it opens the page alone on a plain field.
>
> **Then R3, the copy pass, and it is Justin's hands.** `core/content/*.md` was
> untouched through all of R2b by design. The workflow is IDE-direct (arc
> decision 1): Justin edits with the dev server hot-reloading beside him, gaff
> marks up, he rewrites, a mechanical sweep follows. **Models mark up, never
> rewrite prose.** R3-prep -- the honesty interview, Stelline, in chat, per case
> study -- runs before it, and `/impeccable init` runs after R3-prep, not before
> (arc decision 4).
>
> R2a banked the copy flags for R3 in `.impeccable/r2a-sweep-report.md`:
> tricolons everywhere (four on home, "craft, curiosity, and a crew of AI
> collaborators" the worst); instant-sow's Results mixing unmet targets with
> outcomes while contradicting its own hero metric; ai-leadership's magenta joke
> metric beside real outcomes; the hub-vs-note redundancy; uap-field-map's 308
> bold runs.
>
> **Closed, so do not raise them again:** `/notes` hero `opacity-40` keeps the
> ghost and defers to R5; the unreached effects family (`Particles`, `Threads`,
> `SpotlightCard`, `DecryptedText`, `GlowEffect`) stays, as do
> `core/tokens/index.ts` and `src/lib/site-metadata.ts`; the
> `ParticlesTuner`-deleted-while-`Particles`-stays asymmetry is a known state,
> not an oversight.
>
> **Genuinely open, and Justin's to call:** the Flight Deck at 1280x800
> (`WALL / EVEN / STRESS` overlaps the PROPOSALS row -- never put to him, sits
> beside arc ruling 15); the parallax overscan, which is now the entire
> remaining cover crop (`h-[114%]` costs a 16:9 cover 22%, `1.06` would cost
> 10%, `1.00` nothing); a 16:9 re-render of `sow-toolbox-hero`, the one 4:3
> cover; and whether the shorter cover plate still balances the type column
> beside it, which wants his eyes before #228 merges.
>
> **Still owed to the arc, not to R3:** one manual pass through a *completed*
> Flight Deck session in a real browser -- drill worked, paradigm dragged to the
> consciousness end, then both exits -- closes the last unverified R2a claim.
> The automation harness cannot drive it; rAF is suspended in the Browser pane.
>
> **DO NOT:** run `/impeccable document` or rename DESIGN.md headings (arc
> decision 5, and the parser trap is tested and recorded); rewrite prose in
> `core/content/*.md`; write into `~/projects` coordination files; delete
> `spike/paper-shaders`, `feat/lab-archival-paper`, or
> `feat/selecta-case-study-draft`.
>
> **GATES:** feature branch, PR, Justin merges. lint + build + test green.
> Grade anything visual in Justin's real browser. Browser-pane screenshots are
> worth taking, but when one looks wrong, treat it as a real finding to chase
> before reaching for the rAF explanation -- this session got that backwards
> once and shipped a page that was genuinely broken.
