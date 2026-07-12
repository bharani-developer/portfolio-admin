// src/modules/education/pages/education-list.page.tsx

import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { PageLoader } from "@/components/common/page-loader";
import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";

import {
  EducationActions,
  EducationDialog,
  EducationFilters,
  EducationTable,
} from "../components";

import { useDeleteEducation, useEducations } from "../hooks";

import type { IEducation, IEducationQueryParams } from "../types";

/* -------------------------------------------------------------------------- */
/*                          Education List Page                               */
/* -------------------------------------------------------------------------- */

export function EducationListPage(): ReactElement {
  const [selectedEducation, setSelectedEducation] = useState<IEducation | null>(
    null,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [educationLevel, setEducationLevel] = useState("all");

  const [isCurrent, setIsCurrent] = useState("all");

  const [isActive, setIsActive] = useState("all");

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

  const query: IEducationQueryParams = {
    page,
    limit,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  if (educationLevel !== "all") {
    query.educationLevel = educationLevel;
  }

  if (isCurrent !== "all") {
    query.isCurrent = isCurrent === "true";
  }

  if (isActive !== "all") {
    query.isActive = isActive === "true";
  }

  /* ------------------------------------------------------------------------ */
  /*                               API Request                                */
  /* ------------------------------------------------------------------------ */

  const { data, isLoading, isFetching, isError, error, refetch } =
    useEducations(query);

  const deleteEducation = useDeleteEducation();

  /* ------------------------------------------------------------------------ */
  /*                                 Data                                     */
  /* ------------------------------------------------------------------------ */

  const educations = useMemo(() => data?.data ?? [], [data]);

  /* ------------------------------------------------------------------------ */
  /*                                Statistics                                */
  /* ------------------------------------------------------------------------ */

  const stats = useMemo(
    () => ({
      total: data?.meta?.total ?? 0,

      active: educations.filter((education) => education.isActive).length,

      current: educations.filter((education) => education.isCurrent).length,
    }),
    [data, educations],
  );

  /* ------------------------------------------------------------------------ */
  /*                             Filter Options                               */
  /* ------------------------------------------------------------------------ */

  const educationLevels = useMemo(
    () =>
      Array.from(
        new Set(
          educations
            .map((education) => education.educationLevel)
            .filter(Boolean),
        ),
      ).sort(),
    [educations],
  );

  /* ------------------------------------------------------------------------ */
  /*                                Actions                                   */
  /* ------------------------------------------------------------------------ */

  const handleCreate = (): void => {
    setSelectedEducation(null);

    setIsDialogOpen(true);
  };

  const handleEdit = (education: IEducation): void => {
    setSelectedEducation(education);

    setIsDialogOpen(true);
  };

  const handleDelete = async (education: IEducation): Promise<void> => {
    await deleteEducation.mutateAsync({
      id: education._id,
    });

    await refetch();
  };

  /* ------------------------------------------------------------------------ */
  /*                               Loading                                    */
  /* ------------------------------------------------------------------------ */

  if (isLoading && !data) {
    return <PageLoader message="Loading education..." />;
  }

  /* ------------------------------------------------------------------------ */
  /*                               Error                                      */
  /* ------------------------------------------------------------------------ */

  if (isError) {
    return (
      <PageContainer>
        <PageTitle
          title="Education"
          description="Manage academic qualifications and education history."
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
                Failed to load education
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
  /*                                 Render                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle
          title="Education"
          description="Manage education history, qualifications, achievements and academic portfolio."
          actions={
            <GraduationCap
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <EducationActions
          totalEducations={stats.total}
          activeEducations={stats.active}
          currentEducations={stats.current}
          onCreate={handleCreate}
          onRefresh={() => {
            void refetch();
          }}
        />

        <EducationFilters
          searchTerm={searchTerm}
          educationLevel={educationLevel}
          isCurrent={isCurrent}
          isActive={isActive}
          educationLevels={educationLevels}
          isLoading={isFetching}
          onSearchChange={(value) => {
            setSearchTerm(value);

            setPage(1);
          }}
          onEducationLevelChange={(value) => {
            setEducationLevel(value);

            setPage(1);
          }}
          onIsCurrentChange={(value) => {
            setIsCurrent(value);

            setPage(1);
          }}
          onIsActiveChange={(value) => {
            setIsActive(value);

            setPage(1);
          }}
        />

        <EducationTable
          educations={educations}
          meta={data?.meta}
          isLoading={isFetching}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);

            setPage(1);
          }}
          onEdit={handleEdit}
          onDelete={(education) => {
            void handleDelete(education);
          }}
        />

        <EducationDialog
          open={isDialogOpen}
          education={selectedEducation}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedEducation(null);

              setIsDialogOpen(false);

              return;
            }

            setIsDialogOpen(true);
          }}
          onSuccess={() => {
            setSelectedEducation(null);

            setIsDialogOpen(false);

            void refetch();
          }}
        />
      </div>
    </PageContainer>
  );
}

export default EducationListPage;
