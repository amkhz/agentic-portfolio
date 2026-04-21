// ============================================
// SPECULATIVE DESIGN LAB — Guide Types
// Pure type definitions for the guide library.
// No side effects, no I/O. Parser (parse-guide.ts) produces
// these shapes; renderer (src/lab/) consumes them.
// ============================================

export type Territory = 'T1' | 'T2' | 'T3' | 'T4';

export type GuideStatus = 'draft' | 'in-progress' | 'complete';

// --- Frontmatter primitives ---

export interface SourceMeta {
  authors: string;
  year: number;
  venue: string;
  url?: string;
}

export type FigureBackground = 'paper' | 'transparent' | 'invert';

export interface Figure {
  slug: string;
  file: string;
  caption: string;
  alt: string;
  background?: FigureBackground;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

// Canonical frontmatter shape (validated at parse time).
export interface GuideFrontmatter {
  id: string;
  title: string;
  kicker: string;
  source: SourceMeta;
  accent: string;
  territory: Territory;
  status: GuideStatus;
  order?: number;
  description: string;
  figures: Figure[];
  glossary: Record<string, string>;
}

// --- Body node tree ---

export interface TextNode {
  kind: 'text';
  value: string;
}

export interface BoldNode {
  kind: 'bold';
  value: string;
}

export interface ItalicNode {
  kind: 'italic';
  value: string;
}

export interface TermNode {
  kind: 'term';
  term: string;
}

export type ParagraphNode = TextNode | BoldNode | ItalicNode | TermNode;

export interface Paragraph {
  kind: 'paragraph';
  nodes: ParagraphNode[];
}

export interface FigureRef {
  kind: 'figure';
  slug: string;
}

export interface TableCell {
  nodes: ParagraphNode[];
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableBlock {
  kind: 'table';
  header: TableRow;
  rows: TableRow[];
}

export interface HeadingBlock {
  kind: 'heading';
  level: 3;
  id: string;
  text: string;
  icon?: string;
}

export interface ListItem {
  nodes: ParagraphNode[];
}

export interface ListBlock {
  kind: 'list';
  ordered: boolean;
  items: ListItem[];
}

export interface BlockquoteBlock {
  kind: 'blockquote';
  paragraphs: Paragraph[];
}

export type SectionBlock =
  | Paragraph
  | FigureRef
  | TableBlock
  | HeadingBlock
  | ListBlock
  | BlockquoteBlock;

export interface GuideSection {
  id: string;
  heading: string;
  icon?: string;
  blocks: SectionBlock[];
}

// Fully parsed and validated guide, ready for render.
export interface Guide {
  slug: string;
  frontmatter: GuideFrontmatter;
  sections: GuideSection[];
  glossary: Record<string, string>;
  figures: Record<string, Figure>;
}
