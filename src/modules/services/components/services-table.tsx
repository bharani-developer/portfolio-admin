// src/modules/services/components/services-table.tsx

import { useMemo } from "react";

import type { ReactElement } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import {
  Edit,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/table/data-table";

import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";

import { useConfirmation } from "@/shared/hooks/use-confirmation";

import { useDeleteService } from "../hooks";

import type { IService } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ServicesTableProps {
  services: IService[];

  meta?: IApiMeta;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onEdit?: (service: IService) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Services Table                                */
/* -------------------------------------------------------------------------- */

export function ServicesTable({
  services,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onEdit,
}: ServicesTableProps): ReactElement {
  const confirmation = useConfirmation();

  const deleteServiceMutation =
    useDeleteService();

  const columns = useMemo<
    ColumnDef<IService>[]
  >(
    () => [
      {
        accessorKey: "title",

        header: "Service",

        cell: ({ row }) => (
          <div>
            <p className="font-medium">
              {row.original.title}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              {row.original.slug}
            </p>
          </div>
        ),
      },

      {
        accessorKey: "shortDescription",

        header: "Description",

        cell: ({ row }) => (
          <div
            className="
              max-w-md
              truncate
            "
          >
            {row.original.shortDescription}
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

        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge>
              <Eye className="mr-1 size-3" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary">
              <EyeOff className="mr-1 size-3" />
              Inactive
            </Badge>
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
          const service = row.original;

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
                aria-label={`View ${service.title}`}
              >
                <Eye className="size-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Edit ${service.title}`}
                onClick={() => onEdit?.(service)}
              >
                <Edit className="size-4" />
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Delete ${service.title}`}
                disabled={deleteServiceMutation.isPending}
                onClick={async () => {
                  const confirmed =
                    await confirmation.confirm({
                      title: "Delete Service",

                      description: `Are you sure you want to delete "${service.title}"? This action cannot be undone.`,

                      confirmText: "Delete",

                      cancelText: "Cancel",

                      destructive: true,
                    });

                  if (!confirmed) {
                    return;
                  }

                  deleteServiceMutation.mutate({
                    id: service._id,
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
    [
      confirmation,
      deleteServiceMutation,
      onEdit,
    ],
  );

  return (
    <div className="space-y-4">
      <DataTable<IService>
        data={services}
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

export default ServicesTable;