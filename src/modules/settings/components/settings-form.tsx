// src\modules\settings\components\settings-form.tsx
"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle, Save } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Skeleton } from "@/components/ui/skeleton";

import { ImageUpload } from "@/modules/upload/components";

import { settingsFormSchema, type SettingsFormValues } from "../schemas";

import {
  SETTINGS_DEFAULT_VALUES,
  type ISettings,
  type ISettingsFormValues,
  type ISettingsSeo,
  type ISettingsSocialLinks,
  type IUpdateSettingsPayload,
} from "../types";

import { useSettings, useUpdateSettings } from "../hooks";

/* -------------------------------------------------------------------------- */
/*                              Helper Methods                                */
/* -------------------------------------------------------------------------- */

function mapSettingsToFormValues(settings: ISettings): ISettingsFormValues {
  return {
    siteTitle: settings.siteTitle ?? "",

    siteDescription: settings.siteDescription ?? "",

    email: settings.email ?? "",

    phone: settings.phone ?? "",

    address: settings.address ?? "",

    logoUrl: settings.logo?.url ?? "",

    logoPublicId: settings.logo?.publicId ?? "",

    faviconUrl: settings.favicon?.url ?? "",

    faviconPublicId: settings.favicon?.publicId ?? "",

    github: settings.socialLinks?.github ?? "",

    linkedin: settings.socialLinks?.linkedin ?? "",

    twitter: settings.socialLinks?.twitter ?? "",

    facebook: settings.socialLinks?.facebook ?? "",

    instagram: settings.socialLinks?.instagram ?? "",

    youtube: settings.socialLinks?.youtube ?? "",

    leetcode: settings.socialLinks?.leetcode ?? "",

    hackerrank: settings.socialLinks?.hackerrank ?? "",

    stackoverflow: settings.socialLinks?.stackoverflow ?? "",

    metaTitle: settings.seo?.metaTitle ?? "",

    metaDescription: settings.seo?.metaDescription ?? "",

    metaKeywords: settings.seo?.metaKeywords?.join(", ") ?? "",

    siteUrl: settings.seo?.siteUrl ?? "",
  };
}

function buildPayload(values: SettingsFormValues): IUpdateSettingsPayload {
  const payload: IUpdateSettingsPayload = {
    siteTitle: values.siteTitle.trim(),

    siteDescription: values.siteDescription.trim(),

    email: values.email.trim(),

    phone: values.phone.trim(),

    address: values.address.trim(),
  };

  /* ------------------------------------------------------------------ */
  /* Logo                                                               */
  /* ------------------------------------------------------------------ */

  if (values.logoUrl.trim() && values.logoPublicId.trim()) {
    payload.logo = {
      url: values.logoUrl.trim(),

      publicId: values.logoPublicId.trim(),
    };
  }

  /* ------------------------------------------------------------------ */
  /* Favicon                                                            */
  /* ------------------------------------------------------------------ */

  if (values.faviconUrl.trim() && values.faviconPublicId.trim()) {
    payload.favicon = {
      url: values.faviconUrl.trim(),

      publicId: values.faviconPublicId.trim(),
    };
  }

  /* ------------------------------------------------------------------ */
  /* Social Links                                                       */
  /* ------------------------------------------------------------------ */

  const socialLinks: ISettingsSocialLinks = {};

  if (values.github.trim()) {
    socialLinks.github = values.github.trim();
  }

  if (values.linkedin.trim()) {
    socialLinks.linkedin = values.linkedin.trim();
  }

  if (values.twitter.trim()) {
    socialLinks.twitter = values.twitter.trim();
  }

  if (values.facebook.trim()) {
    socialLinks.facebook = values.facebook.trim();
  }

  if (values.instagram.trim()) {
    socialLinks.instagram = values.instagram.trim();
  }

  if (values.youtube.trim()) {
    socialLinks.youtube = values.youtube.trim();
  }

  if (values.leetcode.trim()) {
    socialLinks.leetcode = values.leetcode.trim();
  }

  if (values.hackerrank.trim()) {
    socialLinks.hackerrank = values.hackerrank.trim();
  }

  if (values.stackoverflow.trim()) {
    socialLinks.stackoverflow = values.stackoverflow.trim();
  }

  if (Object.keys(socialLinks).length > 0) {
    payload.socialLinks = socialLinks;
  }

  /* ------------------------------------------------------------------ */
  /* SEO                                                                */
  /* ------------------------------------------------------------------ */

  const seo: ISettingsSeo = {
    metaTitle: values.metaTitle.trim(),

    metaDescription: values.metaDescription.trim(),

    siteUrl: values.siteUrl.trim(),
  };

  const metaKeywords = values.metaKeywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  if (metaKeywords.length > 0) {
    seo.metaKeywords = metaKeywords;
  }

  payload.seo = seo;

  return payload;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */

export function SettingsForm(): React.JSX.Element {
  const { data: settings, isLoading, isFetching } = useSettings();

  const updateSettingsMutation = useUpdateSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),

    defaultValues: SETTINGS_DEFAULT_VALUES,

    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isSubmitting },
  } = form;

  const logoUrl = useWatch({
    control,
    name: "logoUrl",
  });

  const logoPublicId = useWatch({
    control,
    name: "logoPublicId",
  });

  const faviconUrl = useWatch({
    control,
    name: "faviconUrl",
  });

  const faviconPublicId = useWatch({
    control,
    name: "faviconPublicId",
  });

  useEffect(() => {
    if (!settings) {
      return;
    }

    reset(mapSettingsToFormValues(settings));
  }, [settings, reset]);

  const onSubmit = async (values: SettingsFormValues): Promise<void> => {
    try {
      const payload = buildPayload(values);

      const response = await updateSettingsMutation.mutateAsync(payload);

      toast.success(response.message ?? "Settings updated successfully.");

      reset(values);
    } catch {
      // handled in mutation
    }
  };

  if (isLoading || isFetching) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-64" />

          <Skeleton className="h-4 w-96" />
        </CardHeader>

        <CardContent className="space-y-6">
          {Array.from({
            length: 10,
          }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Settings</CardTitle>

        <CardDescription>
          Manage your portfolio branding, contact information, social links, and
          SEO settings.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>

                <TabsTrigger value="branding">Branding</TabsTrigger>

                <TabsTrigger value="social">Social</TabsTrigger>

                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              {/* ------------------------------------------------------------------ */}
              {/* General Tab                                                         */}
              {/* ------------------------------------------------------------------ */}

              <TabsContent value="general" className="space-y-6 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={control}
                    name="siteTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Title</FormLabel>

                        <FormControl>
                          <Input placeholder="Portfolio Website" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>

                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="siteDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Description</FormLabel>

                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Describe your portfolio website..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>

                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>

                        <FormControl>
                          <Input placeholder="Tamil Nadu, India" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* ------------------------------------------------------------------ */}
              {/* Branding Tab                                                        */}
              {/* ------------------------------------------------------------------ */}

              <TabsContent value="branding" className="space-y-8 pt-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Logo */}

                  <div className="space-y-4">
                    <h3 className="font-medium">Logo</h3>

                    <ImageUpload
                      value={
                        logoUrl && logoPublicId
                          ? {
                              url: logoUrl,
                              publicId: logoPublicId,
                            }
                          : null
                      }
                      onChange={(image) => {
                        setValue("logoUrl", image?.url ?? "", {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });

                        setValue("logoPublicId", image?.publicId ?? "", {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>

                  {/* Favicon */}

                  <div className="space-y-4">
                    <h3 className="font-medium">Favicon</h3>

                    <ImageUpload
                      value={
                        faviconUrl && faviconPublicId
                          ? {
                              url: faviconUrl,
                              publicId: faviconPublicId,
                            }
                          : null
                      }
                      onChange={(image) => {
                        setValue("faviconUrl", image?.url ?? "", {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });

                        setValue("faviconPublicId", image?.publicId ?? "", {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* ------------------------------------------------------------------ */}
              {/* Social Links Tab                                                    */}
              {/* ------------------------------------------------------------------ */}

              <TabsContent value="social" className="space-y-6 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    "github",
                    "linkedin",
                    "twitter",
                    "facebook",
                    "instagram",
                    "youtube",
                    "leetcode",
                    "hackerrank",
                    "stackoverflow",
                  ].map((fieldName) => (
                    <FormField
                      key={fieldName}
                      control={control}
                      name={fieldName as keyof SettingsFormValues}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1)}
                          </FormLabel>

                          <FormControl>
                            <Input
                              placeholder={`https://${fieldName}.com/...`}
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* ------------------------------------------------------------------ */}
              {/* SEO Tab                                                             */}
              {/* ------------------------------------------------------------------ */}

              <TabsContent value="seo" className="space-y-6 pt-6">
                <FormField
                  control={control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>

                      <FormControl>
                        <Input placeholder="Portfolio Meta Title" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>

                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="SEO description..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="metaKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Keywords</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="react, typescript, nodejs"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site URL</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="https://yourdomain.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  !isDirty || isSubmitting || updateSettingsMutation.isPending
                }
              >
                {updateSettingsMutation.isPending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
