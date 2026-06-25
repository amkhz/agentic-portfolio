import { Link, Navigate } from "react-router";
import { caseStudies, metaCaseStudy } from "@core/content/case-studies";
import { caseStudyContent } from "@core/content/case-studies";
import { slugify } from "@core/utils/format";
import { Container } from "@/components/layout/Container";
import { ImageBlock } from "./ImageBlock";
import { GlowEffect } from "@/components/effects/GlowEffect";
import {
  DossierFrame,
  DossierTags,
  DraftedObjectMark,
  TocLinkList,
  type TocItem,
} from "@/components/fieldnotebook";
import { renderSection } from "./renderSection";
import { RelatedStudyBanner } from "./RelatedStudyBanner";

const allProjects = [...caseStudies, metaCaseStudy];

interface CaseStudyPageProps {
  slug: string;
}

/** Back-to-work link, styled as a mono dossier marker. */
function BackLink({ label }: { label: string }) {
  return (
    <Link
      to="/work"
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <span aria-hidden="true">&larr;</span>
      {label}
    </Link>
  );
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

  // Derive the dossier Contents index from chapter headings. Anchor ids match
  // the ones renderSection assigns, so each row jumps to its section.
  const chapters: TocItem[] = sections
    .filter(
      (s): s is typeof s & { heading: string } =>
        "heading" in s && typeof s.heading === "string" && s.heading.length > 0,
    )
    .map((s, i) => ({
      id: `${slugify(s.heading)}-${i}`,
      label: s.heading,
      href: `#${slugify(s.heading)}`,
      index: String(i + 1).padStart(2, "0"),
    }));

  const kicker = study.tags[0] ?? "Case file";

  return (
    <article>
      {/* Hero — editorial spread: dossier cover plate + type spread */}
      <section className="border-b border-border-subtle pb-14 pt-24 sm:pt-32">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <BackLink label="All work" />
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Cover plate — image lives within the padded frame; the
                registration marks sit in the margin and frame it. */}
            <div className="lg:order-1 lg:col-span-5">
              <DossierFrame className="bg-bg-base">
                <ImageBlock
                  bare
                  src={study.heroImage.src}
                  alt={study.heroImage.alt}
                  placeholder={study.heroImage.placeholder}
                  aspect="4:3"
                />
              </DossierFrame>
            </div>

            {/* Type spread */}
            <div className="flex flex-col justify-center lg:order-2 lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
                {kicker}
              </p>

              <h1 className="mt-4 max-w-[18ch] font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                {study.title}
              </h1>

              <p className="mt-5 max-w-[60ch] font-body text-lg leading-normal text-text-secondary">
                {study.subtitle}
              </p>

              {study.heroMetric && (
                <div className="relative mt-8 flex items-baseline gap-3">
                  <GlowEffect color="brass" size="sm" className="-left-8 -top-8" />
                  <span className="relative font-display text-4xl leading-tight tracking-tight text-accent-primary">
                    {study.heroMetric.value}
                  </span>
                  <span className="relative font-mono text-xs uppercase tracking-wider text-text-secondary">
                    {study.heroMetric.label}
                  </span>
                </div>
              )}

              <DossierTags tags={study.tags} className="mt-8" />
            </div>
          </div>
        </Container>
      </section>

      {/* Contents index paired with the per-project drafted-object mark */}
      {chapters.length > 0 && (
        <section className="border-b border-border-subtle py-14 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <DossierFrame kicker="Contents">
                  <TocLinkList items={chapters} ariaLabel={`${study.title} contents`} />
                </DossierFrame>
              </div>
              <div className="lg:col-span-5">
                <DraftedObjectMark
                  alt={`${study.title} project mark`}
                  kicker="Specimen"
                  caption={`Fig. ${slugify(study.slug)}`}
                  placeholder="Drafted object pending"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Body */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 sm:gap-14">{sectionNodes}</div>

          {study.relatedStudy && (
            <div className="mt-16 border-t border-border-subtle pt-10">
              <RelatedStudyBanner related={study.relatedStudy} />
            </div>
          )}

          <div className="mt-16 border-t border-border-subtle pt-10">
            <BackLink label="Back to all work" />
          </div>
        </Container>
      </section>
    </article>
  );
}
