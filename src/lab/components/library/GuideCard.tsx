/**
 * GuideCard carries an inline style that publishes the per-guide accent
 * custom properties from frontmatter: `--guide-accent-dark` (from
 * `accent`) and, when the guide curates one, `--guide-accent-light`
 * (from `accentLight`; omitted otherwise so the light scope's brass
 * fallback in lab-tokens.css applies). The theme scopes resolve
 * `--guide-accent` from the pair. This mirrors the GuideRenderer
 * exception: raw values from content can flow through as CSS custom
 * properties because they originate in data, not in UI code. See
 * ADR-009. Do not extend this pattern to other lab UI components —
 * per-guide accent propagates via the cascade.
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
  const accentStyle = useMemo<CSSProperties>(() => {
    const style: Record<string, string> = {
      "--guide-accent-dark": guide.frontmatter.accent,
    };
    if (guide.frontmatter.accentLight !== undefined) {
      style["--guide-accent-light"] = guide.frontmatter.accentLight;
    }
    return style as CSSProperties;
  }, [guide.frontmatter.accent, guide.frontmatter.accentLight]);

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      className="group flex h-full flex-col gap-4 rounded-lg border border-lab-border-subtle bg-lab-bg-surface p-5 transition duration-[var(--duration-normal)] hover:border-guide-accent hover:bg-lab-bg-raised motion-safe:hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full bg-guide-accent shadow-[0_0_10px_color-mix(in_oklab,var(--guide-accent)_60%,transparent)] transition-[box-shadow] duration-[var(--duration-normal)] group-hover:shadow-[0_0_18px_color-mix(in_oklab,var(--guide-accent)_85%,transparent)]"
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
