// src/modules/skills/hooks/use-update-skill.ts

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { queryClient } from "@/app/query-client";

import { QUERY_KEYS } from "@/constants/query-keys.constants";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { skillsService } from "../services";

import type {
  ISkill,
  ISkillsResponse,
  IUpdateSkillPayload,
  IUpdateSkillResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface UpdateSkillVariables {
  id: string;

  payload: IUpdateSkillPayload;
}

/* -------------------------------------------------------------------------- */
/*                            Update Skill Hook                               */
/* -------------------------------------------------------------------------- */

export function useUpdateSkill() {
  return useMutation<IUpdateSkillResponse, Error, UpdateSkillVariables>({
    mutationKey: [...QUERY_KEYS.SKILLS.ALL, "update"],

    mutationFn: ({ id, payload }) => skillsService.updateSkill(id, payload),

    onSuccess: (response, variables) => {
      const updatedSkill = response.data;

      queryClient.setQueryData<ISkill>(
        QUERY_KEYS.SKILLS.DETAIL(variables.id),
        updatedSkill,
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

            data: oldData.data.map((skill) =>
              skill._id === updatedSkill._id ? updatedSkill : skill,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SKILLS.LIST,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SKILLS.DETAIL(variables.id),
      });

      toast.success(response.message ?? "Skill updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
