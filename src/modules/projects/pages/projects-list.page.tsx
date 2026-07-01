// src/modules/projects/pages/projects-list.page.tsx

import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { PageLoader } from "@/components/common/page-loader";

import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";
import { ProjectDialog } from "../components";
import { ProjectsActions, ProjectsFilters, ProjectsTable } from "../components";

import { useProjects } from "../hooks";

import { usePagination } from "@/shared/hooks/use-pagination";

import type { IProject, IProjectsQueryParams } from "../types";

export function ProjectsListPage(): ReactElement {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  const [activeFilter, setActiveFilter] = useState("all");
  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });
  const query: IProjectsQueryParams = {
    page,
    limit,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  if (categoryFilter !== "all") {
    query.category = categoryFilter;
  }

  if (statusFilter !== "all") {
    query.status = statusFilter;
  }

  if (activeFilter !== "all") {
    query.isActive = activeFilter === "active";
  }

  const { data, isLoading, isFetching, isError, error, refetch } =
    useProjects(query);

  const projects = useMemo<IProject[]>(() => data?.data ?? [], [data]);

  const stats = useMemo(
    () => ({
      total: data?.meta?.total ?? 0,

      active: projects.filter((project) => project.isActive).length,
    }),
    [data, projects],
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(projects.map((project) => project.category).filter(Boolean)),
      ).sort(),
    [projects],
  );

  const statuses = useMemo(
    () =>
      Array.from(
        new Set(projects.map((project) => project.status).filter(Boolean)),
      ).sort(),
    [projects],
  );



  const handleCreate = (): void => {
    setSelectedProject(null);

    setIsFormOpen(true);
  };

  const handleEdit = (project: IProject): void => {
    setSelectedProject(project);

    setIsFormOpen(true);
  };

  const handleCloseForm = (): void => {
    setSelectedProject(null);

    setIsFormOpen(false);
  };
  if (isLoading && !data) {
    return <PageLoader message="Loading projects..." />;
  }

  if (isError) {
    return (
      <PageContainer ultraWide>
        <PageTitle
          title="Projects"
          description="Manage portfolio projects and showcase work."
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
                Failed to load projects
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

  return (
    <PageContainer ultraWide>
      <div className="space-y-6">
        <PageTitle
          title="Projects"
          description="Manage portfolio projects, technologies, categories and showcase work."
          actions={
            <FolderKanban
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <ProjectsActions
          totalProjects={stats.total}
          activeProjects={stats.active}
          isRefreshing={isFetching}
          onCreate={handleCreate}
          onRefresh={() => {
            void refetch();
          }}
        />

        <ProjectsFilters
          searchTerm={searchTerm}
          category={categoryFilter}
          status={statusFilter}
          active={activeFilter}
          categories={categories}
          statuses={statuses}
          isLoading={isFetching}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
          onCategoryChange={(value) => {
            setCategoryFilter(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
          onActiveChange={(value) => {
            setActiveFilter(value);
            setPage(1);
          }}
        />

        <ProjectsTable
          projects={projects}
          meta={data?.meta}
          isLoading={isFetching}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          onEdit={handleEdit}
        />

        <ProjectDialog
          open={isFormOpen}
          project={selectedProject}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseForm();

              return;
            }

            setIsFormOpen(true);
          }}
          onSubmit={async (values) => {
            console.log(values);

            handleCloseForm();
          }}
        />
      </div>
    </PageContainer>
  );
}

export default ProjectsListPage;
