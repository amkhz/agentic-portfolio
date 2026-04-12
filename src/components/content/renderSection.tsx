import type { CaseStudySection } from "@core/content/case-studies";
import { SectionHeading } from "./SectionHeading";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { MetricCard } from "./MetricCard";
import { MetricGrid } from "./MetricGrid";
import { ComparisonBlock } from "./ComparisonBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CalloutBlock } from "./CalloutBlock";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

/** Brass accent line with ambient glow — used as a chapter break. */
function ChapterBreak() {
  return (
    <div className="relative mb-10" aria-hidden="true">
      <GlowEffect color="brass" size="sm" className="left-0 top-1/2 -translate-y-1/2" />
      <div className="relative h-px w-12 bg-accent-primary opacity-40" />
    </div>
  );
}

/**
 * Renders a case study section with type-aware spacing and visual treatment.
 * Headings get extra top margin (chapter break). Metrics get a background band.
 * Images break slightly wider than text for visual rhythm.
 */
export function renderSection(
  section: CaseStudySection,
  index: number,
  headingAs?: "h2" | "h3"
) {
  const isChapterStart = headingAs === "h2";

  switch (section.type) {
    case "text":
      return (
        <RevealOnScroll key={index}>
          <div className={isChapterStart ? "mt-4" : undefined}>
            {section.heading && headingAs && (
              <>
                {isChapterStart && index > 0 && <ChapterBreak />}
                <SectionHeading as={headingAs}>
                  {section.heading}
                </SectionHeading>
              </>
            )}
            <TextBlock>{section.body}</TextBlock>
          </div>
        </RevealOnScroll>
      );

    case "image":
      return (
        <RevealOnScroll key={index}>
          <div className="-mx-2 sm:-mx-4">
            <ImageBlock
              src={section.src}
              alt={section.alt}
              placeholder={section.placeholder}
              caption={section.caption}
              aspect={section.aspect}
            />
          </div>
        </RevealOnScroll>
      );

    case "metrics":
      return (
        <RevealOnScroll key={index}>
          <div className="-mx-6 rounded-lg bg-bg-elevated/50 px-6 py-8 sm:-mx-8 sm:px-8">
            {section.heading && headingAs && (
              <SectionHeading as={headingAs}>{section.heading}</SectionHeading>
            )}
            <MetricGrid>
              {section.items.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <MetricCard
                    value={item.value}
                    label={item.label}
                    accent={item.accent}
                  />
                </RevealOnScroll>
              ))}
            </MetricGrid>
          </div>
        </RevealOnScroll>
      );

    case "comparison":
      return (
        <RevealOnScroll key={index}>
          <div className="-mx-2 sm:-mx-4">
            {section.heading && headingAs && (
              <div className="mx-2 sm:mx-4">
                <SectionHeading as={headingAs}>
                  {section.heading}
                </SectionHeading>
              </div>
            )}
            <ComparisonBlock before={section.before} after={section.after} />
          </div>
        </RevealOnScroll>
      );

    case "quote":
      return (
        <RevealOnScroll key={index}>
          <div className="py-2">
            <QuoteBlock
              text={section.text}
              attribution={section.attribution}
              role={section.role}
            />
          </div>
        </RevealOnScroll>
      );

    case "callout":
      return (
        <RevealOnScroll key={index}>
          <CalloutBlock label={section.label} body={section.body} />
        </RevealOnScroll>
      );

    default:
      return null;
  }
}
