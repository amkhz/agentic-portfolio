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

Separate possible win (not done): AVIF `effort: 5` → a lower effort would cut the *cold*-build cost further at a small size penalty; the cache makes that moot for warm builds, so it was left alone to preserve byte-for-byte output.

## JavaScript bundle — perf without touching images

6. **Code-split the heavy chunks.** The build warns of >500 kB chunks (labs ≈ 683 kB, a route chunk ≈ 346 kB). Use `React.lazy` + `Suspense` for the labs app and the heaviest pages. The portfolio and the lab are separate entries — verify the lab bundle never loads on a portfolio route.
7. **Trim the initial chunk.** Lazy-load the effect-heavy components (`Particles`, `Threads`, `ProfileCard` tilt, `ogl`) so they don't block first paint, and import only the icons actually used from `lucide-react` / `@phosphor-icons/react` rather than whole sets.
8. **Confirm analytics stay non-blocking** (Vercel Analytics + Speed Insights are already deferred).

## Sequencing

Do **#1–#3 first** (format + size) — that alone likely clears 90+ on the image-heavy surfaces. Then **#6–#7** (code splitting) for the JS-bound surfaces. Re-run `npx lighthouse <url> --only-categories=performance` per surface to confirm 95+.
