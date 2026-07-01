import { useEffect, type ReactElement } from "react";

import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { FormInput } from "@/components/forms/form-input";
import { FormTextarea } from "@/components/forms/form-textarea";
import { SubmitButton } from "@/components/forms/submit-button";

import { GalleryUpload } from "@/modules/upload/components/gallery-upload";
import { ImageUpload } from "@/modules/upload/components/image-upload";

import { aboutFormSchema, type AboutFormValues } from "../schemas/about.schema";

import {
  ABOUT_DEFAULT_VALUES,
  type ICreateAboutPayload,
  type IUpdateAboutPayload,
} from "../types";

import { useAbout } from "../hooks/use-about";
import { useCreateAbout } from "../hooks/use-create-about";
import { useUpdateAbout } from "../hooks/use-update-about";

export function AboutForm(): ReactElement {
  const { data: about } = useAbout();

  const createAboutMutation = useCreateAbout();

  const updateAboutMutation = useUpdateAbout();

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),

    defaultValues: ABOUT_DEFAULT_VALUES,

    mode: "onSubmit",
  });

  const { control, reset, setValue, handleSubmit } = form;

  const profileImage = useWatch({
    control,
    name: "profileImage",
  });

  const images = useWatch({
    control,
    name: "images",
  });

  const { fields, append, remove } = useFieldArray({
    control,

    name: "stats",
  });

  useEffect(() => {
    if (!about) {
      return;
    }

    reset({
      profileImage: about.profileImage,

      images: about.images ?? [],

      fullName: about.fullName,

      designation: about.designation,

      bio: about.bio,

      email: about.email ?? "",

      phone: about.phone ?? "",

      address: about.address ?? "",

      resumeUrl: about.resumeUrl ?? "",

      yearsOfExperience: about.yearsOfExperience,

      stats: about.stats ?? [],

      isActive: about.isActive,
    });
  }, [about, reset]);

  const isPending =
    createAboutMutation.isPending || updateAboutMutation.isPending;

  const onSubmit = async (values: AboutFormValues): Promise<void> => {
    console.log("onSubmit called");
    console.log(values);
    if (about) {
      const payload: IUpdateAboutPayload = {
        ...(values.profileImage
          ? {
              profileImage: values.profileImage,
            }
          : {}),

        images: values.images,

        fullName: values.fullName,

        designation: values.designation,

        bio: values.bio,

        email: values.email,

        phone: values.phone,

        address: values.address,

        resumeUrl: values.resumeUrl,

        stats: values.stats,

        isActive: values.isActive,

        ...(values.yearsOfExperience !== undefined && {
          yearsOfExperience: values.yearsOfExperience,
        }),
      };

      await updateAboutMutation.mutateAsync(payload);

      return;
    }

    const payload: ICreateAboutPayload = {
      ...(values.profileImage
        ? {
            profileImage: values.profileImage,
          }
        : {}),

      images: values.images,

      fullName: values.fullName,

      designation: values.designation,

      bio: values.bio,

      email: values.email,

      phone: values.phone,

      address: values.address,

      resumeUrl: values.resumeUrl,

      stats: values.stats,

      isActive: values.isActive,

      ...(values.yearsOfExperience !== undefined && {
        yearsOfExperience: values.yearsOfExperience,
      }),
    };

    await createAboutMutation.mutateAsync(payload);

    reset(ABOUT_DEFAULT_VALUES);
  };
  return (
    <div
      className="
      rounded-3xl
      border
      bg-card
      p-6
      shadow-sm
    "
    >
      <div className="mb-8">
        <h2
          className="
          text-2xl
          font-bold
          tracking-tight
        "
        >
          About Section
        </h2>

        <p
          className="
          text-muted-foreground
          mt-2
          text-sm
        "
        >
          Manage your profile, biography, contact information, profile image,
          gallery, experience, and portfolio statistics.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <div
            className="
            grid
            gap-6
            lg:grid-cols-2
          "
          >
            <FormInput
              control={control}
              name="fullName"
              label="Full Name"
              placeholder="Bharani"
              required
              disabled={isPending}
            />

            <FormInput
              control={control}
              name="designation"
              label="Designation"
              placeholder="Senior Full Stack Developer"
              required
              disabled={isPending}
            />
          </div>

          <FormTextarea
            control={control}
            name="bio"
            label="Biography"
            placeholder="Write a professional biography..."
            rows={8}
            required
            disabled={isPending}
          />

          <div
            className="
            grid
            gap-8
            lg:grid-cols-2
          "
          >
            <div className="space-y-4">
              <div>
                <h3
                  className="
                  text-lg
                  font-semibold
                "
                >
                  Profile Image
                </h3>

                <p
                  className="
                  text-muted-foreground
                  text-sm
                "
                >
                  Upload your primary profile image.
                </p>
              </div>

              <ImageUpload
                value={profileImage ?? null}
                disabled={isPending}
                aspectRatio="square"
                onChange={(image) => {
                  setValue("profileImage", image ?? undefined, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3
                  className="
                  text-lg
                  font-semibold
                "
                >
                  Gallery Images
                </h3>

                <p
                  className="
                  text-muted-foreground
                  text-sm
                "
                >
                  Upload multiple images for the About section.
                </p>
              </div>

              <GalleryUpload
                value={images}
                disabled={isPending}
                maxImages={20}
                onChange={(galleryImages) => {
                  setValue("images", galleryImages, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
            </div>
          </div>

          <div
            className="
            grid
            gap-6
            lg:grid-cols-2
          "
          >
            <FormInput
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="bharani@example.com"
              disabled={isPending}
            />

            <FormInput
              control={control}
              name="phone"
              label="Phone"
              placeholder="+91 9876543210"
              disabled={isPending}
            />
          </div>

          <FormInput
            control={control}
            name="address"
            label="Address"
            placeholder="Tamil Nadu, India"
            disabled={isPending}
          />

          <div
            className="
            grid
            gap-6
            lg:grid-cols-2
          "
          >
            <FormInput
              control={control}
              name="resumeUrl"
              label="Resume URL"
              placeholder="/resume/bharani-karthikeyan-resume.pdf"
              disabled={isPending}
            />

            <FormInput
              control={control}
              name="yearsOfExperience"
              label="Years of Experience"
              type="number"
              valueAsNumber
              disabled={isPending}
            />
          </div>

          <div className="space-y-4">
            <div
              className="
      flex
      items-center
      justify-between
    "
            >
              <div>
                <h3
                  className="
          text-lg
          font-semibold
        "
                >
                  Statistics
                </h3>

                <p
                  className="
          text-muted-foreground
          text-sm
        "
                >
                  Showcase your professional achievements.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() =>
                  append({
                    label: "",
                    value: "",
                  })
                }
              >
                <Plus className="mr-2 size-4" />
                Add Stat
              </Button>
            </div>

            {fields.length === 0 ? (
              <div
                className="
        text-muted-foreground
        rounded-xl
        border
        border-dashed
        p-8
        text-center
        text-sm
      "
              >
                No statistics added yet.
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="
            grid
            gap-4
            rounded-2xl
            border
            p-4
            lg:grid-cols-[1fr_1fr_auto]
          "
                  >
                    <FormInput
                      control={control}
                      name={`stats.${index}.label`}
                      label="Label"
                      placeholder="Projects"
                      disabled={isPending}
                    />

                    <FormInput
                      control={control}
                      name={`stats.${index}.value`}
                      label="Value"
                      placeholder="25+"
                      disabled={isPending}
                    />

                    <div
                      className="
              flex
              items-end
            "
                    >
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="
    flex
    justify-end
    border-t
    pt-6
  "
          >
            <SubmitButton
              isLoading={isPending}
              loadingText={about ? "Updating About..." : "Creating About..."}
              className="min-w-45"
            >
              <Save className="mr-2 size-4" />

              {about ? "Update About" : "Create About"}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
