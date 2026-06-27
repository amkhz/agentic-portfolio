# Roy's Review: Conservatory Surfaces (feat/conservatory-fieldnotebook)
Date: 2026-06-21

## Verdict: SHIP WITH NOTES

Strong, doctrine-faithful build. The Field Notebook system and all five surfaces hold the Conservatory register: green stays out of interaction, brass owns it, no AI-slop tells survive. No blockers. Two notes worth addressing before the public share, neither structural.

## Files Reviewed
- `design-system/tokens.css` (design-system) — fieldnote structural tokens
- `src/components/fieldnotebook/*` (UI) — RegistrationMark, DossierFrame, TocLinkList, DraftedObjectMark, DossierTags
- `src/components/content/CaseStudyPageTemplate.tsx, renderSection.tsx, MetricCard.tsx, MetricGrid.tsx, ImageBlock.tsx, ProjectCard.tsx, Hero.tsx` (UI)
- `src/components/content/Constellation{Page,Content,Field,Node,Strip}.tsx, ConnectionPeek.tsx` (UI)
- `src/pages/WorkPage.tsx, HomePage.tsx` (UI)
- `src/main.tsx, src/styles/globals.css` (UI) — mono face wiring

## Architecture    PASS
- Every changed file sits in its correct layer. UI imports from core/design-system only; no business logic or data fetching in components.
- View-model mapping (CaseStudy → TocItem) stays in the page components; pure and side-effect-free. Acceptable in UI.
- All files under 200 lines (largest: TocLinkList 167, CaseStudyPageTemplate 158).

## Design System   PASS
- OKLCH tokens by name throughout; no hex/rgb/named colors added outside tokens.css (the only matches are doctrine prose and `scripts/wcag-check.py`).
- **Green never appears in an interaction state.** Verified: all hover/focus/active transitions resolve to `accent-*` (brass); `secondary-*` (green) appears only as token definitions and atmosphere. Magenta confined to the signal token.
- Mono kicker wired correctly (JetBrains Mono via `--font-mono`); three-face system respected; no fourth face. Faces still the superseded stack pending Phase 2 (tracked).

## Accessibility   FLAG (minor)
- One `<h1>` per page confirmed (Home's h1 lives in Hero; Work/CaseStudy/Constellation each one). Heading order h1 → h2 → h3, no skips.
- Focus-visible rings on all interactive rows/links/buttons. DossierTags correctly has none (non-interactive `<ul>` of labels).
- Alt text is descriptive (`${title} project mark`, real hero alts); no generic "image"/"screenshot".
- Tap targets fine: TocLinkList rows are `py-4` + 64px thumbnails.
- **FLAG:** thumbnail placeholder label is 9px (`text-[0.5625rem]`), below the 12px floor. Transient (Wallace imagery replaces it in Phase 3), but tiny until then.

## Content         N/A
- No copy changes in this branch. (Building This Portfolio content staleness tracked as a Writer task.)

## Doctrine        PASS
- "The Conservatory" register expressed faithfully: humus base, brass interaction, green as atmosphere/material, Field Notebook composition, dossier/registration grammar, tasteful motion (ease-out, motion-safe, reduced-motion honored via globals + RevealOnScroll).
- No em-dashes, no permission framing introduced.

## Quality Gates   PASS (with one contrast note)
- `npm run build` ✓, `npm run lint` ✓ (1 pre-existing renderSection fast-refresh warning), `npm run test` ✓ 130/130.
- **Contrast (scripts/wcag-check.py):** text passes AA both modes — `text-mut on bg-base` 4.88 dark / 4.93 light, brass interaction 7.49 dark / 4.96 light. **`border-strong on bg-base` FAILS 3:1 non-text contrast (1.81 dark / 1.62 light).** Pre-existing token characteristic. It backs decorative hairlines (thumbnail borders, dossier rule-strong, DossierTags separators), not essential control boundaries — those carry their own focus rings and brass marks. Acceptable as decoration; do not rely on it alone to signal state. Worth a deliberate call before share.

## Impeccable Delegation
- None run live. **Recommend `/audit` on the rendered pages (both themes) before the public share** for Lighthouse + real-DOM contrast on the small mono labels and the registration hairlines — the token math passes, but a rendered pass is the honest final check.

## Notes for Tyrell (non-blocking)
1. Decide on `border-strong` non-text contrast: accept as decorative, or nudge the token toward 3:1.
2. The 9px thumbnail placeholder label is below the 12px floor (transient).
3. Minor: TocLinkList `rowClass` is `items-baseline` while `RowBody` is `items-center` — harmless single-child redundancy, tidy when convenient.
</content>
