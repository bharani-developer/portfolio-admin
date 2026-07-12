// src/modules/skills/hooks/use-delete-skill.ts

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";
import { getErrorMessage } from "@/shared/lib/handle-error";

import { skillsService } from "../services";

import type { IDeleteSkillResponse, ISkill, ISkillsResponse } from "../types";

interface DeleteSkillVariables {
  id: string;
}

interface DeleteSkillContext {
  previousSkill: ISkill | undefined;

  previousLists: Array<[readonly unknown[], ISkillsResponse | undefined]>;
}

export function useDeleteSkill() {
  return useMutation<
    IDeleteSkillResponse,
    Error,
    DeleteSkillVariables,
    DeleteSkillContext
  >({
    mutationKey: [...QUERY_KEYS.SKILLS.ALL, "delete"],

    mutationFn: ({ id }) => skillsService.deleteSkill(id),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.SKILLS.ALL,
      });

      const previousSkill = queryClient.getQueryData<ISkill>(
        QUERY_KEYS.SKILLS.DETAIL(id),
      );

      const previousLists = queryClient.getQueriesData<ISkillsResponse>({
        queryKey: QUERY_KEYS.SKILLS.LIST,
      });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.SKILLS.DETAIL(id),
      });

      queryClient.setQueriesData<ISkillsResponse>(
        {
          queryKey: QUERY_KEYS.SKILLS.LIST,
        },
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,

            data: oldData.data.filter((skill) => skill._id !== id),
          };
        },
      );

      return {
        previousSkill,
        previousLists,
      };
    },

    onSuccess: (response, variables) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.SKILLS.DETAIL(variables.id),
      });

      toast.success(response.message ?? "Skill deleted successfully.");
    },

    onError: (error, variables, context) => {
      if (context?.previousSkill) {
        queryClient.setQueryData<ISkill>(
          QUERY_KEYS.SKILLS.DETAIL(variables.id),
          context.previousSkill,
        );
      }

      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error(getErrorMessage(error));
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SKILLS.LIST,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SKILLS.DETAIL(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SKILLS.ALL,
      });
    },
  });
}
