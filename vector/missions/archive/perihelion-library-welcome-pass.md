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

#### T2.5 — MANIFESTO rewrite landed (2026-05-02, Writer)

Quick session with Writer to tighten and harmonize with the welcome's "we" hand-off. Justin took the pen mid-session and finished the rewrite. Two voice fixes applied before commit: hyphen-with-spaces split into a period (em-dash equivalent forbidden by VECTOR.md), `what is` contracted to `what's` in the 4th sentence (contractions-always rule). Final version (~117 words):

> "The future is already here. It's just not very evenly distributed. It's being built and shaped in peer-reviewed papers, NSF-funded labs, and private money think tanks. The kind of work that often happens in the dark, on the cutting edge of what's possible. This library is where I'm learning about it: deep-dive guides on the science behind vacuum engineering, UAP detection, and consciousness as technology. Science fiction becoming engineered reality. Written for designers who haven't found a reason to look here yet, but might. A reader's notebook, prep not product. We learn today to build for tomorrow. Pull up a chair."

Notes for downstream:
- The collective `We learn today to build for tomorrow` aphorism sets up the welcome's `We show up ready to design the future we want` (Note 01) as a continuation rather than a swerve.
- `Science fiction becoming engineered reality` is a stakes-landing move (Phase 2 / 3.1). It carries the declarative-clarity beat where the key idea drops.
- `private money think tanks` widens the funding picture beyond pure academia — adds heat, names a real shape of frontier work.

**Carried into T5 (layout massage) for consideration, not T2.5 scope:**
- The MANIFESTO renders as a single `<p>`. Justin's draft used paragraph breaks. T5 should decide whether to render as a single paragraph, split into 2-3 paragraphs (would require minor JSX change to map across an array), or keep as one with rhythm carried by sentence cadence alone.
- ~~Closing line `Pull up a chair.` may want to be dropped or made more concise depending on the layout shape T5 lands.~~ **Resolved in T4 (2026-05-03):** the manifesto trim happened during T4 instead of T5. Two sentences removed (`A reader's notebook, prep not product.` and `We learn today to build for tomorrow.`); `Pull up a chair.` retained as the closer.

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

#### Review Notes — 2026-05-02 (direction lock)

Three structural directions were proposed and visualized in Paper:
- **A — Reading Room** (single curated front-desk card, brass left rule, recommended starter guide with rationale)
- **B — Field Notes** (orientation triptych: three coequal panels under a "Field Notes" header, mono numerals 01/02/03, Podkova micro-headlines, Georgia body)
- **C — Working Principle** (atmospheric breath: large italic Georgia statement on lab-textured slab with marginalia column)

**Chosen direction: B — Field Notes triptych.** It does the most welcome-pass work: three concrete entry points, doctrinal posture, hospitable, no "starter pick" lock-in. Reads as an intro plaque, not a CTA.

**Justin's text edits in the Paper mockup (carry into scaffold placeholder):**

| Slot | Mockup default | Justin's edit |
|---|---|---|
| Section lede (right of "Field Notes" rule) | Three things to know before you browse | Design Resources for the Frontier |
| Note 01 kicker | Why I read these | What this is |
| Note 01 headline | A designer's preparation for work that doesn't exist yet. | A designer's preparation for work that's almost here. |
| Note 01 body | The frontiers I'm reading toward — vacuum engineering, UAP detection, consciousness as technology — will need designers. I'd rather show up ready than catch up later. | The frontiers in these guides — vacuum engineering, UAP detection, consciousness as technology — will need to be designed for all of us. We show up ready to design the future we want. |
| Note 02 kicker | How the guides work | (unchanged) |
| Note 02 headline | A primary source, walked. Not summarized. | Primary sources, walked. Not summarized. |
| Note 02 body | Each guide takes a paper or a brief and walks the reasoning end to end. Citations stay close to the claim. You can follow a footnote and check my work. | Each guide takes a paper or a brief and walks the reasoning end to end. Citations stay close to the claim. Definitions are provided in context. Follow a footnote, check the work. |
| Note 03 kicker | How to read along | (unchanged) |
| Note 03 headline | No prerequisites. Pick anything that pulls you in. | No prerequisites. Pick what pulls you in. |
| Note 03 body | The territories aren't sequential. Skim a kicker, follow your curiosity, leave when you've had enough. The library grows roughly monthly. | The territories aren't sequential. Follow your curiosity, leave when you've had enough. The library grows roughly monthly. Applied research to come. |

> Mockup typos cleaned up in this table (`contecxt`, `ollow`); the Paper file still shows them. Hyphens in body copy normalized to em-dashes here for readability of the source quote — but T4 must restore them to non-em-dash punctuation per VECTOR.md.

**Posture shifts implied by Justin's edits — guidance for T4:**
- **Kicker text-only edits**: kickers were rewritten for clarity (`Why I read these → What this is`; the other two unchanged). All three kickers share the same UI treatment (uppercase mono-tracking, brass numeral). No styling difference between Note 01 and the others.
- **"Design Resources for the Frontier"** as the section lede names the function directly. Reads less like a doctrinal preamble, more like a shelf label.
- **"We" framing in Note 01 includes Justin** — clarified 2026-05-02. The "we" is not "the author's reading vs. the audience's reading"; it's "designers, with me among them, who want to be ready for the work that's almost here." The library is a shared bench, not a one-way window. T4 should keep that hand-off intact and avoid sliding back into "the author's prep."
- **Manifesto rewrite scheduled** — confirmed 2026-05-02. The current MANIFESTO reads as rough; opens T2.5 to tighten it and harmonize with the welcome's "we" hand-off (or deliberately let the welcome be the moment the frame opens). See T2.5 below.
- **"Applied research to come"** at the end of Note 03 quietly hooks Perihelion Works without naming it. Forward-looking; preserves the two-arm story without committing to a date.
- **"Definitions are provided in context"** in Note 02 lowers the entry bar explicitly. Reinforces the mission test ("opens the door, never gatekeeps").

**Scaffold implications for T3:**
- Section uses a `Field Notes` mono kicker + hairline rule + lede on the right side; lede sits in mono small caps to balance the kicker's weight.
- Three coequal panels in a `grid-cols-1 md:grid-cols-3` layout, top-border hairlines on each panel, surface = `var(--lab-bg-surface)`.
- Each panel: brass mono numeral (`01` / `02` / `03`) + mono kicker label, Podkova h3 micro-headline, Georgia body paragraph.
- Brass accent on the numerals only — no brass on borders, no brass on links (this is library chrome, not a link surface).
- Placeholder copy in scaffold uses Justin's edited strings above so T4 starts from a near-final base; `// TODO Writer T4` comment marks the file for the final voice pass.

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

#### T4 landed — 2026-05-03 (Writer)

Voice pass on the three NOTES strings plus the carried-over manifesto trim, single Writer session. Note 01 body collapses the parenthetical domain list (already named in the manifesto) into `Work like this will need to be designed for all of us.`; closer `We show up ready to design the future we want.` retained as the collective hand-off. Note 02 swaps the passive `Definitions are provided in context` for the active `Definitions live in context`. Note 03 drops the redundant `The library grows roughly monthly` (covered by LibraryHeader's cadence paragraph), preserves `Applied research to come` as the Perihelion Works hook. TODO comment block removed. Manifesto trim shipped in same session — see T2.5 carry-over above.

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

#### T5 landed — 2026-05-03 (Tyrell)

Layout massage closed across seven micro-passes, each its own commit so the diff stays reviewable:

| Pass | Commit | What |
|---|---|---|
| (drop) | `97b8a9f` | Removed CommunityStrip ("Adjacent to the work of Sol Foundation, The Visible College, and Hyperstition.") and deleted the component file. Content to be relocated in a future pass. |
| T5a | `18ebd74` | Split MANIFESTO into 3 paragraphs (setting → library → invitation) using `mt-8`/`mt-4` rhythm. Dropped redundant guide count from the stats line so it reads "X papers cited · Y briefs walked". |
| T5b | `2ccfbeb` | Equalized header→welcome and welcome→grid gaps to `mt-20 md:mt-28`. The 80/112 px gap between major sections also matches TerritoryGrid's `space-y-20` between territories — nested rhythm at two scales. Per /arrange recommendation. |
| T5d | `5baf883` | Dropped the redundant "Territory" mono kicker above each territory's lifecycle word. Badge + lifecycle now form a single horizontal pair. |
| T5c | `4077730` | Dropped the cadence paragraph in LibraryHeader ("The library grows as I read…"). Redundant with the upcoming-guide cards in TerritoryGrid; the hard-coded "Five more" was prone to drift. |
| T5e | `57c3683` | Aligned welcome triptych responsive cascade with TerritoryGrid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Fixes tablet readability and creates a 2+1 asymmetry beat at md width. Surfaced by /layout audit. |
| T5f | `2f82fb7` | Dropped the `labs.justinh.design` URL kicker above the h1. URL is in the address bar; the kicker added technical-flavored text without serving the scholarly-adjacent register. |

**Plus content commit `75e1eb2`** (Justin's Note 01 body refinement: `A world with this technology needs to be designed for all of us. We'll show up ready to design the future we deserve.`) — captured here for the record.

**Carry-overs to T6:**
- /critique pass against `.impeccable.md` Perihelion design context (mission test: opens the door, never gatekeeps)
- /polish for any alignment/spacing micro-issues
- Optional /bolder if energy lift still feels short — anchored to lab register, not SaaS hero
- Subtle motion (T5 originally scoped this but it falls more naturally into T6 polish): entrance fades on cards, hover refinements, `prefers-reduced-motion` gate

T5 originally scoped GuideCard hierarchy refinements (pass "e" in Tyrell's plan); on review the existing card was solid and Justin called the skip. If T6 critique surfaces card-level issues, address in the polish pass.

---

### T6: Impeccable critique and polish pass
**Layer:** multi (`src/lab/components/library/*.tsx`, `src/lab/pages/LibraryIndex.tsx`, occasionally `design-system/lab-tokens.css` if a token gap surfaces)
**Owner:** Tyrell (running `/critique`, then `/polish`, optionally `/bolder` if energy lift is still short — anchored to lab register, not SaaS)
**Branch:** `feat/perihelion-library-t6-polish` (cut fresh off `main` after PR #40 + #41 merged; original mission's parent branch was `feat/perihelion-library-welcome-pass` which was already merged at T6 start)
**Commit prefix:** `polish:` / `feat:`
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

#### T6 landed — 2026-05-03 (Tyrell)

`/critique` surfaced 1 P1 + 3 P2 findings against `.impeccable.md` Perihelion design context. T6 split into five sub-passes, one branch (`feat/perihelion-library-t6-polish`), one commit per pass.

| Pass | Commit | What |
|---|---|---|
| T6.1 | `2788e36` | TerritoryBadge pulse: viewport-gated via `useInView` (once: true), runs three cycles ~5s each, then settles at lowest opacity. Heartbeat, not strobe. Reduced-motion users continue to see the static badge with no ring. Resolves the "infinite-loop motion competing for attention" P2 finding. |
| T6.2 | `3d864e0` | New `PerihelionSigil` component: tilted 45° elliptical orbit with brass perihelion dot + dim aphelion micro-dot, gradient stroke (dim apoapsis → brass periapsis), soft outer bloom + dot halo for holographic edge. Rendered as illuminated-initial drop cap floated at the start of the manifesto. The whole 3-paragraph manifesto block fades up together (500ms), then the orbit draws in (520ms), then the perihelion dot pops with a slight overshoot. `prefers-reduced-motion` renders fully drawn and static. Resolves the "first screen text-only" P2 finding. |
| T6.3 | `376bd33` | Drop the `dirdBriefsWalked` metric line from `LibraryHeader.tsx`. Add a small `<details>` colophon affordance ("+ On the source corpus") below the metadata that unfurls a one-paragraph gloss naming DIRD and broadening the corpus picture. Native details, keyboard-accessible by default, custom marker rotates 45° on open. Copy is `TODO Writer` placeholder for refinement in a Writer session. Resolves the P1 mission-test finding. |
| T6.4 | (PARKED) | Attempted GuideCard hover refinement — staggered cascade durations (240/480/560/640ms) plus accent-tinted box-shadow halo. Justin couldn't see the difference perceptibly in the browser; reverted to last committed state. Carry-over to Workstream C, where it can be considered alongside light-mode tokens, the icon sweep, and broader lab-component restyling. |
| T6.5 | `a76aba5` | Entrance fades for the welcome triptych (stagger-fade-up after the manifesto settles, base delay 0.75s + 0.15s per panel) and each TerritoryGrid section (`whileInView` once with `amount: 0.15`). Both gated by `useReducedMotion`. Closes the T5 motion carry-over. |

**Critique posture verdict:** Conditional pass at start; full pass after T6.1–T6.3 + T6.5 landed. T6.4 conditional on Workstream C, not blocking.

**Carry-overs to other workstreams:**
- **Writer session** — refine T6.3 colophon copy (currently `TODO Writer` placeholder). Voice-tune summary label and gloss against Phase 3.1 voice profile.
- **Workstream C** — picks up GuideCard hover refinement (T6.4 PARKED). Treat as a small additional surface inside the broader light-mode + icon sweep.

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

#### T7 landed — 2026-05-03 (Tyrell)

Plan resync against the post-T6 reality. Highlights:

- **Workstream C posture revised** — was "deferred until B is well underway"; now "runs in parallel with B once B.1's renderer enhancement lands as a discrete sub-pass." The renderer enhancement is the only file collision (`GuideBlockquote.tsx` + parser/types). Sequencing it first as a 1–2 session sub-pass clears the conflict; then C and the rest of B can run truly in parallel.
- **Workstream C may split into C.1 + C.2** — C.1 is light-mode tokens only (`design-system/lab-tokens.css`, contained), C.2 is icon sweep + lab-component restyling + GuideCard hover (T6.4 carry-over). C.1 can land immediately once B.1 renderer is in.
- **Suggested sequence rewritten** — A done → B.1 renderer enhancement → B.1 rest + B.2 + C.1 + C.2 in parallel.
- **Locked decisions table** — three new entries (revised C posture, revised sequence, C.1/C.2 split idea).
- **T6.3 colophon copy** — added a new "Reminders / pending confirmations" entry pointing at the `TODO Writer` placeholder in `LibraryHeader.tsx`'s `ColophonNote`.
- **Workstream A entry** — added "Polish landed in flight" subsection referencing this mission's T6 sub-passes and the T6.4 parking.

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
