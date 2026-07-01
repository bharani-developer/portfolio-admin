// src\modules\services\schemas\services.schema.ts

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const TITLE_MAX_LENGTH = 100;

const SHORT_DESCRIPTION_MAX_LENGTH = 200;

const DESCRIPTION_MAX_LENGTH = 2000;

const ICON_MAX_LENGTH = 100;

const MAX_SORT_ORDER = 9999;

/* -------------------------------------------------------------------------- */
/*                           Shared Field Schemas                             */
/* -------------------------------------------------------------------------- */

const titleSchema = z
  .string()
  .trim()
  .min(1, "Service title is required.")
  .max(
    TITLE_MAX_LENGTH,
    `Service title cannot exceed ${TITLE_MAX_LENGTH} characters.`,
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

const iconSchema = z
  .string()
  .trim()
  .max(ICON_MAX_LENGTH, `Icon cannot exceed ${ICON_MAX_LENGTH} characters.`);

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

const isActiveSchema = z.boolean();

/* -------------------------------------------------------------------------- */
/*                            Create Service Schema                           */
/* -------------------------------------------------------------------------- */

export const createServiceSchema = z.object({
  title: titleSchema,

  shortDescription: shortDescriptionSchema,

  description: descriptionSchema,

  icon: iconSchema.optional(),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                            Update Service Schema                           */
/* -------------------------------------------------------------------------- */

export const updateServiceSchema = createServiceSchema.partial();

/* -------------------------------------------------------------------------- */
/*                             Service Form Schema                            */
/* -------------------------------------------------------------------------- */

export const serviceFormSchema = z.object({
  title: titleSchema,

  shortDescription: shortDescriptionSchema,

  description: descriptionSchema,

  icon: iconSchema,

  sortOrder: sortOrderSchema,

  isActive: isActiveSchema,
});

/* -------------------------------------------------------------------------- */
/*                             Query Parameters                               */
/* -------------------------------------------------------------------------- */

export const servicesQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sort: z.string().trim().optional(),

  fields: z.string().trim().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export type ServicesQuerySchema = z.infer<typeof servicesQuerySchema>;
