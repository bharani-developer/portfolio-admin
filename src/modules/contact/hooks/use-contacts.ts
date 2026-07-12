// src/modules/contact/hooks/use-contacts.ts

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { contactService } from "../services";

import type { IContactQueryParams, IContactsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Use Contacts                                 */
/* -------------------------------------------------------------------------- */

export function useContacts(
  params?: IContactQueryParams,
): UseQueryResult<IContactsResponse, Error> {
  return useQuery<IContactsResponse, Error, IContactsResponse>({
    queryKey: QUERY_KEYS.CONTACT.LIST(
      params as Record<string, unknown> | undefined,
    ),

    queryFn: () => contactService.getContacts(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
