// src\components\common\page-loader.tsx

import { LoaderCircle } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({
  message = "Loading...",
  className,
}: PageLoaderProps): React.JSX.Element {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex min-h-[50vh] flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <LoaderCircle
        className="text-primary size-8 animate-spin"
        aria-hidden="true"
      />

      <p className="text-muted-foreground text-sm">{message}</p>

      <span className="sr-only">Loading content</span>
    </div>
  );
}
