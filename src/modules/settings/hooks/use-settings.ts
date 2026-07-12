// src\modules\settings\hooks\use-settings.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { settingsService } from "../services";

import type { ISettings, ISettingsResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                              Use Settings                                  */
/* -------------------------------------------------------------------------- */

export function useSettings() {
  return useQuery<ISettingsResponse, Error, ISettings>({
    queryKey: QUERY_KEYS.SETTINGS.DETAIL(),

    queryFn: async (): Promise<ISettingsResponse> =>
      settingsService.getSettings(),

    select: (response): ISettings => response.data,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,

    refetchOnMount: true,
  });
}
