// src\modules\certifications\hooks\use-create-certification.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { certificationService } from "../services";

import type {
  ICertification,
  ICreateCertificationPayload,
  ICreateCertificationResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                       Use Create Certification                             */
/* -------------------------------------------------------------------------- */

export function useCreateCertification() {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateCertificationResponse,
    Error,
    ICreateCertificationPayload
  >({
    mutationKey: [...QUERY_KEYS.CERTIFICATIONS.ALL, "create"],

    mutationFn: (payload): Promise<ICreateCertificationResponse> =>
      certificationService.createCertification(payload),

    onSuccess: (response): void => {
      const createdCertification: ICertification = response.data;

      /* ------------------------------------------------------------------ */
      /*                        Update Detail Cache                         */
      /* ------------------------------------------------------------------ */

      queryClient.setQueryData(
        QUERY_KEYS.CERTIFICATIONS.DETAIL(createdCertification._id),
        response,
      );

      /* ------------------------------------------------------------------ */
      /*                      Invalidate Related Queries                    */
      /* ------------------------------------------------------------------ */

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CERTIFICATIONS.ALL,
      });

      toast.success(response.message ?? "Certification created successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
