import type { ReactElement } from "react";

import { Activity, Plus, RefreshCw, Sparkles, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ProjectsActionsProps {
  totalProjects?: number;

  activeProjects?: number;

  isRefreshing?: boolean;

  onCreate?: () => void;

  onRefresh?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                             Projects Actions                               */
/* -------------------------------------------------------------------------- */

export function ProjectsActions({
  totalProjects = 0,
  activeProjects = 0,
  isRefreshing = false,
  onCreate,
  onRefresh,
}: ProjectsActionsProps): ReactElement {
  const inactiveProjects = Math.max(totalProjects - activeProjects, 0);

  const activePercentage =
    totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0;

  return (
    <Card
      className="
     border-border/60
     bg-card/70
     backdrop-blur-sm
   "
    >
      {" "}
      <CardContent className="p-6">
        {" "}
        <div
          className="
         flex
         flex-col
         gap-6
         xl:flex-row
         xl:items-center
         xl:justify-between
       "
        >
          {/* -------------------------------------------------------------- */}
          {/* Statistics                                                     */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
          grid
          flex-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
          >
            {/* Total */}

            <div
              className="
            rounded-2xl
            border
            bg-background/50
            p-4
          "
            >
              <div
                className="
              flex
              items-center
              justify-between
            "
              >
                <span
                  className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
              "
                >
                  Total Projects
                </span>

                <TrendingUp
                  className="
                size-4
                text-muted-foreground
              "
                />
              </div>

              <p
                className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
            "
              >
                {totalProjects}
              </p>
            </div>

            {/* Active */}

            <div
              className="
            rounded-2xl
            border
            bg-background/50
            p-4
          "
            >
              <div
                className="
              flex
              items-center
              justify-between
            "
              >
                <span
                  className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
              "
                >
                  Active Projects
                </span>

                <Sparkles
                  className="
                size-4
                text-primary
              "
                />
              </div>

              <p
                className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
            "
              >
                {activeProjects}
              </p>
            </div>

            {/* Inactive */}

            <div
              className="
            rounded-2xl
            border
            bg-background/50
            p-4
          "
            >
              <div
                className="
              flex
              items-center
              justify-between
            "
              >
                <span
                  className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
              "
                >
                  Inactive
                </span>

                <Activity
                  className="
                size-4
                text-muted-foreground
              "
                />
              </div>

              <p
                className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
            "
              >
                {inactiveProjects}
              </p>
            </div>

            {/* Activity Rate */}

            <div
              className="
            rounded-2xl
            border
            bg-background/50
            p-4
          "
            >
              <div
                className="
              flex
              items-center
              justify-between
            "
              >
                <span
                  className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
              "
                >
                  Activity Rate
                </span>

                <div
                  className="
                h-2
                w-2
                rounded-full
                bg-emerald-500
              "
                />
              </div>

              <p
                className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
            "
              >
                {activePercentage}%
              </p>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Actions                                                        */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
          flex
          flex-wrap
          items-center
          gap-3
        "
          >
            <Button
              type="button"
              variant="outline"
              disabled={isRefreshing}
              onClick={onRefresh}
            >
              <RefreshCw
                className={`
              mr-2
              size-4
              ${isRefreshing ? "animate-spin" : ""}
            `}
              />
              Refresh
            </Button>

            <Button type="button" onClick={onCreate}>
              <Plus className="mr-2 size-4" />
              Add Project
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectsActions;
