import { useMutation } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { ROUTES } from "@/constants/route.constants";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { authStorage } from "@/shared/lib/auth-storage";
import { getErrorMessage } from "@/shared/lib/handle-error";

import { authService } from "../services/auth.service";

import type {
  ILoginPayload,
  ILoginResponse,
  IProfileResponse,
} from "../types/auth.types";

interface ILocationState {
  from?: {
    pathname: string;
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    (location.state as ILocationState | null)?.from?.pathname ??
    ROUTES.DASHBOARD;

  return useMutation<ILoginResponse, Error, ILoginPayload>({
    mutationKey: QUERY_KEYS.AUTH.LOGIN,

    mutationFn: authService.login,

    onMutate: async () => {
      authStorage.clear();

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });
    },

    onSuccess: async (response) => {
      try {
        authStorage.setAccessToken(response.data.accessToken);

        const profile = await queryClient.fetchQuery<IProfileResponse>({
          queryKey: QUERY_KEYS.AUTH.PROFILE,
          queryFn: authService.getProfile,
        });

        authStorage.setUser(profile.data);

        toast.success(response.message ?? "Login successful.");

        navigate(redirectTo, {
          replace: true,
        });
      } catch (error) {
        authStorage.clear();

        queryClient.removeQueries({
          queryKey: QUERY_KEYS.AUTH.PROFILE,
        });

        toast.error(getErrorMessage(error));
      }
    },

    onError: (error) => {
      authStorage.clear();

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });

      toast.error(getErrorMessage(error));
    },
  });
}
