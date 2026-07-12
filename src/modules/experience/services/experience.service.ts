// src/modules/experience/services/experience.service.ts

import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateExperiencePayload,
  ICreateExperienceResponse,
  IDeleteExperienceResponse,
  IExperienceQueryParams,
  IExperienceResponse,
  IExperiencesResponse,
  IUpdateExperiencePayload,
  IUpdateExperienceResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                            Experience Service                              */
/* -------------------------------------------------------------------------- */

class ExperienceService {
  /* ------------------------------------------------------------------------ */
  /*                             Get Experiences                              */
  /* ------------------------------------------------------------------------ */

  async getExperiences(
    params?: IExperienceQueryParams,
  ): Promise<IExperiencesResponse> {
    const response = await httpClient.get<IExperiencesResponse>(
      API_ENDPOINTS.EXPERIENCE,
      {
        params,
      },
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Get Experience By Id                           */
  /* ------------------------------------------------------------------------ */

  async getExperienceById(id: string): Promise<IExperienceResponse> {
    const response = await httpClient.get<IExperienceResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/${id}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Get Experience By Slug                           */
  /* ------------------------------------------------------------------------ */

  async getExperienceBySlug(slug: string): Promise<IExperienceResponse> {
    const response = await httpClient.get<IExperienceResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/slug/${slug}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Get Active Experiences                           */
  /* ------------------------------------------------------------------------ */

  async getActiveExperiences(): Promise<IExperiencesResponse> {
    const response = await httpClient.get<IExperiencesResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/active`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                        Get Current Experiences                           */
  /* ------------------------------------------------------------------------ */

  async getCurrentExperiences(): Promise<IExperiencesResponse> {
    const response = await httpClient.get<IExperiencesResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/current`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                      Get Experiences By Company                          */
  /* ------------------------------------------------------------------------ */

  async getExperiencesByCompany(
    company: string,
  ): Promise<IExperiencesResponse> {
    const response = await httpClient.get<IExperiencesResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/company/${company}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                    Get Experiences By Technology                         */
  /* ------------------------------------------------------------------------ */

  async getExperiencesByTechnology(
    technology: string,
  ): Promise<IExperiencesResponse> {
    const response = await httpClient.get<IExperiencesResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/technology/${technology}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Create Experience                              */
  /* ------------------------------------------------------------------------ */

  async createExperience(
    payload: ICreateExperiencePayload,
  ): Promise<ICreateExperienceResponse> {
    const response = await httpClient.post<ICreateExperienceResponse>(
      API_ENDPOINTS.EXPERIENCE,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Update Experience                              */
  /* ------------------------------------------------------------------------ */

  async updateExperience(
    id: string,
    payload: IUpdateExperiencePayload,
  ): Promise<IUpdateExperienceResponse> {
    const response = await httpClient.patch<IUpdateExperienceResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/${id}`,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Delete Experience                              */
  /* ------------------------------------------------------------------------ */

  async deleteExperience(id: string): Promise<IDeleteExperienceResponse> {
    const response = await httpClient.delete<IDeleteExperienceResponse>(
      `${API_ENDPOINTS.EXPERIENCE}/${id}`,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const experienceService = new ExperienceService();
