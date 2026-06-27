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

## Spike results (2026-06-27)

Ran T4d on branch `feat/conservatory-tokens`. Installed, inspected the package internals, built one static prototype, ran the gates. Nothing wired into a shipped surface; nothing committed.

### Install + peer status

- Installed `@paper-design/shaders-react@0.0.76` (pulls `@paper-design/shaders@0.0.76`). Version matches the 2026-06-25 capture — no drift.
- Peer dep resolves clean on this stack: `react: ^18 || ^19` + optional `@types/react`. We are on React 19.2.4, deduped. Two packages added, effectively zero extra runtime deps.
- `npm audit` reports vulnerabilities in the wider tree, but `npm ls` shows the shader packages add nothing transitive of their own — the audit noise is pre-existing, not introduced here.

### The OKLCH verdict (load-bearing question — settled)

**The `colors` prop does NOT accept `oklch()` strings.** Confirmed by reading the parser in `node_modules/@paper-design/shaders/dist/get-shader-color-from-string.js`: `getShaderColorFromString` branches on `#hex`, `rgb(`, `hsl(` only. Anything else hits `console.error("Unsupported color format")` and returns the black fallback `[0,0,0,1]`. Feeding our tokens raw would silently paint everything black.

**There IS an OKLCH path on the GPU — but it is unwired in 0.0.76.** `dist/shader-color-spaces.js` defines `ShaderColorSpaces = { rgb: 0, oklch: 1 }` plus full GLSL oklab/oklch transforms (`srgbToOklab`, `mixOklabVector`, hue-aware `mixHue`). However: (a) no shader module imports that file (`grep` for `declareOklchTransforms` / `srgbToOklab` matches only the file itself), (b) neither `StaticMeshGradientParams` nor `GrainGradientParams` exposes a `colorSpace` prop, and (c) the mesh fragment shader blends stops with plain `mix()` in its own working (sRGB-ish) space. So perceptually-uniform OKLCH interpolation between stops is **not available via any prop today**. It looks like scaffolding for a future release — worth re-checking post-1.0.

**Chosen approach (no hardcoded color):** read the live token values off `:root` with `getComputedStyle`, then resolve each `oklch()` token to an sRGB hex using the browser's own color engine via a throwaway `<canvas>` 2D context (`ctx.fillStyle = oklchString; ctx.fillStyle` returns `#rrggbb`/`rgba()`). Feed the resolved endpoints to `colors`. **Endpoints are exact token values; only the blend between stops is non-OKLCH** — acceptable for atmospheric texture where stops are close in the humus/green/brass family. Re-resolve on theme flip for dual mode. This keeps the component honest to `feedback_oklch_only`: zero literal colors in source, single source of truth stays `tokens.css`.

> **Brief correction:** the open-question section above guessed token names `--color-accent-*` / `--color-secondary-*` / `--color-bg-*`. The real tokens are `--theme-accent-primary`, `--theme-secondary-primary`, and `--theme-bg-deep/base/elevated/subtle` (see `design-system/tokens.css`). The prototype uses the real names.

### Static = genuinely free

`shader-mount.js` documents and implements: `speed = 0` stops `requestAnimationFrame` entirely ("static shaders have no recurring performance costs"), and it pauses when the tab is hidden. So a static shader carries **no motion budget and nothing for `prefers-reduced-motion` to gate** — the only a11y/perf concern is the one-time WebGL paint. We still ship a token-driven CSS gradient underneath as the no-WebGL / pre-resolve floor, so the surface is never a flat panel and degrades gracefully.

### Shader shortlist — confirmed/adjusted

- **Static Mesh Gradient** — confirmed top pick for covers. Static by default, exposes `mixing`, `waveX/Y`, `grainMixer`, `grainOverlay` — enough to read as material, not a panel. This is what the prototype uses.
- **Grain Gradient** — confirmed strong #2. Has a dedicated `colorBack` + `colors` + `noise`/`softness`; the literal "no flat color covers" answer. Can run static (`speed={0}`).
- **Paper Texture / Fluted Glass** — still the right lever for "shaders over my Wallace renders" (image-filter register). NOT prototyped this pass (the cover-background thesis was the priority); prototype before relying on it.
- **God Rays** (animated, one hero only) — unchanged: reserve, gate behind reduced-motion + lazy mount if ever used.
- Drop the sci-fi/SaaS register shaders as before (Metaballs, Neuro Noise, Voronoi, Spiral, Dot Orbit).

### Recommendation: **GO (conditional)**

Conditional GO. The OKLCH-only bar is satisfiable (resolve tokens → hex at runtime; no literals in source), and the static path is free of motion/a11y cost — both doctrine blockers clear. The remaining risk is purely visual: whether the mesh reads as inhabited atmosphere or as a generic gradient "effect demo" (`feedback_respect_slop_bans`). That is Justin's eyeball call on the dev server before any ship. If it reads as material → wire it into one case-study cover behind the Wallace render. If it reads as effect → keep the CSS-gradient + grain-overlay path already in the repo and shelve the dependency.

### Exact integration steps if GO

1. Keep `@paper-design/shaders-react` in `dependencies` (already added by the spike).
2. Use `src/components/effects/ShaderCover.tsx` (the prototype) as the base. It is self-contained, token-driven, dual-mode aware, static.
3. Mount it as the background layer of one case-study cover, compositing the Wallace render as its `children` (or behind it via z-order) — start with a single cover, not the index.
4. Tune `mixing` / `waveX/Y` / `grainOverlay` / `opacity` against that specific cover's Wallace plate so the shader is atmosphere, not the subject.
5. Consider lazy-mounting via `React.lazy` so the WebGL bundle only loads on case-study routes, not the home/index paint.
6. Re-run `scripts/wcag-check.py` is not needed for the shader itself (decorative, `aria-hidden`), but ensure any text composited over it still meets AA against the darkest shader region in both modes.

### What Justin must eyeball himself (no browser driver here)

On the running dev server (port 5173), drop `<ShaderCover>` onto a scratch route or temporarily into one cover, then check:

1. **Night mode:** does it read as inhabited humus + golden light atmosphere, or as a generic "mesh gradient" effect demo? (slop-ban gut check)
2. **Day mode (`data-theme="light"`):** flip the theme toggle — confirm it re-tints to sun-bleached sand/amber and does NOT stay dark. (validates the runtime re-resolution)
3. **Flat-panel test:** at cover scale, is there real depth/light variation, or does it flatten into a near-solid wash? Tune `mixing`/`waveX/Y` if flat.
4. **Token fidelity:** colors should be recognizably brass + sage + humus, not muddy or off-hue — confirms the canvas oklch→hex resolution landed the right values.
5. **Composited over a Wallace render:** does the shader add atmosphere or fight the image? (the actual cover use case)
6. **Reduced-motion / no-WebGL:** nothing to gate for motion (static), but confirm the CSS-gradient fallback alone still looks intentional if WebGL is unavailable.
7. **Screenshots:** capture night + day for the spike record — that visual sign-off is the GO/NO-GO gate.

### Cleanup note

If NO-GO: `npm uninstall @paper-design/shaders-react` and delete `src/components/effects/ShaderCover.tsx`. Spike left both in the working tree, uncommitted, for Justin to evaluate.

## Sources

- npm: `@paper-design/shaders-react@0.0.76` (peer `react ^18 || ^19`)
- Catalog: https://shaders.paper.design/
- Repo: https://github.com/paper-design/shaders
