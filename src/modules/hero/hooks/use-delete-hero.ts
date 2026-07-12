// src/modules/hero/hooks/use-delete-hero.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { heroService } from "../services";

import type { IDeleteHeroResponse, IHero } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface DeleteHeroContext {
  previousHero: IHero | undefined;
}

/* -------------------------------------------------------------------------- */
/*                             Delete Hero Hook                               */
/* -------------------------------------------------------------------------- */

export function useDeleteHero() {
  return useMutation<IDeleteHeroResponse, Error, void, DeleteHeroContext>({
    mutationKey: [...QUERY_KEYS.HERO.ALL, "delete"],

    mutationFn: () => heroService.deleteHero(),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.HERO.DETAIL,
      });

      const previousHero = queryClient.getQueryData<IHero>(
        QUERY_KEYS.HERO.DETAIL,
      );

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.HERO.DETAIL,
      });

      return {
        previousHero,
      };
    },

    onSuccess: (response) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.HERO.DETAIL,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.HERO.ALL,
      });

      toast.success(response.message || "Hero section deleted successfully.");
    },

    onError: (error, _variables, context) => {
      if (context?.previousHero) {
        queryClient.setQueryData(QUERY_KEYS.HERO.DETAIL, context.previousHero);
      }

      toast.error(getErrorMessage(error));
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.HERO.ALL,
      });
    },
  });
}
