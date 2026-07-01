// src/modules/testimonials/components/testimonial-form.tsx

import type { ReactElement } from "react";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";

import { Form } from "@/components/ui/form";

import {
  FormImageUpload,
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  SubmitButton,
} from "@/components/forms";

import { useCreateTestimonial, useUpdateTestimonial } from "../hooks";

import { testimonialFormSchema, type TestimonialFormValues } from "../schemas";

import {
  CLIENT_TYPES,
  TESTIMONIAL_DEFAULT_VALUES,
  type ICreateTestimonialPayload,
  type ITestimonial,
} from "../types";

interface TestimonialFormProps {
  testimonial?: ITestimonial;

  onSuccess?: () => void;
}

export function TestimonialForm({
  testimonial,
  onSuccess,
}: TestimonialFormProps): ReactElement {
  const createMutation = useCreateTestimonial();

  const updateMutation = useUpdateTestimonial();

  const isEditMode = Boolean(testimonial);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),

    defaultValues: TESTIMONIAL_DEFAULT_VALUES,

    mode: "onChange",
  });

  useEffect(() => {
    if (!testimonial) {
      return;
    }

    form.reset({
      clientName: testimonial.clientName,

      clientPosition: testimonial.clientPosition ?? "",

      clientCompany: testimonial.clientCompany ?? "",

      clientWebsite: testimonial.clientWebsite ?? "",

      projectName: testimonial.projectName ?? "",

      review: testimonial.review,

      rating: testimonial.rating,

      clientType: testimonial.clientType,

      isFeatured: testimonial.isFeatured,

      sortOrder: testimonial.sortOrder,

      isActive: testimonial.isActive,

      clientImage: null,
    });
  }, [testimonial, form]);

  const onSubmit = async (values: TestimonialFormValues): Promise<void> => {
    try {
      const payload: ICreateTestimonialPayload = {
        clientName: values.clientName,

        review: values.review,

        rating: values.rating,

        clientType: values.clientType,

        isFeatured: values.isFeatured,

        sortOrder: values.sortOrder,

        isActive: values.isActive,
      };

      if (values.clientPosition.trim()) {
        payload.clientPosition = values.clientPosition.trim();
      }

      if (values.clientCompany.trim()) {
        payload.clientCompany = values.clientCompany.trim();
      }

      if (values.clientWebsite.trim()) {
        payload.clientWebsite = values.clientWebsite.trim();
      }

      if (values.projectName.trim()) {
        payload.projectName = values.projectName.trim();
      }

      /**
       * Upload image before submit.
       *
       * Example:
       *
       * if (values.clientImage) {
       *   const image =
       *     await uploadService.uploadImage(
       *       values.clientImage,
       *     );
       *
       *   payload.clientImage = {
       *     url: image.url,
       *     publicId: image.publicId,
       *   };
       * }
       */

      if (isEditMode && testimonial) {
        await updateMutation.mutateAsync({
          id: testimonial._id,

          payload,
        });

        toast.success("Testimonial updated successfully.");
      } else {
        await createMutation.mutateAsync(payload);

        toast.success("Testimonial created successfully.");

        form.reset(TESTIMONIAL_DEFAULT_VALUES);
      }

      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          control={form.control}
          name="clientName"
          label="Client Name"
          placeholder="John Doe"
          required
        />

        <FormInput
          control={form.control}
          name="clientPosition"
          label="Client Position"
          placeholder="Senior Product Manager"
        />

        <FormInput
          control={form.control}
          name="clientCompany"
          label="Company"
          placeholder="Acme Inc."
        />

        <FormInput
          control={form.control}
          name="clientWebsite"
          label="Website"
          placeholder="https://example.com"
        />

        <FormInput
          control={form.control}
          name="projectName"
          label="Project Name"
          placeholder="Portfolio Website"
        />

        <FormSelect
          control={form.control}
          name="clientType"
          label="Client Type"
          required
          options={CLIENT_TYPES.map((type) => ({
            label: type,
            value: type,
          }))}
        />

        <FormInput
          control={form.control}
          name="rating"
          label="Rating"
          type="number"
          required
          description="Rating from 1 to 5."
        />

        <FormTextarea
          control={form.control}
          name="review"
          label="Review"
          placeholder="Write testimonial review..."
          rows={6}
          required
        />

        <Controller
          control={form.control}
          name="clientImage"
          render={({ field }) => (
            <div className="space-y-2">
              <label
                className="
                  text-sm
                  font-medium
                "
              >
                Client Image
              </label>

              <FormImageUpload
                value={field.value ?? null}
                {...(testimonial?.clientImage?.url
                  ? {
                      previewUrl: testimonial.clientImage.url,
                    }
                  : {})}
                onChange={field.onChange}
                disabled={isSubmitting}
              />
            </div>
          )}
        />

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <FormInput
            control={form.control}
            name="sortOrder"
            label="Sort Order"
            type="number"
          />

          <div
            className="
              flex
              flex-col
              gap-4
              pt-2
            "
          >
            <FormSwitch
              control={form.control}
              name="isFeatured"
              label="Featured"
            />

            <FormSwitch control={form.control} name="isActive" label="Active" />
          </div>
        </div>

        <SubmitButton
          type="submit"
          isLoading={isSubmitting}
          loadingText={isEditMode ? "Updating..." : "Creating..."}
          className="w-full"
        >
          {isEditMode ? "Update Testimonial" : "Create Testimonial"}
        </SubmitButton>
      </form>
    </Form>
  );
}
