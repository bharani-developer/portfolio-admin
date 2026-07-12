// src/modules/auth/services/auth.service.ts

import { httpClient } from "@/shared/services/http-client";

import type {
  IApiSuccessResponse,
  IAuthUser,
  IChangePasswordPayload,
  IChangePasswordResponse,
  IGoogleLoginPayload,
  IGoogleLoginResponse,
  ILoginPayload,
  ILoginResponse,
  ILogoutResponse,
  IProfileResponse,
  IRefreshTokenResponse,
} from "../types/auth.types";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",

  GOOGLE_LOGIN: "/auth/google",

  LOGOUT: "/auth/logout",

  PROFILE: "/auth/profile",

  UPDATE_PROFILE: "/auth/profile",

  CHANGE_PASSWORD: "/auth/change-password",

  REFRESH_TOKEN: "/auth/refresh-token",
} as const;

export const authService = {
  /**
   * Email / Password Login
   */
  async login(payload: ILoginPayload): Promise<ILoginResponse> {
    const { data } = await httpClient.post<ILoginResponse>(
      AUTH_ENDPOINTS.LOGIN,
      payload,
    );

    return data;
  },

  /**
   * Google Login
   */
  async googleLogin(
    payload: IGoogleLoginPayload,
  ): Promise<IGoogleLoginResponse> {
    const { data } = await httpClient.post<IGoogleLoginResponse>(
      AUTH_ENDPOINTS.GOOGLE_LOGIN,
      payload,
    );

    return data;
  },

  /**
   * Current User Profile
   */
  async getProfile(): Promise<IProfileResponse> {
    const { data } = await httpClient.get<IProfileResponse>(
      AUTH_ENDPOINTS.PROFILE,
    );

    return data;
  },

  /**
   * Update Profile
   */
  async updateProfile(
    payload: Partial<
      Pick<IAuthUser, "name" | "givenName" | "familyName" | "locale">
    >,
  ): Promise<IApiSuccessResponse<IAuthUser>> {
    const { data } = await httpClient.patch<IApiSuccessResponse<IAuthUser>>(
      AUTH_ENDPOINTS.UPDATE_PROFILE,
      payload,
    );

    return data;
  },

  /**
   * Change Password
   */
  async changePassword(
    payload: IChangePasswordPayload,
  ): Promise<IChangePasswordResponse> {
    const { data } = await httpClient.post<IChangePasswordResponse>(
      AUTH_ENDPOINTS.CHANGE_PASSWORD,
      payload,
    );

    return data;
  },

  /**
   * Refresh Access Token
   */
  async refreshToken(): Promise<IRefreshTokenResponse> {
    const { data } = await httpClient.post<IRefreshTokenResponse>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
    );

    return data;
  },

  /**
   * Logout
   */
  async logout(): Promise<ILogoutResponse> {
    const { data } = await httpClient.post<ILogoutResponse>(
      AUTH_ENDPOINTS.LOGOUT,
    );

    return data;
  },
};

export { AUTH_ENDPOINTS };
