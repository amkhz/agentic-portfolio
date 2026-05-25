# ADR-011 Implementation Plan — Portfolio Visual Recalibration

> **Branch:** `feat/portfolio-adr-011-implementation` (off `chore/portfolio-adr-011-activation` / PR #68).
> **Status:** Plan-only scaffold, written 2026-05-25 end-of-day. Implementation starts in a fresh session.
> **Scope:** Portfolio surface only (`justinh.design`). Perihelion (`labs.justinh.design`) is sibling-but-separate and explicitly out of scope per the brief.
> **Read first:** `vector/decisions/ADR-011-portfolio-visual-recalibration.md` (the durable decision record) and `plans/portfolio-visual-recalibration-brief.md` (the rationale + locked specs).

---

## Why this branch exists

ADR-011 is doctrine. It activates type-system, color, composition, and motion constraints for the portfolio surface — but the actual surfaces (`src/pages/`, `src/components/content/*`, etc.) still consume the OLD type stack and direction. If we merged PR #68 to main first and built surfaces later, main would sit in a state where doctrine and surfaces contradict each other. Instead, this branch builds the surfaces under the new doctrine before merging anything. PR #68 stays open as the head of the stack.

**Merge order when ready:** PR #68 first (doctrine), then each implementation PR (A, B, C...) in sequence. Or GitHub auto-retargets implementation PRs to main as #68 lands first.

---

## Locked decisions to honor

From the brief — these are not up for re-litigation in implementation:

- **Type spine:** Fraunces (display) + Geist (body) + JetBrains Mono (kicker). Inter rejected. Bodoni Moda + Crimson Pro tested and not chosen.
- **Fraunces axis baseline:** `opsz 144, SOFT 30, WONK 0.5, wght 500` for display headlines. Italic with `SOFT 80, WONK 0.5` for pull quotes.
- **Per-project accent system** — four OKLCH values:
  - Dusty magenta: `oklch(0.42 0.14 346)`
  - Aged brass: `oklch(0.55 0.10 70)`
  - Moss forest: `oklch(0.36 0.08 155)`
  - Deep oxblood: `oklch(0.34 0.13 25)`
  Each project gets ONE as its Committed accent.
- **Cover atmosphere:** Not flat color panels (Rosenfeld Media trap, rejected). Radial-light gradient as primary atmospheric move. Grain overlay + shader-feel layered on top.
- **Case study opener composition:** Full-bleed cover panel left (50%, atmospheric Committed accent) + editorial type spread right (50%, kicker / chapter indicator / headline / body / pull quote with brass border-left / metadata footer).
- **Project title separator:** Colon. "Vesper: the long road home." Not em-dash.
- **Work index:** Monograph table of contents. Varying Fraunces scale by recency (most recent biggest), brass numerals left, year + accent swatch right, hairline-divided rows. **Not** a card grid.
- **Color rule:** All color is OKLCH via tokens referenced by name. No hex anywhere, including doctrine files.
- **Per-project mark/illustration system:** Each case study earns a bespoke mark/ornament/chapter-opener. System allows for it; specifics emerge per project.

---

## Current font setup (pre-migration)

In `src/styles/globals.css` (NOT in `design-system/tokens.css` yet):

```css
--font-display: 'Podkova', serif;
--font-heading: 'Space Grotesk', sans-serif;
--font-body: 'Didact Gothic', sans-serif;
```

Installed via `@fontsource`:
- `@fontsource-variable/space-grotesk`
- `@fontsource/didact-gothic`
- `@fontsource/jetbrains-mono` (already present — used by Perihelion)
- `@fontsource/podkova`

**Note from ARCHITECTURE.md (polish branch / PR #68):** font token migration from `globals.css` → `design-system/tokens.css` is explicitly planned as part of the next ADR. Do that move as part of PR A.

---

## Phased slice plan

### PR A — Token + font migration (no surface changes)

**Scope:**
- Install `@fontsource-variable/fraunces` (variable axes: opsz, SOFT, WONK, wght) and `@fontsource-variable/geist` (or `@fontsource/geist` if variable not available).
- Migrate font tokens from `src/styles/globals.css` to `design-system/tokens.css`. New token names:
  - `--font-display: 'Fraunces', serif;`
  - `--font-body: 'Geist', sans-serif;`
  - `--font-mono: 'JetBrains Mono', monospace;`
- **Decide whether to also keep `--font-heading`** or fold it into `--font-display`. Brief implies the display serif handles h1, h2, AND section openers — so probably retire `--font-heading` and let the display serif own all headings.
- Add a variable-axis exposure utility (e.g., `--fraunces-axis-display: 'opsz' 144, 'SOFT' 30, 'WONK' 0.5;`) so downstream consumers can apply the locked baseline cleanly.
- OKLCH-only color audit: sweep `tokens.css` and any other doctrine/token files for hex / `rgb()` / named colors. Convert what survives to `oklch()`.
- Add the per-project accent tokens to `tokens.css`:
  - `--accent-magenta: oklch(0.42 0.14 346);`
  - `--accent-brass: oklch(0.55 0.10 70);`
  - `--accent-forest: oklch(0.36 0.08 155);`
  - `--accent-oxblood: oklch(0.34 0.13 25);`
- Wire fontsource imports in `src/main.tsx`.
- Update Tailwind v4 config to map `font-display`, `font-body`, `font-mono` to the new tokens.
- **Don't change any surfaces yet.** Verify fonts load in dev (`npm run dev`), that's it.

**Verification:**
- `npm run lint`, `npm run test`, `npm run build` clean.
- Open `/` in dev. Type should still render with the OLD families until surfaces are updated (because no surface consumes the new tokens yet — Tailwind classes still resolve to whatever they currently resolve to). The migration is invisible until the next PR. **Acceptable risk:** the new fonts load but nothing uses them. That's the point.
- Or: change ONE element (e.g., body element default) to consume `var(--font-body)` directly to prove the new Geist loads visibly. Justin live-reviews.

**Estimated effort:** ~2–3 hours. Bulk of it is the OKLCH sweep + variable-axis token shape decisions.

---

### PR B — Home surface

**Scope:**
- Rewrite `src/pages/HomePage.tsx` (or whatever the home component is — verify in session) under the new doctrine.
- Bookish opener. Display serif h1 with optical-size attention. Asymmetric composition. **One atmospheric moment.** Refuse the hero-metric template.
- First visible payoff. Live-review focal point.

**Sub-decisions to surface in-session:**
- What's the "one atmospheric moment"? Radial-light gradient? Subtle grain? Brass refraction on a single anchor?
- Wordmark / header treatment — the brief flags this as still-open. NOT hand-lettered. Probably a display-serif treatment with optical-size attention. Could pair with `/impeccable shape` or `/impeccable typeset` for the moment.
- Counter / metric removal? The current home leads with a counter/metric. The brief says refuse the hero-metric template. Replace with something more editorial.

**Verification:**
- Live walkthrough on `localhost:5174/`. Check against the seven banned anti-references from PRODUCT.md.
- Mobile review (375px). The asymmetric composition must still hold or restructure deliberately for narrow.
- Lighthouse score 95+ ship criterion per ADR-011.

**Estimated effort:** ~3–4 hours including live iteration.

---

### PR C — Work index

**Scope:**
- Rewrite the work-index surface (verify component path in session — likely `src/pages/WorkIndex.tsx` or similar).
- Monograph TOC pattern: varying Fraunces scale by recency, brass numerals left, year + accent swatch right, hairline-divided rows.
- Not a card grid. Each project is a *piece*, not a card.
- Project title separator switches to colon.

**Sub-decisions to surface in-session:**
- Recency-driven scale: 5 projects? 8? What scale curve? (e.g., most recent at 96px Fraunces, oldest at 32px, linear or exponential interpolation?)
- "Accent swatch" on each row — what shape? Color disc? Hairline mark? Tied to the per-project Committed accent.
- Hover treatment per row — variable-axis weight-shift per the motion vocabulary?

**Estimated effort:** ~3–4 hours.

---

### PR D — Case study shell

**Scope:**
- Rewrite the case study page shell (`src/pages/CaseStudy.tsx` or similar — verify).
- Canonical opener: full-bleed cover panel left (50%, atmospheric Committed accent) + editorial type spread right (50%, kicker / chapter indicator / headline / body / pull quote w/ brass border-left / metadata footer).
- Per-project accent system in effect. Each case study declares its Committed accent in frontmatter or content data.
- Drop caps allowed on long-form (case studies are long-form).
- Per-project mark slot — placeholder for now if no marks designed; mark system itself is its own ADR (per brief Open Question #2).

**Sub-decisions to surface in-session:**
- Where does the per-project accent declaration live? `core/content/case-studies.ts`? Per-case-study YAML? Each case study Markdown frontmatter?
- Cover atmosphere: radial-light gradient default, grain overlay shader-feel optional. Implementation: CSS gradient + noise texture, or `<canvas>` shader? Lean CSS for ship velocity.
- Drop-cap implementation — pure CSS `first-letter` or a styled span in the markdown render? CSS is cleaner.

**Estimated effort:** ~4–5 hours. The cover atmosphere + drop-cap work is the new ground.

---

### PR E — About page

**Scope:**
- Rewrite the About surface (`src/pages/About.tsx` or similar — verify).
- Long-form essay treatment. Body sans, generous margin, kicker/metadata in margin gutter.
- Probably the smallest of the surface PRs.

**Estimated effort:** ~2 hours.

---

### Post-stack work (separate sessions, optional)

- **Light mode treatment.** Brief defers it. Activate when ready.
- **Per-project mark/illustration system.** Open Question #2 in the brief. Worth its own ADR-012.
- **Motion choreography.** "One ambitious motion moment per major surface" per the brief. Probably emerges per surface rather than as a separate PR.

---

## Open implementation questions

These need answers at some point during the build, but don't block PR A:

1. **Variable-axis discipline at the Tailwind level.** Tailwind v4's `font-stretch` + `font-variation-settings` support is limited. Decide whether to use Tailwind utilities or hand-rolled CSS for the Fraunces axis tweaks. Likely some hybrid.
2. **Per-project accent declaration site.** Frontmatter, content file, or a registry in `core/`?
3. **Wordmark / header.** "Justin Hernandez" as a display-serif moment. Sketch in `/impeccable shape` before committing.
4. **Tailwind v4 OKLCH support.** Should be fine but worth a sanity check — `oklch()` works in modern browsers; Tailwind v4 supports CSS custom property color values.
5. **Lab/portfolio shared elements.** Anything (Layout shell? Footer? Navigation?) shared between portfolio surfaces and Perihelion. Per ADR-009/010 they should look sibling-not-copy. Need to identify shared components and decide which side owns the styling.

---

## Suggested gates per PR

Same as every other PR in this project:

- [ ] `npm run lint` clean
- [ ] `npm run test` clean (101+ tests pass)
- [ ] `npm run build` clean
- [ ] Live walkthrough on dev server, Justin reviews
- [ ] Mobile review at 375px
- [ ] Accessibility — WCAG 2.2 AA contrast verified for any new tokens
- [ ] Anti-reference check — does this surface pass the seven banned categories in PRODUCT.md?

---

## How to resume in a fresh session

1. `git checkout feat/portfolio-adr-011-implementation`
2. Read this plan + the brief + ADR-011
3. Confirm PR #68 is still open (it should be — the doctrine waits for the surfaces to be ready)
4. Start with PR A scope. Ask Justin whether to:
   - (a) Do the FULL PR A scope as one commit (tokens + fonts + OKLCH sweep + accent system) — clean but a lot to absorb at once
   - (b) Slice PR A into two commits (font install + token migration first, OKLCH sweep + accents second) for easier review
5. First decision in-session: **typeface validation.** Brief says picks should be validated live on home + one case study before committing. May want to do a quick `/impeccable live` or browser iteration session first to confirm Fraunces + Geist render the way the Paper rounds suggested. Don't ship PR A until the picks are locked.
