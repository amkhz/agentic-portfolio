import { Link, Navigate } from "react-router";
import { caseStudies, metaCaseStudy } from "@core/tokens";
import { caseStudyContent } from "@core/content/case-studies";
import { groupIntoChapters } from "@core/content/codex";
import { Container } from "@/components/layout/Container";
import { ImageBlock } from "./ImageBlock";
import { Tag } from "@/components/interactive/Tag";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { CodexSpine } from "./CodexSpine";
import { renderSection } from "./renderSection";

const allProjects = [...caseStudies, metaCaseStudy];

interface CodexPageProps {
  slug: string;
}

export function CodexPageTemplate({ slug }: CodexPageProps) {
  const study = allProjects.find((s) => s.slug === slug);
  if (!study) return <Navigate to="/work" replace />;

  const sections = caseStudyContent[slug] ?? [];
  const { preamble, chapters } = groupIntoChapters(sections);

  return (
    <article>
      {/* Hero */}
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
              <Tag key={tag}>{tag}</Tag>
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
              <GlowEffect
                color="magenta"
                size="sm"
                className="-left-8 -top-8"
              />
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

      {/* Preamble */}
      {preamble.length > 0 && (
        <section className="border-b border-border-subtle py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-[65ch]">
              <div className="flex flex-col gap-8">
                {preamble.map((section, index) =>
                  renderSection(section, index, "h2")
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Spine */}
      {chapters.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            {/* Section label */}
            <div className="mb-10 flex items-center gap-4">
              <h2 className="font-heading text-xs font-medium uppercase tracking-wider text-text-muted">
                Chapters
              </h2>
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "linear-gradient(to right, var(--theme-border-subtle), transparent)",
                }}
                aria-hidden="true"
              />
            </div>

            <CodexSpine chapters={chapters} />
          </Container>
        </section>
      )}

      {/* Footer nav */}
      <section className="pb-16">
        <Container>
          <div className="border-t border-border-subtle pt-10">
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
