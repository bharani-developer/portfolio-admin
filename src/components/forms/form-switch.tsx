// src\components\forms\form-switch.tsx

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormSwitchProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;

  label: string;

  description?: string;

  disabled?: boolean;

  required?: boolean;
}

export function FormSwitch<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled = false,
  required = false,
}: FormSwitchProps<TFieldValues>): React.JSX.Element {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <FormLabel>
              {label}

              {required ? (
                <span className="text-destructive ml-1">*</span>
              ) : null}
            </FormLabel>

            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}

            <FormMessage />
          </div>

          <FormControl>
            <Switch
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
