// src/modules/experience/schemas/experience.schema.ts

import { z } from "zod";

import { EMPLOYMENT_TYPES, WORK_MODES } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const COMPANY_MAX_LENGTH = 150;

const POSITION_MAX_LENGTH = 150;

const LOCATION_MAX_LENGTH = 150;

const SUMMARY_MAX_LENGTH = 5000;

const URL_MAX_LENGTH = 500;

const MAX_SORT_ORDER = 9999;

const MAX_RESPONSIBILITIES = 50;

const MAX_TECHNOLOGIES = 50;

/* -------------------------------------------------------------------------- */
/*                              Experience Logo                               */
/* -------------------------------------------------------------------------- */

const experienceLogoSchema = z.object({
  url: z.string().trim().url("Please provide a valid image URL."),

  publicId: z.string().trim().min(1, "Public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                               Shared Fields                                */
/* -------------------------------------------------------------------------- */

const companySchema = z
  .string()
  .trim()
  .min(1, "Company name is required.")
  .max(
    COMPANY_MAX_LENGTH,
    `Company name cannot exceed ${COMPANY_MAX_LENGTH} characters.`,
  );

const positionSchema = z
  .string()
  .trim()
  .min(1, "Position is required.")
  .max(
    POSITION_MAX_LENGTH,
    `Position cannot exceed ${POSITION_MAX_LENGTH} characters.`,
  );

const employmentTypeSchema = z.enum(EMPLOYMENT_TYPES, {
  error: "Employment type is required.",
});

const workModeSchema = z.enum(WORK_MODES, {
  error: "Work mode is required.",
});

const locationSchema = z
  .string()
  .trim()
  .min(1, "Location is required.")
  .max(
    LOCATION_MAX_LENGTH,
    `Location cannot exceed ${LOCATION_MAX_LENGTH} characters.`,
  );

const summarySchema = z
  .string()
  .trim()
  .min(1, "Summary is required.")
  .max(
    SUMMARY_MAX_LENGTH,
    `Summary cannot exceed ${SUMMARY_MAX_LENGTH} characters.`,
  );

const responsibilitySchema = z
  .string()
  .trim()
  .min(1, "Responsibility cannot be empty.");

const technologySchema = z
  .string()
  .trim()
  .min(1, "Technology cannot be empty.");

const responsibilitiesSchema = z
  .array(responsibilitySchema)
  .min(1, "At least one responsibility is required.")
  .max(
    MAX_RESPONSIBILITIES,
    `Maximum ${MAX_RESPONSIBILITIES} responsibilities allowed.`,
  );

const technologiesSchema = z
  .array(technologySchema)
  .min(1, "At least one technology is required.")
  .max(MAX_TECHNOLOGIES, `Maximum ${MAX_TECHNOLOGIES} technologies allowed.`);

const companyWebsiteSchema = z
  .string()
  .trim()
  .max(URL_MAX_LENGTH, `URL cannot exceed ${URL_MAX_LENGTH} characters.`)
  .url("Please provide a valid company website URL.")
  .or(z.literal(""));

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

const isCurrentSchema = z.boolean();

const isActiveSchema = z.boolean();

const startDateSchema = z.string().min(1, "Start date is required.");

const endDateSchema = z.string();

/* -------------------------------------------------------------------------- */
/*                           Base Experience Schema                           */
/* -------------------------------------------------------------------------- */

const experienceBaseSchema = z.object({
  company: companySchema,

  companyLogo: experienceLogoSchema.optional(),

  position: positionSchema,

  employmentType: employmentTypeSchema,

  workMode: workModeSchema,

  location: locationSchema,

  startDate: startDateSchema,

  endDate: z.string().nullable().optional(),

  isCurrent: isCurrentSchema.default(false),

  summary: summarySchema,

  responsibilities: responsibilitiesSchema,

  technologies: technologiesSchema,

  companyWebsite: companyWebsiteSchema.optional(),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                          Create Experience Schema                          */
/* -------------------------------------------------------------------------- */

export const createExperienceSchema = experienceBaseSchema.superRefine(
  (data, context) => {
    if (!data.isCurrent && !data.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required when the position is not current.",
      });
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                          Update Experience Schema                          */
/* -------------------------------------------------------------------------- */

export const updateExperienceSchema = experienceBaseSchema.partial();

/* -------------------------------------------------------------------------- */
/*                           Experience Form Schema                           */
/* -------------------------------------------------------------------------- */

export const experienceFormSchema = z
  .object({
    company: companySchema,

    companyLogo: experienceLogoSchema.optional(),

    position: positionSchema,

    employmentType: employmentTypeSchema,

    workMode: workModeSchema,

    location: locationSchema,

    startDate: startDateSchema,

    endDate: endDateSchema,

    isCurrent: isCurrentSchema,

    summary: summarySchema,

    responsibilities: responsibilitiesSchema,

    technologies: technologiesSchema,

    companyWebsite: companyWebsiteSchema,

    sortOrder: sortOrderSchema,

    isActive: isActiveSchema,
  })
  .superRefine((data, context) => {
    if (!data.isCurrent && !data.endDate.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required when the position is not current.",
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                           Experience Query Schema                          */
/* -------------------------------------------------------------------------- */

export const experiencesQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sortBy: z.string().trim().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),

  fields: z.string().trim().optional(),

  company: z.string().trim().optional(),

  technology: z.string().trim().optional(),

  employmentType: employmentTypeSchema.optional(),

  workMode: workModeSchema.optional(),

  isCurrent: z.boolean().optional(),

  isActive: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ExperienceLogoSchema = z.infer<typeof experienceLogoSchema>;

export type CreateExperienceSchema = z.infer<typeof createExperienceSchema>;

export type UpdateExperienceSchema = z.infer<typeof updateExperienceSchema>;

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export type ExperiencesQuerySchema = z.infer<typeof experiencesQuerySchema>;
