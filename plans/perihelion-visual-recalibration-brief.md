# Perihelion Visual Recalibration Brief — "The Reading Room"

**Status:** Scoping (Dreamer lane), direction calls locked 2026-06-30. No build until the ADR validates and the type face locks live.
**Owner:** Justin, with Tyrell building per pass and Roy reviewing before each merge.
**Predecessor / standard:** ADR-013 ("The Conservatory"), `DESIGN.md`. The portfolio recalibration is the bar this measures against.
**Honors (does not redo):** ADR-012 (Perihelion house identity: Instrument sigil + Podkova logotype + colophon masthead, shipped and live). ADR-009 (multi-entry architecture, lab isolation with a documented convergence path), ADR-010 (rename and IA).
**Recommended ADR:** ADR-016 (012 is the identity; 014 and 015 are taken).

---

> **Next session, start here.** This brief is the single source of truth for the recalibration. You do not need to read `perihelion-next-steps.md` or re-survey the lab to begin. Read this file, then start **P1 (palette warming)** in `design-system/lab-tokens.css`: re-hue the dark neutrals from hue 270 toward warm humus (~60 to 80), hold the L 0.17 graphite floor, re-run `scripts/wcag-check.py` both modes. P1 is one file and gates everything else. The reading serif (P2) locks via a live specimen, not from this doc (shortlist in section 7). Direction calls are locked in section 4. Branch first, four gates, Roy before merge.

---

## 1. Thesis

Perihelion is not a separate visual world from the Conservatory. It is a quieter wing of the same building.

The portfolio recalibration (ADR-013) and Justin's vision for the lab are the same move from two doors. The Conservatory threw out the card grid in favor of a Field Notebook table-of-contents grammar, "not a card grid." The Perihelion library is currently exactly that card grid. So the work here is not a deviation from the standard, it is the lab finally adopting the principle the portfolio already proved, in the lab's own dialect: books and spines and reading instruments, where the portfolio uses dossiers and registration marks.

**Unify the grammar and the material. Keep the metaphor and the purpose distinct.**

- **Unify:** warmth, composition (margin-dwelling structure), material honesty, motion physics, and the shared brass interaction color.
- **Keep distinct:** the lab is a place to *read*, not a showcase. Its metaphor is the library and the reader's desk. Its body voice is a reading serif, not the portfolio's body sans. This is the one deliberate deviation, and it is principled: a long-form reader earns a different body face than a portfolio.

Working name for the direction: **The Reading Room.**

---

## 2. The standard, and how the lab converges

From `DESIGN.md` / ADR-013, the load-bearing Conservatory properties and the lab's relationship to each:

| Conservatory property | Lab today | Convergence call |
|---|---|---|
| Warm humus neutrals, never cold | Cool Gibson blue-violet (hue 270) | **Warm toward humus** (hue ~60 to 80), stay above the locked L 0.17 graphite floor |
| Brass owns interaction | Brass is already the no-guide fallback accent | Already aligned; keep |
| Field Notebook composition, margins carry metadata/nav | Centered column, top nav strip | **Move nav into the margin** (the Reader rail) |
| Authored material (Wallace), accent at anchors | Zero imagery | **Wallace spine + cover materials** at the shelf, disciplined |
| Wave/spring-driven motion, site-wide mandate | Fixed cubic-beziers | **Spring the arrivals and micro-interactions** |
| Distinct, refuses blandness | Competent, reads as academic template | The recalibration is the answer |

The lab keeps its own register where it should: graphite floor (no pure black, locked), per-guide territory accents, the academic-preprint texture lineage, light mode as warm cream paper, and the reading-serif body.

---

## 3. Gap analysis (six concrete shortfalls)

1. **Library is a card grid.** `TerritoryGrid` renders `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` of `GuideCard`s. This is the precise reflex the Conservatory refuses. Highest-leverage fix.
2. **Cool palette in a warm world.** `--lab-bg-*` sit at hue 270. The two rooms do not feel like one building.
3. **Reader nav is a top strip.** `GuideSectionNav` is a sticky horizontal-scroll chip bar; `LabThemeToggle` floats bottom-right. Nothing uses the generous margins the composition grammar calls for.
4. **No material.** The lab has no Wallace and reads as "clean template," not "authored place."
5. **Body type is system Georgia.** Safe, default, and not variable, which blocks the reading-accommodation sliders Justin wants.
6. **Motion is fixed-bezier.** `EASE_OUT = [0.22, 1, 0.36, 1]` and duration tokens, against the site-wide spring mandate.

---

## 4. Locked direction calls (2026-06-30)

| Call | Decision | Implication |
|---|---|---|
| Shelf register | **Wallace material spines.** Editorial spine/catalog bones; each spine carries a generated material surface (binder cloth, pressed board, foil-stamp feel). No literal 3D skeuomorph. | Shelf layout stays composed and editorial; the *surface* is authored. |
| Palette convergence | **Warm toward humus.** Re-hue lab dark neutrals from 270 toward ~60 to 80, holding L 0.17. Light mode is already warm cream, minor tune only. | The spine of the work; gates every surface, exactly as tokens-first gated the Conservatory. |
| Reading type | **LOCKED 2026-06-30: Newsreader (variable).** Uncommon, readable, modern serif; not Fraunces (reads AI), not system Georgia. Podkova stays the identity-locked display face. | Locked *live* via the section 7 specimen, the way the portfolio locked Hedvig. Per-mode body weight light 330 / dark 400. |
| Wallace scope | **Spine and cover materials only.** No full scenes, no per-section art, no wallpaper. | Honors imagery restraint; net-new pipeline use for the lab. |

---

## 5. Workstream restructure (supersedes the old C / D / E framing)

The next-steps punch list framed the lab's remaining visual work as Workstream C (design system), D (identity), E (nested definitions). That framing is now folded into one recalibration:

- **D (identity): done.** Shipped and live. Honored as a fixed constraint here, not reopened. The manifesto ornament re-derives from the shipped mark if a surface needs it.
- **C.3 (light mode): done.** Warm cream paper is live; this brief tunes it, does not rebuild it.
- **E (nested definitions): folds into P4 (the Reader).** A drill-down term interaction is a reading-experience feature; it belongs inside the reader work, not as a separate lane. It stays a Dreamer sub-exploration sized during P4.

The recalibration runs as six passes:

- **P1 — Palette warming + token convergence.** `design-system/lab-tokens.css` only. Re-hue dark neutrals toward humus, hold L 0.17, re-verify every text and accent pair to WCAG 2.2 AA both modes (`scripts/wcag-check.py`), re-tune `--lab-texture` warmth. The spine; everything else designs against the warmed palette. Smallest blast radius, lands first.
- **P2 — Reading type.** Add the chosen variable reading serif via @fontsource, retarget `--lab-body-font`, keep `--lab-heading-font` (Podkova) and `--lab-mono-font` (JetBrains Mono). Set the variable axis defaults; expose axes for the P4 reader sliders. Live specimen locks the face before this builds (section 7).
- **P3 — The Shelf.** Convert the library from card grid to an editorial spine/catalog index. Mobile: spines lie down as a stacked pile (Justin's "books stacked on a desk"). Wallace material surfaces land here (P5 feeds it). Touches `TerritoryGrid`, `GuideCard` (becomes a spine), `LibraryIndex`, likely a new `GuideSpine` component. Preserves the per-guide accent, status, kicker, author/year data.
- **P4 — The Reader.** Move section nav from the top strip into a left-margin rail that follows the reader on scroll (the scroll-spy IntersectionObserver already exists in `GuideRenderer`). The rail houses theme toggle, reading-accommodation controls (type size, the variable-weight slider, line-length/measure, possibly a reading-progress marker), and the section TOC. Mobile collapses the rail to a drawer or a slim top affordance. Add a tactile page-grain texture that does not fight the body type. Nested-definitions exploration (old E) sizes here. Touches `GuideRenderer`, `GuideSectionNav` (becomes the rail), `LabThemeToggle` (relocates into the rail), `LabLayout`, the guide page shell.
- **P5 — Wallace material pass.** Generate spine and cover materials per the locked scope. No baked text in any generated surface (real labels are HTML in the build, per the public-marks rule). Per-guide or per-territory material families. Feeds P3. Playbook lives in the Wallace skill references.
- **P6 — Motion convergence.** Replace the lab's fixed beziers with spring/wave-driven motion: critically damped arrival (no overshoot) for section reveals and shelf entrances, small damped overshoot permitted on hover/tap micro-interactions. Honor `prefers-reduced-motion` end to end.

---

## 6. Sequencing

```
P1 palette  ──►  P2 type (after live specimen lock)
   │                 │
   └──────┬──────────┘
          ▼
   P3 Shelf  ◄── P5 Wallace materials (feeds the spines)
   P4 Reader (parallel with P3; different surfaces, low collision)
          ▼
   P6 Motion convergence (polish pass across both surfaces)
          ▼
   Roy review per pass · four gates per PR · ADR-016 after direction validates live
```

P1 first and alone: it is the spine and it has the smallest blast radius (one token file). P2 needs the specimen lock before it builds. P3 and P4 touch different surfaces (library vs. guide) and can pipeline. P5 feeds P3 and can begin generating in parallel once the warmed palette exists to render against. P6 is the closing polish. Exploration for the shelf metaphor goes through Paper and Wallace first (static spines on both palettes), survivor iterates via `/impeccable live`, scored via `/critique`, the way the identity candidates were run.

---

## 7. Reading type: candidate shortlist + specimen plan

Constraints from Justin: uncommon, genuinely readable, modern, not Fraunces, not system Georgia, variable preferred (the reader sliders need live axes). Podkova display and JetBrains Mono mono are unchanged.

**Free / variable, screen-reading-grade (specimen first):**
- **Literata** — Google's variable serif built for long-form e-reading (optical size, warm, low ubiquity). Frontrunner for reading comfort plus the sliders.
- **Newsreader** — Production Type, variable, optical size, designed for on-screen reading. More character than Literata, still uncommon.
- **Spectral** — Production Type for Google, screen-first serif, calm and even. The safe-but-distinct option.

**More distinctive (pay-for-it, specimen if he wants more edge):**
- **GT Sectra** (Grilli Type) — scalpel/broad-nib contrast, editorial, uncommon.
- **Signifier** or **Roslindale** — high-contrast modern serifs with real personality, uncommon in portfolios.

**Plan:** two-round live specimen on real guide body copy, both modes, against the warmed P1 palette, mirroring how the portfolio locked Hedvig. Recommended first round: Literata, Newsreader, GT Sectra. Lock records into this brief and into ADR-016.

**Locked (2026-06-30, P2 build):** **Newsreader Variable** (`@fontsource-variable/newsreader`, opsz + wght axes). Specimen: `scratchpad/reading-room-type-specimen.html`. Round one ran Literata and Newsreader live; GT Sectra never rendered (Grilli Type commercial, no licensed file), so it was a Literata-vs-Newsreader call and Newsreader won. Type system: `font-optical-sizing: auto` (opsz tracks size). **Reading size locked live at 18px mobile / 20px desktop** (`text-lg` → `md:text-xl` on the guide prose components — `GuideParagraph`, `GuideList`, `GuideBlockquote`). Newsreader's short x-height reads visually small, so the nominal size runs higher than the outgoing Georgia did; 20px was the live keeper (19 felt a touch small, 22 too big). NOTE: the reading size lives on the prose components, not the `body` rule (which holds a 1.1875rem fallback for stray elements) — the two diverged historically, which is why a `body { font-size }` change reads as inert. **Consolidate into a single `--lab-reading-size` token in P4** so the reader's type-size slider has one lever. **Per-mode body weight via `--lab-body-weight`: dark 330 / light 400**, with `--lab-body-weight-strong` 560 / 620 for emphasis. Locked live 2026-06-30: a first build ran the reverse (dark heavier) on a halation theory, but by eye the standard bloom-trim direction won — dark runs LIGHTER. Light-on-dark Newsreader serifs bloom on the humus floor and go inky at 400, so 330 keeps them crisp at night; dark-on-cream strokes read thinner than they measure, so light runs 400 for presence. This matches the portfolio's direction (dark lighter), not an inversion. Record this in ADR-016 as a confirmed-by-eye call. Podkova display and JetBrains Mono unchanged.

---

## 8. Wallace plan (spine + cover materials)

- **Deliverables:** book-spine materials (binder cloth, pressed board, foil-stamp surfaces) and per-guide or per-territory cover textures for the shelf. Nothing else this batch.
- **Restraint:** material accent at the shelf anchor only. No full scenes, no per-section illustration, no wallpaper. Over-imaging reads as AI slop, and the lab's whole posture is the calm reader.
- **No baked text:** these are material surfaces (binder cloth, pressed board, foil-stamp), so titles, labels, and numbers don't belong on them — real labels are HTML in the build for accessibility and editability. This is a surface-appropriateness rule, not a model limit: Ideogram 4 renders text reliably (see the Wallace skill's typographic-craft notes), so text-bearing generation is fine on other surfaces.
- **Palette:** generate against the warmed humus dark and the cream light so the materials read as the same room in both modes. Record the dark/light material pairings.
- **Pipeline:** Wallace (local Ideogram 4) into the Impeccable review loop, the validated path. Playbook references in the Wallace skill.

---

## 9. Preserved, not touched

- The shipped house identity (sigil, Podkova logotype, colophon masthead). ADR-012 stands.
- The no-pure-black graphite floor (L 0.17). Locked; the warming re-hues, it does not darken.
- OKLCH-only color via named tokens. No hex, rgb, or named colors anywhere.
- The dual-var per-guide accent contract (`--guide-accent-dark` / `--guide-accent-light`), the one documented inline-style exception.
- Per-guide territory accents and the territory model.
- Light mode as warm cream paper (tuned, not rebuilt).
- All guide content (Workstream B is closed; this batch changes containers, not prose).

---

## 10. Risks and anti-goals

- **Skeuomorphic / twee shelf.** The "Wallace material spines" call keeps the layout editorial precisely to avoid a literal 3D bookshelf tipping into precious. Watch the slop bans: when a locked spec collides with an absolute ban, the ban wins.
- **Imagery creep.** Wallace is scoped to spines and covers. Resist expanding to scenes mid-build.
- **Losing the lab's identity to unification.** The serif body, the territory accents, and the reader metaphor are the guardrails. Convergence is warmth, composition, and motion, not erasure.
- **Type as an AI tell.** Fraunces is out for the same reason it left the portfolio. The specimen guards against the replacement reading generic.
- **Mobile reader rail.** A left rail on a 375px viewport is a known UX cliff; the rail must collapse cleanly, and the section nav must stay reachable.
- **Contrast regressions from warming.** Re-hue shifts every pair; re-run `wcag-check.py` across both modes as a P1 gate.

---

## 11. ADR recommendation

Write **ADR-016: Perihelion Visual Recalibration ("The Reading Room")** after P1 and the type specimen validate live, via `/invest-adr`. It records: the convergent-but-distinct thesis, the warm-humus palette decision against the L 0.17 floor, the locked reading serif, the shelf-as-editorial-spine direction, the margin-rail reader, the Wallace material scope, and the motion convergence. It refines ADR-013's "Perihelion follows its own separate path" line into "convergent grammar, distinct metaphor," and it advances ADR-009's lab-isolation toward its documented Stage 2 convergence (shared warmth and grammar, lab-tokens.css retained for the reading-serif and territory layers).

---

## 12. Open questions

- **Reading serif face:** unresolved by design; locks live in the P2 specimen. Shortlist in section 7.
- **Reader rail on mobile:** drawer vs. slim top affordance vs. a hybrid. Resolve in P4 exploration.
- **Nested definitions (old E):** interaction model still open (stack, breadcrumb, side-rail); sized during P4.
- **Per-territory vs. per-guide material families:** resolve when Wallace generation starts in P5 (per-territory is the cheaper, more legible default).
- **Shelf sort/scan model:** by territory (today's grouping) vs. a flatter catalog the eye reads as one shelf. Resolve in P3 exploration.
- **How far P6 motion goes:** shelf entrance choreography is the one ambitious moment candidate; keep to one per surface.
```
