// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import type {
  BlockquoteBlock,
  BlockquoteVariant,
  Paragraph,
  ParagraphNode,
} from '@core/lab/guide-types';
import { GuideBlockquote } from './GuideBlockquote';

const text = (value: string): ParagraphNode => ({ kind: 'text', value });
const para = (...nodes: ParagraphNode[]): Paragraph => ({
  kind: 'paragraph',
  nodes,
});

const block = (
  variant: BlockquoteVariant,
  paragraphs: Paragraph[] = [para(text('Body paragraph.'))],
  extra: Partial<BlockquoteBlock> = {},
): BlockquoteBlock => ({
  kind: 'blockquote',
  variant,
  paragraphs,
  ...extra,
});

describe('GuideBlockquote', () => {
  const variantCases: Array<[BlockquoteVariant, string]> = [
    ['design-hook', 'Design Hook'],
    ['territory-bridge', 'Territory Bridge'],
    ['read-next', 'Read Next'],
    ['subguide-queued', 'Subguide queued'],
  ];

  for (const [variant, label] of variantCases) {
    it(`renders a chip and body for the ${variant} variant`, () => {
      const { container } = render(
        <GuideBlockquote block={block(variant)} glossary={{}} />,
      );
      const quote = container.querySelector('blockquote');
      expect(quote).not.toBeNull();
      expect(quote).toHaveAttribute('aria-label', label);
      const chip = container.querySelector(`[data-callout="${variant}"]`);
      expect(chip).not.toBeNull();
      expect(chip).toHaveTextContent(label);
      expect(screen.getByText('Body paragraph.')).toBeInTheDocument();
    });
  }

  it('renders the definition variant with term + gloss and no duplicated term', () => {
    const { container } = render(
      <GuideBlockquote
        block={block(
          'definition',
          [para(text('The hypothesized property of the quantum vacuum.'))],
          { term: 'vacuum coherence' },
        )}
        glossary={{}}
      />,
    );
    const quote = container.querySelector('blockquote');
    expect(quote).toHaveAttribute('aria-label', 'Definition');
    // Term appears exactly once.
    const matches = within(quote as HTMLElement).getAllByText('vacuum coherence');
    expect(matches).toHaveLength(1);
    expect(
      screen.getByText('The hypothesized property of the quantum vacuum.'),
    ).toBeInTheDocument();
    // No callout chip on a definition.
    expect(container.querySelector('[data-callout]')).toBeNull();
  });

  it('renders the plain variant without chip or aria-label', () => {
    const { container } = render(
      <GuideBlockquote
        block={block('plain', [
          para(text('A long, italic source quotation in plain form.')),
        ])}
        glossary={{}}
      />,
    );
    const quote = container.querySelector('blockquote');
    expect(quote).not.toBeNull();
    expect(quote).not.toHaveAttribute('aria-label');
    expect(container.querySelector('[data-callout]')).toBeNull();
    expect(
      screen.getByText('A long, italic source quotation in plain form.'),
    ).toBeInTheDocument();
  });

  it('renders multi-paragraph plain bodies in order', () => {
    const { container } = render(
      <GuideBlockquote
        block={block('plain', [para(text('First.')), para(text('Second.'))])}
        glossary={{}}
      />,
    );
    const paragraphs = container.querySelectorAll('blockquote p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent('First.');
    expect(paragraphs[1]).toHaveTextContent('Second.');
  });
});
