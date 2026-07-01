// src\modules\education\hooks\use-update-education.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { educationService } from "../services";

import type {
  IEducation,
  IUpdateEducationResponse,
  IUpdateEducationVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Update Education                             */
/* -------------------------------------------------------------------------- */

export function useUpdateEducation() {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateEducationResponse,
    Error,
    IUpdateEducationVariables
  >({
    mutationKey: [...QUERY_KEYS.EDUCATION.ALL, "update"],

    mutationFn: ({
      id,
      payload,
    }: IUpdateEducationVariables): Promise<IUpdateEducationResponse> =>
      educationService.updateEducation(id, payload),

    onSuccess: (response, variables): void => {
      const updatedEducation: IEducation = response.data;

      /* -------------------------------------------------------------------- */
      /*                         Update Detail Cache                          */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.EDUCATION.DETAIL(variables.id),
        response,
      );

      /* -------------------------------------------------------------------- */
      /*                      Invalidate Related Queries                      */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EDUCATION.ALL,
      });

      /* -------------------------------------------------------------------- */
      /*                    Refresh Updated Detail Cache                      */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.EDUCATION.DETAIL(updatedEducation._id),
        response,
      );

      toast.success(response.message ?? "Education updated successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
