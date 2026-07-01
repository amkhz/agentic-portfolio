import type { CaseStudySection } from "@core/content/case-studies";
import { slugify } from "@core/utils/format";
import { SectionHeading } from "./SectionHeading";
import { TextBlock } from "./TextBlock";
import { ListBlock } from "./ListBlock";
import { ImageBlock } from "./ImageBlock";
import { MetricCard } from "./MetricCard";
import { MetricGrid } from "./MetricGrid";
import { ComparisonBlock } from "./ComparisonBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CalloutBlock } from "./CalloutBlock";
import { CtaBlock } from "./CtaBlock";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

/** Brass accent line with ambient glow — used as a chapter break. */
function ChapterBreak() {
  return (
    <div className="relative mb-10" aria-hidden="true">
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
  const heading =
    "heading" in section && typeof section.heading === "string"
      ? section.heading
      : undefined;
  // Chapter anchor — lets the dossier Contents index jump to this section.
  // scroll-mt offsets the jump clear of the fixed header.
  const chapterId = isChapterStart && heading ? slugify(heading) : undefined;
  const anchorClass = (...extra: (string | false | undefined)[]) =>
    [chapterId && "scroll-mt-24", ...extra].filter(Boolean).join(" ") || undefined;

  switch (section.type) {
    case "text":
      return (
        <RevealOnScroll key={index}>
          <div id={chapterId} className={anchorClass(isChapterStart && "mt-4")}>
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

    case "list":
      return (
        <RevealOnScroll key={index}>
          <ListBlock ordered={section.ordered} items={section.items} />
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
          <div
            id={chapterId}
            className={anchorClass("-mx-6 bg-bg-elevated/40 px-6 py-10 sm:-mx-8 sm:px-8")}
          >
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
          <div id={chapterId} className={anchorClass("-mx-2 sm:-mx-4")}>
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

    case "cta":
      return (
        <RevealOnScroll key={index}>
          <CtaBlock
            kicker={section.kicker}
            href={section.href}
            action={section.action}
            body={section.body}
          />
        </RevealOnScroll>
      );

    default:
      return null;
  }
}
