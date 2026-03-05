import type { ResumeSkillGroup as ResumeSkillGroupType } from "@core/content/resume";

interface ResumeSkillGroupProps {
  group: ResumeSkillGroupType;
}

export function ResumeSkillGroup({ group }: ResumeSkillGroupProps) {
  return (
    <div>
      <h3 className="font-heading text-base font-semibold text-text-primary">
        {group.label}
      </h3>
      <p className="mt-2 font-body text-sm leading-normal text-text-secondary sm:text-base">
        {group.items.join(", ")}
      </p>
    </div>
  );
}
