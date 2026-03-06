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

## What Came Next

The sprint shipped a portfolio. But the project kept evolving.

**The OKLCH migration** converted the entire color system from hex/rgba to OKLCH, a perceptually uniform color space. Same hues, same feel, but now the math works: light and dark palettes are related by adjusting a single lightness channel. The theme toggle, the light mode, the future Figma sync all flow from that one architectural decision. Three files changed. Zero new dependencies.

**The framework migration** moved from Next.js to Vite + React Router. The portfolio never used server-side rendering, API routes, or any of Next.js's server features. Every page was client-rendered. The four-layer architecture I wanted (design tokens, core logic, services, UI) fought against Next.js's assumption that everything lives under src/app/. Vite gave us a simpler build, faster dev server, and directory structure that matches the mental model.

**The content migration** moved case study prose from TypeScript data structures to Markdown files. The original architecture was sound for structured data but made editing actual words painful: escaped quotes, paragraph breaks as \n\n, and TypeScript syntax around every sentence. Now the content is Markdown, a parser handles structure at the boundary, and the typed rendering layer hasn't changed. The right tool for the right job.

These aren't separate stories. They are all the same story: building something, learning what doesn't fit, and having the judgment to change it. The portfolio is a living project with an iterative roadmap, custom agent skills for maintenance and development, and the pipeline from tokens to code to deploy is validated and repeatable.

Think smarter and work smarter, not harder. Do not slop it up.
