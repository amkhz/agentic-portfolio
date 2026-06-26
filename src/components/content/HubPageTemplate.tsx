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

/** One entry in the breadth layer. Items with a target study link out
 *  (brass owns the interaction); stated-scope items render inert. */
function BodyOfWorkItem({
  item,
}: {
  item: NonNullable<NonNullable<CaseStudy["hub"]>["bodyOfWork"]>["items"][number];
}) {
  const target = item.slug
    ? caseStudies.find((s) => s.slug === item.slug)
    : undefined;

  const label = (
    <h3 className="font-display text-xl leading-tight tracking-tight text-text-primary">
      {item.label}
    </h3>
  );
  const line = (
    <p className="mt-2 max-w-[44ch] font-body text-base leading-normal text-text-secondary">
      {item.line}
    </p>
  );

  if (!target) {
    return (
      <div className="border-t border-border-subtle pt-6">
        {label}
        {line}
      </div>
    );
  }

  return (
    <Link
      to={`/work/${target.slug}`}
      className="group block border-t border-border-subtle pt-6 transition-colors duration-normal hover:[border-color:var(--fieldnote-rule-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
    >
      <h3 className="font-display text-xl leading-tight tracking-tight text-text-primary transition-colors duration-normal group-hover:text-accent-primary group-focus-visible:text-accent-primary">
        {item.label}
      </h3>
      {line}
      <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-primary">
        Read the story
        <span
          aria-hidden="true"
          className="transition-transform duration-normal group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

export function HubPageTemplate({ slug }: HubPageProps) {
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study?.hub) return <Navigate to="/work" replace />;

  const { headline, body, doors, bodyOfWork } = study.hub;
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

          {bodyOfWork && (
            <div className="mt-20">
              <h2 className="font-display text-2xl leading-snug tracking-tight text-text-primary sm:text-3xl">
                {bodyOfWork.heading}
              </h2>
              {bodyOfWork.intro && (
                <p className="mt-4 max-w-[60ch] font-body text-lg leading-normal text-text-secondary">
                  {parseInline(bodyOfWork.intro)}
                </p>
              )}
              <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {bodyOfWork.items.map((item) => (
                  <BodyOfWorkItem key={item.label} item={item} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 border-t border-border-subtle pt-10">
            <BackLink label="Back to all work" />
          </div>
        </Container>
      </section>
    </article>
  );
}
