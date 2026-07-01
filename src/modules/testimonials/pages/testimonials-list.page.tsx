import { useMemo, useState } from "react";

import type { ReactElement } from "react";

import { AlertCircle, MessageSquareQuote } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { PageLoader } from "@/components/common/page-loader";
import { PageTitle } from "@/components/common/page-title";

import { PageContainer } from "@/components/layout/page-container";

import { usePagination } from "@/shared/hooks/use-pagination";
import {
  TestimonialDialog,
  TestimonialsActions,
  TestimonialsFilters,
  TestimonialsTable,
} from "../components";

import { useTestimonials } from "../hooks/use-testimonials";
import { useDeleteTestimonial } from "../hooks/use-delete-testimonial";

import type {
  ITestimonial,
  ITestimonialQueryParams,
  TClientType,
} from "../types";

export function TestimonialsListPage(): ReactElement {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<ITestimonial | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [clientType, setClientType] = useState<TClientType | "all">("all");

  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const [featured, setFeatured] = useState<"all" | "featured" | "not-featured">(
    "all",
  );
  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });


/* -------------------------------------------------------------------------- */
/*                              Query Parameters                              */
/* -------------------------------------------------------------------------- */

const query = useMemo<ITestimonialQueryParams>(() => {
  const params: ITestimonialQueryParams = {
    page,
    limit,
  };

  if (searchTerm.trim()) {
    params.searchTerm = searchTerm.trim();
  }

  if (clientType !== "all") {
    params.clientType = clientType;
  }

  if (status !== "all") {
    params.isActive = status === "active";
  }

  if (featured !== "all") {
    params.isFeatured = featured === "featured";
  }

  return params;
}, [
  page,
  limit,
  searchTerm,
  clientType,
  status,
  featured,
]);

const {
  data,
  isLoading,
  isFetching,
  isError,
  error,
  refetch,
} = useTestimonials(query);
  const deleteMutation = useDeleteTestimonial();

  const testimonials = useMemo<ITestimonial[]>(() => data?.data ?? [], [data]);

const stats = useMemo(
  () => ({
    total: data?.meta?.total ?? 0,

    active: testimonials.filter(
      (testimonial) => testimonial.isActive,
    ).length,

    featured: testimonials.filter(
      (testimonial) => testimonial.isFeatured,
    ).length,
  }),
  [data, testimonials],
);



  const handleCreate = (): void => {
    setSelectedTestimonial(null);

    setIsDialogOpen(true);
  };

  const handleEdit = (testimonial: ITestimonial): void => {
    setSelectedTestimonial(testimonial);

    setIsDialogOpen(true);
  };

  const handleDelete = async (testimonial: ITestimonial): Promise<void> => {
    await deleteMutation.mutateAsync({
      id: testimonial._id,
    });

    await refetch();
  };

  const handleCloseDialog = (): void => {
    setSelectedTestimonial(null);

    setIsDialogOpen(false);
  };

  if (isLoading) {
    return <PageLoader message="Loading testimonials..." />;
  }

  if (isError) {
    return (
      <PageContainer ultraWide>
        <PageTitle
          title="Testimonials"
          description="Manage client testimonials and portfolio reviews."
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
                Failed to load testimonials
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
          title="Testimonials"
          description="Manage client testimonials, customer reviews, featured feedback and portfolio recommendations."
          actions={
            <MessageSquareQuote
              className="
                size-5
                text-muted-foreground
              "
            />
          }
        />

        <TestimonialsActions
          totalTestimonials={stats.total}
          activeTestimonials={stats.active}
          featuredTestimonials={stats.featured}
          onCreate={handleCreate}
          onRefresh={() => {
            void refetch();
          }}
        />

        <TestimonialsFilters
          searchTerm={searchTerm}
          clientType={clientType}
          status={status}
          featured={featured}
          isLoading={isFetching}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
          onClientTypeChange={(value) => {
            setClientType(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onFeaturedChange={(value) => {
            setFeatured(value);
            setPage(1);
          }}
        />

        <TestimonialsTable
          testimonials={testimonials}
          meta={data?.meta}
          isLoading={isFetching}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          onEdit={handleEdit}
          onDelete={(testimonial) => {
            void handleDelete(testimonial);
          }}
        />

        <TestimonialDialog
          open={isDialogOpen}
          testimonial={selectedTestimonial}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseDialog();

              return;
            }

            setIsDialogOpen(true);
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

export default TestimonialsListPage;
