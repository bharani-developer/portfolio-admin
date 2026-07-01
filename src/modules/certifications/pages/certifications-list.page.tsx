// src\modules\certifications\pages\certifications-list.page.tsx

import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import {
  AlertCircle,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { PageLoader } from "@/components/common/page-loader";

import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";

import {
  CertificationDialog,
  CertificationsActions,
  CertificationsFilters,
  CertificationsTable,
} from "../components";

import {
  useCertifications,
  useDeleteCertification,
} from "../hooks";

import type {
  ICertification,
  ICertificationQueryParams,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                       Certifications List Page                             */
/* -------------------------------------------------------------------------- */

export function CertificationsListPage(): ReactElement {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      "all" | "active" | "inactive"
    >("all");

  const [issuerFilter, setIssuerFilter] =
    useState("all");

  const [
    selectedCertification,
    setSelectedCertification,
  ] = useState<ICertification | null>(
    null,
  );

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  /* ------------------------------------------------------------------------ */
  /*                               Pagination                                 */
  /* ------------------------------------------------------------------------ */

  const {
    page,
    limit,
    setPage,
    setLimit,
  } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  /* ------------------------------------------------------------------------ */
  /*                               Query Params                               */
  /* ------------------------------------------------------------------------ */

  const query: ICertificationQueryParams =
    {
      page,
      limit,
    };

  if (searchTerm.trim()) {
    query.searchTerm =
      searchTerm.trim();
  }

  if (issuerFilter !== "all") {
    query.issuer = issuerFilter;
  }

  if (statusFilter !== "all") {
    query.isActive =
      statusFilter === "active";
  }

  /* ------------------------------------------------------------------------ */
  /*                               API Request                                */
  /* ------------------------------------------------------------------------ */

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useCertifications(query);

  const deleteCertificationMutation =
    useDeleteCertification();

  /* ------------------------------------------------------------------------ */
  /*                                 Data                                     */
  /* ------------------------------------------------------------------------ */

  const certifications =
    useMemo<ICertification[]>(
      () => data?.data ?? [],
      [data],
    );

  /* ------------------------------------------------------------------------ */
  /*                               Statistics                                 */
  /* ------------------------------------------------------------------------ */

  const stats = useMemo(
    () => ({
      total:
        data?.meta?.total ?? 0,

      active:
        certifications.filter(
          (
            certification,
          ) =>
            certification.isActive,
        ).length,

      verified:
        certifications.filter(
          (
            certification,
          ) =>
            Boolean(
              certification.credentialUrl,
            ),
        ).length,
    }),
    [data, certifications],
  );

  /* ------------------------------------------------------------------------ */
  /*                             Issuer Options                               */
  /* ------------------------------------------------------------------------ */

  const issuers = useMemo(
    () =>
      Array.from(
        new Set(
          certifications
            .map(
              (
                certification,
              ) =>
                certification.issuer,
            )
            .filter(Boolean),
        ),
      ).sort(),
    [certifications],
  );

  /* ------------------------------------------------------------------------ */
  /*                                Actions                                   */
  /* ------------------------------------------------------------------------ */

  const handleCreate =
    (): void => {
      setSelectedCertification(
        null,
      );

      setIsDialogOpen(true);
    };

  const handleEdit = (
    certification: ICertification,
  ): void => {
    setSelectedCertification(
      certification,
    );

    setIsDialogOpen(true);
  };

  const handleDelete =
    async (
      certification: ICertification,
    ): Promise<void> => {
      await deleteCertificationMutation.mutateAsync(
        {
          id: certification._id,
        },
      );

      await refetch();
    };

  const handleDialogClose =
    (): void => {
      setSelectedCertification(
        null,
      );

      setIsDialogOpen(false);
    };

  /* ------------------------------------------------------------------------ */
  /*                                Loading                                   */
  /* ------------------------------------------------------------------------ */

  if (isLoading && !data) {
    return (
      <PageLoader message="Loading certifications..." />
    );
  }
    /* ------------------------------------------------------------------------ */
  /*                               Error State                                */
  /* ------------------------------------------------------------------------ */

  if (isError) {
    return (
      <PageContainer ultraWide>
        <PageTitle
          title="Certifications"
          description="Manage certifications and credentials."
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
                Failed to load certifications
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >
                {error?.message ??
                  "Something went wrong."}
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
    <PageContainer ultraWide>
      <div className="space-y-6">
        <PageTitle
          title="Certifications"
          description="Manage certifications, credentials, verification links and portfolio achievements."
          actions={
            <Award
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <CertificationsActions
          totalCertifications={
            stats.total
          }
          activeCertifications={
            stats.active
          }
          verifiedCertifications={
            stats.verified
          }
          onCreate={
            handleCreate
          }
          onRefresh={() => {
            void refetch();
          }}
        />

        <CertificationsFilters
          searchTerm={
            searchTerm
          }
          status={
            statusFilter
          }
          issuer={
            issuerFilter
          }
          issuers={
            issuers
          }
          isLoading={
            isFetching
          }
          onSearchChange={(
            value,
          ) => {
            setSearchTerm(
              value,
            );

            setPage(1);
          }}
          onStatusChange={(
            value,
          ) => {
            setStatusFilter(
              value,
            );

            setPage(1);
          }}
          onIssuerChange={(
            value,
          ) => {
            setIssuerFilter(
              value,
            );

            setPage(1);
          }}
        />
<CertificationsTable
  certifications={certifications}
  meta={data?.meta}
  isLoading={isFetching}
  onPageChange={setPage}
  onLimitChange={(newLimit) => {
    setLimit(newLimit);
    setPage(1);
  }}
  onEdit={handleEdit}
  onDelete={(certification) => {
    void handleDelete(certification);
  }}
/>

<CertificationDialog
  open={isDialogOpen}
  certification={selectedCertification}
  onOpenChange={(open) => {
    if (!open) {
      handleDialogClose();
      return;
    }

    setIsDialogOpen(true);
  }}
/>
      </div>
    </PageContainer>
  );
}

export default CertificationsListPage;