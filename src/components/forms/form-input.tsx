// src/components/forms/form-input.tsx

import type { ComponentProps, ReactElement } from "react";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name"
> {
  control: Control<TFieldValues>;

  name: FieldPath<TFieldValues>;

  label: string;

  description?: string;

  required?: boolean;

  /**
   * Forces numeric conversion.
   * Normally unnecessary because type="number"
   * is automatically handled.
   */
  valueAsNumber?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Form Input                                  */
/* -------------------------------------------------------------------------- */

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required = false,
  className,
  type,
  valueAsNumber = false,
  ...inputProps
}: FormInputProps<TFieldValues>): ReactElement {
  const isNumberField = type === "number" || valueAsNumber;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2.5">
          <FormLabel className="text-sm font-medium tracking-tight">
            {label}

            {required && <span className="ml-1 text-destructive">*</span>}
          </FormLabel>

          <FormControl>
            <Input
              {...inputProps}
              {...field}
              type={type}
              value={field.value ?? ""}
              onChange={(event) => {
                if (isNumberField) {
                  const value = event.target.value;

                  field.onChange(
                    value === "" ? undefined : event.target.valueAsNumber,
                  );

                  return;
                }

                field.onChange(event.target.value);
              }}
              className={[
                "h-12",
                "rounded-xl",
                "border-border/60",
                "bg-background",
                "px-4",
                "text-sm",
                "shadow-sm",
                "transition-all",
                "duration-200",
                "placeholder:text-muted-foreground/70",
                "focus-visible:border-primary",
                "focus-visible:ring-2",
                "focus-visible:ring-primary/20",
                className,
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
