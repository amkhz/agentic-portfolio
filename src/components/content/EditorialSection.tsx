import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

interface EditorialSectionProps {
  /** Zero-padded section index, e.g. "01". Mono, tabular, brass. */
  index: string;
  /** Terse running-head tag that lives in the margin (mono, uppercase). */
  label: string;
  /** Display heading for the body column. */
  heading: string;
  children: ReactNode;
  className?: string;
}

/**
 * EditorialSection — a long-form section in the Conservatory register
 * (DESIGN.md "Field Notebook grammar"): a mono index + running-head label
 * living in the outside margin, paired with a display heading and prose in
 * the body column. Composed like a monograph, not a uniform stack. Mobile
 * collapses the margin to an inline header above the heading.
 */
export function EditorialSection({
  index,
  label,
  heading,
  children,
  className,
}: EditorialSectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className ?? ""}`}>
      <Container>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
              <span className="font-mono text-sm tabular-nums text-accent-primary">
                {index}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                {label}
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 lg:col-start-4">
            <h2 className="font-display text-2xl leading-snug tracking-tight text-text-primary sm:text-3xl">
              {heading}
            </h2>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
