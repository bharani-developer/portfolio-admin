// src\shared\types\auth.type.ts

import type { IUser } from "./user.types";

export interface ILoginPayload {
  email: string;

  password: string;
}

export interface ILoginResponse {
  accessToken: string;

  refreshToken: string;

  user: IUser;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IChangePasswordPayload {
  currentPassword: string;

  newPassword: string;
}

export interface IResetPasswordPayload {
  token: string;

  newPassword: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IVerifyOtpPayload {
  email: string;

  otp: string;
}

export interface IAuthState {
  user: IUser | null;

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;
}
