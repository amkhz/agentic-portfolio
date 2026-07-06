import { Link } from "react-router";
import { caseStudies } from "@core/content/case-studies";
import type { CaseStudy } from "@core/content/case-studies";
import { DossierFrame } from "@/components/fieldnotebook";
import { SITE_TAB } from "@/lib/tabOrder";

/**
 * RelatedStudyBanner — the cross-link between a paired origin/evolution study.
 * Renders at the end of a case study body as a clickable dossier plate: a mono
 * relationship kicker, a directional mark, and the paired study's title +
 * subtitle. Brass owns the interaction (hover + focus); green stays out of it.
 */
export function RelatedStudyBanner({
  related,
}: {
  related: NonNullable<CaseStudy["relatedStudy"]>;
}) {
  const target = caseStudies.find((s) => s.slug === related.slug);
  if (!target) return null;

  const arrow = related.direction === "back" ? "←" : "→";

  return (
    <Link
      tabIndex={SITE_TAB}
      to={`/work/${target.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <DossierFrame
        kicker={related.kicker}
        className="bg-bg-base transition-colors duration-normal group-hover:[border-color:var(--fieldnote-rule-strong)] group-focus-visible:[border-color:var(--fieldnote-rule-strong)]"
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-1 font-display text-2xl leading-none text-accent-primary"
          >
            {arrow}
          </span>
          <div>
            <h2 className="max-w-[24ch] font-display text-xl leading-tight tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary group-focus-visible:text-accent-primary sm:text-2xl">
              {target.title}
            </h2>
            <p className="mt-2 max-w-[60ch] font-body text-base leading-normal text-text-secondary">
              {target.subtitle}
            </p>
          </div>
        </div>
      </DossierFrame>
    </Link>
  );
}
