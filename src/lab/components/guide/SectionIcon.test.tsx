// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { guides } from '@core/lab/guides';
import { SectionIcon } from './SectionIcon';

describe('SectionIcon', () => {
  let warn: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    warn.mockRestore();
  });

  it('renders a lucide icon by bare name, decorative and sized', () => {
    const { container } = render(<SectionIcon name="telescope" size={26} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '26');
    expect(svg).toHaveAttribute('height', '26');
  });

  it('routes the phosphor: prefix to a filled phosphor icon', () => {
    const { container } = render(
      <SectionIcon name="phosphor:flying-saucer" size={14} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '14');
  });

  it('renders nothing for an unknown name and warns once', () => {
    const { container } = render(
      <>
        <SectionIcon name="not-an-icon" size={26} />
        <SectionIcon name="not-an-icon" size={26} />
      </>,
    );
    expect(container.querySelector('svg')).toBeNull();
    const unknownWarnings = warn.mock.calls.filter((call: unknown[]) =>
      String(call[0]).includes("unknown icon name 'not-an-icon'"),
    );
    expect(unknownWarnings).toHaveLength(1);
  });

  it('resolves every icon name shipped in the guide library', () => {
    const iconNames = new Set(
      guides.flatMap((g) => g.sections.flatMap((s) => (s.icon ? [s.icon] : []))),
    );
    // C.2 spec: 63 anchors across 8 guides, plus government-efforts-uap
    // (7 anchors, locked-vocabulary reuse), wendt-duvall-sovereignty
    // (8 anchors), dird-36-quantum-tomography (8 anchors), and
    // dird-34-cognitive-limits (7 anchors) added with those guides.
    const sectionCount = guides.reduce((n, g) => n + g.sections.length, 0);
    expect(guides).toHaveLength(12);
    expect(sectionCount).toBe(93);
    expect(iconNames.size).toBeGreaterThan(0);
    for (const name of iconNames) {
      const { container, unmount } = render(<SectionIcon name={name} size={26} />);
      expect(container.querySelector('svg'), `icon '${name}' did not resolve`).not.toBeNull();
      unmount();
    }
  });
});
