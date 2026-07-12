// src\modules\settings\types\settings.type.ts

import type { IApiResponse, IBaseEntity } from "@/shared/types";

/* -------------------------------------------------------------------------- */
/*                                Image Type                                  */
/* -------------------------------------------------------------------------- */

export interface ISettingsImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                             Social Links Type                              */
/* -------------------------------------------------------------------------- */

export interface ISettingsSocialLinks {
  github?: string;

  linkedin?: string;

  twitter?: string;

  facebook?: string;

  instagram?: string;

  youtube?: string;

  leetcode?: string;

  hackerrank?: string;

  stackoverflow?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  SEO Type                                  */
/* -------------------------------------------------------------------------- */

export interface ISettingsSeo {
  metaTitle: string;

  metaDescription: string;

  metaKeywords?: string[];

  siteUrl: string;
}

/* -------------------------------------------------------------------------- */
/*                               Settings Entity                              */
/* -------------------------------------------------------------------------- */

export interface ISettings extends IBaseEntity {
  siteTitle: string;

  siteDescription: string;

  email: string;

  phone: string;

  address: string;

  logo?: ISettingsImage;

  favicon?: ISettingsImage;

  socialLinks: ISettingsSocialLinks;

  seo: ISettingsSeo;
}

/* -------------------------------------------------------------------------- */
/*                              Create Payload                                */
/* -------------------------------------------------------------------------- */

export interface ICreateSettingsPayload {
  siteTitle: string;

  siteDescription: string;

  email: string;

  phone: string;

  address: string;

  logo?: ISettingsImage;

  favicon?: ISettingsImage;

  socialLinks?: ISettingsSocialLinks;

  seo: ISettingsSeo;
}

/* -------------------------------------------------------------------------- */
/*                              Update Payload                                */
/* -------------------------------------------------------------------------- */

export interface IUpdateSettingsPayload {
  siteTitle?: string;

  siteDescription?: string;

  email?: string;

  phone?: string;

  address?: string;

  logo?: ISettingsImage;

  favicon?: ISettingsImage;

  socialLinks?: ISettingsSocialLinks;

  seo?: ISettingsSeo;
}

/* -------------------------------------------------------------------------- */
/*                              Route Params                                  */
/* -------------------------------------------------------------------------- */

export interface ISettingsParams {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                              Response Types                                */
/* -------------------------------------------------------------------------- */

export type ISettingsResponse = IApiResponse<ISettings>;

export type ICreateSettingsResponse = IApiResponse<ISettings>;

export type IUpdateSettingsResponse = IApiResponse<ISettings>;

export type IDeleteSettingsResponse = IApiResponse<null>;

/* -------------------------------------------------------------------------- */
/*                             Mutation Variables                             */
/* -------------------------------------------------------------------------- */

export interface IUpdateSettingsVariables {
  payload: IUpdateSettingsPayload;
}

/* -------------------------------------------------------------------------- */
/*                              Form Values                                   */
/* -------------------------------------------------------------------------- */

export interface ISettingsFormValues {
  siteTitle: string;

  siteDescription: string;

  email: string;

  phone: string;

  address: string;

  logoUrl: string;

  logoPublicId: string;

  faviconUrl: string;

  faviconPublicId: string;

  github: string;

  linkedin: string;

  twitter: string;

  facebook: string;

  instagram: string;

  youtube: string;

  leetcode: string;

  hackerrank: string;

  stackoverflow: string;

  metaTitle: string;

  metaDescription: string;

  metaKeywords: string;

  siteUrl: string;
}

/* -------------------------------------------------------------------------- */
/*                             Default Values                                 */
/* -------------------------------------------------------------------------- */

export const SETTINGS_DEFAULT_VALUES: ISettingsFormValues = {
  siteTitle: "",

  siteDescription: "",

  email: "",

  phone: "",

  address: "",

  logoUrl: "",

  logoPublicId: "",

  faviconUrl: "",

  faviconPublicId: "",

  github: "",

  linkedin: "",

  twitter: "",

  facebook: "",

  instagram: "",

  youtube: "",

  leetcode: "",

  hackerrank: "",

  stackoverflow: "",

  metaTitle: "",

  metaDescription: "",

  metaKeywords: "",

  siteUrl: "",
};
