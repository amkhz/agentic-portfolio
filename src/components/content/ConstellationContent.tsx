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
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { ConnectionPeek } from "./ConnectionPeek";

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
          <div className="-mx-6 rounded-lg bg-bg-elevated/50 px-6 py-8 sm:-mx-8 sm:px-8">
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
          type="button"
          onClick={onBack}
          className={cn(
            "mb-8 inline-flex items-center gap-1.5",
            "font-heading text-sm font-medium text-text-secondary",
            "transition-colors duration-normal hover:text-accent-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
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
          renderConstellationSection(section, index, allNodes, onNavigate, node.title)
        )}
      </div>

      {/* Related nodes */}
      {node.connections.length > 0 && (
        <nav
          aria-label="Related topics"
          className="mt-12 flex max-w-[65ch] flex-wrap items-center gap-2 border-t border-border-subtle pt-6"
        >
          <span className="font-heading text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Related
          </span>
          {node.connections.map((connId) => {
            const connNode = getNode(allNodes, connId);
            if (!connNode || connNode.status === "planned") return null;
            return (
              <button
                key={connId}
                type="button"
                onClick={() => onNavigate(connId)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-border-subtle px-3 py-1",
                  "font-heading text-xs font-medium text-text-secondary",
                  "transition-all duration-normal",
                  "hover:border-accent-muted hover:text-accent-primary hover:shadow-[0_0_12px_var(--constellation-glow-shipped)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                )}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-accent-primary opacity-60" />
                {connNode.title}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
