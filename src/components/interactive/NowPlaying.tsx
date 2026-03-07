import { useNowPlaying } from "@/lib/useNowPlaying";
import { cn } from "@core/utils";

export function NowPlaying({ className }: { className?: string }) {
  const { data, isLoading, error } = useNowPlaying();

  if (isLoading || (!data && !error)) {
    return null;
  }

  if (error && !data) {
    return null;
  }

  const { isPlaying, track } = data!;

  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
        className
      )}
      aria-label={`${isPlaying ? "Now playing" : "Last played"}: ${track.name} by ${track.artist}`}
    >
      {track.albumArt ? (
        <img
          src={track.albumArt}
          alt={`${track.album} album art`}
          width={32}
          height={32}
          className={cn(
            "rounded shadow-md",
            isPlaying && "shadow-[0_0_12px_var(--theme-accent-glow)]"
          )}
        />
      ) : (
        <div className="h-8 w-8 rounded bg-bg-subtle" aria-hidden="true" />
      )}

      <div className="flex min-w-0 flex-col">
        <span className="truncate font-heading text-xs font-medium text-text-primary">
          {track.name}
        </span>
        <span className="truncate font-body text-[11px] text-text-muted">
          {track.artist}
        </span>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "ml-auto flex items-center gap-[3px]",
          !isPlaying && "opacity-0"
        )}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-[3px] rounded-full bg-accent-primary"
            style={{
              height: "12px",
              animation: isPlaying
                ? `nowplaying-bar 1.2s ease-in-out ${i * 0.2}s infinite`
                : "none",
            }}
          />
        ))}
      </span>
    </a>
  );
}
