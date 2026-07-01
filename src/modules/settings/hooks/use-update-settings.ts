// src/modules/settings/hooks/use-update-settings.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { settingsService } from "../services";

import type {
  ISettings,
  IUpdateSettingsPayload,
  IUpdateSettingsResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */

interface IUpdateSettingsContext {
  previousSettings?: ISettings;
}

/* -------------------------------------------------------------------------- */
/*                           Use Update Settings                              */
/* -------------------------------------------------------------------------- */

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateSettingsResponse,
    Error,
    IUpdateSettingsPayload,
    IUpdateSettingsContext
  >({
    mutationFn: (
      payload: IUpdateSettingsPayload,
    ): Promise<IUpdateSettingsResponse> =>
      settingsService.updateSettings(payload),

    onMutate: async (payload): Promise<IUpdateSettingsContext> => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.SETTINGS.DETAIL(),
      });

      const previousSettings = queryClient.getQueryData<ISettings>(
        QUERY_KEYS.SETTINGS.DETAIL(),
      );

      if (previousSettings) {
        queryClient.setQueryData<ISettings>(QUERY_KEYS.SETTINGS.DETAIL(), {
          ...previousSettings,
          ...payload,
        });

        return {
          previousSettings,
        };
      }

      return {};
    },

    onError: (_error, _payload, context) => {
      if (!context?.previousSettings) {
        return;
      }

      queryClient.setQueryData<ISettings>(
        QUERY_KEYS.SETTINGS.DETAIL(),
        context.previousSettings,
      );
    },

    onSuccess: (response) => {
      queryClient.setQueryData<ISettings>(
        QUERY_KEYS.SETTINGS.DETAIL(),
        response.data,
      );
    },

    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.SETTINGS.ALL(),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.SETTINGS.DETAIL(),
        }),
      ]);
    },
  });
}
