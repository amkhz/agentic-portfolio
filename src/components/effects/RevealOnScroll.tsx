import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@core/utils";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function RevealOnScroll({
  children,
  delay = 0,
  className,
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * Add a focus-pull blur to the reveal. Reserved for the focal/ambitious
   * moments (featured covers) — most section reveals are opacity + rise only,
   * so blur stays a deliberate accent rather than firing site-wide.
   */
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0",
        className
      )}
      style={{
        transitionProperty: blur ? "opacity, translate, filter" : "opacity, translate",
        transitionDuration: "var(--duration-reveal)",
        transitionTimingFunction: "var(--ease-settle)",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        ...(blur ? { filter: isVisible ? "blur(0px)" : "blur(5px)" } : {}),
      }}
    >
      {children}
    </div>
  );
}
