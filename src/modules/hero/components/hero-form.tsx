// src\modules\hero\components\hero-form.tsx

import { useEffect, useMemo, type ReactElement } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { Save } from "lucide-react";

import { useForm } from "react-hook-form";

import { FormInput } from "@/components/forms/form-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { ImageUpload } from "@/modules/upload/components/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";

import { useCreateHero } from "../hooks/use-create-hero";
import { useHero } from "../hooks/use-hero";
import { useUpdateHero } from "../hooks/use-update-hero";

import { heroFormSchema, type HeroFormValues } from "../schemas/hero.schema";

import {
  HERO_DEFAULT_VALUES,
  type ICreateHeroPayload,
  type IUpdateHeroPayload,
} from "../types";

export function HeroForm(): ReactElement {
  const { data: hero } = useHero();

  const createHeroMutation = useCreateHero();

  const updateHeroMutation = useUpdateHero();

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),

    defaultValues: HERO_DEFAULT_VALUES,

    mode: "onSubmit",
  });

  useEffect(() => {
    if (!hero || form.formState.isDirty) {
      return;
    }

    form.reset({
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      profileImage: hero.profileImage
        ? {
            url: hero.profileImage.url,
            publicId: hero.profileImage.publicId,
          }
        : null,
      resumeUrl: hero.resumeUrl ?? "",
      ctaButtonText: hero.ctaButtonText ?? "",
      ctaButtonLink: hero.ctaButtonLink ?? "",
      technologies: hero.technologies ?? [],
      isActive: hero.isActive,
    });
  }, [hero, form]);

  const isPending = useMemo(
    () => createHeroMutation.isPending || updateHeroMutation.isPending,
    [createHeroMutation.isPending, updateHeroMutation.isPending],
  );

  const onSubmit = async (values: HeroFormValues): Promise<void> => {
    if (hero) {
      const payload: IUpdateHeroPayload = {
        title: values.title,

        subtitle: values.subtitle,

        description: values.description,

        technologies: values.technologies,

        isActive: values.isActive,

        ...(values.profileImage
          ? {
              profileImage: values.profileImage,
            }
          : {}),

        ...(values.resumeUrl.trim()
          ? {
              resumeUrl: values.resumeUrl,
            }
          : {}),

        ...(values.ctaButtonText.trim()
          ? {
              ctaButtonText: values.ctaButtonText,
            }
          : {}),

        ...(values.ctaButtonLink.trim()
          ? {
              ctaButtonLink: values.ctaButtonLink,
            }
          : {}),
      };

      await updateHeroMutation.mutateAsync(payload);

      return;
    }

    const payload: ICreateHeroPayload = {
      title: values.title,

      subtitle: values.subtitle,

      description: values.description,

      technologies: values.technologies,

      isActive: values.isActive,

      ...(values.profileImage
        ? {
            profileImage: values.profileImage,
          }
        : {}),

      ...(values.resumeUrl.trim()
        ? {
            resumeUrl: values.resumeUrl,
          }
        : {}),

      ...(values.ctaButtonText.trim()
        ? {
            ctaButtonText: values.ctaButtonText,
          }
        : {}),

      ...(values.ctaButtonLink.trim()
        ? {
            ctaButtonLink: values.ctaButtonLink,
          }
        : {}),
    };

    await createHeroMutation.mutateAsync(payload);

    form.reset(HERO_DEFAULT_VALUES);
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
          Hero Section
        </h2>

        <p
          className="
            text-muted-foreground
            mt-2
            text-sm
          "
        >
          Manage your portfolio hero section, introduction content,
          technologies, resume link, and call-to-action settings.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormInput
            control={form.control}
            name="title"
            label="Title"
            placeholder="Hi, I'm Bharani"
            required
            disabled={isPending}
          />

          <FormInput
            control={form.control}
            name="subtitle"
            label="Subtitle"
            placeholder="Full Stack Developer"
            required
            disabled={isPending}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>

                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <textarea
                    {...field}
                    rows={6}
                    disabled={isPending}
                    placeholder="Write a professional introduction..."
                    className="
    border-input
    bg-background
    ring-offset-background
    placeholder:text-muted-foreground
    focus-visible:ring-ring
    min-h-35
    w-full
    rounded-xl
    border
    px-4
    py-3
    text-sm
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>

                <FormControl>
                  <textarea
                    value={field.value.join(", ")}
                    onChange={(event) => {
                      const technologies = event.target.value
                        .split(",")
                        .map((technology) => technology.trim())
                        .filter(Boolean);

                      field.onChange(technologies);
                    }}
                    rows={4}
                    disabled={isPending}
                    placeholder="React, Next.js, TypeScript, Node.js, Express.js, MongoDB"
                    className="
                      border-input
                      bg-background
                      ring-offset-background
                      placeholder:text-muted-foreground
                      focus-visible:ring-ring
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-sm
                      transition-colors
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-offset-2
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />
                </FormControl>

                <p
                  className="
                    text-muted-foreground
                    text-xs
                  "
                >
                  Separate technologies using commas. Maximum 20 technologies.
                </p>

                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
            "
          >
            <FormInput
              control={form.control}
              name="resumeUrl"
              label="Resume URL"
              placeholder="https://example.com/resume.pdf"
              disabled={isPending}
            />

            <FormInput
              control={form.control}
              name="ctaButtonText"
              label="CTA Button Text"
              placeholder="Download Resume"
              disabled={isPending}
            />
          </div>

          <FormInput
            control={form.control}
            name="ctaButtonLink"
            label="CTA Button Link"
            placeholder="https://example.com/resume.pdf"
            disabled={isPending}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem
                className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-4
                "
              >
                <div>
                  <FormLabel>Active Hero Section</FormLabel>

                  <p
                    className="
                      text-muted-foreground
                      mt-1
                      text-sm
                    "
                  >
                    Show this hero section on the portfolio website.
                  </p>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className="
              flex
              justify-end
              pt-2
            "
          >
            <SubmitButton
              isLoading={isPending}
              loadingText={hero ? "Updating..." : "Creating..."}
              className="
    min-w-45
  "
            >
              <Save className="mr-2 size-4" />

              {hero ? "Update Hero" : "Create Hero"}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
