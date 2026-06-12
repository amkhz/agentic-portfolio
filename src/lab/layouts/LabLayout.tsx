import { Outlet } from "react-router";
import { ScrollToTop } from "@lab/components/ScrollToTop";
import { LabThemeToggle } from "@lab/components/LabThemeToggle";
import { PerihelionMark } from "@lab/components/PerihelionMark";

export function LabLayout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Floating so the theme is reachable mid-scroll on long guides.
          Solid raised surface + pencil-line border, no shadow; sits below
          the skip link (z-100) in the stacking order. */}
      <LabThemeToggle className="fixed bottom-3 right-3 z-50 rounded-full border border-lab-border-subtle bg-lab-bg-raised hover:border-lab-border-strong md:bottom-8 md:right-8" />

      <header className="border-b border-lab-border-subtle">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
          {/* Masthead lockup (Workstream D, live-accepted "colophon rule"):
              mark + wordmark/kicker stack, then the tagline set off behind
              a hairline rule. Rule and tagline drop on mobile. */}
          <a
            href="/"
            className="group inline-flex items-center gap-4.5"
            aria-label="Perihelion, return to the archive"
          >
            <span aria-hidden className="flex shrink-0 items-center justify-center">
              <PerihelionMark width={58} animated />
            </span>
            <span className="flex flex-col gap-[3px]">
              <span className="font-lab-heading text-[28px] font-medium leading-[1.1] tracking-[0.01em] text-lab-text-primary">
                Perihelion
              </span>
              <span className="font-lab-mono text-[11px] font-medium tracking-[0.22em] text-lab-text-muted">
                ARCHIVE
              </span>
            </span>
            <span
              aria-hidden
              className="my-[5px] hidden w-px self-stretch bg-lab-border-subtle md:block"
            />
            <span className="hidden max-w-[18ch] font-lab-mono text-xs leading-[1.55] tracking-[0.025em] text-lab-text-muted md:block">
              closest approach to the frontier
            </span>
          </a>

          <a
            href="https://justinh.design"
            className="inline-flex min-h-11 items-center gap-2 font-lab-mono text-xs uppercase tracking-wider text-lab-text-secondary hover:text-guide-accent"
          >
            <span aria-hidden>←</span>
            justinh.design
          </a>
        </div>
      </header>

      <main
        id="main"
        tabIndex={-1}
        className="min-h-[calc(100vh-12rem)] outline-none"
      >
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-lab-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
          <div className="flex flex-col items-start gap-3 font-lab-mono text-xs tracking-wide text-lab-text-muted md:flex-row md:items-center md:justify-between">
            <span>
              Perihelion is part of{" "}
              <a
                href="https://justinh.design"
                className="text-lab-text-secondary hover:text-guide-accent hover:underline"
              >
                justinh.design
              </a>
              , the portfolio of Justin Hernandez.
            </span>
            <a
              href="https://github.com/amkhz/agentic-portfolio"
              className="text-lab-text-muted hover:text-lab-text-secondary hover:underline"
            >
              Source on GitHub
            </a>
          </div>
          <p className="mt-6 font-lab-body text-sm italic leading-relaxed text-lab-text-muted">
            A reader&apos;s notebook. Designed to be prep, not product.
          </p>
        </div>
      </footer>
    </>
  );
}
