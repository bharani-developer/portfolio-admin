import { useMemo } from "react";

import type { ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { EducationForm } from "./education-form";

import { useCreateEducation, useUpdateEducation } from "../hooks";

import {
  buildCreateEducationPayload,
  buildUpdateEducationPayload,
} from "../utils/build-education-payload";

import type { EducationFormValues } from "../schemas";

import type { IEducation } from "../types";

interface EducationDialogProps {
  open: boolean;

  education?: IEducation | null;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;
}

export function EducationDialog({
  open,
  education,
  onOpenChange,
  onSuccess,
}: EducationDialogProps): ReactElement {
  const createEducationMutation = useCreateEducation();

  const updateEducationMutation = useUpdateEducation();

  const isEditMode = education !== null && education !== undefined;

  const isSubmitting =
    createEducationMutation.isPending || updateEducationMutation.isPending;

  const defaultValues = useMemo<
    Partial<EducationFormValues> | undefined
  >(() => {
    if (!education) {
      return undefined;
    }

    return {
      institution: education.institution,

      institutionLogo: education.institutionLogo,

      degree: education.degree,

      fieldOfStudy: education.fieldOfStudy,

      educationLevel: education.educationLevel,

      educationType: education.educationType,

      location: education.location,

      startDate: education.startDate,

      endDate: education.endDate ?? "",

      isCurrent: education.isCurrent,

      gradeType: education.gradeType,

      grade: education.grade ?? "",

      description: education.description ?? "",

      achievements: education.achievements ?? [],

      skills: education.skills ?? [],

      institutionWebsite: education.institutionWebsite ?? "",

      sortOrder: education.sortOrder,

      isActive: education.isActive,
    };
  }, [education]);

  const handleSubmit = async (values: EducationFormValues): Promise<void> => {
    if (isEditMode && education) {
      await updateEducationMutation.mutateAsync({
        id: education._id,

        payload: buildUpdateEducationPayload(values),
      });
    } else {
      await createEducationMutation.mutateAsync(
        buildCreateEducationPayload(values),
      );
    }

    onOpenChange(false);

    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          sm:max-w-5xl
        "
      >
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Education" : "Create Education"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update academic qualification details, achievements, grades and educational information."
              : "Add a new education record including qualifications, achievements and academic details."}
          </DialogDescription>
        </DialogHeader>

        <EducationForm
          {...(defaultValues
            ? {
                defaultValues,
              }
            : {})}
          isSubmitting={isSubmitting}
          submitText={isEditMode ? "Update Education" : "Create Education"}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EducationDialog;
