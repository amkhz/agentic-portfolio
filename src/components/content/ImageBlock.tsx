import { cn } from "@core/utils";

interface ImageBlockProps {
  src: string;
  alt: string;
  placeholder?: string;
  caption?: string;
  aspect?: "16:9" | "4:3" | "auto";
}

const aspectMap = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  auto: "aspect-auto min-h-[200px]",
} as const;

export function ImageBlock({
  src,
  alt,
  placeholder,
  caption,
  aspect = "16:9",
}: ImageBlockProps) {
  const displayText = placeholder || alt;
  const hasRealImage =
    typeof src === "string" &&
    src.length > 0 &&
    !src.includes("placeholder-");

  return (
    <figure className="my-8">
      {hasRealImage ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated",
            aspectMap[aspect]
          )}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated",
            aspectMap[aspect]
          )}
        >
          <svg
            aria-hidden="true"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-3 text-text-muted"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>

          <span className="max-w-[48ch] px-6 text-center font-body text-sm leading-normal text-text-muted">
            {displayText}
          </span>
        </div>
      )}

      {caption && (
        <figcaption className="mt-3 text-center font-body text-sm text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
