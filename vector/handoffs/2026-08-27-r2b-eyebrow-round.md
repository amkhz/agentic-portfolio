# Handoff -- agentic-portfolio -- 2026-08-27

**Round:** craft arc R2b step 3, the eyebrow round. Closes R2b.
**Seat/model:** Tyrell on Opus, pinned at launch.
**Prompt:** `~/projects/plans/prompts/2026-08-26-portfolio-r2b-eyebrow-tyrell.md`
**Branched from:** origin/main `fc74b3d`. **Ends with two PRs open, nothing merged.**

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

**Both PRs await Justin's merge.** #225 and #226. Neither blocks the other.

**Decisions owed by Justin** (four; the `isStatement` one is now closed):

| Thread | The call |
|---|---|
| `/notes` hero `opacity-40` | Raised at grading, not answered. Reads as a failed image in day mode; the component comment says the faintness is deliberate and shaping is R5. |
| Case-study cover crop | 16:9 assets in a 4:3 slot with `object-cover`. |
| Dual-mode assets (P0 7) | `before-flow.png`, `sow-flow-diagram.png`, `detail-ops.png` carry baked dark backgrounds. |
| Flight Deck at 1280x800 | `WALL / EVEN / STRESS` overlaps the PROPOSALS row. Pre-existing, sits beside ruling 15. |

**Ruled 2026-08-27: leave the effects family.** `Particles`, `Threads`,
`SpotlightCard`, `DecryptedText`, `GlowEffect` are unreached and stay. So do
`core/tokens/index.ts` and `src/lib/site-metadata.ts` (both unreached from the
app entries, both documented in ARCHITECTURE.md). One asymmetry left behind on
purpose: `ParticlesTuner` is deleted while `Particles` stays, so that component
now has neither tuner nor consumer.

**Also noticed, not acted on:** About's `h1` is `text-3xl` where `/work` and
`/notes` are `text-4xl`, and it now opens the page alone on a plain field with
nothing above it. Flagged to Justin at grading; he passed the round without
changing it.

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

> Craft arc: R2b is built and graded; R3 is next. agentic-portfolio.
>
> **First, check what landed.** PRs
> [#225](https://github.com/amkhz/agentic-portfolio/pull/225) (the eyebrow
> round, graded and passed) and
> [#226](https://github.com/amkhz/agentic-portfolio/pull/226) (the unreachable
> Codex subtree, 1,034 lines) were both open and MERGEABLE at handoff with
> nothing merged. `gh pr list` first, then `git pull`. They compose in either
> order -- verified locally at 392/392. If both merged, main should be lint 0
> errors / 1 warning, build clean, 392/392, and the site should be live in prod.
>
> **READ FIRST:**
> 1. `vector/handoffs/2026-08-27-r2b-eyebrow-round.md` -- this file. The R2a
>    `~45 catches them all` claim is wrong twice over; the correction is
>    recorded and shipped, do not re-derive it.
> 2. `vector/handoffs/2026-08-26-r2b-fix-round.md` -- the three corrected R2a
>    findings. Do not re-fix what was never broken.
> 3. `~/projects/plans/2026-07-30-portfolio-craft-arc.md` -- decisions 4-15.
>    Decision 4 governs what runs next.
>
> **R3 is the copy pass, and it is Justin's hands.** `core/content/*.md` was
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
> **Still owed to the arc, not to R3:** one manual pass through a *completed*
> Flight Deck session in a real browser (drill worked, paradigm to the
> consciousness end, both exits) closes the last unverified R2a claim. The
> automation harness cannot drive it -- rAF is suspended in the Browser pane.
>
> **Four decisions still owed by Justin,** none blocking: `/notes` hero
> `opacity-40`, case-study cover crop, dual-mode assets (P0 7), Flight Deck at
> 1280x800. Also unresolved by choice: the unreached effects family
> (`Particles`, `Threads`, `SpotlightCard`, `DecryptedText`, `GlowEffect`) stays
> on his 2026-08-27 ruling, leaving `Particles` with neither tuner nor consumer.
>
> **DO NOT:** run `/impeccable document` or rename DESIGN.md headings (arc
> decision 5, and the parser trap is tested and recorded); rewrite prose in
> `core/content/*.md`; write into `~/projects` coordination files; delete
> `spike/paper-shaders`, `feat/lab-archival-paper`, or
> `feat/selecta-case-study-draft`.
>
> **GATES:** feature branch, PR, Justin merges. lint + build + test green.
> Grade anything visual in Justin's real browser, never through Browser-pane
> screenshots.
