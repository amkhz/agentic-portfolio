/**
 * Per-work sigil registry, keyed by manifest slug (the Works 02+ template,
 * mirroring WorkView's component registry). Sigils are standalone leaf
 * modules: tiny static SVG components with zero deck imports, safe for the
 * lab shelf to import eagerly without breaking chunk isolation (ADR-017 D5).
 */
import type { ComponentType } from "react";
import { FlightDeckSigil } from "./FlightDeckSigil";

export const workSigils: Record<string, ComponentType<{ className?: string }>> =
  {
    "flight-deck": FlightDeckSigil,
  };
