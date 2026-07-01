// src\modules\education\hooks\use-delete-education.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { educationService } from "../services";

import type {
  IDeleteEducationResponse,
  IDeleteEducationVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Delete Education                             */
/* -------------------------------------------------------------------------- */

export function useDeleteEducation() {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteEducationResponse,
    Error,
    IDeleteEducationVariables
  >({
    mutationKey: [...QUERY_KEYS.EDUCATION.ALL, "delete"],

    mutationFn: ({
      id,
    }: IDeleteEducationVariables): Promise<IDeleteEducationResponse> =>
      educationService.deleteEducation(id),

    onSuccess: (response, variables): void => {
      /* -------------------------------------------------------------------- */
      /*                        Remove Detail Cache                           */
      /* -------------------------------------------------------------------- */

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.EDUCATION.DETAIL(variables.id),
      });

      /* -------------------------------------------------------------------- */
      /*                      Invalidate Related Queries                      */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EDUCATION.ALL,
      });

      toast.success(response.message ?? "Education deleted successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
