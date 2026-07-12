// src/modules/services/pages/services-list.page.tsx

import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";

import {
  ServiceForm,
  ServicesActions,
  ServicesFilters,
  ServicesTable,
} from "../components";

import { useServices } from "../hooks";

import type { IService, IServicesQueryParams } from "../types";

/* -------------------------------------------------------------------------- */
/*                             Services List Page                             */
/* -------------------------------------------------------------------------- */

export function ServicesListPage(): ReactElement {
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  /* ------------------------------------------------------------------------ */
  /*                               Pagination                                 */
  /* ------------------------------------------------------------------------ */

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  /* ------------------------------------------------------------------------ */
  /*                               Query Params                               */
  /* ------------------------------------------------------------------------ */

  const query: IServicesQueryParams = {
    page,
    limit,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  if (statusFilter !== "all") {
    query.isActive = statusFilter === "active";
  }

  /* ------------------------------------------------------------------------ */
  /*                               API Request                                */
  /* ------------------------------------------------------------------------ */

  const { data, isLoading, isFetching, isError, error, refetch } =
    useServices(query);

  /* ------------------------------------------------------------------------ */
  /*                                Raw Data                                  */
  /* ------------------------------------------------------------------------ */

  const services = useMemo(() => data?.data ?? [], [data]);
  /* ------------------------------------------------------------------------ */
  /*                                Statistics                                */
  /* ------------------------------------------------------------------------ */

  const stats = useMemo(() => {
    return {
      total: data?.meta?.total ?? 0,

      active: services.filter((service) => service.isActive).length,
    };
  }, [data, services]);

  /* ------------------------------------------------------------------------ */
  /*                               Form Actions                               */
  /* ------------------------------------------------------------------------ */

  const handleCreate = (): void => {
    setSelectedService(null);

    setIsFormOpen(true);
  };

  const handleEdit = (service: IService): void => {
    setSelectedService(service);

    setIsFormOpen(true);
  };

  const handleCloseForm = (): void => {
    setSelectedService(null);

    setIsFormOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                               Error State                                */
  /* ------------------------------------------------------------------------ */

  if (isError) {
    return (
      <PageContainer>
        <PageTitle
          title="Services"
          description="Manage your portfolio services and professional offerings."
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
                Failed to load services
              </h3>

              <p
                className="
                mt-1
                text-sm
                text-muted-foreground
              "
              >
                {error?.message ?? "Something went wrong."}
              </p>
            </div>

            <Button
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

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle
          title="Services"
          description="Manage your professional services, visibility, ordering and portfolio offerings."
          actions={
            <Wrench
              className="
              size-5
              text-muted-foreground
            "
            />
          }
        />

        <ServicesActions
          totalServices={stats.total}
          activeServices={stats.active}
          onCreate={handleCreate}
          onRefresh={() => {
            void refetch();
          }}
        />

        <ServicesFilters
          searchTerm={searchTerm}
          status={statusFilter}
          isLoading={isFetching}
          onSearchChange={(value) => {
            setSearchTerm(value);

            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);

            setPage(1);
          }}
        />

        <ServicesTable
          services={services}
          {...(data?.meta ? { meta: data.meta } : {})}
          isLoading={isLoading}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          onEdit={handleEdit}
        />

        <ServiceForm
          open={isFormOpen}
          service={selectedService}
          onOpenChange={(open: boolean) => {
            if (!open) {
              handleCloseForm();

              return;
            }

            setIsFormOpen(true);
          }}
        />
      </div>
    </PageContainer>
  );
}

export default ServicesListPage;
