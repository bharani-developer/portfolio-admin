// src/modules/about/hooks/use-about.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { aboutService } from "../services";

import type { IAbout, IAboutResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Use About                                  */
/* -------------------------------------------------------------------------- */

export function useAbout() {
  return useQuery<IAboutResponse, Error, IAbout>({
    queryKey: QUERY_KEYS.ABOUT.DETAIL,

    queryFn: async () => aboutService.getAbout(),

    select: (response): IAbout => response.data,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
