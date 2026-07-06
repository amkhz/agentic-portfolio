import type { CaseStudySection } from "@core/content/case-studies";
import type { PositionedNode } from "@core/content/constellation";
import { getNode } from "@core/content/constellation";
import { cn } from "@core/utils";
import { SectionHeading } from "./SectionHeading";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { MetricCard } from "./MetricCard";
import { MetricGrid } from "./MetricGrid";
import { ComparisonBlock } from "./ComparisonBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CalloutBlock } from "./CalloutBlock";
import { CtaBlock } from "./CtaBlock";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { ConnectionPeek } from "./ConnectionPeek";
import { SITE_TAB } from "@/lib/tabOrder";

interface ConstellationContentProps {
  node: PositionedNode;
  sections: CaseStudySection[];
  allNodes: PositionedNode[];
  onBack: () => void;
  onNavigate: (id: string) => void;
}

function renderConstellationSection(
  section: CaseStudySection,
  index: number,
  allNodes: PositionedNode[],
  onNavigate: (id: string) => void,
  nodeTitle?: string,
) {
  switch (section.type) {
    case "text": {
      // Skip headings that duplicate the node title (already rendered as h2)
      const showHeading =
        section.heading &&
        section.heading.toLowerCase() !== nodeTitle?.toLowerCase();
      return (
        <RevealOnScroll key={index}>
          <div>
            {showHeading && section.heading && (
              <SectionHeading as="h3">{section.heading}</SectionHeading>
            )}
            <TextBlock>{section.body}</TextBlock>
          </div>
        </RevealOnScroll>
      );
    }

    case "image":
      return (
        <RevealOnScroll key={index}>
          <ImageBlock
            src={section.src}
            alt={section.alt}
            placeholder={section.placeholder}
            caption={section.caption}
            aspect={section.aspect}
          />
        </RevealOnScroll>
      );

    case "metrics":
      return (
        <RevealOnScroll key={index}>
          <div className="-mx-6 bg-bg-elevated/40 px-6 py-10 sm:-mx-8 sm:px-8">
            {section.heading && (
              <SectionHeading as="h3">{section.heading}</SectionHeading>
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
            {section.heading && (
              <div className="mx-2 sm:mx-4">
                <SectionHeading as="h3">{section.heading}</SectionHeading>
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

    case "peek": {
      const targetNode = getNode(allNodes, section.targetId);
      if (!targetNode) return null;
      return (
        <RevealOnScroll key={index}>
          <ConnectionPeek
            targetNode={targetNode}
            tease={section.tease}
            onNavigate={onNavigate}
          />
        </RevealOnScroll>
      );
    }

    default:
      return null;
  }
}

export function ConstellationContent({
  node,
  sections,
  allNodes,
  onBack,
  onNavigate,
}: ConstellationContentProps) {
  return (
    <div>
      {/* Back to constellation */}
      <div className="max-w-[65ch]">
        <button
          tabIndex={SITE_TAB}
          type="button"
          onClick={onBack}
          className={cn(
            "mb-8 inline-flex items-center gap-2",
            "font-mono text-xs uppercase tracking-wider text-text-secondary",
            "transition-colors duration-normal hover:text-accent-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
          )}
        >
          <span aria-hidden="true">&larr;</span>
          Return to the field
        </button>

        {/* Node header */}
        <header className="mb-10">
          <h2 className="font-display text-2xl leading-snug tracking-tight text-text-primary sm:text-3xl">
            {node.title}
          </h2>
          <p className="mt-2 font-body text-base leading-normal text-text-muted">
            {node.inscription}
          </p>
        </header>
      </div>

      {/* Content sections -- images break out of 65ch, text stays contained */}
      <div className="flex flex-col gap-10">
        {sections.map((section, index) =>
          renderConstellationSection(
            section,
            index,
            allNodes,
            onNavigate,
            node.title,
          ),
        )}
      </div>
    </div>
  );
}
