import { labStats } from "@core/lab/territories";

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
  const counter =
    guideCount === 1
      ? `1 guide across ${territoryCount} territories`
      : `${guideCount} guides across ${territoryCount} territories`;

  return (
    <header className="pt-16 md:pt-24">
      <p className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted">
        labs.justinh.design
      </p>
      <h1 className="mt-6 font-lab-heading text-4xl font-semibold tracking-tight text-lab-text-primary md:text-6xl md:leading-tight">
        Perihelion Archive
      </h1>
      {MANIFESTO_PARAGRAPHS.map((paragraph, index) => (
        <p
          key={index}
          className={
            index === 0
              ? "mt-8 max-w-3xl font-lab-body text-lg leading-relaxed text-lab-text-secondary md:text-xl"
              : "mt-4 max-w-3xl font-lab-body text-lg leading-relaxed text-lab-text-secondary md:text-xl"
          }
        >
          {paragraph}
        </p>
      ))}
      <p className="mt-4 max-w-3xl font-lab-body text-base leading-relaxed text-lab-text-muted md:text-lg">
        The library grows as I read. New guides land roughly monthly. Five more
        are in the pipeline; check back or follow along.
      </p>
      <p className="mt-10 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {counter}
      </p>
      <p className="mt-2 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {labStats.peerReviewedPapersCited} peer-reviewed papers cited ·{" "}
        {labStats.dirdBriefsWalked} DIRD briefs walked
      </p>
      <p className="mt-2 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        Last updated {import.meta.env.VITE_BUILD_DATE}
      </p>
    </header>
  );
}
