# ADR-019: Aphelion -- a Third Arm for Personal Experimental Work

**Date:** 2026-07-06
**Status:** accepted
**Deciders:** Justin Hernandez (direction and name); drafted by Tyrell via invest-adr

## Context

The virtual hi-fi listening room (Music Phase 2, Track D; working title "Nibiru") needs a home, and none of the existing surfaces fits its posture. Justin's call, verbatim: "This doesn't feel like Perihelion Works adjacent, it's new space -- an experimental arm of my work that shows who I am." The portfolio (justinh.design) is the professional practice under Conservatory doctrine; Perihelion (labs.justinh.design) is the research house whose Works arm is chartered as Archive-research-derived (ADR-017). A personal-expression experiment derived from twenty years of listening data belongs to neither charter. The cost of not deciding is either a charter amendment that dilutes Works or a portfolio surface that fights Conservatory doctrine.

The name extends the house cosmology: **Aphelion** is the orbital point farthest from the sun -- Perihelion's opposite on the same orbit. Research happens at closest approach; the self lives at the far, slow, dark end. Pieces within the arm take names from far objects (Nibiru, the hidden planet, is first).

## Decision Drivers

- **Doctrine freedom is the point:** the arm must own its tokens, motion grammar, and register without answering to Conservatory (ADR-013), Reading Room (ADR-016), or the Works charter (ADR-017).
- **Dependency isolation:** the first piece is R3F/three.js-heavy; those dependencies must never enter the portfolio's or lab's trees (VECTOR.md soft constraint, ADR-017 D5 posture).
- **Workspace convention:** one repo per project (projects/CLAUDE.md); ADR-018 set the sibling-repo precedent and it worked.
- **Music-data access:** the arm consumes listening data through ADR-018's contracts, not new side channels.
- **Hard constraints travel:** WCAG 2.2 AA and OKLCH-by-token are method, not register -- they bind every arm.

## Options Considered

### Option A: Portfolio-embedded (a `/lounge` route on justinh.design)

**Pros:** one repo, one deploy; The Sound's orbit is a natural narrative home.
**Cons:** Conservatory doctrine and the wave-driven motion mandate govern portfolio surfaces; three.js enters the portfolio tree against the mobile-INP investigation's grain; the piece reads as a portfolio feature, not an arm of its own.

### Option B: Perihelion Works 02

**Pros:** ADR-017's template (full-bleed routes, per-work tokens, motion lanes, Tone.js sanction, decline card) is a prebuilt chassis.
**Cons:** Works pieces are chartered as Archive-research-derived with source-guide colophons; a personal music room requires amending that charter, and Justin explicitly rejected the fit. Diluting the Works charter for its second-ever piece would weaken exactly the precedent ADR-017 was written to set.

### Option C: A third arm -- separate repo, own subdomain (chosen)

New repo `~/projects/aphelion`, deployed as its own Vercel project at `aphelion.justinh.design`, with its own Investiture doctrine and scoped tokens.

**Pros:** total doctrine freedom with zero charter surgery; dependency isolation by construction; workspace-convention aligned; the arm is itself a portfolio artifact.
**Cons:** a third deploy target and doctrine set to maintain; cross-repo data plumbing (mitigated: ADR-018's contracts already anticipated a lounge consumer).

## Decision

**We will build Aphelion as Option C: a standalone repo and subdomain, the third arm beside the portfolio and Perihelion.**

The identity system: justinh.design is the practice (Conservatory). Perihelion is research at closest approach (Reading Room + Works). Aphelion is the far side of the same orbit -- personal, experimental, after-dark; the work that shows who Justin is. Nibiru (working title, confirmed at shape) is its first piece.

## Consequences

**Positive:**
- The kissa can have its own palette (ember tungsten, walnut black, oxblood, gear-blue), its own motion rules, and its own register with no exemption requests.
- three.js/R3F, Tone.js, and any future experimental dependency live only in Aphelion's tree.
- The cosmology scales: future personal experiments are far objects joining an arm that already explains them.

**Negative:**
- Three doctrine sets now exist; drift between them is a real maintenance surface (Roy reviews per-repo).
- Cross-origin data access must go through Aphelion's own thin proxy or baked exports -- never a loosened portfolio CORS policy.
- A third Vercel project, DNS entry, and env-var set to operate.

**Neutral:**
- Aphelion consumes music data exclusively through ADR-018's contracts (MCP tools at build/author time, baked JSON exports, its own `api/` proxy for live now-playing reading the same env vars).
- The portfolio and Perihelion link to Aphelion as kin, not as parent; nav integration is a per-surface editorial call, not architecture.
- Repo may start private (lastfm-mcp precedent) and flip public at launch.

## Related Decisions

- ADR-009: multi-entry architecture -- considered and not extended; Aphelion is a sibling repo, not a third Vite entry.
- ADR-017: Perihelion Works arm -- untouched; its charter stays clean, which is half the reason this ADR exists.
- ADR-018: archive-first Last.fm platform -- Aphelion is the anticipated "lounge" consumer of its contracts.
