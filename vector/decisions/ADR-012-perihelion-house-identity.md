# ADR-012: Perihelion house identity locks to the Instrument mark with dual drawing register

**Date:** 2026-06-12
**Status:** accepted — display face amended by ADR-016 (2026-07-01)
**Deciders:** Justin Hernandez (live calls 2026-06-10 through 2026-06-12), Tyrell implementing

> **Amendment (2026-07-01):** the Podkova display/logotype face locked here was later changed to **Bricolage Grotesque Variable** during the "Reading Room" recalibration — see **ADR-016, Decision 5** (Podkova clashed with the Newsreader body and register-mark vocabulary). The Instrument sigil, dual drawing register, colophon masthead, and favicon locked in this ADR stand untouched; only the display typeface moved.

## Context

ADR-010 named the house but left it typographic: the masthead carried a text-only wordmark, the favicon was a placeholder, and the library ornament (PerihelionSigil) was a prototype with no formal relationship to a house mark. Workstream D ran the identity exploration defined in `plans/perihelion-d-identity-brief.md`: three sigil constructions staged in Paper on both palettes with favicon rows and lockups, the survivor iterated live on the real masthead via /impeccable live, and the candidates scored via /critique (snapshot: `plans/perihelion-d-critique-snapshot.md`). The brief's constraints apply: WCAG 2.2 AA with 3:1 for the mark as a graphical object on both themes, OKLCH tokens only, the mission test (open the door, never gatekeep), and the named anti-goals (space-agency cosplay, generic orbit-logo gravity, over-branding the notebook, twee drift).

## Decision Drivers

- **Dual-register integrity.** The brief's central thesis: one geometry, two materializations switched by theme scope, each reading as a decision. The 2026-06-10 measurement showed emission bloom rendering as ink bleed on cream; the cream rendering had to become a construction, not a degradation.
- **Quiet wonder, never insignia.** A designer with no physics background notices something celestial and feels the place is serious without being closed.
- **Survival at use sizes.** The identity's actual jobs are the masthead, a 16px favicon, and OG cards, not a plate at poster scale.
- **Restrained, context-aware color.** Orbit in theme ink, only the periapsis dot takes accent (locked in discovery).
- **Recorded discipline.** Clearspace, minimum-size floor, and the contrast matrix must be recorded, not improvised per surface.

## Options Considered

### Option A: "Instrument" (eccentric orbit, luminance falloff)

Ellipse plus periapsis dot, canted 45 degrees, with an aphelion micro-dot. On graphite the mark emits (gradient stroke dim at aphelion to brass at periapsis, halo'd dot); on cream it is inked (solid press-weight stroke, no halo, orbit broken at periapsis so the dot sits in punched clearspace).

**Pros:**
- Only candidate where the ink register makes its own construction decision (the periapsis stroke-break does in press logic what the halo does in light). Scored 4/4 on dual-register integrity.
- Physics is legible as feeling: brightness maps to orbital distance.
- Theme flip is correct by construction (pure CSS register swap, no remount, no flash).
- Critique total 19/24; no AI-slop verdict.

**Cons:**
- Ellipse-plus-dot silhouette carries residual generic orbit-logo gravity, mitigated by the gradient asymmetry, micro-dot, and cant rather than eliminated.
- Glow-on-dark is an AI-era genre commonplace; the light theme is what proves the identity is not the glow.

### Option B: "Fragment" (interrupted arc, candidate C)

An open arc with a floating counterweight in the gap; the orbit you complete in your head.

**Pros:**
- Strongest repellent of atom-mark gravity in the set; perihelial-by-omission is memorable.
- One construction survives all sizes including 16px.

**Cons:**
- The ink register is emission minus glow: exactly the degradation the brief warns against (2/4 dual-register).
- Crescent/moon-icon ambiguity, worst at favicon size; reads slight and unanchored at lockup scale. Critique total 15/24.

### Option C: "Kepler plate" (true-focus construction, candidate D)

Ellipse with the attractor at the true focus and a tick at closest approach; Kepler-plate scholarship.

**Pros:**
- The most intellectually wondrous idea in the set; native fit for the engraving lane.

**Cons:**
- Dot-inside-ellipse is the stock space-startup construction (1/4 anti-goal avoidance), and the wonder is gatekept: it requires knowing Kepler.
- Broke the locked color rule by putting accent on the attractor, quietly renaming the house (a mark about the sun, not about closest approach).
- Collapses at every use size; the favicon re-derivation abandons what made it itself. Critique total 11/24.

### Option D: Status quo (text-only wordmark)

Keep the typographic masthead, no house mark.

**Pros:**
- Zero risk of orbit-logo genericism; nothing to maintain.

**Cons:**
- Forecloses the favicon, OG anchors, and the "one identity, many renderings" system the brief requires; Works would launch with no inheritable identity.

## Decision

**We will lock the house identity to candidate A "Instrument": the eccentric-orbit mark with dual drawing register, the Podkova logotype in the colophon-rule masthead lockup, a once-per-mount draw-in that ends with one transit, and the transit delight on pointer enter and keyboard focus.**

A won the scored critique 19/24 against C's 15 and D's 11, and it is the only candidate satisfying the dual-register driver that the brief names as its thesis. The masthead lockup ("colophon rule": mark, wordmark/kicker stack, hairline rule, tagline) was live-accepted on the real surface; on mobile the tagline moves to its own sibling line so the name's one translation survives the mission test where most first visits happen. Clearspace (one orbit semi-minor axis), the 32px minimum-size floor, and the full dot/orbit/spark contrast matrix on both registers are recorded in `plans/perihelion-d-identity-brief.md`; the matrix passes 3:1 for every identification-carrying element, with the emission falloff's sub-3:1 tail recorded as a deliberate decision.

## Consequences

**Positive:**
- The house has one geometry with many renderings: masthead mark, library ornament (PerihelionSigil rederived as the confocal large register), and a defined derivation path for favicon and OG anchors.
- Works inherits the identity on day one without reopening exploration.
- Accessibility posture is structural: register swap is pure CSS, reduced motion renders complete and static, the transit completes once started and has a keyboard path.

**Negative:**
- Favicon and OG cards must be re-derived constructions (dot plus arc fragment), never scaled-down sigils; that work remains open and is now constrained by this ADR.
- The ellipse-plus-dot silhouette's residual genericism means flat monochrome contexts (print, forced-colors) lean entirely on eccentric geometry; if those contexts matter later, the eccentricity question reopens.
- Candidates C and D are closed as house marks.

**Neutral:**
- D's true-focus Kepler plate is noted as a candidate (not committed) for the manifesto ornament's large animated register, where there is room to read the scholarship. Decide when the manifesto ships.
- Q6 (tagline placement when Works ships) remains open; nothing in the lockup hard-binds the tagline to the mark.
- The transit's first-load run fires once per mount as the draw-in's final beat; sessions that remount the layout replay it. Acceptable for now; revisit only if it reads as noisy.

## Related Decisions

- ADR-009: Lab subdomain architecture (multi-entry build the identity ships within)
- ADR-010: Rename the lab to Perihelion (named the house this ADR gives a mark)
- ADR-011: Portfolio visual recalibration (the sibling surface's direction; the lab shares the hand, not the voice)
