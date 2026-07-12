// src/modules/education/hooks/use-educations.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { educationService } from "../services";

import type { IEducationQueryParams, IEducationsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                             Use Educations                                 */
/* -------------------------------------------------------------------------- */

export function useEducations(params?: IEducationQueryParams) {
  return useQuery<IEducationsResponse, Error>({
    queryKey: QUERY_KEYS.EDUCATION.LIST(
      params as Record<string, unknown> | undefined,
    ),

    queryFn: async () => educationService.getEducations(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
