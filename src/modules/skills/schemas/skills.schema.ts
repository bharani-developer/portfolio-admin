// src/modules/skills/schemas/skills.schema.ts

import { z } from "zod";

import { SKILL_CATEGORIES } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const NAME_MAX_LENGTH = 100;

const IMAGE_URL_MAX_LENGTH = 500;

const PUBLIC_ID_MAX_LENGTH = 255;

const DESCRIPTION_MAX_LENGTH = 1000;

const MAX_SORT_ORDER = 9999;

/* -------------------------------------------------------------------------- */
/*                              Category Schema                               */
/* -------------------------------------------------------------------------- */

export const skillCategorySchema = z.enum(SKILL_CATEGORIES);

/* -------------------------------------------------------------------------- */
/*                           Shared Field Schemas                             */
/* -------------------------------------------------------------------------- */

const nameSchema = z
  .string()
  .trim()
  .min(1, "Skill name is required.")
  .max(
    NAME_MAX_LENGTH,
    `Skill name cannot exceed ${NAME_MAX_LENGTH} characters.`,
  );

const categorySchema = skillCategorySchema;

const proficiencySchema = z
  .number({
    error: "Proficiency must be a valid number.",
  })
  .int("Proficiency must be a whole number.")
  .min(0, "Proficiency cannot be less than 0.")
  .max(100, "Proficiency cannot exceed 100.");

export const imageSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Image URL is invalid.")
    .max(
      IMAGE_URL_MAX_LENGTH,
      `Image URL cannot exceed ${IMAGE_URL_MAX_LENGTH} characters.`,
    ),

  publicId: z
    .string()
    .trim()
    .min(1, "Image public ID is required.")
    .max(
      PUBLIC_ID_MAX_LENGTH,
      `Image public ID cannot exceed ${PUBLIC_ID_MAX_LENGTH} characters.`,
    ),
});

const descriptionSchema = z
  .string()
  .trim()
  .max(
    DESCRIPTION_MAX_LENGTH,
    `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`,
  );

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(
    MAX_SORT_ORDER,
    `Sort order cannot exceed ${MAX_SORT_ORDER}.`,
  );

const isActiveSchema = z.boolean();

/* -------------------------------------------------------------------------- */
/*                             Create Skill Schema                            */
/* -------------------------------------------------------------------------- */

export const createSkillSchema = z.object({
  name: nameSchema,

  category: categorySchema,

  proficiency: proficiencySchema,

  image: imageSchema.nullable().optional(),

  description: descriptionSchema.optional(),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                             Update Skill Schema                            */
/* -------------------------------------------------------------------------- */

export const updateSkillSchema = createSkillSchema.partial();

/* -------------------------------------------------------------------------- */
/*                              Skill Form Schema                             */
/* -------------------------------------------------------------------------- */

export const skillFormSchema = z.object({
  name: nameSchema,

  category: categorySchema,

  proficiency: proficiencySchema,

  image: imageSchema.nullable(),

  description: descriptionSchema,

  sortOrder: sortOrderSchema,

  isActive: isActiveSchema,
});

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export const skillsQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sort: z.string().trim().optional(),

  fields: z.string().trim().optional(),

  category: categorySchema.optional(),

  isActive: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type SkillImageSchema = z.infer<typeof imageSchema>;

export type SkillCategorySchema = z.infer<
  typeof skillCategorySchema
>;

export type CreateSkillSchema = z.infer<
  typeof createSkillSchema
>;

export type UpdateSkillSchema = z.infer<
  typeof updateSkillSchema
>;

export type SkillFormValues = z.infer<
  typeof skillFormSchema
>;

export type SkillsQuerySchema = z.infer<
  typeof skillsQuerySchema
>;