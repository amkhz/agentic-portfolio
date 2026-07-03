/**
 * Deck presentation mode (ADR-017 D1). Desktop-first with a considered
 * decline: mobile gets a designed card, never a broken squeeze. Reduced
 * motion and missing WebGL share one static instrument plate.
 */

export interface DeckCapabilities {
  viewportWidth: number;
  reducedMotion: boolean;
  webgl: boolean;
}

export type DeckMode = "full" | "static" | "decline";

/**
 * Below this the bench cannot lay out; tablet landscape and up may run
 * the deck. A reduced tablet deck is parking-lot material, only if cheap.
 */
export const MIN_DECK_WIDTH = 1024;

export function decideDeckMode(caps: DeckCapabilities): DeckMode {
  if (caps.viewportWidth < MIN_DECK_WIDTH) return "decline";
  if (caps.reducedMotion || !caps.webgl) return "static";
  return "full";
}
