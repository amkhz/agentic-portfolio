import type {
  BlockquoteBlock,
  BlockquoteVariant,
  ParagraphNode,
} from "@core/lab/guide-types";
import { ArrowRight, Bookmark, Link2, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GuideTerm } from "./GuideTerm";

interface GuideBlockquoteProps {
  block: BlockquoteBlock;
  glossary: Record<string, string>;
}

type CalloutVariant = Exclude<BlockquoteVariant, "definition" | "plain">;

const CALLOUT_LABELS: Record<CalloutVariant, string> = {
  "design-hook": "Design Hook",
  "territory-bridge": "Territory Bridge",
  "read-next": "Read Next",
  "subguide-queued": "Subguide queued",
};

const CALLOUT_ICONS: Record<CalloutVariant, LucideIcon> = {
  "design-hook": Target,
  "territory-bridge": Link2,
  "read-next": ArrowRight,
  "subguide-queued": Bookmark,
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
          className="font-lab-body text-[length:var(--lab-reading-size)] leading-relaxed text-lab-text-secondary"
        >
          {renderNodes(p.nodes, glossary, `${keyPrefix}-${i}`)}
        </p>
      ))}
    </div>
  );
}

export function GuideBlockquote({ block, glossary }: GuideBlockquoteProps) {
  // Editorial framing, not colored boxes: a hairline rule sets each aside off
  // from the prose and the accent lives only in type (the run-in term, the
  // mono label). No rounded corners, no accent-tinted fill, no vertical accent
  // bar — those read as generic AI callouts (Justin's call, 2026-06-30).
  if (block.variant === "definition") {
    return (
      <blockquote
        className="border-t border-lab-border-subtle pt-3"
        aria-label="Definition"
      >
        <p className="font-lab-body text-[length:var(--lab-reading-size)] leading-relaxed text-lab-text-secondary">
          {block.term && (
            <strong className="mr-1.5 text-guide-accent">{block.term}</strong>
          )}
          {block.paragraphs[0] &&
            renderNodes(block.paragraphs[0].nodes, glossary, "bq-def")}
        </p>
      </blockquote>
    );
  }

  if (block.variant === "plain") {
    return (
      <blockquote className="border-t border-lab-border-subtle pt-4 italic">
        <BlockquoteBody block={block} glossary={glossary} keyPrefix="bq-p" />
      </blockquote>
    );
  }

  const calloutLabel = CALLOUT_LABELS[block.variant];
  const Icon = CALLOUT_ICONS[block.variant];
  return (
    <blockquote
      className="border-t border-lab-border-strong pt-4"
      aria-label={calloutLabel}
    >
      <div
        className="mb-3 inline-flex items-center gap-1.5 font-lab-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-guide-accent"
        data-callout={block.variant}
      >
        <Icon
          aria-hidden="true"
          strokeWidth={2}
          className="h-3.5 w-3.5 text-guide-accent/80"
        />
        {calloutLabel}
      </div>
      <BlockquoteBody block={block} glossary={glossary} keyPrefix="bq-c" />
    </blockquote>
  );
}
