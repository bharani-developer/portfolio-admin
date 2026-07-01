// src\modules\testimonials\hooks\use-create-testimonial.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { testimonialService } from "../services";

import type {
  ICreateTestimonialPayload,
  ICreateTestimonialResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                         Use Create Testimonial                             */
/* -------------------------------------------------------------------------- */

export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateTestimonialResponse,
    Error,
    ICreateTestimonialPayload
  >({
    mutationFn: async (
      payload: ICreateTestimonialPayload,
    ): Promise<ICreateTestimonialResponse> =>
      testimonialService.createTestimonial(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.TESTIMONIALS.ALL,
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DASHBOARD.ALL,
        }),
      ]);
    },
  });
}
