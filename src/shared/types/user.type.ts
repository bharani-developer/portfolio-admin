// src/shared/types/user.type.ts

export interface IUserAvatar {
  url: string;

  publicId: string;
}

export interface IUser {
  _id: string;

  name: string;

  email: string;

  role: "admin" | "viewer";

  authProvider: "LOCAL" | "GOOGLE";

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