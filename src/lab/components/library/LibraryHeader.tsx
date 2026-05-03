import { motion, useReducedMotion } from "motion/react";
import { labStats } from "@core/lab/territories";
import { PerihelionSigil } from "./PerihelionSigil";

interface LibraryHeaderProps {
  guideCount: number;
  territoryCount: number;
}

const MANIFESTO_PARAGRAPHS = [
  "The future is already here. It's just not very evenly distributed. It's being built and shaped in peer-reviewed papers, NSF-funded labs, and private money think tanks. The kind of work that often happens in the dark, on the cutting edge of what's possible.",
  "This library is where I'm learning about it: deep-dive guides on the science behind vacuum engineering, UAP detection, and consciousness as technology. Science fiction becoming engineered reality.",
  "Written for designers who haven't found a reason to look here yet, but might. Pull up a chair.",
];

export function LibraryHeader({
  guideCount,
  territoryCount,
}: LibraryHeaderProps) {
  const shouldReduce = useReducedMotion();
  const counter =
    guideCount === 1
      ? `1 guide across ${territoryCount} territories`
      : `${guideCount} guides across ${territoryCount} territories`;

  const manifestoMotion = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <header className="pt-16 md:pt-24">
      <h1 className="font-lab-heading text-4xl font-semibold tracking-tight text-lab-text-primary md:text-6xl md:leading-tight">
        Perihelion Archive
      </h1>
      <motion.div className="mt-8 max-w-3xl" {...manifestoMotion}>
        {MANIFESTO_PARAGRAPHS.map((paragraph, index) => {
          const className =
            index === 0
              ? "font-lab-body text-lg leading-relaxed text-lab-text-secondary md:text-xl"
              : "mt-4 font-lab-body text-lg leading-relaxed text-lab-text-secondary md:text-xl";
          if (index === 0) {
            return (
              <p key={index} className={className}>
                <PerihelionSigil className="float-left mr-3 -ml-1" />
                {paragraph}
              </p>
            );
          }
          return (
            <p key={index} className={className}>
              {paragraph}
            </p>
          );
        })}
      </motion.div>
      <p className="mt-10 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {counter}
      </p>
      <p className="mt-2 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {labStats.peerReviewedPapersCited} peer-reviewed papers cited
      </p>
      <p className="mt-2 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        Last updated {import.meta.env.VITE_BUILD_DATE}
      </p>
      <ColophonNote />
    </header>
  );
}

// TODO Writer — this colophon note exists to introduce DIRD (Defense
// Intelligence Reference Document) once on the homepage in a quiet,
// scholarly register, replacing the dropped "DIRD briefs walked"
// metric. Refine summary label and gloss copy in a Writer session.
function ColophonNote() {
  return (
    <details className="group mt-6 max-w-xl [&_summary::-webkit-details-marker]:hidden">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-lab-mono text-[0.7rem] uppercase tracking-[0.18em] text-lab-text-muted transition-colors duration-[var(--duration-normal)] hover:text-guide-accent">
        <span
          aria-hidden
          className="inline-block w-2 text-center text-[0.85rem] leading-none transition-transform duration-[var(--duration-normal)] group-open:rotate-45"
        >
          +
        </span>
        On the source corpus
      </summary>
      <p className="mt-3 font-lab-body text-sm leading-relaxed text-lab-text-secondary">
        Many guides walk a <span className="font-lab-mono">DIRD</span> — a
        Defense Intelligence Reference Document, declassified from the AAWSAP
        intelligence collection. Other sources include peer-reviewed journal
        articles, NASA technical reports, and proceedings from contemporary
        frontier-science gatherings.
      </p>
    </details>
  );
}
