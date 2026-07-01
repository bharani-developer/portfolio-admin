// src/modules/auth/schemas/auth.schema.ts

import { z } from "zod";

export const authProviderSchema = z.enum([
  "LOCAL",
  "GOOGLE",
]);

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must not exceed 100 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain uppercase, lowercase, and a number.",
    ),
});

export const googleLoginSchema = z.object({
  token: z
    .string()
    .trim()
    .min(1, "Google credential token is required."),
});

export const googleCredentialSchema = z.object({
  credential: z
    .string()
    .min(1, "Google credential is required."),

  clientId: z
    .string()
    .min(1, "Google client ID is required."),

  select_by: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(8, "Old password must be at least 8 characters.")
      .max(100, "Old password must not exceed 100 characters."),

    newPassword: z
      .string()
      .trim()
      .min(8, "New password must be at least 8 characters.")
      .max(100, "New password must not exceed 100 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase, and a number.",
      ),
  })
  .refine(
    (data) => data.oldPassword !== data.newPassword,
    {
      message:
        "New password must be different from current password.",
      path: ["newPassword"],
    },
  );

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not exceed 100 characters.")
    .optional(),

  givenName: z
    .string()
    .trim()
    .max(50)
    .optional(),

  familyName: z
    .string()
    .trim()
    .max(50)
    .optional(),

  locale: z
    .string()
    .trim()
    .max(20)
    .optional(),
});

export type LoginFormValues = z.infer<
  typeof loginSchema
>;

export type GoogleLoginFormValues = z.infer<
  typeof googleLoginSchema
>;

export type GoogleCredentialValues = z.infer<
  typeof googleCredentialSchema
>;

export type ChangePasswordFormValues = z.infer<
  typeof changePasswordSchema
>;

export type UpdateProfileFormValues = z.infer<
  typeof updateProfileSchema
>;

export type AuthProvider = z.infer<
  typeof authProviderSchema
>;