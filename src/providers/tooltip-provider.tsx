// src\app\tooltip-provider.tsx

import type { ReactNode } from "react";

import { TooltipProvider as RadixTooltipProvider } from "@/components/ui/tooltip";

interface TooltipProviderProps {
  children: ReactNode;
}

export function TooltipProvider({
  children,
}: TooltipProviderProps): React.JSX.Element {
  return (
    <RadixTooltipProvider delayDuration={200} skipDelayDuration={300}>
      {children}
    </RadixTooltipProvider>
  );
}
