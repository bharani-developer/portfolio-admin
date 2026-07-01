// src/modules/contact/hooks/use-mark-contact-read.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { contactService } from "../services";

import type {
  IMarkContactReadVariables,
  IUpdateContactResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                        Use Mark Contact Read                               */
/* -------------------------------------------------------------------------- */

export function useMarkContactRead() {
  const queryClient = useQueryClient();

  return useMutation<IUpdateContactResponse, Error, IMarkContactReadVariables>({
    mutationFn: async ({
      id,
    }: IMarkContactReadVariables): Promise<IUpdateContactResponse> =>
      contactService.markAsRead(id),

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
