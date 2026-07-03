# ADR-017: The Perihelion Works Arm and The Flight Deck (Works 01)

**Date:** 2026-07-03 (decision shaped 2026-07-02, per `plans/works-01-the-flight-deck.md`)
**Status:** proposed
**Deciders:** Justin Hernandez (direction); drafted by Tyrell via invest-adr

> **Ratification protocol (binding):** this ADR lands before any Works code exists, so Roy reviews the build against a ratified document, not a moving one. Between draft and ratification, `/shape` may amend exactly two clauses: (1) the performance budget numbers in §Decision D6, and (2) the commit-moment choreography detail in §Decision D4. Nothing else is open. Ratify (flip to `accepted`) before Tyrell phase 1. The piece's name is a working title; confirm or rename at ratification.

## Context

Perihelion was chartered as a two-arm house (ADR-010): the Archive (research arm, shipped as the guide library) and Works (applied-design arm, reserved). Works 01, "The Flight Deck," is now planned: a full-bleed operable cockpit for breakthrough flight built from DIRD 28's four Design Hooks, with DIRD 34's findings as operating parameters. It is the piece that makes Works real, and because it is first, every structural choice it makes becomes the Works presentation template.

Three standing locks collide with what the piece needs: ADR-009 keeps all lab routes inside `LabLayout` and all lab color in `design-system/lab-tokens.css`; ADR-016 locks lab motion to convergence with the portfolio's shared spring tokens. A full-bleed instrument deck cannot live inside a reading-oriented layout shell, cannot express a cockpit palette through reading-room tokens, and cannot choreograph a boot sequence, a staged failure drill, and a five-minute dissolve with reactive springs alone. The cost of not deciding is silent architectural drift — precisely what ADR-009's revisit criteria exist to prevent.

## Decision Drivers

- **Archive performance is untouchable:** Lighthouse ≥ 90 and reading comfort on the guide library must be unaffected by anything Works ships (ADR-009 revisit criterion; ADR-016 "reading comfort is the lab's job").
- **The mission test survives into Works** (ADR-010/012, PRODUCT.md): every moment must open the door for a designer without a physics background, never gatekeep.
- **WCAG 2.2 AA is a hard constraint** (VECTOR.md) — full keyboard operability, reduced-motion equivalence, no color-only signaling, opt-in audio.
- **OKLCH-by-token is the color method everywhere** (VECTOR.md hard constraint); the question is scope, not method.
- **Soft constraint against heavy dependencies** (VECTOR.md): new packages must earn their place and must not leak outside their chunk.
- **First-mover template effect:** Works 01's structure is inherited by Works 02+; deciding per-piece later would relitigate this every time.

## Options Considered

### Option A: Works pieces as ordinary lab routes (status quo extended)

Add `/w/:slug` inside `LabLayout`, style with `lab-tokens.css` plus a per-work accent (the per-guide accent pattern), animate with the shared spring tokens.

**Pros:**
- Zero amendments to ADR-009/016; smallest diff; inherits Suspense, theming, and header for free.
- Works and Archive stay visually kin, reinforcing the house identity.

**Cons:**
- The deck is not a reading surface. A lab header and reading rail wrapped around a full-bleed cockpit breaks the piece's fiction and its full-viewport canvas layout.
- Reading Room tokens encode long-form legibility decisions (graphite floor, reading-size lever) that a cockpit palette would fight or corrupt; extending `lab-tokens.css` per work bloats the shared file with single-consumer tokens.
- Spring tokens cannot express authored, timeline-driven sequences (boot ritual, drill escalation, dissolve); forcing them produces exactly the decorated-not-designed result the thesis argues against.

### Option B: Works as a third Vite entry (separate app)

Give Works its own `works.html` entry and router, fully independent of the lab app.

**Pros:**
- Total isolation; no LabLayout question at all; per-work tokens trivially scoped.

**Cons:**
- Breaks the house: Archive and Works are peers *within* Perihelion (ADR-010), one domain, one nav story. A third entry needs new Vercel rewrites and splits the lab's identity across apps for no user-facing gain.
- Route-level code splitting already gives the isolation that matters (chunk isolation); a build entry adds operational surface without adding protection.

### Option C: Works routes in the lab app, rendered outside LabLayout, with per-work scoped tokens and a two-lane motion rule (chosen)

`/w/:slug` joins `src/lab/App.tsx` as a sibling of the `LabLayout` route group, lazy-loaded, rendering full-bleed with its own minimal colophon chrome. Each work owns a scoped OKLCH token file. Motion follows a lane rule: reactive = `motion` springs, authored/sequenced = GSAP timelines.

**Pros:**
- One app, one domain, one router — the house stays whole; the deck escapes only the layout shell, not the architecture.
- Chunk isolation protects the Archive: the deck's code, GSAP, and (behind the sound toggle) Tone.js never enter the shared bundle.
- Scoped tokens sanction divergence without leaking it: `lab-tokens.css` stays a reading-room file, and the OKLCH method stays universal.
- The lane rule resolves the two-library smell with a bright line Roy can enforce.

**Cons:**
- Amends two ratified ADRs; the exceptions must be written precisely or they become precedent for arbitrary divergence.
- Two motion libraries in one piece is real cognitive overhead for future maintenance.
- Per-work token files can drift from house quality standards if the a11y gates are not enforced per work.

## Decision

**We will build Works as Option C.** The clauses, individually:

**D1 — Works arm architecture (amends ADR-009's layout clause).** Works pieces mount at `/w/:slug` in `src/lab/App.tsx`, lazy-loaded, rendered *outside* `LabLayout` as full-bleed standalone experiences. Each piece carries its own minimal colophon chrome: title, thesis paragraph, source-guide links back to the Archive, exit. A `core/works/` manifest (mirroring `core/lab/guides.ts`; entry shape: slug, title, source guides, year, status) is the single registry. Mobile receives a designed decline card (sigil, thesis, short capture, "this instrument wants a wider bench" copy), never a broken squeeze. ADR-009's "all lab routes inside LabLayout" clause is amended to "all *Archive* routes inside LabLayout; Works routes render standalone." The cross-app import boundary (no `src/` ↔ `src/lab/` imports; shared UI extracts to `core/ui-primitives/`) is unchanged and applies to Works.

**D2 — Per-work token scope (amends ADR-009's token clause).** Each work gets its own scoped token file (`src/works/<slug>/tokens.css`), scoped under the work's root element class so nothing leaks into lab or portfolio surfaces. Palette, type, and motion values may diverge from both Conservatory and Reading Room; the *method* may not: all color OKLCH, referenced by token name, no literal values outside the token file, WCAG 2.2 AA within the work's own surfaces. `design-system/lab-tokens.css` remains the Archive's file and gains nothing per-work.

**D3 — The register inversion (extends ADR-012, does not amend it).** The Archive's subliminal-craft principle — design is the plate, content is the meal — inverts in Works: here the design *is* the meal. Motion, spectacle, and interface-as-subject are the arm's purpose. The mission test survives the inversion intact and is checked per moment: plain-language captions, procedures that teach themselves, no credential-demanding copy. Works spectacle must argue a design idea; spectacle that only decorates fails the arm's own standard. The imagery-restraint doctrine (generated imagery as a deliberate accent, never wallpaper) is likewise portfolio/Archive doctrine and does not bind Works: Wallace concept art, mood frames, and visual direction probes are sanctioned throughout Works exploration and build (Justin, 2026-07-03).

**D4 — Motion lane rule (amends ADR-016's convergence lock for Works surfaces only).** Reactive, input-responsive motion (controls, hover, the paradigm slider's feel) uses `motion` springs. Authored, sequenced motion (pre-flight boot, drill escalation, the movement-5 dissolve) uses GSAP timelines via `useGSAP()`. The line: if it responds to the operator, it springs; if it is choreographed over time, it is a timeline. The translation layer's committed architecture (proposal layer SVG + GSAP MotionPath/DrawSVG; consequence shader-native in `ogl`, driven by uniforms on the same timeline) is settled; *shape may amend the commit-moment choreography detail only.* ADR-016's motion convergence continues to govern all Archive surfaces.

**D5 — Dependencies.** Add `gsap` + `@gsap/react` (authored lane; free license including former Club plugins, commercial use covered) and `tone` (spatial audio + synthesized alert grammar; verify current major at install). Both live inside the deck's lazy chunk; Tone additionally loads only on the sound toggle (dynamic import), muted by default, never autoplay. `ogl` is already installed. Paper Shaders stays uninstalled unless `ogl` leaves atmosphere wanting *and* its OKLCH question resolves (`plans/paper-shaders-reference.md`). Zero new bytes in the portfolio or Archive initial loads — this is the condition that keeps VECTOR.md's no-heavy-dependencies posture honest.

**D6 — Performance budget (deck route; shape may amend these numbers).** The Archive keeps Lighthouse ≥ 90; the deck gets its own budget instead of pretending to be a reading page:
- Deck route JS chunk ≤ 350 KB gzipped, excluding Tone (Tone ≤ 160 KB gz, opt-in only).
- Interactive (deck boots, first instrument responds) ≤ 3 s on desktop broadband.
- Steady-state 60 fps on canvas surfaces; device pixel ratio capped at 2; render loops `IntersectionObserver`-gated and paused on `visibilitychange`.
- Lighthouse on `/w/<slug>` desktop: accessibility ≥ 95 (non-negotiable), performance ≥ 70 (realistic for full-bleed WebGL, recorded so nobody distorts the design to chase a reading-page score).

**D7 — Q6, tagline evolution (closes ADR-012's open question).** The umbrella keeps "closest approach to the frontier" — the perihelion metaphor is arm-neutral and already covers an applied practice. Each arm owns its own line beneath it: the Archive keeps "A reader's notebook. Designed to be prep, not product."; Works debuts its own line, drafted with the Flight Deck colophon copy (candidate register: the thesis — speculative design you can operate, not watch). Nothing in the masthead lockup hard-binds the tagline, so this ships as copy, not structure.

## Consequences

**Positive:**
- Works 02+ inherits a ratified template: manifest entry, `/w/:slug` route, scoped tokens, lane rule, decline card, colophon contract — no per-piece relitigation.
- The Archive's performance and reading register are structurally insulated, not just promised.
- Roy gains bright-line review criteria: token leakage, lane violations, and chunk contamination are all mechanically checkable.
- The intent-to-action gap (DIRD 28's core problem) gets a literal rendering at the SVG-to-shader seam, on the record as sanctioned architecture.

**Negative:**
- Two motion libraries are now sanctioned in one repo; the lane rule must be enforced or the smell it prevents returns.
- Per-work token files trade consolidation for expressiveness; each new work adds an a11y surface that must be gated individually.
- ADR-009 and ADR-016 each carry an amended clause; future readers must read them with this ADR to get the full picture (their texts get a superseded-in-part pointer at ratification).
- A performance budget below Archive standards on the same domain is a deliberate, recorded inequality; it must never be cited as precedent for Archive regressions.

**Neutral:**
- The works manifest starts with one entry; its shape is deliberately built for more.
- Tablet landscape may run a reduced deck only if it comes cheap; no flagship budget is spent there.
- The dird-34 guide is authored in parallel; the colophon's DIRD 34 source line follows the interim posture (cite DIRD 28 §Control Paradigms, "DIRD 34 guide forthcoming") until the guide lands in `core/lab/guides/`.

## Related Decisions

- ADR-009: Lab subdomain architecture — amended in part (D1 layout clause, D2 token clause); import boundary and multi-entry build unchanged.
- ADR-010: Perihelion rename and two-arm house — implemented; Works arm activated as chartered.
- ADR-012: Perihelion house identity — extended (D3 register inversion); open question Q6 closed (D7).
- ADR-013: Portfolio Conservatory direction — untouched; per-work tokens do not affect portfolio surfaces.
- ADR-016: Reading Room recalibration — amended in part (D4, Works surfaces only); Archive motion convergence unchanged.
