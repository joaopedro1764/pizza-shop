import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
export function App() {
  return (
    <>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="light">
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </ThemeProvider>
    </>
  );
}
