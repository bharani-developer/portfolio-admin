// src/modules/services/services/services.service.ts

import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateServicePayload,
  ICreateServiceResponse,
  IDeleteServiceResponse,
  IServiceResponse,
  IServicesQueryParams,
  IServicesResponse,
  IUpdateServicePayload,
  IUpdateServiceResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                              Services Service                              */
/* -------------------------------------------------------------------------- */

class ServicesService {
  /* ------------------------------------------------------------------------ */
  /*                              Get Services                                */
  /* ------------------------------------------------------------------------ */

  async getServices(
    params: IServicesQueryParams,
  ): Promise<IServicesResponse> {
    const response =
      await httpClient.get<IServicesResponse>(
        API_ENDPOINTS.SERVICES,
        {
          params,
        },
      );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                              Get Service                                 */
  /* ------------------------------------------------------------------------ */

  async getServiceById(
    id: string,
  ): Promise<IServiceResponse> {
    const response =
      await httpClient.get<IServiceResponse>(
        `${API_ENDPOINTS.SERVICES}/${id}`,
      );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Create Service                               */
  /* ------------------------------------------------------------------------ */

  async createService(
    payload: ICreateServicePayload,
  ): Promise<ICreateServiceResponse> {
    const response =
      await httpClient.post<ICreateServiceResponse>(
        API_ENDPOINTS.SERVICES,
        payload,
      );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Update Service                               */
  /* ------------------------------------------------------------------------ */

  async updateService(
    id: string,
    payload: IUpdateServicePayload,
  ): Promise<IUpdateServiceResponse> {
    const response =
      await httpClient.patch<IUpdateServiceResponse>(
        `${API_ENDPOINTS.SERVICES}/${id}`,
        payload,
      );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Delete Service                               */
  /* ------------------------------------------------------------------------ */

  async deleteService(
    id: string,
  ): Promise<IDeleteServiceResponse> {
    const response =
      await httpClient.delete<IDeleteServiceResponse>(
        `${API_ENDPOINTS.SERVICES}/${id}`,
      );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const servicesService =
  new ServicesService();

export default servicesService;