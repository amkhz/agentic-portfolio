import { useState, useEffect, useCallback, useRef } from "react";
import { fetchNowPlaying } from "@services/lastfm";
import type { NowPlayingData } from "@core/content/lastfm";

const POLL_INTERVAL = 30_000;

export function useNowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const lastGoodData = useRef<NowPlayingData | null>(null);

  const poll = useCallback(async () => {
    try {
      const result = await fetchNowPlaying();
      setData(result);
      lastGoodData.current = result;
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
      // Keep showing last known good data
      if (lastGoodData.current) {
        setData(lastGoodData.current);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    poll();

    const interval = setInterval(() => {
      if (!document.hidden) {
        poll();
      }
    }, POLL_INTERVAL);

    const handleVisibility = () => {
      if (!document.hidden) {
        poll();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [poll]);

  return { data, isLoading, error };
}
