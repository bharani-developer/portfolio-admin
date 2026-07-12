// src/modules/certifications/services/certifications.service.ts

import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICertificationQueryParams,
  ICertificationResponse,
  ICertificationsResponse,
  ICreateCertificationPayload,
  ICreateCertificationResponse,
  IDeleteCertificationResponse,
  IUpdateCertificationPayload,
  IUpdateCertificationResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Certification Service                            */
/* -------------------------------------------------------------------------- */

class CertificationService {
  /* ------------------------------------------------------------------------ */
  /*                             List Certifications                          */
  /* ------------------------------------------------------------------------ */

  async getCertifications(
    params?: ICertificationQueryParams,
  ): Promise<ICertificationsResponse> {
    const response = await httpClient.get<ICertificationsResponse>(
      API_ENDPOINTS.CERTIFICATIONS,
      {
        params,
      },
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Get Certification By Id                         */
  /* ------------------------------------------------------------------------ */

  async getCertificationById(id: string): Promise<ICertificationResponse> {
    const response = await httpClient.get<ICertificationResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/${id}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                        Get Certification By Slug                         */
  /* ------------------------------------------------------------------------ */

  async getCertificationBySlug(slug: string): Promise<ICertificationResponse> {
    const response = await httpClient.get<ICertificationResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/slug/${slug}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                      Get Active Certifications                           */
  /* ------------------------------------------------------------------------ */

  async getActiveCertifications(): Promise<ICertificationsResponse> {
    const response = await httpClient.get<ICertificationsResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/active`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                      Get Valid Certifications                            */
  /* ------------------------------------------------------------------------ */

  async getValidCertifications(): Promise<ICertificationsResponse> {
    const response = await httpClient.get<ICertificationsResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/valid`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                     Get Expired Certifications                           */
  /* ------------------------------------------------------------------------ */

  async getExpiredCertifications(): Promise<ICertificationsResponse> {
    const response = await httpClient.get<ICertificationsResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/expired`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                      Get Certifications By Issuer                        */
  /* ------------------------------------------------------------------------ */

  async getCertificationsByIssuer(
    issuer: string,
  ): Promise<ICertificationsResponse> {
    const response = await httpClient.get<ICertificationsResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/issuer/${issuer}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                      Get Certifications By Skill                         */
  /* ------------------------------------------------------------------------ */

  async getCertificationsBySkill(
    skill: string,
  ): Promise<ICertificationsResponse> {
    const response = await httpClient.get<ICertificationsResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/skill/${skill}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Create Certification                             */
  /* ------------------------------------------------------------------------ */

  async createCertification(
    payload: ICreateCertificationPayload,
  ): Promise<ICreateCertificationResponse> {
    const response = await httpClient.post<ICreateCertificationResponse>(
      API_ENDPOINTS.CERTIFICATIONS,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Update Certification                             */
  /* ------------------------------------------------------------------------ */

  async updateCertification(
    id: string,
    payload: IUpdateCertificationPayload,
  ): Promise<IUpdateCertificationResponse> {
    const response = await httpClient.patch<IUpdateCertificationResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/${id}`,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Delete Certification                             */
  /* ------------------------------------------------------------------------ */

  async deleteCertification(id: string): Promise<IDeleteCertificationResponse> {
    const response = await httpClient.delete<IDeleteCertificationResponse>(
      `${API_ENDPOINTS.CERTIFICATIONS}/${id}`,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const certificationService = new CertificationService();
