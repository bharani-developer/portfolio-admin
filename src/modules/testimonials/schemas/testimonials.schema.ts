// src\modules\testimonials\schemas\testimonials.schema.ts

import { z } from "zod";

import { CLIENT_TYPES } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const CLIENT_NAME_MAX_LENGTH = 200;

const CLIENT_POSITION_MAX_LENGTH = 200;

const CLIENT_COMPANY_MAX_LENGTH = 200;

const PROJECT_NAME_MAX_LENGTH = 200;

const WEBSITE_MAX_LENGTH = 500;

const REVIEW_MAX_LENGTH = 5000;

const MAX_SORT_ORDER = 9999;

/* -------------------------------------------------------------------------- */
/*                              Client Image                                  */
/* -------------------------------------------------------------------------- */

const testimonialImageSchema = z.object({
  url: z.string().trim().url("Please provide a valid image URL."),

  publicId: z.string().trim().min(1, "Public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                               Shared Fields                                */
/* -------------------------------------------------------------------------- */

const clientNameSchema = z
  .string()
  .trim()
  .min(1, "Client name is required.")
  .max(
    CLIENT_NAME_MAX_LENGTH,
    `Client name cannot exceed ${CLIENT_NAME_MAX_LENGTH} characters.`,
  );

const clientPositionSchema = z
  .string()
  .trim()
  .max(
    CLIENT_POSITION_MAX_LENGTH,
    `Client position cannot exceed ${CLIENT_POSITION_MAX_LENGTH} characters.`,
  );

const clientCompanySchema = z
  .string()
  .trim()
  .max(
    CLIENT_COMPANY_MAX_LENGTH,
    `Client company cannot exceed ${CLIENT_COMPANY_MAX_LENGTH} characters.`,
  );

const clientWebsiteSchema = z
  .string()
  .trim()
  .max(
    WEBSITE_MAX_LENGTH,
    `Website URL cannot exceed ${WEBSITE_MAX_LENGTH} characters.`,
  )
  .url("Please provide a valid website URL.")
  .or(z.literal(""));

const projectNameSchema = z
  .string()
  .trim()
  .max(
    PROJECT_NAME_MAX_LENGTH,
    `Project name cannot exceed ${PROJECT_NAME_MAX_LENGTH} characters.`,
  );

const reviewSchema = z
  .string()
  .trim()
  .min(1, "Review is required.")
  .max(
    REVIEW_MAX_LENGTH,
    `Review cannot exceed ${REVIEW_MAX_LENGTH} characters.`,
  );

const ratingSchema = z
  .number({
    error: "Rating must be a valid number.",
  })
  .int("Rating must be a whole number.")
  .min(1, "Rating must be at least 1.")
  .max(5, "Rating cannot exceed 5.");

const clientTypeSchema = z.enum(CLIENT_TYPES, {
  error: "Please select a valid client type.",
});

const isFeaturedSchema = z.boolean();

const isActiveSchema = z.boolean();

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

/* -------------------------------------------------------------------------- */
/*                          Base Testimonial Schema                           */
/* -------------------------------------------------------------------------- */

const testimonialBaseSchema = z.object({
  clientName: clientNameSchema,

  clientPosition: clientPositionSchema.optional(),

  clientCompany: clientCompanySchema.optional(),

  clientImage: testimonialImageSchema.optional(),

  clientWebsite: clientWebsiteSchema.optional(),

  projectName: projectNameSchema.optional(),

  review: reviewSchema,

  rating: ratingSchema,

  clientType: clientTypeSchema,

  isFeatured: isFeaturedSchema.default(false),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                         Create Testimonial Schema                          */
/* -------------------------------------------------------------------------- */

export const createTestimonialSchema = testimonialBaseSchema;

/* -------------------------------------------------------------------------- */
/*                         Update Testimonial Schema                          */
/* -------------------------------------------------------------------------- */

export const updateTestimonialSchema = testimonialBaseSchema.partial();

/* -------------------------------------------------------------------------- */
/*                          Testimonial Form Schema                           */
/* -------------------------------------------------------------------------- */

export const testimonialFormSchema = z.object({
  clientName: clientNameSchema,

  clientPosition: z.string(),

  clientCompany: z.string(),

  clientImage: z.instanceof(File).nullable().optional(),

  clientWebsite: clientWebsiteSchema,

  projectName: z.string(),

  review: reviewSchema,

  rating: ratingSchema,

  clientType: clientTypeSchema,

  isFeatured: isFeaturedSchema,

  sortOrder: sortOrderSchema,

  isActive: isActiveSchema,
});

/* -------------------------------------------------------------------------- */
/*                         Testimonials Query Schema                          */
/* -------------------------------------------------------------------------- */

export const testimonialsQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sortBy: z.string().trim().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),

  fields: z.string().trim().optional(),

  rating: z.number().int().min(1).max(5).optional(),

  clientType: clientTypeSchema.optional(),

  projectName: z.string().trim().optional(),

  isFeatured: z.boolean().optional(),

  isActive: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type TestimonialImageSchema = z.infer<typeof testimonialImageSchema>;

export type CreateTestimonialSchema = z.infer<typeof createTestimonialSchema>;

export type UpdateTestimonialSchema = z.infer<typeof updateTestimonialSchema>;

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

export type TestimonialsQuerySchema = z.infer<typeof testimonialsQuerySchema>;
