// src\modules\projects\components\project-form.tsx

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { GalleryUpload } from "@/modules/upload/components/gallery-upload";
import { ImageUpload } from "@/modules/upload/components/image-upload";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { FormInput, FormTextarea, FormSwitch } from "@/components/forms";

import { SubmitButton } from "@/components/forms/submit-button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { projectFormSchema, type ProjectFormValues } from "../schemas";

import { PROJECT_DEFAULT_VALUES } from "../types";

interface ProjectFormProps {
  defaultValues?: Partial<ProjectFormValues>;

  isLoading?: boolean;

  submitText?: string;

  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
}

export function ProjectForm({
  defaultValues,
  isLoading = false,
  submitText = "Save Project",
  onSubmit,
}: ProjectFormProps): React.JSX.Element {
  const [technologyInput, setTechnologyInput] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),

    defaultValues: {
      ...PROJECT_DEFAULT_VALUES,
      ...defaultValues,
    },
  });

  const technologies =
    useWatch({
      control: form.control,
      name: "technologies",
    }) ?? [];

  const handleAddTechnology = (): void => {
    const value = technologyInput.trim();

    if (!value) {
      return;
    }

    if (technologies.includes(value)) {
      return;
    }

    form.setValue("technologies", [...technologies, value], {
      shouldValidate: true,
    });

    setTechnologyInput("");
  };

  const handleRemoveTechnology = (technology: string): void => {
    form.setValue(
      "technologies",
      technologies.filter((item) => item !== technology),
      {
        shouldValidate: true,
      },
    );
  };

  const handleSubmit = async (values: ProjectFormValues): Promise<void> => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardContent className="space-y-6 pt-6">
            <FormInput
              control={form.control}
              name="title"
              label="Title"
              required
            />

            <FormTextarea
              control={form.control}
              name="shortDescription"
              label="Short Description"
              required
              rows={4}
            />

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              required
              rows={8}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>

                  <FormControl>
                    <ImageUpload
                      value={field.value ?? null}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery Images</FormLabel>

                  <FormControl>
                    <GalleryUpload
                      value={field.value ?? []}
                      onChange={field.onChange}
                      disabled={isLoading}
                      maxImages={20}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <FormLabel>Technologies</FormLabel>

              <div className="flex gap-2">
                <input
                  value={technologyInput}
                  onChange={(event) => setTechnologyInput(event.target.value)}
                  className="
                    border-input
                    flex-1
                    rounded-md
                    border
                    px-3
                    py-2
                  "
                  placeholder="React"
                />

                <Button type="button" onClick={handleAddTechnology}>
                  <Plus className="size-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <div
                    key={technology}
                    className="
                        bg-secondary
                        flex
                        items-center
                        gap-2
                        rounded-md
                        px-3
                        py-1
                        text-sm
                      "
                  >
                    {technology}

                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(technology)}
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>

              {form.formState.errors.technologies ? (
                <p className="text-destructive text-sm">
                  {form.formState.errors.technologies.message}
                </p>
              ) : null}
            </div>

            <FormInput
              control={form.control}
              name="category"
              label="Category"
              required
            />

            <FormInput
              control={form.control}
              name="status"
              label="Status"
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 pt-6">
            <FormInput
              control={form.control}
              name="githubUrl"
              label="GitHub URL"
            />

            <FormInput control={form.control} name="liveUrl" label="Live URL" />

            <FormInput
              control={form.control}
              name="startDate"
              label="Start Date"
              type="date"
            />

            <FormInput
              control={form.control}
              name="endDate"
              label="End Date"
              type="date"
            />

            <FormInput
              control={form.control}
              name="sortOrder"
              label="Sort Order"
              type="number"
            />

            <FormSwitch
              control={form.control}
              name="featured"
              label="Featured"
            />

            <FormSwitch control={form.control} name="isActive" label="Active" />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <SubmitButton isLoading={isLoading} loadingText="Saving...">
            {submitText}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
