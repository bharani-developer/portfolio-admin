// src/modules/services/components/service-form.tsx

import { useEffect, type ReactElement } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { BriefcaseBusiness, Save, Trash2 } from "lucide-react";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import {
  FormInput,
  FormSwitch,
  FormTextarea,
  SubmitButton,
} from "@/components/forms";

import { useConfirmation } from "@/providers/confirmation/use-confirmation";

import { serviceFormSchema, type ServiceFormValues } from "../schemas";

import { useCreateService, useDeleteService, useUpdateService } from "../hooks";

import { SERVICE_DEFAULT_VALUES, type IService } from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ServiceFormProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  service?: IService | null;
}

/* -------------------------------------------------------------------------- */
/*                               Service Form                                 */
/* -------------------------------------------------------------------------- */

export function ServiceForm({
  open,
  onOpenChange,
  service,
}: ServiceFormProps): ReactElement {
  const isEditMode = Boolean(service);

  const { confirm } = useConfirmation();

  const createServiceMutation = useCreateService();

  const updateServiceMutation = useUpdateService();

  const deleteServiceMutation = useDeleteService();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),

    defaultValues: SERVICE_DEFAULT_VALUES,

    mode: "onChange",
  });

  const { reset, handleSubmit, control, formState, setValue } = form;

  const { isDirty, isSubmitting } = formState;

  /* ------------------------------------------------------------------------ */
  /*                              Populate Form                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!service) {
      reset(SERVICE_DEFAULT_VALUES);

      return;
    }

    reset({
      title: service.title ?? "",

      shortDescription: service.shortDescription ?? "",

      description: service.description ?? "",

      icon: service.icon ?? "",

      sortOrder: service.sortOrder,

      isActive: service.isActive,
    });
  }, [service, reset]);

  /* ------------------------------------------------------------------------ */
  /*                               Submit Form                                */
  /* ------------------------------------------------------------------------ */

  const onSubmit = async (values: ServiceFormValues): Promise<void> => {
    const payload = {
      title: values.title.trim(),

      shortDescription: values.shortDescription.trim(),

      description: values.description.trim(),

      sortOrder: values.sortOrder,

      isActive: values.isActive,

      ...(values.icon.trim() && {
        icon: values.icon.trim(),
      }),
    };

    if (isEditMode && service) {
      await updateServiceMutation.mutateAsync({
        id: service._id,

        payload,
      });

      onOpenChange(false);

      return;
    }

    await createServiceMutation.mutateAsync(payload);

    reset(SERVICE_DEFAULT_VALUES);

    onOpenChange(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                              Delete Service                              */
  /* ------------------------------------------------------------------------ */

  const handleDelete = async (): Promise<void> => {
    if (!service) {
      return;
    }

    const confirmed = await confirm({
      title: "Delete Service",

      description:
        "This action cannot be undone. The service will be permanently removed from your portfolio.",

      confirmText: "Delete",

      cancelText: "Cancel",

      destructive: true,
    });

    if (!confirmed) {
      return;
    }

    await deleteServiceMutation.mutateAsync({
      id: service._id,
    });

    onOpenChange(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                                Loading                                   */
  /* ------------------------------------------------------------------------ */

  const isLoading =
    isSubmitting ||
    createServiceMutation.isPending ||
    updateServiceMutation.isPending;

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BriefcaseBusiness className="size-5" />

            {isEditMode ? "Edit Service" : "Create Service"}
          </DialogTitle>

          <DialogDescription>
            Manage your portfolio services, descriptions, display order and
            visibility.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              control={control}
              name="title"
              label="Title"
              placeholder="Web Development"
              required
            />

            <FormTextarea
              control={control}
              name="shortDescription"
              label="Short Description"
              placeholder="Modern and scalable web applications."
              rows={3}
              required
            />

            <FormTextarea
              control={control}
              name="description"
              label="Description"
              placeholder="Describe your service in detail..."
              rows={6}
              required
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                control={control}
                name="icon"
                label="Icon"
                placeholder="Code2"
                description="Optional Lucide icon name."
              />

              <FormInput
                control={control}
                name="sortOrder"
                type="number"
                label="Sort Order"
                placeholder="0"
                required
                onChange={(event) =>
                  setValue("sortOrder", Number(event.target.value), {
                    shouldDirty: true,

                    shouldValidate: true,
                  })
                }
              />
            </div>

            <FormSwitch
              control={control}
              name="isActive"
              label="Active Service"
              description="Only active services will be visible on your portfolio."
            />

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <div>
                {isEditMode && (
                  <SubmitButton
                    type="button"
                    variant="destructive"
                    onClick={() => void handleDelete()}
                    isLoading={deleteServiceMutation.isPending}
                    loadingText="Deleting..."
                  >
                    <Trash2 className="size-4" />
                    Delete Service
                  </SubmitButton>
                )}
              </div>

              <SubmitButton
                type="submit"
                disabled={isEditMode ? !isDirty : false}
                isLoading={isLoading}
                loadingText={isEditMode ? "Updating..." : "Creating..."}
              >
                <Save className="size-4" />

                {isEditMode ? "Update Service" : "Create Service"}
              </SubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
