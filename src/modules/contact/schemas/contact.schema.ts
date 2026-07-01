// src\modules\contact\schemas\contact.schema.ts

import { z } from "zod";

import { CONTACT_PRIORITY, CONTACT_SOURCE, CONTACT_STATUS } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const NAME_MAX_LENGTH = 150;

const EMAIL_MAX_LENGTH = 255;

const PHONE_MAX_LENGTH = 30;

const COMPANY_MAX_LENGTH = 200;

const SUBJECT_MAX_LENGTH = 300;

const MESSAGE_MAX_LENGTH = 5000;

const NOTES_MAX_LENGTH = 5000;

const MAX_SORT_ORDER = 9999;

/* -------------------------------------------------------------------------- */
/*                               Shared Fields                                */
/* -------------------------------------------------------------------------- */

const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required.")
  .max(NAME_MAX_LENGTH, `Name cannot exceed ${NAME_MAX_LENGTH} characters.`);

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(EMAIL_MAX_LENGTH, `Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`)
  .email("Please enter a valid email address.");

const phoneSchema = z
  .string()
  .trim()
  .max(
    PHONE_MAX_LENGTH,
    `Phone number cannot exceed ${PHONE_MAX_LENGTH} characters.`,
  );

const companySchema = z
  .string()
  .trim()
  .max(
    COMPANY_MAX_LENGTH,
    `Company cannot exceed ${COMPANY_MAX_LENGTH} characters.`,
  );

const subjectSchema = z
  .string()
  .trim()
  .min(1, "Subject is required.")
  .max(
    SUBJECT_MAX_LENGTH,
    `Subject cannot exceed ${SUBJECT_MAX_LENGTH} characters.`,
  );

const messageSchema = z
  .string()
  .trim()
  .min(1, "Message is required.")
  .max(
    MESSAGE_MAX_LENGTH,
    `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters.`,
  );

const notesSchema = z
  .string()
  .trim()
  .max(NOTES_MAX_LENGTH, `Notes cannot exceed ${NOTES_MAX_LENGTH} characters.`);

const statusSchema = z.enum(CONTACT_STATUS, {
  error: "Please select a valid status.",
});

const prioritySchema = z.enum(CONTACT_PRIORITY, {
  error: "Please select a valid priority.",
});

const sourceSchema = z.enum(CONTACT_SOURCE, {
  error: "Please select a valid source.",
});

const sortOrderSchema = z
  .number({
    error: "Sort order must be a valid number.",
  })
  .int("Sort order must be a whole number.")
  .min(0, "Sort order cannot be negative.")
  .max(MAX_SORT_ORDER, `Sort order cannot exceed ${MAX_SORT_ORDER}.`);

const isActiveSchema = z.boolean();

const isReadSchema = z.boolean();

const isRepliedSchema = z.boolean();

const repliedAtSchema = z.string().datetime().optional();

/* -------------------------------------------------------------------------- */
/*                            Base Contact Schema                             */
/* -------------------------------------------------------------------------- */

const contactBaseSchema = z.object({
  name: nameSchema,

  email: emailSchema,

  phone: phoneSchema.optional(),

  company: companySchema.optional(),

  subject: subjectSchema,

  message: messageSchema,

  status: statusSchema.default("New"),

  priority: prioritySchema.default("Medium"),

  source: sourceSchema.default("Website"),

  isRead: isReadSchema.default(false),

  isReplied: isRepliedSchema.default(false),

  repliedAt: repliedAtSchema,

  notes: notesSchema.optional(),

  sortOrder: sortOrderSchema.default(0),

  isActive: isActiveSchema.default(true),
});

/* -------------------------------------------------------------------------- */
/*                          Create Contact Schema                             */
/* -------------------------------------------------------------------------- */

export const createContactSchema = z.object({
  name: nameSchema,

  email: emailSchema,

  phone: phoneSchema.optional(),

  company: companySchema.optional(),

  subject: subjectSchema,

  message: messageSchema,

  source: sourceSchema.default("Website"),
});

/* -------------------------------------------------------------------------- */
/*                          Update Contact Schema                             */
/* -------------------------------------------------------------------------- */

export const updateContactSchema = contactBaseSchema.partial();

/* -------------------------------------------------------------------------- */
/*                           Contact Form Schema                              */
/* -------------------------------------------------------------------------- */

export const contactFormSchema = z.object({
  name: nameSchema,

  email: emailSchema,

  phone: z.string(),

  company: z.string(),

  subject: subjectSchema,

  message: messageSchema,

  status: statusSchema,

  priority: prioritySchema,

  source: sourceSchema,

  notes: z.string(),

  sortOrder: sortOrderSchema,

  isActive: isActiveSchema,

  isRead: isReadSchema,

  isReplied: isRepliedSchema,
});

/* -------------------------------------------------------------------------- */
/*                          Contacts Query Schema                             */
/* -------------------------------------------------------------------------- */

export const contactsQuerySchema = z.object({
  searchTerm: z.string().trim().optional(),

  page: z.number().int().min(1).optional(),

  limit: z.number().int().min(1).max(100).optional(),

  sortBy: z.string().trim().optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),

  fields: z.string().trim().optional(),

  status: statusSchema.optional(),

  priority: prioritySchema.optional(),

  source: sourceSchema.optional(),

  isRead: z.boolean().optional(),

  isReplied: z.boolean().optional(),

  isActive: z.boolean().optional(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type CreateContactSchema = z.infer<typeof createContactSchema>;

export type UpdateContactSchema = z.infer<typeof updateContactSchema>;

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactsQuerySchema = z.infer<typeof contactsQuerySchema>;
