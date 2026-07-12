// src\modules\experience\hooks\use-update-experience.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { experienceService } from "../services";

import type {
  IExperience,
  IUpdateExperienceResponse,
  IUpdateExperienceVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Update Experience                            */
/* -------------------------------------------------------------------------- */

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateExperienceResponse,
    Error,
    IUpdateExperienceVariables
  >({
    mutationKey: [...QUERY_KEYS.EXPERIENCE.ALL, "update"],

    mutationFn: ({ id, payload }: IUpdateExperienceVariables) =>
      experienceService.updateExperience(id, payload),

    onSuccess: (response, variables): void => {
      const updatedExperience: IExperience = response.data;

      /* -------------------------------------------------------------------- */
      /*                         Update Detail Cache                          */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.EXPERIENCE.DETAIL(variables.id),
        response,
      );

      /* -------------------------------------------------------------------- */
      /*                        Invalidate Experience Data                    */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EXPERIENCE.ALL,
      });

      /* -------------------------------------------------------------------- */
      /*                     Refresh Updated Detail Cache                     */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.EXPERIENCE.DETAIL(updatedExperience._id),
        response,
      );

      toast.success(response.message ?? "Experience updated successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
