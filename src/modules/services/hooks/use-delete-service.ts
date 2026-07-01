// src\modules\services\hooks\use-delete-service.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/shared/constants/query-keys";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { servicesService } from "../services";

import type {
  IDeleteServiceResponse,
  IService,
  IServicesResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface DeleteServiceVariables {
  id: string;
}

/* -------------------------------------------------------------------------- */
/*                            Delete Service Hook                             */
/* -------------------------------------------------------------------------- */

export function useDeleteService() {
  return useMutation<IDeleteServiceResponse, Error, DeleteServiceVariables>({
    mutationKey: [...QUERY_KEYS.SERVICES.ALL, "delete"],

    mutationFn: ({ id }) => servicesService.deleteService(id),

    onSuccess: (response, variables) => {
      const deletedService: IService = response.data;

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.SERVICES.DETAIL(variables.id),
      });

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

            data: oldData.data.filter(
              (service) => service._id !== deletedService._id,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SERVICES.LIST,
      });

      toast.success(response.message ?? "Service deleted successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
