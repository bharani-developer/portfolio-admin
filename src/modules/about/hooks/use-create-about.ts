// src\modules\about\hooks\use-create-about.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { aboutService } from "../services";

import type {
  IAbout,
  ICreateAboutPayload,
  ICreateAboutResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                             Create About Hook                              */
/* -------------------------------------------------------------------------- */

export function useCreateAbout() {
  return useMutation<ICreateAboutResponse, Error, ICreateAboutPayload>({
    mutationKey: [...QUERY_KEYS.ABOUT.ALL, "create"],

    mutationFn: (payload) => aboutService.createAbout(payload),

    onSuccess: (response) => {
      queryClient.setQueryData<IAbout>(QUERY_KEYS.ABOUT.DETAIL, response.data);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ABOUT.ALL,
      });

      toast.success(response.message || "About section created successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
