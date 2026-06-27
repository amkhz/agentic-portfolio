# Reference: Paper Shaders (`@paper-design/shaders-react`)

Captured 2026-06-25. Verified against npm + the live gallery (shaders.paper.design). This is a **reference + spike brief** for layering WebGL shader atmosphere over the M2 Wallace imagery as part of the M4 motion pass. Not yet built. The spike task is **T4d** in `vector/missions/post-recalibration-batch.md`.

## Why this is here

Justin is generating the case-study imagery now (M2). The idea: a shader layer reading the Conservatory tokens, composited over (or behind) those renders, to push covers past flat panels into living light — and to complement the M4 animation pass rather than duplicate it. Ties directly to `feedback_no_flat_color_covers` ("texture, light, depth, shader-feel") and `feedback_imagery_restraint` (accent at anchors, never wallpaper).

## Verified facts (2026-06-25)

- **Packages:** `@paper-design/shaders-react` (React components) wraps `@paper-design/shaders` (vanilla). Built by the Paper team.
- **Version:** `0.0.76`. Pre-1.0 — API may drift; re-verify before install.
- **Peer dep:** `react: ^18 || ^19` + `@types/react`. Clean fit for this stack (React 19). Effectively zero other runtime deps.
- **Backend:** WebGL fragment shaders rendered to a `<canvas>`. Each shader is a prop-driven React component (`colors`, `speed`, `scale`, `distortion`, `softness`, `style`, etc.) you mount as a layer.
- **Not installed** in this repo as of capture (no `package.json` entry, no `src/` usage).

## Open question to settle in the spike (load-bearing)

The `colors` prop in every documented example takes **hex** strings, and shaders interpolate in their own color space (likely sRGB), not OKLCH. This collides with the OKLCH-only token rule (`feedback_oklch_only`). The spike must determine:

1. Does the `colors` prop accept `oklch()` strings directly?
2. If not, do we pass runtime-resolved values from the tokens (read the computed CSS var, feed the shader), accepting that the *interpolation between stops* is no longer perceptually uniform?

Resolve this before wiring a shader into any shipped surface. Do not hardcode hex into a component — derive from `design-system/tokens.css` (`--color-accent-*`, `--color-secondary-*`, `--color-bg-*`).

## Full shader catalog (29, from the live gallery)

**Image filters** — operate on an input image, most relevant to the imagery idea:
- **Paper Texture** — textured paper surface over an image
- **Fluted Glass** — vertical ribbed-glass distortion
- **Water** — flowing ripple distortion
- **Image Dithering** — reduced-color dither over an image
- **Halftone Dots** / **Halftone CMYK** — print halftone, mono or CMYK separation

**Logo animations / material:**
- **Liquid Metal** — flowing metallic liquid
- **Gem Smoke** — shimmering gem-like smoke
- **Heatmap** — intensity color gradients

**Generative effects (background fills):**
- **Mesh Gradient** / **Static Mesh Gradient** — multi-point gradient mesh, animated or fixed
- **Static Radial Gradient** — fixed center-out radial
- **Grain Gradient** — grain + gradient transition
- **Warp** — warping distortion field
- **God Rays** — radiant light beams
- **Smoke Ring** — circular smoke
- **Dithering** / **Dot Orbit** / **Dot Grid** — pattern/dot fields
- **Spiral** / **Swirl** / **Waves** — rotational + undulating motion
- **Neuro Noise** / **Perlin Noise** / **Simplex Noise** / **Voronoi** — procedural noise/cells
- **Pulsing Border** — animated border intensity
- **Metaballs** — merging organic blobs
- **Color Panels** — dynamic colored panels

## Conservatory fit — recommended shortlist

Most of the 29 are wrong register (Metaballs, Dot Orbit, Neuro Noise, Voronoi, Spiral read sci-fi/SaaS — the opposite of inhabited-biophilic). For golden-hour light / humus depth / atmosphere-not-wallpaper:

| Shader | Use | Motion |
|--------|-----|--------|
| **Static Mesh Gradient** / **Static Radial Gradient** | Cover color wash with shader depth, **zero animation** — no rAF loop, no GPU spin, no reduced-motion tax. Top pick for covers. | none |
| **Grain Gradient** | Grain + gradient = the literal "no flat color covers" answer. Can run static. | optional |
| **Paper Texture** / **Fluted Glass** | Compose *over* a Wallace render to add material/atmosphere without replacing it. Best lever for the "apply to my images" idea. | static/subtle |
| **God Rays** | One hero anchor — light through conservatory glass. On-theme almost literally. | animated, gate hard |
| **Warp** / **Gem Smoke** | Slow atmospheric drift behind a single hero. | animated, gate hard |

**Lead with the static / image-filter shaders** over the generated imagery — depth and material with no perf or a11y cost. Reserve **one** animated shader (God Rays) for a single hero, behind `prefers-reduced-motion`, lazy-mounted.

## How it complements (not duplicates) the M4 motion pass

- M4/T4b motion = layout choreography via `motion/react` (reveals, hover, page transitions, parallax). Doctrine-driven, ease-out-expo.
- Shaders = *material* motion inside a surface (light drifting, grain breathing) — a different layer. Used static, they're pure texture and don't touch the motion budget at all.
- Keep them orthogonal: a shader supplies the atmosphere; `motion/react` supplies the choreography. One ambitious moment per surface still holds — a shader hero counts as that surface's moment.

## Architecture placement

- New `src/components/effects/` component (UI layer) — same home as `RevealOnScroll`/`GlowEffect` named in T4b.
- Reads color from `design-system/` tokens; no new layer, no service.
- Self-contained visual component → exempt from the <200-line rule per the mission constraint check.

## Spike steps (T4d)

1. Re-verify version/API at install time (pre-1.0). `npm i @paper-design/shaders-react`.
2. Mount **Grain Gradient (static)** or **Static Mesh Gradient** as one case-study cover background bound to `--color-accent-primary` / `--color-secondary-primary` / `--color-bg-*`.
3. Settle the OKLCH-vs-hex question above for real; document the resolution back into this file.
4. Try one **image-filter** shader (Paper Texture / Fluted Glass) composited over an actual Wallace render to test the "shaders over my images" thesis.
5. Screenshot both modes (night / golden-hour). Verify atmosphere reads as material, not as an effect demo (`feedback_respect_slop_bans`).
6. If animated: add `prefers-reduced-motion` fallback + lazy mount; confirm Lighthouse still 95+ on the surface.

## Sources

- npm: `@paper-design/shaders-react@0.0.76` (peer `react ^18 || ^19`)
- Catalog: https://shaders.paper.design/
- Repo: https://github.com/paper-design/shaders
