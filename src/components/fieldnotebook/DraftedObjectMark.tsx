import { DossierFrame } from "./DossierFrame";

/**
 * DraftedObjectMark — the per-project specimen plate (ADR-013 / DESIGN.md). A
 * dossier-framed slot holding the "drafted fantastical object" schematic, with
 * a mono caption beneath. This is the per-project mark system (resolves the
 * ADR-011 open mark question).
 *
 * Placeholder-aware: until the Phase 3 Wallace finals land, an empty or
 * placeholder src renders a labelled specimen frame rather than a broken image.
 */

interface DraftedObjectMarkProps {
  src?: string;
  alt: string;
  /** Mono caption beneath the plate, e.g. a specimen designation. */
  caption?: string;
  /** Text shown inside the frame when no real image is present. */
  placeholder?: string;
  /** CSS aspect-ratio for the plate. Default a portrait specimen. */
  aspect?: string;
  kicker?: string;
  className?: string;
}

function isRealImage(src?: string): src is string {
  return typeof src === "string" && src.length > 0 && !src.includes("placeholder-");
}

export function DraftedObjectMark({
  src,
  alt,
  caption,
  placeholder,
  aspect = "4 / 5",
  kicker,
  className,
}: DraftedObjectMarkProps) {
  return (
    <figure className={`flex flex-col gap-3 ${className ?? ""}`}>
      <DossierFrame kicker={kicker} className="bg-bg-base">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
          {isRealImage(src) ? (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div
              role="img"
              aria-label={alt}
              className="absolute inset-0 flex items-center justify-center px-6 text-center"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                {placeholder ?? "Specimen pending"}
              </span>
            </div>
          )}
        </div>
      </DossierFrame>

      {caption && (
        <figcaption className="font-mono text-xs uppercase tracking-wider text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
