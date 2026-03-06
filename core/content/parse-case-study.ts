// ============================================
// CASE STUDY MARKDOWN PARSER
// Converts .md files with lightweight conventions
// into CaseStudySection[] for the rendering layer.
// Pattern mirrors core/content/resume.ts.
// ============================================

import type { CaseStudySection } from './case-studies';

// --- Fence block regex ---
// Matches ::: type [optional heading]\n...content...\n:::
const FENCE_RE = /^:::\s*(\w+)\s*(.*)?$/;
const FENCE_CLOSE = /^:::$/;

// --- Image regex ---
// ![alt](src)
// *caption*
// <!-- aspect:16:9 placeholder:description text -->
const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const CAPTION_RE = /^\*([^*]+)\*$/;
const IMAGE_META_RE = /^<!--\s*(.*?)\s*-->$/;

function parseMeta(meta: string): Record<string, string> {
  const result: Record<string, string> = {};

  // Extract aspect (value never contains spaces)
  const aspectMatch = meta.match(/aspect:(\S+)/);
  if (aspectMatch) result.aspect = aspectMatch[1];

  // Extract placeholder (everything after "placeholder:" to end of string)
  const placeholderMatch = meta.match(/placeholder:(.+)/);
  if (placeholderMatch) result.placeholder = placeholderMatch[1].trim();

  return result;
}

function parseMetricsItems(
  lines: string[]
): { value: string; label: string; accent?: 'brass' | 'magenta' }[] {
  return lines
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const parts = line.replace(/^- /, '').split('|').map((p) => p.trim());
      const accent = parts[2] as 'brass' | 'magenta' | undefined;
      return {
        value: parts[0] ?? '',
        label: parts[1] ?? '',
        ...(accent ? { accent } : {}),
      };
    });
}

function parseComparisonSide(lines: string[]): {
  label: string;
  image: { src: string; alt: string; placeholder: string };
  description?: string;
} {
  let label = '';
  let src = '';
  let alt = '';
  let placeholder = '';
  let description: string | undefined;

  for (const line of lines) {
    if (line.startsWith('label:')) {
      label = line.replace('label:', '').trim();
    } else if (line.startsWith('description:')) {
      description = line.replace('description:', '').trim();
    } else if (line.startsWith('placeholder:')) {
      placeholder = line.replace('placeholder:', '').trim();
    } else {
      const imgMatch = line.match(IMAGE_RE);
      if (imgMatch) {
        alt = imgMatch[1];
        src = imgMatch[2];
      }
    }
  }

  return { label, image: { src, alt, placeholder }, ...(description ? { description } : {}) };
}

function parseComparison(
  lines: string[]
): { before: ReturnType<typeof parseComparisonSide>; after: ReturnType<typeof parseComparisonSide> } {
  const beforeIdx = lines.findIndex((l) => l.trim().toLowerCase() === '**before**');
  const afterIdx = lines.findIndex((l) => l.trim().toLowerCase() === '**after**');

  const beforeLines = afterIdx > beforeIdx
    ? lines.slice(beforeIdx + 1, afterIdx)
    : lines.slice(beforeIdx + 1);

  const afterLines = lines.slice(afterIdx + 1);

  return {
    before: parseComparisonSide(beforeLines),
    after: parseComparisonSide(afterLines),
  };
}

function parseQuote(lines: string[]): { text: string; attribution: string; role?: string } {
  const textLines: string[] = [];
  let attribution = '';
  let role: string | undefined;

  for (const line of lines) {
    if (line.startsWith('-- ') || line.startsWith('— ')) {
      const attr = line.replace(/^(?:--|—)\s*/, '');
      const parts = attr.split(',').map((p) => p.trim());
      attribution = parts[0] ?? '';
      role = parts[1];
    } else {
      textLines.push(line);
    }
  }

  return { text: textLines.join('\n'), attribution, ...(role ? { role } : {}) };
}

export function parseCaseStudyMarkdown(markdown: string): CaseStudySection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: CaseStudySection[] = [];

  let currentHeading: string | undefined;
  let textBuffer: string[] = [];

  function flushText() {
    if (textBuffer.length === 0) return;
    const body = textBuffer.join('\n').trim();
    if (body) {
      sections.push({
        type: 'text' as const,
        body,
        ...(currentHeading ? { heading: currentHeading } : {}),
      });
    }
    textBuffer = [];
    currentHeading = undefined;
  }

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // --- Headings ---
    if (line.startsWith('## ')) {
      flushText();
      currentHeading = line.replace('## ', '').trim();
      i++;
      continue;
    }

    // --- Fence blocks ---
    const fenceMatch = line.match(FENCE_RE);
    if (fenceMatch) {
      flushText();
      const fenceType = fenceMatch[1];
      const fenceHeading = fenceMatch[2]?.trim() || undefined;
      const fenceLines: string[] = [];
      i++;
      while (i < lines.length && !FENCE_CLOSE.test(lines[i])) {
        fenceLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::

      switch (fenceType) {
        case 'metrics':
          sections.push({
            type: 'metrics' as const,
            ...(fenceHeading ? { heading: fenceHeading } : {}),
            items: parseMetricsItems(fenceLines),
          });
          break;
        case 'callout':
          sections.push({
            type: 'callout' as const,
            ...(fenceHeading ? { label: fenceHeading } : {}),
            body: fenceLines.join('\n').trim(),
          });
          break;
        case 'quote': {
          const quote = parseQuote(fenceLines);
          sections.push({ type: 'quote' as const, ...quote });
          break;
        }
        case 'comparison': {
          const comp = parseComparison(fenceLines);
          sections.push({
            type: 'comparison' as const,
            ...(fenceHeading ? { heading: fenceHeading } : {}),
            ...comp,
          });
          break;
        }
      }
      continue;
    }

    // --- Images ---
    const imgMatch = line.match(IMAGE_RE);
    if (imgMatch) {
      flushText();
      const alt = imgMatch[1];
      const src = imgMatch[2];
      let caption: string | undefined;
      let aspect: '16:9' | '4:3' | 'auto' | undefined;
      let placeholder = alt; // default placeholder to alt text

      // Check next lines for caption and metadata
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const capMatch = nextLine.match(CAPTION_RE);
        if (capMatch) {
          caption = capMatch[1];
          i++;
        }
      }
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const metaMatch = nextLine.match(IMAGE_META_RE);
        if (metaMatch) {
          const meta = parseMeta(metaMatch[1]);
          if (meta.aspect) aspect = meta.aspect as '16:9' | '4:3' | 'auto';
          if (meta.placeholder) placeholder = meta.placeholder;
          i++;
        }
      }

      sections.push({
        type: 'image' as const,
        src,
        alt,
        placeholder,
        ...(caption ? { caption } : {}),
        ...(aspect ? { aspect } : {}),
      });
      i++;
      continue;
    }

    // --- Regular text ---
    textBuffer.push(line);
    i++;
  }

  flushText();
  return sections;
}
