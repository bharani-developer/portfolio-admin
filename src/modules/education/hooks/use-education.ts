// src\modules\education\hooks\use-education.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { educationService } from "../services";

import type { IEducation, IEducationResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseEducationOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Use Education                                 */
/* -------------------------------------------------------------------------- */

export function useEducation({ id, enabled = true }: UseEducationOptions) {
  return useQuery<IEducationResponse, Error, IEducation>({
    queryKey: QUERY_KEYS.EDUCATION.DETAIL(id),

    queryFn: async () => educationService.getEducationById(id),

    select: (response): IEducation => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
