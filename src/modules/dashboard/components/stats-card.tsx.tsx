// src\modules\dashboard\components\stats-card.tsx
import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/shared/lib/utils";

import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface IStatsCardProps {
  title: string;

  value: number | string;

  description?: string;

  icon?: LucideIcon;

  href?: string;

  isLoading?: boolean;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Stats Card                                  */
/* -------------------------------------------------------------------------- */

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  href,
  isLoading = false,
  className,
}: IStatsCardProps): React.JSX.Element {
  const content = (
    <Card
      className={cn(
        `
          h-full
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:shadow-md
        `,
        className,
      )}
    >
      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
          pb-2
        "
      >
        <CardTitle
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >
          {title}
        </CardTitle>

        {Icon ? (
          <Icon
            className="
              text-muted-foreground
              size-4
            "
            aria-hidden="true"
          />
        ) : null}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-24" />

            <Skeleton className="h-4 w-40" />
          </div>
        ) : (
          <>
            <div
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              {value}
            </div>

            {description ? (
              <p
                className="
                  text-muted-foreground
                  mt-1
                  text-xs
                "
              >
                {description}
              </p>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      to={href}
      aria-label={title}
      className="
        group
        block
        h-full
      "
    >
      <div className="relative h-full">
        {content}

        <ArrowRight
          className="
            text-muted-foreground
            absolute
            right-4
            top-4
            size-4
            opacity-0
            transition-all
            group-hover:translate-x-1
            group-hover:opacity-100
          "
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

export default StatsCard;
