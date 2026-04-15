import { useRef, useState, type MouseEventHandler, type PropsWithChildren } from "react";
import { cn } from "@core/utils";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  /** Override the spotlight color. Defaults to --spotlight-color token. */
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const isFocusedRef = useRef(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocusedRef.current || prefersReduced) return;
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
    setOpacity(0.6);
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    setOpacity(0);
  };

  const color = spotlightColor ?? "var(--spotlight-color)";
  const size = spotlightColor ? "80%" : "var(--spotlight-size)";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={() => !prefersReduced && setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated p-8",
        className
      )}
      style={{ "--spot-x": "0px", "--spot-y": "0px" } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out"
        style={{
          opacity,
          background: `radial-gradient(circle at var(--spot-x) var(--spot-y), ${color}, transparent ${size})`,
        }}
      />
      {children}
    </div>
  );
}
