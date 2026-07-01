// src\modules\settings\schemas\settings.schema.ts

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const SITE_TITLE_MAX_LENGTH = 100;

const SITE_DESCRIPTION_MAX_LENGTH = 500;

const META_TITLE_MAX_LENGTH = 100;

const META_DESCRIPTION_MAX_LENGTH = 300;

/* -------------------------------------------------------------------------- */
/*                               Image Schema                                 */
/* -------------------------------------------------------------------------- */

export const settingsImageSchema = z.object({
  url: z.string().trim().url("Please enter a valid image URL."),

  publicId: z.string().trim().min(1, "Public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                            Social Links Schema                             */
/* -------------------------------------------------------------------------- */

const optionalUrlSchema = z
  .string()
  .trim()
  .url("Please enter a valid URL.")
  .or(z.literal(""));

export const settingsSocialLinksSchema = z.object({
  github: optionalUrlSchema,

  linkedin: optionalUrlSchema,

  twitter: optionalUrlSchema,

  facebook: optionalUrlSchema,

  instagram: optionalUrlSchema,

  youtube: optionalUrlSchema,

  leetcode: optionalUrlSchema,

  hackerrank: optionalUrlSchema,

  stackoverflow: optionalUrlSchema,
});

/* -------------------------------------------------------------------------- */
/*                                SEO Schema                                  */
/* -------------------------------------------------------------------------- */

export const settingsSeoSchema = z.object({
  metaTitle: z
    .string()
    .trim()
    .min(1, "Meta title is required.")
    .max(
      META_TITLE_MAX_LENGTH,
      `Meta title cannot exceed ${META_TITLE_MAX_LENGTH} characters.`,
    ),

  metaDescription: z
    .string()
    .trim()
    .min(1, "Meta description is required.")
    .max(
      META_DESCRIPTION_MAX_LENGTH,
      `Meta description cannot exceed ${META_DESCRIPTION_MAX_LENGTH} characters.`,
    ),

  metaKeywords: z.array(z.string().trim()).optional(),

  siteUrl: z.string().trim().url("Please enter a valid site URL."),
});

/* -------------------------------------------------------------------------- */
/*                             Settings Schema                                */
/* -------------------------------------------------------------------------- */

export const settingsSchema = z.object({
  siteTitle: z
    .string()
    .trim()
    .min(1, "Site title is required.")
    .max(
      SITE_TITLE_MAX_LENGTH,
      `Site title cannot exceed ${SITE_TITLE_MAX_LENGTH} characters.`,
    ),

  siteDescription: z
    .string()
    .trim()
    .min(1, "Site description is required.")
    .max(
      SITE_DESCRIPTION_MAX_LENGTH,
      `Site description cannot exceed ${SITE_DESCRIPTION_MAX_LENGTH} characters.`,
    ),

  email: z.string().trim().email("Please enter a valid email address."),

  phone: z.string().trim().min(1, "Phone number is required."),

  address: z.string().trim().min(1, "Address is required."),

  logo: settingsImageSchema.optional(),

  favicon: settingsImageSchema.optional(),

  socialLinks: settingsSocialLinksSchema,

  seo: settingsSeoSchema,
});

/* -------------------------------------------------------------------------- */
/*                         Create Settings Schema                             */
/* -------------------------------------------------------------------------- */

export const createSettingsSchema = settingsSchema;

/* -------------------------------------------------------------------------- */
/*                         Update Settings Schema                             */
/* -------------------------------------------------------------------------- */

export const updateSettingsSchema = settingsSchema.partial();

/* -------------------------------------------------------------------------- */
/*                          Settings Form Schema                              */
/* -------------------------------------------------------------------------- */

export const settingsFormSchema = z.object({
  siteTitle: z
    .string()
    .trim()
    .min(1, "Site title is required.")
    .max(
      SITE_TITLE_MAX_LENGTH,
      `Site title cannot exceed ${SITE_TITLE_MAX_LENGTH} characters.`,
    ),

  siteDescription: z
    .string()
    .trim()
    .min(1, "Site description is required.")
    .max(
      SITE_DESCRIPTION_MAX_LENGTH,
      `Site description cannot exceed ${SITE_DESCRIPTION_MAX_LENGTH} characters.`,
    ),

  email: z.string().trim().email("Please enter a valid email address."),

  phone: z.string().trim().min(1, "Phone number is required."),

  address: z.string().trim().min(1, "Address is required."),

  logoUrl: z.string().trim(),

  logoPublicId: z.string().trim(),

  faviconUrl: z.string().trim(),

  faviconPublicId: z.string().trim(),

  github: optionalUrlSchema,

  linkedin: optionalUrlSchema,

  twitter: optionalUrlSchema,

  facebook: optionalUrlSchema,

  instagram: optionalUrlSchema,

  youtube: optionalUrlSchema,

  leetcode: optionalUrlSchema,

  hackerrank: optionalUrlSchema,

  stackoverflow: optionalUrlSchema,

  metaTitle: z
    .string()
    .trim()
    .min(1, "Meta title is required.")
    .max(
      META_TITLE_MAX_LENGTH,
      `Meta title cannot exceed ${META_TITLE_MAX_LENGTH} characters.`,
    ),

  metaDescription: z
    .string()
    .trim()
    .min(1, "Meta description is required.")
    .max(
      META_DESCRIPTION_MAX_LENGTH,
      `Meta description cannot exceed ${META_DESCRIPTION_MAX_LENGTH} characters.`,
    ),

  metaKeywords: z.string().trim(),

  siteUrl: z.string().trim().url("Please enter a valid site URL."),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type SettingsImageSchema = z.infer<typeof settingsImageSchema>;

export type SettingsSocialLinksSchema = z.infer<
  typeof settingsSocialLinksSchema
>;

export type SettingsSeoSchema = z.infer<typeof settingsSeoSchema>;

export type SettingsSchema = z.infer<typeof settingsSchema>;

export type CreateSettingsSchema = z.infer<typeof createSettingsSchema>;

export type UpdateSettingsSchema = z.infer<typeof updateSettingsSchema>;

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
