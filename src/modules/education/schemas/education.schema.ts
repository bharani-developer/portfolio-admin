// src\modules\education\schemas\education.schema.ts

import { z } from "zod";

import { EDUCATION_LEVELS, EDUCATION_TYPES, GRADE_TYPES } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const INSTITUTION_MAX_LENGTH = 200;

const DEGREE_MAX_LENGTH = 200;

const FIELD_OF_STUDY_MAX_LENGTH = 200;

const LOCATION_MAX_LENGTH = 150;

const GRADE_MAX_LENGTH = 50;

const DESCRIPTION_MAX_LENGTH = 5000;

const URL_MAX_LENGTH = 500;

const MAX_SORT_ORDER = 9999;

const MAX_ACHIEVEMENTS = 50;

const MAX_SKILLS = 100;

/* -------------------------------------------------------------------------- */
/*                              Education Image                               */
/* -------------------------------------------------------------------------- */

const educationImageSchema = z.object({
  url: z.string().trim().url("Please provide a valid image URL."),

  publicId: z.string().trim().min(1, "Public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                               Shared Fields                                */
/* -------------------------------------------------------------------------- */

const institutionSchema = z
  .string()
  .trim()
  .min(1, "Institution is required.")
  .max(
    INSTITUTION_MAX_LENGTH,
    `Institution cannot exceed ${INSTITUTION_MAX_LENGTH} characters.`,
  );

const degreeSchema = z
  .string()
  .trim()
  .min(1, "Degree is required.")
  .max(
    DEGREE_MAX_LENGTH,
    `Degree cannot exceed ${DEGREE_MAX_LENGTH} characters.`,
  );

const fieldOfStudySchema = z
  .string()
  .trim()
  .min(1, "Field of study is required.")
  .max(
    FIELD_OF_STUDY_MAX_LENGTH,
    `Field of study cannot exceed ${FIELD_OF_STUDY_MAX_LENGTH} characters.`,
  );

const educationLevelSchema = z.enum(EDUCATION_LEVELS, {
  error: "Education level is required.",
});

const educationTypeSchema = z.enum(EDUCATION_TYPES, {
  error: "Education type is required.",
});

const gradeTypeSchema = z.enum(GRADE_TYPES, {
  error: "Grade type is required.",
});

const locationSchema = z
  .string()
  .trim()
  .min(1, "Location is required.")
  .max(
    LOCATION_MAX_LENGTH,
    `Location cannot exceed ${LOCATION_MAX_LENGTH} characters.`,
  );

const gradeSchema = z
  .string()
  .trim()
  .max(GRADE_MAX_LENGTH, `Grade cannot exceed ${GRADE_MAX_LENGTH} characters.`);

const descriptionSchema = z
  .string()
  .trim()
  .max(
    DESCRIPTION_MAX_LENGTH,
    `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`,
  );

const achievementSchema = z
  .string()
  .trim()
  .min(1, "Achievement cannot be empty.");

const skillSchema = z.string().trim().min(1, "Skill cannot be empty.");

const achievementsSchema = z
  .array(achievementSchema)
  .max(MAX_ACHIEVEMENTS, `Maximum ${MAX_ACHIEVEMENTS} achievements allowed.`);

const skillsSchema = z
  .array(skillSchema)
  .max(MAX_SKILLS, `Maximum ${MAX_SKILLS} skills allowed.`);

const institutionWebsiteSchema = z
  .string()
  .trim()
  .max(URL_MAX_LENGTH, `URL cannot exceed ${URL_MAX_LENGTH} characters.`)
  .url("Please provide a valid institution website URL.")
  .or(z.literal(""));

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

const startDateSchema = z.string().min(1, "Start date is required.");

const endDateSchema = z.string();

const isCurrentSchema = z.boolean();

const isActiveSchema = z.boolean();

/* -------------------------------------------------------------------------- */
/*                           Base Education Schema                            */
/* -------------------------------------------------------------------------- */

const educationBaseSchema = z.object({
  institution: institutionSchema,

  institutionLogo: educationImageSchema.optional(),

  degree: degreeSchema,

  fieldOfStudy: fieldOfStudySchema,

  educationLevel: educationLevelSchema,

  educationType: educationTypeSchema,

  location: locationSchema,

  startDate: startDateSchema,

  endDate: z.string().nullable().optional(),

  isCurrent: isCurrentSchema.default(false),

  gradeType: gradeTypeSchema,

  grade: gradeSchema.optional(),

  description: descriptionSchema.optional(),

  achievements: achievementsSchema.default([]),

  skills: skillsSchema.default([]),

  institutionWebsite: institutionWebsiteSchema.optional(),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                          Create Education Schema                           */
/* -------------------------------------------------------------------------- */

export const createEducationSchema = educationBaseSchema.superRefine(
  (data, context) => {
    if (!data.isCurrent && !data.endDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required when the education is not current.",
      });
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                          Update Education Schema                           */
/* -------------------------------------------------------------------------- */

export const updateEducationSchema = educationBaseSchema.partial();

/* -------------------------------------------------------------------------- */
/*                           Education Form Schema                            */
/* -------------------------------------------------------------------------- */

export const educationFormSchema = z
  .object({
    institution: institutionSchema,

    institutionLogo: educationImageSchema.optional(),

    degree: degreeSchema,

    fieldOfStudy: fieldOfStudySchema,

    educationLevel: educationLevelSchema,

    educationType: educationTypeSchema,

    location: locationSchema,

    startDate: startDateSchema,

    endDate: endDateSchema,

    isCurrent: isCurrentSchema,

    gradeType: gradeTypeSchema,

    grade: z.string(),

    description: z.string(),

    achievements: achievementsSchema,

    skills: skillsSchema,

    institutionWebsite: institutionWebsiteSchema,

    sortOrder: sortOrderSchema,

    isActive: isActiveSchema,
  })
  .superRefine((data, context) => {
    if (!data.isCurrent && !data.endDate.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date is required when the education is not current.",
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                           Education Query Schema                           */
/* -------------------------------------------------------------------------- */

export const educationsQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sortBy: z.string().trim().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),

  fields: z.string().trim().optional(),

  educationLevel: educationLevelSchema.optional(),

  educationType: educationTypeSchema.optional(),

  skill: z.string().trim().optional(),

  isCurrent: z.boolean().optional(),

  isActive: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type EducationImageSchema = z.infer<typeof educationImageSchema>;

export type CreateEducationSchema = z.infer<typeof createEducationSchema>;

export type UpdateEducationSchema = z.infer<typeof updateEducationSchema>;

export type EducationFormValues = z.infer<typeof educationFormSchema>;

export type EducationsQuerySchema = z.infer<typeof educationsQuerySchema>;
