// src\modules\dashboard\components\recent-projects-card.tsx
import { Link } from "react-router-dom";

import { ArrowRight, Briefcase, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { Skeleton } from "@/components/ui/skeleton";

import type { IDashboardRecentProject } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface IRecentProjectsCardProps {
  projects: IDashboardRecentProject[];

  isLoading?: boolean;

  maxItems?: number;
}

/* -------------------------------------------------------------------------- */
/*                         Recent Projects Card                               */
/* -------------------------------------------------------------------------- */

export function RecentProjectsCard({
  projects,
  isLoading = false,
  maxItems = 5,
}: IRecentProjectsCardProps): React.JSX.Element {
  return (
    <Card className="h-full">
      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
        "
      >
        <CardTitle
          className="
            flex
            items-center
            gap-2
          "
        >
          <Briefcase className="size-5" aria-hidden="true" />

          <span>Recent Projects</span>
        </CardTitle>

        <Link
          to="/projects"
          className="
            text-muted-foreground
            hover:text-foreground
            transition-colors
          "
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: maxItems }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-3 w-2/3" />

                {index < maxItems - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="
              text-muted-foreground
              flex
              min-h-40
              items-center
              justify-center
              text-sm
            "
          >
            No recent projects found.
          </div>
        ) : (
          <div className="space-y-4">
            {projects.slice(0, maxItems).map((project, index) => (
              <div key={project._id} className="space-y-2">
                <div
                  className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className="
                          truncate
                          font-medium
                        "
                    >
                      {project.title}
                    </p>

                    <p
                      className="
                          text-muted-foreground
                          mt-1
                          text-xs
                        "
                    >
                      {project.category}
                    </p>
                  </div>

                  {project.featured ? (
                    <Badge variant="secondary" className="shrink-0">
                      <Star className="mr-1 size-3" aria-hidden="true" />
                      Featured
                    </Badge>
                  ) : null}
                </div>

                <p
                  className="
                      text-muted-foreground
                      text-xs
                    "
                >
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>

                {index < Math.min(projects.length, maxItems) - 1 ? (
                  <Separator />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentProjectsCard;
