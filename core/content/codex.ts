// ============================================
// CODEX — Chapter grouping for spine layout
// Groups parsed CaseStudySection[] into chapters
// derived from ## headings. Pure function, no DOM.
// ============================================

import type { CaseStudySection } from './case-studies';

export interface CodexChapter {
  id: string;
  title: string;
  inscription?: string;
  glyph?: string;
  connections?: string[];
  sections: CaseStudySection[];
}

export interface CodexResult {
  preamble: CaseStudySection[];
  chapters: CodexChapter[];
}

/** Per-chapter overrides for inscriptions, glyphs, and connections. */
export const codexOverrides: Record<
  string,
  Partial<Pick<CodexChapter, 'inscription' | 'glyph' | 'connections'>>
> = {
  'the-setup': {
    inscription: 'Two hours of planning before a single line of code.',
    connections: ['the-build', 'the-agentic-workflow'],
  },
  'the-build': {
    inscription: 'Tokens first. Skeleton to styled scaffold in one evening.',
    connections: ['the-setup', 'the-friction'],
  },
  'the-friction': {
    inscription: 'Content and tokens are different concerns. Course-correct early.',
    connections: ['the-build'],
  },
  'what-came-next': {
    inscription: 'The sprint shipped a portfolio. The project kept evolving.',
  },
  'the-color-migration': {
    inscription: 'From magic numbers to a system you can read.',
    connections: ['the-framework-migration'],
  },
  'the-framework-migration': {
    inscription: 'A full kitchen for making toast. Time to simplify.',
    connections: ['the-color-migration', 'the-agentic-workflow'],
  },
  'the-agentic-workflow': {
    inscription: 'Crew members with skill sets, not magic text boxes.',
    connections: ['the-setup', 'the-framework-migration'],
  },
};

/** Convert a heading string to a kebab-case id. */
export function toKebabId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Extract first sentence from a text body for default inscription. */
function extractFirstSentence(body: string): string {
  const cleaned = body.replace(/\n/g, ' ').trim();
  const match = cleaned.match(/^(.+?[.!?])\s/);
  return match ? match[1] : cleaned.slice(0, 120);
}

/**
 * Group flat CaseStudySection[] into preamble + chapters.
 * Sections before the first heading go into preamble.
 * Each section with a heading starts a new chapter.
 */
export function groupIntoChapters(
  sections: CaseStudySection[],
  overrides: Record<string, Partial<Pick<CodexChapter, 'inscription' | 'glyph' | 'connections'>>> = codexOverrides,
): CodexResult {
  const preamble: CaseStudySection[] = [];
  const chapters: CodexChapter[] = [];
  let current: CodexChapter | null = null;

  for (const section of sections) {
    // Only text sections with headings start new chapters.
    // Metrics, comparison, and other section types may have
    // heading fields but those are sub-headings within a chapter.
    const heading =
      section.type === 'text' && 'heading' in section && typeof section.heading === 'string' && section.heading.length > 0
        ? section.heading
        : null;

    if (heading) {
      // Flush previous chapter
      if (current) chapters.push(current);

      const id = toKebabId(heading);
      const chapterOverrides = overrides[id];

      current = {
        id,
        title: heading,
        sections: [section],
        ...chapterOverrides,
      };
    } else if (current) {
      current.sections.push(section);
    } else {
      preamble.push(section);
    }
  }

  // Flush last chapter
  if (current) chapters.push(current);

  // Derive default inscriptions for chapters that don't have one
  for (const chapter of chapters) {
    if (!chapter.inscription) {
      const firstText = chapter.sections.find(
        (s): s is Extract<CaseStudySection, { type: 'text' }> => s.type === 'text',
      );
      if (firstText) {
        chapter.inscription = extractFirstSentence(firstText.body);
      }
    }
  }

  return { preamble, chapters };
}
