import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { caseStudies, metaCaseStudy } from "@core/content/case-studies";
import { CaseStudyPageTemplate } from "@/components/content/CaseStudyPage";
import { ConstellationPageTemplate } from "@/components/content/ConstellationPage";

const allProjects = [...caseStudies, metaCaseStudy];

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = allProjects.find((s) => s.slug === slug);

  return (
    <>
      {study && (
        <Helmet>
          <title>{study.title} | Justin Hernandez</title>
          <meta name="description" content={study.subtitle} />
          <link rel="canonical" href={`https://justinh.design/work/${study.slug}`} />
        </Helmet>
      )}
      {study?.template === "constellation" ? (
        <ConstellationPageTemplate slug={slug!} />
      ) : (
        <CaseStudyPageTemplate slug={slug!} />
      )}
    </>
  );
}
