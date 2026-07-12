// src\modules\contact\hooks\use-active-contacts.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { contactService } from "../services";

import type { IContact, IContactsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Active Contacts                              */
/* -------------------------------------------------------------------------- */

export function useActiveContacts() {
  return useQuery<IContactsResponse, Error, IContact[]>({
    queryKey: QUERY_KEYS.CONTACT.ACTIVE(),

    queryFn: async (): Promise<IContactsResponse> =>
      contactService.getActiveContacts(),

    select: (response): IContact[] => response.data,

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,

    refetchOnMount: false,
  });
}
