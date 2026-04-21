import type { HeadingBlock } from "@core/lab/guide-types";

interface GuideHeadingProps {
  heading: HeadingBlock;
}

export function GuideHeading({ heading }: GuideHeadingProps) {
  return (
    <h3
      id={heading.id}
      className="scroll-mt-28 pt-4 font-lab-heading text-xl font-semibold tracking-tight text-lab-text-primary md:text-2xl"
    >
      {heading.icon ? (
        <span aria-hidden className="mr-2 inline-block align-[-0.05em]">
          {heading.icon}
        </span>
      ) : null}
      {heading.text}
    </h3>
  );
}
