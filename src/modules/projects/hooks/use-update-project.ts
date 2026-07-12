// src\modules\projects\hooks\use-update-project.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { projectsService } from "../services";

import type {
  IProject,
  IProjectsResponse,
  IUpdateProjectPayload,
  IUpdateProjectResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UpdateProjectVariables {
  id: string;

  payload: IUpdateProjectPayload;
}

/* -------------------------------------------------------------------------- */
/*                            Use Update Project                              */
/* -------------------------------------------------------------------------- */

export function useUpdateProject() {
  return useMutation<IUpdateProjectResponse, Error, UpdateProjectVariables>({
    mutationKey: [...QUERY_KEYS.PROJECTS.ALL, "update"],

    mutationFn: ({ id, payload }): Promise<IUpdateProjectResponse> =>
      projectsService.updateProject(id, payload),

    onSuccess: (response, variables): void => {
      const updatedProject: IProject = response.data;

      /* -------------------------------------------------------------------- */
      /*                         Update Detail Cache                          */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.PROJECTS.DETAIL(variables.id),
        response,
      );

      /* -------------------------------------------------------------------- */
      /*                          Update List Caches                          */
      /* -------------------------------------------------------------------- */

      queryClient.setQueriesData<IProjectsResponse>(
        {
          queryKey: QUERY_KEYS.PROJECTS.ALL,
        },
        (oldData) => {
          if (!oldData || !Array.isArray(oldData.data)) {
            return oldData;
          }

          return {
            ...oldData,

            data: oldData.data.map((project) =>
              project._id === updatedProject._id ? updatedProject : project,
            ),
          };
        },
      );

      /* -------------------------------------------------------------------- */
      /*                           Background Sync                            */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.ALL,
      });

      toast.success(response.message ?? "Project updated successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
