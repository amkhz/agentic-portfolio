import { type ReactNode } from "react";
import { useLocation } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { easeOutExpo, duration } from "./motionConfig";

/**
 * Site-wide page-entry choreography. Wraps the routed Outlet and runs a gentle
 * fade + rise each time the path changes (keyed on pathname so it re-mounts and
 * replays). Entry only — no exit/crossfade — which keeps it robust against
 * scroll restoration (ScrollToTop) and avoids layout flashes.
 *
 * Subtle by design (opacity + 8px rise): below-fold sections still get their
 * own RevealOnScroll, so the page transition must not compound into a heavy
 * double animation. Honors prefers-reduced-motion by rendering final state.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slow, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
