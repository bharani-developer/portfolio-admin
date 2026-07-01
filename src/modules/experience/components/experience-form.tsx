// src\modules\experience\components\experience-form.tsx
import { useEffect } from "react";

import { useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Plus,
  Trash2,
  BriefcaseBusiness,
  Building2,
  Settings,
  Wrench,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";

import {
  FormInput,
  FormSelect,
  FormSwitch,
  SubmitButton,
} from "@/components/forms";

import { FormEditor } from "@/components/editor/form-editor";

import { ImageUpload } from "@/modules/upload";

import { useCreateExperience, useUpdateExperience } from "../hooks";

import { experienceFormSchema, type ExperienceFormValues } from "../schemas";

import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_DEFAULT_VALUES,
  WORK_MODES,
  type IExperience,
} from "../types";
import type {
  ICreateExperiencePayload,
  IUpdateExperiencePayload,
} from "../types";
/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ExperienceFormProps =
  | {
      mode: "create";
      onSuccess?: () => void;
    }
  | {
      mode: "edit";
      experience: IExperience;
      onSuccess?: () => void;
    };
/* -------------------------------------------------------------------------- */
/*                              Experience Form                               */
/* -------------------------------------------------------------------------- */

export function ExperienceForm(props: ExperienceFormProps): React.JSX.Element {
  const { onSuccess } = props;

  const experience = props.mode === "edit" ? props.experience : undefined;

  const createExperienceMutation = useCreateExperience();

  const updateExperienceMutation = useUpdateExperience();

  const isEditMode = props.mode === "edit";

  const isSubmitting =
    createExperienceMutation.isPending || updateExperienceMutation.isPending;

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),

    defaultValues: experience
      ? {
          company: experience.company,

          companyLogo: experience.companyLogo,

          position: experience.position,

          employmentType: experience.employmentType,

          workMode: experience.workMode,

          location: experience.location,

          startDate: experience.startDate?.split("T")[0] ?? "",

          endDate: experience.endDate?.split("T")[0] ?? "",

          isCurrent: experience.isCurrent,

          summary: experience.summary,

          responsibilities: experience.responsibilities,

          technologies: experience.technologies,

          companyWebsite: experience.companyWebsite ?? "",

          sortOrder: experience.sortOrder,

          isActive: experience.isActive,
        }
      : EXPERIENCE_DEFAULT_VALUES,
  });

  const responsibilities = useWatch({
    control: form.control,
    name: "responsibilities",
  });

  const technologies = useWatch({
    control: form.control,
    name: "technologies",
  });

  const isCurrent = useWatch({
    control: form.control,
    name: "isCurrent",
  });

  const addResponsibility = (): void => {
    form.setValue(
      "responsibilities",
      [...form.getValues("responsibilities"), ""],
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };
  const addTechnology = (): void => {
    form.setValue("technologies", [...form.getValues("technologies"), ""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const removeResponsibility = (index: number): void => {
    const values = form
      .getValues("responsibilities")
      .filter((_, currentIndex) => currentIndex !== index);

    form.setValue("responsibilities", values, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeTechnology = (index: number): void => {
    const values = form
      .getValues("technologies")
      .filter((_, currentIndex) => currentIndex !== index);

    form.setValue("technologies", values, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const employmentTypeOptions = EMPLOYMENT_TYPES.map((type) => ({
    label: type,

    value: type,
  }));

  const workModeOptions = WORK_MODES.map((mode) => ({
    label: mode,

    value: mode,
  }));

  useEffect(() => {
    if (!isCurrent) {
      return;
    }

    form.setValue("endDate", "", {
      shouldValidate: true,
    });
  }, [isCurrent, form]);
  useEffect(() => {
    if (!experience) {
      return;
    }

    form.reset({
      company: experience.company,

      companyLogo: experience.companyLogo,

      position: experience.position,

      employmentType: experience.employmentType,

      workMode: experience.workMode,

      location: experience.location,

      startDate: experience.startDate?.split("T")[0] ?? "",

      endDate: experience.endDate?.split("T")[0] ?? "",

      isCurrent: experience.isCurrent,

      summary: experience.summary,

      responsibilities: experience.responsibilities,

      technologies: experience.technologies,

      companyWebsite: experience.companyWebsite ?? "",

      sortOrder: experience.sortOrder,

      isActive: experience.isActive,
    });
  }, [experience, form]);
  const handleSubmit = async (values: ExperienceFormValues): Promise<void> => {
    const payload: ICreateExperiencePayload = {
      company: values.company,

      position: values.position,

      employmentType: values.employmentType,

      workMode: values.workMode,

      location: values.location,

      startDate: values.startDate,

      endDate: values.isCurrent ? null : values.endDate || null,

      isCurrent: values.isCurrent,

      summary: values.summary,

      responsibilities: values.responsibilities,

      technologies: values.technologies,

      sortOrder: values.sortOrder,

      isActive: values.isActive,
    };

    if (values.companyLogo) {
      payload.companyLogo = values.companyLogo;
    }

    if (values.companyWebsite.trim()) {
      payload.companyWebsite = values.companyWebsite;
    }

    if (isEditMode && experience) {
      const updatePayload: IUpdateExperiencePayload = payload;

      await updateExperienceMutation.mutateAsync({
        id: experience._id,

        payload: updatePayload,
      });
    } else {
      await createExperienceMutation.mutateAsync(payload);
    }

    onSuccess?.();

    if (!isEditMode) {
      form.reset(EXPERIENCE_DEFAULT_VALUES);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle
              className="
                flex
                items-center
                gap-2
              "
            >
              <Building2 className="size-5" />
              Company Information
            </CardTitle>

            <CardDescription>
              Basic company and position details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div
              className="
                grid
                gap-6
                md:grid-cols-2
              "
            >
              <FormInput
                control={form.control}
                name="company"
                label="Company Name"
                placeholder="OpenAI"
                required
              />

              <FormInput
                control={form.control}
                name="position"
                label="Position"
                placeholder="Full Stack Developer"
                required
              />
            </div>

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>

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

            <div
              className="
                grid
                gap-6
                md:grid-cols-2
              "
            >
              <FormSelect
                control={form.control}
                name="employmentType"
                label="Employment Type"
                options={employmentTypeOptions}
                placeholder="Select employment type"
                required
              />

              <FormSelect
                control={form.control}
                name="workMode"
                label="Work Mode"
                options={workModeOptions}
                placeholder="Select work mode"
                required
              />
            </div>

            <div
              className="
                grid
                gap-6
                md:grid-cols-2
              "
            >
              <FormInput
                control={form.control}
                name="location"
                label="Location"
                placeholder="Chennai, India"
                required
              />

              <FormInput
                control={form.control}
                name="companyWebsite"
                label="Company Website"
                placeholder="https://company.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
              className="
                flex
                items-center
                gap-2
              "
            >
              <BriefcaseBusiness className="size-5" />
              Employment Duration
            </CardTitle>

            <CardDescription>
              Configure employment dates and current status.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormSwitch
              control={form.control}
              name="isCurrent"
              label="Current Position"
              description="Enable if you currently work here."
            />

            <div
              className="
                grid
                gap-6
                md:grid-cols-2
              "
            >
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

        <Card>
          <CardHeader>
            <CardTitle>Experience Summary</CardTitle>

            <CardDescription>
              Provide a detailed overview of your role and achievements.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Describe your responsibilities, achievements and impact..."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Responsibilities</CardTitle>

            <CardDescription>
              Add responsibilities performed during this role.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {responsibilities.map((_, index) => (
              <div
                key={index}
                className="
        flex
        items-start
        gap-3
      "
              >
                <div className="flex-1">
                  <FormInput
                    control={form.control}
                    name={`responsibilities.${index}`}
                    label={`Responsibility ${index + 1}`}
                    placeholder="Built scalable REST APIs"
                    required
                  />
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="mt-8"
                  disabled={responsibilities.length === 1}
                  onClick={() => removeResponsibility(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addResponsibility}>
              <Plus className="size-4" />
              Add Responsibility
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>

            <CardDescription>
              Add technologies used during this experience.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {technologies.map((_, index) => (
              <div
                key={index}
                className="
      flex
      items-start
      gap-3
    "
              >
                <div className="flex-1">
                  <FormInput
                    control={form.control}
                    name={`technologies.${index}`}
                    label={`Technology ${index + 1}`}
                    placeholder="React"
                    required
                  />
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="mt-8"
                  disabled={technologies.length === 1}
                  onClick={() => removeTechnology(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addTechnology}>
              <Plus className="size-4" />
              Add Technology
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle
              className="
                flex
                items-center
                gap-2
              "
            >
              <Settings className="size-5" />
              Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormInput
              control={form.control}
              name="sortOrder"
              label="Sort Order"
              type="number"
              min={0}
              valueAsNumber
            />

            <FormSwitch
              control={form.control}
              name="isActive"
              label="Active Experience"
              description="Display this experience publicly."
            />
          </CardContent>
        </Card>

        <Separator />

        <div
          className="
            flex
            justify-end
          "
        >
          <SubmitButton
            size="lg"
            isLoading={isSubmitting}
            loadingText={
              isEditMode ? "Updating Experience..." : "Creating Experience..."
            }
          >
            <Wrench className="size-4" />

            {isEditMode ? "Update Experience" : "Create Experience"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
