# Pickup Brief — Post-M1 (Type Stack v2 shipped)

Updated end of 2026-06-24. Branch **`feat/type-v2`** (off `feat/conservatory-tokens`).
Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest — read it first).

## Where we left off

**M1 — Type Stack v2: DONE + committed (`5ef5591`).** Faces re-locked from Fraunces/Source Sans to **Stack E — Hedvig Letters Serif (display) / Figtree (body) / JetBrains Mono (kicker)**. Shipped in one commit:
- `@fontsource` swap (Figtree variable + Hedvig 400; Fraunces + Source Sans uninstalled); `@theme` tokens swapped; Fraunces axis tuning retired.
- Dark-mode body weight trimmed (`--body-weight: 350`) to counter Figtree bloom on humus-black.
- **#5 side-stripe fixed:** QuoteBlock + CalloutBlock dropped the `border-l-[6px]` brass/green stripes; pull-quote re-treated as a hanging brass quotation mark.
- Dev font-preview harness removed.
- Doctrine synced: DESIGN.md type lock + ADR-013 type-v2 amendment; **drop caps struck**.
- lint/build/test green (139 tests).

Decisions banked: **drop-caps struck · instant-dscr OUT (revisit later) · PR/ADR citations confirmed.**

## Open before M1 fully closes (start here tomorrow)

1. **`/impeccable typeset` pass (T1c)** — the one M1 task left, deliberately held for a live eye. Hedvig+Figtree are in; tune hierarchy/sizing/leading both modes (Hedvig is single-weight — tune size/leading, not weight). Confirm the `--body-weight: 350` value suits Figtree (nudge 350–380 if needed). Walk Home + a case study, night + day.
2. **Eyeball the new pull-quote/callout** on a real case study (e.g. instant-doc-review) — confirm the hanging-mark quote and bordered callout read right in both modes.

## Then the rest of the batch (manifest has full scope, owners, collisions)

- **T-L4 doctrine sync** (after typeset) — PRODUCT.md + VECTOR.md (P3 "faces not yet locked") + **ARCHITECTURE.md (Stack L62 + Styling L214, stale "Fraunces/Geist")** → new lock.
- **M2 Imagery finals** — Wallace renders (`wallace-hero.png`, `design-infrastructure.png`) can start anytime; Justin's screenshot captures are the external dependency. Punch list: `image-punchlist.md`. **+ per-project mark SET (T2e/T2f):** the FIG.0X work-index squares + case-study plates are Wallace "drafted-object" marks (decided 2026-06-24) — render as a family, then wire a `mark` field on `CaseStudy`. Needs the per-project object list first.
- **M3 Notes/posts + folds** — new content type (needs a quick content-type ADR) → manifesto/Five-Ways/retro posts + About-Kiavi section + About/Resume register pass + verified citations.
- **M4 Motion** (fast-follow, LAST) — via interface-craft (Storyboard + DialKit) + `/impeccable animate` backup.
- **Loose ends:** wordmark/header in Hedvig (`/impeccable live`); mark decision-record ADR (Dreamer, lightweight — the call's made).
- **Gates:** Lighthouse 95+ per surface; then **Impeccable `/critique` + `/polish`** (final design QA); then **Roy final review** before `feat/conservatory-tokens` → main.

## Critical path
type (done) → `/impeccable typeset` → surfaces on new faces (wordmark, About/Resume) → motion → Roy → main.
