// src/modules/contact/components/contact-form.tsx

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { useCreateContact } from "../hooks/use-create-contact";
import { useUpdateContact } from "../hooks/use-update-contact";
import {
  CONTACT_DEFAULT_VALUES,
  CONTACT_PRIORITY,
  CONTACT_SOURCE,
  CONTACT_STATUS,
} from "../types";

import type {
  IContact,
  ICreateContactPayload,
  IUpdateContactPayload,
} from "../types";

import { contactFormSchema, type ContactFormValues } from "../schemas";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ContactFormProps {
  contact?: IContact;

  onSuccess?: () => void;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                              Contact Form                                  */
/* -------------------------------------------------------------------------- */

export function ContactForm({
  contact,
  onSuccess,
  className,
}: ContactFormProps) {
  const isEditMode = Boolean(contact);

  const createContactMutation = useCreateContact();

  const updateContactMutation = useUpdateContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),

    defaultValues: CONTACT_DEFAULT_VALUES,

    mode: "onChange",
  });

  useEffect(() => {
    if (!contact) {
      form.reset(CONTACT_DEFAULT_VALUES);

      return;
    }

    form.reset({
      name: contact.name,

      email: contact.email,

      phone: contact.phone ?? "",

      company: contact.company ?? "",

      subject: contact.subject,

      message: contact.message,

      status: contact.status,

      priority: contact.priority,

      source: contact.source,

      notes: contact.notes ?? "",

      sortOrder: contact.sortOrder,

      isActive: contact.isActive,

      isRead: contact.isRead,

      isReplied: contact.isReplied,
    });
  }, [contact, form]);

  const isSubmitting =
    createContactMutation.isPending || updateContactMutation.isPending;

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    try {
      if (isEditMode && contact) {
        const updatePayload: IUpdateContactPayload = {
          name: values.name,

          email: values.email,

          subject: values.subject,

          message: values.message,

          status: values.status,

          priority: values.priority,

          source: values.source,

          sortOrder: values.sortOrder,

          isActive: values.isActive,

          isRead: values.isRead,

          isReplied: values.isReplied,
        };

        if (values.phone.trim()) {
          updatePayload.phone = values.phone.trim();
        }

        if (values.company.trim()) {
          updatePayload.company = values.company.trim();
        }

        if (values.notes.trim()) {
          updatePayload.notes = values.notes.trim();
        }

        await updateContactMutation.mutateAsync({
          id: contact._id,
          payload: updatePayload,
        });

        toast.success("Contact updated successfully.");
      } else {
        const createPayload: ICreateContactPayload = {
          name: values.name,

          email: values.email,

          subject: values.subject,

          message: values.message,

          source: values.source,
        };

        if (values.phone.trim()) {
          createPayload.phone = values.phone.trim();
        }

        if (values.company.trim()) {
          createPayload.company = values.company.trim();
        }

        await createContactMutation.mutateAsync(createPayload);

        toast.success("Contact created successfully.");

        form.reset(CONTACT_DEFAULT_VALUES);
      }

      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.error(message);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

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

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>

                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>

                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>

                  <FormControl>
                    <Input placeholder="Project Inquiry" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Write your message..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {CONTACT_STATUS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {CONTACT_PRIORITY.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {CONTACT_SOURCE.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Internal notes..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <FormLabel>Active</FormLabel>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRead"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <FormLabel>Read</FormLabel>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isReplied"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <FormLabel>Replied</FormLabel>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Order</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={0}
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

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    {isEditMode ? "Update Contact" : "Create Contact"}
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
