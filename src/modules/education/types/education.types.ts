// src\modules\education\types\education.type.ts

import type { IApiMeta, IApiResponse, IBaseEntity } from "@/shared/types";

import type { EducationFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                              Education Image                               */
/* -------------------------------------------------------------------------- */

export interface IEducationImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                              Education Entity                              */
/* -------------------------------------------------------------------------- */

export interface IEducation extends IBaseEntity {
  institution: string;

  slug: string;

  institutionLogo?: IEducationImage;

  degree: string;

  fieldOfStudy: string;

  educationLevel:
    | "Doctorate"
    | "Masters"
    | "Bachelors"
    | "Diploma"
    | "Higher Secondary"
    | "Secondary"
    | "Certification"
    | "Other";

  educationType: "Full Time" | "Part Time" | "Distance" | "Online";

  location: string;

  startDate: string;

  endDate?: string | null;

  isCurrent: boolean;

  gradeType: "CGPA" | "GPA" | "Percentage" | "Division" | "Pass";

  grade?: string;

  description?: string;

  achievements: string[];

  skills: string[];

  institutionWebsite?: string;

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateEducationPayload {
  institution: string;

  institutionLogo?: IEducationImage;

  degree: string;

  fieldOfStudy: string;

  educationLevel:
    | "Doctorate"
    | "Masters"
    | "Bachelors"
    | "Diploma"
    | "Higher Secondary"
    | "Secondary"
    | "Certification"
    | "Other";

  educationType: "Full Time" | "Part Time" | "Distance" | "Online";

  location: string;

  startDate: string;

  endDate?: string | null;

  isCurrent?: boolean;

  gradeType: "CGPA" | "GPA" | "Percentage" | "Division" | "Pass";

  grade?: string;

  description?: string;

  achievements?: string[];

  skills?: string[];

  institutionWebsite?: string;

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateEducationPayload = Partial<ICreateEducationPayload>;

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface IEducationQueryParams {
  page?: number;

  limit?: number;

  searchTerm?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";

  fields?: string;

  educationLevel?: string;

  educationType?: string;

  skill?: string;

  isCurrent?: boolean;

  isActive?: boolean;
}

export interface IEducationsResponse extends IApiResponse<IEducation[]> {
  meta?: IApiMeta | undefined;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface IEducationParams {
  id: string;
}

export interface IEducationSlugParams {
  slug: string;
}

export interface IEducationLevelParams {
  level: string;
}

export interface IEducationSkillParams {
  skill: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type IEducationResponse = IApiResponse<IEducation>;

export type ICreateEducationResponse = IApiResponse<IEducation>;

export type IUpdateEducationResponse = IApiResponse<IEducation>;

export type IDeleteEducationResponse = IApiResponse<IEducation>;

export interface IEducationsResponse extends IApiResponse<IEducation[]> {
  meta?: IApiMeta;
}

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateEducationVariables {
  id: string;

  payload: IUpdateEducationPayload;
}

export interface IDeleteEducationVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                             Select Options                                 */
/* -------------------------------------------------------------------------- */

export const EDUCATION_LEVELS = [
  "Doctorate",
  "Masters",
  "Bachelors",
  "Diploma",
  "Higher Secondary",
  "Secondary",
  "Certification",
  "Other",
] as const;

export const EDUCATION_TYPES = [
  "Full Time",
  "Part Time",
  "Distance",
  "Online",
] as const;

export const GRADE_TYPES = [
  "CGPA",
  "GPA",
  "Percentage",
  "Division",
  "Pass",
] as const;

/* -------------------------------------------------------------------------- */
/*                                 Type Aliases                               */
/* -------------------------------------------------------------------------- */

export type TEducationLevel = (typeof EDUCATION_LEVELS)[number];

export type TEducationType = (typeof EDUCATION_TYPES)[number];

export type TGradeType = (typeof GRADE_TYPES)[number];

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const EDUCATION_DEFAULT_VALUES: EducationFormValues = {
  institution: "",

  institutionLogo: undefined,

  degree: "",

  fieldOfStudy: "",

  educationLevel: "Bachelors",

  educationType: "Full Time",

  location: "",

  startDate: "",

  endDate: "",

  isCurrent: false,

  gradeType: "CGPA",

  grade: "",

  description: "",

  achievements: [],

  skills: [],

  institutionWebsite: "",

  sortOrder: 0,

  isActive: true,
};
