# Roy's Review: Conservatory Recalibration (feat/conservatory-tokens -> main, PR #130)
Date: 2026-06-27

## Verdict: SHIP WITH NOTES

The full Conservatory batch (M1 type stack v2, M2 imagery + Wallace marks, M3 notes
content type + Kiavi hub layer, M4 motion) lands doctrine-faithful and clean. All three
gates green. No blockers. The notes are minor content/housekeeping items, plus one
pre-merge hygiene flag: the out-of-scope T4d shader spike (self-marked "do not commit")
is currently sitting on the branch and must be excluded from PR #130 before merge.

## Scope

Reviewed `git diff main...HEAD` (147 files). Out of scope per the review brief and NOT
assessed: `src/components/effects/ShaderCover.tsx`, `src/pages/_ShaderPreview.tsx`, the
`/_shader-preview` route in `src/App.tsx`, and `@paper-design/shaders` in package files.

## Files Reviewed (representative)
- `design-system/tokens.css` (design-system) — OKLCH token overhaul
- `src/styles/globals.css`, `src/main.tsx` (UI) — type stack v2 wiring, motion tokens
- `src/components/effects/{motionConfig.ts,PageTransition.tsx,CoverParallax.tsx,RevealOnScroll.tsx}` (UI) — M4 motion
- `src/layouts/Layout.tsx` (UI) — PageTransition mount
- `src/pages/{NotesPage,NotePage}.tsx`, `src/components/content/{HubPageTemplate,CtaBlock,renderSection}.tsx` (UI)
- `core/content/{note-types,notes,parse-note,parse-case-study}.ts`, `core/content/notes/*.md` (core)
- `core/utils/format.ts`, `core/content/case-studies.ts` (core)
- `core/content/*.md` (core content) — case-study + notes copy
- `core/tokens/index.ts` (core) — TS token mirror
- ADR-013/014/015, ARCHITECTURE.md, VECTOR.md, DESIGN.md (doctrine)

## Architecture    PASS
- Every changed file sits in its correct layer. UI imports from core/design-system only.
- `core/` additions (note-types, notes, parse-note, parse-case-study, format) are pure —
  no DOM, no fetch, no side effects. `notes.ts` uses `import.meta.glob` for registry; the
  empty-array path is honest (ADR-015).
- View-model mapping (Note/CaseStudy -> TocItem) stays in page components; pure, acceptable.
- `motionConfig.ts` deliberately duplicates the CSS easing/duration tokens as JS literals
  (motion/react can't read CSS custom props) — documented, correct call.
- File sizes within bounds; motion + fieldnotebook components are self-contained.

## Design System   PASS
- **No new hex/rgb/hsl color values introduced anywhere** in committed code. tokens.css
  diff is OKLCH-only. Raw-color matches in the tree are all pre-existing and exempt:
  React Bits effect components (`ProfileCard.tsx`, `Threads.tsx` — copy-paste shader/gradient
  exemption per ARCHITECTURE.md) and the Perihelion lab guide system (out of scope).
- **Type stack v2 wired correctly.** `main.tsx` imports exactly the three locked faces
  (Hedvig Letters Serif / Figtree / JetBrains Mono); `globals.css` `@theme` maps them with
  `--font-heading` aliased to the body sans. Night-mode body weight trim (`--body-weight: 350`)
  and `font-synthesis: none` on display present as specified. No fourth face in the portfolio.
  (Podkova/Space Grotesk in the build are the Perihelion lab entry — `src/lab/main.tsx`,
  `lab-tokens.css` — a separate register, out of scope.)
- **Green never owns interaction.** All hover/focus/active states resolve to `accent-*`
  (brass) across HubPageTemplate, CtaBlock, NotePage, TocLinkList. Green stays atmosphere/
  material only. Magenta confined to the signal token. Doctrine inversion honored.

## Accessibility   PASS
- One `<h1>` per page verified: NotesPage ("Notes"), NotePage (title), HubPageTemplate
  (headline). Hierarchy correct: hub h1 -> h2 (doors + bodyOfWork heading) -> h3 (items),
  no skips; NotePage h1 -> note sections rendered as h2 via `renderSection(.., "h2")`.
- Focus-visible rings (`focus-visible:ring-2 ring-accent-primary`) on every interactive
  element — door cards, body-of-work links, CtaBlock, BackLinks, nav.
- Decorative hero images carry `alt="" aria-hidden="true"`. Content images have specific,
  descriptive alt text ("Drafted technical schematic of...", real UI descriptions) — no
  generic "image"/"screenshot". Thumbnail placeholder fallback uses `role="img"` + aria-label.
- `prefers-reduced-motion` honored in every new motion surface: PageTransition (renders
  children plain), CoverParallax (still), RevealOnScroll (final state), TocLinkList thumb
  hover (`motion-reduce:` resets), plus the global reduced-motion block in globals.css.
- Skip target `<main id="main" tabIndex={-1}>` preserved; PageTransition wraps inside it.
- `CtaBlock` external link: `rel="noopener noreferrer"` + descriptive aria-label naming the
  destination host and "opens in a new tab".

## Content         PASS (with one note)
- Notes copy (`five-ways-i-work.md`, `design-infrastructure-not-just-designs.md`) is on-voice,
  concrete (Key, Kiavi, twenty-one screens), no em-dashes, no audience-facing permission/
  gatekeeper framing. The "unlock more" in `instant-sow.md` is product-rollout scope, not
  reader-gatekeeping — fine.
- No em-dashes in any public content. The only em-dash hits are in internal
  `voice-profile.md` / `voice-corpus-about.md` (reference docs, not shipped copy).
- **NOTE:** `core/content/the-sound.md:7` carries an internal ID in public case-study copy:
  "(read-only, low risk, documented in ADR-004)". This branch relocated that sentence, so the
  line was touched. Per `feedback_no_internal_ids_in_public_copy`, drop the ID. Fix: change to
  "(read-only, low risk)". Non-blocking (public repo, low stakes) but worth catching since the
  line was edited here.
- **NOTE (minor):** `building-this-portfolio.md:68,70` print hex literals (`#C8956A`, etc.) in
  prose. This is the case study narrating the hex->OKLCH migration; the hex values are the
  literal subject of the section, so it reads as intentional content, not committed styling.
  Defensible; Justin's call whether to genericize.

## Doctrine        PASS
- "The Conservatory" register expressed faithfully: humus base, brass owns interaction,
  green as atmosphere/material, Field Notebook composition (dossier frames, registration
  marks, TOC grammar), Wallace imagery as anchored accent (heroes/covers/marks), restrained
  wave-driven motion.
- **Motion matches DESIGN.md pillar exactly:** arrival/page springs are critically damped
  (`bounce: 0` — springSettle/springSoft); the hover micro-interaction carries the permitted
  small overshoot (`springHover bounce: 0.3`); parallax is spring-smoothed and small (±18px),
  not scroll-jacking; RevealOnScroll uses `--ease-settle`/`--duration-reveal`. One ambitious
  moment per surface. No beat-sync, no look-at-me transitions.
- ADR-013 type-v2 amendment's "doctrine still to sync" follow-up is **actioned**: ARCHITECTURE.md
  (Stack + Styling) and VECTOR.md (P3 + constraints) now name Stack E (Hedvig/Figtree/JetBrains).
- ADR-014 (Kiavi body-of-work on the hub) and ADR-015 (notes content type) are implemented as
  specified — `hub.bodyOfWork` field rendered in HubPageTemplate; notes infra + empty state.

## Quality Gates   PASS
- `npm run lint` — exit 0. One pre-existing warning (`renderSection.tsx` react-refresh
  only-export-components); flagged in the 2026-06-21 review too, not introduced here.
- `npm run build` — exit 0, succeeds in ~2s. Build ran WITH the out-of-scope shader files
  present and did not break, so the `@paper-design/shaders` dep is not destabilizing the build.
  Advisory chunk-size warning is on the Perihelion lab bundle (>500kb), pre-existing/lab.
- `npm run test` — exit 0, 147/147 passing across 12 files, including the new
  `parse-note.test.ts` (8 tests).

## Prior Review (2026-06-21 "SHIP WITH NOTES") follow-through
1. 9px thumbnail placeholder label — **effectively resolved.** Real Wallace thumbnails shipped;
   the 9px (`text-[0.5625rem]`) label at `TocLinkList.tsx:102` is now a fallback-only path,
   not shown for items with imagery.
2. `border-strong` non-text contrast (<3:1) — **still an open deliberate call.** Backs
   decorative hairlines only (not control boundaries, which carry focus rings). Accept-as-
   decoration or nudge the token; not a blocker.
3. TocLinkList `items-baseline` (rowClass) vs `items-center` (RowBody) — **carryover**, harmless,
   tidy when convenient.

## Non-blocking notes (this batch)
1. **Pre-merge hygiene (important):** the T4d shader spike is on the branch and self-marked
   "do not commit" — `src/pages/_ShaderPreview.tsx`, `src/components/effects/ShaderCover.tsx`,
   the import + `/_shader-preview` route in `src/App.tsx`, and `@paper-design/shaders` in
   `package.json`/`package-lock.json`. Exclude these from PR #130 before merge. (Content not
   reviewed, per scope.)
2. `the-sound.md:7` — strip the "documented in ADR-004" internal ID (see Content).
3. `core/tokens/index.ts:55-57` — the `typography.fontFamily` TS export still names the
   superseded portfolio stack (Podkova/Space Grotesk/Didact), and `tokens.test.ts` asserts on
   it. Unused by the UI (fonts come from `globals.css @theme`), so harmless functionally, but
   it's stale doctrine drift. Sync to Stack E when convenient.
4. `building-this-portfolio.md` hex-in-prose — intentional migration narrative; leave or
   genericize (Justin's call).
5. Lint warning + `border-strong` contrast + TocLinkList alignment — carryovers, none blocking.

## Impeccable Delegation
- None run live (review-only; dev server in use, no rendered audit run). Recommend a single
  `/audit` pass on the rendered Notes + Hub surfaces, both themes, before the public share —
  token math passes, but a real-DOM contrast/Lighthouse pass on the new surfaces is the honest
  final check.
