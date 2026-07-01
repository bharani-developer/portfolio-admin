// src\modules\testimonials\types\testimonials.type.ts

import type { IApiMeta, IApiResponse, IBaseEntity } from "@/shared/types";

import type { TestimonialFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                              Client Image                                  */
/* -------------------------------------------------------------------------- */

export interface ITestimonialImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                               Client Types                                 */
/* -------------------------------------------------------------------------- */

export const CLIENT_TYPES = [
  "Individual",
  "Freelancer",
  "Startup",
  "Company",
  "Agency",
  "Organization",
  "Other",
] as const;

export type TClientType = (typeof CLIENT_TYPES)[number];

/* -------------------------------------------------------------------------- */
/*                            Testimonial Entity                              */
/* -------------------------------------------------------------------------- */

export interface ITestimonial extends IBaseEntity {
  clientName: string;

  clientPosition?: string;

  clientCompany?: string;

  clientImage?: ITestimonialImage;

  clientWebsite?: string;

  projectName?: string;

  review: string;

  rating: number;

  clientType: TClientType;

  isFeatured: boolean;

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           Create Testimonial                               */
/* -------------------------------------------------------------------------- */

export interface ICreateTestimonialPayload {
  clientName: string;

  review: string;

  rating: number;

  clientType: TClientType;

  clientPosition?: string;

  clientCompany?: string;

  clientImage?: ITestimonialImage;

  clientWebsite?: string;

  projectName?: string;

  isFeatured?: boolean;

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           Update Testimonial                               */
/* -------------------------------------------------------------------------- */

export type IUpdateTestimonialPayload = Partial<ICreateTestimonialPayload>;

/* -------------------------------------------------------------------------- */
/*                            Query Parameters                                */
/* -------------------------------------------------------------------------- */

export interface ITestimonialQueryParams {
  page?: number;

  limit?: number;

  searchTerm?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";

  fields?: string;

  rating?: number;

  clientType?: TClientType;

  projectName?: string;

  isFeatured?: boolean;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface ITestimonialParams {
  id: string;
}

export interface ITestimonialRatingParams {
  rating: string;
}

export interface ITestimonialClientTypeParams {
  clientType: string;
}

export interface ITestimonialProjectParams {
  projectName: string;
}

/* -------------------------------------------------------------------------- */
/*                           Average Rating                                   */
/* -------------------------------------------------------------------------- */

export interface IAverageRating {
  averageRating: number;

  totalTestimonials: number;
}

/* -------------------------------------------------------------------------- */
/*                                Responses                                   */
/* -------------------------------------------------------------------------- */

export type ITestimonialResponse = IApiResponse<ITestimonial>;

export type ICreateTestimonialResponse = IApiResponse<ITestimonial>;

export type IUpdateTestimonialResponse = IApiResponse<ITestimonial>;

export type IDeleteTestimonialResponse = IApiResponse<ITestimonial>;

export interface ITestimonialsResponse extends IApiResponse<ITestimonial[]> {
  meta?: IApiMeta;
}

export type IAverageRatingResponse = IApiResponse<IAverageRating>;

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateTestimonialVariables {
  id: string;

  payload: IUpdateTestimonialPayload;
}

export interface IDeleteTestimonialVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                             Select Options                                 */
/* -------------------------------------------------------------------------- */

export const TESTIMONIAL_STATUS = ["Active", "Inactive"] as const;

export const FEATURED_STATUS = ["Featured", "Not Featured"] as const;

/* -------------------------------------------------------------------------- */
/*                               Type Aliases                                 */
/* -------------------------------------------------------------------------- */

export type TTestimonialStatus = (typeof TESTIMONIAL_STATUS)[number];

export type TFeaturedStatus = (typeof FEATURED_STATUS)[number];

/* -------------------------------------------------------------------------- */
/*                             Default Values                                 */
/* -------------------------------------------------------------------------- */

export const TESTIMONIAL_DEFAULT_VALUES: TestimonialFormValues = {
  clientName: "",

  clientPosition: "",

  clientCompany: "",

  clientImage: undefined,

  clientWebsite: "",

  projectName: "",

  review: "",

  rating: 5,

  clientType: "Individual",

  isFeatured: false,

  sortOrder: 0,

  isActive: true,
};
