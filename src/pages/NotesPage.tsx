import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import {
  DossierFrame,
  RegistrationMark,
  TocLinkList,
  type TocItem,
} from "@/components/fieldnotebook";
import { HeroScrim } from "@/components/content/HeroScrim";
import { ResponsiveImage } from "@/components/content/ResponsiveImage";
import { notes } from "@core/content/notes";
import { formatNoteDate } from "@core/utils/format";

const tocItems: TocItem[] = notes.map((note, i) => ({
  id: note.slug,
  label: note.frontmatter.title,
  to: `/notes/${note.slug}`,
  index: String(i + 1).padStart(2, "0"),
  description: note.frontmatter.summary,
  trailing: formatNoteDate(note.frontmatter.date),
}));

/** Shown until the first note ships (T3b). Keeps the surface honest and
 *  on-register instead of rendering an empty frame. */
function EmptyState() {
  return (
    <DossierFrame kicker="Field notebook" className="bg-bg-base">
      <div className="py-6 sm:py-8">
        <h2 className="font-display text-2xl leading-tight tracking-tight text-text-primary sm:text-3xl">
          Notes are being set in type.
        </h2>
        <p className="mt-4 max-w-[56ch] font-body text-base leading-normal text-text-secondary sm:text-lg">
          Short writing on how I work: design infrastructure over deliverables,
          the way an AI-native practice actually runs, and what a year of it
          taught me. The first entries are on the press.
        </p>
      </div>
    </DossierFrame>
  );
}

export function NotesPage() {
  return (
    <>
      <Helmet>
        <title>Notes | Justin Hernandez</title>
        <meta
          name="description"
          content="Short writing on design infrastructure, AI-native practice, and the craft of working with agents."
        />
        <link rel="canonical" href="https://justinh.design/notes" />
      </Helmet>

      {/* Hero — quieter than Work: type-forward marginalia, no full-bleed
          image. Notes are the reflective register, not the case-file register. */}
      <section className="relative isolate flex min-h-[44vh] items-end overflow-hidden bg-bg-deep">
        <ResponsiveImage
          src="/images/work-hero.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-40"
          loading="eager"
          sizes="100vw"
        />
        <HeroScrim top bottom left />

        <Container className="relative z-10 pb-14 pt-32 sm:pb-20 sm:pt-40">
          <div className="relative max-w-[60ch] py-8 pl-9 sm:py-10 sm:pl-14">
            <RegistrationMark corners={["tl", "bl"]} />
            <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
              Marginalia
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
              Notes
            </h1>
            <p className="mt-5 max-w-[54ch] font-body text-lg leading-normal text-text-secondary">
              Working notes on design infrastructure, AI-native practice, and
              the craft of building with agents.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          {notes.length > 0 ? (
            <DossierFrame kicker="Entries" className="bg-bg-base">
              <TocLinkList items={tocItems} ariaLabel="Notes entries" reveal revealStagger={0.14} />
            </DossierFrame>
          ) : (
            <RevealOnScroll>
              <EmptyState />
            </RevealOnScroll>
          )}
        </Container>
      </section>
    </>
  );
}
