// src\components\forms\form-image-upload.tsx

import { useMemo } from "react";

import { ImageIcon, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/shared/lib/utils";

interface FormImageUploadProps {
  value?: File | null;
  previewUrl?: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  className?: string;
}

export function FormImageUpload({
  value,
  previewUrl,
  onChange,
  disabled = false,
  className,
}: FormImageUploadProps): React.JSX.Element {
  const preview = useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    return previewUrl ?? null;
  }, [value, previewUrl]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0] ?? null;

    onChange(file);
  };

  const handleRemove = (): void => {
    onChange(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="bg-muted/30 flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-dashed">
        {preview ? (
          <img
            src={preview}
            alt="Image preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex flex-col items-center gap-2">
            <ImageIcon className="size-10" aria-hidden="true" />

            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={disabled} asChild>
          <label className="cursor-pointer">
            <Upload className="size-4" />

            <span>Choose Image</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={disabled}
            />
          </label>
        </Button>

        {preview ? (
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemove}
            disabled={disabled}
          >
            <Trash2 className="size-4" />

            <span>Remove</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
