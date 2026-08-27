import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@core/utils";
import { buildResponsiveSources } from "@core/images/responsive";
import { scrollSpring } from "./motionConfig";

/**
 * Scroll-linked parallax for an image that fills a `relative overflow-hidden`
 * slot (e.g. an ImageBlock cover). The image is overscanned taller than the
 * slot so it can drift ±`distance`px vertically without ever exposing an edge,
 * and the slot clips the overscan — so the surrounding frame never moves and no
 * gap appears. Spring-smoothed for weight. Honors prefers-reduced-motion.
 */
export function ParallaxImage({
  src,
  alt,
  distance = 16,
  className,
  fit = "cover",
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  distance?: number;
  className?: string;
  /** 'contain' opts out of the effect entirely -- see below. */
  fit?: "cover" | "contain";
  /** Layout-aware srcset hint. Callers know their slot; this default is
   *  only a fallback for one that does not say. */
  sizes?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  // AVIF/WebP responsive sources. `sizes` comes from the caller: this
  // component used to hardcode 60vw, which described no slot it was ever
  // mounted in -- on a case study it declared 768px of slot for a cover that
  // renders 382px wide, so every case study fetched a 1920 variant for it.
  const sources = buildResponsiveSources(src);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), scrollSpring);

  // A contained asset does not fill its slot, so there is nothing to overscan
  // and nothing to clip: drifting it would slide a screenshot against visible
  // plate ground. Contained covers are specimens, not atmosphere -- they hold
  // still.
  if (reduced || fit === "contain") {
    return (
      <picture>
        {sources && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
        {sources && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "absolute inset-0 h-full w-full object-center",
            fit === "contain" ? "object-contain" : "object-cover",
            className
          )}
        />
      </picture>
    );
  }

  return (
    <picture>
      {sources && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
      {sources && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        // Overscanned: taller than the slot, centered, so the ±distance drift
        // stays within bounds. The slot's overflow-hidden clips the excess.
        className={cn("absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover object-center", className)}
      />
    </picture>
  );
}
