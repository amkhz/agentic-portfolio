import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { GlowEffect } from "@/components/effects/GlowEffect";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <GlowEffect color="brass" size="lg" className="top-[15%]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <h1 className="max-w-[18ch] font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
          Making complex things clear, useful, and human
        </h1>

        <p className="mt-6 max-w-[56ch] font-body text-lg leading-normal text-text-secondary">
          Product design leader who turns messy, complex problems into
          experiences people can trust. Right now, that means creating
          with AI.
        </p>

        <div className="mt-10">
          <Button variant="primary" href="#work">
            View My Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
