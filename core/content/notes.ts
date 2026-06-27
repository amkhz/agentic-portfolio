// ============================================
// NOTES — Manifest (ADR-015)
// Build-time glob of core/content/notes/*.md, parsed into a
// reverse-chronological Note[] plus a slug lookup. An empty
// directory produces an empty array — the index renders its
// empty state cleanly before any post is written (T3a infra;
// prose is T3b). Drafts are kept out of the published list in
// production but remain reachable by direct slug in dev.
// ============================================

import type { Note } from './note-types';
import { parseNote } from './parse-note';

const sources = import.meta.glob<string>('./notes/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function slugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/);
  if (!match) throw new Error(`Cannot derive slug from note path: ${path}`);
  return match[1];
}

const isDev = import.meta.env?.DEV ?? false;

// Every parsed note, newest first. Drafts included — the slug lookup
// needs them so a draft is reachable directly in dev.
const allNotes: Note[] = Object.entries(sources)
  .map(([path, source]) => parseNote(source, slugFromPath(path)))
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

/** Published index: drafts hidden in production, shown in dev. */
export const notes: Note[] = allNotes.filter((n) => isDev || !n.frontmatter.draft);

export const notesBySlug: Record<string, Note> = Object.fromEntries(
  allNotes.map((n) => [n.slug, n]),
);
