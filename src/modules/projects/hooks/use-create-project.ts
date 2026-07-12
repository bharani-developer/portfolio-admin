// src\modules\projects\hooks\use-create-project.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { projectsService } from "../services";

import type {
  ICreateProjectPayload,
  ICreateProjectResponse,
  IProject,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                            Use Create Project                              */
/* -------------------------------------------------------------------------- */

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<ICreateProjectResponse, Error, ICreateProjectPayload>({
    mutationKey: [...QUERY_KEYS.PROJECTS.ALL, "create"],

    mutationFn: (payload): Promise<ICreateProjectResponse> =>
      projectsService.createProject(payload),

    onSuccess: (response): void => {
      const createdProject: IProject = response.data;

      queryClient.setQueryData(
        QUERY_KEYS.PROJECTS.DETAIL(createdProject._id),
        response,
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.ALL,
      });

      toast.success(response.message ?? "Project created successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
