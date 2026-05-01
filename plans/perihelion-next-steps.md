# Perihelion: next steps

> Living punch list for the lab at `labs.justinh.design`. First written 2026-04-21 during the rename session; resynced 2026-04-30. Source of truth for "what comes next on Perihelion" until items are lifted into missions or archived.

---

## Current state

### Shipped since the last sync

- **PR #34 / #35** — Perihelion rename, two-arm structure (Archive + Works), ADR-010, naming plan. Merged.
- **Constellation node migration** — `id: 'the-lab'` → `id: 'perihelion'` (open question #2 resolved).
- **Lab subdomain rewrite hardening** — host-based routing locked across PR #28-#31 (consolidated, root client-redirect, root path explicit, `:path(.*)` matcher).
- **Lab footer source link fix** — PR #33.
- **Joi voice profile through Phase 3.1** — calibrated from 16 interview samples + About-page edited-prose corpus + cold-read calibration on a lab-guide rewrite. Voice is now production-ready for the Workstream B sweep.
- **About-page voice and proofread pass** — first content surface refined against the locked profile.

### Open

No PRs in flight on the lab. Branch is `chore/plans-sync-2026-04-30` for this docs update.

---

## Locked decisions (cumulative)

| Decision | Status |
|---|---|
| Brand: **Perihelion** | Locked |
| Arms: **Archive** (research) + **Works** (applied design), peers not pipeline | Locked |
| Umbrella tagline: "closest approach to the frontier" | Locked |
| Archive tagline (preserved): "A reader's notebook. Designed to be prep, not product." | Locked |
| Voice reference: `core/content/voice-profile.md` (Phase 3.1) | Locked, production-ready |
| Icon libraries: Lucide + Phosphor as defaults | Locked |
| Light mode direction: start from portfolio light-mode tokens with justified modifications | Locked (implementation deferred) |
| Cross-link and paper-reference scans: hybrid (script surfaces, Justin curates) | Locked (implementation pending) |
| Subdomain: stays at `labs.justinh.design` | Locked |
| Design system overhaul: deferred until content sweep is well underway | Locked posture |
| Sequence: naming (done) → content sweep → design system | Locked |
| Works placeholder: no, ship the surface only when the first piece is ready | Locked (Q1 resolved) |
| Constellation node id: migrated `the-lab` → `perihelion` | Locked (Q2 resolved) |
| Voice work cadence: voice profile is a long-term tool for both portfolio content and personal sense-making on hard topics | Locked (Q3 resolved) |
| Podcast-numbers source: hand-resolved from Ecosystemic Futures site, only single-digit episodes are wrong | Locked (Q4 resolved) |
| Writer posture for Workstream B: high-quality wholesale per guide, paced over time alongside other work | Locked (Q5 resolved) |
| Tagline evolution when Works ships | Open (Q6) |

---

## The mission

Justin is building Perihelion for himself AND to invite other designers who have not yet considered frontier science. The invitational posture is load-bearing. Every design and content decision on the lab is tested against:

> *Does this open the door for a designer who has never considered frontier science, or does this gatekeep?*

This principle is why the naming session rejected obscure-as-flex candidates (Wunderkammer, Syzygy, Orrery, Alembic) in favor of a word that rewards curiosity without demanding credentials.

---

## Workstreams

### Workstream A — Origins intro

**What:** A proper introduction to how Perihelion came to be, what it is for, the learning-first-then-applied-design positioning. Lives as expanded copy on the Archive landing or as a small About-Perihelion section.

**Owner:** Writer skill, against `core/content/voice-profile.md` (Phase 3.1).
**Touches:** `src/lab/components/library/LibraryHeader.tsx` (MANIFESTO constant), possibly a new About-Perihelion component.
**Effort:** S.
**Status:** Ready to ship. Voice is locked.

---

### Workstream B — Content sweep across the eight Archive guides

The main thing. Bundles six original punch-list items into one coherent sweep. All eight guides need the same kinds of attention.

**Covers:** voice tuning per guide, stale-info scan, podcast episode numbers, source/podcast linking, cross-links between guides, paper-reference scan.

**Approach: hybrid automated + curated.** Extends the orphan-audit pattern. Three new scripts:

1. **Cite audit** — surfaces un-linked source mentions, podcast episode references, paper citations.
2. **Cross-link audit** — surfaces guide-to-guide mention candidates (when Guide A mentions a term that lives in Guide B).
3. **Content health report** — flags stale dates, missing podcast episode numbers, potentially broken or stale links.

Justin reviews the reports and decides which to action. Writer does the wholesale voice sweep per guide (decision Q5). Pace this in stages — other workstreams can run alongside.

**Owner:** Writer (prose), Tyrell (scripts).
**Touches:** `core/lab/guides/*.md`, new scripts in `scripts/`, possibly new frontmatter fields for source-link schema.
**Effort:** L.
**Status:** Voice profile is ready. Build the three audit scripts first, then sweep guide-by-guide.

---

### Workstream C — Design system overhaul for the lab

Two visual items together — light mode and the icon sweep share touchpoints.

**Covers:** full UI overhaul (tokens, light mode, subtle personal branding), emoji-to-icon replacement.

**Approach:**

- Light mode palette sourced from portfolio light-mode tokens, with justified modifications where the academic-preprint register demands something the portfolio does not offer (warm cream paper backgrounds, warm ink text).
- Emoji-to-icon pass using Lucide for standard UI affordances and Phosphor where a more opinionated pictorial register is wanted.
- Subtle personal branding ties to Workstream D.

**Owner:** Tyrell, with Impeccable design skills (`/audit`, `/polish`, `/colorize`, `/typeset`).
**Touches:** `design-system/lab-tokens.css` (new light-mode variable set), `src/lab/` components that use emoji, possibly a new SVG mark component.
**Effort:** L.
**Status:** Deferred until Workstream B is well underway.

---

### Workstream D — Logotype and sigil pass

A brand mark for Perihelion. Delayed until the brand has had time to settle.

**Candidates to explore:**

- Abstract mark based on an orbital diagram (elliptical orbit + highlighted point of closest approach).
- A small sigil (colophon mark) that appears at the end of guides.
- Typographic wordmark only.
- Dual-mark system: umbrella sigil + arm-specific glyphs.

**Owner:** Tyrell + Impeccable typography and design skills.
**Touches:** `design-system/` for tokens, possibly a new SVG component in `src/lab/components/`, favicon update if the mark becomes the favicon too.
**Effort:** M.
**Can run in parallel with:** Workstream B.

---

### Workstream E — Nested definitions / drill-down term interaction

**What:** Reading the guides, Justin noticed that the inline definition card sometimes contains *its own* unfamiliar terms — and the natural urge is to click them and drill deeper. The current widget (`src/lab/components/guide/GuideTerm.tsx` + `GuideDefinitionCard.tsx`) only supports one level: term in body → card with plain-text definition. The definition text is not itself interactive.

**Posture:** Dreamer session, not a build plan. The interaction model is open. Some prompts for the session:

- Should "nested" mean a stack (cards appearing inside cards), a breadcrumb (replace-in-place with back-traversal), a side-rail (current card stays, deeper definitions stack alongside), or something less skeuomorphic?
- Does drilling deeper feel like a research move or like a distraction from the guide's main argument? When does it open the door, and when does it gatekeep?
- How deep can a chain go before the reader is lost? Hard cap, soft cap, or self-limiting via available glossary depth?
- Mobile constraints — nested overlays on a 375px viewport are a known UX cliff.
- Does this interact with Workstream B's cross-link audit? A click chain across guides is a more ambitious version of the same affordance.

**Owner:** Dreamer (exploration), Tyrell + Impeccable (`/critique`, `/shape`) once a direction is picked.
**Touches:** `src/lab/components/guide/GuideTerm.tsx`, `GuideDefinitionCard.tsx`, possibly a new container component, glossary data model in `core/lab/`.
**Effort:** Unknown — sized after the Dreamer pass.
**Status:** Parked thought, ready for a Dreamer session when Justin wants to explore.

---

## Suggested sequence

1. **Workstream A (origins intro).** Small, immediate, voice is locked.
2. **Workstream B (content sweep).** The bulk of remaining lab work. Build the three audit scripts first, then sweep guide-by-guide. Expect this to span several sessions.
3. **Workstream D (logotype).** Can start in parallel with B. Different hands, different surfaces.
4. **Workstream E (nested definitions).** Run a Dreamer session whenever Justin wants to explore. Output is a plan, not code yet.
5. **Workstream C (design system).** Deferred until B is well underway and the brand has had time to settle.

Workstream B is the main thing.

---

## Open question

**Q6 — Tagline evolution when Works ships.** Keep "closest approach to the frontier" at the umbrella, or evolve it to explicitly name both arms? Still thinking. Decide closer to the Works launch.
