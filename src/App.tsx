import { lazy } from "react";
import { Routes, Route } from "react-router";
import { Layout } from "@/layouts/Layout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

// HomePage and NotFoundPage stay in the main chunk: Home is the LCP landing
// (gating it behind a chunk hop would only slow first paint) and NotFound is
// trivial. The heavier secondary routes split into their own lazy chunks so
// they no longer weigh down the initial load. Suspense lives in Layout, around
// the Outlet, so the header/footer persist while a route chunk streams in.
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const WorkPage = lazy(() =>
  import("@/pages/WorkPage").then((m) => ({ default: m.WorkPage })),
);
const CaseStudyPage = lazy(() =>
  import("@/pages/CaseStudyPage").then((m) => ({ default: m.CaseStudyPage })),
);
const NotesPage = lazy(() =>
  import("@/pages/NotesPage").then((m) => ({ default: m.NotesPage })),
);
const NotePage = lazy(() =>
  import("@/pages/NotePage").then((m) => ({ default: m.NotePage })),
);
const ResumePage = lazy(() =>
  import("@/pages/ResumePage").then((m) => ({ default: m.ResumePage })),
);

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:slug" element={<NotePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
