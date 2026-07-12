// src\modules\testimonials\hooks\use-testimonial.ts

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { testimonialService } from "../services";

import type { ITestimonial, ITestimonialResponse } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UseTestimonialOptions {
  id: string;

  enabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             Use Testimonial                                */
/* -------------------------------------------------------------------------- */

export function useTestimonial({ id, enabled = true }: UseTestimonialOptions) {
  return useQuery<ITestimonialResponse, Error, ITestimonial>({
    queryKey: QUERY_KEYS.TESTIMONIALS.DETAIL(id),

    queryFn: async () => testimonialService.getTestimonialById(id),

    select: (response): ITestimonial => response.data,

    enabled: enabled && Boolean(id),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}
