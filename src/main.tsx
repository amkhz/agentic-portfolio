import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { App } from "./App";

import "@fontsource/podkova/400.css";
import "@fontsource/podkova/500.css";
import "@fontsource/podkova/600.css";
import "@fontsource/podkova/700.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource/didact-gothic/400.css";

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
