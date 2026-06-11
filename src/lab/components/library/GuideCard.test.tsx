// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { Guide } from '@core/lab/guide-types';
import { GuideCard } from './GuideCard';

const makeGuide = (accentLight?: string): Guide => ({
  slug: 'sample-guide',
  frontmatter: {
    slug: 'sample-guide',
    title: 'Sample Guide',
    kicker: 'Research Guide Series',
    source: { authors: 'Author et al.', year: 2025, venue: 'arXiv:0000.00000' },
    accent: '#4ade80',
    ...(accentLight !== undefined ? { accentLight } : {}),
    territory: 'T4',
    status: 'draft',
    description: 'A short description.',
    figures: [],
    glossary: {},
  },
  sections: [],
  glossary: {},
  figures: {},
});

const renderCard = (guide: Guide) =>
  render(
    <MemoryRouter>
      <GuideCard guide={guide} />
    </MemoryRouter>,
  );

describe('GuideCard accent publication', () => {
  it('publishes both accent custom properties when accentLight is present', () => {
    const { container } = renderCard(makeGuide('#6d28d9'));
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link!.style.getPropertyValue('--guide-accent-dark')).toBe('#4ade80');
    expect(link!.style.getPropertyValue('--guide-accent-light')).toBe('#6d28d9');
  });

  it('omits --guide-accent-light when frontmatter lacks accentLight', () => {
    const { container } = renderCard(makeGuide());
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link!.style.getPropertyValue('--guide-accent-dark')).toBe('#4ade80');
    expect(link!.style.getPropertyValue('--guide-accent-light')).toBe('');
  });

  it('does not set --guide-accent directly (theme scopes own the resolution)', () => {
    const { container } = renderCard(makeGuide('#6d28d9'));
    const link = container.querySelector('a');
    expect(link!.style.getPropertyValue('--guide-accent')).toBe('');
  });
});
