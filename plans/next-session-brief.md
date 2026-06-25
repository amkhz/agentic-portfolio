# Next-Session Planning Brief — Post-Plan-B Recalibration

Handoff from the 2026-06-24 session (Gaff + content concision + Design
Infrastructure hub all shipped in commit `225ad9f` on `feat/conservatory-tokens`).
This brief seeds a fresh planning session: audit outstanding work, fold in three
new threads, then use **invest-crew** to scope missions.

## 1. Plans / missions status (audited 2026-06-24)

| Doc | Status | Action |
|-----|--------|--------|
| `vector/missions/case-study-content-refresh.md` | DONE | Close out. Shipped in 225ad9f. |
| `vector/missions/conservatory-surfaces.md` | ~done | Lab CTA now wired; Building-This drafted + concised. Remaining folds into below. |
| `vector/missions/conservatory-visual-build.md` | ACTIVE | Carries the real outstanding items (below). |
| `plans/portfolio-visual-recalibration-brief.md` | SUPERSEDED by ADR-013 | Archive / mark historical. |
| `plans/portfolio-adr-011-implementation-plan.md` | SUPERSEDED by ADR-013 | Archive / mark historical. |

### Outstanding items still worth doing
- **Wallace imagery finals** (M/L) — 12 missing images + 8 low-res to replace. See `image-punchlist.md`. Several are screenshots Justin captures; `wallace-hero.png` + `design-infrastructure.png` (hub cover) are Wallace-generatable.
- **Doctrine sync: PRODUCT.md + VECTOR.md to ADR-013** (S) — flagged required in ADR-013, NOT yet done. Conservatory lives in DESIGN.md but isn't synced to the principle files. Real gap.
- **Roy final review** of all surfaces vs ADR-013 (M) — last review was "SHIP WITH NOTES" (2026-06-21); confirm notes actioned.
- **Font axis tuning** (S) — NOW SUPERSEDED by the font reconsideration (thread 2). Don't tune Fraunces; re-evaluate the stack first.

## 2. NEW THREAD — Type stack reconsideration (Justin, 2026-06-24)

Justin has second thoughts on the locked faces; **Fraunces (display serif) reads as an AI tell**. He likes **Albert Sans** (geometric-humanist sans) but Impeccable uses it and he doesn't want to copy. Wants to SEE fonts similar to Albert Sans + a few pairings that fit the Conservatory.

**Candidates similar to Albert Sans (geometric-humanist, clean, warm):**
- Google Fonts: **Onest**, **Figtree** (closest DNA), **Hanken Grotesk**, **Schibsted Grotesk**, **Familjen Grotesk**, Instrument Sans.
- Free non-Google (Fontshare/GitHub): **Mona Sans** + Hubot Sans, **General Sans**, **Switzer**, Satoshi.
- AVOID (overused / AI-tell): Inter, Plus Jakarta Sans, Poppins, Montserrat, Geist (getting common), Fraunces.

**Display question (the fork):** keep a serif but swap Fraunces for something less ubiquitous (**Newsreader**, **Spectral**, **Hedvig Letters Serif**, **Instrument Serif**), OR drop the serif and go display-sans (a characterful grotesque like **Schibsted Grotesk** / **Bricolage Grotesque** paired with an Albert-adjacent body). Mono kicker (JetBrains) can stay or swap.

**Recommended next step:** build a live HTML specimen (like the hub mock) with 3-4 complete stacks on real Conservatory copy, both modes, so Justin can shape — or run `/typeset` + `/impeccable live`. This is a real direction change: it touches DESIGN.md's type lock, `design-system/tokens.css` font tokens, and warrants an ADR amendment. Faces were "locked + Justin-approved 2026-06-21" — reopening that is deliberate.

## 3. NEW THREAD — Integrate practice.md + wins.md

Source (Justin's work-Claude): `~/projects/port-sources/practice.md` ("how Justin works") + `wins.md` (dated wins log). Assessed 2026-06-24.

**Recommendations (highest ROI):**
1. **New "notes/posts" content type** (portfolio has none today) — unlocks short standalone pieces: the "design infrastructure, not just designs" manifesto, "Five Ways I Work", a "2026 retrospective" from wins.md. Needs a parser/registry decision (Tyrell).
2. **About-page addition:** a "What I've built at Kiavi" subsection (~200-300 words) from practice.md's eight deliverables.
3. **Possible new case study:** the instant-dscr screen-polish harness ("build the workflow, then run it") — distinctive, meaty enough for its own study.
4. **Add PR/ADR citations** to doctrine-not-prompts / instant-doc-review where wins.md supplies them.

**Guardrails:** anonymize internal team names (Matt/Caro/Brenno) and generalize internal product names before publishing; PR/ADR numbers are from working memory — verify before any public citation. Kiavi World system description is already covered in doctrine-not-prompts (don't duplicate).

## 4. Suggested plan shape (for invest-crew)
Three candidate missions to scope:
- **Mission: Type stack v2** — specimen → pick → DESIGN.md + tokens + ADR amendment → live re-validation.
- **Mission: Imagery finals** — punch list → Wallace renders + Justin captures → wire + WCAG alt audit.
- **Mission: Notes/posts + content folds** — new content type + manifesto/retro posts + About addition + (maybe) instant-dscr study + citations.
- Plus a small **doctrine-sync** task (PRODUCT.md/VECTOR.md → ADR-013) and a **Roy final review** gate.

Start the fresh session by reading this brief + `image-punchlist.md`, then run invest-crew.
