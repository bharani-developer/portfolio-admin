// src/modules/contact/hooks/use-create-contact.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { contactService } from "../services";

import type { ICreateContactPayload, ICreateContactResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Create Contact                               */
/* -------------------------------------------------------------------------- */

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation<ICreateContactResponse, Error, ICreateContactPayload>({
    mutationFn: async (
      payload: ICreateContactPayload,
    ): Promise<ICreateContactResponse> => contactService.createContact(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.ALL,
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.STATS(),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.ACTIVE(),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.UNREAD(),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.READ(),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.REPLIED(),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DASHBOARD.ALL,
        }),
      ]);
    },
  });
}
