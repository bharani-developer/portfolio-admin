// src\modules\testimonials\hooks\use-delete-testimonial.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { testimonialService } from "../services";

import type {
  IDeleteTestimonialResponse,
  IDeleteTestimonialVariables,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                         Use Delete Testimonial                             */
/* -------------------------------------------------------------------------- */

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteTestimonialResponse,
    Error,
    IDeleteTestimonialVariables
  >({
    mutationFn: async ({
      id,
    }: IDeleteTestimonialVariables): Promise<IDeleteTestimonialResponse> =>
      testimonialService.deleteTestimonial(id),

    onSuccess: async (_response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.TESTIMONIALS.ALL,
        }),

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.DASHBOARD.ALL,
        }),
      ]);

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.TESTIMONIALS.DETAIL(variables.id),
      });
    },
  });
}
