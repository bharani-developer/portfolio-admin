// src/modules/skills/hooks/use-skills.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { skillsService } from "../services";

import type { ISkillsQueryParams, ISkillsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                Use Skills                                  */
/* -------------------------------------------------------------------------- */

export function useSkills(params: ISkillsQueryParams) {
  return useQuery<ISkillsResponse, Error>({
    queryKey: [...QUERY_KEYS.SKILLS.LIST, params],

    queryFn: async () => skillsService.getSkills(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
