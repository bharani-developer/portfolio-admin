// src/modules/certifications/hooks/use-certifications.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { certificationService } from "../services";

import type {
  ICertificationQueryParams,
  ICertificationsResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Certifications                               */
/* -------------------------------------------------------------------------- */

export function useCertifications(params?: ICertificationQueryParams) {
  return useQuery<ICertificationsResponse, Error>({
    queryKey: QUERY_KEYS.CERTIFICATIONS.LIST(
      params as Record<string, unknown> | undefined,
    ),

    queryFn: async () => certificationService.getCertifications(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
