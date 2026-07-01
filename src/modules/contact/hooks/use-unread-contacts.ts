// src\modules\contact\hooks\use-unread-contacts.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { contactService } from "../services";

import type { IContact, IContactsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Unread Contacts                              */
/* -------------------------------------------------------------------------- */

export function useUnreadContacts() {
  return useQuery<IContactsResponse, Error, IContact[]>({
    queryKey: QUERY_KEYS.CONTACT.UNREAD(),

    queryFn: async (): Promise<IContactsResponse> =>
      contactService.getUnreadContacts(),

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
