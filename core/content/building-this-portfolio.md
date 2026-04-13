AI gives you the power to build anything. Design the world you want. But you need guidelines, frameworks, and your own willingness to think before you commit. You need to understand what you want and who is using what you build. Because without that you get slop. You get people thinking designers aren't needed anymore, and that is not the case. What these tools actually do is give designers superpowers. People with design minds can now move at the speed of their ideas. And we can design the world we want.

This is a living case study. It grows as the portfolio evolves. Each node is a transformation. A moment where the system changed shape.

<!-- node:the-sprint -->

## The Sprint

Before I opened Cursor or Claude, I had been collecting material for months. Case study metrics in NotebookLM. Font and color inspiration bookmarked but not decided. A previous portfolio with voice and tone I could riff on. And most importantly, an idea I could articulate: a 48-hour portfolio sprint, tokens first, AI augmented, built as a beta test for a larger workflow presentation at work.

Friday afternoon I sat down with Claude and started planning. My process is messy at first: I talk, ramble, type, refine, and iterate until the shape emerges. Over about two hours, I had a structured plan, a set of strong starting prompts, and a context file that would act as a guardrail for every agent interaction going forward. Two hours sounds like a lot for "just planning." But plans are where it all starts. If you're not planning, you're going to end up with slop.

![Claude conversation showing the iterative planning session with structured plan output](/images/meta-planning.png)
*The plan emerged from a messy conversation. Rambling in, structured plan out.*
<!-- aspect:4:3 placeholder:Screenshot of the planning and refining session in Claude, showing the structured plan taking shape from a rambling conversation -->

![The CURSOR_CONTEXT.md file used as an AI guardrail throughout the build](/images/meta-context-file.png)
*The context file gave every AI agent the same brief: design direction, constraints, and non-negotiables.*
<!-- aspect:16:9 placeholder:Screenshot of the Cursor context file that served as the AI guardrail for the entire project -->

Friday evening I started scaffolding. Token system, Tailwind configuration, three fonts, layout shell. By midnight I had themed skeletons of every page running locally. Saturday I hit a rhythm: content refinement, visual tweaks, hybrid typing and prompting and committing. Somewhere around 3pm I fell into a flow state and stopped documenting individual steps.

::: callout Example Prompt
Read CURSOR_CONTEXT.md and src/lib/tokens.ts. Build a ProjectCard component at src/components/content/ProjectCard.tsx.

Props: accepts a single case study object from the CaseStudy type. Structure: wrapped in a Next.js Link to /work/[slug]. Image placeholder area: 16:9 aspect ratio, bg-elevated, 1px border in border-subtle, rounded-lg. Title in Space Grotesk at xl, subtitle in Didact Gothic, tags as small pills in uppercase.

Hover: subtle lift (translateY -2px), border transitions to accent-primary with a faint brass glow shadow. The whole card should be the click target for a11y. Add a focus-visible ring in accent color.
:::

![The portfolio scaffold with token-driven styling applied across all page templates](/images/meta-scaffold-styling.png)
*Token-driven colors and type across every template. Knowing a little about code helps with prompting.*
<!-- aspect:16:9 placeholder:Screenshot showing the styled scaffold with token-driven colors, typography, and layout across multiple pages -->

The first real friction: Saturday around 1pm, I realized my case study content lived in the same file as my UI tokens. Content and design tokens are different concerns, and coupling them would create maintenance headaches. I talked through the separation with Claude, refined the plan, and migrated in about 45 minutes. Course-correcting early is cheap. That's the whole point of thinking slow.

![Claude conversation showing the content and token separation plan](/images/meta-content-separation.png)
*Talking through the architecture change in plain English before touching any code.*
<!-- aspect:16:9 placeholder:Screenshot of the conversation where the content/token separation was planned and refined -->

The accessibility work grounded everything. What the token system gave us for free was significant: contrast ratios, semantic heading hierarchy, focus ring styles. What had to be enforced through human review was subtler: reading order, link target clarity, making sure nothing important was conveyed through color alone. Automated audits give you numbers. The real work is in the judgment calls.

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

The original token system used hex values. `#C8956A` for brass. `#C278A0` for magenta. `#0A0A0B` for the deep background. They worked. But they only made sense if you already knew what they were supposed to look like.

The shift to OKLCH happened when I started planning the light mode palette. With OKLCH, the dark background is `oklch(0.1452 0.0021 286.13)` and the light background is `oklch(0.9350 0.0280 62)`. Same chroma, same hue family, inverted lightness. The relationship is visible in the numbers. Brass went from `#C8956A` to `oklch(0.7087 0.0845 60.96)`. Magenta went from `#C278A0` to `oklch(0.6634 0.1052 346.74)`. Now you can see the structural balance: similar lightness (0.70 vs 0.66), similar chroma (0.08 vs 0.10), separated by hue (60 vs 346 degrees).

::: callout The L-Channel Principle
Dark mode backgrounds range from L 0.14 to L 0.25. Light mode backgrounds range from L 0.93 to L 0.98. Same chroma, same hue. To build a new theme, adjust the L channel. Everything else follows.
:::

The token system uses CSS custom properties consumed by Tailwind v4, so the migration touched the token definition layer and nothing else. Components reference `bg-accent-primary` or `text-text-secondary`, not raw color values. The abstraction held.

::: metrics The Migration
- 21 | Color tokens converted | brass
- 6 | Shadow values migrated | brass
- 3 | Files changed total | magenta
- 0 | New dependencies | brass
:::

Then came the textures. The dark mode surface needed to feel like infrastructure under glass. Alive, humming. The solution is pure CSS: repeating linear gradients at micro-scale, brass and magenta traces at near-invisible opacity, layered to create a circuit mesh pattern. Light mode is different material entirely. Translucent linen draped over aged wood, warp and weft threads over grain. Both textures are zero-asset, zero-dependency. They live in the token layer as CSS custom properties.

The design context formalization was the final piece. The aesthetic direction ("Blade Runner + William Gibson meets Finn Juhl") was always in the CLAUDE.md. But the wabi-sabi sensibility, the anti-references (no template portfolios, no dev-bro dark mode, no agency scroll-jacking), and the five design principles were only in my head until they were written down. Now every design skill reads from the same brief.

::: peek the-structure
The material layer could evolve freely because the architecture kept it isolated.
:::

<!-- node:the-structure -->

## The Structure

The portfolio launched on Next.js. App Router, React 19, Turbopack, the whole stack. It was the default choice because it is the default choice for React projects. But within a few days of building, the friction became obvious.

No server components used. No API routes. No SSR or SSG. No middleware or server actions. Every page was fully client-rendered. The site deploys as static files. Next.js was a full Michelin kitchen and I was making toast.

The real opportunity came when I found the Investiture Doctrine, an opinionated architecture framework for agent-built projects. It enforces a four-layer separation: design tokens in their own layer, core logic with no DOM access, services for all external communication, and UI that only renders data. Each layer has clear boundaries and rules about what can import what. It matched exactly how I wanted to build with AI.

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

Vite gave us the fast dev server and simple build chain. Investiture gave us the architecture. The migration took a day. The clarity it created pays off every session.

::: metrics After The Migration
- 4 | Architecture layers, each a top-level directory | brass
- 0 | Server features used before or after | magenta
- 1 | Day to complete the migration | brass
:::

The four layers are not just organization. They are a contract. The design-system layer owns all visual decisions. Core owns all pure logic. Services own all external communication. UI renders data and nothing else. When agents work within these constraints, they cannot accidentally couple concerns. The architecture enforces craft.

::: peek the-process
The four-layer architecture became the foundation for something bigger: a crew of specialized agents.
:::

<!-- node:the-process -->

## The Process

This portfolio is built by a crew. Not just me prompting an AI. A crew of specialized agents, each with a defined role and clear boundaries, all working within the same four-layer architecture.

The crew started with the Builder. It was the first skill I wrote, the engineering expert that turned plans into working code across all four layers. The Builder enforced token discipline, held the line on accessibility, and shipped every major feature from the Vite migration through the constellation navigation you are reading right now. For weeks, it was the crew's backbone.

Then the ecosystem grew up around it. CLAUDE.md and ARCHITECTURE.md absorbed the execution context the Builder used to carry alone. invest-crew took over pre-flight decomposition. A review pipeline caught layer violations and token drift automatically. One by one, the Builder's responsibilities migrated into the doctrine and tooling until the generalist role was no longer necessary. The Builder was retired, not replaced. Its knowledge lives on in every quality gate and architecture rule the system enforces today.

The crew that remains is leaner and more focused. The Writer creates and refines content, operating exclusively in the core layer. The Dreamer takes rough ideas and produces structured plans. The Director tracks what shipped and what's next. Each one has a skill file that defines what it can and cannot touch.

That last part is what makes this more than a prompting strategy. The Writer cannot touch UI components. The Dreamer cannot write implementation code. These constraints are creative boundaries that prevent the kind of drift that happens when an AI agent has access to everything and tries to "help" by changing things outside its scope.

::: callout How The Crew Coordinates
I have an idea. I talk to the Dreamer. The Dreamer researches feasibility, maps it to architecture layers, and writes a plan. Implementation follows in layer order: tokens first, then core logic, then services, then UI. The Writer drafts any content the feature needs. The Director updates the roadmap and flags anything pitch-worthy. The doctrine and review pipeline enforce quality throughout.
:::

Beyond the crew, the Investiture framework brings its own pipeline: doctrine audits for drift, architecture checks against its own rules, decision records, design briefs from research. Each tool reads from the same doctrine files and respects the same layer boundaries.

The meta-insight is the one that matters most: this portfolio demonstrates the workflow it documents. The case study you are reading was written by the Writer skill and edited by me. The interactive constellation you are navigating was planned by the Dreamer and built through the same pipeline that now runs without a dedicated Builder. The color migration, the framework migration, all of it went through this process. The fact that the system matured enough to retire its first crew member is itself proof the approach works.

This is not about replacing designers or developers. It is about giving AI agents the same structure that makes human teams effective: clear roles, defined scope, shared context, and documented decisions. Crew members with skill sets, not magic text boxes you throw prompts at and hope for the best. And when the structure is strong enough, roles can evolve.

::: peek the-craft
Structure enables quality. But quality has to be actively pursued.
:::
