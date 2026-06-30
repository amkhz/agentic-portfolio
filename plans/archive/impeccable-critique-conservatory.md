# Impeccable `/critique` — Conservatory Recalibration (T-L6)

**Gate:** Impeccable `/critique` design-quality gate, PR #130 (Conservatory recalibration → main)
**Reviewer:** Tyrell critique agent (code + design-system level; **no browser driver** — feel/contrast to be confirmed live by Justin on :5173)
**Branch:** `feat/conservatory-tokens`
**Date:** 2026-06-27
**Method:** Impeccable `critique` methodology — LLM design review (Assessment A) + deterministic detector `npx impeccable --json` (Assessment B) — scored against DESIGN.md (Conservatory SoT, ADR-013), PRODUCT.md, VECTOR.md Seven Principles, CLAUDE.md non-negotiables.
**Scope:** Home, Work, Case study (+ template/hub/constellation), Notes, Note, About, Resume, and the shared content/layout/fieldnotebook components they use; `design-system/tokens.css`; `src/styles/globals.css`.
**Out of scope (ignored):** ShaderCover.tsx, _ShaderPreview.tsx, `/_shader-preview` route, `@paper-design/shaders` (unmerged T4d spike). Motion layer folded in by reference from `plans/m4-motion-critique.md` (not re-litigated).

---

## Design Health Score (Nielsen heuristics, 0–4)

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 3 | Resume loading skeleton + error state, constellation `aria-live`, labeled theme toggle. Solid. |
| 2 | Match system / real world | 4 | Field Notebook / dossier metaphor is coherent and well-realized (kickers, "Specimen", registration marks). |
| 3 | User control & freedom | 4 | Breadcrumbs + back links on every deep page, skip link, reduced-motion honored, constellation back. |
| 4 | Consistency & standards | **2** | Resume page is on the old rounded-card register; ProfileCard breaks the OKLCH token system; `BackLink` duplicated 3×. The weak axis. |
| 5 | Error prevention | 3 | Bad slugs `Navigate`-redirect to /work; 404 page; few forms to mis-fill. |
| 6 | Recognition rather than recall | 4 | Clear primary nav, contents TOC, dossier framing — nothing hidden. |
| 7 | Flexibility & efficiency | 3 | Keyboard focus complete, anchor TOC, theme persistence; no shortcuts (not needed). |
| 8 | Aesthetic & minimalist design | 3 | Recalibrated surfaces are atmospheric and restrained; dragged down by Resume genericness, holo-card, and reused placeholder heroes. |
| 9 | Error recovery | 3 | Resume error offers PDF fallback; 404 recovers to nav. |
| 10 | Help & documentation | 3 | Self-evident IA; copy carries the explanation. |
| **Total** | | **32/40** | **Good — ship-ready pending P1 resolution.** |

---

## Anti-Patterns Verdict — mostly PASS

**Deterministic scan:** `npx impeccable --json` over `src/pages`, `src/components/{content,fieldnotebook,layout}` returned **`[]` (clean)** — zero of the 27 slop patterns fired. No AI palette, no gradient text, no glassmorphism, no identical card grid, no hero-metric template, no generic-font tell.

**LLM assessment:** The recalibrated core (Home, Work, Case study, Notes, About) does **not** read AI-generated. The Field Notebook grammar — hairline dossier frames, registration L-brackets, mono kickers, TOC leader rules, asymmetric editorial columns — is a genuine authored worldview, exactly what DESIGN.md's "design IS the credential" 5-second test asks for. Brass-owns-interaction / green-as-atmosphere discipline holds across the chrome.

**Two tells survive, both on in-scope surfaces:**
1. **Resume page** uses generic `rounded-lg` card panels — the single biggest "every other thoughtful-portfolio template" surface in the build (P1-A).
2. **ProfileCard** (Home + About) is a borrowed holographic tilt-card with a hardcoded rainbow foil and a cold navy literal — the "designer-as-influencer" / ReactBits trope, and an OKLCH hard-rule violation (P1-B). Heavily filtered (`saturate 0.33 opacity 0.5`, masked through the icon), so the rainbow reads muted in practice, but the literals are real.

---

## Overall Impression

This is a confident, on-register recalibration. The dossier/field-notebook system is the real thing — it would survive a senior design director's 5-second scan and read as authored, not templated. The build's biggest opportunity is **finishing the recalibration**: one primary-nav page (Resume) and one shared effect (ProfileCard) still live in the pre-Conservatory world and undercut the "every surface must distinguish itself" promise the rest of the site keeps. Close those two and the merge is clean.

---

## What's Working

- **Field Notebook grammar is genuinely distinctive.** `DossierFrame` + `RegistrationMark` + `TocLinkList` (leader-rule rows, not a card grid) is a coherent, repeatable system that reads as a designed object. Work / Case study / Notes share it without feeling copy-pasted.
- **Accessibility fundamentals are consistent and complete.** Exactly one `h1` per rendered page, `h2 → h3` order with no skips, descriptive alt text (decorative Notes backdrop correctly `aria-hidden`), a working skip link, 44px min targets, and a uniform `focus-visible` ring (`ring-2 accent-primary` + offset + `ring-offset-bg-deep`) on every interactive element. Reduced-motion coverage is complete (per the M4 critique).
- **Token discipline holds in the chrome.** All structural color resolves through `--theme-*` OKLCH tokens; both night and golden-hour modes are defined as full token sets and re-tint with zero per-component overrides (HeroScrim, fieldnote rules, glows all reference tokens).

---

## Priority Issues

### [P1-A] Resume page was never recalibrated to the Conservatory grammar
**Where:** `src/pages/ResumePage.tsx` (L29, L55, L87, L106 — `rounded-lg border bg-bg-elevated/bg-bg-base` panels), `src/components/content/resume/ResumeExperienceItem.tsx:9` (`rounded-lg ... p-5` card), `src/components/content/resume/ResumeSection.tsx:9` (h2 set as `font-mono text-sm`).
**Why it matters:** Resume is in the primary nav. It uses stacked rounded-corner card panels — the exact "minimal template portfolio" / Rosenfeld-book look the whole project defines itself against (DESIGN.md anti-references; `feedback_no_flat_color_covers` energy). Nothing else in the build uses `rounded-lg`; the system is square hairline dossier frames (`radius` 0, `--fieldnote-*`). A hiring manager who clicks Work → Resume feels the worldview drop away. "Every surface must distinguish itself or it has failed."
**Fix:** Re-skin Resume on the Field Notebook grammar: replace the `rounded-lg` panels with `DossierFrame` (hairline + registration marks + mono kicker header); set section headings in `font-display` (or keep mono kickers but stop calling them `<h2>` styled as labels — the visual h2 should read as a heading). Drop the experience-item rounded card for a hairline-ruled `border-t` row like `BodyOfWorkItem`. The skeleton/error states should use the same square frame, not `rounded`.
**Command:** `/normalize` (pull Resume onto the design system), then `/arrange` for the column rhythm.

### [P1-B] ProfileCard ships hardcoded non-token colors (incl. a cold navy) and a holographic-card register
**Where:** `src/components/effects/ProfileCard.tsx` L235–240 (`--sunpillar-*: hsl(...)` rainbow), L282/286/287 (`#0e152e` cold navy), L283–293 (`hsl()/hsla()`), L304–305, L345/348/373 (`rgba()`). Used on About (`AboutPage.tsx:36`) and Home (`AboutSnippet.tsx:11`).
**Why it matters:** Two problems. (1) **OKLCH hard-rule violation** — DESIGN.md/VECTOR/`feedback_oklch_only` are absolute: "no hex, no rgb(), no named colors anywhere," and `#0e152e` is also a *cold* hue, which the humus-warm doctrine explicitly forbids ("never cold"). This is the literal token-recalibration PR; shipping hardcoded cold literals in a component on two in-scope pages contradicts the PR's own thesis. (2) **Register** — a rainbow holographic foil tilt-card is the "designer-as-influencer / look-at-me" anti-reference and a recognizable ReactBits-style trope. The heavy filtering mutes it, so it is not a glaring slop tell today, but it is borrowed, not authored, and it is the one effect that could read as AI-default on close inspection.
**Fix:** At minimum, move the literals into OKLCH `--theme-*` (or component-scoped `oklch()`) tokens and replace `#0e152e` with a warm humus token so it can't fight the base in either mode. Better: reconsider whether the holographic foil belongs in the Conservatory at all — a quieter brass/green sheen on the pointer-tracked tilt would be on-register and keep the (already-approved) tilt moment. Justin's call on register; the token fix is non-optional if it stays.
**Command:** `/colorize` (re-token to OKLCH) or `/quieter` (tone the foil to a brass/green sheen).

### [P1-C] (folded by reference) Motion P1s from the M4 critique still open
**Where:** see `plans/m4-motion-critique.md` — P1-1 dead tokens (`--ease-organic` now wired via Thumb; confirm `easeOutExpo`/`duration` in `motionConfig.ts` are deleted or marked reserved), P1-2 Thumb hover (already moved to `duration-[var(--duration-slow)] ease-[var(--ease-organic)]` in `TocLinkList.tsx:96` — resolved), P1-3 `CoverParallax` edge overflow.
**Why it matters:** P1-3 is a craft bug: `CoverParallax` (`CoverParallax.tsx:43–47`) translates its inner layer ±18px but the `ref` container has no `overflow-hidden` and the image isn't overscanned — the drift can expose a `bg-base` gap or push past the `DossierFrame` border on the case-study cover.
**Fix:** `overflow-hidden` on the outer `ref` div + overscan the moving layer (`scale-[1.06]` or `h-[calc(100%+48px)] -mt-6`). Verify live at a case-study cover. (Thumb-hover and `--ease-organic` items appear already addressed in this branch; confirm the `motionConfig.ts` token cleanup landed.)
**Command:** `/animate` (already scoped in the motion critique).

### [P1-D] Hero imagery is Sprint-0 placeholder and reused across surfaces
**Where:** `Hero.tsx:42` (`conservatory-hero.png`, comment flags it as a north-star placeholder), `WorkPage.tsx:103` (`work-hero.png`), `NotesPage.tsx:57` (the **same** `work-hero.png` at `opacity-40`).
**Why it matters:** DESIGN.md is emphatic that imagery is a deliberate anchor, not wallpaper, and the production finals (`V4_QUALITY_48`) are explicitly deferred to Plan A Phase 3. Shipping the recalibration to main with placeholder heroes — and the *same* atelier image doing double duty on Work (full) and Notes (faded) — risks a "is this final?" read on the two highest-traffic landing surfaces. The Notes reuse is a reasonable restraint stopgap, but it is literally Work's image.
**Fix:** Either land the Work/Notes/Home finals before merge, or (if merging interim) give Notes its own quieter anchor (or no image — a type-forward marginalia hero would be on-register) so no image is visibly duplicated. Confirm this is a conscious interim decision in the PR description.
**Command:** `/wallace` (render finals) — out of band for this gate; flag for the merge decision.

---

## Persona Red Flags

**Hiring manager / design lead (30-second scan — the VECTOR target user):**
- Home → Work → Case study reads as one authored object; the dossier system signals systematic thinking. ✔
- Clicks **Resume** and the worldview collapses into generic rounded cards — the one place the "craft is the credential" thesis visibly breaks. ✘ (P1-A)
- On **About**, the holographic profile card is the one element that could read as a borrowed effect rather than authored craft. ✘ (P1-B)

**Accessibility-minded reviewer (the portfolio claims "accessibility isn't a feature, it's the baseline"):**
- Heading order, focus rings, skip link, alt text, reduced-motion all check out at the code level. ✔
- Would want live contrast confirmation on `text-text-muted` small mono (e.g. the 9px `text-[0.5625rem]` thumbnail placeholder in `TocLinkList.tsx:102`, footer colophon `text-xs text-text-muted`) — tokens claim script-verified AA, but sub-10px muted type is the borderline case to spot-check. ⚠ (verify live)

---

## Minor Observations

- **`BackLink` is duplicated three times** verbatim — `CaseStudyPageTemplate.tsx:47`, `HubPageTemplate.tsx:13`, `NotePage.tsx:9`. Extract one shared `BackLink` into `fieldnotebook/`. (`/extract`)
- **`Footer.tsx:6`** carries a leftover `style={{ backgroundImage: "none" }}` inline override — vestigial from the old circuit-trace texture; remove.
- **9px placeholder type** (`TocLinkList.tsx:102`) and the `ProjectCard`/`Thumb` placeholder branches only show until Wallace marks land — fine, but confirm the real marks ship with the imagery finals so placeholder type never reaches production.
- **`pc-holo-bg 18s linear infinite`** on ProfileCard is a constant ambient animation (paused under reduced-motion). DESIGN.md says "most things still"; acceptable as a single scoped moment but watch it doesn't compound with the tilt.

---

## Questions to Consider

- What would a *confident* Resume look like — a printed dossier specimen sheet rather than a stack of web cards? The PDF is the formal artifact; the web Resume could lean fully into the Field Notebook register.
- Does the About profile need a holographic card to earn its moment, or would a quieter brass/green sheen on the same tilt say "craft" more honestly than "trading card"?
- Should the recalibration merge to main with placeholder heroes, or is the imagery finals pass a hard pre-merge gate? (Affects whether P1-D blocks.)

---

## Recommended Actions (priority order)

1. **`/normalize` + `/arrange` — Resume page** onto the Field Notebook grammar (P1-A).
2. **`/colorize` (re-token) or `/quieter` — ProfileCard** to OKLCH tokens + warm humus, optionally tone the foil (P1-B).
3. **`/animate` — CoverParallax overflow** + confirm `motionConfig.ts` token cleanup (P1-C, per M4 critique).
4. **Imagery decision — Wallace finals or a distinct Notes anchor** (P1-D); record the call in the PR.
5. **`/extract`** the shared `BackLink`; remove Footer's vestigial inline style (minor).
6. **`/impeccable polish`** as the closing pass.

> Re-run `/critique` after fixes to confirm the score moves off the Consistency (heuristic 4 = 2) floor.
