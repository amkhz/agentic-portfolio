import { cn } from "@core/utils";

const sizeMap = {
  sm: "h-[200px] w-[200px]",
  md: "h-[400px] w-[400px]",
  lg: "h-[600px] w-[600px]",
} as const;

const blurMap = {
  sm: "blur(80px)",
  md: "blur(100px)",
  lg: "blur(120px)",
} as const;

const centerVarMap = {
  brass: "var(--glow-brass-center)",
  magenta: "var(--glow-magenta-center)",
} as const;

const fadeVarMap = {
  brass: "var(--glow-brass-fade)",
  magenta: "var(--glow-magenta-fade)",
} as const;

export function GlowEffect({
  color = "brass",
  size = "md",
  className,
}: {
  color?: "brass" | "magenta";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        sizeMap[size],
        className
      )}
      style={{
        background: `radial-gradient(ellipse at center, ${centerVarMap[color]} 0%, ${fadeVarMap[color]} 40%, transparent 70%)`,
        filter: blurMap[size],
      }}
    />
  );
}
