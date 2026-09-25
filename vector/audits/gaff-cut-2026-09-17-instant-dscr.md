# Gaff's Cut: core/content/instant-dscr.md (Instant Rate Buy-Up)

Format: case study   Aggression: hard   Mode: critique only, nothing applied
Branch: feat/instant-dscr-case-study @ 8f15b67 (PR #230)   Date: 2026-09-17
Voice profile: Phase 4 + Phase 5 loaded from main @ 9cd4bc0 (PR #234)

Target: ~1,800 prose words (~2,350 total) | Current: 2,358 prose words (2,948 total)

Prose words exclude image alt text, placeholder comments, comparison
labels, and the callout and metrics blocks; total is `wc -w`. Sibling range,
measured the same way on this branch:

| Study | Prose | Total |
| ----- | ----- | ----- |
| instant-sow | 708 | 971 |
| doctrine-not-prompts | 1,443 | 1,640 |
| instant-doc-review | 1,954 | 2,268 |
| **instant-dscr (this)** | **2,358** | **2,948** |

**Why ~1,800 prose.** This is the flagship feature study: seven figures, a
metrics block, a six-line receipts list, and four paragraphs the interview
record protects outright. Those are fixed cost. Everything cut below comes
from structure and redundancy (about 600 prose words), and the Phase 5
rewrites add roughly 80 back (the credit split, the closing thesis, one
sentence after Receipts). That lands a hair under instant-doc-review and
well above doctrine-not-prompts, which is the right neighbourhood for the
study with the most receipts. Going lower costs a protection; see Length
budget at the end.

**How to mark cuts.** Edit the `Decision:` line under each entry: `accept`,
`reject`, or `reword: <your text>`. Bulk rules work too ("accept all
EM-DASH"). The apply session (Tyrell or Writer) types the accepts and your
dictated rewrites on this branch; gaff writes nothing in core/content/.

**Ruled and not re-asked:** title and subtitle (Rule A, 09-15), mark, thumb,
figure set, index order, shipped-tense claims (TRUE, freeze lifted, both PRs
merged, E9 tests landed). Nothing below flags a section-level fact as
unearned.

---

## The reverse outline (pass 1)

One phrase per paragraph, the director signal it carries, and the call.
Signals: **J** judgment call with reason and borrower outcome; **S** scope
owned across Product, Risk, Engineering, or Legal; **Q** quality or
accessibility bar; **N** outcome with a number; **L** self-limit beside a
claim; **W** how he works with named tools and engineers. A paragraph with
no letter is scaffolding.

| # | Line | Job | Signal | Call |
| - | ---- | --- | ------ | ---- |
| 1 | 1-11 | Metadata card: role, product, window, 27 PRs | S, N | keep; two em-dashes |
| 2 | 15 | Thesis: I ship to the production repo | W | keep; Phase 5 opener shape (V1) |
| 3 | 17 | Meta-narration plus a three-beat preview | N | merge into 2, drop the meta sentence (cut 2) |
| 4 | 21 | Engineering wired the repo for agents on day one | W (credit split) | keep, tighten; em-dash pair |
| 5 | 25-31 | Metrics block on the repo | N | PROTECTED (numbers) |
| 6 | 33 | Tour of the infrastructure (rules, CI, sandbox, capture) | none | delete, keep one clause (cut 1) |
| 7 | 35 | Inception framing: I did not build it, I became a contributor | L, W | PROTECTED; Phase 5 reshape (V2) |
| 8 | 39 | What the stepper is | setup | keep; minimum context for cut 10's judgment |
| 9 | 41 | The shared-ladder assumption, and I answered it | J | keep; em-dash |
| 10 | 45 | Deployed a throwaway branch, captured a real response | W | keep, short |
| 11 | 47 | Ladders are ragged: 2 of 14 shared | N | keep |
| 12 | 49 | Same rate, different cost: $2,556 vs $2,625; the design could not hold | J, N | keep; trim one parallelism (cut 24) |
| 13 | 57 | Lead-in to the four defects | W | trim to one sentence (cut 10) |
| 14 | 59-62 | Four defects, one 100x | Q, N | PROTECTED numbers; cut mechanism from 1 and 2 (cut 14); bug to a non-engineer (V6) |
| 15 | 64 | Why the 100x bug is a designer's catch | Q, W | keep, trim (cut 11); em-dash pair |
| 16 | 66 | None reached production | L | keep, tighten (cut 12) |
| 17 | 70 | "Six directions, drawn as real screens" | W | keep; count mismatch (P4-2); name Paper (V3) |
| 18 | 72-98 | Option boards A to D | figures | ruled; three placeholder em-dashes |
| 19 | 100 | Cost vs rate: you cannot have both | J | keep; drop the throat-clearing lead (cut 18) |
| 20 | 102 | Scoped to one family, the tension collapses | J | keep; feel verdict #1 (V4); drop the repeated dead-steps line (cut 5) |
| 21 | 104-105 | 14 steps / 5 dead vs 9-10 / 0-1 | N | keep; count question (P4-3) |
| 22 | 107 | Within a family every shared step agrees | J | fold into 20 (cut 5) |
| 23 | 109 | The decision, and the interest-only argument | J, N | keep; drop "The decision:", feel verdict #2, land on the borrower (V4, V5) |
| 24 | 111 | Killed the toggle | J | keep; em-dash |
| 25 | 115 | Restates the old silent-par behaviour | none | delete second sentence (cut 3) |
| 26 | 117 | Withhold Select; the control is the borrower's stated intent | J | PROTECTED intent word; Phase 5 diction (V7) |
| 27 | 119 | Reason-agnostic copy, and why | J | keep; the ending repeats it (cut 4) |
| 28 | 121 | "Here it is running:" | none | delete (cut 17) |
| 29 | 127 | Describes the limit-state figure; credits match to the dollar | Q | keep last sentence only (cut 7); em-dash pair |
| 30 | 131-133 | Why a second view, and I built it | J, W | merge into one paragraph (cut 8) |
| 31 | 139 | "Three decisions worth naming:" | none | shorten lead (cut 21) |
| 32 | 141 | Browsing does not commit; a bug I filed on myself | J, L | keep |
| 33 | 142 | Native radios; the keyboard contract for free | Q, N | keep; em-dash |
| 34 | 143 | The closing column in words; one function decides | J, Q | keep as is |
| 35 | 145 | Select's accessible name carries the loan identity | Q | keep; drop the lead (cut 22) |
| 36 | 149 | The clamp, ties toward base | J | keep, trim (cut 15) |
| 37 | 151-154 | 0.500 became 0.375, nothing said why | N | keep |
| 38 | 156 | The screen was self-consistent, the request left no trace | J | trim by half (cut 9) |
| 39 | 158 | A state problem, not a notification problem | J | keep |
| 40 | 160-163 | Drew two, built both, compared them running | W | keep; name Claude (V3); two em-dashes |
| 41 | 165 | A says one fact four times | J, N | tighten (cut 16) |
| 42 | 167 | B shipped; prominence is tunable, redundancy is structural | J | keep; em-dash; land on the borrower (V5) |
| 43 | 169 | Clamped card keeps Select; disclosure decays | J | keep; drop last sentence (cut 6); em-dash |
| 44 | 173-178 | Receipts | N, W | PROTECTED (numbers, list) |
| 45 | 180-182 | Screenshot provenance callout | Q | PROTECTED (isolated-stack disclosure) |
| 46 | 186 | "Honesty matters more than a clean ending" | none | delete (V8) |
| 47 | 188 | The disclosure names the ceiling, not the reduction; limit vs event | J | PROTECTED (open ending); em-dash |
| 48 | 190 | Repeats the reason-agnostic rationale; two designs | J | cut first two sentences (cut 4); em-dash |
| 49 | 192 | Moral: which fact a surface is responsible for | none | replace with the Phase 5 close (cut 13, V8) |

Paragraphs with no signal: 6, 25, 28, 31, 46, 49, plus the meta sentence in
3. Those are the fat. Every other paragraph carries at least one letter; the
cuts inside them are redundancy and throat-clearing, not the claim.

**Missing signals (not cuts, gaps).** Three of the six director signals are
absent from the whole study and no cut can supply them:

- **S, stakeholder scope.** Product, Risk, Legal, and Engineering as
  organisations never appear. "Product" occurs 40 times and always means a
  loan product. The Phase 5 closing thesis is the natural home (V8).
- **W, named tools.** Claude, Paper, and Impeccable appear zero times. The
  study says "agent," "agent-driven," "agent-assisted," and "drawn as real
  screens." V3 lists every spot.
- **W, named engineers.** "The engineering leads," "two staff engineers and
  one platform engineer." Roles, no names. Whether to name people in a
  public repo is Justin's call; gaff only notes the brief asked for it.

Also: **Kiavi is not named in the body.** Interview protection 7 says Kiavi
stays named; on this branch it is carried by the registry and the family
cross-links, not by the study's own prose. The Phase 5 credit split ("the
Kiavi brand doctrine") names it in the body without an extra sentence.

---

## Proposed cuts

Biggest structural first, filler last. Line numbers are the branch file at
8f15b67.

### 1. The infrastructure tour -- SCAFFOLDING
Line 33.
> The tooling is not decoration. Agent rules load per file path, so a session touching the borrower UI gets the design doctrine and nothing else. The CI build **fails** if one of those rule files uses the wrong frontmatter key. There is a containerized sandbox that runs the agent with permissions skipped, on an isolated branch, so it cannot touch your working tree. Agent self-verification by scripted browser capture is the documented default, not a workaround.

**Why:** Pass 1. Four sentences describing infrastructure the study says two
sentences later he did not build. None of the six signals. The one clause
that touches his work is the per-path rules, because that is where his
doctrine loads; keep that clause and fold it into line 21.
**Replace with:** one clause appended to the line-21 paragraph, shape:
"Rules load per file path, so a session in the borrower UI gets the design
doctrine and nothing else." Delete the rest.
Decision: accept the cut (line 33 deleted); reword line 21 too, draft read as slop. Justin: "Specific design skills and agent rules are loaded through file paths, so each session loads just what it needs to keep things looking and feeling right. The repo was set up for agent-driven development on day one. Within the first three commits, it added agent instruction files and an agent config directory. That was a choice made at the beginning by engineering and something that I followed as soon as I jumped in. When I needed to make sweeping design changes, I made them in my rules and skills. And those cascaded outward."

### 2. The meta-narration opener -- SCAFFOLDING / REDUNDANCY
Line 17.
> This case study follows one feature end to end, because the feature is where the claim gets tested. Along the way I proved a product assumption false by reading a live pricing response, caught a 100× unit error in a money figure before it could ship, and rewrote the interaction model as a result. The design decisions and the code that implements them are the same artifact.

**Why:** Pass 1 and pass 3. The first sentence narrates the document. The
callout already says what he did; line 15 already says he ships. The
three-beat preview is worth keeping because it carries the 100x number and
the "assumption false" judgment. The last sentence is the thesis and stays.
**Replace with:** merge into the line-15 paragraph as one opener. Drop "This
case study follows one feature end to end, because the feature is where the
claim gets tested." Keep the three beats and the thesis sentence. V1 gives
the Phase 5 opener shape for the merged paragraph.
Decision: accept the cut; reword both paragraphs (lines 15 + 17). Justin: "I am the lead product designer on this product, and I ship designs and code to the production repository. I still made prototypes and worked with engineering to refine them. But branches, pull requests, reviews, and merges were also handled by me." / "Here's how I put this to work. While working on this feature, I discovered that a product assumption we made was incorrect. Something I only noticed after looking at our live pricing API. I caught a 100× unit error in some money figures before any of it was shipped, sparing the users the shock of seeing a $94,000 credit that we'd have to explain was an error. And then I recreated the interaction model as a result of what we found. The design decisions and the code that implemented them all came from the same place."

### 3. The old behaviour, restated -- REDUNDANCY
Line 115.
> The most interesting state is the one where the borrower asks for a rate a loan cannot price. The old behavior repriced it at par, silently, with Select still live.

**Why:** Pass 1. The second sentence is defect bullet 2 (line 60) again.
"The most interesting" is editorial.
**Replace with:** "When the borrower asks for a rate a loan cannot price:"
as the hinge into line 117, or fold the first clause into 117's opening.
Decision: accept as proposed. Justin: use "base" instead of "par" (the product language changed to align with the legacy calculator; screenshots are slightly out of date).

### 4. Reason-agnostic copy, explained twice -- REDUNDANCY
Line 190, first two sentences.
> The existing copy is deliberately reason-agnostic. It names the bound and never the cause, which is why a ceiling that comes from eligibility rather than pricing reuses the same sentence unchanged.

**Why:** Pass 1. Line 119 already says the copy is reason-agnostic, quotes it,
and gives the eligibility case. The ending needs only a back-reference to
set up "two different designs."
**Replace with:** "Naming the previous request puts a cause back into copy
that never had one, and then the eligibility case needs its own sentence.
Those are two different designs." Then the custody landing from V8.
Decision: reword; also rewrote the line-188 paragraph above it (protected category question kept in his words). Justin: "The disclosure explains where the ceiling sits. It doesn't say that the requested amount was reduced, which was the original issue. Nothing in the UI shows the ↑0.500% the borrower asked for. Fixing that sounds simple but it isn't, because it highlighted a prior decision I hadn't thought out yet: when we clamp, is it a statement about the limit or about the event that made the borrower hit the limit?" / "Naming the reason puts a cause back into copy that never mentioned it, and then the eligibility case needs its own sentence. Those are two different designs." (Covers em-dashes 2.17 and 2.18.)

### 5. Dead steps, said three times -- REDUNDANCY
Line 102, last sentence, plus line 107.
> Unioning all six was what put dead steps on the control in the first place.

> Within a family, every shared step agrees on both rate *and* dollars. Divergence happens only at the capped rung.

**Why:** Pass 1. Defect bullet 3 (line 61) already says the step domain
unioned six products the grid never showed. The line-107 pair is the reason
for the family scoping and belongs in the same paragraph as the insight at
line 102, not as a separate two-sentence paragraph after the receipts.
**Replace with:** delete the line-102 sentence. Move line 107 up to close
the line-102 paragraph, so the insight and its reason sit together and the
14/5 vs 9-10/0-1 bullets follow as the evidence.
Decision: reword (both cuts taken; his paragraph replaces line 102 and absorbs line 107). Justin: "Things get easier once we scope the control to select a single product family. We can't have a coherent list of rates and dollars across all six loan products. But if we limit to one family, we can. This works because then the grid will only need to show two variants within the family. Fully amortizing and interest-only. Within that, every shared step up and down the rate ladder can agree across the rate and the dollar amount. The only thing that makes them different at this point is when we have to cap at the top part of the ladder. This keeps things a little simpler while still enabling borrowers to compare rates in a way that felt right to them."

### 6. The state-not-notification point, twice -- REDUNDANCY
Line 169, last sentence.
> That fell out of holding requested and effective as one piece of state rather than bolting on a notification.

**Why:** Pass 1. Line 158 already made this exact point ("never a notification
problem. It was a state problem").
**Replace with:** (delete)
Decision: accept (cut the repeat). Applied inside Justin's block rewrite of the clamp section, current lines 152-165; his final text, with dictation fixes only (Claude/Paper spelling, stray periods, tense, commas) and one Tyrell line he approved (marked [T]):

> What made this hard isn't that the change was subtle. Rather, what the borrower saw was still completely self-consistent. The dial said 0.375%, both cards said `↑ 0.375% vs base`, the credits agreed, and both Select buttons were live. Everything still priced properly, so there wasn't any limit to display. From the borrower's point of view, there was no contradiction to see, because what they were asking for wasn't anywhere on the screen.
>
> The problem with the clamp wasn't notifying borrowers. It was about reflecting the correct state. The screen has to remember what the borrower requested and put that next to what's actually being priced before we have anything else to say about a potential clamp. This was something that the browse-versus-commit split on the all-rates view already did.
>
> So I drew up two solutions. I dictated my intent to Claude, then had Paper show it to me visually. I clicked around and moved stuff to see what felt right. Then I responded to what was in Paper, spoke to Claude and then built and refined it. It was a mix of hands-on and dictation. Then I compared them to see how they felt:
>
> - **A:** the existing sentence on each card
> - **B:** one line above the pair
>
> Version A stated one fact four times. The `↑ 0.375% max` chip already says it once, so each card said the ceiling twice and the pair of cards said it four times. Both sentences landed at the same height, which was redundant, and they pushed each card's metrics down. B said it once, in the gap between the control that changed and the cards that changed, and the per-card chip still carries the per-card fact.
>
> B shipped. **B's weakness is prominence, which is tunable: size, weight, an icon, spacing. A's weakness is redundancy, which is structural.** Repeating yourself doesn't make things easier to discover, and in fact might make people tune out.
>
> There was one more subtle decision within version B. A clamped card is *not* at its limit, so Select stays live. Without that, it would have rebuilt the exact dead end the clamp was introduced to remove. And the disclosure decays with no timer and no dismiss affordance. [T] Once the borrower touches the control, the request equals what's being priced, and the note stops applying.


### 7. The limit-state figure, described in prose -- REDUNDANCY
Line 127.
> The amortizing loan is at its ceiling at 6.750% with Select gone. Its interest-only sibling reaches one step further to 6.875%. The credits — $2,556 and $2,931 — are the vendor's own figures, matching the captured response to the dollar.

**Why:** Pass 1. The first two sentences describe what the figure directly
above shows and the alt text already carries for screen readers. The third
sentence is the quality signal (real figures, matched to the dollar) and
stays. Em-dash pair restructured here rather than in the inventory.
**Replace with:** "Both credits are the vendor's own figures, $2,556 and
$2,931, matching the captured response to the dollar."
Decision: accept (covers em-dash 2.11).

### 8. Two one-liners, one thought -- SCAFFOLDING
Lines 131 and 133.
> The stepper answers "nudge me one step." It cannot answer "show me everything," because it is a stepper: ten rungs, one click each.
>
> So I built the other view. Every rate on one loan, with what each one costs.

**Why:** Pass 1 and pass 6. One idea split across two paragraphs for
theatre. Both sentences are good; the paragraph break is the fat.
**Replace with:** one paragraph, same words: "The stepper answers 'nudge me
one step.' It cannot answer 'show me everything,' because it is a stepper:
ten rungs, one click each. So I built the other view: every rate on one
loan, with what each one costs."
Decision: reword (merged). Justin: "The stepper says "nudge me one step." It doesn't say "show me everything," because it's a stepper: ten rungs, one click each. So I built the other familiar view for borrowers: every rate on one loan, with what each one costs."

### 9. The self-consistent screen -- REDUNDANCY / FILLER
Line 156.
> What made this hard is not that the change was subtle. It is that **the resulting screen was completely self-consistent.** The dial said 0.375%, both cards said `↑ 0.375% vs base`, the credits agreed, and both Select buttons were live. Both loans price that step perfectly well, so no limit state fired either. There was no internal contradiction for a borrower to catch, because the number they actually asked for left no trace anywhere on the screen.

**Why:** Pass 1 and pass 6. The paragraph says "self-consistent" three ways:
the bold claim, the enumeration, and "no internal contradiction." The
enumeration is the evidence and stays; the frame around it goes. The "not
that ... It is that" is one of six negative parallelisms in the piece (cut
24). "Actually asked for" sits on the real line and stays (Phase 5).
**Replace with:** "The hard part: the resulting screen was self-consistent.
The dial said 0.375%, both cards said `↑ 0.375% vs base`, the credits
agreed, both Select buttons were live, and no limit state fired because
both loans price that step. The number the borrower actually asked for left
no trace anywhere on the screen."
Decision: reword, as part of Justin's block rewrite of the clamp section (current lines 152-165). See entry 6 for the full text.

### 10. Lead-in to the defects -- SCAFFOLDING
Line 57.
> With the real data in hand I walked the control and read the source alongside it. Four distinct failures, which I wrote up individually because they had different causes and different fixes:

**Why:** Pass 3. "Which I wrote up individually because they had different
causes and different fixes" narrates the write-up. The first sentence is
the W signal (read the source alongside the captured data) and stays.
**Replace with:** "With the real data in hand I walked the control and read
the source alongside it. Four failures:"
Decision: reword. Justin: "With the real data readily available I could walk the control and read the source alongside it. There were four areas where it failed:" (stray period after "control" joined.)

### 11. "Two orders of magnitude" after "100x" -- REDUNDANCY
Line 64.
> That last one is the one I would point at. It was not visible in a mockup and not caught by the type checker, because both values were structurally valid numbers. It was only findable by holding the captured response, the rendered screen, and the source next to each other. That is a designer-shaped bug in a designer-shaped place — the money figure a borrower reads — and it was two orders of magnitude wrong.

**Why:** Pass 1. "Two orders of magnitude" restates the 100x two lines up.
"That last one is the one I would point at" is throat-clearing. The middle
two sentences are the Q and W signals and stay. The em-dash pair is
restructured here. Note V6: the bug-to-a-non-engineer rule may reshape this
paragraph further; this cut is the floor either way.
**Replace with:** "It was not visible in a mockup and not caught by the type
checker, because both values were structurally valid numbers. It was only
findable by holding the captured response, the rendered screen, and the
source next to each other. A designer-shaped bug in a designer-shaped
place: the money figure a borrower reads."
Decision: reword via Justin's manual edit in the Files pane (current line 62): "That last one was tricky. It wasn't visible in a static mockup and wasn't caught by the type checker, because both values were structurally valid numbers. It was only found by putting the captured response, the rendered screen, and the source next to each other. That was a designer-shaped bug squarely in the designer's wheelhouse. I got the money figure a borrower reads quite wrong."

### 12. The severity paragraph -- SCAFFOLDING
Line 66.
> To be precise about severity, since it matters: all four were defects in the *prototype* state of this work, caught before any of it merged. None reached production and no borrower ever saw them. Finding them was the review pass on my own prototype, and the redesign below is the fix. I would rather say that plainly than let a number like $94,501 imply a production incident it never was.

**Why:** Pass 3. This paragraph is the self-limit beside the claim (Phase 5)
and stays. "To be precise about severity, since it matters:" announces
what the sentence then does. "Finding them was the review pass on my own
prototype, and the redesign below is the fix" repeats "caught before any of
it merged." The last sentence is the voice of the paragraph and stays.
**Replace with:** "All four were defects in the prototype, caught before any
of it merged. None reached production and no borrower ever saw them. I
would rather say that plainly than let a number like $94,501 imply a
production incident it never was."
Decision: reword via Justin's manual edit (current line 64): "The big thing I learned about working this way and a nice bonus was that all four of these were defects in the *prototype* of this work, caught before anything merged. Nothing reached production and no borrower ever saw them. Finding them was the review pass on my own prototype, and the redesign below fixed it. In the old way of working that's something an engineer probably would have caught, and brought back to me. This time I was able to fix it on my own." Followed by his par/base note: "Throughout this case study and screenshots you might see par and base used. Before we released this, we swapped par for base because that better matched the legacy calculator and the language borrowers and the team were already using."

### 13. The closing moral -- HOLLOW CONCLUSION
Line 192.
> That is the shape of most of the work here. The interesting decisions are rarely about wording. They are about which fact a surface is responsible for.

**Why:** Pass 3 and Phase 5. "That is the shape of most of the work here"
summarises. The category line is the exact example the profile names as a
decision ending on a design category. Neither sentence is one of the five
interview protections (the protected open ending is line 188, the limit
statement vs event statement question). The Phase 5 close is a different
paragraph: what got easier, what did not, and who the conversations are with.
**Replace with:** the Phase 5 closing thesis, Justin's words. The shape from
the profile: building got easy in one sentence; the conversations with
Product and with Risk and with Legal did not in the next; the regulated
constraint stated plainly. If "which fact a surface is responsible for"
survives, it lands on the borrower or the stakeholder, not on itself. See V8.
Decision: accept the cut; replaced with Justin's custody line (V8) and closing thesis: "It's now in the hands of sales support and our early adopter customers. As we hear more feedback and continue on with the broader rollout, we'll revisit it. We're still operating as an MVP and we're alright with leaving some things open." / "Building and expressing ideas certainly got easier. But what isn't easier are the conversations with Product, Risk, Legal, and Sales stakeholders that help define the experience you're actually able to deliver for customers. There are still regulations to abide by. And there are still constraints as to what we should and what we can deliver for customers.". "Honesty matters more than a clean ending" deleted per V8.

### 14. Mechanism in defect bullets 1 and 2 -- FILLER
Lines 59 and 60.
> - **The dial displayed "Par" while off par.** It derived one shared step from the *first* product only. On steps that product lacked, the value silently fell back to par and computed a zero delta. The readout printed "Par" and the "Reset to par" button rendered at the same time.
> - **Cards silently reverted to par.** When a product had no rung at the selected step, it displayed its par rate, payment, and DSCR with no indication — **and the Select button stayed live.** A borrower could select a par-priced loan while the control claimed an adjustment was applied.

**Why:** Pass 4 and Phase 5 (size and place, not mechanism). "Derived one
shared step from the first product only ... computed a zero delta" is how
the code failed. A design director wants what the borrower saw and why it
mattered. Bullet 2's last sentence is exactly that and stays. The em-dash in
bullet 2 is restructured here. Bullets 3 and 4 are untouched by this cut
(bullet 4 is V6).
**Replace with:**
"- **The dial displayed "Par" while off par.** On steps the first product
lacked, the value fell back to par. The readout printed "Par" and the "Reset
to par" button rendered at the same time.
- **Cards silently reverted to par.** A product with no rung at the selected
step showed its par rate, payment, and DSCR with no indication. The Select
button stayed live. A borrower could select a par-priced loan while the
control claimed an adjustment was applied."
Decision: reword via Justin's manual edit: bullets 1-3 keep the mechanism in his lighter wording ("displayed", "didn't support", "combined", "said that"); "Par" kept on purpose (the prototype's word; the base note explains the swap). Bullet 4 is V6.

### 15. The clamp description -- FILLER
Line 149.
> Switching products carries the borrower's adjustment across, clamped to the nearest step the new loan can price, resolving ties toward base so a clamp never volunteers a *larger* adjustment than was asked for. Correct behavior. It also changes a number the borrower set.

**Why:** Pass 5 and pass 6. One sentence carrying three clauses and a
participle. The ties-toward-base rule is a real judgment and stays; it just
needs its own sentence. "Correct behavior." is a good short landing and
stays.
**Replace with:** "Switching products carries the borrower's adjustment
across, clamped to the nearest step the new loan can price. Ties resolve
toward base, so a clamp never volunteers a larger adjustment than was asked
for. Correct behavior. It also changes a number the borrower set."
Decision: reword. Justin: "Switching products carries the borrower's adjustment across, clamped to the nearest step the new loan can price. Ties resolve toward base, so a clamp never offers a larger adjustment than what was asked for. That's the correct behavior, but it also changes a number the borrower set." (The "Correct behavior." short landing folded in by his choice.)

### 16. The A critique -- FILLER
Line 165.
> A states one fact **four times**. The `↑ 0.375% max` chip already says it in shorthand, so each card says the ceiling twice and the pair says it four times. Both sentences land at the same height, which reads as a stutter, and they push each card's metrics down. B says it once, in the gap between the control that changed and the cards that changed, and the per-card chip still carries the per-card fact.

**Why:** Pass 1. "Four times" appears twice in two sentences. The second
sentence is the arithmetic behind the first; keep one statement of the
count.
**Replace with:** "A states one fact four times: the `↑ 0.375% max` chip
already says it in shorthand, so each card says the ceiling twice. Both
sentences land at the same height, which reads as a stutter, and they push
each card's metrics down. B says it once, in the gap between the control
that changed and the cards that changed, and the per-card chip still carries
the per-card fact."
Decision: reword, as part of Justin's block rewrite of the clamp section (current lines 152-165). See entry 6 for the full text.

### 17. "Here it is running:" -- SCAFFOLDING
Line 121.
> Here it is running:

**Why:** Pass 3. The figure caption "Limit state" does the job.
**Replace with:** (delete)
Decision: accept.

### 18. "The tension was real and worth stating plainly:" -- SCAFFOLDING
Line 100, opening clause.
> The tension was real and worth stating plainly: keying the control on cost gives you

**Why:** Pass 3. Announces that the next sentence will be plain.
**Replace with:** "Keying the control on cost gives you ..."
Decision: accept; also cut the paragraph's last sentence ("You cannot have both across six products."), which Justin's entry-5 paragraph now says.

### 19. "This matters to the story for a specific reason." -- SCAFFOLDING
Line 35, first sentence.
> This matters to the story for a specific reason.

**Why:** Pass 3. Throat-clearing before the protected paragraph. The Phase
5 reshape (V2) replaces the paragraph's opener anyway.
**Replace with:** (delete)
Decision: accept (opener sentence gone); whole paragraph replaced by Justin's V2 rewrite, see V2.

### 20. "The sharpest finding:" -- FILLER
Line 49, opening.
> The sharpest finding: **the same rate costs different amounts on different products.**

**Why:** Pass 4, light. The ranking word is editorial; the bold claim and
the two dollar figures do the ranking on their own. Low priority; reject
freely if the signpost reads as helpful.
**Replace with:** "The same rate costs different amounts on different
products."
Decision: reword via Justin's manual edit (line 49): "The problematic finding:" ... "One shared dial over one shared unit didn't need improvement. It needed to change." (spaced hyphen restructured to a full stop).

### 21. "Three decisions worth naming:" -- SCAFFOLDING
Line 139.
> Three decisions worth naming:

**Why:** Pass 3. "Worth naming" rates the list before the reader sees it.
**Replace with:** "Three decisions:"
Decision: accept.

### 22. "That last detail generalizes:" -- SCAFFOLDING
Line 145, opening clause. Also "and the reason generalizes:" at line 167.
> That last detail generalizes: the accessible name on each Select button

**Why:** Pass 3 and pass 6. "Generalizes" twice in the piece, both times as
a lead-in that tells the reader a generalisation is coming. Line 145 can
start on the fact. Line 167's is handled in the em-dash inventory (2.15).
**Replace with:** "The accessible name on each Select button carries the
full loan identity, even though the visible label does not, because a
screen-reader user has no dropdown in view to supply the context a sighted
user gets for free."
Decision: line-145 half: accept. (Justin: still reads Claude-y; he'll do a rewrite pass before the final concision pass.) (line-167 half) resolved inside Justin's clamp-section rewrite, see entry 6; line-145 half pending.

### 23. Bold as textbook emphasis -- FORMATTING TELL
Lines 21, 41, 47, 49, 102, 117, 153-154, 156, 165, 167, 188 (twice).

**Why:** Pass 6 and tells §10. Fifteen inline bolds outside the bullet
lead-ins. Justin's own bold usage (Phase 3) is the standalone aphorism, bold
plus period plus line break; inline bold on "ragged," "third commit,"
"four times," and "not" is the draft's highlighter. Keep bold where it is a
UI readout or a bullet lead-in (line 62's readout, lines 59-62 and 141-143
lead-ins). Drop the rest, or keep at most the two decision claims (102 and
117) if they survive V4 as standalone aphorisms.
**Replace with:** un-bold lines 21, 41, 47, 49, 153, 154, 156, 165, 167,
188. Justin's call on 102 and 117.
Decision: accept (Justin, bulk). Un-bolded: "one shared ladder", "ragged", the same-rate claim, the 0.500%/0.375% readouts. Lines 21, 156, 165, 188 were rewritten by Justin without bold. KEPT: the B/A prominence-redundancy bold (Justin dictated it bold in his clamp rewrite), "**withholds Select**" and "**The decision:**" (left for his V7/V4 rewrite pass), bullet lead-ins, UI-readout quotes, the 5 / 0-1 counts, comparison labels.

### 24. Negative parallelism, six times -- AI-TELL
Lines 49, 64, 156, 158, 169, 192.
> was not a design that needed polish. It was a design that could not hold.

> is not that the change was subtle. It is that

> it was never a notification problem. It was a state problem

> a clamped card is *not* at its limit, so Select stays live

> are rarely about wording. They are about which fact

**Why:** Pass 6 and tells §9. "Not X. It was Y." six times becomes a
metronome. Two of them are real contrasts and land: line 49 (could not
hold) and line 158 (state problem). Line 156 is handled in cut 9, line 192
in cut 13, line 169 is a plain fact and fine as written.
**Replace with:** keep 49 and 158. Cuts 9 and 13 remove 156 and 192. No
further action.
Decision: line 49 contrast reworded by Justin (see 20); line 156 contrast reworded inside his clamp-section rewrite; 158 kept in his words; 169 removed with cut 6; 192 pending cut 13.

### 25. EM-DASH inventory -- MECHANICAL (pass 2)
23 em-dashes on 18 lines. Zero spaced hyphens. Three en-dashes are ranges
("June–August," "9–10," "0–1") and three "−" characters are the minus sign in
quoted UI copy; both exempt, though Justin may prefer "June to August" for
the callout. Every entry below restructures; none respells the dash.

- **2.1** line 2: `Lead Product Designer — design and implementation`
  → "Lead Product Designer, design and implementation"
- **2.2** line 10: `opened the PRs, merged them — 27 in this repo`
  → "designed it, wrote the code, opened 27 PRs in this repo, merged them"
- **2.3** line 21 (pair): `Its **third commit** — same day as the initial commit — added`
  → "Its third commit, on the same day as the first, added an agent
  instruction file and an agent config directory."
- **2.4** line 41: `assumed **one shared ladder** — that every loan product offers`
  → "assumed one shared ladder: every loan product offers the same set of
  rate steps, so one control could drive them all."
- **2.5** line 60: `with no indication — **and the Select button stayed live.**`
  → covered by cut 14: "with no indication. The Select button stayed live."
- **2.6** line 64 (pair): `designer-shaped place — the money figure a borrower reads — and it was`
  → covered by cut 11: "designer-shaped place: the money figure a borrower
  reads."
- **2.7** line 75: `Option A, "Intersection" — a dial domain row`
  → `Option A, "Intersection": a dial domain row`
- **2.8** line 81: `"Shared dial + per-card ceiling" — a rate dial`
  → `"Shared dial + per-card ceiling": a rate dial`
- **2.9** line 89 (pair): `"Rate scale — no stepper" — a row of selectable rates`
  → `"Rate scale, no stepper": a row of selectable rates` (matches the
  description line two rows down, which already reads "a rate scale, no
  stepper")
- **2.10** line 111: `can only subtract — it hides half of the exact comparison`
  → "can only subtract. It hides half of the exact comparison the pair
  exists to protect."
- **2.11** line 127 (pair): `The credits — $2,556 and $2,931 — are the vendor's own figures`
  → covered by cut 7.
- **2.12** line 142: `is not a *disabled* radio — it is not a radio at all, because`
  → "is not a disabled radio. It is not a radio at all, because arrowing
  onto it would select something unreachable."
- **2.13** line 162: `**A** — the existing sentence on each card`
  → "**A:** the existing sentence on each card"
- **2.14** line 163: `**B** — one line above the pair`
  → "**B:** one line above the pair"
- **2.15** line 167: `B shipped, and the reason generalizes: **B's weakness is prominence, which is tunable — size, weight, an icon, a rule. A's weakness is redundancy, which is structural.**`
  → "B shipped. B's weakness is prominence, and prominence is tunable:
  size, weight, an icon, a rule. A's weakness is redundancy, which is
  structural." (V5 then lands the paragraph on the borrower.)
- **2.16** line 169: `no dismiss affordance — touch the control and the request equals`
  → "no dismiss affordance. Touch the control and the request equals what
  is being priced, so the note stops applying."
- **2.17** line 188: `which was the original complaint — nothing on screen names`
  → "which was the original complaint. Nothing on screen names the ↑0.500%
  the borrower asked for."
- **2.18** line 190: `is the real open item — not the copy, the category.`
  → "and the real open item is the category, not the copy." (cut 4 reshapes
  the surrounding sentences.)

Decision: accept all (Justin, bulk). Applied as proposed: 2.1, 2.2, 2.4, 2.7, 2.8, 2.9, 2.10, 2.12. Already cleared by other entries or Justin's rewrites: 2.3, 2.5, 2.6, 2.11, 2.13-2.18. En-dash ranges and minus signs in quoted UI copy exempt. File em-dash count: 0.

---

## Pass 4 notes: so-what / prove-it

Beyond the cuts above, three prove-it flags and one claim that needs its
limit closer.

- **P4-1, "at the standard the engineers hold" (line 35).** Asserted, not
  shown. The proof exists in the piece: 27 PRs merged through their review.
  The V2 reshape can source the standard to the review path in one clause
  rather than claim it.
- **P4-2, "Six directions, drawn as real screens, not boxes" (line 70).**
  Four boards follow (A to D). Either the count is six and E and F are named
  in a clause, or the line says four. A director counts. Not a fact ruling;
  a reader-facing mismatch.
- **P4-3, "Three dead steps" (line 61) vs "5 dead" (line 104).** Two
  different measures, probably (three of the five belonged to off-screen
  products). The reader has no way to know that. One clause reconciles
  them, or the bullet at line 104 says "5 dead, 3 of them on products the
  grid never showed."
  **Resolved in apply (Justin, 2026-09-24):** 3 of the 5 confirmed; the bullet now reads "14 rate steps, **5** dead, 3 of them on products the grid never showed."
- **P4-4, "That is the actual unlock, and it is worth more than a faster
  mockup" (line 35).** The thesis, unproven by design and fine as a thesis,
  but it is the biggest contribution claim in the piece and the self-limit
  is currently the "I did not build" sentence three lines above it. After
  V2 recasts that sentence positively, the limit has to follow the claim
  within two sentences (Phase 5), not precede it.

Clean on: puffery (§1), brochure tone (§2), weasel attribution (§3).
"Seamless," "streamlined," "elevate," "stands as" do not appear.

## Pass 5 notes: "-ing" tails and hedging

Nothing to cut. The participles in the piece carry mechanism ("resolving
ties toward base," "matching the captured response to the dollar"), not
fake analysis. No stacked hedges; "sounds trivial and isn't" is one
qualifier and true. Formulaic transitions (§6): none. Leftover artifacts
(§11): none; the `<!-- aspect:auto placeholder -->` comments are the
figure pipeline's, not chat residue.

## Pass 6 notes: read-aloud

The piece reads well aloud in the middle and runs out of breath at both
ends. The context section is a specification (cut 1 fixes it). The ending
is a moral (cut 13). Two rhythm notes not already covered:

- Short landings are the draft's best habit and survive every cut: "So I
  answered it." "Correct behavior." "So the pair stays." Do not lose them
  when applying V5; land the borrower clause and keep the short beat.
- Zero register-breakers in the source. That is the import's "structure,
  don't voice" rule doing its job, not a defect, and gaff does not
  manufacture them. If Justin's dictated rewrites bring any in ("newfound
  powers," "get on with their loan"), they are protected from that moment.

---

## Phase 5 voice pass

Shapes only. Justin dictates the lines; the apply session types them.

### V1. The opener arc -- line 15
> I am the lead product designer on this product, and I ship to the production repository. Not prototypes handed to engineering. Branches, pull requests, review, merge.

Phase 5 opener rule: "just X to actually Y," closing on the humans. The
calibration anchor is the exact register: "I went from just designing to
actually building a pricing feature with production pricing, APIs, Claude,
and some help from my engineering team." Merge with the three-beat preview
from cut 2. The self-limit for this claim can live here or after Receipts
(V9), but one of the two has to carry it.

### V2. The credit split -- line 35
> **I did not build this infrastructure. I am the designer who became a first-class contributor inside it.** A production lending codebase is normally closed to me: unfamiliar monorepo, vendor integrations, typed domain models, a test suite with opinions. Agent-assisted development is what made that codebase legible enough for me to work in it directly, at the standard the engineers hold. That is the actual unlock, and it is worth more than a faster mockup.

PROTECTED (interview ruling 7, inception framing). What changes is how it
is said. Phase 5 checklist in order: (1) engineering first with "built";
(2) "I brought in" plus the named tools plus the human brain; (3) the
process in time order gated by feel; (4) merge autonomy with its "if"
condition; (5) confidence sourced to his own prep. The anchor: "Engineering
built the framework to actually use agents to build for production. I
brought in the design Skills, both for Claude, like Impeccable and the
Kiavi brand doctrine, and also my actual human brain and thinking."

Three things this reshape also settles: "Agent-assisted development"
becomes Claude (V3); Kiavi enters the body (protection 5); and the
"normally closed to me" list (monorepo, vendor integrations, typed domain
models, a test suite with opinions) is a named list and stays whole. The
self-limit ("I don't think I would ever replace an engineer") follows the
"actual unlock" claim within two sentences (P4-4).

**Applied (Justin, 2026-09-24), dictation fixes only:** "Let's be clear. I did not build this infrastructure, at least not all of it. But I am the lead designer who became a first-class contributor inside of the project repo. For the longest time, the production lending codebase had been closed to me. I didn't even really know what a monorepo was. Nor did I ever expect myself to be navigating vendor integrations, typed domain models, or dealing with a test suite with baked-in opinions. Claude and agent-assisted development are what made touching the code accessible to me, and up to the standards that our engineers held. Every merge was gated by CI and other quality checks that everyone had to abide by. Once I built up my confidence, I was able to contribute a lot more of my design intent, judgment, and all the things that make me good at what I do. I brought in design skills, some third party like Impeccable and some authored myself, like our handcrafted Kiavi brand doctrine and product voice. All this was augmented with good old-fashioned human brain thinking." / "As things started to click together for me, I was able to merge my own PRs, large and small. Some stubbed out features for engineers to pick up. Or if changes were small enough and the blast radius was manageable, I moved things all the way through from inception to release. It was pretty liberating being able to express my design intent and build it in the same afternoon." Kept the "I did not build" negative opener after one flag (his call). Kiavi, Impeccable, Claude named in body; P4-1 standards claim now sourced to CI gating; merge autonomy with its condition. Self-limit deferred to V9. Justin wants a second concision pass at the end with the whole piece in view.

### V3. Name the tool
Every place a specific product is called "the agent" or hidden in a
passive:

- line 21 "agent-driven development": the codebase's category; fine as the
  general term if Claude is named by line 35.
- line 28 metrics label "Authored directly by the agent": it is Claude;
  "Authored directly by Claude" if the trailer data supports it.
- line 33 "runs the agent": deleted by cut 1.
- line 35 "Agent-assisted development": Claude (V2).
- line 62 the 100x bullet: the Phase 5 pair ends on "Something I might have
  missed too if I didn't have Claude double checking my work" (V6).
- line 70 "drawn as real screens, not boxes": Paper. "Six directions, drawn
  in Paper as real screens" names the tool and keeps the claim.
- line 160 "I drew two answers, then built both and compared them running":
  drew in Paper, built with Claude, if that is what happened.

### V4. Feel verdicts, capped at two
"The decision:" (line 109) and "The move was noticing" (line 102) are the
draft's announcements and the single most visible tell in the piece. The
cap is one or two per piece, on the real judgment calls, each with its
evidence clause in the next sentence. The two real judgment calls here:

1. **Line 102, family scoping.** "The move was noticing that scoped to one
   product family, the tension collapses to a single step." Verdict-first
   shape: it felt right to scope the domain to the displayed family, and
   the reason follows (every shared step agrees on rate and dollars; the
   14/5 vs 9-10/0-1 bullets are the evidence).
2. **Line 109, the interest-only pair.** "That last one took the most
   argument with myself" is already the feel of a judgment call in draft
   diction. Phase 5 sample for this exact decision: "Folding it into a drop
   down would have solved the implementation problem easily, but it isn't
   how our borrowers are looking to compare things." Concession first, then
   "But," then the $936 vs $797 and DSCR 2.297 vs 2.697 evidence, which
   stays verbatim.

Everything else (the toggle, withholding Select, reason-agnostic copy,
native radios, browse vs commit, B over A, Select on a clamped card) states
its reason without the verdict word. Drop the "The decision:" label at line
109 and let the three-part decision read as three sentences.

### V5. Decision paragraphs that end on a category
Phase 5: the last clause of a decision paragraph names what the borrower
gets.

- **Line 109** ends "So the pair stays." Good beat; land it: the pair stays
  so the borrower can see the one trade the dial cannot express, monthly
  payment against DSCR. Keep the short sentence, add the borrower clause
  before or after it.
- **Line 167** ends "You cannot make a fact said four times feel like a fact
  said once." True and quotable; it lands on the design principle. One
  clause after it on the borrower: they read the change once, where it
  happened.
- **Line 192** ends on "which fact a surface is responsible for" (cut 13).
- Line 117 already ends on the borrower ("somewhere they did not ask to
  go"). Line 111 ends on "the exact comparison the pair exists to protect,"
  which is borrower-adjacent and fine. Lines 141-143 end on the borrower or
  the keyboard user. No change.

### V6. The 100x bug, to a non-engineer -- lines 62 and 64
> - **A 100× unit error in the money.** A rename to basis points had never propagated to the control's display file. At one step the dial read **"63 points · $94,501 credited at closing"** directly above a panel correctly reading **"Rate credit −$937.50."**

PROTECTED numbers: "$94,501" and "−$937.50" stay verbatim, and "100×" stays.
Phase 5 rule (1x sample, flagged in the Joi handoff): to a non-engineer a
defect is (1) a plain name for the class, (2) the scale in everyday terms,
(3) where you would have to be looking to see it, and the mechanism is
omitted, not simplified. "A rename to basis points had never propagated to
the control's display file" is mechanism. The pair: "It was a simple math
error, a wrong decimal point. Something that you wouldn't really catch
unless you were looking at the details. Something I might have missed too
if I didn't have Claude double checking my work."

**This rewrite is the second sample for the rule.** Joi recorded it on one
take in which Justin said he no longer remembered the specifics. If his
rewrite here keeps the mechanism on purpose, the rule is wrong, not the
rewrite, and Joi hears about it. The line-64 paragraph (cut 11) already
does "place" well: "the money figure a borrower reads."

**Applied (Justin, 2026-09-24):** "This was a simple math error." + the protected quote verbatim + "But the only way to really check it was by looking into the details. I gotta give credit to Claude for helping me double check this, because without it, it probably would have slipped through." No mechanism: second sample, the rule holds (Joi). "I gotta" is a register-breaker, protected.

### V7. "Suppressed rather than relabelled" -- line 117
> The new behavior shows the loan at its own boundary rate, says so in words, and **withholds Select**. Suppressed rather than relabelled, because the control is the borrower's stated intent, and a live Select would take them somewhere they did not ask to go.

PROTECTED intent word: "the borrower's stated intent" is protection 2 and
does not move. The Phase 5 pair for this line is "Rather than just changing
the label we're going to tweak the copy and remove the button to remove any
ambiguity into what's going on." Justin's version drops "intent"; the
protection says keep it. Proposed shape: his diction ("rather than just
changing the label ... tweak the copy and remove the button"), his "we,"
and the draft's reason clause with "intent" and the borrower ending intact.
Note the watch-list item: "ambiguity into" is a dictation artifact; "about."

### V8. The open ending -- lines 186-192
> Honesty matters more than a clean ending, and one question is genuinely unresolved.

Delete. Phase 5 names this sentence as draft voice.

> The disclosure says where the ceiling is. It does **not** say that the request was reduced, which was the original complaint — nothing on screen names the ↑0.500% the borrower asked for. Fixing that sounds trivial and isn't, because it forces a prior decision I had not separated out: **is a clamp a limit statement or an event statement?**

PROTECTED (interview ruling 7, the open ending). The category insight stays
whole. Em-dash 2.17, bold per cut 23.

Then the landing, which the draft does not have. Phase 5 rule: an
unresolved item states (1) who holds it for now, (2) the milestone that
reopens it, (3) the license for leaving it. His words: "Because we are
operating in a very MVP style, some of these questions can be left to be
answered by our support team and sales specialists. But there are things
that we're going to need to figure out as this sees a wider rollout to the
rest of our customers." Proposed shape, after the "two different designs"
sentence from cut 4: support and the sales specialists hold the clamp
question for now; it comes back at wider rollout; "very MVP style" is the
license. The ending stays open. It just stops performing its openness.

Then the closing thesis replacing line 192 (cut 13): building got easy,
the conversations did not, "with Product and with Risk and with Legal,"
what you can and cannot say from a legal standpoint. This is where the
missing S signal enters the study. Generalised "you" for the lesson (V10).

### V9. Numbers with affect
Rule: in prose, a hard number sits beside an affect word or a comparison in
the same sentence. Bulleted receipts, the metrics block, and the callout
are data and exempt. Prose numbers that pass: 2 of 14 (comparison), $2,556
vs $2,625, $936 vs $797, DSCR 2.297 vs 2.697, 14/5 vs 9-10/0-1, "forty
lines" vs "for free," "four times" vs "once," 0.500 vs 0.375. Two that stand
alone:

- line 17 "caught a 100× unit error in a money figure before it could
  ship": has a consequence, no affect. One word does it.
- line 70 "Six directions": bare, and mismatched (P4-2).

And one addition, not a cut: the Phase 5 receipts register puts the exact
figure and the feeling in the same paragraph ("226 commits merged in 3
months, and me being the 4th highest human contributor ... made me feel
proud ... still sometimes scary"). One prose sentence after the Receipts
list, in his words, would carry the affect, the comparison to the
engineers, and the self-limit (V1/P4-4) in one place. If "newfound powers"
comes with it, that is a register-breaker and protected from then on.

### V10. I / we / you
The study is "I" and "the borrower" throughout: no "we," no "you." Phase 5
split: "I" for process and credit; "we / our borrowers" for decisions
defended to stakeholders; "you" for lessons. Where each belongs:

- **"I" stays:** the opener, the capture (line 45), the defects (57-66),
  the exploration (70), the all-rates build (133), the A/B build (160),
  Receipts.
- **"we / our borrowers":** the pair (109), the toggle (111), withholding
  Select (117), the clamp disclosure (167-169). These were defended to
  Product and Risk, and the Phase 5 samples for all four are in "we."
- **"you":** the closing lesson (V8) only.

Mixing inside one sentence is the tell; the apply session checks each
rewritten sentence against this split.

---

## The Contents index: eleven headings

Current H2s are sentence headings with "I" and a verb; instant-sow's are
noun phrases (measured: four H2 entries on this branch, not six; the weight
target holds either way). Proposed noun phrases beside each current heading.
Sentence case kept, matching this study's existing headings; the
Title-Case-vs-sentence-case question across studies is not this report's.

| # | Current | Proposed |
| - | ------- | -------- |
| 1 | The short version | The short version |
| 2 | Context: a codebase built for agents before I got there | An agent-first codebase |
| 3 | The problem | The problem |
| 4 | I captured the real response and the assumption collapsed | One live pricing response |
| 5 | Reading the code turned up four defects, one of them serious | Four defects in the prototype |
| 6 | I explored the fix as design, then locked it | The fix, as design |
| 7 | Where a loan runs out, it says so | The limit state |
| 8 | Then a second reading of the same data | All rates on one loan |
| 9 | And the one state that had no disclosure at all | The clamp disclosure |
| 10 | Receipts | Receipts |
| 11 | What is still open | Still open |

Alternates if any read flat: 4 "The ragged ladders," 5 "Four defects, one
serious," 6 "Six directions, one decision" (only if P4-2 resolves to six),
9 "When a switch changes your number." Headings 7, 8, and 9 currently open
with "Where," "Then," and "And," which chain the sections into a narrative
the index cannot show; noun phrases let each stand alone in the Contents.

---

## Protected (flagged, NOT cut)

Named each time a cut was tempting and a protection stopped it.

- **Protection 2, intent throughline.** Line 117 "the control is the
  borrower's stated intent." The Phase 5 pair for this sentence has no
  "intent" in it; the protection wins, the rewrite keeps the word (V7).
- **Protection 3, named lists.** The four defects (59-62): four stay four,
  even though bullets 1 and 2 are both "par" failures. The three all-rates
  decisions (141-143), the longest bullets in the piece, stay whole; every
  sentence carries Q or J. The "normally closed to me" list at line 35
  (monorepo, vendor integrations, typed domain models, a test suite with
  opinions) stays whole through V2. The six receipts stay six.
- **Protection 4, hard numbers.** The metrics block (25-31) is the
  second-largest fixed cost in the piece and describes the repo, not his
  work; it stays because it is the comparison base for "fourth-highest
  human contributor" and because numbers are not cut for length. $2,556,
  $2,625, $2,931, $936, $797, DSCR 2.297 and 2.697, 2 of 14, 14/5, 9-10/0-1,
  "forty lines," 0.500 and 0.375: every one stays. Cut 11 removes "two
  orders of magnitude" only because "100×" already carries it.
- **Interview ruling 7, five elements.**
  1. Inception framing (line 35): stays; V2 changes how it is said.
  2. The exact 100x pair, $94,501 vs −$937.50 (line 62): verbatim; V6
     changes the sentence around it.
  3. The open ending, limit statement vs event statement (line 188):
     stays; V8 adds custody and timing under it and removes the sentence
     that dramatises it.
  4. The isolated-stack disclosure (lines 180-182): untouched.
  5. Kiavi named: currently satisfied outside the body; V2 brings it in.
- **Short landings** ("So I answered it." "Correct behavior." "So the pair
  stays."): kept through every adjacent cut.
- **Register-breakers:** none in the source to protect. Any that arrive in
  Justin's rewrites are protected on arrival.

## Length budget

- Estimated removal from cuts 1 to 24: about 600 prose words. Estimated
  addition from V1, V2, V8, and V9: about 80. Landing: ~1,800 prose, ~2,350
  total, with every protection intact. The target is met.
- The target cannot go materially lower without a protection. The next
  three blocks by size are the four-defect list (protection 4 plus Q), the
  three all-rates decisions (Q, the accessibility bar the brief asks for),
  and the metrics block (protection 4). Cutting any of them buys 80 to 150
  words and costs a protection or a director signal. If Justin wants
  instant-doc-review's weight beaten by a wider margin, the honest lever
  is the option-board row (four figures with alt text, ruled 09-15), not
  the prose. Gaff does not propose it.
- If the target costs a protection, the target loses. Here it does not
  have to.

---

## Standup

```
Where we left off: seven passes on instant-dscr.md (six gaff + Phase 5 voice), report written to vector/audits/, committed and pushed on feat/instant-dscr-case-study. Nothing in core/content/ touched.
What is working: 25 cut entries (23 em-dashes inventoried, zero spaced hyphens), 10 voice shapes, 11 heading proposals. ~600 prose words out, ~80 back in, target met without a protection.
Concerns: three director signals are absent from the source and no cut supplies them (stakeholder scope, named tools, named engineers); they enter only through Justin's rewrites at V2, V3, and V8. The 100x rule (V6) rests on one sample; his rewrite there is the second. "Six directions" vs four boards, and "three dead" vs "5 dead," need a reader-facing reconciliation.
Blockers: none. Test and lint gates untouched (no code changed).
```
