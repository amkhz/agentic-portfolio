import { ImageBlock } from "./ImageBlock";

/** Two-up inside the content column: each cell is half the column less the
 *  gap, so the block must not inherit ImageBlock's full-column default. */
const HALF_COLUMN =
  "(min-width: 1200px) 560px, (min-width: 768px) calc((100vw - 92px) / 2), calc(100vw - 60px)";

interface ComparisonSide {
  label: string;
  image: {
    src: string;
    alt: string;
    placeholder: string;
  };
  description?: string;
}

interface ComparisonBlockProps {
  before: ComparisonSide;
  after: ComparisonSide;
}

export function ComparisonBlock({ before, after }: ComparisonBlockProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <span className="mb-3 inline-block font-heading text-sm uppercase tracking-wide text-text-muted">
          {before.label}
        </span>
        <ImageBlock
          src={before.image.src}
          alt={before.image.alt}
          placeholder={before.image.placeholder}
          aspect="4:3"
          sizes={HALF_COLUMN}
        />
        {before.description && (
          <p className="mt-2 font-body text-sm leading-normal text-text-secondary">
            {before.description}
          </p>
        )}
      </div>

      <div>
        <span className="mb-3 inline-block font-heading text-sm uppercase tracking-wide text-accent-primary">
          {after.label}
        </span>
        <ImageBlock
          src={after.image.src}
          alt={after.image.alt}
          placeholder={after.image.placeholder}
          aspect="4:3"
          sizes={HALF_COLUMN}
        />
        {after.description && (
          <p className="mt-2 font-body text-sm leading-normal text-text-secondary">
            {after.description}
          </p>
        )}
      </div>
    </div>
  );
}
