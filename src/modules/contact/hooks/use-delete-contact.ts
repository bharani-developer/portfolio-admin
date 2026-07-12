// src\modules\contact\hooks\use-delete-contact.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { contactService } from "../services";

import type { IDeleteContactResponse, IDeleteContactVariables } from "../types";

/* -------------------------------------------------------------------------- */
/*                           Use Delete Contact                               */
/* -------------------------------------------------------------------------- */

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation<IDeleteContactResponse, Error, IDeleteContactVariables>({
    mutationFn: async ({
      id,
    }: IDeleteContactVariables): Promise<IDeleteContactResponse> =>
      contactService.deleteContact(id),

    onSuccess: async (_response, variables): Promise<void> => {
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

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.CONTACT.DETAIL(variables.id),
      });
    },
  });
}
