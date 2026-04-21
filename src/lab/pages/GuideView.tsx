import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
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
        <title>{`${title} — Speculative Design Lab`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
      </Helmet>
      <GuideRenderer guide={guide} />
    </>
  );
}
