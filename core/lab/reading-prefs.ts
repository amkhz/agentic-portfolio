/**
 * Reading preferences — the reader's accommodation settings for the guide
 * reading view (T4). Pure model: bounds, clamping, cookie (de)serialization,
 * and the mapping to CSS custom properties. No DOM, no storage I/O — the
 * hook in src/lib/useReadingPrefs.ts owns those.
 *
 * The three levers sit on top of the locked per-mode anchors, not instead of
 * them: type size scales --lab-reading-size-base, weight is a delta added to
 * the per-mode Newsreader anchor (330 dark / 400 light), and measure sets the
 * prose column width. Every reachable setting stays inside WCAG-safe,
 * legible-on-the-humus-floor bounds (see lab.css for the CSS clamps).
 */

export interface ReadingPrefs {
  /** Type-size scale as a percentage of the locked base (18/20px). */
  sizePct: number;
  /** wght offset added to the per-mode Newsreader anchor. */
  weight: number;
  /** Prose column width (the "measure"), in rem. */
  measure: number;
}

/**
 * Generous-but-legible bounds (Justin's call, 2026-06-30). Every stop passes
 * WCAG AA and stays crisp; the anchors (100% size, 0 weight, 56rem measure)
 * are the locked defaults, not ceilings.
 */
export const READING_BOUNDS = {
  size: { min: 90, max: 140, step: 5, default: 100 },
  weight: { min: -40, max: 140, step: 10, default: 0 },
  measure: { options: [48, 56, 64] as const, default: 56 },
} as const;

export const DEFAULT_READING_PREFS: ReadingPrefs = {
  sizePct: READING_BOUNDS.size.default,
  weight: READING_BOUNDS.weight.default,
  measure: READING_BOUNDS.measure.default,
};

function clampToStep(value: number, min: number, max: number, step: number): number {
  if (!Number.isFinite(value)) return min;
  const clamped = Math.min(max, Math.max(min, value));
  const snapped = min + Math.round((clamped - min) / step) * step;
  return Math.min(max, Math.max(min, snapped));
}

function nearestOption(value: number, options: readonly number[], fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return options.reduce(
    (best, opt) => (Math.abs(opt - value) < Math.abs(best - value) ? opt : best),
    options[0] ?? fallback,
  );
}

/** Coerce any partial/untrusted input into a valid, in-bounds ReadingPrefs. */
export function clampReadingPrefs(input: Partial<ReadingPrefs>): ReadingPrefs {
  const { size, weight, measure } = READING_BOUNDS;
  return {
    sizePct: clampToStep(input.sizePct ?? size.default, size.min, size.max, size.step),
    weight: clampToStep(input.weight ?? weight.default, weight.min, weight.max, weight.step),
    measure: nearestOption(input.measure ?? measure.default, measure.options, measure.default),
  };
}

export function isDefaultReadingPrefs(prefs: ReadingPrefs): boolean {
  return (
    prefs.sizePct === DEFAULT_READING_PREFS.sizePct &&
    prefs.weight === DEFAULT_READING_PREFS.weight &&
    prefs.measure === DEFAULT_READING_PREFS.measure
  );
}

/**
 * The CSS custom properties that carry these prefs. Applied to <html> so they
 * override the :root defaults and cascade to the whole lab. Kept in sync with
 * the tokens in lab.css (--lab-reading-scale, --lab-body-weight-delta,
 * --lab-measure).
 */
export function readingPrefsToCssVars(prefs: ReadingPrefs): Record<string, string> {
  return {
    "--lab-reading-scale": String(prefs.sizePct / 100),
    "--lab-body-weight-delta": String(prefs.weight),
    "--lab-measure": `${prefs.measure}rem`,
  };
}

/** Compact cookie payload, e.g. "s110w-20m64". */
export function serializeReadingPrefs(prefs: ReadingPrefs): string {
  const p = clampReadingPrefs(prefs);
  return `s${p.sizePct}w${p.weight}m${p.measure}`;
}

const COOKIE_PATTERN = /^s(-?\d+)w(-?\d+)m(\d+)$/;

/** Parse a cookie payload back into prefs, falling back to defaults. */
export function parseReadingPrefs(raw: string | null | undefined): ReadingPrefs {
  if (!raw) return { ...DEFAULT_READING_PREFS };
  const match = COOKIE_PATTERN.exec(raw.trim());
  if (!match) return { ...DEFAULT_READING_PREFS };
  return clampReadingPrefs({
    sizePct: Number(match[1]),
    weight: Number(match[2]),
    measure: Number(match[3]),
  });
}
