import { cn } from "@core/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </Tag>
  );
}
