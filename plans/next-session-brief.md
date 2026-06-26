# Pickup Brief — Surfaces phase landed; next up is M2 Imagery (Wallace)

Updated end of 2026-06-25. Integration branch is **`feat/conservatory-tokens`** — everything below is merged into it. Full batch plan: **`vector/missions/post-recalibration-batch.md`** (the manifest — read it first).

## Where we left off (this session)

All merged into `feat/conservatory-tokens`, lint/build/test green (139 tests):

- **Housekeeping** — merged the two M1 branches in: `feat/type-v2` (type stack + T1c tuning) and `docs/doctrine-sync-adr013` (T-L4). Both fully integrated.
- **T-L1 Wordmark** ✅ — "Justin Hernandez" header is now a Hedvig display moment (`font-display`, dropped the single-weight faux-bold, `text-lg → text-xl`). `src/components/layout/Header.tsx`.
- **T3c — Kiavi "body of work"** ✅ — IA decision (see **ADR-014**): the "what I've built at Kiavi" overview lives as a **"Beyond Workshops" breadth layer on the `design-infrastructure` hub**, NOT an About subsection and NOT a standalone study. Added optional `hub.bodyOfWork` to the `CaseStudy` model; rendered below the doors in `HubPageTemplate` (`BodyOfWorkItem`). Copy Writer-refined + Joi voice-audited, anonymized. Source: `port-sources/practice.md`.
- **T3d — About/Resume register pass** ✅ — About: hero kicker → mono brass; the stacked prose sections (Life/Beliefs/Elsewhere/Contact) → editorial composition with **marginal mono numbering** via new `src/components/content/EditorialSection.tsx` (DESIGN.md L93); added the ADR-014 hub pointer. Resume: 3 mono-kicker face fixes only (no content change, PDF untouched). All About bio copy preserved verbatim.

**Merged branches safe to delete** (all fully integrated): `feat/type-v2`, `docs/doctrine-sync-adr013`, `feat/wordmark`, `feat/kiavi-body-of-work`, `feat/about-resume-register`.

## Next — M2 Imagery (Wallace). START WITH THE INTERVIEW.

This is the planned focus for the fresh session. Wallace work has **no type dependency** and does **not** wait on Justin's screenshot-gathering (that's T2b, external, separate).

**First action: run the Wallace interview** before generating anything. It settles:
1. **Per-project object identity (T2e)** — one "drafted fantastical object" per case study (~5). Justin names them, or Wallace proposes a candidate object per project for approval.
2. **The shared render recipe** — palette / paper / line-treatment so the set reads as one family: modern technical-schematic on natural paper, NOT steampunk/patent (`plans/recalibration-sprint0-notes.md`, `feedback_imagery_restraint`, `feedback_no_flat_color_covers`).

Then, in order:
- **T2a** — Wallace renders `wallace-hero.png` (north-star atelier) + `design-infrastructure.png` (hub cover) at exact slot aspect/crop, atmospheric (never flat panel), `V4_QUALITY_48`, fixed seeds. Branch `feat/imagery-wallace`.
- **T2e** — render ONE reference mark first → Justin approves the language → batch the rest with seed discipline. Two crops per project: **square** (work-index `Thumb` in `TocLinkList`) + **4:5 plate** (`DraftedObjectMark`). Branch `feat/imagery-marks`.
- **T2f** (after T2e) — wire a `mark?: { src; alt }` field on `CaseStudy`; point `WorkPage` thumbnails + `DraftedObjectMark.src` at the renders. Slots are already placeholder-aware (`isRealImage()` guard), so this is additive. Branch `feat/marks-wire`. ⚠ `case-studies.ts` collision — coordinate with the content chain.

**Justin owns externally:** the per-project object list (interview input) + the screenshot captures (T2b) per `image-punchlist.md` (10 missing + 8 hi-res re-shoots). These can be gathered in parallel; they block T2c verification, not Wallace generation.

## Then the rest of the batch

- **M3 Notes/posts (T3a→T3b)** — needs a quick content-type ADR first (`invest-adr`: extend `case-studies.ts` pattern vs new `posts.ts`). Then Writer drafts the manifesto ("Design infrastructure, not just designs" — same one-liner as the hub, but the *argument* form per ADR-014) / Five-Ways / 2026 retro. Then verified PR/ADR citations (T3f).
- **M4 Motion** (fast-follow, LAST) — interface-craft (Storyboard + DialKit) + `/impeccable animate` backup. Hold until surfaces settle. New **T4d** spikes a Paper Shaders (`@paper-design/shaders-react`) atmospheric layer over the M2 Wallace renders — material light to complement the choreography. Reference brief: `plans/paper-shaders-reference.md` (verified API + Conservatory shortlist + the OKLCH-vs-hex question to settle).
- **Gates:** Lighthouse 95+ per surface → Impeccable `/critique` + `/polish` (final design QA) → **Roy final review** → merge `feat/conservatory-tokens` → `main`.

## Critical path
surfaces (done: wordmark, hub, About/Resume) → **M2 imagery** → M3 notes → motion → Impeccable critique+polish → Roy → main.
