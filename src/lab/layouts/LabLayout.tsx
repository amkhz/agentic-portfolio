import { Outlet } from "react-router";

export function LabLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="border-b border-lab-border-subtle">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-6 md:px-10">
          <a
            href="/"
            className="group inline-flex flex-col gap-1"
            aria-label="Speculative Design Lab — return to library index"
          >
            <span className="font-lab-heading text-xl font-medium tracking-tight text-lab-text-primary md:text-2xl">
              Speculative Design Lab
            </span>
            <span className="font-lab-mono text-xs tracking-wide text-lab-text-muted">
              labs.justinh.design
            </span>
          </a>

          <a
            href="https://justinh.design"
            className="font-lab-body text-sm text-lab-text-secondary hover:underline"
          >
            Portfolio
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
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-6 py-10 font-lab-mono text-xs tracking-wide text-lab-text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <span>Built in the open at amkhz/portfolio</span>
          <a
            href="https://github.com/amkhz/portfolio"
            className="text-lab-text-secondary hover:underline"
          >
            github.com/amkhz/portfolio
          </a>
        </div>
      </footer>
    </>
  );
}
