// src/modules/certifications/components/certifications-table.tsx

import { useMemo } from "react";

import type { ReactElement } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { Award, Edit, Eye, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/table/data-table";
import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";

import type { ICertification } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface CertificationsTableProps {
  certifications: ICertification[];

  meta: IApiMeta | undefined;

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;

  onView?: (certification: ICertification) => void;

  onEdit: (certification: ICertification) => void;

  onDelete: (certification: ICertification) => void;
}

/* -------------------------------------------------------------------------- */
/*                             Helper Functions                               */
/* -------------------------------------------------------------------------- */

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/* -------------------------------------------------------------------------- */
/*                          Certifications Table                              */
/* -------------------------------------------------------------------------- */

export function CertificationsTable({
  certifications,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
  onView,
  onEdit,
  onDelete,
}: CertificationsTableProps): ReactElement {
  const columns = useMemo<ColumnDef<ICertification>[]>(
    () => [
      {
        accessorKey: "title",

        header: "Certification",

        cell: ({ row }) => {
          const certification = row.original;

          return (
            <div className="flex items-center gap-3">
              {certification.certificateImage?.url ? (
                <img
                  src={certification.certificateImage.url}
                  alt={certification.title}
                  className="
                    size-12
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
                    size-12
                    items-center
                    justify-center
                    rounded-lg
                    border
                  "
                >
                  <Award className="size-5" />
                </div>
              )}

              <div>
                <p className="font-medium">{certification.title}</p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >
                  {certification.slug}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        accessorKey: "issuer",

        header: "Issuer",
      },

      {
        accessorKey: "skills",

        header: "Skills",

        cell: ({ row }) => {
          const skills = row.original.skills;

          return (
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}

              {skills.length > 3 ? (
                <Badge variant="outline">+{skills.length - 3}</Badge>
              ) : null}
            </div>
          );
        },
      },

      {
        accessorKey: "issueDate",

        header: "Issued",

        cell: ({ row }) => formatDate(row.original.issueDate),
      },

      {
        id: "expiry",

        header: "Expiry",

        cell: ({ row }) => {
          const certification = row.original;

          if (certification.neverExpires) {
            return <Badge variant="outline">Never</Badge>;
          }

          return certification.expiryDate
            ? formatDate(certification.expiryDate)
            : "-";
        },
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

        header: () => <div className="flex justify-center">Actions</div>,

        size: 180,

        minSize: 180,

        maxSize: 180,

        enableSorting: false,

        cell: ({ row }) => {
          const certification = row.original;

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
                  aria-label={`View ${certification.title}`}
                  onClick={() => onView(certification)}
                >
                  <Eye className="size-4" />
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Edit ${certification.title}`}
                onClick={() => onEdit(certification)}
              >
                <Edit className="size-4" />
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                aria-label={`Delete ${certification.title}`}
                onClick={() => onDelete(certification)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onDelete, onEdit, onView],
  );

  return (
    <div className="space-y-4">
      <DataTable<ICertification>
        data={certifications}
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

export default CertificationsTable;
