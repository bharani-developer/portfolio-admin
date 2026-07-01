// src/modules/testimonials/components/testimonial-dialog.tsx

import type { ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TestimonialForm } from "./testimonial-form";

import type { ITestimonial } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface TestimonialDialogProps {
  open: boolean;

  testimonial?: ITestimonial | null;

  onOpenChange: (
    open: boolean,
  ) => void;

  onSuccess?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                           Testimonial Dialog                               */
/* -------------------------------------------------------------------------- */

export function TestimonialDialog({
  open,
  testimonial = null,
  onOpenChange,
  onSuccess,
}: TestimonialDialogProps): ReactElement {
  const handleSuccess =
    (): void => {
      onSuccess?.();

      onOpenChange(false);
    };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          max-h-[90vh]
          overflow-y-auto
          sm:max-w-4xl
        "
      >
        <DialogHeader>
          <DialogTitle>
            {testimonial
              ? "Update Testimonial"
              : "Create Testimonial"}
          </DialogTitle>

          <DialogDescription>
            {testimonial
              ? "Update client feedback, ratings, featured status and testimonial details."
              : "Add a new client testimonial to showcase reviews, recommendations and customer feedback."}
          </DialogDescription>
        </DialogHeader>

        {testimonial ? (
          <TestimonialForm
            testimonial={
              testimonial
            }
            onSuccess={
              handleSuccess
            }
          />
        ) : (
          <TestimonialForm
            onSuccess={
              handleSuccess
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TestimonialDialog;