// src\modules\about\hooks\use-update-about.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { aboutService } from "../services";

import type {
  IAbout,
  IUpdateAboutPayload,
  IUpdateAboutResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                             Update About Hook                              */
/* -------------------------------------------------------------------------- */

export function useUpdateAbout() {
  return useMutation<IUpdateAboutResponse, Error, IUpdateAboutPayload>({
    mutationKey: [...QUERY_KEYS.ABOUT.ALL, "update"],

    mutationFn: (payload) => aboutService.updateAbout(payload),

    onSuccess: (response) => {
      queryClient.setQueryData<IAbout>(QUERY_KEYS.ABOUT.DETAIL, response.data);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ABOUT.ALL,
      });

      toast.success(response.message || "About section updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
