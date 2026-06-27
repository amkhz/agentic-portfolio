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
}: {
  src: string;
  alt: string;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  // AVIF/WebP responsive sources (covers are full-bleed within their column).
  const sources = buildResponsiveSources(src);
  const sizes = "(min-width: 1024px) 60vw, 100vw";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), scrollSpring);

  if (reduced) {
    return (
      <picture>
        {sources && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
        {sources && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("absolute inset-0 h-full w-full object-cover object-center", className)}
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
