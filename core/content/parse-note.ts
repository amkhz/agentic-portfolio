// ============================================
// NOTES MARKDOWN PARSER (ADR-015)
// Splits YAML frontmatter from body, validates the note
// frontmatter contract with field-level errors, and runs the
// body through the shared case-study section grammar. Pure:
// no I/O, no DOM. Mirrors the validation posture of
// core/lab/parse-guide.ts but deliberately lighter — notes
// carry no territories, sources, glossary, or figures.
// ============================================

import yaml from 'js-yaml';
import type { Note, NoteFrontmatter } from './note-types';
import { parseCaseStudyMarkdown } from './parse-case-study';

// --- Frontmatter fence ---
// A leading `---\n...\n---` block. Anything before the opening
// fence (there should be nothing) is ignored; everything after the
// closing fence is the body.
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

// --- ISO date (YYYY-MM-DD) ---
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function requireString(value: unknown, field: string, slug: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Note '${slug}': frontmatter field '${field}' must be a non-empty string`);
  }
  return value;
}

function validateFrontmatter(raw: unknown, slug: string): NoteFrontmatter {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error(`Note '${slug}': frontmatter must be a YAML mapping`);
  }
  const data = raw as Record<string, unknown>;

  const title = requireString(data.title, 'title', slug);
  const date = requireString(data.date, 'date', slug);
  if (!ISO_DATE_RE.test(date)) {
    throw new Error(`Note '${slug}': frontmatter field 'date' must be ISO format YYYY-MM-DD (got '${date}')`);
  }
  const summary = requireString(data.summary, 'summary', slug);

  const frontmatter: NoteFrontmatter = { title, date, summary };

  if (data.kicker !== undefined) {
    frontmatter.kicker = requireString(data.kicker, 'kicker', slug);
  }
  if (data.draft !== undefined) {
    if (typeof data.draft !== 'boolean') {
      throw new Error(`Note '${slug}': frontmatter field 'draft' must be a boolean`);
    }
    frontmatter.draft = data.draft;
  }

  return frontmatter;
}

/**
 * Parse a note `.md` source into a typed Note. Throws with a
 * field-level message on a malformed frontmatter or contract violation.
 */
export function parseNote(source: string, slug: string): Note {
  const match = source.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error(`Note '${slug}': missing or malformed YAML frontmatter (expected a leading --- block)`);
  }

  const [, frontmatterYaml, body] = match;

  let parsed: unknown;
  try {
    // JSON_SCHEMA resolves scalars by JSON rules: an unquoted ISO date stays a
    // string (the default schema would coerce it to a Date), booleans stay
    // booleans. Keeps authoring natural — `date: 2026-06-27` needs no quotes.
    parsed = yaml.load(frontmatterYaml, { schema: yaml.JSON_SCHEMA });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(`Note '${slug}': frontmatter YAML failed to parse — ${reason}`);
  }

  const frontmatter = validateFrontmatter(parsed, slug);
  const sections = parseCaseStudyMarkdown(body);

  return { slug, frontmatter, sections };
}
