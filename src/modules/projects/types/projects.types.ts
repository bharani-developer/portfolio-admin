// src/modules/projects/types/projects.type.ts

import type { IApiMeta, IApiResponse, IBaseEntity } from "@/shared/types";

import type { ProjectFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                               Project Image                                */
/* -------------------------------------------------------------------------- */

export interface IProjectImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                               Project Entity                               */
/* -------------------------------------------------------------------------- */

export interface IProject extends IBaseEntity {
  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  thumbnail?: IProjectImage;

  gallery: IProjectImage[];

  technologies: string[];

  category: string;

  githubUrl?: string;

  liveUrl?: string;

  featured: boolean;

  status: string;

  startDate?: string;

  endDate?: string | null;

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateProjectPayload {
  title: string;

  shortDescription: string;

  description: string;

  thumbnail?: IProjectImage;

  gallery?: IProjectImage[];

  technologies: string[];

  category: string;

  githubUrl?: string;

  liveUrl?: string;

  featured?: boolean;

  status: string;

  startDate?: string;

  endDate?: string | null;

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateProjectPayload = Partial<ICreateProjectPayload>;

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface IProjectsQueryParams {
  page?: number;

  limit?: number;

  searchTerm?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";

  fields?: string;

  category?: string;

  technology?: string;

  status?: string;

  featured?: boolean;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface IProjectParams {
  id: string;
}

export interface IProjectSlugParams {
  slug: string;
}

export interface IProjectCategoryParams {
  category: string;
}

export interface IProjectTechnologyParams {
  technology: string;
}

export interface IProjectStatusParams {
  status: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type IProjectResponse = IApiResponse<IProject>;

export type ICreateProjectResponse = IApiResponse<IProject>;

export type IUpdateProjectResponse = IApiResponse<IProject>;

export type IDeleteProjectResponse = IApiResponse<IProject>;

export interface IProjectsResponse extends IApiResponse<IProject[]> {
  meta: IApiMeta | undefined;
}

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateProjectVariables {
  id: string;

  payload: IUpdateProjectPayload;
}

export interface IDeleteProjectVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const PROJECT_DEFAULT_VALUES: ProjectFormValues = {
  title: "",

  shortDescription: "",

  description: "",

  thumbnail: undefined,

  gallery: [],

  technologies: [],

  category: "",

  githubUrl: "",

  liveUrl: "",

  featured: false,

  status: "",

  startDate: "",

  endDate: "",

  sortOrder: 0,

  isActive: true,
};
