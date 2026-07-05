/**
 * The drill's disturbance envelopes: adversarial inputs into the pure
 * instrument shapes (split out of drill.ts per Roy's phase-6 pre-read;
 * drill.ts keeps the script, reducer, and cadence score).
 *
 * The drill pushes the instrument models out of band by feeding the
 * same shapes out-of-band deltas (the models' documented contract), not
 * by a second model. Every delta is deterministic in (t, timeline). The
 * vacuum margin crossing MARGIN_FLOOR and the expanded strip pegging
 * during the warning are designed-in drama.
 */
import type { OrientationDelta, VacuumDelta } from "./commit";
import type { FieldDelta } from "./field";
import type { OperatorDelta } from "./operator";
import type { DrillBeatId } from "./drill";

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
 * order: vacuum first, then orientation, the field, and the operator
 * settling last (a person's breath comes down after the machinery does).
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
const SETTLE_DELAY_OPERATOR_S = 2.4;

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

const ZERO_OPERATOR: OperatorDelta = { blink: 0, respiration: 0, coherence: 0 };

/**
 * The system watching the watcher (phase 6; DIRD 34 Design Hook 2): the
 * drill's escalation shows in the operator's own traces. Workload reads
 * the way the paper's physiological menu says it does: blink rate drops
 * (ocular inhibition under visual load), respiration rises, coherence
 * falls. The advisories barely move the watcher; the caution leans on
 * the traces; the warning is the spike. Settles last in the reverse
 * boot echo, on the longest decay: the machinery levels before the
 * breath does, which is beat 6's "the strip visibly settles too".
 */
export function drillOperatorDelta(
  t: number,
  tl: DrillTimeline | null | undefined,
): OperatorDelta {
  if (!tl) return ZERO_OPERATOR;
  const laneB = envelopeAt(
    t,
    tl.beatAt["advisory-lane-b"],
    tl.resolvedAt["advisory-lane-b"],
    4,
    4,
  );
  const asym = envelopeAt(
    t,
    tl.beatAt["caution-asymmetry"],
    tl.resolvedAt["caution-asymmetry"],
    5,
    5,
    SETTLE_DELAY_OPERATOR_S,
  );
  const collapse = envelopeAt(
    t,
    tl.beatAt["warning-collapse"],
    tl.resolvedAt["warning-collapse"],
    3,
    5,
    SETTLE_DELAY_OPERATOR_S,
  );
  if (laneB === 0 && asym === 0 && collapse === 0) return ZERO_OPERATOR;
  return {
    blink: -1.5 * laneB - 4 * asym - 7 * collapse,
    respiration: 0.6 * laneB + 1.8 * asym + 3.4 * collapse,
    coherence: -0.02 * laneB - 0.09 * asym - 0.16 * collapse,
  };
}
