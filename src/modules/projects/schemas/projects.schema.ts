// src\modules\projects\schemas\projects.schema.ts

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const TITLE_MAX_LENGTH = 150;

const SHORT_DESCRIPTION_MAX_LENGTH = 300;

const DESCRIPTION_MAX_LENGTH = 10000;

const CATEGORY_MAX_LENGTH = 100;

const STATUS_MAX_LENGTH = 100;

const URL_MAX_LENGTH = 500;

const MAX_SORT_ORDER = 9999;

const MAX_TECHNOLOGIES = 50;

const MAX_GALLERY_IMAGES = 20;

/* -------------------------------------------------------------------------- */
/*                              Project Image                                 */
/* -------------------------------------------------------------------------- */

const projectImageSchema = z.object({
  url: z.string().trim().url("Please provide a valid image URL."),

  publicId: z.string().trim().min(1, "Public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                              Shared Fields                                 */
/* -------------------------------------------------------------------------- */

const titleSchema = z
  .string()
  .trim()
  .min(1, "Project title is required.")
  .max(
    TITLE_MAX_LENGTH,
    `Project title cannot exceed ${TITLE_MAX_LENGTH} characters.`,
  );

const shortDescriptionSchema = z
  .string()
  .trim()
  .min(1, "Short description is required.")
  .max(
    SHORT_DESCRIPTION_MAX_LENGTH,
    `Short description cannot exceed ${SHORT_DESCRIPTION_MAX_LENGTH} characters.`,
  );

const descriptionSchema = z
  .string()
  .trim()
  .min(1, "Description is required.")
  .max(
    DESCRIPTION_MAX_LENGTH,
    `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`,
  );

const categorySchema = z
  .string()
  .trim()
  .min(1, "Category is required.")
  .max(
    CATEGORY_MAX_LENGTH,
    `Category cannot exceed ${CATEGORY_MAX_LENGTH} characters.`,
  );

const statusSchema = z
  .string()
  .trim()
  .min(1, "Status is required.")
  .max(
    STATUS_MAX_LENGTH,
    `Status cannot exceed ${STATUS_MAX_LENGTH} characters.`,
  );

const githubUrlSchema = z
  .string()
  .trim()
  .max(URL_MAX_LENGTH, `URL cannot exceed ${URL_MAX_LENGTH} characters.`)
  .url("Please provide a valid GitHub URL.")
  .or(z.literal(""));

const liveUrlSchema = z
  .string()
  .trim()
  .max(URL_MAX_LENGTH, `URL cannot exceed ${URL_MAX_LENGTH} characters.`)
  .url("Please provide a valid live URL.")
  .or(z.literal(""));

const technologiesSchema = z
  .array(z.string().trim().min(1, "Technology cannot be empty."))
  .min(1, "At least one technology is required.")
  .max(MAX_TECHNOLOGIES, `Maximum ${MAX_TECHNOLOGIES} technologies allowed.`);

const gallerySchema = z
  .array(projectImageSchema)
  .max(
    MAX_GALLERY_IMAGES,
    `Maximum ${MAX_GALLERY_IMAGES} gallery images allowed.`,
  );

const featuredSchema = z.boolean();

const isActiveSchema = z.boolean();

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

const startDateSchema = z.string().optional();

const endDateSchema = z.string().nullable().optional();

/* -------------------------------------------------------------------------- */
/*                            Create Project Schema                           */
/* -------------------------------------------------------------------------- */

export const createProjectSchema = z.object({
  title: titleSchema,

  shortDescription: shortDescriptionSchema,

  description: descriptionSchema,

  thumbnail: projectImageSchema.optional(),

  gallery: gallerySchema.default([]),

  technologies: technologiesSchema,

  category: categorySchema,

  githubUrl: githubUrlSchema.optional(),

  liveUrl: liveUrlSchema.optional(),

  featured: featuredSchema.default(false),

  status: statusSchema,

  startDate: startDateSchema,

  endDate: endDateSchema,

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                            Update Project Schema                           */
/* -------------------------------------------------------------------------- */

export const updateProjectSchema = createProjectSchema.partial();

/* -------------------------------------------------------------------------- */
/*                             Project Form Schema                            */
/* -------------------------------------------------------------------------- */

export const projectFormSchema = z.object({
  title: titleSchema,

  shortDescription: shortDescriptionSchema,

  description: descriptionSchema,

  thumbnail: projectImageSchema.optional(),

  gallery: gallerySchema,

  technologies: technologiesSchema,

  category: categorySchema,

  githubUrl: githubUrlSchema,

  liveUrl: liveUrlSchema,

  featured: featuredSchema,

  status: statusSchema,

  startDate: z.string(),

  endDate: z.string(),

  sortOrder: sortOrderSchema,

  isActive: isActiveSchema,
});

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export const projectsQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sortBy: z.string().trim().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),

  fields: z.string().trim().optional(),

  category: z.string().trim().optional(),

  technology: z.string().trim().optional(),

  status: z.string().trim().optional(),

  featured: z.boolean().optional(),

  isActive: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type ProjectImageSchema = z.infer<typeof projectImageSchema>;

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export type ProjectsQuerySchema = z.infer<typeof projectsQuerySchema>;
