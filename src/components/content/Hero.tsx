import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { RegistrationMark } from "@/components/fieldnotebook";

/**
 * Home hero - "The Conservatory" register (ADR-013 / DESIGN.md).
 * Image-forward, asymmetric editorial composition over an atmospheric
 * biophilic atrium. Echoes the Field Notebook grammar: a mono kicker,
 * registration marks framing the type column, and a humus scrim that keeps
 * the copy anchored to the lower-left rather than centered.
 *
 * NOTE: the hero image is a Sprint 0 north-star placeholder
 * (mocks/recalibration-sprint0). Production finals (V4_QUALITY_48 at the
 * real crop) land in Plan A Phase 3.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[82vh] items-end overflow-hidden bg-bg-deep">
      {/* Atmospheric anchor - inhabited biophilic atrium */}
      <img
        src="/images/conservatory-hero.png"
        alt="A soaring biophilic atrium at night, mature trees rising through warm-lit architecture with people gathered below"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      {/* Warm scrim for legibility - humus-black, densest at lower-left.
          References tokens only (bg-deep -> transparent), no literal color. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, var(--theme-bg-deep) 6%, transparent 64%), linear-gradient(to right, var(--theme-bg-deep) 4%, transparent 52%)",
        }}
      />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-24 sm:pt-44">
        {/* Type column framed as an instrument plate - registration marks in
            the margin, no panel fill, so the atrium reads through. */}
        <div className="relative max-w-[60ch] pl-5 sm:pl-7">
          <RegistrationMark corners={["tl", "bl"]} />

          <p className="font-mono text-xs uppercase tracking-wider text-accent-primary">
            <span className="tabular-nums text-text-secondary">00</span>
            <span aria-hidden="true" className="mx-2 text-text-muted">
              /
            </span>
            Product design leadership
          </p>
          <h1 className="mt-4 max-w-[20ch] font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
            Making complex things clear, useful, and human
          </h1>
          <p className="mt-6 max-w-[54ch] font-body text-lg leading-normal text-text-secondary">
            Product design leader turning complex problems into trusted
            experiences, blending human judgment with AI.
          </p>
          <div className="mt-10">
            <Button variant="primary" href="#work">
              View My Work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
