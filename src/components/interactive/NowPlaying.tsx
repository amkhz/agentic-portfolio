import { useState } from "react";
import { useNowPlaying } from "@/lib/useNowPlaying";
import { DecryptedText } from "@/components/effects/DecryptedText";
import { cn } from "@core/utils";

const PROFILE_URL = "https://www.last.fm/user/amkhz_";

/** Each bar gets a keyframe variant, duration, and negative delay for organic stagger. */
const BAR_CONFIG = [
  { anim: "eq-bar-a", duration: 1.1, delay: 0.0 },
  { anim: "eq-bar-b", duration: 1.5, delay: 0.35 },
  { anim: "eq-bar-c", duration: 0.95, delay: 0.15 },
  { anim: "eq-bar-a", duration: 1.35, delay: 0.5 },
  { anim: "eq-bar-b", duration: 1.05, delay: 0.2 },
];

function EqBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-end gap-[4px]"
      style={{
        filter: isPlaying
          ? "drop-shadow(0 0 4px var(--theme-accent-glow))"
          : "none",
        transition: "filter 300ms ease-out",
      }}
    >
      {BAR_CONFIG.map((bar, i) => (
        <span
          key={i}
          className="inline-block w-[3.5px] rounded-full"
          style={{
            height: "14px",
            transformOrigin: "bottom",
            willChange: isPlaying ? "transform" : "auto",
            background: `linear-gradient(to top in oklch, var(--theme-accent-primary), var(--theme-secondary-primary))`,
            transform: isPlaying ? undefined : "scaleY(0.3)",
            transition: "transform 300ms ease-out",
            animation: isPlaying
              ? `${bar.anim} ${bar.duration}s ease-in-out -${bar.delay}s infinite`
              : "none",
          }}
        />
      ))}
    </span>
  );
}

export function NowPlaying({ className }: { className?: string }) {
  const { data, isLoading, error } = useNowPlaying();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading || (!data && !error)) return null;
  if (error && !data) return null;

  const { isPlaying, track } = data!;
  if (!track) return null;

  const statusLabel = isPlaying ? "Now listening" : "Last listened";

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0",
        "top-full z-40",
        className
      )}
    >
      {/* Tab + expanded panel container */}
      <div className="flex w-[280px] flex-col items-stretch sm:w-auto">
        {/* Tab trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex items-center justify-end gap-2.5 px-4 py-2",
            "bg-bg-elevated/80 backdrop-blur-md border-x border-border-subtle",
            isOpen ? "border-b-0" : "border-b rounded-b-lg",
            "cursor-pointer transition-colors duration-normal",
            "hover:bg-bg-subtle",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
          )}
          aria-expanded={isOpen}
          aria-label={`${statusLabel}: ${track.name} by ${track.artist}. Click to ${isOpen ? "collapse" : "expand"}.`}
        >
          <EqBars isPlaying={isPlaying} />
          <span className="ml-auto flex items-center gap-2.5">
            <span className="font-heading text-[11px] font-medium uppercase tracking-wide text-text-muted">
              {statusLabel}
            </span>
            <svg
            aria-hidden="true"
            className={cn(
              "h-3 w-3 text-text-muted transition-transform duration-normal",
              isOpen && "rotate-180"
            )}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 4.5 L6 7.5 L9 4.5" />
          </svg>
          </span>
        </button>

        {/* Expanded panel */}
        <div
          className={cn(
            "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-slower motion-safe:ease-spring",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "flex items-center gap-3 px-4 pb-3 pt-1",
                "motion-safe:transition-opacity motion-safe:duration-slower motion-safe:ease-spring",
                isOpen ? "opacity-100" : "opacity-0",
                "bg-bg-elevated/80 backdrop-blur-md border-x border-b border-border-subtle",
                "rounded-b-lg"
              )}
            >
              {track.albumArt ? (
                <img
                  src={track.albumArt}
                  alt={`${track.album} album art`}
                  width={48}
                  height={48}
                  className={cn(
                    "h-10 w-10 sm:h-12 sm:w-12 rounded-md transition-shadow duration-slow",
                    isPlaying && "shadow-[0_0_12px_var(--theme-accent-glow)]"
                  )}
                />
              ) : (
                <div
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-bg-subtle"
                  aria-hidden="true"
                />
              )}

              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate font-heading text-sm font-medium text-text-primary">
                  <DecryptedText
                    text={track.name}
                    speed={40}
                    className="text-text-primary"
                    encryptedClassName="text-text-muted"
                  />
                </span>
                <span className="truncate font-body text-xs text-text-muted">
                  {track.artist}
                </span>
              </div>

              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex-shrink-0 rounded-md p-2.5 text-text-muted transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
                aria-label="View Last.fm profile"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V11" />
                  <path d="M9 2h5v5" />
                  <path d="M14 2 7 9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
