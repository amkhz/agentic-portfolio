/**
 * useReadingPrefs — the reader's accommodation settings for the guide reading
 * view (T4), persisted the same way the theme is: a year-long cookie plus a
 * pre-paint script in labs.html that applies the CSS vars before first paint
 * (so a saved larger size never flashes at the default and jumps).
 *
 * The pure model — bounds, clamping, (de)serialization, the CSS-var mapping —
 * lives in @core/lab/reading-prefs. This hook owns only the cookie + DOM I/O.
 * It's used once, in GuideRenderer, which feeds both the desktop rail and the
 * mobile drawer, so no context is needed.
 */
import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_READING_PREFS,
  clampReadingPrefs,
  parseReadingPrefs,
  readingPrefsToCssVars,
  serializeReadingPrefs,
  type ReadingPrefs,
} from "@core/lab/reading-prefs";

const COOKIE_NAME = "labprefs";
const ONE_YEAR = 60 * 60 * 24 * 365;

function readCookie(): ReadingPrefs {
  if (typeof document === "undefined") return { ...DEFAULT_READING_PREFS };
  const match = document.cookie.match(/(?:^|;\s*)labprefs=([^;]+)/);
  return parseReadingPrefs(match ? decodeURIComponent(match[1]) : null);
}

function applyToDocument(prefs: ReadingPrefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const vars = readingPrefsToCssVars(prefs);
  for (const [prop, value] of Object.entries(vars)) {
    root.style.setProperty(prop, value);
  }
}

function writeCookie(prefs: ReadingPrefs) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(serializeReadingPrefs(prefs));
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${ONE_YEAR};SameSite=Lax`;
}

export interface UseReadingPrefs {
  prefs: ReadingPrefs;
  setPref: <K extends keyof ReadingPrefs>(key: K, value: ReadingPrefs[K]) => void;
  reset: () => void;
}

export function useReadingPrefs(): UseReadingPrefs {
  const [prefs, setPrefs] = useState<ReadingPrefs>(() => readCookie());

  // Re-resolve on mount (SSR-safe: the initializer may have run before the
  // cookie was readable) and mirror the pre-paint script's applied vars.
  useEffect(() => {
    const resolved = readCookie();
    setPrefs(resolved);
    applyToDocument(resolved);
  }, []);

  const commit = useCallback((next: ReadingPrefs) => {
    const clamped = clampReadingPrefs(next);
    setPrefs(clamped);
    applyToDocument(clamped);
    writeCookie(clamped);
  }, []);

  const setPref = useCallback<UseReadingPrefs["setPref"]>(
    (key, value) => {
      setPrefs((prev) => {
        const next = clampReadingPrefs({ ...prev, [key]: value });
        applyToDocument(next);
        writeCookie(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => commit({ ...DEFAULT_READING_PREFS }), [commit]);

  return { prefs, setPref, reset };
}
