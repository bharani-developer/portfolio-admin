// src/modules/about/schemas/about.schema.ts

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const FULL_NAME_MAX_LENGTH = 100;

const DESIGNATION_MAX_LENGTH = 150;

const BIO_MAX_LENGTH = 3000;

const EMAIL_MAX_LENGTH = 255;

const PHONE_MAX_LENGTH = 30;

const ADDRESS_MAX_LENGTH = 500;

const STAT_LABEL_MAX_LENGTH = 100;

const STAT_VALUE_MAX_LENGTH = 100;

const MAX_STATS_COUNT = 20;

const MAX_IMAGES_COUNT = 20;

const MAX_YEARS_OF_EXPERIENCE = 100;
/* -------------------------------------------------------------------------- */
/*                                Image Schema                                */
/* -------------------------------------------------------------------------- */

export const aboutImageSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Image URL must be a valid URL."),

  publicId: z
    .string()
    .trim()
    .min(1, "Image public ID is required."),
});
const aboutImagesSchema = z
  .array(aboutImageSchema)
  .min(1, "At least one image is required.")
  .max(
    MAX_IMAGES_COUNT,
    `Maximum ${MAX_IMAGES_COUNT} images are allowed.`,
  )
  .superRefine((images, ctx) => {
    const publicIds = new Set<string>();
    const urls = new Set<string>();

    images.forEach((image, index) => {
      if (publicIds.has(image.publicId)) {
        ctx.addIssue({
          code: "custom",
          path: [index, "publicId"],
          message: "Duplicate image public ID is not allowed.",
        });
      }

      publicIds.add(image.publicId);

      if (urls.has(image.url)) {
        ctx.addIssue({
          code: "custom",
          path: [index, "url"],
          message: "Duplicate image URL is not allowed.",
        });
      }

      urls.add(image.url);
    });
  });
/* -------------------------------------------------------------------------- */
/*                                Stat Schema                                 */
/* -------------------------------------------------------------------------- */

export const aboutStatSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Stat label is required.")
    .max(
      STAT_LABEL_MAX_LENGTH,
      `Stat label cannot exceed ${STAT_LABEL_MAX_LENGTH} characters.`,
    ),

  value: z
    .string()
    .trim()
    .min(1, "Stat value is required.")
    .max(
      STAT_VALUE_MAX_LENGTH,
      `Stat value cannot exceed ${STAT_VALUE_MAX_LENGTH} characters.`,
    ),
});

/* -------------------------------------------------------------------------- */
/*                            Shared Field Schemas                            */
/* -------------------------------------------------------------------------- */

const fullNameSchema = z
  .string()
  .trim()
  .min(1, "Full name is required.")
  .max(
    FULL_NAME_MAX_LENGTH,
    `Full name cannot exceed ${FULL_NAME_MAX_LENGTH} characters.`,
  );

const designationSchema = z
  .string()
  .trim()
  .min(1, "Designation is required.")
  .max(
    DESIGNATION_MAX_LENGTH,
    `Designation cannot exceed ${DESIGNATION_MAX_LENGTH} characters.`,
  );

const bioSchema = z
  .string()
  .trim()
  .min(1, "Bio is required.")
  .max(BIO_MAX_LENGTH, `Bio cannot exceed ${BIO_MAX_LENGTH} characters.`);

const emailSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    {
      message: "Email must be a valid email address.",
    },
  )
  .refine((value) => value.length <= EMAIL_MAX_LENGTH, {
    message: `Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`,
  });

const phoneSchema = z
  .string()
  .trim()
  .max(
    PHONE_MAX_LENGTH,
    `Phone number cannot exceed ${PHONE_MAX_LENGTH} characters.`,
  );

const addressSchema = z
  .string()
  .trim()
  .max(
    ADDRESS_MAX_LENGTH,
    `Address cannot exceed ${ADDRESS_MAX_LENGTH} characters.`,
  );

const resumeUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      value.startsWith("/") ||
      z.string().url().safeParse(value).success,
    {
      message: "Resume URL must be a valid URL or relative path.",
    },
  )

const yearsOfExperienceSchema = z
  .number({
    error: "Years of experience must be a valid number.",
  })
  .min(0, "Years of experience cannot be negative.")
  .int("Years of experience must be an integer.")
  .max(
    MAX_YEARS_OF_EXPERIENCE,
    `Years of experience cannot exceed ${MAX_YEARS_OF_EXPERIENCE}.`,
  )
  .optional();

/* -------------------------------------------------------------------------- */
/*                             Create About Schema                            */
/* -------------------------------------------------------------------------- */

export const createAboutSchema = z.object({
  profileImage: aboutImageSchema.optional(),
  images: aboutImagesSchema,
  fullName: fullNameSchema,

  designation: designationSchema,

  bio: bioSchema,


  email: emailSchema.optional(),

  phone: phoneSchema.optional(),

  address: addressSchema.optional(),

  resumeUrl: resumeUrlSchema.optional(),

  yearsOfExperience: yearsOfExperienceSchema.optional(),

stats: z
  .array(aboutStatSchema)
  .max(
    MAX_STATS_COUNT,
    `Maximum ${MAX_STATS_COUNT} stats are allowed.`,
  )
  .superRefine((stats, ctx) => {
    const labels = new Set<string>();

    stats.forEach((stat, index) => {
      const label = stat.label.toLowerCase();

      if (labels.has(label)) {
        ctx.addIssue({
          code: "custom",
          path: [index, "label"],
          message: "Duplicate stat labels are not allowed.",
        });
      }

      labels.add(label);
    });
  })
  .optional(),

  isActive: z.boolean().default(true),
});

/* -------------------------------------------------------------------------- */
/*                             Update About Schema                            */
/* -------------------------------------------------------------------------- */

export const updateAboutSchema = createAboutSchema
  .partial()
  .extend({
    images: aboutImagesSchema.optional(),
  });
/* -------------------------------------------------------------------------- */
/*                              About Form Schema                             */
/* -------------------------------------------------------------------------- */

export const aboutFormSchema = z.object({
  profileImage: aboutImageSchema.optional(),

  images: aboutImagesSchema,

  fullName: fullNameSchema,

  designation: designationSchema,

  bio: bioSchema,

  email: emailSchema,

  phone: phoneSchema,

  address: addressSchema,

  resumeUrl: resumeUrlSchema,

  yearsOfExperience: yearsOfExperienceSchema,

  stats: z
    .array(aboutStatSchema)
    .max(
      MAX_STATS_COUNT,
      `Maximum ${MAX_STATS_COUNT} stats are allowed.`,
    )
    .superRefine((stats, ctx) => {
      const labels = new Set<string>();

      stats.forEach((stat, index) => {
        const label = stat.label.toLowerCase();

        if (labels.has(label)) {
          ctx.addIssue({
            code: "custom",
            path: [index, "label"],
            message: "Duplicate stat labels are not allowed.",
          });
        }

        labels.add(label);
      });
    }),

  isActive: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type AboutStatSchema = z.infer<typeof aboutStatSchema>;

export type CreateAboutSchema = z.infer<typeof createAboutSchema>;

export type UpdateAboutSchema = z.infer<typeof updateAboutSchema>;

export type AboutFormValues = z.infer<typeof aboutFormSchema>;
