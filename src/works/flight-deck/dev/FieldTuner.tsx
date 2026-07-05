import { useEffect, useRef } from "react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";
import {
  FIELD_MOTION_DEFAULTS as D,
  type FieldMotionParams,
} from "../components/fieldMotion";

/**
 * Dev-only tuning panel for the Field Integrity shader, on the real
 * DialKit (Justin-approved devDependency, 2026-07-04). This module loads
 * behind an import.meta.env.DEV gate and never reaches production.
 *
 * Workflow: drag until it feels right, hit "log values", paste the JSON
 * over FIELD_MOTION_DEFAULTS in fieldMotion.ts. The panel is a tuning
 * tool, not a config layer; persist keeps values across HMR reloads so
 * a shader edit does not wipe an in-progress feel.
 */

interface FieldTunerProps {
  onChange: (params: FieldMotionParams) => void;
}

export default function FieldTuner({ onChange }: FieldTunerProps) {
  const latestRef = useRef<FieldMotionParams | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const params = useDialKit(
    "Field Integrity",
    {
      frame: {
        centerX: [D.centerX, -1.2, 0.6] as [number, number, number],
        zoom: [D.zoom, 1.4, 3.4] as [number, number, number],
      },
      speckle: {
        amp: [D.speckleAmp, 0, 0.4] as [number, number, number],
        driftX: [D.speckleDriftX, -1, 1] as [number, number, number],
        driftY: [D.speckleDriftY, -1, 1] as [number, number, number],
      },
      circulation: {
        amp: [D.crestAmp, 0, 0.2] as [number, number, number],
        speed: [D.crestSpeed, 0, 2] as [number, number, number],
      },
      drift: {
        center2: [D.driftCenter2, 0, 1] as [number, number, number],
        center3: [D.driftCenter3, 0, 1] as [number, number, number],
        thick3: [D.driftThick3, 0, 1] as [number, number, number],
        thick5: [D.driftThick5, 0, 1] as [number, number, number],
      },
      breath: {
        amp: [D.breathAmp, 0, 0.03] as [number, number, number],
        rate: [D.breathRate, 0, 2] as [number, number, number],
      },
      wall: {
        base: [D.wallBase, 0.03, 0.2] as [number, number, number],
        falloff: [D.shellFalloff, 0.5, 6] as [number, number, number],
      },
      deficit: {
        thinGain: [D.thinGain, 0, 0.8] as [number, number, number],
        neckDepth: [D.neckDepth, 0, 0.9] as [number, number, number],
        thinCool: [D.thinCool, 0, 0.3] as [number, number, number],
      },
      logValues: { type: "action" as const, label: "Log values" },
    },
    {
      persist: { storage: "sessionStorage" },
      onAction: (action) => {
        // The bake-back path: JSON to the clipboard, paste over
        // FIELD_MOTION_DEFAULTS (console.log as the fallback receipt).
        if (!action.includes("logValues") || !latestRef.current) return;
        const json = JSON.stringify(latestRef.current, null, 2);
        console.log(json);
        navigator.clipboard
          ?.writeText(json)
          .then(() => console.log("field motion params copied to clipboard"))
          .catch(() => console.log("clipboard unavailable; copy from above"));
      },
    },
  );

  const flat: FieldMotionParams = {
    centerX: params.frame.centerX,
    zoom: params.frame.zoom,
    speckleAmp: params.speckle.amp,
    speckleDriftX: params.speckle.driftX,
    speckleDriftY: params.speckle.driftY,
    crestAmp: params.circulation.amp,
    crestSpeed: params.circulation.speed,
    driftCenter2: params.drift.center2,
    driftCenter3: params.drift.center3,
    driftThick3: params.drift.thick3,
    driftThick5: params.drift.thick5,
    breathAmp: params.breath.amp,
    breathRate: params.breath.rate,
    wallBase: params.wall.base,
    shellFalloff: params.wall.falloff,
    thinGain: params.deficit.thinGain,
    neckDepth: params.deficit.neckDepth,
    thinCool: params.deficit.thinCool,
  };

  latestRef.current = flat;

  const signature = JSON.stringify(flat);
  useEffect(() => {
    if (latestRef.current) onChangeRef.current(latestRef.current);
  }, [signature]);

  return <DialRoot position="top-right" defaultOpen theme="dark" />;
}
