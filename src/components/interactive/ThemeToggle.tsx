import { useTheme } from "@/lib/useTheme";
import { cn } from "@core/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-[44px] w-[44px] items-center justify-center rounded-md",
        "text-text-secondary",
        "hover:bg-bg-subtle hover:text-text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="motion-reduce:transition-none"
      >
        <path
          d="M9 18h6"
          className={cn(
            "transition-opacity duration-normal motion-reduce:transition-none",
            isDark ? "opacity-50" : "opacity-100"
          )}
        />
        <path
          d="M10 22h4"
          className={cn(
            "transition-opacity duration-normal motion-reduce:transition-none",
            isDark ? "opacity-50" : "opacity-100"
          )}
        />
        <path
          d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"
          className={cn(
            "transition-[opacity,stroke-width] duration-normal motion-reduce:transition-none",
            isDark ? "opacity-60" : "opacity-100"
          )}
        />
        <path
          d="M10 13V8.5C10 7.67 10.67 7 11.5 7v0c.83 0 1.5.67 1.5 1.5V13"
          className={cn(
            "transition-[opacity,stroke-width] duration-normal motion-reduce:transition-none",
            isDark
              ? "opacity-40 [stroke-width:1.5]"
              : "opacity-100 [stroke-width:2]"
          )}
        />
        <line x1="12" y1="1" x2="12" y2="3" className={cn("transition-opacity duration-normal motion-reduce:transition-none", isDark ? "opacity-0" : "opacity-60")} />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" className={cn("transition-opacity duration-normal motion-reduce:transition-none", isDark ? "opacity-0" : "opacity-40")} />
        <line x1="19.78" y1="4.22" x2="18.36" y2="5.64" className={cn("transition-opacity duration-normal motion-reduce:transition-none", isDark ? "opacity-0" : "opacity-40")} />
      </svg>
    </button>
  );
}
