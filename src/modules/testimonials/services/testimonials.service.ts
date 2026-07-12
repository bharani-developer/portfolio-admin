// src/modules/testimonials/services/testimonials.service.ts

import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";
import { httpClient } from "@/shared/services/http-client";

import type {
  IAverageRatingResponse,
  ICreateTestimonialPayload,
  ICreateTestimonialResponse,
  IDeleteTestimonialResponse,
  ITestimonialQueryParams,
  ITestimonialResponse,
  ITestimonialsResponse,
  IUpdateTestimonialPayload,
  IUpdateTestimonialResponse,
  TClientType,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                           Testimonial Service                              */
/* -------------------------------------------------------------------------- */

class TestimonialService {
  /* ------------------------------------------------------------------------ */
  /*                            Get Testimonials                              */
  /* ------------------------------------------------------------------------ */

  async getTestimonials(
    params?: ITestimonialQueryParams,
  ): Promise<ITestimonialsResponse> {
    const { data } = await httpClient.get<ITestimonialsResponse>(
      API_ENDPOINTS.TESTIMONIALS,
      {
        params,
      },
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Get Testimonial By Id                           */
  /* ------------------------------------------------------------------------ */

  async getTestimonialById(id: string): Promise<ITestimonialResponse> {
    const { data } = await httpClient.get<ITestimonialResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/${id}`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                      Get Featured Testimonials                           */
  /* ------------------------------------------------------------------------ */

  async getFeaturedTestimonials(): Promise<ITestimonialsResponse> {
    const { data } = await httpClient.get<ITestimonialsResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/featured`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                       Get Active Testimonials                            */
  /* ------------------------------------------------------------------------ */

  async getActiveTestimonials(): Promise<ITestimonialsResponse> {
    const { data } = await httpClient.get<ITestimonialsResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/active`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                         Get Average Rating                               */
  /* ------------------------------------------------------------------------ */

  async getAverageRating(): Promise<IAverageRatingResponse> {
    const { data } = await httpClient.get<IAverageRatingResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/average-rating`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                        Get Testimonials By Rating                        */
  /* ------------------------------------------------------------------------ */

  async getTestimonialsByRating(
    rating: number,
  ): Promise<ITestimonialsResponse> {
    const { data } = await httpClient.get<ITestimonialsResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/rating/${rating}`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                     Get Testimonials By Client Type                      */
  /* ------------------------------------------------------------------------ */

  async getTestimonialsByClientType(
    clientType: TClientType,
  ): Promise<ITestimonialsResponse> {
    const { data } = await httpClient.get<ITestimonialsResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/client-type/${clientType}`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                    Get Testimonials By Project Name                      */
  /* ------------------------------------------------------------------------ */

  async getTestimonialsByProjectName(
    projectName: string,
  ): Promise<ITestimonialsResponse> {
    const { data } = await httpClient.get<ITestimonialsResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/project/${projectName}`,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Create Testimonial                              */
  /* ------------------------------------------------------------------------ */

  async createTestimonial(
    payload: ICreateTestimonialPayload,
  ): Promise<ICreateTestimonialResponse> {
    const { data } = await httpClient.post<ICreateTestimonialResponse>(
      API_ENDPOINTS.TESTIMONIALS,
      payload,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Update Testimonial                              */
  /* ------------------------------------------------------------------------ */

  async updateTestimonial(
    id: string,
    payload: IUpdateTestimonialPayload,
  ): Promise<IUpdateTestimonialResponse> {
    const { data } = await httpClient.patch<IUpdateTestimonialResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/${id}`,
      payload,
    );

    return data;
  }

  /* ------------------------------------------------------------------------ */
  /*                          Delete Testimonial                              */
  /* ------------------------------------------------------------------------ */

  async deleteTestimonial(id: string): Promise<IDeleteTestimonialResponse> {
    const { data } = await httpClient.delete<IDeleteTestimonialResponse>(
      `${API_ENDPOINTS.TESTIMONIALS}/${id}`,
    );

    return data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const testimonialService = new TestimonialService();
