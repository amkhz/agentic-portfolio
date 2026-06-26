import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/content/Hero";
import { ProjectCard } from "@/components/content/ProjectCard";
import { AboutSnippet } from "@/components/content/AboutSnippet";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { TocLinkList, type TocItem } from "@/components/fieldnotebook";
import { caseStudies, metaCaseStudy } from "@core/content/case-studies";

export function HomePage() {
  const featured = metaCaseStudy;

  // Selected work as a Field Notebook ledger, not a card grid. Deliberately
  // terser than the work index (which carries full subtitles): here the
  // secondary line is just the discipline, so the narrow column stays clean and
  // the two surfaces read distinct rather than identical. Thumbnail carries the
  // visual index, so no leading number.
  const selected: TocItem[] = caseStudies
    .filter((study) => !study.parentHub)
    .map((study, i) => ({
    id: study.slug,
    to: `/work/${study.slug}`,
    label: study.title,
    thumbnail: {
      src: study.mark?.thumb,
      alt: study.mark?.alt ?? `${study.title} project mark`,
      placeholder: `Fig.${String(i + 1).padStart(2, "0")}`,
    },
    kicker: study.tags.slice(0, 2).join(" / "),
  }));

  return (
    <>
      <Helmet>
        <title>Home | Justin Hernandez</title>
        <meta
          name="description"
          content="Portfolio of Justin Hernandez. Product design leader for complex, human-centered systems. Blending human judgment with AI."
        />
        <link rel="canonical" href="https://justinh.design/" />
      </Helmet>

      <Hero />

      {/* Featured - the one ambitious composed moment: an editorial spread that
          echoes the case-study hero, not a glossy card. */}
      <section className="border-t border-border-subtle pt-24 pb-20 sm:pt-32 sm:pb-24">
        <RevealOnScroll>
          <ProjectCard study={featured} />
        </RevealOnScroll>
      </section>

      {/* Selected work - Field Notebook ledger in an asymmetric two-column
          spread: the index heading and dossier metadata live in the margin,
          the registration-line list carries the weight. */}
      <section id="work" className="border-t border-border-subtle py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Margin column - kicker, heading, dossier note */}
            <div className="lg:col-span-4">
              <RevealOnScroll>
                <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
                  Index
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl">
                  Selected work
                </h2>
                <p className="mt-5 max-w-[34ch] font-body text-base leading-normal text-text-secondary">
                  A short ledger of recent case files.
                </p>
                <Link
                  to="/work"
                  className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                >
                  View all work
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </RevealOnScroll>
            </div>

            {/* Ledger column */}
            <div className="lg:col-span-7 lg:col-start-6">
              <RevealOnScroll delay={100}>
                <TocLinkList items={selected} ariaLabel="Selected work" />
              </RevealOnScroll>
            </div>
          </div>
        </Container>
      </section>

      <RevealOnScroll>
        <AboutSnippet />
      </RevealOnScroll>
    </>
  );
}
