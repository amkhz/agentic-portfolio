import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { springSoft } from "@/components/effects/motionConfig";
import { labStats } from "@core/lab/territories";
import { PerihelionSigil } from "./PerihelionSigil";
import { SITE_TAB } from "@/lib/tabOrder";

interface LibraryHeaderProps {
  guideCount: number;
  territoryCount: number;
}

const MANIFESTO_PARAGRAPHS = [
  "The future is already here. It's just not very evenly distributed. (William Gibson said that first. It's only gotten truer.) It's being built and shaped in peer-reviewed papers, NSF-funded labs, and private money think tanks. The kind of work that often happens in the dark, on the cutting edge of what's possible.",
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
        transition: springSoft,
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
                <PerihelionSigil className="float-left mr-4 -ml-2" />
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
      {/* One masthead register line, not a stack of loose stat lines. */}
      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        <span>{counter}</span>
        <span aria-hidden className="text-lab-border-strong">
          ·
        </span>
        <span>
          {labStats.peerReviewedPapersCited} peer-reviewed papers cited
        </span>
        <span aria-hidden className="text-lab-border-strong">
          ·
        </span>
        <span>Updated {import.meta.env.VITE_BUILD_DATE}</span>
      </div>
      <ColophonNote />
    </header>
  );
}

function ColophonNote() {
  return (
    <details className="group mt-6 max-w-xl [&_summary::-webkit-details-marker]:hidden">
      <summary
        tabIndex={SITE_TAB}
        className="inline-flex cursor-pointer list-none items-center gap-2 rounded-sm py-1.5 font-lab-mono text-[0.7rem] uppercase tracking-[0.18em] text-lab-text-muted transition-colors duration-[var(--duration-normal)] hover:text-guide-accent"
      >
        <Plus
          aria-hidden="true"
          strokeWidth={2}
          className="h-3.5 w-3.5 text-guide-accent/80 transition-transform duration-[var(--duration-normal)] group-open:rotate-45"
        />
        Where this comes from
      </summary>
      <p className="mt-3 font-lab-body text-sm leading-relaxed text-lab-text-secondary">
        Many guides walk a <span className="font-lab-mono">DIRD</span>, a
        Defense Intelligence Reference Document declassified from the AAWSAP
        intelligence collection. The rest of the corpus is peer-reviewed journal
        articles, NASA technical reports, and proceedings from contemporary
        frontier-science gatherings.
      </p>
    </details>
  );
}
