import { buildResponsiveSources } from "@core/images/responsive";

interface ResponsiveImageProps {
  /** Source path under /images. AVIF/WebP variants are resolved from it. */
  src: string;
  alt: string;
  className?: string;
  /** Native loading hint. Heroes pass "eager"; everything else "lazy". */
  loading?: "lazy" | "eager";
  /** LCP hero passes "high". */
  fetchPriority?: "high" | "low" | "auto";
  /**
   * Layout-aware `sizes` so the browser picks the smallest variant that still
   * covers the rendered box. Defaults to full-bleed (100vw).
   */
  sizes?: string;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

/**
 * Renders a raster image as a <picture> with AVIF + WebP responsive sources and
 * the original PNG/JPEG as the fallback <img>. The variants and the manifest
 * that drives this come from scripts/generate-image-variants.ts.
 *
 * When the source has no generated variants (placeholders, SVGs, a fresh
 * checkout before `npm run generate:images`), it falls back to a plain <img> so
 * nothing ever breaks. Intrinsic width/height are set from the manifest to
 * reserve layout and avoid CLS.
 */
export function ResponsiveImage({
  src,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "100vw",
  style,
  onError,
}: ResponsiveImageProps) {
  const sources = buildResponsiveSources(src);

  if (!sources) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
        style={style}
        onError={onError}
      />
    );
  }

  return (
    <picture>
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <img
        src={sources.fallback}
        alt={alt}
        width={sources.width}
        height={sources.height}
        loading={loading}
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={className}
        style={style}
        onError={onError}
      />
    </picture>
  );
}
