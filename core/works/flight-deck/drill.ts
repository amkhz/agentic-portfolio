/**
 * The drill's data model (movement 4, shape brief §6-7): six beats, four
 * of them alerts, worked as an ECAM-style guided checklist with exactly
 * one judgment step per alert. Pure like the machine: the script, the
 * progress reducer, and the disturbance envelopes live here; timers,
 * GSAP choreography, and audio live in src/works and act on this.
 *
 * The drill is unfailable and untimed. Severity is carried by light,
 * sound, and grammar, never by horror devices; the checklist advances
 * itself on completed system steps and never advances the judgment step.
 *
 * Adversarial inputs: the drill pushes the pure instrument models out of
 * band by feeding the same shapes out-of-band deltas (the models'
 * documented contract), not by a second model. The vacuum margin
 * crossing MARGIN_FLOOR and the expanded strip pegging during the
 * warning are designed-in drama.
 */
import type { Severity } from "./boot";
import type { OrientationDelta, VacuumDelta } from "./commit";
import type { FieldDelta } from "./field";
import type { InstrumentId } from "./instruments";

export type DrillBeatId =
  | "advisory-drift" // beat 1: the true advisory
  | "advisory-lane-b" // beat 2: the calibrated false alarm
  | "caution-asymmetry" // beat 3
  | "warning-collapse"; // beat 4: the deck's one red moment

export interface DrillChoice {
  id: string;
  label: string;
  /** The deck's answer when this choice is taken. */
  response: string;
  /**
   * A holding choice re-checks and stays on the judgment step (the
   * unfailable posture: no choice is a dead end, some just look again).
   */
  holds?: boolean;
}

export interface DrillStep {
  id: string;
  /** The checklist line, procedural register, plain language. */
  text: string;
  /** System steps complete themselves; judgment waits for the operator. */
  kind: "system" | "judgment";
  /** Judgment steps carry the operator's options. */
  choices?: DrillChoice[];
}

export interface DrillAlert {
  beat: DrillBeatId;
  severity: Severity;
  /** Alert region label, mono grammar: "FIELD ASYMMETRY". */
  label: string;
  /** The plain-language line beside the label, the human voice. */
  plain: string;
  /** The instrument the procedure reads against. */
  instrument: InstrumentId;
  steps: DrillStep[];
  /** From this step on, the lane B cross-check panel shows (beat 2). */
  crossCheckFromStep?: number;
  /** The after-line once the procedure completes. */
  resolved: string;
}

/**
 * The false alarm's fabricated reading: sensor lane B is confident and
 * wrong. The real field model never moves; the disagreement between
 * this claim and the render is the whole verify beat.
 */
export function laneBClaimedWall(tSeconds: number): number {
  return 0.888 + 0.004 * Math.sin(0.21 * tSeconds + 1.7);
}

/** The 20-25% principle, one plain line (DIRD 34 finding 3). */
export const falseAlarmCaption =
  "Dismissed. An alert system that is never wrong teaches its operator to stop checking, so this one is tuned to flag about one time in five too many. Your cross-check is the design working.";

export const drillAlerts: DrillAlert[] = [
  {
    beat: "advisory-drift",
    severity: "advisory",
    label: "COHERENCE DRIFT",
    plain: "The field's rhythm is wandering a little. Worth a look, not a worry.",
    instrument: "field-integrity",
    steps: [
      {
        id: "drift-sample",
        text: "Sampling the drift against the reference clock.",
        kind: "system",
      },
      {
        id: "drift-range",
        text: "Drift is inside the recalibration range.",
        kind: "system",
      },
      {
        id: "drift-judge",
        text: "Reset the coherence reference.",
        kind: "judgment",
        choices: [
          {
            id: "recalibrate",
            label: "Recalibrate",
            response: "Reference reset. The rhythm is settling back to the line.",
          },
        ],
      },
    ],
    resolved: "Coherence recalibrated.",
  },
  {
    beat: "advisory-lane-b",
    severity: "advisory",
    label: "WALL MARGIN · SENSOR LANE B",
    plain:
      "Lane B thinks the wall's efficiency margin slipped. First step is to ask the wall.",
    instrument: "field-integrity",
    crossCheckFromStep: 1,
    steps: [
      {
        id: "lane-b-pull",
        text: "Pulling lane B's reading.",
        kind: "system",
      },
      {
        id: "lane-b-cross",
        text: "Cross-checking lane B against the field render.",
        kind: "system",
      },
      {
        id: "lane-b-judge",
        text: "The two disagree. Your call.",
        kind: "judgment",
        choices: [
          {
            id: "dismiss",
            label: "Dismiss the alert",
            response: falseAlarmCaption,
          },
          {
            id: "recheck",
            label: "Re-check lane B",
            response: "Lane B re-sampled. Still alone in its reading.",
            holds: true,
          },
        ],
      },
    ],
    resolved: "Dismissed as a false alarm. Lane B flagged for service.",
  },
  {
    beat: "caution-asymmetry",
    severity: "caution",
    label: "FIELD ASYMMETRY",
    plain:
      "Energy is bunching on one side of the bubble, so time is not passing evenly across the ship.",
    instrument: "field-integrity",
    steps: [
      {
        id: "asym-map",
        text: "Mapping the asymmetry across the wall.",
        kind: "system",
      },
      {
        id: "asym-draft",
        text: "Trim drafted: ease the crowded side, feed the thin side.",
        kind: "system",
      },
      {
        id: "asym-judge",
        text: "Apply the trim.",
        kind: "judgment",
        choices: [
          {
            id: "apply-trim",
            label: "Apply the trim",
            response: "Trim applied. Watch the evenness come back.",
          },
        ],
      },
    ],
    resolved: "Asymmetry trimmed. Evenness recovering.",
  },
  {
    beat: "warning-collapse",
    severity: "warning",
    label: "FIELD INTEGRITY · COLLAPSE RISK",
    plain:
      "The wall is thinning faster than the drive can feed it. The deck cannot make this call for you.",
    instrument: "field-integrity",
    steps: [
      {
        id: "collapse-reserve",
        text: "Committing all reserve draw to the wall.",
        kind: "system",
      },
      {
        id: "collapse-hold",
        text: "Reserve is in. The wall needs a shape to hold.",
        kind: "system",
      },
      {
        id: "collapse-judge",
        text: "Choose the redistribution pattern.",
        kind: "judgment",
        choices: [
          {
            id: "ring",
            label: "Even ring",
            response:
              "Draw spread in an even ring. The wall thickens everywhere at once.",
          },
          {
            id: "shed",
            label: "Shed to the trailing wall",
            response:
              "Leading-edge draw shed aft. The thin side takes the surplus.",
          },
        ],
      },
    ],
    resolved: "Redistribution holding. The wall is rebuilding.",
  },
];

/* ------------------------------------------------------------------ */
/* Progress: a pure reducer in the machine's idiom.                    */
/* ------------------------------------------------------------------ */

export type DrillStage =
  | "idle" // drill phase entered, first alert not yet posted
  | "alerts" // beats 1-4
  | "settling" // beat 5: systems settle in sequence (reverse boot echo)
  | "residual" // beat 6: the ECAM-style after-state
  | "done"; // residual acknowledged, deck back on watch

export interface DrillProgress {
  stage: DrillStage;
  alertIndex: number;
  stepIndex: number;
  /** The resolved line is showing and the escalation gap is running. */
  betweenBeats: boolean;
  /** Judgment choices taken, by step id. The residual reads these. */
  choices: Record<string, string>;
  /** The deck's reply to the operator's last judgment, if showing. */
  response: string | null;
}

export type DrillAction =
  | { type: "BEGIN" }
  | { type: "STEP_DONE" } // a system step completed (cadence lives in src)
  | { type: "JUDGE"; choiceId: string }
  | { type: "BEAT_SETTLED" } // the escalation gap elapsed
  | { type: "SETTLE_COMPLETE" } // the recovery choreography finished
  | { type: "ACKNOWLEDGE" }; // residual acknowledged

export const initialDrillProgress: DrillProgress = {
  stage: "idle",
  alertIndex: 0,
  stepIndex: 0,
  betweenBeats: false,
  choices: {},
  response: null,
};

/** Illegal actions are no-ops and return the same state reference. */
export function drillReducer(
  state: DrillProgress,
  action: DrillAction,
): DrillProgress {
  const alert = drillAlerts[state.alertIndex];
  const step = alert?.steps[state.stepIndex];
  switch (action.type) {
    case "BEGIN":
      return state.stage === "idle" ? { ...state, stage: "alerts" } : state;
    case "STEP_DONE": {
      if (state.stage !== "alerts" || state.betweenBeats) return state;
      if (!step || step.kind !== "system") return state; // never the judgment
      const last = state.stepIndex === alert.steps.length - 1;
      return last
        ? { ...state, betweenBeats: true, response: null }
        : { ...state, stepIndex: state.stepIndex + 1, response: null };
    }
    case "JUDGE": {
      if (state.stage !== "alerts" || state.betweenBeats) return state;
      if (!step || step.kind !== "judgment") return state;
      const choice = step.choices?.find((c) => c.id === action.choiceId);
      if (!choice) return state;
      if (choice.holds) return { ...state, response: choice.response };
      const choices = { ...state.choices, [step.id]: choice.id };
      const last = state.stepIndex === alert.steps.length - 1;
      return last
        ? { ...state, choices, betweenBeats: true, response: choice.response }
        : {
            ...state,
            choices,
            stepIndex: state.stepIndex + 1,
            response: choice.response,
          };
    }
    case "BEAT_SETTLED": {
      if (state.stage !== "alerts" || !state.betweenBeats) return state;
      const next = state.alertIndex + 1;
      if (next >= drillAlerts.length) return { ...state, stage: "settling" };
      return {
        ...state,
        alertIndex: next,
        stepIndex: 0,
        betweenBeats: false,
        response: null,
      };
    }
    case "SETTLE_COMPLETE":
      return state.stage === "settling" ? { ...state, stage: "residual" } : state;
    case "ACKNOWLEDGE":
      return state.stage === "residual" ? { ...state, stage: "done" } : state;
  }
}

/**
 * The drill's cadence score, pure data like bootScore. The checklist is
 * self-paced at the judgment steps; these paces only the system's own
 * work (never a countdown, never pressure).
 */
export const drillScore = {
  /** Quiet en-route beat between the commit landing and the first alert. */
  introMs: 4200,
  /** One system step working, before it reports done. */
  stepMs: 1600,
  /**
   * The resolved beat's dwell scales with what there is to read (Justin,
   * live pass 2026-07-05: the false-alarm caption is the drill's payoff
   * and a fixed gap flashed it). Base covers the settle; per-word paces
   * a calm read; the cap keeps escalation from stalling.
   */
  betweenBeats: { baseMs: 2200, perWordMs: 240, maxMs: 12000 },
  /** Beat 5, the reverse boot echo: one exhale, emission wave reversed. */
  settle: { durationMs: 900, staggerMs: 90 },
} as const;

/**
 * How long a resolved beat holds before the next one posts: reading
 * time for the deck's reply plus the resolved line, never a flash.
 */
export function betweenBeatsDwellMs(
  alert: DrillAlert,
  response: string | null,
): number {
  const words = `${response ?? ""} ${alert.resolved}`
    .split(/\s+/)
    .filter(Boolean).length;
  const { baseMs, perWordMs, maxMs } = drillScore.betweenBeats;
  return Math.min(baseMs + words * perWordMs, maxMs);
}

/* ------------------------------------------------------------------ */
/* Disturbances: adversarial inputs into the pure instrument shapes.   */
/* ------------------------------------------------------------------ */

/**
 * When each beat posted and when its procedure resolved, deck-clock
 * seconds. The deltas are deterministic in (t, timeline), the same
 * contract as the commit envelope.
 */
export interface DrillTimeline {
  beatAt: Partial<Record<DrillBeatId, number>>;
  resolvedAt: Partial<Record<DrillBeatId, number>>;
}

function smooth(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/**
 * A beat's envelope: rise from its posting, hold at the operator's pace
 * (the plateau is honest: the fault stays until it is worked), decay
 * once resolved. decayDelayS staggers the recovery in reverse boot
 * order: vacuum first, then orientation, the field settling last.
 */
function envelopeAt(
  t: number,
  startedAt: number | undefined,
  resolvedAt: number | undefined,
  riseS: number,
  decayTauS: number,
  decayDelayS = 0,
): number {
  if (startedAt === undefined || t <= startedAt) return 0;
  const rise = smooth(startedAt, startedAt + riseS, t);
  if (resolvedAt === undefined) return rise;
  const decayFrom = resolvedAt + decayDelayS;
  if (t <= decayFrom) return rise;
  return rise * Math.exp(-(t - decayFrom) / decayTauS);
}

/** Reverse boot echo: the settle walks the bench scan order backward. */
const SETTLE_DELAY_VACUUM_S = 0;
const SETTLE_DELAY_ORIENTATION_S = 0.8;
const SETTLE_DELAY_FIELD_S = 1.6;

const ZERO_FIELD: FieldDelta = { wall: 0, even: 0, stress: [0, 0, 0] };

export function drillFieldDelta(
  t: number,
  tl: DrillTimeline | null | undefined,
): FieldDelta {
  if (!tl) return ZERO_FIELD;
  const drift = envelopeAt(
    t,
    tl.beatAt["advisory-drift"],
    tl.resolvedAt["advisory-drift"],
    4,
    3,
  );
  const asym = envelopeAt(
    t,
    tl.beatAt["caution-asymmetry"],
    tl.resolvedAt["caution-asymmetry"],
    5,
    4,
  );
  const collapse = envelopeAt(
    t,
    tl.beatAt["warning-collapse"],
    tl.resolvedAt["warning-collapse"],
    3,
    4,
    SETTLE_DELAY_FIELD_S,
  );
  if (drift === 0 && asym === 0 && collapse === 0) return ZERO_FIELD;
  return {
    wall: -0.09 * collapse,
    even: -0.018 * drift - 0.09 * asym,
    // The caution's concentration is the one the warning escalates:
    // slot 2 carries the story from bunching to near the ramp top. The
    // warning's push outweighs the slot's coldest nominal phase, so the
    // lane always reads hot when the wall is thinning (clamped at 1).
    stress: [0.12 * drift, 0.42 * asym + 0.85 * collapse, 0],
  };
}

const ZERO_ORIENTATION: OrientationDelta = { bank: 0, pitch: 0, flow: 0 };

export function drillOrientationDelta(
  t: number,
  tl: DrillTimeline | null | undefined,
): OrientationDelta {
  if (!tl) return ZERO_ORIENTATION;
  const asym = envelopeAt(
    t,
    tl.beatAt["caution-asymmetry"],
    tl.resolvedAt["caution-asymmetry"],
    5,
    3.5,
  );
  const collapse = envelopeAt(
    t,
    tl.beatAt["warning-collapse"],
    tl.resolvedAt["warning-collapse"],
    3,
    3.5,
    SETTLE_DELAY_ORIENTATION_S,
  );
  if (asym === 0 && collapse === 0) return ZERO_ORIENTATION;
  // Differential time dilation reads as an uncommanded lean: one side of
  // the ship is living slower, and the horizon feels it before you do.
  return {
    bank: 2.4 * asym + 3.6 * collapse,
    pitch: -0.9 * collapse,
    flow: 0.06 * asym + 0.13 * collapse,
  };
}

/** Whether the drill is holding the horizon off its nominal band. */
export function orientationUpset(delta: OrientationDelta): boolean {
  return Math.abs(delta.bank) + Math.abs(delta.pitch) > 0.5;
}

const ZERO_VACUUM: VacuumDelta = { demand: 0, extraction: 0 };

/**
 * The warning's designed-in drama: demand surges past what the drive
 * can answer. The unmet fraction peaks hard enough to peg the expanded
 * margin strip (deviation beyond the ±0.06 window), then holds a
 * pinched plateau below MARGIN_FLOOR until the operator's
 * redistribution lands. Nominal margin drifts about ±0.021 around
 * +0.034, so the peak (0.12 unmet) always pegs the ±0.06 window and the
 * plateau (0.05) always pinches below the floor.
 */
const SURGE_PEAK_NET = 0.12;
const SURGE_PLATEAU_NET = 0.05;
/** The drive answers most of the surge; the gap above is the deficit. */
const SURGE_DEMAND_FACTOR = 1.7;

export function drillVacuumDelta(
  t: number,
  tl: DrillTimeline | null | undefined,
): VacuumDelta {
  if (!tl) return ZERO_VACUUM;
  const startedAt = tl.beatAt["warning-collapse"];
  if (startedAt === undefined || t <= startedAt) return ZERO_VACUUM;
  const dt = t - startedAt;
  const ramp = smooth(0.8, 3, dt);
  const bump = ramp * (1 - smooth(3.4, 6.5, dt));
  let net = SURGE_PLATEAU_NET * ramp + (SURGE_PEAK_NET - SURGE_PLATEAU_NET) * bump;
  const resolvedAt = tl.resolvedAt["warning-collapse"];
  if (resolvedAt !== undefined) {
    const decayFrom = resolvedAt + SETTLE_DELAY_VACUUM_S;
    if (t > decayFrom) net *= Math.exp(-(t - decayFrom) / 2.5);
  }
  if (net === 0) return ZERO_VACUUM;
  const demand = net * SURGE_DEMAND_FACTOR;
  return { demand, extraction: demand - net };
}

/* ------------------------------------------------------------------ */
/* Beat 6: the residual status.                                        */
/* ------------------------------------------------------------------ */

export interface DrillResidual {
  /** What tripped. */
  tripped: string;
  /** What was done, reading the operator's judgment calls. */
  worked: string;
  /** The one warm line. */
  warm: string;
}

export function drillResidual(choices: Record<string, string>): DrillResidual {
  const pattern =
    choices["collapse-judge"] === "shed"
      ? "Reserve draw shed to the trailing wall."
      : "Reserve draw spread in an even ring.";
  return {
    tripped:
      "Two advisories, one caution, one warning. One advisory was the deck testing you.",
    worked: `Coherence recalibrated. Lane B dismissed and flagged for service. Asymmetry trimmed. ${pattern}`,
    warm: "Four alerts, one of them false, all of them worked. The deck is yours again.",
  };
}
