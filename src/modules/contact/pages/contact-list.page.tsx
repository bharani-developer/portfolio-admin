// src/modules/contact/pages/contact-list.page.tsx

import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PageTitle } from "@/components/common/page-title";
import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";

import {
  ContactToolbar,
  ContactFilters,
  ContactTable,
  contactColumns,
} from "../components";

import { useContacts } from "../hooks";

import type { IContact, IContactQueryParams } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Contacts Page                                */
/* -------------------------------------------------------------------------- */

export function ContactsPage(): ReactElement {
  /* ---------------------------------------------------------------------- */
  /*                              Pagination                                */
  /* ---------------------------------------------------------------------- */

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  /* ---------------------------------------------------------------------- */
  /*                                Filters                                 */
  /* ---------------------------------------------------------------------- */

  const [filters, setFilters] = useState<IContactQueryParams>({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  /* ---------------------------------------------------------------------- */
  /*                              Query Params                              */
  /* ---------------------------------------------------------------------- */

  const query = useMemo<IContactQueryParams>(() => {
    const params: IContactQueryParams = {
      page,
      limit,
    };

    if (filters.searchTerm) {
      params.searchTerm = filters.searchTerm;
    }

    if (filters.sortBy) {
      params.sortBy = filters.sortBy;
    }

    if (filters.sortOrder) {
      params.sortOrder = filters.sortOrder;
    }

    if (filters.fields) {
      params.fields = filters.fields;
    }

    if (filters.status) {
      params.status = filters.status;
    }

    if (filters.priority) {
      params.priority = filters.priority;
    }

    if (filters.source) {
      params.source = filters.source;
    }

    if (typeof filters.isRead === "boolean") {
      params.isRead = filters.isRead;
    }

    if (typeof filters.isReplied === "boolean") {
      params.isReplied = filters.isReplied;
    }

    if (typeof filters.isActive === "boolean") {
      params.isActive = filters.isActive;
    }

    return params;
  }, [page, limit, filters]);

  /* ---------------------------------------------------------------------- */
  /*                             React Query                                */
  /* ---------------------------------------------------------------------- */

  const { data, isFetching, isError, error, refetch } = useContacts(query);

  /* ---------------------------------------------------------------------- */
  /*                                Contacts                                */
  /* ---------------------------------------------------------------------- */

  const contacts = useMemo<IContact[]>(() => data?.data ?? [], [data]);

  /* ---------------------------------------------------------------------- */
  /*                              Error State                               */
  /* ---------------------------------------------------------------------- */

  if (isError) {
    return (
      <PageContainer>
        <PageTitle
          title="Contacts"
          description="Manage incoming contact messages and inquiries."
        />

        <Card>
          <CardContent
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-4
              py-12
            "
          >
            <AlertCircle
              className="
                size-10
                text-destructive
              "
            />

            <div className="text-center">
              <h3
                className="
                  text-lg
                  font-semibold
                "
              >
                Failed to load contacts
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >
                {error instanceof Error
                  ? error.message
                  : "Something went wrong."}
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                void refetch();
              }}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                                 Render                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle
          title="Contacts"
          description="Manage incoming contact messages, customer inquiries, replies and communication history."
          actions={
            <Mail
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <ContactToolbar
          onRefresh={() => {
            void refetch();
          }}
        />

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>

          <CardContent>
            <ContactFilters
              filters={filters}
              isLoading={isFetching}
              onFiltersChange={(newFilters) => {
                setFilters(newFilters);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
          </CardHeader>

          <CardContent>
            <ContactTable
              contacts={contacts}
              columns={contactColumns}
              meta={data?.meta}
              isLoading={isFetching}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}

export default ContactsPage;
