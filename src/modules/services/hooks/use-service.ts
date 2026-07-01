// src\modules\services\hooks\use-service.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { servicesService } from "../services";

import type { IService, IServiceResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseServiceOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Use Service                                 */
/* -------------------------------------------------------------------------- */

export function useService({ id, enabled = true }: UseServiceOptions) {
  return useQuery<IServiceResponse, Error, IService>({
    queryKey: QUERY_KEYS.SERVICES.DETAIL(id),

    queryFn: async () => servicesService.getServiceById(id),

    select: (response): IService => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
