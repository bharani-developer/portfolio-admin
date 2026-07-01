// src/modules/testimonials/components/testimonials-actions.tsx

import type { ReactElement } from "react";

import {
  MessageSquareQuote,
  Plus,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useIsFetching } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface TestimonialsActionsProps {
  totalTestimonials?: number;

  activeTestimonials?: number;

  featuredTestimonials?: number;

  onCreate?: () => void;

  onRefresh?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                           Testimonials Actions                             */
/* -------------------------------------------------------------------------- */

export function TestimonialsActions({
  totalTestimonials = 0,
  activeTestimonials = 0,
  featuredTestimonials = 0,
  onCreate,
  onRefresh,
}: TestimonialsActionsProps): ReactElement {
  const isFetching =
    useIsFetching({
      queryKey: QUERY_KEYS.TESTIMONIALS.ALL,
    }) > 0;

  // const inactiveTestimonials = Math.max(
  //   totalTestimonials - activeTestimonials,
  //   0,
  // );

  const activePercentage =
    totalTestimonials > 0
      ? Math.round((activeTestimonials / totalTestimonials) * 100)
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
            {/* Total Testimonials */}

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
                  Total Testimonials
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
                {totalTestimonials}
              </p>
            </div>

            {/* Active Testimonials */}

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
                  Active Testimonials
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
                {activeTestimonials}
              </p>
            </div>

            {/* Featured Testimonials */}

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
                  Featured
                </span>

                <MessageSquareQuote
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
                {featuredTestimonials}
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
              Add Testimonial
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialsActions;
