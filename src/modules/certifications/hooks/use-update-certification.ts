// src\modules\certifications\hooks\use-update-certification.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { certificationService } from "../services";

import type {
  ICertification,
  IUpdateCertificationResponse,
  IUpdateCertificationVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                       Use Update Certification                             */
/* -------------------------------------------------------------------------- */

export function useUpdateCertification() {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateCertificationResponse,
    Error,
    IUpdateCertificationVariables
  >({
    mutationKey: [...QUERY_KEYS.CERTIFICATIONS.ALL, "update"],

    mutationFn: ({ id, payload }: IUpdateCertificationVariables) =>
      certificationService.updateCertification(id, payload),

    onSuccess: (response, variables): void => {
      const updatedCertification: ICertification = response.data;

      /* ------------------------------------------------------------------ */
      /*                         Update Detail Cache                        */
      /* ------------------------------------------------------------------ */

      queryClient.setQueryData(
        QUERY_KEYS.CERTIFICATIONS.DETAIL(variables.id),
        response,
      );

      queryClient.setQueryData(
        QUERY_KEYS.CERTIFICATIONS.DETAIL(updatedCertification._id),
        response,
      );

      /* ------------------------------------------------------------------ */
      /*                      Invalidate Related Queries                    */
      /* ------------------------------------------------------------------ */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CERTIFICATIONS.ALL,
      });

      toast.success(response.message ?? "Certification updated successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
