/**
 * Works-level copy, above any single piece (ADR-017 D1). The flight
 * deck's own strings live in core/works/flight-deck/copy.ts; this file
 * holds what the Works chassis says on its own behalf, so Works 02+
 * inherits it.
 */

export const worksCopy = {
  /**
   * The considered fault, sibling of the deck's considered decline: when
   * a piece throws at runtime the visitor gets a designed card and a way
   * back, never the blank page an unguarded boundary leaves behind.
   */
  fault: {
    heading: "This instrument stopped.",
    body: "Something inside the piece failed while it was running. The rest of Perihelion is unaffected, and starting it again usually brings the bench back.",
    restart: "Start it again",
    exit: "Perihelion Archive",
  },
} as const;
