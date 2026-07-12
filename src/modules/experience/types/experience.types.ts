// src/modules/experience/types/experience.type.ts

import type { IApiMeta, IApiResponse, IBaseEntity } from "@/shared/types";

import type { ExperienceFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                                Experience Logo                             */
/* -------------------------------------------------------------------------- */

export interface IExperienceLogo {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                             Experience Entity                              */
/* -------------------------------------------------------------------------- */

export interface IExperience extends IBaseEntity {
  company: string;

  slug: string;

  companyLogo?: IExperienceLogo;

  position: string;

  employmentType:
    | "Full Time"
    | "Part Time"
    | "Contract"
    | "Freelance"
    | "Internship"
    | "Apprenticeship"
    | "Temporary";

  workMode: "Remote" | "Hybrid" | "Onsite";

  location: string;

  startDate: string;

  endDate?: string | null;

  isCurrent: boolean;

  summary: string;

  responsibilities: string[];

  technologies: string[];

  companyWebsite?: string;

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateExperiencePayload {
  company: string;

  companyLogo?: IExperienceLogo;

  position: string;

  employmentType:
    | "Full Time"
    | "Part Time"
    | "Contract"
    | "Freelance"
    | "Internship"
    | "Apprenticeship"
    | "Temporary";

  workMode: "Remote" | "Hybrid" | "Onsite";

  location: string;

  startDate: string;

  endDate?: string | null;

  isCurrent?: boolean;

  summary: string;

  responsibilities: string[];

  technologies: string[];

  companyWebsite?: string;

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateExperiencePayload = Partial<ICreateExperiencePayload>;

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface IExperienceQueryParams {
  page?: number;

  limit?: number;

  searchTerm?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";

  fields?: string;

  company?: string;

  technology?: string;

  employmentType?: string;

  workMode?: string;

  isCurrent?: boolean;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface IExperienceParams {
  id: string;
}

export interface IExperienceSlugParams {
  slug: string;
}

export interface IExperienceCompanyParams {
  company: string;
}

export interface IExperienceTechnologyParams {
  technology: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type IExperienceResponse = IApiResponse<IExperience>;

export type ICreateExperienceResponse = IApiResponse<IExperience>;

export type IUpdateExperienceResponse = IApiResponse<IExperience>;

export type IDeleteExperienceResponse = IApiResponse<IExperience>;

export interface IExperiencesResponse extends IApiResponse<IExperience[]> {
  meta: IApiMeta | undefined;
}

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateExperienceVariables {
  id: string;

  payload: IUpdateExperiencePayload;
}

export interface IDeleteExperienceVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                             Select Options                                 */
/* -------------------------------------------------------------------------- */

export const EMPLOYMENT_TYPES = [
  "Full Time",
  "Part Time",
  "Contract",
  "Freelance",
  "Internship",
  "Apprenticeship",
  "Temporary",
] as const;

export const WORK_MODES = ["Remote", "Hybrid", "Onsite"] as const;

export type TEmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type TWorkMode = (typeof WORK_MODES)[number];

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const EXPERIENCE_DEFAULT_VALUES: ExperienceFormValues = {
  company: "",

  companyLogo: undefined,

  position: "",

  employmentType: "Full Time",

  workMode: "Onsite",

  location: "",

  startDate: "",

  endDate: "",

  isCurrent: false,

  summary: "",

  responsibilities: [],

  technologies: [],

  companyWebsite: "",

  sortOrder: 0,

  isActive: true,
};
