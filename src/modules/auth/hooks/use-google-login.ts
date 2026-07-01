// src/modules/auth/hooks/use-google-login.ts

import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { ROUTES } from "@/routes/route.constant";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { authStorage } from "@/shared/lib/auth-storage";
import { getErrorMessage } from "@/shared/lib/handle-error";

import { authService } from "../services/auth.service";

import type {
  IGoogleLoginPayload,
  IGoogleLoginResponse,
  IProfileResponse,
} from "../types/auth.type";

export function useGoogleLogin() {
  const navigate = useNavigate();

  return useMutation<
    IGoogleLoginResponse,
    Error,
    IGoogleLoginPayload
  >({
    mutationKey: ["auth", "google-login"],

    mutationFn: async (
      payload: IGoogleLoginPayload,
    ): Promise<IGoogleLoginResponse> => {
      return authService.googleLogin(payload);
    },

    onMutate: async () => {
      authStorage.clear();

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });
    },

    onSuccess: async (response) => {
      try {
        authStorage.setAccessToken(
          response.data.accessToken,
        );

        const profile =
          await authService.getProfile();

        authStorage.setUser(profile.data);

        queryClient.setQueryData<IProfileResponse>(
          QUERY_KEYS.AUTH.PROFILE,
          profile,
        );

        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.AUTH.PROFILE,
        });

        toast.success(
          response.message ??
            "Google login successful.",
        );

        navigate(ROUTES.DASHBOARD, {
          replace: true,
        });
      } catch (error) {
        authStorage.clear();

        queryClient.removeQueries({
          queryKey: QUERY_KEYS.AUTH.PROFILE,
        });

        toast.error(
          getErrorMessage(error),
        );
      }
    },

    onError: (error) => {
      authStorage.clear();

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });

      toast.error(
        getErrorMessage(error),
      );
    },
  });
}