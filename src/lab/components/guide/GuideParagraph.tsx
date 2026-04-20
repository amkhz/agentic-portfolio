/**
 * GuideParagraph renders inline text with bold and clickable glossary markers.
 * Active definitions are tracked per paragraph as a Set<string>, not at the
 * renderer level — readers can keep multiple cross-referenced definitions open
 * simultaneously across (and within) a guide. Future iteration may revisit via
 * a tab-bar toggle or telemetry-driven change (see plan Future Work).
 */
import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Paragraph } from "@core/lab/guide-types";
import { GuideTerm } from "./GuideTerm";
import { GuideDefinitionCard } from "./GuideDefinitionCard";

interface GuideParagraphProps {
  paragraph: Paragraph;
  glossary: Record<string, string>;
}

export function GuideParagraph({ paragraph, glossary }: GuideParagraphProps) {
  const [openTerms, setOpenTerms] = useState<Set<string>>(() => new Set());

  const toggle = useCallback((term: string) => {
    setOpenTerms((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  }, []);

  const close = useCallback((term: string) => {
    setOpenTerms((prev) => {
      if (!prev.has(term)) return prev;
      const next = new Set(prev);
      next.delete(term);
      return next;
    });
  }, []);

  return (
    <div>
      <p className="font-lab-body text-base leading-relaxed text-lab-text-primary md:text-lg">
        {paragraph.nodes.map((node, index) => {
          if (node.kind === "text") {
            return <span key={index}>{node.value}</span>;
          }
          if (node.kind === "bold") {
            return (
              <strong
                key={index}
                className="font-semibold text-lab-text-primary"
              >
                {node.value}
              </strong>
            );
          }
          return (
            <GuideTerm
              key={index}
              term={node.term}
              active={openTerms.has(node.term)}
              onToggle={toggle}
            />
          );
        })}
      </p>
      <AnimatePresence initial={false}>
        {Array.from(openTerms).map((term) => {
          const definition = glossary[term];
          if (!definition) return null;
          return (
            <GuideDefinitionCard
              key={term}
              term={term}
              definition={definition}
              onClose={() => close(term)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
