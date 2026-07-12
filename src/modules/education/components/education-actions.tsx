import type { ReactElement } from "react";

import {
  Activity,
  GraduationCap,
  Plus,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useIsFetching } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

interface EducationActionsProps {
  totalEducations?: number;

  activeEducations?: number;

  currentEducations?: number;

  onCreate: () => void;

  onRefresh?: () => void;
}

export function EducationActions({
  totalEducations = 0,
  activeEducations = 0,
  currentEducations = 0,
  onCreate,
  onRefresh,
}: EducationActionsProps): ReactElement {
  const isFetching =
    useIsFetching({
      queryKey: QUERY_KEYS.EDUCATION.ALL,
    }) > 0;

  const inactiveEducations = Math.max(totalEducations - activeEducations, 0);

  const activePercentage =
    totalEducations > 0
      ? Math.round((activeEducations / totalEducations) * 100)
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
          <div
            className="
              grid
              flex-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
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
                  Total Education
                </span>

                <TrendingUp className="size-4 text-muted-foreground" />
              </div>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >
                {totalEducations}
              </p>
            </div>

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
                  Active Records
                </span>

                <Sparkles className="size-4 text-primary" />
              </div>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >
                {activeEducations}
              </p>
            </div>

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
                  Current Studies
                </span>

                <GraduationCap className="size-4 text-muted-foreground" />
              </div>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                "
              >
                {currentEducations}
              </p>
            </div>

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

                <Activity className="size-4 text-muted-foreground" />
              </div>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
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
                {inactiveEducations} inactive
              </p>
            </div>
          </div>

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
              Add Education
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EducationActions;
