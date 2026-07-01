// src\modules\about\hooks\use-delete-about.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { aboutService } from "../services";

import type { IAbout, IDeleteAboutResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface DeleteAboutContext {
  previousAbout: IAbout | undefined;
}

/* -------------------------------------------------------------------------- */
/*                             Delete About Hook                              */
/* -------------------------------------------------------------------------- */

export function useDeleteAbout() {
  return useMutation<IDeleteAboutResponse, Error, void, DeleteAboutContext>({
    mutationKey: [...QUERY_KEYS.ABOUT.ALL, "delete"],

    mutationFn: () => aboutService.deleteAbout(),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.ABOUT.DETAIL,
      });

      const previousAbout = queryClient.getQueryData<IAbout>(
        QUERY_KEYS.ABOUT.DETAIL,
      );

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.ABOUT.DETAIL,
      });

      return {
        previousAbout,
      };
    },

    onSuccess: (response) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.ABOUT.DETAIL,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ABOUT.ALL,
      });

      toast.success(response.message ?? "About section deleted successfully.");
    },

    onError: (error, _variables, context) => {
      if (context?.previousAbout) {
        queryClient.setQueryData<IAbout>(
          QUERY_KEYS.ABOUT.DETAIL,
          context.previousAbout,
        );
      }

      toast.error(getErrorMessage(error));
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ABOUT.ALL,
      });
    },
  });
}
