import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  describeSlicePlane,
  formatSlicePlane,
} from "@core/works/flight-deck/field";

/**
 * The slice-plane scrubber (Works 01.1): the ultrasound move. The
 * display stays a computed cross-section; this sweeps the cut fore and
 * aft through the bubble, so the third dimension is revealed by
 * operating, not by rendering. Interaction pattern is the paradigm
 * slider's, exactly: a real range input as the surface (keyboard free),
 * a spring thumb on transform, and the model riding the SPRING value
 * per frame (onSweep) so the cut eases between planes with the same
 * damped feel as the thumb. Reactive lane (ADR-017 D4): it answers the
 * hand.
 *
 * While a drill alert is posted the scrubber rests disabled and the
 * plane snaps home (owner: FieldIntegrity): procedures read against the
 * reference plane, so the display can never disagree with the copy.
 */

interface SliceScrubberProps {
  /** The plane, -1 (aft) to +1 (fore); 0 is the reference plane. */
  value: number;
  onChange: (value: number) => void;
  /** The spring's live value, every frame: drives the render's cut. */
  onSweep: (value: number) => void;
  disabled?: boolean;
}

/** Arrival critically damped: a control surface never wobbles. */
const thumbSpring = { stiffness: 170, damping: 26, mass: 0.6 };

export function SliceScrubber({
  value,
  onChange,
  onSweep,
  disabled = false,
}: SliceScrubberProps) {
  const spring = useSpring(value, thumbSpring);
  const sweepRef = useRef(onSweep);
  sweepRef.current = onSweep;

  // Thumb travels on transform (compositor-only), the paradigm
  // slider's own pattern; the track is measured on mount and resize.
  const thumbX = useMotionValue(0);
  const trackBoxRef = useRef<HTMLDivElement>(null);
  const trackWidthRef = useRef(0);
  const toX = (v: number) => ((v + 1) / 2) * trackWidthRef.current;
  useEffect(() => {
    const el = trackBoxRef.current;
    if (!el) return;
    const measure = () => {
      trackWidthRef.current = el.clientWidth;
      thumbX.set(toX(spring.get()));
    };
    measure();
    if (typeof ResizeObserver === "undefined") return; // jsdom
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [spring, thumbX]);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, "change", (v) => {
    thumbX.set(toX(v));
    sweepRef.current(v);
  });

  return (
    <div className="deck-slice js-boot-data">
      <span className="deck-slice__label">{deckCopy.slice.label}</span>
      <span className="deck-slice__end">{deckCopy.slice.aft}</span>
      <div className="deck-slice__track-box" ref={trackBoxRef}>
        <span className="deck-slice__track" aria-hidden="true">
          {/* The reference plane's home mark at center. */}
          <span className="deck-slice__ref" />
        </span>
        <motion.span
          className="deck-slice__thumb"
          aria-hidden="true"
          style={{ x: thumbX }}
        />
        <input
          type="range"
          className="deck-slice__input"
          min={-100}
          max={100}
          step={1}
          value={Math.round(value * 100)}
          disabled={disabled}
          aria-label={deckCopy.slice.control}
          aria-valuetext={describeSlicePlane(value)}
          title={deckCopy.slice.hint}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
        />
      </div>
      <span className="deck-slice__end">{deckCopy.slice.fore}</span>
      <span className="deck-slice__value">{formatSlicePlane(value)}</span>
    </div>
  );
}
