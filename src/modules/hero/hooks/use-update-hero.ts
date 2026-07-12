// src/modules/hero/hooks/use-update-hero.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { heroService } from "../services";

import type { IHero, IUpdateHeroPayload, IUpdateHeroResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                             Update Hero Hook                               */
/* -------------------------------------------------------------------------- */

export function useUpdateHero() {
  return useMutation<IUpdateHeroResponse, Error, IUpdateHeroPayload>({
    mutationKey: [...QUERY_KEYS.HERO.ALL, "update"],

    mutationFn: (payload) => heroService.updateHero(payload),

    onSuccess: (response) => {
      queryClient.setQueryData<IHero>(QUERY_KEYS.HERO.DETAIL, response.data);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.HERO.ALL,
      });

      toast.success(response.message || "Hero section updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
