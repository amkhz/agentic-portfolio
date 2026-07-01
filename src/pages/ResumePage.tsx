import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/interactive/Button";
import { DossierFrame } from "@/components/fieldnotebook";
import { getResumeModel, type ResumeModel } from "@core/content/resume";
import { ResumeHeader } from "@/components/content/resume/ResumeHeader";
import { ResumeSection } from "@/components/content/resume/ResumeSection";
import { ResumeExperienceItem } from "@/components/content/resume/ResumeExperienceItem";
import { ResumeSkillGroup } from "@/components/content/resume/ResumeSkillGroup";

export function ResumePage() {
  const [resume, setResume] = useState<ResumeModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getResumeModel().then(setResume).catch(() => {
      setError("Unable to load resume. Please try again later.");
    });
  }, []);

  if (error) {
    return (
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-[920px] space-y-10">
            <h1 className="font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
              Resume
            </h1>
            <DossierFrame className="bg-bg-elevated text-center">
              <p className="font-body text-base text-text-secondary">{error}</p>
              <Button
                variant="primary"
                href="/resume/justin-hernandez-resume-1page.pdf"
                className="mt-6"
                aria-label="Download Justin Hernandez resume PDF"
              >
                Download Resume (PDF)
              </Button>
            </DossierFrame>
          </div>
        </Container>
      </section>
    );
  }

  if (!resume) {
    return (
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-[920px] space-y-10">
            <h1 className="font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
              Resume
            </h1>
            {/* Skeleton blocks matching the real layout */}
            <DossierFrame className="space-y-8 bg-bg-base">
              <div className="h-4 w-48 animate-pulse rounded bg-bg-subtle" />
              <div className="space-y-3">
                <div className="h-3 w-full max-w-[65ch] animate-pulse rounded bg-bg-subtle" />
                <div className="h-3 w-4/5 max-w-[52ch] animate-pulse rounded bg-bg-subtle" />
              </div>
              <div className="border-t border-border-subtle pt-6 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-bg-subtle" />
                <div className="h-3 w-full max-w-[65ch] animate-pulse rounded bg-bg-subtle" />
                <div className="h-3 w-3/4 max-w-[48ch] animate-pulse rounded bg-bg-subtle" />
              </div>
            </DossierFrame>
          </div>
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
        <link rel="canonical" href="https://justinh.design/resume" />
      </Helmet>

      <section className="py-24 sm:py-32 motion-safe:animate-[fadeIn_400ms_var(--ease-settle)]">
        <Container>
          <div className="mx-auto max-w-[920px] space-y-10">
            <DossierFrame kicker="Curriculum vitae" className="bg-bg-elevated">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-body text-sm text-text-secondary">
                  Web version generated from Markdown
                </p>

                <Button
                  variant="primary"
                  href="/resume/justin-hernandez-resume-1page.pdf"
                  aria-label="Download Justin Hernandez resume PDF"
                >
                  Download Resume (PDF)
                </Button>
              </div>
            </DossierFrame>

            <DossierFrame className="space-y-10 bg-bg-base">
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
            </DossierFrame>
          </div>
        </Container>
      </section>
    </>
  );
}
