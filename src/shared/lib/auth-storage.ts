// src/shared/lib/auth-storage.ts

import { STORAGE_KEYS } from "@/shared/constants/storage.constant";

import { storage } from "./storage";

export interface AuthUserAvatar {
  url: string;

  publicId: string;
}

export interface AuthUser {
  _id: string;

  name: string;

  email: string;

  role: "admin" | "viewer";

  authProvider: "LOCAL" | "GOOGLE";

  emailVerified: boolean;

  googleId?: string;

  avatar?: AuthUserAvatar;

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

export const authStorage = {
  getAccessToken(): string | null {
    return storage.get<string>(
      STORAGE_KEYS.AUTH.ACCESS_TOKEN,
    );
  },

  setAccessToken(token: string): void {
    storage.set(
      STORAGE_KEYS.AUTH.ACCESS_TOKEN,
      token,
    );
  },

  removeAccessToken(): void {
    storage.remove(
      STORAGE_KEYS.AUTH.ACCESS_TOKEN,
    );
  },

  getRefreshToken(): string | null {
    return storage.get<string>(
      STORAGE_KEYS.AUTH.REFRESH_TOKEN,
    );
  },

  setRefreshToken(token: string): void {
    storage.set(
      STORAGE_KEYS.AUTH.REFRESH_TOKEN,
      token,
    );
  },

  removeRefreshToken(): void {
    storage.remove(
      STORAGE_KEYS.AUTH.REFRESH_TOKEN,
    );
  },

  getUser(): AuthUser | null {
    return storage.get<AuthUser>(
      STORAGE_KEYS.AUTH.USER,
    );
  },

  setUser(user: AuthUser): void {
    storage.set(
      STORAGE_KEYS.AUTH.USER,
      user,
    );
  },

  removeUser(): void {
    storage.remove(
      STORAGE_KEYS.AUTH.USER,
    );
  },

  isAuthenticated(): boolean {
    return Boolean(
      this.getAccessToken(),
    );
  },

  clear(): void {
    this.removeAccessToken();

    this.removeRefreshToken();

    this.removeUser();
  },
} as const;