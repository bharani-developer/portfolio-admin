// src/modules/hero/hooks/use-create-hero.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { heroService } from "../services";

import type { ICreateHeroPayload, ICreateHeroResponse, IHero } from "../types";

/* -------------------------------------------------------------------------- */
/*                             Create Hero Hook                               */
/* -------------------------------------------------------------------------- */

export function useCreateHero() {
  return useMutation<ICreateHeroResponse, Error, ICreateHeroPayload>({
    mutationKey: [...QUERY_KEYS.HERO.ALL, "create"],

    mutationFn: (payload) => heroService.createHero(payload),

    onSuccess: (response) => {
      queryClient.setQueryData<IHero>(QUERY_KEYS.HERO.DETAIL, response.data);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.HERO.ALL,
      });

      toast.success(response.message || "Hero section created successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
