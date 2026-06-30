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
 *   - Incremental across builds. The derived variants are gitignored, so a fresh
 *     CI checkout (Vercel) starts with zero of them and the old mtime check
 *     re-encoded everything every build. Instead we keep a CONTENT-HASH cache in
 *     node_modules/.cache/image-variants/ (which Vercel persists between builds,
 *     and local dev keeps too). A source is only re-encoded when its bytes
 *     change; otherwise its variants are restored from the cache. See the cache
 *     notes in plans/lighthouse-perf-followup.md.
 *
 * Requires: sharp (dev dependency).
 */

import sharp from 'sharp';
import { createHash } from 'crypto';
import {
  readdirSync,
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  rmSync,
} from 'fs';
import { join, extname, basename } from 'path';

const ROOT = join(import.meta.dirname ?? '.', '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');
const MANIFEST_PATH = join(ROOT, 'core', 'images', 'manifest.generated.ts');

// Persistent build cache. Vercel preserves node_modules (including
// node_modules/.cache) between builds, so storing the encoded variants here
// lets unchanged sources skip re-encoding on every fresh checkout. Local dev
// keeps it too, so repeat runs stay cheap there as well.
const CACHE_DIR = join(ROOT, 'node_modules', '.cache', 'image-variants');
const CACHE_FILES_DIR = join(CACHE_DIR, 'files');
const CACHE_INDEX_PATH = join(CACHE_DIR, 'index.json');

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

/** One source's cache record: its content hash, dims, and emitted variant files. */
interface CacheEntry {
  hash: string;
  width: number;
  height: number;
  widths: number[];
  variants: string[];
}

type CacheIndex = Record<string, CacheEntry>;

/** Widths to emit for a source of the given intrinsic width (never upscaled). */
function widthsFor(intrinsicWidth: number): number[] {
  const steps = WIDTH_LADDER.filter((w) => w < intrinsicWidth);
  if (!steps.includes(intrinsicWidth)) steps.push(intrinsicWidth);
  return steps.sort((a, b) => a - b);
}

/** SHA-256 of a source image's raw bytes — the cache key for staleness. */
function hashFile(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/** The variant filenames a source emits (avif + webp per width step). */
function variantNames(stem: string, widths: number[]): string[] {
  const names: string[] = [];
  for (const w of widths) {
    names.push(`${stem}-${w}.avif`, `${stem}-${w}.webp`);
  }
  return names;
}

function loadCacheIndex(): CacheIndex {
  if (!existsSync(CACHE_INDEX_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_INDEX_PATH, 'utf8')) as CacheIndex;
  } catch {
    // A corrupt or partial index just means a cold rebuild — safe to ignore.
    return {};
  }
}

/**
 * Restore a cached source's variants into public/images. Returns false (forcing
 * a re-encode) if any cached variant file is missing on disk — a partial cache.
 */
function restoreFromCache(entry: CacheEntry): boolean {
  for (const name of entry.variants) {
    if (!existsSync(join(CACHE_FILES_DIR, name))) return false;
  }
  for (const name of entry.variants) {
    const dest = join(IMAGES_DIR, name);
    // Copy only when missing: on Vercel public/ is empty (variants gitignored),
    // so this writes them; on local dev they already persist, so this is a noop.
    if (!existsSync(dest)) copyFileSync(join(CACHE_FILES_DIR, name), dest);
  }
  return true;
}

async function run() {
  mkdirSync(CACHE_FILES_DIR, { recursive: true });
  const cache = loadCacheIndex();

  const files = readdirSync(IMAGES_DIR)
    .filter((f) => SOURCE_EXT.test(f) && !DERIVED.test(f))
    .sort();

  const manifest: Record<string, ManifestEntry> = {};
  const nextCache: CacheIndex = {};
  let encoded = 0;
  let restored = 0;

  for (const file of files) {
    const sourcePath = join(IMAGES_DIR, file);
    const stem = basename(file, extname(file));
    const hash = hashFile(sourcePath);

    const cached = cache[file];
    if (cached && cached.hash === hash && restoreFromCache(cached)) {
      // Unchanged source — serve its variants and dims straight from the cache.
      manifest[`/images/${file}`] = {
        width: cached.width,
        height: cached.height,
        widths: cached.widths,
      };
      nextCache[file] = cached;
      restored += cached.variants.length;
      continue;
    }

    // New or changed source — decode, re-encode every width step, and cache it.
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

    const variants = variantNames(stem, widths);
    // Drop any stale cache files left by a previous version of this source
    // (e.g. a dimension change that shifted the width ladder).
    if (cached) {
      for (const name of cached.variants) {
        if (!variants.includes(name)) rmSync(join(CACHE_FILES_DIR, name), { force: true });
      }
    }

    for (const w of widths) {
      const avifOut = join(IMAGES_DIR, `${stem}-${w}.avif`);
      const webpOut = join(IMAGES_DIR, `${stem}-${w}.webp`);

      // A single decoded+resized pipeline reused for both encoders.
      const resize = () => sharp(sourcePath).resize({ width: w, withoutEnlargement: true });

      await resize().avif(AVIF_OPTIONS).toFile(avifOut);
      copyFileSync(avifOut, join(CACHE_FILES_DIR, `${stem}-${w}.avif`));
      encoded++;

      await resize().webp(WEBP_OPTIONS).toFile(webpOut);
      copyFileSync(webpOut, join(CACHE_FILES_DIR, `${stem}-${w}.webp`));
      encoded++;
    }

    nextCache[file] = {
      hash,
      width: intrinsicWidth,
      height: intrinsicHeight,
      widths,
      variants,
    };
  }

  // Prune cache files for sources that no longer exist, then persist the index.
  for (const [file, entry] of Object.entries(cache)) {
    if (!nextCache[file]) {
      for (const name of entry.variants) rmSync(join(CACHE_FILES_DIR, name), { force: true });
    }
  }
  writeFileSync(CACHE_INDEX_PATH, `${JSON.stringify(nextCache, null, 2)}\n`, 'utf8');

  writeManifest(manifest);
  console.log(
    `Image variants: ${files.length} sources, ${encoded} encoded, ${restored} restored from cache.`,
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
