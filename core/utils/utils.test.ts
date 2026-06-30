import { describe, it, expect } from 'vitest';
import { cn, clampRevealDelay, REVEAL_DELAY_CAP_MS } from './index';
import { slugify } from './format';

// ============================================
// cn() — class name merging utility
// ============================================

describe('cn()', () => {
  it('combines multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes via clsx syntax', () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn('base', isActive && 'active', isDisabled && 'disabled');
    expect(result).toBe('base active');
  });

  it('merges conflicting Tailwind classes (last wins)', () => {
    const result = cn('px-4 py-2', 'px-8');
    expect(result).toBe('py-2 px-8');
  });

  it('handles undefined and null inputs gracefully', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('accepts array inputs', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('accepts object inputs for conditional classes', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });
});

// ============================================
// slugify()
// ============================================

describe('slugify()', () => {
  it('converts a simple string to a slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('collapses multiple spaces and hyphens', () => {
    expect(slugify('foo   bar--baz')).toBe('foo-bar-baz');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('--hello--')).toBe('hello');
  });

  it('handles underscores by converting to hyphens', () => {
    expect(slugify('foo_bar_baz')).toBe('foo-bar-baz');
  });

  it('lowercases the output', () => {
    expect(slugify('AI Leadership')).toBe('ai-leadership');
  });

  it('trims whitespace', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });
});

// ============================================
// clampRevealDelay()
// ============================================

describe('clampRevealDelay()', () => {
  it('passes through small delays unchanged', () => {
    expect(clampRevealDelay(0)).toBe(0);
    expect(clampRevealDelay(100)).toBe(100);
    expect(clampRevealDelay(300)).toBe(300);
  });

  it('caps delays past the ceiling (stops the mobile cascade tail)', () => {
    expect(clampRevealDelay(400)).toBe(REVEAL_DELAY_CAP_MS);
    expect(clampRevealDelay(1300)).toBe(REVEAL_DELAY_CAP_MS);
  });

  it('floors negative and non-finite delays to 0', () => {
    expect(clampRevealDelay(-50)).toBe(0);
    expect(clampRevealDelay(Number.NaN)).toBe(0);
    expect(clampRevealDelay(Number.POSITIVE_INFINITY)).toBe(0);
  });
});

