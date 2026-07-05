/**
 * Deck copy. Register: plain language, no physics credentials assumed,
 * no permission framing, mission test per line. The colophon block is
 * FINAL as of 2026-07-05 (Writer + Gaff pass, Joi profile gating the
 * voice; arm line locked per ADR-017 D7 and sourced from works.ts).
 * The in-deck strings (panel, alerts, orders) remain scaffold grade
 * pending their own pass.
 */
import { COUPLING_LAG_S } from "./paradigm";

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
  /** The shutdown control, deck chrome: back to dormant, fresh session. */
  shutdown: {
    label: "Shut down",
    hint: "Power the deck down and start the session over.",
    announced: "Deck shutting down.",
  },
  /**
   * Standing orders: the first-watch brief on the dormant overlay,
   * teaching the arc before the operator's hands touch the controls.
   */
  orders: {
    kicker: "You have the watch",
    lines: [
      "Every instrument on this deck is live once it wakes. Nothing here is a picture.",
      "State an intent, commit a route, and watch the ship answer. The deck asks for your judgment when it matters.",
      "Fly the watch and a final instrument appears: the control paradigm. At its consciousness end the deck goes dark and reads you instead.",
    ],
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
  alerts: {
    /** The alert region at quiet. */
    quiet: "No active alerts",
    /** The quiet line once the drill has been worked this session. */
    quietAfterDrill: "No active alerts · drill worked",
    /** Severity display words, shown beside the lamp (never color alone). */
    severity: {
      advisory: "ADVISORY",
      caution: "CAUTION",
      warning: "WARNING",
    },
    /** The procedure block's kicker in the review space. */
    procedureKicker: "Procedure",
    /** State words on checklist steps. */
    stepWorking: "working",
    stepDone: "done",
    /** The cross-check panel's row labels (beat 2, the verify step). */
    crossCheckLaneB: "SENSOR LANE B · WALL",
    crossCheckRender: "FIELD RENDER · WALL",
    /** Beat 5, while the systems settle in sequence. */
    settling: "Systems settling in sequence.",
    residual: {
      kicker: "Residual status",
      trippedLabel: "What tripped",
      workedLabel: "What was done",
      marginLabel: "Margin remaining",
      /** The control that puts the deck back on watch. */
      acknowledge: "Return to watch",
    },
  },
  operator: {
    /** The strip's region label in the operator channel. */
    label: "Operator state",
    /** Trace labels, instrument grammar. */
    blink: "BLINK",
    respiration: "RESP",
    coherence: "COH",
  },
  paradigm: {
    /** The final instrument's name and control label. */
    label: "Control paradigm",
    /** Announced once, when the slider blooms in after the drill. */
    revealed:
      "Final instrument online: the control paradigm. Slide it and the deck hands over.",
    /** Regime names + one plain line each (shape brief content list). */
    regimes: {
      instrumented: {
        name: "Instrumented",
        line: "Every reading on the bench. You fly the deck.",
      },
      hybrid: {
        name: "Hybrid",
        line: "The deck keeps the routine. You keep the picture.",
      },
      consciousness: {
        name: "Consciousness",
        line: "The instruments rest. Your own state is the input.",
      },
    },
    /**
     * The promotion caption at the consciousness end: the arc's proof,
     * spelled out in one breath (biometrics promoted, never introduced).
     */
    promotion:
      "These traces have been at the bottom of the bench since boot, watching you watch the ship. Out here they are not a readout anymore. They are the controls.",
    /** The chamber's kicker over the promoted traces. */
    chamberKicker: "Consciousness chamber",
    /** The chamber's live line: what the coupling is doing, honestly. */
    chamberCoupled: "The field is breathing with you.",
    /** Trace legend: the operator's line and the ship's answer. The lag
     *  is derived, so the label can never lie about the constant. */
    chamberBreathLabel: "BREATH",
    chamberEchoLabel: `FIELD · ${COUPLING_LAG_S.toFixed(1)}S BEHIND`,
    /** The sr sentence for the echo, since the trace is visual only. */
    chamberEchoMirror: `The field's wall follows the breath ${COUPLING_LAG_S.toFixed(1)} seconds behind.`,
  },
  sound: {
    /** The opt-in toggle in the deck chrome (ADR-017 D5: default off). */
    label: "Sound",
    on: "on",
    off: "off",
    /** One line on what opting in buys; alerts are captioned either way. */
    hint: "Alert tones are synthesized on the deck. Everything audible is also written.",
  },
  colophon: {
    title: "The Flight Deck",
    kicker: "Perihelion Works 01",
    thesis:
      "Film cockpits are designed to be read in about three seconds of screen time. This one is designed to be operated. Every instrument is live, every control moves the ship, and every alert has a procedure you can work at your own pace. The research behind it all is one link away.",
    sourcesHeading: "Built from the Archive",
    exitToDeck: "Back to the deck",
    exitToArchive: "Perihelion Archive",
  },
} as const;
