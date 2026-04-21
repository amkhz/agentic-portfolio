import { motion, useReducedMotion } from "motion/react";
import { termCardId } from "./termCardId";

interface GuideDefinitionCardProps {
  term: string;
  definition: string;
  onClose: () => void;
}

// Crossfades with a tiny translate instead of animating height.
// Animating height forces layout on every frame and compounds when
// multiple cards open at once; opacity + transform stays on the
// compositor. The small Y shift preserves the "this appeared under
// the paragraph" read.
export function GuideDefinitionCard({
  term,
  definition,
  onClose,
}: GuideDefinitionCardProps) {
  const shouldReduce = useReducedMotion();
  const transition = shouldReduce
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

  return (
    <motion.aside
      id={termCardId(term)}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={transition}
      aria-label={`Definition of ${term}`}
      className="mt-3"
    >
      <div className="rounded-md border border-lab-border-subtle bg-lab-bg-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-lab-mono text-xs uppercase tracking-wider text-guide-accent">
              {term}
            </p>
            <p className="mt-2 font-lab-body text-sm leading-relaxed text-lab-text-secondary md:text-base">
              {definition}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close definition of ${term}`}
            className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm font-lab-mono text-lg leading-none text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-lab-text-primary"
          >
            ×
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
