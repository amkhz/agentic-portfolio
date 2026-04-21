// Per-territory number badge for the library index. The active
// territory (order 1) gets a subtle pulse ring driven by motion/react;
// reduced-motion disables it and leaves the badge static. The badge
// itself is ringed in var(--guide-accent), which the enclosing section
// sets from the territory token.
import { motion, useReducedMotion } from "motion/react";

interface TerritoryBadgeProps {
  id: string;
  isActive: boolean;
}

export function TerritoryBadge({ id, isActive }: TerritoryBadgeProps) {
  const shouldReduce = useReducedMotion();
  const animate = isActive && !shouldReduce;

  return (
    <div className="relative inline-flex h-11 w-11 items-center justify-center">
      {animate ? (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-guide-accent"
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.15, 1] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
      <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full border border-guide-accent bg-lab-bg-surface font-lab-mono text-xs tracking-wide text-guide-accent">
        {id}
      </span>
    </div>
  );
}
