// src/modules/projects/services/projects.service.ts

import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";

import { httpClient } from "@/shared/services/http-client";

import type {
  ICreateProjectPayload,
  ICreateProjectResponse,
  IDeleteProjectResponse,
  IProjectResponse,
  IProjectsQueryParams,
  IProjectsResponse,
  IUpdateProjectPayload,
  IUpdateProjectResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                              Projects Service                              */
/* -------------------------------------------------------------------------- */

class ProjectsService {
  /* ------------------------------------------------------------------------ */
  /*                             Get Projects List                            */
  /* ------------------------------------------------------------------------ */

  async getProjects(
    params: IProjectsQueryParams,
  ): Promise<IProjectsResponse> {
    const response = await httpClient.get<IProjectsResponse>(
      API_ENDPOINTS.PROJECTS,
      {
        params,
      },
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                            Get Project By Id                             */
  /* ------------------------------------------------------------------------ */

  async getProjectById(
    id: string,
  ): Promise<IProjectResponse> {
    const response = await httpClient.get<IProjectResponse>(
      `${API_ENDPOINTS.PROJECTS}/${id}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                           Get Project By Slug                            */
  /* ------------------------------------------------------------------------ */

  async getProjectBySlug(
    slug: string,
  ): Promise<IProjectResponse> {
    const response = await httpClient.get<IProjectResponse>(
      `${API_ENDPOINTS.PROJECTS}/slug/${slug}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Get Featured Projects                            */
  /* ------------------------------------------------------------------------ */

  async getFeaturedProjects(): Promise<IProjectsResponse> {
    const response = await httpClient.get<IProjectsResponse>(
      `${API_ENDPOINTS.PROJECTS}/featured`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Get Active Projects                             */
  /* ------------------------------------------------------------------------ */

  async getActiveProjects(): Promise<IProjectsResponse> {
    const response = await httpClient.get<IProjectsResponse>(
      `${API_ENDPOINTS.PROJECTS}/active`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                        Get Projects By Category                          */
  /* ------------------------------------------------------------------------ */

  async getProjectsByCategory(
    category: string,
  ): Promise<IProjectsResponse> {
    const response = await httpClient.get<IProjectsResponse>(
      `${API_ENDPOINTS.PROJECTS}/category/${category}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                       Get Projects By Technology                         */
  /* ------------------------------------------------------------------------ */

  async getProjectsByTechnology(
    technology: string,
  ): Promise<IProjectsResponse> {
    const response = await httpClient.get<IProjectsResponse>(
      `${API_ENDPOINTS.PROJECTS}/technology/${technology}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Get Projects By Status                           */
  /* ------------------------------------------------------------------------ */

  async getProjectsByStatus(
    status: string,
  ): Promise<IProjectsResponse> {
    const response = await httpClient.get<IProjectsResponse>(
      `${API_ENDPOINTS.PROJECTS}/status/${status}`,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Create Project                               */
  /* ------------------------------------------------------------------------ */

  async createProject(
    payload: ICreateProjectPayload,
  ): Promise<ICreateProjectResponse> {
    const response = await httpClient.post<ICreateProjectResponse>(
      API_ENDPOINTS.PROJECTS,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Update Project                               */
  /* ------------------------------------------------------------------------ */

  async updateProject(
    id: string,
    payload: IUpdateProjectPayload,
  ): Promise<IUpdateProjectResponse> {
    const response = await httpClient.patch<IUpdateProjectResponse>(
      `${API_ENDPOINTS.PROJECTS}/${id}`,
      payload,
    );

    return response.data;
  }

  /* ------------------------------------------------------------------------ */
  /*                             Delete Project                               */
  /* ------------------------------------------------------------------------ */

  async deleteProject(
    id: string,
  ): Promise<IDeleteProjectResponse> {
    const response = await httpClient.delete<IDeleteProjectResponse>(
      `${API_ENDPOINTS.PROJECTS}/${id}`,
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const projectsService = new ProjectsService();