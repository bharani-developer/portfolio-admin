// src\modules\contact\hooks\use-mark-contact-replied.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { contactService } from "../services";

import type {
  IMarkContactRepliedVariables,
  IUpdateContactResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                       Use Mark Contact Replied                             */
/* -------------------------------------------------------------------------- */

export function useMarkContactReplied() {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateContactResponse,
    Error,
    IMarkContactRepliedVariables
  >({
    mutationFn: async ({
      id,
    }: IMarkContactRepliedVariables): Promise<IUpdateContactResponse> =>
      contactService.markAsReplied(id),

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
