import type { ResumeSkillGroup as ResumeSkillGroupType } from "@core/content/resume";

interface ResumeSkillGroupProps {
  group: ResumeSkillGroupType;
}

export function ResumeSkillGroup({ group }: ResumeSkillGroupProps) {
  return (
    // data-resume is a print hook: on paper a skill group is one line,
    // "Design: Product Design, User Research, ...", and the print sheet
    // cannot tell this block apart from an education entry by shape alone.
    <div data-resume="skill-group">
      <h3 className="font-heading text-base font-semibold text-text-primary">
        {group.label}
      </h3>
      <p className="mt-2 font-body text-sm leading-normal text-text-secondary sm:text-base">
        {group.items.join(", ")}
      </p>
    </div>
  );
}
