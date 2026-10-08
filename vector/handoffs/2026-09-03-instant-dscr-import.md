# Handoff -- agentic-portfolio -- 2026-09-03

**Round:** Instant DSCR case-study import (the craft arc's R3-prep lane).
**Seat/model:** Tyrell on Opus, pinned at launch, with the Writer lane's content rules.
**Prompt:** `~/projects/plans/prompts/2026-08-27-portfolio-dscr-import.md`, plus the
INTERVIEW RECORD appended to it 2026-09-03.
**Branched from:** origin/main `2470ea3`. **Ends with one PR open, nothing merged.**

---

## Done (verified)

**PR #230 -- the import.** `feat/instant-dscr-case-study`, one commit `94f1aa9`,
pushed, OPEN and MERGEABLE, 18 files.
https://github.com/amkhz/agentic-portfolio/pull/230

**The security gates all ran against the diff, not the tree, and came back
empty.** The vendor name, the dev-account email in text, and every source-bundle path
fragment: zero hits. The quarantined internal evidence file and the code patch (an
appliable diff of Kiavi production source plus its base commit hash) never
entered the repo in any form. Two checks the prompt did not ask for and that are worth keeping in the
recipe:

- **The nine PNGs were scanned as binaries**, not just by filename: no
  `tEXt`/`iTXt`/`zTXt` chunks, no embedded paths, and macOS xattrs cleared.
  Metadata is a text-leak vector a diff grep does not see.
- **Every published screenshot was read before committing.** No vendor name in
  pixels; all borrower data synthetic (Test LLC, Jane Smith, 456 Palm Beach
  Blvd). `paper/01`'s footer reads "the pricing vendor" as the source promised.

**3.8MB of source PNGs entered, not the bundle's 22MB.** Seven screenshots
(~2.4MB) plus the mark pair. Variants stay gitignored; the manifest is committed
at 68 entries.

**The study is registered and live.** Verified by querying the DOM on a real dev
server, not from screenshots:

| Check | Result |
|---|---|
| Headings | one `h1`, `h2`s in order, no `h3`, no skipped levels |
| Kickers | **zero** uppercase labels above any heading |
| Spread | flush -- both grid cells `offsetTop` 193 |
| Cover | 16:9 slot, ratio 1.778, `object-fit: contain`, AVIF variant served |
| Exploration row | both comparison rows, labels A-D, contained, nothing cropped |
| Cross-links | hub -> study, `instant-doc-review` <-> study, both directions |
| Work index | the study appears with its thumb, seated with the instant family |

**Gates:** lint 0 errors / 1 pre-existing warning (`renderSection.tsx:16`),
build clean, **399/399 tests** (+2, both new parser tests).

**All eight interview rulings applied.** Claim status was ruled closed before
the session started (freeze lifted, both PRs merged, E9's tests landed), so the
as-if-shipped prose is true and DO step 3's tense edits were correctly dead.

---

## Claimed but unverified

**Nothing visual has been graded.** The Browser pane suspends rAF, so entrance
animations freeze mid-transition and screenshots capture a page at partial
opacity. Structure was verified in the DOM; **how the study actually looks is
Justin's browser, not this session's.** Specifically ungraded:

- the contained ragged-ladders cover in the 16:9 plate (measured to be right,
  never seen at rest)
- **the mark seed itself, which this session should not have picked.** Justin
  caught it mid-round: Wallace defaults to Coworker mode, so the caption goes to
  him before rendering and the winning seed is his call, not the session's. All
  three seeds were sent to him after the fact. **8303 is committed provisionally
  and may be swapped** -- the crops are derived, so it is a regeneration and an
  amended commit
- the mark beside the table of contents, and the thumb on `/work`
- the two comparison rows as an "exploration row" -- option A is 1.93:1 in a
  4:3 cell, so it sits smaller than B, C and D

---

## Open threads

**PR #230 awaits Justin's merge.** Nothing else is queued behind it.

**Decisions owed by Justin (all deliberately deferred, none blocking):**

1. **Title and subtitle.** Both provisional by ruling 1. The title is the
   source's placeholder; the subtitle is this session's, because the source
   supplied none. R3 decides.
2. **Em-dashes.** The source uses them throughout and the house rule bans them.
   Left in on purpose -- stripping them is voice work and voice is R3. This is
   the single biggest thing gaff will mark up.
3. **Which mark seed ships.** 8301, 8302 or 8303 (committed provisionally), or
   a redirected caption and a fresh sweep. See the gotcha below for the read on
   each.
4. **`instant-sow` has no banner.** `relatedStudy` is singular, so only
   `instant-doc-review` could pair with this study. Whether the SOW study should
   also point at it is a real question this session did not answer.

**Consequences of the image ruling, for the record.** The selected set excludes
the clamp screenshots and the decided-option board, so section 6 lost its two
image pairs and section 3 lost `option-e`. The information is intact in prose
(the before/after dial values became two list items), but those sections now run
image-free. If that reads thin in Justin's grade, the fix is a follow-up ruling
on the image set, not a rewrite.

**Banked for a later round, unrouted in `core/content/drafts/`:**
`instant-dscr-design-system.md` and `instant-dscr-ai-tooling.md` (the two cut
sections, ruling 2, material for two Notes mini-studies) and
`instant-dscr-year-arc.md` (ruling 3). No registry entry, no note, no route, no
draft mechanism -- Justin: "I don't really want to introduce draft state to
notes."

---

## Gotchas learned

**The house parser has no table support, and the source was table-heavy.** Six
markdown tables would have rendered as literal pipe text inside a `<p>` --
`parseInline` handles bold, italic and links only. This was the whole structural
job of the import: stats to a metrics fence, the A-D boards to two comparison
fences, the domain and clamp tables to lists. **Any future import from a
document-shaped source hits this first.**

**A `##` heading directly above a list was silently dropped.** `flushText`
cleared `currentHeading` and `ListSection` had nowhere to carry it, so
`## Receipts` lost its heading, its Contents-index entry and its anchor. Fixed
in this PR: `ListSection` takes an optional heading, claimed only when the flush
did not already spend it on a lead-in paragraph. Two tests. **No existing study
hits the case** (only `voice-profile.md`, which is not rendered), so the change
is inert everywhere else.

**A list item that wraps across lines silently ends the list.** The parser
breaks on the first line not starting with the marker, and the continuation
becomes body text. Every multi-line item from the source had to be unwrapped to
one physical line.

**`fit: 'cover'` would have destroyed the cover, and the width is why.** The
#228 lesson generalizes further than the height crop it was found on. At
2040x1257 in the 16:9 plate, `object-cover` plus `ParallaxImage`'s `h-[114%]`
box shows the middle ~87.7% of *both* axes -- and 6% off each side of the width
clips the start of every line of type on the board, because every line starts at
the same left margin. The height crop alone would have been survivable; the
width crop is not. **Measure both axes, not the one that looks obviously at
risk.**

**The gate's path-fragment pattern needs qualifying, or it flags itself.** The
branch name `feat/instant-dscr-case-study` contains the source bundle's own
directory name, so a bare substring grep reports a hit on legitimate repo
content. Match the path-qualified forms instead (`port-sources`,
`port-sources/<bundle>`, the internal evidence filename, the base-commit hash,
`screenshots/<subdir>`). Verified by hand here: the only two hits in the whole
diff were the branch name in this handoff.

**The Browser pane returns black screenshots when it is hidden**, and it is easy
to misread that as the rAF freeze or as a broken page. The tell is that DOM
queries still report everything visible at opacity 1 and in-viewport, and
`computer` input actions time out with "the Browser pane is currently hidden."
Distinct from the rAF freeze, where the DOM itself reports a frozen opacity
(0.29 here) and a leftover transform. **Check the DOM before blaming either.**

**The sibling marks ship as pure downscales, not crops.** `instant-sow-mark.png`
is 604x755 from an 832x1040 render -- exactly 0.7259 on both axes. Their square
thumbs are a *separate render*, so each sibling's plate and thumb are two
different objects. This one follows the interview's ruling instead: **one
specimen, cropped two ways**, so the pair matches. The square crop also clears
the signature Ideogram bakes at the sheet's foot despite an emphatic no-text
directive (all three seeds did it; the siblings have one too, faint).

**Wallace caption provenance is untracked by design.** `mocks/.gitignore` is
`*`, so `mark-dscr.caption.json` lives on disk only. It carries the locked style
block copied verbatim from `mark-sow-v2.caption.json`, which is what keeps the
set reading as one system. Seeds 8301-8303 at `V4_DEFAULT_20`, 832x1040;
**8303 is committed provisionally, pending Justin's pick** (8301's rungs read
rectangular but the instrument floats small; 8302's rungs read as tapered
spikes, more fern than ladder, and its dial numerals are the most legible, which
fights the no-text directive).

**Wallace is a Coworker-mode seat and this session ran it in Flow.** The caption
was never shown before rendering and the seed was chosen without Justin. He
caught it: a precise brief specifies what and when, never who picks. Banked as
`feedback-wallace-selection-is-justins`. **Next session: show the caption, sweep
seeds, hand him the sheet.**

---

## Pickup prompt

```
Portfolio -- grade the Instant DSCR import (PR #230) and merge it.

Fresh session. Read first:
1. vector/handoffs/2026-09-03-instant-dscr-import.md -- this handoff.
2. ~/projects/plans/prompts/2026-08-27-portfolio-dscr-import.md -- the round's
   prompt and, at its bottom, the INTERVIEW RECORD that governed it.

STATE: PR #230 is OPEN and MERGEABLE on `feat/instant-dscr-case-study`, one
commit `94f1aa9` off main `2470ea3`. Gates are green (lint 0 errors, build
clean, 399/399). Structure was verified in the DOM. NOTHING VISUAL HAS BEEN
GRADED -- that is this session's first job, and it is Justin's eyes, not a
screenshot: the Browser pane suspends rAF and freezes entrance animations.

DO:
1. Stand the branch up on :5173 and put these in front of Justin, in order:
   - /work/instant-dscr, the hero spread. The cover is the real ragged-ladders
     board declaring `fit: 'contain'`, so it pillarboxes ~16px each side in the
     382px plate. It was measured, not seen. If he rejects it, the alternative
     is a symmetric 55px top-and-bottom crop to a true 16:9, which keeps the
     headline and the footer -- do NOT reach for `fit: 'cover'`, which clips the
     start of every line of type.
   - The mark. THE SEED IS HIS PICK AND IS STILL OPEN: 8301, 8302 and 8303 are
     in `mocks/m2-imagery/` (8303 is committed provisionally). Show all three
     plus the thumb beside its four siblings. Register parity is the question.
     If he redirects the caption, re-render rather than re-crop.
   - The two comparison rows as an exploration row. Option A is 1.93:1 in a 4:3
     cell and sits smaller than B/C/D.
   - Section 6 and section 3, which are image-free because the clamp shots and
     the decided-option board are outside the interview's selected set.
2. Take his rulings, build them on the same branch, merge.
3. THEN the two decided-not-built items still on the shelf: framing the
   dual-mode assets (deliberate dark plate, no re-renders) and About's h1.

DO NOT rewrite prose. The voice pass is R3, Justin's hands with gaff marking
up, and it is still gated on the wider R3-prep honesty interview across the
EXISTING case studies (Stelline, chat lane, per study). The em-dashes in this
study are deliberate carry-over and are R3's to cut.

Then /handoff to Stelline.
```
