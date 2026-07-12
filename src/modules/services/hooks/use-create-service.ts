// src\modules\services\hooks\use-create-service.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { servicesService } from "../services";

import type {
  ICreateServicePayload,
  ICreateServiceResponse,
  IService,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                            Use Create Service                              */
/* -------------------------------------------------------------------------- */

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation<ICreateServiceResponse, Error, ICreateServicePayload>({
    mutationFn: async (payload: ICreateServicePayload) =>
      servicesService.createService(payload),

    onSuccess: (response): void => {
      const createdService: IService = response.data;

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SERVICES.LIST,
      });

      queryClient.setQueryData(
        QUERY_KEYS.SERVICES.DETAIL(createdService._id),
        response,
      );
    },
  });
}
