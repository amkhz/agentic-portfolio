import { imageManifest } from "./manifest.generated";

/**
 * Pure helpers for assembling responsive <picture> sources from a source image
 * path. No DOM, no side effects — the UI layer (ResponsiveImage) renders what
 * this returns. Variant files are emitted by scripts/generate-image-variants.ts
 * following the `${stem}-${width}.${format}` naming convention.
 */

export interface ResponsiveSources {
  /** AVIF srcset, e.g. "/images/x-640.avif 640w, /images/x-1280.avif 1280w". */
  avif: string;
  /** WebP srcset, same widths. */
  webp: string;
  /** Original source path — the <img> fallback for browsers without AVIF/WebP. */
  fallback: string;
  /** Intrinsic width of the source, for the <img> width attribute (anti-CLS). */
  width: number;
  /** Intrinsic height of the source, for the <img> height attribute. */
  height: number;
}

const RASTER_EXT = /\.(png|jpe?g)$/i;

/**
 * Build AVIF/WebP srcsets for a `/images/...` path, or `null` when the path has
 * no generated variants (placeholders, SVGs, lab figures, or images that have
 * not been processed). A `null` return tells callers to render a plain <img>,
 * so rendering degrades gracefully when variants are absent (e.g. before the
 * generate step has run in a fresh checkout).
 */
export function buildResponsiveSources(src: string): ResponsiveSources | null {
  const entry = imageManifest[src];
  if (!entry) return null;

  const base = src.replace(RASTER_EXT, "");
  const srcset = (format: "avif" | "webp") =>
    entry.widths.map((w) => `${base}-${w}.${format} ${w}w`).join(", ");

  return {
    avif: srcset("avif"),
    webp: srcset("webp"),
    fallback: src,
    width: entry.width,
    height: entry.height,
  };
}
