# ADR-011 Implementation Plan — Portfolio Visual Recalibration (v2)

> **Status:** Rewritten 2026-06-10 after the Impeccable v3.5.0 revisit (the rewrite Justin authorized; v1 was scaffolded 2026-05-25 under v3.0.7 and rescued via PR #82 — see git history for the original).
> **Doctrine state:** ADR-011 is ACTIVE on `main` (PR #68, merged 2026-06-09). The old stacked-branch frame is gone: there is no `feat/portfolio-adr-011-implementation` branch and PR #68 is not "open as head of the stack" anymore. Surfaces now contradict live doctrine on `main`, which is the state the old stack was designed to avoid — mild standing pressure to start, nothing else blocks it.
> **Scope:** Portfolio surface only (`justinh.design`). Perihelion is sibling-but-separate and explicitly out of scope per the brief.
> **Read first:** `vector/decisions/ADR-011-portfolio-visual-recalibration.md` (the decision record), `plans/portfolio-visual-recalibration-brief.md` (rationale + locked specs, including the 2026-06-10 addendum), and this plan.

---

## What changed in this rewrite

1. **Re-anchored on `main`.** Each PR below is an ordinary feature branch off `main`, merged in sequence. No stacking.
2. **The Impeccable v3.5.0 pipeline replaces the hand-rolled verification steps.** v1 hand-rolled "live walkthrough + mobile review + anti-reference check" per surface. v3.5.0 owns that flow end to end: `craft` for the build (compact shape → production bar → visual iteration), `critique` for scored verification (Nielsen 0–4 table, P0–P3 issues, bundled `detect.mjs` slop detector, persisted snapshot), `polish` consuming the critique snapshot as its backlog. The snapshot trend ("re-run critique after fixes, watch the score move") gives each surface a measurable bar v1 never had.
3. **Doctrine collisions with v3.5.0's absolute bans surfaced and adjudicated** (section below). Two locked specs collide or rub against the new bans; one is the brief's own internal contradiction. Justin's calls recorded in the addendum to the brief.
4. **Stale facts corrected:** test count 102 (was "101+"), dead reference-file pointers in the brief replaced (addendum), resume instructions rewritten.

What did NOT change: the PR A–E slicing (tokens first, then surfaces ordered by payoff), the locked decisions, the per-PR gates concept, the estimates.

---

## Locked decisions to honor

From the brief — not up for re-litigation in implementation:

- **Type spine:** Fraunces (display) + Geist (body) + JetBrains Mono (kicker). Inter rejected. Bodoni Moda + Crimson Pro tested and not chosen.
- **Fraunces axis baseline:** `opsz 144, SOFT 30, WONK 0.5, wght 500` for display headlines. Italic with `SOFT 80, WONK 0.5` for pull quotes.
- **Per-project accent system** — four OKLCH values, each project gets ONE as its Committed accent:
  - Dusty magenta: `oklch(0.42 0.14 346)`
  - Aged brass: `oklch(0.55 0.10 70)`
  - Moss forest: `oklch(0.36 0.08 155)`
  - Deep oxblood: `oklch(0.34 0.13 25)`
- **Cover atmosphere:** not flat color panels (Rosenfeld Media trap, rejected). Radial-light gradient primary; grain overlay + shader-feel layered on top.
- **Case study opener composition:** full-bleed cover panel left (50%, atmospheric Committed accent) + editorial type spread right (50%, kicker / chapter indicator / headline / body / pull quote / metadata footer). Pull-quote treatment: the original brass border-left was struck 2026-06-10 (collision #1 below, resolved); re-proposed in PR D under the side-stripe ban.
- **Project title separator:** colon. "Vesper: the long road home."
- **Work index:** monograph table of contents. Varying Fraunces scale by recency, brass numerals left, year + accent swatch right, hairline rows. Not a card grid.
- **Color rule:** all color OKLCH via tokens referenced by name. No hex anywhere, including doctrine files.
- **Per-project mark/illustration system:** each case study earns a bespoke mark; system allows for it, specifics emerge per project.

---

## Doctrine collisions with Impeccable v3.5.0

v3.5.0's SKILL.md carries match-and-refuse **absolute bans** that any Impeccable command will enforce mid-build. Three locked/blessed specs intersect them. Adjudicate BEFORE the build so the skills and the doctrine don't fight each other in-session:

1. **Pull quote `border-left` in brass** (locked opener spec) vs. the **side-stripe ban** ("`border-left` > 1px as a colored accent... never intentional"). **RESOLVED 2026-06-10 — Justin's call: respect the ban.** The brass border-left is struck from the opener spec; no PRODUCT.md exemption is spent. The pull-quote treatment gets re-proposed inside PR D's craft/typeset flow under the new constraint — candidates: Fraunces italic with the SOFT 80 axis doing the work, oversized hanging quotation mark, indent + size shift. Justin's rationale: the whole point of the recalibration is not looking like generic AI output; doctrine exemptions to the slop bans undercut that.
2. **Brass numerals on the work index** vs. the **numbered-section-markers ban**. Survives on the ban's own exemption: the monograph TOC is a real ordered sequence and the numbers carry information. Document the exemption rationale in the PR description so a future audit doesn't flag it.
3. **Mono kicker system** vs. the **tracked-eyebrow ban**. Survives on the ban's own carve-out ("one named kicker as a deliberate brand system is voice"). Implementation discipline: the kicker appears where metadata genuinely lives (case study openers, work index rows, margin gutters), not as an eyebrow above every section. The ban describes the failure cadence to avoid.
4. **Drop caps — the brief contradicts itself.** Discovery item 6 says hand moments are "explicitly *not* drop caps/marginalia"; the typographic-discipline section says "drop caps allowed on long-form case studies." v1 of this plan inherited the "allowed" reading. **Call needed from Justin** (recorded in the brief addendum when made): allow on long-form only, or strike entirely. Note Perihelion already ships a sigil drop cap on the lab side; sibling-not-copy cuts both ways.

---

## Current font setup (pre-migration, verified 2026-06-10)

In `src/styles/globals.css` (NOT in `design-system/tokens.css` yet):

```css
--font-display: 'Podkova', serif;
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Didact Gothic', sans-serif;
```

Installed via `@fontsource`: `@fontsource-variable/space-grotesk`, `@fontsource/didact-gothic`, `@fontsource/jetbrains-mono`, `@fontsource/podkova`.

Font token migration from `globals.css` → `design-system/tokens.css` happens in PR A.

---

## The Impeccable pipeline per surface

Every surface PR (B–E) runs the same loop:

1. **`/impeccable craft <surface>`** — craft runs a **compact shape** (the brief + ADR-011 + PRODUCT.md already answer scope, content, and visual direction; shape's own rules say a confirmed direction collapses the 10-section brief to 3–5 bullets + confirm). Justin confirms or course-corrects, then craft builds to its production bar and iterates visually (its Step 5 covers the responsive + states inspection v1 hand-rolled).
2. **`/impeccable critique <surface>`** — scored review: Nielsen table, P0–P3 issues, cognitive load, AI-slop verdict, `detect.mjs` run, snapshot persisted. This **replaces v1's hand-rolled anti-reference check**: the seven banned categories from PRODUCT.md are exactly what Assessment A evaluates, and the detector mechanizes the slop families.
3. **`/impeccable polish <surface>`** — reads the critique snapshot as its backlog (P0/P1 first), aligns to the design system, closes the gap.
4. **Re-critique if the first pass scored low** — the snapshot trend is the measurable bar. Most real interfaces score 20–32; a recalibrated portfolio surface should clear the first-run score visibly on the second run.
5. **The four repo gates** (below) before the PR is review-ready.

`/impeccable live` is the variant tool when a specific element wants in-browser alternatives (wordmark treatment, hover states, accent swatch shape). Dev server must be running.

What stays hand-rolled (skills don't own it): PR A's mechanical token/font work, branch + PR discipline, the repo gates, accessibility verification beyond what critique flags.

---

## Phased slice plan

### PR A — Token + font migration (no surface changes)

Unchanged from v1 in substance; it's mechanical and the skills don't own it.

**Scope:**
- Install `@fontsource-variable/fraunces` and `@fontsource-variable/geist` (fall back to static `@fontsource/geist` if variable isn't published).
- Migrate font tokens from `src/styles/globals.css` to `design-system/tokens.css`:
  - `--font-display: 'Fraunces', serif;`
  - `--font-body: 'Geist', sans-serif;`
  - `--font-mono: 'JetBrains Mono', monospace;`
- Retire `--font-heading` (display serif owns all headings per the brief) unless a surface PR proves a need.
- Variable-axis exposure utility (e.g. `--fraunces-axis-display: 'opsz' 144, 'SOFT' 30, 'WONK' 0.5;`) so consumers apply the locked baseline cleanly.
- OKLCH-only audit of `tokens.css` + doctrine/token files; convert survivors.
- Add the four per-project accent tokens (`--accent-magenta`, `--accent-brass`, `--accent-forest`, `--accent-oxblood`).
- Wire fontsource imports; map Tailwind v4 `font-display` / `font-body` / `font-mono` to the new tokens.
- No surface changes. The migration is invisible until PR B — that's the point.

**Typeface validation gate (before PR A merges):** the brief requires the picks validated live on home + one case study. Run the new fonts behind a scratch toggle (or a one-element override) in dev and do a `/impeccable live` pass with Justin. Don't lock PR A until Fraunces + Geist render the way the Paper rounds suggested.

**Estimated effort:** ~2–3 hours.

### PR B — Home surface

**Build:** `/impeccable craft` per the pipeline. Direction from the brief: bookish opener, display serif h1 with optical-size attention, asymmetric composition, ONE atmospheric moment, refuse the hero-metric template (now also a v3.5.0 absolute ban — the skill enforces what the doctrine demands; the current home leads with a counter/metric and will get flagged by critique on first run).

**Compact-shape questions to settle in-session:** the atmospheric moment (radial-light gradient / grain / brass refraction on a single anchor); wordmark treatment (still open, NOT hand-lettered — sketch via `/impeccable live` variants); what replaces the counter.

**Estimated effort:** ~3–4 hours including iteration.

### PR C — Work index

**Build:** `/impeccable craft` per the pipeline. Monograph TOC per the locked spec. Document the numbered-sequence ban exemption in the PR description (collision #2 above).

**Compact-shape questions:** recency scale curve (96px ceiling — at v3.5.0's display max, fine — down to ~32px; linear vs exponential); accent swatch shape; row hover (variable-axis weight-shift per the motion vocabulary).

**Estimated effort:** ~3–4 hours.

### PR D — Case study shell

**Build:** `/impeccable craft` per the pipeline. Canonical opener per the locked spec. Drop caps (collision #4) must be resolved BEFORE this PR starts; the pull-quote re-proposal (collision #1, resolved: ban respected) happens inside this PR's craft/typeset flow.

**Compact-shape questions:** per-project accent declaration site (frontmatter vs `core/content/` registry — also open question 2 below); cover atmosphere implementation (lean CSS gradient + noise; shader only if CSS can't reach the brief's bar); mark slot placeholder shape.

**Estimated effort:** ~4–5 hours. The cover atmosphere is the new ground.

### PR E — About page

**Build:** `/impeccable craft` per the pipeline. Long-form essay treatment: body sans, generous margin, kicker/metadata in the margin gutter. Smallest surface PR. Note the About copy itself was voice-tuned against the Phase 3.1 profile — this PR restyles, it does not rewrite prose.

**Estimated effort:** ~2 hours.

### Post-stack work (separate sessions, optional)

- **Light mode treatment** — deferred by the brief; activate when ready.
- **Per-project mark/illustration system** — open question; worth its own ADR.
- **Motion choreography** — "one ambitious motion moment per major surface"; emerges per surface inside craft's motion pass rather than as a separate PR. `/impeccable animate` is the targeted tool if a surface lands flat after the fact.

---

## Open implementation questions

1. **Variable-axis discipline at the Tailwind level.** Tailwind v4 `font-variation-settings` support is limited; likely a hybrid of utilities + hand-rolled CSS. Settle in PR A.
2. **Per-project accent declaration site.** Frontmatter, content file, or a registry in `core/`. Settle in PR D's compact shape.
3. **Wordmark / header.** Display-serif moment, not hand-lettered. `/impeccable live` variants in PR B.
4. **Lab/portfolio shared elements.** Identify components shared with Perihelion (layout shell, footer, nav) and decide which side owns styling. Sibling-not-copy per ADR-009/010.
5. **Collision #4** (drop caps) — Justin's call, needed before PR D. (Collision #1 resolved 2026-06-10: side-stripe ban respected.)

---

## Gates per PR

- [ ] `npm run lint` clean (one pre-existing warning in `renderSection.tsx` is known)
- [ ] `npm run test` clean (102 tests)
- [ ] `npm run build` clean
- [ ] `npm run audit:orphans` clean
- [ ] `/impeccable critique` snapshot taken; P0 = 0, P1 resolved or explicitly accepted by Justin
- [ ] Live walkthrough with Justin (craft's Step 5 + presentation)
- [ ] Mobile review at 375px (inside craft's responsive pass; verify, don't assume)
- [ ] WCAG 2.2 AA contrast for any new tokens
- [ ] Lighthouse 95+ (ADR-011 ship criterion; PR B onward)

---

## How to resume in a fresh session

1. Branch off `main` (`git checkout -b feat/portfolio-adr-011-pr-a main`). Verify `pwd` first — agent worktrees drift.
2. Read this plan + the brief (with addendum) + ADR-011.
3. Resolve collision #4 (drop caps) with Justin if not yet recorded. Collision #1 is resolved: ban respected, pull quote re-proposed in PR D.
4. Start with PR A. Ask Justin whether to slice it as one commit (everything) or two (fonts + token migration, then OKLCH sweep + accents) for review ease.
5. Do not merge PR A until the typeface validation gate passes live.
