// src/modules/about/types/about.type.ts

import type { IBaseEntity, IApiResponse, IImage } from "@/shared/types";

import type { AboutFormValues } from "../schemas/about.schema";

/* -------------------------------------------------------------------------- */
/*                                 Stat Entity                                */
/* -------------------------------------------------------------------------- */

export interface IAboutStat {
  label: string;

  value: string;
}

/* -------------------------------------------------------------------------- */
/*                                About Entity                                */
/* -------------------------------------------------------------------------- */

export interface IAbout extends IBaseEntity {
  profileImage?: IImage;

  images: IImage[];

  fullName: string;

  designation: string;

  bio: string;

  email?: string;

  phone?: string;

  address?: string;

  resumeUrl?: string;

  yearsOfExperience?: number;

  stats?: IAboutStat[];

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateAboutPayload {
  profileImage?: IImage;

  images: IImage[];

  fullName: string;

  designation: string;

  bio: string;

  email?: string;

  phone?: string;

  address?: string;

  resumeUrl?: string;

  yearsOfExperience?: number;

  stats?: IAboutStat[];

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export type IUpdateAboutPayload = Partial<ICreateAboutPayload>;

/* -------------------------------------------------------------------------- */
/*                               Image Payload                                */
/* -------------------------------------------------------------------------- */

export interface IAboutImagePayload {
  profileImage?: IImage;

  images: IImage[];
}

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface IAboutQueryParams {
  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type IAboutResponse = IApiResponse<IAbout>;

export type ICreateAboutResponse = IApiResponse<IAbout>;

export type IUpdateAboutResponse = IApiResponse<IAbout>;

export type IDeleteAboutResponse = IApiResponse<null>;

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const ABOUT_DEFAULT_VALUES: AboutFormValues = {
  profileImage: undefined,

  images: [],

  fullName: "",

  designation: "",

  bio: "",

  email: "",

  phone: "",

  address: "",

  resumeUrl: "",

  yearsOfExperience: undefined,

  stats: [],

  isActive: true,
};
