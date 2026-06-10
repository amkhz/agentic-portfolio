import type {
  Figure,
  GuideSection as GuideSectionType,
} from "@core/lab/guide-types";
import { GuideParagraph } from "./GuideParagraph";
import { GuideFigure } from "./GuideFigure";
import { GuideTable } from "./GuideTable";
import { GuideHeading } from "./GuideHeading";
import { GuideList } from "./GuideList";
import { GuideBlockquote } from "./GuideBlockquote";
import { SectionIcon } from "./SectionIcon";

// Mocked at 26px in the C.2 Paper session; 24 vs 26 gets locked at live
// review against the type-only baseline.
const H2_ICON_SIZE = 26;

interface GuideSectionProps {
  section: GuideSectionType;
  glossary: Record<string, string>;
  figures: Record<string, Figure>;
  guideSlug: string;
}

export function GuideSection({
  section,
  glossary,
  figures,
  guideSlug,
}: GuideSectionProps) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28"
    >
      <h2
        id={`${section.id}-heading`}
        className="flex items-center gap-3.5 font-lab-heading text-2xl font-semibold tracking-tight text-lab-text-primary md:text-3xl"
      >
        {section.icon && (
          <SectionIcon
            name={section.icon}
            size={H2_ICON_SIZE}
            className="shrink-0 text-guide-accent"
          />
        )}
        <span>{section.heading}</span>
      </h2>
      <div className="mt-6 space-y-6">
        {section.blocks.map((block, index) => {
          if (block.kind === "figure") {
            const figure = figures[block.slug];
            if (!figure) return null;
            return (
              <GuideFigure
                key={`${section.id}-fig-${index}`}
                figure={figure}
                guideSlug={guideSlug}
              />
            );
          }
          if (block.kind === "table") {
            return (
              <GuideTable
                key={`${section.id}-t-${index}`}
                table={block}
                glossary={glossary}
              />
            );
          }
          if (block.kind === "heading") {
            return (
              <GuideHeading
                key={`${section.id}-h-${index}`}
                heading={block}
              />
            );
          }
          if (block.kind === "list") {
            return (
              <GuideList
                key={`${section.id}-l-${index}`}
                list={block}
                glossary={glossary}
              />
            );
          }
          if (block.kind === "blockquote") {
            return (
              <GuideBlockquote
                key={`${section.id}-bq-${index}`}
                block={block}
                glossary={glossary}
              />
            );
          }
          return (
            <GuideParagraph
              key={`${section.id}-p-${index}`}
              paragraph={block}
              glossary={glossary}
            />
          );
        })}
      </div>
    </section>
  );
}
