import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/interactive/Tag";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { caseStudies, metaCaseStudy } from "@core/tokens";
import type { CaseStudy } from "@core/tokens";

function hasRealImage(study: CaseStudy): boolean {
  return (
    typeof study.heroImage.src === "string" &&
    study.heroImage.src.length > 0 &&
    !study.heroImage.src.includes("placeholder-")
  );
}

function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function HeroImage({ study, className }: { study: CaseStudy; className?: string }) {
  if (hasRealImage(study)) {
    return (
      <img
        src={study.heroImage.src}
        alt={study.heroImage.alt}
        loading="lazy"
        className={`h-full w-full object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-bg-elevated ${className ?? ""}`}
      role="img"
      aria-label={study.heroImage.alt}
    >
      <div className="flex flex-col items-center gap-2 px-6">
        <span className="text-text-muted">
          <ImageIcon />
        </span>
        <span className="text-center font-body text-sm leading-normal text-text-muted">
          {study.heroImage.placeholder}
        </span>
      </div>
    </div>
  );
}

export function WorkPage() {
  return (
    <>
      <Helmet>
        <title>Work | Justin Hernandez</title>
        <meta name="description" content="Case studies in AI-powered enterprise product design." />
        <link rel="canonical" href="/work" />
      </Helmet>

      <section className="py-24 sm:py-32">
        <Container>
          <h1 className="font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl">
            Work
          </h1>
          <p className="mt-4 max-w-[65ch] font-body text-lg leading-normal text-text-secondary">
            A selection of case studies spanning AI strategy, enterprise UX, and
            design systems.
          </p>

          <div className="mt-10 h-px w-16 bg-accent-primary" />

          {/* Featured: Meta case study */}
          <RevealOnScroll className="mt-12">
            <SpotlightCard className="p-0 bg-bg-base border-border-subtle hover:border-accent-primary hover:shadow-glow-brass transition-all duration-normal">
              <Link
                to={`/work/${metaCaseStudy.slug}`}
                aria-label={`View case study: ${metaCaseStudy.title}`}
                className="group block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
              >
                <div className="relative aspect-[21/9] overflow-hidden border-b border-border-subtle bg-bg-elevated">
                  <HeroImage study={metaCaseStudy} className="transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary sm:text-3xl">
                      {metaCaseStudy.title}
                    </h2>
                    {metaCaseStudy.heroMetric && (
                      <span className="font-heading text-lg tracking-wide text-accent-primary sm:text-xl">
                        {metaCaseStudy.heroMetric.value}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-[65ch] font-body text-base leading-normal text-text-secondary sm:text-lg">
                    {metaCaseStudy.subtitle}
                  </p>

                  {metaCaseStudy.heroMetric && (
                    <p className="mt-2 font-heading text-sm tracking-wide text-text-muted">
                      {metaCaseStudy.heroMetric.value} {metaCaseStudy.heroMetric.label}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {metaCaseStudy.tags.map((tag) => (
                      <Tag
                        key={tag}
                        className="bg-bg-subtle transition-colors duration-normal group-hover:border-border-strong"
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Link>
            </SpotlightCard>
          </RevealOnScroll>

          {/* Case study grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {caseStudies.map((study, i) => (
              <RevealOnScroll key={study.slug} delay={i * 100}>
                <SpotlightCard className="h-full p-0 bg-bg-base border-border-subtle hover:border-accent-primary hover:shadow-glow-brass transition-all duration-normal">
                  <Link
                    to={`/work/${study.slug}`}
                    aria-label={`View case study: ${study.title}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                  >
                    <div className="relative aspect-video overflow-hidden border-b border-border-subtle bg-bg-elevated">
                      <HeroImage study={study} className="transition-transform duration-500 group-hover:scale-[1.02]" />
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary">
                        {study.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 font-body text-base leading-normal text-text-secondary">
                        {study.subtitle}
                      </p>

                      {study.heroMetric && (
                        <p className="mt-2 font-heading text-sm tracking-wide text-text-muted">
                          {study.heroMetric.value} {study.heroMetric.label}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {study.tags.map((tag) => (
                          <Tag
                            key={tag}
                            className="bg-bg-subtle transition-colors duration-normal group-hover:border-border-strong"
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
