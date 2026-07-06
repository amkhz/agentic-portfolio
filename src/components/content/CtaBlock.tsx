import { DossierFrame } from "@/components/fieldnotebook";
import { parseInline } from "@/lib/parseInline";
import { SITE_TAB } from "@/lib/tabOrder";

/**
 * CtaBlock — an external call-to-action that links out of the portfolio
 * (the Perihelion lab). Rendered as a clickable dossier plate: a mono kicker,
 * a descriptive line, and a brass action row with the destination host.
 *
 * Brass owns the interaction (hover + focus + the action mark); green is not
 * used here. Opens in a new tab with rel="noopener noreferrer".
 */
export function CtaBlock({
  kicker,
  href,
  action,
  body,
}: {
  kicker?: string;
  href: string;
  action: string;
  body: string;
}) {
  let host = href;
  try {
    host = new URL(href).host;
  } catch {
    host = href;
  }

  return (
    <a
      tabIndex={SITE_TAB}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${action} — opens ${host} in a new tab`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <DossierFrame
        kicker={kicker}
        className="bg-bg-base transition-colors duration-normal group-hover:[border-color:var(--fieldnote-rule-strong)] group-focus-visible:[border-color:var(--fieldnote-rule-strong)]"
      >
        <p className="max-w-[60ch] font-body text-lg leading-normal text-text-secondary">
          {parseInline(body)}
        </p>
        <span className="mt-5 inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-wider text-accent-primary">
          <span className="font-medium transition-colors duration-normal group-hover:text-text-primary group-focus-visible:text-text-primary">
            {action}
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-normal group-hover:translate-x-1"
          >
            &rarr;
          </span>
          <span className="text-text-muted">{host}</span>
        </span>
      </DossierFrame>
    </a>
  );
}
