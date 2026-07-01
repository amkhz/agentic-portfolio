/**
 * GuideRenderer — orchestrator for a single guide.
 *
 * ARCHITECTURAL EXCEPTION (per ADR-009):
 * This is the ONE file in src/lab/ permitted to use an inline style,
 * and solely for publishing the per-guide accent custom properties from
 * frontmatter data: `--guide-accent-dark` (from `accent`) and, when the
 * guide curates one, `--guide-accent-light` (from `accentLight`). The
 * theme scopes in lab-tokens.css resolve `--guide-accent` from the pair;
 * when `accentLight` is absent the property is not set, so the light
 * scope's brass fallback applies. The raw hex originates in guide
 * content, flows through as CSS variables, and is consumed by standard
 * CSS throughout the guide tree. That complies with the four-layer
 * "no raw colors outside design-system/" rule — the value is data, not
 * presentation.
 *
 * No other inline styles are permitted anywhere in lab UI code.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Guide } from "@core/lab/guide-types";
import { isDefaultReadingPrefs } from "@core/lab/reading-prefs";
import { useReadingPrefs } from "@/lib/useReadingPrefs";
import { GuideHeader } from "./GuideHeader";
import { GuideTabBar } from "./GuideTabBar";
import type { GuideMode } from "./GuideTabBar";
import { GuideSection } from "./GuideSection";
import { GuideGlossaryView } from "./GuideGlossaryView";
import { ReaderRail } from "./ReaderRail";
import { useReadingProgress } from "./useReadingProgress";

interface GuideRendererProps {
  guide: Guide;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GuideRenderer({ guide }: GuideRendererProps) {
  const [mode, setMode] = useState<GuideMode>("guide");
  const [activeSection, setActiveSection] = useState<string>(
    guide.sections[0]?.id ?? "",
  );
  const { prefs, setPref, reset } = useReadingPrefs();
  const progress = useReadingProgress();

  const rootStyle = useMemo<CSSProperties>(() => {
    const style: Record<string, string> = {
      "--guide-accent-dark": guide.frontmatter.accent,
    };
    if (guide.frontmatter.accentLight !== undefined) {
      style["--guide-accent-light"] = guide.frontmatter.accentLight;
    }
    return style as CSSProperties;
  }, [guide.frontmatter.accent, guide.frontmatter.accentLight]);

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

  // Rail/drawer navigation. Switching from the glossary means the target
  // section may not be in the DOM yet, so scroll on the next frame. Owning
  // this here (rather than in the nav) keeps cross-mode jumps reliable.
  const handleSelectSection = useCallback((id: string) => {
    setActiveSection(id);
    setMode("guide");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${id}`);
    });
  }, []);

  return (
    <article
      style={{ ...rootStyle, "--reading-progress": `${progress}%` } as CSSProperties}
      className="mx-auto w-full px-6 pb-32 md:px-10"
      aria-labelledby="guide-title"
    >
      <div className="lab-reading-grid">
        <ReaderRail
          sections={guide.sections}
          activeSection={activeSection}
          onSelect={handleSelectSection}
          prefs={prefs}
          onPrefChange={setPref}
          onReset={reset}
          isDefault={isDefaultReadingPrefs(prefs)}
          progress={progress}
        />

        <div className="lab-reading-col">
          <GuideHeader guide={guide} />
          <GuideTabBar mode={mode} onModeChange={setMode} />

          <div
            id="guide-panel-guide"
            role="tabpanel"
            aria-labelledby="guide-tab-guide"
            hidden={mode !== "guide"}
          >
            {mode === "guide" ? <GuideBody guide={guide} /> : null}
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
        </div>
      </div>
    </article>
  );
}

function GuideBody({ guide }: { guide: Guide }) {
  if (guide.sections.length === 0) {
    return (
      <p className="mt-12 font-lab-mono text-xs tracking-wide text-lab-text-muted">
        This guide has no sections yet.
      </p>
    );
  }

  // Per-section prev/next cards were removed — the rail's section index is the
  // single wayfinding surface now (Justin's call, 2026-06-30).
  return (
    <div className="mt-12 space-y-24">
      {guide.sections.map((section) => (
        <GuideSection
          key={section.id}
          section={section}
          glossary={guide.glossary}
          figures={guide.figures}
          guideSlug={guide.slug}
        />
      ))}
    </div>
  );
}

