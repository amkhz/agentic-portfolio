How a small design team started shipping closer to engineering grade by treating AI as a teammate, not a tool.

*Lead Product Designer at Kiavi, roughly mid-2025 to mid-2026. An AI-as-teammate operating model, four proof-point prototypes, and the internal talk that brought the org along.*

## The Problem

AI usually shows up in design as a tool. Point it at a task, it spits out a mockup or some code a little faster. But, generic AI plus a generic prompt gets you generic output. It doesn't know your domain, your standards, or how your team actually works. So you re-explain yourself every single session. That's not a teammate. That's a try hard intern with amnesia.

I wanted something different. Over ~4 months at Kiavi, I built an operating model where AI works as an actual teammate for a small design team: a force multiplier that makes good designers better, not a stand-in that replaces them.

## The Reframe

What makes a "teammate" real instead of aspirational is doctrine: the team's intent, architecture, design system, and the agent's own personality, captured in version-controlled files the AI reads on every session. That's the line between AI-as-waste and AI-as-teammate.

Three beliefs hold the whole thing together:

1. **Doctrine over prompts.** Encode the team's intent and identity once, in files, instead of re-explaining yourself every session.
2. **The human keeps it honest.** AI makes *making* trivial. Doctrine keeps it in line. What's left is the work human brains are best at: reading output critically, pushing back on what's wrong, verifying what's true. That discipline is the point, not a downside.
3. **Opinionated doctrine is the key.** Generic doctrine gets generic results. The pattern only works when the doctrine takes positions. Specific design taste, encoded as constraints the AI has to honor, is what makes the work feel like *Kiavi* instead of like nothing in particular and everything else at the same time.

![The team agent answering a project-specific question by reading doctrine files](/images/doctrine-reads-doctrine.png)
*"Doctrine reads doctrine": a live prompt to the team agent ("what design decisions am I committed to on this project?") returns project-specific opinions, not generic LLM output. You can see it reach into VECTOR.md (why), CLAUDE.md (how), and ARCHITECTURE.md (where).*
<!-- aspect:16:9 placeholder:Split view, the prompt on the left, the agent's project-specific answer on the right, with the three doctrine files (VECTOR / CLAUDE / ARCHITECTURE) labeled as the source it read. -->

## The System: Kiavi World

Kiavi World is the team's home base: a dashboard, a reference library, and a prototype launcher, all in one place. It's also itself a prototype, built on the team's standard architecture: every component is a reference implementation of the design quality the team is aiming for.

It runs on the same four-layer architecture every prototype follows and that this portfolio is built on: design tokens, then pure business logic, then external comms, then render-only UI. The point isn't tidiness for its own sake. It's that prototypes built on the patterns engineering can ship translate to production with a lot less rework.

Four views, four jobs. Home is an editorial, magazine-cover landing, deliberately not a dense dashboard. Learn is an interactive onboarding guide to the lending domain that new designers (and increasingly PMs and all new hires) read on day one, which happens to be what the AI reads too. Research holds the personas, jobs-to-be-done, and decision records. Prototypes is the gallery, and the talk deck I shared with my team lives there as a live slide deck. The medium is the message.

![Kiavi World home view, editorial landing](/images/kiavi-world-home.png)
*Kiavi World's Home view. Modern editorial meets design tool: dark-first, typographically rich, generous whitespace. The deliberate opposite of utilitarian dashboard gray.*
<!-- aspect:16:9 placeholder:Kiavi World Home, magazine-cover editorial layout, Playfair Display headings, teal-and-mint palette, dark theme, curated featured links. -->

## The Proof Points

Four real artifacts, each derived from doctrine.

**Snapshot, the flagship.** A net-new origination-file admin tool for loan analysts and underwriters: a domain-unified, automation-first view that replaces a stack of siloed legacy tools. The core hypothesis is that in the happy path, ops never has to come here at all. When they do, the interface leads with what needs attention and shows how the decision was reached. No black boxes, no hunting. It went from a Magic Patterns export to a forked, four-layer, shadcn-and-OKLCH prototype across three rounds of design-system conformance, with the engineering decisions baked into the plan from the start. The prototype talks engineering's language because engineering helped author it.

![Snapshot origination-file dashboard](/images/snapshot-dashboard.png)
*Snapshot's dashboard. Task-first: passing states compress, failing states expand. The Action Center leads with what needs attention across Member, Project, and Property Asset, with one-click jumps to the rule and the evidence behind it.*
<!-- aspect:16:9 placeholder:Snapshot dashboard, file header, Action Center surfacing cross-domain failures, three domain health cards, cross-domain rule list with provenance panel expanded. -->

**The Operations Design System, the inversion.** Here's something cool: the new Operations design system was authored *from* Snapshot, not before it. The working, used prototype dictated what the system needed, instead of a research-only set of assumptions guessing at it. It went v1.0 to v1.3 as it earned each addition. The belief in practice: design systems should emerge from working prototypes that have been used, not from assumptions written down before anything shipped.

![Operations design system token reference with WCAG AA chips](/images/operations-ds-tokens.png)
*The Operations design system, extracted from Snapshot. Live pass/fail contrast chips on every token pair let a designer verify accessibility at the prototype layer, not after an audit.*
<!-- aspect:16:9 placeholder:Token reference page, OKLCH semantic tokens, color accessibility matrix, live WCAG AA pass/fail chips across every pair. -->

**The borrower-facing brand refresh.** Brand doctrine got grounded in the spring, then a two-day push where the team absorbed discovery work from Marketing partners, rewrote the strategic doctrine into a clean Brand / System / Products architecture, built a side-by-side comparison page to land the visual direction, got the greenlight, and shipped the refreshed brand the same day. From doctrine to a shipped brand version in two days against real Marketing inputs, not weeks. A standalone borrower app shell got rebuilt from the team's starter template in a single day on top of it.

![Side-by-side brand comparison page](/images/brand-comparison.png)
*The side-by-side comparison page that drove the brand landing. Old versus refreshed, in context, so the decision could be made by looking instead of arguing.*
<!-- aspect:16:9 placeholder:Brand comparison, current brand on the left, refreshed brand on the right, same components, so the visual delta is obvious at a glance. -->

There's also an experimental spike driving design tooling directly through an MCP server. That one's still workshop material, not a finished proof point yet.

## Results

Leading with the hard, verifiable one.

::: metrics Results
- Real, today | Accessibility verified across every token pair on the refreshed brand. Two genuine contrast bugs caught and fixed inside the workflow before any user saw them. | brass
- Real, today | Snapshot sketch to interactive in 2 days. Operations design system authored from the prototype in ~2 weeks. Brand refresh in 2 days. App shell in 1 day.
- Bet in flight | Prototype-to-production cycle time. Snapshot was handed to engineering in May, on patterns chosen so the handoff isn't a rebuild. | magenta
- Too early to claim | Designer ramp time. New hires read what the AI reads. One contributed to Snapshot about 30 days after joining. Another is starting a new project in the Product-Design repo. Promising, not proven.
:::

That accessibility number is the one I'm proud of: two real bugs, caught by the system, before a single user hit them. The cycle-time and ramp claims are honest bets, labeled that way on purpose. Converting a bet into a claimed result would misrepresent the work, and that honesty is part of what makes the rest credible. 

## Bringing the Org Along

A system nobody adopts is a hobby. So the work also had to travel.

I built it into a 45-minute talk for our annual internal Tech Summit, to a mixed room of product, engineering, and leadership. The deck ran as a live React prototype inside Kiavi World, not slides in a slideware tool, because the whole argument is that the medium is the message. Our Director of Product Management demoed her own brand-voice doctrine live, generic copy versus our voice depending on whether the doctrine was loaded, which made my cross-role point land: doctrine authorship isn't designer-only. Anyone with a stake in a surface can author what the AI reads.

I also said the quiet part out loud, on stage: we haven't been running fully on this yet. I've been doing the building and the prep first, teaching myself the tools, setting up the foundation, slowly bringing the team on. The next few months are about validating the bet. False maturity is more corrosive than admitting the bet isn't proven, so I called it out.

![The talk running as a live prototype inside Kiavi World](/images/talk-as-prototype.png)
*The talk deck itself, running as a live prototype inside Kiavi World. The thing demonstrating the pattern is built on the pattern.*
<!-- aspect:16:9 placeholder:Talk deck slide rendered inside Kiavi World's Prototypes view, showing it's a live React prototype rather than static slides. -->

## What's Still Open

I offered these to the room as invitations, not settled positions, and I'd keep them that way here. How should the path from prototype to production actually work, and who decides when something's ready to graduate? How much front-end should design own, now that designers can author production-grade component code and not just specs? And who owns which doctrine surfaces, so we find the gaps before they cost us? Good questions to walk into a conversation with, which is sort of the point of a portfolio anyway. Since I gave my talk, we've already made big strides when it comes to graduation and front-end ownership.

## What I'd Want You to Take From This

I didn't ship a feature. I shipped a way for a small design team to work with AI, and brought engineering, product, and leadership along instead of declaring victory from a deck. Whether you're a designer wondering where this goes, an engineer wondering what's about to land in your queue, a PM wondering where you fit, or a leader weighing whether to bet on it, I'd love to talk to you about it.
