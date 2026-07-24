import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router";
import { getWork } from "@core/works/works";

// Each work is its own lazy chunk (ADR-017 D1/D5): deck code never enters
// the shared labs bundle. The registry key must match a manifest slug.
const workComponents: Record<string, LazyExoticComponent<ComponentType>> = {
  "flight-deck": lazy(() =>
    import("./flight-deck/FlightDeck").then((m) => ({ default: m.FlightDeck })),
  ),
};

export function WorkView() {
  const { slug } = useParams();
  const work = slug ? getWork(slug) : undefined;
  const Work = work ? workComponents[work.slug] : undefined;

  if (!work || !Work) return <Navigate to="/" replace />;

  return (
    <>
      {/* The deck owns its <title> (FlightDeck sets document.title with the
          Works "·" separator); WorkView only supplies the description the
          deck chunk never carries. */}
      <Helmet>
        <meta name="description" content={work.thesisLine} />
      </Helmet>
      <Suspense fallback={null}>
        <Work />
      </Suspense>
    </>
  );
}
