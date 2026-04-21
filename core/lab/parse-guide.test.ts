import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { contrastRatio, parseGuide } from './parse-guide';

const VALID_SOURCE = `---
id: sample-guide
title: "Sample Guide"
kicker: "Research Guide Series"
source:
  authors: "Author et al."
  year: 2025
  venue: "arXiv:0000.00000"
  url: "https://arxiv.org/abs/0000.00000"
accent: "#4ade80"
territory: T4
status: draft
order: 1
description: "A short description."
figures:
  - slug: fig-one
    file: fig-one.jpg
    caption: "First figure"
    alt: "Description of first figure"
glossary:
  ambiguity: "A data point that resists immediate explanation."
  anomaly: "A statistically significant departure from baseline."
---

## 🎯 Overview {#overview}

Paragraph with an |ambiguity| and a **bold phrase**.

{figure:fig-one}

## 🛰 Hardware

Second section referencing |anomaly| and |ambiguity|.
`;

describe('parseGuide', () => {
  let warn: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    warn.mockRestore();
  });

  it('parses a well-formed guide', () => {
    const guide = parseGuide(VALID_SOURCE, 'sample-guide');
    expect(guide.slug).toBe('sample-guide');
    expect(guide.frontmatter.title).toBe('Sample Guide');
    expect(guide.frontmatter.territory).toBe('T4');
    expect(guide.frontmatter.status).toBe('draft');
    expect(guide.frontmatter.accent).toBe('#4ade80');
    expect(guide.frontmatter.source.year).toBe(2025);
    expect(Object.keys(guide.figures)).toEqual(['fig-one']);
    expect(Object.keys(guide.glossary).sort()).toEqual(['ambiguity', 'anomaly']);
  });

  it('splits leading emoji icons out of section headings', () => {
    const guide = parseGuide(VALID_SOURCE, 'sample-guide');
    expect(guide.sections).toHaveLength(2);
    expect(guide.sections[0]).toMatchObject({
      id: 'overview',
      heading: 'Overview',
      icon: '🎯',
    });
    expect(guide.sections[1]).toMatchObject({
      id: 'hardware',
      heading: 'Hardware',
      icon: '🛰',
    });
  });

  it('parses inline term and bold markers', () => {
    const guide = parseGuide(VALID_SOURCE, 'sample-guide');
    const paragraph = guide.sections[0].blocks[0];
    expect(paragraph.kind).toBe('paragraph');
    if (paragraph.kind !== 'paragraph') return;
    const kinds = paragraph.nodes.map((n) => n.kind);
    expect(kinds).toEqual(['text', 'term', 'text', 'bold', 'text']);
    const term = paragraph.nodes.find((n) => n.kind === 'term');
    expect(term && term.kind === 'term' && term.term).toBe('ambiguity');
  });

  it('splits term markers out of a surrounding bold run', () => {
    const source = VALID_SOURCE.replace(
      'Paragraph with an |ambiguity| and a **bold phrase**.',
      '**The |ambiguity| is the point:** trailing text.',
    );
    const guide = parseGuide(source, 'bold-nested');
    const paragraph = guide.sections[0].blocks[0];
    expect(paragraph.kind).toBe('paragraph');
    if (paragraph.kind !== 'paragraph') return;
    const kinds = paragraph.nodes.map((n) => n.kind);
    expect(kinds).toEqual(['bold', 'term', 'bold', 'text']);
    expect(paragraph.nodes[0].kind === 'bold' && paragraph.nodes[0].value).toBe('The ');
    expect(paragraph.nodes[1].kind === 'term' && paragraph.nodes[1].term).toBe('ambiguity');
    expect(paragraph.nodes[2].kind === 'bold' && paragraph.nodes[2].value).toBe(' is the point:');
  });

  it('emits figure references as their own blocks', () => {
    const guide = parseGuide(VALID_SOURCE, 'sample-guide');
    const figureBlock = guide.sections[0].blocks[1];
    expect(figureBlock.kind).toBe('figure');
    if (figureBlock.kind === 'figure') {
      expect(figureBlock.slug).toBe('fig-one');
    }
  });

  it('degrades orphan |term| markers to bold nodes and warns', () => {
    const bad = VALID_SOURCE.replace('|ambiguity|', '|missing-term|');
    const guide = parseGuide(bad, 'orphan-guide');
    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/orphan-guide.*Orphan.*missing-term/i),
    );
    const paragraph = guide.sections[0].blocks[0];
    expect(paragraph.kind).toBe('paragraph');
    if (paragraph.kind !== 'paragraph') return;
    const bold = paragraph.nodes.find((n) => n.kind === 'bold' && n.value === 'missing-term');
    expect(bold).toBeDefined();
    const stillAsTerm = paragraph.nodes.find(
      (n) => n.kind === 'term' && n.term === 'missing-term',
    );
    expect(stillAsTerm).toBeUndefined();
  });

  it('throws when a figure reference has no frontmatter entry', () => {
    const bad = VALID_SOURCE.replace('{figure:fig-one}', '{figure:fig-missing}');
    expect(() => parseGuide(bad, 'bad-guide')).toThrow(/fig-missing/);
  });

  it('throws when territory is invalid', () => {
    const bad = VALID_SOURCE.replace('territory: T4', 'territory: T9');
    expect(() => parseGuide(bad, 'bad-guide')).toThrow(/territory/);
  });

  it('throws when accent is not a 6-digit hex', () => {
    const bad = VALID_SOURCE.replace('accent: "#4ade80"', 'accent: "green"');
    expect(() => parseGuide(bad, 'bad-guide')).toThrow(/accent/);
  });

  it('warns when a glossary entry is never referenced', () => {
    const withUnused = VALID_SOURCE.replace(
      'glossary:\n  ambiguity:',
      'glossary:\n  unused: "never used"\n  ambiguity:',
    );
    parseGuide(withUnused, 'sample-guide');
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/unused/));
  });

  it('warns when accent contrast falls below 4.5:1 on lab background', () => {
    const low = VALID_SOURCE.replace('accent: "#4ade80"', 'accent: "#222222"');
    parseGuide(low, 'low-contrast');
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/contrast/));
  });

  it('handles headings without explicit anchors by slugifying', () => {
    const guide = parseGuide(VALID_SOURCE, 'sample-guide');
    expect(guide.sections[1].id).toBe('hardware');
  });
});

describe('contrastRatio', () => {
  it('is symmetric and scales correctly', () => {
    const light = contrastRatio('#ffffff', '#000000');
    expect(light).toBeCloseTo(21, 0);
    const same = contrastRatio('#4ade80', '#4ade80');
    expect(same).toBeCloseTo(1, 5);
  });
});
