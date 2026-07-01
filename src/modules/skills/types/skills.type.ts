// src/modules/skills/types/skills.type.ts

import type { IApiMeta, IApiResponse, IBaseEntity } from "@/shared/types";

import type { SkillFormValues } from "../schemas/skills.schema";

/* -------------------------------------------------------------------------- */
/*                               Image Entity                                 */
/* -------------------------------------------------------------------------- */

export interface ISkillImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                              Skill Category                                */
/* -------------------------------------------------------------------------- */

export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "DevOps",
  "Tools",
  "Other",
] as const;

export type TSkillCategory = (typeof SKILL_CATEGORIES)[number];

/* -------------------------------------------------------------------------- */
/*                               Skill Entity                                 */
/* -------------------------------------------------------------------------- */

export interface ISkill extends IBaseEntity {
  name: string;

  slug: string;

  category: TSkillCategory;

  proficiency: number;

  image?: ISkillImage | null;

  description?: string;

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateSkillPayload {
  name: string;

  category: TSkillCategory;

  proficiency: number;

  image?: ISkillImage | null;

  description?: string;

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateSkillPayload = Partial<ICreateSkillPayload>;

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface ISkillsQueryParams {
  searchTerm?: string;

  page?: number;

  limit?: number;

  sort?: string;

  fields?: string;

  category?: TSkillCategory;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface ISkillParams {
  id: string;
}

export interface ISkillCategoryParams {
  category: TSkillCategory;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type ISkillResponse = IApiResponse<ISkill>;

export type ICreateSkillResponse = IApiResponse<ISkill>;

export type IUpdateSkillResponse = IApiResponse<ISkill>;

export type IDeleteSkillResponse = IApiResponse<ISkill>;

export interface ISkillsResponse extends IApiResponse<ISkill[]> {
  meta?: IApiMeta;
}

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const SKILL_DEFAULT_VALUES: SkillFormValues = {
  name: "",

  category: "Frontend",

  proficiency: 0,

  image: null,

  description: "",

  sortOrder: 0,

  isActive: true,
};