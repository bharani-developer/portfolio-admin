// src\modules\settings\services\settings.service.ts

import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateSettingsPayload,
  ICreateSettingsResponse,
  IDeleteSettingsResponse,
  ISettingsResponse,
  IUpdateSettingsPayload,
  IUpdateSettingsResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                              Settings Service                              */
/* -------------------------------------------------------------------------- */

class SettingsService {
  /**
   * Get Settings
   */
  async getSettings(): Promise<ISettingsResponse> {
    const response = await httpClient.get<ISettingsResponse>(
      API_ENDPOINTS.SETTINGS,
    );

    return response.data;
  }

  /**
   * Create Settings
   */
  async createSettings(
    payload: ICreateSettingsPayload,
  ): Promise<ICreateSettingsResponse> {
    const response = await httpClient.post<ICreateSettingsResponse>(
      API_ENDPOINTS.SETTINGS,
      payload,
    );

    return response.data;
  }

  /**
   * Update Settings
   */
  async updateSettings(
    payload: IUpdateSettingsPayload,
  ): Promise<IUpdateSettingsResponse> {
    const response = await httpClient.patch<IUpdateSettingsResponse>(
      API_ENDPOINTS.SETTINGS,
      payload,
    );

    return response.data;
  }

  /**
   * Delete Settings
   */
  async deleteSettings(): Promise<IDeleteSettingsResponse> {
    const response = await httpClient.delete<IDeleteSettingsResponse>(
      API_ENDPOINTS.SETTINGS,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const settingsService = new SettingsService();
