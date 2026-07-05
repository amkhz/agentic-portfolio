import { useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";
import {
  UTIL_A2,
  UTIL_CEILING,
  utilizationAt,
  type UtilizationEvent,
} from "@core/works/flight-deck/translation";
import { deckNeedleSpring } from "./deckMotion";

/**
 * The utilization meter: the operator's time-busy fraction on a tape,
 * with the A2 working band annotated and the 0.70 ceiling marked
 * (DIRD 34 findings 2 and 4). Past the ceiling the needle warms and an
 * OVER badge appears beside it; state is text and geometry, never
 * color alone. The needle tracks on a spring: reactive lane, it is
 * following the operator. Given a clock, the spring's target updates
 * per frame from the same pure model (gated like every deck loop), so
 * the needle tracks continuously instead of hopping between cadence
 * samples (phase 7 smoothness sweep); without one it holds the sampled
 * value, which is the static plate's still.
 */

const TAPE = { left: 4, right: 296, y: 24 } as const;

const xFor = (value: number) =>
  TAPE.left + (TAPE.right - TAPE.left) * Math.min(Math.max(value, 0), 1);

interface UtilizationMeterProps {
  /** The cadence-sampled value: OVER state, and the still when not live. */
  value: number;
  /** The shared deck clock; with activity, drives the needle per frame. */
  clock?: () => number;
  /** The live activity ledger the pure model reads. */
  activity?: { current: UtilizationEvent[] };
}

export function UtilizationMeter({
  value,
  clock,
  activity,
}: UtilizationMeterProps) {
  const needleX = useSpring(xFor(value), deckNeedleSpring);
  useEffect(() => {
    needleX.set(xFor(value));
  }, [value, needleX]);
  const over = value > UTIL_CEILING;

  const hostRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!clock || !activity) return;
    const host = hostRef.current;
    if (!host) return;
    let frame = 0;
    let running = false;
    let inView = true;
    const draw = () => {
      needleX.set(xFor(utilizationAt(clock(), activity.current)));
      frame = window.requestAnimationFrame(draw);
    };
    const syncLoop = () => {
      const should = inView && !document.hidden;
      if (should && !running) {
        running = true;
        frame = window.requestAnimationFrame(draw);
      } else if (!should && running) {
        running = false;
        window.cancelAnimationFrame(frame);
      }
    };
    const io =
      typeof IntersectionObserver === "undefined"
        ? null // jsdom
        : new IntersectionObserver((entries) => {
            inView = entries[0]?.isIntersecting ?? true;
            syncLoop();
          });
    io?.observe(host);
    const onVisibility = () => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);
    syncLoop();
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [clock, activity, needleX]);

  return (
    <svg
      ref={hostRef}
      className="deck-meter"
      viewBox="0 0 300 40"
      aria-hidden="true"
      data-over={over ? "" : undefined}
    >
      <line
        className="deck-meter__track"
        x1={TAPE.left}
        x2={TAPE.right}
        y1={TAPE.y}
        y2={TAPE.y}
      />
      {/* The A2 working band, annotated the way the source annotates it. */}
      <line
        className="deck-meter__band"
        x1={xFor(UTIL_A2.from)}
        x2={xFor(UTIL_A2.to)}
        y1={TAPE.y}
        y2={TAPE.y}
      />
      <text
        className="deck-meter__band-label"
        x={(xFor(UTIL_A2.from) + xFor(UTIL_A2.to)) / 2}
        y={TAPE.y + 13}
        textAnchor="middle"
      >
        A2
      </text>
      {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
        <line
          key={tick}
          className="deck-meter__tick"
          x1={xFor(tick)}
          x2={xFor(tick)}
          y1={TAPE.y - 3}
          y2={TAPE.y + 3}
        />
      ))}
      {/* The ceiling: taller than the ruler ticks, it means something. */}
      <line
        className="deck-meter__ceiling"
        x1={xFor(UTIL_CEILING)}
        x2={xFor(UTIL_CEILING)}
        y1={TAPE.y - 8}
        y2={TAPE.y + 5}
      />
      <motion.g style={{ x: needleX }}>
        <line
          className="deck-meter__needle"
          x1={0}
          x2={0}
          y1={TAPE.y - 12}
          y2={TAPE.y + 5}
        />
        {over ? (
          <text className="deck-meter__over" x={0} y={TAPE.y - 16} textAnchor="middle">
            OVER
          </text>
        ) : null}
      </motion.g>
    </svg>
  );
}
