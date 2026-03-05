# Feature: OKLCH Color Migration + Light Mode + Figma Sync

> **Status:** Refined — ready for Builder
> **Created:** 2026-02-22
> **Refined:** 2026-02-26 (Dreamer deep research pass)
> **Depends on:** Nothing (Phase 1 is standalone; Phase 2 builds on Phase 1; Phase 3 is advisory)
> **Project:** agentic-portfolio (migrated from Next.js App Router to Vite + React Router)

## Summary

Migrate the portfolio's color system from hex to OKLCH, then use OKLCH's perceptually uniform lightness channel to build a light mode palette, and align the token format for future Figma sync via Token Studio / W3C DTCG JSON.

## Context

This plan touches three items from the Part 3 roadmap:

- **3.1 Light/Dark Theme Toggle** — OKLCH makes light mode derivation systematic instead of manual. Adjusting the L channel while preserving C (chroma) and H (hue) means brass stays brass, magenta stays magenta.
- **3.3 Token Sync to Figma** — The W3C DTCG spec (stable as of October 2025) supports OKLCH natively. Token Studio converts to hex for Figma Variables (Figma doesn't support OKLCH natively in variables yet), but having OKLCH as the authored format keeps the code source of truth in a modern, perceptually uniform color space.
- **Team pitch** — "One color space, one source of truth, perceptually uniform across both tools" is a stronger story than "hex everywhere."

---

## Phase 1: OKLCH Migration

**Risk:** Low. Only token definition files and one component change. All other component files reference Tailwind utility classes (`bg-accent-primary`, etc.) which resolve to CSS custom properties. The values behind those properties change format, but the references don't.

**Browser support:** ~96% globally. The audience (design/tech hiring managers) is on modern browsers. Tailwind v4's own default palette already uses OKLCH.

### What changes

| File | Change | Risk |
|------|--------|------|
| `core/tokens/index.ts` -> `colors` | Convert 21 hex values to `oklch()` strings | Low |
| `design-system/tokens.css` -> `@theme inline` | Mirror the same 21 `oklch()` values | Low |
| `core/tokens/index.ts` -> `shadows` | Convert 6 `rgba()` shadow values to `oklch()` with alpha | Low |
| `design-system/tokens.css` -> shadow variables | Mirror same shadow conversions | Low |
| `src/components/effects/GlowEffect.tsx` | Convert 4 hardcoded `rgba()` values (colorMap + colorFade) to `oklch()` with alpha | Low |
| OG image files | **Keep hex** — Satori doesn't support OKLCH | None |
| All other component files | **No changes** — they use Tailwind classes, not raw colors | None |

### Implementation steps

1. **Convert hex palette to OKLCH values**
   - Use a programmatic converter or oklch.com to get precise OKLCH equivalents for all 21 color tokens
   - For 8-digit hex values with alpha, convert to `oklch(L C H / alpha)`
   - **Verify each conversion visually**
   - Document the hex->OKLCH mapping in a comment block in `core/tokens/index.ts` for traceability

2. **Update `core/tokens/index.ts`**
   - Replace all hex strings in the `colors` object with `oklch()` strings
   - Replace `rgba()` strings in the `shadows` object with `oklch()` equivalents
   - Keep the same property names, comments, and structure
   - Add hex reference comments next to each value

3. **Update `design-system/tokens.css` `@theme inline`**
   - Replace all hex values in the color and shadow custom properties with `oklch()` values
   - Tailwind v4 supports `oklch()` natively in `@theme inline`
   - Opacity modifiers work with OKLCH via `color-mix(in oklch, ...)`

4. **Update `GlowEffect.tsx`**
   - Convert `colorMap` and `colorFade` objects from `rgba()` to `oklch()` with alpha

5. **Verify OG image files are untouched**
   - Satori (used by OG image generation) does not support OKLCH — these must stay hex

6. **Visual regression check**
   - `npm run build` — verify no compilation errors
   - `npm run lint` — verify no lint issues
   - Visual spot-check: home, about, work index, one case study page

### Hex-to-OKLCH reference (approximate — Builder must verify with a converter)

```
Background tokens:
  #0A0A0B  ->  oklch(0.07 0.005 285)      bg-deep
  #121214  ->  oklch(0.12 0.005 285)      bg-base
  #1A1A1E  ->  oklch(0.17 0.008 285)      bg-elevated
  #222228  ->  oklch(0.21 0.01 280)       bg-subtle

Text tokens:
  #F0EDE8  ->  oklch(0.95 0.01 80)        text-primary
  #B8B2A8  ->  oklch(0.76 0.02 85)        text-secondary
  #807A72  ->  oklch(0.55 0.02 75)        text-muted
  #0A0A0B  ->  oklch(0.07 0.005 285)      text-inverse

Accent tokens (brass):
  #C8956A  ->  oklch(0.70 0.11 65)        accent-primary
  #D4A87A  ->  oklch(0.76 0.11 70)        accent-hover
  #C8956A33 -> oklch(0.70 0.11 65 / 0.2)  accent-muted
  #C8956A1A -> oklch(0.70 0.11 65 / 0.1)  accent-glow

Secondary tokens (magenta):
  #C278A0  ->  oklch(0.64 0.11 345)       secondary-primary
  #D08BB2  ->  oklch(0.70 0.11 345)       secondary-hover
  #C278A033 -> oklch(0.64 0.11 345 / 0.2) secondary-muted
  #C278A01A -> oklch(0.64 0.11 345 / 0.1) secondary-glow

Border tokens:
  #2A2A30  ->  oklch(0.23 0.01 275)       border-subtle
  #3A3A42  ->  oklch(0.31 0.01 275)       border-strong

Semantic tokens:
  #7AB87A  ->  oklch(0.72 0.12 145)       success
  #D4A84A  ->  oklch(0.76 0.13 85)        warning
  #C87A6A  ->  oklch(0.64 0.11 35)        error

Shadow base (rgba -> oklch):
  rgba(10, 10, 11, 0.3)     -> oklch(0.07 0.005 285 / 0.3)    shadow-sm
  rgba(10, 10, 11, 0.4)     -> oklch(0.07 0.005 285 / 0.4)    shadow-md
  rgba(10, 10, 11, 0.5)     -> oklch(0.07 0.005 285 / 0.5)    shadow-lg
  rgba(10, 10, 11, 0.6)     -> oklch(0.07 0.005 285 / 0.6)    shadow-xl
  rgba(200, 149, 106, 0.15) -> oklch(0.70 0.11 65 / 0.15)     shadow-glow-brass
  rgba(194, 120, 160, 0.15) -> oklch(0.64 0.11 345 / 0.15)    shadow-glow-magenta

GlowEffect (rgba -> oklch):
  rgba(200, 149, 106, 0.17) -> oklch(0.70 0.11 65 / 0.17)     brass core
  rgba(200, 149, 106, 0.06) -> oklch(0.70 0.11 65 / 0.06)     brass fade
  rgba(194, 120, 160, 0.17) -> oklch(0.64 0.11 345 / 0.17)    magenta core
  rgba(194, 120, 160, 0.06) -> oklch(0.64 0.11 345 / 0.06)    magenta fade
```

---

## Phase 2: Light Mode

**Depends on:** Phase 1 (OKLCH migration) — light mode palette is derived by adjusting L channel values.

### Architecture approach

The `design-system/tokens.css` file uses CSS custom properties. The light mode approach:

1. Move color definitions out of `@theme inline` and into `:root` (dark) and `[data-theme="light"]` selectors
2. Keep `@theme inline` but have it reference `var(--color-*)` variables instead of literal values
3. A `ThemeProvider` swaps the `data-theme` attribute on `<html>`
4. Cookie-persisted preference (works with SSR and SSG)

### Tailwind v4 compatibility (verified)

This architecture is confirmed compatible with Tailwind v4:

- **`@theme inline` with `var()` references** works correctly.
- **Opacity modifiers** work with `var()` values via `color-mix(in oklch, ...)`.
- **The `@layer theme` pattern** is recommended by Tailwind for defining variable overrides.

```css
/* Step 1: Define theme-specific values */
@layer theme {
  :root {
    --color-bg-deep: oklch(0.07 0.005 285);
    --color-bg-base: oklch(0.12 0.005 285);
    /* ... all 21 color tokens + shadows ... */
  }

  [data-theme="light"] {
    --color-bg-deep: oklch(0.97 0.008 85);
    --color-bg-base: oklch(0.94 0.008 85);
    /* ... all 21 light-mode equivalents ... */
  }
}

/* Step 2: Tailwind picks up the current values at runtime */
@theme inline {
  --color-bg-deep: var(--color-bg-deep);
  --color-bg-base: var(--color-bg-base);
  /* ... */
}
```

### Light mode palette strategy (OKLCH L-channel approach)

| Token group | Dark L range | Light L range | Notes |
|-------------|-------------|---------------|-------|
| bg-* | 0.07-0.21 | 0.94-0.99 | Warm cream/paper, not pure white. Keep slight chroma + warm hue (H ~80-85) |
| text-* | 0.55-0.95 | 0.12-0.45 | Invert. Headings dark, muted stays accessible |
| accent (brass) | 0.70-0.76 | 0.55-0.65 | Slightly darker on light bg for contrast. Verify WCAG AA |
| secondary (magenta) | 0.64-0.70 | 0.50-0.60 | Same approach. Re-check contrast on cream bg |
| border-* | 0.23-0.31 | 0.82-0.88 | Warm light grays |
| semantic | 0.64-0.76 | 0.45-0.55 | Darker for readability on light bg |

### Light mode implementation steps

1. **Define light mode palette** — Derive L-channel-adjusted values, run WCAG contrast checks
2. **Refactor `design-system/tokens.css`** — Move to `@layer theme` with `:root` / `[data-theme="light"]`, update `@theme inline` to use `var()`
3. **Update `core/tokens/index.ts`** — Add `lightColors` export with same shape as `colors`
4. **Build `ThemeProvider`** — React context, cookie-persisted, sets `data-theme` on `<html>`
5. **Build `ThemeToggle` component** — 44px tap target, accessible label, focus ring using token colors
6. **Adjust effects for light mode** — `GlowEffect.tsx` uses CSS custom properties, `GrainOverlay.tsx` adjust opacity
7. **Verify both themes** — Lighthouse accessibility audit, visual check, `npm run lint` + `npm run build`

### Decisions (resolved 2026-02-26)

- [x] **Default theme:** Detect `prefers-color-scheme` on first visit. Cookie persists manual override.
- [x] **Token structure in TS:** Flat parallel exports. Zero breaking changes.
- [x] **GlowEffect in light mode:** Subtle warm shadow instead of glow.
- [x] **GrainOverlay in light mode:** Keep it, adjust if needed.
- [x] **Transition style:** Smooth crossfade ~300-400ms.

---

## Phase 3: Figma Sync Implications

**This phase is advisory — no code changes.**

### Current reality (as of February 2026)

- **Figma Variables do NOT support OKLCH natively.** Variables are stored as hex/rgba internally.
- **Token Studio converts OKLCH to hex** when pushing to Figma Variables.
- **W3C DTCG spec (2025.10 stable)** supports OKLCH natively.
- **The export path works:** `core/tokens/index.ts` (OKLCH) -> DTCG JSON (OKLCH) -> Token Studio -> Figma Variables (auto-converted to hex)

### Export script concept (for Builder later)

A small script that reads `core/tokens/index.ts` and outputs W3C DTCG JSON:

```json
{
  "color": {
    "bg": {
      "deep": {
        "$type": "color",
        "$value": "oklch(0.07 0.005 285)",
        "$description": "Deepest background, page-level"
      }
    }
  }
}
```

### Team pitch angle

> "Our tokens are authored in OKLCH -- a perceptually uniform color space. Dark and light modes are mathematically related: same hue, same chroma, adjusted lightness. The code is the source of truth. Token Studio syncs to Figma automatically, converting to hex where needed. When Figma catches up to OKLCH, nothing changes on our end."

---

## Files Affected (Complete List)

### Phase 1 (OKLCH migration)
- `core/tokens/index.ts` — color values hex -> oklch, shadow values rgba -> oklch
- `design-system/tokens.css` — @theme inline values hex -> oklch, shadow values rgba -> oklch
- `src/components/effects/GlowEffect.tsx` — 4 rgba values -> oklch with alpha

### Phase 2 (Light mode)
- `design-system/tokens.css` — restructure to `@layer theme` with `:root` / `[data-theme="light"]` + `@theme inline` with var()
- `core/tokens/index.ts` — add light mode color set
- Root layout — integrate ThemeProvider, read cookie
- `src/components/layout/Header.tsx` — add ThemeToggle
- `src/components/effects/GlowEffect.tsx` — theme-aware gradient colors
- `src/components/effects/GrainOverlay.tsx` — possibly theme-aware opacity
- **New file:** `src/components/interactive/ThemeToggle.tsx`
- **New file:** `src/providers/ThemeProvider.tsx`

### Phase 3 (Figma sync — future)
- **New file:** `scripts/export-tokens-dtcg.ts` (or similar)
- **New file:** `tokens.json` (DTCG output)

## Dependencies

- **Phase 1:** None. Zero new packages.
- **Phase 2:** None expected. ThemeProvider uses React context + cookies. Icon for toggle can be inline SVG.
- **Phase 3:** Possibly `token-transformer` or a custom script.

## Accessibility Requirements

- **Phase 1:** No a11y impact — same colors, different format.
- **Phase 2:**
  - Both themes must independently pass WCAG 2.2 AA contrast ratios
  - ThemeToggle needs accessible label, focus ring, 44px minimum tap target
  - Theme transition must not trigger motion-sensitive issues
  - `prefers-reduced-motion`: provide still fallback for any toggle animation
- **Phase 3:** N/A (tooling, not UI)

## Recommended Build Order

1. **Phase 1 first** — low risk, standalone, unblocks Phase 2
2. **Phase 2 second** — bigger scope, but OKLCH makes palette derivation cleaner
3. **Phase 3 whenever** — advisory, can happen any time after Phase 1

---

## Pitch-Worthy Items (for Director)

- OKLCH migration itself is a talking point: "We moved to a perceptually uniform color space, which means our light and dark palettes are mathematically coherent, not hand-picked."
- The L-channel light mode derivation is a concrete demo of token-driven theming.
- Code -> DTCG JSON -> Figma pipeline validates the "code as source of truth" thesis.
