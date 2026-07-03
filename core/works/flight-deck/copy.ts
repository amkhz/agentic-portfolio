/**
 * Deck copy, scaffold grade. Writer + Gaff pass everything here before
 * ship; the colophon voice is Joi-gated (shape brief, content section).
 * Register: plain language, no physics credentials assumed, no
 * permission framing, mission test per line.
 */

export const deckCopy = {
  /** Dormant state: the single invitation line beside the breathing indicator. */
  invitation: "The deck is asleep. Wake it.",
  /** The hold-to-start gesture, spelled out (also the wake control's name). */
  wakeHold: "Hold to wake the deck.",
  /** Movement 1 close: the deck-ready line. */
  deckReady: "All instruments up. The deck is yours.",
  /** The ready light's label in the operator channel. */
  readyLabel: "Deck ready",
  decline: {
    heading: "This instrument wants a wider bench.",
    body: "The Flight Deck is an operable cockpit built for a desktop screen. Every instrument is live and every control does something, which is exactly why it will not squeeze down to a phone.",
  },
  staticPlate: {
    note: "You are reading the deck as a still instrument plate. Every instrument is shown at a legible nominal state.",
  },
  colophon: {
    title: "The Flight Deck",
    kicker: "Perihelion Works 01",
    thesis:
      "Film cockpits are designed to be read in about three seconds of screen time. This one is designed to be operated. Every instrument is live, every control does something, every alert has a procedure, and the research behind each of them is one link away.",
    sourcesHeading: "Built from the Archive",
    exitToDeck: "Back to the deck",
    exitToArchive: "Perihelion Archive",
  },
} as const;
