import type { IBaseEntity, IApiResponse, IImage } from "@/shared/types";

import type { HeroFormValues } from "../schemas/hero.schema";

/* -------------------------------------------------------------------------- */
/*                                   Entity                                   */
/* -------------------------------------------------------------------------- */

export interface IHero extends IBaseEntity {
  title: string;

  subtitle: string;

  description: string;

  profileImage?: IImage;

  resumeUrl?: string;

  ctaButtonText?: string;

  ctaButtonLink?: string;

  technologies: string[];

  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Create Payload                              */
/* -------------------------------------------------------------------------- */

export interface ICreateHeroPayload {
  title: string;

  subtitle: string;

  description: string;

  profileImage?: IImage;

  resumeUrl?: string;

  ctaButtonText?: string;

  ctaButtonLink?: string;

  technologies?: string[];

  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Update Payload                              */
/* -------------------------------------------------------------------------- */

export type IUpdateHeroPayload = Partial<ICreateHeroPayload>;

/* -------------------------------------------------------------------------- */
/*                               Upload Payload                               */
/* -------------------------------------------------------------------------- */

export interface IHeroImagePayload {
  profileImage: IImage;
}

/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

export interface IHeroQueryParams {
  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type IHeroResponse = IApiResponse<IHero>;

export type ICreateHeroResponse = IApiResponse<IHero>;

export type IUpdateHeroResponse = IApiResponse<IHero>;

export type IDeleteHeroResponse = IApiResponse<null>;

/* -------------------------------------------------------------------------- */
/*                             Service Response Map                           */
/* -------------------------------------------------------------------------- */

export interface IHeroMutations {
  create: ICreateHeroResponse;

  update: IUpdateHeroResponse;

  delete: IDeleteHeroResponse;
}

/* -------------------------------------------------------------------------- */
/*                               Default Values                               */
/* -------------------------------------------------------------------------- */

export const HERO_DEFAULT_VALUES: HeroFormValues = {
  title: "",

  subtitle: "",

  description: "",

  profileImage: null,

  resumeUrl: "",

  ctaButtonText: "",

  ctaButtonLink: "",

  technologies: [],

  isActive: true,
};
