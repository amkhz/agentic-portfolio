# Roy's Review: feat/perihelion-c2-section-icons (PR #113)
Date: 2026-06-10

## Verdict: SHIP WITH NOTES

Clean build against a locked spec. Architecture, tokens, and the decorative-icon
a11y contract all hold; the mapping is spec-verbatim at 63/63 anchors with zero
parser warnings across the production library. Two notes for the live review,
nothing that blocks the PR from sitting in review as planned.

## Files Reviewed
- core/lab/guide-types.ts (layer: core)
- core/lab/parse-guide.ts (layer: core)
- core/lab/parse-guide.test.ts (layer: core)
- core/lab/guides/*.md, all eight (layer: core, content)
- src/lab/components/guide/SectionIcon.tsx (layer: UI, new)
- src/lab/components/guide/SectionIcon.test.tsx (layer: UI, new)
- src/lab/components/guide/GuideSection.tsx (layer: UI)
- src/lab/components/guide/GuideSectionNav.tsx (layer: UI)
- package.json, package-lock.json (manifest)

## Architecture    PASS
- Layer split is exactly right: core carries plain icon-name strings
  (guide-types.ts, parse-guide.ts), the component registry lives in src/lab
  and is the only place that imports lucide-react or @phosphor-icons/react.
  Import direction respected throughout; SectionIcon.test.tsx imports core
  from src, which is the legal direction.
- parse-guide.ts console.warn for dead anchors / uncovered sections follows
  the file's established soft-warning convention (orphan terms, unreferenced
  figures). Not a new purity break.
- SectionIcon.tsx is 156 lines, under the 200 cap; most of it is the
  44-entry registry record, which is the honest shape for a lookup table.
- New dependency @phosphor-icons/react is spec-mandated, sideEffects:false,
  and lands in dependencies (not dev). Tree-shaking verified against a main
  baseline build: labs chunk 557.92 kB -> 594.21 kB raw (+36 kB), 186.73 ->
  196.80 kB gzip (+10 kB). That delta is 47 icons plus registry, not the
  full set. The >500 kB chunk warning predates this PR.

## Design System   PASS
- No raw colors, no default Tailwind palette, no hex outside the
  pre-existing frontmatter accent convention. H2 icon takes
  text-guide-accent per spec; chip icon inherits chip text color via
  currentColor in both selected and idle states, matching the PR #64
  callout-chip precedent.
- Gap is gap-3.5 (14px) per the mock; sizes are named constants
  (H2_ICON_SIZE = 26, CHIP_ICON_SIZE = 14) with the 24-vs-26 question
  explicitly annotated for live review.

## Accessibility   PASS
- Decorative contract honored: aria-hidden="true" is baked into SectionIcon
  for both icon families, no new accessible names anywhere. The h2's
  accessible name (via aria-labelledby) is unaffected since aria-hidden
  content is excluded from name computation.
- Chip tap target unchanged at min-h-11 (44px). Heading hierarchy untouched.
- The one pictorial wink (phosphor:flying-saucer) and the filled numerals
  are silent to AT, exactly as the spec intends.

## Content         PASS
- Guide diffs are frontmatter-only YAML, verbatim from the locked spec.
  Verified programmatically: all 8 blocks match the spec mapping exactly,
  63 anchors total. No prose touched, no emoji, no em-dashes.
- Full-library parse produces zero warnings: no dead anchors, no uncovered
  sections, and the pre-existing glossary/figure checks stay clean.

## Doctrine        PASS
- Callout-icon exclusivity holds: Target, Link2, ArrowRight, Bookmark appear
  in SectionIcon.tsx only inside the comment that bans them. The section and
  callout vocabularies do not overlap.
- Sibling-but-separate respected: everything lands in lab files and lab
  tokens; no portfolio/ADR-011 cross-pollination.
- No icon entry renders exactly as the PR #71 type-only state; the fallback
  contract in the spec is the literal code path (section.icon undefined
  renders the prior markup modulo the flex wrapper, see Note 1).

## Quality Gates   PASS
- lint: 0 errors. One pre-existing react-refresh warning in
  src/components/content/renderSection.tsx, outside this diff (see Note 2).
- build: clean (tsc + vite). test: 112 passed, including 6 new parser tests
  and a registry-coverage test that renders every icon name shipped in the
  library. audit:orphans: 0 orphans.
- Files touched and layers stated in the PR body. Branch workflow followed;
  PR #113 open, correctly held in review (component + dependency changes).

## Notes

1. **H2 icon alignment on wrapped headings (live-review item).** The h2 is
   now `flex items-center`; on narrow viewports a two-line heading like
   "Observable Consequences: What You'd See" will vertically center the
   icon between the lines rather than sitting on the first line. That may
   be the intended lockup or it may want `items-start` with a small top
   offset. Decide it live alongside the 24-vs-26px size lock; it is the
   same review pass.

2. **Pre-existing lint warning.** The Definition of Done reads "lint passes
   with no warnings"; main already carries one react-refresh warning in
   renderSection.tsx. Not this PR's debt, but worth a two-minute fix on a
   future portfolio-side branch so the gate is honest again.

## Impeccable Delegation
- None needed at this stage. The open visual questions (icon size, wrapped-
  heading alignment, "does the icon pass beat the type-only baseline") are
  exactly what the planned live review against PR #71 covers; a /critique
  pass before Justin has seen it live would be premature.
