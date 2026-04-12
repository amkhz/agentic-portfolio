import { describe, it, expect } from 'vitest';
import { groupIntoChapters, toKebabId } from './codex';
import type { CaseStudySection } from './case-studies';

describe('toKebabId', () => {
  it('converts heading to kebab-case', () => {
    expect(toKebabId('The Setup')).toBe('the-setup');
    expect(toKebabId('The Color Migration')).toBe('the-color-migration');
    expect(toKebabId('What Came Next')).toBe('what-came-next');
  });

  it('strips special characters', () => {
    expect(toKebabId("It's a Test!")).toBe('its-a-test');
  });
});

describe('groupIntoChapters', () => {
  const textSection = (body: string, heading?: string): CaseStudySection => ({
    type: 'text' as const,
    body,
    ...(heading ? { heading } : {}),
  });

  const imageSection = (): CaseStudySection => ({
    type: 'image' as const,
    src: '/test.png',
    alt: 'test',
    placeholder: 'test placeholder',
  });

  it('puts sections before first heading into preamble', () => {
    const sections: CaseStudySection[] = [
      textSection('Intro paragraph.'),
      imageSection(),
      textSection('Chapter content.', 'Chapter One'),
    ];

    const result = groupIntoChapters(sections, {});
    expect(result.preamble).toHaveLength(2);
    expect(result.chapters).toHaveLength(1);
    expect(result.chapters[0].title).toBe('Chapter One');
  });

  it('groups sections by heading', () => {
    const sections: CaseStudySection[] = [
      textSection('First chapter text.', 'Chapter One'),
      imageSection(),
      textSection('Second chapter text.', 'Chapter Two'),
      imageSection(),
      imageSection(),
    ];

    const result = groupIntoChapters(sections, {});
    expect(result.preamble).toHaveLength(0);
    expect(result.chapters).toHaveLength(2);
    expect(result.chapters[0].sections).toHaveLength(2);
    expect(result.chapters[1].sections).toHaveLength(3);
  });

  it('generates kebab-case ids from headings', () => {
    const sections: CaseStudySection[] = [
      textSection('Content.', 'The Color Migration'),
      textSection('More content.', 'What Came Next'),
    ];

    const result = groupIntoChapters(sections, {});
    expect(result.chapters[0].id).toBe('the-color-migration');
    expect(result.chapters[1].id).toBe('what-came-next');
  });

  it('derives default inscription from first text section', () => {
    const sections: CaseStudySection[] = [
      textSection('The original token system used hex values. More details follow.', 'The Color Migration'),
    ];

    const result = groupIntoChapters(sections, {});
    expect(result.chapters[0].inscription).toBe('The original token system used hex values.');
  });

  it('applies overrides', () => {
    const sections: CaseStudySection[] = [
      textSection('Content here.', 'The Setup'),
    ];

    const overrides = {
      'the-setup': {
        inscription: 'Custom inscription.',
        glyph: 'compass',
        connections: ['the-build'],
      },
    };

    const result = groupIntoChapters(sections, overrides);
    expect(result.chapters[0].inscription).toBe('Custom inscription.');
    expect(result.chapters[0].glyph).toBe('compass');
    expect(result.chapters[0].connections).toEqual(['the-build']);
  });

  it('handles empty input', () => {
    const result = groupIntoChapters([], {});
    expect(result.preamble).toHaveLength(0);
    expect(result.chapters).toHaveLength(0);
  });

  it('handles all-preamble input (no headings)', () => {
    const sections: CaseStudySection[] = [
      textSection('Just text.'),
      imageSection(),
    ];

    const result = groupIntoChapters(sections, {});
    expect(result.preamble).toHaveLength(2);
    expect(result.chapters).toHaveLength(0);
  });
});
