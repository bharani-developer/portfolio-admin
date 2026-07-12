// src\modules\certifications\hooks\use-certification.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { certificationService } from "../services";

import type { ICertification, ICertificationResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseCertificationOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                            Use Certification                               */
/* -------------------------------------------------------------------------- */

export function useCertification({
  id,
  enabled = true,
}: UseCertificationOptions) {
  return useQuery<ICertificationResponse, Error, ICertification>({
    queryKey: QUERY_KEYS.CERTIFICATIONS.DETAIL(id),

    queryFn: async () => certificationService.getCertificationById(id),

    select: (response): ICertification => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
