// src\modules\contact\hooks\use-contact-stats.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { contactService } from "../services";

import type { IContactStats, IContactStatsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Contact Stats                                */
/* -------------------------------------------------------------------------- */

export function useContactStats() {
  return useQuery<IContactStatsResponse, Error, IContactStats>({
    queryKey: QUERY_KEYS.CONTACT.STATS(),

    queryFn: async (): Promise<IContactStatsResponse> =>
      contactService.getContactStats(),

    select: (response): IContactStats => response.data,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
