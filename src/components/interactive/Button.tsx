import { cn } from "@core/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-text-inverse hover:bg-accent-hover shadow-glow-brass",
  secondary:
    "border border-secondary-primary text-secondary-primary bg-transparent hover:bg-secondary-primary hover:text-text-inverse",
  ghost:
    "text-text-secondary bg-transparent hover:text-text-primary hover:bg-bg-subtle",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center",
    "min-h-[44px] px-6 py-3",
    "rounded-md",
    "font-heading text-sm font-semibold tracking-wide",
    "transition-all duration-normal ease-default active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
    "cursor-pointer select-none",
    variantStyles[variant],
    className
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("//");

    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
}
