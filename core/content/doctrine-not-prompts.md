How a small design team started shipping closer to engineering grade by treating AI as a teammate, not a tool.

*Lead Product Designer at Kiavi, roughly mid-2025 to mid-2026. An AI-as-teammate operating model, four proof-point prototypes, and the internal talk that brought the org along.*

## The Problem

AI usually shows up for designers as a tool. Point it at a task, it spits out a mockup or prototype faster. But generic AI plus a generic prompt gets you generic output. If it doesn't know your domain, your standards, or how your team actually works, you're explaining the same context in every session. That's not teammate material.

I wanted something better. Over ~4 months at Kiavi, I built an operating model where AI works as an actual teammate for a small design team: a force multiplier that makes good designers better, not a system that replaces them.

## The Method

What makes a "teammate" real instead of aspirational is doctrine: our team's intent, architecture, design system, and our agent's own personality, all captured in version-controlled files Claude reads every session. The AI executes what you actually intended, not a generic guess at it.

Three beliefs hold the whole thing together:

1. **Doctrine over prompts.** Encode the team's intent and identity once, in files, instead of re-explaining yourself every session.
2. **The human keeps it honest.** AI makes *making* trivial. Doctrine keeps it in line. What's left is the work human brains are best at: reading output critically, pushing back on what's wrong, verifying what's true. That discipline is the point, not a downside.
3. **Opinionated doctrine is the key.** Generic doctrine gets generic results. The pattern only works when the doctrine takes positions. Specific design taste, encoded as constraints the AI has to honor, is what makes the work feel like *Kiavi* instead of like nothing in particular and everything else at the same time.

![The team agent answering a project-specific question by reading doctrine files](/images/doctrine-reads-doctrine.png)
*"Doctrine reads doctrine": a live prompt to the team agent ("what design decisions am I committed to on this project?") returns project-specific opinions, not generic LLM output. You can see it reach into VECTOR.md (why), CLAUDE.md (how), and ARCHITECTURE.md (where).*

![The team agent introducing itself in a terminal session, describing the doctrine it reads first](/images/key-agent-terminal.png)
*The same agent in its native habitat. Key introducing itself in a live terminal session, reading the team's doctrine, architecture, and voice files before it writes a line. The view above is the polished answer. This is where it comes from.*

## The System: Kiavi World

Kiavi World is our team's home base: a dashboard, a reference library, and a prototype launcher, all in one place. It's also itself a prototype, built on our standard architecture: every component is a reference implementation of the design quality the team is aiming for.

It runs on the same four-layer architecture every prototype follows and that this portfolio is built on: design tokens, then pure business logic, then external comms, then render-only UI. The point isn't tidiness. Prototypes built on these patterns translate to production with a lot less rework.

Four views, four jobs. Home is an editorial, magazine-cover landing, deliberately not a dashboard of metrics and project tracking. Learn is an interactive onboarding guide to the lending domain that new designers (and increasingly PMs and all new hires) read on day one. Claude reads it too. Research holds the personas, jobs-to-be-done, and decision records. Prototypes is the gallery, and the talk deck I shared with my team lives there as a live slide deck. The medium is the message.

![Kiavi World home view, editorial landing](/images/kiavi-world-home.png)
*Kiavi World's Home view. Modern editorial meets design tool: dark-first, typographically rich, generous whitespace. The deliberate opposite of utilitarian dashboard gray.*

![Interactive Leverage Math calculator in Kiavi World's Learn view](/images/leverage-math.png)
*The Learn view's Leverage Math model. Borrowers and agents get LTC-versus-ARV-cap math wrong constantly, so this lets you move the inputs and watch which constraint binds. New designers learn the lending domain by playing with it, not reading a memo.*

## The Proof Points

Four real artifacts, each derived from our doctrine.

**Snapshot, the flagship.** A net-new origination-file admin tool for loan analysts and underwriters: a domain-unified, automation-first view that replaces a stack of siloed legacy tools. The core hypothesis is that in the happy path, Operations never has to come here at all. When they do, the interface leads with what needs attention and shows how the decision was reached. No black boxes, no hunting. It went from a Magic Patterns export to a forked, four-layer, shadcn-and-OKLCH based prototype, refined across three rounds of design-system conformance, with engineering decisions baked into the plan from the start. The prototype talks engineering's language because engineering helped author it.

![Snapshot origination-file dashboard](/images/snapshot-dashboard.png)
*Snapshot's dashboard. Task-first: passing states compress, failing states expand. The Action Center leads with what needs attention across Member, Project, and Property Asset, with one-click jumps to the rule and the evidence behind it.*

**The Operations Design System, the inversion.** Here's something cool: the new Operations design system was authored *from* Snapshot, not before it. The working, used prototype dictated what the system needed, instead of a research-only set of assumptions guessing at it. It went v1.0 to v1.3 as it earned each addition.

![Operations design system token reference with WCAG AA chips](/images/operations-ds-tokens.png)
*The Operations design system, extracted from Snapshot. Live pass/fail contrast chips on every token pair let a designer verify accessibility at the prototype layer, not after an audit.*

**The borrower-facing brand refresh.** Kiavi Brand doctrine got refreshed in the spring, while I was tweaking what we already had to work with our new doctrine. I made a two-day push to absorb discovery work from Marketing partners, rewrote the strategic doctrine into a clean Brand / System / Products architecture, built a side-by-side comparison page to land the visual direction, got the greenlight, and shipped the refreshed brand the same day. Real Marketing inputs, not weeks. A standalone borrower app shell to test the waters got rebuilt from the team's starter template in a single day on top of it.

![Side-by-side brand comparison page](/images/brand-comparison.png)
*The side-by-side comparison page that drove the brand landing. Old versus refreshed, in context, so the decision could be made by looking instead of arguing.*

There's also an experimental spike driving design tooling directly through [Paper](https://paper.design), a potential Figma replacement. It's still workshop material. I'm onboarding the team while we coexist with Figma work already in flight.

::: metrics Results

- Real, today | Accessibility verified across every token pair on the refreshed brand. Two genuine contrast bugs caught and fixed inside the workflow before any user saw them. | brass
- Real, today | Snapshot sketch to interactive in 2 days. Operations design system authored from the prototype in ~2 weeks. Brand refresh in 2 days. App shell in 1 day.
- Bet in flight | Prototype-to-production cycle time. Snapshot was handed to engineering in May, on patterns chosen so the handoff isn't a rebuild. | magenta
- Too early to claim | Designer ramp time. New hires read what the AI reads. One contributed to Snapshot inside their first 2 months. Another is starting a new project in the Product-Design repo. Promising, not proven.
:::

That accessibility number is the one I'm proud of: two real bugs, caught by the system, before a single user hit them. The cycle-time and ramp claims are honest bets, labeled that way on purpose. I'm not going to claim results yet and misrepresent the work. That honesty is part of what makes this way of working credible. 

## Bringing the Org Along

A system nobody adopts is a hobby. So the work had to travel.

I built it into a 45-minute talk for our annual internal Tech Summit, to a mixed room of product, engineering, and leadership. The deck ran as a live React prototype inside Kiavi World, not slides in a slideware tool, because, like I said, the medium is the message. Our Director of Product Management demoed her own brand-voice skill live, generic copy versus our voice depending on whether the doctrine was loaded, which made my cross-role point land: doctrine authorship isn't designer-only. Anyone with a stake in a surface can author what the AI reads.

I also said the quiet part out loud, on stage: we haven't been 100% on this yet. I've been doing the building and the prep first, teaching myself the tools, setting up the foundation, slowly bringing the team on. The next few months are about validating the bet.

![The talk running as a live prototype inside Kiavi World](/images/talk-as-prototype.png)
*The talk deck itself, running as a live prototype inside Kiavi World. The thing demonstrating the pattern is built on the pattern.*

## What's Still Open

I offered these to the room as invitations, not settled positions, and I'd keep them that way here. How should the path from prototype to production actually work, and who decides when something's ready to graduate? How much front-end should design own, now that designers can author production-grade component code and not just specs? And who owns which doctrine surfaces, so we find the gaps before they cost us? Good questions to walk into a conversation with. Since I gave my talk, we've already made big strides when it comes to graduation and front-end ownership.

## What to Take From This

I didn't ship a feature. I shipped a way for a small design team to work with AI, and brought engineering, product, and leadership along instead of declaring victory from a deck or a LinkedIn post. Whether you're a designer wondering where this goes next, an engineer wondering what's about to land in your queue, a PM wondering where you fit, or a leader weighing whether to bet on it, I'd love to talk to you about it.