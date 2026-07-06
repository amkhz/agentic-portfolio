import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router";
import { guidesBySlug } from "@core/lab/guides";
import { GuideRenderer } from "@lab/components/guide/GuideRenderer";
import { NotFoundPage } from "./NotFoundPage";
import { SITE_TAB } from "@/lib/tabOrder";

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
    description.length > 160
      ? `${description.slice(0, 157).trimEnd()}…`
      : description;

  return (
    <>
      <Helmet>
        <title>{`${title} — Perihelion Archive`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
      </Helmet>
      {/* Back links ride the same reading grid as GuideRenderer (empty rail
          track + content column) so they align with the guide title and the
          rail, not the old centered max-w-4xl box. */}
      <div className="mx-auto w-full px-6 pt-8 md:px-10">
        <div className="lab-reading-grid">
          <div aria-hidden className="hidden lg:block" />
          <div className="lab-reading-col">
            <Link
              tabIndex={SITE_TAB}
              to="/"
              className="inline-flex min-h-11 items-center gap-2 font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-guide-accent"
            >
              <span aria-hidden>←</span>
              Library
            </Link>
          </div>
        </div>
      </div>
      <GuideRenderer guide={guide} />
      <div className="mx-auto w-full px-6 pb-16 pt-4 md:px-10">
        <div className="lab-reading-grid">
          <div aria-hidden className="hidden lg:block" />
          <div className="lab-reading-col">
            <Link
              tabIndex={SITE_TAB}
              to="/"
              className="inline-flex min-h-11 items-center gap-2 font-lab-mono text-xs uppercase tracking-wider text-lab-text-muted transition-colors duration-[var(--duration-fast)] hover:text-guide-accent"
            >
              <span aria-hidden>←</span>
              Back to the library
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
