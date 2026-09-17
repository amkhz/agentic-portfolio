::: callout
**Role:** Lead Product Designer — design and implementation

**Product:** Instant origination for DSCR rental loans (private lending)

**Window:** June–August 2026

**Surface:** Borrower-facing web app, production

**What I did:** designed it, wrote the code, opened the PRs, merged them — 27 in this repo
:::

## The short version

I am the lead product designer on this product, and I ship to the production repository. Not prototypes handed to engineering. Branches, pull requests, review, merge.

This case study follows one feature end to end, because the feature is where the claim gets tested. Along the way I proved a product assumption false by reading a live pricing response, caught a 100× unit error in a money figure before it could ship, and rewrote the interaction model as a result. The design decisions and the code that implements them are the same artifact.

## Context: a codebase built for agents before I got there

The repo was wired for agent-driven development on day one. Its **third commit** — same day as the initial commit — added an agent instruction file and an agent config directory. That was a deliberate inception choice by the engineering leads, not a retrofit.

What that looks like now, on the mainline:

::: metrics
- 2,803 | Commits on mainline
- 2,568 (92%) | Carrying an AI co-author trailer
- 1,259 (45%) | Authored directly by the agent
- 6 | Meaningful human contributors
- 2 engineers + me | Core team
:::

The tooling is not decoration. Agent rules load per file path, so a session touching the borrower UI gets the design doctrine and nothing else. The CI build **fails** if one of those rule files uses the wrong frontmatter key. There is a containerized sandbox that runs the agent with permissions skipped, on an isolated branch, so it cannot touch your working tree. Agent self-verification by scripted browser capture is the documented default, not a workaround.

This matters to the story for a specific reason. **I did not build this infrastructure. I am the designer who became a first-class contributor inside it.** A production lending codebase is normally closed to me: unfamiliar monorepo, vendor integrations, typed domain models, a test suite with opinions. Agent-assisted development is what made that codebase legible enough for me to work in it directly, at the standard the engineers hold. That is the actual unlock, and it is worth more than a faster mockup.

## The problem

Borrowers can buy their interest rate up or down. Pay points at closing for a lower rate, or take a credit at closing in exchange for a higher one. The screen offers a stepper: press `−` to walk the rate down, `+` to walk it up, and the loan cards below reprice.

The design that existed assumed **one shared ladder** — that every loan product offers the same set of rate steps, so one control could drive them all. That assumption was written down as an open question nobody had answered. So I answered it.

## I captured the real response and the assumption collapsed

I deployed a throwaway branch to a QA environment and captured an actual pricing response: one loan, six qualifying products, all starting from the same base rate.

Real ladders are **ragged**. Each product's rate steps are truncated at a price cap, and because each carries a different price offset, the cap bites at a different point on each one. On the buy-up side, the six products shared only two steps out of fourteen. Beyond that, every product was alone.

The sharpest finding: **the same rate costs different amounts on different products.** The 30-year fixed reached 6.75% for a $2,556 credit. Its interest-only sibling reached the same 6.75% for $2,625. So the unit the control was keyed on could select a rung within one product, but could never align a control across products. One shared dial over one shared unit was not a design that needed polish. It was a design that could not hold.

![Design board headed "Every product's ladder stops in a different place", plotting which of six loan products has a rung at each of fourteen rate steps, with the buy-up side ragged and the buy-down side complete](/images/instant-dscr-ragged-ladders.png)
*The finding*
<!-- aspect:auto placeholder:Design board plotting rung-exists, no-rung, and off-screen-product markers for six loan products across fourteen rate steps, above a row of eight cards describing what the borrower gets at each buy-up press -->

## Reading the code turned up four defects, one of them serious

With the real data in hand I walked the control and read the source alongside it. Four distinct failures, which I wrote up individually because they had different causes and different fixes:

- **The dial displayed "Par" while off par.** It derived one shared step from the *first* product only. On steps that product lacked, the value silently fell back to par and computed a zero delta. The readout printed "Par" and the "Reset to par" button rendered at the same time.
- **Cards silently reverted to par.** When a product had no rung at the selected step, it displayed its par rate, payment, and DSCR with no indication — **and the Select button stayed live.** A borrower could select a par-priced loan while the control claimed an adjustment was applied.
- **Three dead steps belonged to invisible products.** The step domain unioned all six qualifying products while the grid only ever showed two.
- **A 100× unit error in the money.** A rename to basis points had never propagated to the control's display file. At one step the dial read **"63 points · $94,501 credited at closing"** directly above a panel correctly reading **"Rate credit −$937.50."**

That last one is the one I would point at. It was not visible in a mockup and not caught by the type checker, because both values were structurally valid numbers. It was only findable by holding the captured response, the rendered screen, and the source next to each other. That is a designer-shaped bug in a designer-shaped place — the money figure a borrower reads — and it was two orders of magnitude wrong.

To be precise about severity, since it matters: all four were defects in the *prototype* state of this work, caught before any of it merged. None reached production and no borrower ever saw them. Finding them was the review pass on my own prototype, and the redesign below is the fix. I would rather say that plainly than let a number like $94,501 imply a production incident it never was.

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

The move was noticing that **scoped to one product family, the tension collapses to a single step.** The grid only ever shows one family's two variants. Unioning all six was what put dead steps on the control in the first place.

- all six products, keyed on cost (before): 14 rate steps, **5** dead
- one family, keyed on rate: 9–10 rate steps, **0–1** dead

Within a family, every shared step agrees on both rate *and* dollars. Divergence happens only at the capped rung.

**The decision:** the control keys on rate delta, its domain scopes to the displayed family, and interest-only stays paired with its amortizing sibling rather than being demoted into a dropdown. That last one took the most argument with myself. Collapsing it would have made the problem disappear entirely. But both variants price at the *same rate* at every shared step, which means the amortizing/interest-only difference is not a rate difference at all. It is $936 versus $797 a month, and DSCR 2.297 versus 2.697. That is the one trade on the screen the rate control cannot express, and DSCR drives the maximum leverage band. So the pair stays.

I also killed a toggle. Once the dropdown scopes to a family, an "All / Interest-Only" switch can only subtract — it hides half of the exact comparison the pair exists to protect.

## Where a loan runs out, it says so

The most interesting state is the one where the borrower asks for a rate a loan cannot price. The old behavior repriced it at par, silently, with Select still live.

The new behavior shows the loan at its own boundary rate, says so in words, and **withholds Select**. Suppressed rather than relabelled, because the control is the borrower's stated intent, and a live Select would take them somewhere they did not ask to go.

The copy is deliberately reason-agnostic: *"This loan doesn't go above ↑ 0.375%."* It does not name a cause, so if a rate sheet ever drifts or an eligibility clamp fires, the same sentence still tells the truth. The failure mode becomes an extra disclosed state, never a silent repricing.

Here it is running:

![The running rate step at 0.500%, with the fully amortizing 30-year card held at its 6.750% ceiling reading "This loan doesn't go above 0.375%" and offering no Select button, beside its interest-only sibling at 6.875% with Select available](/images/instant-dscr-limit-state.png)
*Limit state*
<!-- aspect:auto placeholder:Borrower rate screen with the amortizing loan at its ceiling and Select withheld, beside the interest-only loan one step further with Select live -->

The amortizing loan is at its ceiling at 6.750% with Select gone. Its interest-only sibling reaches one step further to 6.875%. The credits — $2,556 and $2,931 — are the vendor's own figures, matching the captured response to the dollar.

## Then a second reading of the same data

The stepper answers "nudge me one step." It cannot answer "show me everything," because it is a stepper: ten rungs, one click each.

So I built the other view. Every rate on one loan, with what each one costs.

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

What made this hard is not that the change was subtle. It is that **the resulting screen was completely self-consistent.** The dial said 0.375%, both cards said `↑ 0.375% vs base`, the credits agreed, and both Select buttons were live. Both loans price that step perfectly well, so no limit state fired either. There was no internal contradiction for a borrower to catch, because the number they actually asked for left no trace anywhere on the screen.

So it was never a notification problem. It was a state problem: the screen has to retain *requested* alongside *effective* before there is anything to disclose. Which the browse-versus-commit split built for the all-rates view already supplied.

I drew two answers, then built both and compared them running:

- **A** — the existing sentence on each card
- **B** — one line above the pair

A states one fact **four times**. The `↑ 0.375% max` chip already says it in shorthand, so each card says the ceiling twice and the pair says it four times. Both sentences land at the same height, which reads as a stutter, and they push each card's metrics down. B says it once, in the gap between the control that changed and the cards that changed, and the per-card chip still carries the per-card fact.

B shipped, and the reason generalizes: **B's weakness is prominence, which is tunable — size, weight, an icon, a rule. A's weakness is redundancy, which is structural.** You cannot make a fact said four times feel like a fact said once.

One more decision inside it: a clamped card is *not* at its limit, so Select stays live. Withholding it would have rebuilt the exact dead end the clamp was introduced to remove. And the disclosure decays with no timer and no dismiss affordance — touch the control and the request equals what is being priced, so the note stops applying. That fell out of holding requested and effective as one piece of state rather than bolting on a notification.

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

Honesty matters more than a clean ending, and one question is genuinely unresolved.

The disclosure says where the ceiling is. It does **not** say that the request was reduced, which was the original complaint — nothing on screen names the ↑0.500% the borrower asked for. Fixing that sounds trivial and isn't, because it forces a prior decision I had not separated out: **is a clamp a limit statement or an event statement?**

The existing copy is deliberately reason-agnostic. It names the bound and never the cause, which is why a ceiling that comes from eligibility rather than pricing reuses the same sentence unchanged. Naming the previous request reintroduces a cause, and then the eligibility case needs its own sentence. Those are two different designs, and picking between them is the real open item — not the copy, the category.

That is the shape of most of the work here. The interesting decisions are rarely about wording. They are about which fact a surface is responsible for.
