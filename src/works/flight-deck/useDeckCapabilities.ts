import { useEffect, useState } from "react";
import {
  decideDeckMode,
  type DeckCapabilities,
  type DeckMode,
} from "@core/works/flight-deck/deck-mode";

function probeWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

function readCapabilities(webgl: boolean): DeckCapabilities {
  return {
    viewportWidth: window.innerWidth,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl,
  };
}

/**
 * Gathers the DOM facts; core/works/flight-deck/deck-mode.ts owns the
 * decision. WebGL is probed once; width and motion preference are live.
 */
export function useDeckCapabilities(): DeckMode {
  const [webgl] = useState(probeWebgl);
  const [mode, setMode] = useState<DeckMode>(() =>
    decideDeckMode(readCapabilities(webgl)),
  );

  useEffect(() => {
    const update = () => setMode(decideDeckMode(readCapabilities(webgl)));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", update);
    motionQuery.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      motionQuery.removeEventListener("change", update);
    };
  }, [webgl]);

  return mode;
}
