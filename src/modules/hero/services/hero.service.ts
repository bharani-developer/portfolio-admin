// src\modules\hero\services\hero.service.ts

import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateHeroPayload,
  ICreateHeroResponse,
  IDeleteHeroResponse,
  IHeroResponse,
  IUpdateHeroPayload,
  IUpdateHeroResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                Hero Service                                */
/* -------------------------------------------------------------------------- */

class HeroService {
  /**
   * Get Hero Section
   */
  async getHero(): Promise<IHeroResponse> {
    const response = await httpClient.get<IHeroResponse>(API_ENDPOINTS.HERO);

    return response.data;
  }

  /**
   * Create Hero Section
   */
  async createHero(payload: ICreateHeroPayload): Promise<ICreateHeroResponse> {
    const response = await httpClient.post<ICreateHeroResponse>(
      API_ENDPOINTS.HERO,
      payload,
    );

    return response.data;
  }

  /**
   * Update Hero Section
   */
  async updateHero(payload: IUpdateHeroPayload): Promise<IUpdateHeroResponse> {
    const response = await httpClient.patch<IUpdateHeroResponse>(
      API_ENDPOINTS.HERO,
      payload,
    );

    return response.data;
  }

  /**
   * Delete Hero Section
   */
  async deleteHero(): Promise<IDeleteHeroResponse> {
    const response = await httpClient.delete<IDeleteHeroResponse>(
      API_ENDPOINTS.HERO,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const heroService = new HeroService();
