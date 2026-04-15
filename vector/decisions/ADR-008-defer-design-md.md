# ADR-008: Defer DESIGN.md adoption until Investiture formalizes the pattern

**Date:** 2026-04-14
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (Builder)

## Context

Investiture v1.5 introduces DESIGN.md as a structured design system specification: colors, typography, component patterns, do's and don'ts, and agent prompt examples. It serves as a machine-readable design brief that any agent can follow without parsing CSS variables.

We evaluated adopting DESIGN.md for agentic-portfolio, where design context currently lives in three places:

| File | What it holds |
|------|---------------|
| `design-system/tokens.css` | Source of truth: OKLCH color values, shadows, spacing, component tokens |
| `.impeccable.md` | Design direction: users, brand personality, aesthetic, design principles |
| `CLAUDE.md` | Behavioral enforcement: "use token colors only", "Didact Gothic 400", "one h1 per page" |

## Decision

**Defer DESIGN.md adoption.** Keep `.impeccable.md` as the design context file and `tokens.css` as the CSS implementation. Do not create a DESIGN.md until Investiture formalizes skill integration with it (reading from DESIGN.md the way Impeccable reads from `.impeccable.md`).

As part of this decision, we consolidated: the duplicate Design Context section was removed from CLAUDE.md, which now points to `.impeccable.md` for full design direction.

## Rationale

1. **Sync risk.** Adding DESIGN.md creates a third source of design truth with no automated sync mechanism. `.impeccable.md` is already the Impeccable skill suite's hardcoded contract (3-tier lookup: loaded instructions, `.impeccable.md`, `/impeccable teach`). DESIGN.md would need manual updates whenever `.impeccable.md` changes, and vice versa. Drift between sources is the predictable outcome.

2. **The problem is already solved.** DESIGN.md exists for projects that lack a formal token system. We have `tokens.css` (the CSS implementation) and `.impeccable.md` (the design direction). The gap DESIGN.md fills upstream does not exist downstream.

3. **Impeccable skill integration is hardcoded.** The Impeccable skill suite looks for `.impeccable.md` by name at the project root. The filename is not configurable. Creating DESIGN.md does not replace `.impeccable.md`, so both would coexist with overlapping content.

4. **Wait for convergence.** Investiture and the Impeccable skill suite are both actively evolving. When Investiture formalizes DESIGN.md as a first-class artifact with skill integration (analogous to how VECTOR.md and ARCHITECTURE.md are referenced by invest-doctrine and invest-architecture), we can adopt it cleanly and collapse `.impeccable.md` into it. One migration, not two.

## Consequences

- `.impeccable.md` remains the single source of truth for design direction
- `CLAUDE.md` points to `.impeccable.md` rather than duplicating design context
- `tokens.css` remains the CSS implementation source of truth
- Future Investiture updates that formalize DESIGN.md will trigger a revisit of this decision
- If we run `/impeccable teach` and update `.impeccable.md`, no other files need manual sync

## Revisit When

- Investiture adds DESIGN.md to its skill integration (invest-doctrine reads it, invest-architecture checks against it)
- The Impeccable skill suite supports reading from DESIGN.md instead of or alongside `.impeccable.md`
- We add a second project that needs to share design direction across repos
