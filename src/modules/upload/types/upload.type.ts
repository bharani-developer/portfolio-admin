// src/modules/upload/types/upload.type.ts

import type { IApiResponse } from "@/shared/types";

/* -------------------------------------------------------------------------- */
/*                               Upload Entity                                */
/* -------------------------------------------------------------------------- */

export interface IUploadedImage {
  url: string;

  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                              Upload Payloads                               */
/* -------------------------------------------------------------------------- */

export interface IUploadImagePayload {
  file: File;
}

export interface IDeleteImagePayload {
  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                                API Responses                               */
/* -------------------------------------------------------------------------- */

export type IUploadImageResponse =
  IApiResponse<IUploadedImage>;

export type IDeleteImageResponse =
  IApiResponse<null>;

/* -------------------------------------------------------------------------- */
/*                               Hook Variables                               */
/* -------------------------------------------------------------------------- */

export interface IUploadImageVariables {
  file: File;
}

export interface IDeleteImageVariables {
  publicId: string;
}

/* -------------------------------------------------------------------------- */
/*                                Shared Types                                */
/* -------------------------------------------------------------------------- */

export interface IImageUploadValue {
  url: string;

  publicId: string;
}

export type ImageAspectRatio =
  | "square"
  | "video"
  | "portrait";

/* -------------------------------------------------------------------------- */
/*                              Component Types                               */
/* -------------------------------------------------------------------------- */

export interface IImageUploadProps {
  value?: IImageUploadValue | null;

  onChange: (
    value: IImageUploadValue | null,
  ) => void;

  disabled?: boolean;

  className?: string;

  aspectRatio?: ImageAspectRatio;

  previewClassName?: string;
}

export interface IGalleryUploadProps {
  value?: IImageUploadValue[];

  onChange: (
    value: IImageUploadValue[],
  ) => void;

  disabled?: boolean;

  className?: string;

  maxImages?: number;
}

export interface IImagePreviewProps {
  image?: IImageUploadValue | null;

  className?: string;

  previewClassName?: string;

  removable?: boolean;

  aspectRatio?: ImageAspectRatio;

  onRemove?: () => void;
}

export interface IFileUploadProps {
  onChange: (
    file: File | null,
  ) => void;

  accept?: string;

  disabled?: boolean;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Utility Types                                */
/* -------------------------------------------------------------------------- */

export type UploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error";

export interface IUploadState {
  status: UploadStatus;

  progress: number;

  error?: string;
}