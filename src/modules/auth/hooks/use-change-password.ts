import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { authService } from "../services/auth.service";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import type { IChangePasswordPayload } from "../types/auth.type";

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: IChangePasswordPayload) =>
      authService.changePassword(payload),

    onSuccess: async (response) => {
      toast.success(response.message ?? "Password updated successfully.");

      /**
       * Refresh profile cache after password update.
       */
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
