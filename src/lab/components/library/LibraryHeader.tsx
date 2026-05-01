import { labStats } from "@core/lab/territories";
import { CommunityStrip } from "./CommunityStrip";

interface LibraryHeaderProps {
  guideCount: number;
  territoryCount: number;
}

const MANIFESTO =
  "The future isn't coming. It's already here, being built in peer-reviewed papers and NSF-funded labs. The kind of work that makes you put the paper down and stare at the ceiling. This library is how I'm learning it: deep-dive guides on the science behind vacuum engineering, UAP detection, and consciousness as technology. Written for designers who maybe haven't considered this kind of work yet. The open-minded ones who can see the opportunity and the challenges it brings. A reader's notebook, prep not product. Pull up a chair.";

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
      <p className="mt-8 max-w-3xl font-lab-body text-lg leading-relaxed text-lab-text-secondary md:text-xl">
        {MANIFESTO}
      </p>
      <p className="mt-4 max-w-3xl font-lab-body text-base leading-relaxed text-lab-text-muted md:text-lg">
        The library grows as I read. New guides land roughly monthly. Five more
        are in the pipeline; check back or follow along.
      </p>
      <CommunityStrip />
      <p className="mt-10 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {counter}
      </p>
      <p className="mt-2 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {guideCount} {guideCount === 1 ? "guide" : "guides"} ·{" "}
        {labStats.peerReviewedPapersCited} peer-reviewed papers cited ·{" "}
        {labStats.dirdBriefsWalked} DIRD briefs walked
      </p>
      <p className="mt-2 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        Last updated {import.meta.env.VITE_BUILD_DATE}
      </p>
    </header>
  );
}
