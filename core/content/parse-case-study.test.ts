import { describe, it, expect } from 'vitest';
import { parseCaseStudyMarkdown } from './parse-case-study';
import type { ListSection } from './case-studies';

describe('parseCaseStudyMarkdown — lists', () => {
  it('parses a consecutive ordered list into one list section', () => {
    const md = [
      'Three beliefs hold the whole thing together:',
      '',
      '1. **Doctrine over prompts.** Encode it once.',
      '2. **The human keeps it honest.** Verify what is true.',
      '3. **Opinionated doctrine is the key.** Take positions.',
    ].join('\n');

    const sections = parseCaseStudyMarkdown(md);

    // The intro line is its own text block; the three items are one list.
    const text = sections.find((s) => s.type === 'text');
    expect(text).toBeDefined();
    const list = sections.find((s) => s.type === 'list') as ListSection;
    expect(list).toBeDefined();
    expect(list.ordered).toBe(true);
    expect(list.items).toHaveLength(3);
    // Marker stripped, inline markdown preserved for the renderer.
    expect(list.items[0]).toBe('**Doctrine over prompts.** Encode it once.');
    expect(list.items[2]).toContain('Take positions.');
  });

  it('parses an unordered list and keeps following prose separate', () => {
    const md = [
      '- first item',
      '- second item',
      '',
      'A closing paragraph.',
    ].join('\n');

    const sections = parseCaseStudyMarkdown(md);
    const list = sections.find((s) => s.type === 'list') as ListSection;
    expect(list.ordered).toBe(false);
    expect(list.items).toEqual(['first item', 'second item']);
    expect(sections.some((s) => s.type === 'text' && s.body === 'A closing paragraph.')).toBe(true);
  });

  it('does not treat a bold-led or italic-caption line as a list', () => {
    const md = '**Snapshot, the flagship.** A net-new tool.';
    const sections = parseCaseStudyMarkdown(md);
    expect(sections.every((s) => s.type !== 'list')).toBe(true);
  });

  it('gives a list the heading that directly precedes it', () => {
    const md = [
      '## Receipts',
      '',
      '- **27 merged pull requests** to the production lending app',
      '- **226 commits** across three months',
    ].join('\n');

    const sections = parseCaseStudyMarkdown(md);
    const list = sections.find((s) => s.type === 'list') as ListSection;
    // Without an owner the heading used to be dropped on the floor, taking its
    // Contents-index entry and its anchor with it.
    expect(list.heading).toBe('Receipts');
    expect(list.items).toHaveLength(2);
  });

  it('leaves the heading on the lead-in paragraph when there is one', () => {
    const md = [
      '## Three decisions',
      '',
      'Three decisions worth naming:',
      '',
      '- first',
      '- second',
    ].join('\n');

    const sections = parseCaseStudyMarkdown(md);
    const text = sections.find((s) => s.type === 'text');
    const list = sections.find((s) => s.type === 'list') as ListSection;
    expect(text && 'heading' in text ? text.heading : undefined).toBe('Three decisions');
    // The heading is already spent; the list must not claim it a second time.
    expect(list.heading).toBeUndefined();
  });
});
