import { describe, it, expect } from 'vitest';
import { caseStudyContent, type CaseStudySection } from './case-studies';
import { caseStudies, metaCaseStudy } from '../tokens/index';

const VALID_SECTION_TYPES: CaseStudySection['type'][] = [
  'text',
  'image',
  'metrics',
  'comparison',
  'quote',
  'callout',
];

// ============================================
// Cross-reference: tokens slugs vs content slugs
// ============================================

describe('case study content coverage', () => {
  it('caseStudyContent is a non-empty object', () => {
    expect(Object.keys(caseStudyContent).length).toBeGreaterThan(0);
  });

  it('every slug in caseStudies has matching content', () => {
    for (const cs of caseStudies) {
      expect(
        caseStudyContent,
        `Missing content for slug "${cs.slug}"`
      ).toHaveProperty(cs.slug);
    }
  });

  it('metaCaseStudy slug has matching content', () => {
    expect(
      caseStudyContent,
      `Missing content for meta slug "${metaCaseStudy.slug}"`
    ).toHaveProperty(metaCaseStudy.slug);
  });
});

// ============================================
// Content structure validation
// ============================================

describe('case study content structure', () => {
  const contentEntries = Object.entries(caseStudyContent);

  it.each(contentEntries)(
    '"%s" has a non-empty sections array',
    (_slug, sections) => {
      expect(Array.isArray(sections)).toBe(true);
      expect(sections.length).toBeGreaterThan(0);
    }
  );

  it.each(contentEntries)(
    '"%s" sections all have valid type values',
    (_slug, sections) => {
      for (const section of sections) {
        expect(
          VALID_SECTION_TYPES,
          `Invalid section type "${section.type}" in slug "${_slug}"`
        ).toContain(section.type);
      }
    }
  );
});

// ============================================
// Section type-specific validation
// ============================================

describe('section type contracts', () => {
  const allSections = Object.entries(caseStudyContent).flatMap(
    ([slug, sections]) => sections.map((s) => ({ slug, ...s }))
  );

  const textSections = allSections.filter((s) => s.type === 'text');
  const imageSections = allSections.filter((s) => s.type === 'image');
  const metricsSections = allSections.filter((s) => s.type === 'metrics');
  const comparisonSections = allSections.filter((s) => s.type === 'comparison');
  const quoteSections = allSections.filter((s) => s.type === 'quote');
  const calloutSections = allSections.filter((s) => s.type === 'callout');

  it('text sections have a body string', () => {
    for (const s of textSections) {
      expect(typeof (s as { body: string }).body).toBe('string');
      expect((s as { body: string }).body.length).toBeGreaterThan(0);
    }
  });

  it('image sections have src, alt, and placeholder', () => {
    for (const s of imageSections) {
      const img = s as { src: string; alt: string; placeholder: string };
      expect(img.src).toBeTruthy();
      expect(img.alt).toBeTruthy();
      expect(img.placeholder).toBeTruthy();
    }
  });

  it('metrics sections have a non-empty items array', () => {
    for (const s of metricsSections) {
      const m = s as { items: { value: string; label: string }[] };
      expect(Array.isArray(m.items)).toBe(true);
      expect(m.items.length).toBeGreaterThan(0);
      for (const item of m.items) {
        expect(item.value).toBeTruthy();
        expect(item.label).toBeTruthy();
      }
    }
  });

  it('comparison sections have before and after with images', () => {
    for (const s of comparisonSections) {
      const c = s as {
        before: { label: string; image: { src: string; alt: string } };
        after: { label: string; image: { src: string; alt: string } };
      };
      expect(c.before).toBeDefined();
      expect(c.after).toBeDefined();
      expect(c.before.label).toBeTruthy();
      expect(c.after.label).toBeTruthy();
      expect(c.before.image.src).toBeTruthy();
      expect(c.after.image.src).toBeTruthy();
    }
  });

  it('quote sections have text and attribution', () => {
    for (const s of quoteSections) {
      const q = s as { text: string; attribution: string };
      expect(q.text).toBeTruthy();
      expect(q.attribution).toBeTruthy();
    }
  });

  it('callout sections have a body string', () => {
    for (const s of calloutSections) {
      const c = s as { body: string };
      expect(c.body).toBeTruthy();
    }
  });
});
