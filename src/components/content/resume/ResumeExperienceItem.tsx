import type { ResumeExperience } from "@core/content/resume";

interface ResumeExperienceItemProps {
  item: ResumeExperience;
}

export function ResumeExperienceItem({ item }: ResumeExperienceItemProps) {
  return (
    <article className="rounded-lg border border-border-subtle bg-bg-base p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {item.role}
          {item.company ? (
            <span className="font-medium text-text-secondary"> | {item.company}</span>
          ) : null}
        </h3>
        {item.date ? (
          <p className="font-heading text-xs uppercase tracking-wider text-text-secondary">
            {item.date}
          </p>
        ) : null}
      </div>

      {item.summary ? (
        <p className="mt-3 max-w-[72ch] font-body text-base leading-normal text-text-secondary">
          {item.summary}
        </p>
      ) : null}

      {item.bullets.length > 0 ? (
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="font-body text-sm leading-normal text-text-secondary sm:text-base">
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
