import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { Building2, Eye, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { DeleteDialog } from "@/components/table/delete-dialog";
import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";

import { useDeleteExperience } from "../hooks";

import type { IExperience } from "../types";

interface ExperienceTableProps {
  experiences: IExperience[];

  meta?: IApiMeta | undefined;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onEdit: (experience: IExperience) => void;
}

function formatDate(date?: string | null): string {
  if (!date) {
    return "Present";
  }

  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
  }).format(new Date(date));
}

export function ExperienceTable({
  experiences,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onEdit,
}: ExperienceTableProps): React.JSX.Element {
  const deleteMutation = useDeleteExperience();

  const columns = useMemo<ColumnDef<IExperience>[]>(
    () => [
      {
        accessorKey: "company",

        header: "Company",

        cell: ({ row }) => {
          const experience = row.original;

          return (
            <div className="flex items-center gap-3">
              {experience.companyLogo?.url ? (
                <img
                  src={experience.companyLogo.url}
                  alt={experience.company}
                  className="
                    size-10
                    rounded-lg
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
                    rounded-lg
                    border
                  "
                >
                  <Building2 className="size-5" />
                </div>
              )}

              <div>
                <p className="font-medium">{experience.company}</p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  {experience.location}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "position",

        header: "Position",
      },

      {
        accessorKey: "employmentType",

        header: "Employment",

        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.employmentType}</Badge>
        ),
      },

      {
        accessorKey: "workMode",

        header: "Work Mode",

        cell: ({ row }) => (
          <Badge variant="outline">{row.original.workMode}</Badge>
        ),
      },

      {
        id: "duration",

        header: "Duration",

        cell: ({ row }) => {
          const experience = row.original;

          return (
            <span className="text-sm">
              {formatDate(experience.startDate)}
              {" - "}
              {experience.isCurrent
                ? "Present"
                : formatDate(experience.endDate)}
            </span>
          );
        },
      },

      {
        accessorKey: "technologies",

        header: "Technologies",

        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.technologies.slice(0, 3).map((technology) => (
              <Badge key={technology} variant="outline">
                {technology}
              </Badge>
            ))}

            {row.original.technologies.length > 3 ? (
              <Badge variant="secondary">
                +{row.original.technologies.length - 3}
              </Badge>
            ) : null}
          </div>
        ),
      },

      {
        accessorKey: "isCurrent",

        header: "Current",

        cell: ({ row }) => (
          <Badge variant={row.original.isCurrent ? "default" : "outline"}>
            {row.original.isCurrent ? "Current" : "Previous"}
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
        id: "actions",

        header: "Actions",

        enableSorting: false,

        cell: ({ row }) => {
          const experience = row.original;

          return (
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Button type="button" variant="ghost" size="icon">
                <Eye className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onEdit(experience)}
              >
                <Pencil className="size-4" />
              </Button>

              <DeleteDialog
                title="Delete Experience"
                description={`Are you sure you want to delete "${experience.company}"? This action cannot be undone.`}
                isLoading={deleteMutation.isPending}
                onConfirm={async () => {
                  await deleteMutation.mutateAsync({
                    id: experience._id,
                  });
                }}
              />
            </div>
          );
        },
      },
    ],
    [deleteMutation, onEdit],
  );

  return (
    <div className="space-y-4">
      <DataTable<IExperience>
        data={experiences}
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

export default ExperienceTable;
