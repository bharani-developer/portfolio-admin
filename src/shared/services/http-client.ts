// src/shared/services/http-client.ts

import axios from "axios";

import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { API_CONFIG, API_PREFIX } from "@/constants/api.constants";

import { STORAGE_KEYS } from "@/constants/storage.constants";

import { storage } from "@/shared/lib/storage";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function getAccessToken(): string | null {
  return storage.get<string>(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
}

function clearAuthStorage(): void {
  storage.remove(STORAGE_KEYS.AUTH.ACCESS_TOKEN);

  storage.remove(STORAGE_KEYS.AUTH.REFRESH_TOKEN);

  storage.remove(STORAGE_KEYS.AUTH.USER);
}

/* -------------------------------------------------------------------------- */
/*                               Axios Instance                               */
/* -------------------------------------------------------------------------- */

export const httpClient: AxiosInstance = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}${API_PREFIX}`,

  timeout: API_CONFIG.TIMEOUT,

  withCredentials: true,

  headers: {
    Accept: "application/json",

    "Content-Type": API_CONFIG.CONTENT_TYPE.JSON,
  },
});

/* -------------------------------------------------------------------------- */
/*                          Request Interceptor                               */
/* -------------------------------------------------------------------------- */

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error: AxiosError) => Promise.reject(error),
);

/* -------------------------------------------------------------------------- */
/*                          Response Interceptor                              */
/* -------------------------------------------------------------------------- */

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401: {
        clearAuthStorage();

        break;
      }

      case 403: {
        break;
      }

      case 500: {
        break;
      }

      default:
        break;
    }

    return Promise.reject(error);
  },
);
