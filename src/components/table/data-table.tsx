import { useState } from "react";

import type { ReactElement } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EmptyState } from "@/components/common/empty-state";

import { PageLoader } from "@/components/common/page-loader";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface DataTableProps<TData> {
  data: TData[];

  columns: ColumnDef<TData>[];

  isLoading?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Data Table                                  */
/* -------------------------------------------------------------------------- */

export function DataTable<TData>({
  data,
  columns,
  isLoading = false,
}: DataTableProps<TData>): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,

    columns,

    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),
  });

  const filteredRows = table.getFilteredRowModel().rows.length;
  return (
    <div className="space-y-4">
      {/* ------------------------------------------------------------------ */}
      {/* Table Summary */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
      >
        <div />

        <div
          className="
          text-sm
          text-muted-foreground
        "
        >
          {filteredRows} record
          {filteredRows !== 1 ? "s" : ""}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Table */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
        overflow-hidden
        rounded-xl
        border
        bg-card
        shadow-sm
      "
      >
        <div className="relative overflow-x-auto">
          {isLoading ? (
            <div className="py-12">
              <PageLoader message="Loading data..." />
            </div>
          ) : null}

          <Table>
            <TableHeader
              className="
              sticky
              top-0
              z-10
              bg-muted/40
              backdrop-blur
            "
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();

                    const sorted = header.column.getIsSorted();

                    return (
                      <TableHead
                        key={header.id}
                        className="
                            h-12
                            whitespace-nowrap
                            font-semibold
                          "
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="
                                -ml-3
                                h-8
                                gap-1
                                px-3
                                font-semibold
                              "
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}

                            {sorted === "asc" ? (
                              <ChevronUp className="size-4" />
                            ) : sorted === "desc" ? (
                              <ChevronDown className="size-4" />
                            ) : (
                              <ChevronsUpDown
                                className="
                                    size-4
                                    opacity-50
                                  "
                              />
                            )}
                          </Button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="
                      transition-colors
                      hover:bg-muted/40
                    "
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="
                            py-4
                            align-middle
                          "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="
                    h-72
                    p-0
                  "
                  >
                    <EmptyState
                      title="No records found"
                      description="Try adjusting your filters or create a new record."
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
