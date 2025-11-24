import { createRoot } from "react-dom/client";

import { ThemeProvider } from "./providers/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/reset.css";
import { RouterProvider } from "react-router";
import { router } from "./router/index.ts";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
