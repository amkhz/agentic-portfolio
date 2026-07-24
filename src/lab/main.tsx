import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { Analytics, SpeedInsights } from "@services/analytics";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { removeStaticDescription } from "@/lib/staticMeta";
import { App } from "./App";

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource-variable/newsreader/standard.css";
import "@fontsource-variable/newsreader/standard-italic.css";

import "./styles/lab.css";

removeStaticDescription();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
