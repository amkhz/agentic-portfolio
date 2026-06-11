# Mission: Perihelion C.3 Light-Mode Activation

**Feature:** Wire the lab's dormant light palette (C.1, PR #47) to a user-facing theme: early-paint plumbing, ThemeProvider reuse, toggle UI on both surfaces, the accentLight frontmatter field, and curated light accents for all eight guides.
**Date:** 2026-06-10
**Spec:** `plans/perihelion-c3-light-mode-activation.md` (locked 2026-06-10, PR #116)
**Branch:** `feat/perihelion-c3-light-mode`
**Review path:** PR stays in review. Live verification pass happens with Justin, then Roy. Component changes never merge at the builder's call.

---

## Scope vs shipped

| # | Scope item | Status | Notes |
|---|---|---|---|
| 1 | Token cascade + types + parser | Shipped | Dual-var contract in `lab-tokens.css`; `accentLight` on `GuideFrontmatter`; `LAB_BG_LIGHT_HEX` + two warnings in `parse-guide.ts`; 4 new parser tests |
| 2 | Dual-var publication | Shipped | `GuideRenderer` and `GuideCard` publish `--guide-accent-dark` always, `--guide-accent-light` only when curated; header comments updated; 6 new component tests |
| 3 | Theme plumbing | Shipped | Early-paint script in `labs.html` (after the path-rewrite script), `ThemeProvider` wrap in `src/lab/main.tsx`, `[data-no-transition]` rule in `lab.css` |
| 4 | Toggle UI | Shipped | `LabThemeToggle` in guide top bar (right slot, opposite back link) and a slim utility row above the library masthead; 44px targets; baseline treatment only |
| 5 | Eight accentLight values + format rules | Shipped | Proposals below; guide diffs are one `accentLight` line each; `perihelion-format-rules.md` documents the field |
| 6 | Mission log + gates + PR | Shipped | This file; four gates green; PR open |

## Proposed accentLight values (for Justin's live review)

Recipe per the C.1 territory tuning: hold the dark accent's OKLCH hue, pull L to 0.52, lift chroma about 1.2x (gamut-clamped where needed). Every value is a one-line frontmatter change to adjust.

| Guide | accent (dark) | on graphite | on cream | accentLight (proposed) | on cream | on graphite |
|---|---|---|---|---|---|---|
| dird-13-warp-drive | `#f0a050` | 8.98:1 | 1.93:1 | `#975705` | 5.16:1 | 3.36:1 |
| dird-14-superconductors-gravity | `#e8a849` | 9.24:1 | 1.87:1 | `#8e5e02` | 5.06:1 | 3.42:1 |
| dird-15-vacuum-spacetime-engineering | `#b48efa` | 7.47:1 | 2.32:1 | `#7a46c3` | 5.44:1 | 3.18:1 |
| dird-28-breakthrough-cockpits | `#4ecdc4` | 9.90:1 | 1.75:1 | `#067973` | 4.76:1 | 3.64:1 |
| emergent-quantization | `#f0a050` | 8.98:1 | 1.93:1 | `#975705` | 5.16:1 | 3.36:1 |
| quantum-gravity | `#4ecdc4` | 9.90:1 | 1.75:1 | `#067973` | 4.76:1 | 3.64:1 |
| uap-field-map | `#e4e4e7` | 15.09:1 | 1.15:1 | `#686774` | 5.02:1 | 3.45:1 |
| uapx-field-methods | `#4ade80` | 10.99:1 | 1.58:1 | `#0d7e3f` | 4.66:1 | 3.72:1 |

All eight proposals clear 4.5:1 against the light background (`#f8f3e9`). The two shared dark accents (`#f0a050`, `#4ecdc4`) keep shared light counterparts so sibling guides stay visually paired. Ratios are WCAG 2.x relative-luminance math, the same helper the parser uses.

## Programmatic verification

- **Gates (all green):** `npm run lint` (0 errors; one pre-existing fast-refresh warning in `src/components/content/renderSection.tsx`, untouched), `npm run build`, `npm run test` (122 passed, 10 files), `npm run audit:orphans` (0 orphans).
- **Full-library parse:** all eight guides parse with zero warnings. Expected, since every guide now carries a valid accentLight above 4.5:1; the absent-field and low-contrast warnings were each exercised by dedicated parser tests instead.
- **LAB_BG_LIGHT_HEX derivation:** `oklch(0.965 0.014 80)` converts to sRGB (248, 243, 233), hex `#f8f3e9`, via the reference OKLCH to OKLab to linear sRGB matrices. Pinned in a comment beside the constant, mirroring the `LAB_BG_HEX` pattern.

## Deviations

- **Toggle adapted, not reused directly.** The portfolio `ThemeToggle` styles itself with portfolio token utilities (`text-text-secondary`, `bg-bg-subtle`, `ring-accent-primary`) that the lab bundle never generates, because `lab.css` owns its own Tailwind theme. `LabThemeToggle` keeps the same candle-to-sun glyph and `useTheme` contract and restyles the chrome with lab tokens. The spec's "prefer reuse" was conditional on fit; it did not fit.
- **`labs.html` also gains the static `data-theme="dark"` attribute** on the html element, mirroring `index.html`. Not named in the scope text, but it is the portfolio's no-JS default and keeps graphite the fallback register.
- **One-line test annotation** (`args: unknown[]`) added during the build gate to satisfy strict TS in the new absent-field-warning test.

## Exit flags

- Live verification pass (library + one guide per territory, both themes, desktop + 375px, toggle behavior, first-paint flash check, GuideCard glow, TerritoryBadge pulse, sigil on cream, section icons at 3:1) happens with Justin at review.
- Roy review after the live pass; PR stays in review until both clear.
- Upstream `~/projects/design-futures/guide-format-rules.md` sync for the accentLight field rides the standing Track-B list (the dir is not a repo; one-shot edit in a design-futures session).
- Final toggle treatment (icon pair, label, hover) is deliberately baseline; polish lands live with Justin per the scope lock.
