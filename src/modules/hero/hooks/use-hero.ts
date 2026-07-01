// src/modules/hero/hooks/use-hero.ts

import { useQuery } from "@tanstack/react-query";

import { heroService } from "../services";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import type { IHero, IHeroResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                  Hook                                      */
/* -------------------------------------------------------------------------- */

export function useHero() {
  return useQuery<IHeroResponse, Error, IHero>({
    queryKey: QUERY_KEYS.HERO.DETAIL,

    queryFn: async () => heroService.getHero(),

    select: (response) => response.data,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
