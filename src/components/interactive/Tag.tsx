import { cn } from "@core/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "highlight";
}

const toneStyles: Record<NonNullable<TagProps["tone"]>, string> = {
  default:
    "border-border-subtle bg-bg-elevated text-text-secondary",
  highlight:
    "border-border-strong bg-accent-muted text-accent-primary",
};

export function Tag({ children, className, tone = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 font-heading text-xs font-medium uppercase tracking-wider",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
