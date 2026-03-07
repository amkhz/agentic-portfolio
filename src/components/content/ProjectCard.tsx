import { Link } from "react-router";
import type { CaseStudy } from "@core/tokens";
import { Tag } from "@/components/interactive/Tag";
import { SpotlightCard } from "@/components/effects/SpotlightCard";

interface ProjectCardProps {
  study: CaseStudy;
}

function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export function ProjectCard({ study }: ProjectCardProps) {
  const hasRealImage =
    typeof study.heroImage.src === "string" &&
    study.heroImage.src.length > 0 &&
    !study.heroImage.src.includes("placeholder-");

  return (
    <SpotlightCard className="p-0 bg-bg-base border-border-subtle hover:border-accent-primary hover:shadow-glow-brass transition-all duration-normal">
      <Link
        to={`/work/${study.slug}`}
        className="group block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
      >
          {hasRealImage ? (
        <div className="relative aspect-video overflow-hidden border-b border-border-subtle bg-bg-elevated">
          <img
            src={study.heroImage.src}
            alt={study.heroImage.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="relative flex aspect-video items-center justify-center border-b border-border-subtle bg-bg-elevated"
          role="img"
          aria-label={study.heroImage.alt}
        >
          <div className="flex flex-col items-center gap-2 px-6">
            <span className="text-text-muted">
              <ImageIcon />
            </span>
            <span className="text-center font-body text-sm leading-normal text-text-muted">
              {study.heroImage.placeholder}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary">
          {study.title}
        </h3>

        <p className="mt-2 line-clamp-2 font-body text-base leading-normal text-text-secondary">
          {study.subtitle}
        </p>

        {study.heroMetric && (
          <p className="mt-2 font-heading text-sm tracking-wide text-text-muted">
            {study.heroMetric.value} - {study.heroMetric.label}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Tag
              key={tag}
              className="bg-bg-subtle transition-colors duration-normal group-hover:border-border-strong"
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      </Link>
    </SpotlightCard>
  );
}
