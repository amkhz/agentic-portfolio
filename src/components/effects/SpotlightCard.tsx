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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused || prefersReduced) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const color = spotlightColor ?? "var(--spotlight-color)";

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
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${color}, transparent ${spotlightColor ? "80%" : "var(--spotlight-size)"})`,
        }}
      />
      {children}
    </div>
  );
}
