import type { BlockquoteBlock, ParagraphNode } from "@core/lab/guide-types";
import { GuideTerm } from "./GuideTerm";

interface GuideBlockquoteProps {
  block: BlockquoteBlock;
  glossary: Record<string, string>;
}

function renderNodes(
  nodes: ParagraphNode[],
  glossary: Record<string, string>,
  keyPrefix: string,
) {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;
    if (node.kind === "text") return <span key={key}>{node.value}</span>;
    if (node.kind === "bold") {
      return (
        <strong key={key} className="font-semibold text-lab-text-primary">
          {node.value}
        </strong>
      );
    }
    if (node.kind === "italic") {
      return (
        <em key={key} className="italic">
          {node.value}
        </em>
      );
    }
    if (!(node.term in glossary)) {
      return (
        <span key={key} className="text-lab-text-primary">
          {node.term}
        </span>
      );
    }
    return (
      <GuideTerm
        key={key}
        term={node.term}
        active={false}
        onToggle={() => {}}
      />
    );
  });
}

export function GuideBlockquote({ block, glossary }: GuideBlockquoteProps) {
  return (
    <blockquote className="border-l-2 border-guide-accent pl-5 md:pl-6">
      <div className="space-y-4">
        {block.paragraphs.map((p, i) => (
          <p
            key={`bq-p-${i}`}
            className="font-lab-body text-base leading-relaxed text-lab-text-secondary md:text-lg"
          >
            {renderNodes(p.nodes, glossary, `bq-p-${i}`)}
          </p>
        ))}
      </div>
    </blockquote>
  );
}
