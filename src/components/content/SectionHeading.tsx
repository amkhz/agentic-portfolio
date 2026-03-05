interface SectionHeadingProps {
  children: string;
  as?: "h2" | "h3";
}

export function SectionHeading({ children, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <Tag className="mb-6 font-display text-2xl leading-snug tracking-tight text-text-primary">
      {children}
    </Tag>
  );
}
