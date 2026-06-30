# Mission: Conservatory Surfaces (Plan A Phase 4)

**Feature:** Rebuild the three core portfolio surfaces to the Conservatory register — Work index in Field Notebook table-of-contents grammar, case-study shell as an editorial spread with a per-project drafted-object mark and day/night, and a rebalanced biophilic Home — replacing the 3-column card-grid reflex.
**Date:** 2026-06-21
**Doctrine source:** ARCHITECTURE.md, CLAUDE.md, VECTOR.md, DESIGN.md (visual SoT, binds ADR-013)

## Constraint Check

**VECTOR.md / DESIGN.md constraints that apply:**
- OKLCH-only color via named tokens; no hex/rgb/named colors. WCAG 2.2 AA both modes (`scripts/wcag-check.py`).
- Green is atmosphere-and-material only — never an interaction state. Brass/amber owns all interaction. Magenta is a rare signal.
- One `h1` per page; `h2 -> h3` order. No em-dashes in copy. Four-layer architecture. Files < 200 lines (visual/animation components exempt).
- Imagery is a deliberate accent at anchors, never wallpaper. Covers atmospheric, never flat solid panels.
- Build on the CURRENT faces (Podkova/Space Grotesk/Didact). Type swap is a separate fast-follow (Phase 2), not in this mission.

**Violations found:** None. All tasks are token-driven UI + one core-data task. No fetching in UI, no business logic in components, import direction respected.

**Collision flags:**
- `core/content/case-studies.ts` is touched by **T6 (accent re-map)** here AND by **Plan B (content refresh)**. Sequence these or coordinate — do not run T6 and a Plan B content task on `case-studies.ts` in parallel worktrees. T6 is metadata-only (accent field); Plan B is content. Land T6 first (small) or rebase.
- `ProjectCard.tsx` assigned solely to **T5 (Home)**. After T3, Work no longer uses it, so no shared-edit collision. T3 must NOT touch `ProjectCard`.
- Imagery finals (Phase 3) interleave: each surface builds its slot with placeholders; Wallace renders the final asset to that slot's exact crop after. Not in this mission.

## Tasks

### T1: Field Notebook design tokens
**Layer:** Design System (`design-system/tokens.css`)
**Owner:** Tyrell
**Branch:** `feat/conservatory-fieldnotebook-tokens`
**Commit prefix:** `feat(tokens):`
**Inputs:** None — can start immediately. Conservatory palette already shipped; this adds the Field Notebook *structural* tokens only.
**Outputs:** New tokens consumed by T2/T3/T5 — registration-mark stroke/size, dossier-frame border/inset, drafted-object mark slot dimensions, TOC rule weights/leaders. Any per-project biophilic accent values needed by T6.
**Scope boundary:** Does NOT touch any `src/` component, `core/`, or existing color values (only adds structural/measurement tokens + any new accent values). No component markup.

### T2: Field Notebook shared UI primitives
**Layer:** UI (`src/components/content/` or a new `src/components/fieldnotebook/`)
**Owner:** Tyrell (Impeccable `craft` for the primitives)
**Branch:** `feat/conservatory-fieldnotebook-primitives`
**Commit prefix:** `feat(ui):`
**Inputs:** T1 (consumes the structural tokens).
**Outputs:** Reusable components for T3 + T5 (and T4): `RegistrationMark`, `DossierFrame` (instrument/dossier framing), `TocLinkList` (hero + table-of-contents/links), `DraftedObjectMark` (per-project mark slot wrapper, placeholder-aware). Rhymes with existing constellation nav; reuse `GlowEffect`/`RevealOnScroll`/`GrainOverlay` rather than reinventing.
**Scope boundary:** Pure presentational primitives only. Does NOT edit `WorkPage`, `CaseStudyPageTemplate`, `HomePage`, `ProjectCard`, or any data in `core/`. No page wiring.

### T3: Work index — Field Notebook TOC rebuild
**Layer:** UI (`src/pages/WorkPage.tsx`)
**Owner:** Tyrell (Impeccable `craft -> critique -> polish`)
**Branch:** `feat/conservatory-work-index`
**Commit prefix:** `feat(ui):`
**Inputs:** T1, T2.
**Outputs:** Work index as hero + table-of-contents/links with instrument/dossier framing + registration marks; the 3-col `ProjectCard` grid removed. Establishes the per-row TOC pattern the case-study footer nav can echo.
**Scope boundary:** Does NOT touch `ProjectCard.tsx` (delete its usage here only), `HomePage`, `CaseStudyPageTemplate`, the constellation components, or `core/`. Reads case-study data, does not modify it.

### T4: Case-study shell — editorial spread rebuild
**Layer:** UI (`src/components/content/CaseStudyPageTemplate.tsx`, `renderSection.tsx` if the opener changes)
**Owner:** Tyrell (Impeccable `craft -> critique -> polish`)
**Branch:** `feat/conservatory-casestudy-shell`
**Commit prefix:** `feat(ui):`
**Inputs:** T1, T2.
**Outputs:** Standard case-study template as editorial spread — hero + TOC/links, per-project `DraftedObjectMark`, day/night dual mode. Canonical opener (cover panel + editorial type spread).
**Scope boundary:** Standard template ONLY. Does NOT touch `ConstellationPage` / `ConstellationField` / constellation variant logic (that path stays as-is), `WorkPage`, `HomePage`, `ProjectCard`, or `core/` data. Cover/mark art uses placeholders (Phase 3 supplies finals).

### T5: Home rebalance
**Layer:** UI (`src/pages/HomePage.tsx`, `src/components/content/Hero.tsx`, `src/components/content/ProjectCard.tsx`)
**Owner:** Tyrell (Impeccable `craft -> critique -> polish`)
**Branch:** `feat/conservatory-home-rebalance`
**Commit prefix:** `feat(ui):`
**Inputs:** T2 (may use primitives for cohesion). Independent of T3/T4.
**Outputs:** Rebalanced asymmetric biophilic Home — the busy/unbalanced "5 selected works + featured" composition resolved; hero composition tuned. Owns any `ProjectCard` restyle (sole owner of that file).
**Scope boundary:** Does NOT touch `WorkPage`, `CaseStudyPageTemplate`, constellation components, or `core/` data. No new data models.

### T6: Per-project accent re-map (biophilic palette)
**Layer:** Core (`core/content/case-studies.ts` metadata + test)
**Owner:** Tyrell (design-data; coordinate with Writer/Plan B — see collision flag)
**Branch:** `feat/conservatory-accent-remap`
**Commit prefix:** `feat(core):`
**Inputs:** T1 (accent token values must exist).
**Outputs:** Each case study mapped from the old magenta/brass/forest/oxblood accents to the biophilic palette; consumed by T4 covers/marks and T3/T5 swatches.
**Scope boundary:** Metadata accent field ONLY. Does NOT edit case-study prose/content (Plan B owns that), UI components, or tokens. Update `case-studies.test.ts` to match.

## Execution Order

**Parallel (start immediately):** T1
**After T1:** T2, T6 (T6 can run parallel to T2)
**After T2:** T3, T4, T5 (all three parallel — disjoint files)

**Critical path:** T1 -> T2 -> {T3 | T4 | T5} (3 sequential tiers). Minimum sprint length is the longest single surface rebuild after the foundation, not the sum.

## Done State

This mission is complete when:
- Work index renders as Field Notebook TOC (no 3-col card grid); case-study shell renders as editorial spread with a per-project mark in both modes; Home composition reads balanced and asymmetric.
- Green appears only as atmosphere/material; brass owns every interaction state; no hardcoded colors (all OKLCH tokens).
- WCAG 2.2 AA verified both modes; one `h1` per page; no em-dashes.
- `npm run lint`, `npm run build`, `npm run test` all green.
- Each surface passed Impeccable `critique`/`polish` and a Roy review before merge.
- All branches merged into `feat/conservatory-tokens` (NOT main).

## Open punch list (session TODO)

- **Type lock — DONE (2026-06-21).** Locked to Trio A "Atelier": **Fraunces**
  (display, full axis opsz+SOFT+WONK) / **Source Sans 3** (body + UI/nav) /
  **JetBrains Mono** (kicker). Validated live via `/impeccable live` on Home + a
  case study, both modes; Justin-approved. IBM Plex Sans was the first body
  candidate but read too Inter-adjacent; swapped to Source Sans 3 for humanist
  warmth. `--font-*` tokens swapped in `src/styles/globals.css` `@theme`
  (`--font-heading` aliased to the body sans, three-face spirit); dead faces
  (Space Grotesk, Didact Gothic) uninstalled; Podkova kept for the lab stack.
  Doctrine synced (DESIGN.md / PRODUCT.md / CLAUDE.md). Remaining: a tasteful
  Fraunces variable-axis instance (SOFT/WONK/opsz) is not yet dialed in —
  faces render at default instance, to be validated separately before any axis
  lock.

- **Cover plate framing — DONE (2026-06-21).** Reverted the flush+cover
  treatment everywhere (case-study shell, work-index featured entry, home
  featured spread). Covers now use a PADDED DossierFrame + `ImageBlock bare`
  with `object-contain`, so the image lives within the frame and the marks
  frame it from the margin. Home hero type column got a generous inset so the
  marks stop crowding the headline. Revisit cover (fill) vs contain when the
  Phase 3 atmospheric finals replace the screenshot placeholders.
- **Work-list rows → Option 3 (DONE):** thumbnail + title + subtitle +
  discipline trailing. Square specimen thumbnails are placeholder-aware; Wallace
  fills them in the Phase 3 imagery pass (need a `markImage`/thumb field on
  CaseStudy, or reuse the drafted-object mark renders).
- **Strengthen heroMetrics — DONE (heroMetric), partial (callouts) (2026-06-21).**
  Per-study `heroMetric` sharpened in `case-studies.ts`: instant-doc-review
  82% (zero analyst edits), instant-sow 20 → 2 min (observed), doctrine 2 days
  (brand refresh, doctrine to shipped); ai-leadership keeps 100% adoption,
  Wallace keeps "1 spec". Justin confirmed the IDR numbers real/shareable.
  REMAINING: weave the per-study Option-B numbers into body callouts during the
  conciseness pass (IDR kickback 40-45%→~30%, SOW 54%→45% error rate, doctrine
  2 contrast bugs, Wallace $0/render). Then promote metric-forward work-rows
  now that the numbers are strong.
- **Building This Portfolio — DRAFTED, awaiting Justin's edit pass (2026-06-21).**
  Justin gave narrative direction; Tyrell drafted into `building-this-portfolio.md`:
  opener evolved (product-judgment turn, "Option A"); three new chapters added
  (**The Recalibration** = tidy idea to Conservatory worldview + green inversion +
  circuit-texture removal; **The Field Notebook** = composition grammar, brief;
  **The Lab** = Perihelion, mission-first); crew-evolution node rewritten with the
  honest Builder-to-Tyrell story + Roy/Joi/Wallace named; peek bridges wired. The
  Sprint/Material left true-to-their-moment. NEXT: Justin edits the drafts, then
  Tyrell does voice-absorb (Joi) plus the conciseness pass.
- **Perihelion story + lab link (two-hop) — node DONE, lab link PENDING (2026-06-21).**
  The `the-lab`/"Perihelion" node is activated (`constellation.ts`, `status:
  'active'`, size md, wired into the graph) and now has a real story node (`The
  Lab` in `building-this-portfolio.md`, mission-first, Justin to refine). So the
  constellation node → Perihelion story hop is live. REMAINING (Tyrell): the
  lab-link affordance is currently a plain-text callout ("Step into the lab",
  `labs.justinh.design`); wire it as a real clickable CTA / external href once
  Justin settles the copy. That closes story → lab.
</content>
