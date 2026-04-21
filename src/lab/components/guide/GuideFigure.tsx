import type { Figure } from "@core/lab/guide-types";

interface GuideFigureProps {
  figure: Figure;
  guideSlug: string;
}

export function GuideFigure({ figure, guideSlug }: GuideFigureProps) {
  const src = `/labs/figures/${guideSlug}/${figure.file}`;
  const background = figure.background ?? "paper";

  const image = (
    <img
      src={src}
      alt={figure.alt}
      loading="lazy"
      className={
        background === "invert"
          ? "mx-auto block max-h-[640px] w-full object-contain invert"
          : "mx-auto block max-h-[640px] w-full object-contain"
      }
    />
  );

  const body =
    background === "paper" ? (
      <div className="rounded-md border border-lab-figure-border bg-lab-figure-bg p-4 md:p-6">
        <div className="text-lab-figure-text">{image}</div>
      </div>
    ) : (
      image
    );

  return (
    <figure className="my-10">
      {body}
      <figcaption className="mt-3 font-lab-mono text-xs leading-relaxed tracking-wide text-lab-text-muted">
        {figure.caption}
      </figcaption>
    </figure>
  );
}
