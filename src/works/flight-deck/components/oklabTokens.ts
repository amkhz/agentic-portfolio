import { oklchToOklab, parseOklch } from "@core/works/oklch";

/**
 * Read a --deck-* color token off a computed style as an OKLab triple
 * for shader uniforms. tokens.css owns every token this is asked for;
 * a parse miss is a build error, not a runtime state.
 */
export function readOklabToken(
  style: CSSStyleDeclaration,
  token: string,
): number[] {
  const parsed = parseOklch(style.getPropertyValue(token).trim());
  return parsed ? [...oklchToOklab(parsed)] : [0, 0, 0];
}
