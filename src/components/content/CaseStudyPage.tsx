import { Link, Navigate } from "react-router";
import { caseStudies, metaCaseStudy } from "@core/content/case-studies";
import { caseStudyContent } from "@core/content/case-studies";
import { Container } from "@/components/layout/Container";
import { ImageBlock } from "./ImageBlock";
import { Tag } from "@/components/interactive/Tag";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { renderSection } from "./renderSection";

const allProjects = [...caseStudies, metaCaseStudy];

interface CaseStudyPageProps {
  slug: string;
}

export function CaseStudyPageTemplate({ slug }: CaseStudyPageProps) {
  const study = allProjects.find((s) => s.slug === slug);
  if (!study) return <Navigate to="/work" replace />;

  const sections = caseStudyContent[slug] ?? [];

  const sectionNodes = sections.map((section, index) => {
    const hasHeading =
      "heading" in section &&
      typeof section.heading === "string" &&
      section.heading.length > 0;

    return renderSection(section, index, hasHeading ? "h2" : undefined);
  });

  return (
    <article>
      <section className="border-b border-border-subtle pb-12 pt-24 sm:pb-16 sm:pt-32">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              <span aria-hidden="true">&larr;</span>
              All Work
            </Link>
          </nav>

          <div className="mb-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Tag key={tag}>
                {tag}
              </Tag>
            ))}
          </div>

          <h1 className="max-w-[20ch] font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl">
            {study.title}
          </h1>

          <p className="mt-4 max-w-[65ch] font-body text-lg leading-normal text-text-secondary">
            {study.subtitle}
          </p>

          {study.heroMetric && (
            <div className="relative mt-8 flex items-baseline gap-3">
              <GlowEffect color="magenta" size="sm" className="-left-8 -top-8" />
              <span className="relative font-display text-4xl leading-tight tracking-tight text-accent-primary">
                {study.heroMetric.value}
              </span>
              <span className="relative font-heading text-sm font-medium uppercase tracking-wide text-text-secondary">
                {study.heroMetric.label}
              </span>
            </div>
          )}

          <ImageBlock
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            placeholder={study.heroImage.placeholder}
            aspect="16:9"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 sm:gap-14">
            {sectionNodes}
          </div>

          <div className="mt-16 border-t border-border-subtle pt-10">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              <span aria-hidden="true">&larr;</span>
              Back to all work
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
