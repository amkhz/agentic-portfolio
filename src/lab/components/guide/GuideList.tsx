import type { ListBlock, ParagraphNode } from "@core/lab/guide-types";
import { GuideTerm } from "./GuideTerm";

interface GuideListProps {
  list: ListBlock;
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

export function GuideList({ list, glossary }: GuideListProps) {
  const itemClassName =
    "pl-2 font-lab-body text-base leading-relaxed text-lab-text-primary marker:text-lab-text-muted md:text-lg";
  const containerClassName = list.ordered
    ? "ml-5 list-decimal space-y-2 md:ml-6"
    : "ml-5 list-disc space-y-2 md:ml-6";

  if (list.ordered) {
    return (
      <ol className={containerClassName}>
        {list.items.map((item, index) => (
          <li key={`li-${index}`} className={itemClassName}>
            {renderNodes(item.nodes, glossary, `li-${index}`)}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className={containerClassName}>
      {list.items.map((item, index) => (
        <li key={`li-${index}`} className={itemClassName}>
          {renderNodes(item.nodes, glossary, `li-${index}`)}
        </li>
      ))}
    </ul>
  );
}
