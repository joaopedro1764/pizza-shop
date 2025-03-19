import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
export function App() {
  return (
    <>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster richColors closeButton />
      </ThemeProvider>
    </>
  );
}
