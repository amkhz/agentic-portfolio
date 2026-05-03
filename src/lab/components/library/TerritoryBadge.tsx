// Per-territory number badge for the library index. The active
// territory (order 1) pulses three times when its badge first enters
// the viewport, then settles at the lowest opacity so the ring still
// reads as "live" without competing for attention. Reduced-motion
// users see the static badge with no ring at all.
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

interface TerritoryBadgeProps {
  id: string;
  isActive: boolean;
}

const PULSE_KEYFRAMES = {
  opacity: [0.2, 0.32, 0.2, 0.32, 0.2, 0.32, 0.2],
  scale: [1, 1.1, 1, 1.1, 1, 1.1, 1],
};

const PULSE_DURATION_S = 15;

export function TerritoryBadge({ id, isActive }: TerritoryBadgeProps) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [pulseDone, setPulseDone] = useState(false);

  const shouldPulse = isActive && !shouldReduce && inView && !pulseDone;
  const showSettled = isActive && !shouldReduce && pulseDone;

  return (
    <div
      ref={ref}
      className="relative inline-flex h-11 w-11 items-center justify-center"
    >
      {shouldPulse ? (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-guide-accent"
          initial={{ opacity: 0.2, scale: 1 }}
          animate={PULSE_KEYFRAMES}
          transition={{ duration: PULSE_DURATION_S, ease: "easeInOut" }}
          onAnimationComplete={() => setPulseDone(true)}
        />
      ) : showSettled ? (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-guide-accent opacity-20"
        />
      ) : null}
      <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full border border-guide-accent bg-lab-bg-surface font-lab-mono text-xs tracking-wide text-guide-accent">
        {id}
      </span>
    </div>
  );
}
