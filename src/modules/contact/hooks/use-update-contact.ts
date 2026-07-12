// src\modules\contact\hooks\use-update-contact.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { contactService } from "../services";

import type { IUpdateContactResponse, IUpdateContactVariables } from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Update Contact                               */
/* -------------------------------------------------------------------------- */

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation<IUpdateContactResponse, Error, IUpdateContactVariables>({
    mutationFn: async ({
      id,
      payload,
    }: IUpdateContactVariables): Promise<IUpdateContactResponse> =>
      contactService.updateContact(id, payload),

    onSuccess: async (response, variables): Promise<void> => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.ALL,
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.CONTACT.DETAIL(variables.id),
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

      queryClient.setQueryData(
        QUERY_KEYS.CONTACT.DETAIL(variables.id),
        response,
      );
    },
  });
}
