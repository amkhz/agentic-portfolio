# /impeccable audit — Perihelion "The Reading Room" (both modes)
Date: 2026-07-01 · Scope: lab surfaces (guide reader + library index + tokens)

## Anti-patterns verdict: PASS (reads hand-built, not AI)
No gradient text, no glassmorphism cards, no generic card grid (library is ledger rows + register-mark corner ticks on flat ground), no elastic/bounce easing, OKLCH-token-only throughout, `--lab-texture: none` confirmed flat in both mode blocks. The recalibration holds as a distinctive, restrained reading surface. Two glow uses to adjudicate (below), both already documented as intentional in code.

## Executive summary
- **0 P0, 0 P1** — nothing blocks merge.
- **4 P2** worth fixing (one is a genuine a11y defect I recommend fixing before you call the recalibration done).
- Several P3 polish/known-floor items.
- **All P2 findings are pre-existing in the shipped recalibration, not introduced by the wrap batch** (#155/#157/#158 are clean here — the audit re-confirmed reduced-motion + focus + heading hierarchy on the changed surfaces).
- Contrast: **all text tokens pass AA in both modes** (ran `scripts/wcag-check.py`).

## P2 findings

**1. Dead, misleading term buttons in lists/tables/blockquotes** — `GuideList.tsx:38`, `GuideTable.tsx:45`, `GuideBlockquote.tsx:60` · a11y
`GuideTerm` always renders a `<button aria-expanded="false" aria-controls={termCardId(term)}>`, but outside `GuideParagraph` it's passed `active={false}` + `onToggle={() => {}}`. Result: focusable buttons that do nothing on click/Enter **and** carry an `aria-controls` pointing at an element ID that is never rendered (dangling reference). A screen-reader user tabs to a control that announces an expandable popover that doesn't exist. *Impact: false affordance + broken ARIA relationship.* **Recommend fixing before merge** — either render terms as plain text (not buttons) when non-interactive, or wire the popover through in those contexts. Code-verified.

**2. Sub-44px tap targets** — `ReaderRail.tsx:180` (rail collapse `h-8 w-8` = 32px), `GuideGlossaryView.tsx:102` (unpadded "Back to top"), `ReaderControls.tsx:44` (unpadded "Reset") · a11y/responsive
Below the 44px target (and the 32px toggle is below even the 36px `min-h-9` floor the controls use). Desktop-mouse-first, so lower urgency, but the glossary/reset text buttons are reachable on touch. *Impact: harder to hit, esp. touch.* Suggest `/harden` or a targeted `min-h-11`/padding pass. Code-verified.

**3. `--border-strong` fails the 3:1 non-text contrast threshold** — 2.26 dark / 2.42 light (`wcag-check.py`) · a11y
Fine for decorative dividers, but it's the **sole boundary** of some interactive controls: theme-toggle button (`LabLayout.tsx:24`), mobile drawer trigger (`ReaderRail.tsx:344`), figure border. WCAG 2.2 SC 1.4.11 wants 3:1 for control boundaries. *Impact: control edges hard to perceive, esp. low-vision.* Fix = nudge `--border-strong` L until it clears 3:1, or add a non-border affordance to those controls. **Needs your eye** on whether the nudge disturbs the calm register. Code-verified (ratios), pixel-check for the aesthetic tradeoff.

**4. Per-guide `--guide-accent` contrast is unverified** — `scripts/wcag-check.py` · a11y coverage gap
The script checks lab bg/text/territory tokens but **not** the frontmatter-supplied per-guide accent, which renders as text (terms, links, active tab, accent labels). Each guide's `accent`/`accentLight` could in principle fail AA and nothing catches it. `parse-guide.ts` already warns below 4.5 at parse time for the accent-on-bg case — so this is partly covered — but the script coverage gap is worth closing. Suggest extending `wcag-check.py` with the per-guide accents. Code-verified.

## P3 (polish / known floors — defer)
- `min-h-9` (36px) tap targets on measure buttons, Day/Night, and the "Reading controls" disclosure (`ReaderControls.tsx:119`, `ReaderRail.tsx:107,222`). A known, accepted floor.
- ColophonNote `<summary>` ~28px (`LibraryHeader.tsx:82`).
- Decorative `backdrop-blur` on the glossary sticky letter-nav (`GuideGlossaryView.tsx:52`) — a second blur beyond the sanctioned drawer scrim.
- Labs JS chunk >500KB (known, noted follow-up) — route-level code-split opportunity.

## Two glows to adjudicate (your call — slop-ban judgment)
- **Register row hover glow** — `RegisterShelf.tsx:71`, `shadow-[0_0_8px_color-mix(...guide-accent 50%...)]`. Code comments frame it as the "restrained affordance glow, not the banned neon border" you sanctioned during #150. Per [[feedback_no_accent_glow]] you allowed a *subtle hover-gated* affordance glow — so this is likely intended-and-fine, but it is literally an accent box-shadow glow, so I'm surfacing it.
- **Sigil/mark brass-dot halo** — `feGaussianBlur` (`PerihelionSigil.tsx:119`). Part of the mark identity (allowed).

## Positive findings
- Heading hierarchy clean on both pages (one h1 each, no skips; masthead is an `<a>`, emits no heading).
- Register rows are real semantic `<a>` links with `aria-label`; nav uses `<ol>/aria-current`; glossary uses `<dl>/<dt>/<dd>`.
- **prefers-reduced-motion is fully covered** — every JS animation via `useReducedMotion`, every CSS animation caught by the global reduced-motion kill (`lab.css:504`). Exemplary.
- Global focus-visible rule covers every interactive tag; no unfocusable controls.
- `GuideTable` has an `overflow-x-auto` wrapper; register grid uses `minmax(0,1fr)` + `min-w-0` — no mobile blowout.

## Verdict
**Ship-worthy. No merge blockers.** Recommend fixing **P2 #1 (dead term buttons)** before declaring the recalibration done — it's a small, contained a11y correctness fix. P2 #2–#4 are reasonable fast-follows.
