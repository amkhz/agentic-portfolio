import { motion, useReducedMotion } from "motion/react";

interface GuideDefinitionCardProps {
  term: string;
  definition: string;
  onClose: () => void;
}

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
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={transition}
      aria-label={`Definition of ${term}`}
      className="mt-3 overflow-hidden"
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
            className="shrink-0 rounded-sm p-1 font-lab-mono text-base leading-none text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-lab-text-primary"
          >
            ×
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
