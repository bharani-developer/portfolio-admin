import { ImageIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/shared/lib/utils";

import type { IImagePreviewProps } from "../types";

export function ImagePreview({
  image,
  className,
  onRemove,
  removable = false,
  aspectRatio = "video",
  previewClassName,
}: IImagePreviewProps): React.JSX.Element {
  const uploadedImage = image ?? null;

  const aspectClasses: Record<
    NonNullable<IImagePreviewProps["aspectRatio"]>,
    string
  > = {
    square: "aspect-square",

    video: "aspect-video",

    portrait: "aspect-[3/4]",
  };

  return (
    <div
      className={cn(
        `
          overflow-hidden
          rounded-xl
          border
          bg-card
          shadow-sm
        `,
        className,
      )}
    >
      <div
        className={cn(
          `
            bg-muted/30
            relative
            overflow-hidden
          `,
          aspectClasses[aspectRatio],
          previewClassName,
        )}
      >
        {uploadedImage ? (
          <img
            src={uploadedImage.url}
            alt="Uploaded image"
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              text-muted-foreground
              flex
              h-full
              flex-col
              items-center
              justify-center
              gap-3
            "
          >
            <ImageIcon className="size-10" aria-hidden="true" />

            <span className="text-sm">No image selected</span>
          </div>
        )}

        {uploadedImage && removable && onRemove ? (
          <div
            className="
              absolute
              right-3
              top-3
            "
          >
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={onRemove}
              aria-label="Remove image"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>

      {uploadedImage ? (
        <div
          className="
            space-y-1
            border-t
            p-4
          "
        >
          <p
            className="
              truncate
              text-sm
              font-medium
            "
          >
            Uploaded Image
          </p>

          <p
            className="
              text-muted-foreground
              truncate
              text-xs
            "
          >
            {uploadedImage.publicId}
          </p>
        </div>
      ) : null}
    </div>
  );
}
