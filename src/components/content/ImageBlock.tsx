import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@core/utils";
import { ImageLightbox } from "./ImageLightbox";
import { ResponsiveImage } from "./ResponsiveImage";
import { ParallaxImage } from "@/components/effects/ParallaxImage";

interface ImageBlockProps {
  src: string;
  alt: string;
  placeholder?: string;
  caption?: string;
  aspect?: "16:9" | "4:3" | "auto";
  /** Allow click-to-expand lightbox. Default: true for real images. */
  expandable?: boolean;
  /** Flush plate mode: no figure margin, no rounded border of its own, and the
   *  image fills (object-cover). For mounting inside a DossierFrame cover. */
  bare?: boolean;
  /** Subtle scroll-linked parallax on the image, clipped within the slot. For
   *  case-study cover plates. Honors reduced-motion. */
  parallax?: boolean;
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
  expandable,
  bare = false,
  parallax = false,
}: ImageBlockProps) {
  const displayText = placeholder || alt;
  const hasRealImage =
    typeof src === "string" &&
    src.length > 0 &&
    !src.includes("placeholder-");

  const canExpand = expandable ?? hasRealImage;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <figure className={bare ? "" : "my-8"}>
        {hasRealImage ? (
          <div
            role={canExpand ? "button" : undefined}
            tabIndex={canExpand ? 0 : undefined}
            onClick={canExpand ? () => setIsOpen(true) : undefined}
            onKeyDown={
              canExpand
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsOpen(true);
                    }
                  }
                : undefined
            }
            aria-label={canExpand ? `View full size: ${alt}` : undefined}
            className={cn(
              "relative overflow-hidden bg-bg-elevated",
              !bare && "border border-border-subtle",
              aspectMap[aspect],
              canExpand && !bare && "cursor-zoom-in transition-[border-color] duration-normal hover:border-accent-muted",
              canExpand && bare && "cursor-zoom-in",
              canExpand && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            )}
          >
            {parallax ? (
              <ParallaxImage src={src} alt={alt} />
            ) : (
              <ResponsiveImage
                src={src}
                alt={alt}
                loading="lazy"
                // Covers span most of the content column; body figures the same.
                sizes="(min-width: 768px) 760px, 100vw"
                className={cn(
                  "absolute inset-0 h-full w-full",
                  // Covers (DossierFrame heroes) fill to the frame edge; body
                  // figures stay fully visible. Matches the `bare` contract.
                  bare ? "object-cover" : "object-contain"
                )}
              />
            )}
          </div>
        ) : (
          <div
            role="img"
            aria-label={alt}
            className={cn(
              "flex flex-col items-center justify-center bg-bg-elevated",
              !bare && "border border-border-subtle",
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

      {isOpen && hasRealImage &&
        createPortal(
          <ImageLightbox src={src} alt={alt} onClose={() => setIsOpen(false)} />,
          document.body
        )}
    </>
  );
}
