// Placeholder card for guides that aren't published yet. Same
// shape as GuideCard but visually muted: dashed border, no accent
// dot, quiet status pills. Non-interactive — these are hints at
// what's coming, not links, so clicks are a no-op and the card is
// announced as disabled to assistive tech.
import type { UpcomingGuide, UpcomingStatus } from "@core/lab/upcoming";

interface UpcomingCardProps {
  upcoming: UpcomingGuide;
}

const STATUS_LABEL: Record<UpcomingStatus, string> = {
  drafting: "Drafting",
  planned: "Planned",
  researching: "Researching",
};

export function UpcomingCard({ upcoming }: UpcomingCardProps) {
  const { title, source, status, note } = upcoming;

  return (
    <div
      aria-disabled="true"
      tabIndex={-1}
      className="flex h-full flex-col gap-3 rounded-lg border border-dashed border-lab-border-subtle bg-transparent p-5"
    >
      <h3 className="font-lab-heading text-lg font-semibold leading-snug tracking-tight text-lab-text-secondary md:text-xl">
        {title}
      </h3>

      <p className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
        {source}
      </p>

      {note ? (
        <p className="font-lab-body text-sm italic leading-relaxed text-lab-text-muted">
          {note}
        </p>
      ) : null}

      <div className="mt-auto flex items-center justify-end pt-2">
        <UpcomingStatusPill status={status} />
      </div>
    </div>
  );
}

function UpcomingStatusPill({ status }: { status: UpcomingStatus }) {
  const className =
    status === "drafting"
      ? "shrink-0 rounded-sm border border-dashed border-lab-upcoming-drafting/60 bg-lab-upcoming-drafting/5 px-2 py-0.5 font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-upcoming-drafting"
      : status === "researching"
        ? "shrink-0 rounded-sm border border-dashed border-lab-upcoming-researching/60 bg-lab-upcoming-researching/5 px-2 py-0.5 font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-upcoming-researching"
        : "shrink-0 rounded-sm border border-dashed border-lab-border-strong bg-transparent px-2 py-0.5 font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-text-muted";

  return <span className={className}>{STATUS_LABEL[status]}</span>;
}
