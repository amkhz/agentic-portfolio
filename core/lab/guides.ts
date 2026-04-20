// ============================================
// SPECULATIVE DESIGN LAB — Guide Manifest
// Build-time glob of core/lab/guides/*.md, parsed into a
// sorted Guide[] array plus a slug lookup. Empty directory
// produces an empty array — lab renders cleanly pre-content.
// ============================================

import type { Guide } from './guide-types';
import { parseGuide } from './parse-guide';

const sources = import.meta.glob<string>('./guides/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function slugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/);
  if (!match) throw new Error(`Cannot derive slug from guide path: ${path}`);
  return match[1];
}

export const guides: Guide[] = Object.entries(sources)
  .map(([path, source]) => parseGuide(source, slugFromPath(path)))
  .sort((a, b) => {
    const ao = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });

export const guidesBySlug: Record<string, Guide> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);
