// src/modules/auth/types/auth.type.ts

import type { IUser } from "@/shared/types";

export type AuthProvider = "LOCAL" | "GOOGLE";

export interface IUserAvatar {
  url: string;

  publicId: string;
}

export interface ILoginPayload {
  email: string;

  password: string;
}

export interface IGoogleLoginPayload {
  token: string;
}

export interface ILoginData {
  accessToken: string;
}

export interface ILoginResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: ILoginData;
}

export interface IGoogleLoginResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: ILoginData;
}

export interface IRefreshTokenData {
  accessToken: string;
}

export interface IRefreshTokenResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: IRefreshTokenData;
}

export interface IProfileResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: IAuthUser;
}

export interface IChangePasswordPayload {
  oldPassword: string;

  newPassword: string;
}

export interface IChangePasswordResponse {
  success: boolean;

  statusCode: number;

  message: string;
}

export interface ILogoutResponse {
  success: boolean;

  statusCode: number;

  message: string;
}

export interface IAuthUser extends IUser {
  authProvider: AuthProvider;

  emailVerified: boolean;

  googleId?: string;

  avatar?: IUserAvatar;

  givenName?: string;

  familyName?: string;

  locale?: string;

  hostedDomain?: string;

  isActive: boolean;

  isDeleted: boolean;

  lastLoginAt?: string;

  createdAt: string;

  updatedAt: string;
}

export interface IAuthState {
  user: IAuthUser | null;

  accessToken: string | null;

  isAuthenticated: boolean;
}

export interface IGoogleCredentialResponse {
  credential: string;

  clientId: string;

  select_by?: string;
}

export interface IApiSuccessResponse<T> {
  success: boolean;

  statusCode: number;

  message: string;

  data: T;
}

export interface IApiErrorResponse {
  success: false;

  statusCode: number;

  message: string;

  errorSources?: Array<{
    path: string;

    message: string;
  }>;
}