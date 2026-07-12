// src\modules\certifications\hooks\use-delete-certification.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { certificationService } from "../services";

import type {
  IDeleteCertificationResponse,
  IDeleteCertificationVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                       Use Delete Certification                             */
/* -------------------------------------------------------------------------- */

export function useDeleteCertification() {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteCertificationResponse,
    Error,
    IDeleteCertificationVariables
  >({
    mutationKey: [...QUERY_KEYS.CERTIFICATIONS.ALL, "delete"],

    mutationFn: ({ id }: IDeleteCertificationVariables) =>
      certificationService.deleteCertification(id),

    onSuccess: (response, variables): void => {
      /* ------------------------------------------------------------------ */
      /*                        Remove Detail Cache                         */
      /* ------------------------------------------------------------------ */

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.CERTIFICATIONS.DETAIL(variables.id),
      });

      /* ------------------------------------------------------------------ */
      /*                      Invalidate Related Queries                    */
      /* ------------------------------------------------------------------ */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CERTIFICATIONS.ALL,
      });

      toast.success(response.message ?? "Certification deleted successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
