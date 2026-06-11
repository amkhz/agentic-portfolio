# Roy's Review: Perihelion C.3 Light-Mode Activation (PR #117, post-merge)
Date: 2026-06-10

## Verdict: SHIP WITH NOTES

Retroactive review of `c3e1275..a2faede` (8 commits, merged at Justin's call ahead of the Roy gate). The build is disciplined: the dual-var accent contract is clean cascade work, the theme plumbing reuses the portfolio's pattern byte-for-byte, every sanctioned exception is documented at the point of use, and the dark token values are contractually untouched. The notes are small: one stale line in the mission log, one icon-contrast item to fold into the live pass, and a few observations that need no action.

## Files Reviewed
- core/lab/guide-types.ts (layer: core)
- core/lab/parse-guide.ts (layer: core)
- core/lab/parse-guide.test.ts (layer: core)
- core/lab/guides/*.md, 8 files (layer: core, content)
- design-system/lab-tokens.css (layer: design-system)
- labs.html (entry root, per ADR-009)
- src/lab/components/LabThemeToggle.tsx (layer: src, new)
- src/lab/components/guide/GuideRenderer.tsx + .test.tsx (layer: src)
- src/lab/components/library/GuideCard.tsx + .test.tsx (layer: src)
- src/lab/layouts/LabLayout.tsx (layer: src)
- src/lab/main.tsx (layer: src)
- src/lab/styles/lab.css (layer: src, entry stylesheet)
- plans/perihelion-format-rules.md (docs)
- vector/missions/perihelion-c3-light-mode-activation.md (docs)
- vector/audits/orphan-terms-2026-06-11.md (artifact)

## Architecture    PASS
- Layer order followed exactly as doctrine prescribes: tokens (lab-tokens.css cascade) -> core (guide-types, parse-guide, frontmatter) -> UI (components, layout, entry). No services work needed; none invented.
- Import direction clean. core/ additions import nothing new. `LabThemeToggle` imports `@/lib/useTheme` and `@core/utils`; `src/lab/main.tsx` imports `@/providers/ThemeProvider`. Lab UI consuming portfolio src primitives is the established ADR-009 posture (the lab already imports portfolio tokens and analytics), verified against the existing `src/lab/main.tsx` imports.
- The ADR-009 inline-style exception is correctly confined to GuideRenderer.tsx and GuideCard.tsx, widened from one custom property to two (`--guide-accent-dark` / `--guide-accent-light`). Both header comments were updated to describe the new contract (GuideRenderer.tsx:3-16, GuideCard.tsx:1-13), and the lab-tokens.css comments match. Sanctioned per the spec; verified respected, not extended elsewhere. The new tests even assert `--guide-accent` is NOT set directly, locking the boundary in.
- The in-flow toggle mounts (commit ee6fff3) were fully removed in d9a52e8: the net diff touches neither GuideView nor LibraryHeader, so no dead code rode through the placement reversal.
- File sizes: LabThemeToggle.tsx 85 lines, GuideCard.tsx 78, GuideRenderer.tsx 157. Observation, no action: core/lab/parse-guide.ts now sits at 681 lines (+31 this diff). Pre-existing condition, single-purpose validator file, but it is drifting further from the 200-line soft guidance and is a future split candidate.
- Observation: `console.warn` in core/ is technically a side effect, but it is the file's established warning pattern (the dark-contrast warning predates this diff) and the spec explicitly asked for parse-level warnings. No flag.

## Design System   PASS
- OKLCH-only holds in CSS. The lab-tokens.css diff changes only the two `--guide-accent` resolution lines and their comments; every value remains a `var()` reference. Verified the dark token block (graphite floor, L 0.17 register) is byte-identical outside those lines.
- Literal hex appears only in the sanctioned locations: guide frontmatter (content data, spec section 3), parse-guide.ts `LAB_BG_HEX` / `LAB_BG_LIGHT_HEX` constants (second sanctioned spot, with the derivation pinned in a comment at parse-guide.ts:173-177 mirroring the existing pattern), test fixtures (data, consistent with the pre-existing parse-guide.test.ts fixtures), and the format-rules doc's frontmatter example. A grep of all added lines in src/, design-system/, and labs.html confirms zero literal colors outside test fixtures.
- LabThemeToggle styles itself entirely with lab token utilities. Every class it and LabLayout reference resolves in the lab `@theme` block: `text-lab-text-muted`, `hover:text-guide-accent`, `border-lab-border-subtle`, `border-lab-border-strong`, `bg-lab-bg-raised`, and `--duration-fast` / `--duration-normal` (lab.css:84-87). The "adapted, not reused" deviation is real and justified: the portfolio ThemeToggle's utilities (`text-text-secondary`, `bg-bg-subtle`, `ring-accent-primary`) are not generated in the lab bundle. Glyph and `useTheme` contract verified identical against src/components/interactive/ThemeToggle.tsx.
- Dark/light consistency: the dual-var cascade resolves per theme scope with the brass fallback on both sides, so a guide without `accentLight` degrades gracefully instead of rendering an illegible dark-tuned hex on cream. All eight shipped `accentLight` values clear 4.5:1 against `#f8f3e9` per the mission log table, and the parser now warns on any future regression.
- Lab font-stack checklist item N/A per ADR-009 (Podkova / Georgia / JetBrains Mono is the lab's own three-font stack); no font changes in the diff anyway.

## Accessibility   PASS (one item for the live pass)
- Toggle target is 44px (`h-11 w-11`), `type="button"`, dynamic `aria-label` ("Switch to light/dark mode"), `aria-hidden="true"` on the svg. Focus-visible comes from the lab's global `button:focus-visible` rule (lab.css:118-125, 2px `--guide-accent` outline, 3px offset); at the layout mount point `--guide-accent` resolves to brass, which holds on both themes.
- Reduced motion: `motion-reduce:transition-none` on every animated path, plus the lab's global `prefers-reduced-motion` kill switch (lab.css:197-205) zeroes the transitions anyway.
- Stacking order: toggle `z-50` sits below the skip link (`z-index: 100`, lab.css:136). Skip link unaffected.
- `[data-no-transition] * { transition-duration: 0ms !important; }` (lab.css:193-195) is character-identical to the portfolio's rule in src/styles/globals.css:140-142, and the labs.html early-paint script is byte-for-byte the index.html script. ThemeProvider removes the attribute one frame after mount and owns the cookie write (`path=/`, domain-scoped per the spec's independent-preference call) and the system-preference listener. The pattern is consistent, not reinvented.
- FLAG (minor, fold into the live pass): the toggle glyph rests at `text-lab-text-muted` with several strokes opacity-dimmed in dark mode (`opacity-40` / `opacity-50` / `opacity-60`, src/lab/components/LabThemeToggle.tsx:51-80). Muted is ~5.2:1 against bg-deep, but the dimmed strokes against `--lab-bg-raised` will land below the 3:1 non-text minimum for portions of the icon. The full-opacity strokes carry the affordance, so this is likely fine in practice, but it has never been eyeballed against cream either. Recommend confirming during the outstanding live verification pass or via a delegated `/audit` on the rendered lab (not invoked here per assignment).
- Heading hierarchy untouched: no heading elements in the diff. Mobile inset was live-checked at 375px by Justin (commit 2c76df9).

## Content         PASS
- Guide diffs are one `accentLight:` frontmatter line each; no prose changed, so voice and structure checks are N/A.
- No em-dashes or emoji in any UI string or user-facing copy. The aria-labels and skip link are clean. Em-dashes do appear in new code comments and in the plans/vector docs, matching each file's pre-existing internal convention; the no-em-dash rule targets copy and none of this renders to users.
- plans/perihelion-format-rules.md documents the new field accurately, including the curation recipe and the Track-B upstream-sync note.

## Doctrine        PASS
- No silent architecture breaks. Every deviation from the locked spec is recorded in the mission log with rationale: the adapted toggle, the static `data-theme="dark"` on labs.html (verified present, labs.html:2, mirroring index.html's no-JS default), and the floating placement superseding the locked in-flow placement at Justin's live review. The placement change rode the spec's own reserved lane ("final treatment refined live during the build") and was the operator's call, which is exactly how principle 1 says overrides should work.
- The graphite-floor commitment (no rollback toward L 0.08) is honored; the dark register is untouched.
- Spec-vs-implementation nuance, no action: the spec placed the absent-`accentLight` warning at "library-parse level"; the implementation warns inside `parseGuide` itself (parse-guide.ts:219-222). Each guide parses once per library load, so behavior is equivalent, and the dedicated test pins the once-per-guide semantics.
- Mission log accuracy against the actual diff:
  - FLAG (one stale line): the Deviations section records the floating control at "fixed bottom-5 right-5" (vector/missions/perihelion-c3-light-mode-activation.md:50). Commit 2c76df9 subsequently tightened the mobile inset to `bottom-3 right-3` (src/lab/layouts/LabLayout.tsx:16) and the log was not re-touched. One-line doc fix next time the file is open.
  - Note: the log's review path ("PR stays in review until both [live pass and Roy] clear") was overtaken by Justin's call to merge ahead of the Roy gate. Sanctioned, and this report closes the loop, but the log reads as if the gate held.
  - Everything else in the log checks out against the diff: scope table, the eight accentLight values (verified identical to the shipped frontmatter), test counts (4 parser + 3 GuideRenderer + 3 GuideCard = 10), the LAB_BG_LIGHT_HEX derivation, and the byte-for-byte early-paint claim.
- Cosmetic: the orphan audit artifact is named and dated 2026-06-11 from a 21:15 EDT run (UTC dating), while the mission is dated 2026-06-10. Harmless; noting so nobody hunts for a missing day.

## Quality Gates   PASS (cited, not re-run)
- The four gates ran green on the final tree before merge, per the mission log and the merge record: `npm run lint` (0 errors, one pre-existing fast-refresh warning in an untouched file), `npm run build`, `npm run test` (122 passed, 10 files), `npm run audit:orphans` (0 orphans). Not re-run for this retroactive pass per assignment.
- Test quality of the 10 new tests is good: the parser suite covers valid resolution, both invalid hex shapes, the low-contrast warning, and once-per-guide semantics for the absent-field warning; the component suites cover dual publication, light-var omission, and the negative assertion that `--guide-accent` is never set directly, which is the assertion that actually protects the cascade contract. Minor notes, no action: the two component test files duplicate a `makeGuide` fixture that could be shared, and nothing asserts the cascade resolution itself (a jsdom limitation; the live pass covers it).
- Layer statements present in commit messages (verified on 2c76df9).

## Impeccable Delegation
- None invoked, per assignment. Two items are queued for the still-outstanding live verification pass rather than delegated now: (1) the dimmed toggle-glyph strokes against `--lab-bg-raised` on both themes (would otherwise be a `/audit` item), and (2) the full light-mode visual sweep already enumerated in the mission log's exit flags (GuideCard hover glow on cream, TerritoryBadge pulse, sigil on cream, section icons at 3:1, first-paint flash check at 375px). `/critique` on the lab in light mode would also be worthwhile once the live pass lands, since no component had ever rendered against cream before this mission.
