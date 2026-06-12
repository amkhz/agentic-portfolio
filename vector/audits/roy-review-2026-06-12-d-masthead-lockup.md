# Roy's Review: identity/d-masthead-lockup (Perihelion house identity, Workstream D)
Date: 2026-06-12

## Verdict: SHIP WITH NOTES

This is disciplined identity work: the dual-register swap is pure CSS as the brief demands, the recorded contrast matrix verifies to the decimal under independent computation, and all five critique fixes are real, not cosmetic. The notes are small: ARCHITECTURE.md's ADR index was not updated for ADR-012, desktop screen reader users never receive the tagline because the masthead link's aria-label overrides it, and two dev-tooling/QA items deserve a follow-up. Nothing blocks the merge.

## Files Reviewed
- design-system/lab-tokens.css (layer: design-system)
- src/lab/components/PerihelionMark.tsx (layer: UI, new)
- src/lab/components/library/PerihelionSigil.tsx (layer: UI)
- src/lab/components/library/LibraryHeader.tsx (layer: UI)
- src/lab/components/LabThemeToggle.tsx (layer: UI)
- src/lab/layouts/LabLayout.tsx (layer: UI)
- src/lab/styles/lab.css (layer: UI styles, lab-scoped)
- vite.config.ts (layer: build config, repo root)
- .gitignore (layer: repo config)
- plans/perihelion-d-identity-brief.md (layer: docs)
- plans/perihelion-d-critique-snapshot.md (layer: docs)
- vector/decisions/ADR-012-perihelion-house-identity.md (layer: doctrine)
- vector/audits/orphan-terms-2026-06-12.md (layer: audit artifact)

## Architecture    [PASS]
- Layer order followed: the new color decision landed as a token first (design-system/lab-tokens.css:93 dark, :219 light, `--lab-mark-spark`), then UI consumed it via `var()` (src/lab/styles/lab.css:766). Correct sequence, correct layers.
- Import direction clean. PerihelionMark.tsx imports only react and motion/react; LabLayout imports lab components via the `@lab` alias. No core/ or services/ involvement and none was needed; this is a pure presentation feature.
- PerihelionMark.tsx is 198 lines, under the 200-line ceiling, and would qualify for the self-contained visual-component exception anyway.
- vite.config.ts dev middleware is dev-only (`configureServer` never runs in production builds) and mirrors the documented Vercel host rewrite from ADR-009. Acceptable in the config layer.
- P3 note: vite.config.ts:1018, the `url.includes('.')` internal-asset heuristic means any future lab route containing a dot in a path segment will silently skip the labs.html rewrite in dev. Current lab routes are dot-free, and production is unaffected. Worth a comment or a tighter check (extension match on the last segment) next time the file is open.

## Design System   [PASS]
- The single new color value is OKLCH, lives in the token file, and is documented with its rationale (lab-tokens.css:214-219). Every paint in the new component CSS is `var()`-driven: orbit stops, dot, aphelion, spark, sigil rings and bodies all reference `--lab-text-muted`, `--lab-text-secondary`, `--guide-accent`, or `--lab-mark-spark`.
- The white/black fills in `.peri-mark__punch` (lab.css:728-732) are mask luminance values inside an SVG `<mask>` def, documented in code comments at both the component (PerihelionMark.tsx:360-364) and the CSS. Not a color violation; deliberately not flagged.
- Lab font usage is correct for the lab system: Podkova via `font-lab-heading` for the logotype, JetBrains Mono via `font-lab-mono` for kicker and tagline (LabLayout.tsx:38-51). No portfolio font classes leaked in.
- The register swap (emission to ink) is entirely theme-scope CSS (`[data-theme="light"]` blocks, lab.css:730-749), so a mid-session flip repaints without remount. Structurally flash-free, which is what brief section 7 asks for.
- P3 note: the lockup's identity-locked metrics (text-[28px], text-[11px], tracking-[0.22em], gap-4.5) live as arbitrary Tailwind values in LabLayout.tsx:31-43. This matches the lab's established idiom (text-[0.65rem]/tracking-[0.18em] throughout GuideCard, LibraryWelcome, TerritoryGrid) and the values are recorded in the brief, so it is not drift. When Works ships and the lockup is rendered a second time, these should become tokens or a shared lockup component rather than copy-pasted classNames.

## Accessibility   [PASS]
- Contrast matrix verified independently (OKLCH to sRGB, WCAG relative luminance): all ten recorded values in plans/perihelion-d-identity-brief.md:67-74 reproduce exactly. Dot 7.25:1 graphite / 4.34:1 cream, orbit-bright 7.25:1 / 8.35:1, mid stop 4.11:1, spark peak 6.06:1 / 6.65:1, aphelion 1.81:1 / 4.99:1, dim tail 1.39:1. The two sub-3:1 emission-falloff values are recorded as a deliberate decision in the brief; per that record they are not re-litigated here.
- LabThemeToggle fix verified by the same computation: text-secondary blended over `--lab-bg-raised` in dark mode gives 3.46:1 at 0.55, 3.86:1 at 0.6, 4.75:1 at 0.7. The component's claims (LabThemeToggle.tsx:53-56) are accurate and every resting stroke now clears the 3:1 non-text minimum. The Roy C.3 flag is genuinely closed.
- Reduced motion is handled end to end. The global kill (lab.css:384-391) zeroes durations and pins iteration-count to 1, so: the draw-in renders complete and static via `isStatic` (PerihelionMark.tsx:78); a pointerenter under reduced motion completes the transit instantly and `animationend` still fires, clearing the `--transit` class (verified against the kill's mechanics, since it uses 0ms duration rather than `animation: none`); the sigil pulse rests at opacity 0 (lab.css:874-879) so no stray ring survives; the drift bodies fall back to their static `offset-distance` scatter.
- Transit has a keyboard path (`a:focus-visible` rules, lab.css:775-781) and completes once started (cleared only on `animationend` with an animation-name guard, PerihelionMark.tsx:401-405). Both critique P2s are properly implemented.
- Decorative elements are aria-hidden: the mark SVG, its wrapping span, the hairline rule, the back-arrow glyph. The toggle keeps its 44px target (h-11 w-11); the justinh.design link keeps min-h-11.
- FLAG (minor, P3): the masthead link's `aria-label="Perihelion, return to the archive"` (LabLayout.tsx:32) replaces the link's inner text in the accessible name, which means screen reader users at md+ never receive "closest approach to the frontier", the name's only translation. The mobile sibling line (LabLayout.tsx:62-66) IS exposed to screen readers, but it is display-none at md+, so desktop SR users get neither rendering. The critique scored the visual side of this (mobile tagline) and that fix landed; the accessible-name side is the residue. Fix options: move the desktop tagline outside the `<a>` as the mobile line already is, or drop the aria-label and let the structured content name the link. Does not block; the page's h1 and surrounding context still identify the surface.
- Heading hierarchy untouched: the lockup is spans inside a link; the single h1 per surface still lives in the pages.

## Content         [PASS]
- User-facing copy is clean: no em-dashes in any rendered string, and the old aria-label's em-dash ("Perihelion — return to the archive") was replaced with a comma in this branch. Tagline, kicker, and footer copy unchanged or faithfully relocated.
- ADR-012 prose is em-dash-free, concrete (scores, dates, named decision drivers), and voice-consistent.
- P3 note: new em-dashes ride along in non-copy surfaces: code comments (PerihelionSigil.tsx:3, vite.config.ts:1010) and the critique snapshot (quoting the Paper document's actual title, plans/perihelion-d-critique-snapshot.md:50). The orphan-terms heading em-dash is generated by the pre-existing script. Doctrine scopes the ban to copy, so these are observations, not violations; brief section 9 says "anywhere," so tighten if that reading is intended.

## Doctrine        [FLAG]
- FLAG (minor): ARCHITECTURE.md's Decisions table (ARCHITECTURE.md:245-258) ends at ADR-011. ADR-012 is accepted in this branch but absent from the index. The table is the convention's discovery surface; add the row with the PR or in it. One-line fix.
- ADR-012 itself is sound: real options with honest cons (the residual orbit-logo genericism and glow-on-dark genre tell are named, not hidden), consequences split correctly, Q6 explicitly preserved, related ADRs linked. The brief's recorded-discipline driver is satisfied: clearspace, the 32px floor, and the contrast matrix are recorded in the brief, not improvised.
- Mission test honored: the mobile tagline line exists precisely so the name's translation survives where most first visits happen, and it stays a sibling of the lockup so Q6 remains open. Anti-goals addressed structurally (eccentric geometry, asymmetric weight, no containment rings).
- The brief's clearspace record verifies against the build: 18px lockup gap (gap-4.5) and 20px header vertical padding (py-5) both clear the ~13px requirement at the 44px render; the viewBox `6.5 -7.5 49 49` does bound the rotated geometry per the bake-in fix.
- Aesthetic direction holds: instrument-light on graphite, press-ink on cream, restraint with one earned delight. This does not read as template work.

## Quality Gates   [PASS]
- `npm run lint`: 0 errors, 1 warning, and the warning is the pre-existing react-refresh advisory in src/components/content/renderSection.tsx:14, a portfolio file untouched by this branch. The branch introduces zero new warnings. VECTOR.md's strict "no warnings" gate remains unmet repo-wide; that debt predates this work and should be retired separately.
- `npm run build`: succeeds (1.86s). The chunk-size advisory is pre-existing and informational.
- `npm run test`: 122/122 pass across 10 files.
- `npm run audit:orphans`: clean, and the committed artifact is byte-identical to a fresh run (the "0 guides" in the script's console line counts guides WITH orphans; it scanned the full core/lab/guides/ set).
- Working tree clean at a227159; all six commits reviewed as a unit.
- P3 residual QA: cross-browser verification of the attribute mask and the `offset-path` transit/drift cannot be confirmed from code review. The construction is the right call (SVG 1.1 attribute mask is core spec, exactly what critique P2 prescribed, and an offset-path failure degrades to a stray static dot, not a broken layout), but one manual Safari/Firefox pass plus a mid-session theme-flip check on the live surface should happen with or immediately after the merge. Relatedly, PerihelionSigil keeps its inline rotate(45deg) (PerihelionSigil.tsx:36) with visual bounds ~2px proud of its 124px box; the bake-in fix was correctly scoped to the house mark, but keep the sigil out of overflow-hidden containers.

## Impeccable Delegation
- None needed this cycle: /critique already ran for this workstream (snapshot at plans/perihelion-d-critique-snapshot.md, A scored 19/24, built masthead Nielsen 37/40, deterministic scan clean) and its five priority fixes are verified implemented above. Duplicating it would be re-litigation.
