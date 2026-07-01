// src\modules\education\components\education-form.tsx

import { useEffect } from "react";

import { Plus, Trash2 } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  FormInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  SubmitButton,
} from "@/components/forms";

import { Button } from "@/components/ui/button";

import { ImageUpload } from "@/modules/upload/components";

import {
  EDUCATION_DEFAULT_VALUES,
  EDUCATION_LEVELS,
  EDUCATION_TYPES,
  GRADE_TYPES,
} from "../types";

import { educationFormSchema, type EducationFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface EducationFormProps {
  defaultValues?: Partial<EducationFormValues>;

  isSubmitting?: boolean;

  submitText?: string;

  onSubmit: (values: EducationFormValues) => Promise<void> | void;
}

/* -------------------------------------------------------------------------- */
/*                              Education Form                                */
/* -------------------------------------------------------------------------- */

export function EducationForm({
  defaultValues,
  isSubmitting = false,
  submitText = "Save Education",
  onSubmit,
}: EducationFormProps): React.JSX.Element {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),

    defaultValues: {
      ...EDUCATION_DEFAULT_VALUES,
      ...defaultValues,
    },

    mode: "onChange",
  });

  const isCurrent = form.watch("isCurrent");

  const achievements = form.watch("achievements");

  const skills = form.watch("skills");

  useEffect(() => {
    if (isCurrent) {
      form.setValue("endDate", "");
    }
  }, [form, isCurrent]);

  const handleSubmit = async (values: EducationFormValues): Promise<void> => {
    await onSubmit(values);
  };

  const addAchievement = (): void => {
    form.setValue("achievements", [...achievements, ""]);
  };

  const removeAchievement = (index: number): void => {
    form.setValue(
      "achievements",
      achievements.filter((_, i) => i !== index),
    );
  };

  const addSkill = (): void => {
    form.setValue("skills", [...skills, ""]);
  };

  const removeSkill = (index: number): void => {
    form.setValue(
      "skills",
      skills.filter((_, i) => i !== index),
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* ------------------------------------------------------------------ */}
        {/* Institution Information                                             */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader>
            <CardTitle>Institution Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="institutionLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Logo</FormLabel>

                  <FormControl>
                    <ImageUpload
                      value={field.value ?? null}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                control={form.control}
                name="institution"
                label="Institution"
                required
              />

              <FormInput
                control={form.control}
                name="institutionWebsite"
                label="Website"
                placeholder="https://example.com"
              />
            </div>

            <FormInput
              control={form.control}
              name="location"
              label="Location"
              required
            />
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* Academic Information                                                */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormInput
              control={form.control}
              name="degree"
              label="Degree"
              required
            />

            <FormInput
              control={form.control}
              name="fieldOfStudy"
              label="Field Of Study"
              required
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                control={form.control}
                name="educationLevel"
                label="Education Level"
                required
                options={EDUCATION_LEVELS.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />

              <FormSelect
                control={form.control}
                name="educationType"
                label="Education Type"
                required
                options={EDUCATION_TYPES.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* Timeline                                                            */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormSwitch
              control={form.control}
              name="isCurrent"
              label="Currently Studying"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                control={form.control}
                name="startDate"
                label="Start Date"
                type="date"
                required
              />

              <FormInput
                control={form.control}
                name="endDate"
                label="End Date"
                type="date"
                disabled={isCurrent}
                required={!isCurrent}
              />
            </div>
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* Academic Performance                                                */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                control={form.control}
                name="gradeType"
                label="Grade Type"
                required
                options={GRADE_TYPES.map((item) => ({
                  label: item,
                  value: item,
                }))}
              />

              <FormInput control={form.control} name="grade" label="Grade" />
            </div>

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              rows={5}
            />
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* Achievements                                                        */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Achievements</CardTitle>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addAchievement}
            >
              <Plus className="size-4" />
              Add
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {achievements.map((_, index) => (
              <div key={index} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`achievements.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <input
                          {...field}
                          className="
                            border-input
                            h-10
                            w-full
                            rounded-md
                            border
                            px-3
                          "
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAchievement(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* Skills                                                              */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addSkill}
            >
              <Plus className="size-4" />
              Add
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {skills.map((_, index) => (
              <div key={index} className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`skills.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <input
                          {...field}
                          className="
                            border-input
                            h-10
                            w-full
                            rounded-md
                            border
                            px-3
                          "
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ------------------------------------------------------------------ */}
        {/* Settings                                                            */}
        {/* ------------------------------------------------------------------ */}

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormInput
              control={form.control}
              name="sortOrder"
              label="Sort Order"
              type="number"
              valueAsNumber
              required
            />

            <FormSwitch control={form.control} name="isActive" label="Active" />
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end">
          <SubmitButton
            size="lg"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            {submitText}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
