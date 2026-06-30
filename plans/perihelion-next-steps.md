# Perihelion: next steps

> Living punch list for the lab at `labs.justinh.design`. First written 2026-04-21 (rename session); slimmed 2026-06-30 to cut the append-only history that had grown to ~27k tokens. The full PR-by-PR changelog now lives in git history and in `vector/missions/archive/` (one mission log per shipped PR). This file keeps current state, the durable locked decisions, and the open threads.

**Active visual lane:** the remaining lab visual work is reframed as a full recalibration, **"The Reading Room"** — see `plans/perihelion-visual-recalibration-brief.md`. That brief is authoritative for everything visual (palette, type, the shelf, the reader, Wallace, motion). The old Workstream C / D / E framing below is superseded by it.

---

## Current state (2026-06-30)

**Shipped and closed:**

- **Workstream A — origins intro / library welcome.** Welcome triptych, MANIFESTO, T5/T6 polish.
- **Workstream B — content sweep, all eight guides through both passes** (B.1 format + B.2 voice): quantum-gravity, dird-13, emergent-quantization, dird-14, dird-15, dird-28, uap-field-map, uapx-field-methods. Closed 2026-06-10. Glossary, callouts, inline definitions, voice all canonical; em-dashes zeroed across the library.
- **Workstream C — lab design system.** C.1/C.1.5 graphite dark tokens (no pure black, L 0.17 floor), C.2 emoji-to-icon sweep + curated `sectionIcons` (PR #113), C.3 light-mode activation (warm cream paper, live on both surfaces, PR #117), GuideCard hover refinement.
- **Workstream D — house identity.** Instrument sigil + Podkova logotype + colophon masthead, dual register (emission/ink), favicon and house OG card. **ADR-012 accepted.** Shipped via PR #125/#126; launched publicly on LinkedIn 2026-06-12.

**Now active:** the visual recalibration ("The Reading Room", brief linked above). It absorbs the old C-followon / D-polish / E lanes. Direction calls are locked in the brief; first build step is P1 palette warming in `design-system/lab-tokens.css`.

For the detailed shipped record (PR numbers, mission logs, per-guide notes), see git history of this file and `vector/missions/archive/`.

---

## The mission

Justin is building Perihelion for himself AND to invite other designers who have not yet considered frontier science. The invitational posture is load-bearing. Every design and content decision on the lab is tested against:

> *Does this open the door for a designer who has never considered frontier science, or does this gatekeep?*

This principle is why the naming session rejected obscure-as-flex candidates (Wunderkammer, Syzygy, Orrery, Alembic) in favor of a word that rewards curiosity without demanding credentials.

---

## Locked decisions (cumulative)

| Decision | Status |
| --- | --- |
| Brand: **Perihelion** | Locked |
| Arms: **Archive** (research) + **Works** (applied design), peers not pipeline | Locked |
| Umbrella tagline: "closest approach to the frontier" | Locked |
| Archive tagline (preserved): "A reader's notebook. Designed to be prep, not product." | Locked |
| Voice reference: `core/content/voice-profile.md` (Phase 3.1) | Locked, production-ready |
| Icon libraries: Lucide + Phosphor as defaults | Locked |
| House identity: Instrument sigil + Podkova logotype + colophon masthead | Locked, shipped (ADR-012) |
| Subdomain: stays at `labs.justinh.design` | Locked |
| Dark-mode register: graphite (`--lab-bg-deep` at L 0.17, ~#0e0f13), not pure black. Future design-system work stays in the graphite L 0.15-0.25 range. See [[feedback_lab_no_pure_black]] | Locked 2026-05-25 |
| No emojis in guide markdown; visual icons come from the renderer (Lucide + Phosphor). C.2 swept existing guides into compliance; the curated `sectionIcons` frontmatter system is the icon source (spec PR #110, build PR #113) | Locked |
| Kicker vocabulary: three blessed values — `DIRD Guide Series`, `Research Guide Series`, `Synthesis Guide` | Locked 2026-06-09 |
| Multi-paper synthesis guides: one primary `source.url` (+ `arxiv:` where applicable), additional papers in `source.notes` | Locked 2026-06-09 |
| Schema: `slug:` (not `id:`); `territory:` / `status:` / `arxiv:` adopted into canonical frontmatter | Locked 2026-05-03 |
| Format spec mirrored at `plans/perihelion-format-rules.md`; canonical lives upstream in `~/projects/design-futures/` | Locked 2026-05-03 |
| Glossarian installed as a project skill at `.claude/skills/glossarian/` | Locked 2026-05-03 |
| Light-mode direction: warm cream paper, sourced from portfolio light tokens with justified modifications | Locked, shipped (C.3) |
| **Visual recalibration ("The Reading Room"): warm palette toward humus (hold L 0.17), Wallace material-spine bookshelf, left-margin reader rail, uncommon variable reading serif (no Fraunces/Georgia), Wallace scoped to spine+cover materials** | Locked 2026-06-30 (direction); build via the brief |
| Tagline evolution when Works ships | Open (Q6) |

---

## Open workstreams

### Visual recalibration — "The Reading Room"

The active lane. Six passes (P1 palette warming → P2 reading type → P3 the Shelf → P4 the Reader → P5 Wallace materials → P6 motion convergence). Full scope, sequencing, type shortlist, risks, and the ADR recommendation are in `plans/perihelion-visual-recalibration-brief.md`. **Workstream E (nested definitions / drill-down terms)** folds into P4 (the Reader); the brief carries its open interaction-model prompts (stack vs. breadcrumb vs. side-rail, depth cap, mobile cliff).

### Identity follow-ons (post-D, not yet done)

- Manual Safari/Firefox QA on the mark: attribute mask, offset-path transit/drift, mid-session theme flip (offset-path failure degrades to a static stray dot, not broken layout).
- Favicon re-derivation (dot + arc fragment, never a scaled sigil) and per-guide OG cards (accent dots need their own recorded contrast matrix; verify SVG filters survive the satori pipeline if generated).
- D's Kepler plate noted in ADR-012 as a candidate (not committed) for the manifesto ornament's large register; decide when the manifesto ships.
- Tokenize lockup metrics / extract a lockup component when Works renders it a second time.

---

## External coordination

Guide authoring lives upstream in `~/projects/design-futures/`, where another Claude instance is the active author and source-library curator. The portfolio is the publishing surface and the home of the renderer + reading experience.

**Mirrored into this repo:**

- `plans/perihelion-format-rules.md` — canonical schema and conventions.
- `plans/archive/perihelion-format-alignment-brief.md` — execution spec for B.1.

**Adapted, not mirrored:**

- `.claude/skills/glossarian/` — project-level skill adapted from `~/projects/design-futures/Glossarian/SKILL.md`; uses `scripts/report-orphan-terms.ts` and bash/grep against local paths.

**Consulted upstream, not mirrored:**

- `~/projects/design-futures/guide-library-tracker.md` — build queue + source library status.
- `~/projects/design-futures/sources/` — source PDFs and notes. Glossarian and audit scripts read from here for grounding.

**Intake convention.** When the upstream Claude finishes a new guide, Justin drops the file in `core/lab/guides/`; Tyrell runs B.1 alignment + ingest.

**Sync convention.** Mirrored docs carry a "Snapshot synced YYYY-MM-DD" header. Portfolio-side schema deviations (slug/territory/status/arxiv) are noted inline so a re-sync does not regress them. The design-futures dir is not under version control ([[reference_design_futures_repo_posture]]), so cross-repo syncs are one-shot in-session edits reported back in the session summary.

---

## Reminders / pending confirmations

- **DIRDs 14 and 28 `source.authors` slot — resolved to institutional fallback** (`DIA / AAWSAP Program`) per the FOIA-redaction note ([[reference_dird_pdf_authors_redacted]]). Research note at `vector/research/dird-authorship.md`. Resume personal-author research only when bandwidth + curiosity align.
- **DIRD 13 `Puthoff et al.` vs. `Hal Puthoff`** — small open; tighten if `et al.` is unsourced, otherwise keep. Listed in `vector/research/dird-authorship.md`.
- **Upstream sync of the colon-separator convention** — the portfolio renderer uses a colon as the inline-definition gloss separator, diverging from the upstream spec's em-dash. Carry back to `~/projects/design-futures/guide-format-rules.md` on the next sync.
- **Upstream sync of the `Synthesis Guide` kicker** — third blessed kicker value lives in the portfolio mirror only; carry it upstream alongside the colon-separator sync.

---

## Open question

**Q6 — Tagline evolution when Works ships.** Keep "closest approach to the frontier" at the umbrella, or evolve it to explicitly name both arms? Decide closer to the Works launch. Nothing in the masthead lockup hard-binds the tagline to the house mark, so this stays open.
