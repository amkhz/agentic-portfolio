I turned a black-box AI extraction system into a transparent, auditable review experience. Loan analysts can verify the AI's work, take action, and trust what they're looking at, with every decision versioned for compliance. The work grew into Snapshot, a unified view across the whole origination file, and the prototype I built didn't get handed off. It graduated into the production codebase.

## The Problem

The proof of concept worked. AI could extract and validate data from purchase sale agreements (PSAs) and the title and property documents that decide whether a loan can close. But the implementation was scrappy, bolted into a monolith, with no way for Operations to see what the AI did or why it flagged something. It didn't talk to the system that delivers issues back to borrowers either.

So a single PSA still took 20 minutes to review. Analysts bounced between the AI's output, a separate document viewer, and the feedback system, cross-referencing by hand the whole way. The MVP was a black box. Analysts either trusted it blindly or treated it as a hassle. Neither one works in regulated financial operations.

![Diagram showing the fragmented before-state workflow for document review](/images/before-flow.png)
*The before state: analysts bouncing between AI output, a separate document viewer, and the feedback system to review a single PSA.*
<!-- aspect:16:9 placeholder:Before-state flow: analyst jumping between AI output -> separate document viewer -> feedback system -> manual cross-referencing. Pain points annotated. -->

## V1: The Property Admin Page

V1 was a single page where the analyst could see everything at once. The core principle: move incrementally from rigid automation to intelligent augmentation. The analyst's expertise is the product. AI just does the grunt work of extraction so they can focus on judgment calls.

Three things shipped that mattered. **Extracted data view**, so analysts scan AI-extracted fields in a familiar structured layout, no hunting. **Inline document viewer**, so the original document loads side by side with the extracted data, no tab-switching. **Escape hatch with an audit trail**, so if the AI got it wrong, the analyst reverts to manual review with a justification note. That note creates accountability without blocking work, and it feeds back into prompt refinement.

![IDR Admin Page showing extracted data, document viewer, and conditions panel](/images/admin-page-tasks.png)
*Magic Patterns prototype of the Property Admin Page: rules, source documents and data, and targeted tasking in one view. No more tab-switching.*
<!-- aspect:16:9 placeholder:Magic Patterns prototype of the Property Admin Page: rules, source documents and data, and targeted tasking in one view. -->

## V2: Borrower Self-Service

V2 took work that used to belong to analysts and handed it to borrowers. AI now generates actionable tasks, starting with borrower name and entity corrections, and delivers them to the borrower automatically. The borrower uploads a corrected document, gets immediate feedback, resubmits if needed, and moves forward. No analyst in the middle. It's a loop: AI reviews, borrower acts, AI confirms.

These are the first task types, but the pattern is built to expand. Anything an analyst does that's routine, repeatable, within risk limits, and document-driven is a candidate. Each new task type compounds the gains on both sides.

![Borrower self-service task flow: AI generates task, borrower uploads corrected document, AI confirms](/images/borrower-flow.png)
*V2 self-service loop: AI generates a task, the borrower acts on it, and AI confirms the fix. No analyst needed.*
<!-- aspect:16:9 placeholder:V2 self-service loop: AI generates a task, the borrower acts on it, and AI confirms the fix. -->

V1 and V2 proved the pattern. They also showed where the ceiling was. A great PSA review experience is still just a PSA review experience. The real loan file pulls from member data, project data, property data, title, valuation, and a stack of cross-domain rules that decide whether the pieces actually agree. Optimizing one domain at a time was always going to leave the analyst stitching things together in their head. That's the problem Snapshot solves.

## Snapshot: One View Across the Origination File

Snapshot is the unified origination file. One interface across Member, Project, and Property Asset, plus the cross-domain rules that sit above them. It takes what V1 and V2 proved and applies the same review-and-task pattern to every domain at once.

The hypothesis behind it is small but load-bearing: **in the happy path, ops should never have to come here.** When they do, they have a specific reason. Figure out what stopped automation, understand a decision, or verify data. So the UI should already know why they're here.

![Snapshot dashboard showing Action Center with cross-domain failures and three domain health cards](/images/snapshot-dashboard-action-required.png)
*The "are we good?" view. The Action Center surfaces what needs attention first. Domain health cards show the rest of the file at a glance.*
<!-- aspect:16:9 placeholder:Origination File dashboard with Action Center expanded, three domain health cards (Member, Project, Property Asset), cross-domain rule list. -->

Three patterns do most of the work.

**Task-first surfacing.** The dashboard leads with the Action Center, a prioritized list of every failing rule across every domain. Cross-domain failures first, then domain failures. One click to the rule. Passing states compress, failing states expand. When the file is clean, the Action Center disappears and a small green status banner takes its place. The interface adapts to what's actually true.

**Cross-domain rule provenance.** Six rules sit above the domains and check whether they agree. The most interesting one ("Is the borrower vesting in the borrowing entity?") is a set-containment check: every vested owner from the title report has to appear among the buyers on the PSA. The rule doesn't just say pass or fail. It shows the sets side by side, each member matched or unmatched. Provenance is visible. Decisions are auditable.

![Cross-domain rule provenance panel showing vested owners contained within PSA sellers set containment](/images/snapshot-rule-provenance.png)
*Set-containment provenance for cross-domain rules. The rule doesn't just say "fail." It shows you which member of which set didn't match.*
<!-- aspect:16:9 placeholder:Vesting in Borrowing Entity rule expanded with Set A (Vested Owners from Prelim Title) contained within Set B (PSA Buyers) visualization, per-member match status. -->

**Source vs. Evidence.** Two ideas the team kept conflating, so we made them visible separately. *Source* is where a specific value came from (the canonical buyer name on the property asset came from the PSA). *Evidence* is what data fed a rule (a rule used PSA data and Title data as evidence). One lives at the field level in the Source of Truth sidebar, the other at the rule level in evidence-grouped accordions. Different mental models, different surfaces, no overlap.

![Property Asset workspace with Action Required banner, evidence-grouped rule accordions, Source of Truth sidebar](/images/snapshot-property-asset-workspace.png)
*Drilling into a domain. Failing evidence groups auto-expand, passing groups stay collapsed. The Source of Truth sidebar shows where each canonical value came from.*
<!-- aspect:16:9 placeholder:Property Asset domain workspace with Action Required at top, PSA Rules accordion expanded showing failures, Kiavi Property Details collapsed (passing), Source of Truth sidebar visible. -->

Click into a failing rule and the Evidence Inspection Panel slides in from the right. Document on the left, extracted data on the right, audience-tagged remarks below. This is the direct descendant of the V1 admin page, but it now works across every domain and every evidence type. Step through failing rules with prev/next or J/K. The last rule flips to a "Done" state so you know where the work ends.

![Evidence Inspection Panel with PSA document on left, extracted data on right, remarks below](/images/snapshot-evidence-inspection.png)
*The Evidence Inspection Panel. V1's split-view pattern, generalized. Document, extracted data, and audience-tagged remarks in one focused view.*
<!-- aspect:16:9 placeholder:Evidence Inspection Panel as Sheet, Split Document variant: PSA viewer left, extracted PSA fields right, remarks tagged ops/broker/borrower below. -->

The whole thing is built on Sentient Design principles, especially "deferential, not directive" (the system surfaces what it found and offers paths, it never forces a resolution) and "collapse effort between intent and action" (every step between *I have a problem* and *the problem is resolved* is friction worth removing).

## From Prototype to Production

Here's the part I'm proudest of. Snapshot didn't get handed off. It graduated.

Engineering didn't take screenshots and rebuild it in the legacy stack. They took the codebase itself, forked it, and turned it into the foundation for the Origination File experience in production. Snapshot now ships as its own versioned package that the Ops platform consumes as a normal dependency. The legacy frontend runs React 16, jQuery, and a webpack pipeline shared across hundreds of screens, where upgrading anything means regression-testing everything. Snapshot runs its own modern stack (React 18, Vite, Tailwind 4, Apollo) in isolation. A release can't silently break an Ops screen, and a rollback is just pinning the previous version.

The graduation came with an ownership map, and that map might be the most reusable thing the whole project produced. Engineering owns the data layer: GraphQL queries, transformers, live rendering logic. Design owns the design system and the UI building blocks, in a shared component library engineering reads from but doesn't touch. Pages and CSS are the negotiated middle, with mocked-data rendering preserved so design keeps testing against realistic states without waiting on live data. Designer-built code flowing into production, with clear lanes instead of stepped-on toes.

Engineering presented this integration model to the company's architecture guild as the pattern for how design and engineering collaborate going forward. The first user acceptance testing is underway now.

## How I Worked: AI-Assisted Design

This is the first project where I really ran with an AI-assisted design process. Not just generating images, but using AI throughout the loop: ideating, prototyping, writing code, structuring decisions, navigating the data model.

A few moves that mattered:

**Magic Patterns for fast variants.** When I needed to compare layouts for the V1 admin page or the Snapshot dashboard, I spun up working prototypes instead of static mocks. Stakeholders clicked through real interactions. Feedback came in hours, not weeks. When something didn't work, I threw it out without sunk-cost guilt.

**Claude Code for the codebase.** Snapshot is a real React + TypeScript + Tailwind v4 + shadcn/ui prototype, not a Figma file. Claude Code let me work in the actual codebase, refactor components, write ADRs, and keep the design system consistent across dozens of components. The OKLCH operations palette, the evidence-grouped accordion pattern, the cross-domain provenance panel, all of it lives in code I can hand to engineering.

**Tapping the real data schema.** This was the unlock I didn't see coming. As Engineering refined the GraphQL schema (PSA review fields, evidence enums, rule result types, source attributions), I pulled those exact types into the prototype. Mock data shaped by the real schema. When PM, Engineering, and I sat down, we were all looking at the same nouns. The conversations got specific fast. "Should this be Source or Evidence?" became a real architectural question with a real answer, captured in an ADR, and reflected in the UI the next day.

Human oversight is non-negotiable. AI sped up the process. It didn't make the decisions. The tradeoffs, like when to compress passing states, when set containment needs its own rendering, where Source of Truth should live, what the escape hatch asks the analyst to write down, were all judgment calls. The tools just gave me more shots on goal.

The real test of whether this is a *way of working* and not just my personal workflow came when I hired a senior designer partway through. Onboarding her meant teaching two things at once: the domain (private lending is dense, and the origination file is the dense part of the dense part) and the method (design, AI, and engineering in one loop without trading away quality, speed, or actually putting work in front of users). The prototype lives in code, on the real schema, with its decisions captured in ADRs, so it turned out to be the onboarding material. She wasn't reading a deck about how we work. She was reading the work itself. She contributed to Snapshot inside her first month. That's the strongest signal I have that the approach is teachable, not just personal.

::: metrics Results
- 50% | Reduction in PSA review time | brass
- 82% | Loans shipping AI output with zero analyst edits | magenta
- 27% | Loans auto-completing PSA review in Processing
- 33% | Reduction in Prelim Title review time
- 100% | Borrowers get automated feedback the moment they upload
- 7% | Borrowers resolving PSA issues before Processing starts
:::

V1 and V2 are in production, and the numbers tell two stories.

The speed story: PSA review time is down 50%, Prelim Title review down 33%. More than a quarter of loans now auto-complete the PSA review entirely while still in Processing, before an analyst is even assigned. And on 82% of loans, the analyst doesn't change a thing in the AI's output. They verify, they don't redo.

The quality story is the one I watch closer. Speed is easy to claim and easy to fake, so we tracked what happens downstream where Underwriting checks the work. For years, underwriters kicked the PSA back to the analyst on roughly 40 to 45% of loans. After the Property Asset Processing rollouts in spring 2026, that rate fell to around 30%. And when we compared conditions on autocompleted loans against analyst-worked loans, the substantive defect mix (missing signatures, addenda, name mismatches) was nearly identical. Automation isn't creating a new class of error. It's running the same review, faster, with a cleaner handoff.

On the borrower side, every PSA upload gets immediate automated feedback, and 7% of borrowers now fix their own document issues before the loan even reaches Processing. That's work that never lands on an analyst's desk.

Snapshot is the next chapter, and it's already moving. The prototype graduated into a versioned production package, it's the foundation for the unified Origination File in Ops, and the first user acceptance testing is in flight. The review-and-task pattern V1 and V2 proved now has a path to every domain in the loan file at once. And the way it got there, designer-built code forked by engineering and shipped with a clear ownership contract, is being held up internally as the model for how design and engineering build together.

One pattern. Applied everywhere. And now it ships.
