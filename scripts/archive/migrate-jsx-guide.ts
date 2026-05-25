/**
 * One-time migration: JSX research guide → markdown + frontmatter.
 *
 * Converts the legacy /Users/300mhz/projects/design-futures/learning-guides/*.jsx
 * format (const SECTIONS = [...] + a top-level React component rendering a header)
 * into a .md file matching the schema the lab parser (core/lab/parse-guide.ts)
 * expects.
 *
 * Usage:
 *   npx tsx scripts/migrate-jsx-guide.ts <input.jsx> <output.md> \
 *     --territory T1 \
 *     --status draft \
 *     --description "Short guide description." \
 *     [--order 1] [--kicker "Research Guide Series"]
 *
 * Extraction strategy:
 *   - `const SECTIONS = [...]` is an array of plain object literals; walk the AST
 *     and rebuild it as a JS value. Mechanical, lossless.
 *   - Header fields (title, source citation, accent, kicker fallback) are scanned
 *     out of the JSX tree: the first <h1> yields the title; its sibling text
 *     yields the source line; the first 6-digit hex color used in the header
 *     block is the accent; the uppercase-letter-spaced kicker text becomes the
 *     default kicker.
 *
 * Not shipped at runtime — dev-only tsx script.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import type { NodePath } from '@babel/traverse';

// @babel/traverse ships CJS with a nested default under some ESM interop paths.
// Unwrap so the call site stays simple regardless of runtime.
const traverse = (
  (traverseModule as unknown as { default?: typeof traverseModule }).default ?? traverseModule
) as typeof traverseModule;
import type {
  ArrayExpression,
  Expression,
  JSXElement,
  JSXText,
  Node,
  ObjectExpression,
  TemplateLiteral,
  VariableDeclarator,
} from '@babel/types';

// --- CLI arg parsing --------------------------------------------------------

interface CliArgs {
  input: string;
  output: string;
  territory: string;
  status: string;
  description: string;
  kicker?: string;
  order?: number;
}

function parseArgs(argv: string[]): CliArgs {
  const positional: string[] = [];
  const flags = new Map<string, string>();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      flags.set(a.slice(2), argv[++i] ?? '');
    } else {
      positional.push(a);
    }
  }
  const [input, output] = positional;
  if (!input || !output) {
    console.error(
      'usage: migrate-jsx-guide.ts <input.jsx> <output.md> --territory T1|T2|T3|T4 --status draft|in-progress|complete --description "..." [--kicker "..."] [--order N]',
    );
    process.exit(1);
  }
  const territory = flags.get('territory');
  const status = flags.get('status');
  const description = flags.get('description');
  if (!territory || !status || !description) {
    console.error('missing required flag: --territory, --status, and --description are required');
    process.exit(1);
  }
  const order = flags.has('order') ? Number(flags.get('order')) : undefined;
  const kicker = flags.get('kicker');
  return { input, output, territory, status, description, kicker, order };
}

// --- AST helpers ------------------------------------------------------------

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };

function literalFromTemplate(node: TemplateLiteral): string {
  if (node.expressions.length > 0) {
    throw new Error('template literal with expressions not supported in guide data');
  }
  return node.quasis.map((q) => q.value.cooked ?? q.value.raw).join('');
}

function evalExpression(node: Expression): JsonValue {
  switch (node.type) {
    case 'StringLiteral':
      return node.value;
    case 'NumericLiteral':
      return node.value;
    case 'BooleanLiteral':
      return node.value;
    case 'NullLiteral':
      return null;
    case 'TemplateLiteral':
      return literalFromTemplate(node);
    case 'ArrayExpression':
      return (node.elements as (Expression | null)[]).map((el) => {
        if (!el) throw new Error('holes in arrays not supported');
        return evalExpression(el);
      });
    case 'ObjectExpression':
      return evalObject(node);
    default:
      throw new Error(`unsupported expression type in guide data: ${node.type}`);
  }
}

function evalObject(node: ObjectExpression): Record<string, JsonValue> {
  const result: Record<string, JsonValue> = {};
  for (const prop of node.properties) {
    if (prop.type !== 'ObjectProperty') {
      throw new Error(`unsupported object property type: ${prop.type}`);
    }
    const key = prop.key;
    let name: string;
    if (key.type === 'Identifier') name = key.name;
    else if (key.type === 'StringLiteral') name = key.value;
    else throw new Error(`unsupported object key type: ${key.type}`);
    result[name] = evalExpression(prop.value as Expression);
  }
  return result;
}

// --- SECTIONS extraction ----------------------------------------------------

interface SourceSection {
  id: string;
  title: string;
  icon?: string;
  paragraphs: Array<{ text: string; terms: Record<string, string> }>;
}

function extractSections(ast: Node): SourceSection[] {
  let sectionsNode: ArrayExpression | null = null;
  traverse(ast, {
    VariableDeclarator(path: NodePath<VariableDeclarator>) {
      const id = path.node.id;
      if (id.type !== 'Identifier' || id.name !== 'SECTIONS') return;
      const init = path.node.init;
      if (init?.type === 'ArrayExpression') sectionsNode = init;
    },
  });
  if (!sectionsNode) throw new Error('could not find `const SECTIONS = [...]` in the guide');
  const raw = evalExpression(sectionsNode) as unknown as SourceSection[];
  return raw.map((s) => ({
    id: s.id,
    title: s.title,
    icon: s.icon,
    paragraphs: (s.paragraphs ?? []).map((p) => ({
      text: p.text ?? '',
      terms: p.terms ?? {},
    })),
  }));
}

// --- Header extraction ------------------------------------------------------

function jsxText(element: JSXElement): string {
  const parts: string[] = [];
  for (const child of element.children) {
    if (child.type === 'JSXText') parts.push((child as JSXText).value);
    else if (child.type === 'JSXExpressionContainer') {
      const exp = child.expression;
      if (exp.type === 'StringLiteral') parts.push(exp.value);
      else if (exp.type === 'TemplateLiteral') parts.push(literalFromTemplate(exp));
    } else if (child.type === 'JSXElement') {
      parts.push(jsxText(child));
    }
  }
  return parts.join('').replace(/\s+/g, ' ').trim();
}

interface Header {
  title: string;
  source: string;
  accent: string;
  kicker?: string;
}

function extractHeader(ast: Node): Header {
  let h1: JSXElement | null = null;
  let h1Parent: JSXElement | null = null;
  traverse(ast, {
    JSXElement(path: NodePath<JSXElement>) {
      if (h1) return;
      const name = path.node.openingElement.name;
      if (name.type === 'JSXIdentifier' && name.name === 'h1') {
        h1 = path.node;
        const parent = path.parentPath.node;
        if (parent.type === 'JSXElement') h1Parent = parent;
      }
    },
  });
  if (!h1) throw new Error('could not find <h1> in the guide JSX');

  const title = jsxText(h1);

  // Source: the first non-empty text sibling that appears after the h1 in the same parent.
  let source = '';
  if (h1Parent) {
    const children = (h1Parent as JSXElement).children;
    const h1Index = children.indexOf(h1);
    for (let i = h1Index + 1; i < children.length; i++) {
      const c = children[i];
      if (c.type !== 'JSXElement') continue;
      const text = jsxText(c as JSXElement);
      if (!text) continue;
      // Skip obvious instruction lines ("Click any underlined term...").
      if (/click any/i.test(text)) continue;
      source = text;
      break;
    }
  }

  // Kicker: first non-empty text sibling before the h1.
  let kicker: string | undefined;
  if (h1Parent) {
    const children = (h1Parent as JSXElement).children;
    const h1Index = children.indexOf(h1);
    for (let i = 0; i < h1Index; i++) {
      const c = children[i];
      if (c.type !== 'JSXElement') continue;
      const text = jsxText(c as JSXElement);
      if (!text) continue;
      kicker = text;
      break;
    }
  }

  // Accent: pick the hex that best matches a real accent — non-neutral,
  // not too dark (would be invisible on the lab's dark background), and
  // preferring repeated occurrences (an accent tends to be used multiple
  // times while a one-off background is rare).
  //
  // Without this luminance + frequency filter, the first DIRD migration
  // picked up the page background (#0d1620, ~1:1 contrast) and shipped
  // four guides with invisible accents. The frequency tally catches what
  // the neutrals-list couldn't.
  const accent = pickAccent(ast) ?? '#c8956a';

  return { title, source, accent, kicker };
}

const KNOWN_NEUTRALS = new Set([
  '#0d1520', '#0d1620', '#1a2636', '#141e2c', '#0a1018', '#2a3a4a',
  '#4a5a6a', '#e8edf2', '#c0ccd8', '#a0b0c0', '#8090a0', '#708090',
  '#607080', '#5a6a7a',
]);

// Minimum relative luminance for a hex to be considered accent-eligible.
// 0.05 ≈ any color darker than #3a3a3a — below that the hex is almost
// certainly a background or subtle border, not an accent.
const MIN_ACCENT_LUMINANCE = 0.05;

function hexLuminance(hex: string): number {
  const m = hex.match(/^#?([0-9a-fA-F]{6})$/);
  if (!m) return 0;
  const v = m[1];
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(parseInt(v.slice(0, 2), 16));
  const g = toLinear(parseInt(v.slice(2, 4), 16));
  const b = toLinear(parseInt(v.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function pickAccent(ast: Node): string | null {
  const counts = new Map<string, number>();
  traverse(ast, {
    StringLiteral(path) {
      const v = path.node.value;
      if (!/^#[0-9a-fA-F]{6}$/.test(v)) return;
      const hex = v.toLowerCase();
      if (KNOWN_NEUTRALS.has(hex)) return;
      if (hexLuminance(hex) < MIN_ACCENT_LUMINANCE) return;
      counts.set(hex, (counts.get(hex) ?? 0) + 1);
    },
  });
  if (counts.size === 0) return null;
  // Highest count wins; ties broken by first occurrence (insertion order).
  let best: string | null = null;
  let bestCount = 0;
  for (const [hex, count] of counts) {
    if (count > bestCount) {
      best = hex;
      bestCount = count;
    }
  }
  return best;
}

// --- Source citation parsing ------------------------------------------------

interface ParsedSource {
  authors: string;
  venue: string;
  year: number;
}

function parseSource(raw: string): ParsedSource {
  // Observed format: "Authors · Venue · Month Year" (also "·" may be "|" or "—").
  const parts = raw.split(/\s*[·|—]\s*/).map((s) => s.trim()).filter(Boolean);
  const authors = parts[0] ?? 'Unknown';
  const venue = parts[1] ?? 'Unknown';
  const datePart = parts[2] ?? parts.slice(1).join(' ');
  const yearMatch = datePart.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear();
  return { authors, venue, year };
}

// --- Markdown emission ------------------------------------------------------

function yamlString(value: string): string {
  const needsQuote = /[:#"'\\\n]|^[\s-]|\s$/.test(value);
  if (!needsQuote) return value;
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"${escaped}"`;
}

function emit(header: Header, args: CliArgs, sections: SourceSection[]): string {
  // Dedupe terms across paragraphs into a single glossary.
  const glossary = new Map<string, string>();
  const conflicts = new Set<string>();
  for (const sec of sections) {
    for (const p of sec.paragraphs) {
      for (const [term, def] of Object.entries(p.terms)) {
        if (glossary.has(term) && glossary.get(term) !== def) {
          conflicts.add(term);
        }
        glossary.set(term, def);
      }
    }
  }
  for (const term of conflicts) {
    console.warn(`  note: term '${term}' had multiple definitions in source — kept last occurrence`);
  }

  const slug = args.output.replace(/^.*\//, '').replace(/\.md$/, '');
  const parsedSource = parseSource(header.source);

  const front: string[] = [];
  front.push('---');
  front.push(`id: ${slug}`);
  front.push(`title: ${yamlString(header.title)}`);
  front.push(`kicker: ${yamlString(args.kicker ?? header.kicker ?? 'Research Guide Series')}`);
  front.push(`source:`);
  front.push(`  authors: ${yamlString(parsedSource.authors)}`);
  front.push(`  year: ${parsedSource.year}`);
  front.push(`  venue: ${yamlString(parsedSource.venue)}`);
  front.push(`accent: ${yamlString(header.accent)}`);
  front.push(`territory: ${args.territory}`);
  front.push(`status: ${args.status}`);
  if (args.order !== undefined) front.push(`order: ${args.order}`);
  front.push(`description: ${yamlString(args.description)}`);
  front.push(`figures: []`);
  if (glossary.size === 0) {
    front.push(`glossary: {}`);
  } else {
    front.push(`glossary:`);
    for (const [term, def] of glossary) {
      front.push(`  ${yamlString(term)}: ${yamlString(def)}`);
    }
  }
  front.push('---');
  front.push('');

  const body: string[] = [];
  for (const sec of sections) {
    const icon = sec.icon ? `${sec.icon} ` : '';
    body.push(`## ${icon}${sec.title} {#${sec.id}}`);
    body.push('');
    for (const p of sec.paragraphs) {
      body.push(p.text.trim());
      body.push('');
    }
  }

  return [...front, ...body].join('\n').trimEnd() + '\n';
}

// --- Main -------------------------------------------------------------------

function main() {
  const args = parseArgs(process.argv.slice(2));
  const source = readFileSync(args.input, 'utf8');
  const ast = parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  const sections = extractSections(ast);
  const header = extractHeader(ast);
  const md = emit(header, args, sections);
  mkdirSync(dirname(args.output), { recursive: true });
  writeFileSync(args.output, md);
  console.log(
    `✓ wrote ${args.output} — ${sections.length} sections, ${md.split('\n').length} lines`,
  );
}

main();
