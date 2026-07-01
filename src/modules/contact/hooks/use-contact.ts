// src\modules\contact\hooks\use-contact.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { contactService } from "../services";

import type { IContact, IContactResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseContactOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Use Contact                                  */
/* -------------------------------------------------------------------------- */

export function useContact({ id, enabled = true }: UseContactOptions) {
  return useQuery<IContactResponse, Error, IContact>({
    queryKey: QUERY_KEYS.CONTACT.DETAIL(id),

    queryFn: async (): Promise<IContactResponse> =>
      contactService.getContactById(id),

    select: (response): IContact => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
