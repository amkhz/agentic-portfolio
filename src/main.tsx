import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { App } from "./App";

// Locked type stack v2 ("The Conservatory", ADR-013, amended 2026-06-24):
// Display = Hedvig Letters Serif, Body/UI = Figtree, Mono kicker = JetBrains Mono.
import "@fontsource-variable/figtree";
import "@fontsource-variable/figtree/wght-italic.css";
import "@fontsource/hedvig-letters-serif/400.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
