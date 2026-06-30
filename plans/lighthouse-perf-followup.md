# Lighthouse performance follow-up (post-launch)

**Context:** at launch (PR #130), Lighthouse **accessibility is 96–100 per surface** (passes the ship gate), but **performance is 71–83**. The drag is the eager full-resolution hero PNGs plus initial JS bundle size. **None of the fixes below reduce visual image quality** — that's the explicit constraint.

Baseline captured 2026-06-27 (production build, headless): Home 71 · Work 71 · Case study 76 · Notes 71 · About 80 · Resume 83.

## Image delivery — the biggest win, zero quality loss

1. **Modern formats via `<picture>` / `srcset`.** Serve **AVIF + WebP with PNG fallback**. At high quality these are 50–80% smaller than PNG for photographic Wallace renders with no perceptible loss. Automate at build with **vite-imagetools** (or a sharp step) so the source stays PNG and the pipeline emits the variants.
2. **Responsive widths (`srcset` + `sizes`).** Generate width variants (e.g. 640 / 1024 / 1600 / 2400) and let the browser choose. Today each hero ships one full-res file to every viewport — mobile downloads a desktop-sized image for no visible benefit.
3. **Recompress the source PNGs** (oxipng / pngquant near-lossless) as a stopgap before format conversion — strips metadata and recompresses with no visible change.
4. **Explicit dimensions / `aspect-ratio`** on images to reserve space and kill CLS (a perf-score component). Covers already use `aspect-[4/3]`; confirm the full-bleed heroes hold a stable box.
5. **LCP discipline.** Keep the one LCP hero `eager` + `fetchpriority="high"` (already done) and consider a `<link rel="preload">` for just that image; everything below the fold stays `loading="lazy"` (thumbnails already are).

## Build cache — keep CI builds fast (shipped)

The responsive pipeline above (`scripts/generate-image-variants.ts`) emits ~548 AVIF/WebP variants from 58 sources, and those derived files are gitignored. That meant every fresh Vercel checkout started with zero variants and the old mtime staleness check re-encoded all 548 from scratch (~107s of the 274 AVIF encodes at `effort: 5` being the bulk).

Fix: a **content-hash build cache** at `node_modules/.cache/image-variants/` — Vercel persists `node_modules` (including `.cache`) between builds, and local dev keeps it too. The script SHA-256s each source's bytes and stores `{ hash, dims, variants[] }` plus the encoded files. On each run, unchanged sources have their variants **restored** from the cache into `public/images/` instead of re-encoded; only new or byte-changed sources re-encode (writing to both `public/images/` and the cache). The committed `core/images/manifest.generated.ts` is regenerated identically for unchanged sources, so the runtime is unaffected. No `vercel.json` change is needed — the cache is automatic.

Measured (M-series local): cold run 548 encoded ≈ 107s → warm run 0 encoded, 548 restored ≈ 0.4s; a single changed source re-encodes only its 8 variants ≈ 2s. The cache directory is ~41 MB and stays out of the repo.

**Ladder + effort trim (shipped, PR #136).** Real Vercel numbers showed the cold encode taking ~19 min on a 2-core box. Two changes halved it with no quality loss and no repo bloat: (a) cap the width ladder at **2560** (drop the auto-appended full-width step — the 3840px Wallace renders and 3030px comparison shots only render inside a content column, where 2560 already exceeds any retina display's need; full-bleed heroes are 1920px sources, untouched), and (b) AVIF `effort: 5 → 4` (effort is encoder search depth, not visual quality at `quality: 82`). The encode settings are now folded into the cache key, so changing the ladder/effort **auto-invalidates** the cache instead of restoring stale variants. Measured: cold 107s → 51s local, 548 → 484 variants; warm restore confirmed in production (`0 encoded, 484 restored`, ~1ms).

## JavaScript bundle — perf without touching images

6. **Code-split the heavy chunks.** The build warns of >500 kB chunks (labs ≈ 683 kB, a route chunk ≈ 346 kB). Use `React.lazy` + `Suspense` for the labs app and the heaviest pages. The portfolio and the lab are separate entries — verify the lab bundle never loads on a portfolio route.
7. **Trim the initial chunk.** Lazy-load the effect-heavy components (`Particles`, `Threads`, `ProfileCard` tilt, `ogl`) so they don't block first paint, and import only the icons actually used from `lucide-react` / `@phosphor-icons/react` rather than whole sets.
8. **Confirm analytics stay non-blocking** (Vercel Analytics + Speed Insights are already deferred).

## Sequencing

Do **#1–#3 first** (format + size) — that alone likely clears 90+ on the image-heavy surfaces. Then **#6–#7** (code splitting) for the JS-bound surfaces. Re-run `npx lighthouse <url> --only-categories=performance` per surface to confirm 95+.

---

# Mobile Real Experience Score (RES) investigation — NEXT

The image/CLS work landed (CLS 0, deploy time solved). The remaining gap is **field** mobile performance, surfaced by Vercel Speed Insights. This is its own thread — start here next session.

**Field data (Vercel Speed Insights → Mobile → Production, captured 2026-06-30, ~21 samples at P75 — small and volatile):**

| Metric | Value | Status | Good |
|---|---|---|---|
| **RES** | **58** | Needs improvement | ≥90 |
| FCP | 2.83s | Needs improvement | <1.8s |
| LCP | 3.4s | Needs improvement | <2.5s |
| **INP** | **928ms** | **Poor** (only red) | <200ms |
| CLS | 0 | Great | <0.1 |
| FID | 47ms | Great | <100ms |
| TTFB | 1.09s | Needs improvement | <0.8s |

**Caveat:** ~21 points at P75 means a couple of slow real devices/networks dominate. Directional, not precise — let data accumulate while iterating.

**Already banked — do not re-litigate:** CLS 0 (responsive-image dimensions + aspect-ratio), FID 47ms, responsive AVIF/WebP delivery (#132), build cache + ladder trim (#135/#136).

## Diagnosis — two distinct problems

1. **INP 928ms — the score-killer (only red).** Main-thread JS blocking. The SPA ships ~246KB react-vendor + 136KB main + 134KB motion (gz ~78/46/45), and main-thread effects (`RevealOnScroll` IntersectionObservers, `CountUp`, `DecryptedText`, `ParallaxImage`, the drawer spring + body-scroll-lock + focus-trap). On a mid mobile CPU, an interaction that triggers a lazy route chunk *and* a motion animation can exceed 900ms. **Highest leverage.**
2. **Loading trio — FCP 2.83 / LCP 3.4 / TTFB 1.09.** Render-blocking fonts + CSS, LCP element likely not prioritized, slowish server response.

## Step 0 — get lab data first (don't guess)

```
npx lighthouse https://justinh.design/ --only-categories=performance \
  --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate \
  --output=json --output=html --output-path=./lighthouse-mobile
```
Capture: the **LCP element**, **Total Blocking Time** (lab proxy for INP), render-blocking resources, unused JS/CSS, and the Opportunities list. Repeat per key surface (Home, a case study, Work). Re-check Vercel Routes/Paths as samples grow (route shows "Unknown" — SPA attribution).

## Triaged fixes (cheap → deep; verify each against Lighthouse, not vibes)

**A. Loading — cheap, do first**
- **Confirm the LCP element.** Plan item #5 claims the hero is `eager` + `fetchpriority="high"`, yet LCP is 3.4s — verify that's actually the LCP element and that the mobile `srcset` serves the 640/960 variant (not a larger one). Add `<link rel="preload" as="image" imagesrcset=…>` for just the LCP hero.
- **Font strategy (likely the biggest FCP/LCP win).** `@fontsource` Fraunces / Source Sans 3 / JetBrains likely render-block, and the Fraunces display face gates the hero heading. Preload only the critical subset (latin, above-the-fold weights), set `font-display: swap`, and stop shipping unused subsets — the build currently emits cyrillic / greek / vietnamese / math woffs (see the dist asset list). 
- Trim render-blocking CSS (~77KB main). Confirm the **labs CSS isn't leaking onto portfolio routes**.
- TTFB 1.09s: confirm `index.html` + hashed assets serve from Vercel **edge cache** (immutable `Cache-Control`). Small-sample cold hits may inflate this — re-check with more data before chasing it.

**B. INP — the real work**
- **Split/defer `motion`.** 134KB of animation lib near the critical path. Lazy-load motion-driven components below the fold; consider `LazyMotion` + `domAnimation` from `motion/react` for a smaller feature bundle.
- **Audit mount/scroll work.** `RevealOnScroll` attaches an IntersectionObserver per wrapped block (many per long page); `CountUp`/`DecryptedText` run rAF loops; `ParallaxImage` listens to scroll. Profile what fires on interaction; batch/limit; honor `prefers-reduced-motion` and consider `navigator.connection.saveData` / low-end heuristics to drop nonessential motion.
- **Drawer interaction cost.** Opening the mobile drawer does a motion spring + body-scroll-lock (reflow) + focus-trap query — profile its INP contribution (the scroll-lock reflow is the usual suspect).
- Ensure first nav interaction doesn't synchronously parse a large lazy chunk on the main thread; prefetch route chunks on idle.

## Targets
RES ≥90 · INP <200ms · LCP <2.5s · FCP <1.8s · TTFB <0.8s · keep CLS <0.1 (currently 0).

## How to measure
Re-run the Lighthouse command after each change (lab **TBT** is the fast INP proxy between deploys); watch Vercel RES as samples accumulate (days, not minutes).

## Out of scope
The `labs` subdomain bundle (~526KB) is a separate entry that never loads on portfolio routes — not part of portfolio RES. Track separately only if labs RES ever matters.
