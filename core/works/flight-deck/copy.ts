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
  panel: {
    /** The intent group's legend. */
    intentLegend: "Intent",
    destinationLabel: "Destination",
    timelineLabel: "Timeline",
    riskLabel: "Risk tolerance",
    proposalsLabel: "Proposals",
    /** While the layer re-drafts (cadence slows past the ceiling). */
    proposalPending: "The layer is drafting routes…",
    /** Dock status while drafts sit on the bench for review. */
    drafted: "Three routes on the bench. Review them against the render.",
    /** Dock status once a route is committed and the space is quiet. */
    enRoutePrefix: "En route:",
    /** Dock status before anything is drafted or flying. */
    idle: "State an intent and the layer will draft routes.",
    /** The commit control on each proposal card. */
    commit: "Commit",
    /** Live region: the handoff is running. */
    committing: "Handing off. The route is leaving the panel.",
    /** Live region: the lag beat, held open on purpose. */
    translating: "Field taking the route.",
    utilizationLabel: "Utilization",
    /** The one-sentence explainer on the 70 percent ceiling (DIRD 34). */
    utilizationExplainer:
      "Past 0.70 of your attention spoken for, the big picture starts to slip. The deck slows its asks before you get there.",
    /** The text badge past the ceiling; never color alone. */
    utilizationOver: "OVER",
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
