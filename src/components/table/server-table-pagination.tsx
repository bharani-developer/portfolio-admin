// src/components/table/server-table-pagination.tsx

import { useMemo } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IApiMeta } from "@/shared/types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface ServerTablePaginationProps {
  meta: IApiMeta;

  pageSizeOptions?: readonly number[];

  isLoading?: boolean;

  onPageChange: (page: number) => void;

  onLimitChange: (limit: number) => void;
}

type PageItem = number | "...";

/* -------------------------------------------------------------------------- */
/*                              Helper Function                               */
/* -------------------------------------------------------------------------- */

function buildPagination(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  if (totalPages <= 1) {
    return [1];
  }

  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

/* -------------------------------------------------------------------------- */
/*                         Server Table Pagination                            */
/* -------------------------------------------------------------------------- */

export function ServerTablePagination({
  meta,
  pageSizeOptions = [10, 20, 30, 50, 100],
  isLoading = false,
  onPageChange,
  onLimitChange,
}: ServerTablePaginationProps): React.JSX.Element {
  const {
    page,
    limit,
    total,
    totalPage,
  } = meta;

  const pages = useMemo(
    () => buildPagination(page, totalPage),
    [page, totalPage],
  );

  const canPrevious =
    !isLoading &&
    page > 1;

  const canNext =
    !isLoading &&
    page < totalPage;

  const startRecord =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const endRecord =
    total === 0
      ? 0
      : Math.min(page * limit, total);

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        px-4
        py-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div
        className="
          text-sm
          text-muted-foreground
        "
      >
        Showing{" "}
        <span className="font-semibold text-foreground">
          {startRecord}
        </span>{" "}
        -{" "}
        <span className="font-semibold text-foreground">
          {endRecord}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">
          {total}
        </span>{" "}
        records
      </div>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            text-sm
            text-muted-foreground
          "
        >
          Rows per page
        </span>

        <Select
          value={String(limit)}
          disabled={isLoading}
          onValueChange={(value) => {
            onLimitChange(Number(value));
          }}
        >
          <SelectTrigger className="h-9 w-24">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem
                key={size}
                value={String(size)}
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="
          flex
          items-center
          gap-1
          self-end
          lg:self-auto
        "
      >
        <Button
          variant="outline"
          size="icon"
          disabled={!canPrevious}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={!canPrevious}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pages.map((item, index) =>
          item === "..." ? (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              disabled
            >
              <MoreHorizontal className="size-4" />
            </Button>
          ) : (
            <Button
              key={item}
              variant={
                item === page
                  ? "default"
                  : "outline"
              }
              size="icon"
              disabled={isLoading}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={!canNext}
          onClick={() => onPageChange(totalPage)}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default ServerTablePagination;