// src/modules/skills/hooks/use-skill.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { skillsService } from "../services";

import type { ISkill, ISkillResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseSkillOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Use Skill                                  */
/* -------------------------------------------------------------------------- */

export function useSkill({ id, enabled = true }: UseSkillOptions) {
  return useQuery<ISkillResponse, Error, ISkill>({
    queryKey: QUERY_KEYS.SKILLS.DETAIL(id),

    queryFn: async () => skillsService.getSkillById(id),

    select: (response): ISkill => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
