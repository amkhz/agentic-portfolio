import { ImageBlock } from "./ImageBlock";

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
