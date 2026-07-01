// src/modules/education/services/education.service.ts

import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateEducationPayload,
  ICreateEducationResponse,
  IDeleteEducationResponse,
  IEducationQueryParams,
  IEducationResponse,
  IEducationsResponse,
  IUpdateEducationPayload,
  IUpdateEducationResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                             Education Service                              */
/* -------------------------------------------------------------------------- */

class EducationService {
  /* ------------------------------------------------------------------------ */
  /*                               Get Educations                             */
  /* ------------------------------------------------------------------------ */

  async getEducations(
    params?: IEducationQueryParams,
  ): Promise<IEducationsResponse> {
    const response = await httpClient.get<IEducationsResponse>(
      API_ENDPOINTS.EDUCATION,
      {
        params,
      },
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Get Education By Id                          */
  /* ------------------------------------------------------------------------ */

  async getEducationById(
    id: string,
  ): Promise<IEducationResponse> {
    const response = await httpClient.get<IEducationResponse>(
      `${API_ENDPOINTS.EDUCATION}/${id}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Get Education By Slug                          */
  /* ------------------------------------------------------------------------ */

  async getEducationBySlug(
    slug: string,
  ): Promise<IEducationResponse> {
    const response = await httpClient.get<IEducationResponse>(
      `${API_ENDPOINTS.EDUCATION}/slug/${slug}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Get Active Educations                          */
  /* ------------------------------------------------------------------------ */

  async getActiveEducations(): Promise<IEducationsResponse> {
    const response = await httpClient.get<IEducationsResponse>(
      `${API_ENDPOINTS.EDUCATION}/active`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Get Current Educations                          */
  /* ------------------------------------------------------------------------ */

  async getCurrentEducations(): Promise<IEducationsResponse> {
    const response = await httpClient.get<IEducationsResponse>(
      `${API_ENDPOINTS.EDUCATION}/current`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Get Educations By Level                        */
  /* ------------------------------------------------------------------------ */

  async getEducationsByLevel(
    level: string,
  ): Promise<IEducationsResponse> {
    const response = await httpClient.get<IEducationsResponse>(
      `${API_ENDPOINTS.EDUCATION}/level/${level}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Get Educations By Skill                        */
  /* ------------------------------------------------------------------------ */

  async getEducationsBySkill(
    skill: string,
  ): Promise<IEducationsResponse> {
    const response = await httpClient.get<IEducationsResponse>(
      `${API_ENDPOINTS.EDUCATION}/skill/${skill}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Create Education                              */
  /* ------------------------------------------------------------------------ */

  async createEducation(
    payload: ICreateEducationPayload,
  ): Promise<ICreateEducationResponse> {
    const response = await httpClient.post<ICreateEducationResponse>(
      API_ENDPOINTS.EDUCATION,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Update Education                              */
  /* ------------------------------------------------------------------------ */

  async updateEducation(
    id: string,
    payload: IUpdateEducationPayload,
  ): Promise<IUpdateEducationResponse> {
    const response = await httpClient.patch<IUpdateEducationResponse>(
      `${API_ENDPOINTS.EDUCATION}/${id}`,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Delete Education                              */
  /* ------------------------------------------------------------------------ */

  async deleteEducation(
    id: string,
  ): Promise<IDeleteEducationResponse> {
    const response = await httpClient.delete<IDeleteEducationResponse>(
      `${API_ENDPOINTS.EDUCATION}/${id}`,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const educationService = new EducationService();