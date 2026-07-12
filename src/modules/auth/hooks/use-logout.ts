import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { authService } from "../services/auth.service";

import { ROUTES } from "@/constants/route.constants";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { authStorage } from "@/shared/lib/auth-storage";

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: (response) => {
      authStorage.clear();

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
      });

      queryClient.clear();

      toast.success(response.message || "Logged out successfully.");

      navigate(ROUTES.LOGIN, {
        replace: true,
      });
    },

    onError: () => {
      /*
       * Even if backend logout fails,
       * clear client auth state.
       */
      authStorage.clear();

      queryClient.clear();

      navigate(ROUTES.LOGIN, {
        replace: true,
      });

      toast.success("Logged out successfully.");
    },
  });
}
