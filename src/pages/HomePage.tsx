import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/content/Hero";
import { ProjectCard } from "@/components/content/ProjectCard";
import { AboutSnippet } from "@/components/content/AboutSnippet";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { Tag } from "@/components/interactive/Tag";
import { caseStudies, metaCaseStudy } from "@core/tokens";

export function HomePage() {
  const meta = metaCaseStudy;
  const hasMetaImage =
    typeof meta.heroImage.src === "string" &&
    meta.heroImage.src.length > 0 &&
    !meta.heroImage.src.includes("placeholder-");

  return (
    <>
      <Helmet>
        <title>Home | Justin Hernandez</title>
        <meta
          name="description"
          content="Portfolio of Justin Hernandez. Product design leader for complex, human-centered systems. Currently creating with AI."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <Hero />

      {/* Featured: Meta case study — full-width spotlight */}
      <section className="border-t border-border-subtle pt-24 pb-16 sm:pt-32 sm:pb-20">
        <Container>
          <RevealOnScroll>
            <Link
              to={`/work/${meta.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4 focus-visible:ring-offset-bg-deep rounded-lg"
              aria-label={`View case study: ${meta.title}`}
            >
              <SpotlightCard className="relative overflow-hidden p-0 bg-bg-base border-border-subtle hover:border-accent-primary hover:shadow-glow-brass transition-all duration-normal">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0">
                  {/* Content side */}
                  <div className="relative flex flex-col justify-center p-8 sm:p-10 md:p-12">
                    <GlowEffect
                      color="brass"
                      size="md"
                      className="-left-20 -top-20 opacity-60"
                    />

                    <span className="relative font-heading text-xs uppercase tracking-wider text-accent-primary">
                      Featured
                    </span>

                    <h2 className="relative mt-4 font-display text-2xl leading-snug tracking-tight text-text-primary sm:text-3xl">
                      {meta.title}
                    </h2>

                    <p className="relative mt-3 max-w-[50ch] font-body text-base leading-normal text-text-secondary sm:text-lg">
                      {meta.subtitle}
                    </p>

                    {meta.heroMetric && (
                      <div className="relative mt-6 flex items-baseline gap-3">
                        <span className="font-display text-3xl leading-tight tracking-tight text-accent-primary sm:text-4xl">
                          {meta.heroMetric.value}
                        </span>
                        <span className="font-heading text-sm font-medium uppercase tracking-wide text-text-secondary">
                          {meta.heroMetric.label}
                        </span>
                      </div>
                    )}

                    <div className="relative mt-6 flex flex-wrap gap-2">
                      {meta.tags.map((tag) => (
                        <Tag
                          key={tag}
                          className="transition-colors duration-normal group-hover:border-border-strong"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>

                    <span className="relative mt-8 inline-flex items-center gap-1.5 font-heading text-sm font-medium text-accent-primary transition-colors duration-normal group-hover:text-accent-hover">
                      Read the case study
                      <span aria-hidden="true" className="transition-transform duration-normal group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </div>

                  {/* Image side */}
                  <div className="relative overflow-hidden border-t border-border-subtle md:border-l md:border-t-0">
                    {hasMetaImage ? (
                      <img
                        src={meta.heroImage.src}
                        alt={meta.heroImage.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                        style={{ minHeight: "280px" }}
                      />
                    ) : (
                      <div
                        className="flex min-h-[280px] items-center justify-center bg-bg-elevated p-8"
                        role="img"
                        aria-label={meta.heroImage.alt}
                      >
                        <span className="text-center font-body text-sm text-text-muted">
                          {meta.heroImage.placeholder}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Selected Work — 3-column grid */}
      <section id="work" className="py-16 sm:py-20">
        <Container>
          <RevealOnScroll>
            <div className="flex items-baseline justify-between">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-text-primary">
                Selected Work
              </h2>
              <Link
                to="/work"
                className="font-heading text-sm font-medium text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
              >
                View all &rarr;
              </Link>
            </div>
          </RevealOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <RevealOnScroll key={study.slug} delay={index * 100}>
                <ProjectCard study={study} />
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Atmospheric break — accent line + breathing room */}
      <div className="py-8" aria-hidden="true">
        <Container>
          <div className="mx-auto h-px w-24 bg-accent-primary opacity-40" />
        </Container>
      </div>

      <RevealOnScroll>
        <AboutSnippet />
      </RevealOnScroll>
    </>
  );
}
