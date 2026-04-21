import type { ParagraphNode, TableBlock } from "@core/lab/guide-types";
import { GuideTerm } from "./GuideTerm";

interface GuideTableProps {
  table: TableBlock;
  glossary: Record<string, string>;
}

// Minimal cell renderer. Tables don't get the full paragraph layout
// (no inline definition cards) — a glossary term in a cell still
// reads as a linked affordance and opens the term in its normal spot
// via the shared state tracked by parent paragraphs. That trade keeps
// the table flat and scannable instead of letting a click inside a
// cell blow the row apart with an inline card.
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
    const hasDef = node.term in glossary;
    if (!hasDef) {
      return (
        <span key={key} className="text-lab-text-primary">
          {node.term}
        </span>
      );
    }
    return <GuideTerm key={key} term={node.term} active={false} onToggle={() => {}} />;
  });
}

export function GuideTable({ table, glossary }: GuideTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left font-lab-body text-base text-lab-text-secondary md:text-lg">
        <thead>
          <tr className="border-b border-lab-border-strong">
            {table.header.cells.map((cell, idx) => (
              <th
                key={`h-${idx}`}
                scope="col"
                className="px-4 py-3 font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted"
              >
                {renderNodes(cell.nodes, glossary, `h-${idx}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIdx) => (
            <tr
              key={`r-${rowIdx}`}
              className="border-b border-lab-border-subtle align-top"
            >
              {row.cells.map((cell, cellIdx) => (
                <td key={`c-${rowIdx}-${cellIdx}`} className="px-4 py-3 leading-relaxed">
                  {renderNodes(cell.nodes, glossary, `c-${rowIdx}-${cellIdx}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
