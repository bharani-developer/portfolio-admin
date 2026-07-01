import type { ComponentProps, ReactNode } from "react";

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

import { cn } from "@/shared/lib/utils";

export interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name"
> {
  control: Control<TFieldValues>;

  name: FieldPath<TFieldValues>;

  label: string;

  description?: string;

  required?: boolean;

  startIcon?: ReactNode;

  endIcon?: ReactNode;

  containerClassName?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required = false,
  startIcon,
  endIcon,
  containerClassName,
  className,
  ...inputProps
}: FormInputProps<TFieldValues>): React.JSX.Element {
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
            <div className={cn("relative", containerClassName)}>
              {startIcon ? (
                <div
                  className="
                    text-muted-foreground
                    pointer-events-none
                    absolute
                    top-1/2
                    left-3
                    z-10
                    -translate-y-1/2
                  "
                >
                  {startIcon}
                </div>
              ) : null}

              <Input
                {...field}
                {...inputProps}
                className={cn(
                  startIcon && "pl-10",
                  endIcon && "pr-10",
                  className,
                )}
              />

              {endIcon ? (
                <div
                  className="
                    absolute
                    top-1/2
                    right-3
                    z-10
                    -translate-y-1/2
                  "
                >
                  {endIcon}
                </div>
              ) : null}
            </div>
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
