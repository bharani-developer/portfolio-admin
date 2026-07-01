// src/modules/skills/components/skills-table.tsx

import { useMemo } from "react";

import type { ReactElement } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { Edit, Eye, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";

import { DataTable } from "@/components/table/data-table";

import { useConfirmation } from "@/shared/hooks/use-confirmation";

import { useDeleteSkill } from "../hooks";

import type { ISkill } from "../types";
import type { IApiMeta } from "@/shared/types";
import { ServerTablePagination } from "@/components/table/server-table-pagination";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SkillsTableProps {
  skills: ISkill[];

  meta?: IApiMeta;

  page: number;

  limit: number;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onEdit?: (skill: ISkill) => void;
}

/* -------------------------------------------------------------------------- */
/*                               Skills Table                                 */
/* -------------------------------------------------------------------------- */

export function SkillsTable({
  skills,
  meta,

  isLoading = false,
  onPageChange,
  onLimitChange,
  onEdit,
}: SkillsTableProps): ReactElement {
  const confirmation = useConfirmation();

  const deleteSkillMutation = useDeleteSkill();

  const columns = useMemo<ColumnDef<ISkill>[]>(
    () => [
      {
        accessorKey: "name",

        header: "Skill",

        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>

            {row.original.description ? (
              <p
                className="
                  mt-1
                  line-clamp-1
                  text-xs
                  text-muted-foreground
                "
              >
                {row.original.description}
              </p>
            ) : null}
          </div>
        ),
      },

      {
        accessorKey: "category",

        header: "Category",

        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.category}</Badge>
        ),
      },

      {
        accessorKey: "proficiency",

        header: "Proficiency",

        cell: ({ row }) => (
          <div className="w-[220px] space-y-2">
            <div
              className="
                flex
                items-center
                justify-between
                text-xs
              "
            >
              <span>{row.original.proficiency}%</span>
            </div>

            <Progress value={row.original.proficiency} />
          </div>
        ),
      },

      {
        accessorKey: "sortOrder",

        header: "Order",
      },

      {
        accessorKey: "isActive",

        header: "Status",

        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? "default" : "secondary"}>
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      },

      {
        id: "actions",

        header: () => (
          <div
            className="
        flex
        justify-center
      "
          >
            Actions
          </div>
        ),

        enableSorting: false,

        cell: ({ row }) => {
          const skill = row.original;

          return (
            <div
              className="
          flex
          items-center
          justify-center
          gap-2
        "
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`View ${skill.name}`}
              >
                <Eye className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Edit ${skill.name}`}
                onClick={() => onEdit?.(skill)}
              >
                <Edit className="size-4" />
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Delete ${skill.name}`}
                disabled={deleteSkillMutation.isPending}
                onClick={async () => {
                  const confirmed = await confirmation.confirm({
                    title: "Delete Skill",

                    description: `Are you sure you want to delete "${skill.name}"? This action cannot be undone.`,

                    confirmText: "Delete",

                    cancelText: "Cancel",

                    destructive: true,
                  });

                  if (!confirmed) {
                    return;
                  }

                  deleteSkillMutation.mutate({
                    id: skill._id,
                  });
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [confirmation, deleteSkillMutation, onEdit],
  );

  return (
    <div className="space-y-4">
      <DataTable<ISkill>
        data={skills}
        columns={columns}
        isLoading={isLoading}
      />

      {meta && (
        <ServerTablePagination
          meta={meta}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      )}
    </div>
  );
}

export default SkillsTable;
