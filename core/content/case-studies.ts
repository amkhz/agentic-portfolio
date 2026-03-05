// ============================================
// CASE STUDY CONTENT — Flat typed sections
// Keyed by slug, rendered by the case study template
// Content lives here; design system lives in tokens.ts
// ============================================

// --- Section Types ---

type TextSection = {
  type: 'text';
  heading?: string;        // optional section heading (renders as SectionHeading)
  body: string;            // prose content — paragraphs separated by \n\n
};

type ImageSection = {
  type: 'image';
  src: string;
  alt: string;
  placeholder: string;     // description shown in placeholder div
  caption?: string;
  aspect?: '16:9' | '4:3' | 'auto';
};

type MetricsSection = {
  type: 'metrics';
  heading?: string;
  items: { value: string; label: string; accent?: 'brass' | 'magenta' }[];
};

type ComparisonSection = {
  type: 'comparison';
  heading?: string;
  before: {
    label: string;
    image: { src: string; alt: string; placeholder: string };
    description?: string;
  };
  after: {
    label: string;
    image: { src: string; alt: string; placeholder: string };
    description?: string;
  };
};

type QuoteSection = {
  type: 'quote';
  text: string;
  attribution: string;
  role?: string;
};

type CalloutSection = {
  type: 'callout';
  label?: string;
  body: string;
};

export type CaseStudySection =
  | TextSection
  | ImageSection
  | MetricsSection
  | ComparisonSection
  | QuoteSection
  | CalloutSection;

// --- Content by slug ---

export const caseStudyContent: Record<string, CaseStudySection[]> = {

  // =============================================
  // 1. AI LEADERSHIP & ORGANIZATIONAL VELOCITY
  // =============================================
  'ai-leadership': [
    {
      type: 'text',
      body: 'I led the internal push to standardize AI tools across a design and product organization skeptical of generative AI: shaping the process, running the workshops, and defining the strategic framework for how design operates when the interface thinks.',
    },
    {
      type: 'text',
      heading: 'The Dual Challenge',
      body: 'The company faced two problems at once. Tactically, leadership recognized the potential of AI for internal efficiency, but there was no standardized process for using generative AI to prototype and ship faster without compromising quality or creating more design debt. Strategically, there was no shared understanding of how design\'s role changes when AI drives the interaction, not the user.\n\nI framed this as one initiative: adoption requires both hands-on enablement and alignment on principles like trust, transparency, and human oversight.',
    },
    {
      type: 'image',
      src: '/images/diagram.png',
      alt: 'Diagram showing the dual challenge: tactical tooling gap and strategic design control shift',
      placeholder: 'Diagram: tactical (tooling gap) on one side, strategic (design control shifting) on the other, showing how both were addressed as one initiative',
      caption: 'Two problems, one initiative: closing the tactical tooling gap while redefining design\'s strategic role in AI-driven products.',
      aspect: '16:9',
    },
    {
      type: 'text',
      heading: 'Building the Playbook',
      body: 'I shared a repeatable 6-step workflow: Define, Scope, Plan, Build, Test, Iterate, that made AI prototyping accessible to any curious mind with no coding background. The training positioned the LLM as an "Expert Developer" the creator directs, emphasizing that success depends on one\'s judgment, not the tool\'s output.',
    },
    {
      type: 'image',
      src: '/images/process.png',
      alt: 'The 6-step AI prototyping workflow: Define, Scope, Plan, Build, Test, Iterate',
      placeholder: 'Process diagram: Define -> Scope -> Plan -> Build -> Test -> Iterate. The repeatable AI prototyping workflow taught in workshops',
      caption: 'The 6-step workflow taught in every workshop. No coding background required.',
      aspect: '16:9',
    },
    {
      type: 'image',
      src: '/images/anyone-can-do-it.png',
      alt: 'Workshop title slide: Building with AI Tools — Anyone Can Do It',
      placeholder: '"Building with AI Tools — Anyone Can Do It," title slide from the AI workshop training deck',
      caption: 'A slide from the workshop series. The goal was to demystify AI tooling for designers and PMs by geting your hands dirty.',
      aspect: '16:9',
    },
    {
      type: 'text',
      heading: 'Demonstrating Output',
      body: 'The workshops produced tangible prototypes, it wasn\'t just me talking at people for an hour. Attendees built working apps (habit trackers, Kanban tools, snake games) using Gemini and Subframe, proving that AI-assisted prototyping could compress weeks of concept work into hours. This directly contributed to a later winning AI Hackathon project using Replit.',
    },
    {
      type: 'image',
      src: '/images/outcomes.png',
      alt: 'Grid of prototype screenshots built during AI workshops: habit tracker, Pomodoro timer with Kanban',
      placeholder: 'Composed grid: 2-3 prototype screenshots from workshops. Daily Habit Tracker, Pomodoro Timer with Kanban, internal dashboard',
      caption: 'Protoyping excercises built by workshop attendees in under an hour, from habit trackers to Kanban tools.',
      aspect: '16:9',
    },
    {
      type: 'text',
      heading: 'Strategic Vision: The Big Flip',
      body: 'Beyond tooling, I shared a strategic critique of the industry\'s approach to AI product design. The core insight: most enterprise AI products are "draping a modern brain in an 80s UI," wrapping powerful models in menus and buttons designed for a pre-AI era. This Big Flip is the shift from designers stressing over pixels and components in interfaces to AI-driven interactions where the designer\'s role becomes defining guardrails and contextual patterns, not layouts.\n\nThis framework directly shaped product requirements for our AI lending tools, embedding principles like decision versioning, escape hatches, and transparent confidence scoring.',
    },
    {
      type: 'image',
      src: '/images/big-flip.png',
      alt: 'The Big Flip diagram showing the reduction of designer control as AI agency increases',
      placeholder: 'Conceptual diagram: "The Big Flip." Designer control decreasing as AI agency increases, with the new role being guardrail definition',
      caption: 'The Big Flip: as AI agency increases, the designer\'s role shifts from pixel-level control to guardrail definition.',
      aspect: '16:9',
    },
    {
      type: 'metrics',
      heading: 'Results',
      items: [
        { value: '100%', label: 'Team AI tool adoption' },
        { value: 'Permanent', label: 'AI tool subscriptions secured' },
        { value: '#1', label: 'AI Design & Engineer nerd' },
      ],
    },
    {
      type: 'text',
      body: 'The work translated directly into business action: permanent AI tool subscriptions (Magic Patterns, Cursor, Subframe), a repeatable prototyping process now iterating in the team\'s workflow, and a strategic framework that informed product requirements for our two flagship AI products. I became the go-to resource for AI strategy across design, product, and engineering. It\'s a great start, and it\'s constantly evolving as the technology changes. At the pace it\'s moving it\'ll be a challenge to keep up.',
    },
  ],

  // =============================================
  // 2. INSTANT SOW / REHAB CO-PILOT
  // =============================================
  'instant-sow': [
    {
      type: 'text',
      body: 'I redesigned the scope of work experience for our loan origination flow, replacing a painful 42-field manual form with an AI-powered toolbox that lets borrowers upload documents, describe their project in natural language, or recycle previous submissions.',
    },
    {
      type: 'text',
      heading: 'The Problem',
      body: 'The existing SOW process was one of the single biggest friction points in the borrower journey. Completing the manual form took 20 minutes on average across 42+ fields. Over half of all submissions (54%) were flagged for errors or missing information, creating rework cycles that delayed loan processing and eroded customer satisfaction.\n\nThe pain point was obvious. The company\'s H2 strategic goal was clear: 100% of customers should have the option to use GenAI to assist in scope of work completion. The team set out on a plan to release our vision incrementally.',
    },
    {
      type: 'comparison',
      heading: 'Before & After',
      before: {
        label: 'Before',
        image: {
          src: '/images/legacy-sow.png',
          alt: '42-field manual SOW entry form',
          placeholder: 'Legacy SOW form. 42 fields, manual entry, no guidance or intelligence',
        },
        description: '42-field manual entry form. Borrower fills every field by hand. No guidance, no intelligence.',
      },
      after: {
        label: 'After',
        image: {
          src: '/images/tool-box.png',
          alt: 'My SOW Toolbox interface with three AI-assisted paths',
          placeholder: '"My SOW Toolbox" with three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW',
        },
        description: '"The SOW Toolbox" with three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW.',
      },
    },
    {
      type: 'text',
      heading: 'The Solution: Choose Your Path',
      body: 'Rather than replacing the manual form outright, I designed a "toolbox" approach that gave borrowers three progressively smarter ways to complete their SOW but also worked with their existing ways of working and our established internal processes. Each path feeds into the same underlying data structure, pre-filling fields with AI-extracted data while keeping the borrower in control of the final submission.\n\n**Release 1: Upload Files.** AI extracts line items from uploaded bids, plans, or spreadsheets (Excel, PDF) and pre-fills the SOW form. The borrower reviews and confirms.\n\n**Release 2: Describe Your Project.** Borrowers describe their renovation in plain language (typed or dictated). The AI generates a structured SOW from the description, with the borrower validating each section.\n\n**Release 3: SOW Recycle.** Repeat borrowers (often experienced pros) can select a previous SOW and adapt it for a new property, which is the fastest path for experienced users. While not AI powered, it rounds out the toolbox by giving borrowers a way to quickly reuse their previous work, a key feature for high-volume borrowers.',
    },
    {
      type: 'image',
      src: '/images/sow-flow-diagram.png',
      alt: 'Flow diagram showing three SOW paths converging into the same review form',
      placeholder: 'Three entry points, one destination. Every path feeds into the same review form so borrowers always have final control',
      caption: 'Three entry points, one destination. Every path feeds into the same review form so borrowers always have final control.',
      aspect: '16:9',
    },
    {
      type: 'image',
      src: '/images/feature-flow.png',
      alt: 'Document upload UI showing file selection, extraction progress, and pre-filled results',
      placeholder: 'The Upload Files path: borrowers upload bids or plans, AI extracts line items, and the form pre-fills for review',
      caption: 'The Upload Files path: borrowers upload bids or plans, AI extracts line items, and the form pre-fills for review.',
      aspect: '16:9',
    },
    {
      type: 'text',
      heading: 'Human Oversight Built In',
      body: 'Every AI-generated SOW is flagged in the operations system so the internal team knows it was machine-assisted. For our incremental rollout, I worked with our assisted data science team to design a feedback loop between the feasibility team and the AI pipeline; if extraction accuracy drops, the team can flag patterns and adjust the rollout. The validation criteria was explicit: AI-extracted data must be no worse than manually entered data, and condition rates must not increase. This is only v1, and as we refine this pattern we will unlock more features. ',
    },
    {
      type: 'image',
      src: '/images/detail-ops.png',
      alt: 'Operations view showing AI-generated flag on submitted SOW',
      placeholder: 'Every AI-assisted submission is flagged for the SOW team, placed where they do their work.',
      caption: 'Every AI-assisted submission is flagged for the SOW team, placed where they do their work.',
      aspect: '16:9',
    },
    {
      type: 'quote',
      text: 'A task that used to take 20 minutes now takes about 2 minutes.',
      attribution: 'Tyler',
      role: 'Kiavi Borrower',
    },
    {
      type: 'metrics',
      heading: 'Results',
      items: [
        { value: '31%', label: 'Eligible loans used SOW Recycle' },
        { value: '45%', label: 'Condition rate (down from 54%)' },
        { value: '20 min -> <10 min', label: 'Target SOW completion time' },
        { value: '25%', label: 'Borrower opt-in target for AI path' },
      ],
    },
    {
      type: 'text',
      body: 'The initial SOW Recycle release for professional borrowers showed strong adoption: 31% of eligible loans used the feature, and the overall condition rate dropped to 45% from a historical average above 50%. The document extraction and natural language paths have completed their staged rollout. The longer-term vision is to surface potential issues during entry so borrowers can self-remediate before submission, using the patterns started in the Instant Review Document Review projects.',
    },
  ],

  // =============================================
  // 3. INSTANT DOCUMENT REVIEW (IDR)
  // =============================================
  'instant-doc-review': [
    {
      type: 'text',
      body: 'I created a net new internal document review experience that shifted a black-box AI system into a transparent, auditable interface where loan analysts can verify, take actions, and ultimately, trust the AI\'s work, with every decision versioned for compliance.',
    },
    {
      type: 'text',
      heading: 'The Problem',
      body: 'The initial AI document review system proof of concept proved the concept worked: AI could extract and validate data from purchase sale agreements (PSAs) and associated documents. But the implementation was quick and scrappy, built into a monolithic codebase with no way for Operations users to see what the AI did, why it flagged something, and, it didn\'t integrate nicely into the system used to inform borrowers of issues. Reviewing a single PSA still took 20 minutes because analysts had to cross-reference the AI\'s output against original documents in separate parts of the system. The MVP was a black box. Analysts either trusted it blindly or viewed it as a hassle. Neither outcome was acceptable for regulated financial operations.',
    },
    {
      type: 'image',
      src: '/images/before-flow.png',
      alt: 'Diagram showing the fragmented before-state workflow for document review',
      placeholder: 'Before-state flow: analyst jumping between AI output -> separate document viewer -> feedback system -> manual cross-referencing. Pain points annotated.',
      caption: 'The before state: analysts bouncing between AI output, a separate document viewer, and the feedback system to review a single PSA.',
      aspect: '16:9',
    },
    {
      type: 'text',
      heading: 'The Solution: Property Admin Page',
      body: 'I designed the initial version of the Property Admin Page as a single source of truth for AI-assisted document review. The core principle: move incrementally from rigid automation to intelligent augmentation. The analyst\'s expertise is the product. The AI just does the grunt work of extraction so they can focus on judgment calls.\n\n**V1 shipped three critical capabilities:**\n\n**Extracted data view:** all AI-extracted fields visible in a familiar structured layout, like our current system, so the analyst can scan without hunting.\n\n**Inline document viewer:** the original document loads side-by-side with the extracted data. No tab-switching, no context loss. The analyst can verify any field against the source in one glance.\n\n**Escape hatch with audit trail:** if the AI got it wrong or the analyst needs to revert to the manual process, they can, but they must provide a justification note. This creates accountability without blocking the workflow and refines our prompts.',
    },
    {
      type: 'image',
      src: '/images/admin-page-tasks.png',
      alt: 'IDR Admin Page showing extracted data, document viewer, and conditions panel',
      placeholder: 'Magic Patterns prototype of the Property Admin Page: rules, source documents and data, and targerted tasking in one view. No more tab-switching',
      caption: 'Magic Patterns prototype of the Property Admin Page: rules, source documents and data, and targerted tasking in one view. No more tab-switching.',
      aspect: '16:9',
    },
    {
      type: 'image',
      src: '/images/detail-mvp-work.png',
      alt: 'Close-up of inline document viewer with highlighted field comparison',
      placeholder: 'Detail: Prototype example of bridging the gap between the new system and the legacy feedback system.',
      caption: 'Prototype example of bridging the gap between the new system and the legacy feedback system.',
      aspect: '4:3',
    },
    {
      type: 'text',
      heading: 'V2: Borrower Self-Service',
      body: 'V2 shifted work that once belonged to loan analysts directly to borrowers. AI now generates actionable tasks, starting with borrower name and entity corrections, and delivers them to the borrower automatically. The borrower uploads a corrected document, gets immediate feedback, resubmits if needed, and moves forward without waiting for an analyst to intervene. It\'s a loop: AI reviews, borrower acts, AI confirms. Loans close faster, analysts focus on higher-value exceptions, and borrowers get the agency and control they\'ve been missing.\n\nThese are the first task types, but the pattern is designed to expand. Anything an analyst currently does that\'s routine, repeatable, within risk limits, and document-driven is a candidate for borrower self-service, and each new task type compounds the efficiency gains on both sides.\n\nThe longer-term vision is a complete hub: a unified interface that extends this AI-driven review and task generation pattern beyond property documents to any domain in the loan lifecycle. Member entities, borrower information, property data, project data, valuation data, etc. Each domain gets the same treatment: AI extracts and validates, analysts audit in a single view with granular escape hatches per data source, and borrowers receive self-service tasks to resolve issues on their own. One pattern, applied everywhere.',
    },
    {
      type: 'image',
      src: '/images/borrower-flow.png',
      alt: 'Borrower self-service task flow: AI generates task, borrower uploads corrected document, AI confirms',
      placeholder: 'V2 self-service loop: AI generates a task, the borrower acts on it, and AI confirms the fix. No analyst needed. Magic Patterns made iterations easy',
      caption: 'V2 self-service loop: AI generates a task, the borrower acts on it, and AI confirms the fix. No analyst needed. Magic Patterns made iterations easy.',
      aspect: '16:9',
    },
    {
      type: 'image',
      src: '/images/future-vision.png',
      alt: 'Instant Review Hub concept showing multiple document domains in unified view',
      placeholder: 'The longer-term vision: one review pattern applied across every document domain in the loan lifecycle.',
      caption: 'The longer-term vision: one review pattern applied across every document domain in the loan lifecycle.',
      aspect: '16:9',
    },
    {
      type: 'metrics',
      heading: 'Results',
      items: [
        { value: '20 min -> 5-7 min', label: 'Document review time' },
        { value: '16% -> 30%', label: 'PSA auto-complete rate target' },
        { value: '100%', label: 'Decision audit trail coverage' },
      ],
    },
    {
      type: 'text',
      body: 'The redesigned review process cut analyst time from 20 minutes to 5-7 minutes per document: users are slowly trusting the system not watching its every move. Every decision is versioned, giving compliance a clear audit trail. V2 then takes it further: AI-generated tasks now shift routine work directly to borrowers, starting with borrower name and entity corrections. Borrowers get agency, analysts get their time back, and loans close faster. The pattern is built to scale: any routine, data-driven task across any loan domain is a candidate for self-service.',
    },
  ],

  // =============================================
  // 4. META — BUILDING THIS PORTFOLIO
  // =============================================
  'building-this-portfolio': [
    // --- Opening ---
    {
      type: 'text',
      body: 'AI is not magic. It does not replace thinking. You still have to articulate what you want, define what "good" looks like, and understand how the thing you are building actually works. Because you can build fast, you should think slow - slower than ever before. Every prompt should count. Every use should count. Review the code with your own eyes, understand what changed and why, and course-correct when it drifts. I am acutely aware of the environmental cost of these tools, which makes intentional, deliberate use a responsibility, not a nice-to-have - until we figure out how to make them sustainable for everyone.\n\nWith that in mind, here is how I designed a token system, built a component library, wrote the content, and shipped a production portfolio in a 48-hour sprint.',
    },

    // --- The Setup ---
    {
      type: 'text',
      heading: 'The Setup',
      body: 'Before I opened Cursor or Claude, I had been collecting material for months. Case study metrics and slide decks organized in NotebookLM had been gathering for over a year. Font and color inspiration sites were in bookmarks but I forced myself to pick stuff and follow my gut with inspiration. I had a previous portfolio site with voice and tone I could riff on. A library of links, articles, and videos I had consumed about AI-augmented workflows. And most importantly, an idea I could articulate: a 48-hour portfolio sprint, tokens first, AI augmented, built as a beta test for a larger workflow presentation at work.\n\nI also had some prior experience prompting and building with AI. Not deep engineering knowledge, but enough to understand what was being generated, ask good questions about it, and know when something was off.',
    },
    {
      type: 'text',
      body: 'Friday afternoon I sat down with Claude and started planning. My process is messy at first: I talk, ramble, type, refine, and iterate until the shape of the plan emerges. I gave it context about who I am, what I was building, what tools I had, and what I saw in my head. Over about two hours, I had a structured plan, a set of strong starting prompts, and a Cursor context file that would act as a guardrail for every agent interaction going forward.\n\nTwo hours sounds like a lot for "just planning," but I was re-reading plans, thinking through decisions, and pressure-testing ideas before writing a single line of code. Plans are where it all starts. If you are not planning, you are going to end up with slop.',
    },
    {
      type: 'image',
      src: '/images/meta-planning.png',
      alt: 'Claude conversation showing the iterative planning session with structured plan output',
      placeholder: 'Screenshot of the planning and refining session in Claude, showing the structured plan taking shape from a rambling conversation',
      caption: 'The plan emerged from a messy conversation. Rambling in, structured plan out.',
      aspect: '4:3',
    },
    {
      type: 'image',
      src: '/images/meta-context-file.png',
      alt: 'The CURSOR_CONTEXT.md file used as an AI guardrail throughout the build',
      placeholder: 'Screenshot of the Cursor context file that served as the AI guardrail for the entire project',
      caption: 'The context file gave every AI agent the same brief: design direction, constraints, and non-negotiables.',
      aspect: '16:9',
    },

    // --- The Build ---
    {
      type: 'text',
      heading: 'The Build',
      body: 'Friday evening at 8:41, I started scaffolding in Cursor. The first prompt set up Next.js with my token system, extended Tailwind with all the token values, configured three Google Fonts, and created a utility helper. Then I had the agent build the full layout shell: container, header, footer, and a test hero so I could verify the type system.\n\nThe agent built the entire app skeleton with placeholders in one go. I had planned to work page by page, but the all-at-once approach actually worked fine. I did some manual tweaks to prompts along the way as we worked through the first few things. By midnight, after another 30 minutes finishing the layout shell and getting the case study data structure ready, I had the site running locally with themed skeletons of every page. Day one was done.',
    },
    {
      type: 'image',
      src: '/images/meta-tokens.png',
      alt: 'The token system setup showing design tokens mapped into the Tailwind configuration',
      placeholder: 'Screenshot of the token system: design tokens defined in TypeScript and extended into the Tailwind theme',
      caption: 'Tokens first. Every color, font, spacing, and radius value defined before a single component was built.',
      aspect: '4:3',
    },
    {
      type: 'text',
      body: 'Saturday afternoon I hit a rhythm. Content refinement, visual tweaks, hybrid typing and prompting and committing. I got staging live on Vercel. Somewhere around 3pm I fell into a flow state and stopped documenting individual steps. I was just building: prompting specific changes, scanning the result, adjusting, committing. The key discipline was making sure we baked accessibility rules into everything as we went, not as an afterthought.',
    },
    {
      type: 'callout',
      label: 'Example Prompt',
      body: 'Read CURSOR_CONTEXT.md and src/lib/tokens.ts. Build a ProjectCard component at src/components/content/ProjectCard.tsx.\n\nProps: accepts a single case study object from the CaseStudy type. Structure: wrapped in a Next.js Link to /work/[slug]. Image placeholder area: 16:9 aspect ratio, bg-elevated, 1px border in border-subtle, rounded-lg. Title in Space Grotesk at xl, subtitle in Didact Gothic, tags as small pills in uppercase.\n\nHover: subtle lift (translateY -2px), border transitions to accent-primary with a faint brass glow shadow. The whole card should be the click target for a11y. Add a focus-visible ring in accent color.',
    },
    {
      type: 'image',
      src: '/images/meta-scaffold-styling.png',
      alt: 'The portfolio scaffold with token-driven styling applied across all page templates',
      placeholder: 'Screenshot showing the styled scaffold with token-driven colors, typography, and layout across multiple pages',
      caption: 'The scaffold with styling applied. Token-driven colors and type across every template. This is where knowing a little about code helps with prompting',
      aspect: '16:9',
    },

    // --- The Friction ---
    {
      type: 'text',
      heading: 'The Friction',
      body: 'Saturday around 1pm, as I was editing case study content, I realized something: my case study content lived in the same file as my front-end UI tokens. That was the agent\'s suggestion, and I had run with it without thinking about it too much. But working in the file made the problem obvious. Content and design tokens are different concerns, and coupling them would create maintenance headaches.\n\nI used Claude to talk through the separation plan in plain English, refined it together, and started the migration. Along the way we hit some routing errors. I spent time reading documentation, talking to the agent, and we got the fixes in. About 45 minutes total. It was a good reminder that you can course-correct once you have set a plan, and that verifying your instincts with AI and some searching builds real confidence in the decisions.',
    },
    {
      type: 'image',
      src: '/images/meta-content-separation.png',
      alt: 'Claude conversation showing the content and token separation plan being discussed in plain English',
      placeholder: 'Screenshot of the conversation where the content/token separation was planned and refined',
      caption: 'Talking through the architecture change in plain English before touching any code.',
      aspect: '16:9',
    },
    {
      type: 'text',
      body: 'The other friction was knowing when to stop. During intense building, everything looks like it could be a little better. One more visual tweak. One more wording pass. The accessibility work helped ground me: running Lighthouse audits and checking focus states gave me concrete benchmarks instead of subjective "does this feel done?" It was clear what met the bar and what did not.\n\nWhat AI got right by default through the token system was significant: contrast ratios, semantic heading hierarchy, and focus ring styles all came along for free because the tokens enforced them. What had to be explicitly enforced through human-in-the-loop review was subtler: reading order, link target clarity, and making sure nothing important was conveyed through color alone.',
    },
    {
      type: 'image',
      src: '/images/meta-a11y.png',
      alt: 'Accessibility testing results showing Lighthouse audit scores and manual review checklist',
      placeholder: 'Screenshot of me telling Cursor about my manual a11y findings and updating our plan and progress.',
      caption: 'The a11y pass: automated audits for the numbers, and me telling Cursor about my manual findings and updating our plan and progress.',
      aspect: '16:9',
    },

    // --- The Results ---
    {
      type: 'metrics',
      heading: 'The Results',
      items: [
        { value: '48 hrs', label: 'Tokens to production', accent: 'brass' },
        { value: '5 pages', label: 'Shipped with full content', accent: 'brass' },
        { value: '3', label: 'Complete case studies', accent: 'magenta' },
        { value: '100', label: 'Mobile accessibility (Lighthouse)', accent: 'brass' },
      ],
    },
    {
      type: 'text',
      body: 'By Saturday night at 10pm, I was tired. I was playing around with Codex 5.3 so I had it summarize everything built that day and plan for Sunday, which was mostly getting my domain configured and the site live.\n\nSunday morning I woke up with a dream, and in that dream I had the idea to add a resume page to the portfolio. What if the resume was just a Markdown file that generated both a downloadable PDF and the website page? I took the idea into Claude, worked out a plan, and had it built in about two hours. I found a service that renders Markdown to PDF, so all I needed was the website version. After a few iterations making sure the Markdown looked good in both formats, I called it for the 48-hour sprint.',
    },
    {
      type: 'text',
      body: 'I spent another hour double-checking everything we built against the plans we had written, then updated all the plans with progress and changes made along the way. Then I deployed the site live, noticed a few tweaks here and there (as you always do), and shipped it.\n\nWhere it stands now: a living project with an iterative post-launch plan, custom agent skills I have built to help maintain the project, work on new ideas, and document changes easily. The pipeline from tokens to code to deploy is validated and repeatable.\n\nThink smarter and work smarter, not harder. Do not slop it up.',
    },
  ],
};
