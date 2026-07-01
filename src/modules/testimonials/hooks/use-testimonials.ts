// src/modules/testimonials/hooks/use-testimonials.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { testimonialService } from "../services";

import type {
  ITestimonialQueryParams,
  ITestimonialsResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                            Use Testimonials                                */
/* -------------------------------------------------------------------------- */

export function useTestimonials(
  params?: ITestimonialQueryParams,
) {
  return useQuery<
    ITestimonialsResponse,
    Error,
    ITestimonialsResponse
  >({
    queryKey: QUERY_KEYS.TESTIMONIALS.LIST(
      params as Record<string, unknown> | undefined,
    ),

    queryFn: async () =>
      testimonialService.getTestimonials(params),

    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}