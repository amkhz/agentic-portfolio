import { useState } from "react";
import { useNowPlaying } from "@/lib/useNowPlaying";
import { cn } from "@core/utils";

const PROFILE_URL = "https://www.last.fm/user/amkhz_";

function EqBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <span aria-hidden="true" className="flex items-end gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-[3px] rounded-full bg-accent-primary"
          style={{
            height: isPlaying ? "12px" : "6px",
            animation: isPlaying
              ? `nowplaying-bar 1.2s ease-in-out ${i * 0.2}s infinite`
              : "none",
          }}
        />
      ))}
    </span>
  );
}

export function NowPlaying({ className }: { className?: string }) {
  const { data, isLoading, error } = useNowPlaying();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading || (!data && !error)) return null;
  if (error && !data) return null;

  const { isPlaying, track } = data!;
  if (!track) return null;

  const statusLabel = isPlaying ? "Listening to" : "Recently played";

  return (
    <div className={cn("border-t border-border-subtle", className)}>
      <div className="mx-auto max-w-5xl px-6">
      <div className="ml-auto flex w-fit items-center gap-3 py-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 transition-colors duration-200 hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
              aria-expanded={isExpanded}
            >
              <EqBars isPlaying={isPlaying} />
              <span className="font-heading text-[11px] font-medium uppercase tracking-wide text-text-muted">
                {statusLabel}
              </span>
              <span className="truncate font-body text-xs text-text-secondary">
                {track.name}
                <span className="text-text-muted"> — {track.artist}</span>
              </span>
            </button>

            {isExpanded && (
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-accent-primary"
                aria-label={`${track.name} by ${track.artist}. View Last.fm profile.`}
              >
                {track.albumArt ? (
                  <img
                    src={track.albumArt}
                    alt={`${track.album} album art`}
                    width={36}
                    height={36}
                    className={cn(
                      "rounded shadow-md",
                      isPlaying && "shadow-[0_0_12px_var(--theme-accent-glow)]"
                    )}
                  />
                ) : (
                  <div className="h-9 w-9 rounded bg-bg-subtle" aria-hidden="true" />
                )}

                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-heading text-xs font-medium text-text-primary">
                    {track.name}
                  </span>
                  <span className="truncate font-body text-[11px] text-text-muted">
                    {track.artist}
                  </span>
                </div>
              </a>
            )}
          </div>
      </div>
    </div>
  );
}
