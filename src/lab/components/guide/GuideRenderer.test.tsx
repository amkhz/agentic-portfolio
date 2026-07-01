// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import type { Guide } from '@core/lab/guide-types';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { GuideRenderer } from './GuideRenderer';

// The rail relocated the theme toggle into GuideRenderer's tree, so it now
// needs the ThemeProvider context to mount.
const renderGuide = (guide: Guide) =>
  render(
    <ThemeProvider>
      <GuideRenderer guide={guide} />
    </ThemeProvider>,
  );

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

describe('GuideRenderer accent publication', () => {
  it('publishes both accent custom properties when accentLight is present', () => {
    const { container } = renderGuide(makeGuide('#6d28d9'));
    const root = container.querySelector('article');
    expect(root).not.toBeNull();
    expect(root!.style.getPropertyValue('--guide-accent-dark')).toBe('#4ade80');
    expect(root!.style.getPropertyValue('--guide-accent-light')).toBe('#6d28d9');
  });

  it('omits --guide-accent-light when frontmatter lacks accentLight', () => {
    const { container } = renderGuide(makeGuide());
    const root = container.querySelector('article');
    expect(root).not.toBeNull();
    expect(root!.style.getPropertyValue('--guide-accent-dark')).toBe('#4ade80');
    expect(root!.style.getPropertyValue('--guide-accent-light')).toBe('');
  });

  it('does not set --guide-accent directly (theme scopes own the resolution)', () => {
    const { container } = renderGuide(makeGuide('#6d28d9'));
    const root = container.querySelector('article');
    expect(root!.style.getPropertyValue('--guide-accent')).toBe('');
  });
});
