// src/modules/projects/hooks/use-delete-project.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { projectsService } from "../services";

import type {
  IDeleteProjectResponse,
  IProject,
  IProjectsResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface DeleteProjectVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                            Use Delete Project                              */
/* -------------------------------------------------------------------------- */

export function useDeleteProject() {
  return useMutation<IDeleteProjectResponse, Error, DeleteProjectVariables>({
    mutationKey: [...QUERY_KEYS.PROJECTS.ALL, "delete"],

    mutationFn: ({ id }): Promise<IDeleteProjectResponse> =>
      projectsService.deleteProject(id),

    onSuccess: (response, variables): void => {
      const deletedProject: IProject = response.data;

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.PROJECTS.DETAIL(variables.id),
      });

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

            data: oldData.data.filter(
              (project) => project._id !== deletedProject._id,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.ALL,
      });

      toast.success(response.message ?? "Project deleted successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
