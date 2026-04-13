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

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash.slice(1);
    if (hash && constellationNodes.some((n) => n.id === hash)) {
      return hash;
    }
    return null;
  });

  const contentRef = useRef<HTMLDivElement>(null);

  // Sync URL hash and scroll to content on node change
  const prevSelectedId = useRef(selectedId);
  useEffect(() => {
    if (selectedId) {
      window.history.replaceState(null, "", `#${selectedId}`);
      // Scroll to content top after render commits, offset for sticky header
      if (prevSelectedId.current !== selectedId) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const el = document.getElementById("constellation-content");
            if (el) {
              const headerOffset = 80; // header (64px) + breathing room
              const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
              window.scrollTo({
                top,
                behavior: getReducedMotion() ? "instant" : "smooth",
              });
            }
          });
        });
      }
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
    prevSelectedId.current = selectedId;
  }, [selectedId]);

  const handleSelectNode = useCallback((id: string) => {
    setSelectedId(id);
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
      {/* Hero header */}
      <section
        id="constellation-hero"
        className={cn(
          "border-b border-border-subtle pt-24 sm:pt-32",
          isReading ? "pb-8" : "pb-12"
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
        </Container>
      </section>

      {/* Mobile strip */}
      {isReading && (
        <div className="motion-safe:animate-[fadeIn_200ms_ease-out]">
          <ConstellationStrip
            nodes={constellationNodes}
            selectedId={selectedId}
            onSelectNode={handleSelectNode}
          />
        </div>
      )}

      {/* Main layout: animated grid on desktop, stacked on mobile */}
      <section className="py-16 sm:py-20">
        {/*
          Desktop: 2-column grid that animates between states.
          Hero: 1fr 0fr (field fills, content collapsed)
          Reading: 320px 1fr (sidebar + content)
          Mobile: always single column.
        */}
        <div
          className={cn(
            "mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12",
            "lg:grid lg:gap-12",
            "motion-safe:transition-[grid-template-columns] motion-safe:duration-ambient motion-safe:ease-spring"
          )}
          style={{
            gridTemplateColumns: isReading
              ? "var(--constellation-sidebar-width, 320px) 1fr"
              : "1fr 0fr",
          }}
        >
          {/* Column 1: Constellation field */}
          <div
            className={cn(
              isReading
                ? "hidden lg:block"
                : "block"
            )}
          >
            <div
              className={cn(
                isReading && "lg:sticky lg:top-[80px] lg:h-[calc(100vh-96px)]"
              )}
            >
              <ConstellationField
                nodes={positionedNodes}
                selectedId={selectedId}
                onSelectNode={handleSelectNode}
                compact={isReading}
              />
            </div>

            {/* Tags below field in hero state */}
            {!isReading && (
              <div className="mt-6 flex flex-wrap gap-2 px-2">
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Content (collapsed in hero, expands in reading) */}
          <div
            className={cn(
              "min-w-0",
              !isReading && "lg:overflow-hidden"
            )}
            ref={contentRef}
          >
            {isReading && selectedNode && selectedSections ? (
              <div
                key={selectedId}
                id="constellation-content"
                className="motion-safe:animate-[fadeIn_400ms_var(--ease-spring)]"
                aria-live="polite"
              >
                <ConstellationContent
                  node={selectedNode}
                  sections={selectedSections}
                  allNodes={positionedNodes}
                  onBack={handleBack}
                  onNavigate={handleSelectNode}
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Preamble below the field in hero state */}
        {!isReading && constellationContent.preamble.length > 0 && (
          <div className="mx-auto mt-12 max-w-[65ch] px-6 sm:px-8 lg:px-12 motion-safe:animate-[fadeIn_400ms_var(--ease-spring)_both]">
            {constellationContent.preamble.map((section, i) => {
              if (section.type === "text") {
                return <TextBlock key={i}>{section.body}</TextBlock>;
              }
              return null;
            })}
          </div>
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
