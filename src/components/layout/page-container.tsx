import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/lib/utils";

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
  wide: "max-w-[1600px]",
  "ultra-wide": "max-w-[1920px]",
} as const;

type MaxWidth = keyof typeof MAX_WIDTH_CLASSES;

export interface PageContainerProps extends ComponentPropsWithoutRef<"section"> {
  /**
   * Stretch the container to the full viewport width.
   *
   * @default false
   */
  fluid?: boolean;

  /**
   * Maximum content width when `fluid` is false.
   *
   * @default "7xl"
   */
  maxWidth?: MaxWidth;
}

export function PageContainer({
  className,
  fluid = false,
  maxWidth = "7xl",
  children,
  ...props
}: PageContainerProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative w-full",
        "px-4 py-4",
        "sm:px-6 sm:py-6",
        "lg:px-8 lg:py-8",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full",
          !fluid && "mx-auto",
          !fluid && MAX_WIDTH_CLASSES[maxWidth],
        )}
      >
        {children}
      </div>
    </section>
  );
}
