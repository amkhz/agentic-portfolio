# Roadmap

> Pointer document, not a plan. It says where the focus is, what is open,
> and where the real records live. Shipped history belongs to git log,
> `vector/missions/archive/`, and `plans/archive/`.
>
> Read VECTOR.md and ARCHITECTURE.md first. Cross-project status is
> Stelline's, in `~/projects/plans/status.md`.

**Last updated:** 2026-07-31

---

## Current focus: the craft arc

**`~/projects/plans/2026-07-30-portfolio-craft-arc.md`** is the active plan
and supersedes the exploration list this file used to carry. Six serial
rounds, one session each, to make every surface of justinh.design read as
authored by a highly skilled designer: no AI tells in the pixels, none in
the prose, structure that carries craft.

| Round | What | Seat | State |
|-------|------|------|-------|
| R1 | Impeccable doctor, post-4.0.4 drift check plus this roadmap refresh | Tyrell | in flight |
| R2a | Critique sweep across every route | Fable | queued |
| R2b | Visual de-telling, eyebrows first | Tyrell | queued |
| R3-prep | Honesty interview, per case study | Stelline | queued |
| R3 | The copy pass, Justin's hands, Gaff assists | Justin | queued |
| R4 | Reference study (paulbakaus, jonsmith) | Stelline | runs early, Justin's call |
| R5 | Shape the improvements into a per-page brief | Dreamer | queued |
| R5.5 | Wire Wallace as Impeccable's renderer | Tyrell | queued |
| R6 | Build the graded brief | Tyrell | queued |

Standing constraints live in the arc: one session one seat one model,
feature branches with Justin merging, content voice belongs to Justin,
and the local skills plus repo doctrine win where Impeccable disagrees.

---

## Open threads outside the arc

These are real and unclosed. None of them is scheduled; the arc holds the
queue until it finishes.

- **Mobile performance.** Vercel mobile RES 58, INP around 928ms is the
  killer (main-thread JS and motion). CLS and FID are already strong.
  Justin wants it as its own focused thread.
  Plan: `plans/lighthouse-perf-followup.md`.
- **Perihelion growth.** B.1 renderer enhancement build is the next open
  mission; C.2 restyling and D logotype/sigil follow, both measured
  against the bar the Conservatory set. Workstream E (nested-definition
  drill-down) still needs a Dreamer pass.
  Plan: `plans/perihelion-next-steps.md`.
- **Works 01 fast-follow.** Spatial soundscape first. The standing
  FieldIntegrity annotation-write extraction rides the next touch.
  Record: `vector/missions/works-01-flight-deck.md`, ADR-017.
- **Music Mission 2.** The "Twenty Years of Listening" flagship. Form is
  constrained: schema v1 carries no genre dimension, so a genre
  constellation needs v2 enrichment; eras timeline and rediscovery shelf
  do not. Selecta is planned end to end and lands in lastfm-mcp.
  Plans: `plans/music-phase-2.md`, `plans/selecta.md`. ADRs 018, 020.
- **Paper Shaders (T4d).** Parked on `spike/paper-shaders`. NO-GO on cover
  backgrounds: too faint over the low-contrast dark palette, and the
  `colors` prop rejects `oklch()`. Retry as image-filter-over-renders.
  Reference: `plans/paper-shaders-reference.md`.
- **Parked component work.** Crew rename
  (`plans/blade-runner-crew-rename.md`), destructive Button variant
  (`plans/button-destructive-variant.md`, waits on a real destructive
  action in the UI).
- **Not scheduled, still wanted.** Figma token sync (OKLCH Phase 3
  advisory, no code), an auto-generated `/system` token page, per-route
  code splitting as the lab bundle grows, View Transitions for
  constellation navigation, tests for `core/` utilities and content-model
  validation.

## Superseded

The 2026-07-06 edition of this file carried a full shipped-work ledger, a
merged-branch list, and nine numbered "active explorations." All of it
predates the replicant kit and the craft arc. Shipped items are recorded
in git history and in `vector/missions/archive/`; the exploration list is
replaced by the arc above plus the open threads. Explorations 2 (the
Conservatory overhaul, ADR-013), 4's Mission 1 (lastfm-mcp), and the
Perihelion recalibration (ADR-016) are all closed and shipped.

---

## Decisions

Significant choices get documented as ADRs in `vector/decisions/`.

| ADR | Decision | Date | Status |
|-----|----------|------|--------|
| 001 | Migrate from Next.js to Vite | 2026-03-04 | Accepted |
| 003 | React Bits adoption strategy | 2026-03-07 | Accepted |
| 004 | Last.fm integration architecture | 2026-03-07 | Accepted |
| 005 | CSS-only texture system | 2026-04-11 | Accepted |
| 006 | Systematic audit and polish pass | 2026-04-11 | Accepted |
| 007 | Constellation spatial navigation | 2026-04-12 | Accepted |
| 008 | Defer DESIGN.md adoption | 2026-04-14 | Accepted (since reversed in practice: DESIGN.md is live) |
| 009 | Lab subdomain architecture (two Vite builds, one repo) | 2026-04-20 | Accepted |
| 010 | Rename lab to Perihelion (two-arm house: Archive and Works) | 2026-04-21 | Accepted |
| 011 | Portfolio visual recalibration to editorial-craftsperson register | 2026-05-17 | Superseded by ADR-013 |
| 012 | Perihelion house identity | 2026-06 | Accepted; display-face lock superseded by ADR-016 |
| 013 | Portfolio visual direction: "The Conservatory" | 2026-06-20 | Accepted, shipped (PR #130) |
| 014 | Kiavi "body of work" lives on the design-infrastructure hub | 2026-06-25 | Accepted |
| 015 | Notes content type: frontmatter + glob, case-study body grammar | 2026-06-27 | Accepted |
| 016 | Perihelion visual recalibration: "The Reading Room" | 2026-06-30 | Accepted, shipped; amended in part by ADR-017 |
| 017 | The Perihelion Works arm and The Flight Deck (Works 01) | 2026-07-03 | Accepted, shipped (PR #193) |
| 018 | Archive-first Last.fm data architecture in a standalone MCP repo | 2026-07-06 | Accepted |
| 019 | Aphelion: a third arm for personal experimental work | 2026-07-06 | Accepted |
| 020 | The archive becomes the library of record (Selecta architecture) | 2026-07-06 | Accepted |
