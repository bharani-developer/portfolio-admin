// src/modules/experience/hooks/use-experiences.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { experienceService } from "../services";

import type { IExperienceQueryParams, IExperiencesResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                             Use Experiences                                */
/* -------------------------------------------------------------------------- */

export function useExperiences(params?: IExperienceQueryParams) {
  return useQuery<IExperiencesResponse, Error>({
    queryKey: QUERY_KEYS.EXPERIENCE.LIST(
      params as Record<string, unknown> | undefined,
    ),

    queryFn: async () => experienceService.getExperiences(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
