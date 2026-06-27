import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { scrollSpring } from "./motionConfig";

/**
 * Subtle scroll-linked parallax for a case-study cover plate. As the element
 * passes through the viewport its contents drift vertically a few pixels,
 * decoupling the cover from the type column beside it for an editorial sense of
 * depth. Deliberately small (±`distance`px) — atmosphere, not scroll-jacking.
 * Honors prefers-reduced-motion by rendering its children still.
 */
export function CoverParallax({
  children,
  distance = 18,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  // Spring-smooth the scroll value so the drift has weight and lag instead of
  // tracking the scrollbar rigidly — reads organic, not mechanical.
  const y = useSpring(yRaw, scrollSpring);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
