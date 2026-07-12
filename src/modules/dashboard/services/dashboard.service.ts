// src\modules\dashboard\services\dashboard.service.ts
import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";

import { httpClient } from "@/shared/services/http-client";

import type { IDashboardResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                              Dashboard Service                             */
/* -------------------------------------------------------------------------- */

class DashboardService {
  /**
   * Get Dashboard Statistics
   */
  async getDashboardStats(): Promise<IDashboardResponse> {
    const response = await httpClient.get<IDashboardResponse>(
      API_ENDPOINTS.DASHBOARD,
    );

    return response.data;
  }

  /**
   * Alias for future compatibility
   */
  async getDashboard(): Promise<IDashboardResponse> {
    return this.getDashboardStats();
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const dashboardService = new DashboardService();
