// src/modules/services/types/services.type.ts

import type {
  IApiMeta,
  IApiResponse,
  IBaseEntity,
} from "@/shared/types";

import type { ServiceFormValues } from "../schemas/services.schema";

/* -------------------------------------------------------------------------- */
/*                               Service Entity                               */
/* -------------------------------------------------------------------------- */

export interface IService extends IBaseEntity {
  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  icon?: string;

  sortOrder: number;

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateServicePayload {
  title: string;

  shortDescription: string;

  description: string;

  icon?: string;

  sortOrder?: number;

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateServicePayload =
  Partial<ICreateServicePayload>;

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface IServicesQueryParams {
  page?: number;

  limit?: number;

  searchTerm?: string;

  isActive?: boolean;

  sort?: string;

  fields?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Route Params                                 */
/* -------------------------------------------------------------------------- */

export interface IServiceParams {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type IServiceResponse =
  IApiResponse<IService>;

export type ICreateServiceResponse =
  IApiResponse<IService>;

export type IUpdateServiceResponse =
  IApiResponse<IService>;

export type IDeleteServiceResponse =
  IApiResponse<IService>;

export interface IServicesResponse
  extends IApiResponse<IService[]> {
  meta: IApiMeta;
}

/* -------------------------------------------------------------------------- */
/*                              Mutation Types                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateServiceVariables {
  id: string;

  payload: IUpdateServicePayload;
}

export interface IDeleteServiceVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const SERVICE_DEFAULT_VALUES: ServiceFormValues = {
  title: "",

  shortDescription: "",

  description: "",

  icon: "",

  sortOrder: 0,

  isActive: true,
};