import { useParams, Link, Navigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { renderSection } from "@/components/content/renderSection";
import { notesBySlug } from "@core/content/notes";
import { formatNoteDate } from "@core/utils/format";

/** Back-to-notes link, styled as a mono dossier marker (matches case studies). */
function BackLink({ label }: { label: string }) {
  return (
    <Link
      to="/notes"
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <span aria-hidden="true">&larr;</span>
      {label}
    </Link>
  );
}

export function NotePage() {
  const { slug } = useParams<{ slug: string }>();
  const note = slug ? notesBySlug[slug] : undefined;
  if (!note) return <Navigate to="/notes" replace />;

  const { title, summary, date, kicker } = note.frontmatter;

  const sectionNodes = note.sections.map((section, index) => {
    const hasHeading =
      "heading" in section &&
      typeof section.heading === "string" &&
      section.heading.length > 0;
    return renderSection(section, index, hasHeading ? "h2" : undefined);
  });

  return (
    <article>
      <Helmet>
        <title>{`${title} | Justin Hernandez`}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://justinh.design/notes/${note.slug}`} />
      </Helmet>

      {/* Hero — single-column reading register: kicker, title, dek, dateline.
          No cover plate; notes are prose, not case files. */}
      <section className="border-b border-border-subtle pb-12 pt-24 sm:pt-32">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <BackLink label="All notes" />
          </nav>

          <div className="max-w-[68ch]">
            <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
              {kicker ?? "Note"}
            </p>

            <h1 className="mt-4 max-w-[24ch] font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-[60ch] font-body text-lg leading-normal text-text-secondary">
              {summary}
            </p>

            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-text-secondary">
              <time dateTime={date}>{formatNoteDate(date)}</time>
            </p>
          </div>
        </Container>
      </section>

      {/* Body — shares the case-study section pipeline and reading measure. */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto flex max-w-[68ch] flex-col gap-10 sm:gap-14">
            {sectionNodes}
          </div>

          <div className="mx-auto mt-16 max-w-[68ch] border-t border-border-subtle pt-10">
            <BackLink label="Back to all notes" />
          </div>
        </Container>
      </section>
    </article>
  );
}
