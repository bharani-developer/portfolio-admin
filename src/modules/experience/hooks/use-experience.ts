// src\modules\experience\hooks\use-experience.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { experienceService } from "../services";

import type { IExperience, IExperienceResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseExperienceOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Use Experience                                */
/* -------------------------------------------------------------------------- */

export function useExperience({ id, enabled = true }: UseExperienceOptions) {
  return useQuery<IExperienceResponse, Error, IExperience>({
    queryKey: QUERY_KEYS.EXPERIENCE.DETAIL(id),

    queryFn: async () => experienceService.getExperienceById(id),

    select: (response): IExperience => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
