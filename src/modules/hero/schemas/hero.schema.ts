import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

export const TITLE_MAX_LENGTH = 150;
export const SUBTITLE_MAX_LENGTH = 200;
export const DESCRIPTION_MAX_LENGTH = 1000;
export const CTA_TEXT_MAX_LENGTH = 100;
export const CTA_LINK_MAX_LENGTH = 255;
export const TECHNOLOGY_MAX_LENGTH = 50;
export const MAX_TECHNOLOGIES = 20;

/* -------------------------------------------------------------------------- */
/*                                Image Schema                                */
/* -------------------------------------------------------------------------- */

export const heroImageSchema = z.object({
  url: z.string().url("Profile image URL must be a valid URL."),

  publicId: z
    .string()
    .trim()
    .min(1, "Profile image public ID is required."),
});

/* -------------------------------------------------------------------------- */
/*                            Shared Field Schemas                            */
/* -------------------------------------------------------------------------- */

const titleSchema = z
  .string()
  .trim()
  .min(1, "Title is required.")
  .max(
    TITLE_MAX_LENGTH,
    `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`,
  );

const subtitleSchema = z
  .string()
  .trim()
  .min(1, "Subtitle is required.")
  .max(
    SUBTITLE_MAX_LENGTH,
    `Subtitle cannot exceed ${SUBTITLE_MAX_LENGTH} characters.`,
  );

const descriptionSchema = z
  .string()
  .trim()
  .min(1, "Description is required.")
  .max(
    DESCRIPTION_MAX_LENGTH,
    `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`,
  );

const resumeUrlSchema = z
  .string()
  .trim()
  .max(
    CTA_LINK_MAX_LENGTH,
    `Resume URL cannot exceed ${CTA_LINK_MAX_LENGTH} characters.`,
  )
  .refine(
    (value) => !value || z.string().url().safeParse(value).success,
    {
      message: "Resume URL must be a valid URL.",
    },
  );

const ctaButtonTextSchema = z
  .string()
  .trim()
  .max(
    CTA_TEXT_MAX_LENGTH,
    `CTA button text cannot exceed ${CTA_TEXT_MAX_LENGTH} characters.`,
  );

const ctaButtonLinkSchema = z
  .string()
  .trim()
  .max(
    CTA_LINK_MAX_LENGTH,
    `CTA button link cannot exceed ${CTA_LINK_MAX_LENGTH} characters.`,
  )
  .refine(
    (value) => !value || z.string().url().safeParse(value).success,
    {
      message: "CTA button link must be a valid URL.",
    },
  );

const technologySchema = z
  .string()
  .trim()
  .min(1, "Technology name is required.")
  .max(
    TECHNOLOGY_MAX_LENGTH,
    `Technology cannot exceed ${TECHNOLOGY_MAX_LENGTH} characters.`,
  );

export const technologiesSchema = z
  .array(technologySchema)
  .max(
    MAX_TECHNOLOGIES,
    `Maximum ${MAX_TECHNOLOGIES} technologies are allowed.`,
  );

/* -------------------------------------------------------------------------- */
/*                             Base API Schema                                */
/* -------------------------------------------------------------------------- */

const heroApiSchema = z.object({
  title: titleSchema,

  subtitle: subtitleSchema,

  description: descriptionSchema,

  profileImage: heroImageSchema.optional(),

  resumeUrl: resumeUrlSchema.optional(),

  ctaButtonText: ctaButtonTextSchema.optional(),

  ctaButtonLink: ctaButtonLinkSchema.optional(),

  technologies: technologiesSchema.optional(),

  isActive: z.boolean().default(true),
});

/* -------------------------------------------------------------------------- */
/*                           Create Hero Schema                               */
/* -------------------------------------------------------------------------- */

export const createHeroSchema = heroApiSchema.superRefine(
  (data, ctx) => {
    const hasText = Boolean(data.ctaButtonText?.trim());

    const hasLink = Boolean(data.ctaButtonLink?.trim());

    if (hasText && !hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ctaButtonLink"],
        message: "CTA button link is required.",
      });
    }

    if (hasLink && !hasText) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ctaButtonText"],
        message: "CTA button text is required.",
      });
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                           Update Hero Schema                               */
/* -------------------------------------------------------------------------- */

export const updateHeroSchema = heroApiSchema
  .partial()
  .superRefine((data, ctx) => {
    const hasText = Boolean(data.ctaButtonText?.trim());

    const hasLink = Boolean(data.ctaButtonLink?.trim());

    if (hasText && !hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ctaButtonLink"],
        message: "CTA button link is required.",
      });
    }

    if (hasLink && !hasText) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ctaButtonText"],
        message: "CTA button text is required.",
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                            Hero Form Schema                                */
/* -------------------------------------------------------------------------- */

export const heroFormSchema = z
  .object({
    title: titleSchema,

    subtitle: subtitleSchema,

    description: descriptionSchema,

    profileImage: heroImageSchema.nullable(),

    resumeUrl: resumeUrlSchema,

    ctaButtonText: ctaButtonTextSchema,

    ctaButtonLink: ctaButtonLinkSchema,

    technologies: technologiesSchema,

    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const hasText = Boolean(data.ctaButtonText.trim());

    const hasLink = Boolean(data.ctaButtonLink.trim());

    if (hasText && !hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ctaButtonLink"],
        message: "CTA button link is required.",
      });
    }

    if (hasLink && !hasText) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ctaButtonText"],
        message: "CTA button text is required.",
      });
    }
  });

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type HeroImageSchema = z.infer<typeof heroImageSchema>;

export type CreateHeroSchema = z.infer<typeof createHeroSchema>;

export type UpdateHeroSchema = z.infer<typeof updateHeroSchema>;

export type HeroFormValues = z.infer<typeof heroFormSchema>;