// src/modules/skills/hooks/use-create-skill.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { skillsService } from "../services";

import type {
  ICreateSkillPayload,
  ICreateSkillResponse,
  ISkill,
  ISkillsResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                            Create Skill Hook                               */
/* -------------------------------------------------------------------------- */

export function useCreateSkill() {
  return useMutation<ICreateSkillResponse, Error, ICreateSkillPayload>({
    mutationKey: [...QUERY_KEYS.SKILLS.ALL, "create"],

    mutationFn: (payload) => skillsService.createSkill(payload),

    onSuccess: (response) => {
      const createdSkill = response.data;

      queryClient.setQueryData<ISkill>(
        QUERY_KEYS.SKILLS.DETAIL(createdSkill._id),
        createdSkill,
      );

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

            data: [createdSkill, ...oldData.data],
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SKILLS.LIST,
      });

      toast.success(response.message ?? "Skill created successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
