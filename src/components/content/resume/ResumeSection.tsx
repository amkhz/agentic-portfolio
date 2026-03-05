interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="border-t border-border-subtle pt-8">
      <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-primary">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
