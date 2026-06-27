# Pickup Brief — M3 DONE (notes infra + prose + case-study verification); M4 motion + gates next

Updated 2026-06-27 (night). Integration branch is **`feat/conservatory-tokens`** (all M3 work merged + committed here; latest content `8bac8d0`). Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest).

## Where we left off (this session — night of 2026-06-27)

**M3 is done, end to end.** Notes content type built + merged (T3a, ADR-015), two posts written and Gaff-passed (T3b), and the two existing case studies verified (T3f). All on `feat/conservatory-tokens`; every gate green throughout (build, 147 tests, lint). Per-task detail in **M3 — DONE** below.

Also this session: added `/scratchpad/` to `.gitignore` (`89dac3a`) so internal receipts can't leak into the public repo, and saved a memory — no internal PR/ADR IDs in public-facing copy.

**Two non-blocking follow-ups carried forward:**
- NotesPage hero reuses `/images/work-hero.png` at 40% as aria-hidden atmosphere. Fine as interim; consider a dedicated notes hero or going type-only later.
- Sitemap generator (`scripts/generate-sitemap.ts`) is broken under Node 25 (`ERR_UNKNOWN_FILE_EXTENSION` on the `.md?raw` imports) — pre-existing. `/notes` was added by hand. Worth a vite-node fix before relying on it for note slugs.

## M3 — DONE ✅
- **T3a** ✅ notes infra (ADR-015): frontmatter + glob, shared case-study body grammar, `/notes` + `/notes/:slug`, empty-state, nav. Merged to integration branch.
- **T3b** ✅ **two** posts live in `core/content/notes/` (Joi voice, Gaff-passed, no em-dashes, coworkers anonymized, no internal numbers):
  - `design-infrastructure-not-just-designs.md` — the manifesto (argument form, ADR-014).
  - `five-ways-i-work.md` — practice principles (Justin rewrote + owns the personal Way-1 voice).
  - **Retro CUT** (`from-one-prototype-to-a-workshop.md` deleted) — too redundant with the doctrine-not-prompts case study. wins.md material stays a receipts source, not a post.
- **T3f** ✅ Justin's call: **no PR/ADR citations** in the external case studies (decided against; internal IDs mean nothing to readers + leak structure on a public repo). Only two factual fixes landed (`e812941`): designer ramp reconciled to "inside 2 months" across both studies; "ship by July" → "ship by the end of July". All IDR metrics verified accurate by Justin, unchanged. Worksheet archived at `scratchpad/t3f-verification-worksheet.md` (gitignored).

## Next — the tail, then gates
- **T2d** (optional) — formal alt-text audit pass on the new imagery. Largely satisfied already; a dedicated pass is optional.

## Next big batch — M4 Motion (its own session)
Surfaces are settled, so motion is unblocked — but it's a **substantial batch, not a quick follow-up.** Worth opening with a planning pass (scope T4a→T4d, decide the "one ambitious moment per surface" list) before building. Sequence:
- **T4a** motion tokens (`design-system/tokens.css`) — durations + ease-out-expo + `prefers-reduced-motion` strategy.
- **T4b** surface choreography (interface-craft Storyboard DSL + DialKit live tuning; `motion/react`) — section reveals, hover weight/axis shifts, cover parallax, case-study page transitions. No bounce/elastic/scroll-jacking.
- **T4d** Paper Shaders spike (`plans/paper-shaders-reference.md`) — SPIKE FIRST; settle whether the shader `colors` prop takes `oklch()` before any ship. Optional ship.
- **T4c** interface-craft Design Critique on the motion.

## Final gates (after M4)
Lighthouse 95+ per surface → Impeccable `/critique` + `/polish` → **Roy final review** → merge `feat/conservatory-tokens` → `main`.

## Critical path
surfaces ✅ → M2 imagery ✅ → M3 notes + prose + verification ✅ → **M4 motion** → Impeccable critique+polish → Roy → merge to main.

## Open items / notes
- **Post source material** lives in `port-sources/`: `practice.md`, `wins.md`, `ai-assisted-design-at-kiavi.md`, plus the manifesto drafts.
- `port-sources/SCREeN/` still holds the original screenshots (copied, not moved) — safe to clean up whenever.
- **`case-studies.ts` collision chain** still applies (manifest flag #2): T3a → T3b/T3f → T2f (done) → T2d. No parallel worktrees on `case-studies.ts` + case-study `.md`.
