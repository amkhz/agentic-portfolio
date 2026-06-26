# Pickup Brief — M2 Imagery landed; next is M3 Notes/Posts (and Justin's screenshots)

Updated 2026-06-26. Integration branch is **`feat/conservatory-tokens`**. Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest). Latest commit: **`25b0de2`** (M2 imagery).

## Where we left off (this session) — M2 Imagery DONE ✅

Committed to `feat/conservatory-tokens` (`25b0de2`), lint/build/test green (139 tests). All Wallace renders done locally via `mflux-generate-ideogram4` (drafts in **`mocks/m2-imagery/`**, gitignored — captions + scripts + sweeps live there, ~128M, on this machine only).

- **T2a Heroes** ✅ — `V4_QUALITY_48` finals placed:
  - Home hero (`conservatory-hero.png`) = **atrium** (seed 8603)
  - `/work` hero (`work-hero.png`, NEW hero on WorkPage) = **atelier** (8704)
  - Wallace page (`wallace-hero.png`) = **self-portrait** (8802) — the Caption Engine made real
  - IDR hero (`idr-hero.png`) = crop of `admin-page-tasks.png` (Action Required panel)
  - SOW hero (`sow-toolbox-hero.png`) = crop of `sow-toolbox.png` (the AI toolbox card)
- **T2e Marks** ✅ — six drafted-object schematic marks, **all baked text stripped** (Ideogram gibberish risk — see memory `feedback_no_baked_text_in_marks`; residual tiny dimension ticks accepted by Justin). Picked v2 seeds: Caption Engine **8902** (wallace), Reading Loom **8911** (idr), Scoping Armature **8923** (sow), First-Light **8932** (ai-leadership), Doctrine Core **8942** (doctrine), Design-Infra lattice **8952** (hub thumb). Cropped to text-free 4:5 plates + square thumbs via PIL/`sips`.
  - ⚠ Marks are **V4_DEFAULT_20 drafts cropped**, NOT 48 finals (Justin picked the exact drafts; re-rendering at 48 would change composition). Optional later upgrade.
- **T2f Wiring** ✅ — new `mark?: { src?; thumb?; alt }` on `CaseStudy`. Plates → `DraftedObjectMark` on shells; square thumbs → work-index `TocLinkList` (Home + WorkPage). Descriptive alt on every mark.
- **Bonus fixes** ✅ — `ImageBlock` `bare` covers now `object-cover` (fill to frame; was a contain bug → hero letterboxing). New `HeroScrim` (token-only top/bottom/left scrim; top fade blends a full-bleed hero under the sticky header, worst in light mode) on Home + `/work`. Atelier render featured in the Wallace case-study **body** (`wallace.md`, "The Proof Is This Portfolio").

## Next — pick up either track

**Track A — M3 Notes/Posts** (no external dependency, ready now):
- **T3a** — quick content-type ADR first (`invest-adr`: extend `case-studies.ts` pattern vs new `posts.ts` + `parse-post.ts`), then build the type (parser, registry, route, list + detail). Branch `feat/notes-content-type`.
- **T3b** (Writer, after T3a) — manifesto ("Design infrastructure, not just designs", the *argument* form per ADR-014) / "Five Ways I Work" (`practice.md`) / 2026 retro (`wins.md`). Joi voice, no em-dashes, anonymize internal names.
- **T3f** (Writer) — verified PR/ADR citations into `doctrine-not-prompts.md` + `instant-doc-review.md`. **Justin verifies the numbers before publish.**

**Track B — finish M2 imagery** (needs Justin's screenshots, see below):
- **T2b** (Justin, external) — re-shoots per `image-punchlist.md`. **IDR especially**: the current `admin-page-tasks.png` crop is a good interim, but the punch list still wants the missing/hi-res set.
- **T2c** — wire + verify (no broken paths, low-res `meta-*` replaced). Then the `case-studies.ts` chain: T3f → T2f-touchups → **T2d** alt-text audit.

## Then the rest of the batch
- **M4 Motion** (fast-follow, LAST) — interface-craft (Storyboard + DialKit) + `/impeccable animate`. **T4d** spikes a Paper Shaders (`@paper-design/shaders-react`) atmospheric layer over the M2 renders. Reference: `plans/paper-shaders-reference.md`. Hold until surfaces settle.
- **Gates:** Lighthouse 95+ per surface → Impeccable `/critique` + `/polish` → **Roy final review** → merge `feat/conservatory-tokens` → `main`.

## Critical path
surfaces ✅ → **M2 imagery ✅** → M3 notes → motion → Impeccable critique+polish → Roy → main.

## Justin's open to-dos (external)
- **Image punch list: `image-punchlist.md`** (repo root) — 10 missing screenshots + 8 hi-res re-shoots of the low-res `meta-*` set (currently ~1400px; target 3840px). Drop files at `public/images/<name>` and they auto-wire (paths already referenced). These block T2c verification, nothing else.
