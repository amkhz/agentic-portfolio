I enhanced the scope of work experience for our loan origination flow, replacing a painful 42-field manual form with an AI-powered toolbox that lets borrowers upload documents, describe their project in natural language, or recycle previous submissions.

## The Problem

The existing SOW process was one of the biggest friction points in the borrower journey. The manual form took 20 minutes on average across 42+ fields. Over half of all submissions (54%) got flagged for errors or missing information, and every flag meant a rework cycle that delayed processing and frustrated borrowers.

The pain was obvious, and so was the goal. The company's H2 target: every customer should have the option to use GenAI to help complete their scope of work. We set out to ship that vision incrementally.

::: comparison Before & After
**Before**
![42-field manual SOW entry form](/images/legacy-sow.png)
placeholder: Legacy SOW form. 42 fields, manual entry, no guidance or intelligence
label: Before
description: 42-field manual entry form. Borrower fills every field by hand. No guidance, no intelligence.

**After**
![My SOW Toolbox interface with three AI-assisted paths](/images/sow-toolbox.png)
placeholder: "My SOW Toolbox" with three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW
label: After
description: "The SOW Toolbox" with three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW.
:::

## The Solution: Choose Your Path

Rather than rip out the manual form, I designed a "toolbox" that gave borrowers three progressively smarter ways to complete their SOW. It met them where they already worked, and it respected our established internal processes. Each path feeds the same underlying data structure, pre-filling fields with AI-extracted data while the borrower stays in control of what gets submitted.

**Release 1: Upload Files.** AI extracts line items from uploaded bids, plans, or spreadsheets (Excel, PDF) and pre-fills the SOW form. The borrower reviews and confirms.

**Release 2: Describe Your Project.** Borrowers describe their renovation in plain language (typed or dictated). The AI generates a structured SOW from the description, with the borrower validating each section.

**Release 3: SOW Recycle.** Repeat borrowers, often experienced pros, can grab a previous SOW and adapt it for a new property. It's the fastest path in the toolbox. No AI here, just a way to reuse work that's already been done, and it turned out to be clutch for high-volume borrowers.

![Flow diagram showing three SOW paths converging into the same review form](/images/sow-flow-diagram.png)
*Three entry points, one destination. Every path feeds into the same review form so borrowers always have final control.*
<!-- aspect:16:9 placeholder:Three entry points, one destination. Every path feeds into the same review form so borrowers always have final control -->

![Document upload UI showing file selection, extraction progress, and pre-filled results](/images/feature-flow.png)
*The Upload Files path: borrowers upload bids or plans, AI extracts line items, and the form pre-fills for review.*
<!-- aspect:16:9 placeholder:The Upload Files path: borrowers upload bids or plans, AI extracts line items, and the form pre-fills for review -->

## Human Oversight Built In

Every AI-generated SOW is flagged in the operations system, so the internal team always knows it was machine-assisted. For the incremental rollout, I worked with our data science team to design a feedback loop between feasibility and the AI pipeline. If extraction accuracy drops, the team can flag patterns and adjust the rollout. The validation bar was explicit: AI-extracted data has to be no worse than manually entered data, and condition rates can't go up. This is v1. As we refine the pattern, we unlock more.

![Operations view showing AI-generated flag on submitted SOW](/images/detail-ops.png)
*Every AI-assisted submission is flagged for the SOW team, placed where they do their work.*
<!-- aspect:16:9 placeholder:Every AI-assisted submission is flagged for the SOW team, placed where they do their work. -->

![Project Draws view with draw disbursal controls, construction holdback total, and a feasibility-analyst SOW sign-off task](/images/sow-draws.png)
*The SOW doesn't end at submission. It feeds disbursal: draw schedules, the construction holdback, and a feasibility-analyst sign-off that gates the money. Human judgment stays on the critical path.*
<!-- aspect:16:9 placeholder:Project Draws view: draw disbursal and cancel controls, drawn and undrawn amounts, construction holdback total, and a Tasks panel showing the feasibility-analyst SOW sign-off -->

::: quote
A task that used to take 20 minutes now takes about 2 minutes.
-- Tyler, Kiavi Experience Manager
:::

::: metrics Results
- 31% | Eligible loans used SOW Recycle
- 45% | Condition rate (down from 54%)
- 20 min -> <10 min | Target SOW completion time
- 25% | Borrower opt-in target for AI path
:::

The first SOW Recycle release landed hard with professional borrowers: 31% of eligible loans used it, and the overall condition rate dropped to 45% from a historical average above 50%. The document-extraction and natural-language paths have finished their staged rollout. Next, I want to surface potential issues during entry so borrowers can fix them before they ever hit submit, building on the patterns we started in the Instant Document Review work.
