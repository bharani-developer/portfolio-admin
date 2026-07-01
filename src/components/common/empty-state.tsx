// src\components\common\empty-state.tsx

import type { ReactNode } from "react";

import { Inbox } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No data available",
  description = "There is currently nothing to display.",
  icon,
  action,
  className,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
        {icon ?? (
          <Inbox className="text-muted-foreground size-6" aria-hidden="true" />
        )}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        {description}
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
