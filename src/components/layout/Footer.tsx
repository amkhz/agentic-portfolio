import { Link } from "react-router";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="font-body text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Justin Hernandez
          </p>

          <nav aria-label="Footer navigation" className="flex items-center gap-6">
            <Link
              to="/work"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              View Work
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              About Justin
            </Link>
            <a
              href="mailto:justin@justinh.design"
              className="inline-flex min-h-[44px] items-center font-heading text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              Email Justin
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
