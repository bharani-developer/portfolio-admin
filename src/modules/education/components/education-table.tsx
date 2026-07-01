// src\modules\education\components\education-table.tsx

import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, Pencil, Trash2, GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTable } from "@/components/table/data-table";
import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";
import type { IEducation } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface EducationTableProps {
  educations: IEducation[];

  meta?: IApiMeta | undefined;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onEdit: (education: IEducation) => void;

  onDelete: (education: IEducation) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Education Table                               */
/* -------------------------------------------------------------------------- */

export function EducationTable({
  educations,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
}: EducationTableProps): React.JSX.Element {
  const columns = useMemo<ColumnDef<IEducation>[]>(
    () => [
      {
        accessorKey: "institution",

        header: "Institution",

        cell: ({ row }) => {
          const education = row.original;

          return (
            <div className="flex items-center gap-3">
              {education.institutionLogo?.url ? (
                <img
                  src={education.institutionLogo.url}
                  alt={education.institution}
                  className="
                    size-10
                    rounded-md
                    border
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    bg-muted
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-md
                    border
                  "
                >
                  <GraduationCap className="size-5" aria-hidden="true" />
                </div>
              )}

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    font-medium
                  "
                >
                  {education.institution}
                </p>

                <p
                  className="
                    text-muted-foreground
                    truncate
                    text-xs
                  "
                >
                  {education.location}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "degree",

        header: "Degree",

        cell: ({ row }) => (
          <div className="space-y-1">
            <p className="font-medium">{row.original.degree}</p>

            <p
              className="
                text-muted-foreground
                text-xs
              "
            >
              {row.original.fieldOfStudy}
            </p>
          </div>
        ),
      },

      {
        accessorKey: "educationLevel",

        header: "Level",

        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.educationLevel}</Badge>
        ),
      },

      {
        accessorKey: "grade",

        header: "Grade",

        cell: ({ row }) =>
          row.original.grade ? (
            <span>{row.original.grade}</span>
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },

      {
        accessorKey: "isCurrent",

        header: "Current",

        cell: ({ row }) => (
          <Badge variant={row.original.isCurrent ? "default" : "outline"}>
            {row.original.isCurrent ? "Current" : "Completed"}
          </Badge>
        ),
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
        accessorKey: "sortOrder",

        header: "Order",
      },

      {
        id: "actions",

        header: "",

        enableSorting: false,

        cell: ({ row }) => {
          const education = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(education)}>
                  <Pencil className="size-4" aria-hidden="true" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(education)}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <div className="space-y-4">
      <DataTable<IEducation>
        data={educations}
        columns={columns}
        isLoading={isLoading}
      />

      {meta ? (
        <ServerTablePagination
          meta={meta}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      ) : null}
    </div>
  );
}
