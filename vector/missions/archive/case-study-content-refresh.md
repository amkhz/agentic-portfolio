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

## Decisions from Justin — RESOLVED 2026-06-22 (apply in step-3 pass)

**Slugs / titles (two-door pair):**
- Origin: KEEP `ai-leadership` slug, retitle to **"Pioneering AI Adoption."**
- Evolution: **new slug** `doctrine-not-prompts`, title **"Doctrine, Not Prompts."**
- Two-door *mechanism* (chooser vs linked slugs vs constellation) STILL OPEN — Tyrell to show options in Paper / talk through.

**Wallace:** ships as a **full case study** now (already drafted); lightly concised in step 3. Not a stub.

**IDR / SOW metric redlines (apply during step-3 metric weave):**
- Cleared for public as written: PSA review **−50%**, Prelim Title **−33%**, underwriter kickback **40-45% → ~30%**, **7%** borrower self-resolve.
- **Auto-complete rate:** the draft "more than a quarter" was an *early-cohort* number. Replace with the **all-borrowers figure ~17%** (raw notes: PSA toolkit auto-completion 6% → 17%). Lower, but the honest current number.
- **Analyst-edit rate:** DROP the **82%** claim; use the **raw-notes figure — 39% of PSA toolkits need zero field changes (61% need ≥1 correction).**
  - ⚠ **CONSEQUENCE:** the `instant-doc-review` **`heroMetric` in `case-studies.ts` is "82%" and is no longer supportable.** Needs a replacement hero number. Candidates: **50%** PSA review time, or **40-45%→30%** kickback. **Confirm hero replacement with Justin at step 3.**
- **Snapshot ship line:** change "Snapshot will replace them by the end of July" → **"Snapshot is planned to ship by July."** Also re-verify the **"UAT has been completed"** line is literally accurate at step-3 time before publish.
- **SOW:** **54% → 45%** condition rate via **SOW Recycle (31% adoption)** — cleared.
- **Instant Feasibility:** keep the skip % **fuzzy** (e.g. "around a fifth of FA reviews"), no exact figure. **Tell the "severed connection" guardrail story** (Risk deliberately refused to auto-skip AI-extracted SOWs to avoid a hallucinated-SOW black box) — cleared; strongest senior-judgment beat in the set.

**Attributions:**
- doctrine: **"Our Director of Product Management"** (role, no name) — cleared.
- instant-sow: **Tyler = Kiavi Experience Manager** is correct; EMs work very close to borrowers and routinely speak from the customer POV, so the customer-voice pull-quote stands.

**New idea (Justin, 2026-06-22):** evaluate a dedicated **Editor crew skill** for ruthless concision passes (would encode `feedback_strong_editor_concision` + voice-profile Phase 4 watch list; pairs with Joi for voice + Writer for content).
- **TODO before rolling our own: search the web for existing editor / prose-concision skills we can customize.** Local scan (2026-06-22) found no prose Editor in `.claude/skills/` — closest are `writer` (creation-leaning), `clarify` (UX microcopy), `distill` (UI complexity), none of which cut long-form prose.
- Build candidate for **tomorrow, BEFORE the step-3 concision pass**, so the pass runs through it.
