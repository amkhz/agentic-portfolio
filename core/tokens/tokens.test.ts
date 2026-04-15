import { describe, it, expect } from 'vitest';
import {
  colors,
  lightColors,
  typography,
  spacing,
  radius,
  motion,
  shadows,
  lightShadows,
} from './index';
import { caseStudies, type CaseStudy } from '../content/case-studies';

// ============================================
// Design token structure validation
// ============================================

describe('colors', () => {
  it('has bg, text, accent, secondary, and border groups', () => {
    expect(colors).toHaveProperty('bg');
    expect(colors).toHaveProperty('text');
    expect(colors).toHaveProperty('accent');
    expect(colors).toHaveProperty('secondary');
    expect(colors).toHaveProperty('border');
  });

  it('has semantic color tokens', () => {
    expect(colors).toHaveProperty('success');
    expect(colors).toHaveProperty('warning');
    expect(colors).toHaveProperty('error');
  });

  it('bg group has deep, base, elevated, subtle', () => {
    expect(colors.bg).toHaveProperty('deep');
    expect(colors.bg).toHaveProperty('base');
    expect(colors.bg).toHaveProperty('elevated');
    expect(colors.bg).toHaveProperty('subtle');
  });

  it('text group has primary, secondary, muted, inverse', () => {
    expect(colors.text).toHaveProperty('primary');
    expect(colors.text).toHaveProperty('secondary');
    expect(colors.text).toHaveProperty('muted');
    expect(colors.text).toHaveProperty('inverse');
  });

  it('accent group has primary, hover, muted, glow', () => {
    expect(colors.accent).toHaveProperty('primary');
    expect(colors.accent).toHaveProperty('hover');
    expect(colors.accent).toHaveProperty('muted');
    expect(colors.accent).toHaveProperty('glow');
  });

  it('all color values are oklch strings', () => {
    const flatValues = [
      colors.bg.deep, colors.bg.base, colors.bg.elevated, colors.bg.subtle,
      colors.text.primary, colors.text.secondary, colors.text.muted, colors.text.inverse,
      colors.accent.primary, colors.accent.hover,
      colors.secondary.primary, colors.secondary.hover,
      colors.border.subtle, colors.border.strong,
      colors.success, colors.warning, colors.error,
    ];
    for (const value of flatValues) {
      expect(value).toMatch(/^oklch\(/);
    }
  });
});

describe('lightColors', () => {
  it('has the same shape as colors', () => {
    expect(Object.keys(lightColors)).toEqual(Object.keys(colors));
    expect(Object.keys(lightColors.bg)).toEqual(Object.keys(colors.bg));
    expect(Object.keys(lightColors.text)).toEqual(Object.keys(colors.text));
    expect(Object.keys(lightColors.accent)).toEqual(Object.keys(colors.accent));
    expect(Object.keys(lightColors.secondary)).toEqual(Object.keys(colors.secondary));
    expect(Object.keys(lightColors.border)).toEqual(Object.keys(colors.border));
  });
});

describe('typography', () => {
  it('has fontFamily, fontSize, fontWeight, lineHeight, letterSpacing', () => {
    expect(typography).toHaveProperty('fontFamily');
    expect(typography).toHaveProperty('fontSize');
    expect(typography).toHaveProperty('fontWeight');
    expect(typography).toHaveProperty('lineHeight');
    expect(typography).toHaveProperty('letterSpacing');
  });

  it('fontFamily includes display, heading, body', () => {
    expect(typography.fontFamily).toHaveProperty('display');
    expect(typography.fontFamily).toHaveProperty('heading');
    expect(typography.fontFamily).toHaveProperty('body');
  });

  it('fontSize has expected scale keys', () => {
    const expectedKeys = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
    for (const key of expectedKeys) {
      expect(typography.fontSize).toHaveProperty(key);
    }
  });
});

describe('spacing', () => {
  it('has numeric keys for spacing scale', () => {
    expect(spacing).toHaveProperty('0');
    expect(spacing).toHaveProperty('1');
    expect(spacing).toHaveProperty('4');
    expect(spacing).toHaveProperty('16');
    expect(spacing).toHaveProperty('32');
  });

  it('values are rem strings (or zero)', () => {
    for (const [key, value] of Object.entries(spacing)) {
      if (key === '0') {
        expect(value).toBe('0');
      } else {
        expect(value).toMatch(/rem$/);
      }
    }
  });
});

describe('radius', () => {
  it('has expected keys', () => {
    expect(radius).toHaveProperty('none');
    expect(radius).toHaveProperty('sm');
    expect(radius).toHaveProperty('md');
    expect(radius).toHaveProperty('lg');
    expect(radius).toHaveProperty('xl');
    expect(radius).toHaveProperty('full');
  });
});

describe('motion', () => {
  it('has duration and easing groups', () => {
    expect(motion).toHaveProperty('duration');
    expect(motion).toHaveProperty('easing');
  });

  it('duration has expected keys', () => {
    expect(motion.duration).toHaveProperty('fast');
    expect(motion.duration).toHaveProperty('normal');
    expect(motion.duration).toHaveProperty('slow');
  });
});

describe('shadows', () => {
  it('has sm, md, lg, xl, and glow', () => {
    expect(shadows).toHaveProperty('sm');
    expect(shadows).toHaveProperty('md');
    expect(shadows).toHaveProperty('lg');
    expect(shadows).toHaveProperty('xl');
    expect(shadows).toHaveProperty('glow');
  });

  it('glow has brass and magenta', () => {
    expect(shadows.glow).toHaveProperty('brass');
    expect(shadows.glow).toHaveProperty('magenta');
  });
});

describe('lightShadows', () => {
  it('has the same shape as shadows', () => {
    expect(Object.keys(lightShadows)).toEqual(Object.keys(shadows));
    expect(Object.keys(lightShadows.glow)).toEqual(Object.keys(shadows.glow));
  });
});

// ============================================
// Case study metadata validation
// ============================================

describe('caseStudies', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(caseStudies)).toBe(true);
    expect(caseStudies.length).toBeGreaterThan(0);
  });

  it.each(
    caseStudies.map((cs) => [cs.slug, cs])
  )('"%s" has required fields', (_slug, study) => {
    const cs = study as CaseStudy;
    expect(cs.slug).toBeTruthy();
    expect(typeof cs.slug).toBe('string');
    expect(cs.title).toBeTruthy();
    expect(typeof cs.title).toBe('string');
    expect(cs.subtitle).toBeTruthy();
    expect(typeof cs.subtitle).toBe('string');
    expect(Array.isArray(cs.tags)).toBe(true);
    expect(cs.tags.length).toBeGreaterThan(0);
  });

  it.each(
    caseStudies.map((cs) => [cs.slug, cs])
  )('"%s" has a valid heroImage', (_slug, study) => {
    const cs = study as CaseStudy;
    expect(cs.heroImage).toBeDefined();
    expect(cs.heroImage.src).toBeTruthy();
    expect(cs.heroImage.alt).toBeTruthy();
  });

  it('all slugs are unique', () => {
    const slugs = caseStudies.map((cs) => cs.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
