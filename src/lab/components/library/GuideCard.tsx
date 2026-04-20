/**
 * GuideCard carries an inline style that sets the `--guide-accent`
 * CSS custom property from `guide.frontmatter.accent`. This mirrors
 * the GuideRenderer exception: raw values from content can flow
 * through as CSS custom properties because they originate in data,
 * not in UI code. See ADR-009. Do not extend this pattern to other
 * lab UI components — per-guide accent propagates via the cascade.
 */
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { Link } from "react-router";
import type { Guide, GuideStatus } from "@core/lab/guide-types";

interface GuideCardProps {
  guide: Guide;
}

const STATUS_LABEL: Record<GuideStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  draft: "Draft",
};

export function GuideCard({ guide }: GuideCardProps) {
  const { title, kicker, source, status } = guide.frontmatter;
  const accentStyle = useMemo<CSSProperties>(
    () => ({ ["--guide-accent" as string]: guide.frontmatter.accent }),
    [guide.frontmatter.accent],
  );

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      className="group flex h-full flex-col gap-4 rounded-lg border border-lab-border-subtle bg-lab-bg-surface p-5 transition-colors duration-[var(--duration-normal)] hover:border-guide-accent hover:bg-lab-bg-raised"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full bg-guide-accent shadow-[0_0_10px_color-mix(in_oklab,var(--guide-accent)_60%,transparent)]"
        />
        <span className="font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-text-muted">
          {kicker}
        </span>
      </div>

      <h3 className="font-lab-heading text-lg font-semibold leading-snug tracking-tight text-lab-text-primary group-hover:text-guide-accent md:text-xl">
        {title}
      </h3>

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        <span className="truncate font-lab-mono text-xs tracking-wide text-lab-text-muted">
          {source.authors} · {source.year}
        </span>
        <StatusPill status={status} />
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: GuideStatus }) {
  const className =
    status === "complete"
      ? "shrink-0 rounded-sm border border-guide-accent/60 bg-guide-accent/10 px-2 py-0.5 font-lab-mono text-[0.65rem] uppercase tracking-wider text-guide-accent"
      : status === "in-progress"
        ? "shrink-0 rounded-sm border border-lab-border-strong bg-lab-bg-raised px-2 py-0.5 font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-text-secondary"
        : "shrink-0 rounded-sm border border-lab-border-subtle bg-transparent px-2 py-0.5 font-lab-mono text-[0.65rem] uppercase tracking-wider text-lab-text-muted";
  return <span className={className}>{STATUS_LABEL[status]}</span>;
}
