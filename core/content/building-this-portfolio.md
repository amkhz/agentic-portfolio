AI is not magic. It does not replace thinking. You still have to articulate what you want, define what "good" looks like, and understand how the thing you are building actually works. Because you can build fast, you should think slow - slower than ever before. Every prompt should count. Every use should count. Review the code with your own eyes, understand what changed and why, and course-correct when it drifts. I am acutely aware of the environmental cost of these tools, which makes intentional, deliberate use a responsibility, not a nice-to-have - until we figure out how to make them sustainable for everyone.

With that in mind, here is how I designed a token system, built a component library, wrote the content, and shipped a production portfolio in a 48-hour sprint.

## The Setup

Before I opened Cursor or Claude, I had been collecting material for months. Case study metrics and slide decks organized in NotebookLM had been gathering for over a year. Font and color inspiration sites were in bookmarks but I forced myself to pick stuff and follow my gut with inspiration. I had a previous portfolio site with voice and tone I could riff on. A library of links, articles, and videos I had consumed about AI-augmented workflows. And most importantly, an idea I could articulate: a 48-hour portfolio sprint, tokens first, AI augmented, built as a beta test for a larger workflow presentation at work.

I also had some prior experience prompting and building with AI. Not deep engineering knowledge, but enough to understand what was being generated, ask good questions about it, and know when something was off.

Friday afternoon I sat down with Claude and started planning. My process is messy at first: I talk, ramble, type, refine, and iterate until the shape of the plan emerges. I gave it context about who I am, what I was building, what tools I had, and what I saw in my head. Over about two hours, I had a structured plan, a set of strong starting prompts, and a Cursor context file that would act as a guardrail for every agent interaction going forward.

Two hours sounds like a lot for "just planning," but I was re-reading plans, thinking through decisions, and pressure-testing ideas before writing a single line of code. Plans are where it all starts. If you are not planning, you are going to end up with slop.

![Claude conversation showing the iterative planning session with structured plan output](/images/meta-planning.png)
*The plan emerged from a messy conversation. Rambling in, structured plan out.*
<!-- aspect:4:3 placeholder:Screenshot of the planning and refining session in Claude, showing the structured plan taking shape from a rambling conversation -->

![The CURSOR_CONTEXT.md file used as an AI guardrail throughout the build](/images/meta-context-file.png)
*The context file gave every AI agent the same brief: design direction, constraints, and non-negotiables.*
<!-- aspect:16:9 placeholder:Screenshot of the Cursor context file that served as the AI guardrail for the entire project -->

## The Build

Friday evening at 8:41, I started scaffolding in Cursor. The first prompt set up Next.js with my token system, extended Tailwind with all the token values, configured three Google Fonts, and created a utility helper. Then I had the agent build the full layout shell: container, header, footer, and a test hero so I could verify the type system.

The agent built the entire app skeleton with placeholders in one go. I had planned to work page by page, but the all-at-once approach actually worked fine. I did some manual tweaks to prompts along the way as we worked through the first few things. By midnight, after another 30 minutes finishing the layout shell and getting the case study data structure ready, I had the site running locally with themed skeletons of every page. Day one was done.

![The token system setup showing design tokens mapped into the Tailwind configuration](/images/meta-tokens.png)
*Tokens first. Every color, font, spacing, and radius value defined before a single component was built.*
<!-- aspect:4:3 placeholder:Screenshot of the token system: design tokens defined in TypeScript and extended into the Tailwind theme -->

Saturday afternoon I hit a rhythm. Content refinement, visual tweaks, hybrid typing and prompting and committing. I got staging live on Vercel. Somewhere around 3pm I fell into a flow state and stopped documenting individual steps. I was just building: prompting specific changes, scanning the result, adjusting, committing. The key discipline was making sure we baked accessibility rules into everything as we went, not as an afterthought.

::: callout Example Prompt
Read CURSOR_CONTEXT.md and src/lib/tokens.ts. Build a ProjectCard component at src/components/content/ProjectCard.tsx.

Props: accepts a single case study object from the CaseStudy type. Structure: wrapped in a Next.js Link to /work/[slug]. Image placeholder area: 16:9 aspect ratio, bg-elevated, 1px border in border-subtle, rounded-lg. Title in Space Grotesk at xl, subtitle in Didact Gothic, tags as small pills in uppercase.

Hover: subtle lift (translateY -2px), border transitions to accent-primary with a faint brass glow shadow. The whole card should be the click target for a11y. Add a focus-visible ring in accent color.
:::

![The portfolio scaffold with token-driven styling applied across all page templates](/images/meta-scaffold-styling.png)
*The scaffold with styling applied. Token-driven colors and type across every template. This is where knowing a little about code helps with prompting*
<!-- aspect:16:9 placeholder:Screenshot showing the styled scaffold with token-driven colors, typography, and layout across multiple pages -->

## The Friction

Saturday around 1pm, as I was editing case study content, I realized something: my case study content lived in the same file as my front-end UI tokens. That was the agent's suggestion, and I had run with it without thinking about it too much. But working in the file made the problem obvious. Content and design tokens are different concerns, and coupling them would create maintenance headaches.

I used Claude to talk through the separation plan in plain English, refined it together, and started the migration. Along the way we hit some routing errors. I spent time reading documentation, talking to the agent, and we got the fixes in. About 45 minutes total. It was a good reminder that you can course-correct once you have set a plan, and that verifying your instincts with AI and some searching builds real confidence in the decisions.

![Claude conversation showing the content and token separation plan being discussed in plain English](/images/meta-content-separation.png)
*Talking through the architecture change in plain English before touching any code.*
<!-- aspect:16:9 placeholder:Screenshot of the conversation where the content/token separation was planned and refined -->

The other friction was knowing when to stop. During intense building, everything looks like it could be a little better. One more visual tweak. One more wording pass. The accessibility work helped ground me: running Lighthouse audits and checking focus states gave me concrete benchmarks instead of subjective "does this feel done?" It was clear what met the bar and what did not.

What AI got right by default through the token system was significant: contrast ratios, semantic heading hierarchy, and focus ring styles all came along for free because the tokens enforced them. What had to be explicitly enforced through human-in-the-loop review was subtler: reading order, link target clarity, and making sure nothing important was conveyed through color alone.

![Accessibility testing results showing Lighthouse audit scores and manual review checklist](/images/meta-a11y.png)
*The a11y pass: automated audits for the numbers, and me telling Cursor about my manual findings and updating our plan and progress.*
<!-- aspect:16:9 placeholder:Screenshot of me telling Cursor about my manual a11y findings and updating our plan and progress. -->

::: metrics The Results
- 48 hrs | Tokens to production | brass
- 5 pages | Shipped with full content | brass
- 3 | Complete case studies | magenta
- 100 | Mobile accessibility (Lighthouse) | brass
:::

By Saturday night at 10pm, I was tired. I was playing around with Codex 5.3 so I had it summarize everything built that day and plan for Sunday, which was mostly getting my domain configured and the site live.

Sunday morning I woke up with a dream, and in that dream I had the idea to add a resume page to the portfolio. What if the resume was just a Markdown file that generated both a downloadable PDF and the website page? I took the idea into Claude, worked out a plan, and had it built in about two hours. I found a service that renders Markdown to PDF, so all I needed was the website version. After a few iterations making sure the Markdown looked good in both formats, I called it for the 48-hour sprint.

I spent another hour double-checking everything we built against the plans we had written, then updated all the plans with progress and changes made along the way. Then I deployed the site live, noticed a few tweaks here and there (as you always do), and shipped it.

The big thought at the end: Think harder, work smarter. Do not slop it up.

## What Came Next

The sprint shipped a portfolio. But the project kept evolving.

## The Color Migration

The original token system used hex values. `#C8956A` for brass. `#C278A0` for magenta. `#0A0A0B` for the deep background. They worked. They felt familiar. But they only made sense if you already knew what they were supposed to look like.

The realization hit when I was planning to actually start the light mode palette and realized I should be using the most up to date standard and the one that gave me the most control. Hex could still be used in Figma later. With OKLCH, the dark background is `oklch(0.1452 0.0021 286.13)` and the light background is `oklch(0.9750 0.0040 80.72)`. Same chroma, same hue family, inverted lightness. The relationship is visible in the numbers.

The dual accent choices survived the migration just fine. Brass went from `#C8956A` to `oklch(0.7087 0.0845 60.96)`. Magenta went from `#C278A0` to `oklch(0.6634 0.1052 346.74)`. Now you can see the relationship between them: similar lightness (0.70 vs 0.66), similar chroma (0.08 vs 0.10), separated by hue (60 vs 346 degrees around the color wheel). The accents go beyond "two colors that look good together." They show colors that are structurally balanced.

Every conversion was verified visually and then checked for contrast compliance. The token system uses CSS custom properties consumed by Tailwind v4, so the migration touched the token definition layer and nothing else. Components reference `bg-accent-primary` or `text-text-secondary`, not raw color values. The abstraction held.

::: metrics The Migration
- 21 | Color tokens converted | brass
- 6 | Shadow values migrated | brass
- 3 | Files changed total | magenta
- 0 | New dependencies | brass
:::

The OG image generator still uses hex because Satori does not support OKLCH. That's fine. It is an output format, not a design decision. The source of truth remains OKLCH.

There really wasn't a single reason to do the conversion. It was the compounding effect. Light mode palette creation became systematic instead of subjective. Future Figma token sync has a path through the W3C DTCG spec, and plugins that support OKLCH natively. And when you open `design-system/tokens.css`, you can actually read the color system like a system, not a bag of magic numbers.

::: callout The L-Channel Principle
Dark mode backgrounds range from L 0.14 to L 0.25. Light mode backgrounds range from L 0.93 to L 0.98. Same chroma, same hue. To build a new theme, we adjust the L channel. Everything else follows.
:::

## The Framework Migration

The portfolio launched on Next.js. App Router, React 19, Turbopack, the whole stack. It was the default choice because it is the default choice for React projects in 2026. But within a few days of building, I started noticing the friction.

I don't need server components. I was not using API routes. I was not using SSR or SSG. I was not using middleware or server actions. Every page was fully client-rendered. The site deploys as static files. Next.js was a full Michelin kitchen and I was making toast.

The real opportunity came when I found the Investiture Doctrine, an opinionated architecture framework I had been wanting to learn. It enforces a four-layer separation: design tokens in their own layer, core logic with no DOM access, services for all external communication, and UI that only renders data. Each layer has clear boundaries and rules about what can import what. It matched exactly how I wanted to build with AI, so the framework migration became a chance to learn by doing. Vite gave us the fast dev server and simple build chain. Investiture gave us the architecture. The migration took a day. The clarity it created pays off every session.

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

::: metrics After The Migration
- 4 | Architecture layers, each a top-level directory | brass
- 0 | Server features used before or after | magenta
- 1 | Day to complete the migration | brass
:::

## The Agentic Workflow

This portfolio is not just built with AI. It is built by a team of specialized agents, each with a defined role, clear boundaries, and documented coordination patterns - all working within the Investiture framework.

There are four skills: **Writer**, **Builder**, **Dreamer**, and **Director**. Each one has a SKILL.md file that defines its role, its layer permissions, and its workflow. The Writer creates and refines case study content, operating exclusively in the core/ layer. The Builder implements features across all four layers, enforcing architecture with every change. The Dreamer takes rough ideas and produces structured plans, ADRs, and implementation specs. The Director tracks status, maintains the roadmap, coordinates work between skills, and keeps a running list of pitch-worthy items for deeper case studies.

The coordination flow is simple: Idea goes to the Dreamer. The Dreamer produces a plan. The plan goes to the Builder or the Writer. The Director tracks what shipped.

What makes this more than a prompting strategy is the layer permission model. The Writer cannot touch UI components. The Dreamer cannot write implementation code. The Director cannot modify the codebase. These constraints are not limitations. They prevent the kind of drift that happens when an AI agent has access to everything and tries to "help" by changing things outside its scope.

::: callout How The Skills Coordinate
Justin has an idea for a new feature. He talks to the Dreamer. The Dreamer researches feasibility, maps the idea to architecture layers, and writes a plan file in plans/. The Builder reads the plan and implements it in layer order: tokens first, then core logic, then services, then UI. The Writer drafts any content that the feature needs. The Director updates the roadmap and flags anything pitch-worthy.
:::

MCP servers are the other piece. The portfolio connects to external data through Model Context Protocol servers that give agents structured access to tools and information. The React Bits MCP server lets agents search and retrieve component code from the React Bits library. A Last.fm MCP server is planned to turn listening data into a first-class context source. The pattern is extensible: any data source that agents need to reference can become an MCP server, giving them structured context instead of requiring copy-paste.

The meta-insight is the one that matters most: the portfolio itself demonstrates the workflow it documents. The case study about AI-augmented design was written by the Writer skill and edited by me. The interactive effects were implemented by the Builder skill following a Dreamer plan, and I played around with some of the props and adjusted some code myself. The color migration and framework migration were each planned, executed, and documented through this same four-skill pipeline.

This is not about replacing designers or developers. It's about giving AI agents the same kind of structure that makes human teams effective: clear roles, defined scope, shared context, and documented decisions. The agents are crew members with skill sets, not magic text boxes that you throw prompts at and follow without thought.

The portfolio is the proof that it works. Every token, every component, every case study section went through a process with human judgment at the helm and specialized agents doing the heavy lifting within their lanes. The result is a codebase that runs clean, a design system that is internally consistent, and a body of work that shows the thinking, not just the output.
