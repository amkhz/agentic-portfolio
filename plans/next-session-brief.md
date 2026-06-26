# Pickup Brief — Post-M1 close (Type Stack v2 locked + tuned, doctrine synced)

Updated end of 2026-06-25. Two open branches off `feat/conservatory-tokens`:
- **`feat/type-v2`** → M1 type stack + T1c tuning (`fdbf1e2`). Carries T1e's DESIGN.md + ADR-013 lock.
- **`docs/doctrine-sync-adr013`** → T-L4 doctrine sync (`07d2207`).

Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest — read it first).

## Where we left off

**M1 — Type Stack v2: FULLY CLOSED.** Stack E — Hedvig Letters Serif (display) / Figtree (body) / JetBrains Mono (kicker).
- M1 core shipped `5ef5591` (font swap, `--body-weight: 350` dark trim, #5 side-stripe fix, harness removed, DESIGN.md + ADR-013 lock, drop caps struck).
- **T1c typeset pass** `fdbf1e2` (this session): purged faux-bold on the single-weight Hedvig (TocLinkList `font-medium`, NotFoundPage `font-bold`) + added `font-synthesis: none` guard; section headings → `text-2xl sm:text-3xl`; display leading `--leading-tight` 1.1 → 1.2; macOS grayscale antialiasing on body. Hero kerning eyeballed + locked. Pull-quote/callout (T1d) confirmed both modes. Justin-approved live.
- **T-L4 doctrine sync** `07d2207` (this session): PRODUCT.md + VECTOR.md (P3 + Hard constraints) + ARCHITECTURE.md (Stack L62 + Styling) → Stack E lock; dropped Fraunces-only opsz/SOFT/WONK refs.
- lint/build/test green (139 tests).

**First housekeeping next session:** PR both branches into `feat/conservatory-tokens` — `feat/type-v2` first (brings code + DESIGN.md lock that T-L4's prose references), then `docs/doctrine-sync-adr013`. No file collisions between them.

Decisions banked: drop-caps struck · instant-dscr OUT (revisit later) · PR/ADR citations confirmed.

⚠ **Branch hazard noted:** don't `git checkout` away from `feat/type-v2` while its dev server runs — the doctrine branch off `conservatory-tokens` predates the `node_modules` font swap, so `main.tsx` imports a Fraunces that's no longer installed → Vite error. Stop the server first, or `npm install` after switching.

## Next — the surfaces phase (all now have the new faces they waited on)

1. **T-L1 Wordmark/header in Hedvig** (`/impeccable live`) — "Justin Hernandez" as a display moment, NOT hand-lettered. `src/components/layout/Header.tsx`. Quick. Branch `feat/wordmark`.
2. **T3c → T3d** — Writer drafts the About "What I've built at Kiavi" subsection (anonymized, Joi voice), then bring About/Resume to the Conservatory register + Hedvig/Figtree. Share a branch or sequence T3c→T3d (same surface).
3. **M2 Imagery** (parallel, no type dep) — Wallace renders hero + hub cover (T2a) and the per-project drafted-object mark SET (T2e: square work-index + 4:5 plate, one family, fixed seeds). Then wire `mark` field on `CaseStudy` (T2f). **External deps you own:** the per-project object list + the screenshot captures (T2b) per `image-punchlist.md`.

## Then the rest of the batch

- **M3 Notes/posts + folds** — new content type (needs a quick content-type ADR first via `invest-adr`) → manifesto / Five-Ways / 2026 retro posts. Then verified PR/ADR citations into existing studies (T3f).
- **M4 Motion** (fast-follow, LAST) — via interface-craft (Storyboard + DialKit) + `/impeccable animate` backup. Hold until surfaces settle so durations tune against final layouts.
- **Loose ends:** mark decision-record ADR (Dreamer, lightweight — the call's made).
- **Gates:** Lighthouse 95+ per surface → Impeccable `/critique` + `/polish` (final design QA) → **Roy final review** → merge `feat/conservatory-tokens` → main.

## Critical path
M1 (done) → surfaces (wordmark, About/Resume) → motion → Impeccable critique+polish → Roy → main.
