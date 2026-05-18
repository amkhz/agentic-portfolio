# ADR-011: Portfolio Visual Recalibration Toward Editorial Craftsperson Register

**Date:** 2026-05-17
**Status:** accepted
**Deciders:** [OPERATOR: List who was involved in this decision, or remove this line]

## Context

The portfolio at `justinh.design` has a sound but under-expressed visual direction ("Blade Runner + William Gibson meets Finn Juhl") that has tilted atmospheric/cinematic in practice. The current three-font system (Space Grotesk display, Didact Gothic body 400-only, Podkova heading) was a deliberate constraint that has begun to read as restraint without distinction -- a state the recalibration brief names "quiet to the point of bland."

This ADR records a doctrine-level shift toward **designer-as-craftsperson executed with editorial discipline** (Pentagram monograph / Bibliothèque / Chimero / Boulton reference lane). It supersedes specific hard constraints in VECTOR.md and CLAUDE.md that no longer serve the portfolio's core value proposition ("a portfolio that earns trust through its own quality"). The decision was reached through a `/shape` session on 2026-05-17 and is documented in full at `plans/portfolio-visual-recalibration-brief.md`. Doctrine files (PRODUCT.md, CLAUDE.md) have been updated to reflect the recalibration; this ADR is the durable, numbered record.

## Decision Drivers

- **VECTOR.md core value proposition** -- "A portfolio that earns trust through its own quality… every interaction, every transition, every accessibility detail signals the same rigor described in the case studies." Bland-but-correct does not satisfy this; distinctive directorial craft does.
- **VECTOR.md target audience** -- Hiring managers and design leads scanning portfolios in under 30 seconds. The 5-second perception test must read "this person sets a higher bar," not "another thoughtful template."
- **VECTOR.md problem statement** -- "Design portfolios built with templates look generic." Restraint without distinction reproduces the template problem in dark mode.
- **WCAG 2.2 AA contrast** -- Hard constraint that does not change. New type system must clear contrast at all weights and optical sizes.
- **OKLCH-only color system** -- Recently locked. Recalibration must respect token discipline; no literal color values introduced anywhere.
- **Four-layer architecture** -- Design tokens go in `design-system/tokens.css`; this is where new type families and variable-axis tokens land.
- **Perihelion sibling constraint** (ADR-009, ADR-010) -- Portfolio must visibly share a hand with Perihelion without copying its stack. Perihelion has Podkova + Georgia + JetBrains Mono; portfolio gets a distinct three-face system.

## Options Considered

### Option A: Status quo -- keep the current three-font system as a hard constraint

Continue with Space Grotesk (display), Didact Gothic (body 400 only), Podkova (heading) per VECTOR.md line 159 / 164. Do nothing.

**Pros:**
- Zero migration cost. No tokens to change, no surfaces to revisit.
- Existing accessibility audit and contrast work remains valid.
- Constraint discipline already enforced across the codebase.

**Cons:**
- Does not address the "quiet to the point of bland" failure mode the brief identifies. Justin's explicit assessment is that current direction is under-expressed.
- Didact-400-only ceiling prevents the typographic hierarchy a directorial register needs.
- No mono voice for metadata/kickers; portfolio is missing the "epistemic honesty" face that Perihelion uses well.
- Surfaces continue to read as a competent template rather than as an authored object.

### Option B: Targeted polish within the existing three-font system

Keep the three current faces. Apply editorial composition discipline (bookish layouts, varied margins, per-project marks) and motion refinement without changing the type system itself.

**Pros:**
- Smaller scope. No font-loading impact, no token migration for type families.
- VECTOR.md hard constraint stays intact.
- Composition and material work alone may close most of the perceived gap.

**Cons:**
- Type is the largest single lever for a directorial register. Leaving it untouched caps the ceiling of what the recalibration can achieve.
- The Didact-400 weight ceiling is the specific blocker for variable-axis expression; polish doesn't lift it.
- Reads as half-measure: composition gets the brief, type doesn't.

### Option C: Full recalibration -- new three-face system + editorial composition + material posture (chosen)

Adopt the brief in full. Replace the existing three-font system with a new three-face stack (display serif + body sans + mono kicker, all with intentional variable-axis use). Shift composition posture to editorial/bookish. Add "restraint is not blandness" to Principle 4 and "editorial composition" as Principle 6. Lock anti-goals: twee/Tumblr-zine, designer-as-influencer, quiet-to-bland (primary).

**Pros:**
- Directly serves the VECTOR.md value proposition by raising the craft ceiling across every dimension that hiring managers scan.
- Aligns the portfolio's expressive ambition with Justin's identity as a director of design -- the design IS the credential.
- Establishes a coherent doctrine across all four layers (tokens -> core -> services -> src) that future Impeccable skill work can carry forward.
- Sibling-not-copy relationship with Perihelion remains intact; portfolio earns its own monograph register.

**Cons:**
- Largest migration cost: new font families to load, tokens.css restructure, every surface eventually revisited.
- Requires amending VECTOR.md (highest-authority doctrine file). Cannot be done silently per VECTOR.md Principle 6.
- Three new candidate faces must be validated live before locking; introduces a discovery phase before any production change ships.
- Possible accessibility re-audit if face weights/optical sizes change contrast behavior in body copy.
- Font loading impact on initial render (mitigatable with `font-display: swap` and subsetting; needs measurement).

## Decision

**We will adopt Option C: full recalibration.**

The VECTOR.md core value proposition -- that the portfolio earns trust through its own quality -- is the deciding driver. The existing three-font system was a constraint chosen for visual coherence; the recalibration argues (and Justin's `/shape` session confirms) that coherence-without-distinction now reads as failure for a director-of-design portfolio. Option A is rejected as misaligned with the value prop. Option B is rejected as a half-measure that leaves the largest lever (type) untouched. The new three-face stack (display serif + body sans + mono kicker) is also three faces, so the *spirit* of the prior constraint (deliberate, limited typographic vocabulary) is preserved while the *specific* faces and the Didact-400 weight ceiling are replaced.

Specific face picks are deferred to live validation (Open Question in the brief). The doctrine change is the decision; the face roster is implementation.

## Consequences

**Positive:**

- Portfolio gains directorial editorial register without abandoning its existing materials vocabulary (warm blacks, brass + magenta, Finn Juhl warmth).
- New "Restraint is not blandness" principle gives Impeccable skills a clear failure signal beyond technical correctness.
- Mono face addition enables Perihelion-grade metadata/kicker treatment in case studies and project numbering.
- Variable-axis discipline opens optical-size and weight modulation that the prior 400-only ceiling forbade.
- Per-project bespoke marks system creates a monograph-grade identity layer that distinguishes work-index entries from a card grid.

**Negative:**

- **VECTOR.md requires amendment.** Lines 159 and 164 declare the prior three-font system as both a design principle and a hard constraint. This ADR supersedes both. Follow-up: amend VECTOR.md to reflect the new system, citing this ADR.
- **`design-system/tokens.css` migration required** before any surface can consume the new system. Includes new `--font-display`, `--font-body`, `--font-mono` token families and variable-axis exposure tokens.
- **Font-loading and performance impact must be measured.** Three new families (potentially variable fonts) increase initial payload; need to subset, preload critical weights, and validate Lighthouse score 95+ ship criterion is maintained.
- **Accessibility re-audit needed** for new body face at common reading sizes once locked.
- **Per-project mark system is an unresolved sub-decision** (Open Question in the brief). Worth its own ADR when the system shape becomes clear.
- **Surface-by-surface visual rework** for home, work index, case study shell, about. Significant design + implementation effort across multiple branches/PRs.

**Neutral:**

- The recalibration is scoped to the portfolio surface. Perihelion (`labs.justinh.design`) is unaffected and retains its Podkova + Georgia + JetBrains Mono stack per ADR-009/010.
- The four-layer architecture, OKLCH color system, WCAG 2.2 AA constraint, and "no em-dashes in copy" rule are unchanged.
- Existing case study content does not require rewriting; only the typographic and compositional containers change around it.

## Related Decisions

- **ADR-005:** CSS texture system -- related, since per-project material textures and warm-glass treatments build on the texture vocabulary established there.
- **ADR-008:** Defer DESIGN.md -- related, since this ADR makes the case for eventually generating DESIGN.md once the new system is locked.
- **ADR-009:** Lab subdomain architecture -- related context. Establishes Perihelion as sibling-not-copy.
- **ADR-010:** Perihelion rename -- related context. Locked Perihelion's distinct type stack (Podkova + Georgia + JetBrains Mono), which this ADR explicitly differentiates from.
- **VECTOR.md (lines 159, 164):** Superseded in part. The "three-font system" *count* (three faces) is preserved; the *specific faces* and the "Didact Gothic 400 only" / "do not use weights outside these ranges" weight ceiling are replaced. VECTOR.md needs amendment.
- **CLAUDE.md and PRODUCT.md:** Already updated to reflect this decision on 2026-05-17.
