import type { ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ExperienceForm } from "./experience-form";

import type { IExperience } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ExperienceDialogProps {
  open: boolean;

  experience?: IExperience | null;

  onOpenChange: (
    open: boolean,
  ) => void;

  onSuccess?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                             Experience Dialog                              */
/* -------------------------------------------------------------------------- */

export function ExperienceDialog({
  open,
  experience,
  onOpenChange,
  onSuccess,
}: ExperienceDialogProps): ReactElement {
  const isEditMode =
    experience !== null &&
    experience !== undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          sm:max-w-5xl
        "
      >
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Update Experience"
              : "Create Experience"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update your professional experience, responsibilities, technologies and career details."
              : "Add a new professional experience entry to showcase your career journey and achievements."}
          </DialogDescription>
        </DialogHeader>

        {isEditMode ? (
          <ExperienceForm
            mode="edit"
            experience={experience}
            onSuccess={() => {
              onSuccess?.();

              onOpenChange(false);
            }}
          />
        ) : (
          <ExperienceForm
            mode="create"
            onSuccess={() => {
              onSuccess?.();

              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ExperienceDialog;