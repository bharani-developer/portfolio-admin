// src\components\common\page-title.tsx

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface PageTitleProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageTitle({
  title,
  description,
  actions,
  className,
}: PageTitleProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        {description ? (
          <p className="text-muted-foreground text-sm md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
