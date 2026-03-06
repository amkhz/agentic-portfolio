I redesigned the scope of work experience for our loan origination flow, replacing a painful 42-field manual form with an AI-powered toolbox that lets borrowers upload documents, describe their project in natural language, or recycle previous submissions.

## The Problem

The existing SOW process was one of the single biggest friction points in the borrower journey. Completing the manual form took 20 minutes on average across 42+ fields. Over half of all submissions (54%) were flagged for errors or missing information, creating rework cycles that delayed loan processing and eroded customer satisfaction.

The pain point was obvious. The company's H2 strategic goal was clear: 100% of customers should have the option to use GenAI to assist in scope of work completion. The team set out on a plan to release our vision incrementally.

::: comparison Before & After
**Before**
![42-field manual SOW entry form](/images/legacy-sow.png)
placeholder: Legacy SOW form. 42 fields, manual entry, no guidance or intelligence
label: Before
description: 42-field manual entry form. Borrower fills every field by hand. No guidance, no intelligence.

**After**
![My SOW Toolbox interface with three AI-assisted paths](/images/tool-box.png)
placeholder: "My SOW Toolbox" with three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW
label: After
description: "The SOW Toolbox" with three AI-assisted paths: Upload Files, Describe Your Project, Select Previous SOW.
:::

## The Solution: Choose Your Path

Rather than replacing the manual form outright, I designed a "toolbox" approach that gave borrowers three progressively smarter ways to complete their SOW but also worked with their existing ways of working and our established internal processes. Each path feeds into the same underlying data structure, pre-filling fields with AI-extracted data while keeping the borrower in control of the final submission.

**Release 1: Upload Files.** AI extracts line items from uploaded bids, plans, or spreadsheets (Excel, PDF) and pre-fills the SOW form. The borrower reviews and confirms.

**Release 2: Describe Your Project.** Borrowers describe their renovation in plain language (typed or dictated). The AI generates a structured SOW from the description, with the borrower validating each section.

**Release 3: SOW Recycle.** Repeat borrowers (often experienced pros) can select a previous SOW and adapt it for a new property, which is the fastest path for experienced users. While not AI powered, it rounds out the toolbox by giving borrowers a way to quickly reuse their previous work, a key feature for high-volume borrowers.

![Flow diagram showing three SOW paths converging into the same review form](/images/sow-flow-diagram.png)
*Three entry points, one destination. Every path feeds into the same review form so borrowers always have final control.*
<!-- aspect:16:9 placeholder:Three entry points, one destination. Every path feeds into the same review form so borrowers always have final control -->

![Document upload UI showing file selection, extraction progress, and pre-filled results](/images/feature-flow.png)
*The Upload Files path: borrowers upload bids or plans, AI extracts line items, and the form pre-fills for review.*
<!-- aspect:16:9 placeholder:The Upload Files path: borrowers upload bids or plans, AI extracts line items, and the form pre-fills for review -->

## Human Oversight Built In

Every AI-generated SOW is flagged in the operations system so the internal team knows it was machine-assisted. For our incremental rollout, I worked with our assisted data science team to design a feedback loop between the feasibility team and the AI pipeline; if extraction accuracy drops, the team can flag patterns and adjust the rollout. The validation criteria was explicit: AI-extracted data must be no worse than manually entered data, and condition rates must not increase. This is only v1, and as we refine this pattern we will unlock more features.

![Operations view showing AI-generated flag on submitted SOW](/images/detail-ops.png)
*Every AI-assisted submission is flagged for the SOW team, placed where they do their work.*
<!-- aspect:16:9 placeholder:Every AI-assisted submission is flagged for the SOW team, placed where they do their work. -->

::: quote
A task that used to take 20 minutes now takes about 2 minutes.
-- Tyler, Kiavi Borrower
:::

::: metrics Results
- 31% | Eligible loans used SOW Recycle
- 45% | Condition rate (down from 54%)
- 20 min -> <10 min | Target SOW completion time
- 25% | Borrower opt-in target for AI path
:::

The initial SOW Recycle release for professional borrowers showed strong adoption: 31% of eligible loans used the feature, and the overall condition rate dropped to 45% from a historical average above 50%. The document extraction and natural language paths have completed their staged rollout. The longer-term vision is to surface potential issues during entry so borrowers can self-remediate before submission, using the patterns started in the Instant Review Document Review projects.
