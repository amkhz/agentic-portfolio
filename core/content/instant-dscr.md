::: callout
**Role:** Lead Product Designer — design and implementation

**Product:** Instant origination for DSCR rental loans (private lending)

**Window:** June–August 2026

**Surface:** Borrower-facing web app, production

**What I did:** designed it, wrote the code, opened the PRs, merged them — 27 in this repo
:::

## The short version

I am the lead product designer on this product, and I ship designs and code to the production repository. I still made prototypes and worked with engineering to refine them. But branches, pull requests, reviews, and merges were also handled by me.

Here's how I put this to work. While working on this feature, I discovered that a product assumption we made was incorrect. Something I only noticed after looking at our live pricing API. I caught a 100× unit error in some money figures before any of it was shipped, sparing the users the shock of seeing a $94,000 credit that we'd have to explain was an error. And then I recreated the interaction model as a result of what we found. The design decisions and the code that implemented them all came from the same place.

## Context: a codebase built for agents before I got there

Specific design skills and agent rules are loaded through file paths, so each session loads just what it needs to keep things looking and feeling right. The repo was set up for agent-driven development on day one. Within the first three commits, it added agent instruction files and an agent config directory. That was a choice made at the beginning by engineering and something that I followed as soon as I jumped in. When I needed to make sweeping design changes, I made them in my rules and skills. And those cascaded outward.

What that looks like now, on the mainline:

::: metrics
- 2,803 | Commits on mainline
- 2,568 (92%) | Carrying an AI co-author trailer
- 1,259 (45%) | Authored directly by the agent
- 6 | Meaningful human contributors
- 2 engineers + me | Core team
:::

This matters to the story for a specific reason. **I did not build this infrastructure. I am the designer who became a first-class contributor inside it.** A production lending codebase is normally closed to me: unfamiliar monorepo, vendor integrations, typed domain models, a test suite with opinions. Agent-assisted development is what made that codebase legible enough for me to work in it directly, at the standard the engineers hold. That is the actual unlock, and it is worth more than a faster mockup.

## The problem

Borrowers can buy their interest rate up or down. Pay points at closing for a lower rate, or take a credit at closing in exchange for a higher one. The screen offers a stepper: press `−` to walk the rate down, `+` to walk it up, and the loan cards below reprice.

The design that existed assumed **one shared ladder** — that every loan product offers the same set of rate steps, so one control could drive them all. That assumption was written down as an open question nobody had answered. So I answered it.

## I captured the real response and the assumption collapsed

I deployed a throwaway branch to a QA environment and captured an actual pricing response: one loan, six qualifying products, all starting from the same base rate.

Real ladders are **ragged**. Each product's rate steps are truncated at a price cap, and because each carries a different price offset, the cap bites at a different point on each one. On the buy-up side, the six products shared only two steps out of fourteen. Beyond that, every product was alone.

The problematic finding: **the same rate costs different amounts on different products.** The 30-year fixed reached 6.75% for a $2,556 credit. Its interest-only sibling reached the same 6.75% for $2,625. So the unit the control was set to could select a rung within one product, but it could never align a control across loan products. One shared dial over one shared unit didn't need improvement. It needed to change.

![Design board headed "Every product's ladder stops in a different place", plotting which of six loan products has a rung at each of fourteen rate steps, with the buy-up side ragged and the buy-down side complete](/images/instant-dscr-ragged-ladders.png)
*The finding*
<!-- aspect:auto placeholder:Design board plotting rung-exists, no-rung, and off-screen-product markers for six loan products across fourteen rate steps, above a row of eight cards describing what the borrower gets at each buy-up press -->

## Reading the code turned up four defects, one of them serious

With the real data readily available I could walk the control and read the source alongside it. There were four areas where it failed:

- **The dial displayed "Par" while off par.** It displayed one shared step from the *first* product only. On steps that product didn't support, the value fell back to par and computed a zero delta. The readout printed "Par" and the "Reset to par" button rendered at the same time.
- **Cards silently reverted to par.** When a product had no rung at the selected step, it displayed its par rate, payment, and DSCR with no indication, **and the Select button stayed live.** A borrower could select a par-priced loan while the control said that an adjustment was applied.
- **Three dead steps belonged to invisible products.** The step domain combined all six qualifying products while the grid only could show two.
- **A 100× unit error in the money.** This was a simple math error. At one step the dial read **"63 points · $94,501 credited at closing"** directly above a panel correctly reading **"Rate credit −$937.50."** But the only way to really check it was by looking into the details. I gotta give credit to Claude for helping me double check this, because without it, it probably would have slipped through.

That last one was tricky. It wasn't visible in a static mockup and wasn't caught by the type checker, because both values were structurally valid numbers. It was only found by putting the captured response, the rendered screen, and the source next to each other. That was a designer-shaped bug squarely in the designer's wheelhouse. I got the money figure a borrower reads quite wrong.

The big thing I learned about working this way and a nice bonus was that all four of these were defects in the *prototype* of this work, caught before anything merged. Nothing reached production and no borrower ever saw them. Finding them was the review pass on my own prototype, and the redesign below fixed it. In the old way of working that's something an engineer probably would have caught, and brought back to me. This time I was able to fix it on my own.

Throughout this case study and screenshots you might see par and base used. Before we released this, we swapped par for base because that better matched the legacy calculator and the language borrowers and the team were already using.

## I explored the fix as design, then locked it

Six directions, drawn as real screens, not boxes:

::: comparison
**Before**
![Option A board, "Intersection": a dial domain of nine rate steps with the +0.5 step struck through, and a note that the interest-only product can reach it for a $2,931 credit the borrower is never offered](/images/instant-dscr-option-a.png)
placeholder: Option A, "Intersection" — a dial domain row with one step struck through, above gains and costs columns
label: A
description: only steps every visible product shares

**After**
![Option B board, "Shared dial + per-card ceiling": a full-range dial at 0.50% above two loan cards, the interest-only card selectable at 6.875% and the 30-year card dashed at its 6.750% ceiling](/images/instant-dscr-option-b.png)
placeholder: Option B, "Shared dial + per-card ceiling" — a rate dial above two loan cards, one at its ceiling, above gains and costs columns
label: B
description: shared dial, per-card ceiling
:::

::: comparison
**Before**
![Option C board, "Rate scale, no stepper": a row of ten selectable rates from 5.750 to 6.875 with 6.625 chosen, above one row per product showing rate, monthly payment, and credit](/images/instant-dscr-option-c.png)
placeholder: Option C, "Rate scale — no stepper" — a row of selectable rates above one row per product, with gains and costs columns
label: C
description: a rate scale, no stepper

**After**
![Option D board, "Loan first, then rate": step one picks among three loans all shown at par 6.375%, step two adjusts that one loan's rate on its own ladder to 6.625%](/images/instant-dscr-option-d.png)
placeholder: Option D, "Loan first, then rate" — a two-step panel pairing loan choice with a per-loan rate ladder, above gains and costs columns
label: D
description: loan first, then rate
:::

The tension was real and worth stating plainly: keying the control on cost gives you a coherent shared *dollar* figure but incoherent *rate* steps. Keying it on rate gives you coherent rate steps but per-product dollars. You cannot have both across six products.

Things get easier once we scope the control to select a single product family. We can't have a coherent list of rates and dollars across all six loan products. But if we limit to one family, we can. This works because then the grid will only need to show two variants within the family. Fully amortizing and interest-only. Within that, every shared step up and down the rate ladder can agree across the rate and the dollar amount. The only thing that makes them different at this point is when we have to cap at the top part of the ladder. This keeps things a little simpler while still enabling borrowers to compare rates in a way that felt right to them.

- all six products, keyed on cost (before): 14 rate steps, **5** dead, 3 of them on products the grid never showed
- one family, keyed on rate: 9–10 rate steps, **0–1** dead

**The decision:** the control keys on rate delta, its domain scopes to the displayed family, and interest-only stays paired with its amortizing sibling rather than being demoted into a dropdown. That last one took the most argument with myself. Collapsing it would have made the problem disappear entirely. But both variants price at the *same rate* at every shared step, which means the amortizing/interest-only difference is not a rate difference at all. It is $936 versus $797 a month, and DSCR 2.297 versus 2.697. That is the one trade on the screen the rate control cannot express, and DSCR drives the maximum leverage band. So the pair stays.

I also killed a toggle. Once the dropdown scopes to a family, an "All / Interest-Only" switch can only subtract — it hides half of the exact comparison the pair exists to protect.

## Where a loan runs out, it says so

When the borrower asks for a rate a loan cannot price:

The new behavior shows the loan at its own boundary rate, says so in words, and **withholds Select**. Suppressed rather than relabelled, because the control is the borrower's stated intent, and a live Select would take them somewhere they did not ask to go.

The copy is deliberately reason-agnostic: *"This loan doesn't go above ↑ 0.375%."* It does not name a cause, so if a rate sheet ever drifts or an eligibility clamp fires, the same sentence still tells the truth. The failure mode becomes an extra disclosed state, never a silent repricing.

Here it is running:

![The running rate step at 0.500%, with the fully amortizing 30-year card held at its 6.750% ceiling reading "This loan doesn't go above 0.375%" and offering no Select button, beside its interest-only sibling at 6.875% with Select available](/images/instant-dscr-limit-state.png)
*Limit state*
<!-- aspect:auto placeholder:Borrower rate screen with the amortizing loan at its ceiling and Select withheld, beside the interest-only loan one step further with Select live -->

Both credits are the vendor's own figures, $2,556 and $2,931, matching the captured response to the dollar.

## Then a second reading of the same data

The stepper says "nudge me one step." It doesn't say "show me everything," because it's a stepper: ten rungs, one click each. So I built the other familiar view for borrowers: every rate on one loan, with what each one costs.

![The all-rates table for the 30 Year Fixed: one radio row per rate from 5.750 to 6.875, each with monthly payment, DSCR, and a closing column reading "$5,157 cost" or "$2,556 credit" in words, with 6.375 marked Base](/images/instant-dscr-all-rates.png)
*All rates*
<!-- aspect:auto placeholder:A table of every rate on one loan, rows as native radio inputs, with monthly payment, DSCR, and the closing figure stated as cost or credit in words -->

Three decisions worth naming:

- **Browsing does not commit.** The table holds a *requested* rate; the control holds the *committed* one. Only the primary button converts one into the other. This started as a bug I filed against my own prototype: pick a row, leave the table, and the rate had followed you out.
- **Rows are native radio inputs**, not buttons wearing a radio role. The browser then supplies the entire keyboard contract for free instead of forty lines of hand-rolled key handling. A rate the loan cannot price is not a *disabled* radio — it is not a radio at all, because arrowing onto it would select something unreachable.
- **The closing column states direction in words.** A bare "−$2,556" under a header reading "At closing" says three contradictory things at once: the minus reads as below zero, the green reads as good, and the header reads as money owed. Borrowers do not experience a credit as a negative number. So the figure is always positive and the word carries the direction: "$2,556 credit," "$1,032 cost." One function decides it, and both the visible cell and the screen-reader name read through that function, so they cannot disagree.

That last detail generalizes: the accessible name on each Select button carries the full loan identity, even though the visible label does not, because a screen-reader user has no dropdown in view to supply the context a sighted user gets for free.

## And the one state that had no disclosure at all

Switching products carries the borrower's adjustment across, clamped to the nearest step the new loan can price, resolving ties toward base so a clamp never volunteers a *larger* adjustment than was asked for. Correct behavior. It also changes a number the borrower set.

Asking for ↑0.500% on the 30-year, then switching to the 5/1 adjustable:

- Before the switch, the dial reads **0.500%**.
- After the switch, the dial reads **0.375%**. Nothing said why.

What made this hard isn't that the change was subtle. Rather, what the borrower saw was still completely self-consistent. The dial said 0.375%, both cards said `↑ 0.375% vs base`, the credits agreed, and both Select buttons were live. Everything still priced properly, so there wasn't any limit to display. From the borrower's point of view, there was no contradiction to see, because what they were asking for wasn't anywhere on the screen.

The problem with the clamp wasn't notifying borrowers. It was about reflecting the correct state. The screen has to remember what the borrower requested and put that next to what's actually being priced before we have anything else to say about a potential clamp. This was something that the browse-versus-commit split on the all-rates view already did.

So I drew up two solutions. I dictated my intent to Claude, then had Paper show it to me visually. I clicked around and moved stuff to see what felt right. Then I responded to what was in Paper, spoke to Claude and then built and refined it. It was a mix of hands-on and dictation. Then I compared them to see how they felt:

- **A:** the existing sentence on each card
- **B:** one line above the pair

Version A stated one fact four times. The `↑ 0.375% max` chip already says it once, so each card said the ceiling twice and the pair of cards said it four times. Both sentences landed at the same height, which was redundant, and they pushed each card's metrics down. B said it once, in the gap between the control that changed and the cards that changed, and the per-card chip still carries the per-card fact.

B shipped. **B's weakness is prominence, which is tunable: size, weight, an icon, spacing. A's weakness is redundancy, which is structural.** Repeating yourself doesn't make things easier to discover, and in fact might make people tune out.

There was one more subtle decision within version B. A clamped card is *not* at its limit, so Select stays live. Without that, it would have rebuilt the exact dead end the clamp was introduced to remove. And the disclosure decays with no timer and no dismiss affordance. Once the borrower touches the control, the request equals what's being priced, and the note stops applying.

## Receipts

- **27 merged pull requests** to the production lending app
- **132 merged pull requests** to the design-system and doctrine repository
- **30 architecture decision records** governing a design repo
- **226 commits** to the production app across three months
- Fourth-highest human contributor on the repo, behind two staff engineers and one platform engineer
- The two plan documents behind this feature: ~500 lines each, decisions numbered and individually reversible

::: callout On the screenshots
All screenshots were captured from the running application in a local stack with mocked vendor responses, using a committed fixture of a real pricing ladder. All borrower data shown is synthetic.
:::

## What is still open

The disclosure explains where the ceiling sits. It doesn't say that the requested amount was reduced, which was the original issue. Nothing in the UI shows the ↑0.500% the borrower asked for. Fixing that sounds simple but it isn't, because it highlighted a prior decision I hadn't thought out yet: when we clamp, is it a statement about the limit or about the event that made the borrower hit the limit?

Naming the reason puts a cause back into copy that never mentioned it, and then the eligibility case needs its own sentence. Those are two different designs.

It's now in the hands of sales support and our early adopter customers. As we hear more feedback and continue on with the broader rollout, we'll revisit it. We're still operating as an MVP and we're alright with leaving some things open.

Building and expressing ideas certainly got easier. But what isn't easier are the conversations with Product, Risk, Legal, and Sales stakeholders that help define the experience you're actually able to deliver for customers. There are still regulations to abide by. And there are still constraints as to what we should and what we can deliver for customers.
