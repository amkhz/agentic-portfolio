# ADR-005: CSS-only texture system for themed backgrounds

**Date:** 2026-04-11
**Status:** accepted
**Deciders:** Justin Hernandez, Tyrell (Builder)

## Context

The portfolio's visual direction -- "Blade Runner meets Finn Juhl" -- establishes a strong atmospheric identity in dark mode through warm blacks, grain overlays, and OKLCH color tokens. However, light mode felt like a technical inversion (L-channel swap) rather than a crafted counterpart. The backgrounds in both modes were flat solid colors with no material quality. For a portfolio that claims "every detail signals rigor," flat backgrounds undermine the design thesis.

The challenge: add tactile, material texture to both modes without introducing image assets, new dependencies, or performance regression.

## Decision Drivers

- **Token colors only, no external assets** -- ARCHITECTURE.md prohibits raw color values outside design-system/ and VECTOR.md favors minimal dependencies
- **Both themes must feel equally crafted** -- light mode is not a secondary citizen
- **Performance budget** -- textures must not cause paint or composite regressions on the body element
- **Design direction** -- dark mode is tech/sci-fi, light mode is natural materials (Niander Wallace's office as the complementary pole)

## Options Considered

### Option A: CSS-only repeating gradients

Use `repeating-linear-gradient` layers to create texture patterns. Control via a single CSS custom property (`--texture-linen`) that switches per `[data-theme]`. Apply to `body { background-image }`.

**Pros:**
- Zero external assets, zero new dependencies
- Token-controlled -- one variable per theme, same application point
- GPU-rasterized once, then composited -- cheap on large surfaces
- Theme-aware by default through the existing CSS variable pipeline

**Cons:**
- CSS gradients are deterministic -- they repeat perfectly, which can feel mechanical
- Complex multi-layer gradients increase CSS file size (~1KB)
- Tuning opacity and color requires manual iteration

### Option B: SVG feTurbulence filters on surfaces

Apply SVG filter textures (`feTurbulence`, `feDisplacementMap`) to page surfaces.

**Pros:**
- Produces genuinely organic, non-repeating noise patterns
- Can simulate paper, wood grain, and fabric convincingly

**Cons:**
- SVG filters force full-element rasterization -- expensive on body/viewport-sized elements
- `feDisplacementMap` (for wood grain) is CPU-intensive
- Harder to make theme-aware -- requires JS or class-based filter switching

### Option C: External texture images

Use pre-rendered texture PNGs/WebPs as tiling backgrounds.

**Pros:**
- Maximum visual fidelity
- One-time download, then cached

**Cons:**
- New external assets to maintain and deploy
- Contradicts ARCHITECTURE.md's "no heavy dependencies" preference
- Harder to tune -- requires image editing rather than CSS variable tweaks

## Decision

**We will use CSS-only repeating gradients (Option A) for both theme textures.**

Light mode layers translucent linen (warp/weft crosshatch + warm wash) over aged wood grain (directional gradients at offset angles simulating growth rings and drift). Dark mode layers sparse circuit-mesh traces in brass and magenta at subtle opacity, with a slow ambient warmth undulation underneath. Both are controlled by the same `--texture-linen` token, which resolves to `none` or the gradient stack per theme. The existing SVG grain overlay (`GrainOverlay`) complements the textures with `multiply` blend in light mode and `normal` blend in dark mode.

This approach satisfies all decision drivers: zero assets, zero dependencies, token-controlled, theme-aware, and performance-safe for body-level application.

## Consequences

**Positive:**
- Both modes now have material identity -- light mode feels like paper over wood, dark mode feels like circuitry embedded in warm black
- The texture system is infinitely tunable via CSS variable opacity values
- No build pipeline changes, no asset management, no CDN concerns
- The `--texture-linen` / `--grain-blend` / `--grain-opacity` tokens form a small, coherent texture API

**Negative:**
- CSS gradient textures are deterministic and repeat -- on very large monitors, the pattern may tile visibly (mitigated by using prime-number-adjacent spacing and angle offsets)
- Tuning is subjective and iterative -- there's no "correct" opacity, it requires visual judgment
- The texture token name (`--texture-linen`) is inherited from the light mode origin and doesn't perfectly describe the dark mode circuit mesh

**Neutral:**
- The SVG paper filter (`#paper-texture`) was added to `GrainOverlay` defs for future use on card surfaces but is not currently applied to any element

## Related Decisions

- `ADR-001: Migrate from Next.js to Vite` -- static SPA means textures are pure CSS, no SSR considerations
- `ADR-003: React Bits adoption` -- copy-paste-adapt approach for effects aligns with building texture in-house rather than using a library
