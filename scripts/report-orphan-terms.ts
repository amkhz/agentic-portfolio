/**
 * Orphan-terms audit. Walks every .md guide in core/lab/guides/,
 * runs it through parse-guide, captures the orphan-term warnings
 * the parser emits, and writes a timestamped report file into
 * vector/audits/ that is shaped to be pasted straight into the
 * external authoring Claude project. Re-running overwrites today's
 * report; older dated reports stay on disk as a history trail.
 *
 * Usage:  npm run audit:orphans
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseGuide } from '../core/lab/parse-guide.ts';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const guidesDir = join(repoRoot, 'core', 'lab', 'guides');
const auditsDir = join(repoRoot, 'vector', 'audits');

function collectOrphans(): Map<string, string[]> {
  const files = readdirSync(guidesDir).filter((f) => f.endsWith('.md'));
  const orphansByGuide = new Map<string, string[]>();

  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const line = args.map((a) => String(a)).join(' ');
    const match = line.match(/^\[guide:([^\]]+)\] Orphan term markers [^:]+: (.+)$/);
    if (!match) return;
    const slug = match[1];
    const terms = match[2]
      .split(',')
      .map((s) => s.trim().replace(/^"|"$/g, ''))
      .filter(Boolean);
    orphansByGuide.set(slug, terms);
  };

  try {
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const source = readFileSync(join(guidesDir, file), 'utf8');
      parseGuide(source, slug);
    }
  } finally {
    console.warn = originalWarn;
  }

  return orphansByGuide;
}

function formatReport(orphansByGuide: Map<string, string[]>, date: string): string {
  const lines: string[] = [];
  lines.push(`# Orphan terms report — ${date}`);
  lines.push('');

  if (orphansByGuide.size === 0) {
    lines.push('No orphan terms in any guide. Nothing to do.');
    lines.push('');
    return lines.join('\n');
  }

  lines.push('## Prompt for Claude project');
  lines.push('');
  lines.push(
    'The following terms are used in guide bodies with `|term|` markers but have no glossary definition. For each term, provide a 1–3 sentence definition suitable for a research guide reader. Return the results as YAML, grouped by guide slug, ready to paste into each guide\'s frontmatter `glossary:` block.',
  );
  lines.push('');
  lines.push('## Orphans by guide');
  lines.push('');
  const sortedSlugs = Array.from(orphansByGuide.keys()).sort();
  for (const slug of sortedSlugs) {
    lines.push(`### ${slug}`);
    const terms = orphansByGuide.get(slug) ?? [];
    for (const term of terms) {
      lines.push(`- ${term}`);
    }
    lines.push('');
  }

  lines.push('## Target format (for your response)');
  lines.push('');
  lines.push('```yaml');
  for (const slug of sortedSlugs) {
    lines.push(`${slug}:`);
    const terms = orphansByGuide.get(slug) ?? [];
    for (const term of terms) {
      lines.push(`  ${term}: "..."`);
    }
  }
  lines.push('```');
  lines.push('');
  return lines.join('\n');
}

function main() {
  const orphansByGuide = collectOrphans();
  const date = new Date().toISOString().slice(0, 10);
  const outPath = join(auditsDir, `orphan-terms-${date}.md`);

  mkdirSync(auditsDir, { recursive: true });
  writeFileSync(outPath, formatReport(orphansByGuide, date));

  const totalTerms = Array.from(orphansByGuide.values()).reduce(
    (sum, terms) => sum + terms.length,
    0,
  );
  console.log(
    `✓ wrote ${outPath} — ${totalTerms} orphan term${totalTerms === 1 ? '' : 's'} across ${orphansByGuide.size} guide${orphansByGuide.size === 1 ? '' : 's'}`,
  );
}

main();
