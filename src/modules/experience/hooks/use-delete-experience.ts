// src\modules\experience\hooks\use-delete-experience.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { experienceService } from "../services";

import type {
  IDeleteExperienceResponse,
  IDeleteExperienceVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Delete Experience                            */
/* -------------------------------------------------------------------------- */

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteExperienceResponse,
    Error,
    IDeleteExperienceVariables
  >({
    mutationKey: [...QUERY_KEYS.EXPERIENCE.ALL, "delete"],

    mutationFn: ({ id }: IDeleteExperienceVariables) =>
      experienceService.deleteExperience(id),

    onSuccess: (response, variables): void => {
      /* -------------------------------------------------------------------- */
      /*                        Remove Detail Cache                           */
      /* -------------------------------------------------------------------- */

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.EXPERIENCE.DETAIL(variables.id),
      });

      /* -------------------------------------------------------------------- */
      /*                     Refresh Experience Queries                       */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EXPERIENCE.ALL,
      });

      toast.success(response.message ?? "Experience deleted successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
