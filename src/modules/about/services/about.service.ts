// src/modules/about/services/about.service.ts

import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";

import { httpClient } from "@/shared/services/http-client";

import type {
  IAboutResponse,
  ICreateAboutPayload,
  ICreateAboutResponse,
  IDeleteAboutResponse,
  IUpdateAboutPayload,
  IUpdateAboutResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                               About Service                                */
/* -------------------------------------------------------------------------- */

class AboutService {
  /**
   * Get About Section
   */
  async getAbout(): Promise<IAboutResponse> {
    const response = await httpClient.get<IAboutResponse>(API_ENDPOINTS.ABOUT);

    return response.data;
  }

  /**
   * Create About Section
   */
  async createAbout(
    payload: ICreateAboutPayload,
  ): Promise<ICreateAboutResponse> {
    const response = await httpClient.post<ICreateAboutResponse>(
      API_ENDPOINTS.ABOUT,
      payload,
    );

    return response.data;
  }

  /**
   * Update About Section
   */
  async updateAbout(
    payload: IUpdateAboutPayload,
  ): Promise<IUpdateAboutResponse> {
    const response = await httpClient.patch<IUpdateAboutResponse>(
      API_ENDPOINTS.ABOUT,
      payload,
    );

    return response.data;
  }

  /**
   * Delete About Section
   */
  async deleteAbout(): Promise<IDeleteAboutResponse> {
    const response = await httpClient.delete<IDeleteAboutResponse>(
      API_ENDPOINTS.ABOUT,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const aboutService = new AboutService();
