import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { App } from "./App";

// Locked type stack ("The Conservatory", ADR-013):
// Display = Fraunces (full axis: opsz + SOFT + WONK), Body/UI = Source Sans 3, Mono kicker = JetBrains Mono.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/source-sans-3";
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
