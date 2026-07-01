// src\modules\dashboard\components\dashboard-skeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

/* -------------------------------------------------------------------------- */
/*                           Dashboard Skeleton                               */
/* -------------------------------------------------------------------------- */

export function DashboardSkeleton(): React.JSX.Element {
  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Page Header                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />

        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Stats Cards                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-4 space-y-2">
          <Skeleton className="h-6 w-48" />

          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />

                  <Skeleton className="size-4 rounded-full" />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <Skeleton className="h-8 w-20" />

                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Configuration Section                                              */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-48" />

            <Skeleton className="h-4 w-72" />
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="
                  rounded-xl
                  border
                  p-4
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="size-4 rounded-full" />

                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-4 w-full" />

                <Skeleton className="mt-2 h-4 w-3/4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Recent Activity                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-4 space-y-2">
          <Skeleton className="h-6 w-44" />

          <Skeleton className="h-4 w-80" />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, cardIndex) => (
            <Card key={cardIndex}>
              <CardHeader>
                <Skeleton className="h-5 w-40" />
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <Skeleton className="h-4 w-full" />

                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardSkeleton;
