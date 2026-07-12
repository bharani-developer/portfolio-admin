// src\modules\testimonials\hooks\use-update-testimonial.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { testimonialService } from "../services";

import type {
  IUpdateTestimonialResponse,
  IUpdateTestimonialVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                         Use Update Testimonial                             */
/* -------------------------------------------------------------------------- */

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateTestimonialResponse,
    Error,
    IUpdateTestimonialVariables
  >({
    mutationFn: async ({
      id,
      payload,
    }: IUpdateTestimonialVariables): Promise<IUpdateTestimonialResponse> =>
      testimonialService.updateTestimonial(id, payload),

    onSuccess: async (response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.TESTIMONIALS.ALL,
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.TESTIMONIALS.DETAIL(variables.id),
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DASHBOARD.ALL,
        }),
      ]);

      queryClient.setQueryData(
        QUERY_KEYS.TESTIMONIALS.DETAIL(variables.id),
        response,
      );
    },
  });
}
