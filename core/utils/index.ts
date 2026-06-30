import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Upper bound (ms) for a scroll-reveal stagger delay.
 *
 * Consumers cascade with `delay={i * step}`. On single-column mobile that tail
 * compounds — a 5+ item grid finishing well past a second reads as sluggish.
 * Capping the effective delay keeps the cascade legible without editing every
 * call site. Four steps of 100ms still give a clear cascade before the cap.
 */
export const REVEAL_DELAY_CAP_MS = 300;

/**
 * Clamp a scroll-reveal stagger delay into a sane range: never negative, never
 * past REVEAL_DELAY_CAP_MS. Pure — lives in core so it stays testable and the
 * UI layer just calls it.
 */
export function clampRevealDelay(delay: number): number {
  if (!Number.isFinite(delay) || delay <= 0) return 0;
  return Math.min(delay, REVEAL_DELAY_CAP_MS);
}
