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
**Scope boundary:** Alt-text fields only. ⚠ **COLLISION: `case-studies.ts` + case-study `.md` also edited by M3 (T3f citations).** Sequence T2d AFTER T3f, or coordinate — never parallel worktrees on those files.

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

### T3c: About-page "What I've built at Kiavi" subsection

**Layer:** Core (`core/content/` — About copy)
**Owner:** Writer  **Branch:** `feat/about-kiavi-section`  **Commit prefix:** `feat(content):`
**Inputs:** None (source = `practice.md` eight deliverables).
**Outputs:** ~200–300 word subsection, anonymized/generalized. Joi voice.
**Scope boundary:** About copy only. ⚠ Coordinates with T3d (same surface).

### T3d: About / Resume visual register pass

**Layer:** UI (`src/pages/AboutPage.tsx`, `src/pages/ResumePage.tsx`, `src/components/content/AboutSnippet.tsx`)
**Owner:** Tyrell  **Branch:** `feat/about-resume-register`  **Commit prefix:** `feat(ui):`
**Inputs:** M1 (new faces), T3c (new copy to lay in).
**Outputs:** About/Resume brought to the Conservatory register + Hedvig/Figtree (the Plan A Phase 4 deferral). Long-form essay treatment, kicker/metadata in margin.
**Scope boundary:** About/Resume surfaces only. ⚠ COLLISION with T3c on About — same branch or sequence T3c→T3d.

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
- **T-L3 Per-project mark SYSTEM ADR** — the `DraftedObjectMark` slot primitive exists; the bespoke-per-project mark system is still undesigned. Owner: Dreamer → `invest-adr`. Branch: `docs/mark-system-adr`. Parallel-safe.
- **T-L4 Doctrine sync to ADR-013** — PRODUCT.md + VECTOR.md (P3 "faces not yet locked" → locked Stack E) + **ARCHITECTURE.md (Stack L62 + Styling L214, stale "Fraunces/Geist")** → Conservatory + locked faces. Owner: Tyrell/Director. Branch: `docs/doctrine-sync-adr013`. ⚠ Sequence AFTER T1e (type lock) so it references the locked faces.
- **T-L5 Lighthouse 95+** — carry as a per-surface PR gate, not a task.
- **T-L6 Roy final review** — full review vs ADR-013 (last was "SHIP WITH NOTES" 2026-06-21; confirm notes actioned). Owner: Roy. **Final gate before `feat/conservatory-tokens` → `main`.**

---

## Execution Order

**Start immediately (parallel):**

- M1 `feat/type-v2` (T1a → T1b → T1c sequential) **+** `feat/type-v2-sidestripe` (T1d) **+** `docs/type-v2-lock` (T1e)
- M2 T2a (Wallace) **+** T2b (Justin captures, external)
- M3 T3a (notes infra — after its quick content-type ADR), T3c (About copy)
- M5 T-L3 (mark ADR)

**After M1 lands:**

- T-L4 (doctrine sync — needs T1e) ; T-L1 (wordmark — needs Hedvig) ; T3d (About/Resume register — needs faces + T3c) ; T3b (posts prose — needs T3a)

**After imagery in (T2a+T2b):** T2c → then T3f → then T2d (case-studies.ts collision chain)

**Last:** M4 motion (T4a → T4b → T4c) → **T-L6 Roy gate** → merge `feat/conservatory-tokens` → `main`

**Critical path:** T1a → T1b → T1c (type spine) → T3d/T-L1 (surfaces on new faces) → T4a → T4b → T4c (motion) → T-L6 (Roy) → main. Motion is gated last by design; the spine is the type chain.

## Cross-Mission Collision Flags

1. `**src/styles/globals.css`** — T1a/T1b/T1c. Single branch `feat/type-v2`, sequential, one owner. Never parallel.
2. `**core/content/case-studies.ts` + case-study `.md**` — T3f (citations), T2d (alt text), T3b/T3a (registry). Chain: T3a → T3b/T3f → T2d. No parallel worktrees on these files.
3. `**vector/decisions/ADR-013` + `DESIGN.md**` — T1e (type amendment) vs T-L4 (broad sync). Sequence T1e → T-L4.
4. `**src/pages/AboutPage.tsx**` — T3c (copy) vs T3d (register). Same branch or T3c → T3d.
5. `**tokens.css**` — only T4a (motion). M1 font tokens live in `globals.css` `@theme`, so no collision.

## Done State

Complete when:

- Hedvig/Figtree/JetBrains live both modes; dark-mode body weight tuned; `/impeccable typeset` pass done; #5 side-stripes gone; DESIGN.md + ADR-013 + PRODUCT/VECTOR/ARCHITECTURE all synced to the new lock.
- All `image-punchlist.md` images present (no broken refs), low-res replaced, alt text WCAG-clean.
- Notes/posts type ships with ≥1 post; About has the Kiavi subsection in the new register; citations verified before publish.
- Motion layer landed per VECTOR P4 (ease-out-expo, reduced-motion respected, one ambitious moment per surface).
- Loose ends closed: wordmark, drop-caps call recorded, mark-system ADR written, Lighthouse 95+ per surface.
- `npm run lint` + `npm run build` + `npm run test` green; Roy final review passed; merged to `main`.

