// src/modules/services/hooks/use-services.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { servicesService } from "../services";

import type {
  IServicesQueryParams,
  IServicesResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                               Use Services                                 */
/* -------------------------------------------------------------------------- */

export function useServices(
  params: IServicesQueryParams,
) {
  return useQuery<IServicesResponse, Error>({
    queryKey: [
      ...QUERY_KEYS.SERVICES.LIST,
      params,
    ],

    queryFn: async () =>
      servicesService.getServices(params),

    placeholderData: (
      previousData,
    ) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}

export default useServices;