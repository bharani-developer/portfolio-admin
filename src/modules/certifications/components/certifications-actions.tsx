// src/modules/certifications/components/certifications-actions.tsx

import type { ReactElement } from "react";

import {
  Activity,
  Award,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { useIsFetching } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface CertificationsActionsProps {
  totalCertifications?: number;

  activeCertifications?: number;

  verifiedCertifications?: number;

  onCreate?: () => void;

  onRefresh?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                         Certifications Actions                             */
/* -------------------------------------------------------------------------- */

export function CertificationsActions({
  totalCertifications = 0,
  activeCertifications = 0,
  verifiedCertifications = 0,
  onCreate,
  onRefresh,
}: CertificationsActionsProps): ReactElement {
  const isFetching =
    useIsFetching({
      queryKey:
        QUERY_KEYS.CERTIFICATIONS.ALL,
    }) > 0;

  // const inactiveCertifications =
  //   Math.max(
  //     totalCertifications -
  //       activeCertifications,
  //     0,
  //   );

  const activePercentage =
    totalCertifications > 0
      ? Math.round(
          (activeCertifications /
            totalCertifications) *
            100,
        )
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
                  Total Certifications
                </span>

                <Award
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
                {totalCertifications}
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
                  Active
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
                {activeCertifications}
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
                  Verified
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
                {verifiedCertifications}
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
                  ${
                    isFetching
                      ? "animate-spin"
                      : ""
                  }
                `}
              />

              Refresh
            </Button>

            <Button
              type="button"
              onClick={onCreate}
            >
              <Plus className="mr-2 size-4" />

              Add Certification
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CertificationsActions;