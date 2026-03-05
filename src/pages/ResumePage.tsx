import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { getResumeModel, type ResumeModel } from "@core/content/resume";
import { ResumeHeader } from "@/components/content/resume/ResumeHeader";
import { ResumeSection } from "@/components/content/resume/ResumeSection";
import { ResumeExperienceItem } from "@/components/content/resume/ResumeExperienceItem";
import { ResumeSkillGroup } from "@/components/content/resume/ResumeSkillGroup";

export function ResumePage() {
  const [resume, setResume] = useState<ResumeModel | null>(null);

  useEffect(() => {
    getResumeModel().then(setResume);
  }, []);

  if (!resume) {
    return (
      <section className="py-24 sm:py-32">
        <Container>
          <p className="font-body text-text-secondary">Loading resume...</p>
        </Container>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Resume | Justin Hernandez</title>
        <meta
          name="description"
          content="Resume of Justin Hernandez, Lead Product Designer focused on AI-powered enterprise product design."
        />
        <link rel="canonical" href="/resume" />
      </Helmet>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-[920px] space-y-10">
            <div className="flex flex-col gap-5 rounded-lg border border-border-subtle bg-bg-elevated p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-heading text-xs uppercase tracking-wider text-text-secondary">
                  Resume
                </p>
                <p className="mt-2 font-body text-sm text-text-secondary">
                  Web version generated from Markdown
                </p>
              </div>

              <Button
                variant="primary"
                href="/resume/justin-hernandez-resume-1page.pdf"
                aria-label="Download Justin Hernandez resume PDF"
              >
                Download Resume (PDF)
              </Button>
            </div>

            <div className="space-y-10 rounded-lg border border-border-subtle bg-bg-base p-6 sm:p-8">
              <ResumeHeader
                name={resume.name}
                title={resume.title}
                contacts={resume.contacts}
              />

              <ResumeSection title="Profile">
                <div className="space-y-4">
                  {resume.profile.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-[72ch] font-body text-base leading-normal text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Professional Experience">
                <div className="space-y-5">
                  {resume.experience.map((item) => (
                    <ResumeExperienceItem key={`${item.role}-${item.company}`} item={item} />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Education">
                <div className="space-y-4">
                  {resume.education.map((entry) => (
                    <div key={`${entry.degree}-${entry.institution}`}>
                      <h3 className="font-heading text-base font-semibold text-text-primary">
                        {entry.degree}
                      </h3>
                      <p className="mt-1 font-body text-sm text-text-secondary sm:text-base">
                        {entry.institution}
                        {entry.year ? ` | ${entry.year}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Skills & Expertise">
                <div className="space-y-5">
                  {resume.skillGroups.map((group) => (
                    <ResumeSkillGroup key={group.label} group={group} />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Professional Development">
                <ul className="space-y-2">
                  {resume.professionalDevelopment.map((item) => (
                    <li
                      key={item}
                      className="font-body text-sm leading-normal text-text-secondary sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </ResumeSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
