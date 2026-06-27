/**
 * Generate responsive AVIF + WebP variants for the portfolio's raster images.
 *
 * Usage: npx tsx scripts/generate-image-variants.ts   (or: npm run generate:images)
 *
 * For every PNG/JPEG in public/images (the full-resolution Wallace renders and
 * photos), this emits width-stepped AVIF and WebP siblings at high quality plus
 * a typed manifest the build imports to assemble <picture> srcsets:
 *
 *   public/images/conservatory-hero.png   (source, untouched — the fallback)
 *   public/images/conservatory-hero-640.avif
 *   public/images/conservatory-hero-640.webp
 *   public/images/conservatory-hero-1280.avif   ... etc
 *   core/images/manifest.generated.ts            (intrinsic dims + emitted widths)
 *
 * Design constraints (see plans/lighthouse-perf-followup.md):
 *   - NO perceptible quality loss. Quality is tuned high; the original is kept
 *     as the fallback and we never upscale past a source's intrinsic width.
 *   - Idempotent: a variant is only re-encoded when older than its source, so
 *     repeat runs (and the build prebuild step) stay cheap.
 *
 * Requires: sharp (dev dependency).
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync, writeFileSync } from 'fs';
import { join, extname, basename } from 'path';

const ROOT = join(import.meta.dirname ?? '.', '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');
const MANIFEST_PATH = join(ROOT, 'core', 'images', 'manifest.generated.ts');

// Responsive width ladder. A source only emits the steps at or below its own
// intrinsic width, and always its full width as the top step so large/retina
// displays still receive every native pixel — no upscaling, no softening.
const WIDTH_LADDER = [640, 960, 1280, 1920, 2560];

// Quality is deliberately generous: the whole point is "smaller file, same
// picture." AVIF at 82 / WebP at 88 is visually lossless for these renders
// while still landing 50–80% under the source PNG.
const AVIF_OPTIONS: sharp.AvifOptions = { quality: 82, effort: 5 };
const WEBP_OPTIONS: sharp.WebpOptions = { quality: 88, effort: 5 };

const SOURCE_EXT = /\.(png|jpe?g)$/i;
const DERIVED = /-\d+\.(avif|webp)$/i; // a variant we previously emitted

interface ManifestEntry {
  width: number;
  height: number;
  widths: number[];
}

/** Widths to emit for a source of the given intrinsic width (never upscaled). */
function widthsFor(intrinsicWidth: number): number[] {
  const steps = WIDTH_LADDER.filter((w) => w < intrinsicWidth);
  if (!steps.includes(intrinsicWidth)) steps.push(intrinsicWidth);
  return steps.sort((a, b) => a - b);
}

/** True when `out` is missing or older than its source — i.e. needs encoding. */
function isStale(out: string, sourceMtimeMs: number): boolean {
  if (!existsSync(out)) return true;
  return statSync(out).mtimeMs < sourceMtimeMs;
}

async function run() {
  const files = readdirSync(IMAGES_DIR)
    .filter((f) => SOURCE_EXT.test(f) && !DERIVED.test(f))
    .sort();

  const manifest: Record<string, ManifestEntry> = {};
  let encoded = 0;
  let skipped = 0;

  for (const file of files) {
    const sourcePath = join(IMAGES_DIR, file);
    const sourceMtime = statSync(sourcePath).mtimeMs;
    const stem = basename(file, extname(file));

    const meta = await sharp(sourcePath).metadata();
    const intrinsicWidth = meta.width ?? 0;
    const intrinsicHeight = meta.height ?? 0;
    if (!intrinsicWidth || !intrinsicHeight) {
      console.warn(`! skipping ${file} — could not read dimensions`);
      continue;
    }

    const widths = widthsFor(intrinsicWidth);
    manifest[`/images/${file}`] = {
      width: intrinsicWidth,
      height: intrinsicHeight,
      widths,
    };

    for (const w of widths) {
      const avifOut = join(IMAGES_DIR, `${stem}-${w}.avif`);
      const webpOut = join(IMAGES_DIR, `${stem}-${w}.webp`);

      // A single decoded+resized pipeline reused for both encoders.
      const resize = () => sharp(sourcePath).resize({ width: w, withoutEnlargement: true });

      if (isStale(avifOut, sourceMtime)) {
        await resize().avif(AVIF_OPTIONS).toFile(avifOut);
        encoded++;
      } else skipped++;

      if (isStale(webpOut, sourceMtime)) {
        await resize().webp(WEBP_OPTIONS).toFile(webpOut);
        encoded++;
      } else skipped++;
    }
  }

  writeManifest(manifest);
  console.log(
    `Image variants: ${files.length} sources, ${encoded} encoded, ${skipped} up-to-date.`,
  );
  console.log(`Manifest: core/images/manifest.generated.ts (${Object.keys(manifest).length} entries)`);
}

function writeManifest(manifest: Record<string, ManifestEntry>) {
  const entries = Object.keys(manifest)
    .sort()
    .map((key) => {
      const e = manifest[key];
      return `  ${JSON.stringify(key)}: { width: ${e.width}, height: ${e.height}, widths: [${e.widths.join(', ')}] },`;
    })
    .join('\n');

  const body = `/**
 * GENERATED — do not edit by hand.
 * Source: scripts/generate-image-variants.ts (npm run generate:images)
 *
 * Maps each public/images source path to its intrinsic dimensions and the set
 * of responsive widths emitted as AVIF + WebP siblings. Consumed by the pure
 * srcset builder in core/images/responsive.ts.
 */

export interface ImageVariantEntry {
  /** Intrinsic width of the source image, in px. */
  width: number;
  /** Intrinsic height of the source image, in px. */
  height: number;
  /** Emitted variant widths, ascending. Each has an .avif and .webp sibling. */
  widths: number[];
}

export const imageManifest: Record<string, ImageVariantEntry> = {
${entries}
};
`;

  writeFileSync(MANIFEST_PATH, body, 'utf8');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
