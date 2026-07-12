// src/modules/skills/components/skills-actions.tsx

import type { ReactElement } from "react";

import { Activity, Plus, RefreshCw, Sparkles, TrendingUp } from "lucide-react";

import { useIsFetching } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SkillsActionsProps {
  totalSkills?: number;

  activeSkills?: number;

  onCreate?: () => void;

  onRefresh?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                              Skills Actions                                */
/* -------------------------------------------------------------------------- */

export function SkillsActions({
  totalSkills = 0,
  activeSkills = 0,
  onCreate,
  onRefresh,
}: SkillsActionsProps): ReactElement {
  const isFetching =
    useIsFetching({
      queryKey: QUERY_KEYS.SKILLS.ALL,
    }) > 0;

  const inactiveSkills = Math.max(totalSkills - activeSkills, 0);

  const activePercentage =
    totalSkills > 0 ? Math.round((activeSkills / totalSkills) * 100) : 0;

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
          {/* Statistics                                                        */}
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
                  Total Skills
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
                {totalSkills}
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
                  Active Skills
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
                {activeSkills}
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
                {inactiveSkills}
              </p>
            </div>

            {/* Status */}

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

          {/* ---------------------------------------------------------------- */}
          {/* Actions                                                           */}
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

            <Button type="button" size="default" onClick={onCreate}>
              <Plus className="mr-2 size-4" />
              Add Skill
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SkillsActions;
