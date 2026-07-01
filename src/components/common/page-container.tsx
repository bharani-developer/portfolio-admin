// src/components/layout/page-container.tsx

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface PageContainerProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;

  fluid?: boolean;

  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
}

const MAX_WIDTH_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
} as const;

export function PageContainer({
  children,
  fluid = false,
  maxWidth = "7xl",
  className,
  ...props
}: PageContainerProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "w-full",
        "px-4 py-4",
        "sm:px-6",
        "lg:px-8",
        !fluid && ["mx-auto", MAX_WIDTH_CLASSES[maxWidth]],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
