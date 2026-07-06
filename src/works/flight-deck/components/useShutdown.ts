import { useRef, type RefObject } from "react";
import type gsap from "gsap";
import type { useGSAP } from "@gsap/react";
import { deckCopy } from "@core/works/flight-deck/copy";
import { buildShutdownTimeline } from "../timelines/bootTimeline";

type ContextSafe = ReturnType<typeof useGSAP>["contextSafe"];

interface UseShutdownArgs {
  containerRef: RefObject<HTMLDivElement | null>;
  /** The boot ritual's timeline, killed so the mirror owns the stage. */
  timelineRef: RefObject<gsap.core.Timeline | null>;
  /** The hold scrub, if one is mid-flight. */
  scrubRef: RefObject<gsap.core.Tween | null>;
  contextSafe: ContextSafe;
  announce: (text: string) => void;
  onShutDown: () => void;
}

/**
 * The power-down (phase 7 live pass), extracted from DeckSession per
 * Roy's standing flag: the boot's mirror plays, then the parent resets
 * the machine and remounts the session fresh. Behavior-identical: the
 * bench goes inert for the power-down so nothing can start
 * choreography the remount will hard-kill (phase 7 Roy note); the
 * announcer sits outside the bench and keeps speaking.
 */
export function useShutdown({
  containerRef,
  timelineRef,
  scrubRef,
  contextSafe,
  announce,
  onShutDown,
}: UseShutdownArgs) {
  const shuttingDownRef = useRef(false);
  const onShutDownRef = useRef(onShutDown);
  onShutDownRef.current = onShutDown;
  const runShutdown = contextSafe(() => {
    const container = containerRef.current;
    if (!container || shuttingDownRef.current) return;
    shuttingDownRef.current = true;
    announce(deckCopy.shutdown.announced);
    container.querySelector(".deck-bench")?.setAttribute("inert", "");
    timelineRef.current?.kill();
    scrubRef.current?.kill();
    buildShutdownTimeline(container, () => onShutDownRef.current());
  });
  return runShutdown;
}
