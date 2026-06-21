import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";

/**
 * TocLinkList — the Field Notebook table-of-contents grammar (ADR-013 /
 * DESIGN.md). Each row is a registration line: optional leading index or
 * swatch, a label, a hairline leader rule that fills the span, and trailing
 * metadata. Replaces the 3-column card-grid reflex on the work index and
 * carries the case-study link list.
 *
 * Brass owns interaction: on hover/focus the label warms to the accent and the
 * leader rule strengthens. Green never enters here (atmosphere/material only).
 */

export interface TocItem {
  id: string;
  /** Primary label — usually the case-study title. */
  label: ReactNode;
  /** Internal route. Renders the row as a Link. */
  to?: string;
  /** External href. Renders the row as an anchor. */
  href?: string;
  /** Leading mono index, e.g. "01". */
  index?: string;
  /** Leading swatch color (a token var, e.g. var(--theme-secondary-primary)). */
  swatchColor?: string;
  /** Small mono sub-label under the primary label. */
  kicker?: string;
  /** Trailing metadata — year, metric, or marker. */
  trailing?: ReactNode;
}

interface TocLinkListProps {
  items: TocItem[];
  /** Accessible name for the list. */
  ariaLabel?: string;
  className?: string;
}

const leaderStyle: CSSProperties = {
  borderBottomWidth: "var(--fieldnote-mark-stroke)",
  borderBottomStyle: "solid",
  borderColor: "var(--fieldnote-rule-color)",
};

const swatchStyle = (color: string): CSSProperties => ({
  backgroundColor: color,
  width: "0.625rem",
  height: "0.625rem",
});

function RowBody({ item }: { item: TocItem }) {
  return (
    <span
      className="flex w-full items-baseline"
      style={{ columnGap: "var(--fieldnote-leader-gap)" }}
    >
      {item.index && (
        <span className="shrink-0 font-mono text-xs tabular-nums text-text-muted transition-colors duration-normal group-hover:text-accent-primary group-focus-visible:text-accent-primary">
          {item.index}
        </span>
      )}
      {item.swatchColor && (
        <span
          aria-hidden="true"
          className="shrink-0 translate-y-[-0.1em]"
          style={swatchStyle(item.swatchColor)}
        />
      )}

      <span className="flex min-w-0 flex-col">
        <span className="font-heading text-xl font-medium leading-snug tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary group-focus-visible:text-accent-primary sm:text-2xl">
          {item.label}
        </span>
        {item.kicker && (
          <span className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
            {item.kicker}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className="mb-[0.35em] min-w-6 flex-1 self-end transition-colors duration-normal group-hover:[border-color:var(--fieldnote-rule-strong)] group-focus-visible:[border-color:var(--fieldnote-rule-strong)]"
        style={leaderStyle}
      />

      {item.trailing && (
        <span className="shrink-0 self-end font-mono text-xs tabular-nums text-text-muted">
          {item.trailing}
        </span>
      )}
    </span>
  );
}

export function TocLinkList({ items, ariaLabel, className }: TocLinkListProps) {
  const rowClass =
    "group flex items-baseline rounded-sm py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep";

  return (
    <ul aria-label={ariaLabel} className={`flex flex-col ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item.id} className="border-t border-border-subtle first:border-t-0">
          {item.to ? (
            <Link to={item.to} className={rowClass}>
              <RowBody item={item} />
            </Link>
          ) : item.href ? (
            <a
              href={item.href}
              className={rowClass}
              {...(item.href.startsWith("#")
                ? {}
                : { target: "_blank", rel: "noreferrer" })}
            >
              <RowBody item={item} />
            </a>
          ) : (
            <div className="flex items-baseline py-4">
              <RowBody item={item} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
