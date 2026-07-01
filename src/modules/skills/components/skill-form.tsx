// src/modules/skills/components/skill-form.tsx

import { useEffect, useMemo, type ReactElement } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Save,
  Trash2,
  Wrench,
} from "lucide-react";

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
  FormSelect,
  FormSwitch,
  FormTextarea,
  SubmitButton,
} from "@/components/forms";

import { ImageUpload } from "@/modules/upload/components/image-upload";

import { useConfirmation } from "@/shared/hooks";

import {
  skillFormSchema,
  type SkillFormValues,
} from "../schemas";

import {
  useCreateSkill,
  useDeleteSkill,
  useUpdateSkill,
} from "../hooks";

import {
  SKILL_CATEGORIES,
  SKILL_DEFAULT_VALUES,
  type ISkill,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface SkillFormProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  skill?: ISkill | null;
}

/* -------------------------------------------------------------------------- */
/*                                Skill Form                                  */
/* -------------------------------------------------------------------------- */

export function SkillForm({
  open,
  onOpenChange,
  skill,
}: SkillFormProps): ReactElement {
  /* ------------------------------------------------------------------------ */
  /*                                  State                                   */
  /* ------------------------------------------------------------------------ */

  const isEditMode = Boolean(skill);

  /* ------------------------------------------------------------------------ */
  /*                                  Hooks                                   */
  /* ------------------------------------------------------------------------ */

  const { confirm } = useConfirmation();

  const createSkillMutation = useCreateSkill();

  const updateSkillMutation = useUpdateSkill();

  const deleteSkillMutation = useDeleteSkill();

  /* ------------------------------------------------------------------------ */
  /*                              React Hook Form                             */
  /* ------------------------------------------------------------------------ */

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),

    defaultValues: SKILL_DEFAULT_VALUES,

    mode: "onChange",
  });

  const {
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState,
  } = form;

  const {
    isDirty,
    isSubmitting,
  } = formState;

  /* ------------------------------------------------------------------------ */
  /*                               Watch Fields                               */
  /* ------------------------------------------------------------------------ */

  const image = watch("image");

  /* ------------------------------------------------------------------------ */
  /*                              Loading State                               */
  /* ------------------------------------------------------------------------ */

  const isLoading =
    isSubmitting ||
    createSkillMutation.isPending ||
    updateSkillMutation.isPending;

  /* ------------------------------------------------------------------------ */
  /*                             Category Options                             */
  /* ------------------------------------------------------------------------ */

  const categoryOptions = useMemo(
    () =>
      SKILL_CATEGORIES.map((category) => ({
        label: category,

        value: category,
      })),
    [],
  );

  /* ------------------------------------------------------------------------ */
  /*                                Reset Form                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!skill) {
      reset(SKILL_DEFAULT_VALUES);

      return;
    }

    reset({
      name: skill.name,

      category: skill.category,

      proficiency: skill.proficiency,

      image: skill.image ?? null,

      description: skill.description ?? "",

      sortOrder: skill.sortOrder,

      isActive: skill.isActive,
    });
  }, [skill, reset]);

  /* ------------------------------------------------------------------------ */
  /*                               Close Dialog                               */
  /* ------------------------------------------------------------------------ */

  const handleClose = (): void => {
    reset(SKILL_DEFAULT_VALUES);

    onOpenChange(false);
  };

  /* ------------------------------------------------------------------------ */
  /*                               Submit Form                                */
  /* ------------------------------------------------------------------------ */

  const onSubmit = async (
    values: SkillFormValues,
  ): Promise<void> => {
    const payload = {
      name: values.name.trim(),

      category: values.category,

      proficiency: values.proficiency,

      sortOrder: values.sortOrder,

      isActive: values.isActive,

      ...(values.image
        ? {
            image: values.image,
          }
        : {}),

      ...(values.description.trim()
        ? {
            description: values.description.trim(),
          }
        : {}),
    };

    if (isEditMode && skill) {
      await updateSkillMutation.mutateAsync({
        id: skill._id,

        payload,
      });

      handleClose();

      return;
    }

    await createSkillMutation.mutateAsync(payload);

    handleClose();
  };

  /* ------------------------------------------------------------------------ */
  /*                               Delete Skill                               */
  /* ------------------------------------------------------------------------ */

  const handleDelete = async (): Promise<void> => {
    if (!skill) {
      return;
    }

    const confirmed = await confirm({
      title: "Delete Skill",

      description:
        "This action cannot be undone. The skill will be permanently removed from your portfolio.",

      confirmText: "Delete",

      cancelText: "Cancel",

      destructive: true,
    });

    if (!confirmed) {
      return;
    }

    await deleteSkillMutation.mutateAsync({
      id: skill._id,
    });

    handleClose();
  };

  /* ------------------------------------------------------------------------ */
  /*                           Image Upload Handler                           */
  /* ------------------------------------------------------------------------ */

  const handleImageChange = (
    value: SkillFormValues["image"],
  ): void => {
    setValue("image", value, {
      shouldDirty: true,

      shouldTouch: true,

      shouldValidate: true,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (isLoading) {
          return;
        }

        if (!value) {
          handleClose();

          return;
        }

        onOpenChange(value);
      }}
    >
      <DialogContent className="max-w-3xl overflow-y-auto sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="size-5" />

            {isEditMode ? "Edit Skill" : "Create Skill"}
          </DialogTitle>

          <DialogDescription>
            Manage your portfolio skills, proficiency, technology logo,
            description, sorting and visibility.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* ---------------------------------------------------------------- */}
            {/* Basic Information                                                */}
            {/* ---------------------------------------------------------------- */}

            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                control={control}
                name="name"
                label="Skill Name"
                placeholder="React"
                required
              />

              <FormSelect
                control={control}
                name="category"
                label="Category"
                placeholder="Select category"
                options={categoryOptions}
                required
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Proficiency                                                      */}
            {/* ---------------------------------------------------------------- */}

            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                control={control}
                name="proficiency"
                type="number"
                label="Proficiency (%)"
                placeholder="95"
                min={0}
                max={100}
                valueAsNumber
                required
              />

              <FormInput
                control={control}
                name="sortOrder"
                type="number"
                label="Sort Order"
                placeholder="0"
                min={0}
                valueAsNumber
                required
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Skill Image                                                      */}
            {/* ---------------------------------------------------------------- */}

            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">
                  Skill Image
                </h3>

                <p className="text-muted-foreground text-sm">
                  Upload the technology logo that will be displayed
                  on your portfolio. Supported formats: JPG, PNG,
                  SVG and WEBP.
                </p>
              </div>

              <ImageUpload
                value={image}
                onChange={handleImageChange}
                aspectRatio="square"
                disabled={isLoading}
                previewClassName="bg-muted"
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Description                                                      */}
            {/* ---------------------------------------------------------------- */}

            <FormTextarea
              control={control}
              name="description"
              label="Description"
              placeholder="Briefly describe your experience with this technology..."
              rows={5}
            />

            {/* ---------------------------------------------------------------- */}
            {/* Visibility                                                       */}
            {/* ---------------------------------------------------------------- */}

            <FormSwitch
              control={control}
              name="isActive"
              label="Active Skill"
              description="Only active skills will be displayed on your portfolio."
            />

            {/* ---------------------------------------------------------------- */}
            {/* Actions                                                          */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {isEditMode ? (
                  <SubmitButton
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      void handleDelete();
                    }}
                    isLoading={deleteSkillMutation.isPending}
                    loadingText="Deleting..."
                    disabled={isLoading}
                  >
                    <Trash2 className="size-4" />

                    Delete Skill
                  </SubmitButton>
                ) : null}
              </div>

              <SubmitButton
                type="submit"
                isLoading={isLoading}
                loadingText={
                  isEditMode
                    ? "Updating Skill..."
                    : "Creating Skill..."
                }
                disabled={
                  isLoading ||
                  (isEditMode && !isDirty)
                }
              >
                <Save className="size-4" />

                {isEditMode
                  ? "Update Skill"
                  : "Create Skill"}
              </SubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}