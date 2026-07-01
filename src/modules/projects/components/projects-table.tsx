import { useMemo } from "react";

import type { ReactElement } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import {
  ArrowUpDown,
  Edit,
  ExternalLink,
  Eye,
  Link,
  Star,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/table/data-table";

import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";

import { useConfirmation } from "@/shared/hooks/use-confirmation";

import { formatDate } from "@/shared/lib/format-date";

import { useDeleteProject } from "../hooks";

import type { IProject } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ProjectsTableProps {
  projects: IProject[];

  meta: IApiMeta | undefined;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onEdit?: (project: IProject) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Projects Table                                */
/* -------------------------------------------------------------------------- */

export function ProjectsTable({
  projects,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onEdit,
}: ProjectsTableProps): ReactElement {
  const confirmation = useConfirmation();

  const deleteProjectMutation = useDeleteProject();

  const columns = useMemo<ColumnDef<IProject>[]>(
    () => [
      {
        accessorKey: "thumbnail",

        header: "Thumbnail",

        cell: ({ row }) => {
          const thumbnail = row.original.thumbnail;

          if (!thumbnail?.url) {
            return (
              <div
                className="
                  bg-muted
                  flex
                  h-12
                  w-20
                  items-center
                  justify-center
                  rounded-md
                  text-xs
                "
              >
                No Image
              </div>
            );
          }

          return (
            <img
              src={thumbnail.url}
              alt={row.original.title}
              loading="lazy"
              className="
                h-12
                w-20
                rounded-md
                object-cover
              "
            />
          );
        },
      },

      {
        accessorKey: "title",

        header: ({ column }) => (
          <Button
            type="button"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown
              className="
                ml-2
                size-4
              "
            />
          </Button>
        ),

        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.title}</p>

            <p
              className="
                mt-1
                max-w-xs
                truncate
                text-xs
                text-muted-foreground
              "
            >
              {row.original.shortDescription}
            </p>
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
              <Badge variant="outline">
                +{row.original.technologies.length - 3}
              </Badge>
            ) : null}
          </div>
        ),
      },

      {
        accessorKey: "status",

        header: "Status",

        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
      },

      {
        accessorKey: "featured",

        header: "Featured",

        cell: ({ row }) =>
          row.original.featured ? (
            <Badge>
              <Star
                className="
                  mr-1
                  size-3
                "
              />
              Featured
            </Badge>
          ) : (
            <Badge variant="secondary">No</Badge>
          ),
      },

      {
        accessorKey: "isActive",

        header: "Visibility",

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
        accessorKey: "createdAt",

        header: "Created",

        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: "links",

        header: "Links",

        cell: ({ row }) => (
          <div className="flex gap-2">
            {row.original.githubUrl ? (
              <Button type="button" size="icon" variant="outline" asChild>
                <a
                  href={row.original.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Link className="size-4" />
                </a>
              </Button>
            ) : null}

            {row.original.liveUrl ? (
              <Button type="button" size="icon" variant="outline" asChild>
                <a href={row.original.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>
        ),
      },

      {
        id: "actions",

        size: 180,

        minSize: 180,

        maxSize: 180,

        enableSorting: false,

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

        cell: ({ row }) => {
          const project = row.original;

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
                aria-label={`View ${project.title}`}
              >
                <Eye className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Edit ${project.title}`}
                onClick={() => onEdit?.(project)}
              >
                <Edit className="size-4" />
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Delete ${project.title}`}
                disabled={deleteProjectMutation.isPending}
                onClick={async () => {
                  const confirmed = await confirmation.confirm({
                    title: "Delete Project",

                    description: `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,

                    confirmText: "Delete",

                    cancelText: "Cancel",

                    destructive: true,
                  });

                  if (!confirmed) {
                    return;
                  }

                  deleteProjectMutation.mutate({
                    id: project._id,
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
    [confirmation, deleteProjectMutation, onEdit],
  );
  return (
    <div className="space-y-4">
      <DataTable<IProject>
        data={projects}
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

export default ProjectsTable;
