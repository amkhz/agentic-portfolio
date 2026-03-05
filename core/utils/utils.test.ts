import { describe, it, expect, vi } from 'vitest';
import { cn } from './index';
import { formatDate, slugify, truncate, debounce } from './format';

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
// formatDate()
// ============================================

describe('formatDate()', () => {
  it('formats a Date object to a readable string', () => {
    // Use explicit time to avoid UTC midnight → local timezone date shift
    const result = formatDate(new Date(2026, 0, 15));
    expect(result).toContain('January');
    expect(result).toContain('2026');
    expect(result).toContain('15');
  });

  it('formats a date string', () => {
    const result = formatDate('2025-12-25');
    expect(result).toContain('December');
    expect(result).toContain('2025');
  });

  it('uses en-US locale format (Month Day, Year)', () => {
    const result = formatDate('2026-03-04');
    // en-US format: "March 4, 2026"
    expect(result).toMatch(/March\s+\d+,?\s+2026/);
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
// truncate()
// ============================================

describe('truncate()', () => {
  it('returns the original string if shorter than maxLength', () => {
    expect(truncate('hello', 100)).toBe('hello');
  });

  it('returns the original string if exactly maxLength', () => {
    const str = 'a'.repeat(100);
    expect(truncate(str, 100)).toBe(str);
  });

  it('truncates and appends ellipsis when exceeding maxLength', () => {
    const str = 'a'.repeat(150);
    const result = truncate(str, 100);
    expect(result.length).toBeLessThanOrEqual(103); // 100 chars + '...'
    expect(result).toMatch(/\.\.\.$/);
  });

  it('uses default maxLength of 100', () => {
    const str = 'a'.repeat(150);
    const result = truncate(str);
    expect(result).toMatch(/\.\.\.$/);
  });

  it('trims trailing whitespace before adding ellipsis', () => {
    // "hello world" with maxLength 6 should slice to "hello " then trim to "hello" + "..."
    const result = truncate('hello world and more stuff', 6);
    expect(result).toBe('hello...');
  });
});

// ============================================
// debounce()
// ============================================

describe('debounce()', () => {
  it('delays function execution', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  it('resets the timer on subsequent calls', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    vi.advanceTimersByTime(100);
    debounced(); // reset timer
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled(); // still waiting

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  it('passes arguments to the debounced function', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a', 'b');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('a', 'b');

    vi.useRealTimers();
  });

  it('uses default delay of 300ms', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn);

    debounced();
    vi.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });
});
