// src/modules/projects/hooks/use-projects.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { projectsService } from "../services";

import type { IProjectsQueryParams, IProjectsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                Use Projects                                */
/* -------------------------------------------------------------------------- */

export function useProjects(params: IProjectsQueryParams) {
  return useQuery<IProjectsResponse, Error>({
    queryKey: QUERY_KEYS.PROJECTS.LIST(params as Record<string, unknown>),

    queryFn: async () => projectsService.getProjects(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
