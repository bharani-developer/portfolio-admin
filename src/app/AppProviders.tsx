import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/app/query-client";

import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/providers/tooltip-provider";

import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
          />

          {import.meta.env.DEV ? (
            <ReactQueryDevtools initialIsOpen={false} />
          ) : null}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
