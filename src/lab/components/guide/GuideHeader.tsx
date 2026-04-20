import type { Guide, SourceMeta } from "@core/lab/guide-types";

interface GuideHeaderProps {
  guide: Guide;
}

export function GuideHeader({ guide }: GuideHeaderProps) {
  const { kicker, title, description, source } = guide.frontmatter;
  return (
    <header className="pt-16 pb-10">
      <p className="font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted">
        {kicker}
      </p>
      <h1
        id="guide-title"
        className="mt-6 font-lab-heading text-3xl font-semibold tracking-tight text-lab-text-primary md:text-5xl md:leading-tight"
      >
        {title}
      </h1>
      <p className="mt-6 font-lab-body text-lg leading-relaxed text-lab-text-secondary md:text-xl">
        {description}
      </p>
      <SourceLine source={source} />
    </header>
  );
}

function SourceLine({ source }: { source: SourceMeta }) {
  const { authors, year, venue, url } = source;
  const body = `${authors} · ${year} · ${venue}`;
  return (
    <p className="mt-8 font-lab-mono text-sm tracking-wide text-lab-text-muted">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lab-text-secondary hover:text-guide-accent hover:underline"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </p>
  );
}
