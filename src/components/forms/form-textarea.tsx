// src\components\forms\form-textarea.tsx

import type { ComponentProps } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTextareaProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<typeof Textarea>,
  "name"
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;

  label: string;

  description?: string;

  required?: boolean;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required = false,
  ...textareaProps
}: FormTextareaProps<TFieldValues>): React.JSX.Element {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}

            {required ? <span className="text-destructive ml-1">*</span> : null}
          </FormLabel>

          <FormControl>
            <Textarea {...field} {...textareaProps} />
          </FormControl>

          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
