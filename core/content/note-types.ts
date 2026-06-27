// ============================================
// NOTES CONTENT — Types (ADR-015)
// Pure type definitions for the portfolio's short-form
// writing surface. Parser (parse-note.ts) produces these
// shapes from frontmatter .md files; the registry (notes.ts)
// globs and sorts them; src/pages/ renders them. The body
// reuses the case-study section grammar, so a note renders
// through the same renderSection pipeline as a case study.
// ============================================

import type { CaseStudySection } from './case-studies';

// Canonical note frontmatter (validated at parse time).
export interface NoteFrontmatter {
  /** Display title. One per note; renders as the page h1. */
  title: string;
  /** ISO date (YYYY-MM-DD). Drives reverse-chronological ordering. */
  date: string;
  /** One- or two-sentence dek shown on the index and as meta description. */
  summary: string;
  /** Mono kicker above the title (metadata register). Optional. */
  kicker?: string;
  /** When true, the note is excluded from the published index in
   *  production builds. Lets a post live in the repo before it ships. */
  draft?: boolean;
}

// Fully parsed note, ready for render.
export interface Note {
  slug: string;
  frontmatter: NoteFrontmatter;
  /** Body parsed through the shared case-study section grammar. */
  sections: CaseStudySection[];
}
