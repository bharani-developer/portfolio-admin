// src\components\common\error-state.tsx

import type { ReactNode } from "react";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/shared/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this content.",
  icon,
  action,
  onRetry,
  className,
}: ErrorStateProps): React.JSX.Element {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <div className="bg-destructive/10 mb-4 flex size-12 items-center justify-center rounded-full">
        {icon ?? (
          <AlertTriangle
            className="text-destructive size-6"
            aria-hidden="true"
          />
        )}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        {description}
      </p>

      {(onRetry || action) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onRetry ? (
            <Button type="button" variant="outline" onClick={onRetry}>
              Try Again
            </Button>
          ) : null}

          {action}
        </div>
      )}
    </div>
  );
}
