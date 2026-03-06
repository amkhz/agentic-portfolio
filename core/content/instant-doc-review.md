I created a net new internal document review experience that shifted a black-box AI system into a transparent, auditable interface where loan analysts can verify, take actions, and ultimately, trust the AI's work, with every decision versioned for compliance.

## The Problem

The initial AI document review system proof of concept proved the concept worked: AI could extract and validate data from purchase sale agreements (PSAs) and associated documents. But the implementation was quick and scrappy, built into a monolithic codebase with no way for Operations users to see what the AI did, why it flagged something, and, it didn't integrate nicely into the system used to inform borrowers of issues. Reviewing a single PSA still took 20 minutes because analysts had to cross-reference the AI's output against original documents in separate parts of the system. The MVP was a black box. Analysts either trusted it blindly or viewed it as a hassle. Neither outcome was acceptable for regulated financial operations.

![Diagram showing the fragmented before-state workflow for document review](/images/before-flow.png)
*The before state: analysts bouncing between AI output, a separate document viewer, and the feedback system to review a single PSA.*
<!-- aspect:16:9 placeholder:Before-state flow: analyst jumping between AI output -> separate document viewer -> feedback system -> manual cross-referencing. Pain points annotated. -->

## The Solution: Property Admin Page

I designed the initial version of the Property Admin Page as a single source of truth for AI-assisted document review. The core principle: move incrementally from rigid automation to intelligent augmentation. The analyst's expertise is the product. The AI just does the grunt work of extraction so they can focus on judgment calls.

**V1 shipped three critical capabilities:**

**Extracted data view:** all AI-extracted fields visible in a familiar structured layout, like our current system, so the analyst can scan without hunting.

**Inline document viewer:** the original document loads side-by-side with the extracted data. No tab-switching, no context loss. The analyst can verify any field against the source in one glance.

**Escape hatch with audit trail:** if the AI got it wrong or the analyst needs to revert to the manual process, they can, but they must provide a justification note. This creates accountability without blocking the workflow and refines our prompts.

![IDR Admin Page showing extracted data, document viewer, and conditions panel](/images/admin-page-tasks.png)
*Magic Patterns prototype of the Property Admin Page: rules, source documents and data, and targerted tasking in one view. No more tab-switching.*
<!-- aspect:16:9 placeholder:Magic Patterns prototype of the Property Admin Page: rules, source documents and data, and targerted tasking in one view. No more tab-switching -->

![Close-up of inline document viewer with highlighted field comparison](/images/detail-mvp-work.png)
*Prototype example of bridging the gap between the new system and the legacy feedback system.*
<!-- aspect:4:3 placeholder:Detail: Prototype example of bridging the gap between the new system and the legacy feedback system. -->

## V2: Borrower Self-Service

V2 shifted work that once belonged to loan analysts directly to borrowers. AI now generates actionable tasks, starting with borrower name and entity corrections, and delivers them to the borrower automatically. The borrower uploads a corrected document, gets immediate feedback, resubmits if needed, and moves forward without waiting for an analyst to intervene. It's a loop: AI reviews, borrower acts, AI confirms. Loans close faster, analysts focus on higher-value exceptions, and borrowers get the agency and control they've been missing.

These are the first task types, but the pattern is designed to expand. Anything an analyst currently does that's routine, repeatable, within risk limits, and document-driven is a candidate for borrower self-service, and each new task type compounds the efficiency gains on both sides.

The longer-term vision is a complete hub: a unified interface that extends this AI-driven review and task generation pattern beyond property documents to any domain in the loan lifecycle. Member entities, borrower information, property data, project data, valuation data, etc. Each domain gets the same treatment: AI extracts and validates, analysts audit in a single view with granular escape hatches per data source, and borrowers receive self-service tasks to resolve issues on their own. One pattern, applied everywhere.

![Borrower self-service task flow: AI generates task, borrower uploads corrected document, AI confirms](/images/borrower-flow.png)
*V2 self-service loop: AI generates a task, the borrower acts on it, and AI confirms the fix. No analyst needed. Magic Patterns made iterations easy.*
<!-- aspect:16:9 placeholder:V2 self-service loop: AI generates a task, the borrower acts on it, and AI confirms the fix. No analyst needed. Magic Patterns made iterations easy -->

![Instant Review Hub concept showing multiple document domains in unified view](/images/future-vision.png)
*The longer-term vision: one review pattern applied across every document domain in the loan lifecycle.*
<!-- aspect:16:9 placeholder:The longer-term vision: one review pattern applied across every document domain in the loan lifecycle. -->

::: metrics Results
- 20 min -> 5-7 min | Document review time
- 16% -> 30% | PSA auto-complete rate target
- 100% | Decision audit trail coverage
:::

The redesigned review process cut analyst time from 20 minutes to 5-7 minutes per document: users are slowly trusting the system not watching its every move. Every decision is versioned, giving compliance a clear audit trail. V2 then takes it further: AI-generated tasks now shift routine work directly to borrowers, starting with borrower name and entity corrections. Borrowers get agency, analysts get their time back, and loans close faster. The pattern is built to scale: any routine, data-driven task across any loan domain is a candidate for self-service.
