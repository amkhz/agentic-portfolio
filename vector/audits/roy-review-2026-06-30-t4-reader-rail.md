# Roy's Review: T4 Reader Rail + callout de-slop (feat/lab-reader-rail)
Date: 2026-06-30

## Verdict: SHIP WITH NOTES

Clean, well-layered build. The rail relocates the section index + theme toggle
+ reading controls into a margin-dwelling column with a real mobile drawer; the
reading-prefs system is a proper token → core → hook → UI stack that mirrors the
existing theme-cookie pattern. Two items want Justin's live eye rather than a
code fix (the CSS weight-clamp behavior and the callout restyle), and one
adjacent slop pattern was deliberately left for a decision.

## Files Reviewed
- core/lab/reading-prefs.ts (layer: core — pure model + tests)
- src/lib/useReadingPrefs.ts (layer: src/lib — cookie + DOM I/O hook)
- src/lab/components/guide/ReaderRail.tsx (layer: src UI)
- src/lab/components/guide/ReaderControls.tsx (layer: src UI)
- src/lab/components/guide/GuideSectionNav.tsx (layer: src UI — now vertical)
- src/lab/components/guide/GuideRenderer.tsx (layer: src UI — ADR-009 site)
- src/lab/components/guide/GuideBlockquote.tsx (layer: src UI — callout restyle)
- src/lab/components/guide/useReadingProgress.ts (layer: src UI hook)
- src/lab/styles/lab.css, design-system/lab-tokens.css (layer: design-system)
- src/lab/layouts/LabLayout.tsx (layer: src UI), labs.html (entry)

## Architecture    PASS
- Layer order honored: tokens (lab.css/lab-tokens.css) → core model
  (reading-prefs.ts, no DOM, pure) → hook (useReadingPrefs, owns cookie+DOM) →
  UI. Core imports nothing external; DOM I/O stays out of core.
- ADR-009 inline-style budget preserved: the only inline `style=` is still on
  GuideRenderer's `<article>`. The progress-bar width was routed through a
  `--reading-progress` custom property published there and consumed by the
  `.lab-reading-progress-fill` class, so ReaderRail carries zero inline style.
- Files all under 200 lines. ReaderRail (~185) is the largest and is a
  self-contained UI unit (rail + drawer).

## Design System   PASS
- No hardcoded colors. Range thumbs themed via `[accent-color:var(--guide-accent)]`
  (token, not a literal). New tokens (`--lab-reading-scale`, `--lab-measure`,
  `--lab-body-weight-delta`) are unitless/length values, not colors.
- No accent glow, no accent-tinted fills, no vertical accent bar at rest: the
  vertical section index surfaces the active row via a horizontal register tick
  + type color, matching the shelf decision and [[feedback_no_accent_glow]] /
  [[feedback_no_vertical_reading_text]].
- Type system intact: mono kickers for labels, Newsreader for prose, no new
  face. Dark floor untouched (L 0.17), no pure black.

## Accessibility   PASS (with fix applied)
- FIXED during review: `input:focus-visible` was absent from the lab's global
  focus rule, so range sliders fell back to the browser default ring. Added
  inputs to the accent-outline rule (lab.css:174).
- Contrast: new small mono labels use `--lab-text-muted` on `--lab-bg-deep`
  (~5:1 dark / ~4.7:1 light) — clears AA for normal text. Drawer panel is on
  bg-deep, same math.
- Drawer: role="dialog" aria-modal, Esc closes, scrim closes, focus moves in on
  open and returns to the trigger on close, body scroll locked. Trigger 48px,
  close 44px. Reduced-motion guards on all new transitions.
- Progressbar has role + aria-valuenow/min/max. Section index uses
  aria-current="location".
- Note (not a blocker): the drawer moves focus in and restores it, but does not
  hard-trap Tab within the panel. Acceptable for AA; a full focus-trap is a
  reasonable follow-up if we want AAA-grade modality.

## Content         N/A
- No content files changed.

## Doctrine        PASS
- Reading Room locks respected (palette, type, no-glow, no-vertical-bar, dark
  floor). Controls override the locked per-mode weight/size within a11y bounds
  exactly as the T4 spec directs (anchors not ceilings), with CSS `clamp()` as
  the backstop.
- Theme toggle relocated into the rail on guide pages; the global float stays
  everywhere else (LabLayout route check). No double control.

## Quality Gates   PASS
- lint: clean (1 pre-existing unrelated warning in renderSection.tsx).
- build: succeeds (labs chunk >500KB is the known pre-existing follow-up).
- test: 178 pass, incl. 10 new reading-prefs cases + the ThemeProvider-wrapped
  GuideRenderer test + a shared matchMedia stub in test-setup.

## Notes for Justin's live eye (not code fixes)
1. **Serif weight control** drives `font-variation-settings: "wght"` via
   `calc()`+`clamp()`. Syntactically valid and it builds, but the runtime
   response of the weight slider on Newsreader should be eyeballed live — if a
   browser balks at math in that property, the fix is a JS-computed number.
2. **Callout / definition restyle** (GuideBlockquote): rounded + accent-tinted
   fill + colored left bar → editorial top-rule + mono label + run-in accent
   term. This is a design call; confirm the top-rule reads as intended in both
   modes on a real guide.
3. **GuideDefinitionCard** (the interactive term popover) still uses
   `rounded-md border bg-lab-bg-surface`. Milder than the callout tell (neutral
   border, not accent), so it was left as-is pending your call on whether the
   de-slop pass should extend to the popover.

## Impeccable Delegation
- None invoked in this pass. Recommend `/audit` on the rendered guide page after
  the live check (rail is new interactive surface) and `/critique` on the
  callout restyle if you want a scored read before merge.
