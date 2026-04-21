import type {
  Figure,
  GuideSection as GuideSectionType,
} from "@core/lab/guide-types";
import { GuideParagraph } from "./GuideParagraph";
import { GuideFigure } from "./GuideFigure";
import { GuideTable } from "./GuideTable";

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
        className="font-lab-heading text-2xl font-semibold tracking-tight text-lab-text-primary md:text-3xl"
      >
        {section.icon ? (
          <span aria-hidden className="mr-3 inline-block align-[-0.05em]">
            {section.icon}
          </span>
        ) : null}
        {section.heading}
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
