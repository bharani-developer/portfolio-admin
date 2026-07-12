// src/modules/certifications/types/certifications.type.ts

import type { IApiMeta, IApiResponse, IBaseEntity } from "@/shared/types";

import type { CertificationFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                            Certification Image                             */
/* -------------------------------------------------------------------------- */

export interface ICertificationImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                           Certification Entity                             */
/* -------------------------------------------------------------------------- */

export interface ICertification extends IBaseEntity {
  title: string;

  slug: string;

  issuer: string;

  certificateImage?: ICertificationImage;

  credentialId?: string;

  credentialUrl?: string;

  issueDate: string;

  expiryDate?: string | null;

  neverExpires: boolean;

  description?: string;

  skills: string[];

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           Create Payload                                   */
/* -------------------------------------------------------------------------- */

export interface ICreateCertificationPayload {
  title: string;

  issuer: string;

  certificateImage?: ICertificationImage;

  credentialId?: string;

  credentialUrl?: string;

  issueDate: string;

  expiryDate?: string | null;

  neverExpires?: boolean;

  description?: string;

  skills?: string[];

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           Update Payload                                   */
/* -------------------------------------------------------------------------- */

export type IUpdateCertificationPayload = Partial<ICreateCertificationPayload>;

/* -------------------------------------------------------------------------- */
/*                            Query Parameters                                */
/* -------------------------------------------------------------------------- */

export interface ICertificationQueryParams {
  page?: number;

  limit?: number;

  searchTerm?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";

  fields?: string;

  issuer?: string;

  skill?: string;

  neverExpires?: boolean;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface ICertificationParams {
  id: string;
}

export interface ICertificationSlugParams {
  slug: string;
}

export interface ICertificationIssuerParams {
  issuer: string;
}

export interface ICertificationSkillParams {
  skill: string;
}

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

export type ICertificationResponse = IApiResponse<ICertification>;

export type ICreateCertificationResponse = IApiResponse<ICertification>;

export type IUpdateCertificationResponse = IApiResponse<ICertification>;

export type IDeleteCertificationResponse = IApiResponse<ICertification>;

export interface ICertificationsResponse extends IApiResponse<
  ICertification[]
> {
  meta?: IApiMeta;
}

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateCertificationVariables {
  id: string;

  payload: IUpdateCertificationPayload;
}

export interface IDeleteCertificationVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                              Select Options                                */
/* -------------------------------------------------------------------------- */

export const CERTIFICATION_STATUS = ["Active", "Inactive"] as const;

/* -------------------------------------------------------------------------- */
/*                               Type Aliases                                 */
/* -------------------------------------------------------------------------- */

export type TCertificationStatus = (typeof CERTIFICATION_STATUS)[number];

/* -------------------------------------------------------------------------- */
/*                             Default Values                                 */
/* -------------------------------------------------------------------------- */

export const CERTIFICATION_DEFAULT_VALUES: CertificationFormValues = {
  title: "",

  issuer: "",

  certificateImage: undefined,

  credentialId: "",

  credentialUrl: "",

  issueDate: "",

  expiryDate: "",

  neverExpires: false,

  description: "",

  skills: [],

  sortOrder: 0,

  isActive: true,
};
