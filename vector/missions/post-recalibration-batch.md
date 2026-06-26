# Mission: Post-Recalibration Batch (Conservatory close-out)

**Feature:** Close the Conservatory (ADR-013) build — lock the new type stack, finish imagery, add a notes/posts content type with content folds, land the motion layer, and clear the outstanding loose ends — leaving justinh.design ship-ready end to end.
**Date:** 2026-06-24
**Branch root:** all work branches off `feat/conservatory-tokens` (NEVER `main`). Per-mission feature branches below; PR each mission into `feat/conservatory-tokens`, final Roy gate before that branch merges to `main`.
**Doctrine source:** ARCHITECTURE.md, CLAUDE.md, VECTOR.md, DESIGN.md (visual SoT, binds ADR-013)

This is a coordinated batch of five mission-groups (M1–M5), not one feature. Scoped together because they share files and a sequencing spine: **type (M1) is the spine — most visual work depends on the locked faces.**

## Constraint Check

**VECTOR.md / ARCHITECTURE.md constraints that apply:**

- OKLCH-only color via named tokens; no hex/rgb/named colors anywhere. WCAG 2.2 AA both modes (`scripts/wcag-check.py`).
- Three-face stack only (display / body sans / mono kicker); variable axes for *fit*, not animation. No fourth face.
- **Motion is a doctrine pillar** (VECTOR P4): ease-out-expo, no bounce/elastic, serves arrival/focus, respects `prefers-reduced-motion`. M4 implements what doctrine already mandates.
- Four-layer architecture (design-system → core → services → src); import direction one-way. Files < 200 lines (self-contained visual/animation components exempt).
- No em-dashes in copy. One `h1` per page; `h2 → h3` order. Imagery is a deliberate accent at anchors, never wallpaper; covers atmospheric, never flat panels.
- `npm run lint` + `npm run build` + `npm run test` green before any task is done. Lighthouse a11y 95+ (ship criterion) per surface.

**Violations found:** One pre-existing, fixed by this batch — **#5 side-stripe** (`QuoteBlock.tsx`, `CalloutBlock.tsx` use `border-l-[6px]` colored stripes; struck 2026-06-10, never implemented; Impeccable slop ban + Justin's "respect the ban" stance). Fixed in **T1d**, no doctrine exemption spent.

**Stale doctrine found:** ARCHITECTURE.md Stack (L62) + Styling (L214) and VECTOR.md P3 ("faces not yet locked") name the old stack. Synced in **T-L4** after the new lock lands.

---

## M1 — Type Stack v2 (THE SPINE — do first, unblocked)

Faces LOCKED to **Stack E: Hedvig Letters Serif (display) / Figtree (body) / JetBrains Mono (kicker)**, replacing the 2026-06-21 Fraunces/Source Sans 3 lock. T1a–T1c share `src/styles/globals.css` → **same branch `feat/type-v2`, single owner (Tyrell), sequential.** No parallel agents on globals.css.

### T1a: Swap faces + retire the dev harness

**Layer:** UI (`src/main.tsx`, `src/styles/globals.css` `@theme`)
**Owner:** Tyrell
**Branch:** `feat/type-v2`  **Commit prefix:** `feat(type):`
**Inputs:** None — start immediately.
**Outputs:** Hedvig + Figtree live across the site; the locked stack other tasks tune against.
**Steps:** install `@fontsource/figtree` (+ variable if published) and `@fontsource/hedvig-letters-serif`; swap imports in `main.tsx`; set `--font-display: 'Hedvig Letters Serif'…` / `--font-body: 'Figtree'…` in `globals.css` `@theme`; **remove the Fraunces axis-tuning block** (`globals.css` ~L144 — Hedvig has no opsz/SOFT/WONK); uninstall Fraunces + Source Sans 3; **delete `src/dev/fontPreview.ts` + its guarded import in `main.tsx`.**
**Scope boundary:** Does NOT touch `tokens.css`, component markup, or content. Font tokens stay in `globals.css` `@theme` (idiomatic Tailwind v4 home; the ADR-011 "migrate to tokens.css" aspiration is explicitly deferred — note in PR).

### T1b: Lighter body weight in dark mode

**Layer:** UI (`src/styles/globals.css`)
**Owner:** Tyrell  **Branch:** `feat/type-v2` (sequential after T1a)  **Commit prefix:** `feat(type):`
**Inputs:** T1a.
**Outputs:** `--body-weight` set per theme — night = lighter Figtree (~350–380) to counter humus-black bloom; `[data-theme="light"]` = normal (400). Drives the existing `body { font-weight: var(--body-weight…) }` hook (globals L133).
**Scope boundary:** `--body-weight` token + theme overrides only. No component or display-weight changes.

### T1c: `/impeccable typeset` tuning pass

**Layer:** UI / Design System (type scale, leading, weights — `globals.css`, component type classes)
**Owner:** Tyrell (`/impeccable typeset`)  **Branch:** `feat/type-v2` (sequential after T1b)  **Commit prefix:** `feat(type):`
**Inputs:** T1a, T1b.
**Outputs:** Hierarchy/sizing/weight/leading tuned for Hedvig+Figtree, both modes (Hedvig is single-weight display — verify headings read at its one weight; tune size/leading not weight). Hero, h1–h3, lede, body, kicker.
**Scope boundary:** Typographic properties only. No color, layout, or content changes.

### T1d: Fix #5 side-stripe (pull-quote + callout)

**Layer:** UI (`src/components/content/QuoteBlock.tsx`, `src/components/content/CalloutBlock.tsx`)
**Owner:** Tyrell  **Branch:** `feat/type-v2-sidestripe` (separate branch — different files, can run parallel to T1a–c)  **Commit prefix:** `fix(type):`
**Inputs:** T1a (wants the Hedvig italic for the re-proposal).
**Outputs:** The `border-l-[6px]` brass + green stripes removed; pull-quote/callout re-proposed under the side-stripe ban — Hedvig italic, hanging/oversized quotation mark, or indent + size shift. No PRODUCT.md exemption spent.
**Scope boundary:** These two components only. Does NOT touch other content components or tokens.

### T1e: Type-lock doctrine — DESIGN.md + ADR-013 amendment

**Layer:** Docs (`DESIGN.md`, `vector/decisions/ADR-013-*.md`)
**Owner:** Tyrell (+ `invest-adr` for the amendment)  **Branch:** `docs/type-v2-lock` (parallel-safe)  **Commit prefix:** `docs(type):`
**Inputs:** T1a (faces decided).
**Outputs:** DESIGN.md type lock updated to Stack E; an ADR-013 amendment recording the deliberate reopen of the 2026-06-21 lock + rationale (Fraunces read as an AI tell; Figtree-adjacent body wanted; Hedvig chosen for low-baggage display).
**Scope boundary:** DESIGN.md type section + ADR-013 only. Does NOT touch PRODUCT.md/VECTOR.md/ARCHITECTURE.md (that's T-L4, which sequences after this).

---

## M2 — Imagery Finals (parallel to M1; no type dependency)

### T2a: Wallace renders

**Layer:** Assets (`public/images/`)
**Owner:** Wallace (skill)  **Branch:** `feat/imagery-wallace`  **Commit prefix:** `feat(assets):`
**Inputs:** None (slot crops known from `image-punchlist.md`).
**Outputs:** `wallace-hero.png` (north-star atelier) + `design-infrastructure.png` (hub cover) at exact slot aspect/crop, atmospheric (never flat panel), `V4_QUALITY_48`, fixed seeds.
**Scope boundary:** Only the two Wallace-generatable assets. Does NOT capture the screenshot-class images (Justin owns those).

### T2b: Justin's captures (EXTERNAL dependency — not an agent task)

**Owner:** Justin (other machine).
**Outputs:** The 10 remaining missing screenshots + 8 hi-res replacements (the ~1400px `meta-*` set re-shot at 3840px) per `image-punchlist.md`. Drop into `public/images/<name>` — paths already referenced, so files auto-wire.
**Scope boundary:** Blocks T2c/T2d verification but not their setup.

### T2c: Wire + verify imagery

**Layer:** UI / Assets (`public/images/`, reference check across `core/content/`)
**Owner:** Tyrell  **Branch:** `feat/imagery-wire`  **Commit prefix:** `feat(assets):`
**Inputs:** T2a, T2b.
**Outputs:** All referenced images resolve (no broken paths); low-res `meta-*` replaced; visual sharpness eyeballed on the borderline set.
**Scope boundary:** Asset files + path verification. Does NOT rewrite alt text (T2d) or content prose.

### T2d: WCAG alt-text audit (new imagery)

**Layer:** Core (`core/content/case-studies.ts`, case-study `.md` figure captions)
**Owner:** Roy (or Tyrell)  **Branch:** `chore/imagery-a11y`  **Commit prefix:** `fix(a11y):`
**Inputs:** T2c.
**Outputs:** Every new image has descriptive, non-redundant alt text; WCAG 1.1.1 pass.
**Scope boundary:** Alt-text fields only. ⚠ **COLLISION: `case-studies.ts` + case-study `.md` also edited by M3 (T3f citations) and T2f (mark wiring).** Sequence T2d AFTER T3f + T2f, or coordinate — never parallel worktrees on those files.

### T2e: Per-project drafted-object mark SET

**Layer:** Assets (`public/images/`)
**Owner:** Wallace (skill)  **Branch:** `feat/imagery-marks`  **Commit prefix:** `feat(assets):`
**Inputs:** the per-project **object identity** per study (Justin provides, or Wallace proposes a candidate object per project for approval) + the locked shared recipe. Decided 2026-06-24: the FIG.0X work-index squares + the case-study plates ARE these marks, and Wallace generates them (resolves T-L3).
**Outputs:** one mark per case study (~5), rendered as a **visual family** — modern technical-schematic "drafted fantastical object" on natural paper, NOT steampunk/patent (per `plans/recalibration-sprint0-notes.md` + `feedback_imagery_restraint` / `feedback_no_flat_color_covers`). Two crops per project: **square** (work-index `Thumb` in `TocLinkList`) + **4:5 plate** (`DraftedObjectMark`). Fixed seeds; consistent palette/paper/line-treatment so the set reads as one system.
**Process:** render ONE reference mark first → Justin approves the language → batch the rest with seed discipline.
**Scope boundary:** Mark renders only. Does NOT wire them into data/UI (T2f) and does NOT touch hero/cover images (T2a).

### T2f: Wire per-project marks into data + slots

**Layer:** Core + UI (`core/content/case-studies.ts`, `src/pages/WorkPage.tsx`, `src/components/content/CaseStudyPageTemplate.tsx`)
**Owner:** Tyrell  **Branch:** `feat/marks-wire`  **Commit prefix:** `feat(core):`
**Inputs:** T2e.
**Outputs:** a `mark?: { src; alt }` field on the `CaseStudy` interface + per-study values; `WorkPage` row `thumbnail.src` and the shell `DraftedObjectMark.src` pointed at the renders; `case-studies.test.ts` updated if the model changes. Slots are already placeholder-aware (`isRealImage()` guard in `DraftedObjectMark`/`Thumb`), so this is additive — no component refactor.
**Scope boundary:** Model field + src wiring + test. Does NOT restyle the slot components. ⚠ COLLISION: edits `case-studies.ts` — sequence in the case-studies.ts chain (after T3a/T3b/T3f), coordinate with T2d.

---

## M3 — Notes/Posts + Content Folds

### T3a: Notes/posts content-type infrastructure

**Layer:** Core + UI (`core/content/` parser/registry, `src/pages/` + route, minimal `design-system` if a post layout token is needed)
**Owner:** Tyrell (infra)  **Branch:** `feat/notes-content-type`  **Commit prefix:** `feat(core):`
**Inputs:** A content-type ADR decision (registry shape: extend `case-studies.ts` pattern vs a new `posts.ts` + `parse-post.ts`). Spin a quick `invest-adr` first.
**Outputs:** A notes/posts type the portfolio can render (it has none today) — parser, registry, route, list + detail surfaces. Unlocks T3b.
**Scope boundary:** Infra + empty-state surfaces only. Does NOT write post prose (T3b). Follows four-layer order (tokens → core → ui).

### T3b: Posts prose — manifesto + Five Ways + 2026 retro

**Layer:** Core (`core/content/`)
**Owner:** Writer  **Branch:** `feat/posts-content`  **Commit prefix:** `feat(content):`
**Inputs:** T3a (needs the content type).
**Outputs:** "Design infrastructure, not just designs" manifesto; "Five Ways I Work" (from `practice.md`); 2026 retrospective (from `wins.md`). Joi voice; no em-dashes; no permission/gatekeeper framing; anonymize internal names (Matt/Caro/Brenno) + internal product names.
**Scope boundary:** Post prose only. No infra, no UI.

### T3c: Kiavi "what I've built" body-of-work layer ✅ DONE 2026-06-25

> **IA decision (2026-06-25, Justin):** the "what I've built at Kiavi" content does NOT live as an About-page subsection. It would get buried at the wrong altitude, and a standalone case study would duplicate the existing deep dives. **It lives on the `design-infrastructure` hub** — the surface already built for this exact one-liner ("I build design infrastructure, not just designs") — as a breadth layer ("Beyond Workshops") below the two doors. Items with a deep dive link out; items without stand as stated scope. About keeps only a short pointer (folds into T3d). The same one-liner still feeds the T3b manifesto post as the *argument* form (hub = index, post = narrative).

**Layer:** Core + UI (`core/content/case-studies.ts` `hub.bodyOfWork` model + data; `src/components/content/HubPageTemplate.tsx` render)
**Owner:** Tyrell (model + UI) + Writer/Joi (prose)  **Branch:** `feat/kiavi-body-of-work`  **Commit prefix:** `feat(core):`
**Inputs:** `practice.md` "what he's built" section (in `port-sources/`).
**Outputs:** ✅ `bodyOfWork` block (heading + intro + 6 items) on `design-infrastructure`, anonymized/generalized (internal codenames + teammate names dropped; Kiavi + instant-doc-review public, kept), Writer-refined + Joi voice-audited. Optional `hub.bodyOfWork` field added to the `CaseStudy` model. lint/build/test green.
**Scope boundary:** Hub model + data + render. About pointer deferred to T3d. ⚠ COLLISION: edits `case-studies.ts` (see flag #2).

### T3d: About / Resume visual register pass

**Layer:** UI (`src/pages/AboutPage.tsx`, `src/pages/ResumePage.tsx`, `src/components/content/AboutSnippet.tsx`)
**Owner:** Tyrell  **Branch:** `feat/about-resume-register`  **Commit prefix:** `feat(ui):`
**Inputs:** M1 (new faces). (T3c no longer adds an About subsection — instead About gets a short pointer into the `design-infrastructure` hub, authored as part of this register pass.)
**Outputs:** About/Resume brought to the Conservatory register + Hedvig/Figtree (the Plan A Phase 4 deferral). Long-form essay treatment, kicker/metadata in margin. Add the short "what I've built" pointer to the hub.
**Scope boundary:** About/Resume surfaces only. (T3c↔T3d About collision dissolved by the IA decision — T3c now lives on the hub.)

### T3e: instant-dscr case study (STRETCH / optional)

**Layer:** Core (`core/content/`)  **Owner:** Writer  **Branch:** `feat/instant-dscr-study`  **Commit prefix:** `feat(content):`
**Inputs:** Justin's go/no-go (meaty enough?).
**Outputs:** New case study — the screen-polish harness ("build the workflow, then run it"). Defer if the batch is tight.
**Scope boundary:** One new study; new slug in `case-studies.ts`.

### T3f: PR/ADR citations into existing studies

**Layer:** Core (`core/content/doctrine-not-prompts.md`, `core/content/instant-doc-review.md`)
**Owner:** Writer  **Branch:** `feat/study-citations`  **Commit prefix:** `feat(content):`
**Inputs:** **Justin verifies PR/ADR numbers before publish** (working-memory, not yet confirmed).
**Outputs:** Citations woven in where `wins.md` supplies them.
**Scope boundary:** Those two `.md` files. ⚠ COLLISION with T2d on case-study content — sequence T3f → T2d.

---

## M4 — Motion Pass (FAST-FOLLOW — sequence LAST, after type + surfaces settle)

### T4a: Motion tokens

**Layer:** Design System (`design-system/tokens.css`)
**Owner:** Tyrell  **Branch:** `feat/motion-tokens`  **Commit prefix:** `feat(tokens):`
**Inputs:** None mechanically, but hold until surfaces are stable so durations tune against final layouts.
**Outputs:** Duration + ease-out-expo easing tokens; `prefers-reduced-motion` strategy. Foundation for T4b.
**Scope boundary:** Motion tokens only. No component motion here.

### T4b: Surface motion choreography

**Layer:** UI (`src/components/effects/`, `src/pages/`)
**Owner:** Tyrell + **interface-craft suite** (Storyboard Animation DSL + **DialKit** live timing/easing sliders) + Impeccable Motion to help identify animation candidates.  
**Branch:** `feat/motion-surfaces`  **Commit prefix:** `feat(ui):`
**Inputs:** T4a; M1; existing surfaces.
**Outputs:** Section-reveal fades, hover weight/axis shift, subtle cover parallax, case-study entry page-transition choreography, subtle atmospheric effects — "one ambitious motion moment per major surface." Uses `motion/react` (in stack). No bounce/elastic/scroll-jacking; respects reduced-motion, prefers wave functions to drive natural animations.

**Scope boundary:** Motion only — no layout/type/color changes. `RevealOnScroll`/`GlowEffect` can be refreshed or reinvented.

### T4c: interface-craft Design Critique on motion

**Owner:** Tyrell/Roy  **Inputs:** T4b. Backup: `/impeccable animate` for any surface that lands flat.

---

## M5 — Loose Ends (small tasks + gates)

- **T-L1 Wordmark/header** — re-evaluate the "Justin Hernandez" header as a display moment in Hedvig (NOT hand-lettered); `/impeccable live` variants. Layer: UI (`src/components/layout/Header.tsx`). Owner: Tyrell. Branch: `feat/wordmark`. Inputs: M1.
- **T-L2 Drop-caps call** — Justin's one-line decision (collision #4, never closed). Recommendation: **strike** (Field Notebook + slop bans + Perihelion already owns a sigil drop cap; sibling-not-copy). Resolve BEFORE any case-study-shell type work. Decision item, not code.
- **T-L3 Per-project mark system — decision record (lightweight ADR).** RESOLVED 2026-06-24 (Justin): the mark system = **Wallace-generated "drafted fantastical object" specimens, one per project**, rendered into the existing placeholder-aware slots (`Thumb` square on the work index, `DraftedObjectMark` 4:5 plate on case-study shells). No new component system needed — the slots already shipped in the Conservatory-surfaces mission. ADR just records the decision + the shared render recipe + the per-project object list. **The render work is now T2e; the wiring is T2f.** Owner: Dreamer → `invest-adr` (short). Branch: `docs/mark-system-adr`. Parallel-safe.
- **T-L4 Doctrine sync to ADR-013** — PRODUCT.md + VECTOR.md (P3 "faces not yet locked" → locked Stack E) + **ARCHITECTURE.md (Stack L62 + Styling L214, stale "Fraunces/Geist")** → Conservatory + locked faces. Owner: Tyrell/Director. Branch: `docs/doctrine-sync-adr013`. ⚠ Sequence AFTER T1e (type lock) so it references the locked faces.
- **T-L5 Lighthouse 95+** — carry as a per-surface PR gate, not a task.
- **T-L6 Impeccable critique + polish (final design QA)** — a scored `/critique` pass across the touched surfaces (Nielsen table, P0–P3, slop detector, persisted snapshot), then `/polish` consuming that snapshot as its backlog (P0/P1 first). Owner: Tyrell (Impeccable). Branch: `polish/final-design-qa`. Sequenced AFTER all build work + Lighthouse, BEFORE Roy — Impeccable catches the design-craft gaps; Roy then reviews against doctrine/architecture with a clean surface.
- **T-L7 Roy final review** — full review vs ADR-013 (last was "SHIP WITH NOTES" 2026-06-21; confirm notes actioned). Owner: Roy. **Final gate before `feat/conservatory-tokens` → `main`.**

---

## Execution Order

**Start immediately (parallel):**

- M1 `feat/type-v2` (T1a → T1b → T1c sequential) **+** `feat/type-v2-sidestripe` (T1d) **+** `docs/type-v2-lock` (T1e)
- M2 T2a (Wallace heroes) **+** T2b (Justin captures, external) **+** T2e (Wallace mark set — once the per-project object list is settled)
- M3 T3a (notes infra — after its quick content-type ADR), T3c (About copy)
- M5 T-L3 (mark decision-record ADR)

**After M1 lands:**

- T-L4 (doctrine sync — needs T1e) ; T-L1 (wordmark — needs Hedvig) ; T3d (About/Resume register — needs faces + T3c) ; T3b (posts prose — needs T3a)

**After imagery in (T2a+T2b+T2e):** T2c, then the `case-studies.ts` chain: T3f → T2f (mark wiring) → T2d (alt text)

**Last:** M4 motion (T4a → T4b → T4c) → **T-L6 Impeccable critique + polish** → **T-L7 Roy gate** → merge `feat/conservatory-tokens` → `main`

**Critical path:** T1a → T1b → T1c (type spine) → T3d/T-L1 (surfaces on new faces) → T4a → T4b → T4c (motion) → T-L6 (Impeccable critique + polish) → T-L7 (Roy) → main. Motion is gated last by design; the spine is the type chain; the two final gates are design-craft (Impeccable) then doctrine (Roy).

## Cross-Mission Collision Flags

1. `**src/styles/globals.css`** — T1a/T1b/T1c. Single branch `feat/type-v2`, sequential, one owner. Never parallel.
2. **`core/content/case-studies.ts` + case-study `.md`** — T3f (citations), T2f (mark wiring), T2d (alt text), T3b/T3a (registry). Chain: T3a → T3b/T3f → T2f → T2d. No parallel worktrees on these files.
3. `**vector/decisions/ADR-013` + `DESIGN.md**` — T1e (type amendment) vs T-L4 (broad sync). Sequence T1e → T-L4.
4. `**src/pages/AboutPage.tsx**` — T3c (copy) vs T3d (register). Same branch or T3c → T3d.
5. `**tokens.css**` — only T4a (motion). M1 font tokens live in `globals.css` `@theme`, so no collision.

## Done State

Complete when:

- Hedvig/Figtree/JetBrains live both modes; dark-mode body weight tuned; `/impeccable typeset` pass done; #5 side-stripes gone; DESIGN.md + ADR-013 + PRODUCT/VECTOR/ARCHITECTURE all synced to the new lock.
- All `image-punchlist.md` images present (no broken refs), low-res replaced, alt text WCAG-clean; the per-project Wallace mark set renders in the FIG slots + case-study plates (no placeholders).
- Notes/posts type ships with ≥1 post; About has the Kiavi subsection in the new register; citations verified before publish.
- Motion layer landed per VECTOR P4 (ease-out-expo, reduced-motion respected, one ambitious moment per surface).
- Loose ends closed: wordmark, drop-caps call recorded, mark-system decision-record ADR written, Lighthouse 95+ per surface.
- `npm run lint` + `npm run build` + `npm run test` green; Impeccable critique + polish gate cleared, then Roy final review passed; merged to `main`.

