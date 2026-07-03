import { useMemo, useState } from "react";
import {
  FIELD_MOTION_DEFAULTS,
  type FieldMotionParams,
} from "../components/fieldMotion";

/**
 * Dev-only DialKit-style tuning panel for the Field Integrity shader
 * (interface-craft DialKit schema: [default, min, max] tuples in folder
 * groups). In-repo rather than the `dialkit` package per ADR-017 D5's
 * dependency posture; the config shape is drop-in compatible if the
 * package is ever blessed. This module is loaded behind an
 * import.meta.env.DEV gate and never reaches a production bundle.
 *
 * Workflow: drag until it feels right, hit "log values", paste the JSON
 * over FIELD_MOTION_DEFAULTS. The panel is a tuning tool, not a config
 * layer.
 */

type Dial = [def: number, min: number, max: number];
type DialGroup = Record<string, Dial>;

const DIALS: Record<string, DialGroup> = {
  speckle: {
    speckleAmp: [FIELD_MOTION_DEFAULTS.speckleAmp, 0, 0.4],
    speckleDriftX: [FIELD_MOTION_DEFAULTS.speckleDriftX, -1, 1],
    speckleDriftY: [FIELD_MOTION_DEFAULTS.speckleDriftY, -1, 1],
  },
  circulation: {
    crestAmp: [FIELD_MOTION_DEFAULTS.crestAmp, 0, 0.2],
    crestSpeed: [FIELD_MOTION_DEFAULTS.crestSpeed, 0, 2],
  },
  drift: {
    driftCenter2: [FIELD_MOTION_DEFAULTS.driftCenter2, 0, 1],
    driftCenter3: [FIELD_MOTION_DEFAULTS.driftCenter3, 0, 1],
    driftThick3: [FIELD_MOTION_DEFAULTS.driftThick3, 0, 1],
    driftThick5: [FIELD_MOTION_DEFAULTS.driftThick5, 0, 1],
  },
  breath: {
    breathAmp: [FIELD_MOTION_DEFAULTS.breathAmp, 0, 0.03],
    breathRate: [FIELD_MOTION_DEFAULTS.breathRate, 0, 2],
  },
  wall: {
    wallBase: [FIELD_MOTION_DEFAULTS.wallBase, 0.03, 0.2],
    shellFalloff: [FIELD_MOTION_DEFAULTS.shellFalloff, 0.5, 6],
  },
};

interface FieldTunerProps {
  onChange: (params: FieldMotionParams) => void;
}

export default function FieldTuner({ onChange }: FieldTunerProps) {
  const [values, setValues] = useState<FieldMotionParams>(
    FIELD_MOTION_DEFAULTS,
  );
  const step = useMemo(() => {
    const steps = {} as Record<keyof FieldMotionParams, number>;
    for (const group of Object.values(DIALS)) {
      for (const [key, [, min, max]] of Object.entries(group)) {
        steps[key as keyof FieldMotionParams] = (max - min) / 200;
      }
    }
    return steps;
  }, []);

  const set = (key: keyof FieldMotionParams, value: number) => {
    const next = { ...values, [key]: value };
    setValues(next);
    onChange(next);
  };

  return (
    <aside
      className="fixed right-4 top-4 z-50 w-64 border border-[var(--deck-line)] bg-[var(--deck-surface)] p-3 text-[var(--deck-ink)]"
      aria-label="Field motion tuner (dev)"
    >
      <details open>
        <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-[var(--deck-ink-dim)]">
          Field tuner · dev
        </summary>
        {Object.entries(DIALS).map(([group, dials]) => (
          <fieldset key={group} className="mt-3 border-0 p-0">
            <legend className="text-[0.625rem] uppercase tracking-[0.2em] text-[var(--deck-ink-label)]">
              {group}
            </legend>
            {Object.entries(dials).map(([key, [, min, max]]) => {
              const k = key as keyof FieldMotionParams;
              return (
                <label key={key} className="mt-1 block text-[0.625rem]">
                  <span className="flex justify-between text-[var(--deck-ink-dim)]">
                    <span>{key}</span>
                    <span className="tabular-nums">{values[k].toFixed(3)}</span>
                  </span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step[k]}
                    value={values[k]}
                    onChange={(e) => set(k, Number(e.target.value))}
                    className="w-full accent-[var(--deck-caution)]"
                  />
                </label>
              );
            })}
          </fieldset>
        ))}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="border border-[var(--deck-line)] px-2 py-1 text-[0.625rem] uppercase tracking-[0.15em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
            onClick={() => {
              // The bake-back path: paste over FIELD_MOTION_DEFAULTS.
              console.log(JSON.stringify(values, null, 2));
            }}
          >
            Log values
          </button>
          <button
            type="button"
            className="border border-[var(--deck-line)] px-2 py-1 text-[0.625rem] uppercase tracking-[0.15em] text-[var(--deck-ink-dim)] hover:text-[var(--deck-ink)]"
            onClick={() => {
              setValues(FIELD_MOTION_DEFAULTS);
              onChange(FIELD_MOTION_DEFAULTS);
            }}
          >
            Reset
          </button>
        </div>
      </details>
    </aside>
  );
}
