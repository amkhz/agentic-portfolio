import { Outlet } from "react-router";

export function LabLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="border-b border-lab-border-subtle">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6 px-6 py-6 md:px-10">
          <a
            href="/"
            className="group inline-flex flex-col gap-1"
            aria-label="Perihelion — return to the archive"
          >
            <span className="font-lab-heading text-xl font-medium tracking-tight text-lab-text-primary md:text-2xl">
              Perihelion
            </span>
            <span className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
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
