import { Routes, Route } from "react-router";
import { Layout } from "@/layouts/Layout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { WorkPage } from "@/pages/WorkPage";
import { CaseStudyPage } from "@/pages/CaseStudyPage";
import { NotesPage } from "@/pages/NotesPage";
import { NotePage } from "@/pages/NotePage";
import { ResumePage } from "@/pages/ResumePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ShaderPreviewPage } from "@/pages/_ShaderPreview"; // TEMP: spike T4d preview, do not commit

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
        <Route path="/_shader-preview" element={<ShaderPreviewPage />} /> {/* TEMP: spike T4d, do not commit */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
