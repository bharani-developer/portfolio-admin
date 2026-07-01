// src/modules/upload/components/image-upload.tsx

import { LoaderCircle } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { FileUpload } from "./file-upload";
import { ImagePreview } from "./image-preview";

import { useDeleteImage, useUploadImage } from "../hooks";

import type { IImageUploadProps, IImageUploadValue } from "../types";

/* -------------------------------------------------------------------------- */
/*                               Image Upload                                 */
/* -------------------------------------------------------------------------- */

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  className,
  aspectRatio = "video",
  previewClassName,
}: IImageUploadProps): React.JSX.Element {
  const uploadImageMutation = useUploadImage();

  const deleteImageMutation = useDeleteImage();

  const imageValue: IImageUploadValue | null = value ?? null;

  const isUploading = uploadImageMutation.isPending;

  const isDeleting = deleteImageMutation.isPending;

  const isPending = disabled || isUploading || isDeleting;

  const handleUpload = async (file: File | null): Promise<void> => {
    if (!file) {
      return;
    }

    const response = await uploadImageMutation.mutateAsync({
      file,
    });

    onChange({
      url: response.data.url,
      publicId: response.data.publicId,
    });
  };

  const handleRemove = async (): Promise<void> => {
    if (!imageValue?.publicId) {
      onChange(null);

      return;
    }

    await deleteImageMutation.mutateAsync({
      publicId: imageValue.publicId,
    });

    onChange(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <ImagePreview
        image={imageValue}
        removable={Boolean(imageValue)}
        aspectRatio={aspectRatio}
        {...(previewClassName && {
          previewClassName,
        })}
        {...(imageValue && {
          onRemove: () => {
            void handleRemove();
          },
        })}
      />

      {!imageValue && (
        <FileUpload disabled={isPending} onChange={handleUpload} />
      )}

      {isPending && (
        <div
          className="
            text-muted-foreground
            flex
            items-center
            justify-center
            gap-2
            text-sm
          "
        >
          <LoaderCircle
            className="
              size-4
              animate-spin
            "
          />

          <span>
            {isUploading ? "Uploading image..." : "Removing image..."}
          </span>
        </div>
      )}
    </div>
  );
}
