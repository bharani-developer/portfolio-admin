// src\modules\experience\hooks\use-create-experience.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { experienceService } from "../services";

import type {
  ICreateExperiencePayload,
  ICreateExperienceResponse,
  IExperience,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Create Experience                            */
/* -------------------------------------------------------------------------- */

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateExperienceResponse,
    Error,
    ICreateExperiencePayload
  >({
    mutationKey: [...QUERY_KEYS.EXPERIENCE.ALL, "create"],

    mutationFn: (payload): Promise<ICreateExperienceResponse> =>
      experienceService.createExperience(payload),

    onSuccess: (response): void => {
      const createdExperience: IExperience = response.data;

      /* -------------------------------------------------------------------- */
      /*                         Update Detail Cache                          */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.EXPERIENCE.DETAIL(createdExperience._id),
        response,
      );

      /* -------------------------------------------------------------------- */
      /*                        Invalidate List Queries                       */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EXPERIENCE.ALL,
      });

      toast.success(response.message ?? "Experience created successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
