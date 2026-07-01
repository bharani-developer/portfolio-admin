// src\modules\certifications\schemas\certifications.schema.ts

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const TITLE_MAX_LENGTH = 200;

const ISSUER_MAX_LENGTH = 200;

const CREDENTIAL_ID_MAX_LENGTH = 200;

const DESCRIPTION_MAX_LENGTH = 5000;

const URL_MAX_LENGTH = 500;

const MAX_SORT_ORDER = 9999;

const MAX_SKILLS = 100;

/* -------------------------------------------------------------------------- */
/*                           Certification Image                              */
/* -------------------------------------------------------------------------- */

const certificationImageSchema = z.object({
  url: z.string().trim().url("Please provide a valid image URL."),

  publicId: z.string().trim().min(1, "Public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                               Shared Fields                                */
/* -------------------------------------------------------------------------- */

const titleSchema = z
  .string()
  .trim()
  .min(1, "Title is required.")
  .max(TITLE_MAX_LENGTH, `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`);

const issuerSchema = z
  .string()
  .trim()
  .min(1, "Issuer is required.")
  .max(
    ISSUER_MAX_LENGTH,
    `Issuer cannot exceed ${ISSUER_MAX_LENGTH} characters.`,
  );

const credentialIdSchema = z
  .string()
  .trim()
  .max(
    CREDENTIAL_ID_MAX_LENGTH,
    `Credential ID cannot exceed ${CREDENTIAL_ID_MAX_LENGTH} characters.`,
  );

const credentialUrlSchema = z
  .string()
  .trim()
  .max(URL_MAX_LENGTH, `URL cannot exceed ${URL_MAX_LENGTH} characters.`)
  .url("Please provide a valid credential URL.")
  .or(z.literal(""));

const descriptionSchema = z
  .string()
  .trim()
  .max(
    DESCRIPTION_MAX_LENGTH,
    `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`,
  );

const skillSchema = z.string().trim().min(1, "Skill cannot be empty.");

const skillsSchema = z
  .array(skillSchema)
  .max(MAX_SKILLS, `Maximum ${MAX_SKILLS} skills allowed.`);

const issueDateSchema = z.string().min(1, "Issue date is required.");

const expiryDateSchema = z.string();

const neverExpiresSchema = z.boolean();

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

const isActiveSchema = z.boolean();

/* -------------------------------------------------------------------------- */
/*                         Base Certification Schema                          */
/* -------------------------------------------------------------------------- */

const certificationBaseSchema = z.object({
  title: titleSchema,

  issuer: issuerSchema,

  certificateImage: certificationImageSchema.optional(),

  credentialId: credentialIdSchema.optional(),

  credentialUrl: credentialUrlSchema.optional(),

  issueDate: issueDateSchema,

  expiryDate: z.string().nullable().optional(),

  neverExpires: neverExpiresSchema.default(false),

  description: descriptionSchema.optional(),

  skills: skillsSchema.default([]),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                        Create Certification Schema                         */
/* -------------------------------------------------------------------------- */

export const createCertificationSchema = certificationBaseSchema.superRefine(
  (data, context) => {
    if (!data.neverExpires && !data.expiryDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,

        path: ["expiryDate"],

        message: "Expiry date is required when certification does not expire.",
      });
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                        Update Certification Schema                         */
/* -------------------------------------------------------------------------- */

export const updateCertificationSchema = certificationBaseSchema.partial();

/* -------------------------------------------------------------------------- */
/*                         Certification Form Schema                          */
/* -------------------------------------------------------------------------- */

export const certificationFormSchema = z
  .object({
    title: titleSchema,

    issuer: issuerSchema,

    certificateImage: certificationImageSchema.optional(),

    credentialId: z.string(),

    credentialUrl: credentialUrlSchema,

    issueDate: issueDateSchema,

    expiryDate: expiryDateSchema,

    neverExpires: neverExpiresSchema,

    description: z.string(),

    skills: skillsSchema,

    sortOrder: sortOrderSchema,

    isActive: isActiveSchema,
  })
  .superRefine((data, context) => {
    if (!data.neverExpires && !data.expiryDate.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,

        path: ["expiryDate"],

        message: "Expiry date is required when certification does not expire.",
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                        Certifications Query Schema                         */
/* -------------------------------------------------------------------------- */

export const certificationsQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sortBy: z.string().trim().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),

  fields: z.string().trim().optional(),

  issuer: z.string().trim().optional(),

  skill: z.string().trim().optional(),

  isActive: z.boolean().optional(),

  neverExpires: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type CertificationImageSchema = z.infer<typeof certificationImageSchema>;

export type CreateCertificationSchema = z.infer<
  typeof createCertificationSchema
>;

export type UpdateCertificationSchema = z.infer<
  typeof updateCertificationSchema
>;

export type CertificationFormValues = z.infer<typeof certificationFormSchema>;

export type CertificationsQuerySchema = z.infer<
  typeof certificationsQuerySchema
>;
