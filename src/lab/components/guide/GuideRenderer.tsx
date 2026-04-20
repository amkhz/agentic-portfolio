/**
 * GuideRenderer — orchestrator for a single guide.
 *
 * ARCHITECTURAL EXCEPTION (per ADR-009):
 * This is the ONE file in src/lab/ permitted to use an inline style,
 * and solely for setting the `--guide-accent` CSS custom property from
 * frontmatter data. The raw hex originates in guide content, flows
 * through as a CSS variable, and is consumed by standard CSS throughout
 * the guide tree. That complies with the four-layer "no raw colors
 * outside design-system/" rule — the value is data, not presentation.
 *
 * No other inline styles are permitted anywhere in lab UI code.
 */
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Guide } from "@core/lab/guide-types";
import { GuideHeader } from "./GuideHeader";
import { GuideTabBar } from "./GuideTabBar";
import type { GuideMode } from "./GuideTabBar";
import { GuideSectionNav } from "./GuideSectionNav";
import { GuideSection } from "./GuideSection";
import { GuidePrevNext } from "./GuidePrevNext";
import { GuideGlossaryView } from "./GuideGlossaryView";

interface GuideRendererProps {
  guide: Guide;
}

export function GuideRenderer({ guide }: GuideRendererProps) {
  const [mode, setMode] = useState<GuideMode>("guide");
  const [activeSection, setActiveSection] = useState<string>(
    guide.sections[0]?.id ?? "",
  );

  const rootStyle = useMemo<CSSProperties>(
    () => ({ ["--guide-accent" as string]: guide.frontmatter.accent }),
    [guide.frontmatter.accent],
  );

  useEffect(() => {
    if (mode !== "guide" || guide.sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    const nodes = guide.sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [guide.sections, mode]);

  return (
    <article
      style={rootStyle}
      className="mx-auto max-w-4xl px-6 pb-32 md:px-10"
      aria-labelledby="guide-title"
    >
      <GuideHeader guide={guide} />
      <GuideTabBar mode={mode} onModeChange={setMode} />

      <div
        id="guide-panel-guide"
        role="tabpanel"
        aria-labelledby="guide-tab-guide"
        hidden={mode !== "guide"}
      >
        {mode === "guide" ? (
          <GuideBody
            guide={guide}
            activeSection={activeSection}
            onActiveSectionChange={setActiveSection}
          />
        ) : null}
      </div>

      <div
        id="guide-panel-glossary"
        role="tabpanel"
        aria-labelledby="guide-tab-glossary"
        hidden={mode !== "glossary"}
      >
        {mode === "glossary" ? (
          <GuideGlossaryView glossary={guide.glossary} />
        ) : null}
      </div>
    </article>
  );
}

function GuideBody({
  guide,
  activeSection,
  onActiveSectionChange,
}: {
  guide: Guide;
  activeSection: string;
  onActiveSectionChange: (id: string) => void;
}) {
  if (guide.sections.length === 0) {
    return (
      <p className="mt-12 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        This guide has no sections yet.
      </p>
    );
  }

  return (
    <>
      <GuideSectionNav
        sections={guide.sections}
        activeSection={activeSection}
        onActiveSectionChange={onActiveSectionChange}
      />

      <div className="mt-12 space-y-24">
        {guide.sections.map((section, index) => {
          const prev = guide.sections[index - 1];
          const next = guide.sections[index + 1];
          return (
            <div key={section.id}>
              <GuideSection
                section={section}
                glossary={guide.glossary}
                figures={guide.figures}
                guideSlug={guide.slug}
              />
              <GuidePrevNext
                prevId={prev?.id}
                prevLabel={prev?.heading}
                nextId={next?.id}
                nextLabel={next?.heading}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

