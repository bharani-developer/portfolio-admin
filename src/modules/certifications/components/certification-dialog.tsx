// src/modules/certifications/components/certification-dialog.tsx

import type { ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CertificationForm } from "./certification-form";

import { useCreateCertification, useUpdateCertification } from "../hooks";

import type { CertificationFormValues } from "../schemas";

import type { ICertification, ICreateCertificationPayload } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface CertificationDialogProps {
  open: boolean;

  certification?: ICertification | null;

  onOpenChange: (open: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/*                           Certification Dialog                             */
/* -------------------------------------------------------------------------- */

export function CertificationDialog({
  open,
  certification = null,
  onOpenChange,
}: CertificationDialogProps): ReactElement {
  const createCertificationMutation = useCreateCertification();

  const updateCertificationMutation = useUpdateCertification();

  const isSubmitting =
    createCertificationMutation.isPending ||
    updateCertificationMutation.isPending;

  /* ------------------------------------------------------------------------ */
  /*                                 Submit                                   */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (
    values: CertificationFormValues,
  ): Promise<void> => {
    const payload: ICreateCertificationPayload = {
      title: values.title,

      issuer: values.issuer,

      issueDate: values.issueDate,

      expiryDate: values.neverExpires ? null : values.expiryDate,

      neverExpires: values.neverExpires,

      skills: values.skills,

      sortOrder: values.sortOrder,

      isActive: values.isActive,
    };

    if (values.certificateImage) {
      payload.certificateImage = values.certificateImage;
    }

    if (values.credentialId.trim()) {
      payload.credentialId = values.credentialId;
    }

    if (values.credentialUrl.trim()) {
      payload.credentialUrl = values.credentialUrl;
    }

    if (values.description.trim()) {
      payload.description = values.description;
    }

    if (certification) {
      await updateCertificationMutation.mutateAsync({
        id: certification._id,
        payload,
      });
    } else {
      await createCertificationMutation.mutateAsync(payload);
    }

    onOpenChange(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

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
            {certification ? "Update Certification" : "Create Certification"}
          </DialogTitle>

          <DialogDescription>
            {certification
              ? "Update certification details, credentials, skills and visibility."
              : "Add a new certification to showcase professional achievements and credentials."}
          </DialogDescription>
        </DialogHeader>

        <CertificationForm
          initialData={certification}
          isSubmitting={isSubmitting}
          submitLabel={
            certification ? "Update Certification" : "Create Certification"
          }
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CertificationDialog;
