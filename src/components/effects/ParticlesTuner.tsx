import { useState, useCallback } from "react";
import { Particles } from "./Particles";

/**
 * Dev-only tuning panel for the Particles background.
 * Renders Particles with live-adjustable parameters.
 * Only use during development -- strip from production layouts.
 */

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-full cursor-pointer accent-[var(--theme-accent-primary)]"
      />
    </label>
  );
}

interface ParticlesTunerProps {
  className?: string;
}

export function ParticlesTuner({ className }: ParticlesTunerProps) {
  const [open, setOpen] = useState(true);
  const [params, setParams] = useState({
    particleCount: 310,
    particleSpread: 9,
    speed: 0.09,
    moveParticlesOnHover: true,
    particleHoverFactor: 0.9,
    alphaParticles: true,
    particleBaseSize: 100,
    sizeRandomness: 1.6,
    cameraDistance: 24,
    disableRotation: false,
  });

  const set = useCallback(
    <K extends keyof typeof params>(key: K, value: (typeof params)[K]) =>
      setParams((p) => ({ ...p, [key]: value })),
    [],
  );

  const [key, setKey] = useState(0);
  const reset = () => {
    setParams({
      particleCount: 280,
      particleSpread: 11,
      speed: 0.08,
      moveParticlesOnHover: true,
      particleHoverFactor: 0.9,
      alphaParticles: true,
      particleBaseSize: 100,
      sizeRandomness: 1,
      cameraDistance: 20,
      disableRotation: false,
    });
    setKey((k) => k + 1);
  };

  return (
    <>
      <Particles key={key} className={className} {...params} />

      <div className="fixed right-4 bottom-4 z-50 w-72 rounded-lg border border-[var(--theme-border-strong)] bg-[var(--theme-bg-elevated)] p-4 font-body text-sm text-[var(--theme-text-primary)] shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-heading text-xs font-medium tracking-wide uppercase">
            Particles Tuner
          </span>
          <button
            onClick={() => setOpen(!open)}
            className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
          >
            {open ? "Collapse" : "Expand"}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-3">
            <Slider
              label="Count"
              value={params.particleCount}
              min={50}
              max={600}
              step={10}
              onChange={(v) => set("particleCount", v)}
            />
            <Slider
              label="Spread"
              value={params.particleSpread}
              min={1}
              max={30}
              step={1}
              onChange={(v) => set("particleSpread", v)}
            />
            <Slider
              label="Speed"
              value={params.speed}
              min={0.01}
              max={0.5}
              step={0.01}
              onChange={(v) => set("speed", v)}
            />
            <Slider
              label="Base Size"
              value={params.particleBaseSize}
              min={10}
              max={300}
              step={5}
              onChange={(v) => set("particleBaseSize", v)}
            />
            <Slider
              label="Size Randomness"
              value={params.sizeRandomness}
              min={0}
              max={3}
              step={0.1}
              onChange={(v) => set("sizeRandomness", v)}
            />
            <Slider
              label="Camera Distance"
              value={params.cameraDistance}
              min={5}
              max={50}
              step={1}
              onChange={(v) => set("cameraDistance", v)}
            />
            <Slider
              label="Hover Factor"
              value={params.particleHoverFactor}
              min={0}
              max={3}
              step={0.1}
              onChange={(v) => set("particleHoverFactor", v)}
            />

            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={params.moveParticlesOnHover}
                  onChange={(e) => set("moveParticlesOnHover", e.target.checked)}
                  className="accent-[var(--theme-accent-primary)]"
                />
                Hover
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={params.alphaParticles}
                  onChange={(e) => set("alphaParticles", e.target.checked)}
                  className="accent-[var(--theme-accent-primary)]"
                />
                Alpha
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={params.disableRotation}
                  onChange={(e) => set("disableRotation", e.target.checked)}
                  className="accent-[var(--theme-accent-primary)]"
                />
                No Rotation
              </label>
            </div>

            <button
              onClick={reset}
              className="mt-1 w-full rounded border border-[var(--theme-border-subtle)] py-1 text-xs text-[var(--theme-text-muted)] hover:border-[var(--theme-accent-primary)] hover:text-[var(--theme-text-primary)]"
            >
              Reset
            </button>

            <div className="border-t border-[var(--theme-border-subtle)] pt-2 text-[10px] leading-relaxed text-[var(--theme-text-muted)]">
              Changing count/spread/alpha remounts the WebGL context.
              Other params update live.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
