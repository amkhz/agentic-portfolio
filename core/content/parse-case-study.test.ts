import { describe, it, expect } from 'vitest';
import { parseCaseStudyMarkdown } from './parse-case-study';
import type { ListSection } from './case-studies';
import docReview from './instant-doc-review.md?raw';
import sow from './instant-sow.md?raw';

describe('image plate metadata', () => {
  it('reads plate:dark before the full placeholder', () => {
    expect(parseCaseStudyMarkdown('![Diagram](/images/before-flow.png)\n*Caption*\n<!-- aspect:16:9 plate:dark placeholder:Original placeholder -->'))
      .toEqual([{ type: 'image', src: '/images/before-flow.png', alt: 'Diagram',
        caption: 'Caption', aspect: '16:9', plate: 'dark', placeholder: 'Original placeholder' }]);
  });
  it.each(['', '<!-- aspect:16:9 -->', '<!-- plate:light -->',
    '<!-- placeholder:Instructions mentioning plate:dark -->'])(
  'ignores absent or unsupported directives: %s', (meta) => {
    expect(parseCaseStudyMarkdown(`![Diagram](/images/diagram.png)\n${meta}`)[0]).not.toHaveProperty('plate');
  });
  it.each([
    ['instant-doc-review', '/images/before-flow.png', docReview],
    ['instant-sow', '/images/sow-flow-diagram.png', sow],
    ['instant-sow', '/images/detail-ops.png', sow],
  ])('plates the ruled figure in %s: %s', (_page, src, markdown) => {
    expect(parseCaseStudyMarkdown(markdown).filter(s => s.type === 'image' && s.src === src))
      .toEqual([expect.objectContaining({ type: 'image', src, aspect: '16:9', plate: 'dark' })]);
  });
});

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
});
