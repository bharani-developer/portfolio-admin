// src/modules/auth/hooks/use-profile.ts

import { useQuery } from "@tanstack/react-query";

import { authService } from "../services/auth.service";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { authStorage } from "@/shared/lib/auth-storage";

import type { IUser } from "@/shared/types";

export function useProfile() {
  const isAuthenticated = authStorage.isAuthenticated();

  return useQuery({
    queryKey: QUERY_KEYS.AUTH.PROFILE,

    queryFn: async (): Promise<IUser> => {
      const response = await authService.getProfile();

      authStorage.setUser(response.data);

      return response.data;
    },

    enabled: isAuthenticated,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: false,
  });
}
