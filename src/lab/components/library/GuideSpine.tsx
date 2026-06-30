/**
 * GuideSpine renders one guide as an editorial book spine: standing on a
 * shelf at md+ (vertical title running up the spine, thickness growing with
 * title length) and lying flat in a stacked pile on mobile. It replaces the
 * old GuideCard grid tile (ADR-016 "The Reading Room", T3).
 *
 * Like the old card, it carries an inline style that publishes the per-guide
 * accent custom properties from frontmatter: `--guide-accent-dark` (from
 * `accent`) and, when curated, `--guide-accent-light` (from `accentLight`;
 * omitted otherwise so the light scope's brass fallback in lab-tokens.css
 * applies). The theme scopes resolve `--guide-accent` from the pair. This is
 * the documented ADR-009 inline-style exception: raw values from content flow
 * through as CSS custom properties because they originate in data, not UI
 * code. Do not extend this pattern to other lab UI components.
 *
 * The material surface is a placeholder (accent-tinted layered gradient).
 * Wallace spine/cover materials (T5) drop in here later, replacing the
 * `--spine-material` background once the layout is validated live.
 */
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { Link } from "react-router";
import type { Guide, GuideStatus } from "@core/lab/guide-types";

interface GuideSpineProps {
  guide: Guide;
}

const STATUS_LABEL: Record<GuideStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  draft: "Draft",
};

export function GuideSpine({ guide }: GuideSpineProps) {
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
      aria-label={`${title} — ${STATUS_LABEL[status]}`}
      className={[
        // Shared: material placeholder + chrome
        "group relative isolate block overflow-hidden border border-lab-border-subtle",
        "[background:linear-gradient(155deg,color-mix(in_oklab,var(--guide-accent)_12%,var(--lab-bg-surface))_0%,var(--lab-bg-surface)_55%)]",
        "shadow-[inset_0_1px_0_color-mix(in_oklab,var(--lab-text-primary)_8%,transparent)]",
        "transition duration-[var(--duration-normal)] hover:border-guide-accent",
        // Mobile: a flat bar in a pile
        "flex w-full flex-row items-stretch gap-4 rounded-[3px] pr-4",
        // Desktop: a standing spine on the shelf
        "md:h-[21rem] md:w-auto md:min-w-[3.25rem] md:max-w-[10rem] md:flex-col md:gap-0 md:rounded-[2px] md:pr-0",
        "motion-safe:transition-transform motion-safe:hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Spine edge / head band — the accent "foil" of the binding.
          A left edge on the mobile bar, a top cap on the standing spine. */}
      <span
        aria-hidden
        className={[
          "shrink-0 bg-guide-accent",
          "w-[3px] self-stretch",
          "md:h-1.5 md:w-full md:self-auto",
          "shadow-[0_0_10px_color-mix(in_oklab,var(--guide-accent)_55%,transparent)]",
          "transition-[box-shadow] duration-[var(--duration-normal)]",
          "group-hover:shadow-[0_0_18px_color-mix(in_oklab,var(--guide-accent)_85%,transparent)]",
        ].join(" ")}
      />

      {/* Body. Mobile reads left-to-right; desktop runs the title up the
          spine via vertical writing-mode (rotate-180 so it reads upward). */}
      <div className="flex min-w-0 flex-1 flex-col py-3 md:items-center md:py-5">
        <span className="font-lab-mono text-[0.6rem] uppercase tracking-wider text-lab-text-muted md:hidden">
          {kicker}
        </span>

        <h3
          className={[
            "font-lab-heading font-semibold tracking-tight text-lab-text-primary",
            "transition-colors duration-[var(--duration-normal)] group-hover:text-guide-accent",
            "mt-1 text-lg leading-snug md:mt-0",
            // Standing spine: title runs up, wrapping into columns for long
            // titles so the spine reads thicker — like a real shelf.
            "md:max-h-full md:[writing-mode:vertical-rl] md:rotate-180 md:text-xl md:leading-tight",
          ].join(" ")}
        >
          {title}
        </h3>

        {/* Tail: status + year. Author rides along on the mobile bar where
            there's room; the standing spine shows just the year at its foot. */}
        <div className="mt-auto flex items-center gap-3 pt-3 md:flex-col-reverse md:gap-2 md:pt-4">
          <StatusPill status={status} />
          <span className="truncate font-lab-mono text-xs tracking-wide text-lab-text-muted md:[writing-mode:vertical-rl] md:rotate-180">
            <span className="md:hidden">{source.authors} · </span>
            {source.year}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: GuideStatus }) {
  const tone =
    status === "complete"
      ? "border-guide-accent/60 bg-guide-accent/10 text-guide-accent"
      : status === "in-progress"
        ? "border-lab-border-strong bg-lab-bg-raised text-lab-text-secondary"
        : "border-lab-border-subtle bg-transparent text-lab-text-muted";
  return (
    <span
      className={`shrink-0 rounded-sm border px-2 py-0.5 font-lab-mono text-[0.6rem] uppercase tracking-wider md:px-1.5 ${tone}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
