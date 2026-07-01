// src\modules\projects\hooks\use-project.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { projectsService } from "../services";

import type { IProject, IProjectResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseProjectOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Use Project                                 */
/* -------------------------------------------------------------------------- */

export function useProject({ id, enabled = true }: UseProjectOptions) {
  return useQuery<IProjectResponse, Error, IProject>({
    queryKey: QUERY_KEYS.PROJECTS.DETAIL(id),

    queryFn: async () => projectsService.getProjectById(id),

    select: (response): IProject => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
