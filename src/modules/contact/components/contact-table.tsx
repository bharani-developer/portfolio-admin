// src/modules/contact/components/contact-table.tsx

import type { ReactElement } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";
import { ServerTablePagination } from "@/components/table/server-table-pagination";

import type { IApiMeta } from "@/shared/types";

import type { IContact } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface ContactTableProps {
  readonly contacts: IContact[];

  readonly columns: ColumnDef<IContact, unknown>[];

  readonly meta: IApiMeta | undefined;

  readonly isLoading?: boolean;

  readonly onPageChange: (page: number) => void;

  readonly onLimitChange: (limit: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                               Contact Table                                */
/* -------------------------------------------------------------------------- */

export function ContactTable({
  contacts,
  columns,
  meta,
  isLoading = false,
  onPageChange,
  onLimitChange,
}: ContactTableProps): ReactElement {
  return (
    <div className="space-y-4">
      <DataTable<IContact>
        data={contacts}
        columns={columns}
        isLoading={isLoading}
      />

      {meta !== undefined ? (
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

export default ContactTable;
