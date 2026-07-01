# /impeccable audit — Main Portfolio

**Date:** 2026-07-01
**Target:** agentic-portfolio main portfolio (justinh.design) — Home, Work, Case Study, About, Resume, Notes, Note, 404 + shared components. **Out of scope:** `src/lab/` (Perihelion, audited separately 2026-07-01).
**Method:** deterministic greps (color/motion/heading/img) + `npx impeccable --json` detector + deep component read across `content/`, `effects/`, `fieldnotebook/`, `interactive/`, `layout/`.

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | ImageLightbox modal has no focus trap/restore |
| 2 | Performance | 3 | Full-viewport grain overlay with `mix-blend-mode` (mobile INP) |
| 3 | Responsive Design | 3 | Negative-offset GlowEffect can overflow-x on 375px; sub-44px NowPlaying tab |
| 4 | Theming | 3 | ProfileCard hardcodes hsl/hex (OKLCH-only violation) |
| 5 | Anti-Patterns | 2 | Accent-glow is systemic (every primary Button + hero orbs + NowPlaying) — violates own no-accent-glow ban |
| **Total** | | **14/20** | **Good (bottom edge) — anti-pattern column is the drag** |

## Anti-Patterns Verdict

**MIXED.** The structural bones are genuinely custom (Field Notebook grammar, TOC-not-cards, de-slopped Callout/Metric) and would survive a "did AI make this?" challenge. But the `effects/`+`interactive/` layer leaks the project's own banned tells on high-traffic elements: a **systemic brass accent-glow** (baked into the primary Button variant, hero GlowEffect orbs, and NowPlaying), plus a decrypt-scramble and a holographic tilt card. No gradient text, no side-stripes, no default glass, no bounce. The tells are concentrated and removable — that's the good news.

## Executive Summary

- **Health: 14/20 (Good, bottom edge).** Four dimensions at 3, anti-patterns at 2. The drag is a single systemic habit — accent glow — that the Conservatory recalibration didn't fully remove, plus two effect-layer gimmicks.
- **Issues:** 0 P0 · 0 P1 · 7 P2 · 4 P3 (technical-audit severity; the critique escalates the glow to P0 on a design-effectiveness basis — see the critique report).
- **Top issues:**
  1. **[P2 anti-pattern]** Systemic accent glow — `Button.tsx:18` bakes `shadow-glow-brass` into *every* primary CTA; `GlowEffect` orbs sit behind hero type on 5 surfaces; NowPlaying adds glow drop-shadows. Directly violates `feedback_no_accent_glow`.
  2. **[P2 a11y]** ImageLightbox — no focus management (keyboard/SR users tab behind the overlay).
  3. **[P2 perf]** GrainOverlay — full-screen `feTurbulence` + `mix-blend-mode` repaints on scroll; prime suspect for the known mobile-INP problem.
  4. **[P2 responsive]** Negative-offset GlowEffect blocks with no `overflow-x` guard — likely horizontal scroll at 375px.
  5. **[P2 theming]** ProfileCard hardcoded hsl/hex — 16 values, OKLCH-only violation (exception candidate, currently uncodified).

## Detailed Findings by Severity

### P2 — Systemic accent glow (own-doctrine violation)
- **Location:** `src/components/interactive/Button.tsx:18` (`primary` = `...shadow-glow-brass`, every primary CTA); `src/components/effects/GlowEffect.tsx` used on `WorkPage.tsx:72`, `ProjectCard.tsx:69`, `CaseStudyPageTemplate.tsx:149`, `renderSection.tsx:20`, `NotFoundPage.tsx:15`; `src/components/interactive/NowPlaying.tsx:24,134` (accent-glow drop-shadows); `src/components/content/ImageBlock.tsx:72` (hover halo)
- **Category:** Anti-Pattern · **Doctrine:** `feedback_no_accent_glow`
- **Impact:** Glowing colored halos are the codified AI-slop tell; interaction should be brass weight-shift + ink, not a halo. It sits on the most-clicked element on every page (primary Button) and behind hero type. First-impression cost for exactly the senior eyes the portfolio targets.
- **Fix:** Drop `shadow-glow-brass` from the primary Button (keep brass fill + `active:scale-95` weight-shift); remove GlowEffect orbs from hero surfaces (let atrium image + type carry depth, or use grain/material); strip the NowPlaying/ImageBlock glow shadows.
- **Suggested command:** `polish` (see critique — this is the headline design issue)

### P2 — ImageLightbox has no focus management
- **Location:** `src/components/content/ImageLightbox.tsx:30-56`
- **Category:** Accessibility · **WCAG:** 2.4.3 Focus Order, 2.1.2 No Keyboard Trap (inverse)
- **Impact:** Sets `role="dialog"` + `aria-modal` and handles Escape/backdrop, but never moves focus in on open, never traps Tab, never restores focus to the trigger on close. Keyboard/SR users tab into the page behind the scrim.
- **Fix:** Mirror `MobileMenu.tsx:59-100` (already a model drawer: trap, Escape, scroll-lock, focus return).
- **Suggested command:** `harden`

### P2 — GrainOverlay full-screen blend repaints on scroll
- **Location:** `src/components/effects/GrainOverlay.tsx:31-52`
- **Category:** Performance
- **Impact:** `fixed inset-0` SVG turbulence composited with `mix-blend-mode` forces the whole document into a blend group; scrolling content beneath repaints the blended region. Static, but a real mobile scroll/paint cost — plausible contributor to the standing mobile-INP issue.
- **Fix:** Measure with the layer off; consider gating grain to non-mobile or swapping to a non-blend static texture on small viewports.
- **Suggested command:** `optimize`

### P2 — Negative-offset GlowEffect risks horizontal scroll
- **Location:** `src/components/effects/GlowEffect.tsx:4-7`; used `ProjectCard.tsx:72` (`-left-16`, 400px), `CaseStudyPageTemplate.tsx:149`, `renderSection.tsx:20`; `Container.tsx:17` has no clip; no `overflow-x` guard in `globals.css`
- **Category:** Responsive
- **Impact:** A −64px-offset 400px blurred box against 24px container padding overflows a 375px viewport by ~40px; counts toward scrollWidth even though pointer-events-none. Likely horizontal scroll on mobile.
- **Fix:** Add `overflow-x: clip` on the section/container wrappers, or constrain GlowEffect offsets at the mobile breakpoint. (Moot if the glow orbs are removed per the anti-pattern finding.)
- **Suggested command:** `adapt` — **needs a live 375px check to confirm.**

### P2 — NowPlaying tab under 44px touch target
- **Location:** `src/components/interactive/NowPlaying.tsx:73-85`
- **Category:** Responsive · **WCAG:** 2.5.8 Target Size (AA)
- **Impact:** Persistent floating tab is `px-4 py-2` ≈ 34-36px tall — a primary affordance under the 44px minimum.
- **Fix:** Raise to `min-h-[44px]`.
- **Suggested command:** `adapt`

### P2 — NowPlaying brass→green EQ gradient (color-law breach)
- **Location:** `src/components/interactive/NowPlaying.tsx:37` (`linear-gradient(... var(--theme-accent-primary), var(--theme-secondary-primary))`)
- **Category:** Theming / Anti-Pattern · **Doctrine:** green is atmosphere/material only, never interaction/status
- **Impact:** The EQ bars are a playback-status indicator; blending brass→green puts the living-primary green into interaction chrome, which the color law forbids.
- **Fix:** Single-token brass, or pure secondary treated as material — not a blend into the interaction accent.
- **Suggested command:** `polish`

### P2 — ProfileCard hardcoded hsl/hex (OKLCH-only)
- **Location:** `src/components/effects/ProfileCard.tsx:235-240, 282-306, 344-373`
- **Category:** Theming / Anti-Pattern · **Doctrine:** `feedback_oklch_only`, DESIGN.md hard constraint
- **Impact:** Sunpillar rainbow `hsl(...)`, `#0e152e` sheen stops, `rgba()` glare/shadow — 16 non-token color values on the live About page. The literal rainbow is the effect's point, so it's an exception candidate, but currently uncodified.
- **Fix:** Either convert to OKLCH tokens or add a one-line codified exception in DESIGN.md so the audit stops flagging it. (Tie to the "keep or cut the tilt card" call — see critique.)
- **Suggested command:** `polish` (or an ADR/DESIGN.md note)

### P3 — Minor items
- **`ImageBlock.tsx:53-67`** — expandable image is `div[role="button"]` with hand-rolled keyboard handling; a native `<button>` is cleaner. (A11y)
- **`NowPlaying.tsx:158-164`** (Last.fm link ≈36px) and **`ImageLightbox.tsx:44-46`** (close button 40px) — sub-44px targets. (Responsive)
- **`NowPlaying.tsx:112`** — animates `grid-template-rows` (layout prop) instead of a transform; `motion-safe`-gated and small, low impact. (Perf)
- **`ProfileCard.tsx:262`** — `pc-holo-bg 18s linear infinite` runs while mounted; reduced-motion-guarded and the heavy blur stays at opacity 0 until hover, so mobile is idle. (Perf)

## Patterns & Systemic Issues

- **Accent glow is one habit, many sites.** Button, GlowEffect, NowPlaying, ImageBlock all express interaction/atmosphere as a colored halo. One doctrine decision (remove the glow vocabulary) clears the anti-pattern column, the responsive overflow risk, and part of the theming column at once.
- **GlowEffect is implicated three times** (overflow, ambient-halo, hero-orb). Removing it from hero surfaces is the single highest-leverage change.
- **Reduced-motion is a genuine strength, not a gap:** belt-and-suspenders (per-component `useReducedMotion` + a global `globals.css:259-267` blanket that zeroes all durations).

## Positive Findings

1. **Image pipeline is excellent** — `ResponsiveImage` ships AVIF/WebP `<picture>` with intrinsic width/height (CLS-safe), lazy-by-default, heroes eager + `fetchPriority="high"`, graceful fallback when variants are missing.
2. **MobileMenu is a model accessible drawer** — focus trap, Escape, backdrop close, scroll-lock, focus return, route-change close, full ARIA. The reference the lightbox should be brought up to.
3. **Motion doctrine is honored in code** — all springs `bounce: 0` critically-damped, one scoped micro-interaction overshoot (`motionConfig.ts:29`), transform-driven parallax with reduced-motion bail.
4. **Anti-pattern hygiene where it counts** — CalloutBlock de-slopped to a full box, MetricCard de-carded to a hairline ledger; no gradient text, no default glass, no card-grid work index.

## Recommended Actions (priority order)

1. **[P2] `polish`** — remove the systemic accent glow (Button `shadow-glow-brass`, GlowEffect hero orbs, NowPlaying/ImageBlock glow shadows). Highest-leverage; clears the anti-pattern drag.
2. **[P2] `harden`** — ImageLightbox focus trap/restore (mirror MobileMenu).
3. **[P2] `optimize`** — GrainOverlay full-screen blend; measure + gate for mobile (ties to known INP work).
4. **[P2] `adapt`** — GlowEffect overflow guard (moot if orbs removed) + NowPlaying 44px target. **Live 375px check first.**
5. **[P2] decision** — ProfileCard tilt/hardcoded color + brass→green EQ: keep-and-codify or cut. Justin's call.
6. **[P2] `impeccable polish`** — final sweep once fixes land.

> Run these one at a time, all at once, or in any order. Re-run `/impeccable audit` after fixes to watch the score move (glow removed → anti-patterns back to 3-4, total ~17-18/20).
