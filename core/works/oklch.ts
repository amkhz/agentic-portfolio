/**
 * OKLCH token plumbing for Works shaders (ADR-017 D2). Every color is
 * authored as an oklch() custom property in the work's tokens.css; WebGL
 * needs numbers. These converters let a canvas read its palette from the
 * computed style, so the token file stays the single source of color.
 *
 * Conversion math follows Björn Ottosson's reference OKLab definition.
 */

export interface Oklch {
  l: number;
  c: number;
  h: number;
  alpha: number;
}

/** OKLab triple, the space the shaders interpolate in. */
export type Oklab = [l: number, a: number, b: number];

const OKLCH_PATTERN =
  /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/i;

function parseComponent(raw: string): number {
  return raw.endsWith("%") ? Number.parseFloat(raw) / 100 : Number.parseFloat(raw);
}

/** Parses an `oklch(L C H [/ A])` string, e.g. a computed custom property. */
export function parseOklch(value: string): Oklch | null {
  const match = OKLCH_PATTERN.exec(value.trim());
  if (!match) return null;
  return {
    l: parseComponent(match[1]),
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
    alpha: match[4] === undefined ? 1 : parseComponent(match[4]),
  };
}

export function oklchToOklab({ l, c, h }: Oklch): Oklab {
  const hr = (h * Math.PI) / 180;
  return [l, c * Math.cos(hr), c * Math.sin(hr)];
}

/**
 * OKLab -> linear sRGB, unclamped (out-of-gamut values exceed [0, 1];
 * callers clamp at the edge they need, e.g. the fragment shader).
 */
export function oklabToLinearSrgb([l, a, b]: Oklab): [number, number, number] {
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}
