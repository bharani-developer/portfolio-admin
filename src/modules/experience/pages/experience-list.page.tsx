import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { PageLoader } from "@/components/common/page-loader";

import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";

import {
  ExperienceActions,
  ExperienceDialog,
  ExperienceFilters,
  ExperienceTable,
} from "../components";

import { useExperiences } from "../hooks";

import type { IExperience, IExperienceQueryParams } from "../types";

/* -------------------------------------------------------------------------- */
/*                          Experience List Page                              */
/* -------------------------------------------------------------------------- */

export function ExperienceListPage(): ReactElement {
  const [selectedExperience, setSelectedExperience] =
    useState<IExperience | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("all");

  const [workModeFilter, setWorkModeFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  const query: IExperienceQueryParams = {
    page,
    limit,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  if (employmentTypeFilter !== "all") {
    query.employmentType = employmentTypeFilter;
  }

  if (workModeFilter !== "all") {
    query.workMode = workModeFilter;
  }

  if (statusFilter !== "all") {
    query.isActive = statusFilter === "active";
  }

  const { data, isLoading, isFetching, isError, error, refetch } =
    useExperiences(query);

  const experiences = useMemo<IExperience[]>(() => data?.data ?? [], [data]);

  /* ------------------------------------------------------------------------ */
  /*                                Statistics                                */
  /* ------------------------------------------------------------------------ */

  const stats = useMemo(
    () => ({
      total: data?.meta?.total ?? 0,

      active: experiences.filter((experience) => experience.isActive).length,

      current: experiences.filter((experience) => experience.isCurrent).length,
    }),
    [data, experiences],
  );

  /* ------------------------------------------------------------------------ */
  /*                              Filter Options                              */
  /* ------------------------------------------------------------------------ */

  const employmentTypes = useMemo(
    () =>
      Array.from(
        new Set(
          experiences
            .map((experience) => experience.employmentType)
            .filter(Boolean),
        ),
      ).sort(),
    [experiences],
  );

  const workModes = useMemo(
    () =>
      Array.from(
        new Set(
          experiences.map((experience) => experience.workMode).filter(Boolean),
        ),
      ).sort(),
    [experiences],
  );

  /* ------------------------------------------------------------------------ */
  /*                                 Actions                                  */
  /* ------------------------------------------------------------------------ */

  const handleCreate = (): void => {
    setSelectedExperience(null);

    setIsFormOpen(true);
  };

  const handleEdit = (experience: IExperience): void => {
    setSelectedExperience(experience);

    setIsFormOpen(true);
  };

  const handleCloseDialog = (): void => {
    setSelectedExperience(null);

    setIsFormOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                                Loading                                   */
  /* ------------------------------------------------------------------------ */

  if (isLoading && !data) {
    return <PageLoader message="Loading experiences..." />;
  }
  /* ------------------------------------------------------------------------ */
  /*                               Error State                                */
  /* ------------------------------------------------------------------------ */

  if (isError) {
    return (
      <PageContainer ultraWide>
        <PageTitle
          title="Experience"
          description="Manage your professional experience history."
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
                Failed to load experience
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
    <PageContainer ultraWide>
      <div className="space-y-6">
        <PageTitle
          title="Experience"
          description="Manage your professional experience history, positions, career growth and achievements."
          actions={
            <BriefcaseBusiness
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <ExperienceActions
          totalExperiences={stats.total}
          activeExperiences={stats.active}
          currentPositions={stats.current}
          onCreate={handleCreate}
          onRefresh={() => {
            void refetch();
          }}
        />

        <ExperienceFilters
          searchTerm={searchTerm}
          employmentType={employmentTypeFilter}
          workMode={workModeFilter}
          status={statusFilter}
          employmentTypes={employmentTypes}
          workModes={workModes}
          isLoading={isFetching}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
          onEmploymentTypeChange={(value) => {
            setEmploymentTypeFilter(value);
            setPage(1);
          }}
          onWorkModeChange={(value) => {
            setWorkModeFilter(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        />

        <ExperienceTable
          experiences={experiences}
          meta={data?.meta}
          isLoading={isFetching}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          onEdit={handleEdit}
        />

        <ExperienceDialog
          open={isFormOpen}
          experience={selectedExperience}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseDialog();

              return;
            }

            setIsFormOpen(true);
          }}
          onSuccess={() => {
            handleCloseDialog();

            void refetch();
          }}
        />
      </div>
    </PageContainer>
  );
}

export default ExperienceListPage;
