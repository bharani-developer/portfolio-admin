// src\modules\services\hooks\use-update-service.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { servicesService } from "../services";

import type {
  IService,
  IServicesResponse,
  IUpdateServicePayload,
  IUpdateServiceResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UpdateServiceVariables {
  id: string;

  payload: IUpdateServicePayload;
}

/* -------------------------------------------------------------------------- */
/*                            Update Service Hook                             */
/* -------------------------------------------------------------------------- */

export function useUpdateService() {
  return useMutation<IUpdateServiceResponse, Error, UpdateServiceVariables>({
    mutationKey: [...QUERY_KEYS.SERVICES.ALL, "update"],

    mutationFn: ({ id, payload }) => servicesService.updateService(id, payload),

    onSuccess: (response, variables) => {
      const updatedService = response.data;

      queryClient.setQueryData<IService>(
        QUERY_KEYS.SERVICES.DETAIL(variables.id),
        updatedService,
      );

      queryClient.setQueriesData<IServicesResponse>(
        {
          queryKey: QUERY_KEYS.SERVICES.LIST,
        },
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,

            data: oldData.data.map((service) =>
              service._id === updatedService._id ? updatedService : service,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SERVICES.LIST,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SERVICES.DETAIL(variables.id),
      });

      toast.success(response.message ?? "Service updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
