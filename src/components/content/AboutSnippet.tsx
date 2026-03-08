import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { ProfileCard } from "@/components/effects/ProfileCard";

export function AboutSnippet() {
  return (
    <section className="border-t border-border-subtle py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div className="w-full max-w-[280px]">
            <ProfileCard
              avatarUrl="/images/about.jpeg"
              avatarAlt="Portrait photo of Justin Hernandez"
              iconUrl="/images/oro.svg"
              iconAngle={-25}
              enableMobileTilt
            />
          </div>

          <div>
            <h2 className="font-display text-2xl leading-snug tracking-tight text-text-primary">
              Designer, technologist, builder
            </h2>

            <p className="mt-6 max-w-[65ch] font-body text-lg leading-normal text-text-secondary">
              I&apos;m a product designer, researcher, and force multiplier
              drawn to hard problems and new territory. For the past 15 years
              that&apos;s taken me across healthcare, fintech, e-commerce, and
              enterprise tools. Right now I&apos;m deep in AI, designing
              products where automation and human judgment have to coexist, and
              building the systems and knowledge that help teams work this way.
            </p>

            <div className="mt-8">
              <Button variant="ghost" href="/about" aria-label="Learn more about Justin Hernandez">
                More about me
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
