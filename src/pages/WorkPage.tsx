import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { Container } from "@/components/layout/Container";
import { ImageBlock } from "@/components/content/ImageBlock";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import {
  DossierFrame,
  DossierTags,
  TocLinkList,
  type TocItem,
} from "@/components/fieldnotebook";
import { caseStudies, metaCaseStudy } from "@core/content/case-studies";

// Studies folded behind a hub are reached through it, not listed here.
const indexedStudies = caseStudies.filter((study) => !study.parentHub);

const tocItems: TocItem[] = indexedStudies.map((study, i) => ({
  id: study.slug,
  label: study.title,
  to: `/work/${study.slug}`,
  // No leading number — the thumbnail carries the visual index.
  thumbnail: {
    alt: `${study.title} project mark`,
    placeholder: `Fig.${String(i + 1).padStart(2, "0")}`,
  },
  description: study.subtitle,
  trailing: study.tags[0],
}));

/** Featured meta case study as a dossier entry: flush cover plate + type spread. */
function FeaturedEntry() {
  return (
    <Link
      to={`/work/${metaCaseStudy.slug}`}
      aria-label={`View case study: ${metaCaseStudy.title}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <DossierFrame
        kicker="Featured case file"
        className="bg-bg-base transition-colors duration-normal group-hover:[border-color:var(--fieldnote-rule-strong)] group-focus-visible:[border-color:var(--fieldnote-rule-strong)]"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-1 lg:col-span-5">
            <DossierFrame marked={false} className="bg-bg-base">
              <ImageBlock
                bare
                expandable={false}
                src={metaCaseStudy.heroImage.src}
                alt={metaCaseStudy.heroImage.alt}
                placeholder={metaCaseStudy.heroImage.placeholder}
                aspect="4:3"
              />
            </DossierFrame>
          </div>

          <div className="flex flex-col justify-center lg:order-2 lg:col-span-7">
            <h2 className="max-w-[18ch] font-display text-2xl leading-tight tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary group-focus-visible:text-accent-primary sm:text-3xl lg:text-4xl">
              {metaCaseStudy.title}
            </h2>

            <p className="mt-4 max-w-[60ch] font-body text-base leading-normal text-text-secondary sm:text-lg">
              {metaCaseStudy.subtitle}
            </p>

            {metaCaseStudy.heroMetric && (
              <div className="relative mt-6 flex items-baseline gap-3">
                <GlowEffect color="brass" size="sm" className="-left-6 -top-6" />
                <span className="relative font-display text-3xl leading-tight tracking-tight text-accent-primary">
                  {metaCaseStudy.heroMetric.value}
                </span>
                <span className="relative font-mono text-xs uppercase tracking-wider text-text-secondary">
                  {metaCaseStudy.heroMetric.label}
                </span>
              </div>
            )}

            <DossierTags tags={metaCaseStudy.tags} className="mt-6" />
          </div>
        </div>
      </DossierFrame>
    </Link>
  );
}

export function WorkPage() {
  return (
    <>
      <Helmet>
        <title>Work | Justin Hernandez</title>
        <meta name="description" content="Case studies in AI-driven enterprise product design." />
        <link rel="canonical" href="https://justinh.design/work" />
      </Helmet>

      <section className="py-24 sm:py-32">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
            Field notebook
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl">
            Work
          </h1>
          <p className="mt-5 max-w-[65ch] font-body text-lg leading-normal text-text-secondary">
            A working index of case files spanning AI strategy, enterprise UX, and
            design systems. 
          </p>

          <RevealOnScroll className="mt-14">
            <FeaturedEntry />
          </RevealOnScroll>

          <RevealOnScroll className="mt-12" delay={100}>
            <DossierFrame kicker="Selected case files" className="bg-bg-base">
              <TocLinkList items={tocItems} ariaLabel="Selected case studies" />
            </DossierFrame>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
