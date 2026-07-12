// src\modules\upload\services\upload.service.ts
import { API_ENDPOINTS } from "@/constants/api-endpoints.constants";

import { httpClient } from "@/shared/services/http-client";

import type {
  IDeleteImagePayload,
  IDeleteImageResponse,
  IUploadImagePayload,
  IUploadImageResponse,
} from "../types";

/* -------------------------------------------------------------------------- */
/*                               Upload Service                               */
/* -------------------------------------------------------------------------- */

class UploadService {
  /**
   * Upload Image
   */
  async uploadImage(
    payload: IUploadImagePayload,
  ): Promise<IUploadImageResponse> {
    const formData = new FormData();

    formData.append("file", payload.file);

    const response = await httpClient.post<IUploadImageResponse>(
      API_ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  }

  /**
   * Delete Image
   */
  async deleteImage(
    payload: IDeleteImagePayload,
  ): Promise<IDeleteImageResponse> {
    const response = await httpClient.delete<IDeleteImageResponse>(
      API_ENDPOINTS.UPLOAD,
      {
        data: {
          publicId: payload.publicId,
        },
      },
    );

    return response.data;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const uploadService = new UploadService();
