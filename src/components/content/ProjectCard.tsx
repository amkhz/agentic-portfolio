import { Link } from "react-router";
import type { CaseStudy } from "@core/content/case-studies";
import { Container } from "@/components/layout/Container";
import { DossierFrame, DossierTags } from "@/components/fieldnotebook";
import { ResponsiveImage } from "@/components/content/ResponsiveImage";

/**
 * ProjectCard - repurposed as the Home "featured dossier" spread (ADR-013 /
 * DESIGN.md). De-carded: no rounded SpotlightCard, no pill tags. An asymmetric
 * editorial spread that echoes the case-study hero (T4) - a flush cover plate
 * inside a registration frame on one side, a mono-kicked type spread on the
 * other. This is the page's one ambitious composed moment.
 *
 * Brass owns every interaction (kicker, title warm-on-hover, link affordance,
 * focus ring, frame). Green stays out of the chrome entirely.
 */
interface ProjectCardProps {
  study: CaseStudy;
  /** Mono kicker above the title, e.g. "Featured case file". */
  kicker?: string;
}

export function ProjectCard({ study, kicker = "Featured case file" }: ProjectCardProps) {
  const hasRealImage =
    typeof study.heroImage.src === "string" &&
    study.heroImage.src.length > 0 &&
    !study.heroImage.src.includes("placeholder-");

  return (
    <Container as="section">
      <Link
        to={`/work/${study.slug}`}
        aria-label={`View case study: ${study.title}`}
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-8 focus-visible:ring-offset-bg-deep"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Cover plate - image lives within the padded registration frame */}
          <div className="lg:col-span-7">
            <DossierFrame
              className="bg-bg-base transition-[border-color] duration-normal group-hover:[border-color:var(--fieldnote-rule-strong)]"
            >
              {hasRealImage ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ResponsiveImage
                    src={study.heroImage.src}
                    alt={study.heroImage.alt}
                    loading="lazy"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="absolute inset-0 h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-slow motion-safe:group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label={study.heroImage.alt}
                  className="flex aspect-[16/10] items-center justify-center px-8 text-center"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {study.heroImage.placeholder}
                  </span>
                </div>
              )}
            </DossierFrame>
          </div>

          {/* Type spread */}
          <div className="relative flex flex-col justify-center lg:col-span-5">
            <p className="relative font-mono text-xs uppercase tracking-wider text-accent-primary">
              {kicker}
            </p>

            <h2 className="relative mt-4 max-w-[20ch] font-display text-3xl leading-tight tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary sm:text-4xl">
              {study.title}
            </h2>

            <p className="relative mt-4 max-w-[48ch] font-body text-lg leading-normal text-text-secondary">
              {study.subtitle}
            </p>

            {study.heroMetric && (
              <div className="relative mt-6 flex items-baseline gap-3">
                <span className="font-display text-3xl leading-tight tracking-tight text-accent-primary sm:text-4xl">
                  {study.heroMetric.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                  {study.heroMetric.label}
                </span>
              </div>
            )}

            <DossierTags tags={study.tags} className="relative mt-8" />

            <span className="relative mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent-primary">
              Read the case study
              <span
                aria-hidden="true"
                className="transition-transform duration-normal motion-safe:group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Link>
    </Container>
  );
}
