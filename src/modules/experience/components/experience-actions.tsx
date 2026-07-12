// src/modules/experience/components/experience-actions.tsx

import type { ReactElement } from "react";

import {
  BriefcaseBusiness,
  Plus,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useIsFetching } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ExperienceActionsProps {
  totalExperiences?: number;

  activeExperiences?: number;

  currentPositions?: number;

  onCreate?: () => void;

  onRefresh?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                            Experience Actions                              */
/* -------------------------------------------------------------------------- */

export function ExperienceActions({
  totalExperiences = 0,
  activeExperiences = 0,
  currentPositions = 0,
  onCreate,
  onRefresh,
}: ExperienceActionsProps): ReactElement {
  const isFetching =
    useIsFetching({
      queryKey: QUERY_KEYS.EXPERIENCE.ALL,
    }) > 0;

  const inactiveExperiences = Math.max(totalExperiences - activeExperiences, 0);

  const activePercentage =
    totalExperiences > 0
      ? Math.round((activeExperiences / totalExperiences) * 100)
      : 0;

  return (
    <Card
      className="
        border-border/60
        bg-card/70
        backdrop-blur-sm
      "
    >
      <CardContent className="p-6">
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
          {/* ---------------------------------------------------------------- */}
          {/* Statistics                                                       */}
          {/* ---------------------------------------------------------------- */}

          <div
            className="
              grid
              flex-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {/* Total Experience */}

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
                  Total Experience
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
                {totalExperiences}
              </p>
            </div>

            {/* Active Experience */}

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
                  Active Experience
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
                {activeExperiences}
              </p>
            </div>

            {/* Current Positions */}

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
                  Current Roles
                </span>

                <BriefcaseBusiness
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
                {currentPositions}
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

              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                "
              >
                {inactiveExperiences} inactive
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Actions                                                          */}
          {/* ---------------------------------------------------------------- */}

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
              disabled={isFetching}
              onClick={onRefresh}
            >
              <RefreshCw
                className={`
                  mr-2
                  size-4
                  ${isFetching ? "animate-spin" : ""}
                `}
              />
              Refresh
            </Button>

            <Button type="button" onClick={onCreate}>
              <Plus className="mr-2 size-4" />
              Add Experience
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExperienceActions;
