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

  const { title, description, source } = guide.frontmatter;
  const citation = [source.authors, source.year, source.venue]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Helmet>
        <title>{`${title} — Speculative Design Lab`}</title>
        <meta name="description" content={`${description} Source: ${citation}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
      </Helmet>
      <GuideRenderer guide={guide} />
    </>
  );
}
