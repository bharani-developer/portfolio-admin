// src\modules\education\hooks\use-create-education.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { educationService } from "../services";

import type {
  ICreateEducationPayload,
  ICreateEducationResponse,
  IEducation,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Create Education                             */
/* -------------------------------------------------------------------------- */

export function useCreateEducation() {
  const queryClient = useQueryClient();

  return useMutation<ICreateEducationResponse, Error, ICreateEducationPayload>({
    mutationKey: [...QUERY_KEYS.EDUCATION.ALL, "create"],

    mutationFn: (payload): Promise<ICreateEducationResponse> =>
      educationService.createEducation(payload),

    onSuccess: (response): void => {
      const createdEducation: IEducation = response.data;

      /* -------------------------------------------------------------------- */
      /*                         Update Detail Cache                          */
      /* -------------------------------------------------------------------- */

      queryClient.setQueryData(
        QUERY_KEYS.EDUCATION.DETAIL(createdEducation._id),
        response,
      );

      /* -------------------------------------------------------------------- */
      /*                        Invalidate List Queries                       */
      /* -------------------------------------------------------------------- */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EDUCATION.ALL,
      });

      toast.success(response.message ?? "Education created successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
