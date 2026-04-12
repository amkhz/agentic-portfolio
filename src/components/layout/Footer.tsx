import { Link } from "react-router";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <Container>
        <div className="flex flex-col gap-8 py-12 sm:py-16">
          {/* Navigation row */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <Link
              to="/work"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              Work
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              About
            </Link>
            <Link
              to="/resume"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              Resume
            </Link>
            <a
              href="mailto:justin@justinh.design"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              Say hello
            </a>
          </nav>

          {/* Accent line */}
          <div className="h-px w-12 bg-accent-primary opacity-30" aria-hidden="true" />

          {/* Colophon row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Justin Hernandez
            </p>
            <p className="font-body text-xs text-text-muted">
              Designed and built with craft, curiosity, and a crew of AI collaborators.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
