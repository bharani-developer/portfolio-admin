// src\components\common\full-screen-loader.tsx

import { LoaderCircle } from "lucide-react";

interface FullScreenLoaderProps {
  title?: string;
  description?: string;
}

export function FullScreenLoader({
  title = "Loading",
  description = "Please wait while we prepare your experience.",
}: FullScreenLoaderProps): React.JSX.Element {
  return (
    <div
      className="
        bg-background
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        gap-4
        px-4
      "
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoaderCircle
        className="
          text-primary
          size-10
          animate-spin
        "
      />

      <div className="space-y-1 text-center">
        <h2
          className="
            text-foreground
            text-lg
            font-semibold
          "
        >
          {title}
        </h2>

        <p
          className="
            text-muted-foreground
            max-w-sm
            text-sm
          "
        >
          {description}
        </p>
      </div>

      <span className="sr-only">Loading content</span>
    </div>
  );
}
