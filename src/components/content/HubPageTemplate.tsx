import { Link, Navigate } from "react-router";
import { caseStudies } from "@core/content/case-studies";
import type { CaseStudy } from "@core/content/case-studies";
import { Container } from "@/components/layout/Container";
import { DossierFrame } from "@/components/fieldnotebook";
import { parseInline } from "@/lib/parseInline";

interface HubPageProps {
  slug: string;
}

/** Back-to-work link, styled as a mono dossier marker. */
function BackLink({ label }: { label: string }) {
  return (
    <Link
      to="/work"
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <span aria-hidden="true">&larr;</span>
      {label}
    </Link>
  );
}

/** A door into one of the studies the hub introduces. Brass owns the
 *  interaction; the study's title/subtitle come from its own metadata. */
function DoorCard({
  door,
}: {
  door: NonNullable<CaseStudy["hub"]>["doors"][number];
}) {
  const target = caseStudies.find((s) => s.slug === door.slug);
  if (!target) return null;

  return (
    <Link
      to={`/work/${target.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <DossierFrame className="h-full bg-bg-base transition-colors duration-normal group-hover:[border-color:var(--fieldnote-rule-strong)] group-focus-visible:[border-color:var(--fieldnote-rule-strong)]">
        <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
          {door.label}
        </span>
        <h2 className="mt-3 max-w-[20ch] font-display text-2xl leading-tight tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary group-focus-visible:text-accent-primary sm:text-3xl">
          {target.title}
        </h2>
        <p className="mt-3 max-w-[40ch] font-body text-base leading-normal text-text-secondary">
          {door.line}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-primary">
          Read the story
          <span
            aria-hidden="true"
            className="transition-transform duration-normal group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </DossierFrame>
    </Link>
  );
}

export function HubPageTemplate({ slug }: HubPageProps) {
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study?.hub) return <Navigate to="/work" replace />;

  const { headline, body, doors } = study.hub;
  const kicker = study.title;

  return (
    <article>
      {/* Thesis — the opinionated position the doors prove out */}
      <section className="border-b border-border-subtle pb-14 pt-24 sm:pt-32">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <BackLink label="All work" />
          </nav>

          <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
            {kicker}
          </p>
          <h1 className="mt-4 max-w-[20ch] font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-[60ch] font-body text-lg leading-normal text-text-secondary">
            {parseInline(body)}
          </p>
        </Container>
      </section>

      {/* The two doors */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {doors.map((door) => (
              <DoorCard key={door.slug} door={door} />
            ))}
          </div>

          <div className="mt-16 border-t border-border-subtle pt-10">
            <BackLink label="Back to all work" />
          </div>
        </Container>
      </section>
    </article>
  );
}
