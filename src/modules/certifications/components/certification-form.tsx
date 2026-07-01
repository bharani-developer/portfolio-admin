// src\modules\certifications\components\certification-form.tsx

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormEditor } from "@/components/editor/form-editor";
import { SkillsInput } from "@/components/common/skills-input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/modules/upload/components";

import {
  certificationFormSchema,
  type CertificationFormValues,
} from "../schemas";
import { useWatch } from "react-hook-form";
import { CERTIFICATION_DEFAULT_VALUES, type ICertification } from "../types";

interface CertificationFormProps {
  initialData: ICertification | null;

  isSubmitting?: boolean;

  submitLabel?: string;

  onSubmit: (values: CertificationFormValues) => Promise<void> | void;
}

export function CertificationForm({
  initialData,
  isSubmitting = false,
  submitLabel = "Save Certification",
  onSubmit,
}: CertificationFormProps): React.JSX.Element {
  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationFormSchema),

    defaultValues: CERTIFICATION_DEFAULT_VALUES,
  });

  const neverExpires = useWatch({
    control: form.control,
    name: "neverExpires",
  });
  useEffect(() => {
    if (!initialData) {
      return;
    }

    form.reset({
      title: initialData.title,

      issuer: initialData.issuer,

      certificateImage: initialData.certificateImage,

      credentialId: initialData.credentialId ?? "",

      credentialUrl: initialData.credentialUrl ?? "",

      issueDate: initialData.issueDate?.split("T")[0] ?? "",

      expiryDate: initialData.expiryDate?.split("T")[0] ?? "",

      neverExpires: initialData.neverExpires,

      description: initialData.description ?? "",

      skills: initialData.skills ?? [],

      sortOrder: initialData.sortOrder,

      isActive: initialData.isActive,
    });
  }, [form, initialData]);

  const handleSubmit = async (
    values: CertificationFormValues,
  ): Promise<void> => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>

                <FormControl>
                  <Input
                    placeholder="AWS Certified Developer Associate"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Amazon Web Services"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="certificateImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate Image</FormLabel>

              <FormControl>
                <ImageUpload
                  value={field.value ?? null}
                  disabled={isSubmitting}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="credentialId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential ID</FormLabel>

                <FormControl>
                  <Input disabled={isSubmitting} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="credentialUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credential URL</FormLabel>

                <FormControl>
                  <Input disabled={isSubmitting} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>

                <FormControl>
                  <Input type="date" disabled={isSubmitting} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {!neverExpires ? (
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>

                  <FormControl>
                    <Input type="date" disabled={isSubmitting} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="neverExpires"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Never Expires</FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    disabled={isSubmitting}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    disabled={isSubmitting}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Order</FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    value={field.value}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>

              <FormControl>
                <SkillsInput
                  value={field.value}
                  disabled={isSubmitting}
                  onChange={field.onChange}
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
                <FormEditor
                  value={field.value}
                  placeholder="Write certification details..."
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircle
                  className="
                    size-4
                    animate-spin
                  "
                />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
