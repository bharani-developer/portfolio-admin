// src/modules/testimonials/components/testimonials-table.tsx

import { useMemo } from "react";

import type { ReactElement } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import {
  Edit,
  Eye,
  Star,
  Trash2,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/table/data-table";
import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";

import type { ITestimonial } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface TestimonialsTableProps {
  testimonials: ITestimonial[];

  meta: IApiMeta | undefined;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onView?: (
    testimonial: ITestimonial,
  ) => void;

  onEdit: (
    testimonial: ITestimonial,
  ) => void;

  onDelete: (
    testimonial: ITestimonial,
  ) => void;
}

/* -------------------------------------------------------------------------- */
/*                           Testimonials Table                               */
/* -------------------------------------------------------------------------- */

export function TestimonialsTable({
  testimonials,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onView,
  onEdit,
  onDelete,
}: TestimonialsTableProps): ReactElement {
  const columns = useMemo<
    ColumnDef<ITestimonial>[]
  >(
    () => [
      {
        accessorKey: "clientName",

        header: "Client",

        cell: ({ row }) => {
          const testimonial =
            row.original;

          return (
            <div className="flex items-center gap-3">
              {testimonial.clientImage?.url ? (
                <img
                  src={testimonial.clientImage.url}
                  alt={testimonial.clientName}
                  loading="lazy"
                  className="
                    size-12
                    rounded-full
                    border
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    bg-muted
                    flex
                    size-12
                    items-center
                    justify-center
                    rounded-full
                    border
                  "
                >
                  <UserRound
                    className="size-5"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-medium">
                  {testimonial.clientName}
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-muted-foreground
                  "
                >
                  {testimonial.clientPosition ??
                    "-"}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "clientCompany",

        header: "Company",

        cell: ({ row }) =>
          row.original.clientCompany ??
          "-",
      },

      {
        accessorKey: "clientType",

        header: "Type",

        cell: ({ row }) => (
          <Badge variant="secondary">
            {row.original.clientType}
          </Badge>
        ),
      },

      {
        accessorKey: "rating",

        header: "Rating",

        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Star
              className="
                size-4
                fill-current
                text-yellow-500
              "
            />

            <span>
              {row.original.rating}/5
            </span>
          </div>
        ),
      },

      {
        accessorKey: "isFeatured",

        header: "Featured",

        cell: ({ row }) => (
          <Badge
            variant={
              row.original.isFeatured
                ? "default"
                : "secondary"
            }
          >
            {row.original.isFeatured
              ? "Featured"
              : "No"}
          </Badge>
        ),
      },

      {
        accessorKey: "isActive",

        header: "Status",

        cell: ({ row }) => (
          <Badge
            variant={
              row.original.isActive
                ? "default"
                : "secondary"
            }
          >
            {row.original.isActive
              ? "Active"
              : "Inactive"}
          </Badge>
        ),
      },

      {
        accessorKey: "sortOrder",

        header: "Order",
      },

      {
        id: "actions",

        header: () => (
          <div className="flex justify-center">
            Actions
          </div>
        ),

        size: 180,

        minSize: 180,

        maxSize: 180,

        enableSorting: false,

        cell: ({ row }) => {
          const testimonial =
            row.original;

          return (
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {onView ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`View ${testimonial.clientName}`}
                  onClick={() =>
                    onView(testimonial)
                  }
                >
                  <Eye className="size-4" />
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Edit ${testimonial.clientName}`}
                onClick={() =>
                  onEdit(testimonial)
                }
              >
                <Edit className="size-4" />
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Delete ${testimonial.clientName}`}
                onClick={() =>
                  onDelete(testimonial)
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [
      onDelete,
      onEdit,
      onView,
    ],
  );

  return (
    <div className="space-y-4">
      <DataTable<ITestimonial>
        data={testimonials}
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

export default TestimonialsTable;