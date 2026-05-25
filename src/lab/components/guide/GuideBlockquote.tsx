import type {
  BlockquoteBlock,
  BlockquoteVariant,
  ParagraphNode,
} from "@core/lab/guide-types";
import { GuideTerm } from "./GuideTerm";

interface GuideBlockquoteProps {
  block: BlockquoteBlock;
  glossary: Record<string, string>;
}

const CALLOUT_LABELS: Record<
  Exclude<BlockquoteVariant, "definition" | "plain">,
  string
> = {
  "design-hook": "Design Hook",
  "territory-bridge": "Territory Bridge",
  "read-next": "Read Next",
  "subguide-queued": "Subguide queued",
};

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

function BlockquoteBody({
  block,
  glossary,
  keyPrefix,
}: {
  block: BlockquoteBlock;
  glossary: Record<string, string>;
  keyPrefix: string;
}) {
  return (
    <div className="space-y-4">
      {block.paragraphs.map((p, i) => (
        <p
          key={`${keyPrefix}-${i}`}
          className="font-lab-body text-base leading-relaxed text-lab-text-secondary md:text-lg"
        >
          {renderNodes(p.nodes, glossary, `${keyPrefix}-${i}`)}
        </p>
      ))}
    </div>
  );
}

export function GuideBlockquote({ block, glossary }: GuideBlockquoteProps) {
  if (block.variant === "definition") {
    return (
      <blockquote
        className="rounded-sm border-l-2 border-guide-accent bg-guide-accent/[0.06] py-3 pl-5 pr-4 md:pl-6"
        aria-label="Definition"
      >
        <p className="font-lab-body text-base leading-relaxed text-lab-text-secondary md:text-lg">
          {block.term && (
            <strong className="mr-1.5 font-semibold text-guide-accent">
              {block.term}
            </strong>
          )}
          {block.paragraphs[0] &&
            renderNodes(block.paragraphs[0].nodes, glossary, "bq-def")}
        </p>
      </blockquote>
    );
  }

  if (block.variant === "plain") {
    return (
      <blockquote className="border-l-2 border-guide-accent pl-5 md:pl-6">
        <BlockquoteBody block={block} glossary={glossary} keyPrefix="bq-p" />
      </blockquote>
    );
  }

  const calloutLabel = CALLOUT_LABELS[block.variant];
  return (
    <blockquote
      className="border-l-2 border-guide-accent pl-5 md:pl-6"
      aria-label={calloutLabel}
    >
      <div
        className="mb-3 inline-flex items-center gap-1.5 font-lab-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-guide-accent"
        data-callout={block.variant}
      >
        <span aria-hidden="true" className="h-px w-3 bg-guide-accent/70" />
        {calloutLabel}
      </div>
      <BlockquoteBody block={block} glossary={glossary} keyPrefix="bq-c" />
    </blockquote>
  );
}
