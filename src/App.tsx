import { RouterProvider } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { router } from "@/app/router";

import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/providers/tooltip-provider";

import { ConfirmationProvider } from "@/providers/confirmation";

import { Toaster } from "@/components/ui/sonner";

const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(
  import.meta.env.VITE_GOOGLE_CLIENT_ID,
);
export default function App(): React.JSX.Element {
  if (!googleClientId) {
    throw new Error(
      "VITE_GOOGLE_CLIENT_ID is missing.",
    );
  }

  return (
    <GoogleOAuthProvider
      clientId={googleClientId}
    >
      <ThemeProvider>
        <QueryProvider>
          <TooltipProvider>
            <ConfirmationProvider>
              <RouterProvider
                router={router}
              />

              <Toaster
                position="top-right"
                richColors
                closeButton
                duration={4000}
              />
            </ConfirmationProvider>
          </TooltipProvider>
        </QueryProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}