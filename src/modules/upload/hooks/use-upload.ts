// src\modules\upload\hooks\use-upload.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getErrorMessage } from "@/shared/lib/handle-error";

import { uploadService } from "../services";

import type {
  IDeleteImagePayload,
  IDeleteImageResponse,
  IUploadImagePayload,
  IUploadImageResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                             Use Upload Image                               */
/* -------------------------------------------------------------------------- */

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation<IUploadImageResponse, Error, IUploadImagePayload>({
    mutationKey: ["upload", "image"],

    mutationFn: (payload): Promise<IUploadImageResponse> =>
      uploadService.uploadImage(payload),

    onSuccess: (response): void => {
      queryClient.invalidateQueries({
        queryKey: ["upload"],
      });

      toast.success(response.message ?? "Image uploaded successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                             Use Delete Image                               */
/* -------------------------------------------------------------------------- */

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation<IDeleteImageResponse, Error, IDeleteImagePayload>({
    mutationKey: ["upload", "delete-image"],

    mutationFn: (payload): Promise<IDeleteImageResponse> =>
      uploadService.deleteImage(payload),

    onSuccess: (response): void => {
      queryClient.invalidateQueries({
        queryKey: ["upload"],
      });

      toast.success(response.message ?? "Image deleted successfully.");
    },

    onError: (error): void => {
      toast.error(getErrorMessage(error));
    },
  });
}
