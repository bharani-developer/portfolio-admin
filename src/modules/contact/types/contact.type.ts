// src/modules/contact/types/contact.type.ts

import type {
  IApiMeta,
  IApiResponse,
  IBaseEntity,
} from "@/shared/types";

import type {
  ContactFormValues,
} from "../schemas";

/* -------------------------------------------------------------------------- */
/*                               Constants                                    */
/* -------------------------------------------------------------------------- */

export const CONTACT_STATUS = [
  "New",
  "In Progress",
  "Replied",
  "Closed",
] as const;

export const CONTACT_PRIORITY = [
  "Low",
  "Medium",
  "High",
  "Urgent",
] as const;

export const CONTACT_SOURCE = [
  "Website",
  "Email",
  "LinkedIn",
  "GitHub",
  "Referral",
  "Other",
] as const;

/* -------------------------------------------------------------------------- */
/*                               Type Aliases                                 */
/* -------------------------------------------------------------------------- */

export type TContactStatus =
  (typeof CONTACT_STATUS)[number];

export type TContactPriority =
  (typeof CONTACT_PRIORITY)[number];

export type TContactSource =
  (typeof CONTACT_SOURCE)[number];

/* -------------------------------------------------------------------------- */
/*                              Contact Entity                                */
/* -------------------------------------------------------------------------- */

export interface IContact
  extends IBaseEntity {
  /**
   * Full Name
   */
  name: string;

  /**
   * Email Address
   */
  email: string;

  /**
   * Phone Number
   */
  phone?: string | null;

  /**
   * Company Name
   */
  company?: string | null;

  /**
   * Contact Subject
   */
  subject: string;

  /**
   * Contact Message
   */
  message: string;

  /**
   * Current Status
   */
  status: TContactStatus;

  /**
   * Priority
   */
  priority: TContactPriority;

  /**
   * Contact Source
   */
  source: TContactSource;

  /**
   * Read Status
   */
  isRead: boolean;

  /**
   * Reply Status
   */
  isReplied: boolean;

  /**
   * Reply Timestamp
   */
  repliedAt?: string | null;

  /**
   * Internal Notes
   */
  notes?: string | null;

  /**
   * Visitor IP
   */
  ipAddress?: string | null;

  /**
   * Browser User Agent
   */
  userAgent?: string | null;

  /**
   * Display Order
   */
  sortOrder: number;

  /**
   * Active Status
   */
  isActive: boolean;
}
/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateContactPayload {
  /**
   * Full Name
   */
  name: string;

  /**
   * Email Address
   */
  email: string;

  /**
   * Phone Number
   */
  phone?: string;

  /**
   * Company Name
   */
  company?: string;

  /**
   * Subject
   */
  subject: string;

  /**
   * Message
   */
  message: string;

  /**
   * Contact Source
   */
  source?: TContactSource;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateContactPayload = Partial<{
  /**
   * Full Name
   */
  name: string;

  /**
   * Email Address
   */
  email: string;

  /**
   * Phone Number
   */
  phone: string;

  /**
   * Company Name
   */
  company: string;

  /**
   * Subject
   */
  subject: string;

  /**
   * Message
   */
  message: string;

  /**
   * Contact Status
   */
  status: TContactStatus;

  /**
   * Contact Priority
   */
  priority: TContactPriority;

  /**
   * Contact Source
   */
  source: TContactSource;

  /**
   * Read Status
   */
  isRead: boolean;

  /**
   * Reply Status
   */
  isReplied: boolean;

  /**
   * Reply Timestamp
   */
  repliedAt: string;

  /**
   * Internal Notes
   */
  notes: string;

  /**
   * Sort Order
   */
  sortOrder: number;

  /**
   * Active Status
   */
  isActive: boolean;
}>;

/* -------------------------------------------------------------------------- */
/*                             Query Parameters                               */
/* -------------------------------------------------------------------------- */

export interface IContactQueryParams {
  /**
   * Search keyword
   */
  searchTerm?: string;

  /**
   * Pagination
   */
  page?: number;

  /**
   * Page Size
   */
  limit?: number;

  /**
   * Sort Field
   */
  sortBy?: keyof IContact;

  /**
   * Sort Direction
   */
  sortOrder?: "asc" | "desc";

  /**
   * Requested Fields
   */
  fields?: string;

  /**
   * Filters
   */
  status?: TContactStatus;

  priority?: TContactPriority;

  source?: TContactSource;

  isRead?: boolean;

  isReplied?: boolean;

  isActive?: boolean;
}
/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface IContactParams {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                              Statistics                                    */
/* -------------------------------------------------------------------------- */

export interface IContactStats {
  totalContacts: number;

  unreadContacts: number;

  readContacts: number;

  repliedContacts: number;

  activeContacts: number;

  newContacts: number;

  inProgressContacts: number;

  closedContacts: number;

  highPriorityContacts: number;

  urgentPriorityContacts: number;
}

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

export type IContactResponse =
  IApiResponse<IContact>;

export type ICreateContactResponse =
  IApiResponse<IContact>;

export type IUpdateContactResponse =
  IApiResponse<IContact>;

export type IDeleteContactResponse =
  IApiResponse<IContact>;

export interface IContactsResponse
  extends IApiResponse<IContact[]> {
  /**
   * Pagination metadata.
   * Keep optional only if your backend sometimes omits it.
   * Otherwise change to:
   *
   * meta: IApiMeta;
   */
  meta?: IApiMeta;
}

export type IContactStatsResponse =
  IApiResponse<IContactStats>;

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateContactVariables {
  id: string;

  payload: IUpdateContactPayload;
}

export interface IDeleteContactVariables {
  id: string;
}

export interface IMarkContactReadVariables {
  id: string;
}

export interface IMarkContactRepliedVariables {
  id: string;
}
/* -------------------------------------------------------------------------- */
/*                              Filter Options                                */
/* -------------------------------------------------------------------------- */

export const CONTACT_READ_STATUS = [
  "Read",
  "Unread",
] as const;

export const CONTACT_REPLY_STATUS = [
  "Replied",
  "Not Replied",
] as const;

export const CONTACT_ACTIVE_STATUS = [
  "Active",
  "Inactive",
] as const;

/* -------------------------------------------------------------------------- */
/*                               Filter Types                                 */
/* -------------------------------------------------------------------------- */

export type TContactReadStatus =
  (typeof CONTACT_READ_STATUS)[number];

export type TContactReplyStatus =
  (typeof CONTACT_REPLY_STATUS)[number];

export type TContactActiveStatus =
  (typeof CONTACT_ACTIVE_STATUS)[number];

/* -------------------------------------------------------------------------- */
/*                             Default Values                                 */
/* -------------------------------------------------------------------------- */

export const CONTACT_DEFAULT_VALUES: ContactFormValues = {
  name: "",

  email: "",

  phone: "",

  company: "",

  subject: "",

  message: "",

  status: "New",

  priority: "Medium",

  source: "Website",

  notes: "",

  sortOrder: 0,

  isActive: true,

  isRead: false,

  isReplied: false,
};