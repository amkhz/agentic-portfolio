import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router";
import { guidesBySlug } from "@core/lab/guides";
import { GuideRenderer } from "@lab/components/guide/GuideRenderer";
import { NotFoundPage } from "./NotFoundPage";

export function GuideView() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? guidesBySlug[slug] : undefined;

  if (!guide) {
    return <NotFoundPage />;
  }

  const { title, description } = guide.frontmatter;
  // Search engines truncate meta descriptions around 155–160 chars; keep
  // the primary description as the meta so it never gets cut mid-citation.
  const metaDescription =
    description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description;

  return (
    <>
      <Helmet>
        <title>{`${title} — Frontier Lab`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="mx-auto max-w-4xl px-6 pt-8 md:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-guide-accent"
        >
          <span aria-hidden>←</span>
          Library
        </Link>
      </div>
      <GuideRenderer guide={guide} />
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-4 text-center md:px-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-guide-accent"
        >
          <span aria-hidden>←</span>
          Back to the library
        </Link>
      </div>
    </>
  );
}
