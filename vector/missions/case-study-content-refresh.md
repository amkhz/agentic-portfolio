# Mission — Plan B: Case Study Content Refresh

> Positions Justin as a design leader: concise, metrics-forward, organizational impact. Pairs with Plan A. Deadline ~6 days from 2026-06-20. Source material: `~/projects/port-sources/` (mapped in `plans/recalibration-sprint0-notes.md`). Voice: Joi profile (`core/content/voice-profile.md`). Writer-led (edits `core/content/*.md` + `core/content/case-studies.ts` only).

## The four pieces

**1. Instant Document Review — rewrite (replace existing).**
Source: `port-sources/instant-doc-review.md`. Lead on **metrics AND way-of-working**. Hard numbers: PSA review −50%, 82% ship AI output with zero analyst edits, 27% auto-complete in Processing, Prelim Title −33%, underwriter kickback 40–45%→~30%, 7% borrower self-resolve; prototype graduated into production. Replaces the thin `core/content/instant-doc-review.md`. Update `heroMetric` in `case-studies.ts` (currently a stale "75%").

**2. Two-part origin → evolution (keep both).**
- *Origin* = "Pioneering AI Adoption" (`ai-leadership.md`): workshops, 6-step playbook, Big Flip, 100% tool adoption.
- *Evolution* = "Doctrine, Not Prompts" (new, from `port-sources/doctrine-not-prompts-case-study.md`): operating model, doctrine files, Kiavi World, four proof points, Tech Summit talk. Background quarry: `port-sources/ai-assisted-design-at-kiavi.md` (internal-voiced; mine, don't paste).
- **Reader chooses entry — origin or evolution.** Needs a small IA/interaction decision (two-door chooser vs. linked slugs vs. constellation-style). Shape/Dreamer call before build.
- Positioning watch-out: distinct from IDR — **IDR = product depth + hard metrics; this pair = operating model + org leadership.** Snapshot is hero in IDR, a proof point here.

**3. Instant SOW / Feasibility — light refresh.**
Light project (returning to it later). Refresh existing `instant-sow.md`; new asset = the Draws/SOW screenshot (`port-sources/Screenshot 2026-06-20 at 5.26.17 PM.png`). Don't over-invest.

**4. Wallace — new standalone case study.**
Origin + use of the local image-gen pipeline. Proof = the Sprint 0 renders themselves. Perihelion Works earmarked as eventual fuller home; ships on the portfolio work index for now.

## Constraints (non-negotiable)
- **No em-dashes** in copy (`feedback_no_em_dashes`) — sources contain `--`; restructure when adapting.
- **No permission/gatekeeper framing** (`feedback_no_permission_framing`).
- Joi voice profile throughout.
- Metrics framed with discretion where confidential (relative framing OK).

## Dependencies & mechanics
Content is independent of Plan A except cover art (from Plan A Phase 3 imagery — use drafted-object/Conservatory covers; placeholders until then). Registry/parser work (`case-studies.ts`, `parse-case-study.ts`) if the two-door piece needs a new section/template type — that's Tyrell, not Writer. Writer drafts in `core/content/`; Roy reviews content quality + voice.

## Decisions owed from Justin
- **Two-door mechanism** for the origin/evolution pair (I'll propose options via `/shape`).
- **Slugs/titles**: keep `ai-leadership` slug for the origin, or retitle? New slug for "Doctrine, Not Prompts."
- **Wallace piece scope** for this push: full case study now, or a strong stub that grows.
- Any **confidential-metric** redlines on the IDR numbers before they go public.
