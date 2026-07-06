/**
 * The translation layer's pure model: intent options, the proposals the
 * layer drafts from an intent, and the operator's utilization. All of
 * it deterministic, so the panel, the meter, and their mirrors agree.
 *
 * Copy here passed the Writer + Gaff strings pass 2026-07-05 (with the
 * rest of the in-deck strings): plain language, honest names, no
 * physics credentials assumed; the three summaries price themselves in
 * one vocabulary (draw and exposure).
 */

export interface IntentOption {
  id: string;
  label: string;
  /** One quiet clause under the label. */
  hint: string;
}

export const DESTINATIONS: IntentOption[] = [
  {
    id: "high-shelf",
    label: "The high shelf",
    hint: "a stable survey line above the traffic",
  },
  {
    id: "deep-field",
    label: "The deep field",
    hint: "long transit, thin support",
  },
  {
    id: "harbor",
    label: "Back to harbor",
    hint: "home, gently",
  },
];

export const TIMELINES: IntentOption[] = [
  { id: "gentle", label: "Gentle", hint: "take the hours" },
  { id: "standard", label: "Standard", hint: "the usual pace" },
  { id: "pressing", label: "Pressing", hint: "spend margin for time" },
];

export const RISKS: IntentOption[] = [
  { id: "conservative", label: "Conservative", hint: "keep every reserve" },
  { id: "balanced", label: "Balanced", hint: "the book answer" },
  { id: "accepting", label: "Accepting", hint: "trust the drive" },
];

export interface DeckIntent {
  destination: string;
  timeline: string;
  risk: string;
}

export const DEFAULT_INTENT: DeckIntent = {
  destination: "high-shelf",
  timeline: "standard",
  risk: "balanced",
};

/**
 * Draft withdraw score: when the operator changes intent mid-review,
 * the drafts on the bench are withdrawn, not deleted — a subtler and
 * quicker exit than their arrival (phase 7 motion audit). Pure data
 * like commitScore; the commit path never uses this (the authored
 * commit timeline owns that exit).
 */
export const translationScore = {
  withdrawMs: 160,
} as const;

export type ProposalStyle = "direct" | "sweep" | "drift";

export interface Proposal {
  id: string;
  style: ProposalStyle;
  /** One plain sentence: what the layer proposes to do. */
  summary: string;
  /** Committed heading in field space, radians. */
  bearing: number;
  /** How hard the timeline pushes, 0 to 1. */
  urgency: number;
  /** Energy cost, rated-draw fraction (the vacuum gauge's language). */
  draw: number;
  /** What reviewing and flying this costs the operator's attention. */
  utilizationCost: number;
  /** The route trace, unit-square points left to right. */
  route: { x: number; y: number }[];
}

const DESTINATION_BEARINGS: Record<string, number> = {
  "high-shelf": 0.7,
  "deep-field": 3.6,
  harbor: 5.2,
};

const TIMELINE_URGENCY: Record<string, number> = {
  gentle: 0.3,
  standard: 0.55,
  pressing: 0.85,
};

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

function routeFor(style: ProposalStyle, urgency: number) {
  // Unit-square polylines, left to right; the bow is the style's voice
  // and urgency flattens it (a pressing run cuts closer to straight).
  const bow = 1 - 0.4 * urgency;
  switch (style) {
    case "direct":
      return [
        { x: 0, y: 0.72 },
        { x: 0.35, y: 0.58 - 0.06 * bow },
        { x: 0.7, y: 0.42 - 0.04 * bow },
        { x: 1, y: 0.3 },
      ];
    case "sweep":
      return [
        { x: 0, y: 0.72 },
        { x: 0.3, y: 0.72 - 0.42 * bow },
        { x: 0.65, y: 0.24 + 0.08 * bow },
        { x: 1, y: 0.3 },
      ];
    case "drift":
      return [
        { x: 0, y: 0.72 },
        { x: 0.3, y: 0.82 - 0.1 * bow },
        { x: 0.62, y: 0.36 + 0.22 * bow },
        { x: 1, y: 0.3 },
      ];
  }
}

/**
 * The layer drafts three routes for an intent, one per temperament.
 * Deterministic: the same intent always drafts the same three.
 */
export function proposeTrajectories(intent: DeckIntent): Proposal[] {
  const base = DESTINATION_BEARINGS[intent.destination] ?? 0.7;
  const urgencyBase = TIMELINE_URGENCY[intent.timeline] ?? 0.55;
  const riskDraw =
    intent.risk === "conservative"
      ? 0.85
      : intent.risk === "accepting"
        ? 1.15
        : 1;
  const riskPush = intent.risk === "accepting" ? 1.1 : 1;
  const dest =
    DESTINATIONS.find((d) => d.id === intent.destination)?.label ?? "the mark";
  const at = dest.charAt(0).toLowerCase() + dest.slice(1);

  const make = (
    style: ProposalStyle,
    bearingOffset: number,
    urgency: number,
    draw: number,
    utilizationCost: number,
    summary: string,
  ): Proposal => ({
    id: `${intent.destination}-${intent.timeline}-${intent.risk}-${style}`,
    style,
    summary,
    bearing: (base + bearingOffset + Math.PI * 2) % (Math.PI * 2),
    urgency: clamp01(urgency * riskPush),
    draw: Math.min(draw * riskDraw, 0.03),
    utilizationCost,
    route: routeFor(style, clamp01(urgency * riskPush)),
  });

  return [
    make(
      "direct",
      0,
      urgencyBase,
      0.012 + 0.014 * urgencyBase,
      0.09,
      `Straight run at ${at}. Most draw, least exposure.`,
    ),
    make(
      "sweep",
      0.5,
      urgencyBase * 0.75,
      (0.012 + 0.014 * urgencyBase) * 0.7,
      0.07,
      `A wide sweep that keeps the wall thick toward ${at}. Calmer, a little longer.`,
    ),
    make(
      "drift",
      -0.4,
      urgencyBase * 0.55,
      (0.012 + 0.014 * urgencyBase) * 0.45,
      0.05,
      `Ride the circulation toward ${at} and spend almost nothing. Longest exposure.`,
    ),
  ];
}

/* ------------------------------------------------------------------ */
/* Utilization: the operator's time-busy fraction (DIRD 34 finding 2). */

/** The annotated optimal band on the meter (DIRD 34 region A2). */
export const UTIL_A2 = { from: 0.5, to: 0.7 } as const;
/** Past this the picture slips; the deck slows its asks (finding 2/8). */
export const UTIL_CEILING = 0.7;

export interface UtilizationEvent {
  /** Deck-clock seconds. */
  at: number;
  /** How much attention the event spoke for, 0 to 1. */
  cost: number;
}

/**
 * Deterministic in (t, events): a monitoring baseline that breathes low
 * in the band, plus a decaying spike per operator event. Events attack
 * fast and settle over ~9 seconds; nothing here is random.
 */
export function utilizationAt(
  tSeconds: number,
  events: readonly UtilizationEvent[],
): number {
  const base =
    0.46 +
    0.05 * Math.sin(tSeconds * 0.031 + 1.2) +
    0.03 * Math.sin(tSeconds * 0.013 + 0.4);
  let spikes = 0;
  for (const event of events) {
    const dt = tSeconds - event.at;
    if (dt < 0) continue;
    const attack = Math.min(dt / 0.3, 1);
    spikes += event.cost * attack * Math.exp(-Math.max(dt - 0.3, 0) / 9);
  }
  return Math.min(Math.max(base + spikes, 0), 0.97);
}

export interface UtilizationReading {
  /** The bench line, tabular mono: "UTIL 0.54". */
  line: string;
  /** The screen-reader mirror per the a11y contract. */
  mirror: string;
  /** Past the ceiling: the meter warms and cadence slows. */
  over: boolean;
}

export function formatUtilization(value: number): UtilizationReading {
  const rounded = value.toFixed(2);
  const over = value > UTIL_CEILING;
  return {
    line: `UTIL ${rounded}`,
    mirror:
      `Operator utilization ${rounded} of capacity, ` +
      (over
        ? "past the 0.70 ceiling; the deck is slowing its asks."
        : "inside the working band."),
    over,
  };
}
