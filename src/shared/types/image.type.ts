// src\shared\types\image.type.ts

export interface IImage {
  url: string;

  publicId: string;

  width?: number;

  height?: number;

  format?: string;
}

export interface IImageUploadResponse {
  url: string;

  publicId: string;
}

export interface IImagePreview {
  file: File;

  previewUrl: string;
}
