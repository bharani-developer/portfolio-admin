// src/modules/skills/pages/skills-list.page.tsx

import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, Cpu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";
import {
  SkillForm,
  SkillsActions,
  SkillsFilters,
  SkillsTable,
} from "../components";

import { useSkills } from "../hooks";

import type { ISkill, ISkillsQueryParams, TSkillCategory } from "../types";

/* -------------------------------------------------------------------------- */
/*                              Skills List Page                              */
/* -------------------------------------------------------------------------- */

export function SkillsListPage(): ReactElement {
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState<TSkillCategory | "all">("all");

  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });
  const query: ISkillsQueryParams = {
    page,
    limit,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  if (category !== "all") {
    query.category = category;
  }

  if (status !== "all") {
    query.isActive = status === "active";
  }

  const { data, isLoading, isError, error, refetch } = useSkills(query);

  /* ------------------------------------------------------------------------ */
  /*                                Raw Data                                  */
  /* ------------------------------------------------------------------------ */

  const skills = useMemo(() => data?.data ?? [], [data]);

  /* ------------------------------------------------------------------------ */
  /*                                 Stats                                    */
  /* ------------------------------------------------------------------------ */

  const stats = useMemo(() => {
    return {
      total: data?.meta?.total ?? 0,

      active: skills.filter((skill) => skill.isActive).length,
    };
  }, [data, skills]);

  /* ------------------------------------------------------------------------ */
  /*                                 Actions                                  */
  /* ------------------------------------------------------------------------ */

  const handleCreate = (): void => {
    setSelectedSkill(null);

    setIsFormOpen(true);
  };

  const handleEdit = (skill: ISkill): void => {
    setSelectedSkill(skill);

    setIsFormOpen(true);
  };

  const handleCloseForm = (): void => {
    setSelectedSkill(null);

    setIsFormOpen(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                               Error State                                */
  /* ------------------------------------------------------------------------ */

  if (isError) {
    return (
      <PageContainer>
        <PageTitle
          title="Skills"
          description="Manage your portfolio skills and technology stack."
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
                Failed to load skills
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
          title="Skills"
          description="Manage your technical skills, proficiency levels, categories and portfolio technology stack."
          actions={
            <Cpu
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <SkillsActions
          totalSkills={stats.total}
          activeSkills={stats.active}
          onCreate={handleCreate}
          onRefresh={() => {
            void refetch();
          }}
        />
        <SkillsFilters
          searchTerm={searchTerm}
          category={category}
          status={status}
          isLoading={isLoading}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />
        <SkillsTable
          skills={skills}
          page={page}
          limit={limit}
          isLoading={isLoading}
          onPageChange={setPage}
          onLimitChange={setLimit}
          onEdit={handleEdit}
          {...(data?.meta ? { meta: data.meta } : {})}
        />

        <SkillForm
          open={isFormOpen}
          skill={selectedSkill}
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

export default SkillsListPage;
