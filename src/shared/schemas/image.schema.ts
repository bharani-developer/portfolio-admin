import { z } from "zod";

export const imageSchema = z.object({
  url: z.url("Please provide a valid image URL.").trim(),

  publicId: z.string().trim().min(1, "Image public ID is required."),
});

export const optionalImageSchema = imageSchema.optional();

export type ImageSchema = z.infer<typeof imageSchema>;

export type OptionalImageSchema = z.infer<typeof optionalImageSchema>;
