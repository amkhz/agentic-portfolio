# Mission: Perihelion Library Welcome Pass + Lab Doctrine

**Feature:** Visitors arriving at `labs.justinh.design` are met by a library homepage that reads as inviting, inspiring, and exciting — a place to learn — without leaving the scholarly-adjacent dark-academic register. Lab doctrine is captured in `.impeccable.md` so all future Impeccable and Roy runs inherit the lab's design context.
**Date:** 2026-05-01
**Doctrine source:** ARCHITECTURE.md, CLAUDE.md, VECTOR.md, `.impeccable.md` (current portfolio-only state)
**Plan:** `plans/perihelion-next-steps.md` (Workstream A)
**Voice anchor:** `core/content/voice-profile.md` (Phase 3.1, locked 2026-04-30)
**Mission test:** *Opens the door, never gatekeeps.* Invitational posture. No obscure-as-flex, no SaaS hero tropes.
**ADRs referenced:** ADR-009 (subdomain architecture), ADR-010 (Perihelion rename) — both Accepted.
**Parent branch:** `feat/perihelion-library-welcome-pass`

---

## Constraint Check

**VECTOR.md constraints applied:**
- **WCAG 2.2 AA:** New component and layout massage must clear contrast on lab palette + per-guide accents; keyboard navigable; reduced-motion respected. Roy verifies.
- **Token colors only:** No raw hex in lab UI. All color via `design-system/lab-tokens.css` or `design-system/tokens.css` variables. Per-guide accents continue to flow via `--guide-accent` CSS custom property.
- **No em-dashes in copy:** MANIFESTO rewrite, welcoming-component copy, and `.impeccable.md` Perihelion section follow VECTOR.md hard constraint. Writer enforces; Roy double-checks.
- **Files under 200 lines:** New welcoming component decomposed if it would grow past the limit.
- **Heading hierarchy:** Library homepage already has one h1 (LibraryHeader). New component must not introduce a second h1; uses h2 or styled non-heading.

**Three-font note:** VECTOR.md's three-font constraint (Space Grotesk / Didact Gothic / Podkova) governs the **portfolio**. The **lab** runs its own locked three-font stack per ADR-009 (Podkova / Georgia / JetBrains Mono). This mission stays within the lab stack. No new fonts introduced.

**Architecture compliance:**
- Welcoming component lives in `src/lab/components/library/` (UI layer)
- No data fetching in components — pure UI, content imported from manifest
- `.impeccable.md` is project doctrine at repo root, not a code layer file — edits permitted as documentation work
- `plans/perihelion-next-steps.md` is plan-layer documentation — edit as final task

**No violations found.**

---

## Tasks

### T1: Add Perihelion section to `.impeccable.md`
**Layer:** doctrine (`.impeccable.md`)
**Owner:** Writer
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `docs:`
**Inputs:** None — can start immediately. References `core/content/voice-profile.md` (Phase 3.1) and `plans/perihelion-next-steps.md` for locked decisions.
**Outputs:** New "Perihelion" section appended to `.impeccable.md` after the existing portfolio sections. Covers:
- **Users (Perihelion):** dual audience — Justin himself + designers who haven't yet considered frontier science. Adjacent scholarly community (Sol Foundation, Visible College, Hyperstition).
- **Brand Personality (Perihelion):** scholarly-adjacent register, warm, serious, quietly witty. Inviting, inspiring, exciting — *and* a place to learn. Reader's notebook framing for content posture.
- **Aesthetic Direction (Perihelion):** dark-academic primary. Per-guide accent system. Three-font lab stack (Podkova / Georgia / JetBrains Mono). Sibling to portfolio, not a copy.
- **Anti-references (Perihelion):** obscure-as-flex naming (Wunderkammer / Syzygy / Orrery), SaaS hero sections, conventional "inspiring landing page" tropes, cold academic gatekeeping, anything demanding credentials to read.
- **Design Principles (Perihelion):** lab-specific principles layered on top of portfolio's five. Must include the **subliminal craft** principle: *the design is the plating, the content is the meal.* Visitors feel a seasoned designer's hand without being interrupted by it. The plate elevates the meal without competing with it. Distinct from the **content posture** ("reader's notebook, prep not product") which is about epistemic humility.

**Scope boundary:** This task does NOT modify the existing portfolio sections of `.impeccable.md`. Does NOT touch any code, plan, or vector file. Adds new content only.

**Details:**
- Match the existing tone and structure of `.impeccable.md` portfolio sections — h2 "Design Context (Perihelion)" with h3 subsections mirroring portfolio shape
- Mission test ("opens the door, never gatekeeps") must appear as a load-bearing principle, not a footnote
- Subliminal craft principle gets the dish/plate metaphor in prose, not just a bullet
- No em-dashes (use periods, semicolons, restructure)
- Word budget: comparable to the existing portfolio `.impeccable.md` block (~37 lines becomes ~70-90 lines after addition)

---

### T2: Expand and enhance MANIFESTO copy in `LibraryHeader.tsx`
**Layer:** UI (`src/lab/components/library/LibraryHeader.tsx`)
**Owner:** Writer
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `content:`
**Inputs:** None — can start immediately. Strongly informed by T1 once T1 lands; can run in parallel with T1 since both are Writer's lane and share the voice anchor.
**Outputs:** Replacement value for the `MANIFESTO` constant in `LibraryHeader.tsx`. New copy is more inviting, inspiring, and exciting; preserves the scholarly-adjacent register; passes the mission test (opens the door, never gatekeeps).

**Scope boundary:** This task ONLY modifies the `MANIFESTO` string constant. Does NOT touch the JSX structure, the surrounding paragraph, or any other component. Layout adjustments live in T5.

**Details:**
- Current MANIFESTO is one paragraph, ~70 words. New version may grow to 2-3 short paragraphs if the lift demands it; should not exceed ~150 words.
- Keep at least one phrase that names what the lab IS concretely (deep-dive research guides on frontier science) — invitation without context becomes mystique.
- No em-dashes
- Voice anchor: Phase 3.1 — problem-first, contractions always, conversational-professional, occasional punchy closer
- Test against: "would a designer who has never read a frontier-physics paper feel invited or excluded?"

---

### T3: Scaffold new welcoming component
**Layer:** UI (`src/lab/components/library/LibraryWelcome.tsx`, `src/lab/pages/LibraryIndex.tsx`)
**Owner:** Tyrell
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `feat:`
**Inputs:** None — can start immediately, parallel with T1 and T2.
**Outputs:**
- New `src/lab/components/library/LibraryWelcome.tsx` component, scaffolded with intentional placeholder copy (clearly marked, in voice register so the structural design reads correctly)
- Wired into `src/lab/pages/LibraryIndex.tsx` between `LibraryHeader` and `TerritoryGrid`
- Visual: structural composition that creates a welcoming moment after the manifesto and before the territory grid. Could be a small intro panel, a "what you'll find here" tile, an invitation to a starter guide, or another shape Tyrell proposes. Final shape decided during scaffold.
- Uses lab tokens only (`var(--lab-bg-surface)`, `var(--lab-text-primary)`, etc.); per-guide accents not used here (this is library-level chrome, not guide-level)

**Scope boundary:** This task does NOT touch `LibraryHeader.tsx` (T2 owns MANIFESTO; T5 owns header layout) or `TerritoryGrid.tsx`/`GuideCard.tsx` (T5 owns those). Does NOT add new design tokens. Does NOT introduce new fonts or weights. Does NOT add data fetching — content is static or imported from existing manifest.

**Details:**
- Component must be ≤200 lines
- WCAG 2.2 AA contrast on all text/background pairs
- Keyboard-navigable if interactive; focus styles via lab tokens
- `prefers-reduced-motion` respected on any entrance animation
- Heading: h2 only (h1 already taken by LibraryHeader)
- Placeholder copy: brief, in-register, clearly marked with `// TODO Writer T4` comment so the next task picks it up cleanly

---

### T4: Final copy for welcoming component
**Layer:** UI (`src/lab/components/library/LibraryWelcome.tsx`)
**Owner:** Writer
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `content:`
**Inputs:** T3 (scaffolded component exists)
**Outputs:** Placeholder copy in `LibraryWelcome.tsx` replaced with final, voice-tuned prose. `// TODO Writer T4` comment removed.

**Scope boundary:** This task ONLY edits text content in `LibraryWelcome.tsx`. Does NOT modify component structure, props, styling, or any other file.

**Details:**
- Voice anchor: Phase 3.1 + the locked Perihelion brand personality from T1's `.impeccable.md` addition
- Holds the "inviting + inspiring + exciting + a place to learn" posture without crossing into SaaS-cliché territory
- No em-dashes
- Word budget: depends on the structural shape T3 lands; aim for whatever the visual design supports cleanly

---

### T5: Layout massage across library homepage
**Layer:** UI (`src/lab/components/library/LibraryHeader.tsx`, `TerritoryGrid.tsx`, `GuideCard.tsx`, `src/lab/pages/LibraryIndex.tsx`)
**Owner:** Tyrell
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `feat:`
**Inputs:** T2 (final MANIFESTO copy), T4 (final welcoming component), so the layout massages real content not placeholders
**Outputs:**
- Tightened spacing rhythm between LibraryHeader, LibraryWelcome, TerritoryGrid
- Refined visual hierarchy across the three components — manifesto is the anchor, welcome is the invitation, territory grid is the menu
- Improved composition on TerritoryGrid (territory headers, guide cards) and GuideCard (hierarchy of title / kicker / source / status)
- Subtle motion improvements that respect `prefers-reduced-motion`
- All within the existing dark-academic palette and lab-token system

**Scope boundary:** This task does NOT introduce new design tokens, new fonts, light-mode work, or emoji-to-icon replacement (those belong to Workstream C). Does NOT add new components. Does NOT modify guide-page surfaces (this is library-homepage scope only). Does NOT change MANIFESTO copy or LibraryWelcome copy.

**Details:**
- Use `var(--lab-*)` tokens only for any color/border/spacing changes that need new variables — but prefer existing tokens
- Files must stay ≤200 lines after changes (TerritoryGrid is currently 153 lines — has headroom)
- Test on mobile (375px), tablet (768px), desktop (1280px+)
- One commit per file is preferred so the diff stays reviewable

---

### T6: Impeccable critique and polish pass
**Layer:** multi (`src/lab/components/library/*.tsx`, `src/lab/pages/LibraryIndex.tsx`, occasionally `design-system/lab-tokens.css` if a token gap surfaces)
**Owner:** Tyrell (running `/critique`, then `/polish`, optionally `/bolder` if energy lift is still short — anchored to lab register, not SaaS)
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `polish:`
**Inputs:** T5 (all visual changes landed)
**Outputs:**
- `/critique` run on the library homepage: assessment against the locked Perihelion design context (now in `.impeccable.md`), the mission test, voice-profile alignment
- `/polish` run: alignment, spacing, hierarchy, motion-rhythm fixes
- Fixes committed incrementally; each fix references its source finding

**Scope boundary:** This task does NOT add new features, new copy, or new components. Quality remediation only. Does NOT cross into Workstream C scope (light mode, icons).

**Details:**
- Anchor `/bolder` if used: "lift the energy without leaving the dark-academic register; no SaaS-hero tropes"
- Any token gaps surfaced get added to `design-system/lab-tokens.css` rather than via raw hex — but prefer existing tokens
- Roy review (post-mission) re-runs the doctrine check; this task is the design-quality pass

---

### T7: Plan update — mark Workstream A shipped, flip Workstream C posture
**Layer:** plan (`plans/perihelion-next-steps.md`)
**Owner:** Tyrell
**Branch:** `feat/perihelion-library-welcome-pass`
**Commit prefix:** `docs:`
**Inputs:** T1-T6 complete
**Outputs:**
- Workstream A entry updated to reflect shipped state (or moved to a "shipped this sprint" callout near the top, depending on plan structure)
- Workstream C entry updated: posture flips from "deferred until B is well underway" to "parallel with B (bounce between)"
- "Suggested sequence" section reflects the C-parallel-with-B move
- Locked Decisions table updated if any new decisions need capturing

**Scope boundary:** This task does NOT modify Workstream B, D, or E descriptions. Does NOT introduce new workstreams. Does NOT touch any other plan or roadmap file (`plans/roadmap.md` updates can come in a follow-up housekeeping commit if needed, scoped narrowly).

**Details:**
- Preserve the plan's voice and structure
- One commit; clean diff
- After this lands, the mission moves to `vector/missions/archive/` as part of merge cleanup (Director coordinates post-merge)

---

## Execution Order

```
Parallel (start immediately):
  T1   (.impeccable.md Perihelion section)        — Writer
  T2   (MANIFESTO rewrite)                         — Writer
  T3   (scaffold LibraryWelcome component)         — Tyrell

After T3:
  T4   (final copy in LibraryWelcome)              — Writer

After T2 + T4:
  T5   (layout massage)                            — Tyrell

After T5:
  T6   (Impeccable critique + polish pass)         — Tyrell

After T6:
  T7   (plan update)                               — Tyrell
```

**Critical path:** T3 → T4 → T5 → T6 → T7 (5 sequential tasks)

**Maximum parallelism:** At sprint start, three streams run simultaneously — T1 and T2 (both Writer, share voice anchor) and T3 (Tyrell). Writer can do T1 and T2 in either internal order. After T3 lands, T4 unblocks; after T2+T4 land, T5 unblocks.

**Collision watch:** T2 and T5 both touch `LibraryHeader.tsx`, but at different scopes — T2 is the MANIFESTO string only, T5 is structural/layout. T2 must commit before T5 starts to avoid merge friction. T3 and T5 both touch `LibraryIndex.tsx` — T3 wires the new component in, T5 may adjust ordering or spacing. T3 commits first, T5 builds on it. No two tasks edit the same lines.

---

## Done State

This mission is complete when:
- [ ] `.impeccable.md` has a Perihelion design context section covering Users, Brand Personality, Aesthetic Direction, Anti-references, and Design Principles for the lab
- [ ] Subliminal craft principle is captured in `.impeccable.md` with the plate/meal metaphor in prose
- [ ] `LibraryHeader.tsx` MANIFESTO is rewritten — more inviting, inspiring, exciting — register intact
- [ ] `LibraryWelcome.tsx` exists, wired into `LibraryIndex.tsx`, with final voice-tuned copy
- [ ] Library homepage layout is visibly tightened across LibraryHeader, LibraryWelcome, TerritoryGrid, GuideCard
- [ ] Impeccable `/critique` and `/polish` reports attached to commits or PR description
- [ ] `plans/perihelion-next-steps.md` reflects Workstream A as shipped and Workstream C posture as parallel-with-B
- [ ] No em-dashes in any copy added or modified
- [ ] Token colors only — no raw hex anywhere in the touched files
- [ ] All touched files ≤200 lines
- [ ] WCAG 2.2 AA: contrast verified on all new and changed surfaces; keyboard nav clean; reduced-motion honored
- [ ] One h1 on the library page (LibraryHeader); welcoming component uses h2 or non-heading
- [ ] `npm run lint` passes
- [ ] `npm run build` produces both `dist/index.html` and `dist/labs.html` cleanly
- [ ] `npm run test` passes
- [ ] Roy review attached, doctrine compliance verified, voice-profile alignment confirmed, mission test passed
- [ ] Branch merged to `main` via PR; mission file moved to `vector/missions/archive/` post-merge

---

## Flat Task List

```
T1  feat/perihelion-library-welcome-pass  "Add Perihelion section to .impeccable.md"
T2  feat/perihelion-library-welcome-pass  "Expand and enhance MANIFESTO copy in LibraryHeader.tsx"
T3  feat/perihelion-library-welcome-pass  "Scaffold new welcoming component (LibraryWelcome.tsx)"
T4  feat/perihelion-library-welcome-pass  "Final copy for LibraryWelcome.tsx"
T5  feat/perihelion-library-welcome-pass  "Layout massage across library homepage"
T6  feat/perihelion-library-welcome-pass  "Impeccable critique + polish pass"
T7  feat/perihelion-library-welcome-pass  "Plan update — Workstream A shipped, Workstream C parallel with B"
```

---

## Handoff Notes

**Where to start:** T1, T2, T3 can all start immediately. If running solo, the natural order is T1 → T2 → T3 (doctrine first so it informs the manifesto rewrite, manifesto rewrite second so the welcoming component knows the new register, scaffolding third). If running parallel, Writer claims T1+T2 across one or two sessions, Tyrell claims T3 in another.

**Doctrine-first principle:** T1 is *not* gating but it *anchors*. The Perihelion section in `.impeccable.md` is the canonical reference for every downstream design and content decision in this mission. Land it early; let everything else inherit it.

**Writer's lane extension:** Writer normally edits `core/content/*.md`. T1 and T4 extend Writer's lane to `.impeccable.md` and `src/lab/components/library/LibraryWelcome.tsx` respectively, because the prose IS the work. This is a deliberate, mission-scoped extension. Tyrell remains the file-editing owner for code-dominant tasks.

**Mission test as a real test:** "Opens the door, never gatekeeps" is not decoration. Run it on the manifesto rewrite, the welcoming component copy, the layout massage, and the Impeccable polish output. If a moment in the design feels like it requires credentials, fix it.

**When to escalate to Justin:**
- Welcoming component shape: Tyrell may propose two or three structural directions before committing scaffold. Show options if the right shape is not obvious.
- Tagline evolution: open question Q6 from `plans/perihelion-next-steps.md` — does the umbrella tagline ("closest approach to the frontier") need to evolve as part of the lift? Probably not in this mission, but flag if T2's manifesto rewrite makes the tagline feel mismatched.
- Layout massage tipping into Workstream C: if a fix really wants light-mode tokens or icon replacement, stop and surface it. That belongs to C, which now runs in parallel and can pick up the thread.

**After merge:**
- Run `invest-architecture` to verify the four-layer separation held through the welcoming component addition
- Director moves this mission file to `vector/missions/archive/`
- Director updates `plans/roadmap.md` shipped-block to reflect Workstream A landing
- Pitch-worthy item if the welcoming component lands well: "design context as doctrine — `.impeccable.md` extension to a sub-brand (Perihelion) without architectural drift"
