import { describe, it, expect } from 'vitest';
import { parseNote } from './parse-note';

const VALID = `---
title: "Design infrastructure, not just designs"
date: 2026-06-27
kicker: Manifesto
summary: "Why I build the system a team works in, not the mockups it throws away."
---

## The argument

Most design work ships a picture. The better leverage is shipping the **system**.

![A version-controlled doctrine file open beside an agent terminal](/images/key-agent-terminal.png)
*Doctrine the agent actually reads.*
`;

describe('parseNote', () => {
  it('parses valid frontmatter into a typed Note', () => {
    const note = parseNote(VALID, 'design-infrastructure');
    expect(note.slug).toBe('design-infrastructure');
    expect(note.frontmatter.title).toBe('Design infrastructure, not just designs');
    expect(note.frontmatter.date).toBe('2026-06-27');
    expect(note.frontmatter.kicker).toBe('Manifesto');
    expect(note.frontmatter.summary).toContain('the system');
  });

  it('runs the body through the shared case-study section grammar', () => {
    const note = parseNote(VALID, 'design-infrastructure');
    const types = note.sections.map((s) => s.type);
    expect(types).toContain('text');
    expect(types).toContain('image');
    // The heading on the first text section is the H2.
    const firstText = note.sections.find((s) => s.type === 'text');
    expect(firstText && 'heading' in firstText ? firstText.heading : undefined).toBe('The argument');
  });

  it('defaults draft to undefined when absent', () => {
    const note = parseNote(VALID, 'x');
    expect(note.frontmatter.draft).toBeUndefined();
  });

  it('accepts an explicit draft boolean', () => {
    const src = `---\ntitle: T\ndate: 2026-01-01\nsummary: S\ndraft: true\n---\n\nBody.\n`;
    expect(parseNote(src, 'x').frontmatter.draft).toBe(true);
  });

  it('throws when frontmatter is missing entirely', () => {
    expect(() => parseNote('Just a body, no fence.', 'x')).toThrow(/frontmatter/i);
  });

  it('throws on a missing required field (summary)', () => {
    const src = `---\ntitle: T\ndate: 2026-01-01\n---\n\nBody.\n`;
    expect(() => parseNote(src, 'x')).toThrow(/summary/);
  });

  it('throws on a non-ISO date', () => {
    const src = `---\ntitle: T\ndate: June 27 2026\nsummary: S\n---\n\nBody.\n`;
    expect(() => parseNote(src, 'x')).toThrow(/date/);
  });

  it('throws on a non-boolean draft', () => {
    const src = `---\ntitle: T\ndate: 2026-01-01\nsummary: S\ndraft: yes please\n---\n\nBody.\n`;
    expect(() => parseNote(src, 'x')).toThrow(/draft/);
  });
});
