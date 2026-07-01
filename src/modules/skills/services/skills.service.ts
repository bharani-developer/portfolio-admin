// src\modules\skills\services\skills.service.ts

import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateSkillPayload,
  ICreateSkillResponse,
  IDeleteSkillResponse,
  ISkillResponse,
  ISkillsQueryParams,
  ISkillsResponse,
  IUpdateSkillPayload,
  IUpdateSkillResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                               Skills Service                               */
/* -------------------------------------------------------------------------- */

class SkillsService {
  /**
   * Get Skills List
   */
  async getSkills(params?: ISkillsQueryParams): Promise<ISkillsResponse> {
    const response = await httpClient.get<ISkillsResponse>(
      API_ENDPOINTS.SKILLS,
      {
        params,
      },
    );

    return response.data;
  }

  /**
   * Get Skill By Id
   */
  async getSkillById(id: string): Promise<ISkillResponse> {
    const response = await httpClient.get<ISkillResponse>(
      `${API_ENDPOINTS.SKILLS}/${id}`,
    );

    return response.data;
  }

  /**
   * Create Skill
   */
  async createSkill(
    payload: ICreateSkillPayload,
  ): Promise<ICreateSkillResponse> {
    const response = await httpClient.post<ICreateSkillResponse>(
      API_ENDPOINTS.SKILLS,
      payload,
    );

    return response.data;
  }

  /**
   * Update Skill
   */
  async updateSkill(
    id: string,
    payload: IUpdateSkillPayload,
  ): Promise<IUpdateSkillResponse> {
    const response = await httpClient.patch<IUpdateSkillResponse>(
      `${API_ENDPOINTS.SKILLS}/${id}`,
      payload,
    );

    return response.data;
  }

  /**
   * Delete Skill
   */
  async deleteSkill(id: string): Promise<IDeleteSkillResponse> {
    const response = await httpClient.delete<IDeleteSkillResponse>(
      `${API_ENDPOINTS.SKILLS}/${id}`,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const skillsService = new SkillsService();
