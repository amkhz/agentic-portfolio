import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate } from "react-router";
import { caseStudies, metaCaseStudy } from "@core/tokens";
import { constellationContent } from "@core/content/case-studies";
import {
  constellationNodes,
  buildConstellationLayout,
} from "@core/content/constellation";
import { cn } from "@core/utils";
import { Container } from "@/components/layout/Container";
import { TextBlock } from "./TextBlock";
import { Tag } from "@/components/interactive/Tag";
import { ConstellationField } from "./ConstellationField";
import { ConstellationStrip } from "./ConstellationStrip";
import { ConstellationContent } from "./ConstellationContent";

const allProjects = [...caseStudies, metaCaseStudy];

/** Read reduced-motion preference at call time so it stays reactive. */
function getReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface ConstellationPageProps {
  slug: string;
}

export function ConstellationPageTemplate({ slug }: ConstellationPageProps) {
  const study = allProjects.find((s) => s.slug === slug);

  const positionedNodes = useMemo(
    () => buildConstellationLayout(constellationNodes),
    []
  );

  // No node selected = hero state. Hash in URL = reading state.
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash.slice(1);
    if (hash && constellationNodes.some((n) => n.id === hash)) {
      return hash;
    }
    return null;
  });

  const contentRef = useRef<HTMLDivElement>(null);

  // Sync URL hash
  useEffect(() => {
    if (selectedId) {
      window.history.replaceState(null, "", `#${selectedId}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedId]);

  const handleSelectNode = useCallback((id: string) => {
    setSelectedId(id);
    // On mobile, scroll content into view after strip renders
    requestAnimationFrame(() => {
      if (window.innerWidth < 1024) {
        const el = document.getElementById("constellation-content");
        el?.scrollIntoView({
          behavior: getReducedMotion() ? "instant" : "smooth",
          block: "start",
        });
      } else {
        // On desktop, scroll content panel to top
        contentRef.current?.scrollTo({ top: 0 });
      }
    });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedId(null);
    requestAnimationFrame(() => {
      const el = document.getElementById("constellation-hero");
      el?.scrollIntoView({
        behavior: getReducedMotion() ? "instant" : "smooth",
        block: "start",
      });
    });
  }, []);

  if (!study) return <Navigate to="/work" replace />;

  const selectedNode = selectedId
    ? positionedNodes.find((n) => n.id === selectedId)
    : null;

  const selectedSections = selectedId
    ? constellationContent.nodes[selectedId]
    : null;

  const isReading = selectedId !== null;

  return (
    <article>
      {/* Hero: title + constellation field */}
      <section
        id="constellation-hero"
        className={cn(
          "border-b border-border-subtle pt-24 sm:pt-32",
          isReading ? "pb-8" : "pb-12 sm:pb-16"
        )}
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              <span aria-hidden="true">&larr;</span>
              All Work
            </Link>
          </nav>

          <h1 className="max-w-[20ch] font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl">
            {study.title}
          </h1>

          <p className="mt-4 max-w-[65ch] font-body text-lg leading-normal text-text-secondary">
            {study.subtitle}
          </p>

          {/* Constellation field as hero -- full width when not reading */}
          {!isReading && (
            <div className="mt-10">
              <ConstellationField
                nodes={positionedNodes}
                selectedId={selectedId}
                onSelectNode={handleSelectNode}
              />

              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Mobile strip -- only visible when reading on mobile */}
      {isReading && (
        <ConstellationStrip
          nodes={constellationNodes}
          selectedId={selectedId}
          onSelectNode={handleSelectNode}
        />
      )}

      {/* Main content area */}
      <section className="py-16 sm:py-20">
        {isReading ? (
          /* Reading state: sidebar + content on desktop, content-only on mobile */
          <div
            className={cn(
              "mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12",
              "lg:grid lg:gap-12"
            )}
            style={{
              gridTemplateColumns:
                "var(--constellation-sidebar-width, 320px) 1fr",
            }}
          >
            {/* Sidebar: constellation field -- desktop only */}
            <aside
              className="hidden lg:block"
              style={{
                position: "sticky",
                top: "80px",
                height: "calc(100vh - 96px)",
              }}
            >
              <ConstellationField
                nodes={positionedNodes}
                selectedId={selectedId}
                onSelectNode={handleSelectNode}
                compact
              />
            </aside>

            {/* Content panel */}
            <div ref={contentRef} aria-live="polite">
              {selectedNode && selectedSections && (
                <div
                  id="constellation-content"
                  className="motion-safe:animate-[fadeIn_400ms_ease-out]"
                >
                  <ConstellationContent
                    node={selectedNode}
                    sections={selectedSections}
                    allNodes={positionedNodes}
                    onBack={handleBack}
                    onNavigate={handleSelectNode}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Hero state: preamble content */
          <Container>
            {constellationContent.preamble.length > 0 && (
              <div className="mx-auto max-w-[65ch]">
                {constellationContent.preamble.map((section, i) => {
                  if (section.type === "text") {
                    return <TextBlock key={i}>{section.body}</TextBlock>;
                  }
                  return null;
                })}
              </div>
            )}
          </Container>
        )}
      </section>

      {/* Footer nav */}
      <section className="pb-16">
        <Container>
          <div className="border-t border-border-subtle pt-10">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-medium text-text-secondary transition-colors duration-normal hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep"
            >
              <span aria-hidden="true">&larr;</span>
              Back to all work
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
