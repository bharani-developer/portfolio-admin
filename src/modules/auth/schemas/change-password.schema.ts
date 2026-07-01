import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(1, "Current password is required.")
      .max(100, "Current password is too long."),

    newPassword: z
      .string()
      .trim()
      .min(8, "New password must be at least 8 characters.")
      .max(100, "New password must not exceed 100 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "New password must contain at least one uppercase letter, one lowercase letter, and one number.",
      ),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Please confirm your new password."),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

/*
 * API Payload Type
 *
 * Used when sending data to backend.
 * confirmPassword is removed.
 */
export type ChangePasswordPayload = Pick<
  ChangePasswordFormValues,
  "oldPassword" | "newPassword"
>;
