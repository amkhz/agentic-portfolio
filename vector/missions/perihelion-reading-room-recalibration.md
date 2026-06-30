# Mission: Perihelion Visual Recalibration — "The Reading Room" (P2–P6)

**Feature:** The Perihelion lab (labs.justinh.design) converges on the Conservatory's warmth, composition, and motion while keeping its distinct library metaphor and reading-serif body — a quieter wing of the same building.
**Date:** 2026-06-30
**Doctrine source:** ARCHITECTURE.md (four-layer), CLAUDE.md (crew + gates), VECTOR.md, DESIGN.md (Conservatory standard)
**Brief (source of truth):** `plans/perihelion-visual-recalibration-brief.md`
**Predecessor standard:** ADR-013 ("The Conservatory"). **Recommended ADR:** ADR-016, written *after* P2 specimen locks live — not before.

> **P1 is DONE.** Palette warming (hue 270 → 70 humus, L 0.17 floor held) shipped on branch `feat/perihelion-p1-palette` (`design-system/lab-tokens.css`, `scripts/wcag-check.py` LAB blocks). Every later pass designs against the warmed palette as the given baseline. Do not re-scope P1.

---

## Constraint Check

**Preserved, not touched (brief section 9) — applies to every task below:**
- L 0.17 graphite floor (no pure black). Warming re-hues; it never darkens.
- OKLCH-only color via named tokens. No hex, rgb(), or named colors anywhere — components, tokens, or doctrine.
- Dual-var per-guide accent contract (`--guide-accent-dark` / `--guide-accent-light`) — the ONE documented inline-style exception (ADR-009). Do not add a second.
- Shipped house identity (Instrument sigil, Podkova logotype, colophon masthead). ADR-012 stands, untouched.
- Per-guide territory accents and the territory model.
- Light mode as warm cream paper (tuned, not rebuilt).
- All guide content/prose (Workstream B closed; these passes change containers, not copy).

**Slop-ban precedence (brief section 10):** when a locked spec collides with an Impeccable absolute ban, the ban wins — restructure the element, do not carve a doctrine exemption.

**Four gates per PR (CLAUDE.md):** `npm run lint`, `npm run build`, `npm run test`, then **Roy review** before merge. Branch first, never commit to main. Commit trailer uses the model running the session.

**No violations found** — every task lives cleanly in one or two adjacent layers.

---

## Tasks

### T2 (P2): Reading type — variable serif body
**Layer:** design-system (`design-system/lab-tokens.css`) + thin src wiring (`src/lab/main.tsx` font loading)
**Owner:** Tyrell (build) · Roy (review) · type lock is Justin's live call
**Branch:** `feat/perihelion-p2-reading-type`
**Commit prefix:** `feat(lab):`
**Locked direction call:** Uncommon, readable, modern variable serif. **NOT Fraunces** (reads AI), **NOT system Georgia**. Podkova stays the identity-locked display face; JetBrains Mono stays mono. Variable axes required so the P4 reader sliders work.
**Inputs:** **BLOCKED** — a live two-round type specimen must lock the face first (brief section 7). Round-one shortlist: **Literata, Newsreader, GT Sectra**, on real guide body copy, both modes, against the warmed P1 palette. This is a Justin-in-the-loop lock, mirroring how the portfolio locked Hedvig. Do not pick the face from the doc.
**Outputs:** `--lab-body-font` retargeted to the locked serif (via @fontsource); variable axis defaults set; axes exposed for P4. Records written into the brief + ADR-016.
**Scope boundary:** Does NOT touch `--lab-heading-font` (Podkova) or `--lab-mono-font`. Does NOT build the reader sliders (that's P4). Does NOT restyle any component — type token swap + font load only.

### T3 (P3): The Shelf — card grid → editorial spine index
**Layer:** src UI (`src/lab/`) reading from core (`core/lab/territories.ts`)
**Owner:** Tyrell (build) · Roy (review)
**Branch:** `feat/perihelion-p3-shelf`
**Commit prefix:** `feat(lab):`
**Locked direction call:** **Wallace material spines.** Editorial spine/catalog bones; each spine carries a generated material surface (binder cloth, pressed board, foil-stamp feel). **No literal 3D skeuomorph** — layout stays composed and editorial, only the surface is authored. Mobile: spines lie down as a stacked pile ("books on a desk").
**Target files:** `src/lab/components/library/TerritoryGrid.tsx`, `src/lab/components/library/GuideCard.tsx` (becomes a `GuideSpine`), `src/lab/pages/LibraryIndex.tsx`, likely new `src/lab/components/library/GuideSpine.tsx`. Update `GuideCard.test.tsx` accordingly.
**Inputs:** Warmed P1 palette (done). Wallace material surfaces from T5 (P5) — can build structure first with placeholder material, drop real surfaces when T5 lands.
**Outputs:** Editorial shelf replacing the `grid-cols-1 md:2 lg:3` card grid. Preserves per-guide accent, status pill, kicker, author/year data.
**Scope boundary:** Does NOT touch the guide reader (that's P4). Does NOT touch identity/masthead. Does NOT generate imagery (that's P5). Does NOT alter territory data in core/. Open question to resolve in exploration: by-territory grouping vs. flatter one-shelf catalog (brief section 12).

### T4 (P4): The Reader — top nav strip → left-margin reader rail
**Layer:** src UI (`src/lab/`)
**Owner:** Tyrell (build) · Roy (review)
**Branch:** `feat/perihelion-p4-reader`
**Commit prefix:** `feat(lab):`
**Locked direction call:** Move section nav from the top strip into a **left-margin rail that follows the reader on scroll** (the scroll-spy IntersectionObserver already exists in `GuideRenderer`). The rail houses: theme toggle (relocated), reading-accommodation controls (type size, variable-weight slider per T2 axes, line-length/measure, optional reading-progress marker), and the section TOC. Mobile collapses the rail cleanly to a drawer or slim top affordance (known UX cliff — section nav must stay reachable).
**Target files:** `src/lab/components/guide/GuideRenderer.tsx`, `src/lab/components/guide/GuideSectionNav.tsx` (becomes the rail), `src/lab/components/LabThemeToggle.tsx` (relocates into the rail), `src/lab/layouts/LabLayout.tsx`, the guide page shell. Update `GuideRenderer.test.tsx`.
**Inputs:** Warmed P1 palette (done). Variable serif axes from T2 for the weight slider (can stub the slider until T2 locks). Pipelines in PARALLEL with T3 — different surfaces (library vs. guide), low collision.
**Outputs:** Margin-dwelling reader rail; relocated theme toggle; reading-accommodation controls. Add a tactile page-grain texture that does not fight the body type.
**Scope boundary:** Does NOT touch the library/shelf (that's T3). Does NOT touch `LabThemeToggle`'s underlying theme logic, only its placement. Nested-definitions interaction (old Workstream E) is a Dreamer sub-exploration SIZED here, not built blind — keep it a separate follow-on if it grows.

### T5 (P5): Wallace material pass — spine + cover surfaces
**Layer:** services/asset pipeline (Wallace local Ideogram 4 → Impeccable review) → assets consumed by T3
**Owner:** Tyrell via Wallace skill · Roy (review)
**Branch:** `feat/perihelion-p5-wallace-materials`
**Commit prefix:** `feat(lab):`
**Locked direction call:** **Spine and cover materials ONLY.** Binder cloth, pressed board, foil-stamp surfaces; per-guide or per-territory material families (per-territory is the cheaper, more legible default — resolve when generation starts). No full scenes, no per-section art, no wallpaper.
**Inputs:** Warmed P1 palette — generate against BOTH the warmed humus dark and the cream light so materials read as the same room in both modes; record the dark/light pairings.
**Outputs:** Material surfaces feeding the T3 spines. Playbook references in the Wallace skill.
**Scope boundary:** **NO baked text in any generated surface** — no titles, labels, numbers, or glyphs (Ideogram renders gibberish; real labels are HTML in the build, per the public-marks rule). Does NOT expand to scenes mid-build (imagery-creep is the named risk). Does NOT touch component code — produces assets only.

### T6 (P6): Motion convergence — fixed bezier → spring/wave
**Layer:** src UI motion (`src/lab/`) + any shared lab motion tokens
**Owner:** Tyrell (build) · Roy (review)
**Branch:** `feat/perihelion-p6-motion`
**Commit prefix:** `feat(lab):`
**Locked direction call:** Replace the lab's fixed cubic-beziers with spring/wave-driven motion per the site-wide mandate (DESIGN.md P4 / VECTOR.md): **critically damped arrival (bounce 0, no overshoot)** for section reveals and shelf entrances; small damped overshoot permitted on hover/tap micro-interactions only. Honor `prefers-reduced-motion` end to end.
**Target files:** the three local `EASE_OUT = [0.22, 1, 0.36, 1]` constants in `src/lab/components/PerihelionMark.tsx`, `src/lab/components/library/LibraryWelcome.tsx`, `src/lab/components/library/TerritoryGrid.tsx`, plus any beziers introduced by T3/T4. Reuse the portfolio spring tokens in `core/tokens/index.ts` rather than inventing a new system.
**Inputs:** T3 and T4 should be substantially landed first — this is the closing polish across both surfaces. One ambitious entrance-choreography moment per surface MAX (brief section 12).
**Outputs:** Spring/wave motion across the lab; reduced-motion path verified.
**Scope boundary:** Does NOT redesign layouts (T3/T4 own those). Does NOT add new animated surfaces — converts existing motion only. One choreography moment per surface, no more.

---

## Execution Order

```
T2 (BLOCKED on live specimen lock) ──► unblocks the weight slider in T4
T3 Shelf  ◄── T5 Wallace materials (feeds the spines; can generate in parallel)
T4 Reader (PARALLEL with T3 — different surfaces, low collision)
        ▼
T6 Motion convergence (after T3 + T4 substantially land)
        ▼
Roy review per pass · four gates per PR · ADR-016 after T2 validates live
```

**Parallel (start when ready):** T3, T4, T5 (T5 generation can begin immediately against the warmed palette).
**T4's weight slider requires:** T2 (variable axes) — stub until then.
**T3's real spine surfaces require:** T5 — build structure with placeholder material first.
**T6 requires:** T3 + T4 substantially complete.
**T2 requires:** a live two-round type specimen lock (Justin in the loop) before any build.

**Critical path:** specimen lock → T2 → (T3/T4 parallel) → T6 → ADR-016. Roughly 4 sequential build stages plus the specimen gate.

## Done State

The recalibration is complete when:
- The lab dark mode reads as warm humus, same building as the Conservatory, distinct register preserved (serif body, territory accents, reader metaphor).
- The library is an editorial spine/catalog index, not a card grid; mobile spines stack as a pile.
- The guide reader uses a left-margin rail (nav + theme toggle + reading-accommodation controls); mobile collapse is clean.
- The reading-serif body face is locked live and variable, with axes driving the reader sliders.
- Wallace spine/cover materials are present, disciplined, text-free, paired across both modes.
- All lab motion is spring/wave-driven with reduced-motion honored.
- Every pass passed four gates (lint, build, test, Roy) and merged to `main`.
- **ADR-016 ("The Reading Room") is written** after the type specimen validates live, recording the convergent-but-distinct thesis, the warm-humus palette against the L 0.17 floor, the locked serif, the editorial-spine shelf, the margin-rail reader, the Wallace material scope, and the motion convergence.

## Flat Task List

T2 feat/perihelion-p2-reading-type "Reading type — variable serif body (BLOCKED on live specimen lock)"
T3 feat/perihelion-p3-shelf "The Shelf — card grid to editorial spine index"
T4 feat/perihelion-p4-reader "The Reader — top nav strip to left-margin reader rail"
T5 feat/perihelion-p5-wallace-materials "Wallace material pass — spine + cover surfaces"
T6 feat/perihelion-p6-motion "Motion convergence — fixed bezier to spring/wave"
