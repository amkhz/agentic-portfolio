AI gives you the power to build anything. The hard part was never building. It's knowing what to build, why it matters, and who it's for. Left to its defaults, the machine produces slop: fluent, generic, the average of everything. Worse, it will accelerate you in the wrong direction just as fast as the right one. That's why product designers matter even more now, not less. The job is judgment: holding a point of view, evaluating options, naming the real problems, helping a team see what's worth building before everyone races to build the wrong thing. This portfolio is my running experiment in exactly that. Move at the speed of a crew of agents, and keep the intent, and the judgment behind it, unmistakably mine.

This is a living case study. It grows as the portfolio evolves. Each node is a transformation. A moment where the system changed shape.

<!-- node:the-sprint -->

## The Sprint

Before I opened Cursor or Claude, I had been collecting material for months. Case study metrics in NotebookLM. Font and color inspiration bookmarked but not decided. An existing portfolio with voice and tone I could riff on. And the big one, an idea I could articulate: a 48-hour portfolio sprint, tokens first, AI augmented, built as a beta test for a larger workflow presentation at work.

Friday afternoon I sat down with Claude and started planning. My process is messy: I dictate, ramble, type, refine, and iterate until the shape is something I'm happy with. Over about two hours, I had a structured plan, a set of strong starting prompts, and a context file guardrail for every agent assisted prompt going forward. Two hours sounds like a lot for "just planning." But skip it and you end up with slop you'll hate to clean up later.

![Claude conversation showing the iterative planning session with structured plan output](/images/meta-planning.png)
*The plan emerged from a messy conversation. Rambling in, structured plan out.*
<!-- aspect:4:3 placeholder:Screenshot of the planning and refining session in Claude, showing the structured plan taking shape from a rambling conversation -->

![The CURSOR_CONTEXT.md file used as an AI guardrail throughout the build](/images/meta-context-file.png)
*The context file gave every AI agent the same brief: design direction, constraints, and non-negotiables.*
<!-- aspect:16:9 placeholder:Screenshot of the Cursor context file that served as the AI guardrail for the entire project -->

Friday evening I started scaffolding. Token system, Tailwind configuration, three fonts, layout shell. By midnight I had themed skeletons of every page running locally. Saturday I hit a rhythm: content refinement, visual tweaks, hybrid typing, prompting, and committing. Somewhere around 3pm I fell into a flow state and stopped documenting individual steps.

::: callout Example Prompt
Read CURSOR_CONTEXT.md and src/lib/tokens.ts. Build a ProjectCard component at src/components/content/ProjectCard.tsx.

Props: accepts a single case study object from the CaseStudy type. Structure: wrapped in a Next.js Link to /work/[slug]. Image placeholder area: 16:9 aspect ratio, bg-elevated, 1px border in border-subtle, rounded-lg. Title in Space Grotesk at xl, subtitle in Didact Gothic, tags as small pills in uppercase.

Hover: subtle lift (translateY -2px), border transitions to accent-primary with a faint brass glow shadow. The whole card should be the click target for a11y. Add a focus-visible ring in accent color.
:::

![The portfolio scaffold with token-driven styling applied across all page templates](/images/meta-scaffold-styling.png)
*Token-driven colors and type across every template. Knowing a little about code helps with prompting.*
<!-- aspect:16:9 placeholder:Screenshot showing the styled scaffold with token-driven colors, typography, and layout across multiple pages -->

The first real point of friction: Saturday afternoon, I realized my case study content lived in the same file as my UI tokens. Content and design tokens are different concerns, and coupling them would create maintenance headaches. I talked through the separation with Claude, refined the plan, and migrated in about 45 minutes. Course-correcting early on is cheap. That's the whole point of thinking slow.

![Claude conversation showing the content and token separation plan](/images/meta-content-separation.png)
*Talking through the architecture change in plain English before touching any code.*
<!-- aspect:16:9 placeholder:Screenshot of the conversation where the content/token separation was planned and refined -->

What the token system gave us for free was impressive: contrast ratios, semantic heading hierarchy, focus ring styles. What had to be enforced through human review was subtler: reading order, link target clarity, making sure nothing important was expressed through color alone.

![Accessibility testing results showing Lighthouse audit scores](/images/meta-a11y.png)
*The a11y pass: automated audits for the numbers, manual review for the nuance.*
<!-- aspect:16:9 placeholder:Screenshot of Lighthouse audit results and manual a11y review notes -->

::: metrics The Sprint Results
- 48 hrs | Tokens to production | brass
- 5 pages | Shipped with full content | brass
- 3 | Complete case studies | magenta
- 100 | Mobile accessibility (Lighthouse) | brass
:::

Sunday morning I added a resume page, deployed, double-checked against the plans, and shipped. The sprint was done. But the project was just beginning.

::: peek the-material
The token system that made this sprint possible would soon undergo its own transformation.
:::

::: peek the-structure
Within days, the framework that launched this portfolio would be replaced entirely.
:::

<!-- node:the-material -->

## The Material

The original token system used hex values. `#C8956A` for brass. `#C278A0` for magenta. `#0A0A0B` for the deep background. They did the job.

The shift to OKLCH happened when I started planning the light mode palette. With OKLCH, the dark background is `oklch(0.1452 0.0021 286.13)` and the light background is `oklch(0.9350 0.0280 62)`. Same chroma, same hue family, inverted lightness. The relationship is visible in the numbers. Brass went from `#C8956A` to `oklch(0.7087 0.0845 60.96)`. Magenta went from `#C278A0` to `oklch(0.6634 0.1052 346.74)`. Now you can see the structural balance: similar lightness (0.70 vs 0.66), similar chroma (0.08 vs 0.10), separated by hue (60 vs 346 degrees).

::: callout The L-Channel Principle
Dark mode backgrounds range from L 0.14 to L 0.25. Light mode backgrounds range from L 0.93 to L 0.98. Same chroma, same hue. To build a new theme, adjust the L channel. Everything else follows.
:::

The token system uses CSS custom properties consumed by Tailwind v4, so the migration touched the token definition layer and nothing else. Components reference `bg-accent-primary` or `text-text-secondary`, not raw color values.

::: metrics The Migration
- 21 | Color tokens converted | brass
- 6 | Shadow values migrated | brass
- 3 | Files changed total | magenta
- 0 | New dependencies | brass
:::

Then came texture. The dark mode surface needed to feel like infrastructure under glass. Alive, humming. The solution was pure CSS: repeating linear gradients at micro-scale, brass and magenta traces at near-invisible opacity, layered to create a circuit mesh pattern. Light mode was a different material entirely. Translucent linen draped over aged wood, warp and weft threads over grain. Both textures are zero-asset, zero-dependency. They lived in the token layer as CSS custom properties.

The design context formalization was the last thing. The aesthetic direction ("Blade Runner + William Gibson meets Finn Juhl") was always in the CLAUDE.md. But the wabi-sabi sensibility, the anti-references (no template portfolios, no dev-bro dark mode, no agency scroll-jacking), and the five design principles were only in my head until they were written down. Now every design skill reads from the same brief.

::: peek the-structure
The material layer could evolve freely because the architecture kept it isolated.
:::

::: peek the-recalibration
This palette worked. It just didn't satisfy what I wanted to convey.
:::

<!-- node:the-structure -->

## The Structure

The portfolio launched on Next.js. App Router, React 19, Turbopack, the whole shebang. It was a default choice because it is the default choice for React projects and I asked Claude for a React project. But within a few days of building, I knew it was the wrong choice.

I didn't use server side components. No API routes. No SSR or SSG. No middleware or server actions. Every page was fully client-rendered. The site deploys as static files. Next.js was a 3 star Michelin kitchen and I was making toast.

The real aha moment came when I found the Investiture Doctrine, an opinionated architecture framework for agent-built projects. It enforces a four-layer separation: design tokens in their own layer, core logic with no DOM access, services for all external communication, and UI that only renders data. Each layer has clear boundaries and rules about what can import what. It matched exactly how I wanted to build with AI.

::: comparison The Migration
**Before**
![Next.js project structure with everything under src/app](/images/meta-nextjs-structure.png)
placeholder: Next.js App Router structure showing pages, layouts, and components nested under src/app/
label: Next.js App Router
description: Everything lived under src/app/. File-based routing conventions, server/client boundary markers, build steps for features that were never used.

**After**
![Vite project structure with four-layer separation](/images/meta-vite-structure.png)
placeholder: Vite project structure showing design-system/, core/, services/, and src/ as top-level directories
label: Vite + React Router
description: Four top-level directories. Each layer has a clear boundary. Path aliases (@core/*, @services/*, @design-system/*) make the architecture visible in every import.
:::

Vite gave us the fast dev server and simple build chain. Investiture gave us the architecture. The migration took a day. The clarity it created pays off every time I create something.

::: metrics After The Migration
- 4 | Architecture layers, each a top-level directory | brass
- 0 | Server features used before or after | magenta
- 1 | Day to complete the migration | brass
:::

The four layers aren't just organization. They're a contract. The design-system layer owns all visual decisions. Core owns all pure logic. Services own all external communication. UI renders data and nothing else. When my agents work within these constraints, they can't accidentally couple concerns or write code in the wrong place. The architecture enforces craft.

::: peek the-process
The four-layer architecture became the foundation for something bigger: a crew of specialized agents.
:::

<!-- node:the-process -->

## The Process

This portfolio is built by a crew. Not just me prompting an AI all willy nilly. A crew of specialized agents, each with a defined role and clear boundaries, all working within the same four-layer architecture.

The crew is lean and focused. The Writer creates and refines content, operating exclusively in the core layer. The Dreamer takes rough ideas from my ramblings and produces structured plans. The Director tracks what shipped and what's next. Each one has a skill file that defines what it can and can't touch.

The Writer can't touch UI components. The Dreamer can't write implementation code. The constraints are creative boundaries that prevent the kind of drift that happens when an AI agent has access to everything and tries to "help" by changing things outside its scope.

::: callout How The Crew Coordinates
I have an idea. I talk to the Dreamer. The Dreamer researches feasibility, maps it to architecture layers, and writes a plan. Implementation follows in layer order: tokens first, then core logic, then services, then UI. The Writer drafts any content the feature needs. The Director updates the roadmap and flags anything pitch-worthy. The doctrine and review pipeline enforce quality throughout.
:::

Beyond the crew, the Investiture framework brings its own pipeline: doctrine audits for drift, architecture checks against its own rules, decision records, design briefs from research. Each tool reads from the same doctrine files and respects the same layer boundaries.

This is where it gets meta: this portfolio demonstrates the workflow it documents. The case study you're reading was written by the Writer skill and edited by me. The interactive constellation you're navigating was planned by the Dreamer and built through the same pipeline that now runs without a dedicated Builder. The color migration, the framework migration, all of it went through this process.

This isn't about replacing designers or developers. It's about giving AI agents the same structure that makes human teams effective: clear roles, defined scope, shared context, and documented decisions. Crew members with skill sets, not magic text boxes you throw prompts at and cross your fingers. When the structure is strong enough, roles can evolve.

::: peek the-craft
Structure enables quality. But quality has to be actively pursued.
:::

::: peek the-evolution
The crew that built itself out of a job.
:::

<!-- node:the-evolution -->

## The Evolution

The crew didn't start as a crew. It started as one skill file and a bet.

When I kicked off this portfolio, I wrote a single agent definition: the Builder. It was the engineering expert, the one that turned plans into working code across all four architecture layers. Token discipline, semantic HTML, accessibility scores, lint gates. The Builder held the line on all of it. From the Vite migration through the OKLCH color system, the textures, the case studies, the constellation navigation you're reading right now. Builder's digital hands were on every feature that shipped, he was a real one.

And for a while, that was enough. One agent with a strong context file and clear constraints. But with my growing ambition, so grew the complexity. Content needed its own voice. Planning needed space to breathe before code started flying. Status tracking needed someone paying attention to the bigger picture. It's easy to get lost in the sauce. So a crew formed around the Builder: the Writer for content, the Dreamer for planning, the Director for coordination. Each with a skill file defining what they could and couldn't touch.

::: callout The Builder's Highlight Reel
First skill in the crew. Shipped before Director, Dreamer, or Writer existed. Enforced the Vite migration across every component. Built the three-font typography system. Implemented the NowPlaying Last.fm integration end-to-end. Maintained Lighthouse accessibility scores above 96 throughout. Never once silently broke the architecture.
:::

Then something interesting happened. An ecosystem grew up around the Builder. CLAUDE.md and ARCHITECTURE.md absorbed the execution context it used to carry alone. invest-crew took over pre-flight decomposition. A review pipeline caught layer violations and token drift automatically. The Impeccable design skills handled code standards. One by one, the Builder's responsibilities migrated into the doctrine and tooling until the generalist role wasn't necessary anymore.

So we retired it. Not replaced. Retired. Threw it a party and everything. The Builder's knowledge lives on in every quality gate, every architecture rule, every token convention the system enforces today. You build scaffolding so the building can stand on its own.

This is what felt worth writing about. Most conversations I was reading about AI collaboration at the time focused on the prompting, the outputs, the speed. But the real interesting stuff is in the organizational design. How do you structure agents so they complement each other? How do you know when a role has been absorbed by the system it helped create? How do you let a crew evolve without losing what made it work in the first place? How do you make sure your personal intent stays in the loop?

The answer, at least for this project: you write it down. Doctrine files, skill definitions, architecture rules. The same things that make human teams effective. Clear roles, defined scope, shared context, documented decisions.

The honest version is simpler than it sounds. The Builder became redundant as I got more fluent at agentic building. The more I learned about directing a crew, the less I needed a generalist holding it all together, and the more its job belonged to the doctrine and the tooling. That's not a failure. That's learning.

The crew today looks different once more. There's no standalone Builder, but there is Tyrell, the base persona who builds directly, carrying the doctrine the old Builder used to hold in its head. Around it, Roy reviews every build against the architecture, Joi keeps my voice honest in the content, and Wallace turns a raw image model into a directed instrument for the portfolio's imagery. The crew keeps changing shape as I learn. That's the point. The portfolio keeps shipping, the constellation keeps growing, and the system does exactly what it was built to do: evolve.

::: peek the-process
The crew structure and how it coordinates day to day.
:::

::: peek the-structure
The four-layer architecture that made role separation possible.
:::

::: peek the-recalibration
The crew was ready. The next thing to change was the worldview itself.
:::

<!-- node:the-recalibration -->

## The Recalibration

The first version of this portfolio looked good. It wasn't good enough for what I wanted to convey.

I had a clean token system, a tidy dark mode, and a brass and magenta palette that worked on paper. But when I stepped back and thought critically about how it felt, it read like a thoughtful template. Competent, generic, the exact slop I keep warning about with better spacing and some nice colors. So, I stopped and asked the harder question. Not is this nice, but what is this? Is it really what I intended to make?

The answer became something I could name, something I'd always had in my head. The Conservatory: an inhabited biophilic future, technology and nature in long settled commune, wabi-sabi and Danish mid-century craft, warm and lived-in instead of chrome and cold. Once I was able to articulate that, every decision had something to answer to.

The palette inverted. Green was introduced and quickly evolved from a loud accent to become a living primary, expressed as atmosphere and material: foliage, glow from within, the texture of a tended place. Aged brass took over interaction, the technology and the light. The old circuit-trace texture, the one meant to feel like infrastructure under glass, was yanked out entirely. Grain and warm light carry the atmosphere now.

::: callout The shift in one line
Version one asked is this clean. Version two asks does this read like a person with a worldview and the craft to execute it. That's what matters to the people I want to reach.
:::

This is the chapter where the basic idea grew up. Same crew, same architecture, pointed at a much bigger target: a portfolio that is itself the argument.

::: peek the-field-notebook
A worldview needs a grammar to compose in.
:::

<!-- node:the-field-notebook -->

## The Field Notebook

A worldview is only as good as your ability to express it. So the design system got its own language.

Enter the Field Notebook. Instead of pouring every page into the same centered column and the same three-card grid, each surface is composed like a spread in a researcher's notebook. Registration marks, dossier framing, a table of contents with better hierarchy, metadata living in the margins. The grid stays visible enough that when it breaks, the break reads as a decision and not an accident.

It's built as real primitives, not one-off styling. A registration mark, a dossier frame, a table-of-contents list, a drafted-object mark for each project. The work index evolved from a simple card grid and became a proper index. Case studies became editorial spreads.

::: callout Why a system, not a layout
A single nice page is a screenshot. A grammar is something the crew can keep composing in, on every future surface, without losing the thread. Rather than decorating a page we're building a place.
:::

::: peek the-lab
The same way of working, pointed at something I am personally obsessed with.
:::

<!-- node:the-lab -->

## The Lab

Somewhere in the middle of all this, the workflow outgrew the portfolio. I had an itch to point all of it at something I'm genuinely obsessed with, instead of the portfolio itself.

Enter Perihelion. A reader's notebook for frontier science: warp drives, consciousness, the physics at the edge of what we understand. I'm not a physicist. I'm a designer who finds this stuff endlessly fascinating, and I wanted to use everything I had been building to actually learn it beyond simply reading research papers, articles, and books. And, maybe I could pull a few other curious people in with me.

The lab runs on the same bones as this portfolio. Same four-layer architecture, same agentic crew, same insistence that the design serve the content instead of showing off. But it is a sibling, not a copy. Where the portfolio is a specific evening, the lab is the morning after. Quieter, more contemplative, built to hold ideas that deserve room to breathe.

The acceptance criteria: Does this open the door for someone who has never thought seriously about this stuff, or does it leave them out? Every choice considers that criteria. No background needed. Just curiosity.

It's the clearest proof I have that this way of working travels. The skills, the doctrine, the crew, none of it is specific to a portfolio. Point it at something you love and it holds.

::: cta The way of working, elsewhere
href: https://labs.justinh.design
action: See the lab
Perihelion points the same crew and doctrine at frontier science.
:::
