// ============================================
// SPECULATIVE DESIGN LAB — Guide Markdown Parser
// Validates YAML frontmatter, walks H2 sections, resolves
// inline |term| + **bold** markers, and collects {figure:slug}
// references. Returns a typed Guide or throws with a field-level
// error. Soft warnings go to console.warn.
// ============================================

import yaml from 'js-yaml';
import type {
  BlockquoteBlock,
  BoldNode,
  Figure,
  FigureBackground,
  FigureRef,
  Guide,
  GuideFrontmatter,
  GuideSection,
  GuideStatus,
  HeadingBlock,
  ItalicNode,
  ListBlock,
  ListItem,
  Paragraph,
  ParagraphNode,
  SourceMeta,
  TableBlock,
  TableRow,
  Territory,
  TermNode,
  TextNode,
} from './guide-types';

const LAB_BG_HEX = '#0a0a0c';
const WCAG_AA_MIN = 4.5;
const TERRITORIES: readonly Territory[] = ['T1', 'T2', 'T3', 'T4'];
const STATUSES: readonly GuideStatus[] = ['draft', 'in-progress', 'complete'];
const FIGURE_BACKGROUNDS: readonly FigureBackground[] = ['paper', 'transparent', 'invert'];

// --- Frontmatter validation -------------------------------------------------

function requireString(value: unknown, path: string, slug: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Guide '${slug}': frontmatter field '${path}' must be a non-empty string`);
  }
  return value;
}

function requireNumber(value: unknown, path: string, slug: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Guide '${slug}': frontmatter field '${path}' must be a number`);
  }
  return value;
}

function validateSource(raw: unknown, slug: string): SourceMeta {
  if (!raw || typeof raw !== 'object') {
    throw new Error(`Guide '${slug}': frontmatter 'source' must be an object`);
  }
  const obj = raw as Record<string, unknown>;
  const source: SourceMeta = {
    authors: requireString(obj.authors, 'source.authors', slug),
    year: requireNumber(obj.year, 'source.year', slug),
    venue: requireString(obj.venue, 'source.venue', slug),
  };
  if (obj.url !== undefined) source.url = requireString(obj.url, 'source.url', slug);
  return source;
}

function validateFigure(raw: unknown, index: number, slug: string): Figure {
  if (!raw || typeof raw !== 'object') {
    throw new Error(`Guide '${slug}': figures[${index}] must be an object`);
  }
  const obj = raw as Record<string, unknown>;
  const figure: Figure = {
    slug: requireString(obj.slug, `figures[${index}].slug`, slug),
    file: requireString(obj.file, `figures[${index}].file`, slug),
    caption: requireString(obj.caption, `figures[${index}].caption`, slug),
    alt: requireString(obj.alt, `figures[${index}].alt`, slug),
  };
  if (obj.background !== undefined) {
    const bg = requireString(obj.background, `figures[${index}].background`, slug);
    if (!FIGURE_BACKGROUNDS.includes(bg as FigureBackground)) {
      throw new Error(
        `Guide '${slug}': figures[${index}].background must be one of ${FIGURE_BACKGROUNDS.join(', ')}`,
      );
    }
    figure.background = bg as FigureBackground;
  }
  return figure;
}

function validateGlossary(raw: unknown, slug: string): Record<string, string> {
  if (raw === undefined || raw === null) return {};
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error(`Guide '${slug}': frontmatter 'glossary' must be a map of term to definition`);
  }
  const out: Record<string, string> = {};
  for (const [term, def] of Object.entries(raw as Record<string, unknown>)) {
    out[term] = requireString(def, `glossary.${term}`, slug);
  }
  return out;
}

function validateFrontmatter(data: Record<string, unknown>, slug: string): GuideFrontmatter {
  const territory = requireString(data.territory, 'territory', slug) as Territory;
  if (!TERRITORIES.includes(territory)) {
    throw new Error(`Guide '${slug}': territory must be one of ${TERRITORIES.join(', ')}`);
  }
  const status = requireString(data.status, 'status', slug) as GuideStatus;
  if (!STATUSES.includes(status)) {
    throw new Error(`Guide '${slug}': status must be one of ${STATUSES.join(', ')}`);
  }
  const accent = requireString(data.accent, 'accent', slug);
  if (!/^#[0-9a-f]{6}$/i.test(accent)) {
    throw new Error(`Guide '${slug}': accent must be a 6-digit hex color like #4ade80`);
  }
  const rawFigures = data.figures;
  if (rawFigures !== undefined && !Array.isArray(rawFigures)) {
    throw new Error(`Guide '${slug}': frontmatter 'figures' must be an array`);
  }
  const figures = (rawFigures as unknown[] | undefined)?.map((f, i) => validateFigure(f, i, slug)) ?? [];

  const front: GuideFrontmatter = {
    id: requireString(data.id, 'id', slug),
    title: requireString(data.title, 'title', slug),
    kicker: requireString(data.kicker, 'kicker', slug),
    source: validateSource(data.source, slug),
    accent,
    territory,
    status,
    description: requireString(data.description, 'description', slug),
    figures,
    glossary: validateGlossary(data.glossary, slug),
  };
  if (data.order !== undefined) front.order = requireNumber(data.order, 'order', slug);
  return front;
}

// --- Body parsing -----------------------------------------------------------

const HEADING_H2_RE = /^##\s+(.+?)(?:\s+\{#([a-z0-9-]+)\})?\s*$/;
const HEADING_H3_RE = /^###\s+(.+?)(?:\s+\{#([a-z0-9-]+)\})?\s*$/;
const FIGURE_RE = /^\{figure:([a-z0-9-]+)\}\s*$/i;
// Inline marker alternation — order matters: **bold** must try before *italic*
// so **text** doesn't get mis-consumed as italic-text-italic.
const INLINE_RE =
  /\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*|\|([^|\n]+?)\|/g;
// Markdown table row: starts and ends with a pipe, has at least one inner pipe.
const TABLE_ROW_RE = /^\|(.+)\|\s*$/;
// Separator row: pipes and dashes only (optional colons for alignment, ignored).
const TABLE_SEP_RE = /^\|[\s\-:|]+\|\s*$/;
const BULLET_RE = /^[*-]\s+(.+)$/;
const ORDERED_RE = /^(\d+)\.\s+(.+)$/;
const BLOCKQUOTE_RE = /^>\s?(.*)$/;

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function splitLeadingIcon(heading: string): { icon?: string; title: string } {
  const match = heading.match(/^(\S+)\s+(.+)$/);
  if (!match) return { title: heading };
  const first = match[1];
  // A leading emoji is any non-printable-ASCII token. Plain ASCII → treat whole heading as title.
  if (!/[^\u0020-\u007E]/.test(first)) return { title: heading };
  return { icon: first, title: match[2] };
}

const TERM_RE = /\|([^|\n]+?)\|/g;

// Emit a bold run with embedded |term| markers as an alternating sequence
// of BoldNode + TermNode. Authors frequently write `**The |term| is X**`;
// without this pass the pipes show up as literal characters inside the
// bold span. The data model stays flat — the term loses the bold weight
// but gains its accent + interactive styling, which reads cleanly.
function emitBoldRun(inner: string, nodes: ParagraphNode[]): void {
  let last = 0;
  TERM_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TERM_RE.exec(inner)) !== null) {
    if (m.index > last) {
      const chunk = inner.slice(last, m.index);
      if (chunk) nodes.push({ kind: 'bold', value: chunk } satisfies BoldNode);
    }
    nodes.push({ kind: 'term', term: m[1].trim() } satisfies TermNode);
    last = m.index + m[0].length;
  }
  if (last === 0) {
    nodes.push({ kind: 'bold', value: inner } satisfies BoldNode);
    return;
  }
  if (last < inner.length) {
    const chunk = inner.slice(last);
    if (chunk) nodes.push({ kind: 'bold', value: chunk } satisfies BoldNode);
  }
}

function parseInline(text: string): ParagraphNode[] {
  const nodes: ParagraphNode[] = [];
  let last = 0;
  INLINE_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = INLINE_RE.exec(text)) !== null) {
    if (match.index > last) {
      const value = text.slice(last, match.index);
      if (value) nodes.push({ kind: 'text', value } satisfies TextNode);
    }
    if (match[1] !== undefined) {
      emitBoldRun(match[1], nodes);
    } else if (match[2] !== undefined) {
      nodes.push({ kind: 'italic', value: match[2] } satisfies ItalicNode);
    } else if (match[3] !== undefined) {
      nodes.push({ kind: 'term', term: match[3].trim() } satisfies TermNode);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    const value = text.slice(last);
    if (value) nodes.push({ kind: 'text', value } satisfies TextNode);
  }
  return nodes;
}

// A |term| marker inside a table cell has pipe delimiters that must
// NOT be treated as cell boundaries. Heuristic: a term marker is
// |word|-like (content bordered by non-whitespace). Cell delimiters are
// |-space or space-|. We find term-marker pipe positions first, mask
// them out, then split on the rest.
function splitTableRow(line: string): string[] {
  const protectedPositions = new Set<number>();
  const termMarker = /\|(\S(?:[^|\n]*?\S)?)\|/g;
  let m: RegExpExecArray | null;
  while ((m = termMarker.exec(line)) !== null) {
    protectedPositions.add(m.index);
    protectedPositions.add(m.index + m[0].length - 1);
  }

  const cells: string[] = [];
  let buffer = '';
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '|' && !protectedPositions.has(i)) {
      cells.push(buffer.trim());
      buffer = '';
    } else {
      buffer += line[i];
    }
  }
  if (buffer.trim()) cells.push(buffer.trim());
  // Drop outer empty cells produced by the leading and trailing pipes.
  if (cells.length && cells[0] === '') cells.shift();
  if (cells.length && cells[cells.length - 1] === '') cells.pop();
  return cells;
}

function parseTable(tableLines: string[]): TableBlock {
  const headerCells = splitTableRow(tableLines[0]).map((cell) => ({
    nodes: parseInline(cell),
  }));
  const header: TableRow = { cells: headerCells };
  // Skip the separator row (tableLines[1]).
  const rows: TableRow[] = tableLines.slice(2).map((line) => ({
    cells: splitTableRow(line).map((cell) => ({ nodes: parseInline(cell) })),
  }));
  return { kind: 'table', header, rows };
}

function parseList(listLines: string[], ordered: boolean): ListBlock {
  const items: ListItem[] = listLines.map((line) => {
    const match = ordered ? line.match(ORDERED_RE) : line.match(BULLET_RE);
    const content = ordered ? match?.[2] ?? '' : match?.[1] ?? '';
    return { nodes: parseInline(content) };
  });
  return { kind: 'list', ordered, items };
}

function parseBlockquote(bqLines: string[]): BlockquoteBlock {
  // Strip the leading `> ` / `>` from each line, then split into paragraphs
  // on blank inner lines. Nested blocks are not supported — blockquote
  // bodies are Paragraph-only at this iteration.
  const inner = bqLines
    .map((line) => line.replace(BLOCKQUOTE_RE, '$1'))
    .join('\n');
  const paragraphs: Paragraph[] = inner
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => ({ kind: 'paragraph', nodes: parseInline(chunk) }));
  return { kind: 'blockquote', paragraphs };
}

function parseBody(body: string, slug: string): GuideSection[] {
  const lines = body.split(/\r?\n/);
  const sections: GuideSection[] = [];
  let current: GuideSection | null = null;
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (buffer.length === 0) return;
    const text = buffer.join('\n').trim();
    buffer = [];
    if (!text || !current) return;
    current.blocks.push({ kind: 'paragraph', nodes: parseInline(text) } satisfies Paragraph);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h2 = line.match(HEADING_H2_RE);
    if (h2) {
      flushParagraph();
      const rawHeading = h2[1].trim();
      const { icon, title } = splitLeadingIcon(rawHeading);
      const id = h2[2]?.trim() ?? slugifyHeading(title);
      const section: GuideSection = { id, heading: title, blocks: [] };
      if (icon) section.icon = icon;
      sections.push(section);
      current = section;
      continue;
    }
    const h3 = line.match(HEADING_H3_RE);
    if (h3 && current) {
      flushParagraph();
      const rawHeading = h3[1].trim();
      const { icon, title } = splitLeadingIcon(rawHeading);
      const id = h3[2]?.trim() ?? `${current.id}-${slugifyHeading(title)}`;
      const heading: HeadingBlock = { kind: 'heading', level: 3, id, text: title };
      if (icon) heading.icon = icon;
      current.blocks.push(heading);
      continue;
    }
    const figure = line.match(FIGURE_RE);
    if (figure) {
      flushParagraph();
      if (!current) {
        throw new Error(`Guide '${slug}': figure reference '${figure[1]}' appears before any section heading`);
      }
      current.blocks.push({ kind: 'figure', slug: figure[1] } satisfies FigureRef);
      continue;
    }
    // Table: a row, followed by a separator row, plus zero or more data rows.
    if (
      TABLE_ROW_RE.test(line) &&
      i + 1 < lines.length &&
      TABLE_SEP_RE.test(lines[i + 1])
    ) {
      flushParagraph();
      const tableLines: string[] = [line, lines[i + 1]];
      let j = i + 2;
      while (j < lines.length && TABLE_ROW_RE.test(lines[j])) {
        tableLines.push(lines[j]);
        j++;
      }
      if (current) {
        current.blocks.push(parseTable(tableLines));
      }
      i = j - 1;
      continue;
    }
    // Ordered list: consecutive `N. ` lines.
    if (ORDERED_RE.test(line) && current) {
      flushParagraph();
      const listLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && ORDERED_RE.test(lines[j])) {
        listLines.push(lines[j]);
        j++;
      }
      current.blocks.push(parseList(listLines, true));
      i = j - 1;
      continue;
    }
    // Unordered list: consecutive `- ` or `* ` lines. Must not also match table rows.
    if (BULLET_RE.test(line) && current) {
      flushParagraph();
      const listLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && BULLET_RE.test(lines[j])) {
        listLines.push(lines[j]);
        j++;
      }
      current.blocks.push(parseList(listLines, false));
      i = j - 1;
      continue;
    }
    // Blockquote: consecutive `> ` lines, possibly with empty `>` separators.
    if (BLOCKQUOTE_RE.test(line) && current) {
      flushParagraph();
      const bqLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && BLOCKQUOTE_RE.test(lines[j])) {
        bqLines.push(lines[j]);
        j++;
      }
      current.blocks.push(parseBlockquote(bqLines));
      i = j - 1;
      continue;
    }
    if (line.trim() === '') {
      flushParagraph();
    } else {
      buffer.push(line);
    }
  }
  flushParagraph();
  return sections;
}

// --- Contrast helpers -------------------------------------------------------

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const match = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!match) return 0.5;
  const value = match[1];
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = luminance(hexA);
  const lb = luminance(hexB);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

// --- Frontmatter extraction -------------------------------------------------

// Direct YAML + body split. gray-matter pulls in a Buffer-using polyfill
// that crashes in the browser, so we avoid it — js-yaml is already a dep
// and runs fine in both environments.
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function extractFrontmatter(source: string, slug: string): { data: Record<string, unknown>; body: string } {
  const match = source.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error(`Guide '${slug}': missing '---' frontmatter fence`);
  }
  const parsed = yaml.load(match[1]);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`Guide '${slug}': frontmatter must be a YAML mapping`);
  }
  return { data: parsed as Record<string, unknown>, body: match[2] };
}

// --- Public entrypoint ------------------------------------------------------

export function parseGuide(source: string, slug: string): Guide {
  const parsed = extractFrontmatter(source, slug);
  const frontmatter = validateFrontmatter(parsed.data, slug);
  const sections = parseBody(parsed.body, slug);

  const figures: Record<string, Figure> = {};
  for (const fig of frontmatter.figures) {
    if (figures[fig.slug]) {
      throw new Error(`Guide '${slug}': duplicate figure slug '${fig.slug}'`);
    }
    figures[fig.slug] = fig;
  }

  const glossary = frontmatter.glossary;
  const referencedTerms = new Set<string>();
  const referencedFigures = new Set<string>();
  const orphanTerms = new Set<string>();

  // Orphan |term| markers (no matching glossary entry) degrade to plain
  // bold nodes instead of throwing. One authoring mistake in one guide
  // must not brick the whole library.
  const rewriteParagraphNodes = (nodes: ParagraphNode[]): void => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.kind !== 'term') continue;
      if (node.term in glossary) {
        referencedTerms.add(node.term);
        continue;
      }
      orphanTerms.add(node.term);
      nodes[i] = { kind: 'bold', value: node.term } satisfies BoldNode;
    }
  };

  for (const section of sections) {
    for (const block of section.blocks) {
      if (block.kind === 'figure') {
        if (!figures[block.slug]) {
          throw new Error(
            `Guide '${slug}': figure '{figure:${block.slug}}' has no matching frontmatter entry`,
          );
        }
        referencedFigures.add(block.slug);
        continue;
      }
      if (block.kind === 'heading') {
        continue;
      }
      if (block.kind === 'table') {
        for (const cell of block.header.cells) rewriteParagraphNodes(cell.nodes);
        for (const row of block.rows) {
          for (const cell of row.cells) rewriteParagraphNodes(cell.nodes);
        }
        continue;
      }
      if (block.kind === 'list') {
        for (const item of block.items) rewriteParagraphNodes(item.nodes);
        continue;
      }
      if (block.kind === 'blockquote') {
        for (const p of block.paragraphs) rewriteParagraphNodes(p.nodes);
        continue;
      }
      rewriteParagraphNodes(block.nodes);
    }
  }

  if (orphanTerms.size > 0) {
    const list = Array.from(orphanTerms).map((t) => `"${t}"`).join(', ');
    console.warn(
      `[guide:${slug}] Orphan term markers (will render as plain emphasized text): ${list}`,
    );
  }

  for (const term of Object.keys(glossary)) {
    if (!referencedTerms.has(term)) {
      console.warn(`Guide '${slug}': glossary entry '${term}' is defined but never referenced`);
    }
  }
  for (const figSlug of Object.keys(figures)) {
    if (!referencedFigures.has(figSlug)) {
      console.warn(`Guide '${slug}': figure '${figSlug}' is declared but never referenced`);
    }
  }

  const ratio = contrastRatio(frontmatter.accent, LAB_BG_HEX);
  if (ratio < WCAG_AA_MIN) {
    console.warn(
      `Guide '${slug}': accent ${frontmatter.accent} has ${ratio.toFixed(2)}:1 contrast against lab background (below ${WCAG_AA_MIN}:1)`,
    );
  }

  return { slug, frontmatter, sections, glossary, figures };
}
