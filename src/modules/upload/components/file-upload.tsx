// src\modules\upload\components\file-upload.tsx
import { useCallback, useRef, useState } from "react";

import { FileImage, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/shared/lib/utils";

import type { IFileUploadProps } from "../types";

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const DEFAULT_ACCEPT = "image/jpeg,image/jpg,image/png,image/webp";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

/* -------------------------------------------------------------------------- */
/*                                File Upload                                 */
/* -------------------------------------------------------------------------- */

export function FileUpload({
  onChange,
  accept = DEFAULT_ACCEPT,
  disabled = false,
  className,
}: IFileUploadProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const validateFile = useCallback((selectedFile: File): boolean => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      return false;
    }

    return true;
  }, []);

  const handleSelectFile = useCallback(
    (selectedFile: File | null): void => {
      if (!selectedFile) {
        return;
      }

      const isValid = validateFile(selectedFile);

      if (!isValid) {
        return;
      }

      setFile(selectedFile);

      onChange(selectedFile);
    },
    [onChange, validateFile],
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const selectedFile = event.target.files?.[0] ?? null;

    handleSelectFile(selectedFile);
  };

  const handleRemove = (): void => {
    setFile(null);

    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    event.stopPropagation();

    setIsDragging(false);

    if (disabled) {
      return;
    }

    const droppedFile = event.dataTransfer.files?.[0] ?? null;

    handleSelectFile(droppedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    event.stopPropagation();

    setIsDragging(false);
  };

  const openFileDialog = (): void => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={cn(
          `
            rounded-xl
            border-2
            border-dashed
            p-8
            text-center
            transition-all
          `,
          isDragging &&
            `
              border-primary
              bg-primary/5
            `,
          disabled &&
            `
              cursor-not-allowed
              opacity-50
            `,
        )}
      >
        <Upload
          className="
            text-muted-foreground
            mx-auto
            mb-4
            size-10
          "
        />

        <h4
          className="
            mb-2
            font-medium
          "
        >
          Upload Image
        </h4>

        <p
          className="
            text-muted-foreground
            mb-4
            text-sm
          "
        >
          Drag and drop an image here or click below
        </p>

        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={openFileDialog}
        >
          Choose File
        </Button>

        <p
          className="
            text-muted-foreground
            mt-4
            text-xs
          "
        >
          JPG, PNG, WEBP (Max 5 MB)
        </p>
      </div>

      {file ? (
        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            p-3
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <FileImage
              className="
                text-muted-foreground
                size-5
                shrink-0
              "
            />

            <div
              className="
                min-w-0
              "
            >
              <p
                className="
                  truncate
                  text-sm
                  font-medium
                "
              >
                {file.name}
              </p>

              <p
                className="
                  text-muted-foreground
                  text-xs
                "
              >
                {(file.size / 1024 / 1024).toFixed(2)}
                MB
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
