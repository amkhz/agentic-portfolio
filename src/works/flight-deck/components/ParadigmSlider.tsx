import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import {
  crossedRegime,
  paradigmRegime,
  paradigmScore,
  REGIME_CENTERS,
  REGIME_ORDER,
  type ParadigmRegime,
} from "@core/works/flight-deck/paradigm";
import { deckSpringSoft } from "./deckMotion";
import { DECK_TAB } from "./deckTab";

/**
 * The paradigm slider, the final instrument (movement 5): DIRD 28's
 * control-paradigm spectrum as a literal control, revealed after the
 * drill is worked. Staged regimes, scrubbed feel (shape brief §7): the
 * thumb is spring-driven and continuous, the spring's live value drives
 * the dissolve envelopes directly (onDissolve, every frame), and a
 * regime boundary crossing fires once as the thumb passes it
 * (onCrossing) so the authored transition plays while the drag
 * continues. Reactive lane per ADR-017 D4: the slider responds to the
 * operator, so it springs; the crossings' choreography is GSAP-owned
 * by the session.
 *
 * Keyboard-native: the interaction surface is a real range input, so
 * arrows, Home and End work for free; the visible track and thumb are
 * its readout. The regime line beneath swaps with the operator's drag
 * (spring, not timeline: it answers the hand).
 */

interface ParadigmSliderProps {
  /** Machine paradigm position, 0 to 1. */
  value: number;
  onChange: (value: number) => void;
  /** The spring's live value, every frame: drives the dissolve. */
  onDissolve: (value: number) => void;
  /** Fired once per boundary as the thumb crosses it. */
  onCrossing: (crossing: { from: ParadigmRegime; to: ParadigmRegime }) => void;
}

/** Arrival critically damped: a control surface never wobbles. */
const thumbSpring = { stiffness: 170, damping: 26, mass: 0.6 };

export function ParadigmSlider({
  value,
  onChange,
  onDissolve,
  onCrossing,
}: ParadigmSliderProps) {
  const spring = useSpring(value, thumbSpring);
  const io = useRef({ onDissolve, onCrossing });
  io.current = { onDissolve, onCrossing };
  const springPrevRef = useRef(value);

  // The thumb travels on transform, not left: a layout write per spring
  // frame on the deck's hottest interaction is the wrong bill to pay
  // (phase 7 motion audit). The track is measured on mount and resize.
  const thumbX = useMotionValue(0);
  const trackBoxRef = useRef<HTMLDivElement>(null);
  const trackWidthRef = useRef(0);
  useEffect(() => {
    const el = trackBoxRef.current;
    if (!el) return;
    const measure = () => {
      trackWidthRef.current = el.clientWidth;
      thumbX.set(spring.get() * trackWidthRef.current);
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

  // The dissolve rides the spring, not the raw input, so light and
  // presence carry the same damped feel as the thumb; crossings fire as
  // the thumb passes the boundary, mid-drag.
  useMotionValueEvent(spring, "change", (v) => {
    thumbX.set(v * trackWidthRef.current);
    io.current.onDissolve(v);
    const crossing = crossedRegime(springPrevRef.current, v);
    springPrevRef.current = v;
    if (crossing) io.current.onCrossing(crossing);
  });

  const regime = paradigmRegime(value);
  const regimeCopy = deckCopy.paradigm.regimes[regime];

  return (
    <div className="deck-paradigm">
      <div className="deck-paradigm__head">
        <span className="deck-paradigm__label">{deckCopy.paradigm.label}</span>
        <span className="deck-paradigm__names" aria-hidden="true">
          {REGIME_ORDER.map((r) => (
            <span
              key={r}
              className="deck-paradigm__name"
              data-active={regime === r ? "" : undefined}
              style={{ left: `${REGIME_CENTERS[r] * 100}%` }}
            >
              {deckCopy.paradigm.regimes[r].name}
            </span>
          ))}
        </span>
      </div>
      <div className="deck-paradigm__track-box" ref={trackBoxRef}>
        <span className="deck-paradigm__track" aria-hidden="true">
          <span className="deck-paradigm__boundary" style={{ left: `${100 / 3}%` }} />
          <span className="deck-paradigm__boundary" style={{ left: `${200 / 3}%` }} />
        </span>
        <motion.span
          className="deck-paradigm__thumb"
          aria-hidden="true"
          style={{ x: thumbX }}
        />
        <input
          type="range"
          className="deck-paradigm__input"
          tabIndex={DECK_TAB}
          min={0}
          max={100}
          step={1}
          value={Math.round(value * 100)}
          aria-label={deckCopy.paradigm.label}
          aria-valuetext={`${regimeCopy.name}. ${regimeCopy.line}`}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
        />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={regime}
          className="deck-paradigm__line"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          // The old line leaves at the score's pace: a symmetric spring
          // exit held the swap ~1s on copy that answers the hand
          // mid-drag (phase 7 motion audit; paradigmScore.caption).
          exit={{
            opacity: 0,
            y: -3,
            transition: {
              duration: paradigmScore.caption.outMs / 1000,
              ease: "easeIn",
            },
          }}
          transition={deckSpringSoft}
        >
          {regimeCopy.line}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
