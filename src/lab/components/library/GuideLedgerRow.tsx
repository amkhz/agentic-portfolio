/**
 * GuideLedgerRow — shelf layout A, "the Accession Ledger" (ADR-016 "The Reading
 * Room", T3). Each guide is a full-width ruled row, scannable top-to-bottom like
 * a printed catalog of holdings: a thin lit accent edge-rule on the left (the
 * spine seen edge-on), then a horizontal title with a one-line dek, with author/
 * year and status at the right. No card chrome — hairline rules (owned by the
 * list in TerritoryGrid) do the separating. Titles read left-to-right.
 *
 * The accent edge-rule uses the placeholder `--spine-material` seam; Wallace
 * textures (T5) drop in there later. Per-guide accent publication and the shared
 * status pill live in guideShelfCommon — see the accent-contract note there.
 */
import { Link } from "react-router";
import type { Guide } from "@core/lab/guide-types";
import { STATUS_LABEL, useGuideAccentStyle } from "./guideShelfCommon";
import { StatusPill } from "./StatusPill";

interface GuideLedgerRowProps {
  guide: Guide;
}

export function GuideLedgerRow({ guide }: GuideLedgerRowProps) {
  const { title, kicker, source, status, description } = guide.frontmatter;
  const accentStyle = useGuideAccentStyle(guide);

  return (
    <Link
      to={`/g/${guide.slug}`}
      style={accentStyle}
      aria-label={`${title} — ${STATUS_LABEL[status]}`}
      className={[
        "lab-guide-spine group relative flex items-stretch gap-4 rounded-[2px] py-4 pr-3 pl-3",
        "transition-colors duration-[var(--duration-normal)]",
        "hover:bg-[color-mix(in_oklab,var(--guide-accent)_6%,transparent)]",
      ].join(" ")}
    >
      {/* Accent edge-rule — the lit material spine seen edge-on. Widens on hover
          like a book easing forward. Carries the --spine-material seam for T5. */}
      <span
        aria-hidden
        className={[
          "w-[4px] shrink-0 self-stretch rounded-full",
          "[background:var(--spine-material,var(--guide-accent))]",
          "shadow-[0_0_10px_color-mix(in_oklab,var(--guide-accent)_45%,transparent)]",
          "transition-[width,box-shadow] duration-[var(--duration-normal)]",
          "group-hover:w-[7px] group-hover:shadow-[0_0_18px_color-mix(in_oklab,var(--guide-accent)_80%,transparent)]",
        ].join(" ")}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
        <div className="min-w-0 flex-1">
          <span className="block font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted">
            {kicker}
          </span>
          <h3 className="mt-1 font-lab-heading text-lg font-semibold leading-snug tracking-tight text-lab-text-primary transition-colors duration-[var(--duration-normal)] group-hover:text-guide-accent md:text-xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 line-clamp-1 font-lab-body text-sm italic leading-relaxed text-lab-text-secondary">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-4 sm:flex-col-reverse sm:items-end sm:gap-2">
          <StatusPill status={status} />
          <span className="truncate font-lab-mono text-xs tracking-wide text-lab-text-muted">
            {source.authors} · {source.year}
          </span>
        </div>
      </div>
    </Link>
  );
}
