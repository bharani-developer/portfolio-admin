// src\modules\dashboard\hooks\use-dashboard.ts
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { dashboardService } from "../services";

import type { IDashboard, IDashboardResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Use Dashboard                                */
/* -------------------------------------------------------------------------- */

export function useDashboard() {
  return useQuery<IDashboardResponse, Error, IDashboard>({
    queryKey: QUERY_KEYS.DASHBOARD.STATS,

    queryFn: async (): Promise<IDashboardResponse> =>
      dashboardService.getDashboardStats(),

    select: (response): IDashboard => response.data,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,

    refetchOnMount: true,
  });
}
