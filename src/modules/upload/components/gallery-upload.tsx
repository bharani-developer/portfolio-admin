// src\modules\upload\components\gallery-upload.tsx

import { Plus, Images, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/shared/lib/utils";

import { ImageUpload } from "./image-upload";

import type { IGalleryUploadProps, IImageUploadValue } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_MAX_IMAGES = 20;

/* -------------------------------------------------------------------------- */
/*                              Gallery Upload                                */
/* -------------------------------------------------------------------------- */

export function GalleryUpload({
  value,
  onChange,
  disabled = false,
  className,
  maxImages = DEFAULT_MAX_IMAGES,
}: IGalleryUploadProps): React.JSX.Element {
  const gallery: IImageUploadValue[] = value ?? [];

  const canAddMore = gallery.length < maxImages;

  const handleAddImage = (image: IImageUploadValue | null): void => {
    if (!image) {
      return;
    }

    onChange([...gallery, image]);
  };

  const handleRemoveImage = (index: number): void => {
    onChange(gallery.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Images className="size-5" aria-hidden="true" />

          <div>
            <h3
              className="
                text-sm
                font-medium
              "
            >
              Gallery Images
            </h3>

            <p
              className="
                text-muted-foreground
                text-xs
              "
            >
              {gallery.length} / {maxImages} images
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}

      {gallery.length > 0 ? (
        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {gallery.map((image, index) => (
            <div
              key={`${image.publicId}-${index}`}
              className="
                  relative
                "
            >
              <img
                src={image.url}
                alt={`Gallery ${index + 1}`}
                loading="lazy"
                className="
                    aspect-video
                    w-full
                    rounded-xl
                    border
                    object-cover
                  "
              />

              <Button
                type="button"
                size="icon"
                variant="destructive"
                disabled={disabled}
                onClick={() => handleRemoveImage(index)}
                className="
                    absolute
                    right-2
                    top-2
                  "
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>

              <div
                className="
                    mt-2
                  "
              >
                <p
                  className="
                      text-muted-foreground
                      truncate
                      text-xs
                    "
                >
                  {image.publicId}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="
            text-muted-foreground
            rounded-xl
            border
            border-dashed
            p-8
            text-center
            text-sm
          "
        >
          No gallery images added yet.
        </div>
      )}

      {/* Upload Section */}

      {canAddMore ? (
        <div
          className="
            space-y-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Plus className="size-4" aria-hidden="true" />

            <span
              className="
                text-sm
                font-medium
              "
            >
              Add Image
            </span>
          </div>

          <ImageUpload disabled={disabled} onChange={handleAddImage} />
        </div>
      ) : (
        <div
          className="
            text-muted-foreground
            rounded-xl
            border
            p-4
            text-center
            text-sm
          "
        >
          Maximum of {maxImages} images reached.
        </div>
      )}
    </div>
  );
}
