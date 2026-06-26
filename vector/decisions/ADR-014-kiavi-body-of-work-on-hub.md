# ADR-014: Kiavi "body of work" lives on the design-infrastructure hub

**Date:** 2026-06-25
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell

## Context

The post-recalibration batch (`vector/missions/post-recalibration-batch.md`, task T3c) originally scoped the "what I've built at Kiavi" overview as a subsection on the About page, sourced from `port-sources/practice.md` (the eight-deliverable summary of Justin's Kiavi practice). On review, the placement felt wrong: the content is a body-of-work index, but About is bio altitude, so the material would get buried and read at the wrong level. The alternatives were to write a new standalone case study or to find a home that already fit the content. The cost of not deciding was building T3c against a placement that would have to be redone once it read as lost on the page.

## Decision Drivers

- **Restraint is not blandness; every surface must distinguish itself and earn its altitude** (CLAUDE.md / DESIGN.md). A body-of-work index buried inside a bio is the wrong altitude.
- **No duplication across the work IA.** The portfolio already has deep dives for the core Kiavi work (`ai-leadership`, `doctrine-not-prompts`). A new "Kiavi" study would re-tell them.
- **Reuse existing structure over inventing new surfaces.** The `design-infrastructure` hub already carries the exact one-liner this content expresses ("I build design infrastructure, not just designs") and was built as the Kiavi-practice entry point.
- **Honesty about coverage.** Several deliverables (token pipeline, brand voice, CI, fleets, enablement) have no standalone study and should not be forced into one just to have somewhere to link.

## Options Considered

### Option A: About-page subsection (the original T3c scope)

Add a ~200-300 word "What I've built at Kiavi" subsection to `AboutPage.tsx`.

**Pros:**
- Adjacent to the existing Kiavi bio paragraph; no new model or surface.

**Cons:**
- Wrong altitude: bio page, deep work index. Gets buried and missed.
- Competes with the Work IA, where body-of-work content belongs.

### Option B: New standalone "Kiavi World" case study

Treat the workshop itself as a new case study subject with the eight deliverables as its components.

**Pros:**
- Distinctive framing ("the workshop I built").

**Cons:**
- Duplicates `doctrine-not-prompts` (Key, the doctrine) and `ai-leadership` (adoption, multi-agent) heavily.
- Competes with the `design-infrastructure` hub for the same job.
- More content to write and maintain well.

### Option C: Breadth layer on the design-infrastructure hub (chosen)

Add a "Beyond Workshops" body-of-work layer below the hub's existing two doors. Items with a deep dive link out; items without stand as stated scope.

**Pros:**
- Reuses the surface already built for this exact one-liner.
- Indexes the existing studies instead of re-telling them — zero duplication.
- First-class Work surface, correct altitude.
- Honest: stated-scope items need no new studies.

**Cons:**
- Adds a field to the `CaseStudy` hub model.
- The hub grows past its original clean two-door form (mitigated: the layer is visually lighter than the dossier doors).

## Decision

**We will place the Kiavi body-of-work overview as a breadth layer on the `design-infrastructure` hub (Option C).**

The hub already states the thesis this content proves; the body-of-work layer is the evidence beneath it. Implementation: an optional `hub.bodyOfWork` field on the `CaseStudy` model (`{ heading, intro?, items: [{ label, line, slug? }] }`), rendered below the doors in `HubPageTemplate`. Items with a `slug` link to a deep dive (brass interaction); items without render inert as stated scope. About keeps only a short pointer into the hub, authored as part of the T3d register pass. The same one-liner still feeds the T3b manifesto post as the *argument* form, so hub (structured index) and post (narrative) reinforce rather than repeat.

## Consequences

**Positive:**
- The Kiavi practice has a single, correctly-pitched home in the Work IA.
- No new case studies required; breadth is shown honestly via stated-scope items.
- The hub model now supports a reusable body-of-work pattern for any future hub.

**Negative:**
- The T3c task is redefined from "About subsection" to "hub body-of-work layer" (recorded in the mission manifest).
- The hub is no longer a strict two-door page; future hub work must account for the optional breadth layer.

**Neutral:**
- The T3c↔T3d About collision flag dissolves — T3c no longer touches About; About's only change is the pointer in T3d.
- Anonymization rules still apply to the copy (internal codenames and teammate names dropped; Kiavi and `instant-doc-review` are public and kept).

## Related Decisions

- ADR-013: Portfolio Conservatory Direction (complements — this places content within that visual/IA direction; supersedes nothing).
