import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@core/utils";

export function RevealOnScroll({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  return (
    <div
      ref={ref}
      className={cn(
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0",
        className
      )}
      style={{
        transitionProperty: "opacity, translate, filter",
        transitionDuration: "600ms",
        transitionTimingFunction: "var(--ease-out)",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
        filter: isVisible ? "blur(0px)" : "blur(4px)",
      }}
    >
      {children}
    </div>
  );
}
