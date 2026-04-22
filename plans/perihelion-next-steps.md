# Perihelion: next steps

> Written 2026-04-21 as a punch list to return to after vacation. Captures the full list of fixes and enhancements Justin raised in the rename session, plus the decisions locked along the way. Treat this as the source of truth for "what comes next on the lab" until items are lifted into missions or archived.

---

## Current state

### In flight

- **PR #34** — rename to Perihelion, two-arm structure (Archive + Works), ADR-010, naming plan. Awaiting Justin's merge.

### Pre-merge checklist for PR #34

1. Clearance search for "Perihelion" and "Perihelion Archive." Flag any dominant brand that would muddy attribution.
2. Visual smoke test on the Vercel preview deploy. Check: header wordmark, library page H1, a guide page title, 404 page, portfolio About section, portfolio footer link.
3. OG card inspector pass (twitter/facebook card tools) when the preview is up.
4. Merge when satisfied.

### Post-merge tasks

- [ ] Archive `plans/lab-naming-pivot.md` into `plans/archive/` (separate small PR)
- [ ] Consider renaming the constellation node `id: 'the-lab'` to `id: 'perihelion'`. Check first whether any deep links or anchors point at `the-lab` before making this change.
- [ ] Update the shipped-bullet in `plans/roadmap.md` section "What's shipped" if any phrasing feels off post-merge.

---

## Locked decisions (from this session)

| Decision | Status |
|---|---|
| Brand: **Perihelion** | Locked |
| Arms: **Archive** (research) + **Works** (applied design), peers not pipeline | Locked |
| Umbrella tagline: "closest approach to the frontier" | Locked |
| Archive tagline (preserved): "A reader's notebook. Designed to be prep, not product." | Locked |
| Voice reference: `core/content/voice-profile.md` (Joi Phase 1, 8 samples) | Available, another calibration pass planned when content grows |
| Icon libraries: Lucide + Phosphor as defaults | Locked |
| Light mode direction: start from portfolio light-mode tokens with justified modifications | Locked (implementation deferred) |
| Cross-link and paper-reference scans: hybrid (automated script surfaces candidates, Justin reviews) | Locked (implementation pending) |
| Subdomain: stays at `labs.justinh.design` | Locked |
| Design system overhaul: "important but a lot of work," deferred | Locked posture |
| Sequence: naming first (done), then content sweep, then design system | Locked |

---

## The mission reveal

Captured here so it does not get lost: Justin is building Perihelion for himself AND to invite other designers who have not yet considered frontier science. The invitational posture is load-bearing. Every design and content decision on the lab should be tested against: "does this open the door or does this gatekeep?"

This principle is why the naming session rejected obscure-as-flex candidates (Wunderkammer, Syzygy, Orrery, Alembic) in favor of a word that rewards curiosity without demanding credentials.

---

## Workstreams

The original punch list Justin raised, organized into workstreams. Each workstream can become a mission when it is scoped for building.

### Workstream A — Origins intro

**What:** A proper introduction to how the library and lab came to be, what it is for, the learning-first-then-applied-design positioning. Could live as expanded copy on the Archive landing, or as a small About-Perihelion section.

**Covers original item:** #1 (proper intro to origins).

**Owner:** Writer skill, informed by `core/content/voice-profile.md`.
**Touches:** `src/lab/components/library/LibraryHeader.tsx` (MANIFESTO constant), possibly a new About-Perihelion component or page.
**Effort:** S.
**Prereq:** PR #34 merged.

---

### Workstream B — Content sweep across the eight Archive guides

Bundles six of Justin's original items into one coherent sweep. The guides all need the same kinds of attention.

**Covers original items:**
- #2 Update each guide with Justin's voice
- #5 Scan for stale or outdated information
- #6 Update podcast episode numbers
- #7 Link to sources and podcast links where mentioned
- #8 Link to other guides when mentioned (cross-links)
- #9 Full scan for other papers to read or reference when mentioned

**Approach: hybrid automated + curated.** Extend the orphan-audit pattern. Three new scripts:

1. **Cite audit** — surfaces un-linked source mentions, podcast episode references, paper citations
2. **Cross-link audit** — surfaces guide-to-guide mention candidates (when Guide A mentions a term that lives in Guide B)
3. **Content health report** — flags stale dates, missing podcast episode numbers, potentially broken or stale links

Justin then reviews the reports and decides which to action. Writer does the voice sweep per guide.

**Owner:** Writer (prose), Tyrell (scripts).
**Touches:** `core/lab/guides/*.md`, new scripts in `scripts/`, possibly new frontmatter fields for source-link schema.
**Effort:** L.
**Prereq:** Optional: another Joi calibration pass first, to enrich the voice profile before a full-guide sweep.

---

### Workstream C — Design system overhaul for the lab

Covers two visual items together because the light mode work and the icon sweep share touchpoints.

**Covers original items:**
- #3 Full UI overhaul: tokens, light mode, subtle personal branding
- #4 Replace emoji with icons

**Approach:**
- Light mode palette sourced from portfolio light-mode tokens, with justified modifications where the academic-preprint register demands something the portfolio does not offer (warm cream paper backgrounds, warm ink text, etc.)
- Emoji-to-icon pass using Lucide for standard UI affordances and Phosphor where a more opinionated pictorial register is wanted
- Subtle personal branding: typographic mark, pull-quote treatment, or a sigil that appears as a colophon mark at the end of each guide. Tied to Workstream D.

**Owner:** Tyrell, with Impeccable design skills (`/audit`, `/polish`, `/colorize`, `/typeset`).
**Touches:** `design-system/lab-tokens.css` (new light-mode variable set), `src/lab/` components that use emoji, possibly new SVG mark component.
**Effort:** L. "A lot of work," in Justin's words. Deferred intentionally until the content sweep is well underway.

---

### Workstream D — Logotype and sigil pass

A brand mark for Perihelion. Delayed until the brand has had time to settle.

**Covers:** follow-up task added in this session.

**Candidates to explore:**
- Abstract mark based on an orbital diagram (the elliptical orbit plus a highlighted point of closest approach)
- A small sigil (colophon mark) that appears at the end of guides
- Typographic wordmark only (no pictorial element)
- Dual-mark system: umbrella sigil + arm-specific glyphs (one for Archive, one for Works)

**Owner:** Tyrell + Impeccable typography and design skills.
**Touches:** `design-system/` for tokens, possibly new SVG component in `src/lab/components/`, favicon update if the mark becomes the favicon too.
**Effort:** M.
**Can run in parallel with:** Workstream B. Different hands, different surfaces.

---

## Suggested sequence

1. **Merge PR #34.** Perihelion is live.
2. **Workstream A (origins intro).** Small, immediate, can ship shortly after merge.
3. **Workstream B (content sweep).** The bulk of the remaining lab work. Build the three audit scripts first, then action the reports. Voice sweep per guide follows.
4. **Workstream D (logotype).** Can start in parallel with B. Gives the brand visual closure.
5. **Workstream C (design system).** Deferred until B is well underway and the brand has had time to settle.

Workstream B is the main thing. It is also the most time-intensive. Expect it to span several sessions.

---

## Open questions for when Justin returns

1. **Does Perihelion Works get a placeholder landing page now,** or wait until the first design piece is ready? A placeholder might read as premature; waiting keeps the surface honest.
2. **Constellation node migration.** Should `id: 'the-lab'` migrate to `id: 'perihelion'`? Requires checking whether any deep links or anchors reference the current id.
3. **Joi calibration.** Do we run a second Joi session before the voice sweep in Workstream B, or is the Phase 1 profile enough?
4. **Podcast episode numbers.** Is there a source of truth (a spreadsheet, a RSS feed, a Notion doc) or are these manually researched per guide?
5. **Writer posture for the guide sweep.** Read each guide and propose voice-tuning diffs wholesale, or only touch explicitly flagged sections? First option is higher-quality but more effort.
6. **Tagline when Works ships.** Keep "closest approach to the frontier" at the umbrella, or evolve it to explicitly name both arms?

---

## Reminder to future Justin

Return from vacation, open this file, scan the Locked Decisions table, then the Workstreams section. The sequence is: merge PR #34, ship Workstream A, start Workstream B's audit scripts. Don't start Workstream C until B is well underway. Workstream D can start anytime it sounds fun.

The mission is invitational. Test every future decision against: *does this open the door for a designer who has never considered frontier science, or does this gatekeep?*
